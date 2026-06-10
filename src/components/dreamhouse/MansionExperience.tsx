import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROOMS, type RoomId } from "./rooms";
import { RoomContent } from "./RoomContent";
import { Particles } from "./Particles";

interface MansionExperienceProps {
  initialRoom?: RoomId;
}

export function MansionExperience({ initialRoom = "foyer" }: MansionExperienceProps) {
  const [room, setRoom] = useState<RoomId>(initialRoom);
  const [mapOpen, setMapOpen] = useState(false);
  const current = ROOMS.find((r) => r.id === room)!;

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-black">
      {/* Backdrop with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.0, filter: "blur(14px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={current.image}
            alt={current.name + " interior"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0"
               style={{
                 background:
                   "radial-gradient(ellipse at center, transparent 0%, oklch(0.10 0.05 10 / 0.6) 60%, oklch(0.05 0.03 10 / 0.95) 100%)",
               }} />
          <div className="absolute inset-0"
               style={{
                 background: `linear-gradient(180deg, transparent 0%, ${current.accent} 0% 0%, transparent 30%)`,
                 mixBlendMode: "overlay",
                 opacity: 0.3,
               }} />
        </motion.div>
      </AnimatePresence>

      <Particles count={35} />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 md:px-8 py-5">
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-rose animate-pulse-glow" />
          <span className="font-display text-white/90 tracking-wider text-sm md:text-base">{current.name}</span>
          <span className="hidden md:inline font-serif-elegant italic text-white/55 text-sm">— {current.tagline}</span>
        </div>
        <button
          onClick={() => setMapOpen((v) => !v)}
          className="glass-card rounded-full px-4 py-2 font-serif-elegant tracking-[0.3em] text-xs uppercase text-white hover:bg-white/15 transition"
        >
          {mapOpen ? "Close map" : "Floor plan"}
        </button>
      </div>

      {/* Room content scroll area */}
      <div className="absolute inset-0 overflow-y-auto scrollbar-none pt-20 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="min-h-full"
          >
            <RoomContent id={current.id} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom hallway nav */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex justify-center pb-5 px-3">
        <div className="glass-card rounded-full px-2 py-2 flex gap-1 overflow-x-auto max-w-[95vw] scrollbar-none">
          {ROOMS.map((r) => {
            const active = r.id === room;
            return (
              <button
                key={r.id}
                onClick={() => setRoom(r.id)}
                className={
                  "shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-serif-elegant tracking-[0.2em] uppercase transition " +
                  (active ? "bg-white text-black" : "text-white/80 hover:bg-white/10")
                }
              >
                {r.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floor plan overlay */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            className="absolute inset-0 z-30 bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              className="glass-card rounded-3xl p-6 md:p-10 max-w-3xl w-full"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center font-serif-elegant tracking-[0.5em] uppercase text-white/60 text-xs">The Dream House</p>
              <h3 className="mt-1 text-center font-display text-3xl md:text-4xl text-gold-shine">Floor Plan</h3>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                {ROOMS.map((r) => {
                  const active = r.id === room;
                  return (
                    <button
                      key={r.id}
                      onClick={() => { setRoom(r.id); setMapOpen(false); }}
                      className={
                        "group rounded-2xl overflow-hidden text-left relative aspect-[4/3] " +
                        (active ? "ring-2 ring-white" : "ring-1 ring-white/15 hover:ring-white/40")
                      }
                    >
                      <img src={r.image} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-3">
                        <div className="font-display text-white text-sm md:text-base leading-tight">{r.name}</div>
                        <div className="text-white/65 text-[10px] md:text-xs italic">{r.tagline}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
