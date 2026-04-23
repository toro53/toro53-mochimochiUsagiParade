import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-8 bg-bg-dark border-t border-border text-center">
      <Link
        href="/"
        className="font-[family-name:var(--font-fell)] text-sm tracking-[0.12em] text-fg-muted mb-2.5 no-underline hover:text-fg transition-colors inline-block"
      >
        Mochimochi Usagi Parade
      </Link>
      <p className="text-[0.6rem] tracking-[0.15em] text-border mt-2.5">
        © 2024 もちもちうさぎパレード. All Rights Reserved.
      </p>
    </footer>
  );
}
