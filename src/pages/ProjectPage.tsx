import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">הפרויקט לא נמצא</h1>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-black/5"
        style={{ backgroundColor: `${project.bgColor}CC` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>חזרה</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{project.name}</span>
            <img src={project.logo} alt="" className="h-6 w-auto object-contain" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-6"
        style={{ backgroundColor: project.bgColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={project.logo} 
              alt={project.name}
              className="h-16 w-auto mx-auto object-contain"
            />
          </div>
          
          {/* Name & Description */}
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-lg text-gray-600">{project.description}</p>
          )}
          
          {/* Monogram */}
          {project.monogram && (
            <div className="mt-8">
              <img 
                src={project.monogram} 
                alt=""
                className="h-20 w-20 mx-auto rounded-xl object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      {project.video && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <video 
              src={project.video} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </section>
      )}

      {/* Website Preview */}
      {project.website && (
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="h-8 bg-gray-100 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <img 
                src={project.website} 
                alt="Website preview"
                className="w-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((img, index) => (
              <div 
                key={index}
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={img} 
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← חזרה לכל הפרויקטים
          </Link>
          <p className="text-xs text-gray-400">© 2024 Ella Madari</p>
        </div>
      </footer>
    </main>
  );
};

export default ProjectPage;
