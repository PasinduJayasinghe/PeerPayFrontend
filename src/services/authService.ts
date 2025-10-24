// Authentication API service
import api from './api';
import type { 
  LoginDto, 
  LoginResponseDto, 
  RegisterStudentDto, 
  RegisterEmployerDto,
  UserResponseDto,
  ApiResponse 
} from '../types';

class AuthService {
  private readonly BASE_URL = '/user';

  /**
   * POST /api/user/login
   * Authenticate user with email/phone and password
   */
  async login(credentials: LoginDto): Promise<LoginResponseDto> {
    try {
      const response = await api.post<LoginResponseDto>(`${this.BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * POST /api/student/register
   * Register a new student
   */
  async registerStudent(studentData: RegisterStudentDto): Promise<UserResponseDto> {
    try {
      const response = await api.post<UserResponseDto>('/student/register', studentData);
      return response.data;
    } catch (error) {
      console.error('Student registration error:', error);
      throw error;
    }
  }

  /**
   * POST /api/employer/register
   * Register a new employer
   */
  async registerEmployer(employerData: RegisterEmployerDto): Promise<UserResponseDto> {
    try {
      const response = await api.post<UserResponseDto>('/employer/register', employerData);
      return response.data;
    } catch (error) {
      console.error('Employer registration error:', error);
      throw error;
    }
  }

  /**
   * POST /api/auth/logout
   * Logout user (client-side for now)
   */
  async logout(): Promise<void> {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * GET /api/auth/verify-token
   * Verify if current token is valid
   */
  async verifyToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;
      
      // Make a request to verify token validity
      await api.get('/user/verify-token');
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * POST /api/auth/forgot-password
   * Send password reset email
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * POST /api/auth/reset-password
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * POST /api/otp/send-otp
   * Send OTP for email verification
   */
  async sendOtp(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<ApiResponse<void>>('/otp/send-otp', { email });
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  /**
   * POST /api/otp/verify-otp
   * Verify OTP code
   */
  async verifyOtp(email: string, otp: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<ApiResponse<void>>('/otp/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
export default authService;