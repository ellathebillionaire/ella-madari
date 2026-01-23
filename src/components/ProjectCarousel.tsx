import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';

const ProjectCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const dragX = useMotionValue(0);
  const totalProjects = projects.length;

  // Auto-rotate when idle
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, totalProjects]);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  }, []);

  const rotate = (direction: 'left' | 'right') => {
    pauseAutoPlay();
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    } else {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 30) {
      pauseAutoPlay();
      if (delta > 0) rotate('right');
      else rotate('left');
    }
  };

  const handleDragEnd = () => {
    const x = dragX.get();
    if (Math.abs(x) > 50) {
      if (x < 0) rotate('right');
      else rotate('left');
    }
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    setIsDragging(false);
  };

  const getCardStyle = (index: number) => {
    let relativePos = index - activeIndex;
    if (relativePos > totalProjects / 2) relativePos -= totalProjects;
    if (relativePos < -totalProjects / 2) relativePos += totalProjects;

    const radius = 800;
    const angleStep = 30;
    const angle = relativePos * angleStep;
    const angleRad = (angle * Math.PI) / 180;

    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius - radius;
    const rotateY = -angle * 0.7;
    const y = Math.abs(relativePos) * 20;

    const absPos = Math.abs(relativePos);
    const scale = Math.max(0.5, 1 - absPos * 0.15);
    const opacity = Math.max(0.1, 1 - absPos * 0.35);

    return { x, y, z, rotateY, scale, opacity, zIndex: 100 - absPos * 10, isVisible: absPos <= 2 };
  };

  const activeProject = projects[activeIndex];
  // Get all images for active project
  const allActiveImages = activeProject.images;

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 100%)' }}
      onWheel={handleWheel}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#d0d0d0 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-8 py-6 z-30 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium tracking-tight text-[#1d1d1f]">Ella Madari</h1>
          <p className="text-[8px] text-[#86868b] tracking-[0.25em] uppercase">Design Portfolio</p>
        </div>
        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); pauseAutoPlay(); }}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? 'w-6 h-2 bg-[#1d1d1f]' 
                  : 'w-2 h-2 bg-[#d2d2d7] hover:bg-[#86868b]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-20">
        
        {/* Top Expanded Images Row */}
        <div className="h-28 flex justify-center items-end gap-3 mb-4">
          <AnimatePresence mode="popLayout">
            {allActiveImages.slice(1, 4).map((img, i) => (
              <motion.div
                key={`top-${activeIndex}-${i}`}
                initial={{ opacity: 0, y: 40, scale: 0.7 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: i === 1 ? 1.05 : 0.95,
                }}
                exit={{ opacity: 0, y: 30, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.06, type: 'spring', stiffness: 200 }}
                className="rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer hover:scale-105 transition-transform"
                style={{ 
                  width: i === 1 ? 100 : 80,
                  height: i === 1 ? 100 : 80,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 3D Carousel */}
        <motion.div 
          className="relative h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: '1400px' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => { setIsDragging(true); pauseAutoPlay(); }}
          onDragEnd={handleDragEnd}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              const style = getCardStyle(index);
              
              if (!style.isVisible) return null;
              
              return (
                <motion.div
                  key={project.slug}
                  className="absolute cursor-pointer"
                  style={{
                    width: 320,
                    transformStyle: 'preserve-3d',
                    zIndex: style.zIndex,
                  }}
                  initial={false}
                  animate={{
                    x: style.x,
                    y: style.y,
                    z: style.z,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
                  onClick={() => { 
                    if (!isActive) {
                      setActiveIndex(index);
                      pauseAutoPlay();
                    }
                  }}
                >
                  <motion.div
                    className={`relative rounded-3xl overflow-hidden ${
                      isActive 
                        ? 'shadow-[0_35px_90px_-20px_rgba(0,0,0,0.4)] ring-2 ring-white/70' 
                        : 'shadow-xl'
                    }`}
                    style={{ backgroundColor: project.bgColor }}
                    whileHover={!isActive ? { scale: 1.03 } : {}}
                  >
                    {/* Logo Badge - CONSISTENT TOP-LEFT */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="h-9 px-3 bg-white/95 backdrop-blur-md rounded-xl flex items-center shadow-md">
                        <img src={project.logo} alt="" className="h-5 w-auto object-contain" />
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={project.heroImage} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white text-base font-medium tracking-wide drop-shadow-lg">
                        {project.name}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Expanded Images Row */}
        <div className="h-28 flex justify-center items-start gap-3 mt-4">
          <AnimatePresence mode="popLayout">
            {allActiveImages.slice(4).map((img, i) => (
              <motion.div
                key={`bottom-${activeIndex}-${i}`}
                initial={{ opacity: 0, y: -40, scale: 0.7 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: i === 1 ? 1.05 : 0.95,
                }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.06, type: 'spring', stiffness: 200 }}
                className="rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer hover:scale-105 transition-transform"
                style={{ 
                  width: i === 1 ? 100 : 80,
                  height: i === 1 ? 100 : 80,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Active Project Info */}
        <div className="text-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/70 backdrop-blur-lg rounded-full shadow-lg">
                <img src={activeProject.logo} alt="" className="h-5 w-auto" />
                <span className="text-sm font-medium text-[#1d1d1f]">{activeProject.name}</span>
              </div>
              {activeProject.description && (
                <p className="text-[11px] text-[#86868b] max-w-sm">{activeProject.description}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => rotate('left')}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white hover:scale-110 active:scale-95 transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => rotate('right')}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white hover:scale-110 active:scale-95 transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#86868b]/50 tracking-wider uppercase z-10">
        ← → scroll or drag
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e5e5e7]">
        <motion.div
          className="h-full bg-[#1d1d1f]"
          initial={{ width: '0%' }}
          animate={{ width: `${((activeIndex + 1) / totalProjects) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </section>
  );
};

export default ProjectCarousel;
