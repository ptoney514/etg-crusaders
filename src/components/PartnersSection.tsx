import { useScrollReveal } from "@/hooks/useScrollReveal";

const partners = [
  { name: "ETG Crusaders", abbr: "ETG", color: "#c8102e", border: "#c8102e" },
  { name: "Omaha Elite", abbr: "OE", color: "#1a1a2e", border: "#4a4a6a" },
  { name: "Nebraska Supreme", abbr: "NS", color: "#16213e", border: "#2a4a6e" },
  { name: "Midwest Basketball", abbr: "MW", color: "#c8102e", border: "#c8102e" },
];

export function PartnersSection() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-20 bg-[var(--surface-2)] diagonal-top overflow-hidden" style={{ marginTop: "-2vw" }}>
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 pt-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Our Programs</p>
          <h3
            className="section-title text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            One Elite Team.
            <span className="block text-[var(--etg-gold)]" style={{ fontSize: "0.5em", letterSpacing: "0.15em", marginTop: "0.3em" }}>
              POWERED BY THREE SELECT PROGRAMS
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="reveal flex flex-col items-center gap-4 group cursor-pointer"
              data-reveal-delay={index * 100}
            >
              {/* Logo circle */}
              <div
                className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                style={{
                  backgroundColor: partner.color,
                  boxShadow: `0 0 0 2px ${partner.border}30, 0 8px 30px ${partner.color}40`,
                }}
              >
                {/* Ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0"
                  style={{ borderColor: `${partner.border}40` }}
                />
                <span
                  className="text-white relative z-10"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.05em" }}
                >
                  {partner.abbr}
                </span>
              </div>

              {/* Name */}
              <span
                className="text-white/60 group-hover:text-white transition-colors duration-300 text-center"
                style={{ fontFamily: "var(--font-condensed)", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
