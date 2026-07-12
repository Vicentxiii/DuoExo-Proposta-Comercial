/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { motion } from "motion/react";
import { CalendarRange, CreditCard, CheckSquare } from "lucide-react";

export default memo(function SectionCondicoes() {
  return (
    <section
      id="condicoes"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vh] bg-brand-accent/3 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-accent font-semibold tracking-widest uppercase block">
                [ governança e prazos ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Condições Comerciais
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              Contrato simples e direto. Você começa a colocar sua ferramenta de vendas para funcionar em até 60 dias.
            </p>
          </div>

          {/* Right Text Blocks: Verbatim conditions */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Prazo de desenvolvimento */}
            <div className="p-8 rounded-3xl bg-brand-dark/40 border border-white/5 flex flex-col justify-between h-72 hover:border-brand-accent/20 transition-all group">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-brand-accent/5 border border-brand-accent/10 rounded-xl text-brand-accent group-hover:bg-brand-accent/10 transition-all">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Cronograma</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-400 font-mono uppercase tracking-widest">
                  Prazo de desenvolvimento
                </h4>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Até 60 dias.
                </p>
              </div>
            </div>

            {/* Card 2: Forma de pagamento */}
            <div className="p-8 rounded-3xl bg-brand-dark/40 border border-white/5 flex flex-col justify-between h-72 hover:border-brand-gold/20 transition-all group">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-xl text-brand-gold group-hover:bg-brand-gold/10 transition-all">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Tesouraria</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-400 font-mono uppercase tracking-widest">
                  Forma de pagamento
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-light leading-snug">
                    <CheckSquare className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">50% de sinal</strong> para início do projeto.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-light leading-snug">
                    <CheckSquare className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">50% na entrega</strong>, após validação completa, testes e aprovação do funcionamento.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});
