// ============= BRANDING PROJECTS ============

// SFD - Strength For Dancers - New organized assets
import sfdMainLogo from '@/assets/sfd/main-logo.jpg';
import sfdBrandingSet from '@/assets/sfd/branding-set.jpg';
import sfdSecondaryLogo from '@/assets/sfd/secondary-logo.jpg';
import sfdTshirtMockup from '@/assets/sfd/tshirt-mockup.jpg';
import sfdWebsite from '@/assets/sfd/website.jpg';
import sfdLogoTransparent from '@/assets/sfd/logo-transparent.png';
import sfdSymbol from '@/assets/sfd/symbol.jpg';
import sfdWebsiteDesktopNew from '@/assets/sfd/website-desktop-new.png';
import sfdWebsiteMobileNew from '@/assets/sfd/website-mobile-new.png';
import sfdBandsProduct from '@/assets/sfd-bands-product.png';
// SFD - Real live website assets (strengthfordancers.com)
import sfdRealWebsiteDesktop from '@/assets/sfd/real-website-desktop.png';
import sfdRealWebsiteMobile from '@/assets/sfd/real-website-mobile.png';
import sfdRealStats from '@/assets/sfd/real-stats.png';
import sfdRealHeroWeb from '@/assets/sfd/real-hero-web.jpg';
import sfdRealHeroMobile from '@/assets/sfd/real-hero-mobile.jpg';


// Meshek 27 - New organized assets
import meshek27WallLogo from '@/assets/meshek27/wall-logo.png';
import meshek27LogoAsset from '@/assets/media/Meshek27__final_logo_color.png.asset.json';
const meshek27LogoClean = meshek27LogoAsset.url;
import meshek27BrandingFull from '@/assets/meshek27/branding-full.jpg';
import meshek27AppIcons from '@/assets/meshek27/app-icons.jpg';
import meshek27BoxVegetables from '@/assets/meshek27/box-vegetables.jpg';
import meshek27TshirtMockup from '@/assets/meshek27/tshirt-mockup.jpg';
import meshek27WallSignage from '@/assets/meshek27/wall-signage.jpg';
import meshek27LogoGraphic from '@/assets/meshek27/logo-graphic.jpg';
import meshek27BoxDesign from '@/assets/meshek27/box-design.jpg';

// Si Señora
import sisenoraWebsiteNew from "@/assets/sisenora-website-new.png";
import sisenoraLogoAsset from '@/assets/media/SiSenora__brand_logo_transparent.png.asset.json';
const sisenoraLogo = sisenoraLogoAsset.url;
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

// Learn AI / DotAi
import learnaiLogoFull from '@/assets/media/LearnAI__brand_logo_full.jpg.asset.json';
import sfdShortLogo from '@/assets/media/SFD__rebrand_board_01.png.asset.json';
import sfdFullLogoBoard from '@/assets/media/SFD__rebrand_board_02.png.asset.json';
import learnaiAnimation from "@/assets/learnai-animation.mp4";
import learnaiPlatformHero from '@/assets/media/LearnAI__platform_hero_dotai_learning_companion.webp.asset.json';

// Tali Ter - New organized assets
import taliterBrandingSet from '@/assets/taliter/branding-set.jpg';
import taliterFinalLogo from '@/assets/media/TaliTar__final_logo.webp.asset.json';
import taliterWallSignage from '@/assets/taliter/wall-signage.jpg';
import taliterBottleMockup from '@/assets/taliter/bottle-mockup.jpg';

// EBrider
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";
import ebriderMobile from "@/assets/ebrider-mobile.png";

// Studio Alef
import studioalefLogoAsset from '@/assets/media/StudioAlef__logo_clean_presentation.webp.asset.json';
const studioalefLogo = studioalefLogoAsset.url;
import studioalefWallMockup from "@/assets/studioalef-wall-mockup.png";


// BetterSeeds - AI generated images for website
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import betterseedsMobile from "@/assets/betterseeds-mobile.png";
import betterseedsHero from "@/assets/betterseeds-hero.jpg";
import aiGeneEditing from "@/assets/ai-gene-editing.png";
import aiDnaScientist from "@/assets/ai-dna-scientist.png";
import aiPlantTechnology from "@/assets/ai-plant-technology.jpg";
import aiDroneFarming from "@/assets/ai-drone-farming.jpg";
import aiCrisprLab from "@/assets/ai-crispr-lab.png";

// Ascola Garden
import ascolaWebsite from "@/assets/ascola/website-screen.png";
import ascolaLogo from "@/assets/ascola/logo.jpg";
import ascolaBrandingMockup from "@/assets/ascola/branding-mockup.jpg";

// NOMA - Custom dog collars brand (media served from CMS / CDN asset pointers)
import nomaLogoTagline from '@/assets/media/NOMA__brand_logo_tagline.png.asset.json';
import nomaShopifyConfigurator from '@/assets/media/NOMA__shopify_landing_page_configurator.png.asset.json';

// ============ TYPES ============

// displayType controls WHICH presentation component renders this project.
// This is separate from `category` (kept for backward compatibility / CMS fallback filtering).
//   'website'          -> single website showcase (desktop + mobile mockup), no known before/after
//   'website_redesign' -> before/after website transformation (toggle mockup)
//   'branding'         -> full branding-from-scratch story (values + process + result)
//   'rebranding'       -> old identity -> new identity, with the reasoning behind the change
//   'story'            -> narrative-driven project (product import, custom dev, multi-service work)
export type DisplayType = 'website' | 'website_redesign' | 'branding' | 'rebranding' | 'story';

export interface StoryStep {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  name: string;
  category: 'branding' | 'website' | 'print';
  displayType: DisplayType;
  description?: string;
  logo: string;
  // Additional supplied logo versions shown beside the main logo
  extraLogos?: string[];
  // Gallery items hidden because they duplicate a logo shown above
  hiddenImages?: string[];
  monogram?: string;
  heroImage: string;
  bgColor: string;
  accentColor: string;
  colors: string[]; // Brand color palette
  images: string[];
  video?: string;
  websiteImage?: string;
  mobileImage?: string;

  // needsReview: I (Claude) assigned a displayType / wrote copy based on limited info in the
  // existing code. Flagged projects should be double-checked by Ella before going live.
  needsReview?: boolean;

  // ---- branding: full identity built from scratch ----
  values?: string[]; // short value words/phrases
  process?: string; // 1-2 sentence description of the thinking behind the identity

  // ---- rebranding: old identity -> new ----
  before?: {
    logo?: string;
    website?: string;
  };
  changeReason?: string; // what led to the change

  // ---- website_redesign: before/after site ----
  beforeWebsiteImage?: string;
  beforeMobileImage?: string;

  // ---- story: narrative-driven (import / custom dev / multi-service) ----
  storyIntro?: string;
  storySteps?: StoryStep[];

  // ---- gallery grouping: small sub-headers inside the outputs gallery ----
  // label shows once above the first image whose URL matches the pattern.
  galleryGroups?: { label: string; match: RegExp }[];
}

// ============ BRANDING PROJECTS ============
// Image order: Logo (white bg), Logo (black bg), Monogram (if exists), then mockups

export const projects: Project[] = [
  // ========== ORDERED BY CONTENT AMOUNT (MOST FIRST) ==========
  
  // BetterSeeds - 6 images + desktop + mobile = 8 items
  {
    slug: 'betterseeds',
    name: 'BetterSeeds',
    category: 'branding',
    displayType: 'story', // shown in Full Scope, right after SFD (Ella: מרשים מאוד)
    needsReview: true, // TODO Ella: זה בעצם מיתוג + ויזואלים AI, או שהשירות המרכזי היה משהו אחר? יש גם ליין עבודה פנימי מתמשך - כדאי לספר את זה?
    description: 'אתר ויזואלים AI לחברת טכנולוגיה חקלאית',
    logo: '', // No logo - Ella did not design BetterSeeds' logo
    heroImage: betterseedsHero,
    bgColor: '#F5F8F3',
    accentColor: '#3D7C3F',
    colors: ['#3D7C3F', '#6AAF4A', '#FFFFFF'],
    images: [
      betterseedsHero,
      aiGeneEditing,
      aiDnaScientist,
      aiPlantTechnology,
      aiDroneFarming,
      aiCrisprLab,
    ],
    websiteImage: websiteBetterseeds,
    mobileImage: betterseedsMobile,
  },
  // SFD - 5 images + desktop + mobile = 7 items
  {
    slug: 'sfd',
    name: 'SFD',
    category: 'branding',
    displayType: 'story',
    description: 'מיתוג מלא, ייבוא קיט מוצרים ממותג, ובניית פורטל אימונים אישי - שיטת אימון לרקדנים (strengthfordancers.com)',
    storyIntro:
      'פרויקט שהתחיל ממיתוג מלא, המשיך לייבוא קיט מוצרים ממותג מסין, והסתיים בפורטל אימונים דיגיטלי אישי שנפתח לכל לקוחה שרוכשת את הקיט.',
    storySteps: [
      {
        title: 'מיתוג',
        text: 'קודם כל בנינו זהות מלאה - לוגו, פלטת צבעים (שחור, אפור כהה, לבן) וניסוח. הצבעים האלה הפכו אחר כך לקו המנחה של כל שלב בפרויקט.',
      },
      {
        title: 'ייבוא ממותג בתקציב מוגבל',
        text: 'הלקוחה רצתה קיט שלם - 5 סטים של גומיות התנגדות, גומיית לולאות עם 11 מספרים, שתי קוביות בלוק יוגה ותיק שמאחד הכל. יצרן שנבדק קודם דרש כמויות ייצור מאפס שלא תאמו את התקציב. במקום זה חיפשתי בשוק הסיני מוצרים קיימים שכבר תואמים לצבעי המותג ול-MOQ נמוך (100-200 יחידות למוצר), ופיצלתי את ההזמנה בין כמה ספקים רלוונטיים כדי להתאים לוגו לכל פריט.',
      },
      {
        title: 'פורטל אימונים אישי',
        text: 'כל רכישת קיט פותחת ללקוחה אזור אישי בפורטל וידאו: עמוד קורסים, מאגר שיעורים, ועמוד נגן עם רשימת שיעורים הבאה/קודמת. המערכת שבה עבדנו הייתה סגורה ברובה (HTML נעול, רק CSS פתוח לעריכה) - כך שקודם מיפיתי את מבנה הקוד כדי להבין מה אפשר לגעת בו, ורק אז בניתי את ההתאמה האישית: אבטחה, הגבלת שיתוף, והתאמה מלאה למובייל ולדסקטופ.',
      },
    ],
    logo: sfdLogoTransparent,
    extraLogos: [sfdShortLogo.url],
    hiddenImages: [sfdFullLogoBoard.url],
    monogram: sfdSymbol,
    heroImage: sfdRealHeroWeb,
    bgColor: '#F5F5F7',
    accentColor: '#1A1A1A',
    colors: ['#1A1A1A', '#FFFFFF', '#4A5568'],
    images: [
      sfdMainLogo,
      sfdSecondaryLogo,
      sfdSymbol,
      sfdRealStats,
      sfdRealHeroMobile,
      sfdBandsProduct,
    ],
    websiteImage: sfdRealWebsiteDesktop,
    mobileImage: sfdRealWebsiteMobile,
  },
  // Meshek 27 - 6 images
  {
    slug: 'meshek27',
    name: 'משק 27',
    category: 'branding',
    displayType: 'branding',
    needsReview: true, // TODO Ella: אשרי/עדכני את הערכים והתהליך - ניחשתי לפי התיאור הקיים בקוד
    description: 'מיתוג מלא למשק חקלאי - משלוחי ירקות',
    values: ['טריות', 'ישירות מהשדה', 'אמינות מקומית'],
    process: 'זהות שדוברת חקלאות אמיתית - צבעי אדמה וירק, לוגו שמרגיש ביתי ולא תעשייתי, ויישום עקבי על כל נקודות המגע: אריזות, שילוט וביגוד.',
    logo: meshek27LogoClean,
    monogram: meshek27LogoGraphic,
    heroImage: meshek27BrandingFull,
    bgColor: '#F5F8F3',
    accentColor: '#4A7C3F',
    colors: ['#4A7C3F', '#8BC34A', '#F5F5DC'],
    images: [
      meshek27LogoClean,
      meshek27AppIcons,
      meshek27WallSignage,
      meshek27BoxVegetables,
      meshek27BoxDesign,
      meshek27TshirtMockup,
    ],
  },
  // Learn AI - 3 images + video + desktop = 5 items
  {
    slug: 'learnai',
    name: 'Learn AI',
    category: 'branding',
    displayType: 'branding',
    needsReview: true, // TODO Ella: אשרי/עדכני את הערכים והתהליך
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    values: ['נגישות', 'טכנולוגיה חדה', 'תנועה ובהירות'],
    process: 'זהות דיגיטלית קרה וחדה שמדברת טכנולוגיה, עם אנימציית לוגו שממחישה תנועה ולמידה מתמשכת.',
    logo: learnaiLogoFull.url,
    heroImage: learnaiLogoFull.url,
    bgColor: '#F0FAFB',
    accentColor: '#00D4E5',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    images: [],
    video: learnaiAnimation,
    websiteImage: learnaiPlatformHero.url,
  },
  // Si Señora - 2 images + desktop = 3 items
  {
    slug: 'sisenora',
    name: 'Si Señora',
    category: 'branding',
    displayType: 'website',
    description: 'מיתוג ובניית אתר מכירות לעסק לייבוא תיקים בעבודת יד',
    logo: sisenoraLogo,
    heroImage: mockupSisenoraShop,
    bgColor: '#FAF8F5',
    accentColor: '#D4A574',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0'],
    images: [
      sisenoraLogo,
      mockupSisenoraShop,
    ],
    websiteImage: sisenoraWebsiteNew,
  },
  // Ascola Garden - 2 images + desktop = 3 items
  {
    slug: 'ascola',
    name: 'Ascola Garden',
    category: 'branding',
    displayType: 'website',
    description: 'לוגו ובניית אתר תדמית לעסק של מתחם אירועים טוסקני',
    logo: ascolaLogo,
    heroImage: ascolaWebsite,
    bgColor: '#F5F5F0',
    accentColor: '#2D5A4A',
    colors: ['#2D5A4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ascolaLogo,
      ascolaBrandingMockup,
    ],
    websiteImage: ascolaWebsite,
  },
  // Tali Ter - 3 images
  {
    slug: 'taliter',
    name: 'Tali Ter',
    category: 'branding',
    displayType: 'branding',
    needsReview: true, // TODO Ella: אשרי/עדכני את הערכים והתהליך
    description: 'מיתוג למאמנת בר',
    values: ['אנרגטי', 'אישי', 'מזמין'],
    process: 'זהות חמה וצבעונית שמדברת אימון אישי ולא מכון כושר תעשייתי - מותאמת לביגוד, שילוט ואריזות.',
    logo: taliterFinalLogo.url,
    heroImage: taliterBrandingSet,
    bgColor: '#FFFBF5',
    accentColor: '#5CC8B5',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    images: [
      taliterBrandingSet,
      taliterWallSignage,
      taliterBottleMockup,
    ],
  },
  // EBrider - 3 images + mobile = 4 items
  {
    slug: 'ebrider',
    name: 'EBrider',
    category: 'branding',
    displayType: 'website',
    description: 'מיתוג ובניית אתר חנות - חלקי חילוף לאופניים',
    logo: ebriderLogoNew,
    monogram: ebriderSymbol,
    heroImage: ebriderMockupHero,
    bgColor: '#F5F8F5',
    accentColor: '#4A9F4A',
    colors: ['#4A9F4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ebriderLogoNew,
      ebriderSymbol,
      ebriderMockupHero,
    ],
    mobileImage: ebriderMobile,
  },
  // Studio Alef - 1 image + video = 2 items
  {
    slug: 'studioalef',
    name: 'Studio Alef',
    category: 'branding',
    displayType: 'branding',
    needsReview: true, // TODO Ella: אשרי/עדכני את הערכים והתהליך
    description: 'מיתוג קיר חיצוני לסטודיו עיצוב + הדמיה',
    values: ['מינימליזם', 'אדריכלי', 'שקט חזותי'],
    process: 'זהות מינימליסטית שמתפקדת גם כאלמנט עיצובי פיזי - הודמתה על הקיר לפני היישום כדי לוודא שהיא עומדת בקנה מידה גדול.',
    logo: studioalefLogo,
    heroImage: studioalefWallMockup,
    bgColor: '#F8F8F8',
    accentColor: '#5A5A5A',
    colors: ['#5A5A5A', '#FFFFFF', '#E0E0E0'],
    images: [
      studioalefLogo,
    ],
  },
  // NOMA - custom dog collars brand (gallery + screens come from the CMS; this entry
  // promotes it from a small web tile to a full end-to-end project block)
  {
    slug: 'noma',
    name: 'NOMA',
    category: 'website',
    displayType: 'story',
    needsReview: true, // TODO Ella: אשרי/עדכני את הסיפור והצבעים - כתבתי לפי התוכן שהעלית
    description: 'מותג קולרים מותאמים אישית לכלבים - מיתוג, חנות Shopify וקמפיין AI',
    storyIntro:
      'פרויקט מקצה לקצה: זהות מותג חדשה, חנות Shopify עם קונפיגורטור להתאמה אישית של הקולר, וקמפיין תמונות AI שמציג את המוצרים על כלבים אמיתיים.',
    storySteps: [
      {
        title: 'מיתוג',
        text: 'זהות חדשה מהיסוד - לוגו, טיפוגרפיה ופלטת צבעים (נייבי, לבן וורוד) שמאזנת בין פרימיום לחמימות, בדיוק כמו המוצר עצמו.',
      },
      {
        title: 'חנות Shopify',
        text: 'בניתי חנות עם עמוד מוצר שמאפשר להתאים את הקולר אישית - בחירת מידה, צבע וחריטת שם - כך שהלקוח רואה את המוצר שלו עוד לפני ההזמנה.',
      },
      {
        title: 'קמפיין AI',
        text: 'במקום צילומי סטודיו יקרים, ייצרתי סדרת דיוקנאות ותמונות לייף-סטייל ב-AI - כלבים מגזעים שונים עם הקולרים, שמאפשרת למותג להיראות גדול מיום ראשון.',
      },
    ],
    logo: nomaLogoTagline.url,
    heroImage: nomaShopifyConfigurator.url,
    bgColor: '#F7F5F2',
    accentColor: '#1F2A44',
    colors: ['#1F2A44', '#FFFFFF', '#E8B4B8'],
    images: [],
    galleryGroups: [
      { label: 'דיוקנאות כלבים - נוצרו ב-AI', match: /ai_dog_portrait/ },
      { label: 'חוץ - נוצר ב-AI', match: /ai_lifestyle/ },
    ],
  },
  // Aurel Fine Jewelry - diamond & gemstone site from scratch (media comes from the CMS)
  {
    slug: 'aurel',
    name: 'Aurel Fine Jewelry',
    category: 'branding',
    displayType: 'story',
    needsReview: true, // TODO Ella: אשרי/עדכני את הסיפור - כתבתי לפי התוכן שהעלית
    description: 'אתר לתכשיטי יהלומים ואבני חן - אסטרטגיה, ויזואל וחוויה מאפס, כולל עיצוב תמונות AI',
    storyIntro:
      'פרויקט מאפס: אסטרטגיה, שפה חזותית ואתר לבית תכשיטים של יהלומים ואבני חן נדירות, עם חוויה שקטה, יוקרתית ואישית.',
    storySteps: [
      {
        title: 'אסטרטגיה',
        text: 'הגדרת החוויה שהמותג משדר - נדירות, אומנות ותכשיט שנבנה סביב הלקוח - כבסיס לכל החלטה בעיצוב.',
      },
      {
        title: 'ויזואל ואתר',
        text: 'כחול לילה עמוק שמבליט את צבעי האבנים, טיפוגרפיה אלגנטית, ומסלול באתר מהקולקציות ועד תהליך העיצוב האישי.',
      },
      {
        title: 'תמונות AI',
        text: 'סדרת תמונות מוצר, אבני חן, לייף-סטייל ואטלייה שנוצרו ב-AI בשפה אחידה, כדי שהמותג ייראה מלא ויוקרתי מהיום הראשון.',
      },
    ],
    logo: '',
    heroImage: '',
    bgColor: '#F4F2EE',
    accentColor: '#0E1A33',
    colors: ['#0E1A33', '#F4F1EA', '#1F7A4D', '#B3122E'],
    images: [],
  },
  // Dresses 2026 - AI fashion catalog (gallery comes from the CMS)
  {
    slug: 'dresses2026',
    name: 'Dresses 2026',
    category: 'branding',
    displayType: 'branding',
    needsReview: true, // TODO Ella: שם הלקוח ותיאור
    description: 'קטלוג שמלות בצילומי AI - סטודיו, לוקיישן ורקע לבן',
    logo: '',
    heroImage: '',
    bgColor: '#F7F4EF',
    accentColor: '#1A1A1A',
    colors: ['#E8DCCB', '#1A1A1A', '#FFFFFF'],
    images: [],
  },
];

// ============ ADDITIONAL WORK (Websites only - Print section removed) ============

export const additionalWork = {
  websites: [],
};
