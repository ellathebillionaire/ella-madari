import { describe, expect, it } from 'vitest';
import { galleryColumns, groupProjectMedia } from './mediaGroups';

describe('project media grouping', () => {
  it('keeps four NOMA AI portraits together and outdoor media separate', () => {
    const portraits = ['golden_luna', 'maltese_ted', 'yorkie_louie', 'bulldog_donna'].map((name) => `/NOMA__ai_dog_portrait_${name}.png`);
    const outdoor = '/NOMA__ai_lifestyle_dog_walking_cooper.png';
    const groups = groupProjectMedia('noma', [portraits[0], outdoor, ...portraits.slice(1)]);
    expect(groups.map((group) => group.images)).toEqual([portraits, [outdoor]]);
  });

  it('separates white studio fashion and product images, excluding outdoor shoots', () => {
    const studio = '/Dresses2026__ai_studio_model_floral_mini_dress.webp';
    const product = '/Dresses2026__white_background_product_floral_mini_dress.webp';
    const outdoor = '/Dresses2026__ai_outdoor_model_floral_mini_dress.webp';
    expect(groupProjectMedia('dresses2026', [outdoor, product, studio])).toEqual([
      { label: 'קמפיין הלבשה ב־AI', images: [studio] },
      { label: 'תמונות מוצר בסטודיו', images: [product] },
    ]);
  });

  it('keeps any gallery within two rows', () => {
    expect(galleryColumns(1)).toBe(1);
    expect(galleryColumns(4)).toBe(4);
    expect(galleryColumns(9)).toBe(5);
    expect(galleryColumns(13)).toBe(7);
  });

  it('preserves every unmatched image once without duplicating device media', () => {
    expect(groupProjectMedia('unknown', ['/screen.png', '/custom.jpg', '/custom.jpg'], [], ['/screen.png']).flatMap((group) => group.images)).toEqual(['/custom.jpg']);
  });

  it('unifies Si Senora AI campaign and AI product media into one group', () => {
    const campaign = '/SiSenora__ai_campaign_collection_ladder_scene.png';
    const product = '/SiSenora__ai_product_detail_patterned_bag.png';
    expect(groupProjectMedia('sisenora', [campaign, product]).map((group) => group.images)).toEqual([[campaign, product]]);
  });
});
describe('Aurel groups', () => {
  it('puts model photos in their own campaign group, separate from product photos', () => {
    const groups = groupProjectMedia('aurel', [
      '/x/Aurel__lifestyle_model_portrait.jpg',
      '/x/Aurel__atelier_client_consultation.jpg',
      '/x/Aurel__product_ring_leather_hero.jpg',
    ]);
    expect(groups.map((g) => [g.label, g.images.length])).toEqual([
      ['קמפיין צילום - נוצר ב-AI', 2],
      ['תמונות מוצר - נוצרו ב-AI', 1],
    ]);
  });
});


describe('isolated brand deliverables', () => {
  it('replaces a composite with all objects while retaining its original category', () => {
    const groups = groupProjectMedia('meshek27', ['/cms/Meshek27__brand_system_overview.webp']);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe('זהות המותג');
    expect(groups[0].images).toHaveLength(10);
    expect(groups[0].images.every(image => /-cutout/.test(image))).toBe(true);
  });
  it('keeps the Tali components separate and retains unrelated original media', () => {
    const groups = groupProjectMedia('taliter', ['/cms/TaliTar__brand_board_final_direction.webp', '/custom.jpg']);
    expect(groups[0].label).toBe('זהות המותג');
    expect(groups[0].images).toHaveLength(8);
    expect(groups[1].images).toEqual(['/custom.jpg']);
  });
  it('folds the original Tali logo into the primary cutout instead of a separate card', () => {
    const groups = groupProjectMedia('taliter', ['/cms/TaliTar__final_logo.webp', '/cms/TaliTar__brand_board_final_direction.webp']);
    expect(groups[0].images).toHaveLength(8);
    expect(groups[0].images.every(image => /-cutout/.test(image))).toBe(true);
  });
});
