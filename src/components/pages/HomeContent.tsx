"use client";

import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StatsSection } from "@/components/StatsSection";

export function HomeContent() {
  return (
    <>
      <Hero />
      <section id="schedule">
        <SponsorsSection />
      </section>
      <StatsSection />
      <section id="newsletters">
        <NewsSection />
      </section>
      <section id="about">
        <PartnersSection />
      </section>
      <Gallery />
    </>
  );
}
