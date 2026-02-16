import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2200);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-number mb-2" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        {count}
        <span style={{ color: "var(--etg-gold)" }}>{suffix}</span>
      </div>
      <p
        className="text-white/50 uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-condensed)", fontSize: "0.8125rem", fontWeight: 500 }}
      >
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { value: 34, suffix: "+", label: "Years Since Founding" },
    { value: 200, suffix: "+", label: "College Scholarships" },
    { value: 6, suffix: "", label: "Boys & Girls Teams" },
    { value: 2, suffix: "", label: "Metro Areas Served" },
  ];

  return (
    <section className="relative py-20 bg-[var(--surface-1)] overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200,16,46,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
