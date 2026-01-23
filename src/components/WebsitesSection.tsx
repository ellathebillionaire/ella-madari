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
  const desktopSites = websites.filter((w) => w.type !== "mobile");
  const mobileSites = websites.filter((w) => w.type === "mobile");

  return (
    <section className="portfolio-section">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Websites</h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop websites */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {desktopSites.map((website) => (
              <DesktopMockup
                key={website.id}
                screenshot={website.screenshot}
                title={website.title}
              />
            ))}
          </div>

          {/* Mobile websites */}
          {mobileSites.length > 0 && (
            <div className="flex flex-row lg:flex-col gap-6 justify-center lg:justify-start items-center lg:items-start">
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
