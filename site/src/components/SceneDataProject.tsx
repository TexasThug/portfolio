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
        <div className="flex gap-3 flex-wrap mb-10">
          {["Power BI", "Python", "SQL", "NBA API"].map(t => (
            <span key={t}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/50 px-3 py-1.5"
              style={{ border: "1px solid rgba(196,30,30,0.3)" }}>
              {t}
            </span>
          ))}
        </div>
        <a
          href="/kobe-bryant.pbix"
          download
          className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-accent hover:text-foreground transition-colors duration-200"
          style={{ border: "1px solid rgba(196,30,30,0.5)", padding: "10px 20px" }}
        >
          ↓ Télécharger le .pbix
        </a>
      </div>
    </div>
  );
}

function PanelScreen({ n, title, src, description }: {
  n: string; title: string; src: string; description: string;
}) {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-5xl">
        <SectionLabel n={n} title={title} />
        <div className="w-full overflow-hidden rounded-sm" style={{ border: "1px solid rgba(196,30,30,0.2)" }}>
          <img
            src={src}
            alt={title}
            className="w-full object-cover"
            style={{ maxHeight: "58vh", objectPosition: "top" }}
          />
        </div>
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
        <SectionLabel n="07" title="Chiffres clés" />
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
          <a
            href="/kobe-bryant.pbix"
            download
            className="font-mono text-[10px] tracking-widest uppercase text-accent hover:text-foreground transition-colors duration-200"
            style={{ border: "1px solid rgba(196,30,30,0.4)", padding: "8px 16px" }}
          >
            ↓ Télécharger le .pbix
          </a>
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

    const KOBE_START =  15;
    const KOBE_END   = -15;

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
        <PanelScreen
          n="02" title="Kobe"
          src="/kobe-01-intro.png"
          description="Vue d'ensemble du rapport — navigation entre les chapitres de la carrière du Mamba."
        />
        <PanelScreen
          n="03" title="The Ascension"
          src="/kobe-02-ascension.png"
          description="Les premières saisons, l'émergence d'un leader. La progression statistique qui annonce une carrière légendaire."
        />
        <PanelScreen
          n="04" title="The Night of 81"
          src="/kobe-03-night81.png"
          description="22 janvier 2006. 81 points contre Toronto. Deuxième meilleure performance individuelle de l'histoire NBA."
        />
        <PanelScreen
          n="05" title="The Scorer"
          src="/kobe-04-scorer.png"
          description="Analyse du scoring : répartition par zone, pourcentages aux tirs, évolution du volume offensif saison par saison."
        />
        <PanelScreen
          n="06" title="Playoffs"
          src="/kobe-05-playoffs.png"
          description="Les performances en playoffs vs saison régulière. Kobe élève son niveau quand les enjeux sont maximaux."
        />
        <PanelScreen
          n="07" title="The Legacy"
          src="/kobe-06-legacy.png"
          description="20 saisons, 33 643 points, 5 bagues. La trace indélébile laissée par le Black Mamba dans l'histoire du basket."
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
