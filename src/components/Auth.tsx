import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { useAuth } from "../auth";

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

export function AuthModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      signUp({
        name: name || "[Your Name]",
        email: email || "you@university.edu",
        university: university || "[Your University]",
      });
    } else {
      signIn(email || "you@university.edu");
    }
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-t-xl border border-border bg-card sm:rounded-xl">
        {/* Banner */}
        <div className="relative h-28 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=300&fit=crop&auto=format"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm bg-black/40 text-white hover:bg-black/60"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </div>
            <h3 className="font-display text-2xl text-foreground">
              {mode === "signup" ? "JOIN NSU IUSC S3" : "SIGN IN"}
            </h3>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 p-5 md:p-6">
          <p className="text-sm text-muted-foreground">
            {mode === "signup"
              ? "Create your profile first. Once you're in, register for individual sport segments from your dashboard."
              : "Sign in to reach your profile and manage your sport segments."}
          </p>

          {mode === "signup" && (
            <Field
              label="Full Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Field
            label="Email"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {mode === "signup" && (
            <Field
              label="University"
              placeholder="e.g. North South University"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          )}
          <Field label="Password" type="password" placeholder="••••••••" />

          <Button type="submit" size="lg" className="w-full">
            {mode === "signup" ? "Create Profile →" : "Sign In →"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account?" : "New to NSU IUSC?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="font-heading font-bold uppercase tracking-wide text-accent"
            >
              {mode === "signup" ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
