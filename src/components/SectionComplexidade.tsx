/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { motion } from "motion/react";
import { Cpu, Award, Clock3, Settings } from "lucide-react";
import BorderGlow from "./BorderGlow";

export default memo(function SectionComplexidade() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="desenvolvimento"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Darkened atmospheric lights */}
        <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vh] bg-brand-gold/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[30vw] h-[30vh] bg-brand-accent/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs text-brand-gold font-bold tracking-widest uppercase block">
            [ desenvolvimento artesanal ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Por que este projeto possui alto valor?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
            O valor não está no software. Está no que ele entrega: uma experiência exclusiva, construída sob medida para posicionar sua marca acima da concorrência.
          </p>
        </div>

        {/* Bento Grid layout with verbatim content blocks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Card 1: Complexity & Precision (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8"
          >
            <BorderGlow
              className="h-full w-full"
              backgroundColor="rgba(10, 10, 12, 0.7)"
              borderRadius={24}
              glowColor="217 91 60"
              colors={['#3b82f6', '#1d4ed8', '#60a5fa']}
              fillOpacity={0.1}
            >
              <div className="p-8 md:p-10 flex flex-col justify-between min-h-[280px] h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/3 rounded-full blur-2xl group-hover:bg-brand-accent/8 transition-all" />
                <div className="p-3 bg-brand-accent/5 border border-brand-accent/10 rounded-xl w-fit text-brand-accent mb-6">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-4">
                  <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                    Cada linha de código é escrita à mão para seu projeto. Nada de temas prontos, nada de soluções genéricas. Performance, fluidez e precisão visual em qualquer dispositivo.
                  </p>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    [ feito sob medida, linha por linha ]
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Card 2: Exclusive Expertise (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4"
          >
            <BorderGlow
              className="h-full w-full"
              backgroundColor="rgba(10, 10, 12, 0.7)"
              borderRadius={24}
              glowColor="45 85 55"
              colors={['#d4af37', '#f59e0b', '#78350f']}
              fillOpacity={0.1}
            >
              <div className="p-8 flex flex-col justify-between min-h-[280px] h-full relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-brand-gold/3 rounded-full blur-2xl group-hover:bg-brand-gold/6 transition-all" />
                <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-xl w-fit text-brand-gold mb-6">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-light text-zinc-300 leading-relaxed">
                    Profissionais capazes de entregar essa experiência são raros. São anos de domínio técnico em computação gráfica, otimização WebGL e engenharia de experiência.
                  </p>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    [ expertise rara e domínio técnico ]
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Card 3: Backstage Engineering (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4"
          >
            <BorderGlow
              className="h-full w-full"
              backgroundColor="rgba(10, 10, 12, 0.7)"
              borderRadius={24}
              glowColor="240 5 60"
              colors={['#a1a1aa', '#3f3f46', '#18181b']}
              fillOpacity={0.1}
            >
              <div className="p-8 flex flex-col justify-between min-h-[280px] h-full relative overflow-hidden group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit text-zinc-400 mb-6">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base font-light text-zinc-300 leading-relaxed">
                    O que seu cliente vê é fluidez. O que não vê são dezenas de horas de engenharia, testes de renderização, ajustes de performance e validação em múltiplos dispositivos.
                  </p>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    [ performance testada em cada dispositivo ]
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Card 4: Roadmap & Timeline (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8"
          >
            <BorderGlow
              className="h-full w-full"
              backgroundColor="rgba(10, 10, 12, 0.7)"
              borderRadius={24}
              glowColor="217 91 60"
              colors={['#3b82f6', '#d4af37', '#1d4ed8']}
              fillOpacity={0.15}
            >
              <div className="p-8 md:p-10 flex flex-col justify-between min-h-[280px] h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-accent/[0.01] pointer-events-none" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
                  <div className="p-3 bg-brand-accent/5 border border-brand-accent/10 rounded-xl w-fit text-brand-accent">
                    <Clock3 className="w-5 h-5" />
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 font-mono text-[10px] text-brand-accent uppercase tracking-wider font-semibold">
                    Cronograma Estimado
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Prazo Estimado de Entrega</span>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Aproximadamente 60 dias
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-white/5 pt-4">
                    <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400">
                      Nada de template pronto.
                    </div>
                    <div className="px-3 py-1 rounded-md bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-mono text-brand-gold font-medium">
                      Cada peça é desenhada exclusivamente para sua marca.
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});
