// Message and conversation API service
import api from './api';
import type { 
  Message, 
  Conversation,
  ApiResponse 
} from '../types';

interface SendMessageDto {
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
}

interface CreateConversationDto {
  participantIds: string[];
  jobId?: string;
}

class MessageService {
  private readonly BASE_URL = '/message';
  private readonly CONVERSATION_URL = '/conversation';

  // ============ MESSAGES ============

  /**
   * POST /api/message
   * Send a new message
   */
  async sendMessage(messageData: SendMessageDto): Promise<any> {
    try {
      const response = await api.post<any>(`${this.BASE_URL}`, messageData);
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  /**
   * GET /api/message/{id}
   * Get message by ID
   */
  async getMessageById(messageId: string): Promise<Message> {
    try {
      const response = await api.get<Message>(`${this.BASE_URL}/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Get message by ID error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/message/{id}/read
   * Mark message as read
   */
  async markMessageAsRead(messageId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(`${this.BASE_URL}/${messageId}/read`);
      return response.data;
    } catch (error) {
      console.error('Mark message as read error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/message/conversation/{conversationId}/read
   * Mark all messages in conversation as read
   */
  async markConversationAsRead(conversationId: string, userId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.put<ApiResponse<boolean>>(
        `${this.BASE_URL}/conversation/${conversationId}/read`,
        null,
        { params: { userId } }
      );
      return response.data;
    } catch (error) {
      console.error('Mark conversation as read error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/message/{id}
   * Delete message
   */
  async deleteMessage(messageId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Delete message error:', error);
      throw error;
    }
  }

  /**
   * GET /api/message/conversation/{conversationId}
   * Get messages in a conversation
   */
  async getConversationMessages(
    conversationId: string, 
    userId: string,
    pageNumber: number = 1,
    pageSize: number = 50
  ): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/conversation/${conversationId}`, {
        params: { userId, pageNumber, pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Get conversation messages error:', error);
      throw error;
    }
  }

  /**
   * GET /api/message/unread/{userId}
   * Get unread messages for user
   */
  async getUnreadMessages(userId: string): Promise<Message[]> {
    try {
      const response = await api.get<Message[]>(`${this.BASE_URL}/unread/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get unread messages error:', error);
      throw error;
    }
  }

  /**
   * GET /api/message/search
   * Search messages in conversation
   */
  async searchMessages(conversationId: string, searchTerm: string): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/search`, {
        params: { conversationId, searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Search messages error:', error);
      throw error;
    }
  }

  // ============ CONVERSATIONS ============

  /**
   * POST /api/conversation
   * Create a new conversation
   */
  async createConversation(conversationData: CreateConversationDto): Promise<Conversation> {
    try {
      const response = await api.post<Conversation>(`${this.CONVERSATION_URL}`, conversationData);
      return response.data;
    } catch (error) {
      console.error('Create conversation error:', error);
      throw error;
    }
  }

  /**
   * GET /api/conversation/{id}
   * Get conversation by ID
   */
  async getConversationById(conversationId: string): Promise<Conversation> {
    try {
      const response = await api.get<Conversation>(`${this.CONVERSATION_URL}/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Get conversation by ID error:', error);
      throw error;
    }
  }

  /**
   * GET /api/conversation/user/{userId}
   * Get user conversations
   */
  async getUserConversations(userId: string): Promise<any[]> {
    try {
      const response = await api.get<any[]>(`${this.CONVERSATION_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get user conversations error:', error);
      throw error;
    }
  }

  /**
   * GET /api/conversation/job/{jobId}
   * Get conversations for a job
   */
  async getJobConversations(jobId: string): Promise<Conversation[]> {
    try {
      const response = await api.get<Conversation[]>(`${this.CONVERSATION_URL}/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Get job conversations error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/conversation/{id}
   * Delete conversation
   */
  async deleteConversation(conversationId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.CONVERSATION_URL}/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Delete conversation error:', error);
      throw error;
    }
  }

  /**
   * POST /api/conversation/find-or-create
   * Find existing conversation or create new one
   */
  async findOrCreateConversation(participantIds: string[], jobId?: string): Promise<Conversation> {
    try {
      const response = await api.post<Conversation>(`${this.CONVERSATION_URL}/find-or-create`, {
        participantIds,
        jobId
      });
      return response.data;
    } catch (error) {
      console.error('Find or create conversation error:', error);
      throw error;
    }
  }
}

export const messageService = new MessageService();
export default messageService;