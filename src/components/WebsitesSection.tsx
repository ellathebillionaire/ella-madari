import { useScrollReveal } from '@/hooks/useScrollReveal';
import DesktopMockup from "./DesktopMockup";
import MobileMockup from "./MobileMockup";

interface Website {
  id: string;
  title: string;
  screenshot: string;
  type?: "desktop" | "mobile";
}

interface WebsitesSectionProps {
  websites: Website[];
}

const WebsitesSection = ({ websites }: WebsitesSectionProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.05 });

  const desktopSites = websites.filter((w) => w.type !== "mobile");
  const mobileSites = websites.filter((w) => w.type === "mobile");

  return (
    <section className="portfolio-section bg-muted/20">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 
          ref={titleRef}
          className={`section-title transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          More Websites
        </h2>

        <div 
          ref={contentRef}
          className={`flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Desktop websites */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {desktopSites.map((website, index) => (
              <div 
                key={website.id}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <DesktopMockup
                  screenshot={website.screenshot}
                  title={website.title}
                />
              </div>
            ))}
          </div>

          {/* Mobile websites */}
          {mobileSites.length > 0 && (
            <div className="flex flex-row lg:flex-col gap-8 justify-center lg:justify-start items-center lg:items-start">
              {mobileSites.map((website) => (
                <MobileMockup
                  key={website.id}
                  screenshot={website.screenshot}
                  title={website.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;
