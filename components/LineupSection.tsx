// components/knicks/LineupSection.tsx
import { Users } from "lucide-react";

export default function LineupSection() {
  const lineup = [
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
  ];

  return (
    <div className="lg:col-span-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h3 className="flex items-center font-bold text-gray-800">
          <Users className="mr-2 h-5 w-5 text-gray-500" /> Projected Starting 5
        </h3>
        <span className="rounded-full border border-green-200 bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
          ACTIVE
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {lineup.map((p, i) => (
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
  );
}