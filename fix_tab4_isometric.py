import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
  <defs>
    <style>
      {`
        @keyframes bar-rise {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-tag {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(231, 199, 59, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(231, 199, 59, 0.8)); }
        }
        @keyframes draw-line {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}
    </style>
    
    <filter id="glowGreen"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#49B25C" floodOpacity="0.6" /></filter>
    <filter id="glowPurple"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#6354F3" floodOpacity="0.6" /></filter>
    <filter id="glowGold"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#E7C73B" floodOpacity="0.8" /></filter>
    
    <linearGradient id="trendGrad" x1="0%" y1="100%" x2="100%" y2="0%">
       <stop offset="0%" stopColor="#6354F3" />
       <stop offset="100%" stopColor="#E7C73B" />
    </linearGradient>
  </defs>

  {/* Background Plane */}
  <g transform="translate(180, 180) scale(1, 0.5) rotate(45)">
    <rect x="-120" y="-120" width="240" height="240" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    {/* Grid Lines */}
    <path d="M-80 -120 L-80 120 M-40 -120 L-40 120 M0 -120 L0 120 M40 -120 L40 120 M80 -120 L80 120" stroke="rgba(255,255,255,0.03)" />
    <path d="M-120 -80 L120 -80 M-120 -40 L120 -40 M-120 0 L120 0 M-120 40 L120 40 M-120 80 L120 80" stroke="rgba(255,255,255,0.03)" />
  </g>

  {/* BARS */}
  {/* BAR 1: Site 3 (Green) */}
  <g transform="translate(90, 140)" style={{ opacity: 0, animation: 'bar-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
    <path d="M 0 -15 L 20 -25 L 20 0 L 0 10 Z" fill="rgba(73,178,92,0.1)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" />
    <path d="M -20 -25 L 0 -15 L 0 10 L -20 0 Z" fill="rgba(73,178,92,0.3)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" />
    <path d="M 0 -35 L 20 -25 L 0 -15 L -20 -25 Z" fill="rgba(73,178,92,0.6)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" filter="url(#glowGreen)" />
    <text x="-35" y="25" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="var(--font-mono)">SITE 3</text>
  </g>

  {/* BAR 2: Site 12 (Purple) */}
  <g transform="translate(170, 180)" style={{ opacity: 0, animation: 'bar-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}>
    <path d="M 0 -45 L 20 -55 L 20 0 L 0 10 Z" fill="rgba(99,84,243,0.1)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" />
    <path d="M -20 -55 L 0 -45 L 0 10 L -20 0 Z" fill="rgba(99,84,243,0.3)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" />
    <path d="M 0 -65 L 20 -55 L 0 -45 L -20 -55 Z" fill="rgba(99,84,243,0.6)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" filter="url(#glowPurple)" />
    <text x="-40" y="25" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="var(--font-mono)">SITE 12</text>
  </g>

  {/* BAR 3: Site 7 (Gold) */}
  <g transform="translate(250, 220)" style={{ opacity: 0, animation: 'bar-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' }}>
    <path d="M 0 -110 L 20 -120 L 20 0 L 0 10 Z" fill="rgba(231,199,59,0.1)" stroke="#E7C73B" strokeWidth="1" strokeLinejoin="round" />
    <path d="M -20 -120 L 0 -110 L 0 10 L -20 0 Z" fill="rgba(231,199,59,0.3)" stroke="#E7C73B" strokeWidth="1" strokeLinejoin="round" />
    <path d="M 0 -130 L 20 -120 L 0 -110 L -20 -120 Z" fill="rgba(231,199,59,0.7)" stroke="#E7C73B" strokeWidth="1.5" strokeLinejoin="round" filter="url(#glowGold)" style={{ animation: 'pulse-glow 2s infinite' }} />
    <text x="-20" y="25" fill="#E7C73B" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">SITE 7 (CRITICAL)</text>
  </g>

  {/* PREDICTIVE TRENDLINE (Draws in after bars) */}
  <path d="M 170 115 Q 210 110, 250 90 T 320 40" fill="none" stroke="url(#trendGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#glowGold)" strokeDasharray="300" strokeDashoffset="300" style={{ animation: 'draw-line 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' }} />
  
  {/* Projection Target Node (Fades in) */}
  <g transform="translate(320, 40)" style={{ opacity: 0, animation: 'fade-in 0.5s ease-out 1.8s forwards' }}>
    {/* Inner floating animation wrapper so it doesn't override the translation */}
    <g style={{ animation: 'float-tag 3s ease-in-out infinite' }}>
      <circle cx="0" cy="0" r="4" fill="#E7C73B" filter="url(#glowGold)" />
      
      {/* UI Tag */}
      <rect x="-40" y="-35" width="110" height="26" rx="4" fill="#0B0D12" stroke="#E7C73B" strokeWidth="1.5" filter="url(#glowGold)" />
      <rect x="-40" y="-35" width="110" height="26" rx="4" fill="rgba(231,199,59,0.15)" />
      <text x="15" y="-17" textAnchor="middle" fill="#E7C73B" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">+42% RISK VELOCITY</text>
    </g>
  </g>

</svg>
"""

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace the block for activeCapability === 4
start_idx = content.find('{activeCapability === 4 && (')
if start_idx == -1:
    print("Could not find start index")
    exit(1)

svg_start = content.find('<svg', start_idx)
svg_end = content.find('</svg>', svg_start) + 6

new_content = content[:svg_start] + svg_content.strip() + content[svg_end:]

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Fixed Tab 4 animations and tag position.")
