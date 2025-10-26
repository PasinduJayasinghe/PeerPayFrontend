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
  Users,
  BookmarkPlus,
  Bookmark,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { jobService } from '../../services';
import { toast } from 'sonner';
import type { Job, JobType, PayType } from '../../types';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

interface FilterState {
  searchTerm: string;
  location: string;
  categoryId: string;
  jobTypes: JobType[];
  payTypes: PayType[];
  minPay: string;
  maxPay: string;
  skills: string[];
}

const JobBoard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [skillInput, setSkillInput] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    categoryId: '',
    jobTypes: [],
    payTypes: [],
    minPay: '',
    maxPay: '',
    skills: []
  });

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    payType: true,
    budget: true,
    skills: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadSavedJobs();
    searchJobs();
  }, [user, navigate]);

  const searchJobs = async () => {
    try {
      setLoading(true);
      
      // FOR DEMO VIDEO: Mock job data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockJobs: Job[] = [
        {
          jobId: 'job-1',
          id: 'job-1',
          employerId: 'emp-101',
          categoryId: 'cat-1',
          title: 'Full Stack Web Developer Needed',
          description: 'Looking for an experienced full stack developer to build a modern e-commerce platform. Must have experience with React, Node.js, and MongoDB. The project includes user authentication, payment integration, and admin dashboard.',
          payAmount: 2500,
          jobType: 'Freelance',
          payType: 'Fixed',
          location: 'Remote',
          requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 24).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 14).toISOString(),
          durationDays: 42,
          maxApplicants: 10,
          applicationCount: 5
        },
        {
          jobId: 'job-2',
          id: 'job-2',
          employerId: 'emp-102',
          categoryId: 'cat-2',
          title: 'Mobile App Developer - iOS & Android',
          description: 'Need a skilled mobile developer to create a fitness tracking app for both iOS and Android platforms. The app should include workout tracking, nutrition logging, and social features.',
          payAmount: 3500,
          jobType: 'Freelance',
          payType: 'Fixed',
          location: 'Remote',
          requiredSkills: ['React Native', 'Firebase', 'Mobile Development', 'UI/UX'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 48).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 21).toISOString(),
          durationDays: 56,
          maxApplicants: 8,
          applicationCount: 8
        },
        {
          jobId: 'job-3',
          id: 'job-3',
          employerId: 'emp-103',
          categoryId: 'cat-3',
          title: 'UI/UX Designer for Dashboard Redesign',
          description: 'Seeking a creative UI/UX designer to redesign our analytics dashboard. Should have strong portfolio in data visualization and modern design principles. Figma proficiency required.',
          payAmount: 1200,
          jobType: 'Freelance',
          payType: 'Fixed',
          location: 'Remote',
          requiredSkills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 12).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 10).toISOString(),
          durationDays: 21,
          maxApplicants: 15,
          applicationCount: 12
        },
        {
          jobId: 'job-4',
          id: 'job-4',
          employerId: 'emp-104',
          categoryId: 'cat-4',
          title: 'Content Writer - Tech Blog Articles',
          description: 'Looking for a talented content writer to create engaging blog articles about technology, software development, and digital trends. Must deliver 2 articles per week (1500-2000 words each).',
          payAmount: 500,
          jobType: 'PartTime',
          payType: 'Monthly',
          location: 'Remote',
          requiredSkills: ['Content Writing', 'SEO', 'Technical Writing', 'Research'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 6).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 7).toISOString(),
          durationDays: 90,
          maxApplicants: 20,
          applicationCount: 15
        },
        {
          jobId: 'job-5',
          id: 'job-5',
          employerId: 'emp-105',
          categoryId: 'cat-5',
          title: 'Digital Marketing Specialist - Social Media',
          description: 'Need an experienced digital marketer to manage our social media presence across Instagram, Facebook, and LinkedIn. Includes content creation, scheduling, analytics, and community engagement.',
          payAmount: 800,
          jobType: 'PartTime',
          payType: 'Monthly',
          location: 'Remote',
          requiredSkills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Copywriting'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 36).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 5).toISOString(),
          durationDays: 180,
          maxApplicants: 12,
          applicationCount: 10
        },
        {
          jobId: 'job-6',
          id: 'job-6',
          employerId: 'emp-106',
          categoryId: 'cat-6',
          title: 'Data Entry Specialist - Excel & Database',
          description: 'Looking for detail-oriented data entry specialist to input and organize data from various sources into Excel and our database system. Accuracy is critical.',
          payAmount: 300,
          jobType: 'Freelance',
          payType: 'Fixed',
          location: 'Remote',
          requiredSkills: ['Data Entry', 'Excel', 'Attention to Detail', 'Database Management'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 8).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 7).toISOString(),
          durationDays: 14,
          maxApplicants: 25,
          applicationCount: 20
        },
        {
          jobId: 'job-7',
          id: 'job-7',
          employerId: 'emp-107',
          categoryId: 'cat-7',
          title: 'Video Editor - YouTube Content',
          description: 'Seeking a creative video editor for our YouTube channel. Need someone who can edit engaging videos with graphics, transitions, and sound effects. Experience with Adobe Premiere or Final Cut Pro required.',
          payAmount: 150,
          jobType: 'Freelance',
          payType: 'Hourly',
          location: 'Remote',
          requiredSkills: ['Video Editing', 'Adobe Premiere', 'After Effects', 'Color Grading'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 18).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 14).toISOString(),
          durationDays: 28,
          maxApplicants: 10,
          applicationCount: 7
        },
        {
          jobId: 'job-8',
          id: 'job-8',
          employerId: 'emp-108',
          categoryId: 'cat-8',
          title: 'Graphic Designer - Brand Identity Package',
          description: 'Need a talented graphic designer to create a complete brand identity package including logo, color palette, typography, business cards, and social media templates.',
          payAmount: 900,
          jobType: 'Freelance',
          payType: 'Fixed',
          location: 'Remote',
          requiredSkills: ['Graphic Design', 'Adobe Illustrator', 'Photoshop', 'Branding'],
          status: 'Active',
          postedDate: new Date(Date.now() - 3600000 * 4).toISOString(),
          deadline: new Date(Date.now() + 3600000 * 24 * 12).toISOString(),
          durationDays: 21,
          maxApplicants: 12,
          applicationCount: 9
        }
      ];
      
      // Apply client-side filters
      let filteredData = mockJobs;

      // Filter by search term
      if (filters.searchTerm.trim()) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredData = filteredData.filter(job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }

      // Filter by location
      if (filters.location.trim()) {
        filteredData = filteredData.filter(job =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Filter by job types
      if (filters.jobTypes.length > 0) {
        filteredData = filteredData.filter(job => filters.jobTypes.includes(job.jobType));
      }

      // Filter by pay types
      if (filters.payTypes.length > 0) {
        filteredData = filteredData.filter(job => filters.payTypes.includes(job.payType));
      }

      // Filter by budget range
      if (filters.minPay) {
        filteredData = filteredData.filter(job => job.payAmount >= parseFloat(filters.minPay));
      }
      if (filters.maxPay) {
        filteredData = filteredData.filter(job => job.payAmount <= parseFloat(filters.maxPay));
      }

      // Filter by skills
      if (filters.skills.length > 0) {
        filteredData = filteredData.filter(job =>
          filters.skills.some(skill =>
            job.requiredSkills.some(reqSkill =>
              reqSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
      }

      setJobs(filteredData);
      
      // Original API calls (commented for demo):
      // const response = await jobService.getAllJobs(1, 100);
      // const searchResponse = await jobService.searchJobs(criteria);
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

  const handleSearch = () => {
    setShowFilterPanel(false);
    searchJobs();
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      location: '',
      categoryId: '',
      jobTypes: [],
      payTypes: [],
      minPay: '',
      maxPay: '',
      skills: []
    });
    setSkillInput('');
  };

  const toggleJobType = (type: JobType) => {
    setFilters(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const togglePayType = (type: PayType) => {
    setFilters(prev => ({
      ...prev,
      payTypes: prev.payTypes.includes(type)
        ? prev.payTypes.filter(t => t !== type)
        : [...prev.payTypes, type]
    }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = () => {
    return filters.searchTerm || filters.location || filters.jobTypes.length > 0 ||
           filters.payTypes.length > 0 || filters.minPay || filters.maxPay || filters.skills.length > 0;
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
                  {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
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
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, description, or location..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition ${
                hasActiveFilters()
                  ? 'bg-[#8C00FF] text-white border-[#8C00FF] hover:bg-[#7000CC]'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters() && (
                <span className="ml-1 px-2 py-0.5 bg-white text-[#8C00FF] rounded-full text-xs font-semibold">
                  {[
                    filters.jobTypes.length,
                    filters.payTypes.length,
                    filters.skills.length,
                    filters.location ? 1 : 0,
                    filters.minPay || filters.maxPay ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filter Side Panel */}
        {showFilterPanel && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowFilterPanel(false)}
            />

            {/* Side Panel */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowFilterPanel(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Colombo, Remote"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  />
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('jobType')}
                    className="w-full flex items-center justify-between mb-2"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Job Type
                    </span>
                    {expandedSections.jobType ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.jobType && (
                    <div className="space-y-2">
                      {(['FullTime', 'PartTime', 'ProjectBased', 'Freelance'] as JobType[]).map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.jobTypes.includes(type)}
                            onChange={() => toggleJobType(type)}
                            className="w-4 h-4 text-[#8C00FF] border-gray-300 rounded focus:ring-[#8C00FF]"
                          />
                          <span className="text-sm text-gray-700">
                            {type === 'FullTime' ? 'Full Time' :
                             type === 'PartTime' ? 'Part Time' :
                             type === 'ProjectBased' ? 'Project Based' :
                             'Freelance'}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pay Type Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('payType')}
                    className="w-full flex items-center justify-between mb-2"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Payment Type
                    </span>
                    {expandedSections.payType ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.payType && (
                    <div className="space-y-2">
                      {(['Hourly', 'Daily', 'Weekly', 'Monthly', 'Fixed'] as PayType[]).map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.payTypes.includes(type)}
                            onChange={() => togglePayType(type)}
                            className="w-4 h-4 text-[#8C00FF] border-gray-300 rounded focus:ring-[#8C00FF]"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Budget Range Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('budget')}
                    className="w-full flex items-center justify-between mb-2"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Budget Range
                    </span>
                    {expandedSections.budget ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.budget && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Min ($)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={filters.minPay}
                          onChange={(e) => setFilters(prev => ({ ...prev, minPay: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Max ($)</label>
                        <input
                          type="number"
                          placeholder="Any"
                          value={filters.maxPay}
                          onChange={(e) => setFilters(prev => ({ ...prev, maxPay: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('skills')}
                    className="w-full flex items-center justify-between mb-2"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      Skills Required
                    </span>
                    {expandedSections.skills ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.skills && (
                    <div>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add skill..."
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                        />
                        <button
                          onClick={addSkill}
                          className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
                        >
                          Add
                        </button>
                      </div>
                      {filters.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {filters.skills.map(skill => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-[#8C00FF] bg-opacity-10 text-[#8C00FF] rounded-full text-sm"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="hover:bg-[#8C00FF] hover:bg-opacity-20 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      resetFilters();
                      handleSearch();
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleSearch}
                    className="flex-1 px-4 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters()
                ? 'Try adjusting your filters to see more results'
                : 'No active jobs available at the moment'}
            </p>
            {hasActiveFilters() && (
              <button
                onClick={() => {
                  resetFilters();
                  handleSearch();
                }}
                className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
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
