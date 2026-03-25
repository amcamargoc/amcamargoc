import { GitBranch, Terminal } from "lucide-react";

export default function Header() {
  return (
    <header className="h-6 flex items-center text-[11px] font-bold shrink-0 w-full select-none overflow-hidden">
      <div className="bg-tui-cyan text-black px-3 h-full flex items-center gap-1.5 whitespace-nowrap">
        <Terminal size={12} className="shrink-0" />
        <span className="hidden sm:inline">GUEST_SESSION</span>
        <span className="sm:hidden">GUEST</span>
      </div>

      <div className="bg-tui-gray text-white px-3 h-full flex items-center gap-2 whitespace-nowrap">
        <span className="text-tui-magenta">beto</span>
        <span className="text-tui-dim">.</span>
        <span className="text-white">world</span>
      </div>

      <div className="flex-1 bg-black h-full border-b border-tui-gray min-w-0">
      </div>

      <div className="bg-tui-magenta text-black px-3 h-full flex items-center gap-1.5 whitespace-nowrap">
        <GitBranch size={12} className="shrink-0" />
        <span>MAIN</span>
      </div>
    </header>
  );
}
