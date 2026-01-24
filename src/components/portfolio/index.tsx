import Header from './Header';
import Hero from './Hero';
import ProjectHero from './ProjectHero';
import AdditionalWork from './AdditionalWork';
import Footer from './Footer';
import { projects } from '@/data/projects';

const Portfolio = () => {
  // Filter projects that have meaningful visual content
  const displayProjects = projects.filter(
    project => project.heroImage && (project.images.length > 0 || project.video)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main>
        {displayProjects.map((project, index) => (
          <ProjectHero 
            key={project.slug} 
            project={project} 
            index={index}
          />
        ))}
        
        <AdditionalWork />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
