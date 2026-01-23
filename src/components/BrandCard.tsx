import { Link } from 'react-router-dom';

interface BrandCardProps {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  bgColor: string;
  accentColor?: string;
}

const BrandCard = ({ slug, name, logo, heroImage, bgColor, accentColor }: BrandCardProps) => {
  return (
    <Link 
      to={`/project/${slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative aspect-[3/4] p-6 flex flex-col">
        {/* Accent circle behind product */}
        {accentColor && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: accentColor }}
          />
        )}
        
        {/* Hero image/mockup */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <img 
            src={heroImage} 
            alt={name}
            className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
          />
        </div>
        
        {/* Brand name & logo */}
        <div className="relative z-10 mt-auto pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800 tracking-wide">{name}</h3>
            <div className="h-6 w-auto">
              <img 
                src={logo} 
                alt={`${name} logo`}
                className="h-full w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
