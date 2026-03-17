"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LETTERS = "JOFFRAY".split("");

export default function IntroScreen() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const lettersRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => setDone(true),
        });
      },
    });

    // Lettres apparaissent une par une
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.07 }
    )
    // Ligne rouge s'étend
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power3.out", transformOrigin: "left center" },
      "-=0.1"
    )
    // Subtitle fade in
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.1"
    )
    // Pause avant de sortir
    .to({}, { duration: 0.9 });
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#0e0e0e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        pointerEvents: "all",
      }}
    >
      {/* Nom en Bebas */}
      <div style={{ display: "flex", gap: "0.04em", overflow: "hidden" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(64px, 14vw, 160px)",
              color: "#f0ebe2",
              letterSpacing: "0.04em",
              lineHeight: 1,
              opacity: 0,
              display: "inline-block",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Ligne rouge */}
      <div
        ref={lineRef}
        style={{
          width: "100%",
          maxWidth: "clamp(280px, 55vw, 640px)",
          height: 2,
          background: "#c41e1e",
          marginTop: 10,
          marginBottom: 12,
          transform: "scaleX(0)",
        }}
      />

      {/* Subtitle */}
      <span
        ref={subtitleRef}
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "clamp(9px, 1.2vw, 12px)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#f0ebe2",
          opacity: 0,
        }}
      >
        Data · Business · Créativité
      </span>
    </div>
  );
}
