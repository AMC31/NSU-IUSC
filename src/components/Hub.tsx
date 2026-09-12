import React, { useMemo, useState } from "react";
import { Kicker, Badge, StatusBadge, Section, Button } from "./ui";
import { FIXTURES, RESULTS, STANDINGS, LIVE_MATCHES, SPORTS } from "../data";

const TABS = [
  "Overview",
  "Live",
  "Fixtures",
  "Results",
  "Standings",
  "Teams",
] as const;
type Tab = (typeof TABS)[number];

/* ---------- Live ---------- */
function LivePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {LIVE_MATCHES.map((m, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-md border border-error/30 bg-gradient-to-b from-error/10 to-card p-5"
        >
          <div className="flex items-center justify-between">
            <StatusBadge status="LIVE" />
            <span className="font-mono text-xs text-muted-foreground">
              {m.sport}
            </span>
          </div>
          <div className="mt-5 space-y-3">
            <Row name={m.a} score={m.sa} lead={m.sa >= m.sb} />
            <Row name={m.b} score={m.sb} lead={m.sb > m.sa} />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
            <span className="font-mono text-sm font-bold text-error">
              {m.clock}
            </span>
            <span className="text-xs text-muted-foreground">{m.venue}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
function Row({ name, score, lead }: { name: string; score: number; lead: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`font-heading font-semibold ${
          lead ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {name}
      </span>
      <span
        className={`font-display text-2xl tabular-nums ${
          lead ? "text-accent" : "text-muted-foreground"
        }`}
      >
        {score}
      </span>
    </div>
  );
}

/* ---------- Fixtures ---------- */
function FixturesPanel() {
  const sportsList = ["All", ...Array.from(new Set(FIXTURES.map((f) => f.sport)))];
  const statusList = ["All", "UPCOMING", "LIVE", "COMPLETED", "POSTPONED"];
  const [sport, setSport] = useState("All");
  const [status, setStatus] = useState("All");

  const rows = useMemo(
    () =>
      FIXTURES.filter(
        (f) =>
          (sport === "All" || f.sport === sport) &&
          (status === "All" || f.status === status)
      ),
    [sport, status]
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-4">
        <Filter label="Sport" value={sport} setValue={setSport} options={sportsList} />
        <Filter label="Status" value={status} setValue={setStatus} options={statusList} />
      </div>
      {rows.length === 0 ? (
        <Empty msg="No matches for these filters." />
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          {rows.map((f, i) => (
            <div
              key={f.no}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 md:grid-cols-[100px_100px_1fr_auto_140px] ${
                i % 2 ? "bg-card" : "bg-surface"
              }`}
            >
              <span className="font-mono text-xs text-muted-foreground">
                {f.no}
              </span>
              <div className="hidden md:block">
                <div className="font-mono text-sm text-foreground">{f.time}</div>
                <div className="text-xs text-muted-foreground">{f.date}</div>
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">
                  {f.a} <span className="text-muted-foreground">vs</span> {f.b}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {f.sport} · {f.venue}
                </div>
              </div>
              <span className="hidden font-mono text-xs text-accent md:block">
                {f.time}
              </span>
              <div className="justify-self-end">
                <StatusBadge status={f.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="min-h-[44px] rounded-sm border border-border bg-surface px-3 pr-8 text-sm text-foreground focus:border-accent focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-card">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- Results ---------- */
function ResultsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {RESULTS.map((r, i) => {
        const aWin = r.sa > r.sb;
        return (
          <div key={i} className="rounded-md border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <Badge tone="muted">{r.sport}</Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {r.date}
              </span>
            </div>
            <div className="space-y-2">
              <ResultRow name={r.a} score={r.sa} win={aWin} />
              <ResultRow name={r.b} score={r.sb} win={!aWin} />
            </div>
            <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
              {r.venue}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function ResultRow({ name, score, win }: { name: string; score: number; win: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {win && <span className="text-accent">▸</span>}
        <span
          className={`font-heading font-semibold ${
            win ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {name}
        </span>
      </div>
      <span
        className={`font-display text-xl tabular-nums ${
          win ? "text-accent" : "text-muted-foreground"
        }`}
      >
        {score}
      </span>
    </div>
  );
}

/* ---------- Standings ---------- */
function StandingsPanel() {
  const top3 = STANDINGS.slice(0, 3);
  const order = [1, 0, 2]; // silver, gold, bronze layout
  return (
    <div>
      {/* Podium */}
      <div className="mb-8">
        <div className="font-heading mb-4 text-sm font-bold uppercase tracking-widest text-accent">
          Top Universities
        </div>
        <div className="grid grid-cols-3 items-end gap-3">
          {order.map((idx) => {
            const t = top3[idx];
            const heights = ["h-24", "h-32", "h-20"];
            const h = t.rank === 1 ? heights[1] : t.rank === 2 ? heights[0] : heights[2];
            return (
              <div key={t.rank} className="flex flex-col items-center">
                <div className="font-display text-xl text-foreground">
                  {t.rank === 1 ? "🏆" : t.rank}
                </div>
                <div className="mb-2 mt-1 text-center text-xs font-semibold text-secondary-foreground">
                  {t.uni.split(" ")[0]}
                </div>
                <div
                  className={`${h} flex w-full items-start justify-center rounded-t-md border-x border-t pt-3 ${
                    t.rank === 1
                      ? "border-accent/50 bg-gradient-to-b from-accent/25 to-transparent"
                      : "border-border bg-gradient-to-b from-white/5 to-transparent"
                  }`}
                >
                  <span className="font-display text-lg text-accent">{t.pts}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-md border border-border md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {["Rank", "University", "P", "W", "L", "D", "Pts", "+/-"].map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STANDINGS.map((s) => (
              <tr
                key={s.rank}
                className="border-t border-border transition-colors hover:bg-surface"
              >
                <td className="px-4 py-3">
                  <span
                    className={`font-display grid h-7 w-7 place-items-center rounded-sm text-sm ${
                      s.rank <= 3
                        ? "bg-accent/20 text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.rank}
                  </span>
                </td>
                <td className="px-4 py-3 font-heading font-semibold text-foreground">
                  {s.uni}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.p}</td>
                <td className="px-4 py-3 text-success">{s.w}</td>
                <td className="px-4 py-3 text-error">{s.l}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.d}</td>
                <td className="px-4 py-3 font-display text-lg text-accent">
                  {s.pts}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                  {s.sd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {STANDINGS.map((s) => (
          <div
            key={s.rank}
            className="flex items-center gap-4 rounded-md border border-border bg-card p-4"
          >
            <span
              className={`font-display grid h-9 w-9 shrink-0 place-items-center rounded-sm ${
                s.rank <= 3 ? "bg-accent/20 text-accent" : "text-muted-foreground"
              }`}
            >
              {s.rank}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-heading truncate font-semibold text-foreground">
                {s.uni}
              </div>
              <div className="font-mono mt-1 text-xs text-muted-foreground">
                {s.w}W · {s.l}L · {s.d}D · {s.sd}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl text-accent">{s.pts}</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">
                pts
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Teams ---------- */
function TeamsPanel() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {STANDINGS.map((s) => (
        <div
          key={s.uni}
          className="group flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-accent/50"
        >
          <div className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-surface text-accent">
            {s.uni.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {s.uni}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              Rank #{s.rank}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Overview ---------- */
function OverviewPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-md border border-border bg-card p-6 md:col-span-2">
        <h3 className="font-display text-2xl text-foreground">Tournament Format</h3>
        <p className="mt-3 text-muted-foreground">
          Every sport is a single-elimination knockout — no group stage, no
          round robin. Win and advance, lose and you're out. Universities earn
          points from each segment toward the overall championship, and the
          institution with the most combined points is crowned champion.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
          {[
            { k: "Sports", v: `${SPORTS.length}` },
            { k: "Teams", v: "260+" },
            { k: "Matches", v: "100+" },
            { k: "Venues", v: "03" },
          ].map((x) => (
            <div key={x.k} className="bg-card p-4">
              <div className="font-display text-2xl text-accent">{x.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {x.k}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md border border-accent/30 bg-gradient-to-b from-accent/10 to-card p-6">
        <Badge tone="accent">Announcement</Badge>
        <h3 className="font-heading mt-4 text-lg font-bold text-foreground">
          Fixtures for the group stage are now live.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Check your university's schedule under the Fixtures tab and plan your
          season. Posted [DATE].
        </p>
      </div>
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="grid place-items-center rounded-md border border-dashed border-border bg-card/50 py-16 text-center">
      <div className="text-3xl opacity-40">🗓️</div>
      <p className="mt-3 text-sm text-muted-foreground">{msg}</p>
    </div>
  );
}

export function Hub() {
  const [tab, setTab] = useState<Tab>("Overview");
  return (
    <Section id="hub" className="border-t border-border bg-surface/30">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Kicker>Tournament Hub</Kicker>
          <h2 className="font-display mt-5 text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
            EVERYTHING, LIVE
          </h2>
        </div>
        <Button variant="outline" size="sm" onClick={() => setTab("Fixtures")}>
          View Full Schedule
        </Button>
      </div>

      {/* Tab bar */}
      <div className="no-scrollbar mt-8 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-heading relative shrink-0 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t
                ? "text-accent"
                : "text-muted-foreground hover:text-secondary-foreground"
            }`}
          >
            {t === "Live" && (
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-error blink" />
            )}
            {t}
            {tab === t && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "Overview" && <OverviewPanel />}
        {tab === "Live" && <LivePanel />}
        {tab === "Fixtures" && <FixturesPanel />}
        {tab === "Results" && <ResultsPanel />}
        {tab === "Standings" && <StandingsPanel />}
        {tab === "Teams" && <TeamsPanel />}
      </div>
    </Section>
  );
}
