"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const fr = {
  sectionLabel: "01 — À propos",
  heading: "Ingénieur d'affaires reconverti vers la Data.",
  bio1: "Je ne suis pas expert dans un seul domaine — je suis celui qui fait tenir les pièces ensemble. Analyser, comprendre, connecter : c'est ce que je fais naturellement, que ce soit sur un échiquier, dans un roman de Tolstoï ou dans un dashboard Power BI.",
  bio2: "Mon parcours mêle business, data et créativité. Pas malgré ça — grâce à ça.",
  domains: [
    { label: "Data", x: "50%", y: "10%" },
    { label: "IA", x: "80%", y: "30%" },
    { label: "Stratégie", x: "85%", y: "65%" },
    { label: "Visualisation", x: "50%", y: "85%" },
    { label: "Créativité", x: "15%", y: "65%" },
    { label: "Business", x: "10%", y: "30%" },
  ],
};

const en = {
  sectionLabel: "01 — About",
  heading: "Business engineer turned Data professional.",
  bio1: "I'm not an expert in one single field — I'm the one who makes the pieces hold together. Analyzing, understanding, connecting: that's what I do naturally, whether on a chessboard, in a Tolstoy novel, or in a Power BI dashboard.",
  bio2: "My background blends business, data, and creativity. Not in spite of that — because of it.",
  domains: [
    { label: "Data", x: "50%", y: "10%" },
    { label: "AI", x: "80%", y: "30%" },
    { label: "Strategy", x: "85%", y: "65%" },
    { label: "Dataviz", x: "50%", y: "85%" },
    { label: "Creativity", x: "15%", y: "65%" },
    { label: "Business", x: "10%", y: "30%" },
  ],
};

// Simple edges between adjacent nodes
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 3], [1, 4],
];

export default function SceneAbout() {
  const { lang } = useLanguage();
  const t = lang === "fr" ? fr : en;

  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bio lines fade in
      gsap.from(bioRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        },
      });

      // Tags
      gsap.from(tagsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tagsRef.current,
          start: "top 85%",
        },
      });

      // Constellation nodes
      const nodes = constellationRef.current?.querySelectorAll(".node");
      const lines = constellationRef.current?.querySelectorAll(".edge");

      if (lines) {
        gsap.from(lines, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: constellationRef.current,
            start: "top 75%",
          },
        });
      }

      if (nodes) {
        gsap.from(nodes, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: constellationRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background flex flex-col md:flex-row items-center justify-center gap-16 px-8 md:px-20 py-24"
    >
      {/* Fil rouge — ligne verticale à gauche */}
      <div className="hidden md:block absolute left-10 top-0 bottom-0 w-px bg-accent/20" />
      <div className="hidden md:block absolute left-10 top-0 w-px h-1/3 bg-accent" />

      {/* Bio */}
      <div ref={bioRef} className="max-w-md space-y-6">
        <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
          {t.sectionLabel}
        </p>

        <p className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
          {t.heading}
        </p>

        <p className="font-sans text-base text-foreground/60 leading-relaxed">
          {t.bio1}
        </p>

        <p className="font-sans text-base text-foreground/60 leading-relaxed">
          {t.bio2}
        </p>

        {/* School tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 pt-2">
          {["Eugenia Business School", "Albert School", "Mines de Paris"].map(
            (tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase border border-foreground/20 text-foreground/40 px-3 py-1"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Constellation */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0">
        <svg
          ref={constellationRef}
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {/* Edges */}
          {edges.map(([a, b], i) => {
            const nodeA = t.domains[a];
            const nodeB = t.domains[b];
            return (
              <line
                key={i}
                className="edge"
                x1={parseFloat(nodeA.x)}
                y1={parseFloat(nodeA.y)}
                x2={parseFloat(nodeB.x)}
                y2={parseFloat(nodeB.y)}
                stroke="rgba(196,30,30,0.2)"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Nodes */}
          {t.domains.map((d, i) => (
            <g key={i} className="node">
              <circle
                cx={parseFloat(d.x)}
                cy={parseFloat(d.y)}
                r="1.2"
                fill="#c41e1e"
              />
              <text
                x={parseFloat(d.x)}
                y={parseFloat(d.y) + 4.5}
                textAnchor="middle"
                fontSize="4"
                fill="rgba(240,237,232,0.5)"
                fontFamily="var(--font-jetbrains)"
              >
                {d.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
