"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface Props { onBack: () => void }

const fr = {
  back: "← Cas Business",
  category: "Mission BA Simulée",
  title: "IBM HR Analytics",
  subtitle: "Analyse d'attrition RH & recommandations décisionnelles",
  context: "Simulation d'une mission Business Analyst complète sur le dataset IBM HR Analytics Employee Attrition (Kaggle).\nObjectif : analyser les facteurs d'attrition et produire des recommandations pour une DRH fictive.",
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
  context: "Simulation of a complete Business Analyst mission on the IBM HR Analytics Employee Attrition dataset (Kaggle).\nGoal: analyze attrition factors and produce recommendations for a fictional HR department.",
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

const slides = [
  { src: "/ibm-hr-01-vue-generale.png",  label: "Vue Générale — Attrition RH" },
  { src: "/ibm-hr-02-profil-dept.png",   label: "Analyse par Profil et Département" },
  { src: "/ibm-hr-03-cout-impact.png",   label: "Coût et Impact Financier" },
];

export default function SceneIBMHRProject({ onBack }: Props) {
  const { lang } = useLanguage();
  const t = lang === "fr" ? fr : en;

  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef   = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

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
          <a href="https://github.com/TexasThug/IBM-HR-BA-Mission" target="_blank" rel="noopener noreferrer"
            className="group inline-block">
            <h1 className="font-serif font-light text-foreground leading-none mb-3 group-hover:text-accent transition-colors duration-300"
              style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
              {t.title}
              <span className="font-mono text-[16px] text-foreground/20 group-hover:text-accent ml-4 align-middle transition-colors duration-300">↗</span>
            </h1>
          </a>
          <p className="font-mono text-sm text-foreground/35 tracking-wider">{t.subtitle}</p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {stack.map(s => (
              <span key={s} className="font-mono text-[9px] tracking-widest uppercase text-foreground/30 px-3 py-1"
                style={{ border: "1px solid rgba(240,235,226,0.1)" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Stats — style Kobe */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {t.stats.map((s, i) => (
            <div key={i} ref={el => { statsRef.current[i] = el; }} className="opacity-0">
              <p className="font-serif font-light text-foreground"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mt-2 leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel dashboard */}
        <div className="mb-14">
          <div className="relative w-full overflow-hidden"
            style={{ border: "1px solid rgba(240,235,226,0.08)" }}>
            <img
              src={slides[slide].src}
              alt={slides[slide].label}
              style={{ width: "100%", height: "auto", display: "block", transition: "opacity 0.3s ease" }}
            />
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              onClick={() => setSlide(s => Math.max(0, s - 1))}
              disabled={slide === 0}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 hover:text-accent disabled:opacity-20 transition-colors">
              ← prev
            </button>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] text-foreground/30 tracking-widest">
                {slides[slide].label}
              </span>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setSlide(i)}
                    style={{ width: 20, height: 2, background: i === slide ? "#c41e1e" : "rgba(240,235,226,0.2)", transition: "background 0.2s" }} />
                ))}
              </div>
            </div>
            <button
              onClick={() => setSlide(s => Math.min(slides.length - 1, s + 1))}
              disabled={slide === slides.length - 1}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 hover:text-accent disabled:opacity-20 transition-colors">
              next →
            </button>
          </div>
        </div>

        {/* Content grid */}
        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 opacity-0">

          {/* Context */}
          <div>
            <div className="w-8 h-px bg-accent mb-6" />
            <p className="font-sans text-sm text-foreground/55 leading-relaxed" style={{ whiteSpace: "pre-line" }}>{t.context}</p>
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

        {/* ── Backlog User Stories ── */}
        <div className="mt-16">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-8 h-px bg-accent" />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/35">
              Backlog User Stories — MoSCoW
            </p>
          </div>

          <div className="space-y-px">
            {[
              {
                n: "US-01", title: "Vision globale de l'attrition", priority: "MUST HAVE",
                role: "DRH",
                want: "Visualiser le taux d'attrition global et son évolution dans le temps",
                goal: "Identifier les tendances et en informer la direction",
                criteria: ["Taux d'attrition affiché en % sur la page principale", "Évolution visible sur au moins 2 périodes comparables", "Filtre par département disponible"],
              },
              {
                n: "US-02", title: "Analyse par département et par site", priority: "MUST HAVE",
                role: "DRH",
                want: "Comparer le taux d'attrition par département et par site",
                goal: "Identifier les zones les plus exposées et prioriser les actions",
                criteria: ["Taux d'attrition affiché par département et par site", "Classement visuel des départements critiques", "Aucune donnée nominative affichée"],
              },
              {
                n: "US-03", title: "Analyse par profil et ancienneté", priority: "MUST HAVE",
                role: "DRH",
                want: "Visualiser les caractéristiques des employés qui quittent l'entreprise",
                goal: "Identifier les profils les plus à risque de départ",
                criteria: ["Répartition des départs par tranche d'ancienneté", "Répartition par niveau de poste visible", "Comparaison attrition / non-attrition par profil"],
              },
              {
                n: "US-04", title: "Impact des heures supplémentaires", priority: "MUST HAVE",
                role: "Directeur de site",
                want: "Visualiser le lien entre heures supplémentaires et départs",
                goal: "Identifier si la surcharge de travail est un facteur d'attrition",
                criteria: ["Proportion d'employés partants ayant fait des heures sup", "Comparaison heures sup / taux d'attrition par département", "Données agrégées, pas de comparaison individuelle nominative"],
              },
              {
                n: "US-05", title: "Satisfaction au travail", priority: "SHOULD HAVE",
                role: "DRH",
                want: "Visualiser les niveaux de satisfaction par département",
                goal: "Identifier les zones de démotivation avant qu'elles génèrent des départs",
                criteria: ["Score moyen de satisfaction par département", "Corrélation satisfaction / attrition visible"],
              },
              {
                n: "US-06", title: "Coût de l'attrition", priority: "SHOULD HAVE",
                role: "DRH",
                want: "Disposer d'une estimation du coût généré par les départs",
                goal: "Justifier l'investissement dans des actions de rétention auprès du DAF",
                criteria: ["Coût estimé par départ calculé (recrutement + formation)", "Coût total annuel affiché", "Comparaison coût attrition / coût rétention visible"],
              },
              {
                n: "US-07", title: "Filtres et navigation", priority: "SHOULD HAVE",
                role: "DRH ou Directeur de site",
                want: "Pouvoir filtrer toutes les vues par site, département et période",
                goal: "Adapter l'analyse à mon périmètre de responsabilité",
                criteria: ["Filtres site / département / période sur toutes les pages", "Sélection d'un filtre met à jour tous les visuels", "Bouton reset remet les filtres à zéro en un clic"],
              },
            ].map((us) => (
              <div key={us.n} style={{ borderLeft: us.priority === "MUST HAVE" ? "2px solid #c41e1e" : "2px solid rgba(240,235,226,0.12)", background: "rgba(240,235,226,0.02)", padding: "20px 24px", marginBottom: 2 }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-foreground/25 tracking-widest">{us.n}</span>
                    <p className="font-serif text-base text-foreground font-light">{us.title}</p>
                  </div>
                  <span className="font-mono text-[8px] tracking-widest uppercase flex-shrink-0 px-2 py-1"
                    style={{ color: us.priority === "MUST HAVE" ? "#c41e1e" : "rgba(240,235,226,0.35)", border: `1px solid ${us.priority === "MUST HAVE" ? "rgba(196,30,30,0.4)" : "rgba(240,235,226,0.1)"}` }}>
                    {us.priority}
                  </span>
                </div>
                <p className="font-sans text-xs text-foreground/35 leading-relaxed mb-3">
                  <span className="text-foreground/20">En tant que</span> {us.role} — <span className="text-foreground/20">je veux</span> {us.want}
                </p>
                <div className="flex flex-wrap gap-2">
                  {us.criteria.map((c, i) => (
                    <span key={i} className="font-mono text-[8px] text-foreground/30 tracking-wide">✓ {c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recommandations ── */}
        <div className="mt-16">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-8 h-px bg-accent" />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/35">
              Note de recommandations
            </p>
          </div>

          {/* 3 constats clés */}
          <div className="grid md:grid-cols-3 gap-px mb-2" style={{ background: "rgba(240,235,226,0.06)" }}>
            {[
              { label: "Jeunes collaborateurs", stat: "39%", detail: "d'attrition chez les -25 ans — le plus haut de toutes les tranches" },
              { label: "Département Sales", stat: "20,6%", detail: "d'attrition — Sales Representatives à 40%, facteur multiplicateur x2" },
              { label: "RH féminines", stat: "30%", detail: "vs 14% pour les hommes dans le même département" },
            ].map((c, i) => (
              <div key={i} className="px-6 py-8" style={{ background: "#0e0e0e" }}>
                <p className="font-serif font-light text-foreground mb-1" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>{c.stat}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-accent mb-3">{c.label}</p>
                <p className="font-sans text-xs text-foreground/35 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[8px] text-foreground/20 tracking-widest text-right mb-10">
            + Constat transversal : 30% des collaborateurs en heures sup quittent l'entreprise vs 10% — facteur ×3
          </p>

          {/* 4 recommandations */}
          <div className="space-y-px">
            {[
              { n: "R1", title: "Structurer l'intégration des jeunes collaborateurs", resp: "DRH + Directeurs de site",
                actions: ["Onboarding structuré sur 24 mois avec points carrière à 6, 12 et 24 mois", "Mentor interne dès l'embauche pour chaque -25 ans", "Entretiens semestriels systématiques < 3 ans d'ancienneté", "Étudier des primes d'ancienneté à 2 et 5 ans avec le DAF"] },
              { n: "R2", title: "Réduire la pression sur le département Sales", resp: "Directeur commercial + DRH",
                actions: ["Entretiens individuels avec les Sales Representatives", "Système de reconnaissance des performances (primes, challenges)", "Réviser la structure des niveaux de poste pour offrir des perspectives claires"] },
              { n: "R3", title: "Investiguer l'attrition féminine en RH", resp: "DRH + médiateur interne",
                actions: ["Entretiens individuels confidentiels avec les collaboratrices RH", "Analyser les comptes-rendus d'entretiens de sortie disponibles", "Accompagnement managérial ciblé si facteurs identifiés"] },
              { n: "R4", title: "Suivre les heures supplémentaires en temps réel", resp: "Directeurs de site + DRH",
                actions: ["Indicateur heures sup dans les reportings mensuels", "Seuil d'alerte défini par département"] },
            ].map((r) => (
              <div key={r.n} style={{ borderLeft: "2px solid #c41e1e", background: "rgba(240,235,226,0.02)", padding: "20px 24px", marginBottom: 2 }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-accent tracking-widest">{r.n}</span>
                    <p className="font-serif text-base text-foreground font-light">{r.title}</p>
                  </div>
                  <span className="font-mono text-[8px] tracking-widest uppercase text-foreground/25 flex-shrink-0 hidden md:block">{r.resp}</span>
                </div>
                <div className="flex flex-col gap-1.5 pl-8">
                  {r.actions.map((a, i) => (
                    <p key={i} className="font-sans text-xs text-foreground/35 leading-relaxed">→ {a}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer pour le bouton GitHub fixe */}
        <div className="h-24" />
      </div>

      {/* GitHub fixe — collé sous le CTA */}
      <a href="https://github.com/TexasThug/IBM-HR-BA-Mission" target="_blank" rel="noopener noreferrer"
        className="group"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1000,
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px",
          background: "rgba(14,14,14,0.85)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(196,30,30,0.35)",
          textDecoration: "none",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(196,30,30,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(196,30,30,0.35)")}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(240,235,226,0.5)", flexShrink: 0 }}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#f0ebe2", opacity: 0.75 }}>
          IBM-HR-BA-Mission
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "#c41e1e", opacity: 0.9 }}>→</span>
      </a>
    </div>
  );
}
