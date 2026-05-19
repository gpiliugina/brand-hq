import { Highlight } from "./components/Highlight";
import { PhotoBubble } from "./components/PhotoBubble";

const TEAM_PHOTOS = [
  "https://raw.githubusercontent.com/gpiliugina/team-photo/main/team%20photo%201.webp",
  "https://raw.githubusercontent.com/gpiliugina/team-photo/main/team%20photo%202.webp",
  "https://raw.githubusercontent.com/gpiliugina/team-photo/main/team%20photo%203.webp",
  "https://raw.githubusercontent.com/gpiliugina/team-photo/main/team%20photo%204.webp",
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "var(--space-5xl)",
        gap: "var(--space-4xl)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-family-display)",
          fontSize: "var(--font-size-h1)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--color-text)",
          letterSpacing: "var(--letter-spacing-hero)",
          lineHeight: "var(--line-height-hero)",
          margin: 0,
        }}
      >
        Welcome, <Highlight>gala</Highlight>.
      </h1>

      <div style={{ display: "flex", gap: "var(--space-xl)", alignItems: "center" }}>
        {TEAM_PHOTOS.map((src, i) => (
          <PhotoBubble
            key={src}
            src={src}
            alt={`Team member ${i + 1}`}
            size={92}
            selected={i === 1}
          />
        ))}
      </div>
    </main>
  );
}
