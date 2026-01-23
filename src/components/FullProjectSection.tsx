import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FullProjectProps {
  name: string;
  description?: string;
  logo?: string;
  monogram?: string;
  mascot?: string;
  video?: string;
  website?: string;
  mockups?: string[];
  colors?: string[];
  isAlternate?: boolean;
}

const FullProjectSection = ({ 
  name, 
  description, 
  logo, 
  monogram,
  mascot, 
  video, 
  website,
  mockups = [],
  colors = [], 
  isAlternate = false 
}: FullProjectProps) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className={`py-32 md:py-48 ${isAlternate ? 'bg-muted/30' : 'bg-background'}`}>
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 md:mb-28 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[-0.03em] mb-4">
            {name}
          </h2>
          {description && (
            <p className="text-muted-foreground text-sm md:text-base tracking-wide font-light">
              {description}
            </p>
          )}
          {/* Color Palette */}
          {colors.length > 0 && (
            <div className="flex justify-center gap-3 mt-8">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="color-dot shadow-sm"
                  style={{ 
                    backgroundColor: color,
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div 
          ref={contentRef}
          className={`space-y-8 md:space-y-12 transition-all duration-1000 delay-200 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Branding Row: Logo + Monogram/Mascot */}
          {(logo || monogram || mascot) && (
            <div className={`grid gap-6 md:gap-8 ${(logo && (monogram || mascot)) ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-2xl mx-auto'}`}>
              {logo && (
                <div className="premium-card p-10 md:p-14 flex items-center justify-center min-h-[200px]">
                  <img 
                    src={logo} 
                    alt={`${name} Logo`}
                    className="max-h-28 md:max-h-36 w-auto object-contain"
                  />
                </div>
              )}
              {(monogram || mascot) && (
                <div className="premium-card p-10 md:p-14 flex items-center justify-center min-h-[200px]">
                  <img 
                    src={monogram || mascot} 
                    alt={`${name} ${monogram ? 'Monogram' : 'Mascot'}`}
                    className="max-h-28 md:max-h-36 w-auto object-contain"
                  />
                </div>
              )}
            </div>
          )}

          {/* Video/Animation */}
          {video && (
            <div className="premium-card overflow-hidden">
              <video 
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[500px] object-contain mx-auto bg-white"
              />
            </div>
          )}

          {/* Website Screenshot */}
          {website && (
            <div className="premium-card p-3 md:p-4">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src={website} 
                  alt={`${name} Website`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Mockups Grid - Smart layout based on image count and aspect ratios */}
          {mockups.length > 0 && (
            <div className={`grid gap-4 md:gap-6 ${
              mockups.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' :
              mockups.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              mockups.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {mockups.map((mockup, index) => (
                <div 
                  key={index}
                  className="premium-card overflow-hidden group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={mockup} 
                      alt={`${name} Mockup ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FullProjectSection;
