"use client";

import { useAppStore } from "@/store/useAppStore";

export default function InteractiveMenu() {
  const { openTab } = useAppStore();

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <div
        onClick={() => openTab({ type: "projects", title: "projects/" })}
        className="group flex items-center justify-between border border-tui-gray p-3 hover:border-tui-cyan cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-tui-dim">[f]</span>
          <span className="text-white group-hover:text-tui-cyan transition-colors">FIND PROJECTS</span>
        </div>
        <span className="text-[10px] text-tui-dim">LEADER f p</span>
      </div>

      <div
        onClick={() => openTab({ type: "bio", title: "bio.md" })}
        className="group flex items-center justify-between border border-tui-gray p-3 hover:border-tui-cyan cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-tui-dim">[e]</span>
          <span className="text-white group-hover:text-tui-cyan transition-colors">EDIT BIO</span>
        </div>
        <span className="text-[10px] text-tui-dim">LEADER e b</span>
      </div>

      <div
        onClick={() => openTab({ type: "experience", title: "experience.log" })}
        className="group flex items-center justify-between border border-tui-gray p-3 hover:border-tui-cyan cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-tui-dim">[r]</span>
          <span className="text-white group-hover:text-tui-cyan transition-colors">EXPERIENCE LOG</span>
        </div>
        <span className="text-[10px] text-tui-dim">LEADER f r</span>
      </div>

      <div
        onClick={() => alert("Terminal quit simulation: This would close the app or navigate away.")}
        className="group flex items-center justify-between border border-tui-gray p-3 hover:border-tui-magenta cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-tui-dim">[q]</span>
          <span className="text-white group-hover:text-tui-magenta transition-colors">QUIT TERMINAL</span>
        </div>
        <span className="text-[10px] text-tui-dim">:q</span>
      </div>
    </div>
  );
}