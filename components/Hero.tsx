// components/knicks/Hero.tsx
type HeroProps = {
  record?: string;
  standing?: string;
};

export default function Hero({ record, standing }: HeroProps) {
  return (
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
          <p className="font-mono text-3xl font-bold">{record}</p>
        </div>
        <div className="mx-2 h-8 w-px bg-white/20" />
        <div className="ml-2">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Standing
          </p>
          <p className="text-lg font-semibold text-[#f58426]">{standing}</p>
        </div>
      </div>
    </div>
  );
}