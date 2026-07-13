import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
  <defs>
    <style>
      {`
        @keyframes bar-grow {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes float-tag {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(231, 199, 59, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(231, 199, 59, 0.8)); }
        }
        @keyframes dash-flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
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
    <rect x="-120" y="-120" width="240" height="240" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Grid Lines */}
    <path d="M-80 -120 L-80 120 M-40 -120 L-40 120 M0 -120 L0 120 M40 -120 L40 120 M80 -120 L80 120" stroke="rgba(255,255,255,0.03)" />
    <path d="M-120 -80 L120 -80 M-120 -40 L120 -40 M-120 0 L120 0 M-120 40 L120 40 M-120 80 L120 80" stroke="rgba(255,255,255,0.03)" />
  </g>

  {/* BAR 1: Site 3 (Green, cx=90, cy=140, h=25) */}
  <g transform="translate(90, 140)">
    {/* Right Face */}
    <path d="M 0 -15 L 20 -25 L 20 0 L 0 10 Z" fill="rgba(73,178,92,0.1)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" />
    {/* Left Face */}
    <path d="M -20 -25 L 0 -15 L 0 10 L -20 0 Z" fill="rgba(73,178,92,0.3)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" />
    {/* Top Face */}
    <path d="M 0 -35 L 20 -25 L 0 -15 L -20 -25 Z" fill="rgba(73,178,92,0.6)" stroke="#49B25C" strokeWidth="1" strokeLinejoin="round" filter="url(#glowGreen)" />
    
    <text x="-35" y="25" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="var(--font-mono)">SITE 3</text>
  </g>

  {/* BAR 2: Site 12 (Purple, cx=170, cy=180, h=55) */}
  <g transform="translate(170, 180)">
    {/* Right Face */}
    <path d="M 0 -45 L 20 -55 L 20 0 L 0 10 Z" fill="rgba(99,84,243,0.1)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" />
    {/* Left Face */}
    <path d="M -20 -55 L 0 -45 L 0 10 L -20 0 Z" fill="rgba(99,84,243,0.3)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" />
    {/* Top Face */}
    <path d="M 0 -65 L 20 -55 L 0 -45 L -20 -55 Z" fill="rgba(99,84,243,0.6)" stroke="#6354F3" strokeWidth="1" strokeLinejoin="round" filter="url(#glowPurple)" />
    
    <text x="-40" y="25" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="var(--font-mono)">SITE 12</text>
  </g>

  {/* BAR 3: Site 7 (Gold, cx=250, cy=220, h=120) */}
  <g transform="translate(250, 220)">
    {/* Right Face */}
    <path d="M 0 -110 L 20 -120 L 20 0 L 0 10 Z" fill="rgba(231,199,59,0.1)" stroke="#E7C73B" strokeWidth="1" strokeLinejoin="round" />
    {/* Left Face */}
    <path d="M -20 -120 L 0 -110 L 0 10 L -20 0 Z" fill="rgba(231,199,59,0.3)" stroke="#E7C73B" strokeWidth="1" strokeLinejoin="round" />
    {/* Top Face */}
    <path d="M 0 -130 L 20 -120 L 0 -110 L -20 -120 Z" fill="rgba(231,199,59,0.7)" stroke="#E7C73B" strokeWidth="1.5" strokeLinejoin="round" filter="url(#glowGold)" style={{ animation: 'pulse-glow 2s infinite' }} />
    
    <text x="-20" y="25" fill="#E7C73B" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">SITE 7 (CRITICAL)</text>
  </g>

  {/* PREDICTIVE TRENDLINE */}
  {/* Connects from Bar 2 top (170, 115) to Bar 3 top (250, 90) and shoots off to (320, 30) */}
  <path d="M 170 115 Q 210 110, 250 90 T 330 20" fill="none" stroke="url(#trendGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#glowGold)" />
  <path d="M 170 115 Q 210 110, 250 90 T 330 20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="15 60" style={{ animation: 'dash-flow 1s linear infinite reverse' }} />
  
  {/* Projection Target Node */}
  <g transform="translate(330, 20)" style={{ animation: 'float-tag 3s ease-in-out infinite' }}>
    <circle cx="0" cy="0" r="4" fill="#E7C73B" filter="url(#glowGold)" />
    
    <rect x="-35" y="-35" width="100" height="26" rx="4" fill="#0B0D12" stroke="#E7C73B" strokeWidth="1" />
    <rect x="-35" y="-35" width="100" height="26" rx="4" fill="rgba(231,199,59,0.1)" />
    <text x="15" y="-17" textAnchor="middle" fill="#E7C73B" fontSize="9" fontWeight="bold" fontFamily="var(--font-sans)">+42% RISK VELOCITY</text>
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

print("Applied ultra-premium 3D isometric bar chart for Tab 4.")
