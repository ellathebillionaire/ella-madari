import { LogoImage } from '@/components/LogoImage';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const ease = [0.16, 1, 0.3, 1] as const;

// Glass explanation window: full detail stays behind a click, so the page itself stays
// visual-first for international visitors who read only what they choose to open.
const StoryDialog = ({
  open,
  onOpenChange,
  title,
  intro,
  steps,
  process,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  intro?: string;
  steps?: { title: string; text: string }[];
  process?: string;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      dir="rtl"
      className="max-h-[80vh] overflow-y-auto rounded-3xl border-border/60 bg-background/85 text-right shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.25)] backdrop-blur-xl [&>button]:left-4 [&>button]:right-auto"
    >
      <DialogTitle className="text-base font-normal tracking-wide text-foreground sm:text-lg">
        {title}
      </DialogTitle>
      {intro && <p className="text-sm leading-relaxed text-foreground/80">{intro}</p>}
      {steps && steps.length > 0 && (
        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground sm:h-7 sm:w-7 sm:text-xs">
                {index + 1}
              </div>
              <div>
                <h4 className="mb-1 text-xs font-medium tracking-wide text-foreground sm:text-sm">{step.title}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {process && <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{process}</p>}
    </DialogContent>
  </Dialog>
);

// ============ SHARED ROW: one clickable line, used by both the story steps and the process ============
const StoryRow = ({
  index,
  title,
  onClick,
}: {
  index?: string;
  title: string;
  onClick: () => void;
}) => (
  <Button
    variant="ghost"
    type="button"
    onClick={onClick}
    aria-label={`הסבר על ${title}`}
    className="project-story-row group flex h-auto min-h-[46px] w-full cursor-pointer items-center gap-3 whitespace-normal rounded-2xl border border-foreground/10 bg-background px-4 py-3 text-right shadow-[0_2px_10px_-6px_hsl(var(--foreground)/0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_24px_-10px_hsl(var(--foreground)/0.25)]"
  >
    {index && (
      <>
        <span className="text-sm font-light tabular-nums text-muted-foreground/60 transition-colors group-hover:text-foreground">
          {index}
        </span>
        <span className="h-4 w-px shrink-0 bg-foreground/10" />
      </>
    )}
    <span className="flex-1 text-[13px] font-normal leading-snug text-foreground">{title}</span>
    <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:rotate-90 group-hover:text-foreground" />
  </Button>
);

// ============ BRANDING FROM SCRATCH ============
// The process opens through the same row design as the numbered story steps.
export const BrandingStory = ({
  name,
  values,
  process,
}: {
  name?: string;
  values?: string[];
  process?: string;
}) => {
  const [open, setOpen] = useState(false);
  void values;
  if (!process) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full min-w-0"
    >
      <StoryRow title="התהליך" onClick={() => setOpen(true)} />
      <StoryDialog
        open={open}
        onOpenChange={setOpen}
        title={name ? `${name} - התהליך` : 'התהליך'}
        process={process}
      />
    </motion.div>
  );
};

// ============ REBRANDING: before -> after toggle ============
export const RebrandCompare = ({
  beforeLogo,
  afterLogo,
  changeReason,
}: {
  beforeLogo?: string;
  afterLogo: string;
  changeReason?: string;
}) => {
  if (!beforeLogo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70 sm:text-[11px]">
            לפני
          </div>
          <div className="flex aspect-square items-center justify-center overflow-hidden bg-transparent p-6 sm:p-10">
            <LogoImage src={beforeLogo} alt="לוגו קודם" className="max-h-full max-w-full object-contain opacity-80" loading="lazy" />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/70 sm:text-[11px]">
            <ArrowLeftRight className="h-3 w-3" />
            אחרי
          </div>
          <div className="flex aspect-square items-center justify-center overflow-hidden bg-transparent p-6 sm:p-10">
            <LogoImage src={afterLogo} alt="לוגו חדש" className="max-h-full max-w-full object-contain" loading="lazy" />
          </div>
        </div>
      </div>
      {changeReason && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">{changeReason}</p>
      )}
    </motion.div>
  );
};

// ============ WEBSITE REDESIGN: before/after screen toggle ============
export const WebsiteBeforeAfter = ({
  beforeImage,
  afterImage,
  name,
  aspectRatio = '16/9',
  onImageClick,
}: {
  beforeImage: string;
  afterImage: string;
  name: string;
  aspectRatio?: string;
  onImageClick: (image: string) => void;
}) => {
  const [showAfter, setShowAfter] = useState(true);
  const activeImage = showAfter ? afterImage : beforeImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="w-full"
    >
      <div className="overflow-hidden rounded-xl bg-card shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1)] sm:rounded-2xl">
        <div className="flex h-5 items-center gap-1.5 border-b border-border bg-gradient-to-b from-muted to-muted/80 px-2.5 sm:h-6" dir="ltr">
          <span className="h-2 w-2 rounded-full bg-browser-red shadow-sm sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-browser-yellow shadow-sm sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-browser-green shadow-sm sm:h-2.5 sm:w-2.5" />
        </div>
        <div
          className="relative cursor-pointer overflow-hidden"
          style={{ aspectRatio }}
          onClick={() => onImageClick(activeImage)}
        >
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
        <Button
          variant="ghost"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAfter(false);
          }}
          className={`h-11 min-w-16 rounded-full px-4 text-xs font-medium transition-all ${
            !showAfter ? 'bg-foreground text-background shadow-sm' : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          לפני
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAfter(true);
          }}
          className={`h-11 min-w-16 rounded-full px-4 text-xs font-medium transition-all ${
            showAfter ? 'bg-foreground text-background shadow-sm' : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          אחרי
        </Button>
      </div>
    </motion.div>
  );
};

// ============ STORY: editorial numbered list, sits under the palette on the left ============
export const ProjectStory = ({
  name,
  intro,
  steps,
}: {
  name?: string;
  intro?: string;
  steps?: { title: string; text: string }[];
}) => {
  const [open, setOpen] = useState(false);
  if (!intro && !steps?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full min-w-0"
    >
      <span className="mb-2 block text-[11px] font-medium tracking-[0.18em] text-muted-foreground/70 sm:text-[11px]">
        הסיפור
      </span>
      <div className="grid gap-2">
        {steps?.map((step, index) => (
          <StoryRow
            key={step.title}
            index={String(index + 1).padStart(2, '0')}
            title={step.title}
            onClick={() => setOpen(true)}
          />
        ))}
      </div>
      <StoryDialog open={open} onOpenChange={setOpen} title={name || 'הפרויקט'} intro={intro} steps={steps} />
    </motion.div>
  );
};
