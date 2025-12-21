// import components
import React from 'react';
// import types
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

/**
 * Avatar component for displaying user images.
 * @param {AvatarProps} props Component props
 * @returns {React.JSX.Element} Avatar element
 */
export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback = '?',
}: AvatarProps): React.JSX.Element {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-600 font-medium">{fallback}</span>
      )}
    </div>
  );
}
