import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScene } from "@/components/dreamhouse/LoadingScene";
import { ExteriorScene } from "@/components/dreamhouse/ExteriorScene";
import { MansionExperience } from "@/components/dreamhouse/MansionExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simranjot Kaur Kale — Dream Developer World" },
      { name: "description", content: "An interactive luxury Barbie Dream House portfolio for software engineer Simranjot Kaur Kale." },
      { property: "og:title", content: "Simranjot Kaur Kale — Dream Developer World" },
      { property: "og:description", content: "Walk through a cinematic Barbie Dream House where every room reveals my work." },
    ],
  }),
  component: Index,
});

type Stage = "loading" | "exterior" | "inside";

function Index() {
  const [stage, setStage] = useState<Stage>("loading");

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScene key="loading" onFinish={() => setStage("exterior")} />
        )}
        {stage === "exterior" && (
          <ExteriorScene key="exterior" onEnter={() => setStage("inside")} />
        )}
        {stage === "inside" && <MansionExperience key="inside" />}
      </AnimatePresence>
    </main>
  );
}
