import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

const ProjectCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Start in middle

  const cardWidth = 260;
  const cardGap = 20;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial scroll to center the third item
    const containerWidth = container.clientWidth;
    const centerOffset = containerWidth / 2 - cardWidth / 2;
    const initialScroll = 2 * (cardWidth + cardGap) - centerOffset + cardWidth / 2;
    container.scrollLeft = initialScroll;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const centerOffset = containerWidth / 2 - cardWidth / 2;
      
      const rawIndex = (scrollLeft + centerOffset) / (cardWidth + cardGap);
      const nearestIndex = Math.round(rawIndex - 0.5);
      const clampedIndex = Math.max(0, Math.min(projects.length - 1, nearestIndex));
      
      setActiveIndex(clampedIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerWidth = container.clientWidth;
    const centerOffset = containerWidth / 2 - cardWidth / 2;
    const targetScroll = index * (cardWidth + cardGap) - centerOffset + cardWidth / 2;
    
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#fafafa]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-8 py-8 z-20">
        <h1 className="text-xl font-light tracking-tight text-[#1d1d1f]">Ella Madari</h1>
        <p className="text-[9px] text-[#86868b] tracking-[0.2em] uppercase mt-0.5">Design Portfolio</p>
      </header>

      {/* Carousel */}
      <div 
        ref={containerRef}
        className="flex items-center gap-5 overflow-x-auto scrollbar-hide py-20"
        style={{ 
          paddingLeft: 'calc(50vw - 130px)',
          paddingRight: 'calc(50vw - 130px)',
          scrollSnapType: 'x mandatory',
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const distance = Math.abs(index - activeIndex);
          
          return (
            <motion.div
              key={project.slug}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ 
                width: cardWidth,
                scrollSnapAlign: 'center',
              }}
              animate={{
                y: isActive ? -40 : distance === 1 ? 0 : 20,
                scale: isActive ? 1 : distance === 1 ? 0.92 : 0.85,
                opacity: distance > 2 ? 0.4 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              onClick={() => !isActive && scrollToIndex(index)}
            >
              {/* Top Images - expanded view */}
              <div className="h-20 mb-2 flex justify-center gap-2">
                <AnimatePresence>
                  {isActive && project.images.length > 1 && (
                    <>
                      {project.images.slice(1, 3).map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="w-16 h-16 rounded-xl overflow-hidden shadow-md"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Main Card */}
              <Link 
                to={`/project/${project.slug}`}
                className="block w-full"
              >
                <div 
                  className={`aspect-square rounded-2xl overflow-hidden transition-shadow duration-300 ${
                    isActive ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                  style={{ backgroundColor: project.bgColor }}
                >
                  <img 
                    src={project.heroImage} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* Bottom Images */}
              <div className="h-20 mt-2 flex justify-center gap-2">
                <AnimatePresence>
                  {isActive && project.images.length > 3 && (
                    <>
                      {project.images.slice(3, 5).map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: -15, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="w-16 h-16 rounded-xl overflow-hidden shadow-md"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Project Name - only for active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <img src={project.logo} alt="" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-medium text-[#1d1d1f]">{project.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#1d1d1f] w-5' 
                : 'bg-[#d2d2d7] w-1.5 hover:bg-[#86868b]'
            }`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#86868b]/60 tracking-widest uppercase">
        ← Scroll →
      </p>
    </section>
  );
};

export default ProjectCarousel;
