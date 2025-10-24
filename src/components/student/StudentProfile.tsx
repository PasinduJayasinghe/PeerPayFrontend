import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Briefcase,
  DollarSign,
  Star,
  Upload,
  Save,
  Edit2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { studentService } from '../../services';
import type { StudentProfile as StudentProfileType, UpdateStudentProfileDto } from '../../services/studentService';
import { toast } from 'sonner';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    university: '',
    course: '',
    yearOfStudy: '',
    bio: '',
    skills: [] as string[],
    cvUrl: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // TODO: Fetch student profile data from backend
    fetchStudentProfile();
  }, [user, navigate]);

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      // Get student ID from user - assuming userId is the studentId or we need to fetch it
      const profile = await studentService.getStudentProfile(user?.userId || '');
      setStudentId(profile.studentId);
      setFormData({
        name: profile.name || user?.name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || user?.phone || '',
        university: profile.university || '',
        course: profile.course || '',
        yearOfStudy: profile.yearOfStudy?.toString() || '',
        bio: profile.bio || '',
        skills: [],
        cvUrl: profile.cvUrl || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateDto: UpdateStudentProfileDto = {
        name: formData.name,
        phone: formData.phone,
        university: formData.university,
        course: formData.course,
        yearOfStudy: formData.yearOfStudy ? parseInt(formData.yearOfStudy) : undefined,
        bio: formData.bio,
        cvUrl: formData.cvUrl
      };
      await studentService.updateStudentProfile(studentId, updateDto);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      await fetchStudentProfile(); // Refresh data
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-[#8C00FF] to-[#7000CC] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-[#8C00FF]" />
                  <div>
                    <p className="text-xs text-gray-600">Rating</p>
                    <p className="text-sm font-semibold text-gray-900">N/A</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-[#8C00FF]" />
                  <div>
                    <p className="text-xs text-gray-600">Completed Jobs</p>
                    <p className="text-sm font-semibold text-gray-900">0</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-[#8C00FF]" />
                  <div>
                    <p className="text-xs text-gray-600">Total Earnings</p>
                    <p className="text-sm font-semibold text-gray-900">$0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#8C00FF]" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#8C00FF]" />
                Academic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., University of Colombo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Major
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8C00FF]" />
                About Me
              </h3>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={5}
                placeholder="Tell us about yourself, your skills, and what kind of work you're looking for..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none"
              />
            </div>

            {/* CV Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#8C00FF]" />
                Resume/CV
              </h3>

              {formData.cvUrl ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#8C00FF] bg-opacity-10 rounded-lg">
                      <Upload className="w-5 h-5 text-[#8C00FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Resume.pdf</p>
                      <p className="text-xs text-gray-500">Uploaded</p>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => setFormData({ ...formData, cvUrl: '' })}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    {isEditing ? 'Click to upload or drag and drop' : 'No resume uploaded'}
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                  {isEditing && (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        // TODO: Handle file upload
                        if (e.target.files?.[0]) {
                          toast.info('File upload functionality coming soon');
                        }
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
