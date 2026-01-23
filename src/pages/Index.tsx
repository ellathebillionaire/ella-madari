import ProjectCarousel from '@/components/ProjectCarousel';
import { additionalWork } from '@/data/projects';

const Index = () => {
  return (
    <main className="bg-[#fafafa]">
      {/* Main Carousel Section */}
      <ProjectCarousel />

      {/* More Work Section */}
      <section className="px-6 md:px-10 py-16 border-t border-gray-200/50">
        <p className="text-[10px] text-[#86868b] tracking-[0.15em] uppercase mb-6">
          More Work
        </p>
        
        {/* Websites */}
        <div className="flex items-end gap-3 flex-wrap mb-6">
          {additionalWork.websites.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-6 bg-gray-100 flex items-center px-2 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <div className="w-40 aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Print Work */}
        <div className="flex items-center gap-2 flex-wrap">
          {additionalWork.print.map((item, index) => (
            <div 
              key={index}
              className="w-14 aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 border-t border-gray-200/30">
        <p className="text-[9px] text-[#86868b]/60 tracking-[0.15em] uppercase">
          © 2024 Ella Madari
        </p>
      </footer>
    </main>
  );
};

export default Index;
