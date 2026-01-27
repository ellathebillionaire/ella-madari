import { useState } from "react";

interface DesktopMockupProps {
  screenshot: string;
  title: string;
}

const DesktopMockup = ({ screenshot, title }: DesktopMockupProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="desktop-mockup cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={title}
    >
      {/* Browser Bar */}
      <div className="desktop-browser-bar">
        <div className="browser-dot bg-[#FF5F57]" />
        <div className="browser-dot bg-[#FEBC2E]" />
        <div className="browser-dot bg-[#28C840]" />
        <div className="flex-1 mx-6 md:mx-10">
          <div className="h-5 md:h-6 bg-background/40 rounded-lg max-w-[180px] mx-auto" />
        </div>
      </div>
      
      {/* Screenshot Container - 16:9 ratio */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={screenshot}
          alt={title}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
};

export default DesktopMockup;
