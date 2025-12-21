/**
 * Get a value from local storage.
 * @param {string} key Storage key
 * @returns {string | null} Value or null if not found
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);
}

/**
 * Set a value in local storage.
 * @param {string} key Storage key
 * @param {string} value Value to store
 * @returns {void}
 */
export function setLocalStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
}
