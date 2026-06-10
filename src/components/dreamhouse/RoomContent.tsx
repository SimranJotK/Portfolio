import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portrait from "@/assets/portrait.png";
import { Whiteboard } from "./Whiteboard";
import type { RoomId } from "./rooms";

/* ---------- Shared bits ---------- */

function RoomTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-8">
      <p className="font-serif-elegant tracking-[0.5em] uppercase text-white/60 text-xs">{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl md:text-6xl font-extrabold"
        style={{
          background: "linear-gradient(180deg,#fff,oklch(0.86 0.12 350))",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>{title}</h2>
      {subtitle && <p className="mt-3 font-serif-elegant italic text-white/75">{subtitle}</p>}
    </div>
  );
}

/* ---------- Foyer ---------- */

export function FoyerContent() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Grand Foyer" title="Hello, I'm Simranjot" subtitle="Software engineer · backend craftsperson · cloud explorer" />
      <div className="grid gap-10 md:grid-cols-[300px_1fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-3 rounded-[28px] animate-pulse-glow" />
          <div className="relative rounded-[24px] p-2"
               style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
            <img src={portrait} alt="Portrait of Simranjot Kaur Kale" className="rounded-[18px] w-[280px] h-[380px] object-cover object-top" />
          </div>
          <p className="mt-3 text-center font-serif-elegant italic text-white/80">— The lady of the house —</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <p className="font-serif-elegant text-lg md:text-xl leading-relaxed text-white/85">
            Welcome to my dream developer world. I'm a Computer Science undergraduate at Chandigarh University who lives somewhere between
            <span className="text-rose-shine font-semibold"> Java backends</span>,
            <span className="text-gold-shine font-semibold"> AWS clouds</span>, and a very pink imagination.
          </p>
          <p className="mt-4 text-white/70 leading-relaxed">
            Every door in this mansion leads to a part of my journey — pick a room from the floor plan, or
            keep walking through the hallways. Mind the rose petals.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            {[
              ["7.85", "CGPA"],
              ["200+", "DSA solved"],
              ["150+", "Day streak"],
              ["3", "Cloud projects"],
            ].map(([n, l]) => (
              <div key={l} className="glass-card rounded-2xl p-4">
                <div className="font-display text-3xl text-gold-shine">{n}</div>
                <div className="text-white/60 text-xs uppercase tracking-[0.25em] mt-1">{l}</div>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Studio: Skills ---------- */

const SKILLS = [
  { name: "Java", desc: "My first love. OOP, design patterns, and clean abstractions." },
  { name: "Spring Boot", desc: "REST APIs, microservices, Apache Maven and dependency-injected joy." },
  { name: "React", desc: "Building interactive frontends like the one you're touring right now." },
  { name: "AWS", desc: "EC2, deployment, cloud-native architecture for scalable apps." },
  { name: "JavaScript", desc: "From DOM tricks to full-stack apps." },
  { name: "MySQL", desc: "Schemas, indexes, JDBC, and queries that actually use them." },
  { name: "Git & GitHub", desc: "Branches, PRs, code reviews — my daily ritual." },
  { name: "REST APIs", desc: "JSON, versioning, status codes and contracts that don't lie." },
  { name: "Cloud Computing", desc: "Distributed systems, secure communication, federated learning." },
];

export function StudioContent() {
  const [active, setActive] = useState<typeof SKILLS[number] | null>(null);
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Developer Studio" title="Skills, on display" subtitle="Tap a floating crystal to learn more" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {SKILLS.map((s, i) => (
          <motion.button
            key={s.name}
            onClick={() => setActive(s)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="group relative glass-card rounded-3xl p-6 text-left overflow-hidden"
            style={{ animation: `float-slow ${6 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
          >
            <span className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-50 blur-2xl"
                  style={{ background: "var(--gradient-rose)" }} />
            <div className="relative">
              <div className="font-display text-2xl text-white">{s.name}</div>
              <div className="mt-1 font-serif-elegant text-white/60 text-sm italic">click to reveal</div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass-card max-w-md rounded-3xl p-8 text-center"
              initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif-elegant tracking-[0.4em] uppercase text-white/60 text-xs">Skill spotlight</p>
              <h3 className="mt-2 font-display text-4xl text-gold-shine">{active.name}</h3>
              <p className="mt-4 text-white/85 leading-relaxed">{active.desc}</p>
              <button onClick={() => setActive(null)} className="mt-6 px-5 py-2 rounded-full bg-rose text-white glow-rose">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Projects ---------- */

const PROJECTS = [
  {
    name: "AQI Prediction Platform",
    period: "Jan 2026 – Present",
    tagline: "Cloud-based air quality monitoring on AWS EC2",
    bullets: [
      "Deployed an AQI monitoring platform on AWS using EC2 for scalable data processing.",
      "Applied cloud deployment + data analytics for a reliable environmental monitoring system.",
      "Engineered with unit testing and modular architecture.",
    ],
    stack: ["AWS EC2", "Python", "Regression", "Unit Testing"],
    color: "oklch(0.78 0.18 160)",
  },
  {
    name: "Quantum Key Distribution",
    period: "May 2025 – Nov 2025",
    tagline: "Secure federated learning over a quantum-protected channel",
    bullets: [
      "Designed a cloud-based federated learning framework using distributed systems.",
      "Built scalable cloud architecture with data protection mechanisms.",
      "Improved system security and reliability through secure communication concepts.",
    ],
    stack: ["Cloud", "Federated Learning", "Security", "Distributed Systems"],
    color: "oklch(0.70 0.20 270)",
  },
  {
    name: "Neuro Mirroring Interfaces",
    period: "Jan 2025 – Apr 2025",
    tagline: "Backend for a mental-health mood-tracking platform",
    bullets: [
      "Developed backend services with Java, Spring Boot, Maven, REST APIs, OOP and design patterns.",
      "Implemented API integration with Git/GitHub and Agile practices.",
      "Architected mood tracking and user management modules.",
    ],
    stack: ["Java", "Spring Boot", "Maven", "REST", "Agile"],
    color: "oklch(0.78 0.20 350)",
  },
];

export function ProjectsContent() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Project Wing" title="Walk into my worlds" subtitle="Each room below is a project — peek inside" />
      <div className="grid gap-8 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative glass-card rounded-3xl p-6 overflow-hidden hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-x-0 top-0 h-1 opacity-80" style={{ background: p.color }} />
            <div className="font-serif-elegant text-xs uppercase tracking-[0.3em] text-white/60">{p.period}</div>
            <h3 className="mt-2 font-display text-2xl text-white">{p.name}</h3>
            <p className="mt-1 italic text-white/70">{p.tagline}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/85 border border-white/15">{t}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ---------- Trophy ---------- */

const TROPHIES = [
  { title: "NPTEL Cloud Computing", note: "Online certification — cloud fundamentals & deployment." },
  { title: "Infosys Springboard DSA", note: "DSA using Java — core data structures and algorithms." },
  { title: "200+ DSA Problems", note: "Solved across LeetCode and GeeksforGeeks." },
  { title: "150+ Day Coding Streak", note: "Daily consistency across coding platforms." },
];

export function TrophyContent() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Achievement Gallery" title="Trophies, under glass" subtitle="Hover a case to see the story" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TROPHIES.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group relative rounded-3xl glass-card p-6 text-center hover:-translate-y-2 transition"
          >
            <div className="mx-auto w-full aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden"
                 style={{ background: "linear-gradient(180deg, oklch(0.35 0.12 350), oklch(0.18 0.06 10))" }}>
              <div className="absolute inset-0 animate-shimmer opacity-50" />
              <div
                className="text-7xl"
                style={{ filter: "drop-shadow(0 0 18px oklch(0.93 0.10 80 / 0.9))" }}
              >🏆</div>
            </div>
            <h3 className="mt-4 font-display text-lg text-gold-shine">{t.title}</h3>
            <p className="mt-1 text-white/70 text-sm">{t.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Certification museum ---------- */

const CERTS = [
  { title: "NPTEL Cloud Computing", issuer: "NPTEL", year: "2024" },
  { title: "Infosys DSA using Java", issuer: "Infosys Springboard", year: "2024" },
  { title: "Cloud Computing Fundamentals", issuer: "Self / Coursework", year: "2025" },
  { title: "Java & Spring Boot", issuer: "Coursework / Practice", year: "2025" },
];

export function CertificationsContent() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Certification Museum" title="Curated under museum lights" subtitle="Each frame is a chapter of study" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-2xl p-2 glow-gold"
            style={{ background: "var(--gradient-gold)" }}
          >
            <div className="rounded-xl p-6 h-full bg-[oklch(0.18_0.04_10)] text-center flex flex-col justify-between">
              <div>
                <div className="font-serif-elegant tracking-[0.3em] uppercase text-white/50 text-[10px]">Certificate</div>
                <h3 className="mt-3 font-display text-xl text-white">{c.title}</h3>
              </div>
              <div className="mt-6 text-white/65 text-sm">
                <div>{c.issuer}</div>
                <div className="text-gold-shine font-display text-lg mt-1">{c.year}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Whiteboard wrapper ---------- */

export function WhiteboardContent() {
  return (
    <div className="mx-auto max-w-6xl h-full flex flex-col px-2 py-6 md:py-10">
      <RoomTitle eyebrow="Creative Room" title="Doodle on the wall" subtitle="Yes, that wall — go on" />
      <div className="flex-1 min-h-[480px]"><Whiteboard /></div>
    </div>
  );
}

/* ---------- Contact ---------- */

export function ContactContent() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Email", value: "simranjotkaur735@gmail.com", href: "mailto:simranjotkaur735@gmail.com" },
    { label: "Phone", value: "+91 76669 61632", href: "tel:+917666961632" },
    { label: "LinkedIn", value: "linkedin.com/in/simranjotkk", href: "https://linkedin.com/in/simranjotkk" },
    { label: "GitHub", value: "github.com/SimranJotK", href: "https://github.com/SimranJotK" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-16 text-center">
      <RoomTitle eyebrow="Pink Telephone Room" title="Let's talk" subtitle="Pick up the phone — it's already ringing" />
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative mx-auto block"
      >
        <div className="absolute inset-0 -m-10 rounded-full animate-pulse-glow" />
        <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-7xl"
             style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}>
          ☎️
        </div>
        <p className="mt-4 font-serif-elegant italic text-white/85">Tap the telephone</p>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="glass-card max-w-md w-full rounded-3xl p-8"
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center font-serif-elegant tracking-[0.4em] uppercase text-white/60 text-xs">Direct line</p>
              <h3 className="mt-2 text-center font-display text-3xl text-gold-shine">Simranjot Kaur Kale</h3>
              <ul className="mt-6 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer"
                       className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition border border-white/10">
                      <span className="font-serif-elegant text-white/60 text-sm tracking-widest uppercase">{l.label}</span>
                      <span className="text-white/90 text-sm md:text-base truncate">{l.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <button onClick={() => setOpen(false)} className="mt-6 mx-auto block px-6 py-2 rounded-full bg-rose text-white glow-rose">Hang up</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Secret room ---------- */

export function SecretContent() {
  const days = 150;
  const cells = 7 * 26; // ~6 months
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      <RoomTitle eyebrow="Secret Library" title="Behind the bookshelf" subtitle="The developer's quiet hours" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-2xl text-white">Coding streak</h3>
          <p className="text-white/65 text-sm mt-1">{days}+ days and counting across LeetCode &amp; GeeksforGeeks.</p>
          <div className="mt-5 grid grid-cols-[repeat(26,1fr)] gap-1">
            {Array.from({ length: cells }).map((_, i) => {
              const active = i % 9 !== 3 && i > 30;
              const intensity = Math.min(1, (i % 11) / 10 + 0.2);
              return (
                <span key={i} className="aspect-square rounded-[3px]"
                  style={{
                    background: active
                      ? `oklch(${0.5 + intensity * 0.3} ${0.18 + intensity * 0.05} ${10})`
                      : "oklch(1 0 0 / 0.06)",
                    boxShadow: active ? "0 0 4px oklch(0.7 0.22 10 / 0.6)" : undefined,
                  }} />
              );
            })}
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-2xl text-white">Developer journey</h3>
          <ol className="mt-4 relative border-l border-white/15 pl-6 space-y-5">
            {[
              ["2023", "Started B.E. Computer Science at Chandigarh University"],
              ["2024", "NPTEL Cloud Computing · Infosys DSA in Java"],
              ["2025", "Neuro Mirroring backend · QKD federated learning"],
              ["2026", "AQI prediction platform on AWS · still shipping"],
            ].map(([y, t]) => (
              <li key={y} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-rose glow-rose" />
                <div className="font-display text-gold-shine text-lg">{y}</div>
                <div className="text-white/80">{t}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ---------- Dispatcher ---------- */

export function RoomContent({ id }: { id: RoomId }) {
  switch (id) {
    case "foyer": return <FoyerContent />;
    case "studio": return <StudioContent />;
    case "projects": return <ProjectsContent />;
    case "trophy": return <TrophyContent />;
    case "certifications": return <CertificationsContent />;
    case "whiteboard": return <WhiteboardContent />;
    case "contact": return <ContactContent />;
    case "secret": return <SecretContent />;
  }
}
