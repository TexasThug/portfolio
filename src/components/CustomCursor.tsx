"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const enterState = () => {
      if (isHovering.current) return;
      isHovering.current = true;
      gsap.to(dot,  { backgroundColor: "#ffffff", scale: 1.4, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1.6, borderColor: "#ffffff", opacity: 0.55, duration: 0.3, ease: "power2.out" });
    };

    const leaveState = () => {
      if (!isHovering.current) return;
      isHovering.current = false;
      gsap.to(dot,  { backgroundColor: "#c41e1e", scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1, borderColor: "#c41e1e", opacity: 0.4, duration: 0.3, ease: "power2.out" });
    };

    const onMove = (e: MouseEvent) => {
      gsap.set(dot,  { x: e.clientX, y: e.clientY });
      gsap.to(ring,  { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });

      // Remonte le DOM — lit le style inline (pas computed, car * cursor:none !important l'écrase)
      const el = document.elementFromPoint(e.clientX, e.clientY);
      let clickable = false;
      let node: Element | null = el;
      while (node && node !== document.documentElement) {
        const inlineCursor = (node as HTMLElement).style?.cursor;
        if (inlineCursor === "pointer") { clickable = true; break; }
        if (node.matches("a, button, [role='button']")) { clickable = true; break; }
        node = node.parentElement;
      }
      if (clickable) enterState();
      else leaveState();
    };

    const onClick = () => {
      gsap.fromTo(ring,
        { scale: 1 },
        { scale: 1.8, opacity: 0, duration: 0.4, ease: "power2.out",
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 0.4 }),
        }
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6, borderRadius: "50%",
          background: "#c41e1e",
          pointerEvents: "none", zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32, borderRadius: "50%",
          border: "1px solid #c41e1e", opacity: 0.4,
          pointerEvents: "none", zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
