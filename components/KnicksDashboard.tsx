"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Activity,
  Trophy,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";

const TEAM_ID = "18"; // Knicks
const PROXY_URL = "https://corsproxy.io/?";
const BASE_URL = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${TEAM_ID}`;

const FALLBACK_DATA = {
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

type LeaderDisplay = {
  label: string;
  value: string;
  name: string;
  img: string;
  color: string;
  bg: string;
  border: string;
};

type NextGame = {
  date: string;
  name?: string;
  venue?: string;
  opponent?: {
    abbreviation?: string;
    logos?: { href: string }[];
  };
  tickets?: string;
};

type Injury = {
  athlete: { displayName: string };
  status: string;
  type?: string;
};

type DashboardData = {
  record?: string;
  standing?: string;
  leaders: LeaderDisplay[];
  nextGame: NextGame | null;
  injuries: Injury[];
};

export default function KnicksDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${PROXY_URL}${encodeURIComponent(
            BASE_URL + "?enable=leaders,roster,injuries"
          )}`
        );

        if (!response.ok) throw new Error("API Error");

        const json = await response.json();
        const team = json.team;

        // helper to map ESPN leader categories
        const findLeader = (catName: string) => {
          const cat = team.leaders?.find((c: any) => c.name === catName);
          const leader = cat?.leaders?.[0];
          if (!leader) return null;
          return {
            value: leader.value?.toString() ?? "",
            name: leader.athlete.displayName,
            img:
              leader.athlete.headshot?.href ||
              "https://a.espncdn.com/i/headshots/nba/players/full/placeholder.png",
          };
        };

        const pts =
          findLeader("points") || {
            value: FALLBACK_DATA.leaders[0].value,
            name: FALLBACK_DATA.leaders[0].name,
            img: FALLBACK_DATA.leaders[0].img,
          };
        const reb =
          findLeader("rebounds") || {
            value: FALLBACK_DATA.leaders[1].value,
            name: FALLBACK_DATA.leaders[1].name,
            img: FALLBACK_DATA.leaders[1].img,
          };
        const ast =
          findLeader("assists") || {
            value: FALLBACK_DATA.leaders[2].value,
            name: FALLBACK_DATA.leaders[2].name,
            img: FALLBACK_DATA.leaders[2].img,
          };
        const stl =
          findLeader("steals") || {
            value: FALLBACK_DATA.leaders[3].value,
            name: FALLBACK_DATA.leaders[3].name,
            img: FALLBACK_DATA.leaders[3].img,
          };
        const blk =
          findLeader("blocks") || {
            value: FALLBACK_DATA.leaders[4].value,
            name: FALLBACK_DATA.leaders[4].name,
            img: FALLBACK_DATA.leaders[4].img,
          };

        const leaders: LeaderDisplay[] = [
          {
            label: "PTS",
            ...pts,
            color: "text-blue-600",
            bg: "bg-blue-100",
            border: "border-blue-600",
          },
          {
            label: "REB",
            ...reb,
            color: "text-orange-500",
            bg: "bg-orange-100",
            border: "border-orange-500",
          },
          {
            label: "AST",
            ...ast,
            color: "text-gray-800",
            bg: "bg-gray-200",
            border: "border-gray-800",
          },
          {
            label: "STL",
            ...stl,
            color: "text-teal-600",
            bg: "bg-teal-100",
            border: "border-teal-600",
          },
          {
            label: "BLK",
            ...blk,
            color: "text-purple-600",
            bg: "bg-purple-100",
            border: "border-purple-600",
          },
        ];

        const nextEvent = team.nextEvent?.[0];
        const nextGame: NextGame | null = nextEvent
          ? {
              date: nextEvent.date,
              name: nextEvent.name,
              venue: nextEvent.competitions?.[0]?.venue?.fullName,
              opponent: nextEvent.competitions?.[0]?.competitors?.find(
                (c: any) => c.team.id !== TEAM_ID
              )?.team,
              tickets: nextEvent.links?.find((l: any) =>
                l.text?.toLowerCase().includes("tickets")
              )?.href,
            }
          : null;

        setData({
          record: team.record?.items?.[0]?.summary,
          standing: team.standingSummary,
          leaders,
          nextGame,
          injuries: team.injuries || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed, using fallback", err);
        setError(true);

        const styles = [
          {
            color: "text-blue-600",
            bg: "bg-blue-100",
            border: "border-blue-600",
          },
          {
            color: "text-orange-500",
            bg: "bg-orange-100",
            border: "border-orange-500",
          },
          {
            color: "text-gray-800",
            bg: "bg-gray-200",
            border: "border-gray-800",
          },
          {
            color: "text-teal-600",
            bg: "bg-teal-100",
            border: "border-teal-600",
          },
          {
            color: "text-purple-600",
            bg: "bg-purple-100",
            border: "border-purple-600",
          },
        ];

        const fallbackFormatted: LeaderDisplay[] = FALLBACK_DATA.leaders.map(
          (l, i) => ({
            ...l,
            ...styles[i],
          })
        );

        setData({
          record: FALLBACK_DATA.record,
          standing: FALLBACK_DATA.standing,
          leaders: fallbackFormatted,
          nextGame: {
            ...FALLBACK_DATA.nextGame,
            opponent: {
              abbreviation: "UTAH",
              logos: [{ href: FALLBACK_DATA.nextGame.opponentLogo }],
            },
          },
          injuries: [
            {
              athlete: { displayName: "OG Anunoby" },
              status: "Questionable",
              type: "Hamstring",
            },
            {
              athlete: { displayName: "Mitchell Robinson" },
              status: "Out",
              type: "Ankle",
            },
            {
              athlete: { displayName: "Landry Shamet" },
              status: "Out",
              type: "Shoulder",
            },
          ],
        });
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Loading Knicks Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20">
      {/* NAVBAR */}
      <nav className="bg-[#1d428a] text-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://a.espncdn.com/i/teamlogos/nba/500/ny.png"
                alt="Logo"
                className="h-10 w-10 drop-shadow-md"
              />
              <span className="text-xl font-extrabold tracking-tight">
                NY KNICKS
              </span>
            </div>
            <div className="hidden space-x-6 text-sm font-semibold md:flex">
              <a href="#" className="transition hover:text-[#f58426]">
                Roster
              </a>
              <a href="#" className="transition hover:text-[#f58426]">
                Schedule
              </a>
              <a
                href="#"
                className="rounded-full bg-[#f58426] px-4 py-2 shadow-md transition hover:bg-orange-600"
              >
                Buy Tickets
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden bg-[#1d428a] pb-12 pt-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#1d428a] opacity-90" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f58426] opacity-20 blur-3xl mix-blend-multiply" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center space-x-4 md:justify-start">
              <img
                src="https://a.espncdn.com/i/teamlogos/nba/500/ny.png"
                className="h-28 w-28 drop-shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-black tracking-tighter md:text-7xl">
                  KNICKS
                </h1>
                <p className="text-xl font-bold tracking-widest text-[#f58426]">
                  NEW YORK
                </p>
              </div>
            </div>
            <div className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
              <div className="mr-6">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Record
                </p>
                <p className="font-mono text-3xl font-bold">{data.record}</p>
              </div>
              <div className="mx-2 h-8 w-px bg-white/20" />
              <div className="ml-2">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Standing
                </p>
                <p className="text-lg font-semibold text-[#f58426]">
                  {data.standing}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Next game */}
          {data.nextGame && (
            <div className="w-full max-w-sm rounded-2xl border-4 border-[#f58426]/30 bg-white/95 p-6 text-slate-900 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="flex items-center text-xs font-bold uppercase text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" /> Next Game
                </span>
                <span className="text-xs font-bold text-[#1d428a]">
                  {new Date(data.nextGame.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="w-1/3 text-center">
                  <img
                    src="https://a.espncdn.com/i/teamlogos/nba/500/ny.png"
                    className="mx-auto mb-2 h-12 w-12"
                  />
                  <span className="text-lg font-black">NY</span>
                </div>
                <div className="w-1/3 text-center text-sm font-bold text-gray-400">
                  VS
                </div>
                <div className="w-1/3 text-center">
                  <img
                    src={data.nextGame.opponent?.logos?.[0]?.href}
                    className="mx-auto mb-2 h-12 w-12"
                  />
                  <span className="text-lg font-black">
                    {data.nextGame.opponent?.abbreviation}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-center">
                <div className="rounded-lg bg-gray-100 py-2">
                  <Countdown date={data.nextGame.date} />
                </div>
                <p className="flex items-center justify-center text-xs font-medium text-gray-500">
                  <MapPin className="mr-1 h-3 w-3" /> {data.nextGame.venue}
                </p>
                {data.nextGame.tickets && (
                  <a
                    href={data.nextGame.tickets}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-[#1d428a] py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
                  >
                    Get Tickets <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 -mt-8 mx-auto max-w-7xl px-4">
        {/* Leaders */}
        <div className="mb-12">
          <h2 className="mb-4 flex items-center text-xl font-bold text-white">
            <Trophy className="mr-2 h-5 w-5 text-[#f58426]" /> Season Leaders
            {error && (
              <span className="ml-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                Offline Mode
              </span>
            )}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data.leaders.map((leader, idx) => (
              <div
                key={idx}
                className={`rounded-xl border-t-4 bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-1 ${leader.border}`}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <img
                      src={leader.img}
                      className="h-16 w-16 rounded-full border-2 border-gray-100 object-cover shadow-sm"
                      alt={leader.name}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 border border-white px-1.5 py-0.5 text-[10px] font-black ${leader.bg} ${leader.color} rounded-full`}
                    >
                      {leader.label}
                    </span>
                  </div>
                  <h3 className="flex h-8 items-center justify-center text-center text-sm font-bold text-gray-900 leading-tight">
                    {leader.name}
                  </h3>
                  <p className={`mt-1 text-2xl font-black ${leader.color}`}>
                    {leader.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase text-gray-400">
                    Per Game
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lineup + Injuries */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Lineup */}
          <div className="lg:col-span-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="flex items-center font-bold text-gray-800">
                <Users className="mr-2 h-5 w-5 text-gray-500" /> Projected
                Starting 5
              </h3>
              <span className="rounded-full border border-green-200 bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                ACTIVE
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                {[
                  {
                    pos: "PG",
                    name: "Jalen Brunson",
                    img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3934672.png",
                  },
                  {
                    pos: "SG",
                    name: "Mikal Bridges",
                    img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066337.png",
                  },
                  {
                    pos: "SF",
                    name: "Josh Hart",
                    img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3062679.png",
                  },
                  {
                    pos: "PF",
                    name: "OG Anunoby",
                    img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3934719.png",
                  },
                  {
                    pos: "C",
                    name: "Karl-Anthony Towns",
                    img: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136195.png",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer flex-col items-center"
                  >
                    <div className="relative">
                      <img
                        src={p.img}
                        className="mb-2 h-14 w-14 rounded-full border-2 border-transparent object-cover transition group-hover:border-[#f58426]"
                      />
                      <div className="absolute left-0 top-0 rounded-br-lg bg-gray-900 px-1 text-[9px] font-bold text-white">
                        {p.pos}
                      </div>
                    </div>
                    <span className="text-center text-xs font-bold text-gray-800">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Injuries */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
            <div className="border-b border-red-100 bg-red-50 px-6 py-4">
              <h3 className="flex items-center font-bold text-red-900">
                <Activity className="mr-2 h-5 w-5 text-red-600" /> Injury Report
              </h3>
            </div>
            <div className="max-h-[250px] divide-y divide-gray-100 overflow-y-auto">
              {data.injuries.length > 0 ? (
                data.injuries.map((inj, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {inj.athlete.displayName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {inj.type || "Undisclosed"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                        inj.status === "Out"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {inj.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-gray-400">
                  No active injuries reported
                </div>
              )}
            </div>
          </div>
        </div>

        {/* League Comparison */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h3 className="mb-6 flex items-center font-bold text-gray-800">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" /> League
            Comparison
          </h3>
          <div className="space-y-6">
            <StatBar
              label="Offense (PPG)"
              value="120.2"
              rank={6}
              color="bg-[#f58426]"
            />
            <StatBar
              label="Defense (Opp PPG)"
              value="113.0"
              rank={4}
              color="bg-[#1d428a]"
            />
            <StatBar
              label="Rebounding"
              value="45.7"
              rank={8}
              color="bg-green-500"
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold uppercase text-gray-400">
            <span>League Worst</span>
            <span>League Average</span>
            <span>League Best</span>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-xs text-gray-400">
        <p>Data provided by ESPN API. Not affiliated with the NBA.</p>
      </footer>
    </div>
  );
}

function Countdown({ date }: { date: string }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    if (difference <= 0) return null;
    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft>>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft) {
    return <span className="font-bold text-red-600">LIVE / FINAL</span>;
  }

  return (
    <div className="flex justify-center space-x-3 font-mono font-bold text-[#f58426]">
      <div>{timeLeft.d}d</div>
      <div>:</div>
      <div>{String(timeLeft.h).padStart(2, "0")}h</div>
      <div>:</div>
      <div>{String(timeLeft.m).padStart(2, "0")}m</div>
      <div>:</div>
      <div>{String(timeLeft.s).padStart(2, "0")}s</div>
    </div>
  );
}

function StatBar({
  label,
  value,
  rank,
  color,
}: {
  label: string;
  value: string;
  rank: number;
  color: string;
}) {
  // 30 teams; rank 1 = 100%, 30 = 0%
  const percentage = Math.round(((31 - rank) / 30) * 100);

  return (
    <div className="relative">
      <div className="mb-1 flex items-end justify-between">
        <span className="text-xs font-bold uppercase text-gray-500">
          {label}
        </span>
        <div className="text-right">
          <span className="mr-2 text-lg font-black text-gray-900">
            {value}
          </span>
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-600">
            Rank #{rank}
          </span>
        </div>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}