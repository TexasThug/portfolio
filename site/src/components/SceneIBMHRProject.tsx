"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface Props { onBack: () => void }

const fr = {
  back: "← Cas Business",
  category: "Mission BA Simulée",
  title: "IBM HR Analytics",
  subtitle: "Analyse d'attrition RH & recommandations décisionnelles",
  context: "Simulation d'une mission Business Analyst complète sur le dataset IBM HR Analytics Employee Attrition (Kaggle). Objectif : analyser les facteurs d'attrition et produire des recommandations pour une DRH fictive.",
  deliverablesLabel: "Livrables",
  deliverables: [
    "Note de cadrage",
    "Backlog User Stories (MoSCoW + critères d'acceptation)",
    "Dictionnaire de données",
    "Dashboard Power BI — 4 pages",
    "Note de recommandations",
    "Synthèse portfolio",
  ],
  factorsLabel: "Facteurs principaux identifiés",
  factors: ["Âge", "Heures supplémentaires", "Département Sales"],
  recoLabel: "4 recommandations actionnables produites",
  download: "Télécharger le dashboard .pbix",
  status: "Mission effectuée",
  date: "Mars 2026",
  stats: [
    { value: "16,12%", label: "Taux d'attrition global" },
    { value: "237",    label: "Départs / 1 470 employés" },
    { value: "7M€",    label: "Coût estimé des départs" },
    { value: "4",      label: "Recommandations actionnables" },
  ],
};

const en = {
  back: "← Business Cases",
  category: "Simulated BA Mission",
  title: "IBM HR Analytics",
  subtitle: "HR Attrition Analysis & Decision-Making Recommendations",
  context: "Simulation of a complete Business Analyst mission on the IBM HR Analytics Employee Attrition dataset (Kaggle). Goal: analyze attrition factors and produce recommendations for a fictional HR department.",
  deliverablesLabel: "Deliverables",
  deliverables: [
    "Project framing note",
    "User Stories Backlog (MoSCoW + acceptance criteria)",
    "Data dictionary",
    "Power BI Dashboard — 4 pages",
    "Recommendations report",
    "Portfolio summary",
  ],
  factorsLabel: "Key factors identified",
  factors: ["Age", "Overtime hours", "Sales department"],
  recoLabel: "4 actionable recommendations produced",
  download: "Download .pbix dashboard",
  status: "Mission completed",
  date: "March 2026",
  stats: [
    { value: "16.12%", label: "Global attrition rate" },
    { value: "237",    label: "Departures / 1,470 employees" },
    { value: "7M€",    label: "Estimated departure cost" },
    { value: "4",      label: "Actionable recommendations" },
  ],
};

const stack = ["Power BI", "DAX", "Power Query", "Excel", "Word"];

export default function SceneIBMHRProject({ onBack }: Props) {
  const { lang } = useLanguage();
  const t = lang === "fr" ? fr : en;

  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      0.2
    ).fromTo(contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.4
    );
  }, []);

  return (
    <div ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflowY: "auto" }}>

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-16 py-6"
        style={{ background: "rgba(14,14,14,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(240,235,226,0.06)" }}>
        <button onClick={onBack}
          className="font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200">
          {t.back}
        </button>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-widest uppercase text-accent">{t.status}</span>
          <span className="font-mono text-[9px] text-foreground/25">·</span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-foreground/30">{t.date}</span>
        </div>
      </div>

      <div className="px-8 md:px-16 py-12 max-w-5xl mx-auto">

        {/* Title block */}
        <div className="mb-14">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-4">{t.category}</p>
          <h1 className="font-serif font-light text-foreground leading-none mb-3"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
            {t.title}
          </h1>
          <p className="font-mono text-sm text-foreground/35 tracking-wider">{t.subtitle}</p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {stack.map(s => (
              <span key={s} className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 px-3 py-1"
                style={{ border: "1px solid rgba(240,235,226,0.1)" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Stats — chiffres clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16"
          style={{ background: "rgba(240,235,226,0.06)" }}>
          {t.stats.map((s, i) => (
            <div key={i} ref={el => { statsRef.current[i] = el; }}
              className="flex flex-col justify-center px-8 py-10 opacity-0"
              style={{ background: "#0e0e0e" }}>
              <p style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 64px)", color: "#c41e1e", lineHeight: 1, letterSpacing: "0.02em" }}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-foreground/35 mt-2 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 opacity-0">

          {/* Context */}
          <div>
            <div className="w-8 h-px bg-accent mb-6" />
            <p className="font-sans text-sm text-foreground/55 leading-relaxed">{t.context}</p>
          </div>

          {/* Livrables */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-5">{t.deliverablesLabel}</p>
            <ul className="space-y-3">
              {t.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: "#c41e1e", fontFamily: "var(--font-mono)", fontSize: "10px", marginTop: 2 }}>✓</span>
                  <span className="font-sans text-xs text-foreground/50 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Facteurs */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-5">{t.factorsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {t.factors.map(f => (
                <span key={f} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5"
                  style={{ border: "1px solid rgba(196,30,30,0.4)", color: "#c41e1e" }}>{f}</span>
              ))}
            </div>
            <p className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 mt-6">{t.recoLabel}</p>
          </div>

          {/* Download */}
          <div className="flex items-end">
            <a href="/ibm-hr-dashboard.pbix" download
              className="group flex items-center gap-4 py-4 px-6 transition-colors duration-200"
              style={{ border: "1px solid rgba(196,30,30,0.3)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(196,30,30,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(196,30,30,0.3)")}>
              <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-foreground/60 group-hover:text-foreground/90 transition-colors">
                  {t.download}
                </p>
                <p className="font-mono text-[9px] text-foreground/25 mt-1 tracking-widest">IBM_HR_Dashboard.pbix</p>
              </div>
              <span className="text-accent font-mono text-sm group-hover:translate-x-1 transition-transform duration-200">↓</span>
            </a>
          </div>
        </div>

        {/* GitHub link */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(240,235,226,0.06)" }}>
          <a href="https://github.com/TexasThug/IBM-HR-BA-Mission" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest uppercase text-accent/60 hover:text-accent transition-colors duration-200">
            GitHub — IBM-HR-BA-Mission →
          </a>
        </div>

      </div>
    </div>
  );
}
