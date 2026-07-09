import { useEffect, useState } from "react";

const MESSAGES = [
  "Happy Birthday! ❤️",
  "Hiiii <3",
  "Make a wish meiii :D",
  "I miss you",
  "Hiiii cutiee",
  "<33333333",
];

type Heart = { id: number; x: number; y: number };
type Bubble = { id: number; x: number; y: number; text: string };

export function RandomHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const spawn = () => {
      setHearts((h) => {
        if (h.length >= 2) return h;
        const id = Date.now() + Math.random();
        const x = 8 + Math.random() * 84;
        const y = 12 + Math.random() * 70;
        return [...h, { id, x, y }];
      });
    };
    const interval = setInterval(spawn, 18000);
    return () => clearInterval(interval);
  }, []);

  const popHeart = (h: Heart) => {
    setHearts((prev) => prev.filter((x) => x.id !== h.id));
    const bubble: Bubble = {
      id: h.id,
      x: h.x,
      y: h.y,
      text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    };
    setBubbles((b) => [...b, bubble]);
    setTimeout(() => {
      setBubbles((b) => b.filter((x) => x.id !== bubble.id));
    }, 2600);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {hearts.map((h) => (
        <button
          key={h.id}
          onClick={() => popHeart(h)}
          className="pointer-events-auto absolute animate-pop-in text-5xl transition hover:scale-125"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            filter: "drop-shadow(0 0 12px rgba(236,72,153,0.75)) drop-shadow(0 0 24px rgba(236,72,153,0.45))",
            animation: "pop-in 0.5s ease, gentle-bounce 2.2s ease-in-out infinite",
          }}
          aria-label="heart"
        >
          💗
        </button>
      ))}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute animate-fade-out-up rounded-2xl bg-white/90 px-3 py-1.5 text-sm font-semibold text-[color:var(--pink)] shadow-md ring-1 ring-pink/40 font-hand"
          style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -120%)" }}
        >
          {b.text}
        </div>
      ))}
    </div>
  );
}
