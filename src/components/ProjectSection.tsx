interface ProjectSectionProps {
  name: string;
  category: string;
  logo?: string;
  images: string[];
  colors?: string[];
  isAlternate?: boolean;
}

const ProjectSection = ({ name, category, logo, images, colors = [], isAlternate = false }: ProjectSectionProps) => {
  const mainImage = images[0];
  const supportImages = images.slice(1, 5);

  return (
    <section className={`py-24 md:py-32 ${isAlternate ? 'bg-secondary/30' : 'bg-background'}`}>
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div className="flex items-center gap-6">
            {logo && (
              <div className="w-16 md:w-20 h-12 md:h-14 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border/20 p-2">
                <img 
                  src={logo} 
                  alt={`${name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">{category}</p>
            </div>
          </div>
          
          {colors.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full shadow-sm border border-border/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Image */}
        {mainImage && (
          <div className="mb-6 md:mb-8">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-secondary shadow-[var(--shadow-soft)] group">
              <img
                src={mainImage}
                alt={`${name} main`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}

        {/* Supporting Images Grid */}
        {supportImages.length > 0 && (
          <div className={`grid gap-4 md:gap-6 ${
            supportImages.length === 1 ? 'grid-cols-1' :
            supportImages.length === 2 ? 'grid-cols-2' :
            supportImages.length === 3 ? 'grid-cols-3' :
            'grid-cols-2 md:grid-cols-4'
          }`}>
            {supportImages.map((image, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-secondary shadow-sm group aspect-square"
              >
                <img
                  src={image}
                  alt={`${name} ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
