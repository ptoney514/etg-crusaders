import Link from "next/link";
import { ChevronDown, Play } from "lucide-react";
import heroImage from "@/assets/hero-background.png";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage.src}')`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div
        className="absolute top-0 left-0 w-[120%] h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 48%, rgba(200,16,46,0.07) 48%, rgba(200,16,46,0.07) 52%, transparent 52%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="hero-title mb-6">
            <span
              className="inline-block px-4 py-1.5 text-xs tracking-[0.2em] uppercase border border-[var(--etg-red)]/40 text-[var(--etg-red)] rounded-sm"
              style={{ fontFamily: "var(--font-condensed)", fontWeight: 600 }}
            >
              Elite Basketball Training
            </span>
          </div>

          <h1
            className="hero-title text-white mb-6 section-title"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            ETG
            <br />
            CRUSADERS
            <span
              className="block mt-1"
              style={{
                color: "var(--etg-red)",
                fontSize: "0.35em",
                letterSpacing: "0.15em",
              }}
            >
              BASKETBALL
            </span>
          </h1>

          <p
            className="hero-subtitle text-white/70 mb-10 max-w-xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Building champions on and off the court. Experience elite basketball
            training and development through our comprehensive programs.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white border-0 px-8 py-6 btn-glow"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              <Link href="/roster">VIEW PLAYER ROSTER</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/40 px-8 py-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              <Link href="/newsletters">
                <Play className="w-4 h-4 mr-2" />
                READ NEWSLETTERS
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-white/30 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          Scroll
        </span>
        <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}
