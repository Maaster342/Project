import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FloatingEmojis } from "../components/FloatingEmojis";
import { RandomHearts } from "../components/RandomHearts";
import { VoiceNote } from "../components/VoiceNote";
import { Gashapon } from "../components/Gashapon";
import { FavoritesTeaser } from "../components/FavoritesTeaser";
import { Reveal } from "../components/Reveal";
import mimoImg from "../assets/mimo.jpg";
import s1 from "../assets/screenshot_1.png";
import s2 from "../assets/screenshot_2.png";
import s3 from "../assets/screenshot_3.png";
import s4 from "../assets/screenshot_4.png";
import s5 from "../assets/screenshot_5.png";
import s6 from "../assets/screenshot_6.png";
import s7 from "../assets/screenshot_7.png";

const SCREENSHOT_IMAGES = [s1, s2, s3, s4, s5, s6, s7];

export const Route = createFileRoute("/")({
  component: Index,
});

const REMINDS = [
  { emoji: "🌍", text: "even i don't leave so much, every place that i visit i remember you and have the wish to share pictures with you" },
  { emoji: "🎮", text: "all coops games that i play. I always have the wish to play any game with you." },
  { emoji: "📱", text: "a lottt of reels while i'm scrolling (i always send to you hehe)" },
  { emoji: "🎬", text: "the animes and movies that we watched together" },
  { emoji: "🌅", text: "my mornings (i always wake up thinking about you <3)" },
  { emoji: "🌙", text: "my nights too :D, sometimes i fall asleep and wake up again just to send you good nighty" },
];

const SCREENSHOTS = [
  "i think it was one of our first times playend together and it took a lottt of time to us find a good village, but even with it taking a lot of time, i enjoyed each moment looking for that village with you <3",
  "this is the village :D i wanted to take a lot of pictures in the same place to see the progress, but i forgot lol",
  "i really enjoyed play vrchat with you, i still want to test a lotttt of games there!!",
  "you building our house after destroy some times loll",
  "we need to play more question games togetheeeer, i really like to know little details about you <3",
  "i just realize that we haven't any terraria pictureeee, we need to take more!! Terraria is one of my favorite games and playing it with my favorite person make even better :)",
  "i always take pictures of your bongo cat, hehe",
];

const LETTER = `Happy birthdayyyyyyyyyy Meiii, I wanted to give you a lottt of gifs, but unfortunately you are soooo far away :(((

Well, I have created this little website for you. I wrote a lot of things for you, and I thought that showing it here would be better than sending it just on Discord.

How I told you, I believe 20 years is an age with a lot of thoughts, overthinking, worries, well, it is 20 YEARSS, I believe, have a lot of things to think, and it's okay, don't put much pressure on yourself, everything will be fine with time, I'm sure!! And I'll be here for anything that you need :)

I wish you could see yourself through my eyes, to see how amazing you are!! I really admire how dedicated you are. Please, never give up on your dreams!! I am sure you will achieve each one of your dreams and goals and continue being still more amazing!

I also want to thank you. I really like the way you slowly became part of my life and daily routine. Talk with you every day, your good morning/good night texts, pictures, your weekends playing and watching together, even your little updates, i really appreciate every part of this, and I don't want it over. On the contrary, I hope to spend even more time with the incredible person you are :D

I'm so happy that you exist, and I feel really lucky to know you <3`;

function Index() {
  const captions = SCREENSHOTS;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mimoOpen, setMimoOpen] = useState(false);

  // === Gate mechanics ===
  // Chained gates. Each section unlocks only after the user completes the
  // previous one (voice must be *listened* to the end; the rest use a
  // "continue" button after each section is shown). Scroll is never blocked —
  // locked sections are simply hidden from the DOM.
  const [letterOpen, setLetterOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceHeard, setVoiceHeard] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [remindsOpen, setRemindsOpen] = useState(false);
  const [mimoSectionOpen, setMimoSectionOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const memoryRef = useRef<HTMLDivElement>(null);
  const remindsRef = useRef<HTMLDivElement>(null);
  const mimoSectionRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, block: ScrollLogicalPosition = "start") => {
    requestAnimationFrame(() => {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block }), 80);
    });
  };

  const unlockLetter = () => { setLetterOpen(true); scrollTo(letterRef); };
  const unlockVoice = () => { setVoiceOpen(true); scrollTo(voiceRef, "center"); };
  const unlockFavorites = () => { setFavoritesOpen(true); scrollTo(favoritesRef); };
  const unlockMemory = () => { setMemoryOpen(true); scrollTo(memoryRef); };
  const unlockReminds = () => { setRemindsOpen(true); scrollTo(remindsRef); };
  const unlockMimo = () => { setMimoSectionOpen(true); scrollTo(mimoSectionRef); };
  const unlockGift = () => { setGiftOpen(true); scrollTo(giftRef); };

  // Lightbox: Esc to close, arrows to navigate.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % SCREENSHOT_IMAGES.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + SCREENSHOT_IMAGES.length) % SCREENSHOT_IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    if (!mimoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMimoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mimoOpen]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#ffffff" }}>
      <FloatingEmojis />
      <RandomHearts />

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-14 sm:py-20">
        {/* 1. Hero — always visible */}
        <section className="text-center animate-soft-fade-in">
          <p className="font-hand text-2xl text-[color:var(--pink)] sm:text-3xl">
            for my favorite person…
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight sm:text-7xl">
            Happy Birthdayyy{" "}
            <span className="relative inline-block">
              Meiii
              <svg
                className="absolute -bottom-3 left-0 w-full"
                height="14"
                viewBox="0 0 200 14"
                fill="none"
              >
                <path
                  d="M2 8 Q 50 -2, 100 6 T 198 4"
                  stroke="var(--pink)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            🎉
          </h1>
          <div className="mt-8 flex justify-center gap-6 text-4xl">
            <span className="animate-sparkle">✨</span>
            <span className="animate-gentle-bounce">🎂</span>
            <span className="animate-sparkle" style={{ animationDelay: "0.4s" }}>🎈</span>
          </div>
        </section>

        {/* 2. Letter Gate — button appears first; letter unlocks on click */}
        <section className="mt-16 flex flex-col items-center">
          {!letterOpen && (
            <Reveal>
              <GateButton onClick={unlockLetter} icon="💌" label="Read My Letter" hint="a little something i wrote for you" />
            </Reveal>
          )}

          {letterOpen && (
            <div ref={letterRef} className="w-full">
              <Reveal>
                <div
                  className="relative rounded-[2rem] p-8 sm:p-12 shadow-xl"
                  style={{ background: "var(--cream)", border: "2px solid var(--pink-soft)" }}
                >
                  <span className="absolute -top-4 left-8 rounded-full bg-pink px-4 py-1.5 text-sm font-semibold text-white shadow">
                    a letter for you 💌
                  </span>
                  <div className="whitespace-pre-line font-hand text-2xl leading-relaxed text-foreground sm:text-3xl">
                    {LETTER}
                  </div>
                  <div className="mt-6 text-right font-hand text-3xl text-[color:var(--pink)]">
                    — Adrian
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </section>

        {/* 3. Voice Note Gate — only appears after the letter is unlocked */}
        {letterOpen && (
          <section className="mt-16 flex flex-col items-center">
            {!voiceOpen && (
              <Reveal delay={200}>
                <GateButton onClick={unlockVoice} icon="🎙️" label="Listen to a Voice Note" hint="press play when you're ready" />
              </Reveal>
            )}

            {voiceOpen && (
              <div ref={voiceRef} className="w-full">
                <Reveal>
                  <VoiceNote onListened={() => setVoiceHeard(true)} />
                </Reveal>
                {voiceHeard && !favoritesOpen && (
                  <div className="mt-10 flex justify-center">
                    <Reveal>
                      <GateButton onClick={unlockFavorites} icon="💖" label="See My Favorites" hint="my favorite things about you" />
                    </Reveal>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* 4. Favorites — appears after the voice note is fully listened. */}
        {favoritesOpen && (
          <section ref={favoritesRef} className="mt-16">
            <Reveal>
              <FavoritesTeaser />
            </Reveal>
            {!memoryOpen && (
              <div className="mt-10 flex justify-center">
                <Reveal delay={150}>
                  <GateButton onClick={unlockMemory} icon="📸" label="Take Me Down Memory Lane" hint="our favorite screenshots" />
                </Reveal>
              </div>
            )}
          </section>
        )}

        {/* 5. Memory Lane — staggered screenshots */}
        {memoryOpen && (
          <section ref={memoryRef} className="mt-20">
            <Reveal>
              <h2 className="text-center font-display text-4xl font-bold">
                Memory Lane
              </h2>
              <p className="mt-3 text-center font-hand text-xl text-muted-foreground">
                my favorite screenshots with you
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {captions.map((cap, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setLightbox(i)}
                      className="group aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-pink/30 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                      aria-label={`open screenshot ${i + 1}`}
                    >
                      <img
                        src={SCREENSHOT_IMAGES[i]}
                        alt={`Screenshot ${i + 1}`}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                    <p className="min-h-[90px] rounded-2xl bg-white/90 p-3 font-hand text-lg leading-snug shadow-sm ring-1 ring-pink/20">
                      {cap}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            {!remindsOpen && (
              <div className="mt-10 flex justify-center">
                <Reveal delay={200}>
                  <GateButton onClick={unlockReminds} icon="💭" label="What Reminds Me of You" hint="little everyday things" />
                </Reveal>
              </div>
            )}
          </section>
        )}

        {/* 6. Anchors — things that remind me of you */}
        {remindsOpen && (
          <section ref={remindsRef} className="mt-20">
            <Reveal>
              <h2 className="text-center font-display text-4xl font-bold">
                Things That Remind Me of You
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {REMINDS.map((r, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div
                    className="flex items-start gap-4 rounded-3xl bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: i % 3 === 0
                        ? "linear-gradient(135deg, #fff, var(--pink-soft))"
                        : i % 3 === 1
                        ? "linear-gradient(135deg, #fff, var(--blue-soft))"
                        : "linear-gradient(135deg, #fff, var(--mint))",
                    }}
                  >
                    <div className="text-4xl">{r.emoji}</div>
                    <p className="font-hand text-xl leading-snug">{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {!mimoSectionOpen && (
              <div className="mt-10 flex justify-center">
                <Reveal delay={200}>
                  <GateButton onClick={unlockMimo} icon="🐾" label="Mimo" hint="someone wants to say hi" />
                </Reveal>
              </div>
            )}
          </section>
        )}

        {/* 7. Mimo */}
        {mimoSectionOpen && (
          <section ref={mimoSectionRef} className="mt-20 flex flex-col items-center">
            <Reveal>
              <div
                className="w-full max-w-md rounded-[2rem] p-8 text-center shadow-xl"
                style={{ background: "linear-gradient(160deg, #fff, var(--mint))" }}
              >
                <div className="text-4xl">🐾</div>
                <h3 className="mt-2 font-display text-2xl font-bold">Mimo's Special</h3>
                <button
                  onClick={() => setMimoOpen(true)}
                  className="group mx-auto mt-5 block aspect-square w-64 overflow-hidden rounded-3xl border-4 border-white shadow-lg ring-2 ring-mint transition hover:-translate-y-1 hover:shadow-xl"
                  aria-label="open Mimo's photo"
                >
                  <img src={mimoImg} alt="Mimo the cat" className="h-full w-full object-cover transition group-hover:scale-105" />
                </button>
                <div
                  className="mx-auto mt-6 max-w-xs rounded-2xl px-5 py-4 font-hand text-2xl font-semibold text-foreground shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #fff, var(--pink-soft))",
                    border: "2px dashed var(--pink)",
                  }}
                >
                  🐾 Mimo sent a special happy birthday to you! 🐾
                </div>
              </div>
            </Reveal>
            {!giftOpen && (
              <div className="mt-10">
                <Reveal delay={200}>
                  <GateButton onClick={unlockGift} icon="🎁" label="Open Your Gift" hint="one last surprise" />
                </Reveal>
              </div>
            )}
          </section>
        )}

        {/* 8. Grand Finale — the gift */}
        {giftOpen && (
          <section ref={giftRef} className="mt-20 mb-16">
            <Reveal>
              <h2 className="text-center font-display text-4xl font-bold">A Little Gift For You</h2>
              <p className="mt-3 text-center font-hand text-xl text-muted-foreground">
                you made it to the end — one more surprise 🎁
              </p>
              <div className="mt-10">
                <Gashapon />
              </div>
            </Reveal>
          </section>
        )}

      </main>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 animate-soft-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-pop-in max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow hover:scale-110"
              aria-label="close"
            >
              ✕
            </button>
            <div className="flex-1 overflow-hidden bg-black/5">
              <img
                src={SCREENSHOT_IMAGES[lightbox]}
                alt={`Screenshot ${lightbox + 1}`}
                className="mx-auto max-h-[70dvh] w-auto object-contain"
              />
            </div>
            <div
              className="p-5 font-hand text-xl leading-snug text-foreground sm:p-6 sm:text-2xl"
              style={{ background: "linear-gradient(160deg, #fff, var(--pink-soft))" }}
            >
              {captions[lightbox]}
            </div>
          </div>
        </div>
      )}

      {mimoOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 animate-soft-fade-in"
          onClick={() => setMimoOpen(false)}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-pop-in max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMimoOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow hover:scale-110"
              aria-label="close"
            >
              ✕
            </button>
            <div className="flex-1 overflow-hidden bg-black/5">
              <img src={mimoImg} alt="Mimo the cat" className="mx-auto max-h-[75dvh] w-auto object-contain" />
            </div>
            <div
              className="p-5 text-center font-hand text-2xl font-semibold text-foreground sm:p-6"
              style={{ background: "linear-gradient(160deg, #fff, var(--mint))" }}
            >
              🐾 look how cute — Mimo says happy birthday, Mei! 🐾
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Shared gate button — a soft, deliberate CTA that unlocks the next section. */
function GateButton({
  onClick,
  icon,
  label,
  hint,
}: {
  onClick: () => void;
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 rounded-full px-8 py-4 font-display text-lg font-semibold text-white shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
        style={{
          background: "linear-gradient(120deg, var(--pink), var(--lavender))",
          boxShadow: "0 12px 32px -8px rgba(236,72,153,0.5)",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
        }}
      >
        <span className="text-2xl transition group-hover:scale-125">{icon}</span>
        <span>{label}</span>
        <span className="text-xl opacity-80 transition group-hover:translate-x-1">→</span>
      </button>
      <p className="font-hand text-lg text-muted-foreground">{hint}</p>
    </div>
  );
}
