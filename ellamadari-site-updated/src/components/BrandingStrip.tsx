interface BrandingStripProps {
  brandName: string;
  logo: string;
  monogram: string;
  colors: string[];
  mockups?: string[];
}

const BrandingStrip = ({ brandName, logo, monogram, colors, mockups = [] }: BrandingStripProps) => {
  return (
    <div className="py-8 border-b border-border/30 last:border-b-0">
      {/* Brand Name - Hidden visually but accessible */}
      <span className="sr-only">{brandName}</span>
      
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        {/* Logo Container - Fixed size with consistent display */}
        <div className="w-32 md:w-44 h-16 md:h-20 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border/20 p-3 md:p-4 flex-shrink-0">
          <img
            src={logo}
            alt={`${brandName} logo`}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>

        {/* Monogram Container - Square, fixed size */}
        <div className="w-14 md:w-16 h-14 md:h-16 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border/20 p-2 flex-shrink-0">
          <img
            src={monogram}
            alt={`${brandName} monogram`}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>

        {/* Mockups - Uniform square thumbnails */}
        {mockups.length > 0 && (
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            {mockups.slice(0, 4).map((mockup, index) => (
              <div
                key={index}
                className="w-14 md:w-16 h-14 md:h-16 rounded-xl overflow-hidden shadow-sm border border-border/20 flex-shrink-0 group"
              >
                <img
                  src={mockup}
                  alt={`${brandName} mockup ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
            {mockups.length > 4 && (
              <div className="w-14 md:w-16 h-14 md:h-16 rounded-xl bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground font-medium">
                +{mockups.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 hidden lg:block" />

        {/* Color Palette - Uniform circles */}
        <div className="flex items-center gap-2 ms-auto md:ms-0">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full shadow-sm border border-border/20 transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: color }}
              aria-label={`Brand color ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingStrip;
