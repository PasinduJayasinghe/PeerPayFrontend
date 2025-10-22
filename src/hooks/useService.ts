// Custom hook for service layer integration
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ServiceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseServiceOptions {
  showToast?: boolean;
  toastMessages?: {
    success?: string;
    error?: string;
  };
}

export function useService<T>() {
  const [state, setState] = useState<ServiceState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async <R = T>(
      serviceCall: () => Promise<R>,
      options: UseServiceOptions = {}
    ): Promise<R | null> => {
      const { showToast = true, toastMessages } = options;

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await serviceCall();
        setState(prev => ({ ...prev, data: result as unknown as T, loading: false }));

        if (showToast && toastMessages?.success) {
          toast.success(toastMessages.success);
        }

        return result;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));

        if (showToast) {
          const message = toastMessages?.error || errorMessage;
          toast.error(message);
        }

        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specific hooks for common service patterns

export function useAuthService() {
  return useService();
}

export function useUserService() {
  return useService();
}

export function useJobService() {
  return useService();
}

export function useNotificationService() {
  return useService();
}

export function useMessageService() {
  return useService();
}

export function useRatingService() {
  return useService();
}

export function usePaymentService() {
  return useService();
}

// Loading states helper
export function useLoadingStates() {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const setLoadingState = useCallback((key: string, isLoading: boolean) => {
    setLoading(prev => ({ ...prev, [key]: isLoading }));
  }, []);

  const isLoading = useCallback((key: string) => loading[key] || false, [loading]);

  return {
    setLoadingState,
    isLoading,
    loading,
  };
}

// Error handling helper
export function useErrorHandler() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const setError = useCallback((key: string, error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [key]: error || '',
    }));
  }, []);

  const clearError = useCallback((key: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getError = useCallback((key: string) => errors[key] || null, [errors]);

  return {
    setError,
    clearError,
    clearAllErrors,
    getError,
    errors,
  };
}

export default useService;