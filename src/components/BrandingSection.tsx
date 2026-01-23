import BrandingStrip from "./BrandingStrip";

interface Brand {
  id: string;
  name: string;
  logo: string;
  monogram: string;
  colors: string[];
  mockups?: string[];
}

interface BrandingSectionProps {
  brands: Brand[];
}

const BrandingSection = ({ brands }: BrandingSectionProps) => {
  return (
    <section className="portfolio-section bg-secondary/30">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Branding</h2>
        
        <div className="space-y-0">
          {brands.map((brand) => (
            <BrandingStrip
              key={brand.id}
              brandName={brand.name}
              logo={brand.logo}
              monogram={brand.monogram}
              colors={brand.colors}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandingSection;
