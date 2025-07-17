import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { User, RegisterRequest, LoginRequest, AuthResponse } from '../types';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production';
  private readonly JWT_EXPIRES_IN = '7d';

  // Register a new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const client = await pool.connect();
    
    try {
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );
      
      if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      
      // Insert new user
      const result = await client.query(
        `INSERT INTO users (name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, phone, role, created_at, updated_at`,
        [
          userData.name,
          userData.email,
          hashedPassword,
          userData.phone || null,
          userData.role || 'user'
        ]
      );
      
      const user = this.mapDatabaseRowToUser(result.rows[0]);
      const token = this.generateToken(user);
      
      return {
        user,
        token
      };
    } finally {
      client.release();
    }
  }

  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const client = await pool.connect();
    
    try {
      // Find user by email
      const result = await client.query(
        'SELECT id, name, email, password, phone, role, created_at, updated_at FROM users WHERE email = $1',
        [credentials.email]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
      }
      
      const userData = result.rows[0];
      
      // Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, userData.password);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      
      const user = this.mapDatabaseRowToUser(userData);
      const token = this.generateToken(user);
      
      return {
        user,
        token
      };
    } finally {
      client.release();
    }
  }

  // Get current user by token
  async getCurrentUser(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      const client = await pool.connect();
      
      try {
        const result = await client.query(
          'SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = $1',
          [decoded.userId]
        );
        
        if (result.rows.length === 0) {
          throw new Error('User not found');
        }
        
        return this.mapDatabaseRowToUser(result.rows[0]);
      } finally {
        client.release();
      }
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Generate JWT token
  private generateToken(user: User): string {
    return jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  // Map database row to User object
  private mapDatabaseRowToUser(row: any): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
} 