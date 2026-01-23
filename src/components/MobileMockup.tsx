interface MobileMockupProps {
  screenshot: string;
  title: string;
}

const MobileMockup = ({ screenshot, title }: MobileMockupProps) => {
  return (
    <div className="group">
      {/* Phone Frame */}
      <div className="relative mx-auto w-[180px] md:w-[220px] bg-foreground rounded-[2.5rem] p-2 shadow-[var(--shadow-elevated)] transition-all duration-500 group-hover:scale-[1.02]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary aspect-[9/19.5]">
          <img
            src={screenshot}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
      </div>
      
      {/* Title - hidden visually but accessible */}
      <span className="sr-only">{title}</span>
    </div>
  );
};

export default MobileMockup;
