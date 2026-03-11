import { create } from "zustand";

export type ViewType = "dashboard" | "bio" | "projects" | "experience";

export interface Tab {
  id: string;
  type: ViewType;
  title: string;
}

interface AppState {
  tabs: Tab[];
  activeTabId: string;
  sidebarOpen: boolean;
  openTab: (tab: Omit<Tab, "id">) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  toggleSidebar: () => void;
}

const DEFAULT_TAB: Tab = {
  id: "tab-dashboard",
  type: "dashboard",
  title: "dashboard",
};

export const useAppStore = create<AppState>((set) => ({
  tabs: [DEFAULT_TAB],
  activeTabId: DEFAULT_TAB.id,
  sidebarOpen: true,

  openTab: (tabData) =>
    set((state) => {
      // Check if tab with same type already exists
      const existingTab = state.tabs.find((t) => t.type === tabData.type);
      if (existingTab) {
        return { activeTabId: existingTab.id };
      }

      // Create new tab
      const newTab: Tab = { ...tabData, id: `tab-${Date.now()}` };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  closeTab: (id) =>
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== id);

      // Ensure at least dashboard is open
      if (newTabs.length === 0) {
        return { tabs: [DEFAULT_TAB], activeTabId: DEFAULT_TAB.id };
      }

      // If closing active tab, activate the last tab
      let newActiveId = state.activeTabId;
      if (id === state.activeTabId) {
        newActiveId = newTabs[newTabs.length - 1].id;
      }

      return { tabs: newTabs, activeTabId: newActiveId };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));