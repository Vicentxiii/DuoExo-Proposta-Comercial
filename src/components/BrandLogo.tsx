/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from "react";

interface BrandLogoProps {
  className?: string;
  glow?: boolean;
}

export default memo(function BrandLogo({ className = "h-8", glow = true }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center ${className} ${glow ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : ""}`}>
      <img 
        src="/images/Logo DuoExo copy PNG.png" 
        alt="DuoExo Logo" 
        className="h-full w-auto object-contain"
        loading="lazy"
      />
    </div>
  );
});
