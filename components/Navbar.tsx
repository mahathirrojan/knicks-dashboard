// components/knicks/Navbar.tsx
export default function Navbar() {
  return (
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
  );
}