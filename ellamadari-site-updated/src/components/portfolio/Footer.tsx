import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 md:py-32 border-t border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
          © {new Date().getFullYear()} Ella Madari
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
