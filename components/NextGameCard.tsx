// components/knicks/NextGameCard.tsx
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Countdown from "./Countdown";
import { NextGame } from "./types";

type NextGameCardProps = {
  nextGame: NextGame;
};

export default function NextGameCard({ nextGame }: NextGameCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border-4 border-[#f58426]/30 bg-white/95 p-6 text-slate-900 shadow-2xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
        <span className="flex items-center text-xs font-bold uppercase text-gray-500">
          <Calendar className="mr-1 h-3 w-3" /> Next Game
        </span>
        <span className="text-xs font-bold text-[#1d428a]">
          {new Date(nextGame.date).toLocaleDateString("en-US", {
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
            src={nextGame.opponent?.logos?.[0]?.href}
            className="mx-auto mb-2 h-12 w-12"
          />
          <span className="text-lg font-black">
            {nextGame.opponent?.abbreviation}
          </span>
        </div>
      </div>

      <div className="space-y-3 text-center">
        <div className="rounded-lg bg-gray-100 py-2">
          <Countdown date={nextGame.date} />
        </div>
        <p className="flex items-center justify-center text-xs font-medium text-gray-500">
          <MapPin className="mr-1 h-3 w-3" /> {nextGame.venue}
        </p>
        {nextGame.tickets && (
          <a
            href={nextGame.tickets}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-lg bg-[#1d428a] py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            Get Tickets <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}