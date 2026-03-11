"use client";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function Shell({ children }: { children: React.ReactNode }) {
  const { openTab, closeTab, activeTabId, tabs } = useAppStore();

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
        switch (e.key) {
          case "b":
            e.preventDefault();
            useAppStore.getState().toggleSidebar();
            break;
          case "w":
            e.preventDefault();
            if (activeTabId !== "tab-dashboard") {
              closeTab(activeTabId);
            }
            break;
        }
      }

      // Allow simple un-modded keys to open views from the dashboard
      const isDashboard =
        tabs.find((t) => t.id === activeTabId)?.type === "dashboard";

      if (isDashboard && !e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key) {
          case "f":
            e.preventDefault();
            openTab({ type: "projects", title: "projects/" });
            break;
          case "e":
            e.preventDefault();
            openTab({ type: "bio", title: "bio.md" });
            break;
          case "r":
            e.preventDefault();
            openTab({ type: "experience", title: "experience.log" });
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