// components/knicks/LeadersSection.tsx
import { Trophy } from "lucide-react";
import { LeaderDisplay } from "./types";

type LeadersSectionProps = {
  leaders: LeaderDisplay[];
  error: boolean;
};

export default function LeadersSection({ leaders, error }: LeadersSectionProps) {
  return (
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
        {leaders.map((leader, idx) => (
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
  );
}