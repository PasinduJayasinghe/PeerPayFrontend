import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Star, 
  Bell, 
  MessageSquare,
  LogOut,
  User,
  TrendingUp,
  MessageCircle,
  Wallet
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useDashboardData } from '../../services/dashboardService';
import { jobService, notificationService } from '../../services';
import { toast } from 'sonner';
import type { Job, JobApplication } from '../../types';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { data: dashboardData, loading, refetch } = useDashboardData(user?.userId || '', 'Student');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch unread notifications count
    const fetchUnreadCount = async () => {
      try {
        const count = await notificationService.getUnreadCount(user.userId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
      case 'UnderReview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'Selected':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/wallet')}
                className="p-2 text-gray-600 hover:text-[#8C00FF] transition"
                title="My Wallet"
              >
                <Wallet className="w-6 h-6" />
              </button>
              <button 
                onClick={() => navigate('/messages')}
                className="p-2 text-gray-600 hover:text-[#8C00FF] transition"
                title="Messages"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button 
                onClick={() => navigate('/student/notifications')}
                className="relative p-2 text-gray-600 hover:text-[#8C00FF] transition"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => navigate('/student/profile')}
                className="p-2 text-gray-600 hover:text-[#8C00FF] transition"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.applications?.length || 0}
                </p>
              </div>
              <Briefcase className="w-10 h-10 text-[#8C00FF]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {dashboardData?.applications?.filter((app: JobApplication) => app.status === 'Submitted' || app.status === 'UnderReview').length || 0}
                </p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected</p>
                <p className="text-2xl font-bold text-green-600">
                  {dashboardData?.applications?.filter((app: JobApplication) => app.status === 'Selected').length || 0}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dashboardData?.ratings?.data?.[0]?.averageRating?.toFixed(1) || 'N/A'}
                </p>
              </div>
              <Star className="w-10 h-10 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
                  <button 
                    onClick={() => navigate('/student/jobs')}
                    className="text-[#8C00FF] hover:text-[#7000CC] text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {dashboardData?.recentJobs?.items?.slice(0, 5).map((job: Job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50 transition cursor-pointer" onClick={() => navigate(`/student/jobs/${job.id}`)}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{job.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${job.payAmount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(job.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition text-sm">
                        Apply Now
                      </button>
                    </div>
                  </div>
                )) || (
                  <div className="p-6 text-center text-gray-500">
                    No jobs available at the moment
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">My Applications</h2>
              </div>
              <div className="p-6 space-y-4">
                {dashboardData?.applications?.slice(0, 3).map((app: JobApplication) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">Application #{app.id.substring(0, 8)}</p>
                      <p className="text-xs text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                )) || (
                  <p className="text-sm text-gray-500 text-center">No applications yet</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => navigate('/student/jobs')}
                  className="w-full px-4 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition text-sm font-medium"
                >
                  Browse Jobs
                </button>
                <button
                  onClick={() => navigate('/student/assignments')}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                >
                  My Applications
                </button>
                <button
                  onClick={() => navigate('/student/profile')}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
