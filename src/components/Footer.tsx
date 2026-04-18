export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 2rem",
        background: "var(--bg-dark)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-fell), serif",
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          color: "var(--fg-muted)",
          marginBottom: "0.6rem",
        }}
      >
        Mochimochi Usagi Parade
      </p>
      <p
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          color: "var(--border)",
        }}
      >
        © 2024 もちもちうさぎパレード. All Rights Reserved.
      </p>
    </footer>
  );
}
