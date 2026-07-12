/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function HeroCinematic() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 45, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollDown = () => {
    document.getElementById("ferramenta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-brand-dark overflow-hidden py-32 px-4 md:px-8"
    >
      {/* Background Cinematic Grids & Volumetric Aura */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft elegant linear background grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Film grain noise overlay */}
        <div className="absolute inset-0 noise-bg opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Creator link locator as instructed: Proposal created by Vicente Czar linking to instagram.com/vicenteczar.dev */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <a
              href="https://instagram.com/vicenteczar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 hover:bg-brand-accent/[0.02] transition-all duration-300 group font-mono text-[10px] tracking-widest text-zinc-400 uppercase"
              id="hero-creator-btn"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              <span>Proposal created by Vicente Czar</span>
            </a>
          </motion.div>

          {/* Core Cinematic Titles */}
          <div className="space-y-4">
            <motion.span
              variants={itemVariants}
              className="font-mono text-xs text-brand-gold font-bold tracking-[0.25em] uppercase block"
            >
              PROPOSTA COMERCIAL
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Configurador 3D <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                Interativo para Veículos
              </span>
            </motion.h1>
          </div>

          {/* Subtitle verbatim quote */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-0.5 bg-brand-gold/40 mx-auto"
          />

          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-wide text-white max-w-4xl mx-auto leading-relaxed"
          >
            Muito mais do que um configurador. Uma ferramenta de vendas.
          </motion.h2>

          {/* Primary opening verbatim paragraph block */}
          <div className="max-w-3xl mx-auto space-y-6 pt-6">
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light"
            >
              Hoje, o cliente moderno não quer apenas visualizar um veículo. Ele quer <strong className="text-white font-medium">interagir</strong>, <strong className="text-white font-medium">personalizar</strong>, <strong className="text-white font-medium">comparar</strong> e ter segurança antes da compra.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light"
            >
              Empresas que continuam utilizando galerias de imagens estáticas ou apresentações tradicionais acabam perdendo atenção, tempo comercial e oportunidades de venda.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light"
            >
              Cada visitante que abandona seu site sem conseguir visualizar exatamente o veículo que deseja representa uma oportunidade perdida.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-brand-accent text-sm sm:text-base font-medium tracking-wide"
            >
              Nosso objetivo é eliminar essa perda.
            </motion.p>
          </div>

        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={scrollDown}
          id="hero-scroll-trigger"
        >
          <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase mb-2">Rolagem</span>
          <ChevronDown className="w-4 h-4 text-brand-gold" />
        </motion.div>

      </div>
    </section>
  );
}
