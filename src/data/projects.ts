// ============ BRANDING PROJECTS ============

// SFD - Strength For Dancers
import sfdLogoTransparent from "@/assets/sfd-logo-transparent.png";
import sfdMonogram from "@/assets/sfd-monogram-new.jpg";
import websiteSfd from "@/assets/website-sfd.jpg";
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupSfdBands from "@/assets/mockup-sfd-bands.jpg";
import mockupSfdBandSystem from "@/assets/mockup-sfd-band-system.jpg";
import mockupTshirtAthlete from "@/assets/mockup-tshirt-athlete.jpg";

// Meshek 27
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";
import mockupMeshek27Tshirt from "@/assets/mockup-meshek27-tshirt.jpg";
import mockupMeshek27Packaging from "@/assets/mockup-meshek27-packaging.jpg";

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

// Tali Ter
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import taliterBrandingSet from "@/assets/taliter-branding-set.jpg";
import mockupTaliterSet from "@/assets/mockup-taliter-set.jpg";
import taliterWallMockup from "@/assets/taliter-wall-mockup.jpg";
import taliterBottleMockup from "@/assets/taliter-bottle-mockup.jpg";

// EBrider
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";
import mockupEbrider from "@/assets/mockup-ebrider.jpg";

// ============ ADDITIONAL WORK ============

// Websites
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";
import websiteSenMobile from "@/assets/website-sen-mobile.png";

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
// Hero images chosen for CONSISTENCY - all show "branding set" style mockups
// showing multiple branded items together for unified visual appearance

export const projects: Project[] = [
  {
    slug: 'sfd',
    name: 'SFD',
    category: 'branding',
    description: 'Strength For Dancers - מיתוג מלא ועיצוב מוצרים',
    logo: sfdLogoTransparent,
    monogram: sfdMonogram,
    heroImage: mockupSfdBandSystem, // Better hero - shows the band system clearly
    bgColor: '#F5F5F7',
    accentColor: '#1A1A1A',
    colors: ['#1A1A1A', '#FFFFFF', '#4A5568'],
    images: [
      mockupSfdBlack,      // Product mockup
      mockupSfdWhite,      // White version
      mockupSfdBands,      // Product detail
      mockupTshirtAthlete, // Apparel
      websiteSfd,          // Website
    ],
  },
  {
    slug: 'meshek27',
    name: 'משק 27',
    category: 'branding',
    description: 'מיתוג ואריזות לחווה אורגנית',
    logo: meshek27Logo,
    monogram: meshek27Monogram,
    heroImage: mockupMeshek27Branding, // Full branding set
    bgColor: '#F5F8F3',
    accentColor: '#4A7C3F',
    colors: ['#4A7C3F', '#8BC34A', '#F5F5DC'],
    images: [
      meshek27Monogram,        // Monogram
      mockupMeshek27Wall,      // Environment mockup
      mockupMeshek27Box,       // Packaging
      mockupMeshek27Packaging, // More packaging
      mockupMeshek27Tshirt,    // Apparel
    ],
  },
  {
    slug: 'taliter',
    name: 'Tali Ter',
    category: 'branding',
    description: 'מיתוג לסטודיו לקוסמטיקה ופילאטיס',
    logo: taliterLogo,
    monogram: taliterMonogram,
    heroImage: taliterBrandingSet, // Full branding set
    bgColor: '#FFFBF5',
    accentColor: '#5CC8B5',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    images: [
      taliterMonogram,     // Monogram
      mockupTaliterSet,    // Set mockup
      taliterWallMockup,   // Environment
      taliterBottleMockup, // Product
    ],
  },
  {
    slug: 'ebrider',
    name: 'EBrider',
    category: 'branding',
    description: 'מיתוג לחברת אופניים חשמליים',
    logo: ebriderLogoNew,
    monogram: ebriderSymbol,
    heroImage: ebriderMockupHero, // Main product mockup
    bgColor: '#F5F8F5',
    accentColor: '#4A9F4A',
    colors: ['#4A9F4A', '#1A1A1A', '#FFFFFF'],
    images: [
      ebriderSymbol,   // Symbol
      mockupEbrider,   // Additional mockup
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
      websiteSisenora, // Website
    ],
  },
  {
    slug: 'learnai',
    name: 'Learn AI',
    category: 'branding',
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    logo: learnaiLogoFull,
    monogram: dotaiMonogram,
    heroImage: websiteLearnai, // Website as hero - more impressive
    bgColor: '#F0FAFB',
    accentColor: '#00D4E5',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    images: [
      dotaiMascot,    // Mascot
      learnaiLogo,    // Logo variant
      dotaiMonogram,  // Symbol
    ],
    video: learnaiAnimation,
  },
];

// ============ ADDITIONAL WORK (Websites, Print, Graphics) ============

export const additionalWork = {
  websites: [
    { name: 'BetterSeeds', image: websiteBetterseeds, color: '#4A7C3F' },
    { name: 'Ella Madari Shop', image: websiteEllamadariShop, color: '#1A1A1A' },
    { name: 'SEN Jewelry', image: websiteSenMobile, color: '#0D4F4F' },
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
