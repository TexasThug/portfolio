"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface Props { onBack: () => void }

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-8">
      {n} — {title}
    </p>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelIntro() {
  const { lang } = useLanguage();

  const t = lang === "fr"
    ? {
        label: "01 — Projet",
        desc: "Analyse exploratoire d'un dataset de 8 807 titres Netflix — films et séries. Nettoyage des données, exploration des tendances de production mondiale et visualisation des dynamiques de contenu entre 2000 et 2021.",
        stats: [
          { value: "8 807", label: "Titres analysés" },
          { value: "2 634", label: "Réalisateurs manquants" },
          { value: "21",    label: "Années couvertes" },
        ],
      }
    : {
        label: "01 — Project",
        desc: "Exploratory analysis of a dataset of 8,807 Netflix titles — movies and series. Data cleaning, exploration of global production trends, and visualization of content dynamics from 2000 to 2021.",
        stats: [
          { value: "8,807", label: "Titles analyzed" },
          { value: "2,634", label: "Missing directors" },
          { value: "21",    label: "Years covered" },
        ],
      };

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="max-w-xl">
        <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-6">{t.label}</p>
        <h2 className="font-serif font-light text-foreground leading-none mb-8"
          style={{ fontSize: "clamp(48px, 7vw, 100px)" }}>
          Netflix<br />
          <span className="text-accent italic">Titles Analysis</span>
        </h2>
        <p className="font-sans text-sm text-foreground/50 leading-relaxed max-w-md mb-10">{t.desc}</p>
        <div className="flex gap-3 flex-wrap mb-6">
          {["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"].map(s => (
            <span key={s}
              className="font-mono text-[10px] tracking-widest uppercase text-foreground/50 px-3 py-1.5"
              style={{ border: "1px solid rgba(196,30,30,0.3)" }}>
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-10">
          {t.stats.map(s => (
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
  const { lang } = useLanguage();

  const pays = [
    { country: "United States", count: 2809, pct: 100 },
    { country: "India",         count: 972,  pct: 35  },
    { country: "Unknown",       count: 829,  pct: 30  },
    { country: "United Kingdom",count: 418,  pct: 15  },
    { country: "Japan",         count: 243,  pct: 9   },
  ];

  const t = lang === "fr"
    ? {
        label: "02 — Top pays producteurs",
        caption: "Les États-Unis dominent massivement la production Netflix. L'Inde confirme son rôle de 2ème puissance mondiale du cinéma avec 972 titres.",
      }
    : {
        label: "02 — Top producing countries",
        caption: "The US massively dominates Netflix production. India confirms its role as the world's 2nd film power with 972 titles.",
      };

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="02" title={t.label.replace("02 — ", "")} />
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
            <img src="/netflix-top5-pays.png" alt="Top 5 producing countries" className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
            <p className="font-sans text-xs text-foreground/35 leading-relaxed">{t.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelEvolution() {
  const { lang } = useLanguage();

  const t = lang === "fr"
    ? {
        title: "Évolution des sorties (2000 – 2021)",
        peakLabel: "Pic", peakYear: "2018",
        peakDesc: "Année record de production avant le ralentissement Covid en 2020.",
        insightLabel: "Insight", insightTitle: "Covid — 2020",
        insightDesc: "Chute visible des tournages liée aux restrictions sanitaires mondiales.",
      }
    : {
        title: "Release trends (2000 – 2021)",
        peakLabel: "Peak", peakYear: "2018",
        peakDesc: "Record production year before the Covid slowdown in 2020.",
        insightLabel: "Insight", insightTitle: "Covid — 2020",
        insightDesc: "Visible drop in productions linked to global health restrictions.",
      };

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="03" title={t.title} />
        <img src="/netflix-evolution-sorties.png" alt={t.title} className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
        <div className="mt-6 flex gap-12">
          <div className="border-l border-accent/40 pl-6">
            <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">{t.peakLabel}</p>
            <p className="font-serif text-2xl text-foreground font-light">{t.peakYear}</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">{t.peakDesc}</p>
          </div>
          <div className="border-l border-foreground/15 pl-6">
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">{t.insightLabel}</p>
            <p className="font-serif text-2xl text-foreground/60 font-light italic">{t.insightTitle}</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">{t.insightDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelFilmsSeries() {
  const { lang } = useLanguage();

  const t = lang === "fr"
    ? {
        title: "Films vs Séries",
        model: "Modèle Netflix", modelTitle: "Films d'abord",
        modelDesc: "Netflix a construit sa bibliothèque sur les films, dominant en volume depuis 2010.",
        resilience: "Résilience", resTitle: "Séries stables",
        resDesc: "La production de séries résiste mieux aux crises — tournages plus modulables.",
      }
    : {
        title: "Movies vs Series",
        model: "Netflix Model", modelTitle: "Movies first",
        modelDesc: "Netflix built its library on movies, dominating in volume since 2010.",
        resilience: "Resilience", resTitle: "Stable series",
        resDesc: "Series production holds up better in crises — more flexible shooting schedules.",
      };

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-4xl">
        <SectionLabel n="04" title={t.title} />
        <img src="/netflix-films-vs-series.png" alt={t.title} className="w-full rounded-sm" style={{ maxHeight: "48vh", objectFit: "contain" }} />
        <div className="mt-6 flex gap-12">
          <div className="border-l border-accent/40 pl-6">
            <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">{t.model}</p>
            <p className="font-serif text-2xl text-foreground font-light">{t.modelTitle}</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">{t.modelDesc}</p>
          </div>
          <div className="border-l border-foreground/15 pl-6">
            <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mb-1">{t.resilience}</p>
            <p className="font-serif text-2xl text-foreground/60 font-light italic">{t.resTitle}</p>
            <p className="font-sans text-xs text-foreground/35 mt-1 max-w-xs">{t.resDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelConclusion() {
  const { lang } = useLanguage();

  const t = lang === "fr"
    ? {
        title: "Conclusions",
        notebook: "Voir le notebook",
        takeaways: [
          { n: "01", text: "L'Inde est le 2ème producteur mondial de contenu Netflix — 972 titres." },
          { n: "02", text: "Le genre dominant est le Drame International, suivi des Documentaires." },
          { n: "03", text: "Le pic de production est en 2018 — le Covid marque un net ralentissement." },
          { n: "04", text: "Netflix a misé sur les films en volume, mais les séries sont plus résilientes." },
        ],
      }
    : {
        title: "Conclusions",
        notebook: "View the notebook",
        takeaways: [
          { n: "01", text: "India is the 2nd largest producer of Netflix content — 972 titles." },
          { n: "02", text: "The dominant genre is International Drama, followed by Documentaries." },
          { n: "03", text: "Peak production was in 2018 — Covid caused a clear slowdown." },
          { n: "04", text: "Netflix bet on movies in volume, but series proved more resilient." },
        ],
      };

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full max-w-3xl">
        <SectionLabel n="05" title={t.title} />
        <div className="space-y-6 mb-14">
          {t.takeaways.map(item => (
            <div key={item.n} className="flex gap-6 items-start">
              <span className="font-mono text-[9px] text-accent tracking-widest pt-1 flex-shrink-0">{item.n}</span>
              <p className="font-serif text-lg md:text-xl text-foreground font-light leading-snug">{item.text}</p>
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
              {t.notebook}
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
  const { lang } = useLanguage();
  const overlayRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentX = useRef(0);
  const targetX  = useRef(0);

  const back = lang === "fr" ? "← Projets" : "← Projects";

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

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,30,30,0.06) 0%, transparent 70%)",
      }} />

      <button
        onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200"
      >
        {back}
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
