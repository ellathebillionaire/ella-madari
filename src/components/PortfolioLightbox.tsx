import { isCutoutAsset } from '@/data/cutoutAssets';
import { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type PortfolioSelection = { image: string; name: string; images: string[] };

export function PortfolioLightbox({ selection, onChange, onClose }: {
  selection: PortfolioSelection;
  onChange: (image: string) => void;
  onClose: () => void;
}) {
  const touch = useRef<{ x: number; y: number } | null>(null);
  const index = selection.images.indexOf(selection.image);
  const navigate = (step: number) => {
    const image = selection.images[(index + step + selection.images.length) % selection.images.length];
    if (image) onChange(image);
  };

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); navigate(-1); }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-foreground/95 backdrop-blur-2xl" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[201] flex h-[100dvh] flex-col text-background outline-none"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] sm:px-8">
            <Dialog.Title className="min-w-0 truncate text-sm font-medium">{selection.name}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="סגור" className="h-11 w-11 shrink-0 rounded-full text-background hover:bg-background/10 hover:text-background focus-visible:ring-background">
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <div
            className="flex min-h-0 flex-1 items-center justify-center px-2 sm:px-10"
            onTouchStart={(event) => {
              if (event.touches.length !== 1) { touch.current = null; return; }
              touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }}
            onTouchEnd={(event) => {
              const start = touch.current;
              touch.current = null;
              const end = event.changedTouches[0];
              if (!start || !end) return;
              const dx = end.clientX - start.x;
              const dy = end.clientY - start.y;
              if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && selection.images.length > 1) navigate(dx > 0 ? 1 : -1);
              if (dy > 100 && dy > Math.abs(dx) * 1.5) onClose();
            }}
          >
            {/\.(mp4|webm|mov)(\?|$)/i.test(selection.image) ? (
              <video key={selection.image} src={selection.image} autoPlay loop muted playsInline controls className="max-h-full max-w-full object-contain" />
            ) : (
              <img src={selection.image} alt={selection.name} className={`max-h-full max-w-full select-none object-contain ${isCutoutAsset(selection.image) ? 'cutout-image' : ''}`} draggable={false} />
            )}
          </div>
          <div className="flex shrink-0 items-center justify-center gap-5 px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))]" dir="ltr">
            {selection.images.length > 1 && (
              <Button variant="ghost" size="icon" aria-label="התוצר הבא" onClick={() => navigate(1)} className="h-11 w-11 text-background hover:bg-background/10 hover:text-background focus-visible:ring-background"><ChevronLeft /></Button>
            )}
            <span className="min-w-14 text-center text-xs tabular-nums text-background/70" aria-live="polite">{index + 1} / {selection.images.length}</span>
            {selection.images.length > 1 && (
              <Button variant="ghost" size="icon" aria-label="התוצר הקודם" onClick={() => navigate(-1)} className="h-11 w-11 text-background hover:bg-background/10 hover:text-background focus-visible:ring-background"><ChevronRight /></Button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}