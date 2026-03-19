"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FloatingCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  // Apparaît après 2s de présence sur la page
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 12 },
      { opacity: visible ? 1 : 0, y: visible ? 0 : 12, duration: 0.6, ease: "power3.out" }
    );
  }, [visible]);

  const handleMouseEnter = () => {
    gsap.to(ref.current, { x: -3, duration: 0.2, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <a
      ref={ref}
      href="#contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        bottom: 74,
        right: 28,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        border: "1px solid rgba(196,30,30,0.35)",
        background: "rgba(14,14,14,0.85)",
        backdropFilter: "blur(8px)",
        color: "#f0ebe2",
        textDecoration: "none",
        opacity: 0,
        willChange: "transform, opacity",
      }}
    >
      {/* Dot pulse rouge */}
      <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <PulseDot />
      </span>

      <span
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#f0ebe2",
          opacity: 0.75,
        }}
      >
        Disponible — CDI
      </span>

      <span
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          color: "#c41e1e",
          opacity: 0.9,
        }}
      >
        →
      </span>
    </a>
  );
}

function PulseDot() {
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 2.2, opacity: 0, duration: 1.1, ease: "power2.out",
      repeat: -1, repeatDelay: 0.6,
    });
  }, []);

  return (
    <span style={{ position: "relative", width: 7, height: 7, display: "block" }}>
      {/* Halo pulsant */}
      <span
        ref={pulseRef}
        style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          background: "#c41e1e",
          opacity: 0.5,
          transformOrigin: "center",
        }}
      />
      {/* Dot fixe */}
      <span
        style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          background: "#c41e1e",
        }}
      />
    </span>
  );
}
