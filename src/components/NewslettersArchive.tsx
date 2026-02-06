import { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Download, Search, ArrowLeft, Filter } from "lucide-react";
import newsletterPreview from "@/assets/newsletter-preview.png";

const allNewsletters = [
  { month: "October", year: 2024, title: "Everything To Gain", subtitle: "Fall Season Highlights & Championship Updates", excerpt: "Catch up on our fall season achievements, player spotlights, and upcoming tournament schedules.", image: newsletterPreview },
  { month: "September", year: 2024, title: "Everything To Gain", subtitle: "Season Kickoff & New Roster", excerpt: "Meet the new roster, training camp highlights, and season preview.", image: newsletterPreview },
  { month: "August", year: 2024, title: "Everything To Gain", subtitle: "Summer Recap & Alumni Spotlights", excerpt: "Summer development programs, alumni success stories, and tryout information.", image: newsletterPreview },
  { month: "July", year: 2024, title: "Everything To Gain", subtitle: "Summer Training Programs", excerpt: "Intensive summer camps, skill development sessions, and tournament results.", image: newsletterPreview },
  { month: "June", year: 2024, title: "Everything To Gain", subtitle: "End of Season Awards & Celebrations", excerpt: "Season recap, MVP awards, team achievements, and summer program announcements.", image: newsletterPreview },
  { month: "May", year: 2024, title: "Everything To Gain", subtitle: "Playoff Push & Tournament Preview", excerpt: "Playoff brackets, key matchups, and player performance analysis.", image: newsletterPreview },
  { month: "April", year: 2024, title: "Everything To Gain", subtitle: "Mid-Season Report & Player Spotlights", excerpt: "Halfway through the season - stats, standings, and featured player interviews.", image: newsletterPreview },
  { month: "March", year: 2024, title: "Everything To Gain", subtitle: "Spring Break Training Camp", excerpt: "Intensive training programs, skill development sessions, and guest coach features.", image: newsletterPreview },
  { month: "February", year: 2024, title: "Everything To Gain", subtitle: "All-Star Weekend Recap", excerpt: "All-star game highlights, skill competition results, and community events.", image: newsletterPreview },
  { month: "January", year: 2024, title: "Everything To Gain", subtitle: "New Year, New Goals", excerpt: "Setting goals for 2024, winter training schedule, and team resolutions.", image: newsletterPreview },
  { month: "December", year: 2023, title: "Everything To Gain", subtitle: "Holiday Tournament Special", excerpt: "Holiday tournament results, year-end reflections, and seasonal celebrations.", image: newsletterPreview },
  { month: "November", year: 2023, title: "Everything To Gain", subtitle: "Thanksgiving Classic Preview", excerpt: "Tournament preview, team preparation, and giving back to the community.", image: newsletterPreview },
];

interface NewslettersArchiveProps {
  onBack: () => void;
}

export function NewslettersArchive({ onBack }: NewslettersArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(allNewsletters.map(n => n.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  const filteredNewsletters = useMemo(() => {
    return allNewsletters.filter(newsletter => {
      const matchesSearch = searchQuery === "" ||
        newsletter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsletter.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsletter.month.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear = selectedYear === "all" || newsletter.year.toString() === selectedYear;
      const matchesMonth = selectedMonth === "all" || newsletter.month === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [searchQuery, selectedYear, selectedMonth]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedMonth("all");
  };

  return (
    <div className="min-h-screen bg-[var(--surface-1)] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white/50 hover:text-white hover:bg-white/5 mb-6 -ml-4"
            style={{ fontFamily: "var(--font-condensed)", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.06em" }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO HOME
          </Button>

          <h1
            className="section-title text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Newsletter Archive
          </h1>
          <p
            className="text-white/45"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.7 }}
          >
            Browse through all our monthly newsletters and stay updated with ETG Crusaders
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <Card className="bg-[var(--surface-3)] border-0 p-6">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  type="text"
                  placeholder="Search newsletters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[var(--surface-4)] border-0 text-white placeholder:text-white/30 pl-10 h-12"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}
                />
              </div>

              <div className="md:col-span-2">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-[var(--surface-4)] border-0 text-white h-12" style={{ fontFamily: "var(--font-body)" }}>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="bg-[var(--surface-4)] border-0 text-white h-12" style={{ fontFamily: "var(--font-body)" }}>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                    <SelectItem value="all">All Months</SelectItem>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full border-white/15 text-white/70 hover:bg-white/5 hover:text-white h-12"
                  style={{ fontFamily: "var(--font-condensed)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.06em" }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  CLEAR
                </Button>
              </div>
            </div>

            <div
              className="mt-4 text-white/35"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}
            >
              Showing {filteredNewsletters.length} of {allNewsletters.length} newsletters
            </div>
          </Card>
        </div>

        {/* Newsletter Grid */}
        {filteredNewsletters.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNewsletters.map((newsletter, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-4)]">
                  <img
                    src={newsletter.image}
                    alt={`${newsletter.month} ${newsletter.year} Newsletter`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-[var(--etg-red)] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="section-label" style={{ fontSize: "0.6875rem" }}>
                        {newsletter.month} {newsletter.year}
                      </span>
                    </div>
                    <h3
                      className="text-white"
                      style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {newsletter.subtitle}
                    </h3>
                  </div>
                </div>

                <div className="p-5 bg-[var(--surface-2)]">
                  <p
                    className="text-white/45 mb-4"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", lineHeight: 1.6, fontWeight: 300 }}
                  >
                    {newsletter.excerpt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white flex-1"
                      style={{ fontFamily: "var(--font-condensed)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      READ
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-white/30 mb-4">
              <Search className="w-14 h-14 mx-auto mb-4" />
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                No newsletters found
              </p>
              <p
                className="mt-2 text-white/25"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 300 }}
              >
                Try adjusting your search or filters
              </p>
            </div>
            <Button
              onClick={handleClearFilters}
              className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white mt-6 btn-glow"
              style={{ fontFamily: "var(--font-display)", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              CLEAR ALL FILTERS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
