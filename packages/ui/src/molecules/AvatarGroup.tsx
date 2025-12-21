// import components
import React from 'react';
import { Avatar, type AvatarProps } from '../atoms/Avatar.js';
// import types
export interface AvatarGroupProps {
  avatars: Array<Omit<AvatarProps, 'size'>>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * AvatarGroup component for displaying multiple avatars.
 * @param {AvatarGroupProps} props Component props
 * @returns {React.JSX.Element} AvatarGroup element
 */
export function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
}: AvatarGroupProps): React.JSX.Element {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="ring-2 ring-white rounded-full">
          <Avatar size={size} fallback={`+${remaining}`} />
        </div>
      )}
    </div>
  );
}
