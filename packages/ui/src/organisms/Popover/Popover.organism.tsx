'use client';

// import components
import { useState } from 'react';
// import types
import type { JSX } from 'react';
import type { PopoverOrganismPropTypes } from '@packages/types';

/**
 * Popover component for contextual content.
 * @param {PopoverOrganismPropTypes} props Component props
 * @returns {JSX.Element} Popover element
 */
export const PopoverOrganismComponent = ({
  trigger,
  content,
  position = 'bottom',
}: PopoverOrganismPropTypes): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute z-20 ${positionClasses[position]} bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px]`}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
};

export default PopoverOrganismComponent;
