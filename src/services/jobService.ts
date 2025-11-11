// Job management API service
import api from './api';
import type { 
  Job, 
  JobApplication, 
  JobStatus, 
  ApplicationStatus,
  ApiResponse,
  PaginatedResponse 
} from '../types';

interface CreateJobDto {
  employerId: string;
  categoryId: string;
  title: string;
  description: string;
  payAmount: number;
  payType: string;
  durationDays: number;
  requiredSkills: string[];
  deadline: string;
  location: string;
  jobType: string;
  maxApplicants: number;
}

interface UpdateJobDto {
  jobId: string;
  title?: string;
  description?: string;
  skillsRequired?: string[];
  budget?: number;
  deadline?: string;
  status?: JobStatus;
}

interface CreateJobApplicationDto {
  jobId: string;
  studentId: string;
  coverLetter: string;
  attachments?: string[];
}

interface UpdateApplicationStatusDto {
  applicationId: string;
  status: ApplicationStatus;
  feedback?: string;
}

interface JobSearchCriteria {
  searchTerm?: string;
  location?: string;
  categoryId?: string;
  minPay?: number;
  maxPay?: number;
}

class JobService {
  private readonly BASE_URL = '/job';

  /**
   * POST /api/job
   * Create a new job posting
   */
  async createJob(jobData: CreateJobDto): Promise<Job> {
    try {
      console.log('Sending job data:', jobData);
      const response = await api.post<Job>(`${this.BASE_URL}`, jobData);
      return response.data;
    } catch (error: any) {
      console.error('Create job error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  }

  /**
   * GET /api/job/{id}
   * Get job by ID
   */
  async getJobById(jobId: string): Promise<Job> {
    try {
      const response = await api.get<Job>(`${this.BASE_URL}/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Get job by ID error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/job/{id}
   * Update job details
   */
  async updateJob(jobData: UpdateJobDto): Promise<Job> {
    try {
      const response = await api.put<Job>(`${this.BASE_URL}/${jobData.jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Update job error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/job/{id}
   * Delete job posting
   */
  async deleteJob(jobId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Delete job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/job
   * Get all jobs with optional filtering
   */
  async getAllJobs(page: number = 1, pageSize: number = 20): Promise<PaginatedResponse<Job>> {
    try {
      const response = await api.get<PaginatedResponse<Job>>(`${this.BASE_URL}?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Get all jobs error:', error);
      throw error;
    }
  }

  /**
   * POST /api/job/search
   * Search jobs by criteria
   */
  async searchJobs(searchCriteria: JobSearchCriteria): Promise<Job[]> {
    try {
      const response = await api.post<Job[]>(`${this.BASE_URL}/search`, searchCriteria);
      return response.data;
    } catch (error) {
      console.error('Search jobs error:', error);
      throw error;
    }
  }

  /**
   * GET /api/job/employer/{employerId}
   * Get all jobs posted by an employer
   */
  async getJobsByEmployer(employerId: string): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>(`${this.BASE_URL}/employer/${employerId}`);
      return response.data;
    } catch (error) {
      console.error('Get jobs by employer error:', error);
      throw error;
    }
  }

  /**
   * GET /api/job/category/{categoryId}
   * Get jobs by category
   */
  async getJobsByCategory(categoryId: string): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>(`${this.BASE_URL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Get jobs by category error:', error);
      throw error;
    }
  }

  /**
   * GET /api/job/status/{status}
   * Get jobs by status
   */
  async getJobsByStatus(status: JobStatus): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>(`${this.BASE_URL}/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Get jobs by status error:', error);
      throw error;
    }
  }

  /**
   * GET /api/job (with Active status filter)
   * Get all active jobs - convenience method for job board
   */
  async getActiveJobs(): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>(`${this.BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Get active jobs error:', error);
      throw error;
    }
  }

  // ============ JOB APPLICATIONS ============

  /**
   * POST /api/jobapplication/apply
   * Apply for a job
   */
  async applyForJob(applicationData: CreateJobApplicationDto): Promise<JobApplication> {
    try {
      const response = await api.post<JobApplication>('/jobapplication/apply', applicationData);
      return response.data;
    } catch (error) {
      console.error('Apply for job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/jobapplication/job/{jobId}
   * Get all applications for a specific job
   */
  async getApplicationsByJob(jobId: string): Promise<JobApplication[]> {
    try {
      const response = await api.get<JobApplication[]>(`/jobapplication/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Get applications by job error:', error);
      throw error;
    }
  }

  /**
   * GET /api/jobapplication/student/{studentId}
   * Get applications by student
   */
  async getStudentApplications(studentId: string): Promise<JobApplication[]> {
    try {
      const response = await api.get<JobApplication[]>(`/jobapplication/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Get student applications error:', error);
      throw error;
    }
  }

  /**
   * PUT /api/jobapplication/{applicationId}/status
   * Update application status
   */
  async updateApplicationStatus(statusData: UpdateApplicationStatusDto): Promise<JobApplication> {
    try {
      const response = await api.put<JobApplication>(`/jobapplication/${statusData.applicationId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Update application status error:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/job/applications/{applicationId}
   * Withdraw job application
   */
  async withdrawApplication(applicationId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`${this.BASE_URL}/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Withdraw application error:', error);
      throw error;
    }
  }
}

export const jobService = new JobService();
export default jobService;