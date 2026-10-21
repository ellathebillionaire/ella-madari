import { LogoImage } from '@/components/LogoImage';
import { LearnAIAvatars } from '@/components/LearnAIAvatars';
import LazyVideo from '@/components/LazyVideo';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpLeft } from 'lucide-react';
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
  identityMarks?: string[];
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

// Tiny in-project label so visitors always know what they are looking at.
const SubLabel = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={false}
    transition={{ duration: 0.5, ease }}
    className="project-topic-label mb-2.5 flex items-center gap-3 sm:mb-3"
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
    className="project-desktop group block h-auto w-full min-w-0 whitespace-normal p-0 hover:bg-transparent"
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
    className="project-phone group flex h-auto min-w-0 flex-col items-center whitespace-normal p-0 hover:bg-transparent"
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
  <div className="project-palette flex flex-col items-end gap-2">
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

// Each opening is curated from the project's own visible media; the complete work stays in details.
const ProjectBlock = ({ project, onImageClick }: {
  project: DisplayProject;
  onImageClick: (image: string, name: string, images?: string[]) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const groups = groupProjectMedia(project.slug, project.images, project.galleryGroups, [
    project.website_image, project.mobile_image, project.logo, project.video,
    ...(project.extraLogos || []), ...(project.identityMarks || []), ...(project.hiddenImages || []),
  ]);
  const candidates = groups.filter(group => !/זהות המותג|הדמות והבעות|מדריך מידות/.test(group.label)).flatMap(group => group.images).filter(src => !isVideo(src));
  const preferred: Record<string, RegExp> = {
    noma: /ai_dog_portrait/, aurel: /lifestyle_|atelier_client/,
    taliter: /studio_mockup|wall/, meshek27: /box|signage/,
    sisenora: /ai_campaign|ai_retail/, ebrider: /hero_product|mockup-hero/,
  };
  const hero = candidates.find(src => preferred[project.slug]?.test(src)) || candidates[0];
  const supporting = candidates.filter(src => src !== hero).slice(0, 2);
  const screensLead = Boolean(project.website_image) && !['noma', 'aurel', 'taliter', 'meshek27', 'sisenora'].includes(project.slug);
  const colors = project.slug === 'dresses2026' ? [] : (project.colors || []).map(color => ['#FAFAF9', '#F4F1EA', '#F5F5F0', '#F8FAFC', '#FDF6E3', '#F5F5DC', '#E8DCCB'].includes(color.toUpperCase()) ? '#FFFFFF' : color);
  const title = project.slug === 'dresses2026' ? 'יצירת תמונות AI לעסקים' : project.name;
  const imageTile = (src: string, className = '') => (
    <button type="button" key={src} onClick={() => onImageClick(src, project.name, candidates)} className={`showcase-tile ${className}`} aria-label={`הגדלת עבודה — ${project.name}`}>
      <img src={src} alt={`${project.name} — עבודה נבחרת`} loading="lazy" decoding="async" />
    </button>
  );
  return (
    <article id={`project-${project.slug}`} data-project={project.slug} className="showcase-project">
      <header className="showcase-heading" dir="rtl">
        <h2>{title}</h2>
        {project.description && <p>{project.slug === 'dresses2026' ? 'קמפיין הלבשה ותמונות מוצר על בסיס פריטי לבוש קיימים' : project.description}</p>}
      </header>
      <div className="showcase-layout" dir="ltr">
        <aside className="showcase-identity" aria-label={`${project.name} — זהות המותג`}>
          {liveSites[project.slug] && <a className="showcase-link" href={liveSites[project.slug]} target="_blank" rel="noopener noreferrer">לצפייה באתר ↗</a>}
          {project.logo && <LogoImage src={project.logo} alt={`${project.name} — לוגו`} className="showcase-logo" loading="lazy" />}
          {colors.length > 0 && <div className="showcase-colors" aria-label="פלטת צבעים">{colors.map((color, i) => <span key={`${color}-${i}`} style={{ backgroundColor: color }} title={color} />)}</div>}
          {Boolean(project.identityMarks?.length) && <div className="showcase-marks">{project.identityMarks?.map(src => <LogoImage key={src} src={src} alt={`${project.name} — סמל המותג`} loading="lazy" />)}</div>}
          <p className="showcase-category" dir="rtl">{project.category}</p>
          <button type="button" className="showcase-link showcase-more" aria-expanded={expanded} aria-controls={`details-${project.slug}`} onClick={() => setExpanded(!expanded)}>על הפרויקט {expanded ? '−' : '+'}</button>
        </aside>
        <div className={`showcase-composition ${screensLead ? 'showcase-with-screens' : ''}`}>
          {project.slug === 'dresses2026' ? (
            <div className="showcase-studio" dir="rtl">{groups.map(group => <section key={group.label}><h3>{group.label}</h3><div>{group.images.slice(0, 3).map(src => imageTile(src))}</div></section>)}</div>
          ) : screensLead ? (
            <>
              {supporting.length > 0 && <div className="showcase-support">{(project.slug === 'sfd' ? [...candidates.filter(src => /bands|flatlay|kit_/i.test(src)), ...supporting].filter((src, i, all) => all.indexOf(src) === i).slice(0, 2) : supporting).map(src => imageTile(src))}</div>}
              <div className="showcase-devices">
                <DesktopMockup image={project.website_image as string} name="" aspectRatio={project.aspect_ratio} onClick={() => onImageClick(project.website_image as string, project.name)} />
                {project.mobile_image && <div className="showcase-phone"><MobileMockup image={project.mobile_image} name="" onClick={() => onImageClick(project.mobile_image as string, project.name)} /></div>}
              </div>
            </>
          ) : (
            <>
              {supporting.length > 0 && <div className="showcase-support">{supporting.map(src => imageTile(src))}</div>}
              {hero ? imageTile(hero, 'showcase-hero') : project.website_image ? <DesktopMockup image={project.website_image} name="" onClick={() => onImageClick(project.website_image as string, project.name)} /> : null}
            </>
          )}
        </div>
      </div>
      {project.slug === 'learnai' && <LearnAIAvatars onOpen={(image, images) => onImageClick(image, project.name, images)} />}
      {expanded && <div id={`details-${project.slug}`} className="showcase-details"><ProjectDetails project={project} onImageClick={onImageClick} /></div>}
    </article>
  );
};

const ProjectDetails = ({
  project,
  onImageClick,
}: {
  project: DisplayProject;
  onImageClick: (image: string, name: string, images?: string[]) => void;
}) => {
  const hasDevices = Boolean(project.website_image || project.mobile_image);
  const colors = project.slug === 'dresses2026' ? [] : (project.colors || []).map(color => ['#FAFAF9', '#F4F1EA', '#F5F5F0', '#F8FAFC', '#FDF6E3', '#F5F5DC', '#E8DCCB'].includes(color.toUpperCase()) ? '#FFFFFF' : color);
  const isWebsiteRedesign = project.displayType === 'website_redesign' && project.beforeWebsite && project.website_image;
  const hasBothScreens = Boolean(project.website_image && project.mobile_image);
  const galleryGroups = groupProjectMedia(project.slug, project.images, project.galleryGroups, [
    project.website_image,
    project.mobile_image,
    project.video,
    project.logo,
    ...(project.extraLogos || []),
    ...(project.identityMarks || []),
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
              <LogoImage
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
      className="portfolio-project mb-8 min-w-0 last:mb-0"
      data-project={project.slug}
    >
      <div className="project-heading mb-3 sm:mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex flex-wrap items-center gap-y-2 text-2xl font-normal tracking-tight sm:text-3xl">
            {project.slug === 'dresses2026' ? 'יצירת תמונות AI לעסקים' : project.name}
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
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">{project.slug === 'dresses2026' ? 'קמפיין הלבשה ותמונות מוצר על בסיס פריטי לבוש קיימים' : project.description}</p>
        )}
      </div>

      {(() => {
        if (project.slug === 'dresses2026') {
          return (
            <div className="project-flat-gallery grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8" dir="rtl">
              {galleryGroups.map(group => (
                <section key={group.label} className="min-w-0" aria-label={group.label}>
                  <SubLabel>{group.label}</SubLabel>
                  <ProjectMediaGroup group={{ ...group, label: '' }} name={group.label} onOpen={image => onImageClick(image, group.label, group.images)} />
                </section>
              ))}
            </div>
          );
        }
        const hasStory = project.displayType === 'story' && (project.storyIntro || project.storySteps?.length);
        const hasBranding = project.displayType === 'branding' && (project.values?.length || project.process);
        const hasAside = Boolean(plainLogo || colors.length > 0 || hasStory || hasBranding);
        const hasRebrandLogo = project.displayType === 'rebranding' && project.beforeLogo;
        const showScreens = hasDevices && !isWebsiteRedesign;
        const leadGroup = !showScreens && !isWebsiteRedesign && !hasRebrandLogo ? galleryGroups[0] : undefined;
        const restGroups = (leadGroup ? galleryGroups.slice(1) : galleryGroups).filter(group => project.slug !== 'learnai' || group.label !== 'הדמות והבעות');

        const renderGroup = (group: typeof galleryGroups[number], full = false, half = false) => (
          <section key={group.label} aria-label={`${project.name} - ${group.label}`} data-media-count={group.images.length} className={`project-topic ${project.slug === 'betterseeds' && /נוצרו ב-AI/.test(group.label) ? 'col-span-2 w-full sm:col-span-12 sm:max-w-2xl' : full ? 'col-span-2 sm:col-span-12' : half ? 'col-span-2 sm:col-span-7' : group.images.length === 1 ? 'col-span-1 sm:col-span-4' : group.images.length === 2 ? 'col-span-2 sm:col-span-8' : 'col-span-2 sm:col-span-12'}`}>
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
          <div className="project-main relative min-w-0">
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
            {Boolean(project.identityMarks?.length) && (
              <div aria-label={`${project.name} - סמלי המותג`} className="relative z-10 mt-2 flex items-end gap-3 sm:-mt-5 sm:me-5 sm:justify-end">
                {project.identityMarks?.map((src, index) => (
                  <button key={src} type="button" aria-label={`הגדלת סמל ${project.name} ${index + 1}`} onClick={() => onImageClick(src, `${project.name} - סמלי המותג`, project.identityMarks)} className={project.slug === 'meshek27' ? 'block h-24 w-52 overflow-hidden bg-transparent p-0 focus-visible:outline focus-visible:outline-2' : 'block h-20 w-20 bg-transparent p-0 focus-visible:outline focus-visible:outline-2'}>
                    <LogoImage src={src} alt={`${project.name} - סמל ${index + 1}`} loading="lazy" decoding="async" className={project.slug === 'meshek27' ? 'h-full w-full object-cover' : 'h-full w-full object-contain'} />
                  </button>
                ))}
              </div>
            )}
          </div>
        );

        const hasMain = showScreens || isWebsiteRedesign || hasRebrandLogo || Boolean(leadGroup) || Boolean(project.identityMarks?.length);

        return (
          <div className="project-composition">
            {(hasAside || hasMain) && (
              <motion.div
                initial={false}
                transition={{ duration: 0.5 }}
                className={`project-opening mb-5 grid gap-5 sm:mb-6 sm:gap-8 ${hasAside && hasMain ? 'sm:grid-cols-[minmax(0,1fr)_220px]' : ''}`}
              >
                {hasMain && main}
                {hasAside && (
                  <aside className="project-identity order-first flex min-w-0 flex-col gap-5 sm:order-none" aria-label={`${project.name} - זהות`}>
                    {plainLogo && (
                      <div>
                        <SubLabel>הלוגו</SubLabel>
                        <div className="flex flex-wrap items-center gap-4">
                          {[project.logo as string, ...(project.extraLogos || [])].map((src, index) => (
                            <LogoImage
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

            {project.slug === 'learnai' && <LearnAIAvatars onOpen={(image, images) => onImageClick(image, project.name, images)} />}
            {(restGroups.length > 0 || project.video) && (
              <div className="project-gallery grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:grid-cols-12 sm:gap-x-4 sm:gap-y-5">
                {restGroups.map((group) => renderGroup(group))}
                {project.video && project.slug !== 'learnai' && (
                  <section aria-label={`${project.name} - אנימציה`} data-media-count="1" className="project-topic col-span-1 sm:col-span-4">
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
          </div>
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
  identityMarks: project.identityMarks,
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
    website_image: project.slug === 'petplaypal' ? fallback?.websiteImage || null : assetUrl(project.website_image) || fallback?.websiteImage || null,
  mobile_image: project.slug === 'petplaypal' ? fallback?.mobileImage || null : assetUrl(project.mobile_image) || fallback?.mobileImage || null,
  logo: fallback?.logo || (project.slug === 'petplaypal' ? petPlayPalLogo.url : null),
    extraLogos: fallback?.extraLogos,
    identityMarks: fallback?.identityMarks,
    hiddenImages: fallback?.hiddenImages,
    aspect_ratio: project.slug === 'petplaypal' ? '16/10' : project.aspect_ratio || '16/9',
    colors: ['sfd', 'meshek27', 'betterseeds', 'taliter'].includes(project.slug) ? (fallback?.colors || project.colors || null) : (project.colors || fallback?.colors || null),
    images: project.slug === 'petplaypal' ? [...(fallback?.images || []), ...projectImages.filter(image => !isVideo(image))] : projectImages.length > 0 ? projectImages : fallback?.images || [],
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

      <div className="compact-portfolio min-h-screen bg-background">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="sticky top-0 z-50 border-b border-border/60 bg-background/70 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)] backdrop-blur-2xl"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:px-6 sm:py-5 md:px-10">
            <details className="absolute left-5 top-4 sm:left-9 sm:top-5">
              <summary aria-label="פתיחת תפריט פרויקטים" className="cursor-pointer list-none text-xl leading-none">☰</summary>
              <nav aria-label="פרויקטים" className="absolute left-0 top-9 max-h-[70vh] w-60 overflow-auto border bg-white p-4 shadow-sm" dir="rtl">
                {displayProjects.map(project => <a className="block py-2 text-sm" key={project.id} href={`#project-${project.slug}`} onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')}>{project.name}</a>)}
              </nav>
            </details>
            <h1 className="text-xs font-medium tracking-[0.15em] text-foreground/90 sm:text-sm sm:tracking-[0.12em]">
              ELLA MADARI
            </h1>
          </div>
        </motion.header>

        <div className="h-4 sm:h-6" />

        <main className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-9">
          <section id="projects" aria-label="עבודות נבחרות">
            {[...displayProjects].sort((a, b) => {
              const rank = (slug: string) => slug === 'sfd' ? 0 : slug === 'noma' ? 1 : 2;
              return rank(a.slug) - rank(b.slug);
            }).map(project => <ProjectBlock key={project.id} project={project} onImageClick={openLightbox} />)}
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
