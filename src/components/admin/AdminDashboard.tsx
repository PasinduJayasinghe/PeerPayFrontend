import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  FileText,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService.ts';


interface DashboardStats {
  totalUsers: number;
  userGrowth: number;
  activeJobs: number;
  jobGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeDisputes: number;
  disputeChange: number;
  pendingVerifications: number;
  flaggedContent: number;
  completedJobs: number;
  newRegistrations: number;
}

interface RecentActivity {
  id: number;
  type: 'user_registration' | 'job_posted' | 'payment' | 'dispute' | 'verification' | 'flagged_content';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface QuickAction {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  count: number;
  route: string;
  color: string;
}

interface ChartData {
  month: string;
  users: number;
  jobs: number;
  revenue: number;
}


const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
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

     
      const [statsData, activitiesData, chartResponse] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentActivities(),
        adminService.getChartData(),
      ]);

      setStats(statsData);
      setActivities(activitiesData);
      setChartData(chartResponse);
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


  const getActivityIcon = (type: RecentActivity['type']): React.ReactNode => {
    const iconProps = { size: 20, className: 'flex-shrink-0' };
    switch (type) {
      case 'user_registration':
        return <Users {...iconProps} />;
      case 'job_posted':
        return <Briefcase {...iconProps} />;
      case 'payment':
        return <DollarSign {...iconProps} />;
      case 'dispute':
        return <AlertCircle {...iconProps} />;
      case 'verification':
        return <CheckCircle {...iconProps} />;
      case 'flagged_content':
        return <Flag {...iconProps} />;
      default:
        return <Activity {...iconProps} />;
    }
  };


  const getActivityColor = (status: RecentActivity['status']): string => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  
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

 
  const quickActions: QuickAction[] = [
    {
      icon: FileText,
      title: 'Verification Queue',
      description: 'Users pending verification',
      count: stats?.pendingVerifications || 0,
      route: '/admin/verification',
      color: colors.royalBlue,
    },
    {
      icon: Flag,
      title: 'Content Moderation',
      description: 'Posts flagged for review',
      count: stats?.flaggedContent || 0,
      route: '/admin/moderation',
      color: colors.orange,
    },
    {
      icon: AlertCircle,
      title: 'Active Disputes',
      description: 'Disputes need resolution',
      count: stats?.activeDisputes || 0,
      route: '/admin/disputes',
      color: colors.magenta,
    },
  ];

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
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm mt-1">Platform overview and management</p>
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
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.yellow }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.yellow}40` }}>
                <Users size={24} style={{ color: colors.royalBlue }} />
              </div>
              {stats && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.userGrowth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(stats.userGrowth)}%
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalUsers.toLocaleString() || 0}</p>
          </div>

         
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.lightBlue }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.lightBlue}40` }}>
                <Briefcase size={24} style={{ color: colors.royalBlue }} />
              </div>
              {stats && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stats.jobGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.jobGrowth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(stats.jobGrowth)}%
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.activeJobs || 0}</p>
          </div>

        
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.lightPink }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.lightPink}40` }}>
                <DollarSign size={24} style={{ color: colors.magenta }} />
              </div>
              {stats && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.revenueGrowth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(stats.revenueGrowth)}%
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">₨{stats?.totalRevenue.toLocaleString() || 0}</p>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: colors.orange }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.orange}40` }}>
                <AlertCircle size={24} style={{ color: colors.orange }} />
              </div>
              {stats && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stats.disputeChange <= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.disputeChange <= 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                  {Math.abs(stats.disputeChange)}%
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium">Active Disputes</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.activeDisputes || 0}</p>
          </div>
        </div>

      
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    toast.info(`Navigating to ${action.title}`);
                    // TODO: Navigate to route
                  }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${action.color}20` }}>
                      <Icon size={24} style={{ color: action.color }} />
                    </div>
                    <span className="text-2xl font-bold" style={{ color: action.color }}>
                      {action.count}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="flex items-center text-sm font-semibold group-hover:text-blue-600 transition" style={{ color: action.color }}>
                    Review Now <ArrowRight size={16} className="ml-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Platform Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.lightPurple + '30' }}>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} style={{ color: colors.purple }} />
                  <span className="font-medium text-gray-700">Completed Jobs</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats?.completedJobs || 0}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.yellow + '30' }}>
                <div className="flex items-center gap-3">
                  <Users size={20} style={{ color: colors.royalBlue }} />
                  <span className="font-medium text-gray-700">New Registrations</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats?.newRegistrations || 0}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.lightBlue + '30' }}>
                <div className="flex items-center gap-3">
                  <Clock size={20} style={{ color: colors.royalBlue }} />
                  <span className="font-medium text-gray-700">Pending Verifications</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats?.pendingVerifications || 0}</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Server Status</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle size={16} /> Online
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">API Response Time</span>
                  <span className="text-blue-600 font-semibold">125ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Database Load</span>
                  <span className="text-yellow-600 font-semibold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <button className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  <div className={`${getActivityColor(activity.status)} mt-1`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity size={48} className="mx-auto mb-3 opacity-30" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;