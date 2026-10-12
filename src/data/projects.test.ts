import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import taliLogo from '@/assets/media/TaliTar__final_logo.webp.asset.json';
import meshekLogo from '@/assets/media/Meshek27__final_logo_color.png.asset.json';
import siSenoraLogo from '@/assets/media/SiSenora__brand_logo_transparent.png.asset.json';

describe('portfolio logo assignments', () => {
  it('uses the supplied final Tali Ter logo rather than the branding collage', () => {
    expect(projects.find((project) => project.slug === 'taliter')?.logo).toBe(taliLogo.url);
  });

  it('uses the full-quality supplied Meshek 27 logo', () => {
    expect(projects.find((project) => project.slug === 'meshek27')?.logo).toBe(meshekLogo.url);
  });

  it('uses the supplied Si Senora logo', () => {
    expect(projects.find((project) => project.slug === 'sisenora')?.logo).toBe(siSenoraLogo.url);
  });

  it('does not assign a logo to BetterSeeds because Ella did not design one', () => {
    expect(projects.find((project) => project.slug === 'betterseeds')?.logo).toBe('');
  });
});