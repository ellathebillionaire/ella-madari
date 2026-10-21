import cutout0 from '@/assets/media/LearnAI__brand_logo_full-cutout.webp';
import cutout1 from '@/assets/media/BetterSeeds__ai_crop_dna_peanut_illustration-cutout.webp';
import cutout2 from '@/assets/media/BetterSeeds__ai_crop_dna_cacao_illustration-cutout.webp';
import cutout3 from '@/assets/media/PlayPetPal__character_chuck_product_render-cutout.webp';
import cutout4 from '@/assets/media/PlayPetPal__character_tweet_product_render-cutout.webp';
import cutout5 from '@/assets/media/StudioAlef__logo_clean_presentation-cutout.webp';
import meshek0 from '@/assets/media/Meshek27__brand_system_overview-van-cutout.webp';
import meshek1 from '@/assets/media/Meshek27__brand_system_overview-box-tall-cutout.webp';
import meshek2 from '@/assets/media/Meshek27__brand_system_overview-box-wide-cutout.webp';
import meshek3 from '@/assets/media/Meshek27__brand_system_overview-box-open-front-cutout.webp';
import meshek4 from '@/assets/media/Meshek27__brand_system_overview-box-open-large-cutout.webp';
import meshek5 from '@/assets/media/Meshek27__brand_system_overview-box-open-small-cutout.webp';
import meshek6 from '@/assets/media/Meshek27__brand_system_overview-box-small-top-cutout.webp';
import meshek7 from '@/assets/media/Meshek27__brand_system_overview-box-small-bottom-cutout.webp';
import meshek8 from '@/assets/media/Meshek27__brand_system_overview-bag-left-cutout.webp';
import meshek9 from '@/assets/media/Meshek27__brand_system_overview-bag-right-cutout.webp';
import tali0 from '@/assets/media/TaliTar__brand_board_final_direction-primary-cutout.webp';
import tali1 from '@/assets/media/TaliTar__brand_board_final_direction-symbol-cutout.webp';
import tali3 from '@/assets/media/TaliTar__brand_board_final_direction-palette-cutout.webp';
import tali4 from '@/assets/media/TaliTar__brand_board_final_direction-type-cutout.webp';
import tali5 from '@/assets/media/TaliTar__brand_board_final_direction-strength-cutout.webp';
import tali6 from '@/assets/media/TaliTar__brand_board_final_direction-balance-cutout.webp';
import tali7 from '@/assets/media/TaliTar__brand_board_final_direction-energy-cutout.webp';
import tali8 from '@/assets/media/TaliTar__brand_board_final_direction-alignment-cutout.webp';

// Match source filenames so hosted CMS paths and local references resolve identically.
const cutoutSets: Record<string, string[]> = {
  'LearnAI__brand_logo_full.jpg': [cutout0],
  'BetterSeeds__ai_crop_dna_peanut_illustration.png': [cutout1],
  'BetterSeeds__ai_crop_dna_cacao_illustration.png': [cutout2],
  'PlayPetPal__character_chuck_product_render.webp': [cutout3],
  'PlayPetPal__character_tweet_product_render.webp': [cutout4],
  'StudioAlef__logo_clean_presentation.webp': [cutout5],
  'Meshek27__brand_system_overview.webp': [meshek0, meshek1, meshek2, meshek3, meshek4, meshek5, meshek6, meshek7, meshek8, meshek9],
  'TaliTar__brand_board_final_direction.webp': [tali0, tali1, tali3, tali4, tali5, tali6, tali7, tali8],
};
const filename = (src: string) => {
  const name = src.split('?')[0].split('/').pop() || src;
  try { return decodeURIComponent(name); } catch { return name; }
};
export function expandCutoutMedia(src: string): string[] {
  return cutoutSets[filename(src)] || [src];
}
export function replaceSingleCutout(src: string): string | null {
  const set = cutoutSets[filename(src)];
  return set?.length === 1 ? set[0] : null;
}
export const isCutoutAsset = (src?: string | null) => Boolean(src && /-cutout(?:-[\w-]+)?\.webp(?:\?|$)/i.test(src));
