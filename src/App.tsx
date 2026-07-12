/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroCinematic from "./components/HeroCinematic";
import Footer from "./components/Footer";

const SectionOQueSera = lazy(() => import("./components/SectionOQueSera"));
const SectionComplexidade = lazy(() => import("./components/SectionComplexidade"));
const SectionCredibilidade = lazy(() => import("./components/SectionCredibilidade"));
const SectionResponsividade = lazy(() => import("./components/SectionResponsividade"));
const SectionInvestimento = lazy(() => import("./components/SectionInvestimento"));
const SectionCondicoes = lazy(() => import("./components/SectionCondicoes"));
const SectionConsideracoes = lazy(() => import("./components/SectionConsideracoes"));

function SectionFallback() {
  return <div className="min-h-screen bg-brand-dark" />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light antialiased selection:bg-brand-accent/30 selection:text-white overflow-hidden relative font-sans custom-cursor-active">
      
      {/* Scroll Progress Bar Indicator on top */}
      <div 
        className="scroll-progress-bar"
        style={{
          width: "100%",
          transformOrigin: "left",
          animation: "none"
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
        <Suspense fallback={<SectionFallback />}>
          <SectionOQueSera />
        </Suspense>

        {/* Section 3: Por que este projeto possui alto valor? Bento Grid */}
        <Suspense fallback={<SectionFallback />}>
          <SectionComplexidade />
        </Suspense>

        {/* Section 4: Credibilidade (G1, InfoMoney, CNN Brasil, Forbes) */}
        <Suspense fallback={<SectionFallback />}>
          <SectionCredibilidade />
        </Suspense>

        {/* Section 5: Responsividade Dual-device verification */}
        <Suspense fallback={<SectionFallback />}>
          <SectionResponsividade />
        </Suspense>

        {/* Section 6: Investimento Interactive Pricing calculator */}
        <Suspense fallback={<SectionFallback />}>
          <SectionInvestimento />
        </Suspense>

        {/* Section 7: Condições Comerciais, timelines, and signal stages */}
        <Suspense fallback={<SectionFallback />}>
          <SectionCondicoes />
        </Suspense>

        {/* Section 8: Considerações finais vision statement */}
        <Suspense fallback={<SectionFallback />}>
          <SectionConsideracoes />
        </Suspense>
      </main>

      {/* Structured Status Footer */}
      <Footer />
    </div>
  );
}
