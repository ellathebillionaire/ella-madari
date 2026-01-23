import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";

// ============ WEBSITES ============
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteLearnai from "@/assets/website-learnai.jpg";
import websiteSfd from "@/assets/website-sfd.jpg";
import websiteSenMobile from "@/assets/website-sen-mobile.png";

// ============ TALI TER ============
import taliterLogo from "@/assets/taliter-logo.jpg";
import mockupTaliterSet from "@/assets/mockup-taliter-set.jpg";
import mockupTaliterStudio from "@/assets/mockup-taliter-studio.jpg";
import mockupTaliterEquipment from "@/assets/mockup-taliter-equipment.jpg";

// ============ SFD (Strength For Dancers) ============
import sfdLogoTransparent from "@/assets/sfd-logo-transparent.png";
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupSfdBands from "@/assets/mockup-sfd-bands.jpg";
import mockupSfdBandSystem from "@/assets/mockup-sfd-band-system.jpg";
import mockupTshirtAthlete from "@/assets/mockup-tshirt-athlete.jpg";

// ============ MESHEK 27 ============
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Tshirt from "@/assets/mockup-meshek27-tshirt.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";
import mockupMeshek27Packaging from "@/assets/mockup-meshek27-packaging.jpg";

// ============ LEARN AI / BETTERSEEDS ============
import learnaiLogo from "@/assets/learnai-logo.jpg";
import aiDroneFarming from "@/assets/ai-drone-farming.jpg";
import aiDnaScientist from "@/assets/ai-dna-scientist.png";
import aiGeneEditing from "@/assets/ai-gene-editing.png";
import aiCrisprLab from "@/assets/ai-crispr-lab.png";
import aiPlantTechnology from "@/assets/ai-plant-technology.jpg";
import mockupLearnaiDevices from "@/assets/mockup-learnai-devices.jpg";
import mockupLearnaiMascot from "@/assets/mockup-learnai-mascot.jpg";

// ============ EBRIDER ============
import ebriderLogo from "@/assets/ebrider-logo-transparent.png";
import mockupEbrider from "@/assets/mockup-ebrider.jpg";
import mockupEbriderBike from "@/assets/mockup-ebrider-bike.jpg";
import mockupEbriderApp from "@/assets/mockup-ebrider-app.jpg";

// ============ SEN JEWELRY ============
import mockupSenJewelry from "@/assets/mockup-sen-jewelry.jpg";
import mockupSenPackaging from "@/assets/mockup-sen-packaging.jpg";

// ============ ON MOR ============
import onmorLogo from "@/assets/onmor-logo.png";
import mockupOnmorWine from "@/assets/mockup-onmor-wine.jpg";
import mockupOnmorLabel from "@/assets/mockup-onmor-label.jpg";

// ============ STUDIO ALEF ============
import studioalefLogo from "@/assets/studioalef-logo.png";
import mockupStudioalefWorkspace from "@/assets/mockup-studioalef-workspace.jpg";
import mockupStudioalefStationery from "@/assets/mockup-studioalef-stationery.jpg";

// ============ OTHER ============
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ PROJECT DATA ============

const projects = [
  {
    name: "BetterSeeds",
    category: "Website · AI Visuals · Branding",
    logo: undefined,
    colors: ["#4A7C3F", "#00BCD4", "#1A2B3C"],
    images: [websiteBetterseeds, aiPlantTechnology, aiDroneFarming, aiGeneEditing, aiCrisprLab],
  },
  {
    name: "Strength For Dancers",
    category: "Branding · Website · Product Design",
    logo: sfdLogoTransparent,
    colors: ["#1A1A1A", "#4A5568", "#64748B", "#1E3A5F"],
    images: [websiteSfd, mockupSfdBlack, mockupSfdWhite, mockupSfdBandSystem, mockupTshirtAthlete],
  },
  {
    name: "משק 27",
    category: "Branding · Packaging · Signage",
    logo: meshek27Logo,
    colors: ["#4A7C3F", "#6B9F5B", "#F5F8E8", "#2D4A28"],
    images: [mockupMeshek27Branding, mockupMeshek27Wall, mockupMeshek27Box, mockupMeshek27Packaging, mockupMeshek27Tshirt],
  },
  {
    name: "Learn AI",
    category: "Website · Branding · Illustration",
    logo: learnaiLogo,
    colors: ["#00BCD4", "#0097A7", "#1A2B3C"],
    images: [websiteLearnai, mockupLearnaiDevices, mockupLearnaiMascot, aiDnaScientist],
  },
  {
    name: "Tali Ter Barre Pilates",
    category: "Branding · Interior · Product",
    logo: taliterLogo,
    colors: ["#5CC8B5", "#F68B1F", "#FDF6E3", "#2A4A4A"],
    images: [mockupTaliterSet, mockupTaliterStudio, mockupTaliterEquipment],
  },
  {
    name: "EBrider",
    category: "Branding · Product · App Design",
    logo: ebriderLogo,
    colors: ["#4A7C3F", "#1A1A1A", "#F5F5F5"],
    images: [mockupEbriderBike, mockupEbrider, mockupEbriderApp],
  },
  {
    name: "SEN Fine Jewelry",
    category: "Website · Packaging · Branding",
    logo: undefined,
    colors: ["#1A365D", "#C53030", "#F7FAFC"],
    images: [websiteSenMobile, mockupSenJewelry, mockupSenPackaging],
  },
  {
    name: "ON MOR",
    category: "Branding · Packaging · Label Design",
    logo: onmorLogo,
    colors: ["#722F37", "#C9A227", "#F5E6D3"],
    images: [mockupOnmorWine, mockupOnmorLabel],
  },
  {
    name: "Studio Alef",
    category: "Branding · Stationery · Interior",
    logo: studioalefLogo,
    colors: ["#4A4A4A", "#8B8B8B", "#FFFFFF"],
    images: [mockupStudioalefWorkspace, mockupStudioalefStationery],
  },
  {
    name: "Graphic Design",
    category: "Print · Illustration · Invitations",
    logo: undefined,
    colors: ["#1A1A1A", "#FFFFFF"],
    images: [printPosterEllamadari, printInfographicFarm, mockupAdamaCards, mockupWeddingInvite],
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      {projects.map((project, index) => (
        project.images.length > 0 && (
          <ProjectSection
            key={project.name}
            name={project.name}
            category={project.category}
            logo={project.logo}
            images={project.images}
            colors={project.colors}
            isAlternate={index % 2 === 1}
          />
        )
      ))}
      
      {/* Footer - minimal */}
      <footer className="py-20 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          © 2024 Ella Madari · Design Portfolio
        </p>
      </footer>
    </main>
  );
};

export default Index;
