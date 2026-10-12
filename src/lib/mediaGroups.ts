export type MediaGroupRule = { label: string; match: RegExp };
export type MediaGroup = { label: string; images: string[] };

const projectRules: Record<string, MediaGroupRule[]> = {
  noma: [
    { label: 'פרטי המוצר', match: /product_closeup/ },
    { label: 'דיוקנאות כלבים - נוצרו ב-AI', match: /ai_dog_portrait/ },
    { label: 'חוץ - נוצר ב-AI', match: /ai_lifestyle/ },
    { label: 'מדריך מידות', match: /size_chart/ },
  ],
  aurel: [
    { label: 'עמודי האתר', match: /_page_desktop/ },
    { label: 'תמונות - נוצרו ב-AI', match: /Aurel__(?!.*_page_desktop)(?!homepage)/ },
  ],
  betterseeds: [
    { label: 'ויזואלים - נוצרו ב-AI', match: /__ai_|ai-(gene|dna|plant|drone|crispr)|betterseeds-hero/i },
    { label: 'עיצוב לכנסים', match: /conference|scientific_poster/ },
  ],
  sfd: [
    { label: 'זהות המותג', match: /rebrand_|logo|symbol|monogram/i },
    { label: 'קיט המוצרים', match: /bands|product.*flatlay|kit_flatlay/i },
    { label: 'המותג בסטודיו', match: /studio_|class_studio/i },
    { label: 'דפי נחיתה', match: /summer-course|hero|stats/i },
  ],
  sisenora: [
    { label: 'זהות המותג', match: /logo/i },
    { label: 'תוצרים - נוצרו ב-AI', match: /ai_campaign|ai_product/ },
    { label: 'חלל מסחרי - נוצר ב-AI', match: /ai_retail/ },
  ],
  learnai: [
    { label: 'זהות המותג', match: /brand_logo/ },
    { label: 'הדמות והבעות', match: /avatar|character_system/ },
    { label: 'עיצוב הפלטפורמה', match: /platform_/ },
  ],
  meshek27: [
    { label: 'זהות המותג', match: /logo|brand_system|app-icons/i },
    { label: 'אריזות', match: /box/i },
    { label: 'שילוט וביגוד', match: /signage|tshirt/i },
  ],
  taliter: [
    { label: 'זהות המותג', match: /logo|brand_board|branding-set/i },
    { label: 'תוצרי המותג', match: /collateral|bottle/i },
    { label: 'הדמיות הסטודיו', match: /studio_mockup|wall/i },
  ],
  ebrider: [
    { label: 'זהות המותג', match: /logo|symbol|brand_system/i },
    { label: 'תמונות מוצר', match: /hero_product|mockup-hero/i },
    { label: 'עמודי החנות', match: /product_page|responsive_mobile/i },
    { label: 'עיבוד תמונה - לפני ואחרי ב-AI', match: /ai_refinement/ },
  ],
  studioalef: [
    { label: 'זהות המותג', match: /logo|wall-mockup/i },
    { label: 'החנות הדיגיטלית', match: /website/ },
    { label: 'הדמיות המוצר', match: /framed_print/ },
    { label: 'עיצובי הדפסים', match: /quote_print/ },
  ],
  petplaypal: [
    { label: 'זהות המותג', match: /logo/ },
    { label: 'עיצוב הדמויות', match: /character_/ },
    { label: 'אריזות', match: /packaging/ },
    { label: 'לייף סטייל - נוצר ב-AI', match: /ai_lifestyle/ },
  ],
  dresses2026: [
    { label: 'סטודיו - נוצר ב-AI', match: /ai_studio/ },
    { label: 'חוץ - נוצר ב-AI', match: /ai_outdoor/ },
    { label: 'תמונות מוצר', match: /white_background_product/ },
  ],
};

const sharedRules: MediaGroupRule[] = [
  { label: 'זהות המותג', match: /logo|monogram|symbol|brand_system|brand_board|branding-set|app-icons/i },
  { label: 'ויזואלים - נוצרו ב-AI', match: /__ai_|\/ai-/i },
  { label: 'עיצוב מסכים', match: /website|mobile|screen|platform|configurator/i },
  { label: 'מוצרים ואריזות', match: /product|packaging|box|bands/i },
  { label: 'הדמיות המותג', match: /mockup|signage|wall|tshirt|bottle/i },
];

/** Classify once, then render whole groups. Never split a topic by source order. */
export function groupProjectMedia(
  slug: string,
  images: string[],
  overrides: MediaGroupRule[] = [],
  excludedImages: (string | null | undefined)[] = [],
): MediaGroup[] {
  const rules = [...overrides, ...(projectRules[slug] || []), ...sharedRules];
  const buckets = new Map<string, string[]>();
  const excluded = new Set(excludedImages.filter(Boolean));
  for (const image of new Set(images)) {
    if (excluded.has(image)) continue;
    let filename = image.split('?')[0].split('/').pop() || image;
    try { filename = decodeURIComponent(filename); } catch { /* Keep malformed filenames unchanged. */ }
    const rule = rules.find(({ match }) => {
      match.lastIndex = 0;
      return match.test(filename);
    });
    const label = rule?.label || 'תוצרים נוספים';
    buckets.set(label, [...(buckets.get(label) || []), image]);
  }
  const labels = [...new Set([...rules.map(({ label }) => label), 'תוצרים נוספים'])];
  return labels.flatMap((label) => {
    const groupImages = buckets.get(label);
    return groupImages?.length ? [{ label, images: groupImages }] : [];
  });
}