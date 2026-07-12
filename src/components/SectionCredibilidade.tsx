/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Newspaper, Linkedin, Github, Globe, Instagram } from "lucide-react";

export default memo(function SectionCredibilidade() {
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

  // Verbatim news entities with actual URLs and uploaded image badges
  const outlets = [
    {
      name: "InfoMoney",
      desc: "Maior veículo de finanças e investimentos do país",
      tag: "Mercado Financeiro",
      url: "https://www.infomoney.com.br/consumo/super-veloce-unico-configurador/",
      badgeUrl: "/images/INFO MONEY.png"
    },
    {
      name: "CNN Brasil",
      desc: "Líder global em cobertura jornalística e credibilidade",
      tag: "Impacto Global",
      url: "https://www.cnnbrasil.com.br/auto/super-veloce-unico-hipercarro-nacional-de-r-15-milhao-e-personalizavel/",
      badgeUrl: "/images/CNN DESTAUQE.png"
    },
    {
      name: "Olhar Digital",
      desc: "Referência em tecnologia, inovação e futuro digital",
      tag: "Tecnologia & Inovação",
      url: "https://olhardigital.com.br/2026/04/24/carros-e-tecnologia/parece-videogame-site-deixa-voce-personalizar-supercarro-brasileiro-de-r-15-milhao/",
      badgeUrl: "/images/Olhar digita l.png"
    },
    {
      name: "G1",
      desc: "Portal de Notícias do Grupo Globo",
      tag: "Destaque Nacional",
      url: "https://g1.globo.com/carros/noticia/2026/04/24/supercarro-brasileiro-de-r-15-milhao-ganha-configurador-virtual.ghtml",
      badgeUrl: "/images/DESTAQUE G1.png"
    }
  ];

  return (
    <section
      id="credibilidade"
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-zinc-900/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail with Authoritative Background Image */}
          <div className="lg:col-span-5 relative p-8 sm:p-10 rounded-3xl bg-brand-dark/40 border border-white/5 backdrop-blur-md overflow-hidden min-h-[580px] flex flex-col justify-end group shadow-2xl">
            
            {/* Background image of Vicente Czar with high opacity as requested */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/Vicente Czar.jpeg"
                alt="Vicente - Criador e Autoridade"
                className="w-full h-full object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Smooth darkening overlay gradients to ensure excellent contrast for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/65 to-brand-dark/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-transparent to-brand-dark/10" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-gold font-semibold tracking-widest uppercase block drop-shadow-md">
                  [ portfólio & autoridade ]
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                  Vicente
                </h2>
              </div>

              <p className="text-zinc-100 text-base md:text-lg leading-relaxed font-normal drop-shadow-md">
                O profissional responsável pelo desenvolvimento já participou da criação de um configurador validado pelo mercado nacional.
              </p>

              <p className="text-zinc-200 text-sm leading-relaxed font-light bg-brand-dark/85 border border-white/10 p-5 rounded-2xl backdrop-blur-sm shadow-2xl">
                Essa experiência reduz riscos, acelera decisões técnicas e aumenta significativamente a qualidade da entrega.
              </p>

              <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-200 uppercase tracking-widest drop-shadow-md bg-brand-dark/75 p-3 rounded-xl border border-white/10 inline-flex shadow-lg">
                <ShieldCheck className="w-4 h-4 text-brand-gold animate-pulse" />
                <span>Homologado e Reconhecido Nacionalmente</span>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {[
                  { icon: Linkedin, url: "https://www.linkedin.com/in/vicenteczar/", label: "LinkedIn" },
                  { icon: Github, url: "https://github.com/Vicentxiii/transcent-labs", label: "GitHub" },
                  { icon: Globe, url: "https://vicenteczar.dev.br/", label: "Website" },
                  { icon: Instagram, url: "https://www.instagram.com/vicentczar/", label: "IG Personal" },
                  { icon: Instagram, url: "https://www.instagram.com/vicenteczar.dev/", label: "IG Dev" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-brand-dark/60 border border-white/10 text-zinc-300 hover:text-brand-accent hover:border-brand-accent/30 transition-all shadow-lg backdrop-blur-sm group/icon"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Cards: Verbatim Media Outlets */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
                Destaques na Mídia Brasileira:
              </span>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {outlets.map((outlet, idx) => (
                  <motion.a
                    href={outlet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -6, 
                      borderColor: "rgba(234, 179, 8, 0.35)",
                      boxShadow: "0 12px 30px -10px rgba(234, 179, 8, 0.12)"
                    }}
                    className="p-5 rounded-2xl bg-brand-dark/40 border border-white/5 transition-all flex flex-col justify-between group h-60 relative overflow-hidden"
                    id={`cred-outlet-${outlet.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {/* Header bar within the card */}
                    <div className="flex justify-between items-start z-10">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
                        {outlet.tag}
                      </span>
                      <div className="p-1 rounded-md bg-white/[0.03] text-zinc-500 group-hover:text-brand-accent transition-colors">
                        <Newspaper className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Actual PNG image badge as requested */}
                    <div className="flex-1 flex items-center justify-center py-2 z-10">
                      <img
                        src={outlet.badgeUrl}
                        alt={`Selo de Destaque ${outlet.name}`}
                        className="max-h-40 w-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Subtle action prompt inside card footer */}
                    <div className="text-center text-[10px] text-zinc-500 group-hover:text-brand-accent transition-colors font-mono uppercase tracking-wider z-10 flex items-center justify-center gap-1">
                      <span>Ler Artigo Completo</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>

                    {/* Hover gold gradient glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});
