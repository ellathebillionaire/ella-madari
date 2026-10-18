import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react';
import { clearLogoBackground } from '@/lib/logoTransparency';

const cache = new Map<string, string>();

/** Apply transparency at display time without modifying the supplied brand asset. */
export function LogoImage({ src, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [processed, setProcessed] = useState<{ source: string; url: string } | null>(null);
  const displaySrc = src && (cache.get(src) || (processed?.source === src ? processed.url : src));
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    onLoad?.(event);
    if (!src || cache.has(src) || processed?.source === src) return;
    const image = event.currentTarget;
    try {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, 960 / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      if (!clearLogoBackground(pixels.data, canvas.width, canvas.height)) return;
      context.putImageData(pixels, 0, 0);
      const url = canvas.toDataURL('image/png');
      cache.set(src, url);
      setProcessed({ source: src, url });
    } catch {
      // Unsupported or cross-origin sources retain the original logo.
    }
  };
  return <img {...props} src={displaySrc || undefined} onLoad={handleLoad} />;
}
