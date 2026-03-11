export default function Header() {
  return (
    <header className="h-6 flex items-center text-[11px] font-bold shrink-0 w-full">
      <div className="bg-tui-cyan text-black px-3 h-full flex items-center">
        NORMAL
      </div>
      <div className="bg-tui-gray text-white px-3 h-full flex items-center gap-2">
        <span>~/alberto_camargo</span>
        <span className="text-tui-dim">/</span>
        <span className="text-tui-magenta">init.lua</span>
      </div>
      <div className="flex-1 bg-black h-full flex items-center px-4 border-b border-tui-gray">
        <span className="text-tui-dim lowercase">utf-8 [unix]</span>
      </div>
      <div className="bg-tui-gray text-white px-3 h-full flex items-center">
        100%
      </div>
      <div className="bg-tui-magenta text-black px-3 h-full flex items-center">
        LN 1:1
      </div>
    </header>
  );
}