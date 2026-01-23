import { useState } from "react";

interface Mockup {
  id: string;
  title: string;
  image: string;
}

interface MockupsSectionProps {
  mockups: Mockup[];
}

const MockupsSection = ({ mockups }: MockupsSectionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="portfolio-section">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Mockups</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {mockups.map((mockup) => (
            <div
              key={mockup.id}
              className="relative aspect-square overflow-hidden rounded-xl bg-secondary cursor-pointer group"
              onMouseEnter={() => setHoveredId(mockup.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={mockup.image}
                alt={mockup.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                  hoveredId === mockup.id ? "scale-110" : "scale-100"
                }`}
              />
              {/* Subtle overlay on hover */}
              <div 
                className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
                  hoveredId === mockup.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockupsSection;
