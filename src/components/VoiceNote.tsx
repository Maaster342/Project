import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const audioAsset = { url: "/voice-note.m4a" };

export function VoiceNote({ onListened }: { onListened?: () => void } = {}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openModal = () => {
    setOpen(true);
    // Kick off playback synchronously in the user-gesture tick to avoid autoplay blocks.
    const a = audioRef.current;
    if (a) {
      try {
        a.currentTime = 0;
        const p = a.play();
        if (p && typeof p.then === "function") {
          p.catch((err) => console.error("[VoiceNote] play failed:", err));
        }
      } catch (err) {
        console.error("[VoiceNote] play threw:", err);
      }
    }
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) {
      console.warn("[VoiceNote] audio ref not ready");
      return;
    }
    if (a.paused) {
      const p = a.play();
      if (p && typeof p.then === "function") {
        p.catch((err) => console.error("[VoiceNote] play failed:", err));
      }
    } else {
      a.pause();
    }
  };

  const close = () => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    setPlaying(false);
    setProgress(0);
    setOpen(false);
    if (window.__bgMusicSetVolume) window.__bgMusicSetVolume(25);
    onListened?.();
  };

  useEffect(() => {
    return () => {
      if (window.__bgMusicSetVolume) window.__bgMusicSetVolume(25);
    };
  }, []);

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
  };

  return (
    <>
      <button
        onClick={openModal}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl border-2 border-pink/30 p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
        style={{ background: "linear-gradient(120deg, #fff, var(--pink-soft) 60%, var(--lavender))" }}
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl animate-gentle-bounce shadow-md"
          style={{ background: "linear-gradient(135deg, var(--pink), var(--lavender))" }}
        >
          🎙️
        </div>
        <div className="flex-1">
          <div className="font-display text-lg font-semibold">Voice Note Corner</div>
          <div className="font-hand text-xl text-muted-foreground">
            tap to hear a little audio from me &lt;33
          </div>
        </div>
        <span className="rounded-full bg-pink px-4 py-2 text-sm font-semibold text-white shadow transition group-hover:scale-105">
          ▶ listen
        </span>
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 animate-soft-fade-in">
          <div
            className="relative w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-pop-in"
            style={{ background: "linear-gradient(160deg, #fff, var(--pink-soft))" }}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white text-lg shadow hover:scale-110"
              aria-label="close"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-5">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full text-5xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg, var(--pink), var(--lavender))",
                  animation: playing ? "gentle-bounce 1.4s ease-in-out infinite" : undefined,
                }}
              >
                🎙️
              </div>
              <h3 className="font-display text-2xl font-bold">A voice note for you</h3>
              <p className="font-hand text-xl text-muted-foreground">
                {playing ? "playing softly…" : "press play below"}
              </p>

              <div className="flex h-16 w-full items-end justify-center gap-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-pink"
                    style={{
                      height: `${14 + Math.abs(Math.sin((i + progress / 2) * 0.6)) * (playing ? 46 : 14)}px`,
                      transition: "height 0.18s",
                      opacity: playing ? 0.9 : 0.35,
                    }}
                  />
                ))}
              </div>

              <div
                className="h-2 w-full cursor-pointer overflow-hidden rounded-full bg-pink-soft"
                onClick={seek}
              >
                <div
                  className="h-full rounded-full bg-pink transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex w-full items-center justify-between font-hand text-lg text-muted-foreground">
                <span>{fmt(current)}</span>
                <span>{fmt(duration)}</span>
              </div>

              <div className="mt-1 flex items-center gap-3">
                <button
                  onClick={toggle}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-pink text-2xl text-white shadow-lg transition hover:scale-110"
                  aria-label={playing ? "pause" : "play"}
                >
                  {playing ? "⏸" : "▶"}
                </button>
                <button
                  onClick={() => {
                    const a = audioRef.current;
                    if (a) {
                      a.pause();
                      a.currentTime = 0;
                    }
                    setPlaying(false);
                    setProgress(0);
                    setCurrent(0);
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-pink bg-white text-xl text-[color:var(--pink)] shadow-lg transition hover:scale-110"
                  aria-label="stop"
                >
                  ⏹
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* Audio element lives outside the modal so it's always mounted and
          play() can be called synchronously in the openModal gesture. */}
      <audio
        ref={audioRef}
        src={audioAsset.url}
        preload="auto"
        className="hidden"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => {
          setPlaying(true);
          if (window.__bgMusicSetVolume) window.__bgMusicSetVolume(6);
        }}
        onPause={() => {
          setPlaying(false);
          if (window.__bgMusicSetVolume) window.__bgMusicSetVolume(25);
        }}
        onEnded={() => {
          setPlaying(false);
          if (window.__bgMusicSetVolume) window.__bgMusicSetVolume(25);
          onListened?.();
        }}
        onError={(e) => console.error("[VoiceNote] audio error", e.currentTarget.error, "src=", audioAsset.url)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget;
          setCurrent(t.currentTime);
          if (t.duration) setProgress((t.currentTime / t.duration) * 100);
        }}
      />
    </>
  );
}
