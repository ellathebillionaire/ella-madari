import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const packages = [
  {
    name: 'Brand-to-Commerce Audit',
    price: '$650 – $2,000',
    tagline: 'Entry diagnostic',
    description:
      'A sharp audit of your brand, product, Shopify store, product page, offer, copy, UX and AI readiness — delivered as a premium PDF scorecard with quick wins and a clear action plan.',
    bullets: [
      '25-point Brand-to-Commerce Scorecard',
      'Conversion & trust gap analysis',
      'Prioritized 90-day action plan',
    ],
  },
  {
    name: 'Premium Product Launch Sprint',
    price: '$4,800 – $12,000',
    tagline: 'Flagship offer',
    featured: true,
    description:
      'A 2–4 week sprint to take a product brand from half-baked to premium and launch-ready: identity, product language, copy, product page, landing page, packaging, Shopify structure, AI content workflow and launch.',
    bullets: [
      'Brand identity or focused rebrand',
      'Shopify product & landing pages',
      'Launch-ready content & AI workflow',
    ],
  },
  {
    name: 'AI Commerce Brand System',
    price: '$9,500 – $24,000',
    tagline: 'Full system',
    description:
      'A complete operating system for serious product brands: Brand DNA, Shopify UX, prompt library, copy templates, design templates, product pages, content engine and launch playbook for your team.',
    bullets: [
      'Brand DNA & visual system',
      'Prompt library & content engine',
      'Team playbook & launch ops',
    ],
  },
];

const scorecardPillars = [
  'Positioning',
  'Differentiation',
  'Value proposition',
  'Packaging',
  'Product page',
  'Sales copy',
  'UX & trust',
  'AI readiness',
  'Content system',
  'Launch ops',
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight">Ella Madari</span>
          <a
            href="#contact"
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Start a project
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-28 md:pt-56 md:pb-40 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground font-light mb-8"
          >
            Premium Product Brand Architect — Shopify & AI Commerce
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[-0.04em] leading-[1.05]"
          >
            Premium product brands,<br />
            <span className="text-muted-foreground">engineered to sell.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed"
          >
            I take product brands that look half-baked and turn them into premium,
            launch-ready businesses — with branding, product, Shopify, copy, AI
            and a full launch system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#packages"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See the system
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#scorecard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-border hover:bg-secondary transition-colors"
            >
              Get the Scorecard
            </a>
          </motion.div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-28 md:py-40 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10"
          >
            The positioning
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-extralight tracking-[-0.03em] leading-tight"
          >
            Not a design studio. Not an AI consultant. Not a Shopify shop.
            <span className="block mt-6 text-muted-foreground">
              A product-brand architect for premium DTC and Shopify brands —
              branding, product, copy, AI and launch, in one system.
            </span>
          </motion.h2>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-28 md:py-40 px-6 bg-secondary/50 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Three offers
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[-0.03em]">
              The Premium Product Brand System
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex flex-col p-8 md:p-10 rounded-3xl border bg-background ${
                  pkg.featured
                    ? 'border-foreground shadow-[0_25px_80px_-20px_hsl(0_0%_0%/0.15)]'
                    : 'border-border'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] uppercase bg-foreground text-background px-3 py-1 rounded-full">
                    Flagship
                  </span>
                )}
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  {pkg.tagline}
                </p>
                <h3 className="text-xl md:text-2xl font-light tracking-tight mb-3">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground/60" />
                      <span className="text-foreground/80">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Investment
                  </p>
                  <p className="text-base font-light">{pkg.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard */}
      <section id="scorecard" className="py-28 md:py-40 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              The diagnostic
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[-0.03em] leading-tight mb-8">
              The Brand-to-Commerce Scorecard.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8">
              25 criteria across positioning, product, offer, UX, copy, trust and
              AI readiness. A single score that tells you exactly where your
              brand is leaking conversions — and what to fix first.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Request the scorecard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {scorecardPillars.map((p) => (
              <div
                key={p}
                className="bg-background p-5 text-sm font-light tracking-tight text-foreground/80"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Authority */}
      <section className="py-28 md:py-40 px-6 bg-secondary/50 border-y border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
            The promise
          </p>
          <p className="text-2xl md:text-4xl font-extralight tracking-[-0.02em] leading-snug">
            “I walk into a product brand that looks half-baked — and walk out
            with a premium brand ready to sell: identity, product, site, copy,
            AI and a launch system.”
          </p>
          <p className="mt-10 text-sm tracking-[0.25em] uppercase text-muted-foreground">
            — Ella Madari
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-28 md:py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[-0.03em] leading-tight">
            Ready to look premium and sell like it?
          </h2>
          <p className="mt-6 text-muted-foreground font-light max-w-xl mx-auto">
            Start with a Brand-to-Commerce Audit. You'll get a sharp, honest
            view of your brand and a clear plan to launch.
          </p>
          <a
            href="mailto:hello@ellamadari.com?subject=Brand-to-Commerce%20Audit"
            className="mt-10 inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Book an audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wide">
          <span>© {new Date().getFullYear()} Ella Madari</span>
          <span className="tracking-[0.2em] uppercase">
            Premium Product Brand System
          </span>
          <a href="mailto:hello@ellamadari.com" className="hover:text-foreground transition-colors">
            hello@ellamadari.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
