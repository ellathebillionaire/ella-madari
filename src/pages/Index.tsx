import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const packages = [
  {
    index: '01',
    name: 'Brand-to-Commerce Audit',
    kind: 'Diagnostic',
    duration: '1 week',
    price: '$650 – $2,000',
    description:
      'A sharp diagnostic of your brand, product, Shopify store, offer, copy, UX and AI readiness. Delivered as a premium scorecard with quick wins and a 90-day action plan.',
    deliverables: [
      '25-point Brand-to-Commerce Scorecard',
      'Conversion & trust gap analysis',
      'Prioritized 90-day action plan',
    ],
  },
  {
    index: '02',
    name: 'Premium Product Launch Sprint',
    kind: 'Flagship',
    duration: '2 – 4 weeks',
    price: '$4,800 – $12,000',
    featured: true,
    description:
      'An intensive sprint that takes a product brand from half-baked to premium and launch-ready. Identity, product language, Shopify pages, copy, packaging, AI workflow and launch.',
    deliverables: [
      'Brand identity or focused rebrand',
      'Shopify product & landing pages',
      'Launch-ready content & AI workflow',
    ],
  },
  {
    index: '03',
    name: 'AI Commerce Brand System',
    kind: 'System',
    duration: '6 – 12 weeks',
    price: '$9,500 – $24,000',
    description:
      'A full operating system for serious product brands. Brand DNA, Shopify UX, prompt library, copy and design templates, content engine and a launch playbook for your team.',
    deliverables: [
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

const principles = [
  {
    n: '01',
    t: 'Brand is built to sell.',
    d: 'Identity, copy and UX are designed against the same target: a premium brand that converts.',
  },
  {
    n: '02',
    t: 'One system, not a service menu.',
    d: 'A small set of high-leverage deliverables instead of an endless list of tasks.',
  },
  {
    n: '03',
    t: 'AI is infrastructure, not decoration.',
    d: 'Prompt libraries, content engines and workflows your team can actually operate.',
  },
  {
    n: '04',
    t: 'Premium is in the details.',
    d: 'Typography, rhythm, restraint. Nothing on the page is accidental.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      {/* Top utility bar */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-8 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          <span>Est. Tel Aviv</span>
          <span>Premium Product Brand System / Vol. I</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 md:top-8 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl leading-none tracking-tight">Ella</span>
            <span className="font-serif italic text-2xl leading-none tracking-tight text-muted-foreground">
              Madari
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <a href="#principles" className="hover:text-foreground transition-colors">Principles</a>
            <a href="#packages" className="hover:text-foreground transition-colors">System</a>
            <a href="#scorecard" className="hover:text-foreground transition-colors">Scorecard</a>
          </nav>
          <a
            href="#contact"
            className="text-xs tracking-[0.2em] uppercase border-b border-foreground/40 pb-0.5 hover:border-foreground transition-colors"
          >
            Enquire
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="pt-44 md:pt-64 pb-32 md:pb-48 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-16"
          >
            <span className="w-12 h-px bg-foreground/40" />
            <span>A studio of one. For premium product brands.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            className="font-serif text-[clamp(2.75rem,9vw,9rem)] leading-[0.95] tracking-[-0.02em]"
          >
            Premium product brands,
            <br />
            <span className="italic text-muted-foreground">engineered to sell.</span>
          </motion.h1>

          <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="md:col-span-5 md:col-start-1"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                The practice
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
                I take product brands that look half-baked and turn them into
                premium, launch-ready businesses. Branding, Shopify, copy, AI
                and a full launch system - delivered as one quiet, considered
                whole.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="md:col-span-5 md:col-start-8 flex md:justify-end items-end gap-6"
            >
              <a
                href="#packages"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-tight hover:opacity-90 transition-opacity"
              >
                See the system
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#scorecard"
                className="text-xs tracking-[0.25em] uppercase border-b border-foreground/40 pb-0.5 hover:border-foreground transition-colors"
              >
                The Scorecard
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="border-y border-border/60 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <span>Brand strategy</span>
          <span>·</span>
          <span>Shopify systems</span>
          <span>·</span>
          <span>Conversion copy</span>
          <span>·</span>
          <span>AI workflows</span>
          <span>·</span>
          <span>Launch ops</span>
          <span>·</span>
          <span>Packaging</span>
        </div>
      </section>

      {/* Positioning manifesto */}
      <section className="py-32 md:py-48 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § 01 / Manifesto
            </p>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.015em]"
            >
              Not a design studio. Not an AI consultant. Not a Shopify shop.
              <span className="block mt-8 italic text-muted-foreground">
                A product-brand architect for premium DTC and Shopify brands -
                branding, product, copy, AI and launch, in one considered
                system.
              </span>
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="py-24 md:py-32 px-6 md:px-8 border-t border-border/60">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="md:col-span-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                § 02 / Principles
              </p>
            </div>
            <h3 className="md:col-span-9 font-serif text-2xl md:text-3xl tracking-tight">
              Four ideas that shape every engagement.
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border/80">
            {principles.map((p) => (
              <div
                key={p.n}
                className="bg-background p-8 md:p-12 min-h-[220px] flex flex-col"
              >
                <span className="font-serif italic text-sm text-muted-foreground mb-6">
                  {p.n}
                </span>
                <h4 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-4">
                  {p.t}
                </h4>
                <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-md">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-32 md:py-48 px-6 md:px-8 border-t border-border/60 bg-[hsl(var(--surface-elevated))]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-28">
            <div className="md:col-span-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                § 03 / The System
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em]">
                The Premium Product
                <br />
                <span className="italic text-muted-foreground">Brand System.</span>
              </h2>
              <p className="mt-8 max-w-xl text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                Three engagements. One trajectory - from diagnostic to launch
                to fully systemised brand operations.
              </p>
            </div>
          </div>

          <div className="border-t border-border/80">
            {packages.map((pkg, i) => (
              <motion.article
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className={`group grid md:grid-cols-12 gap-6 md:gap-8 py-12 md:py-16 border-b border-border/80 transition-colors ${
                  pkg.featured ? 'bg-background -mx-6 md:-mx-8 px-6 md:px-8' : ''
                }`}
              >
                <div className="md:col-span-1">
                  <span className="font-serif italic text-base text-muted-foreground">
                    {pkg.index}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 flex items-center gap-3">
                    <span>{pkg.kind}</span>
                    {pkg.featured && (
                      <span className="px-2 py-0.5 border border-foreground/30 rounded-full text-foreground/70 text-[9px]">
                        Flagship
                      </span>
                    )}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className="mt-4 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {pkg.duration}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm md:text-base font-light leading-relaxed text-foreground/80 mb-6">
                    {pkg.description}
                  </p>
                  <ul className="space-y-2 text-sm font-light text-muted-foreground">
                    {pkg.deliverables.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="text-foreground/40">—</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3 flex md:flex-col md:items-end justify-between md:justify-start gap-4">
                  <div className="md:text-right">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                      Investment
                    </p>
                    <p className="font-serif text-2xl md:text-3xl tracking-tight">
                      {pkg.price}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="md:mt-auto inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border-b border-foreground/40 pb-0.5 hover:border-foreground transition-colors"
                  >
                    Enquire
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard */}
      <section id="scorecard" className="py-32 md:py-48 px-6 md:px-8 border-t border-border/60">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § 04 / Diagnostic
            </p>
          </div>
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
              The Brand-to-Commerce
              <span className="italic text-muted-foreground"> Scorecard.</span>
            </h2>
            <p className="mt-8 text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-md">
              Twenty-five criteria across positioning, product, offer, UX, copy,
              trust and AI readiness. A single score that tells you exactly
              where your brand is leaking conversions - and what to fix first.
            </p>
            <a
              href="#contact"
              className="mt-10 group inline-flex items-center gap-3 text-sm tracking-tight border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
            >
              Request the scorecard
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <ol className="md:col-span-5">
            {scorecardPillars.map((p, i) => (
              <li
                key={p}
                className="flex items-baseline justify-between gap-6 py-4 border-b border-border/80"
              >
                <span className="font-serif italic text-sm text-muted-foreground w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-xl md:text-2xl tracking-tight flex-1">
                  {p}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Pillar
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promise / pull quote */}
      <section className="py-32 md:py-48 px-6 md:px-8 border-t border-border/60 bg-[hsl(var(--surface-elevated))]">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § 05 / Promise
            </p>
          </div>
          <div className="md:col-span-9">
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.015em]">
              <span className="text-muted-foreground">"</span>
              I walk into a product brand that looks half-baked
              <span className="italic"> and walk out with a premium brand ready to sell </span>
              - identity, product, site, copy, AI and a launch system.
              <span className="text-muted-foreground">"</span>
            </blockquote>
            <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Ella Madari, founder
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-8 border-t border-border/60">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § 06 / Enquire
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-[-0.02em]">
              Ready to look premium
              <br />
              <span className="italic text-muted-foreground">and sell like it?</span>
            </h2>
            <p className="mt-10 max-w-xl text-base md:text-lg font-light text-muted-foreground leading-relaxed">
              Start with a Brand-to-Commerce Audit. A sharp, honest view of your
              brand - and a clear plan to launch.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="mailto:hello@ellamadari.com?subject=Brand-to-Commerce%20Audit"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm tracking-tight hover:opacity-90 transition-opacity"
              >
                Book an audit
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="mailto:hello@ellamadari.com"
                className="text-sm tracking-tight border-b border-foreground/40 pb-0.5 hover:border-foreground transition-colors"
              >
                hello@ellamadari.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <a href="#top" className="flex items-baseline gap-2">
              <span className="font-serif text-3xl leading-none tracking-tight">Ella</span>
              <span className="font-serif italic text-3xl leading-none tracking-tight text-muted-foreground">
                Madari
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm font-light text-muted-foreground leading-relaxed">
              A studio of one designing premium product brands for Shopify and
              AI commerce.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Navigate
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#principles" className="hover:text-muted-foreground transition-colors">Principles</a></li>
              <li><a href="#packages" className="hover:text-muted-foreground transition-colors">System</a></li>
              <li><a href="#scorecard" className="hover:text-muted-foreground transition-colors">Scorecard</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@ellamadari.com" className="hover:text-muted-foreground transition-colors">hello@ellamadari.com</a></li>
              <li className="text-muted-foreground">Tel Aviv / Worldwide</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Index
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Vol. I</li>
              <li>{new Date().getFullYear()}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Ella Madari. All rights reserved.</span>
          <span>Premium Product Brand System</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
