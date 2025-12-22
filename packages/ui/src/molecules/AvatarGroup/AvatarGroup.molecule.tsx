// import components
import AvatarAtomComponent from '../../atoms/Avatar/index.js';

// import types
import type { JSX } from 'react';
import type { AvatarGroupMoleculePropTypes } from '@packages/types';

/**
 * AvatarGroup component for displaying multiple avatars.
 * @param {AvatarGroupMoleculePropTypes} props Component props
 * @returns {JSX.Element} AvatarGroup element
 */
export const AvatarGroupMoleculeComponent = ({
  avatars,
  max = 5,
  size = 'md',
}: AvatarGroupMoleculePropTypes): JSX.Element => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          <AvatarAtomComponent {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="ring-2 ring-white rounded-full">
          <AvatarAtomComponent size={size} fallback={`+${remaining}`} />
        </div>
      )}
    </div>
  );
};

export default AvatarGroupMoleculeComponent;
