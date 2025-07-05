import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import pool from '@/config/database';
import redisClient from '@/config/redis';
import { QueueTicket, TicketStatus, CreateTicketRequest, UpdateTicketRequest, QueueStats } from '@/types';

export class QueueService {
  // Create a new ticket and join the queue
  async createTicket(request: CreateTicketRequest): Promise<QueueTicket> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get the next position in the queue
      const positionResult = await client.query(
        'SELECT COALESCE(MAX(position), 0) + 1 as next_position FROM queue_tickets WHERE department_id = $1 AND status = $2',
        [request.departmentId, TicketStatus.WAITING]
      );
      
      const position = positionResult.rows[0].next_position;
      
      // Generate ticket number (format: DEPT-YYYYMMDD-XXXX)
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const ticketNumber = `DEPT-${date}-${position.toString().padStart(4, '0')}`;
      
      // Generate QR code
      const qrCodeData = JSON.stringify({
        ticketId: uuidv4(),
        ticketNumber,
        departmentId: request.departmentId,
        userId: request.userId
      });
      
      const qrCode = await QRCode.toDataURL(qrCodeData);
      
      // Calculate estimated wait time
      const estimatedWaitTime = await this.calculateEstimatedWaitTime(request.departmentId, position);
      
      // Insert the ticket
      const insertResult = await client.query(
        `INSERT INTO queue_tickets 
         (id, ticket_number, user_id, department_id, status, position, estimated_wait_time, qr_code, joined_at, missed_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          uuidv4(),
          ticketNumber,
          request.userId,
          request.departmentId,
          TicketStatus.WAITING,
          position,
          estimatedWaitTime,
          qrCode,
          new Date(),
          0
        ]
      );
      
      await client.query('COMMIT');
      
      // Update Redis cache
      await this.updateQueueCache(request.departmentId);
      
      return this.mapDatabaseRowToTicket(insertResult.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Get ticket by ID
  async getTicketById(ticketId: string): Promise<QueueTicket | null> {
    const result = await pool.query(
      'SELECT * FROM queue_tickets WHERE id = $1',
      [ticketId]
    );
    
    return result.rows.length > 0 ? this.mapDatabaseRowToTicket(result.rows[0]) : null;
  }
  
  // Get ticket by QR code
  async getTicketByQRCode(qrCodeData: string): Promise<QueueTicket | null> {
    const result = await pool.query(
      'SELECT * FROM queue_tickets WHERE qr_code = $1',
      [qrCodeData]
    );
    
    return result.rows.length > 0 ? this.mapDatabaseRowToTicket(result.rows[0]) : null;
  }
  
  // Update ticket status
  async updateTicket(ticketId: string, updates: UpdateTicketRequest): Promise<QueueTicket | null> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;
      
      if (updates.status !== undefined) {
        updateFields.push(`status = $${paramCount++}`);
        values.push(updates.status);
      }
      
      if (updates.position !== undefined) {
        updateFields.push(`position = $${paramCount++}`);
        values.push(updates.position);
      }
      
      if (updates.estimatedWaitTime !== undefined) {
        updateFields.push(`estimated_wait_time = $${paramCount++}`);
        values.push(updates.estimatedWaitTime);
      }
      
      updateFields.push(`updated_at = $${paramCount++}`);
      values.push(new Date());
      
      values.push(ticketId);
      
      const result = await client.query(
        `UPDATE queue_tickets 
         SET ${updateFields.join(', ')}
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );
      
      await client.query('COMMIT');
      
      if (result.rows.length > 0) {
        const ticket = this.mapDatabaseRowToTicket(result.rows[0]);
        
        // Update Redis cache if position changed
        if (updates.position !== undefined) {
          await this.updateQueueCache(ticket.departmentId);
        }
        
        return ticket;
      }
      
      return null;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Call next ticket in queue
  async callNextTicket(departmentId: string): Promise<QueueTicket | null> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get the next ticket in line
      const result = await client.query(
        `UPDATE queue_tickets 
         SET status = $1, called_at = $2, updated_at = $3
         WHERE id = (
           SELECT id FROM queue_tickets 
           WHERE department_id = $4 AND status = $5
           ORDER BY position ASC
           LIMIT 1
         )
         RETURNING *`,
        [TicketStatus.CALLED, new Date(), new Date(), departmentId, TicketStatus.WAITING]
      );
      
      await client.query('COMMIT');
      
      if (result.rows.length > 0) {
        const ticket = this.mapDatabaseRowToTicket(result.rows[0]);
        
        // Update Redis cache
        await this.updateQueueCache(departmentId);
        
        return ticket;
      }
      
      return null;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Complete a ticket
  async completeTicket(ticketId: string): Promise<QueueTicket | null> {
    const result = await pool.query(
      `UPDATE queue_tickets 
       SET status = $1, completed_at = $2, updated_at = $3
       WHERE id = $4
       RETURNING *`,
      [TicketStatus.COMPLETED, new Date(), new Date(), ticketId]
    );
    
    if (result.rows.length > 0) {
      const ticket = this.mapDatabaseRowToTicket(result.rows[0]);
      
      // Update Redis cache
      await this.updateQueueCache(ticket.departmentId);
      
      return ticket;
    }
    
    return null;
  }
  
  // Handle missed ticket (requeue or remove)
  async handleMissedTicket(ticketId: string): Promise<QueueTicket | null> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get current ticket info
      const ticketResult = await client.query(
        'SELECT * FROM queue_tickets WHERE id = $1',
        [ticketId]
      );
      
      if (ticketResult.rows.length === 0) {
        return null;
      }
      
      const ticket = this.mapDatabaseRowToTicket(ticketResult.rows[0]);
      
      if (ticket.missedCount >= 1) {
        // Remove from queue entirely
        await client.query(
          'UPDATE queue_tickets SET status = $1, updated_at = $2 WHERE id = $3',
          [TicketStatus.CANCELLED, new Date(), ticketId]
        );
        
        await client.query('COMMIT');
        return { ...ticket, status: TicketStatus.CANCELLED };
      } else {
        // Requeue at the end
        const newPositionResult = await client.query(
          'SELECT COALESCE(MAX(position), 0) + 1 as next_position FROM queue_tickets WHERE department_id = $1 AND status = $2',
          [ticket.departmentId, TicketStatus.WAITING]
        );
        
        const newPosition = newPositionResult.rows[0].next_position;
        const newEstimatedWaitTime = await this.calculateEstimatedWaitTime(ticket.departmentId, newPosition);
        
        await client.query(
          `UPDATE queue_tickets 
           SET status = $1, position = $2, estimated_wait_time = $3, missed_count = $4, last_missed_at = $5, updated_at = $6
           WHERE id = $7`,
          [
            TicketStatus.WAITING,
            newPosition,
            newEstimatedWaitTime,
            ticket.missedCount + 1,
            new Date(),
            new Date(),
            ticketId
          ]
        );
        
        await client.query('COMMIT');
        
        // Update Redis cache
        await this.updateQueueCache(ticket.departmentId);
        
        return { ...ticket, position: newPosition, estimatedWaitTime: newEstimatedWaitTime, missedCount: ticket.missedCount + 1 };
      }
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Get queue statistics for a department
  async getQueueStats(departmentId: string): Promise<QueueStats> {
    const result = await pool.query(
      `SELECT 
         COUNT(*) as total_waiting,
         AVG(estimated_wait_time) as average_wait_time,
         MIN(position) as current_position
       FROM queue_tickets 
       WHERE department_id = $1 AND status = $2`,
      [departmentId, TicketStatus.WAITING]
    );
    
    const stats = result.rows[0];
    
    return {
      departmentId,
      totalWaiting: parseInt(stats.total_waiting) || 0,
      averageWaitTime: parseFloat(stats.average_wait_time) || 0,
      currentPosition: parseInt(stats.current_position) || 0,
      estimatedWaitTime: parseFloat(stats.average_wait_time) || 0
    };
  }
  
  // Get all active tickets for a user
  async getUserTickets(userId: string): Promise<QueueTicket[]> {
    const result = await pool.query(
      `SELECT qt.*, d.name as department_name 
       FROM queue_tickets qt
       JOIN departments d ON qt.department_id = d.id
       WHERE qt.user_id = $1 AND qt.status IN ($2, $3)
       ORDER BY qt.created_at DESC`,
      [userId, TicketStatus.WAITING, TicketStatus.CALLED]
    );
    
    return result.rows.map(row => this.mapDatabaseRowToTicket(row));
  }
  
  // Calculate estimated wait time based on position and department average
  private async calculateEstimatedWaitTime(departmentId: string, position: number): Promise<number> {
    const result = await pool.query(
      'SELECT estimated_time_per_patient FROM departments WHERE id = $1',
      [departmentId]
    );
    
    if (result.rows.length === 0) {
      return 30; // Default 30 minutes
    }
    
    const timePerPatient = result.rows[0].estimated_time_per_patient;
    return position * timePerPatient;
  }
  
  // Update Redis cache for real-time queue updates
  private async updateQueueCache(departmentId: string): Promise<void> {
    try {
      const stats = await this.getQueueStats(departmentId);
      await redisClient.set(`queue:${departmentId}`, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to update Redis cache:', error);
    }
  }
  
  // Map database row to QueueTicket interface
  private mapDatabaseRowToTicket(row: any): QueueTicket {
    return {
      id: row.id,
      ticketNumber: row.ticket_number,
      userId: row.user_id,
      departmentId: row.department_id,
      status: row.status,
      position: row.position,
      estimatedWaitTime: row.estimated_wait_time,
      qrCode: row.qr_code,
      joinedAt: row.joined_at,
      calledAt: row.called_at,
      completedAt: row.completed_at,
      missedCount: row.missed_count,
      lastMissedAt: row.last_missed_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
} 