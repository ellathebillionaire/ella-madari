import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, totalProjects]);

  // Pause auto-play on interaction
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const rotate = (direction: 'left' | 'right') => {
    pauseAutoPlay();
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    } else {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }
  };

  // Handle wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 30) {
      pauseAutoPlay();
      if (delta > 0) rotate('right');
      else rotate('left');
    }
  };

  // Handle drag
  const handleDragEnd = () => {
    const x = dragX.get();
    if (Math.abs(x) > 50) {
      if (x < 0) rotate('right');
      else rotate('left');
    }
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    setIsDragging(false);
  };

  // Calculate position for each card in the arc
  const getCardStyle = (index: number) => {
    let relativePos = index - activeIndex;
    if (relativePos > totalProjects / 2) relativePos -= totalProjects;
    if (relativePos < -totalProjects / 2) relativePos += totalProjects;

    const radius = 850;
    const angleStep = 28;
    const angle = relativePos * angleStep;
    const angleRad = (angle * Math.PI) / 180;

    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius - radius;
    const rotateY = -angle * 0.8;
    const y = Math.abs(relativePos) * 15; // Slight vertical offset for depth

    const absPos = Math.abs(relativePos);
    const scale = Math.max(0.55, 1 - absPos * 0.13);
    const opacity = Math.max(0.15, 1 - absPos * 0.3);

    return {
      x, y, z, rotateY, scale, opacity,
      zIndex: 100 - absPos * 10,
      isVisible: absPos <= 3,
    };
  };

  const activeProject = projects[activeIndex];

  return (
    <section 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f5 100%)',
      }}
      onWheel={handleWheel}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #e0e0e0 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-8 py-6 z-30 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium tracking-tight text-[#1d1d1f]">Ella Madari</h1>
          <p className="text-[8px] text-[#86868b] tracking-[0.25em] uppercase">Design Portfolio</p>
        </div>
        <div className="flex items-center gap-1">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); pauseAutoPlay(); }}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? 'w-6 h-1.5 bg-[#1d1d1f]' 
                  : 'w-1.5 h-1.5 bg-[#d2d2d7] hover:bg-[#86868b]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* 3D Carousel Container */}
      <motion.div 
        className="relative w-full h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1400px' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => { setIsDragging(true); pauseAutoPlay(); }}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
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
                className="absolute"
                style={{
                  width: 300,
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
                transition={{ 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 25,
                  mass: 0.8,
                }}
                onClick={() => { 
                  if (!isActive) {
                    setActiveIndex(index);
                    pauseAutoPlay();
                  }
                }}
              >
                {/* Expanded Images - Top */}
                <div className="h-24 mb-3 flex justify-center items-end gap-2 perspective-1000">
                  <AnimatePresence mode="popLayout">
                    {isActive && project.images.slice(1, 4).map((img, i) => (
                      <motion.div
                        key={`top-${i}`}
                        initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 - (i === 1 ? 0 : 0.08),
                          rotateX: 0,
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: i * 0.08, type: 'spring' }}
                        className="rounded-xl overflow-hidden shadow-lg bg-white"
                        style={{ 
                          width: i === 1 ? 72 : 60,
                          height: i === 1 ? 72 : 60,
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Main Card */}
                <motion.div
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-500 ${
                    isActive 
                      ? 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-white/60' 
                      : 'shadow-xl hover:shadow-2xl'
                  }`}
                  style={{ backgroundColor: project.bgColor }}
                  whileHover={!isActive ? { scale: 1.02 } : {}}
                  whileTap={isActive ? { scale: 0.98 } : {}}
                >
                  {/* Logo Badge - CONSISTENT POSITION */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="h-8 px-3 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-sm">
                      <img 
                        src={project.logo} 
                        alt="" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Link 
                        to={`/project/${project.slug}`}
                        className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#1d1d1f]" />
                      </Link>
                    </motion.div>
                  )}

                  {/* Hero Image */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={project.heroImage} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bottom Gradient Overlay with Name */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                    <span className="text-white text-sm font-medium tracking-wide drop-shadow-md">
                      {project.name}
                    </span>
                  </div>
                </motion.div>

                {/* Expanded Images - Bottom */}
                <div className="h-24 mt-3 flex justify-center items-start gap-2">
                  <AnimatePresence mode="popLayout">
                    {isActive && project.images.length > 4 && project.images.slice(4, 7).map((img, i) => (
                      <motion.div
                        key={`bottom-${i}`}
                        initial={{ opacity: 0, y: -30, scale: 0.7 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 - (i === 1 ? 0 : 0.08),
                        }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: i * 0.08, type: 'spring' }}
                        className="rounded-xl overflow-hidden shadow-lg bg-white"
                        style={{ 
                          width: i === 1 ? 72 : 60,
                          height: i === 1 ? 72 : 60,
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Active Project Info Panel */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-3"
          >
            <Link 
              to={`/project/${activeProject.slug}`}
              className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all"
            >
              <span className="text-sm font-medium text-[#1d1d1f] group-hover:text-black">
                {activeProject.name}
              </span>
              <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-0.5 transition-all" />
            </Link>
            {activeProject.description && (
              <p className="text-[11px] text-[#86868b] max-w-xs text-center">
                {activeProject.description}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => rotate('left')}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white hover:scale-110 active:scale-95 transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => rotate('right')}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] hover:bg-white hover:scale-110 active:scale-95 transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[9px] text-[#86868b]/50 tracking-wider uppercase z-10">
        <span>← → or scroll</span>
        <span className="w-1 h-1 rounded-full bg-[#86868b]/30" />
        <span>drag to explore</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e0e0e0]">
        <motion.div
          className="h-full bg-[#1d1d1f]"
          initial={{ width: '0%' }}
          animate={{ width: `${((activeIndex + 1) / totalProjects) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  );
};

export default ProjectCarousel;
