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

// Meshek 27 - New organized assets
import meshek27WallLogo from '@/assets/meshek27/wall-logo.png';
import meshek27LogoClean from '@/assets/meshek27/logo-clean.jpg';
import meshek27BrandingFull from '@/assets/meshek27/branding-full.jpg';
import meshek27AppIcons from '@/assets/meshek27/app-icons.jpg';
import meshek27BoxVegetables from '@/assets/meshek27/box-vegetables.jpg';
import meshek27TshirtMockup from '@/assets/meshek27/tshirt-mockup.jpg';
import meshek27WallSignage from '@/assets/meshek27/wall-signage.jpg';
import meshek27LogoGraphic from '@/assets/meshek27/logo-graphic.jpg';
import meshek27BoxDesign from '@/assets/meshek27/box-design.jpg';

// Si Señora
import sisenoraWebsiteNew from "@/assets/sisenora-website-new.png";
import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

// Learn AI / DotAi
import learnaiLogoFull from "@/assets/learnai-logo-full.jpg";
import dotaiMonogram from "@/assets/dotai-monogram.jpg";
import learnaiAnimation from "@/assets/learnai-animation.mp4";
import dotaiLogoFull from "@/assets/dotai-logo-full.jpg";
import learnaiMockupDesktop from "@/assets/learnai-mockup-desktop.jpg";

// Tali Ter - New organized assets
import taliterBrandingSet from '@/assets/taliter/branding-set.jpg';
import taliterWallSignage from '@/assets/taliter/wall-signage.jpg';
import taliterBottleMockup from '@/assets/taliter/bottle-mockup.jpg';

// EBrider
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";
import ebriderMobile from "@/assets/ebrider-mobile.png";

// Studio Alef
import studioalefLogo from "@/assets/studioalef-logo.png";
import studioalefWallMockup from "@/assets/studioalef-wall-mockup.png";
import betterseedsAnimation from "@/assets/betterseeds-animation.mp4"; // Using for Studio Alef

// SEN Jewelry
import websiteSenMobile from "@/assets/website-sen-mobile.png";

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

// ============ TYPES ============

export interface Project {
  slug: string;
  name: string;
  category: 'branding' | 'website' | 'print';
  description?: string;
  logo: string;
  monogram?: string;
  heroImage: string;
  bgColor: string;
  accentColor: string;
  colors: string[]; // Brand color palette
  images: string[];
  video?: string;
  websiteImage?: string;
  mobileImage?: string;
}

// ============ BRANDING PROJECTS ============
// Image order: Logo (white bg), Logo (black bg), Monogram (if exists), then mockups

export const projects: Project[] = [
  {
    slug: 'sfd',
    name: 'SFD',
    category: 'branding',
    description: 'מיתוג מחדש (REBRANDING) מלא וייבוא ליין מוצרים ממותג',
    logo: sfdLogoTransparent,
    monogram: sfdSymbol,
    heroImage: sfdBrandingSet,
    bgColor: '#F5F5F7',
    accentColor: '#1A1A1A',
    colors: ['#1A1A1A', '#FFFFFF', '#4A5568'],
    images: [
      sfdMainLogo,        // Logo white bg
      sfdSecondaryLogo,   // Secondary logo
      sfdSymbol,          // Monogram
      sfdTshirtMockup,    // Mockup
      sfdBandsProduct,    // Bands product mockup
    ],
    websiteImage: sfdWebsiteDesktopNew,
    mobileImage: sfdWebsiteMobileNew,
  },
  {
    slug: 'meshek27',
    name: 'משק 27',
    category: 'branding',
    description: 'מיתוג מלא למשק חקלאי - משלוחי ירקות',
    logo: meshek27LogoClean,
    monogram: meshek27LogoGraphic,
    heroImage: meshek27BrandingFull,
    bgColor: '#F5F8F3',
    accentColor: '#4A7C3F',
    colors: ['#4A7C3F', '#8BC34A', '#F5F5DC'],
    images: [
      meshek27LogoClean,      // Logo clean
      meshek27AppIcons,       // Monogram/icons
      meshek27WallLogo,       // Wall mockup
      meshek27WallSignage,    // Signage
      meshek27BoxVegetables,  // Packaging
      meshek27BoxDesign,      // Box design
      meshek27TshirtMockup,   // Tshirt
    ],
  },
  {
    slug: 'taliter',
    name: 'Tali Ter',
    category: 'branding',
    description: 'מיתוג למאמנת בר',
    logo: taliterBrandingSet,
    heroImage: taliterBrandingSet,
    bgColor: '#FFFBF5',
    accentColor: '#5CC8B5',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    images: [
      taliterBrandingSet,     // Logo/branding set
      taliterWallSignage,     // Signage mockup
      taliterBottleMockup,    // Bottle mockup
    ],
  },
  {
    slug: 'learnai',
    name: 'Learn AI',
    category: 'branding',
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    logo: learnaiLogoFull,
    monogram: dotaiMonogram,
    heroImage: dotaiLogoFull,
    bgColor: '#F0FAFB',
    accentColor: '#00D4E5',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    images: [
      learnaiLogoFull,        // Logo
      dotaiMonogram,          // Monogram
      learnaiMockupDesktop,   // Desktop mockup
    ],
    video: learnaiAnimation,
  },
  {
    slug: 'studioalef',
    name: 'Studio Alef',
    category: 'branding',
    description: 'מיתוג לסטודיו עיצוב - 3D',
    logo: studioalefLogo,
    heroImage: studioalefWallMockup,
    bgColor: '#F8F8F8',
    accentColor: '#5A5A5A',
    colors: ['#5A5A5A', '#FFFFFF', '#E0E0E0'],
    images: [
      studioalefLogo,         // Logo
    ],
    video: betterseedsAnimation, // 3D animation moved from BetterSeeds
  },
  {
    slug: 'sen',
    name: 'SEN Jewelry',
    category: 'website',
    description: 'עיצוב אתר לחנות תכשיטים',
    logo: websiteSenMobile,
    heroImage: websiteSenMobile,
    bgColor: '#0D2847',
    accentColor: '#C9A86C',
    colors: ['#0D2847', '#C9A86C', '#E8B4B8'],
    images: [
      websiteSenMobile,
    ],
  },
  {
    slug: 'ebrider',
    name: 'EBrider',
    category: 'branding',
    description: 'לוגו ובניית אתר חנות - חלקי חילוף לאופניים',
    logo: ebriderLogoNew,
    monogram: ebriderSymbol,
    heroImage: ebriderMockupHero,
    bgColor: '#F5F8F5',
    accentColor: '#4A9F4A',
    colors: ['#4A9F4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ebriderLogoNew,         // Logo
      ebriderSymbol,          // Symbol/monogram
      ebriderMockupHero,      // Main mockup
    ],
    mobileImage: ebriderMobile,
  },
  {
    slug: 'sisenora',
    name: 'Si Señora',
    category: 'branding',
    description: 'מיתוג ואתר לחנות אופנה',
    logo: sisenoraLogo,
    heroImage: mockupSisenoraShop,
    bgColor: '#FAF8F5',
    accentColor: '#D4A574',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0'],
    images: [
      sisenoraLogo,           // Logo
      mockupSisenoraShop,     // Shop mockup
    ],
    websiteImage: sisenoraWebsiteNew, // New website screenshot
  },
  {
    slug: 'betterseeds',
    name: 'BetterSeeds',
    category: 'branding',
    description: 'אתר ויזואלים AI לחברת טכנולוגיה חקלאית',
    logo: betterseedsHero,
    heroImage: betterseedsHero,
    bgColor: '#F5F8F3',
    accentColor: '#3D7C3F',
    colors: ['#3D7C3F', '#6AAF4A', '#FFFFFF'],
    images: [
      betterseedsHero,        // Hero image
      aiGeneEditing,          // AI: Gene editing scissors
      aiDnaScientist,         // AI: Scientist with DNA
      aiPlantTechnology,      // AI: Plant in lab
      aiDroneFarming,         // AI: Plant DNA
      aiCrisprLab,            // AI: CRISPR lab
    ],
    websiteImage: websiteBetterseeds,
    mobileImage: betterseedsMobile,
  },
  {
    slug: 'ascola',
    name: 'Ascola Garden',
    category: 'branding',
    description: 'לוגו ובניית אתר תדמית לעסק של מתחם אירועים טוסקני',
    logo: ascolaLogo,
    heroImage: ascolaWebsite,
    bgColor: '#F5F5F0',
    accentColor: '#2D5A4A',
    colors: ['#2D5A4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ascolaLogo,             // Logo
      ascolaBrandingMockup,   // Branding mockup
    ],
    websiteImage: ascolaWebsite,
  },
];

// ============ ADDITIONAL WORK (Websites only - Print section removed) ============

export const additionalWork = {
  websites: [],
};
