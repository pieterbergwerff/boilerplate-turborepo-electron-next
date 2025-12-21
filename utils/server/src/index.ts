// import utils
import { readFile as fsReadFile } from 'node:fs/promises';

/**
 * Read a file safely with error handling.
 * @param {string} path File path to read
 * @returns {Promise<string>} File contents
 */
export async function readFile(path: string): Promise<string> {
  return fsReadFile(path, 'utf-8');
}

/**
 * Check if code is running on server.
 * @returns {boolean} True if running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}
