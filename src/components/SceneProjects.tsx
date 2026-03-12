"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Mamba Mentality",
    subtitle: "Analyse de la carrière de Kobe Bryant",
    description:
      "Dashboard Power BI explorant 20 ans de statistiques NBA. Analyse des performances par saison, adversaire et situation de jeu — pour comprendre ce que les chiffres disent d'une mentalité.",
    tags: ["Power BI", "Data Analysis", "DAX"],
    link: null,
    linkLabel: null,
  },
  {
    number: "02",
    title: "Three-Man-Shaker",
    subtitle: "Jeu de dés multijoueur",
    description:
      "Application web de jeu de dés inspirée du jeu Three-Man. Gestion des tours, règles dynamiques et interface conçue pour être jouée en groupe. Projet personnel construit pour s'amuser — et apprendre.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/TexasThug/three-man-shaker",
    linkLabel: "GitHub",
  },
  {
    number: "03",
    title: "Analyse Produits",
    subtitle: "Performance par catégorie",
    description:
      "Fichier Excel structuré pour identifier les catégories de produits les plus performantes. Tableaux croisés dynamiques, visualisations et synthèse orientée décision métier.",
    tags: ["Excel", "Analyse de données", "Business Intelligence"],
    link: null,
    linkLabel: null,
  },
  {
    number: "04",
    title: "Python Works",
    subtitle: "100+ exercices & mini-projets",
    description:
      "Répertoire de plus d'une centaine d'exercices Python — listes, tuples, pandas, numpy. Pendule, gestionnaire de sneakers, scripts d'automatisation. La pratique au quotidien.",
    tags: ["Python", "Pandas", "NumPy"],
    link: "https://github.com/TexasThug/Python_works",
    linkLabel: "GitHub",
  },
];

export default function SceneProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: i * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background px-8 md:px-20 py-24"
    >
      {/* Fil rouge — ligne verticale à gauche */}
      <div className="hidden md:block absolute left-10 top-0 bottom-0 w-px bg-accent/20" />
      <div className="hidden md:block absolute left-10 top-1/3 w-px h-1/3 bg-accent" />

      {/* Heading */}
      <div ref={headingRef} className="mb-16 max-w-xl">
        <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4">
          02 — Projets
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light leading-tight">
          Ce que j&apos;ai construit.
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
        {projects.map((project, i) => (
          <div
            key={project.number}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative bg-background p-8 md:p-10 flex flex-col gap-4 hover:bg-foreground/[0.03] transition-colors duration-300"
          >
            {/* Number */}
            <span className="font-mono text-[10px] text-accent tracking-widest">
              {project.number}
            </span>

            {/* Title */}
            <div>
              <h3 className="font-serif text-2xl text-foreground font-light leading-snug">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-foreground/30 mt-1 tracking-wider">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-foreground/55 leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-widest uppercase border border-foreground/15 text-foreground/35 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors duration-200 mt-2 self-start"
              >
                → {project.linkLabel}
              </a>
            )}

            {/* Accent line on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
