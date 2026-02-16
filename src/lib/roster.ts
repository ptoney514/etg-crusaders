export type Player = {
  slug: string;
  name: string;
  gradYear: number;
  position: "Guard" | "Wing" | "Forward" | "Center";
  team: string;
  headshot: string;
  bio: string;
  social: {
    instagram?: string;
    twitter?: string;
  };
};

export const players: Player[] = [
  {
    slug: "jaylen-carter",
    name: "Jaylen Carter",
    gradYear: 2027,
    position: "Guard",
    team: "ETG Crusaders 16U",
    headshot:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&w=700&q=80",
    bio: "Lead guard with strong pick-and-roll reads, defensive pace, and consistent shot creation in transition.",
    social: {
      instagram: "https://instagram.com/jaylen.carter",
      twitter: "https://x.com/jaylencarter",
    },
  },
  {
    slug: "mason-price",
    name: "Mason Price",
    gradYear: 2028,
    position: "Wing",
    team: "ETG Crusaders 15U",
    headshot:
      "https://images.unsplash.com/photo-1614212101176-3a7f7095f3ce?auto=format&fit=crop&w=700&q=80",
    bio: "Two-way wing who rebounds above position and spaces the floor with dependable perimeter shooting.",
    social: {
      instagram: "https://instagram.com/mason.price",
    },
  },
  {
    slug: "kaden-brooks",
    name: "Kaden Brooks",
    gradYear: 2026,
    position: "Forward",
    team: "ETG Crusaders 17U",
    headshot:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
    bio: "Physical forward with rim pressure, switchable defense, and high-motor effort across both halves.",
    social: {
      twitter: "https://x.com/kadenbrooks",
    },
  },
  {
    slug: "isaiah-thomas-jr",
    name: "Isaiah Thomas Jr.",
    gradYear: 2027,
    position: "Guard",
    team: "ETG Crusaders 16U",
    headshot:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
    bio: "Dynamic downhill guard with elite speed and improved off-ball spacing discipline.",
    social: {
      instagram: "https://instagram.com/isaiah.thomasjr",
      twitter: "https://x.com/isaiahthomasjr",
    },
  },
  {
    slug: "eli-garcia",
    name: "Eli Garcia",
    gradYear: 2029,
    position: "Wing",
    team: "ETG Crusaders 14U",
    headshot:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
    bio: "Emerging scorer with length, active hands, and a strong growth curve as a secondary playmaker.",
    social: {
      instagram: "https://instagram.com/eligarciahoops",
    },
  },
  {
    slug: "tyler-mitchell",
    name: "Tyler Mitchell",
    gradYear: 2026,
    position: "Center",
    team: "ETG Crusaders 17U",
    headshot:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    bio: "Interior anchor who protects the paint, screens effectively, and finishes efficiently near the rim.",
    social: {
      twitter: "https://x.com/tylermitchell34",
    },
  },
  {
    slug: "nolan-reed",
    name: "Nolan Reed",
    gradYear: 2028,
    position: "Forward",
    team: "ETG Crusaders 15U",
    headshot:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
    bio: "Versatile forward with improved face-up game and high-impact weak-side help instincts.",
    social: {
      instagram: "https://instagram.com/nolan.reed",
      twitter: "https://x.com/nolanreed",
    },
  },
  {
    slug: "camden-ward",
    name: "Camden Ward",
    gradYear: 2029,
    position: "Guard",
    team: "ETG Crusaders 14U",
    headshot:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=700&q=80",
    bio: "Floor-spacing combo guard who takes care of the ball and creates high-value possessions late in games.",
    social: {
      instagram: "https://instagram.com/camdenwardhoops",
    },
  },
];

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug);
}
