import { useEffect, useRef, useState } from "react";

export function Whiteboard() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#ff2e88");
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const drawing = useRef(false);
  const history = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  useEffect(() => {
    const c = ref.current!;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      const ctx = c.getContext("2d")!;
      ctx.scale(dpr, dpr);
      try { ctx.putImageData(data, 0, 0); } catch { /* fresh */ }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getCtx = () => ref.current!.getContext("2d")!;
  const snapshot = () => {
    const c = ref.current!;
    history.current.push(getCtx().getImageData(0, 0, c.width, c.height));
    if (history.current.length > 30) history.current.shift();
    redoStack.current = [];
  };

  const pos = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const down = (e: React.PointerEvent) => {
    snapshot();
    drawing.current = true;
    const { x, y } = pos(e);
    const ctx = getCtx();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    const ctx = getCtx();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const up = () => { drawing.current = false; };

  const undo = () => {
    const c = ref.current!;
    const ctx = getCtx();
    const prev = history.current.pop();
    if (!prev) return;
    redoStack.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.putImageData(prev, 0, 0);
  };
  const redo = () => {
    const c = ref.current!;
    const ctx = getCtx();
    const next = redoStack.current.pop();
    if (!next) return;
    history.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.putImageData(next, 0, 0);
  };
  const clearAll = () => {
    snapshot();
    const c = ref.current!;
    getCtx().clearRect(0, 0, c.width, c.height);
  };
  const save = () => {
    const url = ref.current!.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "barbie-dreamhouse-doodle.png";
    a.click();
  };

  const markers = ["#ff2e88", "#ffd1e8", "#ffffff", "#ffd76b", "#9b5cff", "#1f2937"];

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-wrap items-center gap-3 glass-card rounded-2xl px-4 py-3">
        <span className="font-display text-white/90 text-sm md:text-base mr-2">Markers</span>
        {markers.map((c) => (
          <button
            key={c}
            onClick={() => { setColor(c); setTool("pen"); }}
            className={"h-8 w-8 rounded-full ring-2 transition-transform hover:scale-110 " + (color === c && tool === "pen" ? "ring-white" : "ring-white/20")}
            style={{ background: c, boxShadow: `0 0 12px ${c}` }}
            aria-label={"Marker " + c}
          />
        ))}
        <div className="mx-2 h-6 w-px bg-white/20" />
        <button
          onClick={() => setTool("eraser")}
          className={"px-3 py-1.5 rounded-full text-sm font-serif-elegant tracking-wider " + (tool === "eraser" ? "bg-white text-black" : "text-white/80 hover:bg-white/10")}
        >Eraser</button>
        <label className="flex items-center gap-2 text-white/80 text-sm">
          Size
          <input type="range" min={2} max={28} value={size} onChange={(e) => setSize(+e.target.value)} className="accent-rose w-24" />
        </label>
        <div className="ml-auto flex gap-2">
          <button onClick={undo} className="px-3 py-1.5 rounded-full text-sm text-white/85 hover:bg-white/10">Undo</button>
          <button onClick={redo} className="px-3 py-1.5 rounded-full text-sm text-white/85 hover:bg-white/10">Redo</button>
          <button onClick={clearAll} className="px-3 py-1.5 rounded-full text-sm text-white/85 hover:bg-white/10">Clear</button>
          <button onClick={save} className="px-4 py-1.5 rounded-full text-sm bg-rose text-white glow-rose hover:scale-105 transition">Save</button>
        </div>
      </div>
      <div className="relative flex-1 rounded-3xl overflow-hidden glass-card">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, oklch(0.99 0.01 80) 0%, oklch(0.95 0.04 350) 100%)",
        }} />
        <canvas
          ref={ref}
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
        />
      </div>
    </div>
  );
}
