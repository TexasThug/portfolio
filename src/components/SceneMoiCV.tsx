"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props { onBack: () => void }

// ── Shared panel wrapper ────────────────────────────────────────────────────
function Panel({ children, bgWord }: { children: React.ReactNode; bgWord?: string }) {
  return (
    <div
      style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center overflow-hidden px-12 md:px-24"
    >
      {bgWord && (
        <span
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(160px, 22vw, 320px)",
            fontWeight: 300,
            color: "rgba(240,235,226,0.03)",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {bgWord}
        </span>
      )}
      {children}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="font-mono text-[10px] tracking-widest uppercase border border-foreground/15 text-foreground/40 px-2 py-1">
      {label}
    </span>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-8">
      {n} — {title}
    </p>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 1 — INTRO
// ──────────────────────────────────────────────────────────────────────────────
function PanelIntro() {
  return (
    <Panel bgWord="Moi">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-16">
        <div>
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-6">01 — Profil</p>
          <h2
            className="font-serif font-light text-foreground leading-none"
            style={{ fontSize: "clamp(52px, 8vw, 120px)" }}
          >
            Joffray<br />
            <span className="text-accent italic">DeAlberto</span>
          </h2>
          <p className="font-mono text-xs text-foreground/40 tracking-widest uppercase mt-6">
            Business & Data · E-Commerce
          </p>
        </div>

        <div className="flex-shrink-0 space-y-6 max-w-xs border-l border-foreground/10 pl-10">
          <div>
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">Formation</p>
            <p className="font-sans text-sm text-foreground/70">MSc Business & Data</p>
            <p className="font-mono text-[10px] text-foreground/40">Eugenia School — 2024 / 2026</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">Recherche</p>
            <p className="font-sans text-sm text-foreground/70">CDI pour septembre 2026</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">Contact</p>
            <a
              href="mailto:leffejeff@gmail.com"
              className="font-sans text-sm text-foreground/70 hover:text-accent transition-colors block"
            >
              leffejeff@gmail.com
            </a>
            <p className="font-mono text-[10px] text-foreground/35 mt-0.5">07 85 80 89 75</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-12 font-mono text-[10px] text-foreground/20 tracking-widest uppercase flex items-center gap-3">
        <span>scroll</span>
        <span className="w-8 h-px bg-foreground/20" />
        <span>→</span>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 2 — EXPÉRIENCES
// ──────────────────────────────────────────────────────────────────────────────
function PanelExperiences() {
  const xps = [
    {
      period: "Sept. 2024 – auj.",
      company: "Edgard & Cooper",
      role: "E-Commerce Europe Sales Manager Assistant",
      location: "Paris 02",
      bullets: [
        "Gestion Amazon Vendor & Seller (listings, prix, stocks, disponibilités)",
        "Pilotage des prévisions de stocks avec demand planning & supply chain",
        "Création d'un outil de price tracking sur mesure (Python)",
        "Automatisation des process e-commerce (reporting, alertes prix)",
        "Reporting e-tail hebdomadaire — insights, risques, opportunités",
        "Partenaires : Zooplus, Bol.com, Plein.nl, Medpets",
        "Travail quotidien en anglais avec l'équipe basée à Londres",
      ],
    },
    {
      period: "Avr. – Août 2024",
      company: "AMD Blue",
      role: "Business Developer — Services & conseil Data",
      location: "Paris 12",
      bullets: [
        "Prospection Grands Comptes, PME, ITE",
        "BoondManager & LinkedIn Sales Navigator",
        "Plans de prospection · études de marché · Growth Hacking",
      ],
    },
    {
      period: "Sept. 2023 – Mars 2024",
      company: "Pluraskills",
      role: "Business Developer — Cabinet conseil IT",
      location: "Issy-les-Moulineaux",
      bullets: [
        "Prospection téléphonique & gestion RDV",
        "Contribution au recrutement",
      ],
    },
    {
      period: "Août 2021 – Août 2023",
      company: "Point P",
      role: "Conseiller de vente B2B",
      location: "Noisy-le-Sec",
      bullets: [
        "Négociations clients/fournisseurs · gestion portefeuille",
        "Création d'événements & campagnes marketing",
      ],
    },
  ];

  return (
    <Panel bgWord="Terrain">
      <div className="w-full max-w-3xl">
        <SectionLabel n="02" title="Expériences" />
        <div className="space-y-7 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {xps.map((x, i) => (
            <div key={i} className="flex gap-8">
              <div className="w-36 flex-shrink-0 pt-1">
                <p className="font-mono text-[9px] text-accent tracking-wider leading-relaxed">{x.period}</p>
              </div>
              <div className="flex-1 border-l border-foreground/10 pl-8 pb-5">
                <h3 className="font-serif text-lg text-foreground font-light">{x.company}</h3>
                <p className="font-mono text-[10px] text-foreground/40 tracking-wider mt-0.5">{x.role} · {x.location}</p>
                <ul className="mt-2 space-y-0.5">
                  {x.bullets.map((b, j) => (
                    <li key={j} className="font-sans text-xs text-foreground/45 leading-relaxed before:content-['·'] before:mr-2 before:text-accent/50">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 3 — FORMATION
// ──────────────────────────────────────────────────────────────────────────────
function PanelFormation() {
  const schools = [
    {
      years: "2024 – 2026",
      school: "Eugenia School",
      degree: "MSc Business & Data",
      location: "Paris 10",
      courses: "Business Analytics · Data Visualisation · CRM · Nocode · Marketing Analytique",
      tools: ["Python", "SQL", "Power BI", "GitHub", "Docker", "JavaScript", "Dataiku", "Google Analytics", "Airtable", "Notion", "Zapier"],
    },
    {
      years: "2023 – 2024",
      school: "Euridis Business School",
      degree: "Bachelor Commerce International",
      location: "Paris 9",
      courses: "Supply Chain · Value Selling · English Business · Marketing B2B · Growth Hacking",
      tools: [],
    },
    {
      years: "2021 – 2023",
      school: "Stephenson Formation",
      degree: "BTS NDRC",
      location: "Paris 18",
      courses: "Relation client à distance · Négociation · Digitalisation · Anglais",
      tools: [],
    },
  ];

  return (
    <Panel bgWord="École">
      <div className="w-full max-w-3xl">
        <SectionLabel n="03" title="Formation" />
        <div className="space-y-10">
          {schools.map((s, i) => (
            <div key={i} className="flex gap-8">
              <div className="w-28 flex-shrink-0 pt-1">
                <p className="font-mono text-[10px] text-accent tracking-wider">{s.years}</p>
              </div>
              <div className="flex-1 border-l border-foreground/10 pl-8 pb-6">
                <h3 className="font-serif text-xl md:text-2xl text-foreground font-light">{s.school}</h3>
                <p className="font-mono text-xs text-foreground/50 tracking-wider mt-1">{s.degree} · {s.location}</p>
                <p className="font-sans text-xs text-foreground/40 mt-3 leading-relaxed">{s.courses}</p>
                {s.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tools.map(t => <Tag key={t} label={t} />)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 4 — AUSTRALIE
// ──────────────────────────────────────────────────────────────────────────────
function PanelAustralie() {
  return (
    <Panel bgWord="Australie">
      <div className="w-full max-w-3xl">
        <SectionLabel n="04" title="Australie — 2018 / 2020" />
        <p className="font-serif text-2xl md:text-4xl text-foreground font-light leading-snug mb-12 max-w-xl">
          Deux ans au bout du monde.<br />
          <span className="text-foreground/50 italic">Matelot, superviseur, immigrant.</span>
        </p>
        <p className="font-sans text-sm text-foreground/50 leading-relaxed max-w-lg">
          Immersion totale en anglais dès le premier jour — pêche au thon en mer de plusieurs mois,
          puis supervision d'une équipe de cueilleurs en ferme. Première expérience de management,
          premiers objectifs quotidiens à tenir. L'anglais bilingue n'est pas venu d'une salle de classe.
        </p>
        <div className="mt-10 border-l border-accent/30 pl-8">
          <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-2">Résultat</p>
          <p className="font-serif text-lg text-foreground/70 font-light italic">
            Langue de travail principale depuis — aujourd'hui quotidien avec Londres.
          </p>
        </div>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 5 — OUTILS & LANGUES
// ──────────────────────────────────────────────────────────────────────────────
function PanelSkills() {
  const groups = [
    {
      category: "Data & Analyse",
      tools: ["Python", "SQL", "Power BI", "Tableau", "Dataiku", "Google Analytics"],
    },
    {
      category: "Automatisation & No-Code",
      tools: ["Make", "N8N", "Zapier", "Airtable", "Notion"],
    },
    {
      category: "Gestion de projet",
      tools: ["Excel", "PowerPoint", "Notion", "GitHub", "Docker"],
    },
    {
      category: "En apprentissage",
      tools: ["JavaScript", "Machine Learning"],
    },
  ];

  const langs = [
    { lang: "Français", level: "Natif" },
    { lang: "Anglais",  level: "Bilingue" },
    { lang: "Japonais", level: "Débutant" },
  ];

  return (
    <Panel bgWord="Skills">
      <div className="w-full max-w-3xl">
        <SectionLabel n="05" title="Outils & Langues" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {groups.map((g) => (
            <div key={g.category}>
              <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-3">{g.category}</p>
              <div className="flex flex-wrap gap-2">
                {g.tools.map(t => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-foreground/10 pt-8">
          <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-4">Langues</p>
          <div className="flex gap-10">
            {langs.map((l) => (
              <div key={l.lang}>
                <p className="font-sans text-sm text-foreground/70">{l.lang}</p>
                <p className="font-mono text-[10px] text-accent tracking-wider mt-0.5">{l.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PANEL 6 — HOBBIES + CV
// ──────────────────────────────────────────────────────────────────────────────
function PanelHobbies() {
  const hobbies = [
    { icon: "♟", label: "Échecs" },
    { icon: "📖", label: "Lecture" },
    { icon: "🏀", label: "Basketball" },
    { icon: "🎾", label: "Tennis · Padel" },
    { icon: "✏️", label: "Dessin" },
  ];

  return (
    <Panel bgWord="Ailleurs">
      <div className="w-full max-w-2xl">
        <SectionLabel n="06" title="Ailleurs" />
        <div className="flex flex-wrap gap-8 mb-16">
          {hobbies.map((h) => (
            <div key={h.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{h.icon}</span>
              <span className="font-mono text-[10px] text-foreground/40 tracking-widest uppercase">{h.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-foreground/10 pt-10 flex flex-col gap-4">
          <p className="font-mono text-[10px] text-foreground/30 tracking-widest uppercase">Curriculum Vitae</p>
          <a href="#" className="inline-flex items-center gap-4 group self-start">
            <span className="font-serif text-2xl md:text-3xl text-foreground font-light group-hover:text-accent transition-colors duration-300">
              Télécharger mon CV
            </span>
            <span className="font-mono text-xs text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <p className="font-mono text-[9px] text-foreground/20 tracking-widest">PDF — bientôt disponible</p>
        </div>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function SceneMoiCV({ onBack }: Props) {
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

      <div className="absolute top-8 right-8 md:right-12 z-10 font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
        scroll →
      </div>

      <div
        ref={trackRef}
        style={{ display: "flex", height: "100%", willChange: "transform" }}
      >
        <PanelIntro />
        <PanelExperiences />
        <PanelFormation />
        <PanelAustralie />
        <PanelSkills />
        <PanelHobbies />
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(240,235,226,0.08)" }}>
        <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#c41e1e" }} />
      </div>
    </div>
  );
}
