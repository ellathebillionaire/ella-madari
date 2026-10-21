export const learnAIAvatars = Object.values(import.meta.glob<string>('/src/assets/learnai/avatars/avatar-*-cutout.webp', { eager: true, query: '?url', import: 'default' }));

export function LearnAIAvatars({ onOpen }: { onOpen: (image: string, images: string[]) => void }) {
  return (
    <div aria-label="DotAi — אווטארים והבעות" className="project-avatars transparent-avatars-row">
      {learnAIAvatars.map((src, index) => (
        <button key={src} type="button" onClick={() => onOpen(src, learnAIAvatars)} aria-label={`הגדלת אווטאר ${index + 1}`} className="transparent-avatar">
          <img src={src} alt={`DotAi — אווטאר ${index + 1}`} className="cutout-image" loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
  );
}
