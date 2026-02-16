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

export function RosterContent() {
  const [query, setQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  const teams = useMemo(
    () => Array.from(new Set(players.map((player) => player.team))).sort(),
    [],
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesQuery =
        query === "" ||
        player.name.toLowerCase().includes(query.toLowerCase()) ||
        player.team.toLowerCase().includes(query.toLowerCase());

      const matchesTeam = teamFilter === "all" || player.team === teamFilter;
      const matchesPosition =
        positionFilter === "all" || player.position === positionFilter;

      return matchesQuery && matchesTeam && matchesPosition;
    });
  }, [positionFilter, query, teamFilter]);

  return (
    <section className="pt-30 pb-20 bg-[var(--surface-1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="section-label mb-3">Player Development</p>
          <h1
            className="section-title text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            ETG Roster
          </h1>
          <p
            className="text-white/45 mt-4"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            Filter athletes by team and position, then open each player profile for details and socials.
          </p>
        </div>

        <Card className="bg-[var(--surface-3)] border-0 p-6 mb-10">
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search player or team"
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
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger
                className="bg-[var(--surface-4)] border-white/10 text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <SelectValue placeholder="All positions" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface-4)] border-white/10 text-white">
                <SelectItem value="all">All positions</SelectItem>
                <SelectItem value="Guard">Guard</SelectItem>
                <SelectItem value="Wing">Wing</SelectItem>
                <SelectItem value="Forward">Forward</SelectItem>
                <SelectItem value="Center">Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <Link key={player.slug} href={`/roster/${player.slug}`}>
              <Card className="overflow-hidden border-0 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] transition-colors h-full">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={player.headshot}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="section-label mb-2" style={{ fontSize: "0.7rem" }}>
                    Class of {player.gradYear}
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
                    {player.position} • {player.team}
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
