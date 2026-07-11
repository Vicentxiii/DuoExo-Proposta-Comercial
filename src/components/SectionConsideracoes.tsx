/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Quote, Flame, Target, Sparkles, TrendingUp, MessageCircle, ArrowRight } from "lucide-react";

export default function SectionConsideracoes() {
  const contrastItems = [
    { text: "Enquanto concorrentes apresentam imagens estáticas, sua empresa oferecerá uma experiência imersiva.", highlight: "experiência imersiva" },
    { text: "Enquanto outros dependem da explicação do vendedor, seu cliente poderá visualizar exatamente o veículo que deseja.", highlight: "visualizar exatamente o veículo" },
    { text: "Enquanto empresas comuns disputam preço, empresas que investem em tecnologia disputam percepção de valor.", highlight: "percepção de valor" }
  ];

  const whatsappLink = "https://wa.me/5511951197576?text=Olá%20vicente%20somos%20da%20DuoExo%2C%20sua%20proposta%20nos%20interessa%20bastante%2C%20vamos%20conversar%20mais%20e%20partir%20para%20o%20fechamento%21";

  return (
    <section
      id="consideracoes"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] bg-brand-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs text-brand-gold font-bold tracking-widest uppercase block">
            [ visão estratégica ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Considerações finais
          </h2>
        </div>

        {/* Highlight Quote Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-brand-dark/60 border border-white/5 relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 p-8 text-brand-accent/10 opacity-30">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>
          <p className="text-lg sm:text-2xl font-light text-white leading-relaxed relative z-10">
            Este investimento não representa apenas a contratação de um software. Representa a criação de um <strong className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-gold font-semibold">ativo digital exclusivo</strong> para sua empresa.
          </p>
        </div>

        {/* "Enquanto" Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {contrastItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-brand-dark/40 border border-white/5 space-y-3 hover:border-brand-accent/15 transition-all group"
              id={`consid-contrast-${idx}`}
            >
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block">[ contraste comercial ]</span>
              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Impact List */}
        <div className="p-8 rounded-3xl bg-brand-dark border border-white/5 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="p-4 bg-brand-gold/15 border border-brand-gold/30 rounded-2xl text-brand-gold shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            Um configurador 3D profissional reduz dúvidas, aumenta o tempo de permanência no site, fortalece a autoridade da marca, melhora a experiência do usuário e cria um diferencial competitivo difícil de ser replicado.
          </p>
        </div>

        {/* Recurrent Cost vs Finite Cost Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-12">
          <div className="p-6 rounded-2xl bg-brand-dark/30 border border-white/5 flex flex-col justify-between min-h-[140px]">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Custo de Engenharia Único</span>
            <p className="text-lg font-semibold text-white tracking-tight leading-snug">
              O custo de desenvolver esse projeto é finito.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-accent/5 border border-brand-accent/20 flex flex-col justify-between min-h-[140px] border-glow-accent">
            <span className="font-mono text-[9px] text-brand-accent uppercase tracking-widest font-semibold">Custo de Oportunidade Mensal</span>
            <p className="text-lg font-semibold text-white tracking-tight leading-snug">
              O custo de continuar perdendo oportunidades de venda todos os meses é recorrente.
            </p>
          </div>
        </div>

        {/* Final Verbatim Decision Block */}
        <div className="p-10 md:p-16 rounded-3xl bg-brand-dark border border-white/10 relative overflow-hidden text-center space-y-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-brand-gold font-bold tracking-[0.3em] uppercase block">
              [ a tomada de decisão ]
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Pronto para elevar o patamar da sua marca?
            </h3>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            A decisão não é apenas sobre adquirir um configurador. É sobre escolher entre continuar apresentando produtos da forma tradicional ou oferecer uma experiência que posiciona sua empresa em um novo patamar de inovação, percepção de valor e conversão.
          </p>

          <div className="pt-4 flex flex-col items-center gap-6">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-600 text-white font-bold tracking-tight shadow-2xl shadow-emerald-900/40 border border-emerald-400/30 overflow-hidden"
            >
              {/* Mirrored/Gloss Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <MessageCircle className="w-5 h-5 fill-white/10" />
              <span className="relative z-10 text-sm md:text-base">VAMOS CONVERSAR NO WHATSAPP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Resposta imediata via DuoExo
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
