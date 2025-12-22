// import types
import type { FC, PropsWithChildren } from 'react';

export const TitleBarAtomComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[rgb(243,244,246)] border-b border-black/10 shrink-0">
      <div className="mx-auto text-xs text-black/60">{children}</div>
    </div>
  );
};

export default TitleBarAtomComponent;
