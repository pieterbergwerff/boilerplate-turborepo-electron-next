// import types
import type { JSX } from 'react';
import type { AvatarAtomPropTypes } from '@packages/types';

/**
 * Avatar component for displaying user images.
 * @param {AvatarAtomPropTypes} props Component props
 * @returns {JSX.Element} Avatar element
 */
export const AvatarAtomComponent = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback = '?',
}: AvatarAtomPropTypes): JSX.Element => {
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
};

export default AvatarAtomComponent;
