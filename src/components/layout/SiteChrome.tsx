"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-1)]">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
