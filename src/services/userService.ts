// User management API service
import api from './api';
import type { 
  User, 
  UserStatus, 
  UserType,
  PaginatedResponse,
  ApiResponse 
} from '../types';

interface UpdateUserProfileDto {
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: string;
}

interface ChangePasswordDto {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

interface UpdateUserStatusDto {
  userId: string;
  status: UserStatus;
  reason?: string;
}

interface VerifyUserDto {
  userId: string;
  verificationType: string;
  notes?: string;
}

class UserService {
  private readonly BASE_URL = '/user';

  /**
   * GET /api/user/{id}
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    try {
      const response = await api.get<User>(`${this.BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }

  /**
   * GET /api/user/email/{email}
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      const response = await api.get<User>(`${this.BASE_URL}/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Get user by email error:', error);
      throw error;
    }
  }

  /**
   * GET /api/user
   * Get all users (Admin only)
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>(`${this.BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  }

  /**
   * GET /api/user/status/{status}
   * Get users by status
   */
  async getUsersByStatus(status: UserStatus): Promise<User[]> {
    try {
      const response = await api.get<User[]>(`${this.BASE_URL}/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Get users by status error:', error);
      throw error;
    }
  }

  /**
   * GET /api/user/type/{userType}
   * Get users by type
   */
  async getUsersByType(userType: UserType): Promise<User[]> {
    try {
      const response = await api.get<User[]>(`${this.BASE_URL}/type/${userType}`);
      return response.data;
    } catch (error) {
      console.error('Get users by type error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/user/{id}/profile
   * Update user profile
   */
  async updateProfile(profileData: UpdateUserProfileDto): Promise<User> {
    try {
      const response = await api.put<User>(`${this.BASE_URL}/${profileData.userId}/profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  /**
   * POST /api/user/{id}/change-password
   * Change user password
   */
  async changePassword(passwordData: ChangePasswordDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`${this.BASE_URL}/${passwordData.userId}/change-password`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/user/{id}/status
   * Update user status (Admin only)
   */
  async updateStatus(statusData: UpdateUserStatusDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(`${this.BASE_URL}/${statusData.userId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Update status error:', error);
      throw error;
    }
  }

  /**
   * POST /api/user/{id}/verify
   * Verify user (Admin only)
   */
  async verifyUser(verifyData: VerifyUserDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`${this.BASE_URL}/${verifyData.userId}/verify`, verifyData);
      return response.data;
    } catch (error) {
      console.error('Verify user error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/user/{id}
   * Delete user (Admin only)
   */
  async deleteUser(userId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;