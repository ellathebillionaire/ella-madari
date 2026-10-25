import { describe, expect, it } from 'vitest';
import { resolveImageUrl } from './imageResolver';
import sfdDesktop from '@/assets/media/SFD__desktop_optimized.mp4.asset.json';
import sfdMobile from '@/assets/media/SFD__mobile_optimized.mp4.asset.json';
import betterDesktop from '@/assets/media/BetterSeeds__desktop_optimized.mp4.asset.json';

describe('optimized portfolio recordings', () => {
  it('resolves SFD desktop to the lighter recording', () => {
    expect(resolveImageUrl('/assets/videos/SFD__official_live_shopify_site_scroll_capture.mp4')).toBe(sfdDesktop.url);
  });
  it('resolves SFD mobile to the lighter portrait recording', () => {
    expect(resolveImageUrl('/assets/videos/SFD__official_live_shopify_site_mobile_scroll_capture.mp4')).toBe(sfdMobile.url);
  });
  it('resolves BetterSeeds desktop to the lighter recording', () => {
    expect(resolveImageUrl('/assets/videos/BetterSeeds__official_live_website_scroll_capture.mp4')).toBe(betterDesktop.url);
  });
});