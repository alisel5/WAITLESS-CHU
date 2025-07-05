export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  estimatedTimePerPatient: number; // in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueueTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  departmentId: string;
  status: TicketStatus;
  position: number;
  estimatedWaitTime: number; // in minutes
  qrCode: string;
  joinedAt: Date;
  calledAt?: Date;
  completedAt?: Date;
  missedCount: number;
  lastMissedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketStatus {
  WAITING = 'waiting',
  CALLED = 'called',
  COMPLETED = 'completed',
  MISSED = 'missed',
  CANCELLED = 'cancelled'
}

export interface QueuePosition {
  departmentId: string;
  currentPosition: number;
  totalWaiting: number;
  estimatedWaitTime: number;
  lastUpdated: Date;
}

export interface Notification {
  id: string;
  userId: string;
  ticketId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  TICKET_CREATED = 'ticket_created',
  POSITION_UPDATE = 'position_update',
  TICKET_CALLED = 'ticket_called',
  TICKET_MISSED = 'ticket_missed',
  TICKET_COMPLETED = 'ticket_completed'
}

export interface CreateTicketRequest {
  userId: string;
  departmentId: string;
}

export interface UpdateTicketRequest {
  status?: TicketStatus;
  position?: number;
  estimatedWaitTime?: number;
}

export interface QueueStats {
  departmentId: string;
  totalWaiting: number;
  averageWaitTime: number;
  currentPosition: number;
  estimatedWaitTime: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 