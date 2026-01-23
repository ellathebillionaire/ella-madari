import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import MockupsSection from "@/components/MockupsSection";

// Import website screenshots
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteLearnai from "@/assets/website-learnai.jpg";

// Import branding assets - Tali Ter
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";

// Import branding assets - SFD (Strength For Dancers)
import sfdLogo from "@/assets/sfd-logo.jpg";
import sfdMonogram from "@/assets/sfd-monogram.jpg";

// Import branding assets - Meshek 27
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";

// Import branding assets - Learn AI / DotAi
import learnaiLogo from "@/assets/learnai-logo.jpg";
import dotaiMonogram from "@/assets/dotai-monogram.jpg";

// Import branding assets - EBrider
import ebriderLogo from "@/assets/ebrider-logo.jpg";
import ebriderMonogram from "@/assets/ebrider-monogram.jpg";

// Import mockup images
import mockupTaliterSet from "@/assets/mockup-taliter-set.jpg";
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";
import mockupOnmor from "@/assets/mockup-onmor.png";
import mockupEbrider from "@/assets/mockup-ebrider.jpg";

const websites = [
  { id: "1", title: "BetterSeeds - Gene Editing Platform", screenshot: websiteBetterseeds },
  { id: "2", title: "Learn AI - Educational Platform", screenshot: websiteLearnai },
];

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
    logo: sfdLogo,
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
];

const mockups = [
  { id: "1", title: "Tali Ter - Brand Identity Set", image: mockupTaliterSet },
  { id: "2", title: "SFD - Fitness Equipment", image: mockupSfdBlack },
  { id: "3", title: "SFD - White Collection", image: mockupSfdWhite },
  { id: "4", title: "משק 27 - Full Branding", image: mockupMeshek27Branding },
  { id: "5", title: "משק 27 - Wall Signage", image: mockupMeshek27Wall },
  { id: "6", title: "EBrider - Electric Bike", image: mockupEbrider },
  { id: "7", title: "Adama - Business Cards", image: mockupAdamaCards },
  { id: "8", title: "Lin & Guy - Wedding Invitation", image: mockupWeddingInvite },
  { id: "9", title: "ON MOR - Luxury Logo", image: mockupOnmor },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WebsitesSection websites={websites} />
      <BrandingSection brands={brands} />
      <MockupsSection mockups={mockups} />
      
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
