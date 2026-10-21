const avatars = Object.values(import.meta.glob<string>('/src/assets/learnai/avatars/avatar-*.png', { eager: true, query: '?url', import: 'default' }));

export function LearnAIAvatars({ onOpen }: { onOpen: (image: string, images: string[]) => void }) {
  return (
    <div aria-label="DotAi — אווטארים והבעות" className="mb-6 flex items-center gap-2 overflow-x-auto py-2 sm:mb-8 sm:justify-between sm:gap-3">
      {avatars.map((src, index) => (
        <button key={src} type="button" onClick={() => onOpen(src, avatars)} aria-label={`הגדלת אווטאר ${index + 1}`} className="h-20 w-20 shrink-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 sm:h-24 sm:w-24">
          <img src={src} alt={`DotAi — אווטאר ${index + 1}`} className="h-full w-full object-contain" loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
  );
}
