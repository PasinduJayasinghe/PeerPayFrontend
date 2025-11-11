// Job Category API service
import api from './api';

export interface JobCategory {
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  jobCount: number;
}

const BASE_URL = '/jobcategory';

class JobCategoryService {
  /**
   * GET /api/jobcategory
   * Get all job categories
   */
  async getAllCategories(): Promise<JobCategory[]> {
    try {
      const response = await api.get<JobCategory[]>(BASE_URL);
      // Backend returns array directly, not wrapped in ApiResponse
      return response.data;
    } catch (error: any) {
      console.error('Get all categories error:', error);
      throw error;
    }
  }
}

export const jobCategoryService = new JobCategoryService();
