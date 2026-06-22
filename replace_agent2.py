import re

with open("app/communication-v2/page.tsx", "r") as f:
    content = f.read()

# Find the start of activeAgent === 1 and activeAgent === 2
start_idx = content.find("{activeAgent === 1 && (")
end_idx = content.find("{/* Employee Agent (03) */}")

if start_idx != -1 and end_idx != -1:
    new_svg = """{activeAgent === 1 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Premium Background / Base Terminal */}
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent2_new)" stroke="url(#paint1_linear_agent2_new)"/>
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="rgba(255,255,255,0.05)"/>
                          
                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">VISITOR IDENTITY HUB</text>

                          {/* MAIN SCANNER CARD */}
                          <g filter="url(#filter0_d_agent2_new)">
                            <rect x="73.2969" y="105.301" width="180" height="180" rx="10" fill="#141516"/>
                            <rect x="73.7969" y="105.801" width="179" height="179" rx="9.5" stroke="rgba(255,255,255,0.05)"/>
                          </g>

                          {/* Grid Background */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent2_new)' }}>
                            <rect x="73.2969" y="105.301" width="180" height="180" fill="url(#grid_agent2_new)" opacity="0.6"/>
                            
                            {/* Scanning rings */}
                            <circle cx="163" cy="195" r="45" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="wave-pulse-tactical-circle" style={{ animationDelay: '0s' }}/>
                            <circle cx="163" cy="195" r="65" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" className="wave-pulse-tactical-circle" style={{ animationDelay: '2s' }}/>
                          </g>

                          {/* ID Card Graphic */}
                          <g transform="translate(123, 160)" className="float-badge-box">
                            <rect x="0" y="0" width="80" height="52" rx="4" fill="#0B0B0F" stroke="#8B5CF6" strokeWidth="1.5"/>
                            <circle cx="20" cy="26" r="10" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
                            <rect x="40" y="18" width="30" height="4" rx="2" fill="#8B5CF6" opacity="0.5"/>
                            <rect x="40" y="28" width="20" height="4" rx="2" fill="#8B5CF6" opacity="0.3"/>
                          </g>

                          {/* Biometric Frame & Laser */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent2_new)' }}>
                            <rect x="103" y="135" width="120" height="120" rx="8" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" fill="none" strokeDasharray="8 8"/>
                            <g className="scanline-kiosk-laser">
                              <line x1="103" y1="135" x2="223" y2="135" stroke="#8B5CF6" strokeWidth="2"/>
                              <polygon points="103,135 223,135 213,155 113,155" fill="url(#scanGrad_agent2_new)" opacity="0.3"/>
                            </g>
                          </g>

                          {/* DYNAMIC PIP CARD: BIOMETRIC MATCH (TOP RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.4s" }}>
                            <g filter="url(#filter1_d_agent2_new)">
                              <rect x="275" y="115" width="154" height="60" rx="8" fill="#1A1B1E" stroke="rgba(255,255,255,0.08)"/>
                            </g>
                            <circle cx="295" cy="145" r="4" fill="#10B981" className="blink-led-active"/>
                            <text x="308" y="141" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="10" fill="#CFD6E1" fontWeight="bold">IDENTITY VERIFIED</text>
                            <text x="308" y="157" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="11" fill="#10B981">Pre-registered Match</text>
                          </g>

                          {/* DYNAMIC PIP CARD: ESCORT ASSIGNMENT (MIDDLE RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.8s" }}>
                            <g filter="url(#filter2_d_agent2_new)">
                              <rect x="275" y="195" width="154" height="60" rx="8" fill="#1A1B1E" stroke="rgba(255,255,255,0.08)"/>
                            </g>
                            <circle cx="295" cy="225" r="4" fill="#8B5CF6" className="blink-led-active" style={{ animationDelay: '0.5s' }}/>
                            <text x="308" y="221" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="10" fill="#CFD6E1" fontWeight="bold">ESCORT ASSIGNED</text>
                            <text x="308" y="237" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="11" fill="#8B5CF6">Host Notification Sent</text>
                          </g>

                          {/* BOTTOM STATUS BAR */}
                          <g filter="url(#filter3_d_agent2_new)">
                            <rect x="73.2969" y="300.301" width="356" height="32" rx="6" fill="#141516" stroke="rgba(255,255,255,0.05)"/>
                            <text x="251" y="320" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="11" fill="#B6B6B7" textAnchor="middle">
                              <tspan fill="#10B981">✓</tspan> VISITOR LOG UPDATED • TEMPORARY ACCESS GRANTED
                            </text>
                          </g>

                          <defs>
                            <linearGradient id="paint0_linear_agent2_new" x1="256.797" y1="23.8008" x2="256.797" y2="331.801" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0B0B0F"/>
                              <stop offset="1" stopColor="#0B0B0F" stopOpacity="0.8"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent2_new" x1="256.797" y1="23.8008" x2="256.797" y2="331.801" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728"/>
                              <stop offset="1" stopColor="#1A1B1E"/>
                            </linearGradient>
                            <linearGradient id="scanGrad_agent2_new" x1="163" y1="135" x2="163" y2="155" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#8B5CF6" stopOpacity="0.8"/>
                              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0"/>
                            </linearGradient>
                            <pattern id="grid_agent2_new" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(139, 92, 246, 0.05)" strokeWidth="1"/>
                            </pattern>
                            <clipPath id="card-screen-clip_agent2_new">
                              <rect x="73.2969" y="105.301" width="180" height="180" rx="10"/>
                            </clipPath>
                            <filter id="filter0_d_agent2_new" x="53.2969" y="90.301" width="220" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.3"/>
                            </filter>
                            <filter id="filter1_d_agent2_new" x="255" y="100" width="194" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.3"/>
                            </filter>
                            <filter id="filter2_d_agent2_new" x="255" y="180" width="194" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.3"/>
                            </filter>
                            <filter id="filter3_d_agent2_new" x="53.2969" y="285.301" width="396" height="72" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.3"/>
                            </filter>
                          </defs>
                        </svg>
                      </>
                    )}
"""

    new_content = content[:start_idx] + new_svg + "\n\n" + content[end_idx:]
    with open("app/communication-v2/page.tsx", "w") as f:
        f.write(new_content)
    print("Replaced successfully!")
else:
    print("Could not find boundaries!")
