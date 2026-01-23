import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import MockupsSection from "@/components/MockupsSection";
import FullProjectSection from "@/components/FullProjectSection";

// ============ WEBSITES ============
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteSfd from "@/assets/website-sfd.jpg";
import websiteSenMobile from "@/assets/website-sen-mobile.png";
import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";
import websiteSisenora from "@/assets/website-sisenora.png";

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
import learnaiLogoFull from "@/assets/learnai-logo-full.jpg";
import dotaiMascot from "@/assets/dotai-mascot.jpg";
import learnaiAnimation from "@/assets/learnai-animation.mp4";

// ============ TALI TER ============
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import taliterWallMockup from "@/assets/taliter-wall-mockup.jpg";
import taliterBrandingSet from "@/assets/taliter-branding-set.jpg";
import taliterBottleMockup from "@/assets/taliter-bottle-mockup.jpg";

// ============ EBRIDER ============
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";

// ============ SI SEÑORA ============
import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

// ============ OTHER MOCKUPS ============
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ STANDALONE DATA ============

// Websites without full projects
const standaloneWebsites = [
  { id: "betterseeds", title: "BetterSeeds", screenshot: websiteBetterseeds },
  { id: "ellamadari", title: "Ella Madari Shop", screenshot: websiteEllamadariShop },
  { id: "sen", title: "SEN Fine Jewelry", screenshot: websiteSenMobile, type: "mobile" as const },
];

// Standalone mockups/print
const standaloneMockups = [
  { id: "poster-ellamadari", title: "Ella Madari Poster", image: printPosterEllamadari },
  { id: "infographic", title: "Farm Infographic", image: printInfographicFarm },
  { id: "adama-cards", title: "Adama Cards", image: mockupAdamaCards },
  { id: "wedding", title: "Wedding Invitation", image: mockupWeddingInvite },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      {/* ========== FULL PROJECTS ========== */}
      
      <FullProjectSection
        name="SFD - Strength For Dancers"
        description="Branding · Website · Product Packaging"
        logo={sfdLogoTransparent}
        monogram={sfdMonogram}
        website={websiteSfd}
        mockups={[mockupSfdBlack, mockupSfdWhite, mockupSfdBandSystem, mockupSfdBands, mockupTshirtAthlete]}
        colors={["#1A1A1A", "#4A5568", "#64748B", "#1E3A5F"]}
      />
      
      <FullProjectSection
        name="משק 27"
        description="Branding · Packaging Design"
        logo={meshek27Logo}
        monogram={meshek27Monogram}
        mockups={[mockupMeshek27Branding, mockupMeshek27Wall, mockupMeshek27Box, mockupMeshek27Packaging, mockupMeshek27Tshirt]}
        colors={["#4A7C3F", "#6B9F5B", "#F5F8E8", "#2D4A28"]}
        isAlternate
      />
      
      <FullProjectSection
        name="Si Señora"
        description="Branding · Website · Interior Design"
        logo={sisenoraLogo}
        website={websiteSisenora}
        mockups={[mockupSisenoraShop]}
        colors={["#1A1A1A", "#D4A574", "#F5F5F0", "#4A7C3F"]}
      />
      
      <FullProjectSection
        name="Learn AI / DotAi"
        description="Avatar Design · Logo · Animation"
        logo={learnaiLogoFull}
        mascot={dotaiMascot}
        video={learnaiAnimation}
        colors={["#00D4E5", "#1A365D", "#F8FAFC", "#0F172A"]}
        isAlternate
      />
      
      <FullProjectSection
        name="Tali Ter"
        description="Branding · Pilates Studio Identity"
        logo={taliterLogo}
        monogram={taliterMonogram}
        mockups={[taliterBrandingSet, taliterWallMockup, taliterBottleMockup]}
        colors={["#5CC8B5", "#F68B1F", "#FDF6E3", "#2A4A4A"]}
      />
      
      <FullProjectSection
        name="EBrider"
        description="Branding · Logo · Symbol"
        logo={ebriderLogoNew}
        monogram={ebriderSymbol}
        mockups={[ebriderMockupHero]}
        colors={["#4A7C3F", "#1A1A1A", "#F5F5F5"]}
        isAlternate
      />
      
      {/* ========== STANDALONE SECTIONS ========== */}
      
      <WebsitesSection websites={standaloneWebsites} />
      <MockupsSection mockups={standaloneMockups} />
      
      {/* Footer - Premium minimal */}
      <footer className="py-32 md:py-40 text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="text-[11px] text-muted-foreground tracking-[0.3em] uppercase font-light">
            © 2024 Ella Madari
          </p>
          <p className="mt-2 text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
            Crafted with intention
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
