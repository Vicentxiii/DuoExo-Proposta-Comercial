/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldCheck, Zap, Sliders, ArrowRight, HelpCircle } from "lucide-react";
import BorderGlow from "./BorderGlow";
import LightPillar from "./LightPillar";

export default function SectionInvestimento() {
  // Simulator states
  const [hasAsset, setHasAsset] = useState<boolean>(true);
  const [selectedPackage, setSelectedPackage] = useState<"standard" | "website">("standard");

  // Prices
  // Standard package (Configurador 3D)
  // With Asset: R$ 6.800,00
  // Without Asset: R$ 8.500,00
  // Website package (Configurador 3D + Reformulação completa do Website)
  // Valor: R$ 8.500,00 (Conforme solicitado)

  const getPrice = () => {
    if (selectedPackage === "standard") {
      return hasAsset ? 6800 : 8500;
    } else {
      // Updated to 8500 as requested for the Website + Configurator package
      return 8500;
    }
  };

  const getVerbatimAssetExplanation = () => {
    if (hasAsset) {
      return "Nesse cenário, toda a modelagem já está pronta, permitindo concentrar o desenvolvimento na programação, interação, otimização e experiência do usuário.";
    } else {
      return "Será necessário contratar um artista 3D especializado para produzir toda a modelagem do veículo. Essa etapa aumenta significativamente o tempo de produção, envolve fornecedores externos e eleva o custo total do projeto. O valor adicional cobre exclusivamente essa produção especializada.";
    }
  };

  const getVerbatimPackageExplanation = () => {
    if (selectedPackage === "website") {
      return "Caso a empresa deseje aproveitar o projeto para modernizar toda sua presença digital, é possível desenvolver o configurador integrado a um novo website institucional. Nesse formato, além do configurador, toda a estrutura do site é reformulada para oferecer uma experiência moderna, rápida e focada em conversão.";
    } else {
      return "Desenvolvimento exclusivo do sistema do configurador interativo pronto para ser integrado ao seu site ou portal atual.";
    }
  };

  return (
    <section
      id="investimento"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      {/* Visual background atmospheric elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <LightPillar
          topColor="#2f00eb"
          bottomColor="#0bdcff"
          intensity={0.8}
          rotationSpeed={0.4}
          glowAmount={0.001}
          pillarWidth={3.5}
          pillarHeight={0.3}
          noiseIntensity={0.4}
          pillarRotation={72}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-brand-gold font-bold tracking-widest uppercase block">
            [ simulação de investimento transparente ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Investimento
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Selecione o escopo desejado e a disponibilidade de arquivos 3D para visualizar o orçamento e detalhamento do projeto em tempo real.
          </p>
        </div>

        {/* Dynamic Dual Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Simulators Controls (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Control Group 1: Choose Package Scope */}
            <div className="p-6 md:p-8 rounded-3xl bg-brand-dark/40 border border-white/5 space-y-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                Etapa 1: Selecione o Escopo do Projeto
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Standard Package Option */}
                <button
                  onClick={() => setSelectedPackage("standard")}
                  className={`p-6 rounded-2xl border text-left transition-all focus:outline-none flex flex-col justify-between h-48 ${
                    selectedPackage === "standard"
                      ? "bg-brand-accent/5 border-brand-accent text-white"
                      : "bg-brand-dark/40 border-white/5 text-zinc-400 hover:border-white/10"
                  }`}
                  id="invest-pkg-standard"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wide uppercase text-zinc-500">OPÇÃO 01</span>
                      {selectedPackage === "standard" && <div className="w-2 h-2 rounded-full bg-brand-accent" />}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Configurador 3D
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-light leading-snug">
                    Desenvolvimento exclusivo do configurador 3D sob medida.
                  </span>
                </button>

                {/* Website Integration Package Option */}
                <button
                  onClick={() => setSelectedPackage("website")}
                  className={`p-6 rounded-2xl border text-left transition-all focus:outline-none flex flex-col justify-between h-48 ${
                    selectedPackage === "website"
                      ? "bg-emerald-500/5 border-emerald-500 text-white border-glow-emerald"
                      : "bg-brand-dark/40 border-white/5 text-zinc-400 hover:border-white/10"
                  }`}
                  id="invest-pkg-website"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wide uppercase text-zinc-500">OPÇÃO 02 (RECOMENDADO)</span>
                      {selectedPackage === "website" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Configurador 3D + Reformulação do Website
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-light leading-snug">
                    Configurador integrado a um novo website institucional focado em conversão.
                  </span>
                </button>
              </div>
            </div>

            {/* Control Group 2: Asset 3D Toggle */}
            <div className="p-6 md:p-8 rounded-3xl bg-brand-dark/40 border border-white/5 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                    Etapa 2: Asset 3D do Veículo
                  </span>
                  <span className="text-xs text-zinc-400 font-light">Selecione se sua empresa já possui o modelo 3D do veículo.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Has Asset (True) */}
                <button
                  onClick={() => setHasAsset(true)}
                  className={`p-4 rounded-xl border text-left transition-all text-xs font-medium focus:outline-none ${
                    hasAsset
                      ? "bg-brand-accent/5 border-brand-accent text-white"
                      : "bg-brand-dark border-white/5 text-zinc-500 hover:text-zinc-400"
                  }`}
                  id="invest-asset-true"
                >
                  Forneceremos o Asset 3D
                </button>

                {/* No Asset (False) */}
                <button
                  onClick={() => setHasAsset(false)}
                  className={`p-4 rounded-xl border text-left transition-all text-xs font-medium focus:outline-none ${
                    !hasAsset
                      ? "bg-brand-accent/5 border-brand-accent text-white"
                      : "bg-brand-dark border-white/5 text-zinc-500 hover:text-zinc-400"
                  }`}
                  id="invest-asset-false"
                >
                  NÃO forneceremos o Asset 3D
                </button>
              </div>

              {/* Dynamic asset verbatim explanation card */}
              <div className="p-4 rounded-xl bg-brand-dark border border-white/5 font-mono text-[11px] text-zinc-400 leading-relaxed font-light">
                <span className="text-brand-gold font-bold uppercase tracking-wider block mb-1">Impacto do modelo 3D:</span>
                {getVerbatimAssetExplanation()}
              </div>
            </div>

          </div>

          {/* Right Column: Real-time Budget Calculation & Receipt Dashboard (Span 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <BorderGlow
              className="h-full w-full"
              backgroundColor="#050505"
              borderRadius={24}
              active={selectedPackage === "website"}
              glowColor={selectedPackage === "website" ? "142 70% 45%" : "45 85 55"}
              colors={selectedPackage === "website" 
                ? ['#10b981', '#34d399', '#059669'] 
                : ['#d4af37', '#3b82f6', '#f59e0b']
              }
              fillOpacity={0.12}
            >
              <div className="p-8 flex flex-col justify-between h-full relative overflow-hidden space-y-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/3 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                      Demonstrativo Comercial
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 font-mono text-[9px] text-brand-accent">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VERIFICADO</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Total do Investimento</span>
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-xl font-bold">R$</span>
                      {/* Beautiful price counter rolling style */}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={getPrice()}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-4xl md:text-5xl font-extrabold tracking-tight"
                        >
                          {getPrice().toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Detailed specification receipt */}
                <div className="space-y-4 border-t border-b border-white/5 py-6">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Pacote Escolhido</span>
                    <span className="text-xs text-white font-medium block">
                      {selectedPackage === "standard" ? "Configurador 3D" : "Configurador 3D + Reformulação completa do Website"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Modelagem do Asset</span>
                    <span className="text-xs text-white font-medium block">
                      {hasAsset ? "Com Asset 3D fornecido" : "Sem Asset 3D fornecido"}
                    </span>
                  </div>

                  {/* Verbatim Explanation container dynamically adjusted but strictly verbatim */}
                  <div className="text-[11px] text-zinc-400 font-light leading-relaxed">
                    {getVerbatimPackageExplanation()}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Incluso no Desenvolvimento:</span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>Foco em Conversão</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>Otimização WebGL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>Interface Responsiva</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>Exportador PDF</span>
                    </div>
                  </div>
                </div>

              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
}
