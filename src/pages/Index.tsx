import { useState } from 'react';

// ============ ASSETS ============
import websiteSfd from "@/assets/website-sfd.jpg";
import websiteSisenora from "@/assets/website-sisenora.png";
import websiteBetterseeds from "@/assets/website-betterseeds.jpg";
import websiteEllamadariShop from "@/assets/website-ellamadari-shop.png";
import websiteSenMobile from "@/assets/website-sen-mobile.png";

import sfdLogoTransparent from "@/assets/sfd-logo-transparent.png";
import sfdMonogram from "@/assets/sfd-monogram-new.jpg";
import mockupSfdBlack from "@/assets/mockup-sfd-black.jpg";
import mockupSfdWhite from "@/assets/mockup-sfd-white.jpg";
import mockupSfdBandSystem from "@/assets/mockup-sfd-band-system.jpg";

import meshek27Logo from "@/assets/meshek27-logo.jpg";
import meshek27Monogram from "@/assets/meshek27-monogram.jpg";
import mockupMeshek27Branding from "@/assets/mockup-meshek27-branding.jpg";
import mockupMeshek27Wall from "@/assets/mockup-meshek27-wall.jpg";
import mockupMeshek27Box from "@/assets/mockup-meshek27-box.jpg";

import learnaiLogoFull from "@/assets/learnai-logo-full.jpg";
import dotaiMascot from "@/assets/dotai-mascot.jpg";
import learnaiAnimation from "@/assets/learnai-animation.mp4";

import taliterLogo from "@/assets/taliter-logo.jpg";
import taliterMonogram from "@/assets/taliter-monogram.jpg";
import taliterBrandingSet from "@/assets/taliter-branding-set.jpg";
import taliterWallMockup from "@/assets/taliter-wall-mockup.jpg";

import ebriderLogoNew from "@/assets/ebrider-logo-new.jpg";
import ebriderSymbol from "@/assets/ebrider-symbol.jpg";
import ebriderMockupHero from "@/assets/ebrider-mockup-hero.jpg";

import sisenoraLogo from "@/assets/sisenora-logo-new.jpg";
import mockupSisenoraShop from "@/assets/mockup-sisenora-shop.png";

import printPosterEllamadari from "@/assets/print-poster-ellamadari.jpg";
import printInfographicFarm from "@/assets/print-infographic-farm.jpg";
import mockupAdamaCards from "@/assets/mockup-adama-cards.jpg";
import mockupWeddingInvite from "@/assets/mockup-wedding-invite.jpg";

// ============ DATA ============

const projects = [
  {
    id: 'sfd',
    name: 'SFD',
    colors: ['#1A1A1A', '#4A5568', '#64748B'],
    logo: sfdLogoTransparent,
    symbol: sfdMonogram,
    mainImage: websiteSfd,
    extras: [mockupSfdBlack, mockupSfdWhite, mockupSfdBandSystem],
  },
  {
    id: 'meshek27',
    name: 'משק 27',
    colors: ['#4A7C3F', '#6B9F5B', '#F5F8E8'],
    logo: meshek27Logo,
    symbol: meshek27Monogram,
    mainImage: mockupMeshek27Branding,
    extras: [mockupMeshek27Wall, mockupMeshek27Box],
  },
  {
    id: 'sisenora',
    name: 'Si Señora',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0'],
    logo: sisenoraLogo,
    mainImage: websiteSisenora,
    extras: [mockupSisenoraShop],
  },
  {
    id: 'learnai',
    name: 'Learn AI',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    logo: learnaiLogoFull,
    symbol: dotaiMascot,
    mainImage: dotaiMascot,
    video: learnaiAnimation,
  },
  {
    id: 'taliter',
    name: 'Tali Ter',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    logo: taliterLogo,
    symbol: taliterMonogram,
    mainImage: taliterBrandingSet,
    extras: [taliterWallMockup],
  },
  {
    id: 'ebrider',
    name: 'EBrider',
    colors: ['#4A7C3F', '#1A1A1A', '#F5F5F5'],
    logo: ebriderLogoNew,
    symbol: ebriderSymbol,
    mainImage: ebriderMockupHero,
  },
];

const moreWork = [
  websiteBetterseeds, websiteEllamadariShop, websiteSenMobile,
  printPosterEllamadari, printInfographicFarm, mockupAdamaCards, mockupWeddingInvite,
];

const Index = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl md:text-2xl font-extralight tracking-tight">Ella Madari</h1>
        <p className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase">Design Portfolio</p>
      </header>

      {/* Projects Grid - Compact 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="space-y-2">
            {/* Header Row: Name + Colors + Logo/Symbol */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium">{project.name}</span>
                <div className="flex gap-1">
                  {project.colors.map((c, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              {/* Logo + Symbol on right */}
              <div className="flex items-center gap-1.5">
                <div className="h-8 px-2 bg-white rounded-md flex items-center justify-center border border-border/10">
                  <img src={project.logo} alt="" className="h-5 w-auto object-contain" />
                </div>
                {project.symbol && (
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center border border-border/10">
                    <img src={project.symbol} alt="" className="h-5 w-5 object-contain" />
                  </div>
                )}
              </div>
            </div>

            {/* Main Image */}
            <div 
              className="rounded-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered(`${project.id}-main`)}
              onMouseLeave={() => setHovered(null)}
            >
              {project.video ? (
                <div className="aspect-[4/3] bg-white">
                  <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hovered === `${project.id}-main` ? 'scale-105' : ''
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Extras Row */}
            {project.extras && project.extras.length > 0 && (
              <div className="grid grid-cols-3 gap-1">
                {project.extras.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHovered(`${project.id}-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img
                      src={img}
                      alt=""
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hovered === `${project.id}-${i}` ? 'scale-110' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More Work */}
      <div className="mt-8">
        <p className="text-[9px] text-muted-foreground tracking-[0.15em] uppercase mb-2">More</p>
        <div className="grid grid-cols-7 gap-1">
          {moreWork.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-md overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered(`more-${i}`)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={src}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hovered === `more-${i}` ? 'scale-110' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-border/10">
        <p className="text-[8px] text-muted-foreground/40 tracking-[0.15em] uppercase">© 2024 Ella Madari</p>
      </footer>
    </main>
  );
};

export default Index;
