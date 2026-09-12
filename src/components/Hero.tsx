import React, { useEffect, useState } from "react";
import { Button, Badge } from "./ui";
import { TOURNAMENT } from "../data";

function useCountdown(target: number) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display grid min-w-[3.2rem] place-items-center rounded-sm border border-border bg-white/[0.03] px-2 py-2 text-3xl tabular-nums text-foreground md:min-w-[4.5rem] md:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-mono mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Hero({ onRegister }: { onRegister: () => void }) {
  const { d, h, m, s } = useCountdown(TOURNAMENT.startTimestamp);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background image + treatment */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1200&fit=crop&auto=format"
          alt="Stadium crowd under floodlights"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 grain opacity-60" />
        {/* Motion trail accents */}
        <div className="absolute -left-40 top-1/3 h-[2px] w-[60%] rotate-[-8deg] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[1px]" />
        <div className="absolute right-0 top-1/2 h-[2px] w-[40%] rotate-[6deg] bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[1px]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <div className="float-up flex flex-wrap items-center gap-3">
          <Badge tone="open">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Registration {TOURNAMENT.registrationOpen ? "Open" : "Closed"}
          </Badge>
          <Badge tone="accent">{TOURNAMENT.season}</Badge>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {TOURNAMENT.venueCity} · Bangladesh
          </span>
        </div>

        <h1
          className="font-display float-up mt-6 max-w-5xl text-[13vw] leading-[0.86] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.05s" }}
        >
          NSU INTER UNIVERSITY{" "}
          <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            SPORTS CARNIVAL
          </span>
        </h1>

        <p
          className="float-up mt-6 max-w-xl text-lg text-secondary-foreground md:text-xl"
          style={{ animationDelay: "0.1s" }}
        >
          {TOURNAMENT.tagline} 50+ universities. 7 sports. One title that
          decides the best university in the country.
        </p>

        <div
          className="float-up mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.15s" }}
        >
          <Button size="lg" onClick={onRegister}>
            Register Now →
          </Button>
          <Button size="lg" variant="outline" onClick={() => (window.location.hash = "#tournament")}>
            Explore Tournament
          </Button>
        </div>

        {/* Countdown */}
        <div
          className="float-up mt-12"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="font-mono mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-6 bg-accent" /> Tournament starts in
          </div>
          <div className="flex gap-2 md:gap-4">
            <Unit value={d} label="Days" />
            <Unit value={h} label="Hrs" />
            <Unit value={m} label="Min" />
            <Unit value={s} label="Sec" />
          </div>
        </div>

        {/* Status bar */}
        <div className="float-up mt-12 w-full" style={{ animationDelay: "0.25s" }}>
          <div className="grid w-full max-w-6xl grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-md border border-border bg-card/90 backdrop-blur-xl md:grid-cols-4 md:divide-y-0">
          {[
            { k: "Status", v: "OPEN", accent: true },
            { k: "Universities", v: "48+" },
            { k: "Sports", v: "07" },
            { k: "Prize Pool", v: "৳ 4,00,000" },
          ].map((it) => (
            <div key={it.k} className="px-5 py-4 md:px-6 md:py-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {it.k}
              </div>
              <div
                className={`font-display mt-1 text-xl md:text-2xl ${
                  it.accent ? "text-lime" : "text-foreground"
                }`}
              >
                {it.v}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
