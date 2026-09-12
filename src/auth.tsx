import React, { createContext, useContext, useEffect, useState } from "react";

export type Player = {
  id: string;
  name: string;
  playerId: string; // student / national ID
  age: string;
  photo: string | null; // data URL
};

export type SquadDoc = {
  id: string;
  name: string; // file name
};

export type SegmentReg = {
  sport: string;
  teamName: string;
  status: "CONFIRMED" | "QUALIFIED" | "ELIMINATED";
  date: string; // human-readable registration date
  regId: string;
  players: Player[];
  docs: SquadDoc[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  university: string;
  joined: string;
  segments: SegmentReg[];
};

type AuthState = {
  user: User | null;
  signUp: (data: { name: string; email: string; university: string }) => void;
  signIn: (email: string) => void;
  signOut: () => void;
  addSegment: (seg: Pick<SegmentReg, "sport" | "teamName">) => SegmentReg;
  addPlayer: (sport: string, player: Omit<Player, "id">) => void;
  removePlayer: (sport: string, playerId: string) => void;
  addDoc: (sport: string, name: string) => void;
  removeDoc: (sport: string, docId: string) => void;
};

const uid = (p: string) => p + Math.random().toString(36).slice(2, 8);

function updateSegment(
  user: User,
  sport: string,
  fn: (s: SegmentReg) => SegmentReg
): User {
  return {
    ...user,
    segments: user.segments.map((s) => (s.sport === sport ? fn(s) : s)),
  };
}

const KEY = "nsusc:user";
const AuthCtx = createContext<AuthState | null>(null);

function load(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

const today = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load());

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const signUp: AuthState["signUp"] = ({ name, email, university }) => {
    setUser({
      id: "USR-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
      name,
      email,
      university,
      joined: today(),
      segments: [],
    });
  };

  // Prototype "sign in" — restores any saved profile, otherwise creates a demo one.
  const signIn: AuthState["signIn"] = (email) => {
    const existing = load();
    if (existing) setUser(existing);
    else
      setUser({
        id: "USR-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
        name: "[Your Name]",
        email,
        university: "[Your University]",
        joined: today(),
        segments: [],
      });
  };

  const signOut = () => setUser(null);

  const addSegment: AuthState["addSegment"] = (seg) => {
    const full: SegmentReg = {
      ...seg,
      status: "CONFIRMED",
      date: today(),
      regId: "NSUIUSC26-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
      players: [],
      docs: [],
    };
    setUser((u) =>
      u
        ? {
            ...u,
            segments: [...u.segments.filter((s) => s.sport !== seg.sport), full],
          }
        : u
    );
    return full;
  };

  const addPlayer: AuthState["addPlayer"] = (sport, player) =>
    setUser((u) =>
      u
        ? updateSegment(u, sport, (s) => ({
            ...s,
            players: [...s.players, { ...player, id: uid("PLY-") }],
          }))
        : u
    );

  const removePlayer: AuthState["removePlayer"] = (sport, playerId) =>
    setUser((u) =>
      u
        ? updateSegment(u, sport, (s) => ({
            ...s,
            players: s.players.filter((p) => p.id !== playerId),
          }))
        : u
    );

  const addDoc: AuthState["addDoc"] = (sport, name) =>
    setUser((u) =>
      u
        ? updateSegment(u, sport, (s) => ({
            ...s,
            docs: [...s.docs, { id: uid("DOC-"), name }],
          }))
        : u
    );

  const removeDoc: AuthState["removeDoc"] = (sport, docId) =>
    setUser((u) =>
      u
        ? updateSegment(u, sport, (s) => ({
            ...s,
            docs: s.docs.filter((d) => d.id !== docId),
          }))
        : u
    );

  return (
    <AuthCtx.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        addSegment,
        addPlayer,
        removePlayer,
        addDoc,
        removeDoc,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
