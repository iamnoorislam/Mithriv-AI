import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
  <defs>
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="rgba(99, 84, 243, 0.3)" />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>
    <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="rgba(99, 84, 243, 0.1)" />
      <stop offset="100%" stopColor="#6354F3" />
    </linearGradient>
    
    <filter id="premiumGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <style>
      {`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        @keyframes data-stream { 0% { stroke-dashoffset: 40; } 100% { stroke-dashoffset: 0; } }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.8; } }
        @keyframes float-ui { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}
    </style>
  </defs>

  {/* Background Ambient Glow */}
  <circle cx="200" cy="125" r="100" fill="url(#coreGlow)" />
  
  {/* Subtle Grid */}
  <pattern id="premiumGrid" width="20" height="20" patternUnits="userSpaceOnUse">
    <circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.1)" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#premiumGrid)" />

  {/* Data Streams (Bezier curves) */}
  <path d="M 80 60 C 130 60, 150 125, 200 125" fill="none" stroke="url(#streamGrad1)" strokeWidth="1.5" />
  <path d="M 80 60 C 130 60, 150 125, 200 125" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 36" style={{ animation: 'data-stream 1.5s linear infinite reverse' }} />

  <path d="M 80 190 C 130 190, 150 125, 200 125" fill="none" stroke="url(#streamGrad1)" strokeWidth="1.5" />
  <path d="M 80 190 C 130 190, 150 125, 200 125" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 36" style={{ animation: 'data-stream 2s linear infinite reverse' }} />

  <path d="M 320 80 C 270 80, 250 125, 200 125" fill="none" stroke="url(#streamGrad1)" strokeWidth="1.5" />
  <path d="M 320 80 C 270 80, 250 125, 200 125" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 36" style={{ animation: 'data-stream 1.2s linear infinite' }} />

  {/* The Core Engine */}
  <g transform="translate(200, 125)">
    {/* Outer static ring */}
    <circle r="70" fill="none" stroke="rgba(99, 84, 243, 0.2)" strokeWidth="1" />
    
    {/* Rotating Dashed Rings */}
    <g style={{ transformOrigin: '0 0', animation: 'spin-slow 20s linear infinite' }}>
      <circle r="55" fill="none" stroke="#6354F3" strokeWidth="1" strokeDasharray="4 8" />
      {/* Radar sweeper */}
      <path d="M 0 0 L 0 -55 A 55 55 0 0 1 38 -38 Z" fill="rgba(99, 84, 243, 0.1)" />
    </g>
    
    <g style={{ transformOrigin: '0 0', animation: 'spin-reverse 15s linear infinite' }}>
      <circle r="40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="20 10 5 10" />
    </g>

    {/* Pulsing Center */}
    <circle r="25" fill="none" stroke="#E44856" strokeWidth="2" style={{ transformOrigin: '0 0', animation: 'pulse-ring 2s ease-out infinite' }} />
    <circle r="15" fill="#E44856" filter="url(#premiumGlow)" />
    <circle r="4" fill="#fff" />
  </g>

  {/* Input Nodes (Glassmorphic UI Cards) */}
  {/* Top Left Node */}
  <g transform="translate(30, 40)" style={{ animation: 'float-ui 6s ease-in-out infinite' }}>
    <rect width="105" height="40" rx="6" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" />
    <rect width="105" height="40" rx="6" fill="rgba(99, 84, 243, 0.05)" />
    {/* Mini chart */}
    <rect x="10" y="25" width="4" height="6" fill="#6354F3" rx="1" />
    <rect x="16" y="20" width="4" height="11" fill="#6354F3" rx="1" />
    <rect x="22" y="15" width="4" height="16" fill="#6354F3" rx="1" />
    <rect x="28" y="22" width="4" height="9" fill="#6354F3" rx="1" />
    <text x="40" y="18" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">IDENTITY_LOGS</text>
    <text x="40" y="28" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="var(--font-mono)">4.2M EVENTS/S</text>
  </g>

  {/* Bottom Left Node */}
  <g transform="translate(30, 170)" style={{ animation: 'float-ui 5s ease-in-out infinite 1s' }}>
    <rect width="105" height="40" rx="6" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" />
    <rect width="105" height="40" rx="6" fill="rgba(99, 84, 243, 0.05)" />
    {/* Activity dots */}
    <circle cx="15" cy="20" r="2.5" fill="#6354F3" style={{ transformOrigin: '15px 20px', animation: 'pulse-ring 2s infinite' }}/>
    <circle cx="25" cy="20" r="2.5" fill="#6354F3" style={{ transformOrigin: '25px 20px', animation: 'pulse-ring 2s infinite 0.5s' }}/>
    <circle cx="35" cy="20" r="2.5" fill="#6354F3" style={{ transformOrigin: '35px 20px', animation: 'pulse-ring 2s infinite 1s' }}/>
    <text x="45" y="18" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">NET_TRAFFIC</text>
    <text x="45" y="28" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="var(--font-mono)">1.1 GB/s STREAM</text>
  </g>

  {/* Top Right Node */}
  <g transform="translate(265, 60)" style={{ animation: 'float-ui 7s ease-in-out infinite 0.5s' }}>
    <rect width="105" height="40" rx="6" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" />
    <rect width="105" height="40" rx="6" fill="rgba(99, 84, 243, 0.05)" />
    {/* Signal lines */}
    <path d="M 10 25 L 15 15 L 20 28 L 25 10 L 30 25 L 35 20" fill="none" stroke="#6354F3" strokeWidth="1.5" />
    <text x="42" y="18" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">ACCESS_ANOM</text>
    <text x="42" y="28" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="var(--font-mono)">SYSTEM FLAGS</text>
  </g>


  {/* Threat Output Node (Bottom Right) */}
  {/* Output stream to Threat Node */}
  <path d="M 200 125 C 220 160, 240 180, 260 200" fill="none" stroke="#E44856" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'data-stream 1s linear infinite' }} />

  <g transform="translate(240, 180)" style={{ animation: 'float-ui 5s ease-in-out infinite' }}>
    <rect width="140" height="46" rx="8" fill="#0B0D12" stroke="#E44856" strokeWidth="1.5" />
    <rect width="140" height="46" rx="8" fill="rgba(228, 72, 86, 0.05)" />
    <circle cx="20" cy="23" r="6" fill="#E44856" filter="url(#premiumGlow)" style={{ transformOrigin: '20px 23px', animation: 'pulse-ring 1s infinite' }} />
    <text x="36" y="20" fill="#E44856" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">THREAT CORRELATED</text>
    <text x="36" y="32" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="var(--font-mono)">CRITICAL SEVERITY - 99.9%</text>
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

print("Applied premium dashboard SVG for Tab 0.")
