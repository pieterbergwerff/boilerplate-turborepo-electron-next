// import components
import Box from '@packages/ui/atoms/Box';

// import types
import type { FC, PropsWithChildren } from 'react';

const Template: FC<PropsWithChildren> = ({ children }) => (
  <Box component="main" clsx="flex flex-col overflow-hidden h-full">
    {children}
  </Box>
);

export default Template;
