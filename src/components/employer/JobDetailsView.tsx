import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { jobService } from '../../services';
import { toast } from 'sonner';
import type { Job } from '../../types';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const JobDetailsView: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuthStore();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!jobId) {
      navigate('/employer/jobs');
      return;
    }

    fetchJobDetails();
  }, [user, jobId, navigate]);

  const fetchJobDetails = async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      const jobData = await jobService.getJobById(jobId);
      
      // Verify this job belongs to the current employer
      if (jobData.employerId !== user?.userId) {
        toast.error('Unauthorized access');
        navigate('/employer/jobs');
        return;
      }
      
      setJob(jobData);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast.error('Failed to load job details');
      navigate('/employer/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jobId || !window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      await jobService.deleteJob(jobId);
      toast.success('Job deleted successfully');
      navigate('/employer/jobs');
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('Failed to delete job');
    }
  };

  const getStatusColor = (status: string) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Not Found</h3>
          <button
            onClick={() => navigate('/employer/jobs')}
            className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/employer/jobs')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/employer/jobs/${jobId}/applications`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Users className="w-4 h-4" />
                View Applications
              </button>
              <button
                onClick={() => navigate(`/employer/jobs/${jobId}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {job.jobType}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Rs {job.payAmount.toLocaleString()} ({job.payType})
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 mb-1">Applications</p>
                  <p className="text-2xl font-bold text-blue-900">{job.applicationCount || 0}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 mb-1">Slots Available</p>
                  <p className="text-2xl font-bold text-green-900">
                    {job.maxApplicants - (job.applicationCount || 0)}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-purple-900">{job.durationDays} days</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-2 text-gray-600 bg-yellow-50 p-4 rounded-lg">
            <Calendar className="w-5 h-5 text-yellow-600" />
            <span className="text-sm">
              <strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString()} at {new Date(job.deadline).toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap mb-6">{job.description}</p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {job.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Job Type</p>
              <p className="text-gray-900 font-medium">{job.jobType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Pay Type</p>
              <p className="text-gray-900 font-medium">{job.payType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Pay Amount</p>
              <p className="text-gray-900 font-medium">Rs {job.payAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Duration</p>
              <p className="text-gray-900 font-medium">{job.durationDays} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="text-gray-900 font-medium">{job.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Maximum Applicants</p>
              <p className="text-gray-900 font-medium">{job.maxApplicants}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Posted Date</p>
              <p className="text-gray-900 font-medium">{new Date(job.postedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="text-gray-900 font-medium">{job.status}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate(`/employer/jobs/${jobId}/applications`)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Users className="w-5 h-5" />
              View Applications
            </button>
            <button
              onClick={() => navigate(`/employer/jobs/${jobId}/edit`)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
            >
              <Edit className="w-5 h-5" />
              Edit Job
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 className="w-5 h-5" />
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
