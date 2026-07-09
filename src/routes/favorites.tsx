import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FloatingEmojis } from "../components/FloatingEmojis";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorite Things About You — for Mei" },
      { name: "description", content: "A list of my favorite things about you, with reasons." },
      { property: "og:title", content: "Favorite Things About You — for Mei" },
      { property: "og:description", content: "A list of my favorite things about you, with reasons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesPage,
});

type Item = { title: string; reason: string };

const ITEMS: Item[] = [
  {
    title: "your nerd personality (games, anime, movies)",
    reason:
      "i really appreciate the fact that we have similar hobbies and taste, i hope we can share even more hobbies together",
  },
  {
    title: "your grow desire",
    reason: "i really admire it, you inspire me <3",
  },
  {
    title: "your blured pictures",
    reason: "has a unique style, i like it :)",
  },
  {
    title: "the way that you care about the things",
    reason: "i feel that i can chat about anything with you, thank you meiii",
  },
  {
    title: "my chats with you",
    reason: "any chat with you, even for a few moments make my day better",
  },
  {
    title: "the reels that you send me every day",
    reason: "i reallyyyyy love to see all of your reels, i take a time of the day just to see it <3",
  },
  { title: "your glasses", reason: "it's soooo cuteeeee" },
  { title: "your voice", reason: "you should send me more audios :)" },
  { title: "your hands", reason: "i still will hold them <3" },
  {
    title: "the way that you care about the future",
    reason:
      "i know sometimes it can be overthinking, but it shows me that you aren't just living in the automatic way, and you care about your life",
  },
  { title: "your creative work", reason: "i think draw, arts, design is something amazinggg" },
  { title: "your cute emojis and gifs", reason: "your emojis are cuteeees" },
  {
    title: "your name",
    reason: "you said that don't like it, but i think it's a beautiful and unique name, i really like your name <3",
  },
  {
    title: "your good nights and good mornings every dayy",
    reason: "it can looks a bit, but it is amazing for me",
  },
  {
    title: "your hability to build amazing houses in every game!",
    reason: "woaa, i'll always trust you to build our houses, and i hope we build a lot of more in different games",
  },
  {
    title: "your emotional support that you give me daily",
    reason: "i really appreciate it meii <3",
  },
  { title: "your eepy side lol", reason: "it's cute hehe" },
  {
    title: "the way that you make me feel completely comfortable with you",
    reason: "how i said, i feel that i can talk about anything with you :)",
  },
  {
    title: "the way that you always truly listen and show interest when i ramble about my projects and daily routine",
    reason: "it's good have someone special who i can share the little things about the day, thank you <3",
  },
  {
    title: "the fact that you always see all of my reels :)",
    reason: "be ready that i'll send you a lottt of reels",
  },
  {
    title: "your bongo cat always with at side from my bongo cat hehe",
    reason: "your bongo cat is sooooo cute, lets click together!!!",
  },
  {
    title: "your draws!!!",
    reason: "i downloaded all of your arts, i'm your biggest fan <3",
  },
];

const TILTS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];
const BGS = [
  "var(--pink-soft)",
  "var(--blue-soft)",
  "var(--lavender)",
  "var(--mint)",
  "var(--cream)",
];

function FavoritesPage() {
  const [active, setActive] = useState<Item | null>(null);

  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#ffffff" }}>
      <FloatingEmojis count={14} />

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-hand text-xl text-[color:var(--pink)] hover:underline"
        >
          ← back to your page
        </Link>

        <header className="mt-8 text-center animate-soft-fade-in">
          <h1 className="font-display text-4xl font-bold sm:text-6xl">Favorite Things About You</h1>
          <p className="mx-auto mt-4 max-w-2xl font-hand text-2xl text-muted-foreground">
            I put a lot of thought and care into making a list of the things I like about you &lt;3
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <button
              key={i}
              onClick={() => setActive(it)}
              className="group rounded-3xl p-6 text-left shadow-md transition hover:-translate-y-1 hover:rotate-0 hover:shadow-xl"
              style={{
                background: BGS[i % BGS.length],
                transform: `rotate(${TILTS[i % TILTS.length]})`,
              }}
            >
              <div className="text-2xl">💗</div>
              <div className="mt-2 font-display text-lg font-semibold leading-snug">
                {it.title}
              </div>
              <div className="mt-3 font-hand text-lg text-muted-foreground">
                tap to read more →
              </div>
            </button>
          ))}
        </div>
      </main>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
            style={{ background: "linear-gradient(160deg, #fff, var(--pink-soft))" }}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white text-lg shadow hover:scale-110"
              aria-label="close"
            >
              ✕
            </button>
            <div className="text-4xl">💗</div>
            <h2 className="mt-3 font-display text-2xl font-bold leading-snug">{active.title}</h2>
            <p className="mt-5 font-hand text-2xl leading-relaxed text-foreground">
              {active.reason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
