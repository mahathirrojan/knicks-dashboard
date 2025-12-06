// components/types.ts

// --- Constants ---
export const TEAM_ID = "18"; // Knicks
export const PROXY_URL = "https://corsproxy.io/?";
export const BASE_URL = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${TEAM_ID}`;

export const FALLBACK_DATA = {
  record: "14-7",
  standing: "2nd in Eastern Conference",
  nextGame: {
    date: new Date(Date.now() + 86400000).toISOString(),
    opponent: "Utah Jazz",
    opponentLogo: "https://a.espncdn.com/i/teamlogos/nba/500/utah.png",
    venue: "Madison Square Garden",
  },
  leaders: [
    {
      label: "PTS",
      value: "27.6",
      name: "Jalen Brunson",
      img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3934672.png",
    },
    {
      label: "REB",
      value: "12.0",
      name: "Karl-Anthony Towns",
      img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136195.png",
    },
    {
      label: "AST",
      value: "6.5",
      name: "Jalen Brunson",
      img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3934672.png",
    },
    {
      label: "STL",
      value: "2.1",
      name: "Mikal Bridges",
      img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066337.png",
    },
    {
      label: "BLK",
      value: "0.9",
      name: "Karl-Anthony Towns",
      img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136195.png",
    },
  ],
};

// --- Types ---
export type LeaderDisplay = {
  label: string;
  value: string;
  name: string;
  img: string;
  color: string;
  bg: string;
  border: string;
};

export type NextGame = {
  date: string;
  name?: string;
  venue?: string;
  opponent?: {
    abbreviation?: string;
    logos?: { href: string }[];
  };
  tickets?: string;
};

export type Injury = {
  athlete: { displayName: string };
  status: string;
  type?: string;
};

export type DashboardData = {
  record?: string;
  standing?: string;
  leaders: LeaderDisplay[];
  nextGame: NextGame | null;
  injuries: Injury[];
};