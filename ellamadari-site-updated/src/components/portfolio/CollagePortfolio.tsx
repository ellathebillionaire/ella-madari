import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '@/data/projects';

// Get unique images only (remove duplicates)
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
      setDirection(-1);
      onNavigate((currentIndex - 1 + totalItems) % totalItems);
    }
    if (e.key === 'ArrowRight') {
      setDirection(1);
      onNavigate((currentIndex + 1) % totalItems);
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
    enter: (dir: number) => ({ x: dir > 0 ? 600 : -600, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 600 : -600, opacity: 0, scale: 0.9 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-background/98 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 py-5">
        <div>
          <h3 className="text-lg font-light tracking-tight">{projectName}</h3>
          <span className="text-xs text-muted-foreground">{currentIndex + 1} / {totalItems}</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {totalItems > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setDirection(-1); onNavigate((currentIndex - 1 + totalItems) % totalItems); }}
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDirection(1); onNavigate((currentIndex + 1) % totalItems); }}
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="w-full h-full flex items-center justify-center px-16 py-20" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {isShowingVideo ? (
            <motion.video key="video" src={video} autoPlay loop muted playsInline
              custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full rounded-xl"
            />
          ) : (
            <motion.img key={currentIndex} src={images[currentIndex]} alt={`${projectName} ${currentIndex + 1}`}
              custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full object-contain rounded-xl" draggable={false}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Collage layouts based on image count
interface CollageProps {
  images: string[];
  video?: string;
  onImageClick: (index: number) => void;
}

const ProjectCollage = ({ images, video, onImageClick }: CollageProps) => {
  const count = images.length;
  
  // Dynamic grid based on image count
  if (count === 1) {
    return (
      <div className="grid grid-cols-1 gap-3">
        <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[16/9]" />
        {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} />}
      </div>
    );
  }
  
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[4/3]" />
        <CollageImage src={images[1]} index={1} onClick={() => onImageClick(1)} aspect="aspect-[4/3]" />
        {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} className="col-span-2" />}
      </div>
    );
  }
  
  if (count === 3) {
    return (
      <div className="grid grid-cols-3 gap-3">
        <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[4/5]" className="col-span-2 row-span-2" />
        <CollageImage src={images[1]} index={1} onClick={() => onImageClick(1)} aspect="aspect-square" />
        <CollageImage src={images[2]} index={2} onClick={() => onImageClick(2)} aspect="aspect-square" />
        {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} className="col-span-3" />}
      </div>
    );
  }
  
  if (count === 4) {
    return (
      <div className="grid grid-cols-4 gap-3">
        <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[3/4]" className="col-span-2 row-span-2" />
        <CollageImage src={images[1]} index={1} onClick={() => onImageClick(1)} aspect="aspect-[4/3]" className="col-span-2" />
        <CollageImage src={images[2]} index={2} onClick={() => onImageClick(2)} aspect="aspect-square" />
        <CollageImage src={images[3]} index={3} onClick={() => onImageClick(3)} aspect="aspect-square" />
        {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} className="col-span-4" />}
      </div>
    );
  }
  
  if (count === 5) {
    return (
      <div className="grid grid-cols-6 gap-3">
        <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[4/5]" className="col-span-3 row-span-2" />
        <CollageImage src={images[1]} index={1} onClick={() => onImageClick(1)} aspect="aspect-[4/3]" className="col-span-3" />
        <CollageImage src={images[2]} index={2} onClick={() => onImageClick(2)} aspect="aspect-[4/3]" className="col-span-3" />
        <CollageImage src={images[3]} index={3} onClick={() => onImageClick(3)} aspect="aspect-video" className="col-span-3" />
        <CollageImage src={images[4]} index={4} onClick={() => onImageClick(4)} aspect="aspect-video" className="col-span-3" />
        {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} className="col-span-6" />}
      </div>
    );
  }
  
  // 6+ images: masonry-style grid
  return (
    <div className="grid grid-cols-6 gap-3">
      <CollageImage src={images[0]} index={0} onClick={() => onImageClick(0)} aspect="aspect-[4/5]" className="col-span-4 row-span-2" />
      <CollageImage src={images[1]} index={1} onClick={() => onImageClick(1)} aspect="aspect-square" className="col-span-2" />
      <CollageImage src={images[2]} index={2} onClick={() => onImageClick(2)} aspect="aspect-square" className="col-span-2" />
      {images.slice(3).map((img, i) => (
        <CollageImage key={i + 3} src={img} index={i + 3} onClick={() => onImageClick(i + 3)} 
          aspect="aspect-[4/3]" className="col-span-2" />
      ))}
      {video && <CollageVideo src={video} onClick={() => onImageClick(images.length)} className="col-span-6" />}
    </div>
  );
};

// Single collage image
const CollageImage = ({ src, index, onClick, aspect, className = '' }: { 
  src: string; index: number; onClick: () => void; aspect: string; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl cursor-pointer group ${aspect} ${className}`}
  >
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
  </motion.div>
);

// Collage video thumbnail
const CollageVideo = ({ src, onClick, className = '' }: { src: string; onClick: () => void; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl cursor-pointer group aspect-video ${className}`}
  >
    <video src={src} muted loop playsInline autoPlay className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center">
      <div className="w-0 h-0 border-l-[6px] border-l-background border-y-[4px] border-y-transparent ml-0.5" />
    </div>
  </motion.div>
);

// Project Section
interface ProjectSectionProps {
  project: typeof projects[0];
  index: number;
  onImageClick: (images: string[], index: number, name: string, video?: string) => void;
}

const ProjectSection = ({ project, index, onImageClick }: ProjectSectionProps) => {
  const uniqueImages = getUniqueImages(project.images, project.heroImage);
  
  const handleImageClick = (imgIndex: number) => {
    onImageClick(uniqueImages, imgIndex, project.name, project.video);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-24 md:mb-32"
    >
      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
          {String(index + 1).padStart(2, '0')} — {project.category}
        </span>
        <h2 className="text-2xl md:text-4xl font-light tracking-tight mt-1">
          {project.name}
        </h2>
        {project.description && (
          <p className="text-muted-foreground text-sm mt-2 max-w-lg font-light">
            {project.description}
          </p>
        )}
      </motion.div>

      {/* Project Collage */}
      <ProjectCollage 
        images={uniqueImages} 
        video={project.video}
        onImageClick={handleImageClick} 
      />
    </motion.section>
  );
};

// Main Component
const CollagePortfolio = () => {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    currentIndex: number;
    projectName: string;
    video?: string;
  } | null>(null);

  const handleImageClick = (images: string[], index: number, name: string, video?: string) => {
    setLightbox({ images, currentIndex: index, projectName: name, video });
  };

  const handleLightboxNavigate = (index: number) => {
    if (lightbox) setLightbox({ ...lightbox, currentIndex: index });
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

      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/30"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-sm font-medium tracking-[0.15em]">ELLA MADARI</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider">
                Creative Director & Brand Designer
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground tracking-wider">
              {validProjects.length} Projects
            </span>
          </div>
        </motion.header>

        {/* Projects */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {validProjects.map((project, index) => (
            <ProjectSection
              key={project.slug}
              project={project}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground">
              © {new Date().getFullYear()} Ella Madari
            </span>
            <a 
              href="mailto:hello@ellamadari.com"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wider"
            >
              hello@ellamadari.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CollagePortfolio;
