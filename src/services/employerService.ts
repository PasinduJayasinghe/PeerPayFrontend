import axios from 'axios';
import type { Employer } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class EmployerService {
  /**
   * Get employer by user ID
   */
  async getEmployerByUserId(userId: string): Promise<Employer> {
    const response = await axios.get<Employer>(`${API_BASE_URL}/employer/user/${userId}`);
    return response.data;
  }
}

export const employerService = new EmployerService();
