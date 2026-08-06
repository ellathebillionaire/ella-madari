import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '@/data/projects';

// Custom cursor component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hover]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backgroundColor: 'white',
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20 }}
    />
  );
};

// Animated text reveal
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <motion.div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 100, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em] origin-bottom"
          style={{ perspective: 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Hero Section with dramatic entrance
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, hsl(var(--muted)) 0%, hsl(var(--background)) 50%)',
            'radial-gradient(circle at 80% 50%, hsl(var(--muted)) 0%, hsl(var(--background)) 50%)',
            'radial-gradient(circle at 50% 80%, hsl(var(--muted)) 0%, hsl(var(--background)) 50%)',
            'radial-gradient(circle at 20% 50%, hsl(var(--muted)) 0%, hsl(var(--background)) 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        />
      ))}

      <motion.div style={{ y }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-muted-foreground">
            Creative Director & Brand Designer
          </span>
        </motion.div>

        <AnimatedText
          text="ELLA MADARI"
          className="text-6xl md:text-[12vw] font-extralight tracking-[-0.04em] leading-none"
          delay={0.5}
        />

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-muted-foreground text-sm md:text-base max-w-md mx-auto font-light"
        >
          Crafting visual identities that resonate, inspire, and endure
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border border-foreground/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-0.5 bg-foreground/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Lightbox Component
interface LightboxProps {
  images: string[];
  currentIndex: number;
  projectName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, projectName, onClose, onNavigate }: LightboxProps) => {
  const [direction, setDirection] = useState(0);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') {
      setDirection(-1);
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }
    if (e.key === 'ArrowRight') {
      setDirection(1);
      onNavigate((currentIndex + 1) % images.length);
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const goToPrev = () => {
    setDirection(-1);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setDirection(1);
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
        data-cursor-hover
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Project name & counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 z-10"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          {projectName}
        </span>
        <div className="text-sm mt-1 text-foreground/60">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 md:left-8 z-10 p-4 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all hover:scale-110"
            data-cursor-hover
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-8 z-10 p-4 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all hover:scale-110"
            data-cursor-hover
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center p-16 md:p-24" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectName} ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
            }}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-3 bg-foreground/5 backdrop-blur-lg rounded-full"
        >
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={(e) => { 
                e.stopPropagation(); 
                setDirection(idx > currentIndex ? 1 : -1);
                onNavigate(idx); 
              }}
              className={`w-12 h-8 rounded-md overflow-hidden transition-all ${
                idx === currentIndex 
                  ? 'ring-2 ring-foreground scale-110' 
                  : 'opacity-50 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1 }}
              data-cursor-hover
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Project Section with parallax, reveal, and lightbox
interface ProjectSectionProps {
  project: typeof projects[0];
  index: number;
  onImageClick: (images: string[], index: number, projectName: string) => void;
}

const ProjectSection = ({ project, index, onImageClick }: ProjectSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const allImages = [project.heroImage, ...project.images].filter(Boolean);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen py-32 md:py-48 relative overflow-hidden"
      style={{ opacity }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Project Header */}
        <motion.div style={{ y }} className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground block mb-4"
          >
            {String(index + 1).padStart(2, '0')} / {project.category}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-8xl font-extralight tracking-[-0.03em]"
            data-cursor-hover
          >
            {project.name}
          </motion.h2>
          
          {project.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-sm md:text-base mt-4 max-w-lg font-light"
            >
              {project.description}
            </motion.p>
          )}
        </motion.div>

        {/* Hero Image with parallax */}
        <motion.div
          style={{ y: imageY, scale }}
          className="relative mb-8 overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer"
          onClick={() => onImageClick(allImages, 0, project.name)}
          data-cursor-hover
        >
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <img
              src={project.heroImage}
              alt={project.name}
              className="w-full h-auto object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
            <motion.div
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute inset-0 bg-background origin-right"
            />
          </motion.div>
        </motion.div>

        {/* Image Grid with staggered reveal */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allImages.slice(1).map((image, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: imgIndex * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer"
                onClick={() => onImageClick(allImages, imgIndex + 1, project.name)}
                data-cursor-hover
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={image}
                    alt={`${project.name} ${imgIndex + 1}`}
                    className="w-full h-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + imgIndex * 0.1 }}
                  className="absolute inset-0 bg-background origin-right"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Video if exists */}
        {project.video && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 overflow-hidden rounded-xl md:rounded-2xl"
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Minimal Footer
const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="py-24 md:py-32 border-t border-border/50"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
      <motion.h3
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-extralight tracking-tight mb-8"
      >
        Let's create something
        <br />
        <span className="text-muted-foreground">extraordinary</span>
      </motion.h3>
      
      <motion.a
        href="mailto:hello@ellamadari.com"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="inline-block text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        data-cursor-hover
      >
        hello@ellamadari.com
      </motion.a>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-xs text-muted-foreground/60"
      >
        © {new Date().getFullYear()} Ella Madari. All rights reserved.
      </motion.p>
    </div>
  </motion.footer>
);

// Main Portfolio Component
const InteractivePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    currentIndex: number;
    projectName: string;
  } | null>(null);
  
  // Filter projects with valid assets
  const validProjects = projects.filter(p => 
    p.heroImage && 
    !p.heroImage.includes('placeholder') &&
    p.images.length > 0
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (images: string[], index: number, projectName: string) => {
    setLightbox({ images, currentIndex: index, projectName });
  };

  const handleLightboxNavigate = (index: number) => {
    if (lightbox) {
      setLightbox({ ...lightbox, currentIndex: index });
    }
  };

  return (
    <>
      <CustomCursor />
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            currentIndex={lightbox.currentIndex}
            projectName={lightbox.projectName}
            onClose={() => setLightbox(null)}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </AnimatePresence>
      
      {/* Loading Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none' }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border border-foreground/20 rounded-full border-t-foreground"
          />
        </motion.div>
      </motion.div>

      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
      >
        <div className="flex justify-between items-center">
          <motion.span 
            className="text-sm font-medium tracking-[0.1em]"
            whileHover={{ scale: 1.05 }}
            data-cursor-hover
          >
            EM
          </motion.span>
          <motion.span 
            className="text-xs text-muted-foreground tracking-wider"
            data-cursor-hover
          >
            Portfolio 2024
          </motion.span>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="bg-background">
        <HeroSection />
        
        {validProjects.map((project, index) => (
          <ProjectSection 
            key={project.slug} 
            project={project} 
            index={index}
            onImageClick={handleImageClick}
          />
        ))}
        
        <Footer />
      </main>
    </>
  );
};

export default InteractivePortfolio;
