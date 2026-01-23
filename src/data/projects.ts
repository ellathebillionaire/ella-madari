// ============ BRANDING PROJECTS ============

// SFD - Strength For Dancers - New organized assets
import sfdMainLogo from '@/assets/sfd/main-logo.jpg';
import sfdBrandingSet from '@/assets/sfd/branding-set.jpg';
import sfdSecondaryLogo from '@/assets/sfd/secondary-logo.jpg';
import sfdTshirtMockup from '@/assets/sfd/tshirt-mockup.jpg';
import sfdWebsite from '@/assets/sfd/website.jpg';
import sfdLogoTransparent from '@/assets/sfd/logo-transparent.png';
import sfdSymbol from '@/assets/sfd/symbol.jpg';

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
import websiteSisenora from "@/assets/website-sisenora.png";
import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

// Learn AI / DotAi
import learnaiLogoFull from "@/assets/learnai-logo-full.jpg";
import learnaiLogo from "@/assets/learnai-logo.jpg";
import dotaiMascot from "@/assets/dotai-mascot.jpg";
import dotaiMonogram from "@/assets/dotai-monogram.jpg";
import learnaiAnimation from "@/assets/learnai-animation.mp4";
import websiteLearnai from "@/assets/website-learnai.jpg";
import learnaiMockupDesktop from "@/assets/learnai-mockup-desktop.jpg";
import dotaiLogoFull from "@/assets/dotai-logo-full.jpg";

// Tali Ter - New organized assets
import taliterBrandingSet from '@/assets/taliter/branding-set.jpg';
import taliterWallSignage from '@/assets/taliter/wall-signage.jpg';
import taliterBottleMockup from '@/assets/taliter/bottle-mockup.jpg';

// EBrider
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";
import mockupEbrider from "@/assets/mockup-ebrider.jpg";

// Studio Alef
import studioalefLogo from "@/assets/studioalef-logo.png";
import studioalefWallMockup from "@/assets/studioalef-wall-mockup.png";
import studioalefAnimation from "@/assets/studioalef-animation.mp4";

// SEN Jewelry
import websiteSenFull from "@/assets/website-sen-full.png";
import websiteSenMobile from "@/assets/website-sen-mobile.png";

// BetterSeeds
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import betterseedsIcons from "@/assets/betterseeds-icons.jpg";
import betterseedsAnimation from "@/assets/betterseeds-animation.mp4";

// ============ ADDITIONAL WORK ============

import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";

// Print & Graphic Design
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";
import mockupBusinesscard from "@/assets/mockup-businesscard.jpg";
import mockupStationery from "@/assets/mockup-stationery.jpg";
import mockupTotebag from "@/assets/mockup-totebag.jpg";
import mockupMug from "@/assets/mockup-mug.jpg";

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
}

// ============ BRANDING PROJECTS ============

export const projects: Project[] = [
  {
    slug: 'sfd',
    name: 'SFD',
    category: 'branding',
    description: 'Strength For Dancers - מיתוג מלא ועיצוב מוצרים',
    logo: sfdLogoTransparent,
    monogram: sfdSecondaryLogo,
    heroImage: sfdBrandingSet,
    bgColor: '#F5F5F7',
    accentColor: '#1A1A1A',
    colors: ['#1A1A1A', '#FFFFFF', '#4A5568'],
    images: [
      sfdMainLogo,
      sfdSymbol,
      sfdTshirtMockup,
      sfdWebsite,
    ],
  },
  {
    slug: 'meshek27',
    name: 'משק 27',
    category: 'branding',
    description: 'מיתוג מלא לחווה אורגנית',
    logo: meshek27LogoClean,
    monogram: meshek27AppIcons,
    heroImage: meshek27BrandingFull,
    bgColor: '#F5F8F3',
    accentColor: '#4A7C3F',
    colors: ['#4A7C3F', '#8BC34A', '#F5F5DC'],
    images: [
      meshek27WallLogo,
      meshek27WallSignage,
      meshek27BoxVegetables,
      meshek27BoxDesign,
      meshek27TshirtMockup,
      meshek27LogoGraphic,
      meshek27AppIcons,
    ],
  },
  {
    slug: 'taliter',
    name: 'Tali Ter',
    category: 'branding',
    description: 'מיתוג לסטודיו לבר פילאטיס',
    logo: taliterBrandingSet,
    heroImage: taliterBrandingSet,
    bgColor: '#FFFBF5',
    accentColor: '#5CC8B5',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    images: [
      taliterWallSignage,
      taliterBottleMockup,
    ],
  },
  {
    slug: 'learnai',
    name: 'Learn AI',
    category: 'branding',
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    logo: learnaiLogoFull,
    monogram: dotaiMonogram,
    heroImage: dotaiLogoFull, // Clean DotAi mascot logo
    bgColor: '#F0FAFB',
    accentColor: '#00D4E5',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    images: [
      learnaiMockupDesktop,
      dotaiMascot,
      websiteLearnai,
      learnaiLogo,
    ],
    video: learnaiAnimation,
  },
  {
    slug: 'studioalef',
    name: 'Studio Alef',
    category: 'branding',
    description: 'מיתוג לסטודיו לעיצוב גרפי',
    logo: studioalefLogo,
    heroImage: studioalefWallMockup, // Elegant wall signage
    bgColor: '#F8F8F8',
    accentColor: '#5A5A5A',
    colors: ['#5A5A5A', '#FFFFFF', '#E0E0E0'],
    images: [],
    video: studioalefAnimation,
  },
  {
    slug: 'sen',
    name: 'SEN Jewelry',
    category: 'website',
    description: 'עיצוב אתר לחנות תכשיטים',
    logo: websiteSenMobile,
    heroImage: websiteSenFull, // Dramatic jewelry website
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
    description: 'מיתוג לחברת אופניים חשמליים',
    logo: ebriderLogoNew,
    monogram: ebriderSymbol,
    heroImage: ebriderMockupHero, // Main product display
    bgColor: '#F5F8F5',
    accentColor: '#4A9F4A',
    colors: ['#4A9F4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ebriderSymbol,
      mockupEbrider,
    ],
  },
  {
    slug: 'sisenora',
    name: 'Si Señora',
    category: 'branding',
    description: 'מיתוג ואתר לחנות אופנה',
    logo: sisenoraLogo,
    heroImage: mockupSisenoraShop, // Shop environment
    bgColor: '#FAF8F5',
    accentColor: '#D4A574',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0'],
    images: [
      websiteSisenora,
    ],
  },
  {
    slug: 'betterseeds',
    name: 'BetterSeeds',
    category: 'branding',
    description: 'מיתוג ואתר לחברת טכנולוגיה חקלאית',
    logo: betterseedsIcons,
    heroImage: betterseedsIcons, // Clean icon set
    bgColor: '#F5F8F3',
    accentColor: '#3D7C3F',
    colors: ['#3D7C3F', '#6AAF4A', '#FFFFFF'],
    images: [
      websiteBetterseeds,
    ],
    video: betterseedsAnimation,
  },
];

// ============ ADDITIONAL WORK (Websites, Print, Graphics) ============

export const additionalWork = {
  websites: [
    { name: 'Ella Madari Shop', image: websiteEllamadariShop, color: '#1A1A1A' },
  ],
  print: [
    { name: 'פוסטר אלה מדארי', image: printPosterEllamadari },
    { name: 'אינפוגרפיקה חקלאית', image: printInfographicFarm },
    { name: 'כרטיסי ביקור אדמה', image: mockupAdamaCards },
    { name: 'הזמנה לחתונה', image: mockupWeddingInvite },
    { name: 'כרטיס ביקור', image: mockupBusinesscard },
    { name: 'ניירת משרדית', image: mockupStationery },
    { name: 'Tote Bag', image: mockupTotebag },
    { name: 'מאג', image: mockupMug },
  ],
};
