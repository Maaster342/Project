import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section";
  className?: string;
  /** If provided and false, the element stays hidden regardless of viewport. */
  when?: boolean;
};

/**
 * Fades + slides content in the first time it enters the viewport.
 * Uses IntersectionObserver so reveals feel tied to the user's scroll.
 * `when={false}` keeps the element hidden until a "gate" unlocks it.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "", when = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!when) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [when]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: shown && when ? 1 : 0,
        transform: shown && when ? "translateY(0) scale(1)" : "translateY(28px) scale(0.985)",
        transition: `opacity 0.9s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.9s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
