/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { motion } from "motion/react";
import { Smartphone, Monitor } from "lucide-react";

export default memo(function SectionResponsividade() {
  const listItems = [
    { title: "Sem adaptações improvisadas.", desc: "Layout desenvolvido sob medida, garantindo toque perfeito." },
    { title: "Sem perda de funcionalidades.", desc: "Todos os controles e exportações mantidos intactos no mobile." },
    { title: "A experiência será consistente em qualquer tela.", desc: "Poder de renderização otimizado para celulares comuns e modernos." }
  ];

  return (
    <section
      id="responsividade"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vh] bg-brand-accent/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left device graphics visual */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative flex justify-center">
            {/* Visual Frame wrapper */}
            <div className="relative w-full max-w-md aspect-video rounded-2xl bg-brand-dark/95 border border-white/5 p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-gold" />
              
              {/* Desktop Wireframe Screen */}
              <div className="w-full h-full border border-white/5 rounded-lg p-3 space-y-3 bg-brand-dark/40 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">DESKTOP RENDER</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Real rendering representation of the Configurator */}
                <div className="grid grid-cols-3 gap-3 flex-grow items-center relative z-10">
                  <div className="col-span-2 h-24 border border-white/10 rounded-lg bg-brand-dark/50 relative overflow-hidden group/img">
                    <img 
                      src="/src/assets/images/Fotos do carro DuoExo.webp" 
                      alt="Configurador 3D DuoExo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1 py-0.5 rounded bg-brand-accent/80 text-[6px] font-mono font-bold text-white tracking-widest uppercase">
                      ACTIVE RENDER
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Ajustes</div>
                    <div className="h-4 bg-brand-accent/15 border border-brand-accent/25 rounded-md flex items-center justify-center text-[6px] font-mono text-brand-accent font-bold">Laranja</div>
                    <div className="h-4 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-[6px] font-mono text-zinc-400">Rodas Aero</div>
                    <div className="h-4 bg-brand-gold/10 border border-brand-gold/20 rounded-md flex items-center justify-center text-[6px] font-mono text-brand-gold font-bold">Aero Kit</div>
                  </div>
                </div>
              </div>

              {/* Overlapping Luxury Mobile wireframe rendering */}
              <motion.div
                initial={{ y: 30, x: 20, opacity: 0 }}
                whileInView={{ y: 0, x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-4 right-4 w-28 aspect-[9/18] rounded-2xl bg-brand-dark border-2 border-white/10 p-2 shadow-2xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <Smartphone className="w-2.5 h-2.5 text-zinc-500" />
                  <span className="text-[7px] font-mono text-zinc-600">85% MOBILE</span>
                </div>
                <div className="flex-grow flex flex-col justify-center gap-1.5 relative overflow-hidden my-2 rounded-md">
                  <div className="h-16 border border-white/10 rounded overflow-hidden relative group/img2">
                    <img 
                      src="/src/assets/images/Fotos do carro DuoExo.webp" 
                      alt="Configurador Mobile DuoExo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img2:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-brand-gold/80 text-[5px] font-mono font-bold text-black uppercase">
                      60 FPS
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full w-full" />
                  <div className="h-1.5 bg-white/5 rounded-full w-3/4" />
                </div>
                <div className="h-4 bg-brand-gold/10 border border-brand-gold/20 rounded text-[6px] font-mono text-center flex items-center justify-center text-brand-gold">
                  GERAR PDF
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Text copy section */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-accent font-semibold tracking-widest uppercase block">
                [ design adaptativo e responsivo ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Responsividade
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-medium text-white tracking-tight leading-snug">
                Mais de 80% dos acessos atualmente acontecem através de smartphones.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                Por esse motivo, todo o configurador será desenvolvido para oferecer uma experiência completa tanto em desktop quanto em dispositivos móveis.
              </p>
            </div>

            {/* Verbatim checklist cards */}
            <div className="space-y-3.5 border-t border-white/5 pt-6">
              {listItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-xl bg-brand-dark/40 border border-white/[0.03]"
                  id={`resp-item-${idx}`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-2" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-zinc-500 font-light block">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});
