import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Monitor, Smartphone, Palette } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { projects as staticProjects } from '@/data/projects';

// ============ TYPES ============
interface ProjectImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number | null;
}

interface DBProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  hero_image: string | null;
  bg_color: string | null;
  accent_color: string | null;
  colors: string[] | null;
  website_image: string | null;
  mobile_image: string | null;
  display_order: number | null;
  is_visible: boolean | null;
  project_images: ProjectImage[];
}

// Combined project type that merges DB data with static fallbacks
interface DisplayProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  website_image: string | null;
  mobile_image: string | null;
  aspect_ratio: string | null;
  images: string[];
  video?: string;
}

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
const DesktopMockup = ({ image, name, onClick, aspectRatio = '16/9' }: { image: string; name: string; onClick: () => void; aspectRatio?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer w-full"
    >
      <div className="bg-neutral-100 rounded-lg sm:rounded-xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Browser Bar - tight and minimal */}
        <div className="bg-neutral-200 flex items-center h-4 sm:h-5 px-2 gap-1">
          <div className="rounded-full bg-[#FF5F57] w-1.5 h-1.5 sm:w-2 sm:h-2" />
          <div className="rounded-full bg-[#FEBC2E] w-1.5 h-1.5 sm:w-2 sm:h-2" />
          <div className="rounded-full bg-[#28C840] w-1.5 h-1.5 sm:w-2 sm:h-2" />
          <div className="flex-1 mx-2 sm:mx-4">
            <div className="h-2 sm:h-2.5 bg-neutral-300 rounded-full max-w-[80px] sm:max-w-[120px] mx-auto" />
          </div>
        </div>
        {/* Screenshot - custom aspect ratio */}
        <div className="overflow-hidden" style={{ aspectRatio }}>
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
        </div>
      </div>
      {name && <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 text-center font-light">{name}</p>}
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
      <div className="relative bg-neutral-900 shadow-lg rounded-[1.5rem] sm:rounded-[2rem] p-[3px] sm:p-1 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-neutral-900 z-10 w-12 sm:w-16 h-3 sm:h-4 rounded-full" />
        <div className="bg-neutral-100 overflow-hidden w-20 sm:w-24 md:w-28 aspect-[9/19.5] rounded-[1.3rem] sm:rounded-[1.75rem]">
          <img src={image} alt={name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-white/30 rounded-full" />
      </div>
      {name && <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 text-center font-light">{name}</p>}
    </motion.div>
  );
};

// ============ BRANDING PROJECT CARD ============
const BrandingProjectCard = ({ project, onImageClick }: { 
  project: DisplayProject; 
  onImageClick: (img: string, name: string) => void 
}) => {
  const hasScreenMockups = project.website_image || project.mobile_image;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      {/* Project Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight">{project.name}</h3>
        {project.description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{project.description}</p>
        )}
      </div>

      {/* Website/Mobile Mockups - ALWAYS FIRST when they exist */}
      {hasScreenMockups && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 flex flex-wrap gap-3 sm:gap-4 items-end"
        >
          {/* Desktop Mockup */}
          {project.website_image && (
            <div className="flex-1 min-w-[160px] sm:min-w-[200px] max-w-sm md:max-w-md">
              <DesktopMockup
                image={project.website_image}
                name=""
                aspectRatio={project.aspect_ratio || '16/9'}
                onClick={() => onImageClick(project.website_image!, project.name)}
              />
            </div>
          )}
          
          {/* Mobile Mockup */}
          {project.mobile_image && (
            <MobileMockup
              image={project.mobile_image}
              name=""
              onClick={() => onImageClick(project.mobile_image!, project.name)}
            />
          )}
        </motion.div>
      )}
      
      {/* Images Grid */}
      {project.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => onImageClick(img, project.name)}
              className="group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl bg-muted aspect-[4/3]"
            >
              <img
                src={img}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
          
          {/* Video if exists */}
          {project.video && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg sm:rounded-xl bg-muted aspect-[4/3]"
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
    className="mb-8 sm:mb-12 md:mb-16 pt-6 sm:pt-8 border-t border-border/30"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-muted text-muted-foreground">{icon}</div>
      <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-muted-foreground">{subtitle}</span>
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-tight">{title}</h2>
  </motion.div>
);

// ============ MAIN COMPONENT ============
const ServicePortfolio = () => {
  const [lightbox, setLightbox] = useState<{ image: string; name: string } | null>(null);
  const [dbProjects, setDbProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (*)
        `)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setDbProjects(data as DBProject[]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleImageClick = (image: string, name: string) => {
    setLightbox({ image, name });
  };

  // Merge DB projects with static fallback data for images
  const displayProjects: DisplayProject[] = dbProjects.map(dbProject => {
    const staticProject = staticProjects.find(sp => sp.slug === dbProject.slug);
    
    // Use DB images if available, otherwise fall back to static images
    const dbImages = dbProject.project_images
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      .map(img => img.image_url);
    
    const images = dbImages.length > 0 ? dbImages : (staticProject?.images || []);
    
    return {
      id: dbProject.id,
      slug: dbProject.slug,
      name: dbProject.name,
      category: dbProject.category,
      description: dbProject.description,
      // Use DB images first, then static fallback
      website_image: dbProject.website_image || staticProject?.websiteImage || null,
      mobile_image: dbProject.mobile_image || staticProject?.mobileImage || null,
      aspect_ratio: (dbProject as any).aspect_ratio || '16/9',
      images,
      video: staticProject?.video,
    };
  });

  // Filter projects by category
  const brandingProjects = displayProjects.filter(p => p.category === 'branding');
  
  // Projects with website images for the websites section
  const projectsWithWebsiteImages = displayProjects.filter(p => p.website_image);
  const projectsWithMobileImages = displayProjects.filter(p => p.mobile_image);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex justify-center items-center">
            <h1 className="text-xs sm:text-sm font-medium tracking-[0.1em] sm:tracking-[0.12em]">ELLA MADARI</h1>
          </div>
        </motion.header>

        {/* Minimal spacing after header */}
        <div className="h-2 sm:h-3" />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          
          {/* ========== BRANDING ========== */}
          <section id="branding" className="py-8 sm:py-12 md:py-16">
            <SectionHeader title="מיתוג וזהות חזותית" subtitle="Branding" icon={<Palette className="w-4 h-4 sm:w-5 sm:h-5" />} />
            
            {brandingProjects.map((project) => (
              <BrandingProjectCard 
                key={project.id} 
                project={project} 
                onImageClick={handleImageClick}
              />
            ))}
          </section>

          {/* ========== WEBSITES ========== */}
          <section id="websites" className="py-8 sm:py-12">
            <SectionHeader title="עיצוב אתרים" subtitle="Web Design" icon={<Monitor className="w-4 h-4" />} />
            
            {/* Desktop Websites */}
            {projectsWithWebsiteImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
                {projectsWithWebsiteImages.map((project) => (
                  <DesktopMockup
                    key={project.id}
                    image={project.website_image!}
                    name={project.name}
                    aspectRatio={project.aspect_ratio || '16/9'}
                    onClick={() => handleImageClick(project.website_image!, project.name)}
                  />
                ))}
              </div>
            )}

            {/* Mobile Versions */}
            {projectsWithMobileImages.length > 0 && (
              <div className="mt-8 sm:mt-12">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
                  <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Mobile</span>
                </div>
                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
                  {projectsWithMobileImages.map((project) => (
                    <MobileMockup
                      key={project.id}
                      image={project.mobile_image!}
                      name={project.name}
                      onClick={() => handleImageClick(project.mobile_image!, project.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 py-6 sm:py-10 mt-10 sm:mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
            <a href="mailto:hello@ellamadari.com" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              hello@ellamadari.com
            </a>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServicePortfolio;
