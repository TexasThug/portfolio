"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const fr = {
  line1: "Relier les points,",
  line2: "éclairer les décisions.",
  subtitle: "Chef de projet Data · Business Analyst",
  scroll: "Scroll",
};

const en = {
  line1: "Connecting the dots,",
  line2: "illuminating decisions.",
  subtitle: "Data Project Manager · Business Analyst",
  scroll: "Scroll",
};

export default function SceneHero() {
  const { lang } = useLanguage();
  const t = lang === "fr" ? fr : en;

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      nameRef.current,
      subtitleRef.current,
      scrollRef.current,
    ];

    gsap.set(elements, { opacity: 0, y: 24 });
    gsap.set(redLineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.9 }, 1.1)
      .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.9 }, 1.8)
      .to(
        nameRef.current,
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
        2.8
      )
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 3.6)
      .to(
        redLineRef.current,
        { scaleX: 1, duration: 1.4, ease: "power3.inOut" },
        3.9
      )
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6 }, 4.8);
  }, []);

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden px-8">

      {/* ── Bebas ghost typography ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* JOFFRAY — fantôme derrière le nom */}
        <span style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(100px, 22vw, 320px)",
          letterSpacing: "-0.01em",
          color: "#f0ebe2",
          opacity: 0.045,
          whiteSpace: "nowrap",
          lineHeight: 1,
          userSelect: "none",
        }}>JOFFRAY</span>

        {/* DEALBERTO — décalé en bas à droite */}
        <span style={{
          position: "absolute",
          top: "46%",
          right: "-2%",
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(80px, 17vw, 260px)",
          letterSpacing: "0.01em",
          color: "#c41e1e",
          opacity: 0.055,
          whiteSpace: "nowrap",
          lineHeight: 1,
          userSelect: "none",
        }}>DEALBERTO</span>

        {/* DATA — vertical, côté gauche */}
        <span style={{
          position: "absolute",
          top: "50%",
          left: "-1%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "left center",
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 9vw, 130px)",
          letterSpacing: "0.25em",
          color: "#f0ebe2",
          opacity: 0.05,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>DATA · BUSINESS · CRÉATIVITÉ</span>
      </div>

      {/* Quote */}
      <div className="text-center mb-14 space-y-1">
        <p className="font-serif text-xl md:text-2xl text-foreground/60 italic">
          <span ref={line1Ref} className="block">
            {t.line1}
          </span>
        </p>
        <p className="font-serif text-2xl md:text-3xl text-foreground italic">
          <span ref={line2Ref} className="block">
            {t.line2}
          </span>
        </p>
        <span ref={line3Ref} />
      </div>

      {/* Name */}
      <h1
        ref={nameRef}
        className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-foreground font-light tracking-tight text-center leading-none"
      >
        Joffray{" "}
        <span className="text-accent italic">DeAlberto</span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="font-mono text-xs md:text-sm text-foreground/40 mt-8 tracking-[0.4em] uppercase"
      >
        {t.subtitle}
      </p>

      {/* Red accent line — début du fil rouge */}
      <div
        ref={redLineRef}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 w-24 h-px bg-accent"
      />

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/25"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">
          {t.scroll}
        </span>
        <div className="w-px h-8 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  );
}
