// API service functions for connecting to the backend
// Your teammate will implement these functions

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Queue Management API calls
export const queueApi = {
  // Create a new ticket
  createTicket: async (userId: string, departmentId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, departmentId })
    });
    return response.json();
  },

  // Get ticket by ID
  getTicket: async (ticketId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets/${ticketId}`);
    return response.json();
  },

  // Get ticket by QR code
  getTicketByQR: async (qrCodeData: string) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrCodeData })
    });
    return response.json();
  },

  // Update ticket status
  updateTicket: async (ticketId: string, updates: any) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  // Complete a ticket
  completeTicket: async (ticketId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets/${ticketId}/complete`, {
      method: 'POST'
    });
    return response.json();
  },

  // Handle missed ticket
  handleMissedTicket: async (ticketId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/tickets/${ticketId}/missed`, {
      method: 'POST'
    });
    return response.json();
  }
};

// Department API calls
export const departmentApi = {
  // Call next ticket in queue
  callNextTicket: async (departmentId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/departments/${departmentId}/call-next`, {
      method: 'POST'
    });
    return response.json();
  },

  // Get queue statistics
  getStats: async (departmentId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/departments/${departmentId}/stats`);
    return response.json();
  }
};

// User API calls
export const userApi = {
  // Get user's active tickets
  getUserTickets: async (userId: string) => {
    const response = await fetch(`${API_BASE}/api/queue/users/${userId}/tickets`);
    return response.json();
  }
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE}/health`);
  return response.json();
};

// Example usage:
/*
import { queueApi, departmentApi } from './api';

// Create a ticket
const createTicket = async () => {
  try {
    const result = await queueApi.createTicket('user-123', 'dept-456');
    if (result.success) {
      console.log('Ticket created:', result.data);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('API call failed:', error);
  }
};

// Get queue stats
const getStats = async () => {
  try {
    const result = await departmentApi.getStats('dept-456');
    if (result.success) {
      console.log('Queue stats:', result.data);
    }
  } catch (error) {
    console.error('API call failed:', error);
  }
};
*/ 