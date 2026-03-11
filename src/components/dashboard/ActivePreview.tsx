import Image from "next/image";

export default function ActivePreview() {
  return (
    <div className="border border-tui-magenta/30 bg-tui-magenta/5 p-4 rounded-sm mt-8 w-full transition-colors hover:border-tui-magenta/70">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-tui-magenta font-bold">PREVIEW: MOKOA_PLATFORM</h2>
        <span className="text-[10px] bg-tui-magenta text-black px-1 font-bold">ACTIVE</span>
      </div>
      <div className="flex gap-4">
        <div className="w-32 h-20 shrink-0 border border-tui-gray grayscale hover:grayscale-0 transition-all cursor-pointer relative overflow-hidden group">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzmLidcZIeHWdeA1krVeokw5LztakFZko1BNL1EGepIqx2h-AGANfP4ieuxBSs_PcGFTthWaSzXfGw8B8nB0RMLhyzuqPDyP-WWZZKxW3LIRVt5emEXZPkfJH5-DEYb7PcSxbelI6dFWvEAx1e5UijyOOsbfvuYf1mZKYusJyM7yIPufrc2L_ycFxTcAS6xh0FFPxaGlgkZCElI7ni9v0cm5VVgjVbmoxmNxIQy9eEdWK9ghmjKEQZwMQ3XQjaafLPYcOo7DSaX88"
            alt="Mokoa Platform Preview"
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        </div>
        <div className="text-[11px] text-tui-dim leading-relaxed flex flex-col justify-center">
          <p className="text-white mb-2 underline decoration-tui-cyan underline-offset-2">WEB_ECOSYSTEM.TSX</p>
          <p>STX: REACT, NODE, AWS</p>
          <p>DSC: DIGITAL ASSET ECOSYSTEM WITH REAL-TIME ANALYTICS</p>
        </div>
      </div>
    </div>
  );
}