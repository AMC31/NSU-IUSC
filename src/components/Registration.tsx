import React, { useEffect, useState } from "react";
import { Button, Badge } from "./ui";
import { SPORTS } from "../data";
import { useAuth, SegmentReg } from "../auth";

const STEPS = ["Team & Athletes", "Documentation", "Review", "Confirmation"];

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        className="min-h-[48px] rounded-sm border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        {...props}
      />
    </label>
  );
}

/** Register the signed-in user into a single sport segment. */
export function SegmentRegistration({
  sport,
  onClose,
  onDone,
}: {
  sport: string | null;
  onClose: () => void;
  onDone: () => void;
}) {
  const { user, addSegment } = useAuth();
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [confirmed, setConfirmed] = useState<SegmentReg | null>(null);

  useEffect(() => {
    document.body.style.overflow = sport ? "hidden" : "";
    if (sport) {
      setStep(0);
      setConfirmed(null);
      setTeamName("");
    }
  }, [sport]);

  if (!sport) return null;
  const meta = SPORTS.find((s) => s.name === sport);

  const next = () => {
    if (step === 2) {
      const seg = addSegment({ sport, teamName: teamName || "[Team Name]" });
      setConfirmed(seg);
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-border bg-card sm:h-auto sm:max-h-[90vh] sm:rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{meta?.icon}</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Segment Registration · Step {step + 1}/{STEPS.length}
              </div>
              <h3 className="font-display text-xl text-foreground">
                {sport.toUpperCase()}
              </h3>
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

        {/* Profile context */}
        <div className="flex items-center gap-2 border-b border-border bg-surface/50 px-5 py-2.5 text-xs text-muted-foreground md:px-7">
          <span className="text-accent">👤</span>
          Registering as <span className="text-foreground">{user?.name}</span> ·{" "}
          {user?.university}
        </div>

        {/* Progress */}
        <div className="flex gap-1 px-5 pt-4 md:px-7">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="show-scroll flex-1 overflow-y-auto px-5 py-6 md:px-7">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Team Name"
                placeholder={`e.g. ${user?.university?.split(" ")[0] ?? "NSU"} ${sport}`}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <Field label="Team Captain" placeholder="Full name" />
              <Field label="Coach / Manager" placeholder="Full name" />
              <Field label="Squad Size" type="number" placeholder="e.g. 12" />
              <Field label="Contact Email" type="email" placeholder="team@university.edu" />
              <Field label="Contact Phone" placeholder="[Contact Number]" />
              <div className="rounded-md border border-dashed border-border bg-surface/50 p-4 text-sm text-muted-foreground sm:col-span-2">
                Format: <span className="text-accent">{meta?.format}</span> · You
                can add individual player details later from your profile.
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {[
                "Student Verification (all players)",
                "University Authorization Letter",
                "Player ID Documents",
                "Team Photo (optional)",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex flex-col items-start justify-between gap-3 rounded-md border border-dashed border-border bg-surface/50 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <span className="text-sm text-secondary-foreground">{doc}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Upload File
                  </Button>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Accepted: PDF, JPG, PNG · Max 10MB each. Uploads are placeholders
                in this prototype.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <SummaryRow k="Segment" v={sport} />
              <SummaryRow k="Format" v={meta?.format ?? "—"} />
              <SummaryRow k="Team Name" v={teamName || "[Team Name]"} />
              <SummaryRow k="University" v={user?.university ?? "—"} />
              <SummaryRow k="Applicant" v={user?.name ?? "—"} />
              <SummaryRow k="Documents" v="4 pending upload" />
              <SummaryRow k="Entry" v="Free — no registration fee" />
              <div className="rounded-md border border-accent/30 bg-accent/10 p-4 text-sm text-secondary-foreground">
                This segment will be added to your profile. By submitting you
                agree to the NSU IUSC Season 3 rules & regulations.
              </div>
            </div>
          )}

          {step === 3 && confirmed && (
            <div className="py-2 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/20 text-3xl text-success">
                ✓
              </div>
              <h3 className="font-display mt-5 text-3xl text-foreground">
                {sport.toUpperCase()} REGISTERED
              </h3>
              <p className="mt-2 text-muted-foreground">
                This segment now appears in your profile.
              </p>
              <div className="mx-auto mt-6 max-w-md space-y-px overflow-hidden rounded-md border border-border bg-border text-left">
                <ConfRow k="Registration ID" v={confirmed.regId} mono />
                <ConfRow k="Segment" v={confirmed.sport} />
                <ConfRow k="Team" v={confirmed.teamName} />
                <ConfRow k="Registered On" v={confirmed.date} />
                <ConfRow k="Entry Fee" v="Free" />
                <ConfRow k="Status" badge="CONFIRMED" />
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="accent" onClick={() => window.print()}>
                  Download Confirmation
                </Button>
                <Button onClick={onDone}>Back to Profile →</Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 3 && (
          <div className="flex items-center justify-between border-t border-border px-5 py-4 md:px-7">
            <Button variant="ghost" onClick={step === 0 ? onClose : back}>
              {step === 0 ? "Cancel" : "← Back"}
            </Button>
            <Button onClick={next}>
              {step === 2 ? "Confirm Registration" : "Continue →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className="text-right font-heading font-semibold text-foreground">
        {v}
      </span>
    </div>
  );
}

function ConfRow({
  k,
  v,
  mono,
  badge,
}: {
  k: string;
  v?: string;
  mono?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 bg-card px-4 py-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      {badge ? (
        <Badge tone={badge === "REGISTERED" ? "accent" : "warning"}>{badge}</Badge>
      ) : (
        <span
          className={`text-right text-foreground ${
            mono ? "font-mono text-sm font-bold text-accent" : "font-semibold"
          }`}
        >
          {v}
        </span>
      )}
    </div>
  );
}
