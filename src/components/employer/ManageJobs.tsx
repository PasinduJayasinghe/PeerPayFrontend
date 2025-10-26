import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Briefcase,
  Users,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';
import type { Job } from '../../types';

const ManageJobs: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchJobs();
  }, [user, navigate]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      if (!user?.userId) {
        toast.error('User not found');
        navigate('/login');
        return;
      }
      
      const response = await jobService.getJobsByEmployer(user.userId);
      console.log('Fetched employer jobs:', response);
      setJobs(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
      setJobs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      // TODO: Delete job API call
      // await jobService.deleteJob(jobId);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('Failed to delete job');
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/employer/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
                <p className="text-sm text-gray-600">View and manage all your job postings</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/employer/jobs/create')}
              className="flex items-center gap-2 px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'All'
                ? 'Try adjusting your filters'
                : 'Start by posting your first job'}
            </p>
            <button
              onClick={() => navigate('/employer/jobs/create')}
              className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Rs {job.payAmount?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicationCount || 0} applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => navigate(`/employer/jobs/${job.jobId}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/employer/jobs/${job.jobId}/applications`)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="View Applications"
                    >
                      <Users className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/employer/jobs/${job.jobId}/edit`)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                      title="Edit Job"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.jobId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
