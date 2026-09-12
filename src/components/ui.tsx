import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider transition-all duration-200 active:translate-y-px disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer select-none";
  const sizes = {
    sm: "text-xs px-4 min-h-[40px]",
    md: "text-sm px-6 min-h-[48px]",
    lg: "text-sm md:text-base px-8 min-h-[56px]",
  };
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_8px_30px_-8px_rgba(47,107,255,0.7)]",
    accent:
      "bg-accent text-accent-foreground hover:brightness-105 shadow-[0_8px_30px_-8px_rgba(34,230,255,0.6)]",
    outline:
      "border border-border text-foreground hover:border-accent hover:text-accent bg-transparent",
    ghost: "text-secondary-foreground hover:text-foreground hover:bg-white/5",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent ${className}`}
    >
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "muted" | "live" | "success" | "warning" | "error" | "accent" | "open";
  className?: string;
}) {
  const tones: Record<string, string> = {
    muted: "bg-white/5 text-muted-foreground border-border",
    live: "bg-error/15 text-error border-error/40",
    success: "bg-success/15 text-success border-success/40",
    warning: "bg-warning/15 text-warning border-warning/40",
    error: "bg-error/15 text-error border-error/40",
    accent: "bg-accent/15 text-accent border-accent/40",
    open: "bg-lime/15 text-lime border-lime/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, React.ComponentProps<typeof Badge>["tone"]> = {
    LIVE: "live",
    UPCOMING: "accent",
    COMPLETED: "success",
    POSTPONED: "warning",
    OPEN: "open",
    FILLING: "warning",
    REGISTERED: "accent",
    CONFIRMED: "success",
    VERIFIED: "success",
    "MATCH SCHEDULED": "accent",
    QUALIFIED: "success",
    ELIMINATED: "error",
  };
  return (
    <Badge tone={map[status] ?? "muted"}>
      {status === "LIVE" && (
        <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-error" />
      )}
      {status}
    </Badge>
  );
}

export function Section({
  id,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-5 py-20 md:px-10 md:py-28 ${
        dark ? "bg-background" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
