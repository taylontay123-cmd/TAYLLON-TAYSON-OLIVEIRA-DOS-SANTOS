import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons/Icons';

interface ToastsProps {
  toasts: ToastMessage[];
}

const Toasts: React.FC<ToastsProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[100] space-y-3 w-full max-w-xs">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`flex items-center p-4 rounded-lg shadow-lg text-white w-full animate-fade-in-out ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex-shrink-0">
            {toast.type === 'success' ? <CheckCircleIcon /> : <XCircleIcon />}
          </div>
          <span className="ml-3 font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
