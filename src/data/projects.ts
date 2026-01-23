// SFD
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

// Tali Ter
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import taliterBrandingSet from "@/assets/taliter-branding-set.jpg";
import taliterWallMockup from "@/assets/taliter-wall-mockup.jpg";
import taliterBottleMockup from "@/assets/taliter-bottle-mockup.jpg";

// EBrider
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";

// Standalone Websites
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";
import websiteSenMobile from "@/assets/website-sen-mobile.png";

// Print & Other
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";
import mockupBusinesscard from "@/assets/mockup-businesscard.jpg";
import mockupStationery from "@/assets/mockup-stationery.jpg";
import mockupTotebag from "@/assets/mockup-totebag.jpg";
import mockupMug from "@/assets/mockup-mug.jpg";

export interface Project {
  slug: string;
  name: string;
  description?: string;
  logo: string;
  monogram?: string;
  heroImage: string;
  bgColor: string;
  accentColor?: string;
  images: string[];
  video?: string;
  website?: string;
}

export const projects: Project[] = [
  {
    slug: 'sfd',
    name: 'SFD',
    description: 'Strength For Dancers - מיתוג ועיצוב מוצרים לרקדנים',
    logo: sfdLogoTransparent,
    monogram: sfdMonogram,
    heroImage: mockupSfdWhite, // Clean white product shot - better for branding display
    bgColor: '#F5F5F7',
    accentColor: '#1A1A1A',
    images: [mockupSfdBlack, mockupSfdWhite, mockupSfdBandSystem, mockupSfdBands, mockupTshirtAthlete],
    website: websiteSfd,
  },
  {
    slug: 'meshek27',
    name: 'משק 27',
    description: 'מיתוג ואריזות לחוות משק 27',
    logo: meshek27Logo,
    monogram: meshek27Monogram,
    heroImage: mockupMeshek27Branding, // Full branding set shows the complete identity
    bgColor: '#F5F8F3',
    accentColor: '#4A7C3F',
    images: [mockupMeshek27Branding, mockupMeshek27Wall, mockupMeshek27Box, mockupMeshek27Tshirt, mockupMeshek27Packaging],
  },
  {
    slug: 'sisenora',
    name: 'Si Señora',
    description: 'מיתוג ואתר לחנות אופנה',
    logo: sisenoraLogo,
    heroImage: mockupSisenoraShop,
    bgColor: '#FAF8F5',
    accentColor: '#D4A574',
    images: [mockupSisenoraShop],
    website: websiteSisenora,
  },
  {
    slug: 'learnai',
    name: 'Learn AI',
    description: 'מיתוג ואנימציה לפלטפורמת לימוד AI',
    logo: learnaiLogoFull,
    monogram: dotaiMonogram,
    heroImage: dotaiMascot, // Mascot is the brand identity
    bgColor: '#F0FAFB',
    accentColor: '#00D4E5',
    images: [learnaiLogo, dotaiMascot, dotaiMonogram],
    video: learnaiAnimation,
  },
  {
    slug: 'taliter',
    name: 'Tali Ter',
    description: 'מיתוג לקוסמטיקאית',
    logo: taliterLogo,
    monogram: taliterMonogram,
    heroImage: taliterBrandingSet, // Full branding set is more comprehensive
    bgColor: '#FFFBF5',
    accentColor: '#5CC8B5',
    images: [taliterBrandingSet, taliterWallMockup, taliterBottleMockup],
  },
  {
    slug: 'ebrider',
    name: 'EBrider',
    description: 'מיתוג לחברת אופניים חשמליים',
    logo: ebriderLogoNew,
    monogram: ebriderSymbol,
    heroImage: ebriderMockupHero,
    bgColor: '#F5F8F5',
    accentColor: '#4A7C3F',
    images: [ebriderMockupHero],
  },
];

export const additionalWork = {
  websites: [
    { name: 'BetterSeeds', image: websiteBetterseeds },
    { name: 'Ella Madari Shop', image: websiteEllamadariShop },
    { name: 'SEN Mobile', image: websiteSenMobile },
  ],
  print: [
    { name: 'Poster Ellamadari', image: printPosterEllamadari },
    { name: 'Infographic Farm', image: printInfographicFarm },
    { name: 'Adama Cards', image: mockupAdamaCards },
    { name: 'Wedding Invite', image: mockupWeddingInvite },
    { name: 'Business Card', image: mockupBusinesscard },
    { name: 'Stationery', image: mockupStationery },
    { name: 'Tote Bag', image: mockupTotebag },
    { name: 'Mug', image: mockupMug },
  ],
};
