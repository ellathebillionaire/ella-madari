import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import taliLogo from '@/assets/media/TaliTar__brand_board_final_direction-primary-cutout.webp';
import meshekLogo from '@/assets/media/Meshek27__final_logo_color.png.asset.json';
import siSenoraLogo from '@/assets/media/SiSenora__logo_clean_transparent.png';

describe('portfolio logo assignments', () => {
  it('uses the supplied final Tali Ter logo rather than the branding collage', () => {
    expect(projects.find((project) => project.slug === 'taliter')?.logo).toBe(taliLogo);
  });

  it('uses the full-quality supplied Meshek 27 logo', () => {
    expect(projects.find((project) => project.slug === 'meshek27')?.logo).toBe(meshekLogo.url);
  });

  it('uses the supplied Si Senora logo', () => {
    expect(projects.find((project) => project.slug === 'sisenora')?.logo).toBe(siSenoraLogo);
  });

  it('does not assign a logo to BetterSeeds because Ella did not design one', () => {
    expect(projects.find((project) => project.slug === 'betterseeds')?.logo).toBe('');
  });
});
describe('logo versions', () => {
  it('uses the supplied LEARN AI logo, not the DotAi avatar', async () => {
    const learnLogo = (await import('@/assets/media/LearnAI__brand_logo_full-cutout.webp')).default;
    expect(projects.find((project) => project.slug === 'learnai')?.logo).toBe(learnLogo);
  });

  it('shows the short SFD logo beside the full logo', async () => {
    const shortLogo = (await import('@/assets/media/SFD__rebrand_board_01.png.asset.json')).default;
    expect(projects.find((project) => project.slug === 'sfd')?.extraLogos).toEqual([shortLogo.url]);
  });
});
