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

    // Position courante de la souris
    let mx = -100, my = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Le point suit instantanément
      gsap.set(dot, { x: mx, y: my });
      // L'anneau suit avec un léger lag
      gsap.to(ring, { x: mx, y: my, duration: 0.18, ease: "power2.out" });
    };

    // Hover sur éléments cliquables → anneau s'agrandit
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, borderColor: "#c41e1e", opacity: 0.6, duration: 0.25, ease: "power2.out" });
      gsap.to(dot,  { scale: 0,                                           duration: 0.2  });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1,   borderColor: "#c41e1e", opacity: 0.4, duration: 0.25, ease: "power2.out" });
      gsap.to(dot,  { scale: 1,                                          duration: 0.2  });
    };

    // Clic → flash
    const onClick = () => {
      gsap.fromTo(ring, { scale: 1 }, { scale: 1.6, opacity: 0, duration: 0.35, ease: "power2.out",
        onComplete: () => gsap.set(ring, { scale: 1, opacity: 0.4 }),
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const targets = document.querySelectorAll("a, button, [role='button'], [style*='cursor']");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Observer pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Point rouge — suit instantanément */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c41e1e",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      {/* Anneau — suit avec lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #c41e1e",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
