import React from 'react';

/**
 * RAVZEL Brand Monogram 'R'
 * Iconic geometric 'R' with purple faceted corner accent.
 */
export function BrandMonogram({ size = 40, className = "" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg bg-[#0E0E0E] p-1 hairline-border group transition-all duration-300 hover:border-[#A78BFA]/50 ${className}`}
      style={{ width: size, height: size }}
      title="RAVZEL Monogram"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="purpleFacet" x1="20" y1="55" x2="48" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4B5FD" />
            <stop offset="0.6" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Monogram R glyph */}
        {/* Top wing and right loop */}
        <path
          d="M 22 22 L 66 22 C 78 22 88 30 88 43 C 88 56 78 64 64 64 H 48 L 78 90 H 60 L 36 68 H 36 V 90 H 22 V 22 Z M 36 34 V 54 H 62 C 70 54 74 50 74 43 C 74 36 70 34 62 34 Z"
          fill="#F8F6EE"
          className="transition-colors duration-300 group-hover:fill-white"
        />

        {/* Purple Faceted Lower Left Polygon */}
        <polygon
          points="22,66 42,88 22,88"
          fill="url(#purpleFacet)"
          className="transition-transform duration-300 group-hover:scale-105 origin-bottom-left"
        />
      </svg>
    </div>
  );
}

export default BrandMonogram;
