import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { projects } from '@/data/projects';
import ellamadariLogo from '@/assets/ellamadari-logo.jpg';

const MinimalGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get all images per project
  const projectCollages = useMemo(() => {
    return projects.map((project) => {
      const images: string[] = [];
      if (project.heroImage) images.push(project.heroImage);
      images.push(...project.images);
      return {
        ...project,
        allImages: images,
      };
    }).filter(p => p.allImages.length > 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal logo - top left corner */}
      <motion.div 
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <img 
          src={ellamadariLogo} 
          alt="Ella Madari" 
          className="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>

      {/* Projects - each as its own collage */}
      <div className="pt-20 pb-12 px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto">
        <motion.div 
          className="space-y-16 md:space-y-24"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {projectCollages.map((project, projectIndex) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Project Collage */}
              <ProjectCollage 
                project={project}
                images={project.allImages}
                video={project.video}
                onImageClick={setSelectedImage}
                index={projectIndex}
              />
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

// Individual project collage component
interface ProjectCollageProps {
  project: typeof projects[0];
  images: string[];
  video?: string;
  onImageClick: (img: string) => void;
  index: number;
}

const ProjectCollage = ({ project, images, video, onImageClick, index }: ProjectCollageProps) => {
  // Different layouts based on image count and project type
  const imageCount = images.length;
  const hasVideo = !!video;
  
  // Determine layout style based on index for variety
  const layoutStyle = index % 4;

  if (imageCount === 0) return null;

  return (
    <div className="group">
      {/* Layout 0: Hero + Grid */}
      {layoutStyle === 0 && (
        <div className="grid grid-cols-12 gap-2 md:gap-3">
          {/* Large hero */}
          <div className="col-span-12 md:col-span-8">
            <CollageImage src={images[0]} onClick={() => onImageClick(images[0])} aspectRatio="16/10" />
          </div>
          {/* Side stack */}
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-2 md:gap-3">
            {images[1] && <CollageImage src={images[1]} onClick={() => onImageClick(images[1])} aspectRatio="4/3" />}
            {images[2] && <CollageImage src={images[2]} onClick={() => onImageClick(images[2])} aspectRatio="4/3" />}
          </div>
          {/* Bottom row */}
          {images.length > 3 && (
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-2 md:mt-0">
              {images.slice(3, 7).map((img, i) => (
                <CollageImage key={i} src={img} onClick={() => onImageClick(img)} aspectRatio="1/1" />
              ))}
            </div>
          )}
          {/* Video if exists */}
          {hasVideo && (
            <div className="col-span-12 md:col-span-6 mt-2 md:mt-0">
              <video src={video} autoPlay loop muted playsInline className="w-full rounded-sm" />
            </div>
          )}
        </div>
      )}

      {/* Layout 1: Asymmetric */}
      {layoutStyle === 1 && (
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3">
          {/* Left column */}
          <div className="col-span-6 md:col-span-5 space-y-2 md:space-y-3">
            {images[0] && <CollageImage src={images[0]} onClick={() => onImageClick(images[0])} aspectRatio="3/4" />}
            {images[3] && <CollageImage src={images[3]} onClick={() => onImageClick(images[3])} aspectRatio="16/9" />}
          </div>
          {/* Right column */}
          <div className="col-span-6 md:col-span-7 space-y-2 md:space-y-3">
            {images[1] && <CollageImage src={images[1]} onClick={() => onImageClick(images[1])} aspectRatio="16/9" />}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {images[2] && <CollageImage src={images[2]} onClick={() => onImageClick(images[2])} aspectRatio="1/1" />}
              {images[4] && <CollageImage src={images[4]} onClick={() => onImageClick(images[4])} aspectRatio="1/1" />}
            </div>
          </div>
          {/* Extra images */}
          {images.length > 5 && (
            <div className="col-span-6 md:col-span-12 grid grid-cols-3 gap-2 md:gap-3 mt-2 md:mt-0">
              {images.slice(5, 8).map((img, i) => (
                <CollageImage key={i} src={img} onClick={() => onImageClick(img)} aspectRatio="4/3" />
              ))}
            </div>
          )}
          {hasVideo && (
            <div className="col-span-6 md:col-span-6 mt-2 md:mt-0">
              <video src={video} autoPlay loop muted playsInline className="w-full rounded-sm" />
            </div>
          )}
        </div>
      )}

      {/* Layout 2: Masonry-style */}
      {layoutStyle === 2 && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
          {images.map((img, i) => (
            <div key={i} className="mb-2 md:mb-3 break-inside-avoid">
              <CollageImage src={img} onClick={() => onImageClick(img)} />
            </div>
          ))}
          {hasVideo && (
            <div className="mb-2 md:mb-3 break-inside-avoid">
              <video src={video} autoPlay loop muted playsInline className="w-full rounded-sm" />
            </div>
          )}
        </div>
      )}

      {/* Layout 3: Horizontal scroll feel */}
      {layoutStyle === 3 && (
        <div className="space-y-2 md:space-y-3">
          {/* Main row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {images.slice(0, 3).map((img, i) => (
              <CollageImage key={i} src={img} onClick={() => onImageClick(img)} aspectRatio="4/5" />
            ))}
          </div>
          {/* Secondary row */}
          {images.length > 3 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
              {images.slice(3).map((img, i) => (
                <CollageImage key={i} src={img} onClick={() => onImageClick(img)} aspectRatio="1/1" />
              ))}
              {hasVideo && (
                <div className="col-span-2">
                  <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-sm" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Reusable image component
interface CollageImageProps {
  src: string;
  onClick: () => void;
  aspectRatio?: string;
}

const CollageImage = ({ src, onClick, aspectRatio }: CollageImageProps) => (
  <motion.div
    className="relative overflow-hidden rounded-sm cursor-pointer bg-muted"
    style={{ aspectRatio: aspectRatio || 'auto' }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
  >
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </motion.div>
);

export default MinimalGallery;
