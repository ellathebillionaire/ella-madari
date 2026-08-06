import { Link } from 'react-router-dom';

interface BrandCardProps {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  bgColor: string;
}

const BrandCard = ({ slug, name, logo, heroImage, bgColor }: BrandCardProps) => {
  return (
    <Link 
      to={`/project/${slug}`}
      className="group block overflow-hidden transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Container - consistent rounded corners */}
      <div 
        className="rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-500"
        style={{ backgroundColor: bgColor }}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={heroImage} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      
      {/* Footer - outside the card for cleaner look */}
      <div className="mt-3 px-1 flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-gray-600 tracking-wide">{name}</span>
        <div className="h-4 w-auto opacity-60 group-hover:opacity-100 transition-opacity">
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
