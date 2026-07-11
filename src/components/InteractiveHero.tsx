/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ChevronDown, Cpu, Sparkles, Trophy, CheckCircle } from "lucide-react";

export default function InteractiveHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleScrollToProjects = () => {
    document.getElementById("trabalhos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-brand-dark overflow-hidden py-24 px-4 md:px-8"
    >
      {/* Background Animated Gradient Mesh & Glowing Aura */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-brand-accent/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-brand-emerald/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute inset-0 noise-bg opacity-[0.03]" />
        
        {/* Abstract structural grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Elite Premium Studio Tag */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/60 border border-white/5 backdrop-blur-md mb-8 text-zinc-400 font-mono text-[11px] tracking-widest uppercase hover:border-brand-accent/30 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Digital Design &amp; Craftsmanship Studio</span>
          </motion.div>

          {/* High-Impact Cinematic Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-bold font-display tracking-tight text-white leading-[1.05] max-w-4xl"
          >
            Forjamos Interfaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-blue-400 to-brand-emerald">
              Ultra Sensoriais.
            </span>
          </motion.h1>

          {/* Subtitle / Manifesto */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg md:text-xl text-zinc-400 max-w-2xl mt-8 leading-relaxed font-light"
          >
            Combinamos arquitetura limpa, microinterações fluidas e estética de luxo para transformar software em uma obra de arte interativa. Inspirado por padrões internacionais de excelência.
          </motion.p>

          {/* Call to Actions (Interactive Magnet feel) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full sm:w-auto"
          >
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-light text-brand-dark text-sm font-semibold tracking-wide hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-300 group focus:outline-none"
              id="hero-primary-btn"
            >
              Explorar Projetos
            </button>
            <button
              onClick={() => document.getElementById("proposta")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-dark border border-white/10 text-white text-sm font-semibold tracking-wide hover:bg-brand-dark/80 hover:border-white/20 active:scale-95 transition-all duration-300 focus:outline-none"
              id="hero-secondary-btn"
            >
              Iniciar Parceria
            </button>
          </motion.div>
        </motion.div>

        {/* Real-time Hardware-accelerated Telemetry Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mt-24 border-t border-white/5 pt-12"
        >
          {[
            { icon: Cpu, value: "60 FPS", label: "Render Frame Rate", glow: "text-glow-accent" },
            { icon: CheckCircle, value: "100%", label: "Lighthouse Score", glow: "text-glow-emerald" },
            { icon: Trophy, value: "Awwwards", label: "Design Quality Goal", glow: "" },
            { icon: Sparkles, value: "< 100ms", label: "Time to Interactive", glow: "text-glow-accent" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start p-4 rounded-2xl bg-brand-dark/30 border border-white/5 hover:border-white/10 hover:bg-brand-dark/50 transition-all duration-500"
              >
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-wider uppercase">{stat.label}</span>
                </div>
                <span className={`text-xl md:text-2xl font-bold font-display text-white ${stat.glow}`}>
                  {stat.value}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Floating animated Scroll Cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
          onClick={handleScrollToProjects}
          id="hero-scroll-cue"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase mb-2">Rolagem</span>
          <ChevronDown className="w-4 h-4 text-brand-accent" />
        </motion.div>
      </div>
    </section>
  );
}
