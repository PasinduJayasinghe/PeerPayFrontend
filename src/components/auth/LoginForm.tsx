import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuthService } from '../../hooks/useService';
import { useAuthStore } from '../../store/authStore';
import type { LoginDto } from '../../types';

interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userType, setUserType] = useState<'student' | 'employer' | 'admin'>('student');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { loading, execute } = useAuthService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    const loginData: LoginDto = {
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    };

    const result = await execute(
      () => authService.login(loginData),
      {
        toastMessages: {
          success: 'Login successful!',
          error: 'Login failed. Please check your credentials.',
        },
      }
    );

    if (result) {
      // Debug: Log the result to see what userType is being returned
      console.log('Login result:', result);
      console.log('User type:', result.user.userType);
      console.log('User type typeof:', typeof result.user.userType);
      
      // Map numeric userType to string if needed
      let userTypeString: 'Student' | 'Employer' | 'Admin';
      if (typeof result.user.userType === 'number') {
        // Backend is returning enum as number (1=Student, 2=Employer, 3=Admin)
        const userTypeMap: Record<number, 'Student' | 'Employer' | 'Admin'> = {
          1: 'Student',
          2: 'Employer',
          3: 'Admin'
        };
        userTypeString = userTypeMap[result.user.userType as unknown as number] || 'Student';
      } else {
        userTypeString = result.user.userType as 'Student' | 'Employer' | 'Admin';
      }
      
      // Ensure user.id is set (use userId as fallback)
      const userWithId = {
        ...result.user,
        id: result.user.id || result.user.userId,
        userType: userTypeString
      };
      
      // Store auth data using the store's setAuth method
      setAuth(result.token, userWithId, userTypeString);
      
      // Navigate based on user type
      if (userTypeString === 'Student') {
        navigate('/student/dashboard');
      } else if (userTypeString === 'Employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }

      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">PeerPay.lk</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="flex gap-4 mb-8">
          {['student', 'employer', 'admin'].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type as 'student' | 'employer' | 'admin')}
              className={`flex-1 px-4 py-3 rounded-lg font-bold transition capitalize ${
                userType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="you@example.com or +94XXXXXXXXX"
                  {...register('emailOrPhone', {
                    required: 'Email or phone number is required',
                    validate: (value) => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      const phoneRegex = /^(\+94[0-9]{9}|0[0-9]{9})$/;
                      return emailRegex.test(value) || phoneRegex.test(value) || 'Enter a valid email or phone number';
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.emailOrPhone && <p className="text-red-600 text-sm mt-1">{errors.emailOrPhone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('rememberMe')} className="w-4 h-4" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="text-center space-y-2 pt-4 border-t">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate(`/register/${userType}`)}
                className="text-blue-600 font-bold hover:underline"
              >
                Register here
              </button>
            </p>
            <p className="text-gray-600 text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;