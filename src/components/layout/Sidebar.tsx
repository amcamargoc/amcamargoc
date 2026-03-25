"use client";

import { useAppStore, ViewType } from "@/store/useAppStore";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const NavItem = ({
  isActive,
  openTab,
  setSidebarOpen,
  title,
  path,
  type,
  icon: Icon,
  level = 0
}: {
  isActive: (path: string) => boolean;
  openTab: (tab: Omit<import("@/store/useAppStore").Tab, "id">) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  title: string;
  path: string;
  type: ViewType;
  icon: React.ElementType;
  level?: number
}) => (
  <li>
    <button
      className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer transition-colors ${isActive(path)
        ? "bg-white/10 text-white"
        : "text-tui-cyan hover:bg-white/5 hover:text-white"
        }`}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
      onClick={() => {
        openTab({ type, title, path });
        if (window.innerWidth < 768) setSidebarOpen(false);
      }}
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

export default function Sidebar() {
  const { openTab, activeTabId, tabs, setSidebarOpen } = useAppStore();
  const [betoExpanded, setBetoExpanded] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectsExpanded, setProjectsExpanded] = useState(true);
// Helper to determine if a file is active based on its path
  const isActive = (path: string) => {
    const activeTab = tabs.find((t) => t.id === activeTabId);
    return activeTab?.path === path;
  };

  return (
    <aside className="flex flex-col shrink-0 bg-black h-full w-full md:w-sidebar overflow-hidden">
      <div className="h-8 px-4 text-tui-cyan text-tui-sm flex items-center gap-2 border-b border-tui-gray shrink-0 min-w-full md:min-w-sidebar">
        <Folder size={12} className="shrink-0" />
        <span className="font-bold">EXPLORER</span>
      </div>

      <div className="flex-1 p-2 text-tui-base overflow-y-auto custom-scrollbar min-w-full md:min-w-sidebar">
        <ul className="space-y-[2px] font-medium w-full">
          {/* Root Folder: /humans/characters/beto/ */}
          <FolderItem
            title="/humans/characters/beto/"
            isOpen={betoExpanded}
            toggle={() => setBetoExpanded(!betoExpanded)}
            isRoot={true}
          />

          {betoExpanded && (
            <ul className="relative ml-4 border-l border-tui-gray/60 space-y-[2px]">
              <NavItem isActive={isActive} openTab={openTab} setSidebarOpen={setSidebarOpen} title="index.md" path="/humans/characters/beto/index.md" type="dashboard" icon={FileText} level={0} />

              <NavItem isActive={isActive} openTab={openTab} setSidebarOpen={setSidebarOpen} title="projects.md" path="/humans/characters/beto/projects.md" type="projects" icon={FileText} level={0} />
              <NavItem isActive={isActive} openTab={openTab} setSidebarOpen={setSidebarOpen} title="bio.md" path="/humans/characters/beto/bio.md" type="bio" icon={FileText} level={0} />
              <NavItem isActive={isActive} openTab={openTab} setSidebarOpen={setSidebarOpen} title="experience.md" path="/humans/characters/beto/experience.md" type="experience" icon={FileText} level={0} />
            </ul >
          )
          }
        </ul >
      </div >
    </aside >
  );
}
