import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Monitor, Smartphone, Palette } from 'lucide-react';
import { projects } from '@/data/projects';

// Filter valid projects
const brandingProjects = projects.filter(p => p.category === 'branding' && p.heroImage);
const websiteProjects = projects.filter(p => p.category === 'website' && p.heroImage);

// Get projects with website/mobile images for websites section
type ProjectWithWebsite = typeof projects[0] & { websiteImage?: string; mobileImage?: string };
const sfdProject = projects.find(p => p.slug === 'sfd') as ProjectWithWebsite | undefined;
const betterseedsProject = projects.find(p => p.slug === 'betterseeds') as ProjectWithWebsite | undefined;
const sisenoraProject = projects.find(p => p.slug === 'sisenora') as ProjectWithWebsite | undefined;
const ascolaProject = projects.find(p => p.slug === 'ascola') as ProjectWithWebsite | undefined;

// ============ LIGHTBOX ============
const Lightbox = ({ image, name, onClose }: { image: string; name: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted">
        <X className="w-6 h-6" />
      </button>
      <span className="absolute top-6 left-6 text-sm text-muted-foreground">{name}</span>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={image}
        alt={name}
        className="max-w-full max-h-full object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

// ============ DESKTOP BROWSER MOCKUP ============
const DesktopMockup = ({ image, name, onClick, size = 'large' }: { image: string; name: string; onClick: () => void; size?: 'large' | 'medium' | 'small' }) => {
  const sizeClasses = {
    large: 'h-10 px-4 gap-2',
    medium: 'h-8 px-3 gap-1.5',
    small: 'h-7 px-2.5 gap-1.5'
  };
  const dotSizes = {
    large: 'w-3 h-3',
    medium: 'w-2.5 h-2.5',
    small: 'w-2 h-2'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-muted rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
        <div className={`bg-secondary/60 flex items-center ${sizeClasses[size]}`}>
          <div className={`rounded-full bg-red-400/80 ${dotSizes[size]}`} />
          <div className={`rounded-full bg-yellow-400/80 ${dotSizes[size]}`} />
          <div className={`rounded-full bg-green-400/80 ${dotSizes[size]}`} />
          <div className="flex-1 mx-4">
            <div className="h-4 bg-background/30 rounded-full max-w-[180px]" />
          </div>
        </div>
        <div className="aspect-[16/10] overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>
      {name && <p className="text-sm text-muted-foreground mt-4 text-center font-light">{name}</p>}
    </motion.div>
  );
};

// ============ MOBILE MOCKUP ============
const MobileMockup = ({ image, name, onClick, size = 'large' }: { image: string; name: string; onClick: () => void; size?: 'large' | 'medium' | 'small' }) => {
  const sizeClasses = {
    large: 'w-44 aspect-[9/19] rounded-[2rem]',
    medium: 'w-36 aspect-[9/19] rounded-[1.5rem]',
    small: 'w-28 aspect-[9/19] rounded-[1.25rem]'
  };
  const frameClasses = {
    large: 'rounded-[2.5rem] p-2',
    medium: 'rounded-[2rem] p-1.5',
    small: 'rounded-[1.5rem] p-1'
  };
  const notchClasses = {
    large: 'w-20 h-5 rounded-b-xl',
    medium: 'w-16 h-4 rounded-b-lg',
    small: 'w-12 h-3 rounded-b-md'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className={`relative bg-foreground shadow-2xl transition-all duration-500 group-hover:-translate-y-2 ${frameClasses[size]}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-foreground z-10 ${notchClasses[size]}`} />
        <div className={`bg-background overflow-hidden ${sizeClasses[size]}`}>
          <img src={image} alt={name} className="w-full h-full object-cover object-top" />
        </div>
      </div>
      {name && <p className="text-sm text-muted-foreground mt-5 text-center font-light">{name}</p>}
    </motion.div>
  );
};

// ============ BRANDING PROJECT CARD ============
const BrandingProjectCard = ({ project, onImageClick }: { 
  project: typeof projects[0]; 
  onImageClick: (img: string, name: string) => void 
}) => {
  // Get unique images only (no duplicates)
  const allImages = [...new Set(project.images)];
  const projectWithWebsite = project as typeof projects[0] & { websiteImage?: string; mobileImage?: string };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* Project Header */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-light tracking-tight">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        )}
      </div>
      
      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => onImageClick(img, project.name)}
            className="group cursor-pointer overflow-hidden rounded-xl bg-muted aspect-[4/3]"
          >
            <img
              src={img}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
        
        {/* Video if exists - same size as images */}
        {project.video && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl bg-muted aspect-[4/3]"
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Website Mockups - Desktop and Mobile */}
      {(projectWithWebsite.websiteImage || projectWithWebsite.mobileImage) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-6 items-end"
        >
          {/* Desktop Mockup */}
          {projectWithWebsite.websiteImage && (
            <div className="flex-1 min-w-[280px] max-w-2xl">
              <DesktopMockup
                image={projectWithWebsite.websiteImage}
                name=""
                size="medium"
                onClick={() => onImageClick(projectWithWebsite.websiteImage!, project.name)}
              />
            </div>
          )}
          
          {/* Mobile Mockup */}
          {projectWithWebsite.mobileImage && (
            <MobileMockup
              image={projectWithWebsite.mobileImage}
              name=""
              size="medium"
              onClick={() => onImageClick(projectWithWebsite.mobileImage!, project.name)}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// ============ SECTION HEADER ============
const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12 md:mb-16 pt-8 border-t border-border/30"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">{icon}</div>
      <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">{subtitle}</span>
    </div>
    <h2 className="text-3xl md:text-5xl font-extralight tracking-tight">{title}</h2>
  </motion.div>
);

// ============ MAIN COMPONENT ============
const ServicePortfolio = () => {
  const [lightbox, setLightbox] = useState<{ image: string; name: string } | null>(null);

  const handleImageClick = (image: string, name: string) => {
    setLightbox({ image, name });
  };

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <Lightbox image={lightbox.image} name={lightbox.name} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-sm font-medium tracking-[0.12em]">ELLA MADARI</h1>
              <p className="text-[9px] text-muted-foreground tracking-wide">Creative Director</p>
            </div>
            <nav className="flex gap-6 text-[10px] tracking-wider text-muted-foreground">
              <a href="#branding" className="hover:text-foreground transition-colors">Branding</a>
              <a href="#websites" className="hover:text-foreground transition-colors">Websites</a>
            </nav>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="py-20 md:py-32 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-4">Portfolio</h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto font-light leading-relaxed">
              מיתוג · עיצוב אתרים
            </p>
          </motion.div>
        </section>

        <main className="max-w-6xl mx-auto px-6 md:px-10">
          
          {/* ========== BRANDING ========== */}
          <section id="branding" className="py-16">
            <SectionHeader title="מיתוג וזהות חזותית" subtitle="Branding" icon={<Palette className="w-5 h-5" />} />
            
            {brandingProjects.map((project) => (
              <BrandingProjectCard 
                key={project.slug} 
                project={project} 
                onImageClick={handleImageClick}
              />
            ))}
          </section>

          {/* ========== WEBSITES ========== */}
          <section id="websites" className="py-16">
            <SectionHeader title="עיצוב אתרים" subtitle="Web Design" icon={<Monitor className="w-5 h-5" />} />
            
            {/* Desktop Websites */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* SFD Website */}
              {sfdProject?.websiteImage && (
                <DesktopMockup
                  image={sfdProject.websiteImage}
                  name="SFD - Strength For Dancers"
                  onClick={() => handleImageClick(sfdProject.websiteImage!, 'SFD')}
                />
              )}
              {/* BetterSeeds website in desktop mockup */}
              {betterseedsProject?.websiteImage && (
                <DesktopMockup
                  image={betterseedsProject.websiteImage}
                  name="BetterSeeds"
                  onClick={() => handleImageClick(betterseedsProject.websiteImage!, 'BetterSeeds')}
                />
              )}
              {/* Si Señora website in desktop mockup */}
              {sisenoraProject?.websiteImage && (
                <DesktopMockup
                  image={sisenoraProject.websiteImage}
                  name="Si Señora"
                  onClick={() => handleImageClick(sisenoraProject.websiteImage!, 'Si Señora')}
                />
              )}
              {/* Ascola Garden website in desktop mockup */}
              {ascolaProject?.websiteImage && (
                <DesktopMockup
                  image={ascolaProject.websiteImage}
                  name="Ascola Garden"
                  onClick={() => handleImageClick(ascolaProject.websiteImage!, 'Ascola Garden')}
                />
              )}
            </div>

            {/* Mobile Versions */}
            <div className="mt-20">
              <div className="flex items-center gap-2 mb-10">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Mobile Versions</span>
              </div>
              <div className="flex justify-center gap-12 flex-wrap">
                {/* SEN Mobile Only */}
                {websiteProjects.filter(p => p.slug === 'sen' && p.images.length > 0).map((project) => (
                  <MobileMockup
                    key={`mobile-${project.slug}`}
                    image={project.images[0]}
                    name={project.name}
                    onClick={() => handleImageClick(project.images[0], project.name)}
                  />
                ))}
                {/* SFD Mobile */}
                {sfdProject?.mobileImage && (
                  <MobileMockup
                    image={sfdProject.mobileImage}
                    name="SFD"
                    onClick={() => handleImageClick(sfdProject.mobileImage!, 'SFD')}
                  />
                )}
                {/* BetterSeeds Mobile */}
                {betterseedsProject?.mobileImage && (
                  <MobileMockup
                    image={betterseedsProject.mobileImage}
                    name="BetterSeeds"
                    onClick={() => handleImageClick(betterseedsProject.mobileImage!, 'BetterSeeds')}
                  />
                )}
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 py-10 mt-16">
          <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center">
            <a href="mailto:hello@ellamadari.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              hello@ellamadari.com
            </a>
            <span className="text-[10px] text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServicePortfolio;
