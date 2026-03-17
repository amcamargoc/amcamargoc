"use client";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { AnimatePresence, motion } from "framer-motion";

export default function Shell({ children }: { children: React.ReactNode }) {
  const { openTab, closeTab, activeTabId, tabs, setActiveTab, sidebarOpen, setSidebarOpen } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile, sidebarOpen]);

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
  }, [activeTabId, closeTab, openTab, tabs, setActiveTab]);

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-tui-bg relative">
      <Header />
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: "-100%" } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: "-100%" } : { x: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className={`${
                isMobile
                  ? "fixed inset-y-0 left-0 z-[100] shadow-2xl shadow-tui-magenta/20"
                  : "relative flex shrink-0 border-r border-tui-gray"
              } h-full bg-black`}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col min-w-0 bg-black overflow-hidden relative z-0">
          <TabBar />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
