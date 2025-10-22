// Notification management API service
import api from './api';
import type { 
  Notification, 
  NotificationType,
  PaginatedResponse,
  ApiResponse 
} from '../types';

interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedEntityId?: string;
}

interface NotificationListParams {
  page?: number;
  pageSize?: number;
  isRead?: boolean;
  type?: NotificationType;
}

class NotificationService {
  private readonly BASE_URL = '/notification';

  /**
   * POST /api/notification
   * Create a new notification
   */
  async createNotification(notificationData: CreateNotificationDto): Promise<Notification> {
    try {
      const response = await api.post<Notification>(`${this.BASE_URL}`, notificationData);
      return response.data;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error;
    }
  }

  /**
   * GET /api/notification/{id}
   * Get notification by ID
   */
  async getNotificationById(notificationId: string): Promise<Notification> {
    try {
      const response = await api.get<Notification>(`${this.BASE_URL}/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Get notification by ID error:', error);
      throw error;
    }
  }

  /**
   * GET /api/notification/user/{userId}
   * Get user notifications with pagination
   */
  async getUserNotifications(userId: string, params: NotificationListParams = {}): Promise<PaginatedResponse<Notification>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.isRead !== undefined) queryParams.append('isRead', params.isRead.toString());
      if (params.type) queryParams.append('type', params.type);

      const response = await api.get<PaginatedResponse<Notification>>(`${this.BASE_URL}/user/${userId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get user notifications error:', error);
      throw error;
    }
  }

  /**
   * GET /api/notification/user/{userId}/unread
   * Get unread notifications for user
   */
  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    try {
      const response = await api.get<Notification[]>(`${this.BASE_URL}/user/${userId}/unread`);
      return response.data;
    } catch (error) {
      console.error('Get unread notifications error:', error);
      throw error;
    }
  }

  /**
   * GET /api/notification/user/{userId}/unread-count
   * Get unread notifications count
   */
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const response = await api.get<{ count: number }>(`${this.BASE_URL}/user/${userId}/unread-count`);
      return response.data.count;
    } catch (error) {
      console.error('Get unread count error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/notification/{id}/read
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(`${this.BASE_URL}/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Mark as read error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/notification/user/{userId}/read-all
   * Mark all notifications as read for user
   */
  async markAllAsRead(userId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(`${this.BASE_URL}/user/${userId}/read-all`);
      return response.data;
    } catch (error) {
      console.error('Mark all as read error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/notification/{id}
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Delete notification error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/notification/user/{userId}/clear-all
   * Clear all notifications for user
   */
  async clearAllNotifications(userId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/user/${userId}/clear-all`);
      return response.data;
    } catch (error) {
      console.error('Clear all notifications error:', error);
      throw error;
    }
  }

  /**
   * GET /api/notification/user/{userId}/settings
   * Get notification preferences
   */
  async getNotificationSettings(userId: string): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/user/${userId}/settings`);
      return response.data;
    } catch (error) {
      console.error('Get notification settings error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/notification/user/{userId}/settings
   * Update notification preferences
   */
  async updateNotificationSettings(userId: string, settings: any): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(`${this.BASE_URL}/user/${userId}/settings`, settings);
      return response.data;
    } catch (error) {
      console.error('Update notification settings error:', error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;