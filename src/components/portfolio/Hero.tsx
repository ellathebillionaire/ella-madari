import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-16">
      <div className="text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.04em]"
        >
          Ella Madari
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-muted-foreground text-sm tracking-[0.2em] uppercase font-light"
        >
          Graphic Design & Branding
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20"
        >
          <div className="w-px h-20 mx-auto bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
