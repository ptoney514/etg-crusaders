import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = [
  {
    url: "https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzU5ODI1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Basketball court",
    caption: "Home Court",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1758798458708-d9e5260066f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwc2hvb3Rpbmd8ZW58MXx8fHwxNzU5ODg4NjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Player shooting",
    caption: "Precision Training",
    colSpan: "md:col-span-1",
    rowSpan: "",
  },
  {
    url: "https://images.unsplash.com/photo-1705594858888-90d164689257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwZ2FtZSUyMGFjdGlvbnxlbnwxfHx8fDE3NTk4ODg2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Game action",
    caption: "Game Day",
    colSpan: "md:col-span-1",
    rowSpan: "",
  },
  {
    url: "https://images.unsplash.com/photo-1759694705159-fad2c93938f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdGVhbSUyMGh1ZGRsZXxlbnwxfHx8fDE3NTk4ODg2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Team huddle",
    caption: "Brotherhood",
    colSpan: "md:col-span-2",
    rowSpan: "",
  },
  {
    url: "https://images.unsplash.com/photo-1758798458708-d9e5260066f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwc2hvb3Rpbmd8ZW58MXx8fHwxNzU5ODg4NjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Practice session",
    caption: "Putting in the Work",
    colSpan: "md:col-span-1",
    rowSpan: "",
  },
];

export function Gallery() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal(0.05);

  return (
    <section className="relative py-24 bg-[var(--surface-0)] noise-overlay overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p className="section-label mb-3">Gallery</p>
          <h2
            className="section-title text-white"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
          >
            In Action
          </h2>
          <p
            className="text-white/40 mt-4"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 300 }}
          >
            Capturing the moments that define our program
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item relative overflow-hidden rounded-lg ${image.colSpan} ${image.rowSpan} group cursor-pointer`}
              data-reveal-delay={index * 80}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Caption overlay that slides up on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <span
                  className="text-white text-sm"
                  style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {image.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
