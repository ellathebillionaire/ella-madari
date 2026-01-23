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
        <div className="browser-dot bg-red-400" />
        <div className="browser-dot bg-yellow-400" />
        <div className="browser-dot bg-green-400" />
        <div className="flex-1 mx-4 md:mx-8">
          <div className="h-4 md:h-5 bg-background/60 rounded-md max-w-[200px] mx-auto" />
        </div>
      </div>
      
      {/* Screenshot Container */}
      <div className="relative overflow-hidden aspect-[16/10]">
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
