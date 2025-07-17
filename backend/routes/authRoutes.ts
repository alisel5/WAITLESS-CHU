import { Router } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse, RegisterRequest, LoginRequest, AuthResponse, User } from '../types';

const router = Router();
const authService = new AuthService();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const userData: RegisterRequest = req.body;
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      } as ApiResponse<null>);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      } as ApiResponse<null>);
    }
    
    // Validate password length
    if (userData.password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      } as ApiResponse<null>);
    }
    
    const authResponse = await authService.register(userData);
    
    res.status(201).json({
      success: true,
      data: authResponse,
      message: 'User registered successfully'
    } as ApiResponse<AuthResponse>);
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to register user'
    } as ApiResponse<null>);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const credentials: LoginRequest = req.body;
    
    // Validate required fields
    if (!credentials.email || !credentials.password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      } as ApiResponse<null>);
    }
    
    const authResponse = await authService.login(credentials);
    
    res.json({
      success: true,
      data: authResponse,
      message: 'Login successful'
    } as ApiResponse<AuthResponse>);
  } catch (error: any) {
    console.error('Error logging in:', error);
    return res.status(401).json({
      success: false,
      error: error.message || 'Invalid credentials'
    } as ApiResponse<null>);
  }
});

// Get current user (protected route)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      } as ApiResponse<null>);
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const user = await authService.getCurrentUser(token);
    
    res.json({
      success: true,
      data: user
    } as ApiResponse<User>);
  } catch (error: any) {
    console.error('Error getting current user:', error);
    return res.status(401).json({
      success: false,
      error: error.message || 'Invalid token'
    } as ApiResponse<null>);
  }
});

export default router; 