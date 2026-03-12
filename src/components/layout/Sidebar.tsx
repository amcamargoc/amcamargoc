"use client";

import { useAppStore } from "@/store/useAppStore";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { sidebarOpen, openTab, toggleSidebar, activeTabId, tabs } = useAppStore();
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  // Helper to determine if a file is active based on its title
  const isActive = (title: string) => {
    const activeTab = tabs.find((t) => t.id === activeTabId);
    return activeTab?.title === title;
  };

  return (
    <aside
      className={`border-r border-tui-gray flex flex-col shrink-0 bg-black h-full transition-[width] duration-200 ease-in-out ${
        sidebarOpen ? "w-[260px]" : "w-0 border-r-0"
      } overflow-hidden`}
    >
      <div className="p-3 text-tui-cyan text-xs flex items-center gap-2 border-b border-tui-gray shrink-0 min-w-[260px]">
        <Folder size={12} className="shrink-0" />
        <span className="font-bold">EXPLORER</span>
        <button
          onClick={toggleSidebar}
          className="text-[10px] text-tui-dim ml-auto hover:text-white"
        >
          CTRL-B
        </button>
      </div>

      <div className="flex-1 p-2 text-[12px] overflow-y-auto custom-scrollbar min-w-[260px]">
        <div className="flex items-center gap-2 text-tui-magenta mb-2 px-2">
          <ChevronDown size={14} className="shrink-0" />
          <span className="font-bold">/root</span>
        </div>

        <ul className="space-y-[2px] font-medium w-full">
          {/* Bio File */}
          <li>
            <button
              className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                isActive("bio.md")
                  ? "bg-white/10 text-white"
                  : "text-tui-cyan hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => openTab({ type: "bio", title: "bio.md" })}
            >
              <FileText size={12} className={`shrink-0 ${isActive("bio.md") ? "opacity-100" : "opacity-70"}`} />
              <span>bio.md</span>
            </button>
          </li>

          {/* Projects Folder */}
          <li>
            <button
              className="w-full flex items-center gap-2 px-2 py-1 rounded-sm text-tui-magenta cursor-pointer hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              {projectsExpanded ? <ChevronDown size={12} className="shrink-0" /> : <ChevronRight size={12} className="shrink-0" />}
              <Folder size={12} className="shrink-0 opacity-70" />
              <span>projects</span>
            </button>

            {projectsExpanded && (
              <ul className="space-y-[2px] mt-[2px] w-full">
                <li>
                  <button
                    className={`w-full flex items-center gap-2 pl-8 pr-2 py-1 rounded-sm cursor-pointer transition-colors ${
                      isActive("portfolio.ts")
                        ? "bg-white/10 text-white"
                        : "text-tui-dim hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => openTab({ type: "projects", title: "portfolio.ts" })}
                  >
                    <FileText size={12} className="shrink-0" />
                    <span>portfolio.ts</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center gap-2 pl-8 pr-2 py-1 rounded-sm cursor-pointer transition-colors ${
                      isActive("mokoa.tsx")
                        ? "bg-white/10 text-white"
                        : "text-tui-dim hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => openTab({ type: "projects", title: "mokoa.tsx" })}
                  >
                    <FileText size={12} className="shrink-0" />
                    <span>mokoa.tsx</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center gap-2 pl-8 pr-2 py-1 rounded-sm cursor-pointer transition-colors ${
                      isActive("cosmic.ts")
                        ? "bg-white/10 text-white"
                        : "text-tui-dim hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => openTab({ type: "projects", title: "cosmic.ts" })}
                  >
                    <FileText size={12} className="shrink-0" />
                    <span>cosmic.ts</span>
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Experience File */}
          <li>
            <button
              className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                isActive("experience.log")
                  ? "bg-white/10 text-white"
                  : "text-tui-cyan hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => openTab({ type: "experience", title: "experience.log" })}
            >
              <FileText size={12} className={`shrink-0 ${isActive("experience.log") ? "opacity-100" : "opacity-70"}`} />
              <span>experience.log</span>
            </button>
          </li>

          {/* Init File */}
          <li>
            <button
              className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                isActive("init.lua")
                  ? "bg-white/10 text-white"
                  : "text-tui-cyan hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => openTab({ type: "dashboard", title: "init.lua" })}
            >
              <FileText size={12} className={`shrink-0 ${isActive("init.lua") ? "opacity-100" : "opacity-70"}`} />
              <span>init.lua</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
