'use client';

// import utils
import { observer } from '@packages/storage';

// import stores
import { pageStoreInstance } from '@packages/storage';

// import types
import type { FC } from 'react';

export const TitleBarAtomComponent: FC = observer(() => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[rgb(243,244,246)] border-b border-black/10 shrink-0 min-h-8 h-8">
      <div className="mx-auto text-xs text-black/60">
        {pageStoreInstance.title}
      </div>
    </div>
  );
});

export default TitleBarAtomComponent;
