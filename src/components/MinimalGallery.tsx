import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { projects } from '@/data/projects';
import ellamadariLogo from '@/assets/ellamadari-logo.jpg';

const MinimalGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Collect ALL visual assets from all projects
  const allImages = useMemo(() => {
    const images: { src: string; project: string; isVideo?: boolean }[] = [];
    
    projects.forEach((project) => {
      // Add hero image
      if (project.heroImage) {
        images.push({ src: project.heroImage, project: project.name });
      }
      // Add all project images
      project.images.forEach((img) => {
        images.push({ src: img, project: project.name });
      });
      // Add video as special item
      if (project.video) {
        images.push({ src: project.video, project: project.name, isVideo: true });
      }
    });
    
    return images;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal logo - top left corner */}
      <motion.div 
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <img 
          src={ellamadariLogo} 
          alt="Ella Madari" 
          className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>

      {/* Main gallery - masonry-style grid */}
      <div className="px-3 py-20 md:px-6 md:py-24">
        <motion.div 
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {allImages.map((item, index) => (
            <motion.div
              key={`${item.project}-${index}`}
              className="mb-3 md:mb-4 break-inside-avoid"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative cursor-pointer overflow-hidden rounded-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => !item.isVideo && setSelectedImage(item.src)}
              >
                {item.isVideo ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.project}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                )}
                
                {/* Subtle hover overlay with project name */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-end justify-start p-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white text-xs font-light tracking-wide">
                        {item.project}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MinimalGallery;
