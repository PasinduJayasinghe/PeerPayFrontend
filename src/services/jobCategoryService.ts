// Job Category API service
import api from './api';
import type { ApiResponse } from '../types';

export interface JobCategory {
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  jobCount: number;
}

class JobCategoryService {
  private readonly BASE_URL = '/jobcategory';

  /**
   * GET /api/jobcategory
   * Get all job categories
   */
  async getAllCategories(): Promise<JobCategory[]> {
    try {
      const response = await api.get<JobCategory[]>(`${this.BASE_URL}`);
      return response.data;
    } catch (error: any) {
      console.error('Get all categories error:', error);
      throw error;
    }
  }
}

export const jobCategoryService = new JobCategoryService();
