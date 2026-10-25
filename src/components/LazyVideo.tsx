import { useEffect, useRef, useState } from 'react';

// Fetch a little ahead of scrolling, but play only while actually on screen.
const LazyVideo = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };
    const warmup = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoad(true);
        warmup.disconnect();
      }
    }, { rootMargin: '100px' });
    const playback = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    warmup.observe(el);
    playback.observe(el);
    el.addEventListener('loadeddata', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      warmup.disconnect();
      playback.disconnect();
      el.removeEventListener('loadeddata', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      el.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      loop
      muted
      playsInline
      preload={load ? 'metadata' : 'none'}
      className={className}
    />
  );
};

export default LazyVideo;
