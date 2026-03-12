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

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full rounded-sm flex items-center justify-center"
      style={{
        height: "48vh",
        border: "1px solid rgba(196,30,30,0.2)",
        background: "rgba(196,30,30,0.03)",
      }}
    >
      <p className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">{label}</p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelIntro() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="max-w-xl">
        <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-6">01 — Projet</p>
        <h2 className="font-serif font-light text-foreground leading-none mb-8"
          style={{ fontSize: "clamp(48px, 7vw, 100px)" }}>
          Netflix<br />
          <span className="text-accent italic">Titles Analysis</span>
        </h2>
        <p className="font-sans text-sm text-foreground/50 leading-relaxed max-w-md mb-10">
          Analyse exploratoire d'un dataset de 8 807 titres Netflix — films et séries.
          Nettoyage des données, exploration des tendances de production mondiale
          et visualisation des dynamiques de contenu entre 2000 et 2021.
        </p>
        <div className="flex gap-3 flex-wrap mb-6">
          {["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"].map(t => (
            <span key={t}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/50 px-3 py-1.5"
              style={{ border: "1px solid rgba(196,30,30,0.3)" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-10">
          {[
            { value: "8 807", label: "Titres analysés" },
            { value: "2 634", label: "Réalisateurs manquants" },
            { value: "21",    label: "Années couvertes" },
          ].map(s => (
            <div key={s.label}>
              <p className="font-serif font-light text-foreground" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>{s.value}</p>
              <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-12 font-mono text-[10px] text-foreground/20 tracking-widest uppercase flex items-center gap-3">
        <span>scroll</span>
        <span className="w-8 h-px bg-foreground/20" />
        <span>→</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelPays() {
  const pays = [
    { country: "United States", count: 2809, pct: 100 },
    { country: "India",         count: 972,  pct: 35  },
    { country: "Unknown",       count: 829,  pct: 30  },
    { country: "United Kingdom",count: 418,  pct: 15  },
    { country: "Japan",         count: 243,  pct: 9   },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="02" title="Top pays producteurs" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {pays.map((p) => (
              <div key={p.country} className="flex items-center gap-4">
                <p className="font-mono text-xs text-foreground/60 w-36 flex-shrink-0">{p.country}</p>
                <div className="flex-1 h-px bg-foreground/8 relative">
                  <div className="absolute left-0 top-0 h-full bg-accent"
                    style={{ width: `${p.pct}%`, opacity: 0.65 }} />
                </div>
                <p className="font-mono text-[10px] text-foreground/30 w-12 text-right">{p.count}</p>
              </div>
            ))}
          </div>
          <div className="border-l border-foreground/10 pl-12 space-y-6">
            <img src="/netflix-top5-pays.png" alt="Top 5 pays producteurs" className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
            <p className="font-sans text-xs text-foreground/35 leading-relaxed">
              Les États-Unis dominent massivement la production Netflix. L&apos;Inde confirme
              son rôle de 2ème puissance mondiale du cinéma avec 972 titres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelEvolution() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="03" title="Évolution des sorties (2000 – 2021)" />
        <img src="/netflix-evolution-sorties.png" alt="Évolution des sorties" className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
        <div className="mt-6 flex gap-12">
          <div className="border-l border-accent/40 pl-6">
            <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">Pic</p>
            <p className="font-serif text-2xl text-foreground font-light">2018</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">
              Année record de production avant le ralentissement Covid en 2020.
            </p>
          </div>
          <div className="border-l border-foreground/15 pl-6">
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">Insight</p>
            <p className="font-serif text-2xl text-foreground/60 font-light italic">Covid — 2020</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">
              Chute visible des tournages liée aux restrictions sanitaires mondiales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelFilmsSeries() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="04" title="Films vs Séries" />
        <img src="/netflix-films-vs-series.png" alt="Films vs Séries" className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
        <div className="mt-6 flex gap-12">
          <div className="border-l border-accent/40 pl-6">
            <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">Modèle Netflix</p>
            <p className="font-serif text-2xl text-foreground font-light">Films d&apos;abord</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">
              Netflix a construit sa bibliothèque sur les films, dominant en volume depuis 2010.
            </p>
          </div>
          <div className="border-l border-foreground/15 pl-6">
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">Résilience</p>
            <p className="font-serif text-2xl text-foreground/60 font-light italic">Séries stables</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">
              La production de séries résiste mieux aux crises — tournages plus modulables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelConclusion() {
  const takeaways = [
    { n: "01", text: "L'Inde est le 2ème producteur mondial de contenu Netflix — 972 titres." },
    { n: "02", text: "Le genre dominant est le Drame International, suivi des Documentaires." },
    { n: "03", text: "Le pic de production est en 2018 — le Covid marque un net ralentissement." },
    { n: "04", text: "Netflix a misé sur les films en volume, mais les séries sont plus résilientes." },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-3xl">
        <SectionLabel n="05" title="Conclusions" />
        <div className="space-y-6 mb-14">
          {takeaways.map(t => (
            <div key={t.n} className="flex gap-6 items-start">
              <span className="font-mono text-[9px] text-accent tracking-widest pt-1 flex-shrink-0">{t.n}</span>
              <p className="font-serif text-lg md:text-xl text-foreground font-light leading-snug">{t.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-foreground/10 pt-8 flex items-center gap-6">
          <a
            href="https://github.com/TexasThug/Python_works"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group"
          >
            <span className="font-serif text-xl text-foreground font-light group-hover:text-accent transition-colors duration-300">
              Voir le notebook
            </span>
            <span className="font-mono text-xs text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
export default function SceneNetflixProject({ onBack }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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
    if (!track) return;

    const getMaxX = () => -(track.scrollWidth - window.innerWidth);

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
      if (prog) {
        const pct = Math.min(100, (-currentX.current / -getMaxX()) * 100);
        prog.style.width = `${pct}%`;
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

      {/* Fond subtil — halo rouge Netflix */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,30,30,0.06) 0%, transparent 70%)",
      }} />

      <button
        onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200"
      >
        ← Projets
      </button>

      <div className="absolute top-8 right-8 md:right-12 z-10 font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
        scroll →
      </div>

      <div ref={trackRef} style={{ display: "flex", height: "100%", willChange: "transform" }}>
        <PanelIntro />
        <PanelPays />
        <PanelEvolution />
        <PanelFilmsSeries />
        <PanelConclusion />
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(240,235,226,0.08)" }}>
        <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#c41e1e" }} />
      </div>
    </div>
  );
}
