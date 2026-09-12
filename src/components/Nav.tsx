import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { NAV_LINKS } from "../data";
import logoUrl from "../imports/Sports_Carnival_Logo.png";

export function Logo({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const h = size === "lg" ? "h-16 md:h-20" : "h-10 md:h-12";
  return (
    <a
      href="#home"
      aria-label="NSU Inter University Sports Carnival — Season 3"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <img
        src={logoUrl}
        alt="NSU Inter University Sports Carnival 2026 crest"
        className={`${h} w-auto object-contain transition-transform group-hover:scale-105`}
      />
      {size === "sm" && (
        <span className="hidden leading-none sm:block">
          <span className="font-display block text-base tracking-wide text-foreground">
            NSU IUSC
          </span>
          <span className="font-mono block text-[9px] uppercase tracking-[0.3em] text-accent">
            Season 3
          </span>
        </span>
      )}
    </a>
  );
}

export function Nav({
  onRegister,
  onChat,
  onProfile,
  userInitials,
}: {
  onRegister: () => void;
  onChat: () => void;
  onProfile: () => void;
  userInitials: string | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-heading rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide text-secondary-foreground transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onChat}
              className="font-heading hidden min-h-[44px] items-center gap-2 rounded-sm px-3 text-sm font-semibold uppercase tracking-wide text-secondary-foreground transition-colors hover:text-accent md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 blink" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Chat Support
            </button>
            {userInitials ? (
              <button
                onClick={onProfile}
                aria-label="Open profile"
                className="font-display grid h-11 min-w-[44px] place-items-center rounded-sm border border-accent/40 bg-primary px-1 text-sm text-white transition-transform hover:scale-105"
              >
                {userInitials}
              </button>
            ) : (
              <Button size="sm" onClick={onRegister} className="hidden sm:inline-flex">
                Register Now
              </Button>
            )}
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-sm border border-border text-foreground lg:hidden"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-5 bg-current transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-card px-6 pb-8 pt-24 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-heading border-b border-border py-4 text-lg font-semibold uppercase tracking-wide text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button
              size="lg"
              onClick={() => {
                setOpen(false);
                onRegister();
              }}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setOpen(false);
                onChat();
              }}
            >
              Chat with NSU IUSC
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
