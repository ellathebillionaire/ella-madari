import { describe, expect, it } from 'vitest';
import { groupProjectMedia } from './mediaGroups';

describe('project media grouping', () => {
  it('keeps four NOMA AI portraits together and outdoor media separate', () => {
    const portraits = ['golden_luna', 'maltese_ted', 'yorkie_louie', 'bulldog_donna'].map((name) => `/NOMA__ai_dog_portrait_${name}.png`);
    const outdoor = '/NOMA__ai_lifestyle_dog_walking_cooper.png';
    const groups = groupProjectMedia('noma', [portraits[0], outdoor, ...portraits.slice(1)]);
    expect(groups.map((group) => group.images)).toEqual([portraits, [outdoor]]);
  });

  it('groups interleaved studio, outdoor and product media by service', () => {
    const images = ['/Dresses2026__ai_studio_a.webp', '/Dresses2026__ai_outdoor_a.webp', '/Dresses2026__white_background_product_a.webp', '/Dresses2026__ai_studio_b.webp'];
    expect(groupProjectMedia('dresses2026', images).map((group) => group.images)).toEqual([[images[0], images[3]], [images[1]], [images[2]]]);
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