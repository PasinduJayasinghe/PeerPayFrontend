import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  RefreshCw,
  UserCheck,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  adminService, 
  type AdminDashboardData,
} from '../../services/adminService.ts';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';


const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);


  const colors = {
    yellow: '#F4E87C',
    lightPink: '#FFBDE1',
    magenta: '#E47DE4',
    lightBlue: '#9CADFF',
    royalBlue: '#5469D4',
    orange: '#FF5722',
    purple: '#9C6ADE',
    darkPurple: '#674FA3',
    lightPurple: '#D5A5D8',
    darkNavy: '#2E3047',
  };


  const fetchDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await adminService.getDashboardData(10);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  
  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);

  
  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const formatCurrency = (amount: number): string => {
    return `₨${amount.toLocaleString()}`;
  };

  const stats = dashboardData?.statistics;
  const totalUsers = (stats?.totalEmployers || 0) + (stats?.totalStudents || 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-white shadow-sm sticky top-0 z-10" style={{ backgroundColor: colors.darkNavy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300 text-sm mt-1">Platform overview and management</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 transition"
            >
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.yellow }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.yellow}40` }}>
                <Users size={24} style={{ color: colors.royalBlue }} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats?.totalEmployers || 0} employers, {stats?.totalStudents || 0} students
            </p>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.lightBlue }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.lightBlue}40` }}>
                <Briefcase size={24} style={{ color: colors.royalBlue }} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.activeJobs || 0}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats?.totalJobs || 0} total jobs
            </p>
          </div>

          {/* Total Applications */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.lightPink }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.lightPink}40` }}>
                <FileText size={24} style={{ color: colors.magenta }} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalApplications || 0}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats?.pendingApplications || 0} pending
            </p>
          </div>

          {/* Verified Users */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.purple }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.purple}40` }}>
                <UserCheck size={24} style={{ color: colors.purple }} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">Verified Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {(stats?.verifiedEmployers || 0) + (stats?.verifiedStudents || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {stats?.verifiedEmployers || 0} employers, {stats?.verifiedStudents || 0} students
            </p>
          </div>
        </div>

        {/* Recent Employers & Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Employers */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Building2 size={20} style={{ color: colors.royalBlue }} />
                Recent Employers
              </h3>
            </div>
            <div className="space-y-3">
              {dashboardData?.recentEmployers && dashboardData.recentEmployers.length > 0 ? (
                dashboardData.recentEmployers.map((employer) => (
                  <div key={employer.employerId} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:shadow-md transition">
                    <Building2 size={18} className="text-gray-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{employer.companyName}</h4>
                      <p className="text-sm text-gray-600">{employer.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {employer.verificationStatus === 'Verified' ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={12} /> Verified
                          </span>
                        ) : (
                          <span className="text-gray-500">Not Verified</span>
                        )}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(employer.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building2 size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No employers yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <GraduationCap size={20} style={{ color: colors.royalBlue }} />
                Recent Students
              </h3>
            </div>
            <div className="space-y-3">
              {dashboardData?.recentStudents && dashboardData.recentStudents.length > 0 ? (
                dashboardData.recentStudents.map((student) => (
                  <div key={student.studentId} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:shadow-md transition">
                    <GraduationCap size={18} className="text-gray-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {student.university} - {student.course}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(student.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No students yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Briefcase size={20} style={{ color: colors.royalBlue }} />
              Recent Jobs
            </h3>
          </div>
          <div className="space-y-3">
            {dashboardData?.recentJobs && dashboardData.recentJobs.length > 0 ? (
              dashboardData.recentJobs.map((job) => (
                <div key={job.jobId} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                  <Briefcase size={18} className="text-gray-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{job.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {job.location} • {job.jobType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold" style={{ color: colors.purple }}>
                          {formatCurrency(job.payAmount)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(job.postedDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Briefcase size={48} className="mx-auto mb-3 opacity-30" />
                <p>No jobs yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText size={20} style={{ color: colors.royalBlue }} />
              Recent Applications
            </h3>
          </div>
          <div className="space-y-3">
              {dashboardData?.recentApplications && dashboardData.recentApplications.length > 0 ? (
              dashboardData.recentApplications.map((app) => (
                <div key={app.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                  <FileText size={18} className="text-gray-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{app.jobTitle}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Applied by: {app.studentName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Status: <span className={`font-semibold ${
                            app.status === 'Pending' ? 'text-yellow-600' :
                            app.status === 'Accepted' ? 'text-green-600' :
                            app.status === 'Rejected' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>{app.status}</span>
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(app.appliedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-3 opacity-30" />
                <p>No applications yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;