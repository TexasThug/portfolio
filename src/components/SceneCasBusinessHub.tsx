"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import ScenePayfitProject from "./ScenePayfitProject";

interface Props { onBack: () => void }

const cases = [
  {
    id: "payfit",
    number: "01",
    title: "PayFit Hackathon",
    subtitle: "Stratégie SEO + Outil d'acquisition",
    description: "Calculette salaire brut/net complète — taux URSSAF 2025, fiche de paie décodée, simulations PPV/PAS. Conçue pour générer du trafic organique et convertir.",
    stack: ["React", "TypeScript", "Lovable"],
    status: "Terminé",
    year: "2025",
  },
];

export default function SceneCasBusinessHub({ onBack }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onBack,
    });
  };

  if (active === "payfit") return <ScenePayfitProject onBack={() => setActive(null)} />;

  return (
    <div ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflow: "hidden" }}>

      <button onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200">
        ← Constellation
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center px-12 md:px-24">
        <div className="w-full max-w-4xl mb-16">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-4">Cas Business</p>
          <h2 className="font-serif font-light text-foreground leading-none"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
            Études de cas
          </h2>
        </div>

        <div className="w-full max-w-4xl space-y-px">
          {cases.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} className="w-full text-left group">
              <div className="flex items-center gap-8 py-6 px-6 transition-all duration-300 border-l-2 border-transparent group-hover:border-accent"
                style={{ background: "rgba(240,235,226,0)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(240,235,226,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(240,235,226,0)")}>
                <span className="font-mono text-[10px] text-foreground/20 tracking-widest w-8 flex-shrink-0">{c.number}</span>
                <div className="flex-1">
                  <p className="font-serif text-2xl md:text-3xl text-foreground font-light group-hover:text-accent transition-colors duration-300">
                    {c.title}
                    <span className="text-foreground/30 italic ml-3 text-xl">— {c.subtitle}</span>
                  </p>
                  <p className="font-sans text-xs text-foreground/35 mt-2 leading-relaxed max-w-lg">{c.description}</p>
                </div>
                <div className="flex-shrink-0 text-right space-y-2 hidden md:block">
                  <div className="flex gap-2 justify-end">
                    {c.stack.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 px-2 py-1"
                        style={{ border: "1px solid rgba(240,235,226,0.1)" }}>{t}</span>
                    ))}
                  </div>
                  <p className="font-mono text-[9px] text-accent tracking-widest uppercase">{c.status} · {c.year}</p>
                </div>
                <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">→</span>
              </div>
              <div className="h-px bg-foreground/6 mx-6" />
            </button>
          ))}

          <div className="flex items-center gap-8 py-6 px-6 opacity-25">
            <span className="font-mono text-[10px] text-foreground/20 tracking-widest w-8 flex-shrink-0">02</span>
            <p className="font-serif text-2xl text-foreground/20 font-light italic">Prochain cas...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
