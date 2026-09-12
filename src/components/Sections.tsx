import React, { useState } from "react";
import { Button, Kicker, Badge, Section } from "./ui";
import { Logo } from "./Nav";
import {
  PRIZE_POOL,
  JOURNEY,
  VENUES,
  NEWS,
  FAQS,
  SPONSORS,
} from "../data";

/* ---------------- Prize Pool ---------------- */
export function Prize() {
  return (
    <Section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>
      <div className="text-center">
        <Kicker className="justify-center">Prize Pool</Kicker>
        <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-6xl md:text-7xl">
          THE STAKES ARE HIGH
        </h2>
        <div className="font-mono mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Total Prize Pool
        </div>
        <div className="font-display mt-2 bg-gradient-to-r from-accent via-primary to-lime bg-clip-text text-6xl text-transparent sm:text-7xl md:text-8xl">
          {PRIZE_POOL}
        </div>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
          One of the biggest prize pools in university sport — awarded across
          every segment as the carnival crowns its champions.
        </p>
      </div>
    </Section>
  );
}

/* ---------------- Journey ---------------- */
export function Journey() {
  return (
    <Section className="border-t border-border bg-surface/30">
      <Kicker>The Road Ahead</Kicker>
      <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
        TOURNAMENT JOURNEY
      </h2>

      <div className="mt-12 grid gap-0 md:grid-cols-6">
        {JOURNEY.map((step, i) => (
          <div key={step.title} className="relative flex md:block">
            {/* Connector */}
            <div className="relative flex flex-col items-center md:mb-4 md:flex-row">
              <span
                className={`z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 font-mono text-xs font-bold ${
                  step.state === "done"
                    ? "border-success bg-success/20 text-success"
                    : step.state === "active"
                    ? "border-accent bg-accent/20 text-accent pulse-ring"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {step.state === "done" ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              {i < JOURNEY.length - 1 && (
                <span
                  className={`absolute left-5 top-10 h-full w-0.5 md:left-10 md:top-5 md:h-0.5 md:w-full ${
                    step.state === "done" ? "bg-success/50" : "bg-border"
                  }`}
                />
              )}
            </div>
            <div className="pb-8 pl-4 md:pb-0 md:pl-0 md:pr-4">
              <div
                className={`font-heading text-sm font-bold uppercase tracking-wide ${
                  step.state === "todo" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {step.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{step.desc}</div>
              {step.state === "active" && (
                <div className="mt-2">
                  <Badge tone="accent">You are here</Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Venues ---------------- */
export function Venues() {
  return (
    <Section className="border-t border-border">
      <Kicker>Venues</Kicker>
      <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
        WHERE THE ACTION HAPPENS
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {VENUES.map((v) => (
          <article
            key={v.name}
            className="group overflow-hidden rounded-md border border-border bg-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={v.img}
                alt={v.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-3 left-4">
                <Badge tone="accent">{v.cap} capacity</Badge>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl text-foreground">{v.name}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <span>📍</span> {v.loc}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-wider text-accent">
                {v.sports}
              </div>
              <button className="font-heading mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-border py-2.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground transition-colors hover:border-accent hover:text-accent">
                View on Map
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- News ---------------- */
export function News() {
  return (
    <Section id="news" className="border-t border-border bg-surface/30">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Kicker>Newsroom</Kicker>
          <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
            LATEST FROM NSU IUSC
          </h2>
        </div>
        <Button variant="ghost" size="sm">
          All Stories →
        </Button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-accent/50"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={n.img}
                alt={n.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <Badge tone="accent">{n.cat}</Badge>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="font-mono text-xs text-muted-foreground">{n.date}</div>
              <h3 className="font-heading mt-2 text-lg font-bold leading-snug text-foreground">
                {n.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.desc}</p>
              <button className="font-heading mt-4 self-start text-xs font-bold uppercase tracking-wider text-accent">
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ({ onChat }: { onChat: () => void }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Kicker>Support</Kicker>
          <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl">
            FREQUENTLY ASKED
          </h2>
          <p className="mt-4 text-muted-foreground">
            Still need help? Talk to a real NSU IUSC Club member anytime.
          </p>
          <Button className="mt-6" variant="accent" onClick={onChat}>
            Chat with NSU IUSC
          </Button>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-heading text-base font-semibold transition-colors md:text-lg ${
                      isOpen ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-sm border border-border text-lg transition-transform ${
                      isOpen ? "rotate-45 border-accent text-accent" : "text-muted-foreground"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Sponsors ---------------- */
export function Sponsors() {
  return (
    <Section className="border-t border-border bg-surface/30">
      <div className="text-center">
        <Kicker className="justify-center">Partners</Kicker>
        <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
          POWERED BY OUR PARTNERS
        </h2>
      </div>
      <div className="mt-12 space-y-8">
        {Object.entries(SPONSORS).map(([tier, names]) => (
          <div key={tier}>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {tier}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div
              className={`grid gap-3 ${
                tier === "TITLE PARTNER"
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {names.map((n) => (
                <div
                  key={n}
                  className={`grid place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-accent/40 hover:text-secondary-foreground ${
                    tier === "TITLE PARTNER" ? "py-10 text-xl" : "py-7 text-sm"
                  }`}
                >
                  <span className="font-heading font-bold uppercase tracking-wider">
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CTA ---------------- */
export function CTA({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1552667466-07770ae110d0?w=1920&h=1000&fit=crop&auto=format"
          alt="Athletes competing"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-5xl leading-[0.9] text-foreground sm:text-6xl md:text-7xl">
          READY TO REPRESENT YOUR UNIVERSITY?
        </h2>
        <p className="mt-5 text-lg text-secondary-foreground md:text-xl">
          Your university. Your team. Your moment.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={onRegister}>
            Register Now →
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => (window.location.hash = "#tournament")}
          >
            Explore Tournament
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer({ onChat }: { onChat: () => void }) {
  const cols = [
    { h: "Tournament", links: ["Home", "Tournament", "Sports", "Fixtures", "Results"] },
    { h: "Participate", links: ["Registration", "Rules", "FAQs", "Contact"] },
    { h: "Support", links: ["Help Center", "Chat with NSU IUSC", "Contact"] },
  ];
  return (
    <footer className="border-t border-border bg-background px-5 py-16 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              The digital home of Bangladesh's biggest university sports
              competition. NSU Inter University Sports Carnival — Season 3, 2026.
            </p>
            <div className="mt-5 flex gap-2">
              {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="font-mono grid h-10 w-10 place-items-center rounded-sm border border-border text-[10px] uppercase text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {c.h}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={l === "Chat with NSU IUSC" ? onChat : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 NSU Inter University Sports Carnival. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Made for the game · [CONTACT EMAIL]
          </p>
        </div>
      </div>
    </footer>
  );
}
