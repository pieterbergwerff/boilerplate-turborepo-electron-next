'use client';

// import components
import { useEffect, useState } from 'react';
// import types
import type { JSX } from 'react';
import type { ToastMoleculePropTypes } from '@packages/types';

/**
 * Toast notification component.
 * @param {ToastMoleculePropTypes} props Component props
 * @returns {JSX.Element} Toast element
 */
export const ToastMoleculeComponent = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastMoleculePropTypes): JSX.Element => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return <></>;

  const typeClasses = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${typeClasses[type]} animate-slide-up`}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="ml-2 hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ToastMoleculeComponent;
