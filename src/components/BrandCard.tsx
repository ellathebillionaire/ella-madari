import { Link } from 'react-router-dom';

interface BrandCardProps {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  bgColor: string;
  accentColor?: string;
}

const BrandCard = ({ slug, name, logo, heroImage, bgColor }: BrandCardProps) => {
  return (
    <Link 
      to={`/project/${slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      style={{ backgroundColor: bgColor }}
    >
      {/* Hero Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={heroImage} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      {/* Footer with logo and name */}
      <div 
        className="px-4 py-3 flex items-center justify-between gap-2"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-xs font-medium text-gray-700 truncate">{name}</span>
        <div className="h-5 w-auto flex-shrink-0">
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
