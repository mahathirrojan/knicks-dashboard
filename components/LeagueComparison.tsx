// components/knicks/LeagueComparison.tsx
import { TrendingUp } from "lucide-react";
import StatBar from "./StatBar";

export default function LeagueComparison() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h3 className="mb-6 flex items-center font-bold text-gray-800">
        <TrendingUp className="mr-2 h-5 w-5 text-blue-600" /> League Comparison
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
  );
}