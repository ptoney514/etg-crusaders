import { useState } from "react";
import etgLogo from "@/assets/etg-logo.png";
import { Search, Menu } from "lucide-react";
import { useScrollNav } from "@/hooks/useScrollNav";
import { MobileMenu } from "./MobileMenu";

interface NavigationProps {
  onNavigate: (page: "home" | "archive") => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const scrolled = useScrollNav(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top red accent line */}
      <div className="fixed top-0 left-0 right-0 z-[51] h-[2px] bg-[var(--etg-red)]" />

      <nav
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-14">
            <button onClick={() => onNavigate("home")} className="flex items-center gap-3 group">
              <img
                src={etgLogo}
                alt="ETG Crusaders"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {[
                { label: "HOME", action: () => onNavigate("home") },
                { label: "SCHEDULE", href: "#schedule" },
                { label: "BOYS TEAMS", href: "#teams" },
                { label: "ABOUT US", href: "#about" },
                { label: "NEWS", action: () => onNavigate("archive") },
                { label: "CONTACT", href: "#contact" },
              ].map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="nav-link text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="nav-link text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-white/70 hover:text-white transition-colors p-2">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
