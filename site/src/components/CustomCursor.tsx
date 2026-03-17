"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.set(dot,  { x: e.clientX, y: e.clientY });
      gsap.to(ring,  { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });
    };

    // Hover : point vire au blanc, anneau s'agrandit légèrement
    const onEnter = () => {
      gsap.to(dot,  { backgroundColor: "#ffffff", scale: 1.4, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1.6, borderColor: "#ffffff", opacity: 0.55, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(dot,  { backgroundColor: "#c41e1e", scale: 1,   duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1,   borderColor: "#c41e1e", opacity: 0.4,  duration: 0.3, ease: "power2.out" });
    };

    // Clic → flash
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

    const attachHover = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      observer.disconnect();
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
