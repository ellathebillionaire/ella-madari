import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { galleryColumns, type MediaGroup } from '@/lib/mediaGroups';
import { cn } from '@/lib/utils';

const MotionButton = motion.create(Button);

export function ProjectMediaGroup({ group, name, onOpen }: {
  group: MediaGroup;
  name: string;
  onOpen: (image: string) => void;
}) {
  // Portrait collections stay together; detailed branding and screens need full width.
  // An empty label marks a flat compact gallery (small images, no topic split).
  const portraits = group.label === '' || /דיוקנאות|סטודיו - נוצר|חוץ - נוצר|קמפיין/.test(group.label);
  const screens = /מסכים|פלטפורמה|עמודי החנות|דפי נחיתה|מדרי/.test(group.label);
  // At most two rows: small counts stay on one row, larger ones split evenly across two.
  const count = group.images.length;
  const cols = galleryColumns(count);
  const oddTail = count > 4 && count % 2 !== 0;
  // Portrait page recordings (e.g. landing pages) play inside a phone frame, like the site screens.
  const isVid = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);
  if (/דפי נחיתה/.test(group.label) && group.images.every(isVid)) {
    return (
      <div className="flex flex-wrap justify-start gap-4">
        {group.images.map((image, index) => (
          <MotionButton
            key={image}
            variant="ghost"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => onOpen(image)}
            aria-label={`הגדלת ${name} - ${group.label} - ${index + 1}`}
            className="group h-auto p-0 hover:bg-transparent"
          >
            <div className="relative rounded-[1.5rem] bg-gradient-to-b from-phone-frame to-phone-frame-soft p-[3px] shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.3)] transition-all duration-500 [@media(hover:hover)]:group-hover:-translate-y-2 sm:rounded-[2.5rem] sm:p-1">
              <div className="absolute left-1/2 top-2 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-phone-frame sm:h-5 sm:w-20" />
              <div className="aspect-[9/19.5] w-36 overflow-hidden rounded-[1.3rem] bg-card sm:w-32 sm:rounded-[2.25rem]">
                <video src={image} autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          </MotionButton>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-2.5 sm:gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {group.images.map((image, index) => (
        <MotionButton
          key={image}
          variant="ghost"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
          onClick={() => onOpen(image)}
          aria-label={`הגדלת ${name} - ${group.label || name} - ${index + 1}`}
          className={cn(
            'group block h-auto w-full min-w-0 overflow-hidden rounded-lg bg-muted p-0 shadow-sm transition-shadow hover:bg-muted focus-visible:ring-offset-2',
            portraits ? 'aspect-[4/5]' : screens ? 'aspect-[16/10]' : 'aspect-[4/3]',
            oddTail && index === count - 1 && (portraits ? 'col-span-2 aspect-[8/5]' : screens ? 'col-span-2 aspect-[32/10]' : 'col-span-2 aspect-[8/3]'),
          )}
        >
          {/\.(mp4|webm|mov)(\?|$)/i.test(image) ? (
            <video src={image} autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-contain sm:object-cover" />
          ) : (
            <img src={image} alt={`${name} - ${group.label || name} - ${index + 1}`} className="h-full w-full object-contain sm:object-cover motion-reduce:transition-none" loading="lazy" decoding="async" />
          )}
        </MotionButton>
      ))}
    </div>
  );
}
