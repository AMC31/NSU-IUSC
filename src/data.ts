// All values are clearly editable placeholders — replace with official data.

export const TOURNAMENT = {
  name: "NSU INTER UNIVERSITY SPORTS CARNIVAL",
  season: "SEASON 3 — 2026",
  tagline: "Where Bangladesh's universities compete for glory.",
  startDate: "[TOURNAMENT DATE]",
  // Countdown target — placeholder date, editable
  startTimestamp: new Date("2026-12-05T09:00:00+06:00").getTime(),
  regDeadline: "[REGISTRATION DEADLINE]",
  venueCity: "[HOST CITY]",
  registrationOpen: true,
};

export const HEADLINE_STATS = [
  { value: "48+", label: "Universities" },
  { value: "07", label: "Sports" },
  { value: "৳ 4,00,000", label: "Prize Pool" },
  { value: "[DATE]", label: "Tournament Starts" },
];

export const PRIZE_POOL = "৳ 4,00,000";

export const BIG_STATS = [
  { value: "50+", label: "Universities", sub: "across Bangladesh" },
  { value: "500+", label: "Athletes", sub: "competing for glory" },
  { value: "07", label: "Sports", sub: "battlegrounds" },
  { value: "100+", label: "Matches", sub: "across the season" },
  { value: "03", label: "Venues", sub: "premium facilities" },
  { value: "10K+", label: "Expected Audience", sub: "live & online" },
];

export const SPORTS = [
  {
    name: "Basketball",
    icon: "🏀",
    teams: 24,
    format: "5v5 · Knockout",
    status: "OPEN",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=1000&fit=crop&auto=format",
    desc: "Fast breaks and buzzer-beaters under the lights.",
  },
  {
    name: "Football",
    icon: "⚽",
    teams: 32,
    format: "11v11 · Knockout",
    status: "OPEN",
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=1000&fit=crop&auto=format",
    desc: "The beautiful game, university pride on the line.",
  },
  {
    name: "Cricket",
    icon: "🏏",
    teams: 28,
    format: "T20 · Knockout",
    status: "OPEN",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=1000&fit=crop&auto=format",
    desc: "Bangladesh's passion, played for the title.",
  },
  {
    name: "Volleyball",
    icon: "🏐",
    teams: 18,
    format: "6v6 · Best of 5",
    status: "OPEN",
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=1000&fit=crop&auto=format",
    desc: "Power, precision and relentless rallies.",
  },
  {
    name: "Badminton",
    icon: "🏸",
    teams: 40,
    format: "Singles + Doubles",
    status: "OPEN",
    img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=1000&fit=crop&auto=format",
    desc: "Lightning reflexes at the net.",
  },
  {
    name: "Table Tennis",
    icon: "🏓",
    teams: 36,
    format: "Singles + Doubles",
    status: "FILLING",
    img: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=1000&fit=crop&auto=format",
    desc: "Blink and you'll miss the winning shot.",
  },
  {
    name: "E-Sports",
    icon: "🎮",
    teams: 30,
    format: "5v5 · Knockout",
    status: "FILLING",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop&auto=format",
    desc: "The newest battleground, packed arenas.",
  },
];

export const FIXTURES = [
  { no: "M-101", date: "[DATE]", time: "10:00", sport: "Football", venue: "NSU Outdoor Ground", a: "North South Univ.", b: "BUET", status: "UPCOMING" },
  { no: "M-102", date: "[DATE]", time: "12:30", sport: "Basketball", venue: "NSU Indoor Ground", a: "IUB", b: "BRAC Univ.", status: "LIVE" },
  { no: "M-103", date: "[DATE]", time: "15:00", sport: "Cricket", venue: "NSU Outdoor Ground", a: "Dhaka Univ.", b: "AIUB", status: "UPCOMING" },
  { no: "M-104", date: "[DATE]", time: "17:30", sport: "Volleyball", venue: "NSU Indoor Ground", a: "EWU", b: "UIU", status: "COMPLETED" },
  { no: "M-105", date: "[DATE]", time: "19:00", sport: "E-Sports", venue: "Bashundhara Sports Complex", a: "SUST", b: "CUET", status: "POSTPONED" },
  { no: "M-106", date: "[DATE]", time: "09:00", sport: "Badminton", venue: "NSU Indoor Ground", a: "RUET", b: "KUET", status: "UPCOMING" },
];

export const RESULTS = [
  { sport: "Football", a: "North South Univ.", sa: 3, b: "AIUB", sb: 1, date: "[DATE]", venue: "NSU Outdoor Ground" },
  { sport: "Basketball", a: "IUB", sa: 78, b: "BRAC Univ.", sb: 71, date: "[DATE]", venue: "NSU Indoor Ground" },
  { sport: "Cricket", a: "Dhaka Univ.", sa: 164, b: "BUET", sb: 158, date: "[DATE]", venue: "NSU Outdoor Ground" },
  { sport: "Volleyball", a: "EWU", sa: 3, b: "UIU", sb: 2, date: "[DATE]", venue: "NSU Indoor Ground" },
];

export const STANDINGS = [
  { rank: 1, uni: "North South University", p: 8, w: 7, l: 1, d: 0, pts: 21, sd: "+34" },
  { rank: 2, uni: "BUET", p: 8, w: 6, l: 1, d: 1, pts: 19, sd: "+28" },
  { rank: 3, uni: "IUB", p: 8, w: 6, l: 2, d: 0, pts: 18, sd: "+22" },
  { rank: 4, uni: "BRAC University", p: 8, w: 5, l: 2, d: 1, pts: 16, sd: "+15" },
  { rank: 5, uni: "Dhaka University", p: 8, w: 4, l: 3, d: 1, pts: 13, sd: "+9" },
  { rank: 6, uni: "AIUB", p: 8, w: 3, l: 4, d: 1, pts: 10, sd: "-4" },
  { rank: 7, uni: "East West University", p: 8, w: 2, l: 5, d: 1, pts: 7, sd: "-12" },
  { rank: 8, uni: "UIU", p: 8, w: 1, l: 6, d: 1, pts: 4, sd: "-21" },
];

export const LIVE_MATCHES = [
  { sport: "Basketball", a: "IUB", sa: 64, b: "BRAC Univ.", sb: 59, clock: "Q4 · 04:12", venue: "NSU Indoor Ground" },
  { sport: "Football", a: "SUST", sa: 1, b: "CUET", sb: 1, clock: "72'", venue: "NSU Outdoor Ground" },
  { sport: "E-Sports", a: "KUET", sa: 1, b: "RUET", sb: 0, clock: "Map 2 · Live", venue: "Bashundhara Sports Complex" },
];

export const JOURNEY = [
  { title: "REGISTRATION", state: "done", desc: "Universities & teams sign up" },
  { title: "TEAM VERIFICATION", state: "done", desc: "Documents & eligibility check" },
  { title: "FIXTURES RELEASED", state: "active", desc: "Match-ups & schedule published" },
  { title: "KNOCKOUT ROUNDS", state: "todo", desc: "Single elimination — win or go home" },
  { title: "FINALS", state: "todo", desc: "The last stand" },
  { title: "CHAMPIONS CROWNED", state: "todo", desc: "Glory decided" },
];

export const VENUES = [
  { name: "NSU Outdoor Ground", loc: "NSU Campus, Bashundhara R/A, Dhaka", sports: "Football · Cricket", cap: "[CAPACITY]", img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=560&fit=crop&auto=format" },
  { name: "NSU Indoor Ground", loc: "NSU Campus, Bashundhara R/A, Dhaka", sports: "Basketball · Volleyball · Badminton · Table Tennis", cap: "[CAPACITY]", img: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&h=560&fit=crop&auto=format" },
  { name: "Bashundhara Sports Complex", loc: "Bashundhara R/A, Dhaka", sports: "E-Sports · Indoor Events", cap: "[CAPACITY]", img: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&h=560&fit=crop&auto=format" },
];

export const NEWS = [
  { cat: "Registration", date: "[DATE]", title: "Season 3 registration is officially open", desc: "Universities across Bangladesh can now register their teams for the biggest edition yet.", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=520&fit=crop&auto=format" },
  { cat: "Tournament News", date: "[DATE]", title: "Eight sports confirmed for the 2026 carnival", desc: "From football to e-sports, the battlegrounds are set for a record-breaking season.", img: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=520&fit=crop&auto=format" },
  { cat: "Announcements", date: "[DATE]", title: "New premium venues join the roster", desc: "Six world-class facilities will host matches throughout the tournament.", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=520&fit=crop&auto=format" },
];

export const FAQS = [
  { q: "How can my university register?", a: "Use the “Register Your University” flow. Complete the six guided steps — university info, team details, sports selection, documents, review, and confirmation. You'll receive a Registration ID instantly." },
  { q: "What sports are available?", a: "Season 3 features multiple sports including football, basketball, cricket, volleyball, badminton, table tennis, chess and e-sports. The confirmed list is shown in the “Choose Your Battleground” section." },
  { q: "What is the registration deadline?", a: "Registration closes on [REGISTRATION DEADLINE]. Late entries cannot be guaranteed a spot in the fixtures." },
  { q: "Is there a registration fee?", a: "No — NSU IUSC Season 3 is completely free to enter. There are no registration or participation fees for any sport." },
  { q: "Where will matches be held?", a: "Matches take place across our confirmed premium venues. See the “Where The Action Happens” section for details and maps." },
  { q: "How are fixtures determined?", a: "Fixtures are generated after team verification, using a seeded draw. They are published in the Tournament Hub under Fixtures." },
  { q: "What documents are required?", a: "Each team needs student verification, a university authorization letter, and player ID documents. Upload them in Step 04 of registration." },
  { q: "How can I contact NSU IUSC?", a: "Use the “Chat with NSU IUSC” button anytime to reach a real NSU IUSC Club member, or email [CONTACT EMAIL] / call [CONTACT NUMBER]." },
];

export const SPONSORS = {
  "TITLE PARTNER": ["[TITLE PARTNER]"],
  "GOLD PARTNERS": ["[GOLD 1]", "[GOLD 2]", "[GOLD 3]"],
  "SILVER PARTNERS": ["[SILVER 1]", "[SILVER 2]", "[SILVER 3]", "[SILVER 4]"],
  "EVENT PARTNERS": ["[EVENT 1]", "[EVENT 2]", "[EVENT 3]", "[EVENT 4]", "[EVENT 5]"],
} as const;

export const CHAT_QUICK = [
  "Registration Help",
  "Is it free to join?",
  "Tournament Rules",
  "Fixtures & Schedule",
  "Venue Information",
  "Technical Support",
  "Talk to a Support Member",
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Tournament", href: "#tournament" },
  { label: "Sports", href: "#sports" },
  { label: "Schedule", href: "#hub" },
  { label: "Results", href: "#hub" },
  { label: "News", href: "#news" },
];
