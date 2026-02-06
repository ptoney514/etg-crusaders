import { useScrollReveal } from "@/hooks/useScrollReveal";

const sponsors = [
  {
    name: "Crusaders Elite",
    logo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#4A1E8C" stroke="#FFD700" strokeWidth="3"/>
        <path d="M 40 40 L 60 30 L 80 40 L 80 70 L 60 80 L 40 70 Z" fill="#FFD700"/>
        <text x="60" y="65" textAnchor="middle" fill="#4A1E8C" fontSize="24" fontWeight="bold">CE</text>
      </svg>
    ),
  },
  {
    name: "Elite Training",
    logo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#1a1a1a" stroke="#FFFFFF" strokeWidth="3"/>
        <circle cx="60" cy="60" r="45" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <text x="60" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="bold">ETG</text>
      </svg>
    ),
  },
  {
    name: "Omaha Basketball",
    logo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <rect x="10" y="10" width="100" height="100" rx="5" fill="#000000"/>
        <path d="M 30 45 L 60 30 L 90 45 L 90 75 L 60 90 L 30 75 Z" fill="none" stroke="#FFD700" strokeWidth="3"/>
        <text x="60" y="68" textAnchor="middle" fill="#FFD700" fontSize="22" fontWeight="bold">OB</text>
      </svg>
    ),
  },
  {
    name: "Supreme Basketball",
    logo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#FFFFFF" stroke="#FF6B35" strokeWidth="3"/>
        <circle cx="60" cy="40" r="8" fill="#FF6B35"/>
        <circle cx="45" cy="55" r="6" fill="#FF6B35"/>
        <circle cx="75" cy="55" r="6" fill="#FF6B35"/>
        <circle cx="40" cy="75" r="5" fill="#FF6B35"/>
        <circle cx="60" cy="75" r="5" fill="#FF6B35"/>
        <circle cx="80" cy="75" r="5" fill="#FF6B35"/>
        <text x="60" y="98" textAnchor="middle" fill="#FF6B35" fontSize="16" fontWeight="bold">SUPREME</text>
      </svg>
    ),
  },
];

export function SponsorsSection() {
  const ref = useScrollReveal();

  // Double the sponsors for seamless loop
  const tickerItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-14 bg-white border-b border-gray-200 overflow-hidden">
      <div ref={ref} className="reveal">
        {/* Section label */}
        <p
          className="text-center mb-8 text-gray-400 uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-condensed)", fontSize: "0.75rem", fontWeight: 600 }}
        >
          Powered by Three Iconic Programs
        </p>

        {/* Infinite ticker */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="ticker-track">
              {tickerItems.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center px-12 shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  {sponsor.logo}
                  <span
                    className="mt-2 text-gray-500"
                    style={{ fontFamily: "var(--font-condensed)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
