import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface LayoutProps {
  project: Project;
  images: string[];
  onImageClick: (img: string) => void;
}

// ============ LAYOUT TYPE DETECTION ============

type LayoutType = 
  | 'athlete'     // SFD - Fitness/Sports branding
  | 'organic'     // Meshek27 - Organic farm/packaging
  | 'boutique'    // Tali Ter - Beauty/wellness studio
  | 'tech'        // LearnAI - Tech/AI platform
  | 'minimal'     // Studio Alef - Minimalist design studio
  | 'luxury'      // SEN - Jewelry/luxury e-commerce
  | 'mobility'    // EBrider - Electric bikes/transport
  | 'fashion'     // Si Señora - Fashion retail
  | 'agritech';   // BetterSeeds - Agricultural technology

const getLayoutType = (slug: string): LayoutType => {
  const layoutMap: Record<string, LayoutType> = {
    'sfd': 'athlete',
    'meshek27': 'organic',
    'taliter': 'boutique',
    'learnai': 'tech',
    'studioalef': 'minimal',
    'ebrider': 'mobility',

    'sisenora': 'fashion',
    'betterseeds': 'agritech',
  };
  return layoutMap[slug] || 'minimal';
};

// ============ INDIVIDUAL LAYOUTS ============

// SFD - Athletic/Dynamic layout with strong contrast
const AthleteLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-3xl mx-auto">
    {images.length > 0 && (
      <div className="grid grid-cols-12 gap-2.5">
        {/* Large hero - full width */}
        {images[0] && (
          <motion.div 
            className="col-span-12 aspect-[21/9] rounded-lg overflow-hidden cursor-pointer shadow-md"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.01 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
        {/* 3-column product grid */}
        <div className="col-span-12 grid grid-cols-3 gap-2.5 mt-0.5">
          {images.slice(1, 4).map((img, i) => (
            <motion.div
              key={i}
              className="aspect-[4/5] rounded-lg overflow-hidden cursor-pointer shadow-sm"
              onClick={() => onImageClick(img)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        {/* Bottom row */}
        {images.length > 4 && (
          <div className="col-span-12 grid grid-cols-2 gap-2.5">
            {images.slice(4, 6).map((img, i) => (
              <motion.div
                key={i}
                className="aspect-video rounded-lg overflow-hidden cursor-pointer shadow-sm"
                onClick={() => onImageClick(img)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

// Meshek27 - Organic/Natural with asymmetric packaging focus
const OrganicLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-3xl mx-auto">
    {images.length > 0 && (
      <div className="grid grid-cols-12 gap-2.5">
        {/* Main branding image - large left */}
        <motion.div 
          className="col-span-7 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-md"
          onClick={() => onImageClick(images[0])}
          whileHover={{ scale: 1.02 }}
        >
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Right stack - packaging items */}
        <div className="col-span-5 flex flex-col gap-2.5">
          {images.slice(1, 4).map((img, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-lg overflow-hidden cursor-pointer shadow-sm"
              onClick={() => onImageClick(img)}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, x: -3 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom strip */}
        {images.length > 4 && (
          <div className="col-span-12 flex gap-2.5 mt-0.5">
            {images.slice(4).map((img, i) => (
              <motion.div
                key={i}
                className="flex-1 aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm"
                onClick={() => onImageClick(img)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                whileHover={{ scale: 1.04 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

// Tali Ter - Boutique/Elegant with soft rounded frames
const BoutiqueLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto">
    {images.length > 0 && (
      <div className="flex flex-col gap-3">
        {/* Centered main logo/branding */}
        {images[0] && (
          <motion.div 
            className="mx-auto w-full aspect-[16/10] rounded-xl overflow-hidden cursor-pointer shadow-md"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.02 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
        
        {/* Elegant row gallery */}
        <div className="flex justify-center gap-2.5">
          {images.slice(1, 5).map((img, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 rounded-xl overflow-hidden cursor-pointer shadow-sm"
              onClick={() => onImageClick(img)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              whileHover={{ scale: 1.08, y: -4 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// LearnAI - Tech/Modern with card-based interface
const TechLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-3xl mx-auto">
    {images.length > 0 && (
      <div className="grid grid-cols-12 gap-2.5">
        {/* Main desktop mockup */}
        {images[0] && (
          <motion.div 
            className="col-span-8 aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg border border-border/20 bg-card"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.02, y: -3 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
        
        {/* Side cards - mascot & icons */}
        <div className="col-span-4 flex flex-col gap-2.5">
          {images.slice(1, 3).map((img, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-lg overflow-hidden cursor-pointer shadow-md border border-border/15 bg-card"
              onClick={() => onImageClick(img)}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, x: -3 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom row - additional assets */}
        {images.length > 3 && (
          <div className="col-span-12 flex gap-2.5 justify-center">
            {images.slice(3).map((img, i) => (
              <motion.div
                key={i}
                className="w-24 h-16 rounded-lg overflow-hidden cursor-pointer shadow-sm border border-border/15"
                onClick={() => onImageClick(img)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ scale: 1.06 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

// Studio Alef - Ultra minimal centered layout
const MinimalLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
    {images.length > 0 && images[0] && (
      <motion.div 
        className="w-full aspect-[16/9] rounded-xl overflow-hidden cursor-pointer shadow-lg"
        onClick={() => onImageClick(images[0])}
        whileHover={{ scale: 1.02 }}
      >
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </motion.div>
    )}
    
    {images.length > 1 && (
      <div className="flex gap-3">
        {images.slice(1).map((img, i) => (
          <motion.div
            key={i}
            className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer shadow-md"
            onClick={() => onImageClick(img)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.1 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

// SEN - Luxury jewelry with desktop + mobile duo
const LuxuryLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto">
    {images.length > 0 && (
      <div className="flex gap-3 items-center justify-center">
        {/* Main website - desktop */}
        {images[0] && (
          <motion.div 
            className="flex-1 max-w-md aspect-[16/10] rounded-xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.02 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover object-top" />
          </motion.div>
        )}
        
        {/* Mobile mockup */}
        {images[1] && (
          <motion.div 
            className="w-20 aspect-[9/19] rounded-2xl overflow-hidden cursor-pointer shadow-md border-2 border-foreground/10"
            onClick={() => onImageClick(images[1])}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, y: -5 }}
          >
            <img src={images[1]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </div>
    )}
  </div>
);

// EBrider - Mobility/Product showcase
const MobilityLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto">
    {images.length > 0 && (
      <div className="grid grid-cols-12 gap-2.5">
        {/* Hero product shot */}
        {images[0] && (
          <motion.div 
            className="col-span-12 aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.01 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
        
        {/* 2-up product details */}
        <div className="col-span-12 grid grid-cols-2 gap-2.5">
          {images.slice(1, 3).map((img, i) => (
            <motion.div
              key={i}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-sm"
              onClick={() => onImageClick(img)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Si Señora - Fashion retail with editorial grid
const FashionLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto">
    {images.length > 0 && (
      <div className="grid grid-cols-12 gap-2.5">
        {/* Shop interior - wide */}
        {images[0] && (
          <motion.div 
            className="col-span-7 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.02 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
        
        {/* Website/digital presence */}
        {images[1] && (
          <motion.div 
            className="col-span-5 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md"
            onClick={() => onImageClick(images[1])}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={images[1]} alt="" className="w-full h-full object-cover object-top" />
          </motion.div>
        )}
      </div>
    )}
  </div>
);

// BetterSeeds - AgriTech with icon/website focus
const AgritechLayout = ({ project, images, onImageClick }: LayoutProps) => (
  <div className="w-full max-w-2xl mx-auto">
    {images.length > 0 && (
      <div className="flex flex-col gap-2.5">
        {/* Icons/infographic main */}
        {images[0] && (
          <motion.div 
            className="w-full aspect-video rounded-lg overflow-hidden cursor-pointer shadow-md bg-card border border-border/20"
            onClick={() => onImageClick(images[0])}
            whileHover={{ scale: 1.01 }}
          >
            <img src={images[0]} alt="" className="w-full h-full object-contain" />
          </motion.div>
        )}
        
        {/* Website screenshot if exists */}
        {images[1] && (
          <motion.div 
            className="w-full aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg"
            onClick={() => onImageClick(images[1])}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
          >
            <img src={images[1]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </div>
    )}
  </div>
);

// ============ FACTORY FUNCTION ============

export const getProjectLayout = (project: Project, images: string[], onImageClick: (img: string) => void) => {
  const layoutType = getLayoutType(project.slug);
  const props: LayoutProps = { project, images, onImageClick };
  
  switch (layoutType) {
    case 'athlete':
      return <AthleteLayout {...props} />;
    case 'organic':
      return <OrganicLayout {...props} />;
    case 'boutique':
      return <BoutiqueLayout {...props} />;
    case 'tech':
      return <TechLayout {...props} />;
    case 'minimal':
      return <MinimalLayout {...props} />;
    case 'luxury':
      return <LuxuryLayout {...props} />;
    case 'mobility':
      return <MobilityLayout {...props} />;
    case 'fashion':
      return <FashionLayout {...props} />;
    case 'agritech':
      return <AgritechLayout {...props} />;
    default:
      return <MinimalLayout {...props} />;
  }
};

export default getProjectLayout;
