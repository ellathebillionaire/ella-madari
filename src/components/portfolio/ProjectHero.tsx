import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectHeroProps {
  project: Project;
  index: number;
}

const ProjectHero = ({ project, index }: ProjectHeroProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Project Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            {project.category === 'branding' ? 'Branding' : project.category === 'website' ? 'Web Design' : 'Print'}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight">
            {project.name}
          </h2>
          {project.description && (
            <p className="text-muted-foreground text-sm md:text-base mt-3 font-light max-w-md">
              {project.description}
            </p>
          )}
        </motion.div>

        {/* Main Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-muted"
        >
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-auto object-cover"
            loading={index < 2 ? "eager" : "lazy"}
          />
        </motion.div>

        {/* Images Grid */}
        {project.images.length > 0 && (
          <div className={`grid gap-4 md:gap-6 mt-6 ${
            project.images.length === 1 ? 'grid-cols-1 max-w-3xl' :
            project.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            project.images.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
            'grid-cols-2 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {project.images.map((image, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * imgIndex }}
                className="overflow-hidden rounded-xl md:rounded-2xl bg-muted"
              >
                <img
                  src={image}
                  alt={`${project.name} ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Video if exists */}
        {project.video && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 overflow-hidden rounded-xl md:rounded-2xl"
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default ProjectHero;
