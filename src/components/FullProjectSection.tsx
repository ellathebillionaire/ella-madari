interface FullProjectProps {
  name: string;
  description?: string;
  logo?: string;
  mascot?: string;
  video?: string;
  colors?: string[];
  isAlternate?: boolean;
}

const FullProjectSection = ({ 
  name, 
  description, 
  logo, 
  mascot, 
  video, 
  colors = [], 
  isAlternate = false 
}: FullProjectProps) => {
  return (
    <section className={`py-24 ${isAlternate ? 'bg-muted/30' : 'bg-background'}`}>
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-tight mb-2">{name}</h2>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
          {/* Color Palette */}
          {colors.length > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-border/20 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Logo & Mascot */}
          <div className="space-y-6">
            {logo && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/10">
                <img 
                  src={logo} 
                  alt={`${name} Logo`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            {mascot && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/10">
                <img 
                  src={mascot} 
                  alt={`${name} Mascot`}
                  className="w-full h-auto object-contain max-h-80 mx-auto"
                />
              </div>
            )}
          </div>

          {/* Video/Animation */}
          {video && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/10">
              <video 
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FullProjectSection;
