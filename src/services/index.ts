// Main services index - exports all services
export { default as authService } from './authService';
export { default as userService } from './userService';
export { default as jobService } from './jobService';
export { jobCategoryService } from './jobCategoryService';
export { geminiChatService } from './geminiChatService';
export { default as notificationService } from './notificationService';
export { default as messageService } from './messageService';
export { default as ratingService } from './ratingService';
export { default as paymentService } from './paymentService';
export { default as adminService } from './adminService';
export { default as studentService } from './studentService';
export { default as dashboardService, useDashboardData, useUserStats } from './dashboardService';

// Re-export api instance for custom calls
export { default as api } from './api';

// Service types - re-export from service files since they're not in types
export type {
  LoginDto,
  RegisterStudentDto,
  RegisterEmployerDto,
  UserResponseDto,
  ApiResponse
} from '../types';