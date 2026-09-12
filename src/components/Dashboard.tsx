import React, { useEffect } from "react";
import { Button, Badge, StatusBadge } from "./ui";
import { useAuth } from "../auth";
import { SPORTS } from "../data";

export function Dashboard({
  open,
  onClose,
  onRegisterSegment,
  onManageSquad,
  onChat,
}: {
  open: boolean;
  onClose: () => void;
  onRegisterSegment: (sport: string) => void;
  onManageSquad: (sport: string) => void;
  onChat: () => void;
}) {
  const { user, signOut } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open || !user) return null;

  const registered = new Set(user.segments.map((s) => s.sport));
  const available = SPORTS.filter((s) => !registered.has(s.name));
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-[68] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="show-scroll relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-border bg-background">
        {/* Profile header */}
        <div className="relative overflow-hidden border-b border-border">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=320&fit=crop&auto=format"
            alt=""
            className="h-32 w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-sm bg-black/40 text-white hover:bg-black/60"
          >
            ✕
          </button>
          <div className="relative -mt-12 flex items-end gap-4 px-5 pb-5 md:px-7">
            <div className="font-display grid h-20 w-20 shrink-0 place-items-center rounded-md border border-accent/40 bg-primary text-2xl text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <h2 className="font-display truncate text-2xl text-foreground">
                {user.name}
              </h2>
              <div className="truncate text-sm text-muted-foreground">
                {user.university}
              </div>
              <div className="font-mono mt-1 flex flex-wrap items-center gap-x-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>ID {user.id}</span>
                <span>· Joined {user.joined}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot */}
        <div className="grid grid-cols-3 gap-px border-b border-border bg-border">
          {[
            { k: "Segments", v: String(user.segments.length) },
            {
              k: "Players",
              v: String(
                user.segments.reduce((n, s) => n + s.players.length, 0)
              ),
            },
            { k: "Entry", v: "Free" },
          ].map((x) => (
            <div key={x.k} className="bg-background px-4 py-4 text-center">
              <div className="font-display text-2xl text-accent">{x.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {x.k}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-8 p-5 md:p-7">
          {/* My segments */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground">
                My Sport Segments
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {user.segments.length} registered
              </span>
            </div>

            {user.segments.length === 0 ? (
              <div className="grid place-items-center rounded-md border border-dashed border-border bg-card/50 py-12 text-center">
                <div className="text-3xl opacity-40">🏟️</div>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                  You haven't registered for any segments yet. Pick a
                  battleground below to enter.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {user.segments.map((s) => {
                  const meta = SPORTS.find((x) => x.name === s.sport);
                  return (
                    <div
                      key={s.sport}
                      className="rounded-md border border-border bg-card p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{meta?.icon}</span>
                          <div>
                            <div className="font-display text-lg text-foreground">
                              {s.sport}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {s.teamName} · {meta?.format}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <StatusBadge status={s.status} />
                        </div>
                      </div>
                      <div className="mt-3 border-t border-border pt-3">
                        <div className="font-mono mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>
                            <span className="text-accent">{s.regId}</span> ·
                            Registered {s.date}
                          </span>
                          <span>👥 {s.players.length} players</span>
                          <span>📄 {s.docs.length} docs</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onManageSquad(s.sport)}
                          >
                            Manage Squad & Docs
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Register for more */}
          {available.length > 0 && (
            <section>
              <h3 className="font-heading mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
                Register for a Segment
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {available.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => onRegisterSegment(s.name)}
                    className="group flex flex-col items-start gap-2 rounded-md border border-border bg-card p-4 text-left transition-colors hover:border-accent/50"
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-heading text-sm font-bold text-foreground">
                      {s.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      + Register
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Quick links */}
          <section className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={onChat}
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 text-left transition-colors hover:border-accent/50"
            >
              <span className="text-xl">💬</span>
              <div>
                <div className="font-heading text-sm font-bold text-foreground">
                  Support Chat
                </div>
                <div className="text-xs text-muted-foreground">
                  Talk to a NSU IUSC Club member
                </div>
              </div>
            </button>
            <div className="flex items-center gap-3 rounded-md border border-border bg-card p-4">
              <span className="text-xl">📢</span>
              <div>
                <div className="font-heading text-sm font-bold text-foreground">
                  Announcements
                </div>
                <div className="text-xs text-muted-foreground">
                  Fixtures released — check the hub
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-border bg-background/90 px-5 py-4 backdrop-blur md:px-7">
          <button
            onClick={signOut}
            className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-error"
          >
            Sign Out
          </button>
          <Badge tone="accent">NSU IUSC Season 3 · 2026</Badge>
        </div>
      </div>
    </div>
  );
}
