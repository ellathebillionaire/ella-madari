import { useState } from 'react';

interface ProjectCardProps {
  name: string;
  logo?: string;
  monogram?: string;
  website?: string;
  mockups?: string[];
  video?: string;
  colors?: string[];
}

const ProjectCard = ({ name, logo, monogram, website, mockups = [], video, colors = [] }: ProjectCardProps) => {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  
  // Collect all images for this project
  const allImages = [
    ...(logo ? [{ src: logo, type: 'logo' }] : []),
    ...(monogram ? [{ src: monogram, type: 'monogram' }] : []),
    ...(website ? [{ src: website, type: 'website' }] : []),
    ...mockups.map(m => ({ src: m, type: 'mockup' })),
  ];

  return (
    <div className="group">
      {/* Project Header */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xs font-medium tracking-wide text-foreground">{name}</h3>
        {colors.length > 0 && (
          <div className="flex gap-1">
            {colors.slice(0, 4).map((color, i) => (
              <div 
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {allImages.slice(0, 6).map((img, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg bg-muted cursor-pointer transition-all duration-300 ${
              img.type === 'website' ? 'col-span-2 row-span-2' : 
              img.type === 'logo' && !monogram ? 'col-span-2' : ''
            }`}
            onMouseEnter={() => setHoveredImg(index)}
            onMouseLeave={() => setHoveredImg(null)}
          >
            <div className={`${img.type === 'website' ? 'aspect-[16/10]' : 'aspect-square'} overflow-hidden`}>
              <img
                src={img.src}
                alt={`${name} ${img.type}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hoveredImg === index ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
          </div>
        ))}
        
        {/* Video thumbnail if exists */}
        {video && (
          <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
