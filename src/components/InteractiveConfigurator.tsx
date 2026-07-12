/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCw, Sliders, CheckCircle, Download, Info } from "lucide-react";
import BorderGlow from "./BorderGlow";
import ThreeCarViewer from "./ThreeCarViewer";

interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  glow: string;
  gradient: string;
}

interface WheelPreset {
  id: string;
  name: string;
  desc: string;
}

export default memo(function InteractiveConfigurator() {
  const [paint, setPaint] = useState<string>("stealth");
  const [wheels, setWheels] = useState<string>("aero");
  const [wheelColor, setWheelColor] = useState<string>("#121214");
  const [aeroKit, setAeroKit] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(35); // Degrees (0 to 360)
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const colors: ColorPreset[] = [
    { id: "stealth", name: "Preto Carbono Matte", hex: "#121214", glow: "rgba(30,30,35,0.4)", gradient: "from-zinc-900 to-zinc-950" },
    { id: "gold", name: "Dourado Metálico", hex: "#d4af37", glow: "rgba(212,175,55,0.3)", gradient: "from-amber-600 to-amber-900" },
    { id: "sapphire", name: "Azul Safira Elétrico", hex: "#3b82f6", glow: "rgba(59,130,246,0.3)", gradient: "from-blue-600 to-blue-900" },
    { id: "crimson", name: "Vermelho Crimson", hex: "#ef4444", glow: "rgba(239,68,68,0.3)", gradient: "from-red-600 to-red-950" },
    { id: "emerald", name: "Verde Esmeralda", hex: "#10b981", glow: "rgba(16,185,129,0.3)", gradient: "from-emerald-600 to-emerald-950" },
    { id: "orange", name: "Laranja Cyber", hex: "#f59e0b", glow: "rgba(245,158,11,0.3)", gradient: "from-orange-500 to-orange-800" },
    { id: "violet", name: "Violeta Elétrico", hex: "#8b5cf6", glow: "rgba(139,92,246,0.3)", gradient: "from-violet-600 to-violet-900" },
    { id: "titanium", name: "Titânio Escovado", hex: "#71717a", glow: "rgba(113,113,122,0.3)", gradient: "from-zinc-600 to-zinc-800" },
  ];

  const wheelsList: WheelPreset[] = [
    { id: "aero", name: "Aero Blade C1", desc: "Design aerodinâmico para menor arrasto" },
    { id: "spoke", name: "Performance Spoke S5", desc: "Multiraios leve em liga de magnésio" },
    { id: "carbon", name: "Carbon Monobloc", desc: "Fibra de carbono ultra-leve" },
  ];

  const wheelColors = [
    { name: "Preto Carbono", hex: "#121214" },
    { name: "Prata Alumínio", hex: "#d1d5db" },
    { name: "Ouro Bronze", hex: "#b45309" },
    { name: "Azul Titânio", hex: "#3b82f6" },
    { name: "Cromo Dourado", hex: "#f59e0b" },
    { name: "Vermelho Sport", hex: "#ef4444" },
  ];

  const triggerPDFMock = useCallback(() => {
    setIsDownloading(true);
    
    setTimeout(() => {
      setIsDownloading(false);
      setNotification("PDF Gerado! Detalhamento da configuração exportado com sucesso.");
      
      // Auto-expire notification
      setTimeout(() => setNotification(null), 4000);

      // Real programmatic trigger to simulate download of a custom configured document
      const docContent = `PROPOSTA COMERCIAL - AURA CONFIGURATOR\n` +
        `Veículo: Lexus BEV Sport Concept (3D Real)\n` +
        `Cor da Pintura: ${colors.find(c => c.id === paint)?.name || paint}\n` +
        `Rodas Escolhidas: ${wheelsList.find(w => w.id === wheels)?.name || wheels}\n` +
        `Cor das Rodas: ${wheelColors.find(wc => wc.hex === wheelColor)?.name || wheelColor}\n` +
        `Kit Aero Carbono: ${aeroKit ? "Ativado" : "Desativado"}\n` +
        `Resumo: Proposta personalizada Vicente Czar 2026`;
      
      const blob = new Blob([docContent], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `aura-proposta-configurador.txt`;
      link.click();
    }, 1200);
  }, [paint, wheels, wheelColor, aeroKit]);

  return (
    <BorderGlow
      className="h-full w-full"
      backgroundColor="#050505"
      borderRadius={24}
      glowColor="217 91 60"
      colors={['#3b82f6', '#d4af37', '#1d4ed8']}
      fillOpacity={0.12}
    >
      <div className="p-3 sm:p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating active state notifier */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="absolute top-4 left-1/2 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 text-brand-emerald font-mono text-[10px] tracking-wide shadow-lg"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {/* Dynamic Interactive Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-accent animate-pulse" />
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                Prévia Interativa: Lexus Sport Concept
              </h4>
            </div>
            
            <div className="flex items-center self-start sm:self-auto gap-1.5 bg-brand-dark/50 px-2.5 py-1 rounded-md border border-white/5 font-mono text-[9px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              <span>GPU ON (60 FPS)</span>
            </div>
          </div>

          {/* Visual Canvas Simulator */}
          <div className="relative rounded-2xl bg-white border border-white/10 flex items-center justify-center min-h-[200px] sm:min-h-[260px] md:min-h-[320px] overflow-hidden group w-full">
            <ThreeCarViewer
              rotationAngle={rotationAngle}
              onRotationChange={setRotationAngle}
              paintColor={colors.find((c) => c.id === paint)?.hex || colors[0].hex}
              wheelColor={wheelColor}
              wheelsType={wheels}
              aeroKit={aeroKit}
            />

            {/* Interactive Help Hint */}
            <div className="absolute bottom-3 left-4 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
              <Info className="w-3.5 h-3.5 text-brand-accent" />
              <span>Desktop: Gire com o mouse • Mobile: Arraste para girar</span>
            </div>
          </div>

          {/* Rotation Orbit controller slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[9px] text-zinc-500">
              <span>Ângulo de Órbita 360°</span>
              <span className="text-zinc-300">{rotationAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-ew-resize accent-brand-accent focus:outline-none"
            />
          </div>

          {/* Configuration customization controllers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-white/5 pt-3 sm:pt-4">
            {/* Paint selections */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                Pintura Externa
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setPaint(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border transition-all shrink-0 ${
                      paint === c.id 
                        ? "border-white scale-110 shadow-lg" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                    aria-label={c.name}
                    id={`config-paint-${c.id}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-zinc-400 font-medium block">
                {colors.find(c => c.id === paint)?.name}
              </span>
            </div>

            {/* Wheels select buttons */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                Modelo das Rodas
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {wheelsList.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWheels(w.id)}
                    className={`px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg border text-[8px] sm:text-[9px] font-mono transition-all focus:outline-none ${
                      wheels === w.id
                        ? "bg-brand-accent/10 border-brand-accent/50 text-white"
                        : "bg-brand-dark border-white/5 text-zinc-500 hover:text-zinc-400 hover:border-white/10"
                    }`}
                    id={`config-wheel-${w.id}`}
                  >
                    {w.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <span className="text-[9px] text-zinc-500 block leading-tight">
                {wheelsList.find(w => w.id === wheels)?.desc}
              </span>
            </div>
          </div>

          {/* Advanced colors selectors: Wheel Color */}
          <div className="border-t border-white/5 pt-3 sm:pt-4">
            {/* Wheel color selection */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                Cor das Rodas
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {wheelColors.map((wc) => (
                  <button
                    key={wc.hex}
                    onClick={() => setWheelColor(wc.hex)}
                    style={{ backgroundColor: wc.hex }}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all shrink-0 ${
                      wheelColor === wc.hex 
                        ? "border-brand-accent scale-110 shadow-lg" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                    title={wc.name}
                    aria-label={wc.name}
                    id={`config-wheelcolor-${wc.hex.replace("#", "")}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-zinc-400 font-medium block">
                {wheelColors.find(wc => wc.hex === wheelColor)?.name}
              </span>
            </div>
          </div>

          {/* Aero pack carbon fiber toggle */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3 sm:pt-4 gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-semibold text-white">Pacote Aerodinâmico</span>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 block truncate">Spoiler e difusor de carbono ativo</span>
            </div>
            <button
              onClick={() => setAeroKit(!aeroKit)}
              className={`w-10 h-5 rounded-full p-0.5 transition-all focus:outline-none ${
                aeroKit ? "bg-brand-accent" : "bg-zinc-800"
              }`}
              id="config-aerokit-toggle"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                aeroKit ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>

        {/* Dynamic PDF Resumo generator CTA */}
        <div className="mt-4 sm:mt-8 border-t border-white/5 pt-3 sm:pt-4">
          <button
            onClick={triggerPDFMock}
            disabled={isDownloading}
            className="w-full py-2.5 sm:py-3.5 rounded-xl bg-brand-light hover:bg-white text-brand-dark text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            id="config-pdf-btn"
          >
            {isDownloading ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando Resumo da Configuração...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 transform group-hover:translate-y-0.5 transition-transform" />
                <span>Gerar PDF da Configuração</span>
              </>
            )}
          </button>
        </div>
      </div>
    </BorderGlow>
  );
});
