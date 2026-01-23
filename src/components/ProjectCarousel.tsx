import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

const ProjectCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalProjects = projects.length;

  const rotate = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    } else {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }
  };

  // Handle wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) rotate('right');
      if (e.deltaX < -20) rotate('left');
    } else {
      if (e.deltaY > 20) rotate('right');
      if (e.deltaY < -20) rotate('left');
    }
  };

  // Calculate position for each card in the arc
  const getCardStyle = (index: number) => {
    // Calculate relative position from active (-3 to +3)
    let relativePos = index - activeIndex;
    
    // Handle wrapping
    if (relativePos > totalProjects / 2) relativePos -= totalProjects;
    if (relativePos < -totalProjects / 2) relativePos += totalProjects;

    // Arc parameters - LARGER for dramatic effect
    const radius = 900; // Increased from 600
    const angleStep = 30; // Increased from 25 for more spread
    const angle = relativePos * angleStep;
    const angleRad = (angle * Math.PI) / 180;

    // Calculate 3D position on the arc
    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius - radius;
    const rotateY = -angle;

    // Scale and opacity based on distance
    const absPos = Math.abs(relativePos);
    const scale = Math.max(0.5, 1 - absPos * 0.15);
    const opacity = Math.max(0.2, 1 - absPos * 0.25);
    const blur = absPos > 2 ? (absPos - 2) * 1.5 : 0;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      zIndex: 100 - Math.abs(relativePos) * 10,
    };
  };

  const activeProject = projects[activeIndex];

  return (
    <section 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa]"
      onWheel={handleWheel}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-8 py-8 z-30">
        <h1 className="text-xl font-light tracking-tight text-[#1d1d1f]">Ella Madari</h1>
        <p className="text-[9px] text-[#86868b] tracking-[0.2em] uppercase mt-0.5">Design Portfolio</p>
      </header>

      {/* 3D Carousel Container */}
      <div 
        className="relative w-full h-[600px] flex items-center justify-center"
        style={{ perspective: '1500px' }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const style = getCardStyle(index);
            
            return (
              <motion.div
                key={project.slug}
                className="absolute cursor-pointer"
                style={{
                  width: 320, // Increased from 240
                  ...style,
                  transformStyle: 'preserve-3d',
                }}
                initial={false}
                animate={style}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Top expanded images */}
                <div className="h-20 mb-3 flex justify-center gap-2">
                  <AnimatePresence>
                    {isActive && project.images.length > 1 && (
                      <>
                        {project.images.slice(1, 3).map((img, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="w-20 h-20 rounded-xl overflow-hidden shadow-lg"
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Card */}
                <Link to={`/project/${project.slug}`} onClick={(e) => !isActive && e.preventDefault()}>
                  <div 
                    className={`aspect-square rounded-2xl overflow-hidden transition-shadow duration-500 ${
                      isActive ? 'shadow-2xl ring-2 ring-white/50' : 'shadow-lg'
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

                {/* Bottom expanded images */}
                <div className="h-20 mt-3 flex justify-center gap-2">
                  <AnimatePresence>
                    {isActive && project.images.length > 3 && (
                      <>
                        {project.images.slice(3, 5).map((img, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -15, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="w-20 h-20 rounded-xl overflow-hidden shadow-lg"
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Project Info */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <img src={activeProject.logo} alt="" className="h-5 w-auto object-contain" />
              <span className="text-sm font-medium text-[#1d1d1f]">{activeProject.name}</span>
            </div>
            <Link 
              to={`/project/${activeProject.slug}`}
              className="text-[10px] text-[#86868b] hover:text-[#1d1d1f] transition-colors uppercase tracking-widest"
            >
              View Project →
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => rotate('left')}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white transition-colors z-20"
      >
        ←
      </button>
      <button
        onClick={() => rotate('right')}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white transition-colors z-20"
      >
        →
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#1d1d1f] w-5' 
                : 'bg-[#d2d2d7] w-1.5 hover:bg-[#86868b]'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#86868b]/50 tracking-widest uppercase z-20">
        Scroll or drag to explore
      </p>
    </section>
  );
};

export default ProjectCarousel;
