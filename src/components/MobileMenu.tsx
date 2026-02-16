import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import etgLogo from "@/assets/etg-logo.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ROSTER", href: "/roster" },
  { label: "NEWSLETTERS", href: "/newsletters" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] mobile-menu-overlay bg-black/95 flex flex-col">
      <div className="flex items-center justify-between px-6 py-5">
        <Image src={etgLogo} alt="ETG Crusaders" className="h-8 w-auto" />
        <button onClick={onClose} className="text-white/80 hover:text-white p-2" type="button">
          <X className="w-7 h-7" />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center flex-1 gap-1">
        {navItems.map((item, index) => (
          <div
            key={item.label}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-[fadeInUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="block text-white text-2xl py-3 px-6 hover:text-[var(--etg-red)] transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>

      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--etg-red)] to-transparent" />
    </div>
  );
}
