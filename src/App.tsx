import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { SponsorsSection } from "./components/SponsorsSection";
import { StatsSection } from "./components/StatsSection";
import { NewsSection } from "./components/NewsSection";
import { PartnersSection } from "./components/PartnersSection";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { NewslettersArchive } from "./components/NewslettersArchive";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "archive">("home");

  if (currentPage === "archive") {
    return (
      <>
        <Navigation onNavigate={setCurrentPage} />
        <NewslettersArchive onBack={() => setCurrentPage("home")} />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation onNavigate={setCurrentPage} />
      <Hero />
      <SponsorsSection />
      <StatsSection />
      <NewsSection onNavigateToArchive={() => setCurrentPage("archive")} />
      <PartnersSection />
      <Gallery />
      <Footer />
    </div>
  );
}
