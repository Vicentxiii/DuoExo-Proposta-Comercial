/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Settings2, Cpu, RefreshCw, Eye, Sparkles } from "lucide-react";
import { LabParameter } from "../types";

export default function LabShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [parameters, setParameters] = useState<LabParameter[]>([
    { id: "speed", name: "Velocidade de Fluxo", value: 1.2, min: 0.1, max: 4.0, step: 0.1, unit: "px/f" },
    { id: "size", name: "Tamanho dos Nós", value: 2.0, min: 0.5, max: 6.0, step: 0.5, unit: "px" },
    { id: "mouseRadius", name: "Raio de Gravidade", value: 150, min: 50, max: 300, step: 10, unit: "px" },
    { id: "noise", name: "Turbulência (Frequência)", value: 0.005, min: 0.001, max: 0.02, step: 0.001, unit: "Hz" },
  ]);

  const [colorAccent, setColorAccent] = useState<"blue" | "emerald" | "cosmic" | "aurora">("blue");
  const [activeCount, setActiveCount] = useState(600);
  const [fps, setFps] = useState(60);

  // References to keep render loop fast without triggering unnecessary React renders
  const paramsRef = useRef({
    speed: 1.2,
    size: 2.0,
    mouseRadius: 150,
    noise: 0.005,
    colorAccent: "blue",
    mouse: { x: -1000, y: -1000, active: false }
  });

  // Keep ref synchronized with parameter state
  useEffect(() => {
    const currentParams = parameters.reduce((acc, param) => {
      acc[param.id] = param.value;
      return acc;
    }, {} as Record<string, number>);

    paramsRef.current = {
      ...paramsRef.current,
      ...currentParams,
      colorAccent,
    };
  }, [parameters, colorAccent]);

  // Main high-performance simulation canvas lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsInterval = lastTime;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      colorAngle: number;
    }

    let particles: Particle[] = [];

    // Resize handler
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // Initialize particles based on canvas size
      initParticles(width, height);
    };

    const initParticles = (w: number, h: number) => {
      particles = [];
      const count = 600; // Optimal particle count
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          colorAngle: Math.random() * 360
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse input relative to canvas coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      paramsRef.current.mouse.x = e.clientX - rect.left;
      paramsRef.current.mouse.y = e.clientY - rect.top;
      paramsRef.current.mouse.active = true;
    };

    const handleMouseLeave = () => {
      paramsRef.current.mouse.x = -1000;
      paramsRef.current.mouse.y = -1000;
      paramsRef.current.mouse.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Particle vector simulation using dynamic trigonometric field values (Flow-field vector mathematics)
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const p = paramsRef.current;

      // Draw dark semi-transparent overlay to create smooth motion blur trails
      ctx.fillStyle = "rgba(7, 7, 9, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Measure Frame Rate (FPS)
      const now = performance.now();
      frameCount++;
      if (now - fpsInterval >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - fpsInterval)));
        frameCount = 0;
        fpsInterval = now;
      }

      // Draw aesthetic particle lines
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // 1. Vector Flow Field Mathematics: θ = sin(x * f) + cos(y * f)
        const angle = (Math.sin(pt.x * p.noise) + Math.cos(pt.y * p.noise)) * Math.PI * 2;
        
        // Target velocity
        const tx = Math.cos(angle) * p.speed;
        const ty = Math.sin(angle) * p.speed;

        // Smoothly interpolate current velocity towards target velocity (lerp)
        pt.vx += (tx - pt.vx) * 0.08;
        pt.vy += (ty - pt.vy) * 0.08;

        // 2. Interactive Gravitational Pull (Mouse avoidance/attraction physics)
        if (p.mouse.active) {
          const dx = p.mouse.x - pt.x;
          const dy = p.mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.mouseRadius) {
            const force = (p.mouseRadius - dist) / p.mouseRadius;
            // Push particles away (repulsion force) with friction
            pt.vx -= (dx / dist) * force * 0.8;
            pt.vy -= (dy / dist) * force * 0.8;
          }
        }

        // Apply updated velocities
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap particles around borders
        if (pt.x < 0) pt.x = w;
        if (pt.x > w) pt.x = 0;
        if (pt.y < 0) pt.y = h;
        if (pt.y > h) pt.y = 0;

        // Establish accent palette gradient mapping
        let color = "rgba(59, 130, 246, " + pt.alpha + ")";
        if (p.colorAccent === "emerald") {
          color = "rgba(16, 185, 129, " + pt.alpha + ")";
        } else if (p.colorAccent === "cosmic") {
          color = "rgba(239, 68, 68, " + pt.alpha + ")";
        } else if (p.colorAccent === "aurora") {
          // Dynamic color cycle based on particle angle
          color = `hsla(${pt.colorAngle}, 80%, 65%, ${pt.alpha})`;
          pt.colorAngle = (pt.colorAngle + 0.2) % 360;
        }

        // Render actual particle node
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Optional connections: render micro-neural lines between nearby nodes
        if (i < particles.length - 1 && i % 15 === 0) {
          const nextPt = particles[i + 1];
          const dx = nextPt.x - pt.x;
          const dy = nextPt.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.strokeStyle = p.colorAccent === "blue" 
              ? `rgba(59, 130, 246, ${(1 - dist/40) * 0.1})`
              : p.colorAccent === "emerald"
              ? `rgba(16, 185, 129, ${(1 - dist/40) * 0.1})`
              : p.colorAccent === "cosmic"
              ? `rgba(239, 68, 68, ${(1 - dist/40) * 0.1})`
              : `hsla(${pt.colorAngle}, 80%, 65%, ${(1 - dist/40) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleParamChange = (id: string, value: number) => {
    setParameters((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value } : p))
    );
  };

  const handleReset = () => {
    setParameters([
      { id: "speed", name: "Velocidade de Fluxo", value: 1.2, min: 0.1, max: 4.0, step: 0.1, unit: "px/f" },
      { id: "size", name: "Tamanho dos Nós", value: 2.0, min: 0.5, max: 6.0, step: 0.5, unit: "px" },
      { id: "mouseRadius", name: "Raio de Gravidade", value: 150, min: 50, max: 300, step: 10, unit: "px" },
      { id: "noise", name: "Turbulência (Frequência)", value: 0.005, min: 0.001, max: 0.02, step: 0.001, unit: "Hz" },
    ]);
    setColorAccent("blue");
  };

  return (
    <section id="lab" className="py-32 px-4 md:px-8 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-emerald tracking-widest uppercase block mb-3">
              Laboratório Experimental
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
              Laboratório de Shaders.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md font-light text-sm md:text-base leading-relaxed">
            Interaja diretamente com o motor matemático de render. Ajuste vetores de aceleração, gravitacionais e frequências ondulatórias em tempo real.
          </p>
        </div>

        {/* Lab Panel Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Slate (Left 1 Col) */}
          <div className="p-8 rounded-3xl bg-brand-dark/40 border border-white/5 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Settings2 className="w-5 h-5 text-brand-accent" />
                <h3 className="font-display font-semibold text-lg text-white">Configurações de Campo</h3>
              </div>

              {/* Slider list */}
              <div className="space-y-6">
                {parameters.map((param) => (
                  <div key={param.id} className="space-y-2">
                    <div className="flex justify-between font-mono text-[11px] tracking-wide text-zinc-400">
                      <span>{param.name}</span>
                      <span className="text-brand-light font-bold">
                        {param.value} <span className="text-zinc-600">{param.unit}</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={param.value}
                      onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-accent focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Color spectrum presets */}
              <div className="mt-8">
                <span className="font-mono text-[11px] tracking-wide text-zinc-400 block mb-3">
                  Paleta Espectral
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "blue", label: "Glow Azul", bg: "bg-blue-500" },
                    { id: "emerald", label: "Esmeralda", bg: "bg-emerald-500" },
                    { id: "cosmic", label: "Cósmico", bg: "bg-red-500" },
                    { id: "aurora", label: "Aurora", bg: "bg-gradient-to-r from-teal-400 to-pink-400" },
                  ].map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setColorAccent(color.id as any)}
                      className={`py-2 rounded-xl text-[10px] font-mono font-medium border transition-all duration-300 focus:outline-none flex flex-col items-center gap-1.5 ${
                        colorAccent === color.id
                          ? "bg-white/5 border-white/20 text-white"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${color.bg}`} />
                      <span>{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry Actions */}
            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Padrões</span>
              </button>

              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 bg-brand-dark px-2 py-1 rounded">
                <span>WebGL emulation</span>
              </div>
            </div>
          </div>

          {/* Render Area + Telemetry HUD Overlay (Right 2 Cols) */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-brand-dark border border-white/5 group aspect-[16/10] lg:aspect-auto min-h-[400px]" ref={containerRef}>
            {/* Live Interactive Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover block cursor-crosshair"
            />

            {/* Dynamic Telemetry HUD Overlay (Top Left Corner) */}
            <div className="absolute top-6 left-6 pointer-events-none z-10 font-mono text-[10px] space-y-1 bg-brand-dark/80 border border-white/5 px-4 py-3 rounded-xl backdrop-blur-md text-zinc-400 select-none">
              <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-brand-emerald animate-pulse" />
                <span>Diagnostics Terminal</span>
              </div>
              <div>Frame Render Latency: <span className="text-brand-accent font-bold">~1.2ms</span></div>
              <div>Renderer Rate: <span className="text-brand-emerald font-bold">{fps} FPS</span></div>
              <div>Calculated Nodes: <span className="text-white font-bold">{activeCount} instances</span></div>
              <div>Vector Equation: <span className="text-zinc-500 italic">θ = sin(x*f) + cos(y*f)</span></div>
            </div>

            {/* Custom Interactive Prompt (Bottom Center) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-dark/60 border border-white/5 backdrop-blur-sm text-[10px] font-mono text-zinc-400 animate-pulse">
              <Eye className="w-3.5 h-3.5 text-brand-accent" />
              <span>Passe o cursor sobre o campo para repelir os nós</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
