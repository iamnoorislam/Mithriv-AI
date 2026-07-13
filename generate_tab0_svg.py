import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
  <defs>
    <style>
      {`
        @keyframes iso-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dash-flow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }
        @keyframes pulse-core {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(234, 73, 178, 0.5)); }
          50% { filter: drop-shadow(0 0 16px rgba(234, 73, 178, 0.8)); }
        }
      `}
    </style>
    <filter id="glowPink">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="glowPurple">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- BACKGROUND: Subtle isometric grid -->
  <g transform="translate(200, 150) scale(1, 0.5) rotate(45)">
    <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
    <path d="M-100 -150 L-100 150 M-50 -150 L-50 150 M0 -150 L0 150 M50 -150 L50 150 M100 -150 L100 150" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
    <path d="M-150 -100 L150 -100 M-150 -50 L150 -50 M-150 0 L150 0 M-150 50 L150 50 M-150 100 L150 100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
  </g>

  <!-- BEAMS from Layer 3 to Layer 2 -->
  <!-- A: (150, 170) -> (150, 110) -->
  <line x1="150" y1="170" x2="150" y2="110" stroke="#EA49B2" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash-flow 1s linear infinite reverse' }} />
  <!-- B: (260, 185) -> (260, 125) -->
  <line x1="260" y1="185" x2="260" y2="125" stroke="#EA49B2" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash-flow 1s linear infinite reverse' }} />
  <!-- C: (210, 215) -> (210, 155) -->
  <line x1="210" y1="215" x2="210" y2="155" stroke="#EA49B2" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash-flow 1s linear infinite reverse' }} />

  <!-- BEAMS from Layer 2 to Core -->
  <line x1="150" y1="110" x2="200" y2="60" stroke="#EA49B2" strokeWidth="1" strokeDasharray="2 4" style={{ animation: 'dash-flow 2s linear infinite reverse' }} />
  <line x1="260" y1="125" x2="200" y2="60" stroke="#EA49B2" strokeWidth="1" strokeDasharray="2 4" style={{ animation: 'dash-flow 2s linear infinite reverse' }} />
  <line x1="210" y1="155" x2="200" y2="60" stroke="#EA49B2" strokeWidth="1" strokeDasharray="2 4" style={{ animation: 'dash-flow 2s linear infinite reverse' }} />


  <!-- LAYER 3: Raw Data Plane -->
  <g transform="translate(200, 180)">
    <!-- Plane Base -->
    <g transform="scale(1, 0.5) rotate(45)">
      <rect x="-85" y="-85" width="170" height="170" fill="rgba(99, 84, 243, 0.03)" stroke="#6354F3" strokeWidth="1.5" rx="8" />
      <rect x="-70" y="-70" width="140" height="140" fill="none" stroke="rgba(99, 84, 243, 0.2)" strokeWidth="1" strokeDasharray="4 4" rx="6" />
    </g>
    
    <!-- Background Noise Dots (Screen coords relative to 200, 180) -->
    <circle cx="-60" cy="-5" r="2" fill="rgba(99, 84, 243, 0.4)" />
    <circle cx="80" cy="15" r="1.5" fill="rgba(99, 84, 243, 0.3)" />
    <circle cx="20" cy="30" r="2" fill="rgba(255, 255, 255, 0.2)" />
    <circle cx="-30" cy="25" r="1.5" fill="rgba(99, 84, 243, 0.4)" />
    <circle cx="50" cy="-20" r="2" fill="rgba(255, 255, 255, 0.2)" />
    
    <!-- Threat Source Dots -->
    <!-- Node A: -50, -10 -->
    <circle cx="-50" cy="-10" r="3" fill="#EA49B2" filter="url(#glowPink)" />
    <text x="-60" y="-8" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="var(--font-mono)">IDENTITY_LOG</text>
    
    <!-- Node B: 60, 5 -->
    <circle cx="60" cy="5" r="3" fill="#EA49B2" filter="url(#glowPink)" />
    <text x="70" y="7" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="var(--font-mono)">FW_DENY</text>

    <!-- Node C: 10, 35 -->
    <circle cx="10" cy="35" r="3" fill="#EA49B2" filter="url(#glowPink)" />
    <text x="10" y="45" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="var(--font-mono)">ACCESS_ANOMALY</text>
  </g>


  <!-- LAYER 2: Correlation Matrix -->
  <g transform="translate(200, 120)">
    <!-- Plane Base -->
    <g transform="scale(1, 0.5) rotate(45)">
      <rect x="-70" y="-70" width="140" height="140" fill="rgba(234, 73, 178, 0.03)" stroke="rgba(234, 73, 178, 0.4)" strokeWidth="1" rx="4" />
    </g>
    
    <!-- Correlated Triangle -->
    <polygon points="-50,-10 60,5 10,35" fill="rgba(234, 73, 178, 0.1)" stroke="#EA49B2" strokeWidth="1.5" />
    
    <!-- Pulsing nodes at vertices -->
    <circle cx="-50" cy="-10" r="4" fill="#EA49B2" style={{ transformOrigin: '-50px -10px', animation: 'pulse-node 2s infinite' }} />
    <circle cx="60" cy="5" r="4" fill="#EA49B2" style={{ transformOrigin: '60px 5px', animation: 'pulse-node 2s infinite 0.6s' }} />
    <circle cx="10" cy="35" r="4" fill="#EA49B2" style={{ transformOrigin: '10px 35px', animation: 'pulse-node 2s infinite 1.2s' }} />

    <!-- Center Correlation Point -->
    <circle cx="5" cy="10" r="2" fill="#fff" filter="url(#glowPink)" />
  </g>


  <!-- LAYER 1: Core / Output -->
  <g transform="translate(200, 60)" style={{ animation: 'iso-float 4s ease-in-out infinite' }}>
    <!-- Diamond Core -->
    <g style={{ animation: 'pulse-core 3s infinite' }}>
      <polygon points="0,-15 15,0 0,15 -15,0" fill="#EA49B2" />
      <polygon points="0,-15 15,0 0,0 -15,0" fill="rgba(255,255,255,0.3)" />
    </g>
    
    <!-- Output Card -->
    <g transform="translate(25, -20)">
      <rect width="120" height="40" rx="4" fill="#0B0D12" stroke="#EA49B2" strokeWidth="1" />
      <rect width="4" height="40" rx="2" fill="#EA49B2" />
      <text x="12" y="16" fill="#EA49B2" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">THREAT DETECTED</text>
      <text x="12" y="30" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="var(--font-mono)">CONFIDENCE: 99.8%</text>
    </g>
  </g>

</svg>
"""

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace the block for activeCapability === 0
start_idx = content.find('{activeCapability === 0 && (')
if start_idx == -1:
    print("Could not find start index")
    exit(1)

svg_start = content.find('<svg', start_idx)
svg_end = content.find('</svg>', svg_start) + 6

new_content = content[:svg_start] + svg_content.strip() + content[svg_end:]

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Replaced Tab 0 SVG with new isometric correlation design.")
