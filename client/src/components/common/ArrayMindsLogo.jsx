import React from 'react';

/**
 * High-performance vector SVG of the Array Minds brand logo
 * Supports pure transparent rendering without any baked-in box or pill backgrounds.
 * Features optional interactive glowing animations on the 5 iconic array nodes.
 */
const ArrayMindsLogo = ({ 
  className = "h-12 w-auto", 
  animated = true,
  glowColor = "#00C2CB" 
}) => {
  return (
    <svg
      viewBox="0 0 460 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible select-none`}
    >
      <defs>
        {/* Gradients for Nodes */}
        <linearGradient id="nodeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C2CB" />
          <stop offset="100%" stopColor="#1B3B6F" />
        </linearGradient>

        <linearGradient id="nodeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FE4EA" />
          <stop offset="100%" stopColor="#00C2CB" />
        </linearGradient>

        <linearGradient id="nodeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#7FE4EA" />
        </linearGradient>

        <linearGradient id="nodeGradPill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C2CB" />
          <stop offset="50%" stopColor="#7FE4EA" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* 1. ICONIC 5-NODE CONSTELLATION LATTICE */}
      {/* ========================================================================= */}
      <g className={animated ? "animate-pulse-gentle" : ""}>
        
        {/* Node 1 (Bottom Left) */}
        <circle
          cx="38"
          cy="92"
          r="16"
          fill="url(#nodeGrad1)"
          filter="url(#nodeGlow)"
          className={animated ? "animate-bounce-subtle" : ""}
          style={{ animationDelay: '0ms' }}
        />

        {/* Node 2 (Middle Left) */}
        <circle
          cx="76"
          cy="66"
          r="17"
          fill="url(#nodeGrad2)"
          filter="url(#nodeGlow)"
          className={animated ? "animate-bounce-subtle" : ""}
          style={{ animationDelay: '150ms' }}
        />

        {/* Node 3 (Apex Top) */}
        <circle
          cx="116"
          cy="40"
          r="19"
          fill="url(#nodeGrad3)"
          filter="url(#nodeGlow)"
          className={animated ? "animate-bounce-subtle" : ""}
          style={{ animationDelay: '300ms' }}
        />

        {/* Node 4 & 5 (Connected Right Dumbbell / Fluid Bridge) */}
        <g className={animated ? "animate-bounce-subtle" : ""} style={{ animationDelay: '450ms' }}>
          {/* Bridge connection path */}
          <path
            d="M 148 64 C 158 56, 172 62, 178 72 L 188 88 C 194 98, 208 104, 218 96 C 228 88, 222 72, 212 62 L 202 46 C 196 36, 182 30, 172 38 Z"
            fill="url(#nodeGradPill)"
            filter="url(#nodeGlow)"
            opacity="0"
          />
          {/* Dumbbell connecting body */}
          <path
            d="M 148 68 C 148 57, 157 48, 168 48 C 176 48, 183 53, 186 60 L 198 84 C 201 91, 208 96, 216 96 C 227 96, 236 87, 236 76 C 236 65, 227 56, 216 56 C 208 56, 201 61, 198 68 L 186 44 C 183 37, 176 32, 168 32 C 157 32, 148 41, 148 52 Z"
            fill="url(#nodeGradPill)"
            filter="url(#nodeGlow)"
          />
          {/* Node 4 Circle */}
          <circle cx="158" cy="62" r="18" fill="url(#nodeGradPill)" filter="url(#nodeGlow)" />
          {/* Node 5 Circle */}
          <circle cx="196" cy="88" r="18" fill="url(#nodeGradPill)" filter="url(#nodeGlow)" />
          {/* Connecting Bridge Capsule */}
          <line
            x1="158"
            y1="62"
            x2="196"
            y2="88"
            stroke="url(#nodeGradPill)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="url(#nodeGlow)"
          />
        </g>
      </g>

      {/* ========================================================================= */}
      {/* 2. TYPOGRAPHY: "array" & "MINDS" */}
      {/* ========================================================================= */}
      
      {/* "array" (Bold Geometric Lowercase) */}
      <text
        x="250"
        y="74"
        fill="#FFFFFF"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="54"
        fontWeight="800"
        letterSpacing="-0.03em"
      >
        array
      </text>

      {/* "MINDS" (Tracked Uppercase Modern Sans) */}
      <text
        x="253"
        y="112"
        fill="#C7CDDA"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="500"
        letterSpacing="0.28em"
      >
        MINDS
      </text>
    </svg>
  );
};

export default ArrayMindsLogo;
