/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Radio, Compass, Shield, Code, User, ArrowUpRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Synchronize local digital clock mapping to BRT
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "ferramenta", "desenvolvimento", "valores", "credibilidade", "responsividade", "investimento", "condicoes", "consideracoes"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "ferramenta", label: "A Ferramenta" },
    { id: "desenvolvimento", label: "O Sistema" },
    { id: "credibilidade", label: "Experiência" },
    { id: "investimento", label: "Valores" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-2 bg-brand-dark/95 border-b border-white/5 backdrop-blur-md" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Left: Client Brand Logo & Designer Link */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Voltar para o início"
            id="navbar-logo-btn"
          >
            <BrandLogo className="h-4 sm:h-5 text-white group-hover:text-brand-accent" />
          </button>

          {/* Proposal designation banner */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[9px] font-mono font-medium text-zinc-400 tracking-wider uppercase">
              Proposta Comercial 2026
            </span>
          </div>
        </div>

        {/* Center: Scrollspy navigators */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-brand-dark/60 border border-white/5 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-[11px] font-medium tracking-wide transition-all duration-300 focus:outline-none ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
                id={`navspy-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-dot"
                    className="absolute inset-0 bg-white/5 rounded-full border border-white/5"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Info: Live UTC Clock & Instagram Creator link */}
        <div className="flex items-center gap-4">
          {/* Creator link locator */}
          <a
            href="https://instagram.com/vicenteczar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 hover:border-brand-accent/40 text-[10px] font-mono text-zinc-400 hover:text-brand-accent transition-all duration-300"
            id="nav-creator-link"
          >
            <User className="w-3 h-3 text-brand-accent" />
            <span className="hidden sm:inline">Vicente Czar</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400 font-mono text-[11px] bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span className="tabular-nums tracking-widest">{time || "12:00:00"}</span>
            <span className="text-[8px] text-zinc-600">BRT</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
