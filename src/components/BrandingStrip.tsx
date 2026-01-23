interface BrandingStripProps {
  brandName: string;
  logo: string;
  monogram: string;
  colors: string[];
}

const BrandingStrip = ({ brandName, logo, monogram, colors }: BrandingStripProps) => {
  return (
    <div className="branding-strip group">
      {/* Brand Name - Hidden visually but accessible */}
      <span className="sr-only">{brandName}</span>
      
      {/* Logo */}
      <div className="flex-shrink-0 w-24 md:w-32 h-16 md:h-20 flex items-center justify-center">
        <img
          src={logo}
          alt={`${brandName} logo`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Monogram */}
      <div className="flex-shrink-0 w-12 md:w-16 h-12 md:h-16 flex items-center justify-center">
        <img
          src={monogram}
          alt={`${brandName} monogram`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block flex-1" />

      {/* Color Palette */}
      <div className="flex items-center gap-2 md:gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-dot transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: color }}
            aria-label={`Brand color ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandingStrip;
