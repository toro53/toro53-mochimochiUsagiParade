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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "background 0.4s, border-color 0.4s",
        padding: "0.7rem 1.5rem",
      }}
    >
      <style>{`
        .nav-inner {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 640px) {
          .nav-inner {
            flex-direction: column;
            align-items: center;
            gap: 0.45rem;
          }
        }
      `}</style>
      <div className="nav-inner">
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-fell), serif",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            letterSpacing: "0.05em",
            color: "var(--fg)",
            textDecoration: "none",
            opacity: 0.85,
            whiteSpace: "nowrap",
          }}
        >
          もちもちうさぎパレード
        </a>

        <nav style={{ display: "flex", gap: "clamp(1.2rem, 3vw, 2rem)", flexShrink: 0 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: "var(--fg-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--fg-muted)")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
