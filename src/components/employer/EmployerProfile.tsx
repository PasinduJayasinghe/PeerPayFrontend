import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  MapPin,
  Globe,
  Save,
  Edit2,
  Upload
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

const EmployerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    companyName: '',
    companyDescription: '',
    industry: '',
    location: '',
    website: '',
    companySize: '',
    logoUrl: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // TODO: Fetch employer profile data from backend
    fetchEmployerProfile();
  }, [user, navigate]);

  const fetchEmployerProfile = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        companyName: 'Tech Solutions Inc.',
        companyDescription: 'Leading technology solutions provider',
        industry: 'Technology',
        location: 'Colombo, Sri Lanka',
        website: 'https://techsolutions.com',
        companySize: '50-100',
        logoUrl: ''
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
      // TODO: Call API to update employer profile
      // await employerService.updateEmployerProfile(user?.userId || '', formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      await fetchEmployerProfile(); // Refresh data
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/employer/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employer Profile</h1>
              <p className="text-sm text-gray-600">Manage your company information</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#8C00FF] to-[#7000CC] rounded-full flex items-center justify-center">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Company Logo" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Building className="w-12 h-12 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{formData.companyName || 'Company Name'}</h2>
                  <p className="text-gray-600">{formData.name}</p>
                  <p className="text-sm text-gray-500">{formData.email}</p>
                </div>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isEditing
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-[#8C00FF] text-white hover:bg-[#7000CC]'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select Company Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-500">101-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us about your company..."
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#8C00FF] text-white rounded-lg hover:bg-[#7000CC] transition disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    fetchEmployerProfile();
                  }}
                  disabled={loading}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
