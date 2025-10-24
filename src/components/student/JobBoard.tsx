import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  ArrowLeft,
  TrendingUp,
  Users,
  Star,
  BookmarkPlus,
  Bookmark
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { jobService } from '../../services';
import { toast } from 'sonner';
import type { Job, JobType, PayType } from '../../types';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const JobBoard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | 'All'>('All');
  const [selectedPayType, setSelectedPayType] = useState<PayType | 'All'>('All');
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchJobs();
    loadSavedJobs();
  }, [user, navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedJobType, selectedPayType, minBudget, maxBudget, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAllJobs(1, 100);
      // Backend returns array directly in response.data, not response.data.data
      const jobsData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      const activeJobs = jobsData.filter((job: Job) => job.status === 'Active');
      setJobs(activeJobs);
      setFilteredJobs(activeJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedJobs = () => {
    const saved = localStorage.getItem(`savedJobs_${user?.userId}`);
    if (saved) {
      setSavedJobs(new Set(JSON.parse(saved)));
    }
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast.success('Job removed from saved');
    } else {
      newSavedJobs.add(jobId);
      toast.success('Job saved!');
    }
    setSavedJobs(newSavedJobs);
    localStorage.setItem(`savedJobs_${user?.userId}`, JSON.stringify([...newSavedJobs]));
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.requiredSkills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Job type filter
    if (selectedJobType !== 'All') {
      filtered = filtered.filter(job => job.jobType === selectedJobType);
    }

    // Pay type filter
    if (selectedPayType !== 'All') {
      filtered = filtered.filter(job => job.payType === selectedPayType);
    }

    // Budget filters
    if (minBudget) {
      filtered = filtered.filter(job => job.payAmount >= parseFloat(minBudget));
    }
    if (maxBudget) {
      filtered = filtered.filter(job => job.payAmount <= parseFloat(maxBudget));
    }

    setFilteredJobs(filtered);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedJobType('All');
    setSelectedPayType('All');
    setMinBudget('');
    setMaxBudget('');
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
          <p className="mt-4 text-gray-600">Loading jobs...</p>
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
                onClick={() => navigate('/student/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
                <p className="text-sm text-gray-600">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/student/assignments')}
              className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
            >
              My Applications
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, description, skills, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value as JobType | 'All')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  >
                    <option value="All">All Types</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                    <option value="ProjectBased">Project Based</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                {/* Pay Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pay Type</label>
                  <select
                    value={selectedPayType}
                    onChange={(e) => setSelectedPayType(e.target.value as PayType | 'All')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  >
                    <option value="All">All Pay Types</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Fixed">Fixed</option>
                  </select>
                </div>

                {/* Min Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  />
                </div>

                {/* Max Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget ($)</label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedJobType !== 'All' || selectedPayType !== 'All' || minBudget || maxBudget
                ? 'Try adjusting your filters to see more results'
                : 'No active jobs available at the moment'}
            </p>
            {(searchQuery || selectedJobType !== 'All' || selectedPayType !== 'All' || minBudget || maxBudget) && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const daysRemaining = getDaysRemaining(job.deadline);
              const isSaved = savedJobs.has(job.jobId);

              return (
                <div
                  key={job.jobId}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8C00FF] transition">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
                            {formatJobType(job.jobType)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveJob(job.jobId)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        {isSaved ? (
                          <Bookmark className="w-5 h-5 text-[#8C00FF] fill-[#8C00FF]" />
                        ) : (
                          <BookmarkPlus className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    {/* Job Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          ${job.payAmount.toLocaleString()}
                        </span>
                        <span>/ {formatPayType(job.payType)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{job.durationDays} days</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span
                          className={`font-medium ${
                            daysRemaining <= 3 ? 'text-red-600' : daysRemaining <= 7 ? 'text-yellow-600' : 'text-gray-600'
                          }`}
                        >
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span>
                          {job.applicationCount || 0} / {job.maxApplicants} applicants
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {job.requiredSkills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.requiredSkills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                              +{job.requiredSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={() => navigate(`/student/jobs/${job.jobId}`)}
                      className="w-full px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition font-medium"
                    >
                      View Details & Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
