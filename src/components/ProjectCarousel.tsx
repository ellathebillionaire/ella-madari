import { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Smart grid layout based on number of images
  const getImageLayout = (count: number) => {
    if (count <= 2) return { cols: 2, size: 120 };
    if (count <= 4) return { cols: 4, size: 100 };
    if (count <= 6) return { cols: 6, size: 85 };
    return { cols: 7, size: 75 };
  };

  const imageLayout = getImageLayout(allActiveImages.length - 1);

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
            className="absolute w-[700px] h-[700px] rounded-full opacity-15"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}35 0%, transparent 70%)`,
              left: '5%', top: '10%',
            }}
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-10"
            style={{ 
              background: `radial-gradient(circle, ${activeProject.accentColor}25 0%, transparent 70%)`,
              right: '10%', bottom: '20%',
            }}
            animate={{ scale: [1.1, 0.95, 1.1], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 z-30 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f]">Ella Madari</h1>
            <p className="text-[8px] md:text-[9px] text-[#86868b] tracking-[0.35em] uppercase mt-0.5">Design & Branding</p>
          </div>
          
          {/* Navigation dots with project colors */}
          <div className="flex items-center gap-2.5">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); pauseAutoPlay(); }}
                className="group relative"
              >
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex 
                      ? 'w-8 h-3 shadow-lg' 
                      : 'w-3 h-3 opacity-40 hover:opacity-70'
                  }`}
                  style={{ backgroundColor: project.accentColor }}
                />
                {i === activeIndex && (
                  <motion.span 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#86868b] whitespace-nowrap font-medium"
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
        <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-6">

          {/* 3D Carousel */}
          <motion.div 
            className="relative h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: '1800px' }}
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
                    style={{ width: 380, transformStyle: 'preserve-3d', zIndex: style.zIndex }}
                    initial={false}
                    animate={{
                      x: style.x, y: style.y, z: style.z,
                      rotateY: style.rotateY, scale: style.scale, opacity: style.opacity,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.8 }}
                    onClick={() => { if (!isActive) { setActiveIndex(index); pauseAutoPlay(); }}}
                  >
                    <motion.div
                      className={`relative rounded-3xl overflow-hidden ${
                        isActive 
                          ? 'shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)] ring-2 ring-white/90' 
                          : 'shadow-xl'
                      }`}
                      style={{ backgroundColor: project.bgColor }}
                      whileHover={!isActive ? { scale: 1.03, y: -8 } : {}}
                    >
                      {/* Logo Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="h-10 px-3.5 bg-white/95 backdrop-blur-md rounded-xl flex items-center shadow-lg">
                          <img src={project.logo} alt="" className="h-5 w-auto object-contain" />
                        </div>
                      </div>

                      {/* Video indicator */}
                      {project.video && isActive && (
                        <motion.div 
                          className="absolute top-4 right-4 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 text-[#1d1d1f] ml-0.5" />
                          </div>
                        </motion.div>
                      )}

                      {/* Category badge - top right for non-active */}
                      {!isActive && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full">
                            <span className="text-[8px] text-white font-medium tracking-wider uppercase">
                              {project.category === 'branding' ? 'BRANDING' : 'WEBSITE'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hero Image */}
                      <div className="aspect-square overflow-hidden">
                        <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                      </div>


                      {/* Bottom gradient with name */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-14 flex items-end p-4"
                        style={{ 
                          background: `linear-gradient(to top, ${project.accentColor}E0 0%, transparent 100%)`
                        }}
                      >
                        <span className="text-white text-base font-semibold tracking-wide drop-shadow-lg">
                          {project.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Project Info Strip - Between hero and gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center items-center gap-4 mt-5"
            >
              {/* Logo + Name */}
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full shadow-md">
                <img src={activeProject.logo} alt="" className="h-4 w-auto" />
                <span className="text-sm font-medium text-[#1d1d1f]">{activeProject.name}</span>
              </div>

              {/* Color Palette */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white/80 backdrop-blur-xl rounded-full shadow-md">
                {activeProject.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full shadow-sm border border-white/60"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Category */}
              <div className="px-3 py-2 bg-white/80 backdrop-blur-xl rounded-full shadow-md">
                <span className="text-[9px] text-[#86868b] font-semibold tracking-wider uppercase">
                  {activeProject.category === 'branding' ? 'BRANDING' : 'WEBSITE'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project images grid - Smart layout */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {allActiveImages.length > 1 && (
                <div 
                  className="flex flex-wrap justify-center gap-3"
                  style={{ maxWidth: imageLayout.cols * (imageLayout.size + 12) }}
                >
                  {allActiveImages.slice(1).map((img, i) => (
                    <motion.div
                      key={`img-${i}`}
                      initial={{ opacity: 0, y: 20, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.35, 
                        delay: i * 0.04, 
                        type: 'spring', 
                        stiffness: 200 
                      }}
                      className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer group"
                      style={{ 
                        width: imageLayout.size, 
                        height: imageLayout.size 
                      }}
                      onClick={() => setSelectedImage(img)}
                      whileHover={{ scale: 1.08, y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Description only */}
          {activeProject.description && (
            <div className="text-center mt-3">
              <motion.p 
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-[#86868b] max-w-xs mx-auto leading-relaxed"
              >
                {activeProject.description}
              </motion.p>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={() => rotate('left')}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-[#1d1d1f] z-20 border border-white/50"
          whileHover={{ scale: 1.1, boxShadow: '0 15px 40px -10px rgba(0,0,0,0.25)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => rotate('right')}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-[#1d1d1f] z-20 border border-white/50"
          whileHover={{ scale: 1.1, boxShadow: '0 15px 40px -10px rgba(0,0,0,0.25)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-[#86868b]/30 tracking-[0.2em] uppercase z-10">
          scroll · drag · click
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
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all"
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
