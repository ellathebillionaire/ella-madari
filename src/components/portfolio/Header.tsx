import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <span className="text-sm font-medium tracking-tight">
          Ella Madari
        </span>
        <span className="text-xs text-muted-foreground tracking-wide">
          Design Portfolio
        </span>
      </div>
    </motion.header>
  );
};

export default Header;
