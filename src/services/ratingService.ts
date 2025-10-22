// Rating and review API service
import api from './api';
import type { 
  Rating, 
  RatingStats,
  PaginatedResponse,
  ApiResponse 
} from '../types';

interface CreateRatingDto {
  jobId: string;
  raterId: string;
  ratedUserId: string;
  ratingValue: number;
  review?: string;
  isPublic?: boolean;
}

interface UpdateRatingDto {
  ratingId: string;
  ratingValue?: number;
  review?: string;
  isPublic?: boolean;
}

interface RatingListParams {
  page?: number;
  pageSize?: number;
  isPublic?: boolean;
  minRating?: number;
  maxRating?: number;
}

class RatingService {
  private readonly BASE_URL = '/rating';

  /**
   * POST /api/rating
   * Create a new rating
   */
  async createRating(ratingData: CreateRatingDto): Promise<Rating> {
    try {
      const response = await api.post<Rating>(`${this.BASE_URL}`, ratingData);
      return response.data;
    } catch (error) {
      console.error('Create rating error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/{id}
   * Get rating by ID
   */
  async getRatingById(ratingId: string): Promise<Rating> {
    try {
      const response = await api.get<Rating>(`${this.BASE_URL}/${ratingId}`);
      return response.data;
    } catch (error) {
      console.error('Get rating by ID error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/rating/{id}
   * Update rating
   */
  async updateRating(ratingData: UpdateRatingDto): Promise<Rating> {
    try {
      const response = await api.put<Rating>(`${this.BASE_URL}/${ratingData.ratingId}`, ratingData);
      return response.data;
    } catch (error) {
      console.error('Update rating error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/rating/{id}
   * Delete rating
   */
  async deleteRating(ratingId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/${ratingId}`);
      return response.data;
    } catch (error) {
      console.error('Delete rating error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/job/{jobId}
   * Get ratings for a job
   */
  async getJobRatings(jobId: string, params: RatingListParams = {}): Promise<Rating[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.isPublic !== undefined) queryParams.append('isPublic', params.isPublic.toString());
      if (params.minRating) queryParams.append('minRating', params.minRating.toString());
      if (params.maxRating) queryParams.append('maxRating', params.maxRating.toString());

      const response = await api.get<Rating[]>(`${this.BASE_URL}/job/${jobId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get job ratings error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/user/{userId}
   * Get ratings for a user (received ratings)
   */
  async getUserRatings(userId: string, params: RatingListParams = {}): Promise<PaginatedResponse<Rating>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.isPublic !== undefined) queryParams.append('isPublic', params.isPublic.toString());
      if (params.minRating) queryParams.append('minRating', params.minRating.toString());
      if (params.maxRating) queryParams.append('maxRating', params.maxRating.toString());

      const response = await api.get<PaginatedResponse<Rating>>(`${this.BASE_URL}/user/${userId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get user ratings error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/user/{userId}/stats
   * Get rating statistics for a user
   */
  async getUserRatingStats(userId: string): Promise<RatingStats> {
    try {
      const response = await api.get<RatingStats>(`${this.BASE_URL}/user/${userId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Get user rating stats error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/rater/{raterId}
   * Get ratings given by a user (ratings they've written)
   */
  async getRatingsByRater(raterId: string, params: RatingListParams = {}): Promise<Rating[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());

      const response = await api.get<Rating[]>(`${this.BASE_URL}/rater/${raterId}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Get ratings by rater error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/check
   * Check if user has already rated a job
   */
  async checkUserRatedJob(userId: string, jobId: string): Promise<boolean> {
    try {
      const response = await api.get<{ hasRated: boolean }>(`${this.BASE_URL}/check?userId=${userId}&jobId=${jobId}`);
      return response.data.hasRated;
    } catch (error) {
      console.error('Check user rated job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/user/{userId}/average
   * Get average rating for a user
   */
  async getUserAverageRating(userId: string): Promise<number> {
    try {
      const response = await api.get<{ averageRating: number }>(`${this.BASE_URL}/user/${userId}/average`);
      return response.data.averageRating;
    } catch (error) {
      console.error('Get user average rating error:', error);
      throw error;
    }
  }

  /**
   * GET /api/rating/job/{jobId}/average
   * Get average rating for a job
   */
  async getJobAverageRating(jobId: string): Promise<number> {
    try {
      const response = await api.get<{ averageRating: number }>(`${this.BASE_URL}/job/${jobId}/average`);
      return response.data.averageRating;
    } catch (error) {
      console.error('Get job average rating error:', error);
      throw error;
    }
  }
}

export const ratingService = new RatingService();
export default ratingService;