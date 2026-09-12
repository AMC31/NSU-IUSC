import React, { useEffect, useRef, useState } from "react";
import { Button, Kicker, Badge, StatusBadge, Section } from "./ui";
import { BIG_STATS, SPORTS } from "../data";

/* ---------------- Intro ---------------- */
export function Intro({ onRegister }: { onRegister: () => void }) {
  return (
    <Section id="tournament" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Kicker>The Story</Kicker>
          <h2 className="font-display mt-5 text-4xl leading-[0.95] text-foreground sm:text-5xl md:text-6xl">
            THE BIGGEST UNIVERSITY SPORTS CARNIVAL
          </h2>
          <p className="mt-6 max-w-xl text-lg text-secondary-foreground">
            NSU Inter University Sports Carnival brings universities from across
            Bangladesh together to compete, connect, and represent their
            institutions on one national stage.
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Season 3 is the most ambitious edition yet — more sports, more
            universities, bigger venues and a prize pool that raises the stakes
            for everyone chasing the title of best university in sports.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
            {[
              { v: "Season 2", l: "40 universities competed" },
              { v: "300+", l: "athletes last edition" },
              { v: "1 Title", l: "one national champion" },
            ].map((s) => (
              <div key={s.l} className="bg-card p-4">
                <div className="font-display text-2xl text-accent">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button onClick={onRegister}>Why Participate? →</Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-surface">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=1100&fit=crop&auto=format"
              alt="University athletes celebrating"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <button className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground pulse-ring">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
                  <path d="M0 0v20l18-10z" />
                </svg>
              </span>
            </button>
            <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-white/80">
              [ Watch the Season 3 trailer ]
            </div>
          </div>
          <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-md border border-accent/30" />
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Stats ---------------- */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
}

export function Stats() {
  const { ref, seen } = useInView();
  return (
    <Section className="relative overflow-hidden diag-lines">
      <Kicker>By The Numbers</Kicker>
      <h2 className="font-display mt-5 max-w-3xl text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
        A TOURNAMENT AT NATIONAL SCALE
      </h2>
      <div
        ref={ref}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3"
      >
        {BIG_STATS.map((s, i) => (
          <div
            key={s.label}
            className="group relative bg-card p-6 transition-colors hover:bg-surface md:p-8"
            style={{
              transition: "transform .6s, opacity .6s",
              transitionDelay: `${i * 70}ms`,
              transform: seen ? "translateY(0)" : "translateY(20px)",
              opacity: seen ? 1 : 0,
            }}
          >
            <div className="font-display text-5xl leading-none text-foreground transition-colors group-hover:text-accent md:text-7xl">
              {s.value}
            </div>
            <div className="font-heading mt-3 text-sm font-bold uppercase tracking-widest text-secondary-foreground">
              {s.label}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Sports ---------------- */
export function Sports({ onRegister }: { onRegister: () => void }) {
  return (
    <Section id="sports" className="border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Kicker>Sports & Events</Kicker>
          <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
            CHOOSE YOUR BATTLEGROUND
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Eight arenas, one carnival. Pick where your university makes its mark
          — swipe to explore each battleground.
        </p>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
        {SPORTS.map((sp) => (
          <article
            key={sp.name}
            className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:border-accent/50 sm:w-[60%] md:w-auto"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={sp.img}
                alt={sp.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute right-3 top-3">
                <StatusBadge status={sp.status} />
              </div>
              <div className="absolute bottom-3 left-4 text-4xl">{sp.icon}</div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl text-foreground">
                  {sp.name}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {sp.teams} teams
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{sp.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {sp.format}
                </span>
                <button
                  onClick={onRegister}
                  className="font-heading text-xs font-bold uppercase tracking-wider text-secondary-foreground transition-colors group-hover:text-accent"
                >
                  View Sport →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
