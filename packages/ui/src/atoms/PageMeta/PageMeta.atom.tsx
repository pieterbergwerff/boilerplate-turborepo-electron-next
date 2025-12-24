'use client';

// import hooks
import { useLayoutEffect } from 'react';

// import stores
import { pageStoreInstance } from '@packages/storage';

// import types
import type { FC } from 'react';

export const PageMetaAtomComponent: FC<{ title: string }> = ({ title }) => {
  useLayoutEffect(() => {
    if (title?.trim().length) {
      pageStoreInstance.setTitle(title.trim());
    }
  }, [title]);

  return null;
};

export default PageMetaAtomComponent;
