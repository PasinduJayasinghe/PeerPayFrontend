// Core type definitions matching backend models

export type UserType = 'Student' | 'Employer' | 'Admin';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'Banned';

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

export interface Profile {
  profileId: string;
  userId: string;
  bio?: string;
  address?: string;
  profilePictureUrl?: string;
  documents?: string[];
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
export type JobStatus = 'Open' | 'InProgress' | 'UnderReview' | 'Completed' | 'Cancelled';
export type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Accepted' | 'Rejected' | 'Withdrawn';

export interface Job {
  jobId: string;
  id: string; // Add alias for convenience
  employerId: string;
  title: string;
  description: string;
  skillsRequired: string[];
  budget: number;
  deadline: string;
  status: JobStatus;
  applicationCount?: number; // Add for dashboard stats
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  applicationId: string;
  id: string; // Add alias for convenience
  jobId: string;
  studentId: string;
  coverLetter: string;
  proposedRate: number;
  status: ApplicationStatus;
  appliedAt: string;
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
export interface Message {
  messageId: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  sentAt: string;
  attachments?: string[];
}

export interface Conversation {
  conversationId: string;
  participantIds: string[];
  jobId?: string;
  createdAt: string;
  lastMessageAt: string;
}

// Rating types
export interface Rating {
  ratingId: string;
  jobId: string;
  raterId: string;
  ratedUserId: string;
  ratingValue: number;
  review?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
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
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Refunded';

export interface Payment {
  paymentId: string;
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId: string;
  gatewayResponse?: string;
  createdAt: string;
  completedDate?: string;
}

export interface PaymentIntent {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
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
