"use client";

import { useAppStore } from "@/store/useAppStore";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { sidebarOpen, openTab, toggleSidebar } = useAppStore();
  const [projectsOpen, setProjectsOpen] = useState(true);

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 border-r border-tui-gray flex flex-col shrink-0 bg-black hidden md:flex h-full">
      <div className="p-3 text-tui-cyan text-xs flex items-center gap-2 border-b border-tui-gray shrink-0">
        <Folder size={12} className="shrink-0" />
        <span className="font-bold">EXPLORER</span>
        <button
          onClick={toggleSidebar}
          className="text-[10px] text-tui-dim ml-auto hover:text-white"
        >
          CTRL-B
        </button>
      </div>

      <div className="flex-1 p-2 text-[12px] space-y-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-tui-magenta mb-2">
          <ChevronDown size={14} className="shrink-0" />
          <span className="font-bold">/root</span>
        </div>

        <div className="pl-4 space-y-1 font-medium">
          {/* Bio File */}
          <div
            className="group flex items-center gap-2 text-tui-cyan cursor-pointer hover:text-white transition-colors"
            onClick={() => openTab({ type: "bio", title: "bio.md" })}
          >
            <span className="text-tui-dim group-hover:text-tui-cyan">├─</span>
            <FileText size={12} className="shrink-0 opacity-70 group-hover:opacity-100" />
            <span>bio.md</span>
          </div>

          {/* Projects Folder */}
          <div>
            <div
              className="group flex items-center gap-2 text-tui-magenta cursor-pointer hover:text-white transition-colors"
              onClick={() => setProjectsOpen(!projectsOpen)}
            >
              <span className="text-tui-dim group-hover:text-tui-magenta">├─</span>
              {projectsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              <Folder size={12} className="shrink-0 opacity-70 group-hover:opacity-100" />
              <span>projects</span>
            </div>

            {projectsOpen && (
              <div className="pl-6 space-y-1 mt-1">
                <div
                  className="flex items-center gap-2 text-tui-dim hover:text-white cursor-pointer transition-colors"
                  onClick={() => openTab({ type: "projects", title: "portfolio.ts" })}
                >
                  <span>│  ├─</span>
                  <FileText size={10} className="shrink-0" />
                  <span>portfolio.ts</span>
                </div>
                <div
                  className="flex items-center gap-2 text-tui-dim hover:text-white cursor-pointer transition-colors"
                  onClick={() => openTab({ type: "projects", title: "mokoa.tsx" })}
                >
                  <span>│  ├─</span>
                  <FileText size={10} className="shrink-0" />
                  <span>mokoa.tsx</span>
                </div>
                <div
                  className="flex items-center gap-2 text-tui-dim hover:text-white cursor-pointer transition-colors"
                  onClick={() => openTab({ type: "projects", title: "cosmic.ts" })}
                >
                  <span>│  └─</span>
                  <FileText size={10} className="shrink-0" />
                  <span>cosmic.ts</span>
                </div>
              </div>
            )}
          </div>

          {/* Experience File */}
          <div
            className="group flex items-center gap-2 text-tui-cyan cursor-pointer hover:text-white transition-colors mt-1"
            onClick={() => openTab({ type: "experience", title: "experience.log" })}
          >
            <span className="text-tui-dim group-hover:text-tui-cyan">├─</span>
            <FileText size={12} className="shrink-0 opacity-70 group-hover:opacity-100" />
            <span>experience.log</span>
          </div>

          {/* Init File */}
          <div
            className="group flex items-center gap-2 text-tui-cyan cursor-pointer hover:text-white transition-colors"
            onClick={() => openTab({ type: "dashboard", title: "init.lua" })}
          >
            <span className="text-tui-dim group-hover:text-tui-cyan">└─</span>
            <FileText size={12} className="shrink-0 opacity-70 group-hover:opacity-100" />
            <span>init.lua</span>
          </div>
        </div>
      </div>
    </aside>
  );
}