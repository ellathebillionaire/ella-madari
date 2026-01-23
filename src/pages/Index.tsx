import { useState } from 'react';

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
import mockupSfdBandSystem from "@/assets/mockup-sfd-band-system.jpg";

// ============ MESHEK 27 ============
import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";

// ============ LEARN AI ============
import learnaiLogoFull from "@/assets/learnai-logo-full.jpg";
import dotaiMascot from "@/assets/dotai-mascot.jpg";
import learnaiAnimation from "@/assets/learnai-animation.mp4";

// ============ TALI TER ============
import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import taliterBrandingSet from "@/assets/taliter-branding-set.jpg";
import taliterWallMockup from "@/assets/taliter-wall-mockup.jpg";

// ============ EBRIDER ============
import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";

// ============ SI SEÑORA ============
import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

// ============ OTHER ============
import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ PROJECT DATA ============

interface ProjectImage {
  src: string;
  type: 'mockup' | 'website';
}

interface Project {
  id: string;
  name: string;
  colors: string[];
  logo: string;
  symbol?: string;
  mainImage: string;
  mainImageType: 'landscape' | 'square';
  secondaryImages?: ProjectImage[];
  video?: string;
}

const projects: Project[] = [
  {
    id: 'sfd',
    name: 'SFD - Strength For Dancers',
    colors: ['#1A1A1A', '#4A5568', '#64748B', '#1E3A5F'],
    logo: sfdLogoTransparent,
    symbol: sfdMonogram,
    mainImage: websiteSfd,
    mainImageType: 'landscape',
    secondaryImages: [
      { src: mockupSfdBlack, type: 'mockup' },
      { src: mockupSfdWhite, type: 'mockup' },
      { src: mockupSfdBandSystem, type: 'mockup' },
    ],
  },
  {
    id: 'meshek27',
    name: 'משק 27',
    colors: ['#4A7C3F', '#6B9F5B', '#F5F8E8', '#2D4A28'],
    logo: meshek27Logo,
    symbol: meshek27Monogram,
    mainImage: mockupMeshek27Branding,
    mainImageType: 'landscape',
    secondaryImages: [
      { src: mockupMeshek27Wall, type: 'mockup' },
      { src: mockupMeshek27Box, type: 'mockup' },
    ],
  },
  {
    id: 'sisenora',
    name: 'Si Señora',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0', '#4A7C3F'],
    logo: sisenoraLogo,
    mainImage: websiteSisenora,
    mainImageType: 'landscape',
    secondaryImages: [
      { src: mockupSisenoraShop, type: 'mockup' },
    ],
  },
  {
    id: 'learnai',
    name: 'Learn AI / DotAi',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC', '#0F172A'],
    logo: learnaiLogoFull,
    symbol: dotaiMascot,
    mainImage: dotaiMascot,
    mainImageType: 'square',
    video: learnaiAnimation,
  },
  {
    id: 'taliter',
    name: 'Tali Ter',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3', '#2A4A4A'],
    logo: taliterLogo,
    symbol: taliterMonogram,
    mainImage: taliterBrandingSet,
    mainImageType: 'landscape',
    secondaryImages: [
      { src: taliterWallMockup, type: 'mockup' },
    ],
  },
  {
    id: 'ebrider',
    name: 'EBrider',
    colors: ['#4A7C3F', '#1A1A1A', '#F5F5F5'],
    logo: ebriderLogoNew,
    symbol: ebriderSymbol,
    mainImage: ebriderMockupHero,
    mainImageType: 'landscape',
  },
];

const standaloneItems = [
  { src: websiteBetterseeds, name: 'BetterSeeds' },
  { src: websiteEllamadariShop, name: 'Ella Madari Shop' },
  { src: websiteSenMobile, name: 'SEN Jewelry' },
  { src: printPosterEllamadari, name: 'Poster' },
  { src: printInfographicFarm, name: 'Infographic' },
  { src: mockupAdamaCards, name: 'Business Cards' },
  { src: mockupWeddingInvite, name: 'Wedding Invite' },
];

const Index = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background px-6 md:px-10 lg:px-16 py-8 md:py-12">
      {/* Header */}
      <header className="mb-16 md:mb-20">
        <h1 className="text-3xl md:text-4xl font-extralight tracking-[-0.03em]">Ella Madari</h1>
        <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-2">Design Portfolio</p>
      </header>

      {/* Projects Grid - 2 columns with big spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
        {projects.map((project) => (
          <div key={project.id} className="space-y-4">
            {/* Project Header: Name + Colors */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-wide">{project.name}</h2>
              <div className="flex gap-1.5">
                {project.colors.map((color, i) => (
                  <div 
                    key={i}
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Logo + Symbol Row */}
            <div className="flex gap-3 items-center">
              {/* Logo */}
              <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-border/10 flex items-center justify-center min-h-[80px]">
                <img 
                  src={project.logo} 
                  alt={`${project.name} logo`}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              {/* Symbol/Monogram */}
              {project.symbol && (
                <div className="w-20 h-20 bg-white rounded-xl p-3 shadow-sm border border-border/10 flex items-center justify-center">
                  <img 
                    src={project.symbol} 
                    alt={`${project.name} symbol`}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Main Image */}
            <div 
              className="overflow-hidden rounded-xl cursor-pointer group"
              onMouseEnter={() => setHoveredItem(`${project.id}-main`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {project.video ? (
                <div className="aspect-video bg-white rounded-xl overflow-hidden">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className={`${project.mainImageType === 'landscape' ? 'aspect-[16/9]' : 'aspect-square'} overflow-hidden bg-muted`}>
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      hoveredItem === `${project.id}-main` ? 'scale-105' : 'scale-100'
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Secondary Images Row */}
            {project.secondaryImages && project.secondaryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {project.secondaryImages.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                    onMouseEnter={() => setHoveredItem(`${project.id}-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <img
                      src={img.src}
                      alt={`${project.name} mockup`}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredItem === `${project.id}-${idx}` ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More Work Section */}
      <div className="mt-20 md:mt-28">
        <h3 className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-4">More Work</h3>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {standaloneItems.map((item, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setHoveredItem(`standalone-${idx}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={item.src}
                alt={item.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hoveredItem === `standalone-${idx}` ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-20 pt-6 border-t border-border/10">
        <p className="text-[9px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          © 2024 Ella Madari
        </p>
      </footer>
    </main>
  );
};

export default Index;
