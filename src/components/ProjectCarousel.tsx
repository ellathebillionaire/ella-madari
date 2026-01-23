import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { projects } from '@/data/projects';

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

    const radius = 750;
    const angleStep = 35;
    const angle = relativePos * angleStep;
    const angleRad = (angle * Math.PI) / 180;

    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius - radius;
    const rotateY = -angle * 0.6;
    const y = Math.abs(relativePos) * 25;

    const absPos = Math.abs(relativePos);
    const scale = Math.max(0.45, 1 - absPos * 0.18);
    const opacity = Math.max(0.08, 1 - absPos * 0.4);

    return { x, y, z, rotateY, scale, opacity, zIndex: 100 - absPos * 10, isVisible: absPos <= 2 };
  };

  const activeProject = projects[activeIndex];
  const allActiveImages = [activeProject.heroImage, ...activeProject.images];

  return (
    <>
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F0F2 50%, #E8E8EC 100%)' }}
        onWheel={handleWheel}
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}40 0%, transparent 70%)`,
              left: '10%', top: '20%',
            }}
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}30 0%, transparent 70%)`,
              right: '15%', bottom: '30%',
            }}
            animate={{ scale: [1.1, 0.9, 1.1], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 px-6 md:px-10 py-5 z-30 flex items-center justify-between">
          <div>
            <h1 className="text-base md:text-lg font-semibold tracking-tight text-[#1d1d1f]">Ella Madari</h1>
            <p className="text-[7px] md:text-[8px] text-[#86868b] tracking-[0.3em] uppercase">Design & Branding</p>
          </div>
          
          {/* Navigation dots with project colors */}
          <div className="flex items-center gap-2">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); pauseAutoPlay(); }}
                className="group relative"
              >
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex 
                      ? 'w-7 h-2.5 shadow-lg' 
                      : 'w-2.5 h-2.5 opacity-40 hover:opacity-70'
                  }`}
                  style={{ backgroundColor: project.accentColor }}
                />
                {i === activeIndex && (
                  <motion.span 
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#86868b] whitespace-nowrap"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {project.name}
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-8">
          
        {/* Top Expanded Images */}
        <div className="h-24 md:h-28 flex justify-center items-end gap-2 md:gap-3 mb-4">
            <AnimatePresence mode="popLayout">
              {allActiveImages.slice(1, 4).map((img, i) => (
                <motion.div
                  key={`top-${activeIndex}-${i}`}
                  initial={{ opacity: 0, y: 50, scale: 0.6, rotateX: 25 }}
                  animate={{ 
                    opacity: 1, y: 0, scale: i === 1 ? 1.08 : 0.92, rotateX: 0,
                  }}
                  exit={{ opacity: 0, y: 40, scale: 0.7 }}
                  transition={{ duration: 0.5, delay: i * 0.07, type: 'spring', stiffness: 150 }}
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer hover:scale-110 hover:shadow-2xl transition-all duration-300"
                  style={{ width: i === 1 ? 90 : 70, height: i === 1 ? 90 : 70 }}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ y: -5 }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 3D Carousel */}
          <motion.div 
            className="relative h-[320px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: '1300px' }}
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
                    style={{ width: 280, transformStyle: 'preserve-3d', zIndex: style.zIndex }}
                    initial={false}
                    animate={{
                      x: style.x, y: style.y, z: style.z,
                      rotateY: style.rotateY, scale: style.scale, opacity: style.opacity,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.9 }}
                    onClick={() => { if (!isActive) { setActiveIndex(index); pauseAutoPlay(); }}}
                  >
                    <motion.div
                      className={`relative rounded-3xl overflow-hidden ${
                        isActive 
                          ? 'shadow-[0_40px_100px_-25px_rgba(0,0,0,0.45)] ring-2 ring-white/80' 
                          : 'shadow-lg'
                      }`}
                      style={{ backgroundColor: project.bgColor }}
                      whileHover={!isActive ? { scale: 1.04, y: -5 } : {}}
                    >
                      {/* Logo Badge - CONSISTENT */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="h-8 px-2.5 bg-white/95 backdrop-blur-md rounded-lg flex items-center shadow-md">
                          <img src={project.logo} alt="" className="h-4 w-auto object-contain" />
                        </div>
                      </div>

                      {/* Video indicator */}
                      {project.video && isActive && (
                        <motion.div 
                          className="absolute top-3 right-3 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md">
                            <Play className="w-3 h-3 text-[#1d1d1f] ml-0.5" />
                          </div>
                        </motion.div>
                      )}

                      {/* Hero Image */}
                      <div className="aspect-square overflow-hidden">
                        <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Bottom gradient with name */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-20 flex items-end p-4"
                        style={{ 
                          background: `linear-gradient(to top, ${project.accentColor}CC 0%, transparent 100%)`
                        }}
                      >
                        <span className="text-white text-sm font-semibold tracking-wide drop-shadow-lg">
                          {project.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        {/* Bottom Expanded Images */}
        <div className="h-24 md:h-28 flex justify-center items-start gap-2 md:gap-3 mt-4">
          <AnimatePresence mode="popLayout">
            {allActiveImages.slice(4).map((img, i) => (
              <motion.div
                key={`bottom-${activeIndex}-${i}`}
                initial={{ opacity: 0, y: -50, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: i === 0 ? 1.08 : 0.92 }}
                exit={{ opacity: 0, y: -40, scale: 0.7 }}
                transition={{ duration: 0.5, delay: i * 0.07, type: 'spring', stiffness: 150 }}
                className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer hover:scale-110 hover:shadow-2xl transition-all duration-300"
                style={{ width: i === 0 ? 90 : 70, height: i === 0 ? 90 : 70 }}
                onClick={() => setSelectedImage(img)}
                whileHover={{ y: 5 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Color Palette & Category - Now Below */}
        <div className="flex justify-center items-center gap-2 mt-6 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm"
            >
              {activeProject.colors.map((color, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full shadow-inner"
                  style={{ backgroundColor: color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
              <span className="ml-2 text-[10px] text-[#86868b] font-medium">
                {activeProject.category === 'branding' ? 'BRANDING' : 'WEBSITE'}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Info */}
        <div className="text-center mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div 
                  className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 50px -15px rgba(0,0,0,0.2)' }}
                >
                  <img src={activeProject.logo} alt="" className="h-5 w-auto" />
                  <span className="text-sm font-semibold text-[#1d1d1f]">{activeProject.name}</span>
                </motion.div>
                {activeProject.description && (
                  <p className="text-[11px] text-[#86868b] max-w-sm">{activeProject.description}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={() => rotate('left')}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] z-20"
          whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => rotate('right')}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1d1d1f] z-20"
          whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#86868b]/40 tracking-widest uppercase z-10">
          ← → scroll or drag
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e5e5e7]">
          <motion.div
            className="h-full"
            style={{ backgroundColor: activeProject.accentColor }}
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / totalProjects) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl font-light"
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
