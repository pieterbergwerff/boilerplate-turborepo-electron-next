// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
import type { NextConfig } from 'next';

const base: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@packages/ui', '@packages/validators'],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
          ].join('; '),
        },
      ],
    },
  ],
};

// Remove standalone output in dev for HMR
if (process.env.NODE_ENV === 'development') {
  delete base.output;
}

export default base;
