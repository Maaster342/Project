import { useEffect, useState } from "react";

const EMOJIS = ["🎈", "🎂", "✨", "🎉", "🌸", "💖", "🧁", "🎀", "🍰", "⭐"];

type Item = {
  id: number;
  left: number;
  emoji: string;
  duration: number;
  delay: number;
  size: number;
};

export function FloatingEmojis({ count = 22 }: { count?: number }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        duration: 14 + Math.random() * 18,
        delay: Math.random() * 20,
        size: 18 + Math.random() * 28,
      })),
    );
  }, [count]);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute bottom-[-10vh] animate-float-up"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            animationPlayState: paused ? "paused" : "running",
            opacity: 0.55,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
