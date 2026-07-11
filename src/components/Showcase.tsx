/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ArrowUpRight, BarChart2, Layers, Cpu } from "lucide-react";
import { Project } from "../types";

export default function Showcase() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "porsche",
      title: "Porsche Chronos",
      category: "Immersive 3D Experience",
      year: "2026",
      client: "Porsche AG",
      description: "Um configurador em tempo real tridimensional de alta fidelidade desenvolvido com WebGL personalizado, combinando realismo de reflexos físicos a taxas de renderização perfeitas de 60 FPS em qualquer dispositivo móvel.",
      image: "/src/assets/images/grey_car_1783720973242.jpg",
      accentColor: "from-red-600 to-amber-500",
      tags: ["React Three Fiber", "GLSL Shaders", "GSAP ScrollTrigger", "WebGL"],
      metrics: { label: "Configurações Realizadas", value: "2.4M+" }
    },
    {
      id: "stripe",
      title: "Stripe Quantum",
      category: "Fintech Dashboard",
      year: "2025",
      client: "Stripe",
      description: "Um portal de analítica financeira ultra-fluido focado no rastreamento instantâneo de transações globais. Utiliza algoritmos de ordenação customizados para atualizar milhares de nós visuais sem perdas de frame.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      accentColor: "from-blue-600 to-indigo-500",
      tags: ["Tailwind CSS v4", "D3.js Data Flow", "WebSocket Sync", "Clean SOLID"],
      metrics: { label: "Latência de Render", value: "8.4ms" }
    },
    {
      id: "vela",
      title: "Vela Yachting",
      category: "Luxury E-Commerce",
      year: "2026",
      client: "Vela Yachts",
      description: "Plataforma de storytelling digital interativo para superiates de alta gama. Apresenta transações de rolagem suave com efeitos de profundidade de parallax, gerando um sentimento puramente cinematográfico.",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200",
      accentColor: "from-teal-600 to-emerald-500",
      tags: ["Framer Motion", "Lenis Physics Scroll", "Lazy Optimized", "Apple Aesthetic"],
      metrics: { label: "Taxa de Engajamento", value: "+148%" }
    },
    {
      id: "lumen",
      title: "Lumen Cognitive",
      category: "AI Neural Visualization",
      year: "2026",
      client: "Lumen Labs",
      description: "Interface interativa para monitoramento de redes neurais generativas complexas. Os usuários visualizam os vetores e as conexões latentes através de fluxos de partículas dinâmicas no Canvas do HTML5.",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=1200",
      accentColor: "from-purple-600 to-pink-500",
      tags: ["Canvas API", "Mathematical Flow Fields", "React 19 State", "A11y Compliant"],
      metrics: { label: "Nós Neurais Ativos", value: "25,000+" }
    }
  ];

  return (
    <section id="trabalhos" className="py-32 px-4 md:px-8 bg-brand-dark border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-3">
              Portfólio Curado
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
              Obras de Arte Digitais.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md font-light text-sm md:text-base leading-relaxed">
            Cada projeto representa um salto inovador em performance e design, concebido sob medida para liderar o mercado global.
          </p>
        </div>

        {/* Portfolio Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveProject(project)}
              className="group relative rounded-3xl bg-brand-dark/40 border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500"
              data-cursor="view"
            >
              {/* Image Container with Custom Parallax Hover Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-40" />
                <motion.img
                  referrerPolicy="no-referrer"
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                
                {/* Float Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark/80 border border-white/10 text-white backdrop-blur-md group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Floating Metrics */}
                {project.metrics && (
                  <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] tracking-wider text-white bg-brand-dark/60 border border-white/5 px-3 py-1.5 rounded-md backdrop-blur-sm">
                    {project.metrics.label}: <span className="font-bold text-brand-emerald">{project.metrics.value}</span>
                  </div>
                )}
              </div>

              {/* Text Meta Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-brand-accent tracking-wider uppercase bg-brand-accent/5 border border-brand-accent/15 px-2 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{project.year}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 text-sm mt-3 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-zinc-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Immersive Modal Inspection Sheet */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-4xl bg-brand-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-brand-dark/80 border border-white/10 text-white hover:text-brand-accent hover:border-brand-accent transition-all duration-300 focus:outline-none"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Visual Panel */}
                <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                  <img
                    referrerPolicy="no-referrer"
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark via-transparent to-transparent opacity-80`} />
                  <div className="absolute bottom-8 left-8">
                    <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-1">
                      Cliente oficial
                    </span>
                    <h4 className="text-xl font-bold text-white font-display">
                      {activeProject.client}
                    </h4>
                  </div>
                </div>

                {/* Information Content Panel */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-zinc-500 tracking-wider block mb-2 uppercase">
                      {activeProject.category} / {activeProject.year}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold font-display text-white">
                      {activeProject.title}
                    </h3>
                    
                    <div className="h-px bg-white/10 my-6" />

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                      {activeProject.description}
                    </p>

                    {/* Technical metrics */}
                    {activeProject.metrics && (
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-brand-dark/50 border border-white/5">
                          <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                            {activeProject.metrics.label}
                          </span>
                          <span className="text-xl font-bold text-brand-emerald font-display">
                            {activeProject.metrics.value}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-brand-dark/50 border border-white/5 flex flex-col justify-center">
                          <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                            Eficiência
                          </span>
                          <span className="text-xl font-bold text-brand-accent font-display flex items-center gap-1">
                            <Cpu className="w-4 h-4" /> 100%
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider block uppercase mb-3">
                        Arquitetura &amp; Ferramentas
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs font-mono text-zinc-300 bg-brand-dark border border-white/5 px-3 py-1.5 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-between">
                    <button
                      onClick={() => setActiveProject(null)}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      Voltar à galeria
                    </button>

                    <a
                      href="#proposta"
                      onClick={() => setActiveProject(null)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-white transition-colors group"
                    >
                      <span>Solicitar Projeto Similar</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
