/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldCheck, Heart, Zap, Award, Sparkles, TrendingUp } from "lucide-react";

export default function StudioManifesto() {
  const manifestoPillars = [
    {
      icon: Zap,
      title: "Performance Extrema",
      desc: "Adeus atrasos de renderização. Nossas interfaces operam a 60 FPS estáveis, utilizando otimização por aceleração gráfica e re-renderizações virtuais nulas."
    },
    {
      icon: ShieldCheck,
      title: "Arquitetura Limpa (SOLID)",
      desc: "Código escalável escrito para durar. Separação estrita de lógica de controle, tipagem TypeScript rígida, modularidade total e documentação limpa."
    },
    {
      icon: Heart,
      title: "Estética de Luxo",
      desc: "Inspirada em gigantes do mercado global de design. Tipografia sutil, grids geométricos perfeitos, espaços negativos elegantes e paletas que confortam os olhos."
    },
    {
      icon: Award,
      title: "Acessibilidade Universal",
      desc: "A beleza deve ser usufruída por todos. Construído seguindo rigorosamente os padrões de acessibilidade WCAG, suporte a navegação por teclado e leitores de tela."
    }
  ];

  return (
    <section id="filosofia" className="py-32 px-4 md:px-8 bg-brand-dark border-t border-white/5 relative">
      <div className="absolute top-1/2 right-1/4 w-[40vw] h-[40vh] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Manifesto Text and Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-3">
                Nosso Manifesto
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-6">
                Design sem Compromissos.
              </h2>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                Nós recusamos soluções prontas e automatizadores pesados que incham o seu código. Desenvolvemos soluções focadas na harmonia perfeita entre velocidade impecável, experiência sensorial de luxo e solidez de engenharia.
              </p>
            </div>

            {/* Custom Interactive Pillars List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {manifestoPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 rounded-2xl bg-brand-dark/20 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/15 flex items-center justify-center text-brand-accent mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-white tracking-wide text-sm mb-2">{pillar.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">{pillar.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Tech-forward Custom Visualizer Charts (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-brand-dark border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-emerald/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-brand-emerald" />
                <h3 className="font-display font-semibold text-white text-base">Métricas Comparativas</h3>
              </div>

              {/* Chart 1: Frame Stability (60 FPS vs Traditional Web) */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Estabilidade de Frame Rate (FPS)</span>
                  <span className="text-brand-emerald font-bold">60 FPS constante</span>
                </div>
                
                {/* SVG Line Chart representing buttery smoothness */}
                <div className="h-24 bg-brand-dark/40 border border-white/5 rounded-xl p-4 flex flex-col justify-end relative overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-y-0 inset-x-0 flex flex-col justify-between opacity-[0.03]">
                    <div className="border-b border-white h-px" />
                    <div className="border-b border-white h-px" />
                    <div className="border-b border-white h-px" />
                  </div>

                  {/* Aura (60 FPS line) */}
                  <svg className="w-full h-12 text-brand-emerald overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 5 L 20 5 L 40 5 L 60 5 L 80 5 L 100 5 L 120 5 L 140 5 L 160 5 L 180 5 L 200 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <path
                      d="M 0 35 Q 20 15 40 38 T 80 15 T 120 38 T 160 12 T 200 35"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      className="opacity-50"
                    />
                  </svg>

                  <div className="flex justify-between text-[8px] font-mono text-zinc-600 mt-2">
                    <span>AURA Render loop (Estável)</span>
                    <span className="text-red-400">Frameworks Pesados (Instável)</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Code Bundle Footprint */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Tamanho de Módulo de Inicialização</span>
                  <span className="text-brand-accent font-bold">&lt; 14 KB</span>
                </div>

                <div className="space-y-2">
                  {/* AURA bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>AURA Minimalist Core</span>
                      <span>12.4 KB</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "12%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-brand-accent"
                      />
                    </div>
                  </div>

                  {/* Standard Framework bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>Outros Frameworks de Mercado</span>
                      <span>180 KB+</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "90%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-zinc-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO and Web Vitals HUD indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                {[
                  { label: "FID Latência", val: "<2ms", glow: "text-brand-emerald" },
                  { label: "SEO Index", val: "100/100", glow: "text-brand-emerald" },
                  { label: "TBT Engine", val: "<40ms", glow: "text-brand-accent" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-brand-dark/40 border border-white/5 text-center">
                    <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
                      {item.label}
                    </span>
                    <span className={`text-xs font-bold font-mono ${item.glow}`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
