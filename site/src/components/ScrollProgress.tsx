"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const progress     = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.set(bar, { scaleY: progress });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Track — fond très discret */}
      <div
        style={{
          position: "fixed",
          left: 18,
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(196,30,30,0.12)",
          zIndex: 900,
          pointerEvents: "none",
        }}
      />
      {/* Barre rouge — grandit de haut en bas */}
      <div
        ref={barRef}
        style={{
          position: "fixed",
          left: 18,
          top: 0,
          width: 1,
          height: "100vh",
          background: "#c41e1e",
          transformOrigin: "top center",
          transform: "scaleY(0)",
          zIndex: 901,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
