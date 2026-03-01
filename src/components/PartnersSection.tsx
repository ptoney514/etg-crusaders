import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const timeline = [
  {
    year: "1992",
    title: "Program Founded",
    description:
      "The original Omaha Crusaders program was founded by Rick Woodard.",
  },
  {
    year: "2022",
    title: "ETG Midwest Launch",
    description:
      "The program was relaunched as ETG Midwest in partnership with Omaha Sports Academy.",
  },
  {
    year: "Today",
    title: "Six Team Model",
    description:
      "ETG now supports boys and girls teams across 15U, 16U, and 17U.",
  },
];

export function PartnersSection() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-22 bg-[var(--surface-2)] diagonal-top overflow-hidden" style={{ marginTop: "-2vw" }}>
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 pt-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <p className="section-label mb-3">Who We Are</p>
            <h3
              className="section-title text-white mb-5"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}
            >
              Opportunities Through Elite Competition
            </h3>
            <p
              className="text-white/70 mb-5"
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.85 }}
            >
              ETG is a nonprofit youth basketball organization serving Omaha and
              Council Bluffs. Our mission is to provide local athletes with the
              chance to compete against the nation's best while growing as students,
              teammates, and leaders.
            </p>
            <p
              className="text-white/55 mb-8"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", lineHeight: 1.8 }}
            >
              Program support from families, alumni, and community partners helps
              keep travel costs manageable and expands scholarship access for players.
            </p>

            <Link
              href="https://checkout.square.site/merchant/MLRVBXAYN9BCX/checkout/ACR3HAFIJ3LPIZDOG2UZR52E"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em", fontSize: "0.82rem" }}
            >
              SUPPORT ETG
            </Link>

            <div className="mt-12">
              <p
                className="text-white/40 uppercase tracking-widest text-xs mb-6"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                Community Partners
              </p>
              <div className="flex flex-wrap items-center gap-8 opacity-80">
                <img
                  src="/images/sponsors/osa.png"
                  alt="Omaha Sports Academy"
                  className="h-12 w-auto object-contain drop-shadow-lg"
                />
                <img
                  src="/images/sponsors/supreme.png"
                  alt="Supreme Court Basketball"
                  className="h-12 w-auto object-contain drop-shadow-lg"
                />
                <img
                  src="/images/sponsors/tne.png"
                  alt="Team Nebraska Express"
                  className="h-12 w-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-[var(--surface-3)] p-5"
              >
                <p
                  className="text-[var(--etg-red)] mb-1"
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.year}
                </p>
                <h4
                  className="text-white mb-2"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-white/60"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7 }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
