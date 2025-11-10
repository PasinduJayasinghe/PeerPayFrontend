import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuthService } from '../../hooks/useService';
import type { RegisterEmployerDto } from '../../types';

interface EmployerOnboardingFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  companyType: string;
  description: string;
  contactPerson: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const EmployerOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { loading, execute } = useAuthService();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<EmployerOnboardingFormData>({
    mode: 'onBlur',
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<EmployerOnboardingFormData> = async (data) => {
    const employerData: RegisterEmployerDto = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      companyName: data.companyName,
      companyType: data.companyType,
      description: data.description,
      contactPerson: data.contactPerson,
    };

    const result = await execute(
      () => authService.registerEmployer(employerData),
      {
        toastMessages: {
          success: 'Registration successful! Please login to continue.',
          error: 'Registration failed. Please try again.',
        },
      }
    );

    if (result) {
      // Navigate to login page since registration might not auto-login
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 lg:py-16 xl:py-20 px-4">
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 mb-2 lg:mb-4">PeerPay.lk</h1>
          <p className="text-gray-600 text-base lg:text-lg xl:text-xl">Register Your Business</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-10 xl:p-12 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 200, message: 'Name cannot exceed 200 characters' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="contact@business.lk"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+94XXXXXXXXX or 0XXXXXXXXX"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: { value: /^(\+94[0-9]{9}|0[0-9]{9})$/, message: 'Enter valid Sri Lankan number' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
                          message: 'Password must contain uppercase, lowercase, number, and special character',
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                  Next: Business Information
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Business Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    {...register('companyName', { required: 'Company name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Type *</label>
                  <select
                    {...register('companyType', { required: 'Company type is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="individual">Individual</option>
                    <option value="startup">Startup</option>
                    <option value="ngo">NGO</option>
                    <option value="company">Company</option>
                  </select>
                  {errors.companyType && <p className="text-red-600 text-sm mt-1">{errors.companyType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your business..."
                    {...register('description', { 
                      required: 'Description is required',
                      minLength: { value: 10, message: 'Description must be at least 10 characters' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    placeholder="Primary contact person name"
                    {...register('contactPerson', { required: 'Contact person is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.contactPerson && <p className="text-red-600 text-sm mt-1">{errors.contactPerson.message}</p>}
                </div>

                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register('acceptTerms', { required: 'You must accept terms and conditions' })} className="mt-1" />
                  <span className="text-sm text-gray-700">I accept the terms and conditions *</span>
                </label>
                {errors.acceptTerms && <p className="text-red-600 text-sm mt-1">{errors.acceptTerms.message}</p>}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-green-400"
                  >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerOnboarding;