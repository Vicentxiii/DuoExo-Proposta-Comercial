/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface MediaBadgeProps {
  outlet: string;
}

export function MediaBadge({ outlet }: MediaBadgeProps) {
  // Helper to interpolate Bezier curves for wreath stems and leaf placement
  const getBezierPoint = (t: number, p0: number[], p1: number[], p2: number[], p3: number[]) => {
    const mt = 1 - t;
    const x = mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0];
    const y = mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1];
    return [x, y];
  };

  const renderLeaves = (side: "left" | "right") => {
    // Control points for organic crescent wreath shape
    const p0 = [50, 85];
    const p1 = side === "left" ? [18, 85] : [82, 85];
    const p2 = side === "left" ? [8, 42] : [92, 42];
    const p3 = side === "left" ? [36, 12] : [64, 12];

    const leaves = [];
    const count = 12; // 12 leaves per branch, matching the provided badges

    for (let i = 0; i < count; i++) {
      // Distribute leaves organically along the stem length
      const t = 0.05 + (i / (count - 1)) * 0.9;
      const [x, y] = getBezierPoint(t, p0, p1, p2, p3);

      // Get tangent vector for correct leaf rotation
      const tNext = Math.min(t + 0.01, 1.0);
      const [xNext, yNext] = getBezierPoint(tNext, p0, p1, p2, p3);

      const dx = xNext - x;
      const dy = yNext - y;
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      // Rotate leaves outward and upward relative to stem tangent
      const leafAngle = angleDeg - 90 + (side === "left" ? -24 : 24);

      // Organic sizing: slightly smaller at the ends, full size in the middle
      const scale = 0.55 + Math.sin(t * Math.PI) * 0.38;

      leaves.push(
        <g key={i} transform={`translate(${x}, ${y}) rotate(${leafAngle}) scale(${scale})`}>
          {/* Detailed premium dual-tone golden leaf */}
          <path
            d="M 0,0 C -3,-4 -6,-3 -7,-8 C -8,-12 -4,-15 0,-17 C 4,-15 8,-12 7,-8 C 6,-3 3,-4 0,0 Z"
            fill="url(#gold-grad)"
            filter="url(#badge-shadow)"
          />
          {/* Delicate leaf vein highlight */}
          <path
            d="M 0,0 Q 0,-9 0,-15"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="0.45"
            fill="none"
          />
        </g>
      );
    }
    return leaves;
  };

  const renderCenterContent = () => {
    switch (outlet.toLowerCase()) {
      case "olhar digital":
        return (
          <g>
            {/* Olhar Digital glowing futuristic tech eye */}
            <g transform="translate(41, 38)">
              <defs>
                <radialGradient id="eye-iris" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="60%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#052e16" />
                </radialGradient>
              </defs>
              {/* Outer cybernetic ring */}
              <circle cx="0" cy="0" r="9" fill="none" stroke="#22c55e" strokeWidth="0.4" strokeDasharray="3,1.5" />
              <circle cx="0" cy="0" r="7.5" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.4" />
              {/* Glowing iris */}
              <circle cx="0" cy="0" r="6.2" fill="url(#eye-iris)" stroke="#4ade80" strokeWidth="0.4" />
              {/* Futuristic pupil and aperture */}
              <circle cx="0" cy="0" r="2.8" fill="#000000" />
              {/* Digital radar segment */}
              <path d="M -6.2,0 A 6.2,6.2 0 0,1 0,-6.2" fill="none" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" />
              {/* Reflection highlight */}
              <circle cx="-1.5" cy="-1.5" r="1.2" fill="#ffffff" opacity="0.85" />
            </g>

            {/* "OLHAR DIGITAL" typography on the right */}
            <text
              x="52"
              y="37"
              textAnchor="start"
              fill="#FFFFFF"
              fontSize="5.8"
              fontWeight="900"
              fontFamily="'Space Grotesk', system-ui, sans-serif"
              letterSpacing="0.1"
            >
              OLHAR
            </text>
            <text
              x="52"
              y="43"
              textAnchor="start"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.35"
              fontSize="5.8"
              fontWeight="900"
              fontFamily="'Space Grotesk', system-ui, sans-serif"
              letterSpacing="0.1"
            >
              DIGITAL
            </text>

            {/* "DESTAQUE" bold elegant text spanning below */}
            <text
              x="50"
              y="56"
              textAnchor="middle"
              fill="url(#gold-grad)"
              fontSize="8.5"
              fontWeight="800"
              fontFamily="'Inter', system-ui, sans-serif"
              letterSpacing="1.2"
              filter="url(#badge-shadow)"
            >
              DESTAQUE
            </text>
          </g>
        );

      case "cnn brasil":
        return (
          <g>
            {/* CNN double-outline trademark script */}
            <g transform="translate(34.5, 27) scale(0.65)">
              <path
                d="M 12,24 C 12,14 16,10 24,10 C 32,10 32,18 32,24 L 32,10 L 41,24 L 41,10 M 41,24 L 41,10 L 50,24 L 50,10"
                fill="none"
                stroke="#FF3B56"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 12,24 C 12,14 16,10 24,10 C 32,10 32,18 32,24 L 32,10 L 41,24 L 41,10 M 41,24 L 41,10 L 50,24 L 50,10"
                fill="none"
                stroke="#12131a"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* BRASIL text below */}
            <text
              x="50"
              y="53"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="6.2"
              fontWeight="800"
              fontFamily="'Inter', system-ui, sans-serif"
              letterSpacing="2.5"
            >
              BRASIL
            </text>

            {/* Double-line subtext with beautiful serif italics */}
            <text
              x="50"
              y="61"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.1"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              O primeiro configurador
            </text>
            <text
              x="50"
              y="65"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.1"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              de supercarros do Brasil
            </text>
          </g>
        );

      case "infomoney":
        return (
          <g>
            {/* InfoMoney brand text logo */}
            <text
              x="50"
              y="40"
              textAnchor="middle"
              fontFamily="'Inter', system-ui, sans-serif"
              fontWeight="900"
              fontSize="7.6"
              letterSpacing="0.1"
            >
              <tspan fill="#FFFFFF">Info</tspan>
              <tspan fill="url(#gold-grad)">Money</tspan>
            </text>

            {/* "DESTAQUE" elegant serif subtitle */}
            <text
              x="50"
              y="51"
              textAnchor="middle"
              fill="url(#gold-grad)"
              fontSize="7"
              fontWeight="700"
              fontFamily="'Playfair Display', Georgia, serif"
              letterSpacing="1.4"
              filter="url(#badge-shadow)"
            >
              DESTAQUE
            </text>

            {/* Dual line english localization */}
            <text
              x="50"
              y="59"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.0"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              The first car configurator
            </text>
            <text
              x="50"
              y="63"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.0"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              of latin america 2026
            </text>
          </g>
        );

      case "g1":
      default:
        return (
          <g>
            {/* Red outline box and G1 typography */}
            <g transform="translate(41.5, 24)">
              <rect
                x="0"
                y="0"
                width="17"
                height="12"
                rx="3.5"
                fill="none"
                stroke="#FF3B56"
                strokeWidth="1.2"
                filter="drop-shadow(0 0 1.5px rgba(255, 59, 86, 0.4))"
              />
              <text
                x="8.5"
                y="8.5"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="'Inter', system-ui, sans-serif"
                fontWeight="900"
                fontSize="8"
              >
                g1
              </text>
            </g>

            {/* "DESTAQUE O GLOBO" block subheaders */}
            <text
              x="50"
              y="46"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="5.2"
              fontWeight="800"
              fontFamily="'Inter', system-ui, sans-serif"
              letterSpacing="1.2"
            >
              DESTAQUE
            </text>
            <text
              x="50"
              y="52"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="5.2"
              fontWeight="500"
              fontFamily="'Inter', system-ui, sans-serif"
              letterSpacing="1.8"
            >
              O GLOBO
            </text>

            {/* Lowercase italic bottom descriptor */}
            <text
              x="50"
              y="60"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.0"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              o primeiro configurador
            </text>
            <text
              x="50"
              y="64"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="3.0"
              fontWeight="400"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
            >
              virtual da america latina
            </text>
          </g>
        );
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Absolute high-fidelity vector representation */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full max-h-36 select-none transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          {/* Luxurious Metallic Gold Gradient */}
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="25%" stopColor="#FACC15" />
            <stop offset="65%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>

          {/* Smooth metallic golden stem gradient */}
          <linearGradient id="stem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>

          {/* Depth Drop Shadow Filter */}
          <filter id="badge-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Wreath Main Stems */}
        <path
          d="M 50,85 C 24,85 13,64 13,42 C 13,25 24,14 35,11"
          fill="none"
          stroke="url(#stem-grad)"
          strokeWidth="1.3"
          strokeLinecap="round"
          filter="url(#badge-shadow)"
        />
        <path
          d="M 50,85 C 76,85 87,64 87,42 C 87,25 76,14 65,11"
          fill="none"
          stroke="url(#stem-grad)"
          strokeWidth="1.3"
          strokeLinecap="round"
          filter="url(#badge-shadow)"
        />
        {/* Wreath central bow stem tie */}
        <path
          d="M 44,86 C 48,87.5 52,87.5 56,86"
          fill="none"
          stroke="url(#stem-grad)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Laurel leaves branches */}
        {renderLeaves("left")}
        {renderLeaves("right")}

        {/* Centerpiece Branding and Text */}
        {renderCenterContent()}
      </svg>
    </div>
  );
}
