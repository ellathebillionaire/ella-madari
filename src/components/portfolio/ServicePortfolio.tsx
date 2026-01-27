import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Monitor, Smartphone, Palette } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { projects as staticProjects } from '@/data/projects';
import { resolveImageUrl } from '@/lib/imageResolver';

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
  colors: string[] | null;
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-10"
    >
      <motion.button 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={onClose} 
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 group"
      >
        <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>
      <motion.span 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 text-sm text-white/70 font-light tracking-wide"
      >
        {name}
      </motion.span>
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        src={image}
        alt={name}
        className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-2xl"
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer w-full"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] group-hover:-translate-y-2">
        {/* Browser Bar - Apple-style */}
        <div className="bg-gradient-to-b from-neutral-100 to-neutral-200/80 flex items-center h-5 sm:h-6 px-2.5 gap-1.5 border-b border-neutral-200/50">
          <div className="rounded-full bg-[#FF5F57] w-2 h-2 sm:w-2.5 sm:h-2.5 shadow-sm" />
          <div className="rounded-full bg-[#FEBC2E] w-2 h-2 sm:w-2.5 sm:h-2.5 shadow-sm" />
          <div className="rounded-full bg-[#28C840] w-2 h-2 sm:w-2.5 sm:h-2.5 shadow-sm" />
          <div className="flex-1 mx-3 sm:mx-6">
            <div className="h-2.5 sm:h-3 bg-neutral-200/80 rounded-md max-w-[100px] sm:max-w-[140px] mx-auto" />
          </div>
        </div>
        {/* Screenshot - custom aspect ratio */}
        <div className="overflow-hidden" style={{ aspectRatio }}>
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </div>
      </div>
      {name && <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 text-center font-light tracking-wide">{name}</p>}
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] rounded-[1.5rem] sm:rounded-[2.5rem] p-[3px] sm:p-1 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-neutral-900 z-10 w-14 sm:w-20 h-4 sm:h-5 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
        </div>
        <div className="bg-white overflow-hidden w-24 sm:w-28 md:w-32 aspect-[9/19.5] rounded-[1.3rem] sm:rounded-[2.25rem]">
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-white/20 rounded-full" />
      </div>
      {name && <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 text-center font-light tracking-wide">{name}</p>}
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

      {/* Website/Mobile Mockups with Color Palette */}
      {hasScreenMockups && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 flex flex-wrap gap-3 sm:gap-4 items-start"
        >
          {/* Mockups Container */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-end flex-1">
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
          </div>
          
          {/* Brand Colors - positioned at top right of mockups section */}
          {project.colors && project.colors.length > 0 && (
            <div className="flex flex-col items-end gap-2 pt-1">
              <span className="text-[10px] text-muted-foreground/70 tracking-wider uppercase whitespace-nowrap">Color Palette</span>
              <div className="flex gap-2 sm:gap-2.5">
                {project.colors.map((color, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] ring-1 ring-black/5 transition-transform duration-300 hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Color Palette for projects WITHOUT mockups */}
      {!hasScreenMockups && project.colors && project.colors.length > 0 && (
        <div className="mb-4 sm:mb-6 flex justify-end">
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-muted-foreground/70 tracking-wider uppercase whitespace-nowrap">Color Palette</span>
            <div className="flex gap-2 sm:gap-2.5">
              {project.colors.map((color, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] ring-1 ring-black/5 transition-transform duration-300 hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Images Grid */}
      {project.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onImageClick(img, project.name)}
              className="group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-muted aspect-[4/3] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:-translate-y-1"
            >
              <img
                src={img}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </motion.div>
          ))}
          
          {/* Video if exists */}
          {project.video && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-xl sm:rounded-2xl bg-muted aspect-[4/3] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]"
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
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="mb-10 sm:mb-14 md:mb-20 pt-8 sm:pt-10 border-t border-black/[0.06]"
  >
    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-neutral-100 text-neutral-500 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]">{icon}</div>
      <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-muted-foreground/70 font-medium">{subtitle}</span>
    </div>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-foreground/90">{title}</h2>
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
      .map(img => resolveImageUrl(img.image_url) || img.image_url);
    
    const images = dbImages.length > 0 ? dbImages : (staticProject?.images || []);
    
    // Resolve website and mobile images
    const websiteImage = resolveImageUrl(dbProject.website_image) || dbProject.website_image || staticProject?.websiteImage || null;
    const mobileImage = resolveImageUrl(dbProject.mobile_image) || dbProject.mobile_image || staticProject?.mobileImage || null;
    
    return {
      id: dbProject.id,
      slug: dbProject.slug,
      name: dbProject.name,
      category: dbProject.category,
      description: dbProject.description,
      website_image: websiteImage,
      mobile_image: mobileImage,
      aspect_ratio: (dbProject as any).aspect_ratio || '16/9',
      colors: dbProject.colors || null,
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex justify-center items-center">
            <h1 className="text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-foreground/90">ELLA MADARI</h1>
          </div>
        </motion.header>

        {/* Minimal spacing after header */}
        <div className="h-4 sm:h-6" />

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
        <footer className="border-t border-black/[0.04] py-8 sm:py-12 mt-12 sm:mt-20 bg-gradient-to-b from-transparent to-neutral-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
            <a 
              href="mailto:hello@ellamadari.com" 
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              hello@ellamadari.com
            </a>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground/60 tracking-wider">© {new Date().getFullYear()} Ella Madari</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServicePortfolio;
