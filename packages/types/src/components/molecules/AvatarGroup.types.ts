// import types
import type { AvatarAtomPropTypes } from '../atoms/Avatar.types.js';

export interface AvatarGroupMoleculePropTypes {
  avatars: Array<Omit<AvatarAtomPropTypes, 'size'>>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}
