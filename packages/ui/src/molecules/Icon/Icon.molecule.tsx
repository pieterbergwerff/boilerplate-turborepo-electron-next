// import components
import { IoSettingsSharp } from 'react-icons/io5';
import { TbSquareRounded } from 'react-icons/tb';

// import types
import type { FC } from 'react';
import type { IconType } from 'react-icons';

export const IconMoleculeComponent: FC<
  Omit<IconType, 'type'> & {
    type:
      | 'mac-settings'
      | 'windows-settings'
      | 'linux-settings'
      | 'default'
      | null;
  }
> = ({ type, ...props }) => {
  if (type === 'mac-settings') {
    return <IoSettingsSharp size={24} color="currentColor" {...props} />;
  }

  if (type === 'default') {
    return <TbSquareRounded size={24} color="currentColor" {...props} />;
  }

  return null;
};

export default IconMoleculeComponent;
