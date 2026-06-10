import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
  color?: string;
}

export function Particles({ count = 40, className = "", color = "oklch(1 0 0 / 0.85)" }: ParticlesProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        dx: (Math.random() - 0.5) * 200 + "px",
        dy: -(50 + Math.random() * 220) + "px",
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 7,
      })),
    [count],
  );
  return (
    <div className={"pointer-events-none absolute inset-0 overflow-hidden " + className}>
      {items.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.left + "%",
            top: p.top + "%",
            width: p.size,
            height: p.size,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 ${p.size * 4}px ${color}`,
            ["--dx" as string]: p.dx,
            ["--dy" as string]: p.dy,
            animation: `sparkle-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
