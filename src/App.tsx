import React, { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Intro, Stats, Sports } from "./components/Content";
import { Hub } from "./components/Hub";
import {
  Prize,
  Journey,
  Venues,
  News,
  FAQ,
  Sponsors,
  CTA,
  Footer,
} from "./components/Sections";
import { SegmentRegistration } from "./components/Registration";
import { Chat } from "./components/Chat";
import { AuthModal } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { SquadManager } from "./components/Squad";
import { AuthProvider, useAuth } from "./auth";

function Shell() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);
  const [segment, setSegment] = useState<string | null>(null);
  const [squad, setSquad] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // "Register" from anywhere: signed in → profile, otherwise → create account.
  const handleRegister = () => {
    if (user) setDashOpen(true);
    else setAuthOpen(true);
  };
  const openChat = () => setChatOpen(true);

  const initials = user
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav
        onRegister={handleRegister}
        onChat={openChat}
        onProfile={() => setDashOpen(true)}
        userInitials={initials}
      />

      <main>
        <Hero onRegister={handleRegister} />
        <Intro onRegister={handleRegister} />
        <Stats />
        <Sports onRegister={handleRegister} />
        <Hub />
        <Prize />
        <Journey />
        <Venues />
        <News />
        <FAQ onChat={openChat} />
        <Sponsors />
        <CTA onRegister={handleRegister} />
      </main>

      <Footer onChat={openChat} />

      {/* Step 1 — create account / sign in */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          setAuthOpen(false);
          setDashOpen(true);
        }}
      />

      {/* Step 2 — profile dashboard, register per segment */}
      <Dashboard
        open={dashOpen}
        onClose={() => setDashOpen(false)}
        onChat={openChat}
        onRegisterSegment={(sport) => {
          setDashOpen(false);
          setSegment(sport);
        }}
        onManageSquad={(sport) => setSquad(sport)}
      />

      {/* Squad & documents for a registered segment */}
      <SquadManager sport={squad} onClose={() => setSquad(null)} />

      {/* Step 3 — segment registration, stored on profile */}
      <SegmentRegistration
        sport={segment}
        onClose={() => {
          setSegment(null);
          setDashOpen(true);
        }}
        onDone={() => {
          setSegment(null);
          setDashOpen(true);
        }}
      />

      <Chat open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
