import { useEffect, useRef, useState } from 'react';

// Loads and plays a muted loop only near the viewport, pauses it off-screen.
const LazyVideo = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      autoPlay={load}
      loop
      muted
      playsInline
      preload={load ? 'auto' : 'none'}
      className={className}
    />
  );
};

export default LazyVideo;
