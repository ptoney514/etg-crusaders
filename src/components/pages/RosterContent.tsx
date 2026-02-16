"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { players } from "@/lib/roster";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function RosterContent() {
  const [query, setQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [gradYearFilter, setGradYearFilter] = useState("all");

  const teams = useMemo(
    () => Array.from(new Set(players.map((player) => player.team))).sort(),
    [],
  );

  const gradYears = useMemo(
    () => Array.from(new Set(players.map((player) => player.gradYear))).sort((a, b) => a - b),
    [],
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesQuery =
        query === "" ||
        player.name.toLowerCase().includes(query.toLowerCase()) ||
        player.team.toLowerCase().includes(query.toLowerCase()) ||
        player.school.toLowerCase().includes(query.toLowerCase());

      const matchesTeam = teamFilter === "all" || player.team === teamFilter;
      const matchesGradYear =
        gradYearFilter === "all" || player.gradYear.toString() === gradYearFilter;

      return matchesQuery && matchesTeam && matchesGradYear;
    });
  }, [gradYearFilter, query, teamFilter]);

  return (
    <section className="pt-30 pb-20 bg-[var(--surface-1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="section-label mb-3">Player Roster</p>
          <h1
            className="section-title text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            2025 ETG Teams
          </h1>
          <p
            className="text-white/45 mt-4"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            Migrated from the current ETG Midwest roster release. Open player pages
            for grade, school, team, and social placeholders for future updates.
          </p>
        </div>

        <Card className="bg-[var(--surface-3)] border-0 p-6 mb-10">
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search player, team, or school"
              className="bg-[var(--surface-4)] border-white/10 text-white"
              style={{ fontFamily: "var(--font-body)" }}
            />
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger
                className="bg-[var(--surface-4)] border-white/10 text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <SelectValue placeholder="All teams" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                <SelectItem value="all">All teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={gradYearFilter} onValueChange={setGradYearFilter}>
              <SelectTrigger
                className="bg-[var(--surface-4)] border-white/10 text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <SelectValue placeholder="All grad years" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                <SelectItem value="all">All grad years</SelectItem>
                {gradYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <Link key={player.slug} href={`/roster/${player.slug}`}>
              <Card className="overflow-hidden border-0 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] transition-colors h-full">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  {player.headshot ? (
                    <img
                      src={player.headshot}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                      <span
                        className="text-white/65"
                        style={{ fontFamily: "var(--font-display)", fontSize: "2rem", letterSpacing: "0.06em" }}
                      >
                        {initialsFromName(player.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="section-label mb-2" style={{ fontSize: "0.7rem" }}>
                    #{player.jerseyNumber} • Class of {player.gradYear}
                  </p>
                  <h3
                    className="text-white mb-1"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}
                  >
                    {player.name}
                  </h3>
                  <p
                    className="text-white/55"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
                  >
                    {player.team}
                  </p>
                  <p
                    className="text-white/35 mt-1"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}
                  >
                    {player.school}
                    {player.height ? ` • ${player.height}` : ""}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
