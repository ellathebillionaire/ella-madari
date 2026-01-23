import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import MockupsSection from "@/components/MockupsSection";

// Import website screenshots
import website1 from "@/assets/website-1.jpg";
import website2 from "@/assets/website-2.jpg";
import website3 from "@/assets/website-3.jpg";
import website4 from "@/assets/website-4.jpg";

// Import branding assets
import brand1Logo from "@/assets/brand1-logo.png";
import brand1Monogram from "@/assets/brand1-monogram.png";
import brand2Logo from "@/assets/brand2-logo.png";
import brand2Monogram from "@/assets/brand2-monogram.png";
import brand3Logo from "@/assets/brand3-logo.png";
import brand3Monogram from "@/assets/brand3-monogram.png";

// Import mockup images
import mockupBusinesscard from "@/assets/mockup-businesscard.jpg";
import mockupMug from "@/assets/mockup-mug.jpg";
import mockupTshirt from "@/assets/mockup-tshirt.jpg";
import mockupPackaging from "@/assets/mockup-packaging.jpg";
import mockupTotebag from "@/assets/mockup-totebag.jpg";
import mockupStationery from "@/assets/mockup-stationery.jpg";

const websites = [
  { id: "1", title: "Wellness Spa Website", screenshot: website1 },
  { id: "2", title: "Coffee Roastery Website", screenshot: website2 },
  { id: "3", title: "Architecture Studio Website", screenshot: website3 },
  { id: "4", title: "Fashion Boutique Website", screenshot: website4 },
];

const brands = [
  {
    id: "1",
    name: "Serenity Spa",
    logo: brand1Logo,
    monogram: brand1Monogram,
    colors: ["#7B9E87", "#D4E4D9", "#F5F8F5", "#3D5A45"],
  },
  {
    id: "2",
    name: "Artisan Coffee",
    logo: brand2Logo,
    monogram: brand2Monogram,
    colors: ["#8B4513", "#D2691E", "#F5DEB3", "#3E2723"],
  },
  {
    id: "3",
    name: "Architecture Studio",
    logo: brand3Logo,
    monogram: brand3Monogram,
    colors: ["#1A1A1A", "#4A4A4A", "#E5E5E5", "#FFFFFF"],
  },
];

const mockups = [
  { id: "1", title: "Business Card", image: mockupBusinesscard },
  { id: "2", title: "Coffee Mug", image: mockupMug },
  { id: "3", title: "T-Shirt", image: mockupTshirt },
  { id: "4", title: "Packaging Box", image: mockupPackaging },
  { id: "5", title: "Tote Bag", image: mockupTotebag },
  { id: "6", title: "Stationery Set", image: mockupStationery },
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
