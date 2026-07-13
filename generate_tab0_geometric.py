import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
  <defs>
    <style>
      {`
        @keyframes float-cube { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes flow-in { 0% { stroke-dashoffset: 150; } 100% { stroke-dashoffset: 0; } }
        @keyframes flow-out { 0% { stroke-dashoffset: -80; } 100% { stroke-dashoffset: 0; } }
        @keyframes pulse-warn { 0%, 100% { filter: drop-shadow(0 0 8px rgba(228, 72, 86, 0.4)); transform: scale(1); } 50% { filter: drop-shadow(0 0 20px rgba(228, 72, 86, 0.8)); transform: scale(1.05); } }
        @keyframes node-pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.3); } }
      `}
    </style>
    <filter id="glowPurple"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    
    <linearGradient id="lineGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
       <stop offset="0%" stopColor="transparent" />
       <stop offset="100%" stopColor="#6354F3" />
    </linearGradient>
    <linearGradient id="lineGradRight" x1="100%" y1="100%" x2="0%" y2="0%">
       <stop offset="0%" stopColor="transparent" />
       <stop offset="100%" stopColor="#6354F3" />
    </linearGradient>
    <linearGradient id="lineGradCenter" x1="0%" y1="100%" x2="0%" y2="0%">
       <stop offset="0%" stopColor="transparent" />
       <stop offset="100%" stopColor="#6354F3" />
    </linearGradient>
    <linearGradient id="lineGradRed" x1="0%" y1="100%" x2="0%" y2="0%">
       <stop offset="0%" stopColor="#E44856" />
       <stop offset="100%" stopColor="transparent" />
    </linearGradient>
  </defs>

  {/* Clean Minimalist Dot Grid */}
  <pattern id="bg-grid-clean" width="24" height="24" patternUnits="userSpaceOnUse">
    <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.03)" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#bg-grid-clean)" />

  <g transform="translate(200, 130)">
    
    <g style={{ animation: 'float-cube 4s ease-in-out infinite' }}>
      
      {/* Input Pipelines */}
      {/* Left Pipeline */}
      <path d="M -140 80 L -27.5 25" fill="none" stroke="url(#lineGradLeft)" strokeWidth="3" strokeLinecap="round" />
      <path d="M -140 80 L -27.5 25" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 150" style={{ animation: 'flow-in 1.5s linear infinite' }} />
      {/* Right Pipeline */}
      <path d="M 140 80 L 27.5 25" fill="none" stroke="url(#lineGradRight)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 140 80 L 27.5 25" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 150" style={{ animation: 'flow-in 1.5s linear infinite 0.5s' }} />
      {/* Bottom Pipeline */}
      <path d="M 0 140 L 0 65" fill="none" stroke="url(#lineGradCenter)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 0 140 L 0 65" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 150" style={{ animation: 'flow-in 1.5s linear infinite 1s' }} />

      {/* Input Source Nodes (Floating at the ends of pipelines) */}
      <g transform="translate(-140, 80)">
         <circle r="8" fill="rgba(99, 84, 243, 0.2)" stroke="#6354F3" strokeWidth="1.5" />
         <circle r="4" fill="#6354F3" filter="url(#glowPurple)" style={{ animation: 'node-pulse 2s infinite' }} />
      </g>
      <g transform="translate(140, 80)">
         <circle r="8" fill="rgba(99, 84, 243, 0.2)" stroke="#6354F3" strokeWidth="1.5" />
         <circle r="4" fill="#6354F3" filter="url(#glowPurple)" style={{ animation: 'node-pulse 2s infinite 0.6s' }} />
      </g>
      <g transform="translate(0, 140)">
         <circle r="8" fill="rgba(99, 84, 243, 0.2)" stroke="#6354F3" strokeWidth="1.5" />
         <circle r="4" fill="#6354F3" filter="url(#glowPurple)" style={{ animation: 'node-pulse 2s infinite 1.2s' }} />
      </g>

      {/* Output Pipeline (Moving up) */}
      <path d="M 0 -15 L 0 -90" fill="none" stroke="url(#lineGradRed)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 0 -15 L 0 -90" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="15 80" style={{ animation: 'flow-out 1s linear infinite' }} />

      {/* Central Isometric Correlation Engine (Cube) */}
      <g filter="url(#glowPurple)">
        {/* Top face */}
        <path d="M 0 -40 L 55 -15 L 0 10 L -55 -15 Z" fill="#8F92E9" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left face */}
        <path d="M -55 -15 L 0 10 L 0 65 L -55 40 Z" fill="#6354F3" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right face */}
        <path d="M 0 10 L 55 -15 L 55 40 L 0 65 Z" fill="rgba(99, 84, 243, 0.6)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        
        {/* Inner Glowing Core details */}
        <path d="M 0 -25 L 20 -15 L 0 -5 L -20 -15 Z" fill="rgba(255,255,255,0.4)" />
      </g>

      {/* Output Warning Hexagon */}
      <g transform="translate(0, -95)" style={{ transformOrigin: '0px -95px', animation: 'pulse-warn 2s ease-in-out infinite' }}>
        <path d="M 0 -26 L 22.5 -13 L 22.5 13 L 0 26 L -22.5 13 L -22.5 -13 Z" fill="#0B0D12" stroke="#E44856" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 0 -26 L 22.5 -13 L 22.5 13 L 0 26 L -22.5 13 L -22.5 -13 Z" fill="rgba(228, 72, 86, 0.2)" />
        {/* Exclamation Mark */}
        <rect x="-2.5" y="-12" width="5" height="14" rx="2.5" fill="#E44856" />
        <circle cx="0" cy="8" r="3" fill="#E44856" />
      </g>

    </g>

  </g>
</svg>
"""

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

start_idx = content.find('{activeCapability === 0 && (')
if start_idx == -1:
    print("Could not find start index")
    exit(1)

svg_start = content.find('<svg', start_idx)
svg_end = content.find('</svg>', svg_start) + 6

new_content = content[:svg_start] + svg_content.strip() + content[svg_end:]

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Applied clean geometric SaaS SVG for Tab 0.")
