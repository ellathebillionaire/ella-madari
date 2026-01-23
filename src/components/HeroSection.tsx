const HeroSection = () => {
  return (
    <section className="min-h-[50vh] md:min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
          Ella Madari
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground tracking-wide">
          Design Portfolio
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
