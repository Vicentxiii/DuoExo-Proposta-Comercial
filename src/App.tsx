/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroCinematic from "./components/HeroCinematic";
import SectionOQueSera from "./components/SectionOQueSera";
import SectionComplexidade from "./components/SectionComplexidade";
import SectionCredibilidade from "./components/SectionCredibilidade";
import SectionResponsividade from "./components/SectionResponsividade";
import SectionInvestimento from "./components/SectionInvestimento";
import SectionCondicoes from "./components/SectionCondicoes";
import SectionConsideracoes from "./components/SectionConsideracoes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light antialiased selection:bg-brand-accent/30 selection:text-white overflow-hidden relative font-sans custom-cursor-active">
      
      {/* Scroll Progress Bar Indicator on top */}
      <div 
        className="scroll-progress-bar"
        style={{
          width: "100%",
          transformOrigin: "left",
          animation: "none" // Managed via standard CSS if needed or just left simple
        }} 
      />

      {/* Premium Visual Overlay: Background Noise / Subtle Grain */}
      <div className="fixed inset-0 pointer-events-none noise-bg opacity-[0.02] z-50" />

      {/* Adaptive Hardware Custom Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Top Menu */}
      <Navbar />

      {/* Primary Context Sections Wrapper */}
      <main className="relative w-full">
        {/* Section 1: Cinematic Verbatim Hero Landing */}
        <HeroCinematic />

        {/* Section 2: O Que Será Desenvolvido + Live interactive 3D Simulator */}
        <SectionOQueSera />

        {/* Section 3: Por que este projeto possui alto valor? Bento Grid */}
        <SectionComplexidade />

        {/* Section 4: Credibilidade (G1, InfoMoney, CNN Brasil, Forbes) */}
        <SectionCredibilidade />

        {/* Section 5: Responsividade Dual-device verification */}
        <SectionResponsividade />

        {/* Section 6: Investimento Interactive Pricing calculator */}
        <SectionInvestimento />

        {/* Section 7: Condições Comerciais, timelines, and signal stages */}
        <SectionCondicoes />

        {/* Section 8: Considerações finais vision statement */}
        <SectionConsideracoes />
      </main>

      {/* Structured Status Footer */}
      <Footer />
    </div>
  );
}
