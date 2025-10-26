import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  User,
  MessageCircle,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Award,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { jobService } from '../../services';
import api from '../../services/api';
import { toast } from 'sonner';
import type { JobApplication } from '../../types';

interface ApplicationWithStudent extends JobApplication {
  studentName?: string;
  studentEmail?: string;
  studentRating?: number;
  studentCompletedJobs?: number;
}

const ManageApplications: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuthStore();

  const [applications, setApplications] = useState<ApplicationWithStudent[]>([]);
  const [selectedApp, setSelectedApp] = useState<ApplicationWithStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Accepted' | 'Rejected'>('all');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!jobId) {
      navigate('/employer/dashboard');
      return;
    }

    fetchApplications();
    fetchJobDetails();
  }, [user, jobId, navigate]);

  const fetchJobDetails = async () => {
    if (!jobId) return;

    try {
      const job = await jobService.getJobById(jobId);
      setJobTitle(job.title);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
    }
  };

  const fetchApplications = async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      const apps = await jobService.getJobApplications(jobId);
      
      // Fetch student details for each application
      const appsWithStudents = await Promise.all(
        apps.map(async (app) => {
          try {
            const studentResponse = await api.get(`/student/${app.studentId}`);
            const student = studentResponse.data;
            return {
              ...app,
              studentName: student.name || 'Unknown Student',
              studentEmail: student.email,
              studentRating: student.averageRating || 0,
              studentCompletedJobs: student.completedJobsCount || 0
            };
          } catch (error) {
            console.error(`Failed to fetch student ${app.studentId}:`, error);
            return {
              ...app,
              studentName: 'Unknown Student',
              studentRating: 0,
              studentCompletedJobs: 0
            };
          }
        })
      );

      setApplications(appsWithStudents);
      if (appsWithStudents.length > 0) {
        setSelectedApp(appsWithStudents[0]);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId: string, status: 'Accepted' | 'Rejected') => {
    try {
      await jobService.updateApplicationStatus({
        applicationId,
        status,
        feedback: status === 'Accepted' ? 'Congratulations! You have been selected.' : 'Thank you for applying.'
      });

      toast.success(`Application ${status.toLowerCase()} successfully`);
      
      // Refresh applications
      fetchApplications();
    } catch (error: any) {
      console.error('Failed to update application status:', error);
      toast.error(error.response?.data?.message || 'Failed to update application');
    }
  };

  const handleAccept = () => {
    if (!selectedApp) return;
    handleUpdateStatus(selectedApp.applicationId, 'Accepted');
  };

  const handleReject = () => {
    if (!selectedApp) return;
    handleUpdateStatus(selectedApp.applicationId, 'Rejected');
  };

  const handleMessage = async () => {
    if (!selectedApp || !user?.userId) return;

    try {
      // Create or get conversation
      const conversationResponse = await api.post('/conversation', {
        participant1Id: user.userId,
        participant2Id: selectedApp.studentId
      });

      const conversation = conversationResponse.data;

      // Navigate to chat
      navigate(`/messages/${conversation.conversationId}`, {
        state: {
          otherUserId: selectedApp.studentId,
          otherUserName: selectedApp.studentName
        }
      });
    } catch (error) {
      console.error('Failed to create conversation:', error);
      // Fallback: navigate to messages list
      navigate('/messages');
    }
  };

  const filteredApps = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => navigate('/employer/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Applications for "{jobTitle}"</h1>
              <p className="text-sm text-gray-600 mt-1">
                {applications.length} applications
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4">
            {['all', 'Pending', 'Accepted', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-[#8C00FF] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 text-xs">
                    ({applications.filter(a => a.status === status).length})
                  </span>
                )}
                {status === 'all' && (
                  <span className="ml-2 text-xs">({applications.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600">Check back later for new applicants</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application List */}
            <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredApps.map((app) => (
                <div
                  key={app.applicationId}
                  onClick={() => setSelectedApp(app)}
                  className={`bg-white rounded-lg p-4 cursor-pointer transition shadow-sm hover:shadow-md ${
                    selectedApp?.applicationId === app.applicationId
                      ? 'border-2 border-[#8C00FF]'
                      : 'border border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {app.studentName?.charAt(0).toUpperCase() || 'S'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {app.studentName}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{app.studentRating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{app.studentCompletedJobs || 0} jobs</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {app.coverLetter}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Details */}
            {selectedApp && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {/* Student Header */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                        {selectedApp.studentName?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedApp.studentName}
                        </h2>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{selectedApp.studentEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg font-medium ${getStatusColor(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-800 mb-1">
                        <Star className="w-5 h-5" />
                        <span className="text-sm font-medium">Rating</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-900">
                        {selectedApp.studentRating?.toFixed(1) || '0.0'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-blue-800 mb-1">
                        <Briefcase className="w-5 h-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {selectedApp.studentCompletedJobs || 0}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 mb-1">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm font-medium">Applied</span>
                      </div>
                      <p className="text-sm font-bold text-green-900">
                        {new Date(selectedApp.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cover Letter</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedApp.coverLetter}
                      </p>
                    </div>
                  </div>

                  {/* Attachments */}
                  {selectedApp.attachments && selectedApp.attachments.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h3>
                      <div className="space-y-2">
                        {selectedApp.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Award className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-700">Attachment {index + 1}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t">
                    {selectedApp.status === 'Pending' && (
                      <>
                        <button
                          onClick={handleAccept}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Accept
                        </button>
                        <button
                          onClick={handleReject}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={handleMessage}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Message Student
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
