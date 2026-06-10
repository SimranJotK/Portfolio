import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "./Particles";
import exterior from "@/assets/dreamhouse-exterior.jpg";

interface ExteriorSceneProps {
  onEnter: () => void;
}

export function ExteriorScene({ onEnter }: ExteriorSceneProps) {
  const [entering, setEntering] = useState(false);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(onEnter, 1700);
  };

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black">
      {/* Sky gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.88 0.08 30) 0%, oklch(0.78 0.14 10) 45%, oklch(0.55 0.20 0) 100%)",
        }}
      />

      {/* Mansion image with subtle parallax breathing */}
      <motion.img
        src={exterior}
        alt="Luxury Barbie Dream House mansion exterior"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.1 }}
        animate={
          entering
            ? { scale: 4.2, filter: "brightness(1.8) blur(8px)" }
            : { scale: [1.08, 1.12, 1.08] }
        }
        transition={
          entering
            ? { duration: 1.7, ease: [0.7, 0, 0.84, 0] }
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Warm sunlight haze */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-rose/30 mix-blend-soft-light" />
      <Particles count={50} />

      {/* Title */}
      <AnimatePresence>
        {!entering && (
          <motion.div
            className="absolute inset-x-0 top-[8%] z-10 px-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <p className="font-serif-elegant tracking-[0.5em] uppercase text-white/80 text-xs md:text-sm">
              Now arriving at
            </p>
            <h1
              className="mt-3 font-display text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-[0_4px_30px_oklch(0.3_0.15_10_/_0.7)]"
              style={{
                background:
                  "linear-gradient(180deg, #fff 0%, oklch(0.95 0.08 350) 60%, oklch(0.82 0.18 10) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Simranjot's Dream Developer World
            </h1>
            <p className="mt-4 font-serif-elegant italic text-white/85 md:text-lg">
              A luxury Barbie Dream House where every room tells my story.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enter button */}
      <AnimatePresence>
        {!entering && (
          <motion.div
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <button
              onClick={handleEnter}
              className="group relative px-10 py-5 rounded-full glass-card text-white font-display tracking-widest uppercase text-sm md:text-base transition-transform duration-500 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full animate-shimmer opacity-60" />
              <span className="relative flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose glow-rose animate-pulse-glow" />
                Open the front doors
                <span className="text-gold-shine">→</span>
              </span>
            </button>
            <p className="mt-4 text-center text-white/60 font-serif-elegant text-xs tracking-[0.3em] uppercase">
              The mansion is waiting
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* White flash on fly-through */}
      <AnimatePresence>
        {entering && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.9, 1] }}
            transition={{ duration: 1.7, times: [0, 0.5, 0.85, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
