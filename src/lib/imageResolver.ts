// Map of static asset paths to their imports
// This is needed because Vite requires static imports for assets in src/assets

const assetModules = import.meta.glob<{ default: string }>('/src/assets/**/*.{jpg,jpeg,png,gif,webp,svg,mp4}', { eager: true });

/**
 * Resolves an image URL that might be:
 * 1. A full URL (https://...)
 * 2. A storage URL (already resolved)
 * 3. A relative path from assets (/assets/...) that needs to be resolved via Vite
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Already a full URL (storage, external)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Blob URL (temporary)
  if (url.startsWith('blob:')) {
    return url;
  }
  
  // Relative path from assets - need to resolve via Vite's import.meta.glob
  if (url.startsWith('/assets/')) {
    const viteKey = `/src${url}`;
    const module = assetModules[viteKey];
    if (module) {
      return module.default;
    }
    // Fallback - try without leading slash
    console.warn(`Asset not found: ${url}`);
    return null;
  }
  
  // Already resolved or unknown format
  return url;
}

/**
 * Helper to check if an image URL is resolvable
 */
export function isImageResolvable(url: string | null | undefined): boolean {
  return resolveImageUrl(url) !== null;
}
