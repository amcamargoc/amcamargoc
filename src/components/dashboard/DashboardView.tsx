import AsciiLogo from "./AsciiLogo";
import InteractiveMenu from "./InteractiveMenu";

export default function DashboardView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar flex flex-col items-center justify-between min-h-full bg-black relative">
      {/* Version info - Top Right style */}
      <div className="absolute top-8 right-8 text-right hidden md:block">
        <p className="text-tui-dim text-tui-xs font-mono leading-tight">
          NVIM v0.10.0-dev<br />
          Build: amcamargoc-main<br />
          LuaJIT 2.1.1710088188
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center text-center my-auto">
        <div className="mb-4">
          <AsciiLogo />
        </div>

        <div className="max-w-lg mb-12">
          <p className="text-tui-dim font-mono text-sm leading-relaxed">
            Transforming ideas from concept to reality is a superpower
          </p>
        </div>

        <div className="w-full flex justify-center">
          <InteractiveMenu />
        </div>
      </div>

      {/* Shortcut hints */}
      <div className="mt-auto pt-4 w-full flex flex-nowrap items-center justify-center gap-3 sm:gap-6 pb-4 opacity-70">
        <div className="text-tui-micro font-mono whitespace-nowrap shrink-0">
          <span className="text-tui-magenta mr-1 sm:mr-2">ALT+1-9</span>
          <span className="text-tui-dim hidden sm:inline">NAVIGATE</span>
          <span className="text-tui-dim sm:hidden">NAV</span>
        </div>
        <div className="text-tui-micro font-mono whitespace-nowrap shrink-0">
          <span className="text-tui-magenta mr-1 sm:mr-2">ALT+H/L</span>
          <span className="text-tui-dim">PREV/NEXT</span>
        </div>
        <div className="text-tui-micro font-mono whitespace-nowrap shrink-0">
          <span className="text-tui-magenta mr-1 sm:mr-2">ALT+X</span>
          <span className="text-tui-dim">CLOSE</span>
        </div>
      </div>
    </div>
  );
}
