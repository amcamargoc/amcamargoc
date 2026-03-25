"use client";

import { useState, useEffect, forwardRef } from "react";
import { useAppStore } from "@/store/useAppStore";

const WindowControls = forwardRef<HTMLDivElement>((_, ref) => {
  const { shellMode, setShellMode, setSidebarOpen } = useAppStore();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  useEffect(() => {
    if (!showQuitConfirm) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowQuitConfirm(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showQuitConfirm]);

  const attemptCloseBrowserTab = () => {
    try {
      window.close();
    } catch {
      // ignore
    }
    try {
      window.location.replace("about:blank");
    } catch {
      window.location.href = "about:blank";
    }
  };

  const onQuit = () => {
    setShowQuitConfirm(false);
    attemptCloseBrowserTab();
  };

  const onMinimize = () => {
    setSidebarOpen(false);
    setShellMode(shellMode === "minimized" ? "normal" : "minimized");
  };

  const onMaximize = () => {
    setSidebarOpen(false);
    setShellMode(shellMode === "maximized" ? "normal" : "maximized");
  };

  return (
    <>
      <div ref={ref} className="flex items-center gap-2 group">
        <button
          type="button"
          onClick={() => setShowQuitConfirm(true)}
          aria-label="Close window"
          className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center transition-colors relative overflow-hidden focus:outline-none"
        >
          <svg className="w-[8px] h-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
            <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize window"
          className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center transition-colors relative overflow-hidden focus:outline-none"
        >
          <svg className="w-[8px] h-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
            <path d="M1.5 5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onMaximize}
          aria-label="Maximize window"
          className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center transition-colors relative overflow-hidden focus:outline-none"
        >
          <svg className="w-[8px] h-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12">
            <path d="M4.5 3h-2v2M2.5 3l3 3M7.5 9h2v-2M9.5 9l-3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      {showQuitConfirm && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md border border-tui-gray bg-black/90 rounded-sm shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-tui-gray">
              <div className="text-white text-sm font-bold">Close terminal session?</div>
              <div className="text-tui-dim text-xs mt-1">
                We will ask the browser to close this tab (may be blocked unless opened by script).
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowQuitConfirm(false)}
                className="px-4 py-1.5 border border-tui-gray rounded focus:outline-none hover:bg-white/5 transition-colors text-white font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onQuit}
                className="px-4 py-1.5 bg-[#ff5f57] text-black rounded focus:outline-none hover:opacity-90 transition-colors font-semibold text-sm"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

WindowControls.displayName = "WindowControls";

export default WindowControls;
