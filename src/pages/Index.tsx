import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import MockupsSection from "@/components/MockupsSection";
import PrintDesignSection from "@/components/PrintDesignSection";

// ============ WEBSITES ============
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteLearnai from "@/assets/website-learnai.jpg";

// ============ BRANDING - TALI TER ============
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";

// ============ BRANDING - SFD (Strength For Dancers) ============
import sfdLogoFull from "@/assets/sfd-logo-full.jpg";
import sfdMonogram from "@/assets/sfd-monogram-new.jpg";

// ============ BRANDING - MESHEK 27 ============
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";

// ============ BRANDING - LEARN AI / DOTAI ============
import learnaiLogo from "@/assets/learnai-logo.jpg";
import dotaiMonogram from "@/assets/dotai-monogram.jpg";

// ============ BRANDING - EBRIDER ============
import ebriderLogo from "@/assets/ebrider-logo.jpg";
import ebriderMonogram from "@/assets/ebrider-monogram.jpg";

// ============ BRANDING - STUDIO ALEF ============
import studioalefLogo from "@/assets/studioalef-logo.png";

// ============ BRANDING - ON MOR ============
import onmorLogo from "@/assets/onmor-logo.png";

// ============ BRANDING - SI SEÑORA ============
import sisenoraLogo from "@/assets/sisenora-logo.jpg";

// ============ BRANDING - ELLA MADARI ============
import ellamadariLogo from "@/assets/ellamadari-logo.jpg";

// ============ MOCKUPS - TALI TER ============
import mockupTaliterSet from "@/assets/mockup-taliter-set.jpg";

// ============ MOCKUPS - SFD ============
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupSfdBands from "@/assets/mockup-sfd-bands.jpg";
import mockupTshirtAthlete from "@/assets/mockup-tshirt-athlete.jpg";

// ============ MOCKUPS - MESHEK 27 ============
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Tshirt from "@/assets/mockup-meshek27-tshirt.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";
import mockupMeshek27Packaging from "@/assets/mockup-meshek27-packaging.jpg";

// ============ MOCKUPS - EBRIDER ============
import mockupEbrider from "@/assets/mockup-ebrider.jpg";

// ============ MOCKUPS - OTHER ============
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ PRINT DESIGN ============
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";

// ============ DATA ============

const websites = [
  { id: "1", title: "BetterSeeds - Gene Editing Platform", screenshot: websiteBetterseeds },
  { id: "2", title: "Learn AI - Educational Platform", screenshot: websiteLearnai },
];

// Brands with complete identity (logo + monogram)
const brands = [
  {
    id: "1",
    name: "Tali Ter Barre Pilates",
    logo: taliterLogo,
    monogram: taliterMonogram,
    colors: ["#5CC8B5", "#F68B1F", "#FDF6E3", "#2A4A4A"],
  },
  {
    id: "2",
    name: "Strength For Dancers",
    logo: sfdLogoFull,
    monogram: sfdMonogram,
    colors: ["#1A1A1A", "#2D2D2D", "#F5F5F0", "#FFFFFF"],
  },
  {
    id: "3",
    name: "משק 27",
    logo: meshek27Logo,
    monogram: meshek27Monogram,
    colors: ["#4A7C3F", "#6B9F5B", "#F5F8E8", "#2D4A28"],
  },
  {
    id: "4",
    name: "Learn AI",
    logo: learnaiLogo,
    monogram: dotaiMonogram,
    colors: ["#00BCD4", "#0097A7", "#1A2B3C", "#F0F8FF"],
  },
  {
    id: "5",
    name: "EBrider",
    logo: ebriderLogo,
    monogram: ebriderMonogram,
    colors: ["#4A7C3F", "#1A1A1A", "#F5F5F5", "#2D4A28"],
  },
  {
    id: "6",
    name: "ON MOR",
    logo: onmorLogo,
    monogram: onmorLogo,
    colors: ["#722F37", "#C9A227", "#F5E6D3", "#1A0A0A"],
  },
  {
    id: "7",
    name: "Studio Alef",
    logo: studioalefLogo,
    monogram: studioalefLogo,
    colors: ["#4A4A4A", "#8B8B8B", "#FFFFFF", "#1A1A1A"],
  },
  {
    id: "8",
    name: "Si Señora",
    logo: sisenoraLogo,
    monogram: sisenoraLogo,
    colors: ["#1A1A1A", "#4A4A4A", "#FFFFFF", "#F5F5F5"],
  },
  {
    id: "9",
    name: "Ella Madari",
    logo: ellamadariLogo,
    monogram: ellamadariLogo,
    colors: ["#1A1A1A", "#FFFFFF", "#F5F5F5", "#2D2D2D"],
  },
];

// Mockups grouped by project
const mockups = [
  // Tali Ter
  { id: "1", title: "Tali Ter - Brand Identity", image: mockupTaliterSet },
  
  // SFD - Strength For Dancers
  { id: "2", title: "SFD - Fitness Equipment", image: mockupSfdBlack },
  { id: "3", title: "SFD - White Collection", image: mockupSfdWhite },
  { id: "4", title: "SFD - Resistance Bands", image: mockupSfdBands },
  { id: "5", title: "SFD - Train Like An Athlete", image: mockupTshirtAthlete },
  
  // Meshek 27
  { id: "6", title: "משק 27 - Full Branding", image: mockupMeshek27Branding },
  { id: "7", title: "משק 27 - Wall Signage", image: mockupMeshek27Wall },
  { id: "8", title: "משק 27 - T-Shirt", image: mockupMeshek27Tshirt },
  { id: "9", title: "משק 27 - Vegetable Box", image: mockupMeshek27Box },
  { id: "10", title: "משק 27 - Packaging", image: mockupMeshek27Packaging },
  
  // EBrider
  { id: "11", title: "EBrider - Electric Bike", image: mockupEbrider },
  
  // Other projects
  { id: "12", title: "Adama - Business Cards", image: mockupAdamaCards },
  { id: "13", title: "Lin & Guy - Wedding", image: mockupWeddingInvite },
];

const printDesigns = [
  { id: "1", title: "Ella Madari - Inspirational Poster", image: printPosterEllamadari },
  { id: "2", title: "ירקות מהמשק - Shopping Guide", image: printInfographicFarm },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WebsitesSection websites={websites} />
      <BrandingSection brands={brands} />
      <MockupsSection mockups={mockups} />
      {printDesigns.length > 0 && <PrintDesignSection designs={printDesigns} />}
      
      {/* Footer - minimal */}
      <footer className="py-16 text-center">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          © 2024 Ella Madari
        </p>
      </footer>
    </main>
  );
};

export default Index;
