import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, DollarSign, Calendar, MapPin, Clock, Users, Tag } from 'lucide-react';
import { toast } from 'sonner';
import jobService from '../../services/jobService';
import { useAuthStore } from '../../store/authStore';
import type { PayType, JobType } from '../../types';

interface JobFormData {
  title: string;
  description: string;
  categoryId: string;
  payAmount: string;
  payType: PayType;
  durationDays: string;
  requiredSkills: string;
  deadline: string;
  location: string;
  jobType: JobType;
  maxApplicants: string;
}

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    categoryId: '',
    payAmount: '',
    payType: 'Fixed',
    durationDays: '',
    requiredSkills: '',
    deadline: '',
    location: '',
    jobType: 'ProjectBased',
    maxApplicants: '10',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.userId) {
      toast.error('You must be logged in to post a job');
      navigate('/login');
      return;
    }

    // Validation
    if (!formData.title.trim() || formData.title.length < 5) {
      toast.error('Job title must be at least 5 characters');
      return;
    }

    if (!formData.description.trim() || formData.description.length < 20) {
      toast.error('Job description must be at least 20 characters');
      return;
    }

    if (!formData.categoryId) {
      toast.error('Please select a job category');
      return;
    }

    if (!formData.payAmount || parseFloat(formData.payAmount) <= 0) {
      toast.error('Pay amount must be greater than 0');
      return;
    }

    if (!formData.durationDays || parseInt(formData.durationDays) <= 0) {
      toast.error('Duration must be at least 1 day');
      return;
    }

    if (!formData.requiredSkills.trim()) {
      toast.error('Please specify at least one required skill');
      return;
    }

    if (!formData.deadline) {
      toast.error('Please select a deadline');
      return;
    }

    const deadlineDate = new Date(formData.deadline);
    if (deadlineDate <= new Date()) {
      toast.error('Deadline must be in the future');
      return;
    }

    if (!formData.location.trim()) {
      toast.error('Please specify a location');
      return;
    }

    if (!formData.maxApplicants || parseInt(formData.maxApplicants) <= 0) {
      toast.error('Maximum applicants must be at least 1');
      return;
    }

    setLoading(true);

    try {
      const skillsArray = formData.requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      await jobService.createJob({
        employerId: user.userId,
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        payAmount: parseFloat(formData.payAmount),
        payType: formData.payType,
        durationDays: parseInt(formData.durationDays),
        requiredSkills: skillsArray,
        deadline: formData.deadline,
        location: formData.location,
        jobType: formData.jobType,
        maxApplicants: parseInt(formData.maxApplicants),
      });

      toast.success('Job posted successfully!');
      navigate('/employer/dashboard');
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.error || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/employer/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8C00FF] rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
              <p className="text-sm text-gray-600">Fill in the details to post your job</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Frontend Developer for E-commerce Website"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent appearance-none"
                required
              >
                <option value="">Select a category</option>
                <option value="cat1">Web Development</option>
                <option value="cat2">Mobile Development</option>
                <option value="cat3">Graphic Design</option>
                <option value="cat4">Content Writing</option>
                <option value="cat5">Data Entry</option>
                <option value="cat6">Digital Marketing</option>
                <option value="cat7">Video Editing</option>
                <option value="cat8">Other</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              placeholder="Describe the job requirements, responsibilities, and any other relevant details..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
          </div>

          {/* Pay Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="payAmount"
                  value={formData.payAmount}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                  min="1"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Type <span className="text-red-500">*</span>
              </label>
              <select
                name="payType"
                value={formData.payType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                required
              >
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Fixed">Fixed (Project Based)</option>
              </select>
            </div>
          </div>

          {/* Duration and Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                  min="1"
                  max="365"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                required
              >
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="ProjectBased">Project Based</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleInputChange}
              placeholder="e.g., React, TypeScript, Node.js (comma-separated)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter skills separated by commas (max 20 skills)
            </p>
          </div>

          {/* Location and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Remote, Colombo, Sri Lanka"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Max Applicants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Applicants <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="maxApplicants"
                value={formData.maxApplicants}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                min="1"
                max="1000"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of applications you want to receive (1-1000)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/employer/dashboard')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting Job...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
