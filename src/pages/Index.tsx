import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import MockupsSection from "@/components/MockupsSection";

// ============ WEBSITES ============
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteLearnai from "@/assets/website-learnai.jpg";
import websiteSfd from "@/assets/website-sfd.jpg";
import websiteSenMobile from "@/assets/website-sen-mobile.png";
import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";

// ============ SFD (Strength For Dancers) ============
import sfdLogoTransparent from "@/assets/sfd-logo-transparent.png";
import sfdMonogram from "@/assets/sfd-monogram-new.jpg";
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupSfdBands from "@/assets/mockup-sfd-bands.jpg";
import mockupSfdBandSystem from "@/assets/mockup-sfd-band-system.jpg";
import mockupTshirtAthlete from "@/assets/mockup-tshirt-athlete.jpg";

// ============ MESHEK 27 ============
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Tshirt from "@/assets/mockup-meshek27-tshirt.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";
import mockupMeshek27Packaging from "@/assets/mockup-meshek27-packaging.jpg";

// ============ LEARN AI ============
import learnaiLogo from "@/assets/learnai-logo.jpg";

// ============ TALI TER ============
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import mockupTaliterSet from "@/assets/mockup-taliter-set.jpg";

// ============ EBRIDER ============
import ebriderLogo from "@/assets/ebrider-logo-transparent.png";
import ebriderMonogram from "@/assets/ebrider-monogram-transparent.png";
import mockupEbrider from "@/assets/mockup-ebrider.jpg";

// ============ SI SEÑORA ============
import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";
import websiteSisenora from "@/assets/website-sisenora.png";

// ============ OTHER MOCKUPS ============
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ DATA ============

const websites = [
  { id: "betterseeds", title: "BetterSeeds", screenshot: websiteBetterseeds },
  { id: "sfd", title: "Strength For Dancers", screenshot: websiteSfd },
  { id: "learnai", title: "Learn AI", screenshot: websiteLearnai },
  { id: "sisenora", title: "Si Señora", screenshot: websiteSisenora },
  { id: "ellamadari", title: "Ella Madari Shop", screenshot: websiteEllamadariShop },
  { id: "sen", title: "SEN Fine Jewelry", screenshot: websiteSenMobile, type: "mobile" as const },
];

const brands = [
  {
    id: "sfd",
    name: "Strength For Dancers",
    logo: sfdLogoTransparent,
    monogram: sfdMonogram,
    colors: ["#1A1A1A", "#4A5568", "#64748B", "#1E3A5F"],
  },
  {
    id: "meshek27",
    name: "משק 27",
    logo: meshek27Logo,
    monogram: meshek27Monogram,
    colors: ["#4A7C3F", "#6B9F5B", "#F5F8E8", "#2D4A28"],
  },
  {
    id: "taliter",
    name: "Tali Ter Barre Pilates",
    logo: taliterLogo,
    monogram: taliterMonogram,
    colors: ["#5CC8B5", "#F68B1F", "#FDF6E3", "#2A4A4A"],
  },
  {
    id: "ebrider",
    name: "EBrider",
    logo: ebriderLogo,
    monogram: ebriderMonogram,
    colors: ["#4A7C3F", "#1A1A1A", "#F5F5F5"],
  },
  {
    id: "sisenora",
    name: "Si Señora",
    logo: sisenoraLogo,
    monogram: sisenoraLogo, // using logo as monogram for now
    colors: ["#1A1A1A", "#D4A574", "#F5F5F0", "#4A7C3F"],
  },
];

const mockups = [
  { id: "sfd-black", title: "SFD Black Packaging", image: mockupSfdBlack },
  { id: "sfd-white", title: "SFD White Packaging", image: mockupSfdWhite },
  { id: "sfd-bands", title: "SFD Band System", image: mockupSfdBandSystem },
  { id: "sfd-athlete", title: "SFD Athlete Tee", image: mockupTshirtAthlete },
  { id: "meshek-branding", title: "Meshek 27 Branding", image: mockupMeshek27Branding },
  { id: "meshek-wall", title: "Meshek 27 Wall", image: mockupMeshek27Wall },
  { id: "meshek-box", title: "Meshek 27 Box", image: mockupMeshek27Box },
  { id: "meshek-packaging", title: "Meshek 27 Packaging", image: mockupMeshek27Packaging },
  { id: "meshek-tshirt", title: "Meshek 27 Tshirt", image: mockupMeshek27Tshirt },
  { id: "taliter", title: "Tali Ter Set", image: mockupTaliterSet },
  { id: "ebrider", title: "EBrider", image: mockupEbrider },
  { id: "sisenora", title: "Si Señora Shop", image: mockupSisenoraShop },
  { id: "poster-ellamadari", title: "Ella Madari Poster", image: printPosterEllamadari },
  { id: "infographic", title: "Farm Infographic", image: printInfographicFarm },
  { id: "adama-cards", title: "Adama Cards", image: mockupAdamaCards },
  { id: "wedding", title: "Wedding Invitation", image: mockupWeddingInvite },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WebsitesSection websites={websites} />
      <BrandingSection brands={brands} />
      <MockupsSection mockups={mockups} />
      
      {/* Footer */}
      <footer className="py-20 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          © 2024 Ella Madari · Design Portfolio
        </p>
      </footer>
    </main>
  );
};

export default Index;
