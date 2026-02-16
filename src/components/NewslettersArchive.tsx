import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, Download, Filter, Search } from "lucide-react";
import { newsletterPosts } from "@/lib/newsletters";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function getMonth(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long" });
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NewslettersArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(newsletterPosts.map((newsletter) => getYear(newsletter.publishedAt))),
    );
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredNewsletters = useMemo(() => {
    return newsletterPosts.filter((newsletter) => {
      const matchesSearch =
        searchQuery === "" ||
        newsletter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsletter.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getMonth(newsletter.publishedAt)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesYear =
        selectedYear === "all" ||
        getYear(newsletter.publishedAt).toString() === selectedYear;
      const matchesMonth =
        selectedMonth === "all" || getMonth(newsletter.publishedAt) === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [searchQuery, selectedMonth, selectedYear]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedMonth("all");
  };

  return (
    <section className="min-h-screen bg-[var(--surface-1)] pt-30 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Button
            asChild
            variant="ghost"
            className="text-white/50 hover:text-white hover:bg-white/5 mb-6 -ml-4"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO HOME
            </Link>
          </Button>

          <h1
            className="section-title text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Newsletter Archive
          </h1>
          <p
            className="text-white/45"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Browse ETG's Everything To Gain issues and download full PDF editions.
          </p>
        </div>

        <div className="mb-12">
          <Card className="bg-[var(--surface-3)] border-0 p-6">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  type="text"
                  placeholder="Search newsletters..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="bg-[var(--surface-4)] border-0 text-white placeholder:text-white/30 pl-10 h-12"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}
                />
              </div>

              <div className="md:col-span-2">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger
                    className="bg-[var(--surface-4)] border-0 text-white h-12"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger
                    className="bg-[var(--surface-4)] border-0 text-white h-12"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                    <SelectItem value="all">All Months</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full border-white/15 text-white/70 hover:bg-white/5 hover:text-white h-12"
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                  type="button"
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
              Showing {filteredNewsletters.length} of {newsletterPosts.length} newsletters
            </div>
          </Card>
        </div>

        {filteredNewsletters.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNewsletters.map((newsletter) => (
              <Card
                key={newsletter.slug}
                className="overflow-hidden border-0 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] transition-all duration-300 group"
              >
                <Link href={`/newsletters/${newsletter.slug}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-4)]">
                    <Image
                      src={newsletter.image}
                      alt={`${formatPublishedDate(newsletter.publishedAt)} newsletter`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-[var(--etg-red)] mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="section-label" style={{ fontSize: "0.6875rem" }}>
                          {formatPublishedDate(newsletter.publishedAt)}
                        </span>
                      </div>
                      <h3
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {newsletter.subtitle}
                      </h3>
                    </div>
                  </div>
                </Link>

                <div className="p-5 bg-[var(--surface-2)]">
                  <p
                    className="text-white/45 mb-4"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {newsletter.excerpt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white flex-1"
                      style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      <Link href={`/newsletters/${newsletter.slug}`}>READ ISSUE</Link>
                    </Button>
                    {newsletter.pdfUrl ? (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        <a href={newsletter.pdfUrl} target="_blank" rel="noreferrer" aria-label="Download PDF">
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-white/30 mb-4">
              <Search className="w-14 h-14 mx-auto mb-4" />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                No newsletters found
              </p>
              <p
                className="mt-2 text-white/25"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                }}
              >
                Try adjusting your search or filters
              </p>
            </div>
            <Button
              onClick={handleClearFilters}
              className="bg-[var(--etg-red)] hover:bg-[var(--etg-red-dark)] text-white mt-6 btn-glow"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
              type="button"
            >
              CLEAR ALL FILTERS
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
