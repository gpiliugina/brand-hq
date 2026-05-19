type HighlightProps = {
  children: React.ReactNode;
};

export function Highlight({ children }: HighlightProps) {
  return (
    <span
      style={{
        WebkitTextStroke: "var(--stroke-accent) var(--color-accent)",
        paintOrder: "stroke fill",
        WebkitTextStrokeLinejoin: "round",
        display: "inline",
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
