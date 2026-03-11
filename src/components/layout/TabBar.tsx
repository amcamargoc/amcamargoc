"use client";

import { useAppStore } from "@/store/useAppStore";
import { X } from "lucide-react";

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useAppStore();

  return (
    <div className="flex bg-black border-b border-tui-gray overflow-x-auto custom-scrollbar shrink-0 h-8">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1 border-r border-tui-gray flex items-center gap-2 text-[11px] cursor-pointer hover:bg-tui-gray/20 transition-colors whitespace-nowrap min-w-max ${
              isActive
                ? "bg-tui-gray/30 text-tui-cyan"
                : "text-tui-dim"
            }`}
          >
            <span>[{index + 1}] {tab.title}</span>
            {tab.type !== "dashboard" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="hover:text-tui-magenta ml-1 p-0.5"
                title="Close Tab"
              >
                <X size={10} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}