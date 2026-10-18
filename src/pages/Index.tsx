import { LearnAIAnimations } from '@/components/LearnAIAnimations';
import LazyVideo from '@/components/LazyVideo';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Palette, RefreshCw, BookOpen, ArrowUpLeft } from 'lucide-react';
import { projects as staticProjects, type DisplayType, type StoryStep } from '@/data/projects';
import { liveSites } from '@/data/liveSites';
import { useProjects, type ProjectWithImages } from '@/hooks/useProjects';
import { resolveImageUrl } from '@/lib/imageResolver';
import { groupProjectMedia } from '@/lib/mediaGroups';
import petPlayPalLogo from '@/assets/media/PlayPetPal__logo_color.webp.asset.json';
import { Button } from '@/components/ui/button';
import { ProjectMediaGroup } from '@/components/ProjectMediaGroup';
import { PortfolioLightbox, type PortfolioSelection } from '@/components/PortfolioLightbox';
import {
  BrandingStory,
  RebrandCompare,
  WebsiteBeforeAfter,
  ProjectStory,
} from '@/components/ProjectDisplays';

const ease = [0.16, 1, 0.3, 1] as const;

type DisplayProject = {
  id: string;
  slug: string;
  name: string;
  category: string;
  displayType: DisplayType;
  description: string | null;
  website_image: string | null;
  mobile_image: string | null;
  logo?: string | null;
  extraLogos?: string[];
  hiddenImages?: string[];
  aspect_ratio: string;
  colors: string[] | null;
  images: string[];
  video?: string;
  needsReview?: boolean;
  values?: string[];
  process?: string;
  beforeLogo?: string;
  beforeWebsite?: string;
  changeReason?: string;
  storyIntro?: string;
  storySteps?: StoryStep[];
  galleryGroups?: { label: string; match: RegExp }[];
};

const MotionButton = motion.create(Button);

const isVideo = (url?: string | null) => Boolean(url && /\.(mp4|webm|mov)(\?|$)/i.test(url));

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
    initial={false}
    transition={{ duration: 0.7, ease }}
    className="mb-6 border-t border-border pt-5 sm:mb-8 sm:pt-6"
  >
    <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
      <div className="rounded-xl bg-muted p-2.5 text-muted-foreground shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06)] sm:rounded-2xl sm:p-3">
        {icon}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70 sm:text-[11px] sm:tracking-[0.12em]">
        {subtitle}
      </span>
    </div>
    <h2 className="text-xl font-normal tracking-tight text-foreground/90 sm:text-2xl md:text-3xl">
      {title}
    </h2>
  </motion.div>
);

// Tiny in-project label so visitors always know what they are looking at.
const SubLabel = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={false}
    transition={{ duration: 0.5, ease }}
    className="mb-2.5 flex items-center gap-3 sm:mb-3"
  >
    <span className="shrink-0 text-[11px] font-medium tracking-[0.12em] text-muted-foreground/70 sm:text-[11px]">
      {children}
    </span>
    <span aria-hidden="true" className="h-px flex-1 bg-border" />
  </motion.div>
);

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
  <MotionButton
    variant="ghost"
    aria-label={`הגדלת מסך ${name || "המחשב"}`}
    initial={false}
    transition={{ duration: 0.6, ease }}
    onClick={onClick}
    className="group block h-auto w-full min-w-0 whitespace-normal p-0 hover:bg-transparent"
  >
    <div className="overflow-hidden rounded-xl bg-card shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1)] transition-all duration-500 ease-out [@media(hover:hover)]:group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.2)] sm:rounded-2xl">
      <div className="flex h-5 items-center gap-1.5 border-b border-border bg-gradient-to-b from-muted to-muted/80 px-2.5 sm:h-6" dir="ltr">
        <span className="h-2 w-2 rounded-full bg-browser-red shadow-sm sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-browser-yellow shadow-sm sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-browser-green shadow-sm sm:h-2.5 sm:w-2.5" />
        <div className="mx-3 flex-1 sm:mx-6">
          <div className="mx-auto h-2.5 max-w-[100px] rounded-md bg-border/60 sm:h-3 sm:max-w-[140px]" />
        </div>
      </div>
      <div className="overflow-hidden" style={{ aspectRatio }}>
        {isVideo(image) ? (
          <LazyVideo src={image} className="h-full w-full object-cover object-top" />
        ) : (
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        )}
      </div>
    </div>
    {name && (
      <p className="mt-3 text-center text-[11px] font-normal tracking-wide text-muted-foreground sm:mt-4 sm:text-xs" dir="ltr">
        {name}
      </p>
    )}
  </MotionButton>
);

const MobileMockup = ({ image, name, onClick }: { image: string; name: string; onClick: () => void }) => (
  <MotionButton
    variant="ghost"
    aria-label={`הגדלת מסך ${name || "האייפון"}`}
    initial={false}
    transition={{ duration: 0.6, ease }}
    onClick={onClick}
    className="group flex h-auto min-w-0 flex-col items-center whitespace-normal p-0 hover:bg-transparent"
  >
    <div className="relative rounded-[1.5rem] bg-gradient-to-b from-phone-frame to-phone-frame-soft p-[3px] shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.3)] transition-all duration-500 ease-out [@media(hover:hover)]:group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.4)] sm:rounded-[2.5rem] sm:p-1">
      <div className="absolute left-1/2 top-2 z-10 flex h-4 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-phone-frame sm:h-5 sm:w-20">
        <div className="h-2 w-2 rounded-full bg-phone-frame-soft ring-1 ring-border/20" />
      </div>
      <div className="aspect-[9/19.5] w-36 overflow-hidden rounded-[1.3rem] bg-card sm:w-28 sm:rounded-[2.25rem] md:w-32">
        {isVideo(image) ? (
          <LazyVideo src={image} className="h-full w-full object-cover object-top" />
        ) : (
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        )}
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-background/20 sm:w-12" />
    </div>
    {name && (
      <p className="mt-3 text-center text-[11px] font-normal tracking-wide text-muted-foreground sm:mt-4 sm:text-xs" dir="ltr">
        {name}
      </p>
    )}
  </MotionButton>
);

const PaletteDots = ({ colors }: { colors: string[] }) => (
  <div className="flex flex-col items-end gap-2">
    <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.18em] text-muted-foreground/70 sm:text-[11px]">
      צבעים
    </span>
    <div className="flex gap-2 sm:gap-2.5">
      {colors.map((color, index) => (
        <motion.div
          key={`${color}-${index}`}
          initial={false}
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
  onImageClick: (image: string, name: string, images?: string[]) => void;
}) => {
  const hasDevices = Boolean(project.website_image || project.mobile_image);
  const colors = project.colors || [];
  const isWebsiteRedesign = project.displayType === 'website_redesign' && project.beforeWebsite && project.website_image;
  const hasBothScreens = Boolean(project.website_image && project.mobile_image);
  const galleryGroups = groupProjectMedia(project.slug, project.images, project.galleryGroups, [
    project.website_image,
    project.mobile_image,
    project.video,
    project.logo,
    ...(project.extraLogos || []),
    ...(project.hiddenImages || []),
  ]);

  const plainLogo =
    project.displayType !== 'rebranding' &&
    project.logo &&
    project.logo !== project.website_image &&
    project.logo !== project.mobile_image;
  const logoBlock = (
    <>
      {project.displayType === 'rebranding' && project.beforeLogo && project.website_image && !isVideo(project.website_image) && (
        <>
          <SubLabel>הלוגו</SubLabel>
          <RebrandCompare
            beforeLogo={project.beforeLogo}
            afterLogo={project.website_image}
            changeReason={project.changeReason}
          />
        </>
      )}
      {project.displayType === 'rebranding' && project.beforeLogo && (!project.website_image || isVideo(project.website_image)) && project.images[0] && (
        <>
          <SubLabel>הלוגו</SubLabel>
          <RebrandCompare
            beforeLogo={project.beforeLogo}
            afterLogo={project.images[0]}
            changeReason={project.changeReason}
          />
        </>
      )}
      {plainLogo && (
        <>
          {!hasBothScreens && <SubLabel>הלוגו</SubLabel>}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {[project.logo as string, ...(project.extraLogos || [])].map((src, index) => (
              <img
                key={src}
                loading="lazy"
                decoding="async"
                src={src}
                alt={`${project.name} logo${index ? ` ${index + 1}` : ''}`}
                className={index ? "max-h-20 w-auto max-w-[45%] object-contain sm:max-h-16 sm:max-w-[140px]" : "max-h-28 w-auto max-w-full object-contain sm:max-h-20 sm:max-w-[240px]"}
              />
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <motion.div
      initial={false}
      transition={{ duration: 0.6 }}
      className="mb-12 min-w-0 sm:mb-14 last:mb-0"
      data-project={project.slug}
    >
      <div className="mb-3 sm:mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex flex-wrap items-center gap-y-2 text-2xl font-normal tracking-tight sm:text-3xl">
            {project.name}
          </h3>
          {liveSites[project.slug] && (
            <a
              href={liveSites[project.slug]}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:text-sm"
            >
              למעבר לאתר
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">{project.description}</p>
        )}
      </div>

      {(() => {
        const hasStory = project.displayType === 'story' && (project.storyIntro || project.storySteps?.length);
        const hasBranding = project.displayType === 'branding' && (project.values?.length || project.process);
        const hasAside = Boolean(plainLogo || colors.length > 0 || hasStory || hasBranding);
        const hasRebrandLogo = project.displayType === 'rebranding' && project.beforeLogo;
        const showScreens = hasDevices && !isWebsiteRedesign;
        const leadGroup = !showScreens && !isWebsiteRedesign && !hasRebrandLogo ? galleryGroups[0] : undefined;
        const restGroups = leadGroup ? galleryGroups.slice(1) : galleryGroups;

        const renderGroup = (group: typeof galleryGroups[number], full = false, half = false) => (
          <section key={group.label} aria-label={`${project.name} - ${group.label}`} className={project.slug === 'betterseeds' && /נוצרו ב-AI/.test(group.label) ? 'col-span-2 w-full sm:col-span-12 sm:max-w-2xl' : full ? 'col-span-2 sm:col-span-12' : half ? 'col-span-2 sm:col-span-7' : group.images.length === 1 ? 'col-span-1 sm:col-span-4' : group.images.length === 2 ? 'col-span-2 sm:col-span-8' : 'col-span-2 sm:col-span-12'}>
            {group.label ? <SubLabel>{group.label}</SubLabel> : null}
            <ProjectMediaGroup
              group={group}
              compact={project.slug === 'betterseeds' && /נוצרו ב-AI/.test(group.label)}
              name={project.name}
              onOpen={(image) => onImageClick(image, `${project.name} - ${group.label}`, group.images)}
            />
          </section>
        );

        const main = (
          <div className="min-w-0">
            {hasRebrandLogo && logoBlock}
            {showScreens && (
              <>
                <SubLabel>מסכים</SubLabel>
                <div className={`grid min-w-0 items-end gap-3 sm:gap-4 ${project.website_image && project.mobile_image ? 'grid-cols-[minmax(0,1fr)_auto]' : 'grid-cols-1'}`}>
                  {project.website_image && (
                    <div className="min-w-0 md:max-w-lg">
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
              </>
            )}
            {isWebsiteRedesign && (
              <>
                <SubLabel>האתר</SubLabel>
                <div className="max-w-xl">
                  <WebsiteBeforeAfter
                    beforeImage={project.beforeWebsite as string}
                    afterImage={project.website_image as string}
                    name={project.name}
                    aspectRatio={project.aspect_ratio}
                    onImageClick={(image) => onImageClick(image, project.name)}
                  />
                </div>
              </>
            )}
            {leadGroup && <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-12 sm:gap-x-4">{renderGroup(leadGroup, leadGroup.images.length >= 2, leadGroup.images.length === 1)}</div>}
          </div>
        );

        const hasMain = showScreens || isWebsiteRedesign || hasRebrandLogo || Boolean(leadGroup);

        return (
          <>
            {project.slug === 'learnai' && <LearnAIAnimations />}
            {(hasAside || hasMain) && (
              <motion.div
                initial={false}
                transition={{ duration: 0.5 }}
                className={`mb-5 grid gap-5 sm:mb-6 sm:gap-8 ${hasAside && hasMain ? 'sm:grid-cols-[minmax(0,1fr)_220px]' : ''}`}
              >
                {hasMain && main}
                {hasAside && (
                  <aside className="order-first flex min-w-0 flex-col gap-5 sm:order-none" aria-label={`${project.name} - זהות`}>
                    {plainLogo && (
                      <div>
                        <SubLabel>הלוגו</SubLabel>
                        <div className="flex flex-wrap items-center gap-4">
                          {[project.logo as string, ...(project.extraLogos || [])].map((src, index) => (
                            <img
                              key={src}
                loading="lazy"
                decoding="async"
                              src={src}
                              alt={`${project.name} logo${index ? ` ${index + 1}` : ''}`}
                              className={index ? 'max-h-12 w-auto max-w-[40%] object-contain' : 'max-h-20 w-auto max-w-full object-contain'}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {colors.length > 0 && (
                      <PaletteDots colors={colors} />
                    )}
                    {hasStory && <ProjectStory name={project.name} intro={project.storyIntro} steps={project.storySteps} />}
                    {hasBranding && (
                      <BrandingStory name={project.name} values={project.values} process={project.process} />
                    )}
                  </aside>
                )}
              </motion.div>
            )}

            {(restGroups.length > 0 || project.video) && (
              <div className="grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:grid-cols-12 sm:gap-x-4 sm:gap-y-5">
                {restGroups.map((group) => renderGroup(group))}
                {project.video && project.slug !== 'learnai' && (
                  <section aria-label={`${project.name} - אנימציה`} className="col-span-1 sm:col-span-4">
                    <SubLabel>אנימציה</SubLabel>
                    <ProjectMediaGroup
                      group={{ label: 'אנימציה', images: [project.video] }}
                      name={project.name}
                      onOpen={(image) => onImageClick(image, project.name, [image])}
                    />
                  </section>
                )}
              </div>
            )}
          </>
        );
      })()}
    </motion.div>
  );
};

const fromStaticProject = (project: (typeof staticProjects)[number]): DisplayProject => ({
  id: project.slug,
  slug: project.slug,
  name: project.name,
  category: project.category,
  displayType: project.displayType,
  description: project.description || null,
  website_image: project.websiteImage || null,
  mobile_image: project.mobileImage || null,
  logo: project.logo || null,
  extraLogos: project.extraLogos,
  hiddenImages: project.hiddenImages,
  aspect_ratio: '16/9',
  colors: project.colors || null,
  images: project.images,
  video: project.video,
  needsReview: project.needsReview,
  values: project.values,
  process: project.process,
  beforeLogo: project.before?.logo,
  beforeWebsite: project.before?.website,
  changeReason: project.changeReason,
  storyIntro: project.storyIntro,
  storySteps: project.storySteps,
  galleryGroups: project.galleryGroups,
});

// CMS (Supabase) projects don't yet have displayType / story columns, so we fall back to the
// static project of the same slug for that content. New CMS-only projects default to 'website'.
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
    displayType: fallback?.displayType || 'website',
    description: project.description,
    website_image: assetUrl(project.website_image) || fallback?.websiteImage || null,
  mobile_image: assetUrl(project.mobile_image) || fallback?.mobileImage || null,
  logo: fallback?.logo || (project.slug === 'petplaypal' ? petPlayPalLogo.url : null),
    extraLogos: fallback?.extraLogos,
    hiddenImages: fallback?.hiddenImages,
    aspect_ratio: project.aspect_ratio || '16/9',
    colors: project.colors || fallback?.colors || null,
    images: projectImages.length > 0 ? projectImages : fallback?.images || [],
    video: fallback?.video,
    needsReview: fallback?.needsReview,
    values: fallback?.values,
    process: fallback?.process,
    beforeLogo: fallback?.before?.logo,
    beforeWebsite: fallback?.before?.website,
    changeReason: fallback?.changeReason,
    storyIntro: fallback?.storyIntro,
  storySteps: fallback?.storySteps,
  galleryGroups: fallback?.galleryGroups,
  };
};

const Index = () => {
  const { projects, loading } = useProjects();
  const [lightbox, setLightbox] = useState<PortfolioSelection | null>(null);

  const displayProjects = useMemo(() => {
    const visibleCmsProjects = projects.filter((project) => project.is_visible !== false);

    if (visibleCmsProjects.length > 0) {
      return visibleCmsProjects.map(fromCmsProject);
    }

    return staticProjects.map(fromStaticProject);
  }, [projects]);

  // Group by the SERVICE that was actually performed, not a flat "branding/website" split.
  const brandingProjects = displayProjects.filter((project) => project.displayType === 'branding');
  const rebrandingProjects = displayProjects.filter((project) => project.displayType === 'rebranding');
  const storyProjects = displayProjects.filter((project) => project.displayType === 'story');
  const websiteTypeProjects = displayProjects.filter(
    (project) => project.displayType === 'website' || project.displayType === 'website_redesign'
  );

  const openLightbox = (image: string, name: string, images: string[] = [image]) => setLightbox({ image, name, images });

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
          <PortfolioLightbox selection={lightbox} onChange={(image) => setLightbox((current) => current ? { ...current, image } : null)} onClose={() => setLightbox(null)} />
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
            <h1 className="text-xs font-medium tracking-[0.15em] text-foreground/90 sm:text-sm sm:tracking-[0.12em]">
              ELLA MADARI
            </h1>
          </div>
        </motion.header>

        <div className="h-4 sm:h-6" />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          {storyProjects.length > 0 && (
            <section id="projects" className="py-5 sm:py-8">
              <SectionTitle
                title="פרויקטים מקצה לקצה"
                subtitle="Full Scope"
                icon={<BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />}
              />
              {storyProjects.map((project) => (
                <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />
              ))}
            </section>
          )}

          {brandingProjects.length > 0 && (
            <section id="branding" className="py-5 sm:py-8">
              <SectionTitle
                title="מיתוג מאפס"
                subtitle="Branding"
                icon={<Palette className="h-4 w-4 sm:h-5 sm:w-5" />}
              />
              {brandingProjects.map((project) => (
                <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />
              ))}
            </section>
          )}

          {rebrandingProjects.length > 0 && (
            <section id="rebranding" className="py-5 sm:py-8">
              <SectionTitle
                title="ריברנד"
                subtitle="Rebranding"
                icon={<RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />}
              />
              {rebrandingProjects.map((project) => (
                <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />
              ))}
            </section>
          )}

          <section id="websites" className="py-5 sm:py-8">
            <SectionTitle
              title="עיצוב אתרים"
              subtitle="Web Design"
              icon={<Monitor className="h-4 w-4" />}
            />
            {websiteTypeProjects
              .map((project) => (
                <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />
              ))}
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
            <span className="text-[11px] tracking-wider text-muted-foreground/60 sm:text-[11px]">
              © {new Date().getFullYear()} Ella Madari
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
