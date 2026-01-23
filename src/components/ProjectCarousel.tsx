import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';

const ProjectCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const totalProjects = projects.length;

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    } else {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, totalProjects]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') setSelectedImage(null);
        return;
      }
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, selectedImage]);

  // Wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedImage) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 50) {
      if (delta > 0) navigate('next');
      else navigate('prev');
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <>
      <div 
        className="min-h-screen bg-[#f5f5f7] flex flex-col"
        onWheel={handleWheel}
      >
        {/* Header - Apple style */}
        <header className="px-8 md:px-16 lg:px-24 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-[#1d1d1f] text-base font-semibold tracking-tight">Ella Madari</h1>
            <p className="text-[#86868b] text-[10px] tracking-[0.2em] uppercase">Design Portfolio</p>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-3">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => !isTransitioning && setActiveIndex(i)}
                className={`transition-all duration-300 ${
                  i === activeIndex 
                    ? 'text-[#1d1d1f] font-medium' 
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <span className="text-[11px] tracking-wide">{project.name}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-8 md:px-16 lg:px-24 pb-12 flex flex-col">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Logo in white card */}
                  <div className="h-12 px-4 bg-white rounded-2xl shadow-sm flex items-center">
                    <img src={activeProject.logo} alt="" className="h-6 w-auto object-contain" />
                  </div>
                  
                  <div>
                    <motion.h2 
                      className="text-[#1d1d1f] text-3xl md:text-4xl font-semibold tracking-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activeProject.name}
                    </motion.h2>
                    <motion.p 
                      className="text-[#86868b] text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeProject.description}
                    </motion.p>
                  </div>
                </div>

                {/* Color palette */}
                <div className="flex items-center gap-2">
                  {activeProject.colors.map((color, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 rounded-full shadow-sm"
                      style={{ backgroundColor: color }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              {/* Images Grid - Contained with margins */}
              <div className="flex-1 grid grid-cols-12 gap-4">
                
                {/* Main Hero Image */}
                <motion.div 
                  className="col-span-12 lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => setSelectedImage(activeProject.heroImage)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={activeProject.heroImage} 
                      alt={activeProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Side Images Stack */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                  {activeProject.images.slice(0, 2).map((img, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="h-full overflow-hidden">
                        <img 
                          src={img} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Row - Additional Images */}
                {activeProject.images.length > 2 && (
                  <div className="col-span-12 grid grid-cols-4 gap-4 mt-2">
                    {activeProject.images.slice(2, 6).map((img, i) => (
                      <motion.div
                        key={i}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => setSelectedImage(img)}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={img} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#d2d2d7]/50">
            <motion.button
              onClick={() => navigate('prev')}
              className="flex items-center gap-2 text-[#0066cc] text-sm font-medium hover:underline"
              whileHover={{ x: -3 }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{projects[(activeIndex - 1 + totalProjects) % totalProjects].name}</span>
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => !isTransitioning && setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex 
                      ? 'w-6 h-2 bg-[#1d1d1f]' 
                      : 'w-2 h-2 bg-[#d2d2d7] hover:bg-[#86868b]'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate('next')}
              className="flex items-center gap-2 text-[#0066cc] text-sm font-medium hover:underline"
              whileHover={{ x: 3 }}
            >
              <span>{projects[(activeIndex + 1) % totalProjects].name}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </main>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl cursor-zoom-out p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
