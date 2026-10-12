import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ease = [0.16, 1, 0.3, 1] as const;


// ============ BRANDING FROM SCRATCH ============
// Values + short process paragraph, kept light and easy to scan - not a wall of text.
export const BrandingStory = ({
  values,
  process,
}: {
  values?: string[];
  process?: string;
}) => {
  if (!values?.length && !process) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-2xl bg-muted/50 p-4 sm:mb-8 sm:p-6"
    >
      {values && values.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-full bg-background px-3 py-1.5 text-[11px] font-medium text-foreground/80 shadow-sm ring-1 ring-border/60 sm:text-xs"
            >
              {value}
            </span>
          ))}
        </div>
      )}
      {process && (
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{process}</p>
      )}
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
          <div className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70 sm:text-[10px]">
            לפני
          </div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-muted p-6 shadow-inner sm:rounded-2xl sm:p-10">
            <img src={beforeLogo} alt="לוגו קודם" className="max-h-full max-w-full object-contain opacity-80" loading="lazy" />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-foreground/70 sm:text-[10px]">
            <ArrowLeftRight className="h-3 w-3" />
            אחרי
          </div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-card p-6 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1)] sm:rounded-2xl sm:p-10">
            <img src={afterLogo} alt="לוגו חדש" className="max-h-full max-w-full object-contain" loading="lazy" />
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

// ============ STORY: narrative-driven (import / custom dev / multi-service) ============
export const ProjectStory = ({
  intro,
  steps,
}: {
  intro?: string;
  steps?: { title: string; text: string }[];
}) => {
  if (!intro && !steps?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      {intro && (
        <p className="mb-5 text-sm leading-relaxed text-foreground/80 sm:mb-6 sm:text-base">{intro}</p>
      )}
      {steps && steps.length > 0 && (
        <div className="space-y-4 sm:space-y-5">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground sm:h-7 sm:w-7 sm:text-xs">
                  {index + 1}
                </div>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-medium tracking-wide text-foreground sm:text-sm">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
