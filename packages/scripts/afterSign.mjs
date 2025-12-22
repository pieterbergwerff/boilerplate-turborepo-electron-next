// import utils
import { platform } from 'node:os';

/**
 * Electron-Builder afterSign hook (macOS notarization when secrets are present).
 * Fails open (no-op) when variables are missing.
 * @param {import('electron-builder').AfterSignContext} ctx
 * @returns {Promise<void>}
 */
export default async function afterSign(ctx) {
  if (platform() !== 'darwin') return;
  const { APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, APPLE_TEAM_ID } = process.env;
  if (!APPLE_ID || !APPLE_APP_SPECIFIC_PASSWORD || !APPLE_TEAM_ID) return; // no-op

  const { notarize } = await import('@electron/notarize').catch(() => ({
    notarize: null,
  }));
  if (!notarize) return;

  await notarize({
    appBundleId: ctx.packager.appInfo.info._configuration.appId,
    appPath: ctx.appOutDir + `/${ctx.packager.appInfo.productFilename}.app`,
    appleId: APPLE_ID,
    appleIdPassword: APPLE_APP_SPECIFIC_PASSWORD,
    teamId: APPLE_TEAM_ID,
  });
}
