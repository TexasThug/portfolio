"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SceneHero() {
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
      {/* Quote */}
      <div className="text-center mb-14 space-y-1">
        <p className="font-serif text-xl md:text-2xl text-foreground/60 italic">
          <span ref={line1Ref} className="block">
            Les données racontent des histoires.
          </span>
        </p>
        <p className="font-serif text-xl md:text-2xl text-foreground/60 italic">
          <span ref={line2Ref} className="block">
            Je suis là
          </span>
        </p>
        <p className="font-serif text-2xl md:text-3xl text-foreground italic">
          <span ref={line3Ref} className="block">
            pour les lire.
          </span>
        </p>
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
        Chef de projet Data · Business Analyst
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
          Scroll
        </span>
        <div className="w-px h-8 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  );
}
