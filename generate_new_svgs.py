import re

svg_0 = """
<svg viewBox="0 0 240 180" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-purple {
            0%, 100% { filter: drop-shadow(0 0 4px #7C3CD0); opacity: 0.8; }
            50% { filter: drop-shadow(0 0 12px #7C3CD0); opacity: 1; }
        }
        @keyframes data-flow {
            0% { transform: translateY(-10px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(30px); opacity: 0; }
        }
    ` }} />
    <defs>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3CD0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3CD0" stopOpacity="0.05" />
        </linearGradient>
    </defs>
    <!-- Background Isometric Grid -->
    <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,4">
        <path d="M20,90 L220,90" />
        <path d="M40,70 L200,70" />
        <path d="M60,50 L180,50" />
        <path d="M120,30 L120,150" />
        <path d="M80,30 L80,150" />
        <path d="M160,30 L160,150" />
    </g>
    
    <!-- Central Cylinder / Stack -->
    <g transform="translate(120, 110)">
        <!-- Bottom Unreviewed Stack -->
        <path d="M-40,0 L0,20 L40,0 L40,-30 L0,-10 L-40,-30 Z" fill="url(#purpleGrad)" stroke="#7C3CD0" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M-40,-10 L0,10 L40,-10" stroke="#7C3CD0" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M-40,-20 L0,0 L40,-20" stroke="#7C3CD0" strokeWidth="1" strokeOpacity="0.2" />
        
        <!-- Top Reviewed Layer (Glowing) -->
        <path d="M-40,-40 L0,-20 L40,-40 L0,-60 Z" fill="rgba(124, 60, 208, 0.8)" stroke="#fff" strokeWidth="1.5" style={{animation: 'pulse-purple 3s infinite'}} />
        
        <!-- Dropping Data Particles -->
        <circle cx="0" cy="-70" r="2" fill="#fff" style={{animation: 'data-flow 2s infinite'}} />
        <circle cx="-15" cy="-60" r="1.5" fill="#fff" style={{animation: 'data-flow 2s infinite 0.5s'}} />
        <circle cx="15" cy="-80" r="2" fill="#fff" style={{animation: 'data-flow 2s infinite 1s'}} />
    </g>

    <!-- Prominent Text -->
    <g transform="translate(120, 155)">
        <text x="0" y="0" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="16" fill="#7C3CD0" textAnchor="middle" letterSpacing="2" style={{animation: 'pulse-purple 3s infinite'}}>94% UNREVIEWED</text>
        <text x="0" y="14" fontFamily="var(--font-mono), monospace" fontSize="8" fill="rgba(255,255,255,0.6)" textAnchor="middle" letterSpacing="1">MASSIVE DATA INFLUX</text>
    </g>
</svg>
"""

svg_1 = """
<svg viewBox="0 0 240 180" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radar-scan {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes blink-yellow {
            0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 2px #F59E0B); }
            50% { opacity: 1; filter: drop-shadow(0 0 10px #F59E0B); }
        }
    ` }} />
    <defs>
        <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
    </defs>
    <!-- Background Grid -->
    <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,4">
        <circle cx="120" cy="80" r="60" />
        <circle cx="120" cy="80" r="40" />
        <circle cx="120" cy="80" r="20" />
        <line x1="60" y1="80" x2="180" y2="80" />
        <line x1="120" y1="20" x2="120" y2="140" />
    </g>

    <!-- Radar Sweep -->
    <g transform="translate(120, 80)">
        <path d="M0,0 L0,-60 A60,60 0 0,1 42,-42 Z" fill="url(#yellowGrad)" style={{transformOrigin: '0 0', animation: 'radar-scan 4s linear infinite'}} />
        
        <!-- Detected Anomaly -->
        <circle cx="-30" cy="20" r="4" fill="#F59E0B" style={{animation: 'blink-yellow 1s infinite'}} />
        <!-- Escaping Anomaly (Late) -->
        <circle cx="45" cy="45" r="4" fill="#EF4444" style={{animation: 'blink-yellow 0.5s infinite'}} />
        <path d="M-25,25 L40,40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,4" />
    </g>

    <!-- Prominent Text -->
    <g transform="translate(120, 160)">
        <text x="0" y="0" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="16" fill="#F59E0B" textAnchor="middle" letterSpacing="1" style={{animation: 'blink-yellow 2s infinite'}}>75 MIN EXPOSURE</text>
        <text x="0" y="14" fontFamily="var(--font-mono), monospace" fontSize="8" fill="rgba(255,255,255,0.6)" textAnchor="middle" letterSpacing="1">ANOMALY ESCALATION DELAY</text>
    </g>
</svg>
"""

svg_2 = """
<svg viewBox="0 0 240 180" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-blue {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); filter: drop-shadow(0 0 12px #3B82F6); }
        }
        @keyframes fail-line {
            0% { stroke-dashoffset: 20; opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
        }
    ` }} />
    <!-- Grid -->
    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="1,3">
        <path d="M0,40 L240,40 M0,80 L240,80 M0,120 L240,120" />
    </g>

    <!-- Silo 1 -->
    <g transform="translate(50, 70)" style={{animation: 'float-blue 4s ease-in-out infinite'}}>
        <polygon points="0,-15 25,-5 0,5 -25,-5" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="1.5" />
        <polygon points="-25,-5 0,5 0,35 -25,25" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="25,-5 0,5 0,35 25,25" fill="rgba(59, 130, 246, 0.05)" stroke="#3B82F6" strokeWidth="1" />
        <text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">VMS</text>
    </g>

    <!-- Silo 2 -->
    <g transform="translate(190, 60)" style={{animation: 'float-blue 4s ease-in-out infinite 1s'}}>
        <polygon points="0,-15 25,-5 0,5 -25,-5" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="1.5" />
        <polygon points="-25,-5 0,5 0,35 -25,25" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="25,-5 0,5 0,35 25,25" fill="rgba(59, 130, 246, 0.05)" stroke="#3B82F6" strokeWidth="1" />
        <text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">IAM</text>
    </g>

    <!-- Silo 3 -->
    <g transform="translate(120, 110)" style={{animation: 'float-blue 4s ease-in-out infinite 2s'}}>
        <polygon points="0,-15 25,-5 0,5 -25,-5" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="1.5" />
        <polygon points="-25,-5 0,5 0,35 -25,25" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="25,-5 0,5 0,35 25,25" fill="rgba(59, 130, 246, 0.05)" stroke="#3B82F6" strokeWidth="1" />
        <text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">HR</text>
    </g>

    <!-- Failed Connections -->
    <g stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" style={{animation: 'fail-line 1s linear infinite'}}>
        <line x1="75" y1="70" x2="165" y2="60" />
        <line x1="50" y1="100" x2="95" y2="120" />
        <line x1="190" y1="90" x2="145" y2="120" />
    </g>
    <!-- Red X marks -->
    <path d="M115,60 L125,70 M125,60 L115,70" stroke="#EF4444" strokeWidth="2" />

    <!-- Prominent Text -->
    <g transform="translate(120, 165)">
        <text x="0" y="0" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="16" fill="#3B82F6" textAnchor="middle" letterSpacing="1">ZERO CONTEXT</text>
    </g>
</svg>
"""

svg_3 = """
<svg viewBox="0 0 240 180" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gear-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes doc-slide {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
        }
    ` }} />
    <!-- Background Grid -->
    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        <line x1="40" y1="0" x2="40" y2="180" />
        <line x1="80" y1="0" x2="80" y2="180" />
        <line x1="120" y1="0" x2="120" y2="180" />
        <line x1="160" y1="0" x2="160" y2="180" />
        <line x1="200" y1="0" x2="200" y2="180" />
    </g>

    <g transform="translate(120, 80)">
        <!-- Stack of Documents (Manual Work) -->
        <g style={{animation: 'doc-slide 4s ease-in-out infinite'}}>
            <rect x="-40" y="-30" width="60" height="70" rx="4" fill="rgba(16, 185, 129, 0.05)" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        </g>
        <g style={{animation: 'doc-slide 4s ease-in-out infinite 1s'}}>
            <rect x="-30" y="-20" width="60" height="70" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="1.5" />
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" />
            <line x1="-15" y1="15" x2="20" y2="15" stroke="#10B981" strokeWidth="2" />
            <line x1="-15" y1="30" x2="10" y2="30" stroke="#10B981" strokeWidth="2" strokeDasharray="2,2" />
        </g>

        <!-- Grinding Gear (Manual labor overhead) -->
        <g transform="translate(35, 10)">
            <g style={{animation: 'gear-spin 6s linear infinite'}}>
                <circle cx="0" cy="0" r="14" fill="#131416" stroke="#10B981" strokeWidth="2" filter="drop-shadow(0 0 6px #10B981)" />
                <circle cx="0" cy="0" r="6" fill="#10B981" />
                <path d="M-4,-18 L4,-18 L4,18 L-4,18 M-18,-4 L18,-4 L18,4 L-18,4" fill="#10B981" />
                <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="#10B981" strokeWidth="6" />
            </g>
        </g>
    </g>

    <!-- Prominent Text -->
    <g transform="translate(120, 160)">
        <text x="0" y="0" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="16" fill="#10B981" textAnchor="middle" letterSpacing="1" filter="drop-shadow(0 0 4px rgba(16,185,129,0.5))">240H OVERHEAD</text>
        <text x="0" y="14" fontFamily="var(--font-mono), monospace" fontSize="8" fill="rgba(255,255,255,0.6)" textAnchor="middle" letterSpacing="1">MANUAL REPORTING</text>
    </g>
</svg>
"""

new_svgs = [svg_0, svg_1, svg_2, svg_3]

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    page_content = f.read()

# Locate SVGs to replace
matches = list(re.finditer(r'<svg viewBox="0 0 \d+ \d+".*?</svg>', page_content, re.DOTALL))
if len(matches) != 4:
    print(f"Error: Found {len(matches)} SVGs in page.tsx.")
    exit(1)

new_page_content = page_content[:matches[0].start()] + new_svgs[0].strip() + \
                   page_content[matches[0].end():matches[1].start()] + new_svgs[1].strip() + \
                   page_content[matches[1].end():matches[2].start()] + new_svgs[2].strip() + \
                   page_content[matches[2].end():matches[3].start()] + new_svgs[3].strip() + \
                   page_content[matches[3].end():]

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_page_content)

print("Generated and inserted 4 brand new high-end SVGs.")
