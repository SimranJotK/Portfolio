import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "./Particles";

const NAME = "SIMRANJOT KAUR KALE";

interface LoadingSceneProps {
  onFinish: () => void;
}

export function LoadingScene({ onFinish }: LoadingSceneProps) {
  const [typed, setTyped] = useState("");
  const [pct, setPct] = useState(0);
  const [flying, setFlying] = useState(false);

  // Typing
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(NAME.slice(0, i));
      if (i >= NAME.length) clearInterval(id);
    }, 85);
    return () => clearInterval(id);
  }, []);

  // Loading percentage
  useEffect(() => {
    const start = performance.now();
    const total = 4200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / total) * 100);
      setPct(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setFlying(true);
        setTimeout(onFinish, 1500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.45 0.22 0) 0%, oklch(0.18 0.10 10) 55%, oklch(0.08 0.04 10) 100%)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Particles count={70} />

      {/* Glow circle */}
      <motion.div
        className={"relative flex items-center justify-center rounded-full animate-pulse-glow " + (flying ? "" : "")}
        style={{
          width: "min(78vmin, 640px)",
          height: "min(78vmin, 640px)",
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.98 0.04 350) 0%, oklch(0.88 0.16 350) 35%, oklch(0.70 0.22 5) 70%, oklch(0.55 0.25 0) 100%)",
        }}
        animate={
          flying
            ? { scale: 28, opacity: 0, filter: "brightness(2.5) blur(18px)" }
            : { scale: [1, 1.03, 1] }
        }
        transition={flying ? { duration: 1.5, ease: [0.7, 0, 0.84, 0] } : { duration: 4, repeat: Infinity }}
      >
        {/* Rotating ring */}
        <span
          className="absolute inset-[-6%] rounded-full animate-rotate-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, oklch(1 0 0 / 0.55) 8%, transparent 18%, transparent 50%, oklch(0.84 0.14 60 / 0.7) 58%, transparent 70%, transparent 100%)",
            WebkitMask:
              "radial-gradient(circle, transparent 62%, #000 63%, #000 70%, transparent 71%)",
            mask: "radial-gradient(circle, transparent 62%, #000 63%, #000 70%, transparent 71%)",
          }}
        />
        {/* Inner content */}
        <div className="relative z-10 px-8 text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.5em] text-white/70">
            Welcome to the dream
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {typed}
            <span className="ml-1 inline-block w-[3px] h-[0.9em] align-middle bg-white" style={{ animation: "blink-caret 1s steps(1) infinite" }} />
          </h1>
          <p className="mt-6 font-serif-elegant italic text-white/80">
            Dream Developer World
          </p>
        </div>
      </motion.div>

      {/* Loading bar */}
      <AnimatePresence>
        {!flying && (
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[min(86vw,520px)] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="mb-3 flex items-baseline justify-between font-serif-elegant text-white/80 tracking-[0.3em] text-xs uppercase">
              <span>Loading the mansion</span>
              <span className="text-gold-shine font-display text-base">{pct}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full"
                style={{
                  width: pct + "%",
                  background:
                    "linear-gradient(90deg, oklch(0.93 0.10 80), oklch(0.78 0.22 10), oklch(0.93 0.10 80))",
                  boxShadow: "0 0 18px oklch(0.84 0.14 60 / 0.8)",
                  transition: "width 120ms linear",
                }}
              />
            </div>
            <p className="mt-4 text-white/50 font-serif-elegant text-sm">
              Polishing the marble · lighting the chandeliers · arranging the roses
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
