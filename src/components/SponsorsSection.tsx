import { useScrollReveal } from "@/hooks/useScrollReveal";

const seasonNotes = [
  {
    title: "National Competition",
    detail: "Boys and girls teams compete on major spring and summer circuits.",
  },
  {
    title: "Fundraising Support",
    detail: "Donor support helps cover travel, hotels, vans, and meals for athletes.",
  },
  {
    title: "Program Structure",
    detail: "ETG fields one boys and one girls team at 15U, 16U, and 17U.",
  },
  {
    title: "Scholarship Exposure",
    detail: "Competition schedules are designed to increase college visibility.",
  },
];

const scheduleSnapshot = [
  "Start to Rise - Iowa City, IA (Apr 14-16)",
  "KC Classic - Kansas City, KS (Apr 21-23)",
  "Live Period - Suwanee, GA (Jul 6-9)",
  "Homegrown Regional Championship - Jul 14-16",
  "Adidas Gauntlet - Augusta, GA (Jul 20-23)",
];

export function SponsorsSection() {
  const ref = useScrollReveal();

  return (
    <section className="py-16 bg-white border-b border-gray-200 overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <p
          className="text-center mb-3 text-gray-400 uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-condensed)", fontSize: "0.75rem", fontWeight: 600 }}
        >
          2025 Program Snapshot
        </p>
        <h2
          className="text-center text-gray-900 mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
          }}
        >
          Built For Development And Exposure
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {seasonNotes.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-5"
            >
              <p
                className="text-gray-900 mb-2"
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item.title}
              </p>
              <p
                className="text-gray-600"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6 }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p
            className="text-gray-400 mb-3"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Legacy Schedule Reference
          </p>
          <ul className="grid gap-2 md:grid-cols-2">
            {scheduleSnapshot.map((item) => (
              <li
                key={item}
                className="text-gray-700"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
