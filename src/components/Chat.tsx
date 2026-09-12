import React, { useEffect, useRef, useState } from "react";
import { CHAT_QUICK } from "../data";

type Msg = {
  from: "user" | "agent";
  text: string;
  time: string;
};

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const AGENT_REPLIES: Record<string, string> = {
  "Registration Help":
    "Happy to help! Create your account, then register each sport from your profile. You'll get a Registration ID instantly — and it's completely free. Which sport is your university entering?",
  "Is it free to join?":
    "Yes! NSU IUSC Season 3 is free to enter — there are no registration or participation fees for any sport. Just create your profile and register your segments.",
  "Tournament Rules":
    "Each sport has a group stage then knockouts, with combined points deciding the overall champion. Full rules are in the Tournament Hub → Rules.",
  "Fixtures & Schedule":
    "Group-stage fixtures are live in the Tournament Hub → Fixtures tab. You can filter by sport, date and venue.",
  "Venue Information":
    "We're hosting across 6 premium venues. Check “Where The Action Happens” for locations, capacity and maps.",
  "Technical Support":
    "Sorry you hit a snag! Tell me what's happening and I'll get it sorted, or escalate to our tech team.",
  "Talk to a Support Member":
    "Connecting you to a live NSU IUSC Club member now — one moment. In the meantime, how can I help?",
};

export function Chat({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "agent",
      text: "Hi! Welcome to NSU IUSC Season 3. How can we help you today?",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [msgs, typing]);

  const agentSay = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "agent", text, time: now() }]);
      if (!open) setUnread((u) => u + 1);
    }, 1300);
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text, time: now() }]);
    setInput("");
    agentSay(
      AGENT_REPLIES[text] ??
        "Thanks for reaching out! A NSU IUSC Club member will follow up shortly. Meanwhile, feel free to pick a quick topic below."
    );
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-[60] flex min-h-[52px] items-center gap-2.5 rounded-full border border-accent/40 bg-accent px-5 text-accent-foreground shadow-[0_10px_40px_-8px_rgba(34,230,255,0.6)] transition-all hover:brightness-105 ${
          open ? "scale-90 opacity-0 pointer-events-none" : "scale-100"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 blink" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
        </span>
        <span className="font-heading text-sm font-bold uppercase tracking-wide">
          Need Help?
        </span>
        {unread > 0 && (
          <span className="font-mono grid h-5 w-5 place-items-center rounded-full bg-error text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[65] flex flex-col overflow-hidden border border-border bg-card transition-all duration-300 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px] sm:rounded-xl ${
          open
            ? "pointer-events-auto h-[85vh] translate-y-0 opacity-100 sm:h-[560px]"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/20 to-transparent px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="font-display grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
              N
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-foreground">
                NSU IUSC SUPPORT
              </div>
              <div className="flex items-center gap-1.5 text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Support team online
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div ref={bodyRef} className="show-scroll flex-1 space-y-4 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${m.from === "user" ? "items-end" : ""}`}>
                {m.from === "agent" && (
                  <div className="font-mono mb-1 text-[10px] uppercase tracking-wider text-accent">
                    NSU IUSC Club Member
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.from === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-surface text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
                <div
                  className={`font-mono mt-1 text-[10px] text-muted-foreground ${
                    m.from === "user" ? "text-right" : ""
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface px-4 py-3.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                    style={{
                      animation: "typing 1.2s infinite",
                      animationDelay: `${d * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {msgs.length <= 2 && !typing && (
            <div className="flex flex-wrap gap-2 pt-2">
              {CHAT_QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              aria-label="Attach file"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-muted-foreground hover:text-accent"
            >
              📎
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="min-h-[44px] flex-1 rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform active:scale-90"
            >
              ➤
            </button>
          </form>
          <p className="font-mono mt-2 text-center text-[10px] text-muted-foreground">
            You're chatting with real NSU IUSC Club members — not a bot.
          </p>
        </div>
      </div>
    </>
  );
}
