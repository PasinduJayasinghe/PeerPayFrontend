// src/services/adminService.ts
import api from './api';

// ============ TYPES ============
export interface DashboardStats {
  totalEmployers: number;
  totalStudents: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  verifiedEmployers: number;
  verifiedStudents: number;
}

export interface EmployerAccount {
  employerId: string;
  userId: string;
  name: string;
  email: string;
  companyName: string;
  companyType: string;
  verificationStatus: string;
  rating: number;
  jobsPosted: number;
  createdAt: string;
  status: string;
}

export interface StudentAccount {
  studentId: string;
  userId: string;
  name: string;
  email: string;
  university: string;
  course: string;
  yearOfStudy: number;
  academicVerificationStatus: string;
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  createdAt: string;
  status: string;
}

export interface JobDetails {
  jobId: string;
  title: string;
  description: string;
  employerId: string;
  employerName: string;
  categoryId: string;
  categoryName: string;
  payAmount: number;
  payType: string;
  location: string;
  jobType: string;
  status: string;
  postedDate: string;
  deadline: string;
  requiredSkills: string[];
  applicationCount: number;
}

export interface JobApplicationDetails {
  id: string;
  jobId: string;
  jobTitle: string;
  employerName: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  university?: string;
  course?: string;
  appliedAt: string;
  status: string;
  coverLetter: string;
  statusUpdatedAt: string;
  employerNotes?: string;
}

export interface AdminDashboardData {
  statistics: DashboardStats;
  recentEmployers: EmployerAccount[];
  recentStudents: StudentAccount[];
  recentJobs: JobDetails[];
  recentApplications: JobApplicationDetails[];
}

export interface RecentActivity {
  id: number;
  type: 'user_registration' | 'job_posted' | 'payment' | 'dispute' | 'verification' | 'flagged_content';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface ChartData {
  month: string;
  users: number;
  jobs: number;
  revenue: number;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Employer' | 'Admin';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Banned';
  createdAt: string;
  lastLogin?: string;
  isVerified: boolean;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userType: 'Student' | 'Employer';
  email: string;
  submittedAt: string;
  documents: VerificationDocument[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface FlaggedContent {
  id: string;
  contentType: 'Job Posting' | 'Review' | 'Message';
  contentId: string;
  title?: string;
  content?: string;
  reason: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'approved' | 'removed';
}

export interface DisputeCase {
  id: string;
  jobId: string;
  jobTitle: string;
  studentId: string;
  studentName: string;
  employerId: string;
  employerName: string;
  reason: string;
  description: string;
  createdAt: string;
  status: 'open' | 'in_review' | 'resolved' | 'closed';
  escrowAmount: number;
}

export interface JobPosting {
  id: string;
  title: string;
  employerId: string;
  employerName: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  createdAt: string;
  budget: number;
}

export interface PaymentTransaction {
  id: string;
  jobId: string;
  jobTitle: string;
  amount: number;
  from: string;
  to: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  timestamp: string;
  type: 'Payment' | 'Refund' | 'Escrow Release';
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  source: string;
  details?: string;
}

export interface PlatformSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  platformFeePercentage: number;
  minWithdrawalAmount: number;
  maxJobBudget: number;
  emailNotifications: boolean;
  autoVerification: boolean;
}

// ============ API SERVICE ============
class AdminService {
  private readonly BASE_URL = '/admin';

  // ============ DASHBOARD ============
  /**
   * GET /api/admin/dashboard
   * Fetch complete dashboard data with statistics and recent items
   */
  async getDashboardData(recentItemsCount: number = 10): Promise<AdminDashboardData> {
    try {
      const response = await api.get<AdminDashboardData>(`${this.BASE_URL}/dashboard`, {
        params: { recentItemsCount },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/dashboard/stats (backwards compatibility)
   * Fetch dashboard statistics only
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const dashboardData = await this.getDashboardData(10);
      return dashboardData.statistics;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/employers
   * Fetch all employer accounts
   */
  async getAllEmployers(): Promise<EmployerAccount[]> {
    try {
      const response = await api.get<EmployerAccount[]>(`${this.BASE_URL}/employers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employers:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/students
   * Fetch all student accounts
   */
  async getAllStudents(): Promise<StudentAccount[]> {
    try {
      const response = await api.get<StudentAccount[]>(`${this.BASE_URL}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/jobs
   * Fetch all jobs
   */
  async getAllJobs(): Promise<JobDetails[]> {
    try {
      const response = await api.get<JobDetails[]>(`${this.BASE_URL}/jobs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/applications
   * Fetch all job applications
   */
  async getAllApplications(): Promise<JobApplicationDetails[]> {
    try {
      const response = await api.get<JobApplicationDetails[]>(`${this.BASE_URL}/applications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/dashboard/activities
   * Fetch recent platform activities
   */
  async getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    try {
      const response = await api.get<RecentActivity[]>(`${this.BASE_URL}/dashboard/activities`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/dashboard/chart-data
   * Fetch chart data for analytics
   */
  async getChartData(months: number = 6): Promise<ChartData[]> {
    try {
      const response = await api.get<ChartData[]>(`${this.BASE_URL}/dashboard/chart-data`, {
        params: { months },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }

  // ============ USER MANAGEMENT ============
  /**
   * GET /api/admin/users
   * Fetch all users with pagination and filters
   */
  async getUsers(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    type?: 'Student' | 'Employer';
    status?: 'Active' | 'Suspended' | 'Pending';
  }): Promise<{ users: User[]; total: number }> {
    try {
      const response = await api.get<{ users: User[]; total: number }>(`${this.BASE_URL}/users`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/users/:id
   * Fetch user details by ID
   */
  async getUserById(userId: number): Promise<User> {
    try {
      const response = await api.get<User>(`${this.BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  /**
   * PUT /api/admin/users/:id/suspend
   * Suspend a user account
   */
  async suspendUser(userId: number, reason: string): Promise<void> {
    try {
      await api.put(`${this.BASE_URL}/users/${userId}/suspend`, { reason });
    } catch (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  }

  /**
   * PUT /api/admin/users/:id/activate
   * Activate a suspended user account
   */
  async activateUser(userId: number): Promise<void> {
    try {
      await api.put(`${this.BASE_URL}/users/${userId}/activate`);
    } catch (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/admin/users/:id
   * Delete a user account permanently
   */
  async deleteUser(userId: number): Promise<void> {
    try {
      await api.delete(`${this.BASE_URL}/users/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // ============ VERIFICATION ============
  /**
   * GET /api/admin/verifications/pending
   * Fetch pending verification requests
   */
  async getPendingVerifications(): Promise<VerificationRequest[]> {
    try {
      const response = await api.get<VerificationRequest[]>(`${this.BASE_URL}/verifications/pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending verifications:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/verifications/:id
   * Fetch verification request details
   */
  async getVerificationById(verificationId: number): Promise<VerificationRequest> {
    try {
      const response = await api.get<VerificationRequest>(`${this.BASE_URL}/verifications/${verificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching verification:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/verifications/:id/approve
   * Approve a verification request
   */
  async approveVerification(verificationId: number, notes?: string): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/verifications/${verificationId}/approve`, { notes });
    } catch (error) {
      console.error('Error approving verification:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/verifications/:id/reject
   * Reject a verification request
   */
  async rejectVerification(verificationId: number, reason: string): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/verifications/${verificationId}/reject`, { reason });
    } catch (error) {
      console.error('Error rejecting verification:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/verifications/:id/document/:documentId
   * Download verification document
   */
  async downloadVerificationDocument(verificationId: number, documentId: number): Promise<Blob> {
    try {
      const response = await api.get<Blob>(
        `${this.BASE_URL}/verifications/${verificationId}/document/${documentId}`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  }

  // ============ CONTENT MODERATION ============
  /**
   * GET /api/admin/moderation/flagged
   * Fetch flagged content
   */
  async getFlaggedContent(params?: {
    type?: 'Job Posting' | 'Review' | 'Message';
    status?: 'pending' | 'approved' | 'removed';
  }): Promise<FlaggedContent[]> {
    try {
      const response = await api.get<FlaggedContent[]>(`${this.BASE_URL}/moderation/flagged`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching flagged content:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/moderation/flagged/:id
   * Fetch flagged content details
   */
  async getFlaggedContentById(contentId: number): Promise<FlaggedContent> {
    try {
      const response = await api.get<FlaggedContent>(`${this.BASE_URL}/moderation/flagged/${contentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching flagged content:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/moderation/flagged/:id/approve
   * Approve flagged content (keep it visible)
   */
  async approveFlaggedContent(contentId: number, notes?: string): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/moderation/flagged/${contentId}/approve`, { notes });
    } catch (error) {
      console.error('Error approving flagged content:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/moderation/flagged/:id/remove
   * Remove flagged content from platform
   */
  async removeFlaggedContent(contentId: number, reason: string): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/moderation/flagged/${contentId}/remove`, { reason });
    } catch (error) {
      console.error('Error removing flagged content:', error);
      throw error;
    }
  }

  // ============ DISPUTE MANAGEMENT ============
  /**
   * GET /api/admin/disputes
   * Fetch all disputes with filters
   */
  async getDisputes(params?: {
    status?: 'open' | 'in_review' | 'resolved' | 'closed';
    page?: number;
    pageSize?: number;
  }): Promise<{ disputes: DisputeCase[]; total: number }> {
    try {
      const response = await api.get<{ disputes: DisputeCase[]; total: number }>(
        `${this.BASE_URL}/disputes`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching disputes:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/disputes/:id
   * Fetch dispute details
   */
  async getDisputeById(disputeId: number): Promise<DisputeCase> {
    try {
      const response = await api.get<DisputeCase>(`${this.BASE_URL}/disputes/${disputeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dispute:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/disputes/:id/resolve
   * Resolve a dispute
   */
  async resolveDispute(
    disputeId: number,
    resolution: {
      winner: 'student' | 'employer' | 'split';
      studentAmount?: number;
      employerAmount?: number;
      notes: string;
    }
  ): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/disputes/${disputeId}/resolve`, resolution);
    } catch (error) {
      console.error('Error resolving dispute:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/disputes/:id/close
   * Close a dispute without resolution
   */
  async closeDispute(disputeId: number, reason: string): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/disputes/${disputeId}/close`, { reason });
    } catch (error) {
      console.error('Error closing dispute:', error);
      throw error;
    }
  }

  /**
   * PUT /api/admin/disputes/:id/status
   * Update dispute status
   */
  async updateDisputeStatus(
    disputeId: number,
    status: 'open' | 'in_review' | 'resolved' | 'closed'
  ): Promise<void> {
    try {
      await api.put(`${this.BASE_URL}/disputes/${disputeId}/status`, { status });
    } catch (error) {
      console.error('Error updating dispute status:', error);
      throw error;
    }
  }

  // ============ JOB MANAGEMENT ============
  /**
   * GET /api/admin/jobs
   * Fetch all jobs with filters
   */
  async getJobs(params?: {
    status?: 'Active' | 'Completed' | 'Cancelled';
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<{ jobs: JobPosting[]; total: number }> {
    try {
      const response = await api.get<{ jobs: JobPosting[]; total: number }>(
        `${this.BASE_URL}/jobs`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/jobs/:id
   * Fetch job details
   */
  async getJobById(jobId: number): Promise<JobPosting> {
    try {
      const response = await api.get<JobPosting>(`${this.BASE_URL}/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/admin/jobs/:id
   * Delete a job posting
   */
  async deleteJob(jobId: number, reason: string): Promise<void> {
    try {
      await api.delete(`${this.BASE_URL}/jobs/${jobId}`, { data: { reason } });
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  /**
   * PUT /api/admin/jobs/:id/suspend
   * Suspend a job posting
   */
  async suspendJob(jobId: number, reason: string): Promise<void> {
    try {
      await api.put(`${this.BASE_URL}/jobs/${jobId}/suspend`, { reason });
    } catch (error) {
      console.error('Error suspending job:', error);
      throw error;
    }
  }

  // ============ PAYMENT & FINANCIAL ============
  /**
   * GET /api/admin/payments
   * Fetch payment transactions
   */
  async getPayments(params?: {
    status?: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
    page?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<{ payments: PaymentTransaction[]; total: number }> {
    try {
      const response = await api.get<{ payments: PaymentTransaction[]; total: number }>(
        `${this.BASE_URL}/payments`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/payments/:id
   * Fetch payment details
   */
  async getPaymentById(paymentId: number): Promise<PaymentTransaction> {
    try {
      const response = await api.get<PaymentTransaction>(`${this.BASE_URL}/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/payments/:id/refund
   * Process a refund
   */
  async refundPayment(paymentId: number, reason: string, amount?: number): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/payments/${paymentId}/refund`, { reason, amount });
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/financial/revenue
   * Fetch revenue analytics
   */
  async getRevenueAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'week' | 'month';
  }): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/financial/revenue`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      throw error;
    }
  }

  // ============ SYSTEM & LOGS ============
  /**
   * GET /api/admin/logs
   * Fetch system logs
   */
  async getSystemLogs(params?: {
    level?: 'info' | 'warning' | 'error' | 'critical';
    page?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<{ logs: SystemLog[]; total: number }> {
    try {
      const response = await api.get<{ logs: SystemLog[]; total: number }>(
        `${this.BASE_URL}/logs`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching system logs:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/settings
   * Fetch platform settings
   */
  async getSettings(): Promise<PlatformSettings> {
    try {
      const response = await api.get<PlatformSettings>(`${this.BASE_URL}/settings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  /**
   * PUT /api/admin/settings
   * Update platform settings
   */
  async updateSettings(settings: Partial<PlatformSettings>): Promise<void> {
    try {
      await api.put(`${this.BASE_URL}/settings`, settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/notifications/broadcast
   * Send broadcast notification to all users
   */
  async broadcastNotification(notification: {
    title: string;
    message: string;
    userType?: 'Student' | 'Employer' | 'All';
    priority?: 'low' | 'medium' | 'high';
  }): Promise<void> {
    try {
      await api.post(`${this.BASE_URL}/notifications/broadcast`, notification);
    } catch (error) {
      console.error('Error broadcasting notification:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/analytics/overview
   * Fetch comprehensive analytics overview
   */
  async getAnalyticsOverview(period: 'week' | 'month' | 'quarter' | 'year'): Promise<any> {
    try {
      const response = await api.get(`${this.BASE_URL}/analytics/overview`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics overview:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/export/users
   * Export users data to CSV
   */
  async exportUsers(filters?: any): Promise<Blob> {
    try {
      const response = await api.post<Blob>(
        `${this.BASE_URL}/export/users`,
        filters,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting users:', error);
      throw error;
    }
  }

  /**
   * POST /api/admin/export/transactions
   * Export transaction data to CSV
   */
  async exportTransactions(filters?: any): Promise<Blob> {
    try {
      const response = await api.post<Blob>(
        `${this.BASE_URL}/export/transactions`,
        filters,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting transactions:', error);
      throw error;
    }
  }
}


export const adminService = new AdminService();
export default adminService;