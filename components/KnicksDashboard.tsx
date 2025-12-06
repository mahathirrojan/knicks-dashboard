"use client";

import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import NextGameCard from "./NextGameCard";
import LeadersSection from "./LeadersSection";
import LineupSection from "./LineupSection";
import InjuryReport from "./InjuryReport";
import LeagueComparison from "./LeagueComparison";

import {
  BASE_URL,
  PROXY_URL,
  TEAM_ID,
  FALLBACK_DATA,
  DashboardData,
  LeaderDisplay,
  NextGame,
} from "./types";

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
      <Navbar />

      <header className="relative overflow-hidden bg-[#1d428a] pb-12 pt-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#1d428a] opacity-90" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f58426] opacity-20 blur-3xl mix-blend-multiply" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
          <Hero record={data.record} standing={data.standing} />
          {data.nextGame && <NextGameCard nextGame={data.nextGame} />}
        </div>
      </header>

      <main className="relative z-10 -mt-8 mx-auto max-w-7xl px-4">
        <LeadersSection leaders={data.leaders} error={error} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <LineupSection />
          <InjuryReport injuries={data.injuries} />
        </div>

        <LeagueComparison />
      </main>

      <footer className="mt-12 text-center text-xs text-gray-400">
        <p>Data provided by ESPN API. Not affiliated with the NBA.</p>
      </footer>
    </div>
  );
}