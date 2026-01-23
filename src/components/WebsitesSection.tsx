import DesktopMockup from "./DesktopMockup";

interface Website {
  id: string;
  title: string;
  screenshot: string;
}

interface WebsitesSectionProps {
  websites: Website[];
}

const WebsitesSection = ({ websites }: WebsitesSectionProps) => {
  return (
    <section className="portfolio-section">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Websites</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {websites.map((website) => (
            <DesktopMockup
              key={website.id}
              screenshot={website.screenshot}
              title={website.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;
