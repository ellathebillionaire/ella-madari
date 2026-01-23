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
  return (
    <section className={`py-24 ${isAlternate ? 'bg-muted/30' : 'bg-background'}`}>
      <div className="container max-w-7xl mx-auto px-6">
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

        {/* Branding Row: Logo + Monogram/Mascot */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {logo && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/10 flex items-center justify-center">
              <img 
                src={logo} 
                alt={`${name} Logo`}
                className="max-h-32 w-auto object-contain"
              />
            </div>
          )}
          {(monogram || mascot) && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/10 flex items-center justify-center">
              <img 
                src={monogram || mascot} 
                alt={`${name} ${monogram ? 'Monogram' : 'Mascot'}`}
                className="max-h-32 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Video/Animation */}
        {video && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/10 mb-8">
            <video 
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>
        )}

        {/* Website Screenshot */}
        {website && (
          <div className="mb-8">
            <div className="bg-foreground/5 rounded-2xl p-4 shadow-sm">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={website} 
                  alt={`${name} Website`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mockups Grid */}
        {mockups.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockups.map((mockup, index) => (
              <div 
                key={index}
                className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img 
                  src={mockup} 
                  alt={`${name} Mockup ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FullProjectSection;
