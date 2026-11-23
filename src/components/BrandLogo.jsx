import React from 'react';

/**
 * RAVZEL Brand Wordmark
 * Faithful SVG recreation of the official RAVZEL identity:
 * Geometric typography with distinctive cutouts and selective purple (#A78BFA) triangle accent in the letter 'A'.
 */
export function BrandLogo({ className = "h-8", showTagline = false, light = false }) {
  const textColor = light ? "#0E0E0E" : "#F8F6EE";
  const accentColor = "#A78BFA";
  const taglineColor = light ? "#555555" : "#D9D9D9";

  return (
    <div className={`inline-flex flex-col items-start select-none group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 540 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full max-h-10 transition-transform duration-300 group-hover:scale-[1.02]"
        aria-label="RAVZEL Brand Wordmark"
      >
        {/* Letter 'R' */}
        <g id="letter-R">
          {/* Top angled wing */}
          <path
            d="M 12 18 L 65 18 C 85 18 98 28 98 44 C 98 58 87 67 70 69 L 100 90 H 80 L 52 70 H 30 V 90 H 16 V 18 Z M 30 32 V 56 H 64 C 74 56 82 52 82 44 C 82 36 74 32 64 32 H 30 Z"
            fill={textColor}
          />
          {/* Decorative geometric cut on R top bar */}
          <polygon points="12,18 28,18 12,34" fill={textColor} />
        </g>

        {/* Letter 'A' with distinctive Purple Triangle Glyph */}
        <g id="letter-A">
          {/* Left leg */}
          <polygon points="126,90 156,18 174,18 144,90" fill={textColor} />
          {/* Right leg */}
          <polygon points="174,18 192,18 222,90 204,90" fill={textColor} />
          {/* Purple inner triangle accent */}
          <polygon
            points="174,48 152,90 196,90"
            fill={accentColor}
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
        </g>

        {/* Letter 'V' */}
        <g id="letter-V">
          <polygon points="234,18 252,18 277,82 302,18 320,18 286,90 268,90" fill={textColor} />
        </g>

        {/* Letter 'Z' */}
        <g id="letter-Z">
          <polygon
            points="334,18 392,18 392,31 356,77 394,77 394,90 334,90 334,77 370,31 334,31"
            fill={textColor}
          />
        </g>

        {/* Letter 'E' */}
        <g id="letter-E">
          <polygon
            points="408,18 464,18 464,31 424,31 424,47 458,47 458,60 424,60 424,77 466,77 466,90 408,90"
            fill={textColor}
          />
        </g>

        {/* Letter 'L' */}
        <g id="letter-L">
          <polygon points="480,18 496,18 496,77 534,77 534,90 480,90" fill={textColor} />
        </g>
      </svg>

      {showTagline && (
        <span
          className="text-[9px] tracking-[0.24em] font-mono uppercase mt-1 pl-1 transition-colors duration-300"
          style={{ color: taglineColor }}
        >
          BUILD BEYOND. EVOLVE FORWARD.
        </span>
      )}
    </div>
  );
}

export default BrandLogo;
