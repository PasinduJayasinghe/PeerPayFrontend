// Student profile API service
import api from './api';
import type { ApiResponse } from '../types';

export interface StudentProfile {
  studentId: string;
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  university: string;
  course: string;
  yearOfStudy: number;
  academicVerificationStatus: string;
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  cvUrl?: string;
  bio?: string;
  address?: string;
  profilePictureUrl?: string;
}

export interface UpdateStudentProfileDto {
  name?: string;
  phone?: string;
  university?: string;
  course?: string;
  yearOfStudy?: number;
  bio?: string;
  address?: string;
  cvUrl?: string;
}

class StudentService {
  private readonly BASE_URL = '/student';

  /**
   * GET /api/student/{id}
   * Get student profile by ID
   */
  async getStudentProfile(studentId: string): Promise<StudentProfile> {
    try {
      const response = await api.get<StudentProfile>(`${this.BASE_URL}/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Get student profile error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/student/{id}
   * Update student profile
   */
  async updateStudentProfile(studentId: string, profileData: UpdateStudentProfileDto): Promise<StudentProfile> {
    try {
      const response = await api.put<StudentProfile>(`${this.BASE_URL}/${studentId}`, {
        studentId,
        ...profileData
      });
      return response.data;
    } catch (error) {
      console.error('Update student profile error:', error);
      throw error;
    }
  }
}

export const studentService = new StudentService();
export default studentService;
