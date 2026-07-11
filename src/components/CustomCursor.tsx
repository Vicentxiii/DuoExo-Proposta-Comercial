/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-based
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
      if (!hasTouch) {
        document.documentElement.classList.add("custom-cursor-active");
      }
    };

    checkDevice();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation for cursor types
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest("button, a, input, select, textarea, [role='button']");
      const viewable = target.closest("[data-cursor='view']");
      const draggable = target.closest("[data-cursor='drag']");

      if (viewable) {
        setCursorType("view");
      } else if (draggable) {
        setCursorType("drag");
      } else if (clickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Primary Inner Pointer */}
      <motion.div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Lagging Outer Ring */}
      <motion.div
        id="cursor-ring"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 border border-white/20 flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-white uppercase"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "view" ? 80 : cursorType === "drag" ? 64 : cursorType === "hover" ? 44 : 24,
          height: cursorType === "view" ? 80 : cursorType === "drag" ? 64 : cursorType === "hover" ? 44 : 24,
          backgroundColor:
            cursorType === "view"
              ? "rgba(59, 130, 246, 0.2)"
              : cursorType === "drag"
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(255, 255, 255, 0.05)",
          borderColor:
            cursorType === "view"
              ? "rgba(59, 130, 246, 0.6)"
              : cursorType === "drag"
                ? "rgba(16, 185, 129, 0.6)"
                : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      >
        {cursorType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-brand-light text-glow-accent"
          >
            Ver
          </motion.span>
        )}
        {cursorType === "drag" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-brand-light text-glow-emerald"
          >
            Arrastar
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
