// import types
import type { JSX } from 'react';
import type { ImageAtomPropTypes } from '@packages/types';

/**
 * Image component with Tailwind styling.
 * @param {ImageAtomPropTypes} props Component props
 * @returns {JSX.Element} Image element
 */
export const ImageAtomComponent = ({
  src,
  alt,
  width,
  height,
  className = '',
}: ImageAtomPropTypes): JSX.Element => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`max-w-full h-auto ${className}`}
    />
  );
};

export default ImageAtomComponent;
