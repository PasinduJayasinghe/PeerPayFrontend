import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Shield, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/authStore';
import PeerPayLogo from '../../assets/images/PeerPayLogo.png';

interface AdminLoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AdminLoginFormData> = async (data: AdminLoginFormData) => {
    setLoading(true);

    // Hardcoded admin credentials (frontend-only validation)
    const ADMIN_EMAIL = 'admin@peerpay.com';
    const ADMIN_PASSWORD = 'password';

    try {
      // Validate credentials
      if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
        // Create mock admin user object
        const adminUser = {
          id: 'admin-001',
          userId: 'admin-001',
          email: ADMIN_EMAIL,
          phone: '+94000000000',
          name: 'PeerPay Admin',
          userType: 'Admin' as const,
          status: 'Active' as const,
          isVerified: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        // Create mock token
        const mockToken = 'admin-frontend-token-' + Date.now();

        // Store auth data
        setAuth(mockToken, adminUser, 'Admin');

        toast.success('Admin login successful!');
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
        
        reset();
      } else {
        toast.error('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={PeerPayLogo} alt="PeerPay Logo" className="h-16 w-auto" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="text-yellow-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Admin Portal</h1>
          </div>
          <p className="text-gray-300">Secure access for administrators</p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-300 hover:text-white font-medium mb-6 transition-colors group"
        >
          <Home size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          <div className="text-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="admin@peerpay.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Sign In as Admin
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Shield className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">
                    Authorized Access Only
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This portal is restricted to PeerPay administrators. All login attempts are monitored and logged.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Credentials (Remove in production) */}
          <div className="pt-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-800 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p><strong>Email:</strong> admin@peerpay.com</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PeerPay. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
