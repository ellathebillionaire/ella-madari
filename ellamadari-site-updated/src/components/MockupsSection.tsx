import { useState } from "react";
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="portfolio-section">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 
          ref={titleRef}
          className={`section-title transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Print & Mockups
        </h2>
        
        <div 
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 ease-out ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {mockups.map((mockup, index) => (
            <div
              key={mockup.id}
              className="premium-card overflow-hidden group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(mockup.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={mockup.image}
                  alt={mockup.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    hoveredId === mockup.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockupsSection;
