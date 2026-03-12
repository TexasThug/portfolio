"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props { onBack: () => void }

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-8">
      {n} — {title}
    </p>
  );
}

// Placeholder pour les screenshots Power BI
function PBIPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full rounded-sm flex items-center justify-center"
      style={{
        height: "55vh",
        border: "1px solid rgba(196,30,30,0.25)",
        background: "rgba(196,30,30,0.04)",
      }}
    >
      <p className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
        {label}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANELS
// ──────────────────────────────────────────────────────────────────────────────

function PanelIntro() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="max-w-xl">
        <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-6">01 — Projet</p>
        <h2
          className="font-serif font-light text-foreground leading-none mb-8"
          style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
        >
          Kobe Bryant<br />
          <span className="text-accent italic">Career Stats</span>
        </h2>
        <p className="font-sans text-sm text-foreground/50 leading-relaxed max-w-md mb-10">
          Analyse complète des statistiques de carrière de Kobe Bryant — 20 saisons,
          1 346 matchs, 5 titres NBA. Un dashboard Power BI construit de A à Z,
          des données brutes aux insights visuels.
        </p>
        <div className="flex gap-6 flex-wrap">
          {["Power BI", "Python", "SQL", "NBA API"].map(t => (
            <span key={t}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/50 px-3 py-1.5"
              style={{ border: "1px solid rgba(196,30,30,0.3)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelPage({ n, title, description, placeholder }: {
  n: string; title: string; description: string; placeholder: string
}) {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n={n} title={title} />
        <PBIPlaceholder label={placeholder} />
        <p className="font-sans text-xs text-foreground/35 mt-4 max-w-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function PanelFinal() {
  const stats = [
    { value: "33 643", label: "Points en carrière" },
    { value: "20",     label: "Saisons NBA" },
    { value: "5×",     label: "Champion NBA" },
    { value: "81",     label: "Points en un match" },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-3xl">
        <SectionLabel n="06" title="Chiffres clés" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-serif font-light text-foreground"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-foreground/10 pt-10 flex items-center gap-8">
          <p className="font-mono text-[9px] text-foreground/20 tracking-widest uppercase">
            Projet en cours — screenshots à venir
          </p>
          <span className="font-mono text-[9px] text-accent tracking-widest">★</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function SceneDataProject({ onBack }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const kobeRef     = useRef<HTMLDivElement>(null);

  const currentX = useRef(0);
  const targetX  = useRef(0);

  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const prog  = progressRef.current;
    const kobe  = kobeRef.current;
    if (!track) return;

    const getMaxX = () => -(track.scrollWidth - window.innerWidth);

    // Kobe part à droite (translateX +15%) et glisse vers la gauche (-15%) en fin de scroll
    const KOBE_START =  15; // % translateX au départ
    const KOBE_END   = -15; // % translateX à la fin

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetX.current = Math.max(getMaxX(), Math.min(0, targetX.current - e.deltaY - e.deltaX));
    };

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onTouchMove  = (e: TouchEvent) => {
      const dx = touchStartX - e.touches[0].clientX;
      touchStartX = e.touches[0].clientX;
      targetX.current = Math.max(getMaxX(), Math.min(0, targetX.current - dx));
    };

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.09;
      track.style.transform = `translateX(${currentX.current}px)`;

      const progress = Math.min(1, (-currentX.current) / (-getMaxX() || 1));

      if (prog) prog.style.width = `${progress * 100}%`;

      // Parallax Kobe : glisse de droite à gauche
      if (kobe) {
        const kobeX = KOBE_START + (KOBE_END - KOBE_START) * progress;
        kobe.style.transform = `translateX(${kobeX}%)`;
      }
    };

    gsap.ticker.add(tick);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove,  { passive: false });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: onBack,
    });
  };

  return (
    <div ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflow: "hidden" }}>

      {/* ── Kobe en fond, parallax horizontal ── */}
      <div
        ref={kobeRef}
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/kobe.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
          opacity: 0.35,
          willChange: "transform",
          // légèrement plus large que l'écran pour que le mouvement soit fluide
          transform: "translateX(15%)",
        }}
      />

      {/* Overlay gradient pour lisibilité */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(14,14,14,0.85) 0%, rgba(14,14,14,0.5) 50%, rgba(14,14,14,0.85) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Nav ── */}
      <button
        onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200"
      >
        ← Constellation
      </button>

      <div className="absolute top-8 right-8 md:right-12 z-10 font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
        scroll →
      </div>

      {/* ── Panels ── */}
      <div ref={trackRef} style={{ display: "flex", height: "100%", willChange: "transform" }}>
        <PanelIntro />
        <PanelPage
          n="02" title="Vue globale"
          description="Vue d'ensemble de la carrière — points, rebonds, passes par saison. La progression de ses 20 ans sous le maillot des Lakers."
          placeholder="Screenshot — Page 1 Power BI"
        />
        <PanelPage
          n="03" title="Scoring"
          description="Analyse du scoring : répartition par zone, pourcentages aux tirs, évolution du volume offensif saison par saison."
          placeholder="Screenshot — Page 2 Power BI"
        />
        <PanelPage
          n="04" title="Playoffs"
          description="Les performances en playoffs vs saison régulière. Kobe élève-t-il son niveau en post-saison ? Les données répondent."
          placeholder="Screenshot — Page 3 Power BI"
        />
        <PanelPage
          n="05" title="Comparaisons"
          description="Kobe vs le reste de l'élite NBA sur les mêmes périodes. Points, efficacité, longévité au plus haut niveau."
          placeholder="Screenshot — Page 4 Power BI"
        />
        <PanelFinal />
      </div>

      {/* ── Progress bar ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(240,235,226,0.08)" }}>
        <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#c41e1e" }} />
      </div>
    </div>
  );
}
