// Homepage composition per project, matched to the approved full-page reference.
// `main` lists the opening slots left to right; `ar` is the slot's width/height ratio.
export type ShowcaseSlot =
  | 'devices'
  | { img: RegExp; ar: number; fit?: 'contain' | 'cover' }
  | { stack: [RegExp, RegExp]; ar: number };

export type ShowcaseLayout = {
  title?: string;
  description: string;
  tags: string;
  main: ShowcaseSlot[];
  // Topic strip: renamed labels merge into one topic; `order` sorts topics right to left.
  rename?: Record<string, string>;
  order?: RegExp[];
  // Topics the reference leaves out of the strip (still shown in details).
  dropTopics?: RegExp;
  // Screen shown inside the laptop when it differs from the CMS website image.
  screen?: RegExp;
  // Show the project name instead of the logo in the identity column.
  wordmark?: boolean;
  // Redundant previews stay available in the full project details.
  omitPreview?: RegExp;
};

export const showcaseOrder = ['sfd', 'betterseeds', 'noma', 'aurel', 'meshek27', 'learnai', 'taliter', 'studioalef', 'dresses2026', 'sisenora', 'ebrider', 'ascola', 'petplaypal'];

const tall = 0.52;
const square = 0.97;

export const showcaseLayouts: Record<string, ShowcaseLayout> = {
  sfd: {
    description: 'מיתוג, אתר איקומרס ועולם מותג לרקדנים',
    tags: 'מיתוג · אתר · מוצרים · ייבוא',
    wordmark: false,
    omitPreview: /rebrand_color_palette/,
    main: [{ img: /studio_lifestyle/, ar: tall }, { img: /resistance_bands/, ar: tall }, 'devices'],
    rename: { 'זהות המותג': 'זהות וקיט מוצרים', 'קיט המוצרים': 'זהות וקיט מוצרים' },
    order: [/בסטודיו/, /זהות/, /נחיתה/],
  },
  betterseeds: {
    description: 'אתר וויזואלים AI לחברת טכנולוגיה חקלאית',
    tags: 'אתר · ויזואלים AI · כנסים',
    main: ['devices', { img: /dna_peanut/, ar: tall }, { img: /dna_cacao/, ar: tall }],
    rename: { 'ויזואלים': 'ויזואלים — AI' },
    order: [/ויזואלים/, /כנסים/],
  },
  noma: {
    description: 'מיתוג, חנות וקמפיין למותג קולרים אישיים',
    tags: 'מיתוג · Shopify · קמפיין AI',
    main: [{ img: /golden_luna/, ar: tall }, { img: /dog_walking_cooper/, ar: tall }, 'devices'],
    rename: { 'חוץ': 'קמפיין חוץ', 'דיוקנאות כלבים': 'דיוקנאות AI' },
    order: [/חוץ/, /דיוקנאות/, /מידות/],
  },
  aurel: {
    description: 'אסטרטגיה, ויזואל ואתר לתכשיטי יהלומים',
    tags: 'אסטרטגיה · מיתוג · אתר · צילום AI',
    main: ['devices', { img: /lifestyle_model_portrait/, ar: tall }, { img: /atelier_client/, ar: tall }],
    rename: { 'תמונות מוצר': 'קמפיין צילום' },
    order: [/עמודי/, /קמפיין/],
  },
  meshek27: {
    description: 'מיתוג ואתר הזמנות לירקות ופירות מהשדה',
    tags: 'מיתוג · אתר · אריזות · שילוט',
    main: [{ img: /produce_box_brand_application/, ar: square }, 'devices'],
  },
  learnai: {
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    tags: 'מיתוג · אנימציה · פלטפורמה',
    screen: /platform_lesson_interface/,
    main: ['devices', { img: /platform_hero_dotai/, ar: square }],
    dropTopics: /הדמות והבעות|הלוגו/,
    rename: { 'זהות המותג': 'הלוגו', 'עיצוב הפלטפורמה': 'הפלטפורמה' },
    order: [/הדמויות/, /הפלטפורמה/, /הלוגו/],
  },
  taliter: {
    description: 'מיתוג לסטודיו בר ופילאטיס',
    tags: 'מיתוג · הדמיות',
    omitPreview: /brand_board.*-(primary|palette)-cutout/,
    main: [{ img: /studio_mockup_03/, ar: 1.47 }, { stack: [/studio_mockup_01/, /brand_collateral/], ar: 0.89 }],
  },
  studioalef: {
    description: 'מיתוג וחנות דיגיטלית לסטודיו הדפסים',
    tags: 'מיתוג · חנות · הדפסים',
    screen: /digital_print_shop_website/,
    dropTopics: /הלוגו|זהות המותג/,
    main: ['devices', { img: /framed_print/, ar: square }],
    order: [/הדפסים/, /הלוגו/],
  },
  dresses2026: {
    title: 'קמפיין אופנה AI',
    description: 'קמפיין הלבשה ותמונות מוצר מפריטים קיימים',
    tags: 'קמפיין AI · צילומי מוצר',
    main: [{ img: /ai_studio_model_floral/, ar: 0.78 }, { img: /ai_studio_model_green/, ar: 0.78 }, { img: /ai_studio_model_peach/, ar: 0.78 }],
    rename: { '': 'תמונות מוצר' },
  },
  sisenora: {
    description: 'מיתוג, אתר והפקת צילום לתיקי וואיו',
    tags: 'מיתוג · אתר · צילום AI',
    main: ['devices', { img: /photoshoot_wall/, ar: tall }, { img: /light_blue_large_bag/, ar: tall }],
    rename: { 'תוצרים': 'קמפיין' },
  },
  ebrider: {
    description: 'לוגו וחנות לחלקי חילוף לאופניים',
    tags: 'לוגו · חנות · עיבוד תמונה AI',
    main: [{ img: /hero_product_composition/, ar: square }, 'devices'],
    rename: { 'עיבוד תמונה - לפני ואחרי ב-AI': 'עיבוד תמונה — לפני ואחרי' },
  },
  ascola: {
    description: 'לוגו ואתר תדמית למתחם אירועים טוסקני',
    tags: 'לוגו · אתר תדמית',
    main: ['devices', { img: /branding-mockup/, ar: tall }, { img: /Ascola__logo/, ar: tall, fit: 'contain' }],
  },
  petplaypal: {
    description: 'דמויות, אריזה ודף מכירה לצעצוע לחיות מחמד',
    tags: 'דמויות · אריזה · דף מכירה · AI',
    main: [{ img: /ai_lifestyle_dog_with_chuck/, ar: square }, 'devices'],
    rename: { 'עיצוב האתר — יתרונות המוצר': 'עיצוב האתר', 'עיצוב הדמויות': 'הדמויות', 'לייף סטייל': 'לייף סטייל' },
    order: [/אריזות/, /לייף/, /הדמויות/, /האתר/],
  },
};

// Strip labels drop the "made with AI" suffix; the tags already say it.
export const stripLabel = (label: string, layout?: ShowcaseLayout) => {
  const base = label.replace(/\s*-\s*נוצר(?:ו)?\s+ב-AI$/, '');
  return layout?.rename?.[label] ?? layout?.rename?.[base] ?? base;
};
