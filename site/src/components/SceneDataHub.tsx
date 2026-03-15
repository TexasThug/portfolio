"use client";

import { useState } from "react";
import gsap from "gsap";
import { useRef } from "react";
import SceneDataProject from "./SceneDataProject";
import SceneNetflixProject from "./SceneNetflixProject";

interface Props { onBack: () => void }

const projects = [
  {
    id: "kobe",
    number: "01",
    title: "Kobe Bryant",
    subtitle: "Career Stats Analysis",
    description: "20 saisons, 1 346 matchs, 5 titres. Un dashboard Power BI complet sur la carrière du Mamba.",
    stack: ["Power BI", "Python", "SQL"],
    status: "Terminé",
    year: "2025",
  },
  {
    id: "netflix",
    number: "02",
    title: "Netflix Titles",
    subtitle: "Exploratory Data Analysis",
    description: "8 807 titres analysés — pays producteurs, évolution des sorties, films vs séries. Python / Pandas / Seaborn.",
    stack: ["Python", "Pandas", "Seaborn"],
    status: "Terminé",
    year: "2025",
  },
];

export default function SceneDataHub({ onBack }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleProjectClick = (id: string) => {
    setActiveProject(id);
  };

  const handleProjectBack = () => {
    setActiveProject(null);
  };

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: onBack,
    });
  };

  if (activeProject === "kobe")    return <SceneDataProject    onBack={handleProjectBack} />;
  if (activeProject === "netflix") return <SceneNetflixProject onBack={handleProjectBack} />;

  return (
    <div
      ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflow: "hidden" }}
    >
      <button
        onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200"
      >
        ← Constellation
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center px-12 md:px-24">

        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-4">Data</p>
          <h2
            className="font-serif font-light text-foreground leading-none"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            Projets
          </h2>
        </div>

        {/* Project list */}
        <div className="w-full max-w-4xl space-y-px">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProjectClick(p.id)}
              className="w-full text-left group"
            >
              <div
                className="flex items-center gap-8 py-6 px-6 transition-all duration-300 border-l-2 border-transparent group-hover:border-accent"
                style={{ background: "rgba(240,235,226,0)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(240,235,226,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(240,235,226,0)")}
              >
                {/* Numéro */}
                <span className="font-mono text-[10px] text-foreground/20 tracking-widest w-8 flex-shrink-0">
                  {p.number}
                </span>

                {/* Titre */}
                <div className="flex-1">
                  <p className="font-serif text-2xl md:text-3xl text-foreground font-light group-hover:text-accent transition-colors duration-300">
                    {p.title}
                    <span className="text-foreground/30 italic ml-3 text-xl">— {p.subtitle}</span>
                  </p>
                  <p className="font-sans text-xs text-foreground/35 mt-2 leading-relaxed max-w-lg">
                    {p.description}
                  </p>
                </div>

                {/* Stack + status */}
                <div className="flex-shrink-0 text-right space-y-2 hidden md:block">
                  <div className="flex gap-2 justify-end">
                    {p.stack.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 px-2 py-1"
                        style={{ border: "1px solid rgba(240,235,226,0.1)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[9px] text-accent tracking-widest uppercase">{p.status} · {p.year}</p>
                </div>

                {/* Flèche */}
                <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                  →
                </span>
              </div>

              {/* Separator */}
              <div className="h-px bg-foreground/6 mx-6" />
            </button>
          ))}

          {/* Slot futur projet */}
          <div className="flex items-center gap-8 py-6 px-6 opacity-25">
            <span className="font-mono text-[10px] text-foreground/20 tracking-widest w-8 flex-shrink-0">03</span>
            <p className="font-serif text-2xl text-foreground/20 font-light italic">Prochain projet...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
