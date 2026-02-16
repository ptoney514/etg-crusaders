import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import etgLogo from "@/assets/etg-logo.png";
import { useScrollNav } from "@/hooks/useScrollNav";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ROSTER", href: "/roster" },
  { label: "NEWSLETTERS", href: "/newsletters" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.startsWith("/#")) {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Navigation() {
  const pathname = usePathname();
  const scrolled = useScrollNav(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[51] h-[2px] bg-[var(--etg-red)]" />

      <nav
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-14">
            <Link href="/" className="flex items-center gap-3 group" aria-label="ETG Crusaders home">
              <Image
                src={etgLogo}
                alt="ETG Crusaders"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link text-white/90 hover:text-white transition-colors ${
                    isActiveLink(pathname, item.href) ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-white/70 hover:text-white transition-colors p-2"
              aria-label="Search"
              type="button"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
              aria-label="Open menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
