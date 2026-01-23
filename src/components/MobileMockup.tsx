interface MobileMockupProps {
  screenshot: string;
  title: string;
}

const MobileMockup = ({ screenshot, title }: MobileMockupProps) => {
  return (
    <div className="group">
      {/* Phone Frame - Premium iPhone style */}
      <div className="relative mx-auto w-[200px] md:w-[240px] bg-foreground rounded-[3rem] p-[6px] transition-all duration-700 ease-out group-hover:scale-[1.02]"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground rounded-full z-10" />
        
        {/* Screen */}
        <div className="relative rounded-[2.6rem] overflow-hidden bg-secondary aspect-[9/19.5]">
          <img
            src={screenshot}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
      </div>
      
      {/* Title - hidden visually but accessible */}
      <span className="sr-only">{title}</span>
    </div>
  );
};

export default MobileMockup;
