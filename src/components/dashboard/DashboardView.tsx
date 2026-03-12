import AsciiLogo from "./AsciiLogo";
import InteractiveMenu from "./InteractiveMenu";

export default function DashboardView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar flex flex-col items-center justify-center min-h-full bg-black relative">
      {/* Version info - Top Right style */}
      <div className="absolute top-8 right-8 text-right hidden md:block">
        <p className="text-tui-dim text-[10px] font-mono leading-tight">
          NVIM v0.10.0-dev<br />
          Build: amcamargoc-main<br />
          LuaJIT 2.1.1710088188
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <div className="mb-4">
          <AsciiLogo />
        </div>

        <div className="max-w-md mb-12">
          <p className="text-tui-dim font-mono text-sm leading-relaxed">
            I believe that code can transform our world for the better. I transform ideas from concept to reality and make them accessible to everyone.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <InteractiveMenu />
        </div>

        {/* Shortcut hints */}
        <div className="mt-20 pt-8 border-t border-tui-gray/20 w-full max-w-sm flex flex-wrap justify-center gap-x-6 gap-y-2">
          <div className="text-[10px] font-mono whitespace-nowrap">
            <span className="text-tui-magenta mr-2">ALT+1-9</span>
            <span className="text-tui-dim">NAVIGATE</span>
          </div>
          <div className="text-[10px] font-mono whitespace-nowrap">
            <span className="text-tui-magenta mr-2">ALT+H/L</span>
            <span className="text-tui-dim">PREV/NEXT</span>
          </div>
          <div className="text-[10px] font-mono whitespace-nowrap">
            <span className="text-tui-magenta mr-2">ALT+X</span>
            <span className="text-tui-dim">CLOSE TAB</span>
          </div>
        </div>
      </div>
    </div>
  );
}