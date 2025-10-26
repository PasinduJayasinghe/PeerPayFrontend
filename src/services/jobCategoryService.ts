// Job Category API service
import api from './api';

export interface JobCategory {
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  jobCount: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const BASE_URL = '/jobcategory';

class JobCategoryService {
  /**
   * GET /api/jobcategory
   * Get all job categories
   */
  async getAllCategories(): Promise<JobCategory[]> {
    try {
      const response = await api.get<ApiResponse<JobCategory[]>>(BASE_URL);
      return response.data.data;
    } catch (error: any) {
      console.error('Get all categories error:', error);
      throw error;
    }
  }
}

export const jobCategoryService = new JobCategoryService();
