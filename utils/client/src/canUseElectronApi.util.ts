export function canUseElectronApiUtil(): boolean {
  return typeof window !== 'undefined' && !!window.api;
}

export default canUseElectronApiUtil;
