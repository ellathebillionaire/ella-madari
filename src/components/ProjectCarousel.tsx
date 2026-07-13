import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { projects } from '@/data/projects';
import { getProjectLayout } from './layouts/ProjectLayoutFactory';

const ProjectCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dragX = useMotionValue(0);
  const totalProjects = projects.length;

  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlaying || isDragging || selectedImage) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, selectedImage, totalProjects]);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
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
    if (selectedImage) return;
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

    const radius = 900;
    const angleStep = 32;
    const angle = relativePos * angleStep;
    const angleRad = (angle * Math.PI) / 180;

    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius - radius;
    const rotateY = -angle * 0.5;
    const y = Math.abs(relativePos) * 15;

    const absPos = Math.abs(relativePos);
    const scale = Math.max(0.5, 1 - absPos * 0.2);
    const opacity = Math.max(0.1, 1 - absPos * 0.35);

    return { x, y, z, rotateY, scale, opacity, zIndex: 100 - absPos * 10, isVisible: absPos <= 2 };
  };

  const activeProject = projects[activeIndex];
  const allActiveImages = useMemo(() => 
    [activeProject.heroImage, ...activeProject.images].filter(Boolean),
    [activeProject]
  );

  return (
    <>
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
        onWheel={handleWheel}
      >
        {/* Subtle animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}15 0%, transparent 70%)`,
              left: '0%', top: '10%',
              opacity: 0.6,
            }}
            animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}10 0%, transparent 70%)`,
              right: '5%', bottom: '20%',
              opacity: 0.5,
            }}
            animate={{ scale: [1.05, 0.95, 1.05], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Clean Header */}
        <header className="absolute top-0 inset-x-0 px-6 md:px-12 py-6 z-30 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-medium tracking-tight text-foreground">Ella Madari</h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-1">Design & Branding</p>
          </div>
          
          {/* Minimal Navigation dots */}
          <div className="flex items-center gap-1.5">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); pauseAutoPlay(); }}
                className="group relative p-1"
                aria-label={project.name}
              >
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex 
                      ? 'w-5 h-2 shadow-sm' 
                      : 'w-2 h-2 opacity-30 hover:opacity-50'
                  }`}
                  style={{ backgroundColor: project.accentColor }}
                />
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-6">

          {/* 3D Carousel */}
          <motion.div 
            className="relative h-[360px] md:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: '1600px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => { setIsDragging(true); pauseAutoPlay(); }}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                const style = getCardStyle(index);
                if (!style.isVisible) return null;
                
                return (
                  <motion.div
                    key={project.slug}
                    className="absolute cursor-pointer"
                    style={{ width: 320, transformStyle: 'preserve-3d', zIndex: style.zIndex }}
                    initial={false}
                    animate={{
                      x: style.x, y: style.y, z: style.z,
                      rotateY: style.rotateY, scale: style.scale, opacity: style.opacity,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.8 }}
                    onClick={() => { if (!isActive) { setActiveIndex(index); pauseAutoPlay(); }}}
                  >
                    <motion.div
                      className={`relative rounded-xl overflow-hidden ${
                        isActive 
                          ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-white/60' 
                          : 'shadow-md'
                      }`}
                      style={{ backgroundColor: project.bgColor }}
                      whileHover={!isActive ? { scale: 1.03, y: -4 } : {}}
                    >
                      {/* Video indicator */}
                      {project.video && isActive && (
                        <motion.div 
                          className="absolute top-2.5 start-2.5 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                            <Play className="w-3 h-3 text-foreground ms-0.5" />
                          </div>
                        </motion.div>
                      )}

                      {/* Hero Image */}
                      <div className="aspect-square overflow-hidden">
                        <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Bottom gradient with name */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-14 flex items-end p-3"
                        style={{ 
                          background: `linear-gradient(to top, ${project.accentColor}E0 0%, ${project.accentColor}40 60%, transparent 100%)`
                        }}
                      >
                        <span className="text-white text-sm font-medium tracking-wide drop-shadow-sm">
                          {project.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Clean Project Info Strip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center items-center gap-2.5 mt-6"
            >
              {/* Logo + Name */}
              <div className="flex items-center gap-2.5 px-4 py-2 bg-card/80 backdrop-blur-xl rounded-full shadow-sm border border-border/40">
                <img src={activeProject.logo} alt="" className="h-4 w-auto" />
                <span className="text-sm font-medium text-foreground">{activeProject.name}</span>
              </div>

              {/* Color Palette */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-card/80 backdrop-blur-xl rounded-full shadow-sm border border-border/40">
                {activeProject.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full shadow-sm ring-1 ring-white/60"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Category */}
              <div className="px-3 py-2 bg-card/80 backdrop-blur-xl rounded-full shadow-sm border border-border/40">
                <span className="text-[9px] text-muted-foreground font-medium tracking-widest uppercase">
                  {activeProject.category === 'branding' ? 'BRANDING' : 'WEBSITE'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project-specific layout */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="mt-5 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {allActiveImages.length > 1 && 
                getProjectLayout(activeProject, allActiveImages.slice(1), setSelectedImage)
              }
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          {activeProject.description && (
            <motion.p 
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[10px] text-muted-foreground max-w-sm mx-auto mt-4"
            >
              {activeProject.description}
            </motion.p>
          )}
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={() => rotate('right')}
          className="absolute end-4 md:end-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/90 backdrop-blur-xl shadow-md flex items-center justify-center text-foreground z-20 border border-border/40"
          whileHover={{ scale: 1.06, boxShadow: '0 10px 25px -8px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => rotate('left')}
          className="absolute start-4 md:start-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/90 backdrop-blur-xl shadow-md flex items-center justify-center text-foreground z-20 border border-border/40"
          whileHover={{ scale: 1.06, boxShadow: '0 10px 25px -8px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-border/50">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: activeProject.accentColor }}
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / totalProjects) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-lg cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-[90vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            />
            <button
              className="absolute top-6 end-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCarousel;
