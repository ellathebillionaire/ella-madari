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
