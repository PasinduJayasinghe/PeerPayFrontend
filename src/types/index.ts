// Core type definitions matching backend models

export type UserType = 'Student' | 'Employer' | 'Admin';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'PendingVerification';

export interface User {
  userId: string;
  id: string; // Add alias for convenience
  email: string;
  phone: string;
  name: string;
  userType: UserType;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Student {
  studentId: string;
  userId: string;
  university: string;
  course: string;
  yearOfStudy: number;
  academicVerificationStatus: string;
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  cvUrl?: string;
  user?: User;
}

export interface Employer {
  employerId: string;
  userId: string;
  companyName: string;
  companyType: string;
  description: string;
  contactPerson: string;
  verificationStatus: string;
  rating: number;
  jobsPosted: number;
  user?: User;
}

export interface Admin {
  adminId: string;
  userId: string;
  role: string;
  permissions: string[];
  user?: User;
}

export interface Profile {
  profileId: string;
  userId: string;
  bio?: string;
  address?: string;
  profilePictureUrl?: string;
  documents?: string[];
}

export interface StudentSkill {
  skillId: string;
  studentId: string;
  skillName: string;
  proficiencyLevel: ProficiencyLevel;
}

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface JobCategory {
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  jobCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Auth DTOs
export interface RegisterStudentDto {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  name: string;
  university: string;
  course: string;
  yearOfStudy: number;
}

export interface RegisterEmployerDto {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  name: string;
  companyName: string;
  companyType: string;
  description: string;
  contactPerson: string;
}

export interface LoginDto {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: User;
  userType: UserType;
  expiresAt: string;
}

export interface UserResponseDto {
  userId: string;
  email: string;
  phone: string;
  name: string;
  userType: UserType;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
}

// Job related types
export type JobStatus = 'Active' | 'Closed' | 'Completed' | 'Cancelled';
export type ApplicationStatus = 'Submitted' | 'UnderReview' | 'Shortlisted' | 'Selected' | 'Rejected' | 'Withdrawn';
export type PayType = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Fixed';
export type JobType = 'FullTime' | 'PartTime' | 'ProjectBased' | 'Freelance';

export interface Job {
  jobId: string;
  id: string; // Add alias for convenience
  employerId: string;
  categoryId?: string;
  title: string;
  description: string;
  payAmount: number;
  payType: PayType;
  durationDays: number;
  requiredSkills: string[];
  attachments?: string[];
  deadline: string;
  status: JobStatus;
  location: string;
  jobType: JobType;
  maxApplicants: number;
  applicationCount?: number; // Add for dashboard stats
  postedDate: string;
}

export interface JobApplication {
  applicationId: string;
  id: string;
  jobId: string;
  jobTitle?: string;
  employerName?: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  university?: string;
  course?: string;
  yearOfStudy?: number;
  appliedDate: string;
  status: ApplicationStatus;
  coverLetter: string;
  attachments?: string[];
  statusUpdatedAt?: string;
  updatedBy?: string;
  employerNotes?: string;
}

// Notification types
export type NotificationType = 
  | 'JobApplication'
  | 'ApplicationStatusUpdate'
  | 'JobAssignment'
  | 'PaymentReceived'
  | 'PaymentSent'
  | 'MessageReceived'
  | 'ReviewReceived'
  | 'SystemAlert';

export interface Notification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedEntityId?: string;
}

// Message types
export type MessageStatus = 'Sent' | 'Delivered' | 'Read';

export interface Message {
  messageId: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
  timestamp: string;
  status: MessageStatus;
  isRead: boolean;
  readAt?: string;
}

export interface Conversation {
  conversationId: string;
  participant1Id: string;
  participant2Id: string;
  jobId?: string;
  lastMessageAt: string;
  isActive: boolean;
}

// Rating types
export type RatingType = 'StudentToEmployer' | 'EmployerToStudent';

export interface Rating {
  ratingId: string;
  jobId: string;
  raterId: string;
  ratedUserId: string;
  ratingValue: number;
  review?: string;
  ratingType: RatingType;
  isPublic: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  distribution: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

// Payment types
export type PaymentStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Refunded';
export type PaymentMethod = 'BankTransfer' | 'DigitalWallet' | 'CreditCard' | 'UPI';
export type TransactionType = 'PaymentReceived' | 'Withdrawal' | 'Refund' | 'FeeDeduction';
export type TransactionStatus = 'Success' | 'Pending' | 'Failed';

export interface Payment {
  paymentId: string;
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  status: PaymentStatus;
  createdDate: string;
  completedDate?: string;
  transactionId: string;
  paymentMethod: PaymentMethod;
  gatewayResponse?: string;
  notes?: string;
}

export interface PaymentIntent {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface EscrowWallet {
  escrowId: string;
  jobId: string;
  jobTitle?: string;
  employerId: string;
  employerName?: string;
  studentId: string;
  studentName?: string;
  amount: number;
  platformFee: number;
  studentAmount: number;
  status: EscrowStatus;
  fundedAt: string;
  releasedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalance {
  userId: string;
  availableBalance: number;
  escrowedBalance: number;
  totalEarnings: number;
  totalSpent: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  paymentId?: string;
  transactionType: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  metadata?: string;
  timestamp: string;
}

export interface Earnings {
  earningsId: string;
  studentId: string;
  totalEarnings: number;
  availableBalance: number;
  withdrawnAmount: number;
  pendingAmount: number;
  lastUpdated: string;
}

export type WithdrawalStatus = 'Pending' | 'Processing' | 'Completed' | 'Rejected';

export interface WithdrawalRequest {
  withdrawalId: string;
  studentId: string;
  amount: number;
  status: WithdrawalStatus;
  bankDetails: string;
  requestedDate: string;
  processedDate?: string;
  processedBy?: string;
  notes?: string;
}

export interface Notification {
  notificationId: string;
  userId: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
  metadata?: string;
  expiresAt?: string;
}

export type ReportType = 'UserGrowth' | 'JobTrends' | 'PaymentSummary' | 'UsageAnalytics';

export interface Report {
  reportId: string;
  generatedBy: string;
  reportType: ReportType;
  parameters?: string;
  data?: string;
  fileUrl?: string;
  generatedDate: string;
  expiresAt?: string;
}

export type DataType = 'String' | 'Integer' | 'Boolean' | 'Decimal' | 'DateTime' | 'Json';

export interface SystemConfig {
  configId: string;
  configKey: string;
  configValue: string;
  description?: string;
  dataType: DataType;
  isActive: boolean;
  lastModified: string;
  modifiedBy?: string;
}

export type AuditAction = 'Create' | 'Update' | 'Delete' | 'Login' | 'Logout';

export interface AuditLog {
  auditId: string;
  userId: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  oldValues?: string;
  newValues?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface FileUpload {
  fileId: string;
  userId: string;
  entityType: string;
  entityId: string;
  originalName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  hashValue?: string;
  uploadedAt: string;
  expiresAt?: string;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  deviceType?: string;
  ipAddress?: string;
  userAgent?: string;
  lastAccessed: string;
  expiresAt: string;
  isActive: boolean;
}

export type OTPPurpose = 'Registration' | 'Login' | 'PasswordReset' | 'PhoneVerification' | 'EmailVerification';

export interface OTPVerification {
  otpId: string;
  userId: string;
  otpCode: string;
  purpose: OTPPurpose;
  contactMethod: string;
  isUsed: boolean;
  expiresAt: string;
  attempts: number;
}

// Keep existing custom frontend types for backward compatibility
export interface PaymentIntent {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export type EscrowStatus = 'Funded' | 'Held' | 'Released' | 'Refunded' | 'Disputed';

export interface EscrowWallet {
  escrowId: string;
  jobId: string;
  jobTitle?: string;
  employerId: string;
  employerName?: string;
  studentId: string;
  studentName?: string;
  amount: number;
  platformFee: number;
  studentAmount: number;
  status: EscrowStatus;
  fundedAt: string;
  releasedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalance {
  userId: string;
  availableBalance: number;
  escrowedBalance: number;
  totalEarnings: number;
  totalSpent: number;
  currency: string;
  lastUpdated: string;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  distribution: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
