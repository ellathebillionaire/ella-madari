import siSenoraOriginalLogo from '@/assets/media/SiSenora__brand_logo_transparent.png.asset.json';
import siSenoraCleanLogo from '@/assets/media/SiSenora__logo_clean_transparent.png';
import betterseedsScientificPoster from '@/assets/media/BetterSeeds__agrinetica_scientific_poster_client_work.png.asset.json';
import betterseedsScientificPosterMockup from '@/assets/media/BetterSeeds__scientific_poster_mockup.jpg';
import betterseedsConferenceFlyer from '@/assets/media/BetterSeeds__conference_flyer_ongoing_client_work.png.asset.json';
import betterseedsConferenceMockup from '@/assets/media/BetterSeeds__conference_flyer_mockup.jpg';
import learnaiBrandLogo from '@/assets/media/LearnAI__brand_logo_full.jpg.asset.json';
import sfdSummerCourseCapture from '@/assets/media/SFD__summer_course_2026_mobile_scroll.mp4.asset.json';
import betterseedsMobileCapture from '@/assets/media/BetterSeeds__official_live_website_mobile_scroll_capture.mp4.asset.json';

// Preserve CMS records while serving replacement media.
const mediaReplacements: Record<string, string> = {
  [siSenoraOriginalLogo.url]: siSenoraCleanLogo,
  [betterseedsConferenceFlyer.url]: betterseedsConferenceMockup,
  [betterseedsScientificPoster.url]: betterseedsScientificPosterMockup,
  '/assets/sfd/summer-course-2026.jpg': sfdSummerCourseCapture.url,
  '/assets/videos/BetterSeeds__official_live_website_mobile_scroll_capture.mp4': betterseedsMobileCapture.url,
  '/__l5e/assets-v1/97820109-ead0-4366-8084-3d2e87370112/LearnAI__brand_logo_full.webp': learnaiBrandLogo.url,
};

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

  const replacement = mediaReplacements[url];
  if (replacement) return replacement;
  
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
