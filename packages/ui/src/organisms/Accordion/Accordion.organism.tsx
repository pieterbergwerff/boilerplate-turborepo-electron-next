'use client';

// import components
import { useState } from 'react';
// import types
import type { JSX } from 'react';
import type { AccordionOrganismPropTypes } from '@packages/types';

/**
 * Accordion component for collapsible content.
 * @param {AccordionOrganismPropTypes} props Component props
 * @returns {JSX.Element} Accordion element
 */
export const AccordionOrganismComponent = ({
  items,
  allowMultiple = false,
}: AccordionOrganismPropTypes): JSX.Element => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number): void => {
    if (allowMultiple) {
      setOpenIndexes(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes(prev => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-left">{item.title}</span>
              <span className="transform transition-transform">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 py-3 bg-gray-50 text-gray-700">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionOrganismComponent;
