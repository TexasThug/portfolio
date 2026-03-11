"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: "Email",
    value: "joffray.dealberto@gmail.com",
    href: "mailto:joffray.dealberto@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "joffray-dealberto",
    href: "https://www.linkedin.com/in/joffray-dealberto-9b0b421b7/",
  },
  {
    label: "GitHub",
    value: "TexasThug",
    href: "https://github.com/TexasThug",
  },
];

export default function SceneContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      linksRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-20 py-24"
    >
      {/* Fil rouge — ligne verticale à gauche */}
      <div className="hidden md:block absolute left-10 top-0 bottom-0 w-px bg-accent/20" />
      <div className="hidden md:block absolute left-10 top-0 w-px h-2/3 bg-accent" />

      <div className="max-w-2xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4">
            03 — Contact
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground font-light leading-tight">
            On se parle ?
          </h2>
          <p className="font-sans text-base text-foreground/50 mt-6 leading-relaxed max-w-md">
            Ouvert aux opportunités en alternance ou stage — chef de projet
            Data, Business Analyst. Toujours partant pour une bonne
            conversation aussi.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6">
          {links.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-baseline gap-6 border-b border-foreground/10 pb-6 hover:border-accent/40 transition-colors duration-300"
            >
              <span className="font-mono text-[10px] text-foreground/30 tracking-widest uppercase w-20 flex-shrink-0">
                {link.label}
              </span>
              <span className="font-serif text-xl md:text-2xl text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {link.value}
              </span>
              <span className="ml-auto font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-8 left-8 md:left-20 right-8 flex justify-between items-center"
      >
        <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
          Joffray DeAlberto — {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
          Chef de projet Data
        </span>
      </div>
    </section>
  );
}
