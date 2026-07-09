import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Palette, Smartphone, X } from 'lucide-react';
import { projects as staticProjects } from '@/data/projects';
import { useProjects, type ProjectWithImages } from '@/hooks/useProjects';
import { resolveImageUrl } from '@/lib/imageResolver';

const ease = [0.16, 1, 0.3, 1] as const;

type DisplayProject = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  website_image: string | null;
  mobile_image: string | null;
  aspect_ratio: string;
  colors: string[] | null;
  images: string[];
  video?: string;
};

type LightboxImage = {
  image: string;
  name: string;
};

const assetUrl = (url: string | null | undefined) => resolveImageUrl(url) || url || null;

const SectionTitle = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease }}
    className="mb-10 border-t border-border pt-8 sm:mb-14 sm:pt-10 md:mb-20"
  >
    <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
      <div className="rounded-xl bg-muted p-2.5 text-muted-foreground shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06)] sm:rounded-2xl sm:p-3">
        {icon}
      </div>
      <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground/70 sm:text-[10px] sm:tracking-[0.4em]">
        {subtitle}
      </span>
    </div>
    <h2 className="text-2xl font-extralight tracking-tight text-foreground/90 sm:text-4xl md:text-5xl">
      {title}
    </h2>
  </motion.div>
);

const Lightbox = ({ image, name, onClose }: LightboxImage & { onClose: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/90 p-6 backdrop-blur-2xl sm:p-10"
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={onClose}
        className="absolute end-4 top-4 rounded-full bg-background/10 p-3 backdrop-blur-lg transition-all duration-300 hover:bg-background/20 sm:end-8 sm:top-8"
        aria-label="סגור"
      >
        <X className="h-5 w-5 text-background transition-transform duration-300 group-hover:rotate-90" />
      </motion.button>
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute start-4 top-4 text-sm font-light tracking-wide text-background/70 sm:start-8 sm:top-8"
      >
        {name}
      </motion.span>
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease }}
        src={image}
        alt={name}
        className="max-h-full max-w-full rounded-xl object-contain shadow-2xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </motion.div>
  );
};

const DesktopMockup = ({
  image,
  name,
  onClick,
  aspectRatio = '16/9',
}: {
  image: string;
  name: string;
  onClick: () => void;
  aspectRatio?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease }}
    onClick={onClick}
    className="group w-full cursor-pointer"
  >
    <div className="overflow-hidden rounded-xl bg-card shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.2)] sm:rounded-2xl">
      <div className="flex h-5 items-center gap-1.5 border-b border-border bg-gradient-to-b from-muted to-muted/80 px-2.5 sm:h-6" dir="ltr">
        <span className="h-2 w-2 rounded-full bg-browser-red shadow-sm sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-browser-yellow shadow-sm sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-browser-green shadow-sm sm:h-2.5 sm:w-2.5" />
        <div className="mx-3 flex-1 sm:mx-6">
          <div className="mx-auto h-2.5 max-w-[100px] rounded-md bg-border/60 sm:h-3 sm:max-w-[140px]" />
        </div>
      </div>
      <div className="overflow-hidden" style={{ aspectRatio }}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
    {name && (
      <p className="mt-3 text-center text-[10px] font-light tracking-wide text-muted-foreground sm:mt-4 sm:text-xs" dir="ltr">
        {name}
      </p>
    )}
  </motion.div>
);

const MobileMockup = ({ image, name, onClick }: { image: string; name: string; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease }}
    onClick={onClick}
    className="group flex cursor-pointer flex-col items-center"
  >
    <div className="relative rounded-[1.5rem] bg-gradient-to-b from-phone-frame to-phone-frame-soft p-[3px] shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.3)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.4)] sm:rounded-[2.5rem] sm:p-1">
      <div className="absolute left-1/2 top-2 z-10 flex h-4 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-phone-frame sm:h-5 sm:w-20">
        <div className="h-2 w-2 rounded-full bg-phone-frame-soft ring-1 ring-border/20" />
      </div>
      <div className="aspect-[9/19.5] w-24 overflow-hidden rounded-[1.3rem] bg-card sm:w-28 sm:rounded-[2.25rem] md:w-32">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-background/20 sm:w-12" />
    </div>
    {name && (
      <p className="mt-3 text-center text-[10px] font-light tracking-wide text-muted-foreground sm:mt-4 sm:text-xs" dir="ltr">
        {name}
      </p>
    )}
  </motion.div>
);

const PaletteDots = ({ colors }: { colors: string[] }) => (
  <div className="flex flex-col items-end gap-2">
    <span className="whitespace-nowrap text-[10px] uppercase tracking-wider text-muted-foreground/70">
      Color Palette
    </span>
    <div className="flex gap-2 sm:gap-2.5">
      {colors.map((color, index) => (
        <motion.div
          key={`${color}-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08, ease }}
          className="h-6 w-6 cursor-pointer rounded-full shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.15),inset_0_1px_2px_hsl(var(--background)/0.3)] ring-1 ring-foreground/5 transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  </div>
);

const ProjectBlock = ({
  project,
  onImageClick,
}: {
  project: DisplayProject;
  onImageClick: (image: string, name: string) => void;
}) => {
  const hasDevices = Boolean(project.website_image || project.mobile_image);
  const colors = project.colors || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-light tracking-tight sm:text-xl md:text-2xl">{project.name}</h3>
        {project.description && (
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{project.description}</p>
        )}
      </div>

      {hasDevices && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex flex-wrap items-start gap-3 sm:mb-6 sm:gap-4"
        >
          <div className="flex flex-1 flex-wrap items-end gap-3 sm:gap-4">
            {project.website_image && (
              <div className="min-w-[160px] flex-1 sm:min-w-[200px] md:max-w-md">
                <DesktopMockup
                  image={project.website_image}
                  name=""
                  aspectRatio={project.aspect_ratio}
                  onClick={() => onImageClick(project.website_image as string, project.name)}
                />
              </div>
            )}
            {project.mobile_image && (
              <MobileMockup
                image={project.mobile_image}
                name=""
                onClick={() => onImageClick(project.mobile_image as string, project.name)}
              />
            )}
          </div>
          {colors.length > 0 && (
            <div className="pt-1">
              <PaletteDots colors={colors} />
            </div>
          )}
        </motion.div>
      )}

      {!hasDevices && colors.length > 0 && (
        <div className="mb-4 flex justify-end sm:mb-6">
          <PaletteDots colors={colors} />
        </div>
      )}

      {(project.images.length > 0 || project.video) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {project.images.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, ease }}
              onClick={() => onImageClick(image, project.name)}
              className="group aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-muted shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_hsl(var(--foreground)/0.15)] sm:rounded-2xl"
            >
              <img
                src={image}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
          {project.video && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] sm:rounded-2xl"
            >
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const fromStaticProject = (project: (typeof staticProjects)[number]): DisplayProject => ({
  id: project.slug,
  slug: project.slug,
  name: project.name,
  category: project.category,
  description: project.description || null,
  website_image: project.websiteImage || null,
  mobile_image: project.mobileImage || null,
  aspect_ratio: '16/9',
  colors: project.colors || null,
  images: project.images,
  video: project.video,
});

const fromCmsProject = (project: ProjectWithImages): DisplayProject => {
  const fallback = staticProjects.find((item) => item.slug === project.slug);
  const projectImages = [...(project.project_images || [])]
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map((image) => assetUrl(image.image_url) || image.image_url)
    .filter(Boolean) as string[];

  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    category: project.category,
    description: project.description,
    website_image: assetUrl(project.website_image) || fallback?.websiteImage || null,
    mobile_image: assetUrl(project.mobile_image) || fallback?.mobileImage || null,
    aspect_ratio: project.aspect_ratio || '16/9',
    colors: project.colors || fallback?.colors || null,
    images: projectImages.length > 0 ? projectImages : fallback?.images || [],
    video: fallback?.video,
  };
};

const Index = () => {
  const { projects, loading } = useProjects();
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  const displayProjects = useMemo(() => {
    const visibleCmsProjects = projects.filter((project) => project.is_visible !== false);

    if (visibleCmsProjects.length > 0) {
      return visibleCmsProjects.map(fromCmsProject);
    }

    return staticProjects.map(fromStaticProject);
  }, [projects]);

  const brandingProjects = displayProjects.filter((project) => project.category === 'branding');
  const websiteProjects = displayProjects.filter((project) => project.website_image);
  const mobileProjects = displayProjects.filter((project) => project.mobile_image);

  const openLightbox = (image: string, name: string) => setLightbox({ image, name });

  if (loading && projects.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
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
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="sticky top-0 z-50 border-b border-border/60 bg-background/70 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)] backdrop-blur-2xl"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:px-6 sm:py-5 md:px-10">
            <h1 className="text-xs font-medium tracking-[0.15em] text-foreground/90 sm:text-sm sm:tracking-[0.2em]">
              ELLA MADARI
            </h1>
          </div>
        </motion.header>

        <div className="h-4 sm:h-6" />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <section id="branding" className="py-8 sm:py-12 md:py-16">
            <SectionTitle
              title="מיתוג וזהות חזותית"
              subtitle="Branding"
              icon={<Palette className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            {brandingProjects.map((project) => (
              <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />
            ))}
          </section>

          <section id="websites" className="py-8 sm:py-12">
            <SectionTitle
              title="עיצוב אתרים"
              subtitle="Web Design"
              icon={<Monitor className="h-4 w-4" />}
            />
            {websiteProjects.length > 0 && (
              <div className="mb-8 grid grid-cols-1 gap-3 sm:mb-12 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3">
                {websiteProjects.map((project) => (
                  <DesktopMockup
                    key={project.id}
                    image={project.website_image as string}
                    name={project.name}
                    aspectRatio={project.aspect_ratio}
                    onClick={() => openLightbox(project.website_image as string, project.name)}
                  />
                ))}
              </div>
            )}

            {mobileProjects.length > 0 && (
              <div className="mt-8 sm:mt-12">
                <div className="mb-4 flex items-center gap-2 sm:mb-6">
                  <Smartphone className="h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5" />
                  <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[9px]">
                    Mobile
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                  {mobileProjects.map((project) => (
                    <MobileMockup
                      key={project.id}
                      image={project.mobile_image as string}
                      name={project.name}
                      onClick={() => openLightbox(project.mobile_image as string, project.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-12 border-t border-border/60 bg-gradient-to-b from-transparent to-muted/40 py-8 sm:mt-20 sm:py-12">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 md:px-10">
            <a
              href="mailto:hello@ellamadari.com"
              className="text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground sm:text-sm"
            >
              hello@ellamadari.com
            </a>
            <span className="text-[9px] tracking-wider text-muted-foreground/60 sm:text-[10px]">
              © {new Date().getFullYear()} Ella Madari
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;