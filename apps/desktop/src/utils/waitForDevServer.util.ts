// import utils
const waitOn = require('wait-on');

/**
 * Wait for Next.js dev server to be ready in development mode.
 * @param {string} url The URL to wait for
 * @returns {Promise<void>} Resolves when server is ready
 */
async function waitForDevServerUtil(url: string): Promise<void> {
  console.log('[DESKTOP] Waiting for Next.js dev server at', url);
  try {
    await waitOn({
      resources: [url],
      timeout: 30000, // 30 seconds timeout
      interval: 500, // Check every 500ms
      window: 1000, // Wait 1s after resource is available
    });
    console.log('[DESKTOP] Next.js dev server is ready');
  } catch (error) {
    console.error('[DESKTOP] Failed to wait for Next.js dev server:', error);
    throw new Error('Next.js dev server failed to start within timeout');
  }
}

export default waitForDevServerUtil;
