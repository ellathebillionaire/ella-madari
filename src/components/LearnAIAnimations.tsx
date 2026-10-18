import LazyVideo from '@/components/LazyVideo';
import character1 from '@/assets/learnai/character-1.mp4';
import character2 from '@/assets/learnai/character-2.mp4';
import character3 from '@/assets/learnai/character-3.mp4';
import character4 from '@/assets/learnai/character-4.mp4';

const characters = [character1, character2, character3, character4];

export function LearnAIAnimations() {
  return (
    <div aria-label="Learn AI — ארבע אנימציות של הדמות" className="mb-6 grid grid-cols-2 items-center gap-3 sm:mb-8 sm:grid-cols-4 sm:gap-5">
      {characters.map((src, index) => (
        <div key={src} role="img" aria-label={`אנימציית דמות ${index + 1}`} className="aspect-[36/29] min-w-0 overflow-hidden mix-blend-multiply brightness-105">
          <LazyVideo src={src} className="h-full w-full object-contain" />
        </div>
      ))}
    </div>
  );
}
