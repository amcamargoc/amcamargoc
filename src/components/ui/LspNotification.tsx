"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LspNotification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show notification shortly after mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    // Auto hide after some time
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-10 right-4 md:right-8 z-50 border border-tui-cyan bg-black p-3 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,255,255,0.3)] max-w-xs cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <div className="text-tui-cyan mb-1 font-bold">LSP NOTIFICATION</div>
          <div className="text-white">COSMIC_ENGINE LOADED SUCCESSFULLY</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}