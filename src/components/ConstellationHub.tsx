"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneMoiCV from "./SceneMoiCV";
import SceneDataHub from "./SceneDataHub";
import SceneCasBusinessHub from "./SceneCasBusinessHub";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type NodeId = "data" | "ia" | "strategie" | "about";

// ── Ripple wave on node click
function Ripple({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const r1 = useRef<SVGCircleElement>(null);
  const r2 = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone });
    tl.fromTo(r1.current, { attr: { r: 1.5 }, opacity: 0.9 },
      { attr: { r: 14 }, opacity: 0, duration: 1.0, ease: "power2.out" }, 0)
      .fromTo(r2.current, { attr: { r: 1.5 }, opacity: 0.5 },
      { attr: { r: 22 }, opacity: 0, duration: 1.4, ease: "power2.out" }, 0.1);
  }, [onDone]);
  return (
    <g>
      <circle ref={r1} cx={x} cy={y} r={1.5} fill="none" stroke="#c41e1e" strokeWidth="0.18" />
      <circle ref={r2} cx={x} cy={y} r={1.5} fill="none" stroke="#f0ebe2" strokeWidth="0.08" />
    </g>
  );
}

// ── Small starburst — for deco stars only
const Star = ({ x, y, size, opacity = 1 }: { x: number; y: number; size: number; opacity?: number }) => {
  const s2 = size * 0.65;
  const w  = size * 0.22;
  return (
    <g opacity={opacity}>
      <line x1={x - size} y1={y}       x2={x + size} y2={y}       stroke="#f0ebe2" strokeWidth={w}       strokeLinecap="round" />
      <line x1={x}        y1={y - size} x2={x}        y2={y + size} stroke="#f0ebe2" strokeWidth={w}       strokeLinecap="round" />
      <line x1={x - s2}   y1={y - s2}  x2={x + s2}   y2={y + s2}  stroke="#f0ebe2" strokeWidth={w * 0.7} strokeLinecap="round" />
      <line x1={x + s2}   y1={y - s2}  x2={x - s2}   y2={y + s2}  stroke="#f0ebe2" strokeWidth={w * 0.7} strokeLinecap="round" />
    </g>
  );
};

// ── Galaxy node
const GalaxyNode = ({ x, y, size, id, hovered }: { x: number; y: number; size: number; id: string; hovered: boolean }) => {
  const r = size * 2.8;
  const particles: { dx: number; dy: number; pr: number; op: number }[] = [
    { dx: -0.38, dy:  0.22, pr: 0.09, op: 0.70 }, { dx:  0.50, dy: -0.18, pr: 0.07, op: 0.60 },
    { dx: -0.15, dy: -0.48, pr: 0.06, op: 0.55 }, { dx:  0.35, dy:  0.40, pr: 0.08, op: 0.65 },
    { dx: -0.55, dy: -0.08, pr: 0.06, op: 0.50 }, { dx:  0.10, dy:  0.58, pr: 0.05, op: 0.45 },
    { dx:  0.58, dy:  0.15, pr: 0.06, op: 0.55 }, { dx: -0.25, dy: -0.55, pr: 0.05, op: 0.45 },
    { dx:  0.20, dy: -0.60, pr: 0.04, op: 0.38 }, { dx: -0.62, dy:  0.30, pr: 0.05, op: 0.40 },
    { dx:  0.65, dy: -0.35, pr: 0.04, op: 0.35 }, { dx: -0.42, dy:  0.55, pr: 0.04, op: 0.38 },
  ];

  return (
    <g style={{ transform: `scale(${hovered ? 1.18 : 1})`, transformOrigin: `${x}px ${y}px`, transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <circle cx={x} cy={y} r={r * 2.0} fill={`url(#halo-${id})`} />
      <circle cx={x} cy={y} r={r}       fill={`url(#grad-${id})`} />
      <circle cx={x} cy={y} r={r * 0.40} fill="none" stroke="#f0ebe2" strokeWidth="0.055" opacity={hovered ? 0.65 : 0.38} />
      <circle cx={x} cy={y} r={r * 0.14} fill="#ffffff" opacity={0.95} />
      {particles.map((p, i) => (
        <circle key={i} cx={x + p.dx * r} cy={y + p.dy * r} r={p.pr} fill="#f0ebe2" opacity={p.op} />
      ))}
    </g>
  );
};

const staticNodes: { id: NodeId; x: number; y: number; size: number }[] = [
  { id: "about",     x: 15,  y: 12,  size: 1.4 },
  { id: "data",      x: 35,  y: 50,  size: 1.9 },
  { id: "ia",        x: 68,  y: 18,  size: 1.9 },
  { id: "strategie", x: 82,  y: 54,  size: 1.9 },
];

const decoStars = [
  { x: 26, y: 25, size: 0.8 }, { x: 46, y: 8,  size: 0.6 }, { x: 53, y: 32, size: 0.8 },
  { x: 72, y: 7,  size: 0.5 }, { x: 88, y: 26, size: 0.7 }, { x: 93, y: 13, size: 0.4 },
  { x: 13, y: 47, size: 0.6 }, { x: 43, y: 63, size: 0.6 }, { x: 6,  y: 33, size: 0.5 },
  { x: 96, y: 43, size: 0.5 }, { x: 59, y: 49, size: 0.5 }, { x: 8,  y: 20, size: 0.4 },
  { x: 78, y: 37, size: 0.5 }, { x: 47, y: 21, size: 0.4 }, { x: 94, y: 61, size: 0.4 },
  { x: 4,  y: 57, size: 0.3 }, { x: 28, y: 57, size: 0.4 }, { x: 20, y: 38, size: 0.4 },
  { x: 61, y: 63, size: 0.4 },
];

// ── Tiny dust dots — clustered near edges & stars
const tinyDots: { x: number; y: number; r: number; op: number }[] = [
  // Along red edge 1: (15,12) → (35,50)
  { x: 17.4, y: 17.6, r: 0.35, op: 0.30 }, { x: 19.5, y: 22.2, r: 0.22, op: 0.22 },
  { x: 21.8, y: 27.5, r: 0.30, op: 0.28 }, { x: 24.2, y: 33.1, r: 0.18, op: 0.20 },
  { x: 26.5, y: 38.0, r: 0.32, op: 0.28 }, { x: 29.0, y: 43.5, r: 0.22, op: 0.24 },
  { x: 31.8, y: 47.2, r: 0.18, op: 0.20 }, { x: 16.5, y: 20.0, r: 0.15, op: 0.18 },
  { x: 23.0, y: 30.5, r: 0.15, op: 0.16 }, { x: 33.0, y: 49.0, r: 0.15, op: 0.16 },
  // Near edge 1 — slight offset
  { x: 18.8, y: 16.0, r: 0.20, op: 0.18 }, { x: 22.5, y: 26.0, r: 0.18, op: 0.16 },
  { x: 27.8, y: 37.5, r: 0.20, op: 0.18 }, { x: 30.5, y: 44.8, r: 0.16, op: 0.15 },

  // Along red edge 2: (35,50) → (68,18)
  { x: 39.0, y: 45.2, r: 0.30, op: 0.28 }, { x: 43.5, y: 40.8, r: 0.22, op: 0.22 },
  { x: 47.5, y: 36.5, r: 0.32, op: 0.28 }, { x: 51.8, y: 32.0, r: 0.18, op: 0.20 },
  { x: 56.0, y: 27.8, r: 0.28, op: 0.26 }, { x: 60.5, y: 23.5, r: 0.22, op: 0.22 },
  { x: 64.8, y: 20.0, r: 0.18, op: 0.18 }, { x: 41.2, y: 43.5, r: 0.15, op: 0.16 },
  { x: 49.5, y: 35.0, r: 0.15, op: 0.15 }, { x: 58.0, y: 26.5, r: 0.15, op: 0.15 },
  // Near edge 2 — slight offset
  { x: 37.5, y: 47.0, r: 0.20, op: 0.18 }, { x: 45.0, y: 38.5, r: 0.18, op: 0.16 },
  { x: 53.5, y: 30.5, r: 0.20, op: 0.18 }, { x: 62.8, y: 21.5, r: 0.16, op: 0.15 },

  // Along red edge 3: (68,18) → (82,54)
  { x: 70.1, y: 23.4, r: 0.30, op: 0.28 }, { x: 72.3, y: 29.0, r: 0.22, op: 0.22 },
  { x: 74.2, y: 34.5, r: 0.32, op: 0.28 }, { x: 76.5, y: 40.2, r: 0.18, op: 0.20 },
  { x: 78.8, y: 46.0, r: 0.28, op: 0.26 }, { x: 80.5, y: 50.5, r: 0.22, op: 0.22 },
  { x: 71.0, y: 26.0, r: 0.15, op: 0.16 }, { x: 75.5, y: 37.5, r: 0.15, op: 0.15 },
  { x: 79.5, y: 48.0, r: 0.15, op: 0.15 },
  // Near edge 3 — slight offset
  { x: 69.5, y: 25.5, r: 0.18, op: 0.16 }, { x: 73.5, y: 32.0, r: 0.20, op: 0.18 },
  { x: 77.8, y: 43.5, r: 0.18, op: 0.16 }, { x: 81.5, y: 52.0, r: 0.16, op: 0.15 },

  // Near secondary edges clusters
  { x: 18.0, y: 14.5, r: 0.22, op: 0.22 }, { x: 12.0, y: 16.5, r: 0.18, op: 0.18 },
  { x: 30.0, y: 8.5,  r: 0.20, op: 0.20 }, { x: 22.0, y: 6.5,  r: 0.16, op: 0.16 },
  { x: 37.0, y: 32.0, r: 0.22, op: 0.22 }, { x: 40.5, y: 57.5, r: 0.20, op: 0.20 },
  { x: 25.5, y: 43.0, r: 0.18, op: 0.18 }, { x: 16.5, y: 49.0, r: 0.22, op: 0.20 },
  { x: 32.0, y: 63.0, r: 0.20, op: 0.18 }, { x: 39.5, y: 68.0, r: 0.15, op: 0.15 },
  { x: 50.5, y: 43.0, r: 0.22, op: 0.22 }, { x: 56.5, y: 39.5, r: 0.18, op: 0.18 },
  { x: 58.0, y: 52.0, r: 0.20, op: 0.20 }, { x: 64.5, y: 58.5, r: 0.18, op: 0.18 },
  { x: 86.0, y: 33.0, r: 0.22, op: 0.22 }, { x: 90.5, y: 40.0, r: 0.18, op: 0.18 },
  { x: 88.5, y: 57.5, r: 0.20, op: 0.20 }, { x: 93.5, y: 53.0, r: 0.18, op: 0.18 },
  { x: 76.0, y: 58.0, r: 0.22, op: 0.20 }, { x: 70.5, y: 60.0, r: 0.18, op: 0.18 },

  // Near deco stars — halo effect
  { x: 27.5, y: 23.8, r: 0.28, op: 0.28 }, { x: 24.8, y: 26.2, r: 0.18, op: 0.20 }, { x: 28.5, y: 27.5, r: 0.20, op: 0.18 },
  { x: 47.2, y: 6.5,  r: 0.22, op: 0.26 }, { x: 44.8, y: 9.5,  r: 0.16, op: 0.20 }, { x: 48.5, y: 10.5, r: 0.18, op: 0.18 },
  { x: 54.5, y: 30.8, r: 0.28, op: 0.26 }, { x: 51.8, y: 33.5, r: 0.18, op: 0.18 }, { x: 55.5, y: 34.0, r: 0.20, op: 0.18 },
  { x: 73.5, y: 5.5,  r: 0.22, op: 0.26 }, { x: 70.8, y: 8.8,  r: 0.16, op: 0.18 }, { x: 74.5, y: 9.5,  r: 0.18, op: 0.16 },
  { x: 89.5, y: 24.5, r: 0.26, op: 0.26 }, { x: 86.8, y: 27.8, r: 0.18, op: 0.20 }, { x: 90.5, y: 28.5, r: 0.18, op: 0.16 },
  { x: 94.2, y: 11.5, r: 0.20, op: 0.22 }, { x: 91.5, y: 14.8, r: 0.15, op: 0.18 }, { x: 95.0, y: 15.5, r: 0.15, op: 0.16 },
  { x: 14.2, y: 45.5, r: 0.24, op: 0.24 }, { x: 11.5, y: 48.8, r: 0.16, op: 0.18 }, { x: 15.5, y: 49.5, r: 0.18, op: 0.16 },
  { x: 44.5, y: 61.5, r: 0.26, op: 0.24 }, { x: 41.8, y: 64.8, r: 0.16, op: 0.18 }, { x: 45.5, y: 65.5, r: 0.18, op: 0.16 },
  { x: 5.5,  y: 30.8, r: 0.22, op: 0.22 }, { x: 7.5,  y: 35.5, r: 0.16, op: 0.18 }, { x: 4.5,  y: 34.5, r: 0.15, op: 0.16 },
  { x: 97.5, y: 41.5, r: 0.22, op: 0.22 }, { x: 94.8, y: 44.8, r: 0.16, op: 0.18 }, { x: 98.5, y: 45.5, r: 0.15, op: 0.15 },
  { x: 60.5, y: 47.5, r: 0.24, op: 0.22 }, { x: 57.8, y: 50.8, r: 0.16, op: 0.18 }, { x: 62.5, y: 51.0, r: 0.18, op: 0.16 },
  { x: 9.5,  y: 18.5, r: 0.22, op: 0.22 }, { x: 6.8,  y: 21.8, r: 0.15, op: 0.18 }, { x: 10.5, y: 22.5, r: 0.15, op: 0.16 },
  { x: 79.5, y: 35.5, r: 0.24, op: 0.22 }, { x: 76.8, y: 38.8, r: 0.16, op: 0.18 }, { x: 81.0, y: 39.5, r: 0.18, op: 0.16 },
  { x: 48.5, y: 19.5, r: 0.22, op: 0.22 }, { x: 45.8, y: 22.8, r: 0.15, op: 0.18 }, { x: 50.0, y: 23.5, r: 0.15, op: 0.16 },
  { x: 29.5, y: 55.5, r: 0.24, op: 0.22 }, { x: 26.8, y: 58.8, r: 0.15, op: 0.18 }, { x: 31.5, y: 59.0, r: 0.16, op: 0.16 },
  { x: 62.5, y: 61.5, r: 0.24, op: 0.22 }, { x: 59.8, y: 64.8, r: 0.15, op: 0.18 }, { x: 64.0, y: 65.5, r: 0.16, op: 0.16 },
  { x: 21.5, y: 36.5, r: 0.20, op: 0.20 }, { x: 18.8, y: 39.8, r: 0.15, op: 0.16 }, { x: 23.0, y: 40.5, r: 0.15, op: 0.15 },
  { x: 95.5, y: 59.5, r: 0.22, op: 0.20 }, { x: 92.8, y: 62.8, r: 0.15, op: 0.16 }, { x: 97.0, y: 63.0, r: 0.15, op: 0.15 },

  // Background scatter — everywhere
  { x: 10,  y: 5,   r: 0.28, op: 0.18 }, { x: 22,  y: 3,   r: 0.22, op: 0.16 }, { x: 38,  y: 7,   r: 0.25, op: 0.18 },
  { x: 55,  y: 5,   r: 0.20, op: 0.16 }, { x: 63,  y: 10,  r: 0.25, op: 0.18 }, { x: 85,  y: 8,   r: 0.25, op: 0.18 },
  { x: 3,   y: 15,  r: 0.22, op: 0.18 }, { x: 11,  y: 28,  r: 0.20, op: 0.16 }, { x: 3,   y: 42,  r: 0.22, op: 0.18 },
  { x: 8,   y: 62,  r: 0.20, op: 0.16 }, { x: 18,  y: 65,  r: 0.22, op: 0.18 }, { x: 35,  y: 67,  r: 0.20, op: 0.16 },
  { x: 50,  y: 65,  r: 0.22, op: 0.18 }, { x: 75,  y: 62,  r: 0.22, op: 0.18 }, { x: 88,  y: 65,  r: 0.20, op: 0.16 },
  { x: 97,  y: 55,  r: 0.22, op: 0.18 }, { x: 97,  y: 30,  r: 0.20, op: 0.16 }, { x: 33,  y: 15,  r: 0.20, op: 0.16 },
  { x: 55,  y: 15,  r: 0.22, op: 0.18 }, { x: 42,  y: 28,  r: 0.20, op: 0.16 }, { x: 72,  y: 28,  r: 0.20, op: 0.16 },
  { x: 18,  y: 55,  r: 0.20, op: 0.16 }, { x: 50,  y: 55,  r: 0.22, op: 0.18 }, { x: 32,  y: 35,  r: 0.18, op: 0.15 },
  { x: 45,  y: 48,  r: 0.20, op: 0.16 }, { x: 62,  y: 35,  r: 0.18, op: 0.15 }, { x: 40,  y: 22,  r: 0.18, op: 0.15 },
  { x: 78,  y: 15,  r: 0.18, op: 0.15 }, { x: 90,  y: 50,  r: 0.18, op: 0.15 }, { x: 12,  y: 60,  r: 0.18, op: 0.15 },
  { x: 5,   y: 8,   r: 0.18, op: 0.15 }, { x: 98,  y: 12,  r: 0.16, op: 0.14 }, { x: 55,  y: 60,  r: 0.18, op: 0.15 },
  { x: 68,  y: 45,  r: 0.20, op: 0.16 }, { x: 25,  y: 18,  r: 0.18, op: 0.15 }, { x: 82,  y: 22,  r: 0.18, op: 0.15 },
  { x: 15,  y: 32,  r: 0.16, op: 0.14 }, { x: 48,  y: 8,   r: 0.16, op: 0.14 }, { x: 92,  y: 35,  r: 0.16, op: 0.14 },
  { x: 38,  y: 58,  r: 0.16, op: 0.14 }, { x: 72,  y: 52,  r: 0.16, op: 0.14 }, { x: 28,  y: 48,  r: 0.16, op: 0.14 },
];

const redEdges: [number, number, number, number][] = [
  [15, 12, 35, 50], [35, 50, 68, 18], [68, 18, 82, 54],
];

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

const universesFr = {
  data:      { title: "Data",      projects: [
    { number: "01 / 02", title: "Mamba Mentality", subtitle: "Analyse de la carrière de Kobe Bryant",
      description: "Dashboard Power BI explorant 20 ans de statistiques NBA. Performances par saison, adversaire, situation de jeu — les chiffres d'une mentalité hors du commun.",
      tags: ["Power BI", "DAX", "Data Analysis"], link: null, linkLabel: null },
    { number: "02 / 02", title: "Python Works", subtitle: "100+ exercices & mini-projets",
      description: "Listes, tuples, pandas, numpy, automatisation. Pendule, gestionnaire de sneakers, puzzles pandas. La data, apprise par la pratique quotidienne.",
      tags: ["Python", "Pandas", "NumPy"], link: "https://github.com/TexasThug/Python_works", linkLabel: "GitHub →" },
  ]},
  ia:        { title: "IA",        projects: [
    { number: "01 / 01", title: "Three-Man-Shaker", subtitle: "Jeu de dés multijoueur",
      description: "Application web du jeu Three-Man. Gestion des tours, règles dynamiques, interface pensée pour être jouée en groupe. Projet personnel construit pour s'amuser — et apprendre.",
      tags: ["React", "TypeScript", "Tailwind CSS"], link: "https://github.com/TexasThug/three-man-shaker", linkLabel: "GitHub →" },
  ]},
  strategie: { title: "Stratégie", projects: [
    { number: "01 / 01", title: "Analyse Produits", subtitle: "Performance par catégorie",
      description: "Fichier Excel structuré pour identifier les catégories de produits les plus performantes. Tableaux croisés dynamiques, visualisations, synthèse orientée décision métier.",
      tags: ["Excel", "Analyse de données", "Business Intelligence"], link: null, linkLabel: null },
  ]},
  about:     { title: "Moi",       projects: [] },
};

const universesEn = {
  data:      { title: "Data",     projects: [
    { number: "01 / 02", title: "Mamba Mentality", subtitle: "Kobe Bryant career analysis",
      description: "Power BI dashboard exploring 20 years of NBA statistics. Performance by season, opponent and game situation — the numbers behind an extraordinary mentality.",
      tags: ["Power BI", "DAX", "Data Analysis"], link: null, linkLabel: null },
    { number: "02 / 02", title: "Python Works", subtitle: "100+ exercises & mini-projects",
      description: "Lists, tuples, pandas, numpy, automation. Pendulum, sneaker manager, pandas puzzles. Data learned through daily practice.",
      tags: ["Python", "Pandas", "NumPy"], link: "https://github.com/TexasThug/Python_works", linkLabel: "GitHub →" },
  ]},
  ia:        { title: "AI",       projects: [
    { number: "01 / 01", title: "Three-Man-Shaker", subtitle: "Multiplayer dice game",
      description: "Web app for the Three-Man dice game. Turn management, dynamic rules, interface designed to be played in groups. Personal project built for fun — and learning.",
      tags: ["React", "TypeScript", "Tailwind CSS"], link: "https://github.com/TexasThug/three-man-shaker", linkLabel: "GitHub →" },
  ]},
  strategie: { title: "Strategy", projects: [
    { number: "01 / 01", title: "Product Analysis", subtitle: "Performance by category",
      description: "Structured Excel file to identify top-performing product categories. Pivot tables, visualizations and business decision-oriented summary.",
      tags: ["Excel", "Data Analysis", "Business Intelligence"], link: null, linkLabel: null },
  ]},
  about:     { title: "Me",       projects: [] },
};

export default function ConstellationHub() {
  const { lang } = useLanguage();
  const sectionRef        = useRef<HTMLElement>(null);
  const svgRef            = useRef<SVGSVGElement>(null);
  const overlayRef        = useRef<HTMLDivElement>(null);
  const universeRef       = useRef<HTMLDivElement>(null);
  const constellRef       = useRef<HTMLDivElement>(null);
  const secondaryEdgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const redEdgeRefs       = useRef<(SVGLineElement | null)[]>([]);

  const [activeNode,      setActiveNode]      = useState<NodeId | null>(null);
  const [projectIndex,    setProjectIndex]    = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredNode,     setHoveredNode]     = useState<NodeId | null>(null);
  const [ripple,          setRipple]          = useState<{ x: number; y: number; key: number } | null>(null);

  const universes = lang === "fr" ? universesFr : universesEn;

  // Node labels per lang
  const nodeLabels: Record<NodeId, string> = lang === "fr"
    ? { about: "À propos", data: "Data", ia: "IA", strategie: "Cas Business" }
    : { about: "About",    data: "Data", ia: "AI", strategie: "Business Cases" };

  const mainNodes = staticNodes.map(n => ({ ...n, label: nodeLabels[n.id] }));

  const ui = lang === "fr"
    ? { explore: "Explore l'univers", click: "Cliquer pour explorer", back: "← Constellation", prev: "← prev", next: "next →" }
    : { explore: "Explore the universe", click: "Click to explore",   back: "← Constellation", prev: "← prev", next: "next →" };

  // Illumine les traits connectés au nœud survolé
  useEffect(() => {
    secondaryEdgeRefs.current.forEach(el => {
      if (el) gsap.to(el, { opacity: 0.18, duration: 0.35 });
    });
    redEdgeRefs.current.forEach(el => {
      if (el) gsap.to(el, { opacity: 0.80, strokeWidth: 0.18, duration: 0.35 });
    });

    if (!hoveredNode) return;
    const node = staticNodes.find(n => n.id === hoveredNode);
    if (!node) return;

    secondaryEdges.forEach((edge, i) => {
      const connected = (edge[0] === node.x && edge[1] === node.y) ||
                        (edge[2] === node.x && edge[3] === node.y);
      if (connected && secondaryEdgeRefs.current[i]) {
        gsap.to(secondaryEdgeRefs.current[i], { opacity: 0.7, duration: 0.25 });
      }
    });
    redEdges.forEach((edge, i) => {
      const connected = (edge[0] === node.x && edge[1] === node.y) ||
                        (edge[2] === node.x && edge[3] === node.y);
      if (connected && redEdgeRefs.current[i]) {
        gsap.to(redEdgeRefs.current[i], { opacity: 1, strokeWidth: 0.30, duration: 0.25 });
      }
    });
  }, [hoveredNode]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(constellRef.current, {
        opacity: 0, duration: 1.6, ease: "power3.out",
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

      // Déclenche l'onde depuis le nœud
      setRipple({ x: node.x, y: node.y, key: Date.now() });

      const rect   = svgEl.getBoundingClientRect();
      const scaleX = rect.width  / 100;
      const scaleY = rect.height / 68;
      const sx     = rect.left + node.x * scaleX;
      const sy     = rect.top  + node.y * scaleY;

      gsap.set(overlayEl, {
        display: "block", position: "fixed",
        left: sx, top: sy, xPercent: -50, yPercent: -50,
        width: 28, height: 28, borderRadius: "50%", scale: 1, opacity: 1, zIndex: 50,
      });

      gsap.to(overlayEl, {
        scale: 220, duration: 0.65, ease: "expo.in",
        onComplete: () => {
          gsap.set(overlayEl, { display: "none" });
          setActiveNode(nodeId);
          setProjectIndex(0);
          setIsTransitioning(false);
        },
      });
    },
    [isTransitioning, mainNodes]
  );

  useEffect(() => {
    if (activeNode && universeRef.current) {
      gsap.fromTo(universeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
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
            gsap.fromTo(rightEl, { x: dir * 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
          },
        });
      }
      if (leftEl) {
        gsap.to(leftEl, {
          opacity: 0, duration: 0.2,
          onComplete: () => { gsap.to(leftEl, { opacity: 1, duration: 0.3, delay: 0.15 }); },
        });
      }
    },
    [activeNode, projectIndex, universes]
  );

  const currentUniverse = activeNode && activeNode !== "about"
    ? universes[activeNode as keyof typeof universes]
    : null;
  const currentProject = currentUniverse?.projects[projectIndex];

  return (
    <section ref={sectionRef} className="relative bg-background">

      <div
        ref={overlayRef}
        style={{
          display: "none",
          background: "radial-gradient(circle at center, rgba(255,220,180,0.95) 0%, rgba(196,30,30,0.7) 18%, rgba(80,10,60,0.85) 40%, rgba(20,5,30,0.97) 65%, #0e0e0e 100%)",
          position: "fixed", zIndex: 50,
        }}
      />

      {/* ── CONSTELLATION ── */}
      {!activeNode && (
        <div ref={constellRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-10">
            {ui.explore}
          </p>

          <svg ref={svgRef} viewBox="0 0 100 68" className="w-full max-w-3xl" style={{ cursor: "crosshair" }}>
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

            {tinyDots.map((d, i) => (
              <circle key={`dot-${i}`} cx={d.x} cy={d.y} r={d.r} fill="#f0ebe2" opacity={d.op} />
            ))}
            {secondaryEdges.map(([x1, y1, x2, y2], i) => (
              <line key={i} ref={el => { secondaryEdgeRefs.current[i] = el; }}
                x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f0ebe2" strokeWidth="0.06" opacity={0.18} />
            ))}
            {redEdges.map(([x1, y1, x2, y2], i) => (
              <line key={i} ref={el => { redEdgeRefs.current[i] = el; }}
                x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c41e1e" strokeWidth="0.18" opacity={0.80} />
            ))}
            {ripple && (
              <Ripple key={ripple.key} x={ripple.x} y={ripple.y} onDone={() => setRipple(null)} />
            )}
            {decoStars.map((s, i) => (
              <Star key={i} x={s.x} y={s.y} size={s.size} opacity={0.35} />
            ))}

            {mainNodes.map((node) => {
              const isHov = hoveredNode === node.id;
              return (
                <g key={node.id} style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node.id)}>
                  <circle cx={node.x} cy={node.y} r={8} fill="transparent" />
                  <GalaxyNode x={node.x} y={node.y} size={node.size} id={node.id} hovered={isHov} />
                  <text
                    x={node.id === "strategie" ? node.x - 2.5 : node.x}
                    y={node.id === "about" ? node.y - node.size * 2.8 - 2 : node.y + node.size * 2.8 + 4}
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
            {ui.click}
          </p>
        </div>
      )}

      {activeNode === "about"    && <SceneMoiCV         onBack={handleBack} />}
      {activeNode === "data"     && <SceneDataHub        onBack={handleBack} />}
      {activeNode === "strategie"&& <SceneCasBusinessHub onBack={handleBack} />}

      {activeNode && activeNode !== "about" && activeNode !== "data" && activeNode !== "strategie" && (
        <div ref={universeRef} className="min-h-screen flex flex-col" style={{ opacity: 0 }}>

          <button onClick={handleBack}
            className="absolute top-8 left-8 md:left-12 z-10 font-mono text-[11px] tracking-widest uppercase text-foreground/40 hover:text-accent transition-colors duration-200">
            {ui.back}
          </button>

          <div className="flex-1 flex flex-col md:flex-row min-h-screen">
            <div id="univ-left-content"
              className="w-full md:w-2/5 flex flex-col justify-center px-8 md:px-16 py-24 md:py-16 gap-6 border-r border-foreground/10">
              <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">{currentUniverse?.title}</p>
              {currentProject && (
                <>
                  <div>
                    <p className="font-mono text-[10px] text-foreground/30 tracking-widest mb-2">{currentProject.number}</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground font-light leading-tight">{currentProject.title}</h2>
                    <p className="font-mono text-xs text-foreground/35 mt-2 tracking-wider">{currentProject.subtitle}</p>
                  </div>
                  <p className="font-sans text-sm text-foreground/55 leading-relaxed">{currentProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] tracking-widest uppercase border border-foreground/15 text-foreground/35 px-2 py-1">{tag}</span>
                    ))}
                  </div>
                  {currentProject.link && (
                    <a href={currentProject.link} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors duration-200 self-start">
                      {currentProject.linkLabel}
                    </a>
                  )}
                </>
              )}
              {currentUniverse && currentUniverse.projects.length > 1 && (
                <div className="flex items-center gap-4 mt-4">
                  <button onClick={() => navigateProject(-1)} disabled={projectIndex === 0}
                    className="font-mono text-xs text-foreground/40 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                    {ui.prev}
                  </button>
                  <span className="font-mono text-[10px] text-foreground/20">{projectIndex + 1} / {currentUniverse.projects.length}</span>
                  <button onClick={() => navigateProject(1)} disabled={projectIndex === currentUniverse.projects.length - 1}
                    className="font-mono text-xs text-foreground/40 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                    {ui.next}
                  </button>
                </div>
              )}
            </div>

            <div id="univ-right" className="w-full md:w-3/5 relative overflow-hidden" style={{ minHeight: "60vh" }}>
              <div className="absolute inset-0 flex items-end"
                style={{ background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 45%, #0e0e0e 100%)" }}>
                <div className="absolute inset-0 opacity-15"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px 150px" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <p className="font-serif text-3xl md:text-5xl text-white font-light opacity-90">{currentProject?.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
