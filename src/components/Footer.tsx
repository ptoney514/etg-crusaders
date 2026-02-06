import { ArrowUp, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import etgLogo from "@/assets/etg-logo.png";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--surface-1)]">
      {/* Gradient top border */}
      <div className="footer-gradient-border" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Logo + Tagline */}
          <div>
            <img src={etgLogo} alt="ETG Crusaders" className="h-12 w-auto mb-5" />
            <p
              className="text-white/40 mb-6 max-w-xs"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}
            >
              Building champions on and off the court. Omaha's premier elite basketball training and development program.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[var(--etg-red)]/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Nav Links in 2 sub-columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4
                className="text-white/80 mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Navigate
              </h4>
              <ul className="space-y-3">
                {["Home", "Schedule", "Boys Teams", "About Us"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white/35 hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 400 }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-white/80 mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {["News", "Contact", "Newsletter", "Events"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/35 hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 400 }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter signup */}
          <div>
            <h4
              className="text-white/80 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Stay Updated
            </h4>
            <p
              className="text-white/35 mb-4"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.6, fontWeight: 300 }}
            >
              Get the latest news and updates delivered to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--etg-red)]/50 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white px-5 py-2.5 rounded-md transition-colors"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/25"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}
          >
            &copy; 2025 ETG Crusaders. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors group"
            style={{ fontFamily: "var(--font-condensed)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            BACK TO TOP
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
