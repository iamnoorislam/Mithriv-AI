import re

svg_content = """
<svg width="100%" height="100%" viewBox="0 0 500 300" style={{ position: 'relative', zIndex: 1, background: 'radial-gradient(circle at 50% 50%, rgba(99, 84, 243, 0.08) 0%, transparent 60%)' }}>
  <defs>
    <!-- Drop Shadows for the Trigger.dev neon glow effect -->
    <filter id="glowPurple" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#6354F3" floodOpacity="0.6" />
    </filter>
    <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#E44856" floodOpacity="0.8" />
    </filter>
    
    <style>
      {`
        .trigger-path { fill: none; stroke: rgba(99, 84, 243, 0.2); stroke-width: 2; }
        .trigger-packet { fill: none; stroke: #6354F3; stroke-width: 3; stroke-linecap: round; filter: url(#glowPurple); }
        .trigger-path-red { fill: none; stroke: rgba(228, 72, 86, 0.2); stroke-width: 2; }
        .trigger-packet-red { fill: none; stroke: #E44856; stroke-width: 3; stroke-linecap: round; filter: url(#glowRed); }
        
        @keyframes flow1 { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: -40; } }
        @keyframes flow2 { 0% { stroke-dashoffset: 150; } 100% { stroke-dashoffset: -40; } }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        @keyframes pulse-core { 0%, 100% { opacity: 0.8; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
      `}
    </style>
  </defs>

  {/* Extremely subtle dot grid */}
  <pattern id="triggerGrid" width="24" height="24" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#triggerGrid)" />

  {/* CONNECTIONS */}
  {/* Path 1 */}
  <path d="M 180 65 C 220 65, 210 150, 250 150" class="trigger-path" />
  <path d="M 180 65 C 220 65, 210 150, 250 150" class="trigger-packet" strokeDasharray="20 200" style={{ animation: 'flow1 2s linear infinite' }} />

  {/* Path 2 */}
  <path d="M 180 150 L 250 150" class="trigger-path" />
  <path d="M 180 150 L 250 150" class="trigger-packet" strokeDasharray="20 200" style={{ animation: 'flow2 1.5s linear infinite 0.5s' }} />

  {/* Path 3 */}
  <path d="M 180 235 C 220 235, 210 150, 250 150" class="trigger-path" />
  <path d="M 180 235 C 220 235, 210 150, 250 150" class="trigger-packet" strokeDasharray="20 200" style={{ animation: 'flow1 2s linear infinite 1s' }} />

  {/* Output Path */}
  <path d="M 250 150 C 290 150, 310 150, 340 150" class="trigger-path-red" />
  <path d="M 250 150 C 290 150, 310 150, 340 150" class="trigger-packet-red" strokeDasharray="20 200" style={{ animation: 'flow2 1.5s linear infinite 0.2s' }} />


  {/* LEFT NODES */}
  
  {/* Node 1: Identity */}
  <g transform="translate(30, 45)">
    <rect width="150" height="40" rx="20" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" filter="url(#glowPurple)" />
    <rect width="150" height="40" rx="20" fill="rgba(99, 84, 243, 0.05)" />
    <circle cx="20" cy="20" r="6" fill="#4993E3" />
    <text x="36" y="24" fill="#fff" fontSize="11" fontWeight="500" fontFamily="var(--font-sans)">Identity Log</text>
    <text x="110" y="23" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-sans)">Just now</text>
    {/* Port */}
    <circle cx="150" cy="20" r="3.5" fill="#0B0D12" stroke="#6354F3" strokeWidth="1.5" />
  </g>

  {/* Node 2: Network */}
  <g transform="translate(30, 130)">
    <rect width="150" height="40" rx="20" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" filter="url(#glowPurple)" />
    <rect width="150" height="40" rx="20" fill="rgba(99, 84, 243, 0.05)" />
    <circle cx="20" cy="20" r="6" fill="#E7C73B" />
    <text x="36" y="24" fill="#fff" fontSize="11" fontWeight="500" fontFamily="var(--font-sans)">Network Event</text>
    <text x="115" y="23" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-sans)">2s ago</text>
    <circle cx="150" cy="20" r="3.5" fill="#0B0D12" stroke="#6354F3" strokeWidth="1.5" />
  </g>

  {/* Node 3: Access */}
  <g transform="translate(30, 215)">
    <rect width="150" height="40" rx="20" fill="#0B0D12" stroke="rgba(99, 84, 243, 0.4)" strokeWidth="1" filter="url(#glowPurple)" />
    <rect width="150" height="40" rx="20" fill="rgba(99, 84, 243, 0.05)" />
    <circle cx="20" cy="20" r="6" fill="#AFF962" />
    <text x="36" y="24" fill="#fff" fontSize="11" fontWeight="500" fontFamily="var(--font-sans)">Access Denial</text>
    <text x="115" y="23" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-sans)">5s ago</text>
    <circle cx="150" cy="20" r="3.5" fill="#0B0D12" stroke="#6354F3" strokeWidth="1.5" />
  </g>


  {/* CENTRAL CORRELATION ENGINE (Trigger.dev style glowing ring) */}
  <g transform="translate(250, 150)">
    {/* Ambient massive glow */}
    <circle cx="0" cy="0" r="40" fill="#6354F3" opacity="0.1" filter="url(#glowPurple)" />
    
    {/* Outer dashed ring spinning */}
    <circle cx="0" cy="0" r="34" fill="none" stroke="rgba(99, 84, 243, 0.6)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: 'spin-slow 15s linear infinite' }} />
    <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 12" style={{ animation: 'spin-reverse 10s linear infinite' }} />
    
    {/* Inner solid body */}
    <circle cx="0" cy="0" r="20" fill="#0B0D12" stroke="#6354F3" strokeWidth="2" filter="url(#glowPurple)" />
    
    {/* Center pulsing core */}
    <circle cx="0" cy="0" r="8" fill="#E44856" filter="url(#glowRed)" style={{ animation: 'pulse-core 2s infinite' }} />
  </g>


  {/* RIGHT NODE (Output Threat) */}
  <g transform="translate(340, 130)">
    <rect width="130" height="40" rx="20" fill="#0B0D12" stroke="#E44856" strokeWidth="1.5" filter="url(#glowRed)" />
    <rect width="130" height="40" rx="20" fill="rgba(228, 72, 86, 0.1)" />
    
    <circle cx="22" cy="20" r="8" fill="#E44856" />
    <path d="M 22 16 L 22 21 M 22 24 L 22 25" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    
    <text x="38" y="24" fill="#fff" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Valid Threat</text>
    
    <circle cx="0" cy="20" r="3.5" fill="#0B0D12" stroke="#E44856" strokeWidth="1.5" />
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

print("Applied Trigger.dev inspired workflow SVG for Tab 0.")
