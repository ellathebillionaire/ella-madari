interface ProjectSectionProps {
  name: string;
  category: string;
  logo?: string;
  images: string[];
  colors?: string[];
  isAlternate?: boolean;
}

const ProjectSection = ({ name, category, logo, images, colors = [], isAlternate = false }: ProjectSectionProps) => {
  const hasMultipleImages = images.length > 1;
  const mainImage = images[0];
  const gridImages = images.slice(1, 5);

  return (
    <section className={`py-20 md:py-28 ${isAlternate ? 'bg-secondary/40' : 'bg-background'}`}>
      <div className="container max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header - Always consistent */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="flex items-center gap-5">
            {/* Logo or Color Block */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-border/30 bg-white flex items-center justify-center p-2">
              {logo ? (
                <img 
                  src={logo} 
                  alt={`${name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div 
                  className="w-full h-full rounded-lg"
                  style={{ backgroundColor: colors[0] || '#1A1A1A' }}
                />
              )}
            </div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{category}</p>
            </div>
          </div>
          
          {/* Color Palette - Always visible */}
          <div className="flex items-center gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full shadow-sm border border-border/30"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Content - Adaptive layout */}
        <div className="space-y-4 md:space-y-6">
          {/* Main Image - Always full width, consistent height */}
          {mainImage && (
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-secondary group">
              <div className="aspect-[16/9] md:aspect-[2/1]">
                <img
                  src={mainImage}
                  alt={`${name} main`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          )}

          {/* Grid Images - Consistent 4-column layout */}
          {hasMultipleImages && gridImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gridImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-xl md:rounded-2xl bg-secondary group"
                >
                  <div className="aspect-square">
                    <img
                      src={image}
                      alt={`${name} ${index + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
              
              {/* Fill empty slots with subtle placeholders for visual consistency */}
              {gridImages.length < 4 && Array.from({ length: 4 - gridImages.length }).map((_, index) => (
                <div 
                  key={`placeholder-${index}`}
                  className="rounded-xl md:rounded-2xl bg-secondary/50 hidden md:block"
                >
                  <div className="aspect-square" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
