import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  User, 
  Department, 
  QueueTicket, 
  QueueStats, 
  CreateTicketRequest, 
  UpdateTicketRequest,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data!;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return response.data.data!;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.api.get<ApiResponse<User>>('/auth/me');
    return response.data.data!;
  }

  // Queue endpoints
  async createTicket(request: CreateTicketRequest): Promise<QueueTicket> {
    const response = await this.api.post<ApiResponse<QueueTicket>>('/queue/tickets', request);
    return response.data.data!;
  }

  async getTicketById(ticketId: string): Promise<QueueTicket> {
    const response = await this.api.get<ApiResponse<QueueTicket>>(`/queue/tickets/${ticketId}`);
    return response.data.data!;
  }

  async getTicketByQRCode(qrCodeData: string): Promise<QueueTicket> {
    const response = await this.api.post<ApiResponse<QueueTicket>>('/queue/tickets/qr', { qrCodeData });
    return response.data.data!;
  }

  async updateTicket(ticketId: string, updates: UpdateTicketRequest): Promise<QueueTicket> {
    const response = await this.api.patch<ApiResponse<QueueTicket>>(`/queue/tickets/${ticketId}`, updates);
    return response.data.data!;
  }

  async callNextTicket(departmentId: string): Promise<QueueTicket> {
    const response = await this.api.post<ApiResponse<QueueTicket>>(`/queue/departments/${departmentId}/call-next`);
    return response.data.data!;
  }

  async completeTicket(ticketId: string): Promise<QueueTicket> {
    const response = await this.api.post<ApiResponse<QueueTicket>>(`/queue/tickets/${ticketId}/complete`);
    return response.data.data!;
  }

  async handleMissedTicket(ticketId: string): Promise<QueueTicket> {
    const response = await this.api.post<ApiResponse<QueueTicket>>(`/queue/tickets/${ticketId}/missed`);
    return response.data.data!;
  }

  async getQueueStats(departmentId: string): Promise<QueueStats> {
    const response = await this.api.get<ApiResponse<QueueStats>>(`/queue/departments/${departmentId}/stats`);
    return response.data.data!;
  }

  async getUserTickets(userId: string): Promise<QueueTicket[]> {
    const response = await this.api.get<ApiResponse<QueueTicket[]>>(`/queue/users/${userId}/tickets`);
    return response.data.data!;
  }

  // Department endpoints
  async getDepartments(): Promise<Department[]> {
    const response = await this.api.get<ApiResponse<Department[]>>('/departments');
    return response.data.data!;
  }

  async getDepartmentById(departmentId: string): Promise<Department> {
    const response = await this.api.get<ApiResponse<Department>>(`/departments/${departmentId}`);
    return response.data.data!;
  }

  // Health check
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 