import { useState } from 'react';

// ============ ASSETS ============

// SFD
import websiteSfd from "@/assets/website-sfd.jpg";
import sfdLogoTransparent from "@/assets/sfd-logo-transparent.png";
import sfdMonogram from "@/assets/sfd-monogram-new.jpg";
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

// ============ COMPONENTS ============

const DesktopFrame = ({ src, className = '' }: { src: string; className?: string }) => (
  <div className={`bg-[#f5f5f7] rounded-lg overflow-hidden shadow-sm ${className}`}>
    <div className="h-6 bg-[#e8e8ed] flex items-center px-2 gap-1.5">
      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
      <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
      <div className="w-2 h-2 rounded-full bg-[#28c840]" />
      <div className="flex-1 mx-4">
        <div className="h-3 bg-white/60 rounded max-w-[100px] mx-auto" />
      </div>
    </div>
    <div className="aspect-[16/10] overflow-hidden">
      <img src={src} alt="" className="w-full h-full object-cover object-top" />
    </div>
  </div>
);

const MobileFrame = ({ src }: { src: string }) => (
  <div className="w-16 bg-[#1a1a1a] rounded-xl p-0.5 shadow-lg">
    <div className="rounded-[10px] overflow-hidden aspect-[9/19] bg-white">
      <img src={src} alt="" className="w-full h-full object-cover object-top" />
    </div>
  </div>
);

const ColorDots = ({ colors }: { colors: string[] }) => (
  <div className="flex gap-1">
    {colors.map((c, i) => (
      <div key={i} className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: c }} />
    ))}
  </div>
);

const BrandingBadge = ({ logo, symbol }: { logo: string; symbol?: string }) => (
  <div className="flex items-center gap-1">
    <div className="h-7 px-2 bg-white rounded-md flex items-center justify-center shadow-sm">
      <img src={logo} alt="" className="h-4 w-auto object-contain" />
    </div>
    {symbol && (
      <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm">
        <img src={symbol} alt="" className="h-4 w-4 object-contain" />
      </div>
    )}
  </div>
);

const ImageGrid = ({ images, id, hovered, setHovered, cols = 3 }: { 
  images: string[]; 
  id: string; 
  hovered: string | null; 
  setHovered: (v: string | null) => void;
  cols?: number;
}) => (
  <div className={`grid gap-1.5 ${cols === 2 ? 'grid-cols-2' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
    {images.map((img, i) => (
      <div key={i} className="aspect-square rounded-md overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(`${id}-${i}`)} onMouseLeave={() => setHovered(null)}>
        <img src={img} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === `${id}-${i}` ? 'scale-110' : ''}`} />
      </div>
    ))}
  </div>
);

// ============ MAIN ============

const Index = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#fafafa] p-5 md:p-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-light tracking-tight text-[#1d1d1f]">Ella Madari</h1>
        <p className="text-[10px] text-[#86868b] tracking-[0.2em] uppercase mt-0.5">Design Portfolio</p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12">
        
        {/* SFD */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">SFD</span>
              <ColorDots colors={['#1A1A1A', '#4A5568', '#64748B']} />
            </div>
            <BrandingBadge logo={sfdLogoTransparent} symbol={sfdMonogram} />
          </div>
          <DesktopFrame src={websiteSfd} />
          <ImageGrid 
            images={[mockupSfdBlack, mockupSfdWhite, mockupSfdBandSystem, mockupSfdBands, mockupTshirtAthlete]} 
            id="sfd" hovered={hovered} setHovered={setHovered} 
          />
        </div>

        {/* Meshek 27 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">משק 27</span>
              <ColorDots colors={['#4A7C3F', '#6B9F5B', '#F5F8E8']} />
            </div>
            <BrandingBadge logo={meshek27Logo} symbol={meshek27Monogram} />
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered('meshek-main')} onMouseLeave={() => setHovered(null)}>
            <img src={mockupMeshek27Branding} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'meshek-main' ? 'scale-105' : ''}`} />
          </div>
          <ImageGrid 
            images={[mockupMeshek27Wall, mockupMeshek27Box, mockupMeshek27Tshirt, mockupMeshek27Packaging]} 
            id="meshek" hovered={hovered} setHovered={setHovered} cols={4}
          />
        </div>

        {/* Si Señora */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">Si Señora</span>
              <ColorDots colors={['#1A1A1A', '#D4A574', '#F5F5F0']} />
            </div>
            <BrandingBadge logo={sisenoraLogo} />
          </div>
          <DesktopFrame src={websiteSisenora} />
          <div className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered('sisenora-shop')} onMouseLeave={() => setHovered(null)}>
            <img src={mockupSisenoraShop} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'sisenora-shop' ? 'scale-105' : ''}`} />
          </div>
        </div>

        {/* Learn AI / DotAi */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">Learn AI / DotAi</span>
              <ColorDots colors={['#00D4E5', '#1A365D', '#F8FAFC']} />
            </div>
            <BrandingBadge logo={learnaiLogoFull} symbol={dotaiMascot} />
          </div>
          {/* Main video */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white">
            <video src={learnaiAnimation} autoPlay loop muted playsInline className="w-full h-full object-contain" />
          </div>
          {/* Additional images */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="aspect-square rounded-md overflow-hidden bg-white p-2 flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setHovered('learn-logo')} onMouseLeave={() => setHovered(null)}>
              <img src={learnaiLogo} alt="" className={`max-h-full max-w-full object-contain transition-transform duration-500 ${hovered === 'learn-logo' ? 'scale-110' : ''}`} />
            </div>
            <div className="aspect-square rounded-md overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered('learn-mascot')} onMouseLeave={() => setHovered(null)}>
              <img src={dotaiMascot} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'learn-mascot' ? 'scale-110' : ''}`} />
            </div>
            <div className="aspect-square rounded-md overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered('learn-mono')} onMouseLeave={() => setHovered(null)}>
              <img src={dotaiMonogram} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'learn-mono' ? 'scale-110' : ''}`} />
            </div>
          </div>
        </div>

        {/* Tali Ter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">Tali Ter</span>
              <ColorDots colors={['#5CC8B5', '#F68B1F', '#FDF6E3']} />
            </div>
            <BrandingBadge logo={taliterLogo} symbol={taliterMonogram} />
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered('tali-main')} onMouseLeave={() => setHovered(null)}>
            <img src={taliterBrandingSet} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'tali-main' ? 'scale-105' : ''}`} />
          </div>
          <ImageGrid 
            images={[taliterWallMockup, taliterBottleMockup]} 
            id="tali" hovered={hovered} setHovered={setHovered} cols={2}
          />
        </div>

        {/* EBrider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#1d1d1f]">EBrider</span>
              <ColorDots colors={['#4A7C3F', '#1A1A1A', '#F5F5F5']} />
            </div>
            <BrandingBadge logo={ebriderLogoNew} symbol={ebriderSymbol} />
          </div>
          <div className="aspect-[16/10] rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered('ebrider')} onMouseLeave={() => setHovered(null)}>
            <img src={ebriderMockupHero} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === 'ebrider' ? 'scale-105' : ''}`} />
          </div>
        </div>

      </div>

      {/* More Work */}
      <section className="mt-14">
        <p className="text-[10px] text-[#86868b] tracking-[0.15em] uppercase mb-3">More Work</p>
        <div className="flex items-end gap-3 flex-wrap">
          <DesktopFrame src={websiteBetterseeds} className="w-44" />
          <DesktopFrame src={websiteEllamadariShop} className="w-44" />
          <MobileFrame src={websiteSenMobile} />
          {[printPosterEllamadari, printInfographicFarm, mockupAdamaCards, mockupWeddingInvite, mockupBusinesscard, mockupStationery, mockupTotebag, mockupMug].map((img, i) => (
            <div key={i} className="w-16 aspect-square rounded-md overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered(`more-${i}`)} onMouseLeave={() => setHovered(null)}>
              <img src={img} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${hovered === `more-${i}` ? 'scale-110' : ''}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-4 border-t border-[#d2d2d7]/30">
        <p className="text-[9px] text-[#86868b]/60 tracking-[0.15em] uppercase">© 2024 Ella Madari</p>
      </footer>
    </main>
  );
};

export default Index;
