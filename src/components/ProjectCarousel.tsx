import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { projects } from '@/data/projects';

const ProjectCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const totalProjects = projects.length;

  const navigate = useCallback((direction: 'up' | 'down') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowGallery(false);
    
    if (direction === 'up') {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    } else {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }
    
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, totalProjects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') setSelectedImage(null);
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate('up');
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate('down');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, selectedImage]);

  // Wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedImage || showGallery) return;
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0) navigate('down');
      else navigate('up');
    }
  };

  const activeProject = projects[activeIndex];
  const nextProject = projects[(activeIndex + 1) % totalProjects];

  return (
    <>
      <div className="fixed inset-0 bg-black" onWheel={handleWheel}>
        
        {/* Background - Full screen hero image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img 
              src={activeProject.heroImage} 
              alt={activeProject.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-8 md:px-12 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-white text-lg md:text-xl font-light tracking-wide">Ella Madari</h1>
            <p className="text-white/50 text-[9px] tracking-[0.4em] uppercase mt-0.5">Design Portfolio</p>
          </motion.div>
          
          {/* Project counter */}
          <motion.div 
            className="text-white/60 text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white font-medium text-lg">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(totalProjects).padStart(2, '0')}</span>
          </motion.div>
        </header>

        {/* Main Content - Project Info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-12 pb-8 md:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl"
            >
              {/* Logo */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <img src={activeProject.logo} alt="" className="h-5 w-auto brightness-0 invert" />
                  <span className="text-white/70 text-xs tracking-widest uppercase">
                    {activeProject.category}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2 
                className="text-white text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {activeProject.name}
              </motion.h2>

              {/* Description */}
              {activeProject.description && (
                <motion.p 
                  className="text-white/60 text-base md:text-lg font-light max-w-xl mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {activeProject.description}
                </motion.p>
              )}

              {/* Color Palette */}
              <motion.div 
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {activeProject.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </motion.div>

              {/* Gallery Thumbnails */}
              {activeProject.images.length > 0 && (
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {activeProject.images.slice(0, 5).map((img, i) => (
                    <motion.div
                      key={i}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden cursor-pointer ring-2 ring-white/20 hover:ring-white/60 transition-all"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                  {activeProject.images.length > 5 && (
                    <motion.button
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 text-sm font-light hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowGallery(true)}
                    >
                      +{activeProject.images.length - 5}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right side - Project Navigation */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
          <motion.button
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
            onClick={() => navigate('up')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
          
          {/* Project dots */}
          <div className="flex flex-col gap-2 py-4">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isTransitioning && i !== activeIndex) {
                    setIsTransitioning(true);
                    setShowGallery(false);
                    setActiveIndex(i);
                    setTimeout(() => setIsTransitioning(false), 800);
                  }
                }}
                className="group relative flex items-center justify-end"
              >
                <span className={`absolute right-6 text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${i === activeIndex ? 'opacity-100 text-white' : ''}`}>
                  {project.name}
                </span>
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex 
                      ? 'w-3 h-8 bg-white' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <motion.button
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
            onClick={() => navigate('down')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Next project preview */}
        <motion.div 
          className="absolute bottom-8 right-8 md:right-auto md:left-1/2 md:-translate-x-1/2 z-10 flex items-center gap-2 text-white/40 text-xs cursor-pointer hover:text-white/70 transition-colors"
          onClick={() => navigate('down')}
          whileHover={{ y: 5 }}
        >
          <span className="hidden md:block">Next:</span>
          <span className="font-medium">{nextProject.name}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-8 md:left-12 text-white/30 text-[9px] tracking-widest uppercase z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Scroll to explore
        </motion.div>
      </div>

      {/* Full Gallery Overlay */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="fixed top-6 right-6 z-50 text-white/70 hover:text-white text-2xl font-light"
              onClick={() => setShowGallery(false)}
            >
              ✕
            </button>
            
            <div className="min-h-screen p-8 md:p-12">
              <motion.h3 
                className="text-white text-3xl font-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeProject.name}
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[activeProject.heroImage, ...activeProject.images].map((img, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-[92vw] max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light"
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
