"use client";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function Shell({ children }: { children: React.ReactNode }) {
  const { openTab, closeTab, activeTabId, tabs, setActiveTab } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Leader key sequence simulation (alt/option key)
      if (e.altKey || e.metaKey) {
        // Direct tab switching (Alt + 1-9)
        if (e.key >= "1" && e.key <= "9") {
          const index = parseInt(e.key) - 1;
          if (tabs[index]) {
            e.preventDefault();
            useAppStore.getState().setActiveTab(tabs[index].id);
          }
          return;
        }

        switch (e.key.toLowerCase()) {
          case "x":
            e.preventDefault();
            if (activeTabId !== "tab-dashboard") {
              closeTab(activeTabId);
            }
            break;
          case "h": // Previous tab
            e.preventDefault();
            const currentIndexH = tabs.findIndex(t => t.id === activeTabId);
            const prevIndex = (currentIndexH - 1 + tabs.length) % tabs.length;
            setActiveTab(tabs[prevIndex].id);
            break;
          case "l": // Next tab
            e.preventDefault();
            const currentIndexL = tabs.findIndex(t => t.id === activeTabId);
            const nextIndex = (currentIndexL + 1) % tabs.length;
            setActiveTab(tabs[nextIndex].id);
            break;
        }
      }

      // Allow simple un-modded keys to open views from the dashboard
      const isDashboard =
        tabs.find((t) => t.id === activeTabId)?.type === "dashboard";

      if (isDashboard && !e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            openTab({ type: "bio", title: "bio.md", path: "/humans/character/beto/bio.md" });
            break;
          case "p":
            e.preventDefault();
            openTab({ type: "projects", title: "index.md", path: "/humans/character/beto/projects/index.md" });
            break;
          case "e":
            e.preventDefault();
            openTab({ type: "experience", title: "experience.md", path: "/humans/character/beto/experience.md" });
            break;
          case "q":
            e.preventDefault();
            alert("Terminal quit simulation: This would close the app or navigate away.");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTabId, closeTab, openTab, tabs]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-tui-bg">
      <Header />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-black overflow-hidden relative">
          <TabBar />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}