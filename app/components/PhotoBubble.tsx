"use client";

type PhotoBubbleProps = {
  src: string;
  alt: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
};

export function PhotoBubble({
  src, alt, size = 60, selected = false, onClick,
}: PhotoBubbleProps) {
  const ringShadow = selected
    ? "0 0 0 3px var(--photo-selected-ring, #E8FE67), 0 8px 32px rgb(0 0 0 / 0.22)"
    : undefined;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
        borderRadius: "var(--radius-pill)",
        background: "var(--photo-loading-bg)",
        boxShadow: ringShadow,
        transition: "var(--photo-transition)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (onClick)
          (e.currentTarget as HTMLDivElement).style.transform =
            `scale(${getComputedStyle(document.documentElement).getPropertyValue("--photo-hover-scale").trim() || "1.06"})`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      }}
      onMouseDown={(e) => {
        if (onClick)
          (e.currentTarget as HTMLDivElement).style.transform =
            `scale(${getComputedStyle(document.documentElement).getPropertyValue("--photo-press-scale").trim() || "0.95"})`;
      }}
      onMouseUp={(e) => {
        if (onClick)
          (e.currentTarget as HTMLDivElement).style.transform =
            `scale(${getComputedStyle(document.documentElement).getPropertyValue("--photo-hover-scale").trim() || "1.06"})`;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />
      {selected && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "var(--photo-badge-offset)",
            right: "var(--photo-badge-offset)",
            width: "var(--photo-badge-size)",
            height: "var(--photo-badge-size)",
            borderRadius: "var(--radius-pill)",
            background: "var(--photo-selected-ring)",
            color: "var(--color-text)",
            fontSize: "var(--font-size-caption)",
            fontWeight: "var(--font-weight-bold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `var(--border-width-badge) solid var(--color-surface)`,
            zIndex: "var(--photo-z-badge)" as React.CSSProperties["zIndex"],
            pointerEvents: "none",
          } as React.CSSProperties}
        >✓</div>
      )}
    </div>
  );
}
