"use client";

import { useState, useEffect } from "react";

export default function AsciiLogo() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const words = ["ALBERTO MARIO CAMARGO CASTRO", "BETO"];
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 3000); // Pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before typing new word
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="mb-8 flex flex-col items-center">
      <h1 className="text-white font-bold text-base md:text-xl font-mono tracking-[0.15em] uppercase text-center flex items-center h-8">
        <span className="text-tui-cyan mr-3">&gt;</span>
        {text}
        <span className="w-2 h-5 bg-tui-magenta inline-block mx-1 animate-pulse" />
      </h1>
    </div>
  );
}