import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      <div className="text-center relative z-10 px-6">
        <div 
          className={`transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.04em] text-foreground">
            Ella Madari
          </h1>
        </div>
        
        <div 
          className={`transition-all duration-1000 delay-300 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="mt-6 md:mt-8 text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase font-light">
            Design Portfolio
          </p>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-muted-foreground/0 via-muted-foreground/30 to-muted-foreground/0 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
