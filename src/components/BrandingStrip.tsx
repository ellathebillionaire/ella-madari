interface BrandingStripProps {
  brandName: string;
  logo: string;
  monogram: string;
  colors: string[];
  mockups?: string[];
}

const BrandingStrip = ({ brandName, logo, monogram, colors, mockups = [] }: BrandingStripProps) => {
  return (
    <div className="branding-strip group flex-wrap">
      {/* Brand Name - Hidden visually but accessible */}
      <span className="sr-only">{brandName}</span>
      
      {/* Logo */}
      <div className="flex-shrink-0 w-28 md:w-40 h-20 md:h-24 flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden p-3">
        <img
          src={logo}
          alt={`${brandName} logo`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Monogram */}
      <div className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden p-2">
        <img
          src={monogram}
          alt={`${brandName} monogram`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Mockups */}
      {mockups.length > 0 && (
        <div className="flex items-center gap-2 md:gap-3">
          {mockups.map((mockup, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={mockup}
                alt={`${brandName} mockup ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

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
