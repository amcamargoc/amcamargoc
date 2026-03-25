import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="h-6 flex items-center text-[11px] font-bold shrink-0 w-full bg-black border-t border-tui-gray">
      <div className="flex-1 px-4 h-full flex items-center overflow-hidden">
        <div className="text-tui-dim flex items-center gap-2 truncate">
          <span>:</span>
          <span className="text-white">Telescope find_files</span>
          <div className="cursor-block shrink-0"></div>
        </div>
      </div>
      <a
        href="https://github.com/amcamargoc"
        target="_blank"
        rel="noreferrer"
        className="text-tui-dim hover:text-tui-cyan px-4 h-full flex items-center gap-2 shrink-0 transition-colors"
      >
        <Github size={14} className="fill-current" />
        <span className="hidden sm:inline">GITHUB</span>
      </a>
    </footer>
  );
}
