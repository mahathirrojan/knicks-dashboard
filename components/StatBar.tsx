// components/knicks/StatBar.tsx
type StatBarProps = {
  label: string;
  value: string;
  rank: number;
  color: string; // Tailwind bg class
};

export default function StatBar({ label, value, rank, color }: StatBarProps) {
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