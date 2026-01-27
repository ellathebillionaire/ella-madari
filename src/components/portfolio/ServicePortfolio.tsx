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
const ebriderProject = projects.find(p => p.slug === 'ebrider') as ProjectWithWebsite | undefined;

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
const DesktopMockup = ({ image, name, onClick }: { image: string; name: string; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-neutral-200 rounded-xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="bg-neutral-300 flex items-center h-6 px-2.5 gap-1">
          <div className="rounded-full bg-red-400 w-2 h-2" />
          <div className="rounded-full bg-yellow-400 w-2 h-2" />
          <div className="rounded-full bg-green-400 w-2 h-2" />
          <div className="flex-1 mx-3">
            <div className="h-3 bg-neutral-400/40 rounded-full max-w-[100px]" />
          </div>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" />
        </div>
      </div>
      {name && <p className="text-xs text-muted-foreground mt-3 text-center font-light">{name}</p>}
    </motion.div>
  );
};

// ============ MOBILE MOCKUP ============
const MobileMockup = ({ image, name, onClick }: { image: string; name: string; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="relative bg-neutral-900 shadow-lg rounded-[1.25rem] p-1 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-neutral-900 z-10 w-10 h-2.5 rounded-b-md" />
        <div className="bg-neutral-100 overflow-hidden w-24 aspect-[9/19] rounded-[1rem]">
          <img src={image} alt={name} className="w-full h-full object-cover object-top" />
        </div>
      </div>
      {name && <p className="text-xs text-muted-foreground mt-3 text-center font-light">{name}</p>}
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
  const hasScreenMockups = projectWithWebsite.websiteImage || projectWithWebsite.mobileImage;
  
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

      {/* Website/Mobile Mockups - ALWAYS FIRST when they exist */}
      {hasScreenMockups && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap gap-4 items-end"
        >
          {/* Desktop Mockup */}
          {projectWithWebsite.websiteImage && (
            <div className="flex-1 min-w-[200px] max-w-md">
              <DesktopMockup
                image={projectWithWebsite.websiteImage}
                name=""
                onClick={() => onImageClick(projectWithWebsite.websiteImage!, project.name)}
              />
            </div>
          )}
          
          {/* Mobile Mockup */}
          {projectWithWebsite.mobileImage && (
            <MobileMockup
              image={projectWithWebsite.mobileImage}
              name=""
              onClick={() => onImageClick(projectWithWebsite.mobileImage!, project.name)}
            />
          )}
        </motion.div>
      )}
      
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
            <h1 className="text-sm font-medium tracking-[0.12em]">ELLA MADARI</h1>
            <nav className="flex gap-5 text-[10px] tracking-wider text-muted-foreground">
              <a href="#branding" className="hover:text-foreground transition-colors">מיתוג</a>
              <a href="#websites" className="hover:text-foreground transition-colors">אתרים</a>
            </nav>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="py-14 md:py-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-px h-16 mx-auto bg-gradient-to-b from-transparent via-border/40 to-transparent" />
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
          <section id="websites" className="py-12">
            <SectionHeader title="עיצוב אתרים" subtitle="Web Design" icon={<Monitor className="w-4 h-4" />} />
            
            {/* Desktop Websites */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
              {sfdProject?.websiteImage && (
                <DesktopMockup
                  image={sfdProject.websiteImage}
                  name="SFD"
                  onClick={() => handleImageClick(sfdProject.websiteImage!, 'SFD')}
                />
              )}
              {betterseedsProject?.websiteImage && (
                <DesktopMockup
                  image={betterseedsProject.websiteImage}
                  name="BetterSeeds"
                  onClick={() => handleImageClick(betterseedsProject.websiteImage!, 'BetterSeeds')}
                />
              )}
              {sisenoraProject?.websiteImage && (
                <DesktopMockup
                  image={sisenoraProject.websiteImage}
                  name="Si Señora"
                  onClick={() => handleImageClick(sisenoraProject.websiteImage!, 'Si Señora')}
                />
              )}
              {ascolaProject?.websiteImage && (
                <DesktopMockup
                  image={ascolaProject.websiteImage}
                  name="Ascola Garden"
                  onClick={() => handleImageClick(ascolaProject.websiteImage!, 'Ascola Garden')}
                />
              )}
            </div>

            {/* Mobile Versions */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Mobile</span>
              </div>
              <div className="flex justify-center gap-6 md:gap-8 flex-wrap">
                {websiteProjects.filter(p => p.slug === 'sen' && p.images.length > 0).map((project) => (
                  <MobileMockup
                    key={`mobile-${project.slug}`}
                    image={project.images[0]}
                    name={project.name}
                    onClick={() => handleImageClick(project.images[0], project.name)}
                  />
                ))}
                {sfdProject?.mobileImage && (
                  <MobileMockup
                    image={sfdProject.mobileImage}
                    name="SFD"
                    onClick={() => handleImageClick(sfdProject.mobileImage!, 'SFD')}
                  />
                )}
                {betterseedsProject?.mobileImage && (
                  <MobileMockup
                    image={betterseedsProject.mobileImage}
                    name="BetterSeeds"
                    onClick={() => handleImageClick(betterseedsProject.mobileImage!, 'BetterSeeds')}
                  />
                )}
                {ebriderProject?.mobileImage && (
                  <MobileMockup
                    image={ebriderProject.mobileImage}
                    name="EBrider"
                    onClick={() => handleImageClick(ebriderProject.mobileImage!, 'EBrider')}
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
