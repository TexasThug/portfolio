"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-8 right-24 z-50 font-mono text-[11px] tracking-widest uppercase flex items-center gap-1.5 select-none"
      aria-label="Toggle language"
    >
      <span style={{ color: lang === "fr" ? "#c41e1e" : "rgba(240,237,232,0.30)" }}>
        FR
      </span>
      <span style={{ color: "rgba(240,237,232,0.20)" }}>·</span>
      <span style={{ color: lang === "en" ? "#c41e1e" : "rgba(240,237,232,0.30)" }}>
        EN
      </span>
    </button>
  );
}
