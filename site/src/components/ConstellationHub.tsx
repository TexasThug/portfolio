"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NodeId = "data" | "ia" | "strategie" | "about";

// ── Small starburst — for deco stars only
const Star = ({
  x, y, size, opacity = 1,
}: {
  x: number; y: number; size: number; opacity?: number;
}) => {
  const s2 = size * 0.65;
  const w  = size * 0.22;
  return (
    <g opacity={opacity}>
      <line x1={x - size} y1={y}        x2={x + size} y2={y}        stroke="#f0ebe2" strokeWidth={w}       strokeLinecap="round" />
      <line x1={x}        y1={y - size}  x2={x}        y2={y + size} stroke="#f0ebe2" strokeWidth={w}       strokeLinecap="round" />
      <line x1={x - s2}   y1={y - s2}   x2={x + s2}   y2={y + s2}  stroke="#f0ebe2" strokeWidth={w * 0.7} strokeLinecap="round" />
      <line x1={x + s2}   y1={y - s2}   x2={x - s2}   y2={y + s2}  stroke="#f0ebe2" strokeWidth={w * 0.7} strokeLinecap="round" />
    </g>
  );
};

// ── Galaxy node — glowing orb with radial gradient + micro star field
const GalaxyNode = ({
  x, y, size, id, hovered,
}: {
  x: number; y: number; size: number; id: string; hovered: boolean;
}) => {
  const r = size * 2.8;

  // Micro star particles (relative to center, as fraction of r)
  const particles: { dx: number; dy: number; pr: number; op: number }[] = [
    { dx: -0.38, dy:  0.22, pr: 0.09, op: 0.70 },
    { dx:  0.50, dy: -0.18, pr: 0.07, op: 0.60 },
    { dx: -0.15, dy: -0.48, pr: 0.06, op: 0.55 },
    { dx:  0.35, dy:  0.40, pr: 0.08, op: 0.65 },
    { dx: -0.55, dy: -0.08, pr: 0.06, op: 0.50 },
    { dx:  0.10, dy:  0.58, pr: 0.05, op: 0.45 },
    { dx:  0.58, dy:  0.15, pr: 0.06, op: 0.55 },
    { dx: -0.25, dy: -0.55, pr: 0.05, op: 0.45 },
    { dx:  0.20, dy: -0.60, pr: 0.04, op: 0.38 },
    { dx: -0.62, dy:  0.30, pr: 0.05, op: 0.40 },
    { dx:  0.65, dy: -0.35, pr: 0.04, op: 0.35 },
    { dx: -0.42, dy:  0.55, pr: 0.04, op: 0.38 },
  ];

  return (
    <g
      style={{
        transform: `scale(${hovered ? 1.18 : 1})`,
        transformOrigin: `${x}px ${y}px`,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Outermost diffuse halo */}
      <circle cx={x} cy={y} r={r * 2.0} fill={`url(#halo-${id})`} />

      {/* Main galaxy body */}
      <circle cx={x} cy={y} r={r} fill={`url(#grad-${id})`} />

      {/* Thin inner ring */}
      <circle cx={x} cy={y} r={r * 0.40} fill="none" stroke="#f0ebe2" strokeWidth="0.055" opacity={hovered ? 0.65 : 0.38} />

      {/* Bright core */}
      <circle cx={x} cy={y} r={r * 0.14} fill="#ffffff" opacity={0.95} />

      {/* Micro star field */}
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={x + p.dx * r}
          cy={y + p.dy * r}
          r={p.pr}
          fill="#f0ebe2"
          opacity={p.op}
        />
      ))}
    </g>
  );
};

// ── Clickable nodes
const mainNodes: { id: NodeId; label: string; x: number; y: number; size: number }[] = [
  { id: "about",     label: "Moi",       x: 15,  y: 12,  size: 1.4 },
  { id: "data",      label: "Data",      x: 35,  y: 50,  size: 1.9 },
  { id: "ia",        label: "IA",        x: 68,  y: 18,  size: 1.9 },
  { id: "strategie", label: "Stratégie", x: 82,  y: 54,  size: 1.9 },
];

// ── Decorative stars (not clickable)
const decoStars = [
  { x: 26,  y: 25,  size: 0.8 },
  { x: 46,  y: 8,   size: 0.6 },
  { x: 53,  y: 32,  size: 0.8 },
  { x: 72,  y: 7,   size: 0.5 },
  { x: 88,  y: 26,  size: 0.7 },
  { x: 93,  y: 13,  size: 0.4 },
  { x: 13,  y: 47,  size: 0.6 },
  { x: 43,  y: 63,  size: 0.6 },
  { x: 6,   y: 33,  size: 0.5 },
  { x: 96,  y: 43,  size: 0.5 },
  { x: 59,  y: 49,  size: 0.5 },
  { x: 8,   y: 20,  size: 0.4 },
  { x: 78,  y: 37,  size: 0.5 },
  { x: 47,  y: 21,  size: 0.4 },
  { x: 94,  y: 61,  size: 0.4 },
  { x: 4,   y: 57,  size: 0.3 },
  { x: 28,  y: 57,  size: 0.4 },
  { x: 20,  y: 38,  size: 0.4 },
  { x: 61,  y: 63,  size: 0.4 },
];

// ── RED main path
const redEdges: [number, number, number, number][] = [
  [15, 12, 35, 50],
  [35, 50, 68, 18],
  [68, 18, 82, 54],
];

// ── Secondary edges
const secondaryEdges: [number, number, number, number][] = [
  [15, 12, 26, 25], [15, 12, 8,  20], [15, 12, 46, 8 ],
  [35, 50, 26, 25], [35, 50, 53, 32], [35, 50, 13, 47],
  [35, 50, 43, 63], [35, 50, 20, 38],
  [68, 18, 46, 8 ], [68, 18, 47, 21], [68, 18, 72, 7 ],
  [68, 18, 88, 26], [68, 18, 93, 13],
  [82, 54, 53, 32], [82, 54, 88, 26], [82, 54, 78, 37],
  [82, 54, 43, 63], [82, 54, 96, 43], [82, 54, 94, 61],
  [82, 54, 59, 49],
  [26, 25, 47, 21], [72, 7,  93, 13], [13, 47, 28, 57],
  [6,  33, 13, 47], [61, 63, 43, 63],
];

// ── Universe data
const universes = {
  data: {
    title: "Data",
    projects: [
      {
        number: "01 / 02",
        title: "Mamba Mentality",
        subtitle: "Analyse de la carrière de Kobe Bryant",
        description:
          "Dashboard Power BI explorant 20 ans de statistiques NBA. Performances par saison, adversaire, situation de jeu — les chiffres d'une mentalité hors du commun.",
        tags: ["Power BI", "DAX", "Data Analysis"],
        link: null,
        linkLabel: null,
      },
      {
        number: "02 / 02",
        title: "Python Works",
        subtitle: "100+ exercices & mini-projets",
        description:
          "Listes, tuples, pandas, numpy, automatisation. Pendule, gestionnaire de sneakers, puzzles pandas. La data, apprise par la pratique quotidienne.",
        tags: ["Python", "Pandas", "NumPy"],
        link: "https://github.com/TexasThug/Python_works",
        linkLabel: "GitHub →",
      },
    ],
  },
  ia: {
    title: "IA",
    projects: [
      {
        number: "01 / 01",
        title: "Three-Man-Shaker",
        subtitle: "Jeu de dés multijoueur",
        description:
          "Application web du jeu Three-Man. Gestion des tours, règles dynamiques, interface pensée pour être jouée en groupe. Projet personnel construit pour s'amuser — et apprendre.",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/TexasThug/three-man-shaker",
        linkLabel: "GitHub →",
      },
    ],
  },
  strategie: {
    title: "Stratégie",
    projects: [
      {
        number: "01 / 01",
        title: "Analyse Produits",
        subtitle: "Performance par catégorie",
        description:
          "Fichier Excel structuré pour identifier les catégories de produits les plus performantes. Tableaux croisés dynamiques, visualisations, synthèse orientée décision métier.",
        tags: ["Excel", "Analyse de données", "Business Intelligence"],
        link: null,
        linkLabel: null,
      },
    ],
  },
  about: { title: "Moi", projects: [] },
};

export default function ConstellationHub() {
  const sectionRef  = useRef<HTMLElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const universeRef = useRef<HTMLDivElement>(null);
  const constellRef = useRef<HTMLDivElement>(null);

  const [activeNode,      setActiveNode]      = useState<NodeId | null>(null);
  const [projectIndex,    setProjectIndex]    = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredNode,     setHoveredNode]     = useState<NodeId | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(constellRef.current, {
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleNodeClick = useCallback(
    (nodeId: NodeId) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      const svgEl     = svgRef.current;
      const overlayEl = overlayRef.current;
      if (!svgEl || !overlayEl) return;

      const node = mainNodes.find((n) => n.id === nodeId);
      if (!node) return;

      const rect   = svgEl.getBoundingClientRect();
      const scaleX = rect.width  / 100;
      const scaleY = rect.height / 68;
      const sx     = rect.left + node.x * scaleX;
      const sy     = rect.top  + node.y * scaleY;

      gsap.set(overlayEl, {
        display: "block", position: "fixed",
        left: sx, top: sy,
        xPercent: -50, yPercent: -50,
        width: 20, height: 20,
        borderRadius: "50%", scale: 1, opacity: 1, zIndex: 50,
      });

      gsap.to(overlayEl, {
        scale: 150, duration: 0.9, ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlayEl, { display: "none" });
          setActiveNode(nodeId);
          setProjectIndex(0);
          setIsTransitioning(false);
        },
      });
    },
    [isTransitioning]
  );

  useEffect(() => {
    if (activeNode && universeRef.current) {
      gsap.fromTo(universeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeNode]);

  const handleBack = useCallback(() => {
    if (isTransitioning || !universeRef.current) return;
    setIsTransitioning(true);
    gsap.to(universeRef.current, {
      opacity: 0, duration: 0.35, ease: "power2.in",
      onComplete: () => { setActiveNode(null); setIsTransitioning(false); },
    });
  }, [isTransitioning]);

  const navigateProject = useCallback(
    (dir: 1 | -1) => {
      if (!activeNode || activeNode === "about") return;
      const universe = universes[activeNode as keyof typeof universes];
      if (!universe || universe.projects.length <= 1) return;
      const next = projectIndex + dir;
      if (next < 0 || next >= universe.projects.length) return;

      const rightEl = document.getElementById("univ-right");
      const leftEl  = document.getElementById("univ-left-content");

      if (rightEl) {
        gsap.to(rightEl, {
          x: dir * -80, opacity: 0, duration: 0.3, ease: "power2.in",
          onComplete: () => {
            setProjectIndex(next);
            gsap.fromTo(rightEl,
              { x: dir * 80, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      }
      if (leftEl) {
        gsap.to(leftEl, {
          opacity: 0, duration: 0.2,
          onComplete: () => gsap.to(leftEl, { opacity: 1, duration: 0.3, delay: 0.15 }),
        });
      }
    },
    [activeNode, projectIndex]
  );

  const currentUniverse = activeNode && activeNode !== "about"
    ? universes[activeNode as keyof typeof universes]
    : null;
  const currentProject = currentUniverse?.projects[projectIndex];

  return (
    <section ref={sectionRef} className="relative bg-background">

      <div
        ref={overlayRef}
        style={{ display: "none", background: "var(--background)", position: "fixed", zIndex: 50 }}
      />

      {/* ── CONSTELLATION ── */}
      {!activeNode && (
        <div ref={constellRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-10">
            Explore l&apos;univers
          </p>

          <svg
            ref={svgRef}
            viewBox="0 0 100 68"
            className="w-full max-w-3xl"
            style={{ cursor: "crosshair" }}
          >
            <defs>
              {mainNodes.map((node) => (
                <g key={node.id}>
                  <radialGradient id={`grad-${node.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#f0ebe2" stopOpacity="0.92" />
                    <stop offset="18%"  stopColor="#f0ebe2" stopOpacity="0.55" />
                    <stop offset="40%"  stopColor="#d8d0c4" stopOpacity="0.22" />
                    <stop offset="65%"  stopColor="#f0ebe2" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="#f0ebe2" stopOpacity="0"    />
                  </radialGradient>
                  <radialGradient id={`halo-${node.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#f0ebe2" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#f0ebe2" stopOpacity="0"    />
                  </radialGradient>
                </g>
              ))}
            </defs>

            {/* Secondary edges */}
            {secondaryEdges.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#f0ebe2" strokeWidth="0.06" opacity={0.18} />
            ))}

            {/* RED main path */}
            {redEdges.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#c41e1e" strokeWidth="0.18" opacity={0.80} />
            ))}

            {/* Decorative small stars */}
            {decoStars.map((s, i) => (
              <Star key={i} x={s.x} y={s.y} size={s.size} opacity={0.35} />
            ))}

            {/* Galaxy main nodes */}
            {mainNodes.map((node) => {
              const isHov = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node.id)}
                >
                  {/* Large invisible hit area */}
                  <circle cx={node.x} cy={node.y} r={8} fill="transparent" />

                  <GalaxyNode
                    x={node.x} y={node.y}
                    size={node.size}
                    id={node.id}
                    hovered={isHov}
                  />

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + node.size * 2.8 + 4}
                    textAnchor="middle"
                    fontSize={node.id === "about" ? "3.0" : "3.5"}
                    fill="#f0ebe2"
                    fontFamily="var(--font-jetbrains)"
                    opacity={isHov ? 1 : 0.5}
                    style={{ transition: "opacity 0.25s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="font-mono text-[10px] text-foreground/25 tracking-widest uppercase mt-10">
            Cliquer pour explorer
          </p>
        </div>
      )}

      {/* ── UNIVERSE ── */}
      {activeNode && (
        <div ref={universeRef} className="min-h-screen flex flex-col" style={{ opacity: 0 }}>

          <button
            onClick={handleBack}
            className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200"
          >
            ← Constellation
          </button>

          {activeNode === "about" ? (
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 px-8 md:px-20 py-24">
              <div className="max-w-md space-y-6">
                <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase">Moi</p>
                <p className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
                  Ingénieur d&apos;affaires reconverti vers la Data.
                </p>
                <p className="font-sans text-base text-foreground/60 leading-relaxed">
                  Je ne suis pas expert dans un seul domaine — je suis celui qui fait tenir les pièces ensemble.
                  Analyser, comprendre, connecter : que ce soit sur un échiquier, dans un roman de Tolstoï ou dans un dashboard Power BI.
                </p>
                <p className="font-sans text-base text-foreground/60 leading-relaxed">
                  Mon parcours mêle business, data et créativité. Pas malgré ça — grâce à ça.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Eugenia Business School", "Albert School", "Mines de Paris"].map((tag) => (
                    <span key={tag} className="font-mono text-[10px] tracking-widest uppercase border border-foreground/20 text-foreground/40 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col md:flex-row min-h-screen">
              <div
                id="univ-left-content"
                className="w-full md:w-2/5 flex flex-col justify-center px-8 md:px-16 py-24 md:py-16 gap-6 border-r border-foreground/10"
              >
                <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">
                  {currentUniverse?.title}
                </p>
                {currentProject && (
                  <>
                    <div>
                      <p className="font-mono text-[10px] text-foreground/30 tracking-widest mb-2">
                        {currentProject.number}
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-light leading-tight">
                        {currentProject.title}
                      </h2>
                      <p className="font-mono text-xs text-foreground/35 mt-2 tracking-wider">
                        {currentProject.subtitle}
                      </p>
                    </div>
                    <p className="font-sans text-sm text-foreground/55 leading-relaxed">
                      {currentProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] tracking-widest uppercase border border-foreground/15 text-foreground/35 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {currentProject.link && (
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors duration-200 self-start"
                      >
                        {currentProject.linkLabel}
                      </a>
                    )}
                  </>
                )}
                {currentUniverse && currentUniverse.projects.length > 1 && (
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => navigateProject(-1)} disabled={projectIndex === 0}
                      className="font-mono text-xs text-foreground/40 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                      ← prev
                    </button>
                    <span className="font-mono text-[10px] text-foreground/20">
                      {projectIndex + 1} / {currentUniverse.projects.length}
                    </span>
                    <button onClick={() => navigateProject(1)} disabled={projectIndex === currentUniverse.projects.length - 1}
                      className="font-mono text-xs text-foreground/40 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                      next →
                    </button>
                  </div>
                )}
              </div>

              <div id="univ-right" className="w-full md:w-3/5 relative overflow-hidden" style={{ minHeight: "60vh" }}>
                <div
                  className="absolute inset-0 flex items-end"
                  style={{ background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 45%, #0e0e0e 100%)" }}
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                      backgroundSize: "150px 150px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="relative z-10 p-8 md:p-12">
                    <p className="font-serif text-3xl md:text-5xl text-white font-light opacity-90">
                      {currentProject?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
