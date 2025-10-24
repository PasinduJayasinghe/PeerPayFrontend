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
  Building,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  X,
  Bookmark,
  BookmarkPlus,
  Share2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { jobService } from '../../services';
import { toast } from 'sonner';
import type { Job, JobType, PayType } from '../../types';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!id) {
      navigate('/student/jobs');
      return;
    }

    fetchJobDetails();
    checkIfApplied();
    checkIfSaved();
  }, [user, id, navigate]);

  const fetchJobDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const jobData = await jobService.getJobById(id);
      setJob(jobData);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast.error('Failed to load job details');
      navigate('/student/jobs');
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    if (!user?.userId || !id) return;

    try {
      const applications = await jobService.getStudentApplications(user.userId);
      const applied = applications.some(app => app.jobId === id);
      setHasApplied(applied);
    } catch (error) {
      console.error('Failed to check application status:', error);
    }
  };

  const checkIfSaved = () => {
    if (!user?.userId || !id) return;

    const saved = localStorage.getItem(`savedJobs_${user.userId}`);
    if (saved) {
      const savedJobs = new Set(JSON.parse(saved));
      setIsSaved(savedJobs.has(id));
    }
  };

  const toggleSaveJob = () => {
    if (!user?.userId || !id) return;

    const saved = localStorage.getItem(`savedJobs_${user.userId}`);
    const savedJobs = new Set(saved ? JSON.parse(saved) : []);

    if (savedJobs.has(id)) {
      savedJobs.delete(id);
      setIsSaved(false);
      toast.success('Job removed from saved');
    } else {
      savedJobs.add(id);
      setIsSaved(true);
      toast.success('Job saved!');
    }

    localStorage.setItem(`savedJobs_${user.userId}`, JSON.stringify([...savedJobs]));
  };

  const handleApply = async () => {
    if (!user?.userId || !id) return;

    if (!coverLetter.trim()) {
      toast.error('Please write a cover letter');
      return;
    }

    try {
      setApplying(true);
      await jobService.applyForJob({
        jobId: id,
        studentId: user.userId,
        coverLetter: coverLetter.trim(),
        attachments: attachments.length > 0 ? attachments : undefined
      });

      toast.success('Application submitted successfully!');
      setHasApplied(true);
      setShowApplicationModal(false);
      setCoverLetter('');
      setAttachments([]);
    } catch (error: any) {
      console.error('Failed to submit application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title}`,
        url: window.location.href
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const getJobTypeColor = (jobType: JobType) => {
    switch (jobType) {
      case 'FullTime':
        return 'bg-blue-100 text-blue-800';
      case 'PartTime':
        return 'bg-green-100 text-green-800';
      case 'ProjectBased':
        return 'bg-purple-100 text-purple-800';
      case 'Freelance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatJobType = (jobType: JobType) => {
    switch (jobType) {
      case 'FullTime':
        return 'Full Time';
      case 'PartTime':
        return 'Part Time';
      case 'ProjectBased':
        return 'Project Based';
      case 'Freelance':
        return 'Freelance';
      default:
        return jobType;
    }
  };

  const formatPayType = (payType: PayType) => {
    return payType;
  };

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
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
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Not Found</h3>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/student/jobs')}
            className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(job.deadline);
  const isExpired = daysRemaining <= 0;
  const applicationsLeft = job.maxApplicants - (job.applicationCount || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/student/jobs')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSaveJob}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title={isSaved ? 'Remove from saved' : 'Save job'}
              >
                {isSaved ? (
                  <Bookmark className="w-6 h-6 text-[#8C00FF] fill-[#8C00FF]" />
                ) : (
                  <BookmarkPlus className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Share job"
              >
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.jobType)}`}>
                  {formatJobType(job.jobType)}
                </span>
                {job.status === 'Active' && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${job.payAmount.toLocaleString()} / {formatPayType(job.payType)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-bold text-gray-900">{job.durationDays} days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-lg font-bold text-gray-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isExpired ? 'bg-red-100' : daysRemaining <= 7 ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                    <Calendar className={`w-5 h-5 ${isExpired ? 'text-red-600' : daysRemaining <= 7 ? 'text-yellow-600' : 'text-purple-600'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className={`text-lg font-bold ${isExpired ? 'text-red-600' : daysRemaining <= 7 ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {isExpired ? 'Expired' : `${daysRemaining} days left`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Applicants</p>
                  <p className="text-lg font-bold text-gray-900">
                    {job.applicationCount || 0} / {job.maxApplicants}
                  </p>
                </div>
                {applicationsLeft > 0 && applicationsLeft <= 5 && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                    Only {applicationsLeft} spots left!
                  </span>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <div className="md:w-64">
              {hasApplied ? (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-green-900 mb-2">Already Applied</p>
                  <p className="text-sm text-green-700 mb-4">You've already applied for this job</p>
                  <button
                    onClick={() => navigate('/student/assignments')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    View Application
                  </button>
                </div>
              ) : isExpired ? (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg text-center">
                  <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-red-900 mb-2">Application Closed</p>
                  <p className="text-sm text-red-700">The deadline has passed</p>
                </div>
              ) : applicationsLeft <= 0 ? (
                <div className="p-6 bg-orange-50 border-2 border-orange-200 rounded-lg text-center">
                  <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-orange-900 mb-2">Positions Filled</p>
                  <p className="text-sm text-orange-700">Maximum applicants reached</p>
                </div>
              ) : (
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full px-6 py-4 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#8C00FF]" />
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Required Skills */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#8C00FF]" />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#8C00FF]" />
            Additional Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Posted Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(job.postedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Application Deadline</span>
              <span className="font-semibold text-gray-900">
                {new Date(job.deadline).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Category ID</span>
              <span className="font-semibold text-gray-900">{job.categoryId}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Job ID</span>
              <span className="font-mono text-sm text-gray-900">{job.jobId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  disabled={applying}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the employer why you're the perfect fit for this job..."
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent resize-none"
                  disabled={applying}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {coverLetter.length} characters
                </p>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload your resume, portfolio, or other relevant documents
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 10MB
                  </p>
                  <input
                    type="text"
                    placeholder="Enter file URL or path"
                    onChange={(e) => {
                      if (e.target.value.trim()) {
                        setAttachments([...attachments, e.target.value.trim()]);
                        e.target.value = '';
                      }
                    }}
                    className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                    disabled={applying}
                  />
                </div>
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 truncate flex-1">{attachment}</span>
                        <button
                          onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                          className="ml-2 p-1 hover:bg-gray-200 rounded transition"
                          disabled={applying}
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  disabled={applying}
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying || !coverLetter.trim()}
                  className="flex-1 px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
