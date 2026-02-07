import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects, additionalWork } from '@/data/projects';

// Get unique images only (remove duplicates based on image path)
const getUniqueImages = (projectImages: string[], heroImage: string): string[] => {
  const all = [heroImage, ...projectImages].filter(Boolean);
  return [...new Set(all)];
};

// Filter valid projects
const validProjects = projects.filter(p => 
  p.heroImage && 
  !p.heroImage.includes('placeholder') &&
  (p.images.length > 0 || p.video)
);

// Lightbox Component
interface LightboxProps {
  images: string[];
  currentIndex: number;
  projectName: string;
  video?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, projectName, video, onClose, onNavigate }: LightboxProps) => {
  const [direction, setDirection] = useState(0);
  const totalItems = video ? images.length + 1 : images.length;
  const isShowingVideo = video && currentIndex === images.length;
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') {
      setDirection(1);
      onNavigate((currentIndex + 1) % totalItems);
    }
    if (e.key === 'ArrowRight') {
      setDirection(-1);
      onNavigate((currentIndex - 1 + totalItems) % totalItems);
    }
  }, [currentIndex, totalItems, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 600 : -600,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const goToPrev = () => {
    setDirection(-1);
    onNavigate((currentIndex - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setDirection(1);
    onNavigate((currentIndex + 1) % totalItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-between items-center px-6 py-5">
        <div>
          <h3 className="text-lg font-light tracking-tight">{projectName}</h3>
          <span className="text-xs text-muted-foreground">{currentIndex + 1} / {totalItems}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      {totalItems > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute start-4 md:start-8 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute end-4 md:end-8 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="w-full h-full flex items-center justify-center px-20 py-24" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {isShowingVideo ? (
            <motion.video
              key="video"
              src={video}
              autoPlay
              loop
              muted
              playsInline
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full rounded-2xl"
            />
          ) : (
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${projectName} ${currentIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full object-contain rounded-2xl"
              draggable={false}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {totalItems > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-2 bg-muted/80 backdrop-blur rounded-full"
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => { 
                e.stopPropagation(); 
                setDirection(idx > currentIndex ? 1 : -1);
                onNavigate(idx); 
              }}
              className={`w-10 h-7 rounded overflow-hidden transition-all ${
                idx === currentIndex ? 'ring-1 ring-foreground scale-110' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
          {video && (
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                setDirection(1);
                onNavigate(images.length); 
              }}
              className={`w-10 h-7 rounded overflow-hidden transition-all flex items-center justify-center bg-foreground/10 ${
                isShowingVideo ? 'ring-1 ring-foreground scale-110' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <span className="text-[8px] font-medium">VIDEO</span>
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// Project Card
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  totalCount: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, totalCount, onClick }: ProjectCardProps) => {
  const uniqueImages = getUniqueImages(project.images, project.heroImage);
  const imageCount = uniqueImages.length + (project.video ? 1 : 0);
  
  // Calculate if this card should span multiple columns (to fill the grid nicely)
  const columnsPerRow = 5;
  const remainder = totalCount % columnsPerRow;
  const isLastRow = index >= totalCount - remainder;
  const shouldSpanDouble = remainder > 0 && isLastRow && index === totalCount - 1 && remainder <= 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.03 }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-muted h-full ${
        shouldSpanDouble ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image with lazy loading */}
      <img
        src={project.heroImage}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading={index < 6 ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={index < 3 ? "high" : "auto"}
      />

      {/* Overlay on hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-background/70 mb-0.5">
          {project.category}
        </span>
        <h3 className="text-sm md:text-base font-light text-background tracking-tight">
          {project.name}
        </h3>
        <span className="text-[9px] md:text-[10px] text-background/60 mt-0.5">
          {imageCount} {imageCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Video indicator */}
      {project.video && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-0 h-0 border-l-[4px] md:border-l-[5px] border-l-background border-y-[2.5px] md:border-y-[3px] border-y-transparent ml-0.5" />
        </div>
      )}
    </motion.div>
  );
};

// Main Component
const SinglePagePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    currentIndex: number;
    projectName: string;
    video?: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (project: typeof projects[0]) => {
    const uniqueImages = getUniqueImages(project.images, project.heroImage);
    setLightbox({
      images: uniqueImages,
      currentIndex: 0,
      projectName: project.name,
      video: project.video,
    });
  };

  const handleLightboxNavigate = (index: number) => {
    if (lightbox) {
      setLightbox({ ...lightbox, currentIndex: index });
    }
  };

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            currentIndex={lightbox.currentIndex}
            projectName={lightbox.projectName}
            video={lightbox.video}
            onClose={() => setLightbox(null)}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </AnimatePresence>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-extralight tracking-[0.3em]"
            >
              EM
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout - Single Page, No Scroll */}
      <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex-shrink-0 flex justify-between items-center px-4 md:px-8 py-3"
        >
          <div>
            <h1 className="text-xs md:text-sm font-medium tracking-[0.15em]">ELLA MADARI</h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground tracking-wider">
              Creative Director & Brand Designer
            </p>
          </div>
          <span className="text-[9px] md:text-[10px] text-muted-foreground tracking-wider">
            {validProjects.length} Projects
          </span>
        </motion.header>

        {/* Projects Grid - Fills remaining space */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex-1 px-2 md:px-4 pb-2 overflow-hidden min-h-0"
        >
          <div className="h-full grid grid-cols-3 md:grid-cols-5 grid-rows-2 gap-2 md:gap-3">
            {validProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                totalCount={validProjects.length}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex-shrink-0 flex justify-between items-center px-4 md:px-8 py-2 border-t border-border/20"
        >
          <span className="text-[9px] text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
          <a 
            href="mailto:hello@ellamadari.com"
            className="text-[9px] text-muted-foreground hover:text-foreground transition-colors tracking-wider"
          >
            hello@ellamadari.com
          </a>
        </motion.footer>
      </div>
    </>
  );
};

export default SinglePagePortfolio;
