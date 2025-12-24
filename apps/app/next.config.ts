// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const scriptSrc = ["'self'", "'unsafe-inline'"];
if (isDev) scriptSrc.push("'unsafe-eval'");

const connectSrc = ["'self'"];
if (isDev) {
  connectSrc.push(
    'ws://localhost:3000',
    'ws://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  );
}

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src ${connectSrc.join(' ')}`,
  "frame-ancestors 'none'",
].join('; ');

const base: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: [
    '@packages/ui',
    '@packages/validators',
    '@packages/database',
    '@packages/hooks',
    '@packages/storage',
    '@packages/types',
    '@utils/client',
    '@utils/common',
    '@utils/server',
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: csp,
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
