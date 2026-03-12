"use client";

import { useAppStore, ViewType } from "@/store/useAppStore";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { openTab, activeTabId, tabs } = useAppStore();
  const [betoExpanded, setBetoExpanded] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  // Helper to determine if a file is active based on its path
  const isActive = (path: string) => {
    const activeTab = tabs.find((t) => t.id === activeTabId);
    return activeTab?.path === path;
  };

  const NavItem = ({
    title,
    path,
    type,
    icon: Icon,
    level = 0
  }: {
    title: string;
    path: string;
    type: ViewType;
    icon: any;
    level?: number
  }) => (
    <li>
      <button
        className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer transition-colors ${isActive(path)
          ? "bg-white/10 text-white"
          : "text-tui-cyan hover:bg-white/5 hover:text-white"
          }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => openTab({ type, title, path })}
      >
        <Icon size={12} className={`shrink-0 ${isActive(path) ? "opacity-100" : "opacity-70"}`} />
        <span>{title}</span>
      </button>
    </li>
  );

  const FolderItem = ({
    title,
    isOpen,
    toggle,
    level = 0,
    isRoot = false
  }: {
    title: string;
    isOpen: boolean;
    toggle?: () => void;
    level?: number;
    isRoot?: boolean
  }) => (
    <li>
      <button
        className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm text-tui-magenta cursor-pointer hover:bg-white/5 hover:text-white transition-colors`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={toggle}
      >
        {isOpen ? <ChevronDown size={12} className="shrink-0" /> : <ChevronRight size={12} className="shrink-0" />}
        <Folder size={12} className="shrink-0 opacity-70" />
        <span className={`font-bold ${isRoot ? "text-tui-magenta" : ""}`}>{title}</span>
      </button>
    </li>
  );

  return (
    <aside className="border-r border-tui-gray flex flex-col shrink-0 bg-black h-full w-[260px] overflow-hidden">
      <div className="p-3 text-tui-cyan text-xs flex items-center gap-2 border-b border-tui-gray shrink-0 min-w-[260px]">
        <Folder size={12} className="shrink-0" />
        <span className="font-bold">EXPLORER</span>
      </div>

      <div className="flex-1 p-2 text-[12px] overflow-y-auto custom-scrollbar min-w-[260px]">
        <ul className="space-y-[2px] font-medium w-full">
          {/* Root Folder: /humans/character/beto/ */}
          <FolderItem
            title="/humans/character/beto/"
            isOpen={betoExpanded}
            toggle={() => setBetoExpanded(!betoExpanded)}
            isRoot={true}
          />

          {betoExpanded && (
            <ul className="relative ml-4 border-l border-tui-gray/60 space-y-[2px]">
              <NavItem title="index.md" path="/humans/character/beto/index.md" type="dashboard" icon={FileText} level={0} />

              {/* Projects Folder */}
              <FolderItem
                title="projects"
                isOpen={projectsExpanded}
                toggle={() => setProjectsExpanded(!projectsExpanded)}
                level={0}
              />

              {projectsExpanded && (
                <ul className="relative ml-4 border-l border-tui-gray/60 space-y-[2px]">
                  <NavItem title="index.md" path="/humans/character/beto/projects/index.md" type="projects" icon={FileText} level={0} />
                  <NavItem title="muikao.md" path="/humans/character/beto/projects/muikao.md" type="projects" icon={FileText} level={0} />
                  <NavItem title="führerschein_fragen.md" path="/humans/character/beto/projects/führerschein_fragen.md" type="projects" icon={FileText} level={0} />
                  <NavItem title="the_cosmic_games.md" path="/humans/character/beto/projects/the_cosmic_games.md" type="projects" icon={FileText} level={0} />
                </ul>
              )}

              <NavItem title="bio.md" path="/humans/character/beto/bio.md" type="bio" icon={FileText} level={0} />
              <NavItem title="experience.md" path="/humans/character/beto/experience.md" type="experience" icon={FileText} level={0} />
            </ul>
          )}
        </ul>
      </div>
    </aside>
  );
}
