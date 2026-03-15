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

function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-sm" style={{ border: "1px solid rgba(240,235,226,0.08)" }}>
        <img src={src} alt={alt} className="w-full object-contain" style={{ maxHeight: "68vh" }} />
      </div>
      {caption && <p className="font-mono text-[9px] text-foreground/25 tracking-widest uppercase">{caption}</p>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelIntro() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full grid md:grid-cols-[1fr_1.5fr] gap-12 items-center max-w-6xl">
        <div>
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-6">01 — Cas Business</p>
          <h2 className="font-serif font-light text-foreground leading-none mb-6"
            style={{ fontSize: "clamp(42px, 6vw, 86px)" }}>
            PayFit<br />
            <span className="text-accent italic">Hackathon</span>
          </h2>
          <p className="font-sans text-sm text-foreground/50 leading-relaxed mb-8">
            Créer une stratégie de contenu IA + SEO pour PayFit, avec un outil annexe
            conçu pour devenir viral et générer du trafic qualifié — employés comme employeurs.
          </p>
          <div className="space-y-2 mb-8">
            {[
              "Agents IA → articles tendance & mots clés SEO",
              "Calculette salaire comme outil d'acquisition",
              "Parasitage SEO LinkedIn / Reddit",
              "Tunnel employé → employeur",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-accent mt-0.5 text-xs">→</span>
                <p className="font-sans text-xs text-foreground/50 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {["React", "TypeScript", "Lovable", "URSSAF 2025"].map(t => (
              <span key={t} className="font-mono text-[10px] tracking-widest uppercase text-foreground/50 px-3 py-1.5"
                style={{ border: "1px solid rgba(196,30,30,0.3)" }}>{t}</span>
            ))}
          </div>
        </div>
        <Screenshot src="/payfit-hero.png" alt="PayFit calculette hero" caption="L'outil — calculette brut/net 2025" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelFiche() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full grid md:grid-cols-[1fr_1.5fr] gap-12 items-center max-w-6xl">
        <div>
          <SectionLabel n="02" title="Fiche de paie décodée" />
          <p className="font-serif font-light text-foreground leading-snug mb-8"
            style={{ fontSize: "clamp(24px, 3vw, 42px)" }}>
            Chaque ligne expliquée.<br />
            <span className="text-foreground/40 italic">Pour que personne ne soit perdu.</span>
          </p>
          <p className="font-sans text-sm text-foreground/45 leading-relaxed mb-8 max-w-sm">
            La majorité des salariés ne comprennent pas leur fiche de paie.
            Chaque cotisation — SS Vieillesse, AGIRC-ARRCO, CSG, CRDS — dispose
            d'un tooltip qui l'explique en clair. L'outil éduque autant qu'il calcule.
          </p>
          <div className="border-l border-accent/30 pl-6">
            <p className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">Impact</p>
            <p className="font-serif text-lg text-foreground/70 font-light italic">
              Un employé qui comprend sa paie est un employé qui fait confiance à son employeur.
            </p>
          </div>
        </div>
        <Screenshot src="/payfit-tooltip.png" alt="Fiche de paie avec tooltip" caption="Bulletin simulé avec tooltips ligne par ligne" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelSimulation() {
  const features = [
    { label: "Brut → Net",    desc: "Calcul instantané avec taux 2025" },
    { label: "Net → Brut",    desc: "Simulation inverse pour négocier" },
    { label: "PAS",           desc: "Prélèvement à la source inclus" },
    { label: "Augmentation",  desc: "Slider pour simuler une hausse" },
    { label: "Prime",         desc: "Impact d'une prime sur le net" },
    { label: "PPV",           desc: "Avantage vs prime classique" },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full grid md:grid-cols-[1fr_1.5fr] gap-12 items-center max-w-6xl">
        <div>
          <SectionLabel n="03" title="Simulateur de scénarios" />
          <p className="font-serif font-light text-foreground leading-snug mb-8"
            style={{ fontSize: "clamp(24px, 3vw, 42px)" }}>
            Simule. Négocie.<br />
            <span className="text-foreground/40 italic">Décide.</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {features.map(f => (
              <div key={f.label} className="px-4 py-3" style={{ border: "1px solid rgba(196,30,30,0.2)", background: "rgba(196,30,30,0.04)" }}>
                <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-1">{f.label}</p>
                <p className="font-sans text-xs text-foreground/40">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Screenshot src="/payfit-simulation.png" alt="Simulateur de scénarios" caption="PAS + simulation augmentation / prime / PPV" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelDataviz() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full grid md:grid-cols-[1fr_1.5fr] gap-12 items-center max-w-6xl">
        <div>
          <SectionLabel n="04" title="Flux de salaire" />
          <p className="font-serif font-light text-foreground leading-snug mb-8"
            style={{ fontSize: "clamp(24px, 3vw, 42px)" }}>
            Visualiser où part<br />
            <span className="text-accent italic">chaque euro.</span>
          </p>
          <p className="font-sans text-sm text-foreground/45 leading-relaxed mb-8 max-w-sm">
            Diagramme Sankey montrant comment le brut se décompose —
            retraite, santé & protection, et ce qui reste en poche.
            La donnée devient visuelle, immédiate, compréhensible.
          </p>
          <div className="flex gap-8">
            {[
              { pct: "78%", label: "Dans la poche" },
              { pct: "11%", label: "Retraite" },
              { pct: "11%", label: "Santé" },
            ].map(s => (
              <div key={s.label}>
                <p className="font-serif font-light text-foreground" style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}>{s.pct}</p>
                <p className="font-mono text-[9px] text-foreground/30 tracking-widest uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Screenshot src="/payfit-sankey.png" alt="Sankey flux salaire" caption="Répartition brut mensuel — Sankey diagram" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
function PanelConclusion() {
  return (
    <div style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      className="relative flex items-center px-12 md:px-24">
      <div className="w-full grid md:grid-cols-[1fr_1.5fr] gap-12 items-center max-w-6xl">
        <div>
          <SectionLabel n="05" title="Ce que ça démontre" />
          <div className="space-y-5 mb-12">
            {[
              { n: "01", text: "Capacité à traduire un brief business en outil concret en temps limité." },
              { n: "02", text: "Vision stratégie de contenu + acquisition — pas juste du dev pour du dev." },
              { n: "03", text: "Maîtrise des logiques métier complexes (cotisations URSSAF, taux 2025)." },
              { n: "04", text: "Data viz au service de la pédagogie — simplifier sans dénaturer." },
            ].map(t => (
              <div key={t.n} className="flex gap-6 items-start">
                <span className="font-mono text-[9px] text-accent tracking-widest pt-1 flex-shrink-0">{t.n}</span>
                <p className="font-serif text-lg text-foreground font-light leading-snug">{t.text}</p>
              </div>
            ))}
          </div>
          <a href="https://github.com/TexasThug/payfit_hackathon-" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group">
            <span className="font-serif text-xl text-foreground font-light group-hover:text-accent transition-colors duration-300">
              Voir le code
            </span>
            <span className="font-mono text-xs text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
        <Screenshot src="/payfit-dashboard.png" alt="Dashboard où va votre argent" caption="Dashboard — projection annuelle 2026" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
export default function ScenePayfitProject({ onBack }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentX    = useRef(0);
  const targetX     = useRef(0);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
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
      if (prog) prog.style.width = `${Math.min(100, (-currentX.current / -getMaxX()) * 100)}%`;
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
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onBack });
  };

  return (
    <div ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0e0e0e", overflow: "hidden" }}>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(196,30,30,0.05) 0%, transparent 70%)",
      }} />

      <button onClick={handleClose}
        className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200">
        ← Cas Business
      </button>
      <div className="absolute top-8 right-8 md:right-12 z-10 font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
        scroll →
      </div>

      <div ref={trackRef} style={{ display: "flex", height: "100%", willChange: "transform" }}>
        <PanelIntro />
        <PanelFiche />
        <PanelSimulation />
        <PanelDataviz />
        <PanelConclusion />
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(240,235,226,0.08)" }}>
        <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#c41e1e" }} />
      </div>
    </div>
  );
}
