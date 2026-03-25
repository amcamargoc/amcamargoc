"use client";

import { useLayoutEffect, useRef, useState } from "react";
import WindowControls from "./WindowControls";

export default function Header() {
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  const headerRef = useRef<HTMLElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const SESSION_TITLE = "beto@world";

  useLayoutEffect(() => {
    const recompute = () => {
      const headerEl = headerRef.current;
      const buttonsEl = buttonsRef.current;
      const titleEl = titleRef.current;
      if (!headerEl || !buttonsEl || !titleEl) return;

      const headerRect = headerEl.getBoundingClientRect();
      const buttonsRect = buttonsEl.getBoundingClientRect();
      const titleWidth = titleEl.getBoundingClientRect().width;
      const titleLeft = (headerRect.width - titleWidth) / 2;
      const titleRight = titleLeft + titleWidth;

      // Hide the title if it would overlap the left controls, keeping a small gap.
      const buttonsRightRel = buttonsRect.right - headerRect.left;
      const minGapPx = 16;

      const overlapsButtons = titleLeft < buttonsRightRel + minGapPx;
      const exceedsRightEdge = titleRight > headerRect.width - 16;

      setIsTitleVisible(!(overlapsButtons || exceedsRightEdge));
    };

    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="h-10 flex items-center shrink-0 w-full select-none overflow-hidden border-b border-tui-gray bg-tui-bg px-4 relative"
    >
      <WindowControls ref={buttonsRef} />

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none flex items-center">
        <span
          ref={titleRef}
          className={`whitespace-nowrap text-[13px] font-semibold transition-opacity duration-200 ${
            isTitleVisible ? "opacity-100" : "opacity-0"
          } text-tui-dim`}
        >
          {SESSION_TITLE}
        </span>
      </div>
    </header>
  );
}
