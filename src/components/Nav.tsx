"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#news", label: "NEWS" },
  { href: "#live", label: "LIVE" },
  { href: "#discography", label: "WORKS" },
  { href: "#about", label: "ABOUT" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-6 py-[0.7rem] transition-[background,backdrop-filter,border-color] duration-400 ${
        scrolled
          ? "bg-nav backdrop-blur-[8px] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[960px] mx-auto flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[0.45rem]">
        <a
          href="#hero"
          className="font-[family-name:var(--font-klee)] text-[clamp(0.8rem,2.5vw,1.05rem)] tracking-[0.08em] text-fg no-underline opacity-90 whitespace-nowrap"
        >
          もちもちうさぎパレード
        </a>

        <nav className="flex gap-[clamp(1.2rem,3vw,2rem)] flex-shrink-0">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.65rem] tracking-[0.22em] text-fg-muted no-underline transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
