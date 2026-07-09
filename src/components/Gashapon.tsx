import { useState } from "react";

export function Gashapon() {
  const [opened, setOpened] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const press = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setOpened(true);
    }, 1400);
  };

  if (opened) {
    return (
      <div className="flex justify-center">
        <div
          className="w-full max-w-sm animate-pop-in rounded-3xl p-6 shadow-xl ring-2 ring-pink/40"
          style={{ background: "linear-gradient(160deg, #fff, var(--cream))" }}
        >
          <div className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[color:var(--pink)]">
            🎟️ Special Voucher
          </div>
          <div className="mb-2 border-y-2 border-dashed border-pink/50 py-3 text-center font-display text-xl font-bold">
            ALL-NIGHT GAMING VOUCHER
          </div>
          <div className="text-center font-hand text-xl text-muted-foreground">
            Valid for unlimited co-op and zero sleep!!! :)
          </div>
          <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-center font-hand text-lg text-foreground ring-1 ring-pink/30">
            p.s. check your Steam account 👀🎮
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex flex-col items-center">
        <div
          className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-white shadow-xl"
          style={{ background: "linear-gradient(160deg, var(--pink-soft), var(--lavender))" }}
        >
          <div className={`text-6xl ${spinning ? "animate-spin-slow" : "animate-gentle-bounce"}`}>
            🎁
          </div>
        </div>
        <div className="mt-[-14px] h-6 w-44 rounded-b-3xl bg-pink shadow-md" />
        <div className="mt-2 h-4 w-32 rounded-b-3xl bg-pink/70" />
      </div>

      <button
        onClick={press}
        disabled={spinning}
        className="rounded-full bg-pink px-8 py-3 font-display text-lg font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-60"
      >
        {spinning ? "spinning…" : "Press for a Gift!"}
      </button>
    </div>
  );
}
