// Meshek 27 - Organic Farm Branding
import meshek27WallLogo from '@/assets/meshek27/wall-logo.png';
import meshek27LogoClean from '@/assets/meshek27/logo-clean.jpg';
import meshek27BrandingFull from '@/assets/meshek27/branding-full.jpg';
import meshek27AppIcons from '@/assets/meshek27/app-icons.jpg';
import meshek27BoxVegetables from '@/assets/meshek27/box-vegetables.jpg';
import meshek27TshirtMockup from '@/assets/meshek27/tshirt-mockup.jpg';
import meshek27WallSignage from '@/assets/meshek27/wall-signage.jpg';
import meshek27LogoGraphic from '@/assets/meshek27/logo-graphic.jpg';
import meshek27BoxDesign from '@/assets/meshek27/box-design.jpg';

export const meshek27Project = {
  slug: 'meshek27',
  name: 'משק 27',
  category: 'branding' as const,
  description: 'מיתוג מלא לחווה אורגנית',
  logo: meshek27LogoClean,
  monogram: meshek27AppIcons,
  heroImage: meshek27BrandingFull,
  bgColor: '#F5F8F3',
  accentColor: '#4A7C3F',
  colors: ['#4A7C3F', '#8BC34A', '#F5F5DC'],
  images: [
    meshek27WallLogo,
    meshek27WallSignage,
    meshek27BoxVegetables,
    meshek27BoxDesign,
    meshek27TshirtMockup,
    meshek27LogoGraphic,
    meshek27AppIcons,
  ],
};

export default meshek27Project;
