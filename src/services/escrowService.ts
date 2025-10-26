// Escrow Wallet API service
import api from './api';
import type { 
  EscrowWallet,
  WalletBalance,
  Transaction,
  EscrowStatus,
  PaginatedResponse,
  ApiResponse 
} from '../types';

interface CreateEscrowDto {
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  notes?: string;
}

interface ReleaseEscrowDto {
  escrowId: string;
  releaseTo: string; // studentId
  releaseAmount?: number; // optional partial release
  notes?: string;
}

interface RefundEscrowDto {
  escrowId: string;
  refundTo: string; // employerId
  refundAmount?: number; // optional partial refund
  reason: string;
}

interface DisputeEscrowDto {
  escrowId: string;
  raisedBy: string; // userId
  reason: string;
  evidence?: string[];
}

interface WithdrawFundsDto {
  userId: string;
  amount: number;
  bankAccountId?: string;
  method: 'BankTransfer' | 'PayPal' | 'Other';
}

class EscrowService {
  private readonly BASE_URL = '/escrow';
  private readonly WALLET_URL = '/wallet';

  // ============ ESCROW OPERATIONS ============

  /**
   * POST /api/escrow/create
   * Create escrow for a job (Employer funds the escrow)
   */
  async createEscrow(escrowData: CreateEscrowDto): Promise<EscrowWallet> {
    try {
      const response = await api.post<EscrowWallet>(`${this.BASE_URL}/create`, escrowData);
      return response.data;
    } catch (error) {
      console.error('Create escrow error:', error);
      throw error;
    }
  }

  /**
   * POST /api/escrow/{escrowId}/release
   * Release escrow funds to student (After work completion)
   */
  async releaseEscrow(releaseData: ReleaseEscrowDto): Promise<EscrowWallet> {
    try {
      const response = await api.post<EscrowWallet>(
        `${this.BASE_URL}/${releaseData.escrowId}/release`,
        releaseData
      );
      return response.data;
    } catch (error) {
      console.error('Release escrow error:', error);
      throw error;
    }
  }

  /**
   * POST /api/escrow/{escrowId}/refund
   * Refund escrow to employer (If job cancelled or work not satisfactory)
   */
  async refundEscrow(refundData: RefundEscrowDto): Promise<EscrowWallet> {
    try {
      const response = await api.post<EscrowWallet>(
        `${this.BASE_URL}/${refundData.escrowId}/refund`,
        refundData
      );
      return response.data;
    } catch (error) {
      console.error('Refund escrow error:', error);
      throw error;
    }
  }

  /**
   * POST /api/escrow/{escrowId}/dispute
   * Raise a dispute on escrow
   */
  async disputeEscrow(disputeData: DisputeEscrowDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(
        `${this.BASE_URL}/${disputeData.escrowId}/dispute`,
        disputeData
      );
      return response.data;
    } catch (error) {
      console.error('Dispute escrow error:', error);
      throw error;
    }
  }

  /**
   * GET /api/escrow/{escrowId}
   * Get escrow by ID
   */
  async getEscrowById(escrowId: string): Promise<EscrowWallet> {
    try {
      const response = await api.get<EscrowWallet>(`${this.BASE_URL}/${escrowId}`);
      return response.data;
    } catch (error) {
      console.error('Get escrow by ID error:', error);
      throw error;
    }
  }

  /**
   * GET /api/escrow/job/{jobId}
   * Get escrow for a specific job
   */
  async getEscrowByJob(jobId: string): Promise<EscrowWallet> {
    try {
      const response = await api.get<EscrowWallet>(`${this.BASE_URL}/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Get escrow by job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/escrow/employer/{employerId}
   * Get all escrows for an employer
   */
  async getEmployerEscrows(
    employerId: string,
    status?: EscrowStatus,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<EscrowWallet>> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());
      if (status) params.append('status', status);

      const response = await api.get<PaginatedResponse<EscrowWallet>>(
        `${this.BASE_URL}/employer/${employerId}?${params}`
      );
      return response.data;
    } catch (error) {
      console.error('Get employer escrows error:', error);
      throw error;
    }
  }

  /**
   * GET /api/escrow/student/{studentId}
   * Get all escrows for a student
   */
  async getStudentEscrows(
    studentId: string,
    status?: EscrowStatus,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<EscrowWallet>> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());
      if (status) params.append('status', status);

      const response = await api.get<PaginatedResponse<EscrowWallet>>(
        `${this.BASE_URL}/student/${studentId}?${params}`
      );
      return response.data;
    } catch (error) {
      console.error('Get student escrows error:', error);
      throw error;
    }
  }

  // ============ WALLET OPERATIONS ============

  /**
   * GET /api/wallet/{userId}/balance
   * Get user's wallet balance
   */
  async getWalletBalance(userId: string): Promise<WalletBalance> {
    try {
      const response = await api.get<WalletBalance>(`${this.WALLET_URL}/${userId}/balance`);
      return response.data;
    } catch (error) {
      console.error('Get wallet balance error:', error);
      throw error;
    }
  }

  /**
   * GET /api/wallet/{userId}/transactions
   * Get user's transaction history
   */
  async getTransactions(
    userId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<Transaction>> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      const response = await api.get<PaginatedResponse<Transaction>>(
        `${this.WALLET_URL}/${userId}/transactions?${params}`
      );
      return response.data;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  }

  /**
   * POST /api/wallet/withdraw
   * Withdraw funds from wallet to bank account
   */
  async withdrawFunds(withdrawData: WithdrawFundsDto): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(
        `${this.WALLET_URL}/withdraw`,
        withdrawData
      );
      return response.data;
    } catch (error) {
      console.error('Withdraw funds error:', error);
      throw error;
    }
  }

  /**
   * GET /api/wallet/{userId}/escrow-summary
   * Get summary of escrowed funds
   */
  async getEscrowSummary(userId: string): Promise<{
    totalEscrowed: number;
    activeEscrows: number;
    pendingReleases: number;
  }> {
    try {
      const response = await api.get(`${this.WALLET_URL}/${userId}/escrow-summary`);
      return response.data;
    } catch (error) {
      console.error('Get escrow summary error:', error);
      throw error;
    }
  }
}

export const escrowService = new EscrowService();
export default escrowService;
