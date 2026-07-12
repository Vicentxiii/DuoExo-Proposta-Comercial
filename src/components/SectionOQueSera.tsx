/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { motion } from "motion/react";
import { CheckCircle2, FileText } from "lucide-react";
import InteractiveConfigurator from "./InteractiveConfigurator";
import BrandLogo from "./BrandLogo";

export default memo(function SectionOQueSera() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const checklist = [
    "visualizar o veículo em 360°",
    "alterar cores em tempo real",
    "trocar rodas",
    "personalizar acessórios",
    "visualizar cada alteração instantaneamente",
    "gerar automaticamente um PDF completo contendo toda a configuração realizada"
  ];

  const valuePillars = [
    { label: "Mais organização.", color: "text-brand-accent bg-brand-accent/5 border-brand-accent/10" },
    { label: "Mais velocidade.", color: "text-white bg-white/5 border-white/10" },
    { label: "Mais profissionalismo.", color: "text-brand-gold bg-brand-gold/5 border-brand-gold/10" },
    { label: "Mais conversão.", color: "text-white bg-gradient-to-r from-brand-accent/20 to-brand-gold/20 border-brand-accent/30 font-bold" }
  ];

  return (
    <section
      id="ferramenta"
      className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Client branding - right after Rolagem, larger, no glow */}
        <div className="flex flex-col items-center mb-16">
          <span className="font-mono text-[10px] sm:text-xs text-zinc-500 tracking-[0.25em] uppercase mb-4 text-center">
            Proposta desenvolvida sob medida para
          </span>
          <div className="flex justify-center">
            <BrandLogo className="h-12 sm:h-20 text-white" glow={false} />
          </div>
        </div>

        {/* Disclaimer Message */}
        <div className="mb-12 flex justify-center">
          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-full px-6 py-2.5 backdrop-blur-md">
            <p className="text-brand-accent text-[10px] md:text-xs font-bold tracking-wider text-center uppercase">
              ATENÇÃO: ISSO É APENAS UM ORÇAMENTO MOSTRANDO A CAPACIDADE DO NOSSO DEV. 
              <span className="block md:inline md:ml-2 text-zinc-400 font-normal">O CONFIGURADOR SERÁ MAIS ROBUSTO DO QUE O APRESENTADO AQUI</span>
            </p>
          </div>
        </div>

        {/* Cinematic section grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left specification column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-accent font-semibold tracking-widest uppercase block">
                [ escopo do projeto ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                O que será desenvolvido
              </h2>
            </div>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light border-l-2 border-brand-accent/40 pl-4">
              Um Configurador 3D Interativo em Tempo Real, desenvolvido exclusivamente para sua empresa.
            </p>

            <div className="space-y-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                O cliente poderá:
              </span>
              
              <ul className="space-y-3.5">
                {checklist.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -15, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-brand-accent" />
                    </div>
                    <span className="text-zinc-300 text-sm font-light">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-brand-dark/40 border border-white/5 flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/20 shrink-0 text-brand-gold">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                Esse PDF funciona como um resumo profissional da configuração escolhida, facilitando o fechamento comercial entre vendedor e cliente.
              </p>
            </div>

            {/* Verbatim summary phrases styled as premium pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {valuePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-xl border text-xs text-center font-medium ${pillar.color}`}
                >
                  {pillar.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right interactive container showcasing the high-fidelity live POC */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <InteractiveConfigurator />
          </div>

        </div>

      </div>
    </section>
  );
});
