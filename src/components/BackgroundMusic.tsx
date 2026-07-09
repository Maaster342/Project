import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    __bgMusicSetVolume?: (v: number) => void;
  }
}

const VIDEO_ID = "u2xW23u4qEY";
const BASE_VOLUME = 25;

export function BackgroundMusic() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = () => {
      if (!window.YT || !window.YT.Player || !mountRef.current || playerRef.current) return;
      playerRef.current = new window.YT.Player(mountRef.current, {
        height: "220",
        width: "220",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          origin: window.location.origin,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(BASE_VOLUME);
            readyRef.current = true;
            setReady(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      init();
    } else {
      const existing = document.getElementById("yt-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = init;
    }

    window.__bgMusicSetVolume = (v: number) => {
      if (playerRef.current?.setVolume) playerRef.current.setVolume(v);
    };

    return () => {
      readyRef.current = false;
      window.__bgMusicSetVolume = undefined;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, []);

  // Try autoplay when ready; if browser blocks it, start on first user interaction.
  useEffect(() => {
    if (!ready) return;
    const player = playerRef.current;
    if (!player) return;

    const tryPlay = () => {
      try {
        player.unMute?.();
        player.setVolume(BASE_VOLUME);
        player.playVideo();
      } catch {}
    };

    // Attempt immediate autoplay (likely blocked by browser policy)
    tryPlay();

    const onInteract = () => {
      tryPlay();
    };
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, onInteract, { once: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, [ready]);

  const toggle = () => {
    const player = playerRef.current;
    if (!player || !readyRef.current) return;
    if (playing) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.unMute?.();
      player.setVolume(BASE_VOLUME);
      player.playVideo();
      setPlaying(true);
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: -9999,
          top: -9999,
          width: 220,
          height: 220,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <div ref={mountRef} />
      </div>
      <button
        onClick={toggle}
        disabled={!ready}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border-2 border-pink bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-lg transition hover:scale-105 disabled:opacity-60"
        aria-label={playing ? "pause music" : "play music"}
      >
        <span>{playing ? "⏸️" : "▶️"}</span>
        <span>{playing ? "pause music" : "play music"}</span>
      </button>
    </>
  );
}
