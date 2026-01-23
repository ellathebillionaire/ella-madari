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

// ============ PROJECT DATA ============

const projects = [
  {
    id: 'sfd',
    name: 'SFD',
    colors: ['#1A1A1A', '#4A5568', '#64748B'],
    images: [
      { src: sfdLogoTransparent, type: 'logo', span: 'col-span-2' },
      { src: sfdMonogram, type: 'monogram' },
      { src: websiteSfd, type: 'website', span: 'col-span-3 row-span-2' },
      { src: mockupSfdBlack, type: 'mockup' },
      { src: mockupSfdWhite, type: 'mockup' },
      { src: mockupSfdBandSystem, type: 'mockup' },
    ],
  },
  {
    id: 'meshek27',
    name: 'משק 27',
    colors: ['#4A7C3F', '#6B9F5B', '#F5F8E8'],
    images: [
      { src: meshek27Logo, type: 'logo' },
      { src: meshek27Monogram, type: 'monogram' },
      { src: mockupMeshek27Branding, type: 'mockup', span: 'col-span-2' },
      { src: mockupMeshek27Wall, type: 'mockup' },
      { src: mockupMeshek27Box, type: 'mockup' },
      { src: mockupMeshek27Packaging, type: 'mockup' },
    ],
  },
  {
    id: 'sisenora',
    name: 'Si Señora',
    colors: ['#1A1A1A', '#D4A574', '#F5F5F0'],
    images: [
      { src: sisenoraLogo, type: 'logo', span: 'col-span-2' },
      { src: websiteSisenora, type: 'website', span: 'col-span-2 row-span-2' },
      { src: mockupSisenoraShop, type: 'mockup' },
    ],
  },
  {
    id: 'learnai',
    name: 'Learn AI',
    colors: ['#00D4E5', '#1A365D', '#F8FAFC'],
    images: [
      { src: learnaiLogoFull, type: 'logo', span: 'col-span-2' },
      { src: dotaiMascot, type: 'mascot' },
    ],
    video: learnaiAnimation,
  },
  {
    id: 'taliter',
    name: 'Tali Ter',
    colors: ['#5CC8B5', '#F68B1F', '#FDF6E3'],
    images: [
      { src: taliterLogo, type: 'logo' },
      { src: taliterMonogram, type: 'monogram' },
      { src: taliterBrandingSet, type: 'mockup', span: 'col-span-2' },
      { src: taliterWallMockup, type: 'mockup', span: 'col-span-2' },
      { src: taliterBottleMockup, type: 'mockup' },
    ],
  },
  {
    id: 'ebrider',
    name: 'EBrider',
    colors: ['#4A7C3F', '#1A1A1A', '#F5F5F5'],
    images: [
      { src: ebriderLogoNew, type: 'logo', span: 'col-span-2' },
      { src: ebriderSymbol, type: 'symbol' },
      { src: ebriderMockupHero, type: 'mockup', span: 'col-span-3' },
    ],
  },
];

const standaloneItems = [
  { src: websiteBetterseeds, name: 'BetterSeeds', span: 'col-span-2' },
  { src: websiteEllamadariShop, name: 'Ella Madari Shop', span: 'col-span-2' },
  { src: websiteSenMobile, name: 'SEN Jewelry', span: 'col-span-1' },
  { src: printPosterEllamadari, name: 'Poster' },
  { src: printInfographicFarm, name: 'Infographic' },
  { src: mockupAdamaCards, name: 'Business Cards' },
  { src: mockupWeddingInvite, name: 'Wedding' },
];

const Index = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[-0.02em]">Ella Madari</h1>
        <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mt-1">Design Portfolio</p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="col-span-2 md:col-span-2 lg:col-span-2">
            {/* Project Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-medium tracking-wide">{project.name}</span>
              <div className="flex gap-1">
                {project.colors.map((color, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            {/* Project Images Grid */}
            <div className="grid grid-cols-3 gap-1">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-md bg-muted cursor-pointer ${img.span || ''}`}
                  onMouseEnter={() => setHoveredItem(`${project.id}-${idx}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`${img.type === 'website' ? 'aspect-[16/10]' : 'aspect-square'} overflow-hidden`}>
                    <img
                      src={img.src}
                      alt={`${project.name} ${img.type}`}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredItem === `${project.id}-${idx}` ? 'scale-105' : 'scale-100'
                      }`}
                    />
                  </div>
                </div>
              ))}
              {project.video && (
                <div className="relative overflow-hidden rounded-md bg-muted aspect-square col-span-2">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Standalone Items */}
      <div className="mt-10 md:mt-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">More Work</span>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
          {standaloneItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-md bg-muted cursor-pointer ${item.span || ''}`}
              onMouseEnter={() => setHoveredItem(`standalone-${idx}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredItem === `standalone-${idx}` ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 md:mt-16 pt-6 border-t border-border/20">
        <p className="text-[9px] text-muted-foreground/60 tracking-[0.2em] uppercase">
          © 2024 Ella Madari
        </p>
      </footer>
    </main>
  );
};

export default Index;
