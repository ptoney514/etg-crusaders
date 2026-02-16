export type Player = {
  slug: string;
  name: string;
  gradYear: number;
  position: string;
  team: string;
  school: string;
  jerseyNumber: number;
  height?: string;
  headshot?: string;
  bio: string;
  social: {
    instagram?: string;
    twitter?: string;
  };
};

type PlayerSeed = Omit<Player, "slug" | "bio" | "social" | "position"> & {
  bio?: string;
  social?: Player["social"];
  position?: string;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const seedPlayers: PlayerSeed[] = [
  { name: "Matthew Schrunk", team: "Boys 17U", jerseyNumber: 0, gradYear: 2025, school: "Omaha South", height: "6'8" },
  { name: "Melvin Del Rosario", team: "Boys 17U", jerseyNumber: 1, gradYear: 2025, school: "Omaha Central", height: "6'5" },
  { name: "Garrett Middaugh", team: "Boys 17U", jerseyNumber: 2, gradYear: 2025, school: "Abraham Lincoln", height: "6'2" },
  { name: "Jaxsen Timm", team: "Boys 17U", jerseyNumber: 3, gradYear: 2026, school: "Millard South", height: "6'0" },
  { name: "Landen Gessert", team: "Boys 17U", jerseyNumber: 5, gradYear: 2026, school: "Millard North", height: "6'2" },
  { name: "Jayden Williams", team: "Boys 17U", jerseyNumber: 6, gradYear: 2025, school: "Omaha Central", height: "6'4" },
  { name: "Cael Bruner", team: "Boys 17U", jerseyNumber: 7, gradYear: 2025, school: "Millard North", height: "6'2" },
  { name: "Trevon Mosley", team: "Boys 17U", jerseyNumber: 8, gradYear: 2025, school: "Bellevue East", height: "6'2" },

  { name: "Damian Walker", team: "Boys 16U", jerseyNumber: 0, gradYear: 2027, school: "St. Albert", height: "6'1" },
  { name: "Braeden Hansen", team: "Boys 16U", jerseyNumber: 1, gradYear: 2027, school: "Elkhorn North", height: "6'4" },
  { name: "Jesse Marquez", team: "Boys 16U", jerseyNumber: 2, gradYear: 2026, school: "Omaha South", height: "6'1" },
  { name: "Asael Martinez", team: "Boys 16U", jerseyNumber: 3, gradYear: 2027, school: "Omaha South", height: "6'2" },
  { name: "Simeon Love", team: "Boys 16U", jerseyNumber: 4, gradYear: 2027, school: "Omaha North", height: "6'2" },
  { name: "Marlon Greene", team: "Boys 16U", jerseyNumber: 5, gradYear: 2027, school: "Omaha South", height: "6'2" },
  { name: "Jayce Cherry", team: "Boys 16U", jerseyNumber: 8, gradYear: 2027, school: "Omaha South", height: "6'0" },
  { name: "Dallas Hawkins", team: "Boys 16U", jerseyNumber: 9, gradYear: 2027, school: "Omaha North", height: "6'0" },
  { name: "Kiyel Hines", team: "Boys 16U", jerseyNumber: 11, gradYear: 2028, school: "Omaha North", height: "5'10" },

  { name: "Mason Henrich", team: "Boys 15U", jerseyNumber: 1, gradYear: 2028, school: "Bellevue West", height: "6'1" },
  { name: "Daniel Mendez", team: "Boys 15U", jerseyNumber: 2, gradYear: 2028, school: "Omaha South", height: "6'0" },
  { name: "Avery Barker", team: "Boys 15U", jerseyNumber: 3, gradYear: 2028, school: "Bellevue East", height: "5'8" },
  { name: "Carter Vacek", team: "Boys 15U", jerseyNumber: 4, gradYear: 2028, school: "Wahoo", height: "6'2" },
  { name: "Landen Schelkopf", team: "Boys 15U", jerseyNumber: 5, gradYear: 2028, school: "Lincoln Northeast", height: "6'4" },
  { name: "Vince Chavez", team: "Boys 15U", jerseyNumber: 6, gradYear: 2028, school: "Omaha South", height: "6'2" },
  { name: "Jesse Bian", team: "Boys 15U", jerseyNumber: 7, gradYear: 2028, school: "Omaha South", height: "6'0" },
  { name: "Drelyn Logan", team: "Boys 15U", jerseyNumber: 8, gradYear: 2028, school: "Omaha South", height: "5'8" },
  { name: "Tez Bian", team: "Boys 15U", jerseyNumber: 11, gradYear: 2028, school: "Omaha South", height: "6'0" },

  { name: "Addie Lame", team: "Girls 17U", jerseyNumber: 0, gradYear: 2027, school: "Bellevue East" },
  { name: "Nyla Brown", team: "Girls 17U", jerseyNumber: 1, gradYear: 2028, school: "Omaha North" },
  { name: "Mallory Brown", team: "Girls 17U", jerseyNumber: 2, gradYear: 2027, school: "Bellevue East" },
  { name: "Alauna Rosenthal", team: "Girls 17U", jerseyNumber: 3, gradYear: 2028, school: "Omaha North" },
  { name: "Elizabeth Wisdom", team: "Girls 17U", jerseyNumber: 4, gradYear: 2028, school: "Omaha North" },
  { name: "Lilly Bialas", team: "Girls 17U", jerseyNumber: 5, gradYear: 2028, school: "Bennington" },
  { name: "Dylan Morrow", team: "Girls 17U", jerseyNumber: 6, gradYear: 2027, school: "Bellevue East" },
  { name: "Amya Gregg", team: "Girls 17U", jerseyNumber: 8, gradYear: 2028, school: "Omaha North" },
  { name: "Destiny Houston", team: "Girls 17U", jerseyNumber: 9, gradYear: 2028, school: "Omaha North" },
  { name: "Jerzy Waugh", team: "Girls 17U", jerseyNumber: 10, gradYear: 2028, school: "Omaha North" },

  { name: "Kinley Cox", team: "Girls 16U", jerseyNumber: 0, gradYear: 2028, school: "Waverly" },
  { name: "Sadee Faz", team: "Girls 16U", jerseyNumber: 1, gradYear: 2028, school: "Waverly" },
  { name: "Lily Granberg", team: "Girls 16U", jerseyNumber: 2, gradYear: 2028, school: "Gretna East" },
  { name: "Amelia Heth", team: "Girls 16U", jerseyNumber: 3, gradYear: 2028, school: "Waverly" },
  { name: "Mia Weiner", team: "Girls 16U", jerseyNumber: 4, gradYear: 2028, school: "Ralston" },
  { name: "Shynna Williams", team: "Girls 16U", jerseyNumber: 5, gradYear: 2029, school: "Bellevue East" },
  { name: "Jadyn Cooley", team: "Girls 16U", jerseyNumber: 6, gradYear: 2028, school: "Bellevue East" },
  { name: "Ariel Brown", team: "Girls 16U", jerseyNumber: 8, gradYear: 2028, school: "Bellevue East" },
  { name: "Alisia Johnson", team: "Girls 16U", jerseyNumber: 9, gradYear: 2028, school: "Bellevue East" },

  { name: "Kaylynn Ross", team: "Girls 15U", jerseyNumber: 0, gradYear: 2028, school: "Millard South" },
  { name: "London Noble", team: "Girls 15U", jerseyNumber: 1, gradYear: 2028, school: "Bellevue East" },
  { name: "Kiera Trenary", team: "Girls 15U", jerseyNumber: 2, gradYear: 2028, school: "Ralston" },
  { name: "Alyssa Brown", team: "Girls 15U", jerseyNumber: 3, gradYear: 2028, school: "Bellevue East" },
  { name: "Blaire Marrott", team: "Girls 15U", jerseyNumber: 4, gradYear: 2028, school: "Bellevue East" },
  { name: "Myra Trenary", team: "Girls 15U", jerseyNumber: 5, gradYear: 2028, school: "Ralston" },
  { name: "Summer Taylor", team: "Girls 15U", jerseyNumber: 6, gradYear: 2029, school: "Bellevue East" },
  { name: "Annelise Oneill", team: "Girls 15U", jerseyNumber: 8, gradYear: 2028, school: "Bellevue East" },
  { name: "Emma Clemens", team: "Girls 15U", jerseyNumber: 9, gradYear: 2028, school: "Duchesne" },
  { name: "Nahla Hudnall", team: "Girls 15U", jerseyNumber: 10, gradYear: 2028, school: "Omaha South" },
];

export const players: Player[] = seedPlayers.map((player) => ({
  ...player,
  slug: toSlug(`${player.name} ${player.team}`),
  position: player.position ?? "TBD",
  bio:
    player.bio ??
    `${player.name} is listed on the ${player.team} roster for ETG Midwest. ${player.school} • Class of ${player.gradYear}.`,
  social: player.social ?? {},
}));

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug);
}
