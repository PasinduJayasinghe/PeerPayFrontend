// src/components/auth/StudentOnboarding.tsx
import React, { useState} from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff, CheckCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuthService } from '../../hooks/useService';
import type { RegisterStudentDto } from '../../types';

// ============ TYPES ============
interface StudentOnboardingFormData {
  name: string;
  email: string;
  university: string;
  course: string;
  yearOfStudy: number;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

// ============ COMPONENT ============
const StudentOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { loading, execute } = useAuthService();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<StudentOnboardingFormData>({
    mode: 'onBlur',
  });

  const password = watch('password');
  const email = watch('email');

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Tell us about yourself',
    },
    {
      id: 2,
      title: 'Academic Details',
      description: 'Verify your university status',
    },
    {
      id: 3,
      title: 'Email Verification',
      description: 'Confirm your email address',
    },
  ];

  const universities = [
    'University of Colombo',
    'University of Peradeniya',
    'University of Moratuwa',
    'University of Sri Jayewardenepura',
    'University of Kelaniya',
    'Sabaragamuwa University',
    'Eastern University',
    'University of Ruhuna',
    'South Eastern University',
    'Other',
  ];

  const years = [
    { label: '1st Year', value: 1 },
    { label: '2nd Year', value: 2 },
    { label: '3rd Year', value: 3 },
    { label: '4th Year', value: 4 },
  ];

  // Handle OTP Send
  const handleSendOtp = async (): Promise<void> => {
    if (!email) {
      toast.error('Please enter email first');
      return;
    }

    setIsVerifying(true);
    try {
      await authService.sendOtp(email);
      toast.success(`OTP sent to ${email}`);
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (): Promise<void> => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      await authService.verifyOtp(email, otp);
      toast.success('Email verified successfully!');
      setCurrentStep(3);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Invalid OTP');
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle Form Submit
  const onSubmit: SubmitHandler<StudentOnboardingFormData> = async (
    data: StudentOnboardingFormData
  ) => {
    const studentData: RegisterStudentDto = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      university: data.university,
      course: data.course,
      yearOfStudy: data.yearOfStudy,
    };

    const result = await execute(
      () => authService.registerStudent(studentData),
      {
        toastMessages: {
          success: 'Registration successful! Redirecting...',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">PeerPay.lk</h1>
          <p className="text-gray-600">Join as a Student</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.id
                    )}
                  </div>
                </div>

                {/* Step Label */}
                <div className="text-center">
                  <p className="text-xs md:text-sm font-semibold text-gray-800">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-600 hidden md:block">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {step.id < steps.length && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 mb-3">
                    <div
                      className={`h-1 w-16 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 200, message: 'Name cannot exceed 200 characters' },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@university.lk"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+94XXXXXXXXX or 0XXXXXXXXX"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^(\+94[0-9]{9}|0[0-9]{9})$/,
                        message: 'Enter valid Sri Lankan number (+94XXXXXXXXX or 0XXXXXXXXX)',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
                          message: 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&#)',
                        },
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Next: Academic Details
                </button>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800">Academic Details</h2>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University *
                  </label>
                  <select
                    {...register('university', {
                      required: 'Please select your university',
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.university ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select University</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                  {errors.university && (
                    <p className="text-red-600 text-sm mt-1">{errors.university.message}</p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Degree *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science, Engineering"
                    {...register('course', {
                      required: 'Course is required',
                      minLength: { value: 2, message: 'Course must be at least 2 characters' },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.course ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.course && (
                    <p className="text-red-600 text-sm mt-1">{errors.course.message}</p>
                  )}
                </div>

                {/* Year of Study */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Study *
                  </label>
                  <select
                    {...register('yearOfStudy', {
                      required: 'Please select your year',
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                  {errors.yearOfStudy && (
                    <p className="text-red-600 text-sm mt-1">{errors.yearOfStudy.message}</p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('acceptTerms', {
                        required: 'You must accept terms and conditions',
                      })}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I accept the terms and conditions *
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-600 text-sm mt-1">{errors.acceptTerms.message}</p>
                  )}
                </div>

                {/* Privacy Policy */}
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('acceptPrivacy', {
                        required: 'You must accept privacy policy',
                      })}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I accept the privacy policy *
                    </span>
                  </label>
                  {errors.acceptPrivacy && (
                    <p className="text-red-600 text-sm mt-1">{errors.acceptPrivacy.message}</p>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Next: Email Verification
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Email Verification */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
                <p className="text-gray-600">
                  Verify your email address to complete registration
                </p>

                {/* OTP Section */}
                {!otpSent ? (
                  <div className="bg-blue-50 p-6 rounded-lg text-center space-y-4">
                    <Mail size={48} className="mx-auto text-blue-600" />
                    <p className="text-gray-700">
                      We'll send an OTP to <strong>{email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isVerifying}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-400 transition"
                    >
                      {isVerifying ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Enter the 6-digit OTP sent to your email
                    </p>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifying || otp.length !== 6}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-green-400 transition"
                    >
                      {isVerifying ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Didn't receive OTP? Send again
                    </button>
                  </div>
                )}

                {/* Complete Registration */}
                {currentStep === 3 && otpSent && otp.length === 6 && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-green-400 transition"
                  >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                  </button>
                )}

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                >
                  Back
                </button>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-bold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboarding;