import React, { useEffect, useRef, useState } from "react";
import { Button, Badge } from "./ui";
import { useAuth } from "../auth";
import { SPORTS } from "../data";

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
}

export function SquadManager({
  sport,
  onClose,
}: {
  sport: string | null;
  onClose: () => void;
}) {
  const { user, addPlayer, removePlayer, addDoc, removeDoc } = useAuth();
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const docInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = sport ? "hidden" : "";
    if (sport) {
      setName("");
      setPlayerId("");
      setAge("");
      setPhoto(null);
    }
  }, [sport]);

  if (!sport || !user) return null;
  const seg = user.segments.find((s) => s.sport === sport);
  if (!seg) return null;
  const meta = SPORTS.find((s) => s.name === sport);

  const canAdd = name.trim() && playerId.trim() && age.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdd) return;
    addPlayer(sport, { name: name.trim(), playerId: playerId.trim(), age: age.trim(), photo });
    setName("");
    setPlayerId("");
    setAge("");
    setPhoto(null);
    if (photoInput.current) photoInput.current.value = "";
  };

  return (
    <div className="fixed inset-0 z-[72] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="show-scroll relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-border bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-5 py-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{meta?.icon}</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Manage Squad
              </div>
              <h2 className="font-display text-xl text-foreground">
                {sport.toUpperCase()} · {seg.teamName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8 p-5 md:p-7">
          {/* Add player */}
          <section>
            <h3 className="font-heading mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Add Squad Member
            </h3>
            <form
              onSubmit={submit}
              className="rounded-md border border-border bg-card p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Photo */}
                <button
                  type="button"
                  onClick={() => photoInput.current?.click()}
                  className="group relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-md border border-dashed border-border bg-surface text-center"
                >
                  {photo ? (
                    <img src={photo} alt="Player" className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      📷 Add Photo
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-[9px] uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Change
                  </span>
                </button>
                <input
                  ref={photoInput}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) setPhoto(await readAsDataURL(f));
                  }}
                />

                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <Input label="Full Name" value={name} onChange={setName} placeholder="Player name" />
                  <Input
                    label="Student / National ID"
                    value={playerId}
                    onChange={setPlayerId}
                    placeholder="ID number"
                  />
                  <Input label="Age" value={age} onChange={setAge} type="number" placeholder="e.g. 21" />
                  <div className="flex items-end">
                    <Button type="submit" className="w-full" disabled={!canAdd}>
                      + Add Player
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Roster */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground">
                Squad Roster
              </h3>
              <Badge tone="accent">{seg.players.length} players</Badge>
            </div>

            {seg.players.length === 0 ? (
              <div className="grid place-items-center rounded-md border border-dashed border-border bg-card/50 py-10 text-center text-sm text-muted-foreground">
                No players added yet. Add your squad above.
              </div>
            ) : (
              <div className="space-y-2">
                {seg.players.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-sm bg-surface">
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="font-display text-accent">
                          {p.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-heading truncate font-semibold text-foreground">
                        {p.name}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        ID {p.playerId} · Age {p.age}
                      </div>
                    </div>
                    <button
                      onClick={() => removePlayer(sport, p.id)}
                      aria-label={`Remove ${p.name}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm text-muted-foreground hover:text-error"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Documents */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground">
                Team Documents
              </h3>
              <Button size="sm" variant="outline" onClick={() => docInput.current?.click()}>
                + Upload Document
              </Button>
              <input
                ref={docInput}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                hidden
                onChange={(e) => {
                  Array.from(e.target.files ?? []).forEach((f) => addDoc(sport, f.name));
                  if (docInput.current) docInput.current.value = "";
                }}
              />
            </div>
            {seg.docs.length === 0 ? (
              <div className="grid place-items-center rounded-md border border-dashed border-border bg-card/50 py-8 text-center text-sm text-muted-foreground">
                Upload student verification, authorization letters and IDs.
                <span className="font-mono mt-1 block text-xs">PDF · JPG · PNG</span>
              </div>
            ) : (
              <div className="space-y-2">
                {seg.docs.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
                  >
                    <span className="text-lg">📄</span>
                    <span className="min-w-0 flex-1 truncate text-sm text-secondary-foreground">
                      {d.name}
                    </span>
                    <Badge tone="success">Uploaded</Badge>
                    <button
                      onClick={() => removeDoc(sport, d.id)}
                      aria-label="Remove document"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm text-muted-foreground hover:text-error"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono mt-3 text-[10px] text-muted-foreground">
              Prototype: files aren't uploaded to a server — names are stored on
              your profile for demonstration.
            </p>
          </section>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end border-t border-border bg-background/90 px-5 py-4 backdrop-blur md:px-7">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] rounded-sm border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        {...props}
      />
    </label>
  );
}
