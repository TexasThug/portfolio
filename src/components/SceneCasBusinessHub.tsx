"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import ScenePayfitProject from "./ScenePayfitProject";
import SceneIBMHRProject from "./SceneIBMHRProject";
import { useLanguage } from "@/context/LanguageContext";

interface Props { onBack: () => void }

export default function SceneCasBusinessHub({ onBack }: Props) {
  const { lang } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const t = lang === "fr"
    ? {
        back: "← Constellation",
        category: "Cas Business",
        heading: "Études de cas",
        next: "Prochain cas...",
        cases: [{
          id: "payfit", number: "01",
          title: "PayFit Hackathon",
          subtitle: "Stratégie SEO + Outil d'acquisition",
          description: "Calculette salaire brut/net complète — taux URSSAF 2025, fiche de paie décodée, simulations PPV/PAS. Conçue pour générer du trafic organique et convertir.",
          stack: ["React", "TypeScript", "Lovable"],
          status: "Terminé", year: "2025",
        }, {
          id: "ibm", number: "02",
          title: "IBM HR Analytics",
          subtitle: "Mission BA simulée — Attrition RH",
          description: "Analyse complète d'attrition RH sur le dataset Kaggle IBM. 16,12% de départs, 7M€ de coût estimé, 4 recommandations actionnables. Livrables BA complets : cadrage, backlog, dashboard Power BI 4 pages, note de recommandations.",
          stack: ["Power BI", "DAX", "Power Query", "Excel"],
          status: "Terminé", year: "2026",
        }],
      }
    : {
        back: "← Constellation",
        category: "Business Cases",
        heading: "Case Studies",
        next: "Next case...",
        cases: [{
          id: "payfit", number: "01",
          title: "PayFit Hackathon",
          subtitle: "SEO Strategy + Acquisition Tool",
          description: "Complete gross/net salary calculator — 2025 URSSAF rates, decoded payslip, PPV/withholding simulations. Designed to generate organic traffic and convert.",
          stack: ["React", "TypeScript", "Lovable"],
          status: "Completed", year: "2025",
        }, {
          id: "ibm", number: "02",
          title: "IBM HR Analytics",
          subtitle: "Simulated BA Mission — HR Attrition",
          description: "Full HR attrition analysis on Kaggle IBM dataset. 16.12% departure rate, €7M estimated cost, 4 actionable recommendations. Complete BA deliverables: framing, backlog, 4-page Power BI dashboard, recommendations report.",
          stack: ["Power BI", "DAX", "Power Query", "Excel"],
          status: "Completed", year: "2026",
        }],
      };

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onBack,
    });
  };

  if (active === "payfit") return <ScenePayfitProject onBack={() => setActive(null)} />;
  if (active === "ibm")    return <SceneIBMHRProject  onBack={() => setActive(null)} />;

  return (
    <div ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflow: "hidden" }}>

      <button onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200">
        {t.back}
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center px-12 md:px-24">
        <div className="w-full max-w-4xl mb-16">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-4">{t.category}</p>
          <h2 className="font-serif font-light text-foreground leading-none"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
            {t.heading}
          </h2>
        </div>

        <div className="w-full max-w-4xl space-y-px">
          {t.cases.map((c) => (
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
                    {c.stack.map(s => (
                      <span key={s} className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 px-2 py-1"
                        style={{ border: "1px solid rgba(240,235,226,0.1)" }}>{s}</span>
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
            <span className="font-mono text-[10px] text-foreground/20 tracking-widest w-8 flex-shrink-0">03</span>
            <p className="font-serif text-2xl text-foreground/20 font-light italic">{t.next}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
