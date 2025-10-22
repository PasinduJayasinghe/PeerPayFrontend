// Data fetching utility service for common operations
import { useCallback, useEffect, useState } from 'react';
import { 
  jobService, 
  notificationService, 
  messageService,
  ratingService,
  paymentService 
} from './index';

// Dashboard data aggregation service
export class DashboardService {
  /**
   * Get student dashboard data
   */
  async getStudentDashboard(studentId: string) {
    try {
      const [
        recentJobs,
        applications,
        notifications,
        messages,
        ratings,
        payments
      ] = await Promise.allSettled([
        jobService.getAllJobs(1, 10),
        jobService.getStudentApplications(studentId),
        notificationService.getUserNotifications(studentId, { page: 1, pageSize: 5 }),
        messageService.getUnreadMessages(studentId),
        ratingService.getUserRatings(studentId, { page: 1, pageSize: 5 }),
        paymentService.getStudentPayments(studentId, { page: 1, pageSize: 5 })
      ]);

      return {
        recentJobs: recentJobs.status === 'fulfilled' ? recentJobs.value : null,
        applications: applications.status === 'fulfilled' ? applications.value : [],
        notifications: notifications.status === 'fulfilled' ? notifications.value : null,
        unreadMessages: messages.status === 'fulfilled' ? messages.value : [],
        ratings: ratings.status === 'fulfilled' ? ratings.value : null,
        payments: payments.status === 'fulfilled' ? payments.value : null,
      };
    } catch (error) {
      console.error('Error fetching student dashboard data:', error);
      throw error;
    }
  }

  /**
   * Get employer dashboard data
   */
  async getEmployerDashboard(employerId: string) {
    try {
      const [
        myJobs,
        notifications,
        messages,
        ratings,
        payments
      ] = await Promise.allSettled([
        jobService.getJobsByEmployer(employerId),
        notificationService.getUserNotifications(employerId, { page: 1, pageSize: 5 }),
        messageService.getUnreadMessages(employerId),
        ratingService.getUserRatings(employerId, { page: 1, pageSize: 5 }),
        paymentService.getEmployerPayments(employerId, { page: 1, pageSize: 5 })
      ]);

      return {
        myJobs: myJobs.status === 'fulfilled' ? myJobs.value : [],
        notifications: notifications.status === 'fulfilled' ? notifications.value : null,
        unreadMessages: messages.status === 'fulfilled' ? messages.value : [],
        ratings: ratings.status === 'fulfilled' ? ratings.value : null,
        payments: payments.status === 'fulfilled' ? payments.value : null,
      };
    } catch (error) {
      console.error('Error fetching employer dashboard data:', error);
      throw error;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string, userType: 'Student' | 'Employer') {
    try {
      const [ratingStats, unreadCount] = await Promise.allSettled([
        ratingService.getUserRatingStats(userId),
        notificationService.getUnreadCount(userId)
      ]);

      const baseStats = {
        ratingStats: ratingStats.status === 'fulfilled' ? ratingStats.value : null,
        unreadNotifications: unreadCount.status === 'fulfilled' ? unreadCount.value : 0,
      };

      if (userType === 'Student') {
        const applications = await jobService.getStudentApplications(userId);
        return {
          ...baseStats,
          totalApplications: applications.length,
          activeApplications: applications.filter(app => app.status === 'Pending').length,
        };
      } else {
        const jobs = await jobService.getJobsByEmployer(userId);
        return {
          ...baseStats,
          totalJobs: jobs.length,
          activeJobs: jobs.filter(job => job.status === 'Open').length,
        };
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();

// React hook for dashboard data
export function useDashboardData(userId: string, userType: 'Student' | 'Employer') {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);

    try {
      const dashboardData = userType === 'Student' 
        ? await dashboardService.getStudentDashboard(userId)
        : await dashboardService.getEmployerDashboard(userId);
      
      setData(dashboardData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [userId, userType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// React hook for user statistics
export function useUserStats(userId: string, userType: 'Student' | 'Employer') {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const userStats = await dashboardService.getUserStats(userId, userType);
        setStats(userStats);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, userType]);

  return { stats, loading, error };
}

export default dashboardService;