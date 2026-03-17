"use client";

import Shell from "@/components/layout/Shell";
import DashboardView from "@/components/dashboard/DashboardView";
import ProjectsView from "@/components/views/ProjectsView";
import BioView from "@/components/views/BioView";
import ExperienceView from "@/components/views/ExperienceView";
import { useAppStore } from "@/store/useAppStore";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { tabs, activeTabId } = useAppStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const renderContent = () => {
    switch (activeTab.type) {
      case "dashboard":
        return <DashboardView />;
      case "projects":
        return <ProjectsView />;
      case "bio":
        return <BioView />;
      case "experience":
        return <ExperienceView />;
      default:
        return (
          <div className="flex-1 p-12 custom-scrollbar overflow-y-auto flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-tui-cyan font-bold text-xl uppercase">
                {activeTab.title}
              </p>
              <p className="text-tui-dim text-sm lowercase">
                type: {activeTab.type} | id: {activeTab.id}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Shell>
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </Shell>
  );
}