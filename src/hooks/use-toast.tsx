import { useCallback } from 'react';
import { toast } from 'sonner';

type ToastVariant = 'default' | 'error' | 'success' | 'info' | 'warning';

interface ToastOptions {
  title: string;
  variant?: ToastVariant;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Custom hook useToast
const useToast = () => {
  const showToast = useCallback((options: ToastOptions) => {
    const { variant = 'default', title, description, duration = 5000, action } = options;

    switch (variant) {
      case 'success':
        toast.success(title, {
          description,
          duration,
          action
        });
        break;
      case 'error':
        toast.error(title, {
          description,
          duration,
          action
        });
        break;
      case 'info':
        toast.info(title, {
          description,
          duration,
          action
        });
        break;
      case 'warning':
        toast.warning(title, {
          description,
          duration,
          action
        });
        break;
      default:
        toast(title, {
          description,
          duration,
          action
        });
        break;
    }
  }, []);

  return { toast: showToast };
};

export default useToast;
