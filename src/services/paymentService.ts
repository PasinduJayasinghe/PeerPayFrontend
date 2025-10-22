// Payment and Stripe integration API service
import api from './api';
import type { 
  Payment, 
  PaymentIntent, 
  PaymentStatus,
  PaginatedResponse,
  ApiResponse 
} from '../types';

interface CreatePaymentDto {
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  currency: string;
  notes?: string;
}

interface ConfirmPaymentDto {
  paymentId: string;
  paymentIntentId: string;
}

interface RefundPaymentDto {
  paymentId: string;
  amount?: number;
  reason?: string;
}

interface PaymentListParams {
  page?: number;
  pageSize?: number;
  status?: PaymentStatus;
  startDate?: string;
  endDate?: string;
}

class PaymentService {
  private readonly BASE_URL = '/payment';

  /**
   * POST /api/payment/create
   * Create a new payment intent
   */
  async createPayment(paymentData: CreatePaymentDto): Promise<PaymentIntent> {
    try {
      const response = await api.post<PaymentIntent>(`${this.BASE_URL}/create`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Create payment error:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/confirm
   * Confirm payment after Stripe processing
   */
  async confirmPayment(confirmData: ConfirmPaymentDto): Promise<Payment> {
    try {
      const response = await api.post<Payment>(`${this.BASE_URL}/confirm`, confirmData);
      return response.data;
    } catch (error) {
      console.error('Confirm payment error:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/refund
   * Refund a completed payment
   */
  async refundPayment(refundData: RefundPaymentDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`${this.BASE_URL}/refund`, refundData);
      return response.data;
    } catch (error) {
      console.error('Refund payment error:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/{id}/cancel
   * Cancel a pending payment
   */
  async cancelPayment(paymentId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`${this.BASE_URL}/${paymentId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Cancel payment error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/{id}
   * Get payment by ID
   */
  async getPaymentById(paymentId: string): Promise<Payment> {
    try {
      const response = await api.get<Payment>(`${this.BASE_URL}/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Get payment by ID error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/job/{jobId}
   * Get payment for a specific job
   */
  async getPaymentByJob(jobId: string): Promise<Payment> {
    try {
      const response = await api.get<Payment>(`${this.BASE_URL}/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Get payment by job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/employer/{employerId}
   * Get all payments made by an employer
   */
  async getEmployerPayments(employerId: string, params: PaymentListParams = {}): Promise<PaginatedResponse<Payment>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const response = await api.get<PaginatedResponse<Payment>>(`${this.BASE_URL}/employer/${employerId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get employer payments error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/student/{studentId}
   * Get all payments received by a student
   */
  async getStudentPayments(studentId: string, params: PaymentListParams = {}): Promise<PaginatedResponse<Payment>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const response = await api.get<PaginatedResponse<Payment>>(`${this.BASE_URL}/student/${studentId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get student payments error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/status/{status}
   * Get payments by status
   */
  async getPaymentsByStatus(status: PaymentStatus, params: PaymentListParams = {}): Promise<Payment[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const response = await api.get<Payment[]>(`${this.BASE_URL}/status/${status}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get payments by status error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/intent/{paymentIntentId}/status
   * Get Stripe payment intent status
   */
  async getPaymentIntentStatus(paymentIntentId: string): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/intent/${paymentIntentId}/status`);
      return response.data;
    } catch (error) {
      console.error('Get payment intent status error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/statistics/employer/{employerId}
   * Get payment statistics for employer
   */
  async getEmployerPaymentStats(employerId: string): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/statistics/employer/${employerId}`);
      return response.data;
    } catch (error) {
      console.error('Get employer payment stats error:', error);
      throw error;
    }
  }

  /**
   * GET /api/payment/statistics/student/{studentId}
   * Get payment statistics for student
   */
  async getStudentPaymentStats(studentId: string): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/statistics/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Get student payment stats error:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/webhook/stripe
   * Handle Stripe webhook (internal use)
   */
  async handleStripeWebhook(payload: any): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>('/stripewebhook', payload);
      return response.data;
    } catch (error) {
      console.error('Handle stripe webhook error:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
export default paymentService;