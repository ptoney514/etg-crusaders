import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import etgLogo from "@/assets/etg-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Roster", href: "/roster" },
  { label: "Schedule", href: "/#schedule" },
  { label: "About Us", href: "/#about" },
];

const resourceLinks = [
  { label: "Newsletters", href: "/newsletters" },
  { label: "Player Roster", href: "/roster" },
  { label: "Contact", href: "/#contact" },
  { label: "Events", href: "/#schedule" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[var(--surface-1)]">
      <div className="footer-gradient-border" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <Image src={etgLogo} alt="ETG Crusaders" className="h-12 w-auto mb-5" />
            <p
              className="text-white/40 mb-6 max-w-xs"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Building champions on and off the court. Omaha&apos;s premier elite
              basketball training and development program.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter", href: "https://x.com" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[var(--etg-red)]/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4
                className="text-white/80 mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Navigate
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/35 hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-white/80 mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/35 hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4
              className="text-white/80 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Stay Updated
            </h4>
            <p
              className="text-white/35 mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              Newsletter signups will connect to Neon and Beehiiv in the next backend phase.
            </p>
            <form onSubmit={(event) => event.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--etg-red)]/50 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white px-5 py-2.5 rounded-md transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/25"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}
          >
            &copy; {new Date().getFullYear()} ETG Crusaders. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors group"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
            type="button"
          >
            BACK TO TOP
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
