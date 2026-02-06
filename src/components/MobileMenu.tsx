import { X } from "lucide-react";
import etgLogo from "@/assets/etg-logo.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: "home" | "archive") => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleNav = (page: "home" | "archive") => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] mobile-menu-overlay bg-black/95 flex flex-col">
      {/* Close button */}
      <div className="flex items-center justify-between px-6 py-5">
        <img src={etgLogo} alt="ETG Crusaders" className="h-8 w-auto" />
        <button onClick={onClose} className="text-white/80 hover:text-white p-2">
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col items-center justify-center flex-1 gap-1">
        {[
          { label: "HOME", action: () => handleNav("home") },
          { label: "SCHEDULE", href: "#schedule" },
          { label: "BOYS TEAMS", href: "#teams" },
          { label: "ABOUT US", href: "#about" },
          { label: "NEWS", action: () => handleNav("archive") },
          { label: "CONTACT", href: "#contact" },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-[fadeInUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
          >
            {item.action ? (
              <button
                onClick={item.action}
                className="block text-white text-2xl py-3 px-6 hover:text-[var(--etg-red)] transition-colors"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                {item.label}
              </button>
            ) : (
              <a
                href={item.href}
                onClick={onClose}
                className="block text-white text-2xl py-3 px-6 hover:text-[var(--etg-red)] transition-colors"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--etg-red)] to-transparent" />
    </div>
  );
}
