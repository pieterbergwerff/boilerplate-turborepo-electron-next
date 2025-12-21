// import components
import React from 'react';
// import types
export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * Image component with Tailwind styling.
 * @param {ImageProps} props Component props
 * @returns {React.JSX.Element} Image element
 */
export function Image({
  src,
  alt,
  width,
  height,
  className = '',
}: ImageProps): React.JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`max-w-full h-auto ${className}`}
    />
  );
}
