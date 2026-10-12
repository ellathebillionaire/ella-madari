import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { MediaGroup } from '@/lib/mediaGroups';
import { cn } from '@/lib/utils';

const MotionButton = motion.create(Button);

export function ProjectMediaGroup({ group, name, onOpen }: {
  group: MediaGroup;
  name: string;
  onOpen: (image: string) => void;
}) {
  // Portrait collections stay together; detailed branding and screens need full width.
  const portraits = /דיוקנאות|סטודיו - נוצר|חוץ - נוצר|קמפיין/.test(group.label);
  const screens = /מסכים|פלטפורמה|עמודי החנות|דפי נחיתה|מדרי/.test(group.label);
  return (
    <div className={cn('grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4', portraits ? 'grid-cols-2' : 'grid-cols-1')}>
      {group.images.map((image, index) => (
        <MotionButton
          key={image}
          variant="ghost"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
          onClick={() => onOpen(image)}
          aria-label={`הגדלת ${name} - ${group.label} - ${index + 1}`}
          className={cn(
            'group block h-auto w-full min-w-0 overflow-hidden rounded-lg bg-muted p-0 shadow-sm transition-shadow hover:bg-muted focus-visible:ring-offset-2 sm:aspect-[4/3] sm:rounded-2xl',
            portraits ? 'aspect-[4/5]' : screens ? 'aspect-[16/10]' : 'aspect-[4/3]',
            portraits && group.images.length % 2 !== 0 && index === 0 && 'col-span-2 aspect-[4/3] sm:col-span-1',
          )}
        >
          {/\.(mp4|webm|mov)(\?|$)/i.test(image) ? (
            <video src={image} autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-contain sm:object-cover" />
          ) : (
            <img src={image} alt={`${name} - ${group.label} - ${index + 1}`} className="h-full w-full object-contain sm:object-cover motion-reduce:transition-none" loading="lazy" decoding="async" />
          )}
        </MotionButton>
      ))}
    </div>
  );
}