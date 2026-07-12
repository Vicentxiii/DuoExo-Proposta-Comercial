/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";
import { ArrowUp } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default memo(function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-dark py-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-10 w-[30vw] h-[30vh] bg-zinc-900/40 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Upper Segment: Branding and Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BrandLogo className="h-4 sm:h-5 text-white/80 hover:text-white" />
            <span className="h-4 w-px bg-white/10 hidden sm:inline" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
              EXPERIÊNCIA QUE VENDE
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 rounded-full bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all font-mono text-[10px] uppercase tracking-wider focus:outline-none cursor-pointer"
            id="footer-scroll-top-btn"
          >
            <span>Início</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lower Segment: Creators & Rights */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 text-[11px] text-zinc-500 font-light">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 DWO. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span>Proposta confidencial de uso exclusivo.</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
            <span>Projetado por</span>
            <a
              href="https://instagram.com/vicenteczar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white transition-colors underline underline-offset-4 font-semibold"
              id="footer-creator-link"
            >
              Vicente Czar
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
});
