import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight, Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import newsletterPreview from "@/assets/newsletter-preview.png";

interface NewsSectionProps {
  onNavigateToArchive: () => void;
}

const newsletters = [
  {
    month: "October 2024",
    title: "Everything To Gain",
    subtitle: "Fall Season Highlights & Championship Updates",
    excerpt:
      "Catch up on our fall season achievements, player spotlights, and upcoming tournament schedules. Plus, exclusive interviews with our coaching staff about the development programs.",
    image: newsletterPreview,
    isFeatured: true,
  },
  {
    month: "September 2024",
    title: "Everything To Gain",
    subtitle: "Season Kickoff & New Roster",
    excerpt: "Meet the new roster, training camp highlights, and season preview.",
    image: newsletterPreview,
  },
  {
    month: "August 2024",
    title: "Everything To Gain",
    subtitle: "Summer Recap & Alumni Spotlights",
    excerpt: "Summer development programs, alumni success stories, and tryout information.",
    image: newsletterPreview,
  },
  {
    month: "July 2024",
    title: "Everything To Gain",
    subtitle: "Summer Training Programs",
    excerpt: "Intensive summer camps, skill development sessions, and tournament results.",
    image: newsletterPreview,
  },
];

export function NewsSection({ onNavigateToArchive }: NewsSectionProps) {
  const headerRef = useScrollReveal();
  const featuredRef = useScrollReveal(0.1);
  const archiveRef = useScrollReveal(0.1);
  const featured = newsletters[0];
  const archive = newsletters.slice(1);

  return (
    <section className="relative py-24 bg-[var(--surface-1)] noise-overlay overflow-hidden">
      {/* Subtle radial glow behind featured */}
      <div
        className="absolute top-[20%] left-[30%] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(200,16,46,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="reveal mb-16">
          <p className="section-label mb-3">Latest Updates</p>
          <h2
            className="section-title text-white"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
          >
            Monthly Newsletters
          </h2>
          <p
            className="text-white/50 mt-4 max-w-2xl"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 300 }}
          >
            Stay informed with our monthly newsletter featuring team updates, player spotlights, and program highlights
          </p>
        </div>

        {/* Featured Newsletter */}
        <div ref={featuredRef} className="reveal mb-16">
          <Card className="overflow-hidden border-0 bg-[var(--surface-3)] shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Newsletter Preview Image */}
              <div className="relative bg-[var(--surface-4)] p-8 lg:p-12 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div
                    className="absolute inset-0 blur-3xl rounded-full"
                    style={{ background: "var(--etg-red-glow)" }}
                  />
                  <img
                    src={featured.image}
                    alt={`${featured.month} Newsletter`}
                    className="relative rounded-lg shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Newsletter Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[var(--etg-red)] mb-5">
                  <Calendar className="w-4 h-4" />
                  <span
                    className="section-label"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {featured.month} &bull; Latest Issue
                  </span>
                </div>

                <h3
                  className="section-title text-white mb-3"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {featured.title}
                </h3>

                <p
                  className="text-white/75 mb-4"
                  style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", fontWeight: 500 }}
                >
                  {featured.subtitle}
                </p>

                <p
                  className="text-white/45 mb-8"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}
                >
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white border-0 btn-glow"
                    style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em" }}
                  >
                    READ NEWSLETTER
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                    style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em" }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    DOWNLOAD PDF
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Newsletter Archive */}
        <div ref={archiveRef} className="reveal">
          <div className="flex items-center justify-between mb-8">
            <h3
              className="section-title text-white"
              style={{ fontSize: "1.3rem" }}
            >
              Previous Issues
            </h3>
            <Button
              variant="ghost"
              onClick={onNavigateToArchive}
              className="text-[var(--etg-red)] hover:text-[var(--etg-red-dark)] hover:bg-transparent gap-2"
              style={{ fontFamily: "var(--font-condensed)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              VIEW ALL ARCHIVES
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archive.map((newsletter, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] transition-all duration-300 group cursor-pointer"
                style={{ transform: index === 1 ? "rotate(0.5deg)" : index === 2 ? "rotate(-0.3deg)" : "none" }}
              >
                {/* Newsletter Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-4)]">
                  <img
                    src={newsletter.image}
                    alt={`${newsletter.month} Newsletter`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-[var(--etg-red)] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="section-label" style={{ fontSize: "0.6875rem" }}>
                        {newsletter.month}
                      </span>
                    </div>
                    <h4
                      className="text-white"
                      style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {newsletter.subtitle}
                    </h4>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 bg-[var(--surface-2)]">
                  <p
                    className="text-white/45 mb-4"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", lineHeight: 1.6, fontWeight: 300 }}
                  >
                    {newsletter.excerpt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white flex-1"
                      style={{ fontFamily: "var(--font-condensed)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      READ
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
