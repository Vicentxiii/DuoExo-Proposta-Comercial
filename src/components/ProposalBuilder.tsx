/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar, DollarSign, Send, ArrowRight, Zap, Sparkles, AlertCircle } from "lucide-react";
import { ProposalService, ProjectScope } from "../types";

export default function ProposalBuilder() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["frontend", "motion"]);
  const [animationTier, setAnimationTier] = useState<"minimal" | "premium" | "cinematic">("premium");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const services: ProposalService[] = [
    { id: "brand", name: "Identidade Visual & UI/UX Design", basePrice: 6000, durationWeeks: 3, description: "Criação de marcas luxuosas, guias tipográficos rigorosos e protótipos de alta fidelidade baseados em grades." },
    { id: "frontend", name: "Front-End de Alta Performance", basePrice: 12000, durationWeeks: 5, description: "Implementação em React com tipagem rigorosa TypeScript, Tailwind CSS v4, e velocidade máxima de carregamento." },
    { id: "webgl", name: "Experiências Imersivas 3D / WebGL", basePrice: 16000, durationWeeks: 6, description: "Configuradores 3D interativos, shaders GLSL personalizados e transições que se comportam como vídeo." },
    { id: "motion", name: "Animações Avançadas & Microefeitos", basePrice: 5000, durationWeeks: 2, description: "Framer Motion personalizado, scroll liso, hovers magnéticos e controle vetorial completo do cursor." }
  ];

  const handleToggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Pricing calculations
  const calculateEstimate = (): ProjectScope => {
    if (selectedServices.length === 0) {
      return { services: [], animationTier, timelineWeeks: 0, estimatedCostRange: [0, 0] };
    }

    const baseSum = services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.basePrice, 0);

    const baseDuration = services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.durationWeeks, 0);

    // Multiplier for animation complexity
    let multiplier = 1.0;
    if (animationTier === "premium") multiplier = 1.25;
    if (animationTier === "cinematic") multiplier = 1.5;

    // Project timelines overlapping calculation (e.g., parallel workflows reduce overall weeks by 25%)
    const efficiencyFactor = selectedServices.length > 1 ? 0.75 : 1.0;
    const finalWeeks = Math.ceil(baseDuration * efficiencyFactor);

    // Price range calculation
    const calculatedBase = baseSum * multiplier;
    const minCost = Math.round(calculatedBase * 0.95);
    const maxCost = Math.round(calculatedBase * 1.1);

    return {
      services: selectedServices,
      animationTier,
      timelineWeeks: finalWeeks,
      estimatedCostRange: [minCost, maxCost]
    };
  };

  const scope = calculateEstimate();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (selectedServices.length === 0) {
      setError("Por favor, selecione pelo menos um serviço para montarmos seu escopo.");
      return;
    }
    if (!clientName.trim() || !clientEmail.trim()) {
      setError("Por favor, preencha seu nome e e-mail para receber o detalhamento.");
      return;
    }

    // Success response simulation
    setFormSubmitted(true);
  };

  return (
    <section id="proposta" className="py-32 px-4 md:px-8 bg-brand-dark border-t border-white/5 relative">
      <div className="absolute inset-0 noise-bg opacity-[0.015] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
          <div>
            <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-3">
              Engenharia de Projetos
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
              Monte seu Orçamento.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md font-light text-sm md:text-base leading-relaxed">
            Selecione as soluções ideais para seu negócio e observe o planejamento financeiro e de cronograma se ajustar de forma algorítmica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* LEFT PANEL: Builder Selections (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Services Selector */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                01. Selecione os Pilares Tecnológicos
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleToggleService(service.id)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${
                        isSelected
                          ? "bg-brand-accent/5 border-brand-accent/30"
                          : "bg-brand-dark/30 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className={`font-semibold text-sm tracking-wide ${isSelected ? "text-white" : "text-zinc-300"}`}>
                            {service.name}
                          </h4>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected ? "bg-brand-accent border-brand-accent text-white" : "border-white/10 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed font-light mb-6">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500 border-t border-white/5 pt-4">
                        <span>Prazos: <b className="text-zinc-300">{service.durationWeeks} semanas</b></span>
                        <span>Preço Base: <b className="text-zinc-300">R$ {service.basePrice.toLocaleString("pt-BR")}</b></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Animation Intensity */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                02. Profundidade Sensorial (Animações)
              </span>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "minimal", label: "Minimalista", desc: "Suave & Funcional", multi: "1.0x" },
                  { id: "premium", label: "Premium Motion", desc: "Sensações Cinematográficas", multi: "1.25x" },
                  { id: "cinematic", label: "WebGL Total", desc: "Imersivo Interativo", multi: "1.5x" },
                ].map((tier) => {
                  const isSelected = animationTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setAnimationTier(tier.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all focus:outline-none flex flex-col justify-between gap-4 ${
                        isSelected
                          ? "bg-brand-accent/5 border-brand-accent/40 text-white"
                          : "bg-brand-dark/30 border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-300"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-xs tracking-wide block">{tier.label}</span>
                        <span className="text-[10px] font-light block text-zinc-500 mt-1">{tier.desc}</span>
                      </div>
                      <span className="font-mono text-[10px] text-brand-accent bg-brand-accent/5 border border-brand-accent/15 px-2 py-0.5 rounded-full w-max">
                        {tier.multi}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Dynamic Calculations & Action Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-brand-dark border border-white/10 flex flex-col h-full justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-2">Escopo Projetado</h3>
                      <p className="text-xs text-zinc-500">Estimativas ajustadas por algoritmos internos de eficiência.</p>
                    </div>

                    {/* Projections values */}
                    <div className="space-y-4">
                      {/* Cost Projection */}
                      <div className="p-5 rounded-2xl bg-brand-dark/80 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block">
                            Investimento Estimado
                          </span>
                          <span className="text-xl md:text-2xl font-bold font-display text-white mt-1 block">
                            R$ {scope.estimatedCostRange[0].toLocaleString("pt-BR")} - R$ {scope.estimatedCostRange[1].toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <div className="p-3 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                          <DollarSign className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Timeline Projection */}
                      <div className="p-5 rounded-2xl bg-brand-dark/80 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block">
                            Prazo de Entrega Estimado
                          </span>
                          <span className="text-xl md:text-2xl font-bold font-display text-white mt-1 block">
                            {scope.timelineWeeks > 0 ? `~${scope.timelineWeeks} Semanas` : "Nenhum selecionado"}
                          </span>
                        </div>
                        <div className="p-3 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald">
                          <Calendar className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Integrated Submitter Form */}
                    <form onSubmit={handleFormSubmit} className="space-y-4 border-t border-white/5 pt-8">
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                        03. Enviar Dados de Contato
                      </span>

                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Seu Nome Completo"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-4 py-3 text-xs bg-brand-dark border border-white/5 focus:border-brand-accent focus:outline-none rounded-xl text-white font-sans placeholder-zinc-600 transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="Endereço de E-mail"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-4 py-3 text-xs bg-brand-dark border border-white/5 focus:border-brand-accent focus:outline-none rounded-xl text-white font-sans placeholder-zinc-600 transition-colors"
                        />
                        <textarea
                          placeholder="Descreva brevemente o escopo desejado (opcional)..."
                          rows={3}
                          value={clientMessage}
                          onChange={(e) => setClientMessage(e.target.value)}
                          className="w-full px-4 py-3 text-xs bg-brand-dark border border-white/5 focus:border-brand-accent focus:outline-none rounded-xl text-white font-sans placeholder-zinc-600 resize-none transition-colors"
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-brand-light hover:bg-white text-brand-dark text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                        id="proposal-submit-btn"
                      >
                        <span>Solicitar Diagnóstico</span>
                        <Send className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  // Elegant visual receipt success panel
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 flex items-center justify-center mx-auto text-brand-emerald animate-bounce">
                      <Sparkles className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-2">Escopo Reservado!</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Excelente escolha, <b>{clientName}</b>. Nosso arquiteto de interfaces premium analisará seu projeto em até 2 horas.
                      </p>
                    </div>

                    {/* Receipt Details summary list */}
                    <div className="p-6 rounded-2xl bg-brand-dark border border-white/10 text-left space-y-4 max-w-md mx-auto">
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-[10px] font-mono text-zinc-500">Parceiro</span>
                        <span className="text-xs font-semibold text-white">{clientEmail}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Tecnologias Contratadas</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedServices.map((id) => {
                            const name = services.find((s) => s.id === id)?.name || id;
                            return (
                              <span key={id} className="text-[9px] font-mono bg-brand-dark border border-white/5 px-2 py-0.5 rounded-md text-zinc-300">
                                {name.split(" ")[0]}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block">Investimento Real</span>
                          <span className="text-sm font-bold font-display text-brand-emerald">
                            R$ {scope.estimatedCostRange[0].toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block">Sprints de Entrega</span>
                          <span className="text-sm font-bold font-display text-brand-accent">
                            {scope.timelineWeeks} Semanas
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setClientName("");
                        setClientEmail("");
                        setClientMessage("");
                      }}
                      className="text-xs font-mono text-brand-accent hover:text-white transition-colors flex items-center gap-1 mx-auto mt-8 focus:outline-none"
                    >
                      <span>Montar Nova Configuração</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
