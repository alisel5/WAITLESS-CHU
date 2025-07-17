import { Router } from 'express';
import { QueueService } from '../services/queueService';
import { ApiResponse, CreateTicketRequest, UpdateTicketRequest } from '../types';

const router = Router();
const queueService = new QueueService();

// Create a new ticket and join queue
router.post('/tickets', async (req, res) => {
  try {
    const { userId, departmentId }: CreateTicketRequest = req.body;
    
    if (!userId || !departmentId) {
      return res.status(400).json({
        success: false,
        error: 'userId and departmentId are required'
      } as ApiResponse<null>);
    }
    
    const ticket = await queueService.createTicket({ userId, departmentId });
    
    res.status(201).json({
      success: true,
      data: ticket,
      message: 'Ticket created successfully'
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create ticket'
    } as ApiResponse<null>);
  }
});

// Get ticket by ID
router.get('/tickets/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await queueService.getTicketById(ticketId);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error getting ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get ticket'
    } as ApiResponse<null>);
  }
});

// Get ticket by QR code
router.post('/tickets/qr', async (req, res) => {
  try {
    const { qrCodeData } = req.body;
    
    if (!qrCodeData) {
      return res.status(400).json({
        success: false,
        error: 'qrCodeData is required'
      } as ApiResponse<null>);
    }
    
    const ticket = await queueService.getTicketByQRCode(qrCodeData);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error getting ticket by QR:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get ticket'
    } as ApiResponse<null>);
  }
});

// Update ticket status
router.patch('/tickets/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updates: UpdateTicketRequest = req.body;
    
    const ticket = await queueService.updateTicket(ticketId, updates);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket,
      message: 'Ticket updated successfully'
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update ticket'
    } as ApiResponse<null>);
  }
});

// Call next ticket in queue (for staff)
router.post('/departments/:departmentId/call-next', async (req, res) => {
  try {
    const { departmentId } = req.params;
    const ticket = await queueService.callNextTicket(departmentId);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'No tickets waiting in queue'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket,
      message: 'Next ticket called'
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error calling next ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to call next ticket'
    } as ApiResponse<null>);
  }
});

// Complete a ticket
router.post('/tickets/:ticketId/complete', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await queueService.completeTicket(ticketId);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket,
      message: 'Ticket completed'
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error completing ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to complete ticket'
    } as ApiResponse<null>);
  }
});

// Handle missed ticket
router.post('/tickets/:ticketId/missed', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await queueService.handleMissedTicket(ticketId);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: ticket,
      message: ticket.status === 'cancelled' ? 'Ticket removed from queue' : 'Ticket requeued'
    } as ApiResponse<typeof ticket>);
  } catch (error) {
    console.error('Error handling missed ticket:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to handle missed ticket'
    } as ApiResponse<null>);
  }
});

// Get queue statistics for a department
router.get('/departments/:departmentId/stats', async (req, res) => {
  try {
    const { departmentId } = req.params;
    const stats = await queueService.getQueueStats(departmentId);
    
    res.json({
      success: true,
      data: stats
    } as ApiResponse<typeof stats>);
  } catch (error) {
    console.error('Error getting queue stats:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get queue statistics'
    } as ApiResponse<null>);
  }
});

// Get user's active tickets
router.get('/users/:userId/tickets', async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await queueService.getUserTickets(userId);
    
    res.json({
      success: true,
      data: tickets
    } as ApiResponse<typeof tickets>);
  } catch (error) {
    console.error('Error getting user tickets:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get user tickets'
    } as ApiResponse<null>);
  }
});

export default router; 