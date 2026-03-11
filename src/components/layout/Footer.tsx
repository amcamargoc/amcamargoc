import { Terminal, CloudIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="h-6 flex items-center text-[11px] font-bold shrink-0 w-full">
      <div className="bg-tui-magenta text-black px-3 h-full flex items-center">
        COMMAND
      </div>
      <div className="bg-tui-gray text-white px-3 h-full flex items-center gap-2">
        <Terminal size={14} />
        <span>zsh</span>
      </div>
      <div className="flex-1 bg-black h-full flex items-center px-4 border-t border-tui-gray flex gap-4 overflow-hidden">
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-tui-cyan">●</span>
          <span className="text-tui-dim">1 error</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-tui-magenta">▲</span>
          <span className="text-tui-dim">0 warnings</span>
        </div>
        <div className="ml-auto text-tui-dim flex items-center gap-2 truncate">
          <span>:</span>
          <span className="text-white">Telescope find_files</span>
          <div className="cursor-block shrink-0"></div>
        </div>
      </div>
      <div className="bg-tui-cyan text-black px-3 h-full flex items-center gap-2 shrink-0">
        <CloudIcon size={14} className="fill-current" />
        <span>GITHUB</span>
      </div>
    </footer>
  );
}