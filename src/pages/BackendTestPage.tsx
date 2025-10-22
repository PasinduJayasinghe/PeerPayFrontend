import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { authService, userService, jobService, api } from '../services';
import { toast } from 'sonner';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

const BackendTestPage: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const initialTests: TestResult[] = [
    { name: 'Backend Connection', status: 'pending', message: 'Testing basic connectivity...' },
    { name: 'API Health Check', status: 'pending', message: 'Checking API health endpoint...' },
    { name: 'CORS Configuration', status: 'pending', message: 'Verifying CORS setup...' },
    { name: 'Auth Service Test', status: 'pending', message: 'Testing authentication endpoints...' },
    { name: 'User Service Test', status: 'pending', message: 'Testing user management endpoints...' },
    { name: 'Job Service Test', status: 'pending', message: 'Testing job management endpoints...' },
  ];

  useEffect(() => {
    setTests(initialTests);
  }, []);

  const updateTest = (name: string, status: 'success' | 'error', message: string, duration?: number) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, status, message, duration } : test
    ));
  };

  const runTests = async () => {
    setIsRunning(true);
    setOverallStatus('running');
    setTests(initialTests);

    try {
      // Test 1: Basic Backend Connection
      const startTime1 = Date.now();
      try {
        await api.get('/health');
        updateTest('Backend Connection', 'success', 'Successfully connected to backend', Date.now() - startTime1);
      } catch (error: any) {
        // Try alternative health check
        try {
          await api.get('/user');
          updateTest('Backend Connection', 'success', 'Connected via alternative endpoint', Date.now() - startTime1);
        } catch (altError: any) {
          updateTest('Backend Connection', 'error', `Connection failed: ${error.message}`);
        }
      }

      // Test 2: API Health Check
      const startTime2 = Date.now();
      try {
        await fetch('https://localhost:7255/api/user', { 
          method: 'GET',
          mode: 'cors',
        });
        updateTest('API Health Check', 'success', 'API is responding correctly', Date.now() - startTime2);
      } catch (error: any) {
        updateTest('API Health Check', 'error', `Health check failed: ${error.message}`);
      }

      // Test 3: CORS Configuration
      const startTime3 = Date.now();
      try {
        const response = await fetch('https://localhost:7255/api/user', {
          method: 'OPTIONS',
          headers: {
            'Origin': 'http://localhost:5173',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type',
          },
        });
        
        if (response.ok) {
          updateTest('CORS Configuration', 'success', 'CORS is properly configured', Date.now() - startTime3);
        } else {
          updateTest('CORS Configuration', 'error', `CORS preflight failed: ${response.status}`);
        }
      } catch (error: any) {
        updateTest('CORS Configuration', 'error', `CORS test failed: ${error.message}`);
      }

      // Test 4: Auth Service Test
      const startTime4 = Date.now();
      try {
        // Test with invalid credentials to avoid actual login
        await authService.login({ emailOrPhone: 'test@test.com', password: 'invalid' });
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          updateTest('Auth Service Test', 'success', 'Auth service is responding (401 expected)', Date.now() - startTime4);
        } else if (error.response && error.response.status === 404) {
          updateTest('Auth Service Test', 'error', 'Auth endpoint not found (404)');
        } else {
          updateTest('Auth Service Test', 'error', `Auth service error: ${error.message}`);
        }
      }

      // Test 5: User Service Test
      const startTime5 = Date.now();
      try {
        await userService.getAllUsers();
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          updateTest('User Service Test', 'success', 'User service is responding (auth required)', Date.now() - startTime5);
        } else if (error.response && error.response.status === 404) {
          updateTest('User Service Test', 'error', 'User endpoint not found (404)');
        } else {
          updateTest('User Service Test', 'error', `User service error: ${error.message}`);
        }
      }

      // Test 6: Job Service Test
      const startTime6 = Date.now();
      try {
        await jobService.getAllJobs();
        updateTest('Job Service Test', 'success', 'Job service is working correctly', Date.now() - startTime6);
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          updateTest('Job Service Test', 'success', 'Job service is responding (may require auth)', Date.now() - startTime6);
        } else if (error.response && error.response.status === 404) {
          updateTest('Job Service Test', 'error', 'Job endpoint not found (404)');
        } else {
          updateTest('Job Service Test', 'error', `Job service error: ${error.message}`);
        }
      }

      const successCount = tests.filter(test => test.status === 'success').length;
      const totalTests = tests.length;
      
      if (successCount === totalTests) {
        toast.success('All tests passed! Backend is ready.');
      } else if (successCount > totalTests / 2) {
        toast.warning(`${successCount}/${totalTests} tests passed. Some issues detected.`);
      } else {
        toast.error(`${successCount}/${totalTests} tests passed. Major issues detected.`);
      }

    } catch (error) {
      toast.error('Test suite failed to complete');
    } finally {
      setIsRunning(false);
      setOverallStatus('completed');
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Backend Connection Test</h1>
            <p className="text-gray-600">
              Test the connection between frontend and backend services
            </p>
          </div>

          <div className="mb-8 text-center">
            <button
              onClick={runTests}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Run Backend Tests
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all duration-300 ${getStatusColor(test.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-600">{test.message}</p>
                    </div>
                  </div>
                  {test.duration && (
                    <span className="text-sm text-gray-500">{test.duration}ms</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {overallStatus === 'completed' && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Test Summary</h3>
              <p className="text-blue-800 text-sm">
                {tests.filter(test => test.status === 'success').length} of {tests.length} tests passed.
                {tests.filter(test => test.status === 'success').length === tests.length
                  ? ' Your backend is ready for development!'
                  : ' Please check the failed tests and ensure your backend is running.'}
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Prerequisites</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Backend server running on https://localhost:7255</li>
              <li>• Database connection established</li>
              <li>• CORS configured for http://localhost:5173</li>
              <li>• All required controllers registered</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendTestPage;