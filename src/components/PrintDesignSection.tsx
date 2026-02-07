import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PrintDesign {
  id: string;
  title: string;
  image: string;
}

interface PrintDesignSectionProps {
  designs: PrintDesign[];
}

const PrintDesignSection = ({ designs }: PrintDesignSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const isRtl = document.documentElement.dir === 'rtl';
      const multiplier = direction === "left" ? -1 : 1;
      scrollRef.current.scrollBy({
        left: isRtl ? -multiplier * scrollAmount : multiplier * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">Print Design</h2>
          
          {/* Navigation arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable container with 3D perspective */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          style={{ 
            perspective: "1000px",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          {designs.map((design, index) => (
            <div
              key={design.id}
              className="flex-shrink-0 snap-center group"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Page effect */}
              <div 
                className="relative w-48 md:w-56 transition-all duration-500 ease-out group-hover:scale-105"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${index % 2 === 0 ? -5 : 5}deg)`,
                }}
              >
                {/* Paper shadow */}
                <div 
                  className="absolute inset-0 bg-black/10 rounded-sm blur-md translate-y-2 translate-x-1"
                  style={{ transform: "translateZ(-10px)" }}
                />
                
                {/* Paper edge effect */}
                <div 
                  className="absolute end-0 top-0 bottom-0 w-1 bg-gradient-to-l from-gray-300 to-transparent"
                  style={{ transform: "translateZ(-2px)" }}
                />
                
                {/* Main paper */}
                <div className="relative bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                
                {/* Page fold effect */}
                <div 
                  className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-gray-200 to-white opacity-60"
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PrintDesignSection;
