'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Aperture, Command, Eclipse, Hexagon, Zap, Triangle, Activity } from 'lucide-react'
import IndustrySectionIntelligence from '@/components/IndustrySectionIntelligence'
import HonestPositioning from '@/components/HonestPositioning'
import IntelligencePhoneChat from '@/components/IntelligencePhoneChat'
import '../style.css'

const splitWords = (text: string, className = "intel-word") => {
  return text.split(' ').map((word, wordIdx) => (
    <span key={wordIdx} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'bottom' }}>
      <span className={className} style={{ display: 'inline-block' }}>
        {word}
      </span>
    </span>
  ));
};

const scenarioLogs = [
  // 0. Insider Threat Progression
  [
    "[ 11:24:02 ] >> Correlation initiated. Source: Access Control Ledger.",
    "[ 11:24:03 ] >> [OK] Baseline verified: Role - Senior Site Reliability Engineer.",
    "[ 11:24:05 ] >> [WARN] Deviation flagged: After-hours entries spike +40%.",
    "[ 11:24:06 ] >> Checking data room telemetry: Unscheduled door unlock in Zone 4B.",
    "[ 11:24:08 ] >> [ANOMALY] Data center activity cross-referenced with negative HR performance rating.",
    "[ 11:24:10 ] >> [ALERT] Bulk backup download detected: 3.4GB (340% above personal baseline).",
    "[ 11:24:12 ] >> [ACTION] Enforcing SOP 7.3.2: Alert sent to CISO/Threat Response Team.",
    "[ 11:24:13 ] >> [ACTION] Credentials temporarily locked for SRE role at Site 4.",
    "[ 11:24:15 ] >> [ACTION] Preserving CCTV footage: 72h corridor archival backup synced.",
    "[ 11:24:16 ] >> [SUCCESS] Threat contained. Case files compiled and archived on immutable ledger."
  ],
  // 1. Unauthorized Access Attempt
  [
    "[ 21:04:15 ] >> Sensor triggered. Source: Main Visitor Gate Reader.",
    "[ 21:04:17 ] >> [WARN] Badge read error: Invalid security hash detected.",
    "[ 21:04:19 ] >> [WARN] Identical badge serial registered at Executive Entry 12 seconds prior.",
    "[ 21:04:21 ] >> [ANOMALY] Spatially impossible traversal. Confidence score: 99.8%.",
    "[ 21:04:23 ] >> Initiating facial identification analysis on camera feed CAM_G4.",
    "[ 21:04:25 ] >> [ALERT] Facial mismatch confirmed. Subject photo does not match credential ledger.",
    "[ 21:04:27 ] >> [ACTION] Enforcing SOP 2.1.0: Main gate locks engaged. Gate arms set to block.",
    "[ 21:04:29 ] >> [ACTION] Dispatching mobile patrol guard with subject photo to Gate 2.",
    "[ 21:04:31 ] >> [ACTION] Revoking suspect credential. Broadcast message to dispatch console.",
    "[ 21:04:33 ] >> [SUCCESS] Perimeter locked. Suspect intercepted at main gates."
  ],
  // 2. Visitor Overstay
  [
    "[ 17:00:00 ] >> Time window expired: Contractor escort permit 89082 validity ends.",
    "[ 17:00:03 ] >> Check-out status: Unresolved. No badge-out at visitor lane.",
    "[ 17:00:05 ] >> [WARN] Spatial monitoring: Escort badge-out logged, but contractor remains.",
    "[ 17:00:08 ] >> Checking camera grids: No activity in visitor exit lobby.",
    "[ 17:00:10 ] >> [ANOMALY] Corridor 4 motion detector flags subject moving toward restricted Zone 1.",
    "[ 17:00:12 ] >> [ALERT] Intrusion hazard: Unescorted visitor inside NERC-CIP restricted facility.",
    "[ 17:00:14 ] >> [ACTION] Enforcing SOP 5.1.1: Direct notification sent to registered escort.",
    "[ 17:00:16 ] >> [ACTION] Alerting Lobby Desk coordinator with name, firm, and photo.",
    "[ 17:00:18 ] >> [ACTION] Restricting elevator access to Zone 1. All exit lanes monitored.",
    "[ 17:00:20 ] >> [SUCCESS] Contractor located by escort. Escorted off-site without incident."
  ],
  // 3. Coordinated Breach
  [
    "[ 02:40:12 ] >> Incident start. Alarm: Houston Server Cage door tamper.",
    "[ 02:40:15 ] >> [WARN] Alarm: Forced door entry Phoenix Warehouse 2 Gate.",
    "[ 02:40:18 ] >> [WARN] Alarm: Glass break Denver Loading Dock Gate.",
    "[ 02:40:20 ] >> [ANOMALY] Coordinated intrusion sequence across 3 remote sites in 45s.",
    "[ 02:40:22 ] >> [ALERT] Critical Event Level 5. Potential coordinated reconnaissance scenario.",
    "[ 02:40:24 ] >> [ACTION] Enforcing Emergency SOP 9.0.0: Joint command center activated.",
    "[ 02:40:26 ] >> [ACTION] Automatic dispatch to local Sheriff offices in Houston, Phoenix, and Denver.",
    "[ 02:40:28 ] >> [ACTION] Lockdown: All server racks and entrance bays sealed.",
    "[ 02:40:30 ] >> [ACTION] Visual feeds from breach areas broadcast to joint command display.",
    "[ 02:40:32 ] >> [SUCCESS] All facilities successfully locked. Law enforcement arrived on-site."
  ]
];

export default function IntelligenceEnginePage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Intelligence Capabilities Accordion State
  const [activeCapability, setActiveCapability] = useState(0);

  const CAPABILITIES_DATA = [
    {
      id: 0,
      num: "01",
      name: "Threat Correlation Engine",
      desc: "Connects signals across video, access, identity, and communication to detect threats no single system can see. Correlates behavior across time, sites, and systems simultaneously.",
      metrics: ["Cross-system pattern detection", "Sub-500ms alert generation"]
    },
    {
      id: 1,
      num: "02",
      name: "Natural Language Query",
      desc: "Ask any security question in plain English and get precise, cited answers backed by real data from across your entire security stack — instantly. No dashboards. No reports. No waiting.",
      metrics: ["Zero training required", "Answers in seconds not days"]
    },
    {
      id: 2,
      num: "03",
      name: "Autonomous Compliance Engine",
      desc: "Generates NERC CIP, HIPAA, TSA, and SOC 2 documentation automatically from live operational data. What used to take 240 analyst hours now happens continuously in the background.",
      metrics: ["240+ compliance frameworks", "Real-time gap detection"]
    },
    {
      id: 3,
      num: "04",
      name: "Behavioral Intelligence",
      desc: "Builds behavioral baselines for every person, credential, and access pattern in your environment. Flags deviations before they become incidents. Learns continuously from new data.",
      metrics: ["Adaptive baseline modeling", "99.7% anomaly detection accuracy"]
    },
    {
      id: 4,
      num: "05",
      name: "Predictive Risk Scoring",
      desc: "Ranks every site, zone, and credential by current risk level using live data. Tells your team where to focus before incidents occur — not after. Proactive not reactive.",
      metrics: ["Site-level risk ranking", "Proactive not reactive"]
    },
    {
      id: 5,
      num: "06",
      name: "Executive Intelligence Layer",
      desc: "Delivers board-ready security posture summaries, incident trend analysis, and KPI reporting in natural language — on demand, without analyst intermediaries. The answer to any board question in seconds.",
      metrics: ["Board-ready in seconds", "Zero analyst dependency"]
    }
  ];

  // Simulation Playground State
  const [activeScenario, setActiveScenario] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [simMetrics, setSimMetrics] = useState({
    events: 47,
    accuracy: 99.7,
    latency: 500,
    analystTime: 0
  });

  const dotCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Run Simulation Handler
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTerminalLogs([]);
    setSimMetrics({
      events: 0,
      accuracy: 99.7,
      latency: 500,
      analystTime: 100
    });

    const logs = scenarioLogs[activeScenario];
    let currentLogIndex = 0;

    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;

        // Live metrics counts
        setSimMetrics(prev => ({
          events: prev.events + Math.floor(Math.random() * 8 + 4),
          accuracy: parseFloat((99.5 + Math.random() * 0.49).toFixed(1)),
          latency: Math.floor(380 + Math.random() * 110),
          analystTime: Math.max(0, prev.analystTime - Math.floor(Math.random() * 12 + 8))
        }));
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimMetrics(prev => ({
          ...prev,
          analystTime: 0
        }));
      }
    }, 600);
  };

  // Interactive Repelling Dot-Grid Matrix Background
  useEffect(() => {
    if (!mounted) return;
    const canvas = dotCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CFG = {
      totalSize: 12,
      dotSize: 1.5,
      animSpeed: 0.5,
      blinkFreq: 5.0,
      fps: 60,
      colors: [[255, 255, 255], [255, 255, 255]],
      opacities: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0]
    };
    let W: number, H: number, startTime = performance.now();
    let cells: any[] = [];
    const PHI = 1.61803398874989484820459;
    const fract = (x: number) => x - Math.floor(x);
    const rand2 = (x: number, y: number) => {
      const ax = x * PHI, ay = y * PHI;
      const d = Math.sqrt((ax - x) ** 2 + (ay - y) ** 2);
      return Math.abs(fract(Math.tan(d * 0.5) * x));
    };
    const blinkAlpha = (col: number, row: number, t: number, showOffset: number) => {
      const freq = CFG.blinkFreq;
      const phase = Math.floor(t / freq + showOffset + freq);
      const r = rand2((col + 1) * phase * 0.1 + 1, (row + 1) * phase * 0.1 + 1);
      return CFG.opacities[Math.floor(r * CFG.opacities.length)];
    };
    const buildCells = () => {
      cells = [];
      const ts = CFG.totalSize;
      const cols = Math.ceil(W / ts) + 1;
      // Increase row count to account for the 0.866 vertical hex compression
      const rows = Math.ceil(H / (ts * 0.866)) + 2;
      const cx = cols / 2;
      const cy = rows / 2;
      const maxD = Math.sqrt(cx * cx + cy * cy);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const s = rand2(col + 1, row + 1);
          const rngB = rand2(col + 42, row + 42);
          const dist = Math.sqrt((cx - col) ** 2 + (cy - row) ** 2);
          cells.push({
            col,
            row,
            showOffset: s,
            introOffset: dist * 0.01 + s * 0.15,
            outroOffset: (maxD - dist) * 0.02 + rngB * 0.2,
            colorIdx: Math.floor(s * CFG.colors.length)
          });
        }
      }
    };
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
        buildCells();
      }
    };

    let mouseX = -1000, mouseY = -1000;
    const container = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    let lastFrame = 0;
    let animId: number;
    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastFrame < 1000 / CFG.fps) return;
      lastFrame = ts;
      const elapsed = (ts - startTime) / 1000;
      const t = elapsed * CFG.animSpeed;
      ctx.clearRect(0, 0, W, H);
      const sz = CFG.totalSize;
      const ds = CFG.dotSize;
      const offX = Math.abs(Math.floor(((W % sz) - ds) * 0.5));
      const offY = Math.abs(Math.floor(((H % sz) - ds) * 0.5));

      for (const cell of cells) {
        // Shift odd rows to create a Hexagonal (Isometric) grid pattern
        // This gives a completely different organic/interlocking texture compared to the square grid.
        const rowOffset = (cell.row % 2 !== 0) ? (sz * 0.5) : 0;
        const px = cell.col * sz - offX + rowOffset;

        // Compact the Y axis slightly for perfect hexagon proportions (sqrt(3)/2)
        const py = cell.row * (sz * 0.866) - offY;

        if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
        if (t < cell.introOffset) continue;
        const alpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset);
        if (alpha <= 0) continue;

        const cx = px + ds;
        const cy = py + ds;

        // --- High-Tech Data Chart (Analytics Dashboard) ---
        // A literal live data graph to physically look like "data".
        const scrollX = elapsed * 12.0;
        const virtualX = cell.col + scrollX;

        // Multi-frequency sine waves to simulate active data/analytics graph
        const wave1 = Math.sin(virtualX * 0.04) * 6;
        const wave2 = Math.sin(virtualX * 0.1) * 3;
        const wave3 = Math.sin(virtualX * 0.3) * 1.5;
        const totalWave = wave1 + wave2 + wave3;

        // Base line position (50% down the screen, perfectly centered)
        const baselineRow = (H / sz) * 0.50;
        const graphRow = baselineRow - totalWave;

        const distFromGraph = cell.row - graphRow;

        // Hide everything above the line to create a stark dashboard shape
        if (distFromGraph < -0.8) {
          continue;
        }

        let dataMultiplier = 0.0;

        if (Math.abs(distFromGraph) <= 1.2) {
          // The solid graph line itself (Bright)
          dataMultiplier = 2.5;
        } else {
          // The area under the graph (Subtle fade, remains highly visible)
          const fade = Math.max(0.4, 1.0 - (distFromGraph / 70.0));
          if (cell.row % 2 === 0) {
            dataMultiplier = 1.0 * fade;
          } else {
            dataMultiplier = 0.6 * fade;
          }
        }

        // Overlay vertical dashboard grid lines
        if (cell.col % 16 === 0 && distFromGraph >= 0) {
          const gridFade = Math.max(0.5, 1.0 - (distFromGraph / 70.0));
          dataMultiplier = Math.max(dataMultiplier, 1.2 * gridFade);
        }

        const finalAlpha = Math.min(1.0, alpha * dataMultiplier);

        if (finalAlpha <= 0.01) continue;

        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 160;

        let drawX = cx;
        let drawY = cy;
        const isLight = document.body.classList.contains('light-mode');
        const baseColor = isLight ? [15, 17, 21] : [255, 255, 255];
        let color = baseColor;

        if (dist < radius && mouseX > 0) {
          const force = (radius - dist) / radius;
          drawX = cx + (dx / dist) * force * 16;
          drawY = cy + (dy / dist) * force * 16;

          const blend = force * 0.95;
          const targetR = isLight ? 124 : 139;
          const targetG = isLight ? 58 : 92;
          const targetB = isLight ? 237 : 246;
          const r = Math.round(baseColor[0] * (1 - blend) + targetR * blend);
          const g = Math.round(baseColor[1] * (1 - blend) + targetG * blend);
          const b = Math.round(baseColor[2] * (1 - blend) + targetB * blend);
          color = [r, g, b];
        }

        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, ds, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    let timer: NodeJS.Timeout;
    let refreshTimers: NodeJS.Timeout[] = [];

    const initScrollStory = () => {
      const w = window as any;
      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      // Section animations staggers
      gsap.fromTo('.reveal-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.reveal-card-grid',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.autonomy-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.autonomy-timeline-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Scroll Reveal for Problem section
      const secProblem = document.querySelector('#problem');
      if (secProblem) {
        const triggerProblem = () => {
          if (secProblem.classList.contains('reveal-active')) return;
          secProblem.classList.add('reveal-active');

          gsap.fromTo('#problem .feature-col-item',
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out"
            }
          );
        };

        const rect = secProblem.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          triggerProblem();
        }

        ScrollTrigger.create({
          id: "problem-story",
          trigger: secProblem,
          start: "top 75%",
          once: true,
          onEnter: triggerProblem
        });
      }

      // Dedicated reveal for metrics row
      gsap.fromTo('#problem .metric-col',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            id: "metrics-reveal-comm",
            trigger: "#problem .metrics-row-wrap",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );


    };

    const init = () => {
      const w = window as any;
      if (w.gsap && w.ScrollTrigger) {
        initScrollStory();
        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 100));
        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 500));
        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 1000));
      } else {
        timer = setTimeout(init, 50);
      }
    };
    init();

    return () => {
      clearTimeout(timer);
      refreshTimers.forEach(t => clearTimeout(t));

      const w = window as any;
      if (w.gsap && w.ScrollTrigger) {
        w.ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
      }
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <div className="landing-theme">
      {/* Global Texture overlays */}
      <div className="global-grid-bg" id="globalGridBg"></div>
      <div className="grain-overlay"></div>

      {/* HERO SECTION */}
      <main className="hero-section" id="hero" style={{ paddingTop: '200px', paddingBottom: '120px' }}>

        {/* Interactive Repelling Dot-Grid Matrix Background with Radial Fade-out Mask */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          maskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect'
        }}>
          <canvas ref={dotCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
        </div>

        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, marginTop: '0' }}>
          <div className="ent-pill award-pill">Intelligence Engine</div>
          <h1 className="main-heading" style={{ fontSize: 'clamp(40px, 4.2vw, 64px)', margin: '0 0 1.5rem', lineHeight: 1.15, cursor: 'default' }}>
        <span className="word-mask"><span className="word-inner w1">Your</span></span>
        <span className="word-mask"><span className="word-inner w2">security</span></span>
        <span className="word-mask"><span className="word-inner w3">data</span></span><br />
        <span className="word-mask"><span className="word-inner w4">has</span></span>
        <span className="word-mask"><span className="word-inner w5">the</span></span>
        <span className="word-mask"><span className="word-inner w6">answer</span></span>
      </h1>
          <p className="body-text award-fade-up delay-p" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every camera. Every access event. Every interaction. Every incident. The Intelligence Engine processes it all in real time — and turns raw security data into decisions your team can act on immediately.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="ent-btn-primary award-fade-up delay-btn" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>Request Intelligence Assessment <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
            <a href="#" className="ent-btn-secondary award-fade-up delay-btn" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>
              Download Technical Brief
            </a>
          </div>
        </div>

        {/* Trusted By Strip */}
        <div className="relative w-full max-w-[1280px] mx-auto px-6 z-10 award-fade-up delay-strip" style={{ paddingTop: '180px', paddingBottom: '40px', marginTop: 'auto' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes custom-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
          `}} />
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Trusted by these companies</h2>
          </div>

          <div className="relative flex overflow-hidden w-full group">
            {/* Blurs */}
            <div className="absolute left-0 top-0 bottom-0 w-48 z-20" style={{ background: 'linear-gradient(to right, #131416, transparent)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-48 z-20" style={{ background: 'linear-gradient(to left, #131416, transparent)' }}></div>

            <div className="flex overflow-hidden relative w-full">
              {[0, 1].map((marqueeIdx) => (
                <div key={marqueeIdx} className="flex shrink-0 items-center justify-start w-max" style={{ gap: '3.5rem', minWidth: '100%', paddingRight: '3.5rem', animation: 'custom-marquee 15s linear infinite' }}>
                  {[0, 1].map((repeatIdx) => (
                    <React.Fragment key={repeatIdx}>
                      <div className="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                        <span style={{ letterSpacing: '-0.05em' }}>NEXT<span className="text-[#888]">.</span></span>
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>
                        React
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
                        shadcn/ui
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z" /></svg>
                        supabase
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
                        tailwindcss
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z" /></svg>
                        Vercel
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SECTION 2: THE PROBLEM */}
      <section
        className="section sec-ai-agents reveal-section"
        id="problem"
        style={{
          position: 'relative',
          background: 'transparent',
          width: '100%',
          padding: '140px 0 0 0',
          overflow: 'hidden',
          zIndex: 10
        }}
      >
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '24px' }}>
            <span className="ent-pill" style={{ marginBottom: '0px' }}>THE PROBLEM</span>
          </div>
          <h2 className="problem-heading">
            Your security operation<br />is drowning in data
          </h2>
          <p className="problem-subheading">
            You are generating more security data than any team can manually process. The result is not<br />
            too little information — it is too much, in too many places, arriving too late to act on.
          </p>

          <style>{`
            .ent-grid-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                border: 1px solid #212326; /* Full outer box */
                text-align: left;
                width: 100%;
            }
            .ent-grid-cell {
                padding: 40px !important;
                display: flex;
                flex-direction: column;
                min-height: 400px;
                position: relative;
                transition: background 0.3s;
            }
            .ent-grid-cell .fig-svg-wrap {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            /* Inner cross borders */
            .ent-grid-cell:nth-child(1) { border-right: 1px solid #212326; border-bottom: 1px solid #212326; }
            .ent-grid-cell:nth-child(2) { border-bottom: 1px solid #212326; }
            .ent-grid-cell:nth-child(3) { border-right: 1px solid #212326; }
            
            .ent-grid-cell:hover {
                background: rgba(255, 255, 255, 0.02);
            }
            @media (max-width: 768px) {
                .ent-grid-wrapper { grid-template-columns: 1fr; border-radius: 8px; }
                .ent-grid-cell { min-height: 300px; padding: 24px; border-right: none !important; }
                .ent-grid-cell:nth-child(1), .ent-grid-cell:nth-child(2), .ent-grid-cell:nth-child(3) { border-bottom: 1px solid #212326; }
            }
          `}</style>
          <div className="ent-grid-wrapper">

            {/* Feature 1 */}
            <div className="feature-col-item ent-grid-cell" style={{ opacity: 0 }}>
              <span className="fig-label">Fig 0.1</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 360 200" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="purpleGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(119, 0, 255, 0.05)" />
                      <stop offset="100%" stopColor="rgba(119, 0, 255, 0.3)" />
                    </linearGradient>
                    <linearGradient id="purpleGradVertical1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(119, 0, 255, 0.2)" />
                      <stop offset="100%" stopColor="rgba(119, 0, 255, 0.02)" />
                    </linearGradient>
                    <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#212326" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowSubtle1" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g transform="translate(180, 100) scale(1.2)">
                    {/* Base Architectural Grid */}
                    <g stroke="#1A1C1E" strokeWidth="0.5" strokeDasharray="3,3">
                      <path d="M-150,-80 L150,-80 M-150,-40 L150,-40 M-150,0 L150,0 M-150,40 L150,40 M-150,80 L150,80" />
                      <path d="M-120,-100 L-120,100 M-80,-100 L-80,100 M-40,-100 L-40,100 M0,-100 L0,100 M40,-100 L40,100 M80,-100 L80,100 M120,-100 L120,100" />
                    </g>

                    {/* Data Influx Streams */}
                    <path d="M-140,-50 L-60,-50 M-140,-30 L-60,-30 M-140,-10 L-60,-10 M-140,10 L-60,10 M-140,30 L-60,30 M-140,50 L-60,50" stroke="#1A1C1E" strokeWidth="1" />
                    <g fill="#ffffff" filter="url(#glowSubtle1)">
                      <circle cx="-130" cy="-50" r="1.5" /> <circle cx="-110" cy="-30" r="1.5" /> <circle cx="-90" cy="-10" r="1.5" />
                      <circle cx="-120" cy="10" r="1.5" /> <circle cx="-100" cy="30" r="1.5" /> <circle cx="-80" cy="50" r="1.5" />
                    </g>
                    <rect x="-150" y="-60" width="30" height="14" rx="2" fill="url(#boxGrad1)" stroke="#1A1C1E" strokeWidth="1" />
                    <text x="-135" y="-51" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="middle">47M/DAY</text>

                    {/* Aggregator Node */}
                    <path d="M-60,-60 L-30,-20 L-30,20 L-60,60 Z" fill="url(#purpleGrad1)" stroke="#7700FF" strokeWidth="1" opacity="0.9" />
                    <path d="M-50,-40 L-40,-25 M-50,40 L-40,25" stroke="#1A1C1E" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Core Processor Bottleneck */}
                    <rect x="-30" y="-20" width="30" height="40" fill="#131416" stroke="#7700FF" strokeWidth="1" />
                    <line x1="-20" y1="-10" x2="-10" y2="-10" stroke="#7700FF" strokeWidth="1.5" style={{ animation: 'blink-warning-1 1s infinite' }} filter="url(#glowSubtle1)" />
                    <line x1="-20" y1="0" x2="-10" y2="0" stroke="#7700FF" strokeWidth="1.5" style={{ animation: 'blink-warning-1 1s infinite', animationDelay: '0.2s' }} filter="url(#glowSubtle1)" />
                    <line x1="-20" y1="10" x2="-10" y2="10" stroke="#7700FF" strokeWidth="1.5" style={{ animation: 'blink-warning-1 1s infinite', animationDelay: '0.4s' }} filter="url(#glowSubtle1)" />

                    {/* Filtered Output (Small) */}
                    <path d="M0,-5 L100,-5 M0,5 L100,5" stroke="#1A1C1E" strokeWidth="1" />
                    <circle cx="100" cy="-5" r="2" fill="#ffffff" filter="url(#glowSubtle1)" />
                    <circle cx="100" cy="5" r="2" fill="#ffffff" filter="url(#glowSubtle1)" />
                    <rect x="70" y="-25" width="40" height="14" rx="2" fill="url(#boxGrad1)" stroke="#1A1C1E" strokeWidth="1" />
                    <text x="90" y="-16" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#ffffff" textAnchor="middle">REVIEWED</text>

                    {/* Dropped Output (Massive) */}
                    <path d="M-15,20 L-15,60 L20,60 M-5,20 L-5,70 L20,70 M5,20 L5,80 L20,80" stroke="#7700FF" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

                    {/* Unreviewed Repository */}
                    <path d="M20,50 L110,50 L110,90 L20,90 Z" fill="url(#purpleGradVertical1)" stroke="#7700FF" strokeWidth="1" />
                    <g fill="#7700FF" opacity="0.5">
                      <rect x="25" y="55" width="8" height="8" /> <rect x="35" y="55" width="8" height="8" /> <rect x="45" y="55" width="8" height="8" /> <rect x="55" y="55" width="8" height="8" />
                      <rect x="25" y="65" width="8" height="8" /> <rect x="35" y="65" width="8" height="8" /> <rect x="45" y="65" width="8" height="8" /> <rect x="55" y="65" width="8" height="8" />
                      <rect x="25" y="75" width="8" height="8" /> <rect x="35" y="75" width="8" height="8" /> <rect x="45" y="75" width="8" height="8" /> <rect x="55" y="75" width="8" height="8" />
                    </g>
                    <text x="75" y="72" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle" filter="url(#glowSubtle1)" style={{ animation: 'blink-warning-1 1.5s infinite' }}>94% UNREVIEWED</text>
                  </g>
                </svg>
              </div>
              <h3>Unreviewed Intelligence</h3>
              <p className="card-desc">2.4 million access events generated last month across your sites. 94% were never reviewed by a human. The patterns that matter most are buried in the volume your team cannot reach.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-col-item ent-grid-cell" style={{ opacity: 0 }}>
              <span className="fig-label">Fig 0.2</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 360 200" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="boxGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#212326" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowSubtle2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g transform="translate(180, 105) scale(1.1)">
                    {/* Base Architectural Grid */}
                    <g stroke="#1A1C1E" strokeWidth="0.5" strokeDasharray="3,3">
                      <path d="M-150,-80 L150,-80 M-150,-40 L150,-40 M-150,0 L150,0 M-150,40 L150,40 M-150,80 L150,80" />
                      <path d="M-120,-100 L-120,100 M-80,-100 L-80,100 M-40,-100 L-40,100 M0,-100 L0,100 M40,-100 L40,100 M80,-100 L80,100 M120,-100 L120,100" />
                    </g>

                    {/* Sequence Layers */}
                    <path d="M-120,-60 L120,-60" stroke="#1A1C1E" strokeWidth="1" />
                    <path d="M-120,0 L120,0" stroke="#1A1C1E" strokeWidth="1" />
                    <path d="M-120,60 L120,60" stroke="#1A1C1E" strokeWidth="1" />

                    <text x="-140" y="-57" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="end">SYSTEM</text>
                    <text x="-140" y="3" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="end">ANALYST</text>
                    <text x="-140" y="63" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="end">RESPONSE</text>

                    {/* Nodes & Flow */}
                    {/* Trigger */}
                    <circle cx="-100" cy="-60" r="6" fill="#7700FF" filter="url(#glowSubtle2)" />
                    <text x="-100" y="-75" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#ffffff" textAnchor="middle">ANOMALY DETECTED</text>
                    <text x="-100" y="-45" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="middle">02:14:00</text>

                    {/* Propagation */}
                    <path d="M-100,-60 L-60,0" stroke="rgba(119, 0, 255, 0.4)" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx="-60" cy="0" r="6" fill="url(#boxGrad2)" stroke="#7700FF" strokeWidth="1.5" />
                    <text x="-60" y="-15" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#ffffff" textAnchor="middle">TICKET CREATED</text>
                    <text x="-60" y="15" fontFamily="var(--font-mono), monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">+15m</text>

                    <path d="M-60,0 L20,0" stroke="rgba(119, 0, 255, 0.4)" strokeWidth="1.5" strokeDasharray="4,2" />
                    <rect x="0" y="-12" width="20" height="24" rx="2" fill="url(#boxGrad2)" stroke="#7700FF" strokeWidth="1" />
                    <text x="10" y="-18" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#ffffff" textAnchor="middle">MANUAL REVIEW</text>
                    <text x="10" y="22" fontFamily="var(--font-mono), monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">+45m</text>

                    <path d="M20,0 L100,60" stroke="#7700FF" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx="100" cy="60" r="8" fill="rgba(119,0,255,0.1)" stroke="#7700FF" strokeWidth="2" filter="url(#glow2)" style={{ animation: 'blink-warning-1 1.5s infinite' }} />
                    <text x="100" y="45" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#7700FF" textAnchor="middle">ACTION TAKEN</text>
                    <text x="100" y="78" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#7700FF" textAnchor="middle">+75m</text>

                    {/* Critical Delay Marker */}
                    <path d="M-100,-85 L100,-85" stroke="#7700FF" strokeWidth="1" opacity="0.6" />
                    <path d="M-100,-90 L-100,-80 M100,-90 L100,-80" stroke="#7700FF" strokeWidth="1" opacity="0.6" />
                    <rect x="-30" y="-92" width="60" height="14" rx="2" fill="#131416" stroke="#7700FF" strokeWidth="1" />
                    <text x="0" y="-83" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#7700FF" filter="url(#glowSubtle2)" textAnchor="middle" style={{ animation: 'blink-warning-1 1.5s infinite' }}>75 MINUTE EXPOSURE</text>
                  </g>
                </svg>
              </div>
              <h3>Decisions That Arrive Too Late</h3>
              <p className="card-desc">An access anomaly triggers at 2am. By the time it escalates through manual processes, the window has passed. Your team had the data. They just couldn't get to it fast enough.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-col-item ent-grid-cell" style={{ opacity: 0 }}>
              <span className="fig-label">Fig 0.3</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 360 200" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="purpleGradVertical3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(119, 0, 255, 0.2)" />
                      <stop offset="100%" stopColor="rgba(119, 0, 255, 0.02)" />
                    </linearGradient>
                    <linearGradient id="boxGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#212326" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                    <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowSubtle3" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g transform="translate(180, 100) scale(1.2)">
                    {/* Base Architectural Grid */}
                    <g stroke="#1A1C1E" strokeWidth="0.5" strokeDasharray="3,3">
                      <path d="M-150,-80 L150,-80 M-150,-40 L150,-40 M-150,0 L150,0 M-150,40 L150,40 M-150,80 L150,80" />
                      <path d="M-120,-100 L-120,100 M-80,-100 L-80,100 M-40,-100 L-40,100 M0,-100 L0,100 M40,-100 L40,100 M80,-100 L80,100 M120,-100 L120,100" />
                    </g>

                    {/* Three Large Silos */}
                    {/* VMS Silo */}
                    <g transform="translate(-100, 0)">
                      <path d="M-25,-50 L25,-50 L35,-40 L35,50 L-25,50 Z" fill="url(#boxGrad3)" stroke="#1A1C1E" strokeWidth="1.5" />
                      <path d="M25,-50 L25,50" stroke="#1A1C1E" strokeWidth="1" />
                      <path d="M25,-50 L35,-40" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="-20" fontFamily="var(--font-mono), monospace" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">VMS</text>
                      {/* Data Fragments */}
                      <rect x="-15" y="0" width="20" height="4" fill="#7700FF" />
                      <rect x="-15" y="10" width="12" height="4" fill="rgba(119, 0, 255, 0.4)" />
                      <rect x="-15" y="20" width="25" height="4" fill="rgba(119, 0, 255, 0.4)" />
                    </g>

                    {/* ACS Silo */}
                    <g transform="translate(0, 0)">
                      <path d="M-25,-50 L25,-50 L35,-40 L35,50 L-25,50 Z" fill="url(#boxGrad3)" stroke="#1A1C1E" strokeWidth="1.5" />
                      <path d="M25,-50 L25,50" stroke="#1A1C1E" strokeWidth="1" />
                      <path d="M25,-50 L35,-40" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="-20" fontFamily="var(--font-mono), monospace" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">ACS</text>
                      {/* Data Fragments */}
                      <rect x="-15" y="0" width="22" height="4" fill="#7700FF" />
                      <rect x="-15" y="10" width="18" height="4" fill="rgba(119, 0, 255, 0.4)" />
                      <rect x="-15" y="20" width="14" height="4" fill="rgba(119, 0, 255, 0.4)" />
                    </g>

                    {/* DIR Silo */}
                    <g transform="translate(100, 0)">
                      <path d="M-25,-50 L25,-50 L35,-40 L35,50 L-25,50 Z" fill="url(#boxGrad3)" stroke="#1A1C1E" strokeWidth="1.5" />
                      <path d="M25,-50 L25,50" stroke="#1A1C1E" strokeWidth="1" />
                      <path d="M25,-50 L35,-40" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="-20" fontFamily="var(--font-mono), monospace" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">DIR</text>
                      {/* Data Fragments */}
                      <rect x="-15" y="0" width="16" height="4" fill="#7700FF" />
                      <rect x="-15" y="10" width="24" height="4" fill="rgba(119, 0, 255, 0.4)" />
                      <rect x="-15" y="20" width="10" height="4" fill="rgba(119, 0, 255, 0.4)" />
                    </g>

                    {/* Broken Connectors */}
                    <path d="M-65,10 L-25,10" stroke="#7700FF" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                    <g stroke="#7700FF" strokeWidth="2" transform="translate(-45, 10)" filter="url(#glowSubtle3)">
                      <line x1="-4" y1="-4" x2="4" y2="4" /> <line x1="4" y1="-4" x2="-4" y2="4" />
                    </g>

                    <path d="M35,10 L75,10" stroke="#7700FF" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                    <g stroke="#7700FF" strokeWidth="2" transform="translate(55, 10)" filter="url(#glowSubtle3)">
                      <line x1="-4" y1="-4" x2="4" y2="4" /> <line x1="4" y1="-4" x2="-4" y2="4" />
                    </g>

                    {/* Status Bar */}
                    <rect x="-70" y="70" width="140" height="18" rx="2" fill="url(#purpleGradVertical3)" stroke="#7700FF" strokeWidth="1" />
                    <text x="0" y="82" fontFamily="var(--font-mono), monospace" fontSize="8" fill="#ffffff" filter="url(#glowSubtle3)" textAnchor="middle" style={{ animation: 'blink-warning-1 1.5s infinite' }}>[ ZERO CROSS-SYSTEM CONTEXT ]</text>
                  </g>
                </svg>
              </div>
              <h3>Intelligence Trapped in Silos</h3>
              <p className="card-desc">Your VMS, access control, identity directory, and incident management each hold a piece of the picture. No system connects them. No human has time to. The full picture never forms.</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-col-item ent-grid-cell" style={{ opacity: 0 }}>
              <span className="fig-label">Fig 0.4</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 360 200" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="boxGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#212326" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                    <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowSubtle4" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g transform="translate(180, 100) scale(1.2)">
                    {/* Base Architectural Grid */}
                    <g stroke="#1A1C1E" strokeWidth="0.5" strokeDasharray="3,3">
                      <path d="M-150,-80 L150,-80 M-150,-40 L150,-40 M-150,0 L150,0 M-150,40 L150,40 M-150,80 L150,80" />
                      <path d="M-120,-100 L-120,100 M-80,-100 L-80,100 M-40,-100 L-40,100 M0,-100 L0,100 M40,-100 L40,100 M80,-100 L80,100 M120,-100 L120,100" />
                    </g>

                    {/* Disparate Data Sources */}
                    <g transform="translate(-120, -50)">
                      <rect x="-20" y="-15" width="40" height="30" fill="url(#boxGrad4)" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="3" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="middle">LOG EXPORTS</text>
                    </g>
                    <g transform="translate(-120, 0)">
                      <rect x="-20" y="-15" width="40" height="30" fill="url(#boxGrad4)" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="3" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="middle">ACCESS DB</text>
                    </g>
                    <g transform="translate(-120, 50)">
                      <rect x="-20" y="-15" width="40" height="30" fill="url(#boxGrad4)" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="3" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#A1A1AA" textAnchor="middle">VIDEO ARCHIVE</text>
                    </g>

                    {/* Manual Extraction Paths */}
                    <path d="M-100,-50 L-30,-20" stroke="#1A1C1E" strokeWidth="1.5" strokeDasharray="4,4" />
                    <path d="M-100,0 L-30,0" stroke="#1A1C1E" strokeWidth="1.5" strokeDasharray="4,4" />
                    <path d="M-100,50 L-30,20" stroke="#1A1C1E" strokeWidth="1.5" strokeDasharray="4,4" />

                    {/* Human Analyst Bottleneck */}
                    <circle cx="-30" cy="0" r="25" fill="#131416" stroke="#7700FF" strokeWidth="1.5" />
                    <circle cx="-30" cy="0" r="18" fill="rgba(119,0,255,0.1)" stroke="#7700FF" strokeWidth="1" filter="url(#glowSubtle4)" />
                    <text x="-30" y="3" fontFamily="var(--font-mono), monospace" fontSize="8" fill="#ffffff" textAnchor="middle">HUMAN</text>
                    <rect x="-50" y="35" width="40" height="12" rx="2" fill="url(#boxGrad4)" stroke="#7700FF" strokeWidth="1" />
                    <text x="-30" y="43" fontFamily="var(--font-mono), monospace" fontSize="5" fill="#7700FF" textAnchor="middle" filter="url(#glowSubtle4)" style={{ animation: 'blink-warning-1 1.5s infinite' }}>BOTTLENECK</text>

                    {/* Slow Processing Path */}
                    <path d="M-5,0 L60,0" stroke="#1A1C1E" strokeWidth="1" strokeDasharray="2,2" />
                    <polygon points="56,-4 62,0 56,4" fill="rgba(255,255,255,0.2)" />

                    {/* Compliance Document */}
                    <g transform="translate(90, 0)">
                      <path d="M-25,-35 L15,-35 L25,-25 L25,35 L-25,35 Z" fill="url(#boxGrad4)" stroke="#1A1C1E" strokeWidth="1.5" />
                      <path d="M15,-35 L15,-25 L25,-25" fill="none" stroke="#1A1C1E" strokeWidth="1.5" />
                      <line x1="-15" y1="-10" x2="15" y2="-10" stroke="#1A1C1E" strokeWidth="1" />
                      <line x1="-15" y1="0" x2="15" y2="0" stroke="#1A1C1E" strokeWidth="1" />
                      <line x1="-15" y1="10" x2="5" y2="10" stroke="#1A1C1E" strokeWidth="1" />
                      <text x="0" y="25" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#ffffff" textAnchor="middle">COMPLIANCE REPORT</text>
                    </g>

                    {/* Cost Alert */}
                    <rect x="50" y="-70" width="80" height="20" rx="2" fill="#131416" stroke="#7700FF" strokeWidth="1" />
                    <text x="90" y="-57" fontFamily="var(--font-mono), monospace" fontSize="7" fill="#7700FF" filter="url(#glowSubtle4)" textAnchor="middle" style={{ animation: 'blink-warning-1 1.5s infinite' }}>[ 240H OVERHEAD ]</text>
                  </g>
                </svg>
              </div>
              <h3>Compliance Built by Hand</h3>
              <p className="card-desc">One quarterly compliance report. Three analysts. Two weeks. 240 hours of pulling data from six disconnected systems to produce documentation that should generate itself automatically.</p>
            </div>
            </div>


          {/* Diagonal connecting bridge */}
          <div style={{
            width: '100%',
            height: '60px',
            borderLeft: '1px solid #212326',
            borderRight: '1px solid #212326',
            borderBottom: '1px solid #212326',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, #212326 6px, #212326 7px)'
          }} />

          {/* Metrics Section */}
          <div className="metrics-row-wrap" style={{ width: '100%', marginTop: '0px' }}>
            <div className="metrics-horizontal-row-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #212326', borderTop: 'none', background: 'rgba(20,21,24,0.45)', borderRadius: '0', overflow: 'hidden' }}>
              {[
                { num: '340%', desc: 'average increase in security data volume over 5 years' },
                { num: '67%', desc: 'of security decisions made without real-time data' },
                { num: '4.2hrs', desc: 'average manual detection time for access anomalies' },
                { num: '89%', desc: 'of compliance reports still assembled manually' }
              ].map((metric, idx) => (
                <div key={idx} className="metric-col" style={{ padding: '40px 24px', textAlign: 'center', borderRight: idx !== 3 ? '1px solid #212326' : 'none' }}>
                  <div className="metric-col-number" style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary-purple)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    {metric.num}
                  </div>
                  <p className="metric-col-desc" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4', margin: 0 }}>
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 160px blank div spacing before the section */}
      <div style={{ height: '160px', width: '100%', flexShrink: 0 }} />

      {/* SECTION 3.5: Premium CTA Statement */}
      <section
        className="intel-cta-section"
        style={{
          background: 'transparent',
          color: '#ffffff',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <style>{`
          @keyframes moveDiagonalsIntel {
              0% { background-position: 0 0; }
              100% { background-position: 120px 0; }
          }
          .intel-cta-section:hover .intel-cta-bg {
              animation: moveDiagonalsIntel 3s linear infinite;
          }
        `}</style>
        {/* Horizontal Top (Full width) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: '#212326', zIndex: 0 }} />
        {/* Horizontal Bottom (Full width) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: '#212326', zIndex: 0 }} />

        {/* Stars Background (Outer Wings Only) - Removed as per request */}
        {/* Central constrained column */}
        <div className="container" style={{ position: 'relative', height: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          {/* Box with vertical borders, diagonal background, and breathing bottom glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '24px',
            right: '24px',
            borderLeft: '1px solid #212326',
            borderRight: '1px solid #212326',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, #212326 6px, #212326 7px)',
            overflow: 'hidden',
            zIndex: -1
          }} className="hide-on-mobile intel-cta-bg">

            {/* Inner Bottom Gradient (Breathing Up and Down) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(119, 0, 255, 0.25) 0%, transparent 100%)',
              animation: 'bottomBreathing 5s ease-in-out infinite',
              transformOrigin: 'bottom center',
              pointerEvents: 'none',
              zIndex: -1
            }} />

          </div>

          <div style={{ maxWidth: '900px', width: '100%', padding: '80px 0', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '32px',
              fontFamily: 'var(--font-main)'
            }}>
              Security intelligence that acts before<br />
              the analyst gets back to you
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted, #A1A1AA)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-mono)',
              marginBottom: '48px',
              maxWidth: '700px',
              margin: '0 auto 48px auto'
            }}>
              Your security stack is generating more intelligence than any team can manually process. The Intelligence Engine connects it, correlates it, and delivers decisions — before the window closes.
            </p>
            <a href="#" className="ent-btn-primary" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '16px 32px',
              fontSize: '15px',
              textDecoration: 'none',
            }}>Request Intelligence Assessment <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
          </div>
        </div>
      </section>

      {/* 160px blank div spacing after the section */}
      <div style={{ height: '160px', width: '100%', flexShrink: 0 }} />

      {/* SECTION: CAPABILITY FRAMEWORK */}
      {/* SECTION: CAPABILITIES — INTELLIGENCE ENGINE */}
      <section id="capabilities" style={{ padding: '0 0 160px 0', background: 'transparent', position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '16px' }}>
            <span className="ent-pill" style={{ marginLeft: 0 }}>INTELLIGENCE CAPABILITIES</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', margin: '0 0 60px', flexWrap: 'wrap', gap: '28px' }}>
            <h2 className="std-section-h2" style={{ maxWidth: '700px', fontSize: '52px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0', textAlign: 'left', lineHeight: 1.2 }}>
              Six capabilities with zero analyst bottlenecks
            </h2>
            <div style={{ maxWidth: '400px', marginBottom: '22px' }}>
              <p style={{ fontSize: '15px', color: '#B6B6B7', lineHeight: 1.6, textAlign: 'left', margin: '0' }}>
                Purpose-built intelligence for every function in your security operation. From the guard floor to the boardroom.
              </p>
            </div>
          </div>

          <div className="agents-accordion-grid">
            {/* Left side: Accordion list */}
            <div className="agents-accordion-left">
              {CAPABILITIES_DATA.map((cap) => (
                <div
                  key={cap.id}
                  className={`agent-accordion-card ${activeCapability === cap.id ? 'active' : ''}`}
                  onClick={() => setActiveCapability(cap.id)}
                >
                  <div className="agent-accordion-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: activeCapability === cap.id ? '#7700FF' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{cap.num}</span>
                      <h3 className="agent-accordion-title" style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', fontWeight: activeCapability === cap.id ? 600 : 400, color: activeCapability === cap.id ? '#ffffff' : 'rgba(255,255,255,0.4)', margin: 0 }}>{cap.name}</h3>
                    </div>
                  </div>

                  <div className="agent-accordion-content">
                    <div className="agent-accordion-content-inner">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '8px' }}>

                        {/* Scope Block */}
                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(239,68,68,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(239,68,68,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                            CAPABILITY SCOPE
                          </span>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)' }}>
                            {cap.desc}
                          </p>
                        </div>

                        {/* Metrics Block */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(119,0,255,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(119,0,255,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                            KEY OUTCOMES
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                            {cap.metrics.map((metric, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '8px 0', borderBottom: 'none', position: 'relative' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7700FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0 }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)' }}>
                                  {metric}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Sticky Dashboard Panel */}
            <div className="agents-accordion-right">
              <div className="agents-dashboard-panel" style={{ position: 'sticky', top: '120px' }}>
                <div className="agents-dashboard-panel-inner" style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '480px' }}>

                  {/* Panel Header Removed */}

                  {/* Panel Body */}
                  <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                    {activeCapability === 0 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            {/* Subtle dot grid for the Trigger.dev tech vibe */}
                            <pattern id="triggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>

                            {/* Glowing drop shadow for nodes */}
                            <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            <filter id="glowPink" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            {/* Gradient for the main correlation core */}
                            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#7700FF" />
                              <stop offset="100%" stopColor="#A855F7" />
                            </linearGradient>
                          </defs>

                          {/* Background */}
                          <rect width="100%" height="100%" fill="url(#triggerGrid)" />

                          {/* Background decorative circles */}
                          <circle cx="200" cy="125" r="80" fill="none" stroke="rgba(119, 0, 255, 0.05)" strokeWidth="1" />
                          <circle cx="200" cy="125" r="120" fill="none" stroke="rgba(119, 0, 255, 0.03)" strokeWidth="1" strokeDasharray="4 4" />

                          {/* --- CONNECTIONS --- */}

                          {/* Normal data streams (Green) */}
                          <path d="M 60 60 Q 130 60 200 125" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
                          </path>
                          <path d="M 60 190 Q 130 190 200 125" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
                          </path>


                          {/* High-priority threat paths (Pink/Purple) */}
                          <path d="M 340 60 Q 270 60 200 125" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="4 4">
                            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="4s" repeatCount="indefinite" />
                          </path>
                          <path d="M 340 190 Q 270 190 200 125" fill="none" stroke="#7700FF" strokeWidth="1.5" strokeDasharray="4 4">
                            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="4s" repeatCount="indefinite" />
                          </path>

                          {/* Animated data packets traveling along paths */}
                          <circle cx="0" cy="0" r="2" fill="#10B981">
                            <animateMotion path="M 60 60 Q 130 60 200 125" dur="3s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="2" fill="#10B981">
                            <animateMotion path="M 60 190 Q 130 190 200 125" dur="4s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="3" fill="#EC4899" filter="url(#glowPink)">
                            <animateMotion path="M 340 60 Q 270 60 200 125" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="2.5" fill="#7700FF" filter="url(#glowPurple)">
                            <animateMotion path="M 340 190 Q 270 190 200 125" dur="2.5s" repeatCount="indefinite" />
                          </circle>

                          {/* --- NODES --- */}

                          {/* Source Node 1 (Green) */}
                          <g transform="translate(60, 60)">
                            <circle r="12" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" />
                            <circle r="4" fill="#10B981" filter="url(#glowGreen)" />
                            <text x="-15" y="22" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">LOGS_DB</text>
                          </g>

                          {/* Source Node 2 (Green) */}
                          <g transform="translate(60, 190)">
                            <circle r="12" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" />
                            <circle r="4" fill="#10B981" filter="url(#glowGreen)" />
                            <text x="-15" y="22" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">IDENTITY</text>
                          </g>

                          {/* Threat Node 1 (Pink) */}
                          <g transform="translate(340, 60)">
                            <circle r="16" fill="rgba(236, 72, 153, 0.1)" stroke="rgba(236, 72, 153, 0.5)" strokeDasharray="2 2" style={{ animation: 'spin 4s linear infinite' }} />
                            <circle r="5" fill="#EC4899" filter="url(#glowPink)" />
                            <text x="-25" y="26" fill="#EC4899" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">ANOMALY_7</text>
                          </g>

                          {/* Threat Node 2 (Purple) */}
                          <g transform="translate(340, 190)">
                            <circle r="14" fill="rgba(119, 0, 255, 0.1)" stroke="rgba(119, 0, 255, 0.4)" />
                            <circle r="4.5" fill="#7700FF" filter="url(#glowPurple)" />
                            <text x="-20" y="24" fill="#7700FF" fontSize="9" fontFamily="var(--font-mono)">EXTERNAL</text>
                          </g>

                          {/* --- CENTER CORRELATION ENGINE --- */}
                          <g transform="translate(200, 125)">
                            {/* Pulsing rings */}
                            <circle r="30" fill="none" stroke="rgba(119, 0, 255, 0.2)" strokeWidth="1" style={{ animation: 'pulse 2s infinite' }} />
                            <circle r="40" fill="none" stroke="rgba(119, 0, 255, 0.1)" strokeWidth="1" style={{ animation: 'pulse 2s infinite 0.5s' }} />

                            {/* Core Hexagon */}
                            <path d="M 0 -22 L 19 -11 L 19 11 L 0 22 L -19 11 L -19 -11 Z" fill="rgba(119, 0, 255, 0.1)" stroke="#7700FF" strokeWidth="1.5" filter="url(#glowPurple)" />

                            {/* Inner Core */}
                            <circle r="8" fill="url(#coreGradient)" />

                            {/* Rotating scanner */}
                            <path d="M 0 0 L 0 -18 A 18 18 0 0 1 18 0 Z" fill="rgba(168, 85, 247, 0.3)" style={{ transformOrigin: '0 0', animation: 'spin 3s linear infinite' }} />
                          </g>

                          {/* --- FLOATING UI OVERLAY (Trigger.dev style) --- */}
                          <g transform="translate(145, 175)">
                            <rect width="110" height="40" rx="4" fill="#0B0D12" stroke="#1A1C1E" />

                            {/* Executing Spinner */}
                            <circle cx="15" cy="20" r="4" fill="none" stroke="#1A1C1E" strokeWidth="1.5" />
                            <circle cx="15" cy="20" r="4" fill="none" stroke="#7700FF" strokeWidth="1.5" strokeDasharray="6 20" style={{ transformOrigin: '15px 20px', animation: 'spin 1s linear infinite' }} />

                            <text x="26" y="18" fill="#E4E4E7" fontSize="8" fontFamily="var(--font-mono)">Correlating...</text>
                            <text x="26" y="28" fill="#7700FF" fontSize="7" fontFamily="var(--font-mono)">+14 Data points</text>

                            {/* Small Badge */}
                            <rect x="75" y="14" width="25" height="12" rx="2" fill="rgba(236,72,153,0.1)" stroke="rgba(236,72,153,0.3)" />
                            <text x="78" y="22" fill="#EC4899" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold">98%</text>
                          </g>

                        </svg>
                      </div>
                    )}

                    {activeCapability === 1 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <pattern id="nlTriggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>
                            <filter id="nlGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <filter id="nlGlowPink" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="queryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#7700FF" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>

                          {/* Background Grid */}
                          <rect width="100%" height="100%" fill="url(#nlTriggerGrid)" />

                          {/* Connections / Processing Lines */}
                          <path d="M 200 110 Q 200 170 120 180" fill="none" stroke="#7700FF" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dashLine 15s linear infinite reverse' }} />
                          <path d="M 200 110 Q 200 170 280 180" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dashLine 15s linear infinite reverse' }} />

                          {/* Moving Particles */}
                          <circle cx="0" cy="0" r="3" fill="#7700FF" filter="url(#nlGlowPurple)">
                            <animateMotion path="M 200 110 Q 200 170 120 180" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="3" fill="#EC4899" filter="url(#nlGlowPink)">
                            <animateMotion path="M 200 110 Q 200 170 280 180" dur="2.5s" repeatCount="indefinite" />
                          </circle>

                          {/* Center: Processing Node */}
                          <g transform="translate(200, 110)">
                            <circle r="15" fill="rgba(119, 0, 255, 0.1)" stroke="#7700FF" strokeWidth="1" filter="url(#nlGlowPurple)" />
                            <circle r="4" fill="#7700FF" />
                          </g>

                          {/* Top: Query Input Panel */}
                          <g transform="translate(60, 40)">
                            {/* Glassmorphic Panel */}
                            <rect width="280" height="60" rx="8" fill="#0B0D12" stroke="#1A1C1E" strokeWidth="1" />
                            <rect width="280" height="60" rx="8" fill="url(#queryGlow)" opacity="0.15" />

                            {/* Glowing top-left border accent */}
                            <path d="M 0 8 Q 0 0 8 0 L 100 0" fill="none" stroke="#7700FF" strokeWidth="1.5" />
                            <path d="M 0 40 L 0 8 Q 0 0 8 0" fill="none" stroke="#7700FF" strokeWidth="1.5" />

                            <text x="20" y="25" fill="#E4E4E7" fontSize="11" fontFamily="var(--font-mono)">
                              &gt; Show me all lateral movement
                            </text>
                            <text x="20" y="45" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-mono)">
                              from <tspan fill="#7700FF">Site 7</tspan> in the last <tspan fill="#EC4899">48 hours</tspan>
                            </text>
                            <rect x="235" y="35" width="6" height="12" fill="#7700FF" style={{ animation: 'blink 1s step-end infinite' }} />
                          </g>

                          {/* Result Node 1 (Purple) */}
                          <g transform="translate(120, 180)">
                            <circle r="25" fill="none" stroke="rgba(119, 0, 255, 0.2)" strokeWidth="1" style={{ animation: 'pulse 2s infinite' }} />
                            <rect x="-45" y="-15" width="90" height="30" rx="15" fill="#0B0D12" stroke="rgba(119, 0, 255, 0.3)" />
                            <circle cx="-30" cy="0" r="4" fill="#7700FF" filter="url(#nlGlowPurple)" />
                            <text x="-15" y="3" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">14 EVENTS</text>
                          </g>

                          {/* Result Node 2 (Pink) */}
                          <g transform="translate(280, 180)">
                            <circle r="30" fill="none" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" style={{ animation: 'pulse 2.5s infinite' }} />
                            <rect x="-45" y="-15" width="90" height="30" rx="15" fill="#0B0D12" stroke="rgba(236, 72, 153, 0.3)" />
                            <circle cx="-30" cy="0" r="4" fill="#EC4899" filter="url(#nlGlowPink)" />
                            <text x="-15" y="3" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">CRITICAL</text>
                          </g>

                          {/* Floating Status UI */}
                          <g transform="translate(240, 25)">
                            <rect width="90" height="24" rx="4" fill="#0B0D12" stroke="#1A1C1E" />
                            <circle cx="12" cy="12" r="3" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 10" style={{ animation: 'spin 1s linear infinite' }} />
                            <text x="22" y="15" fill="#10B981" fontSize="7" fontFamily="var(--font-mono)">Querying DB...</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {activeCapability === 2 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <pattern id="repTriggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>
                            <filter id="repGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>

                          <rect width="100%" height="100%" fill="url(#repTriggerGrid)" />

                          {/* Top Center: Compliance Hub */}
                          <g transform="translate(200, 70)">
                            <circle r="40" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
                            <circle r="50" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'spin 10s linear infinite' }} />
                            <circle r="6" fill="#10B981" filter="url(#repGlowGreen)" />
                            <text x="0" y="-15" textAnchor="middle" fill="#10B981" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">100%</text>
                            <text x="0" y="25" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="var(--font-mono)">COMPLIANT</text>
                          </g>

                          {/* Data streams going down to reports */}
                          <path d="M 200 120 L 200 150 L 100 150 L 100 170" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dashLine 10s linear infinite reverse' }} />
                          <path d="M 200 120 L 200 150 L 300 150 L 300 170" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dashLine 10s linear infinite reverse' }} />

                          {/* Moving Data Packets */}
                          <circle cx="0" cy="0" r="3" fill="#10B981" filter="url(#repGlowGreen)">
                            <animateMotion path="M 200 120 L 200 150 L 100 150 L 100 170" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="3" fill="#10B981" filter="url(#repGlowGreen)">
                            <animateMotion path="M 200 120 L 200 150 L 300 150 L 300 170" dur="2.5s" repeatCount="indefinite" />
                          </circle>

                          {/* Report Node 1 */}
                          <g transform="translate(30, 170)">
                            <rect width="140" height="40" rx="6" fill="#0B0D12" stroke="#1A1C1E" />
                            <rect width="140" height="40" rx="6" fill="url(#compGrad)" opacity="0.2" />
                            <circle cx="15" cy="20" r="4" fill="#10B981" filter="url(#repGlowGreen)" />
                            <text x="28" y="18" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">HIPAA AUDIT</text>
                            <text x="28" y="30" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Generated: Today</text>
                          </g>

                          {/* Report Node 2 */}
                          <g transform="translate(230, 170)">
                            <rect width="140" height="40" rx="6" fill="#0B0D12" stroke="#1A1C1E" />
                            <rect width="140" height="40" rx="6" fill="url(#compGrad)" opacity="0.2" />
                            <circle cx="15" cy="20" r="4" fill="#10B981" filter="url(#repGlowGreen)" />
                            <text x="28" y="18" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">SOC 2 REPORT</text>
                            <text x="28" y="30" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Generated: Today</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {activeCapability === 3 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <pattern id="predTriggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>
                            <filter id="predGlowRed" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="predHeatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgba(239,68,68,0.4)" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>

                          <rect width="100%" height="100%" fill="url(#predTriggerGrid)" />

                          {/* Predictive Network Graph */}
                          <path d="M 80 60 L 200 120 L 320 80" fill="none" stroke="#1A1C1E" strokeWidth="1" />
                          <path d="M 80 180 L 200 120 L 320 200" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dashLine 10s linear infinite reverse' }} />

                          {/* Safe Nodes */}
                          <circle cx="80" cy="60" r="12" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" />
                          <circle cx="80" cy="60" r="3" fill="#10B981" />
                          <circle cx="320" cy="80" r="12" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" />
                          <circle cx="320" cy="80" r="3" fill="#10B981" />

                          {/* Predicted Attack Path Target */}
                          <g transform="translate(200, 120)">
                            <circle r="25" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1" style={{ animation: 'pulse 2s infinite' }} />
                            <circle r="20" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" />
                            <circle r="5" fill="#EF4444" filter="url(#predGlowRed)" />
                            <text x="25" y="4" fill="#EF4444" fontSize="9" fontFamily="var(--font-mono)">PREDICTED TARGET</text>
                          </g>

                          {/* Threat Source 1 */}
                          <circle cx="80" cy="180" r="12" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" />
                          <circle cx="80" cy="180" r="3" fill="#EF4444" filter="url(#predGlowRed)" />
                          <text x="40" y="205" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">VULNERABILITY</text>

                          {/* Threat Source 2 */}
                          <circle cx="320" cy="200" r="12" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" />
                          <circle cx="320" cy="200" r="3" fill="#EF4444" filter="url(#predGlowRed)" />
                          <text x="270" y="225" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">COMPROMISED SITE</text>

                          {/* Floating Alert UI */}
                          <g transform="translate(130, 20)">
                            <rect width="140" height="30" rx="6" fill="#0B0D12" stroke="rgba(239,68,68,0.3)" />
                            <circle cx="15" cy="15" r="4" fill="#EF4444" filter="url(#predGlowRed)" style={{ animation: 'pulse 1s infinite' }} />
                            <text x="28" y="18" fill="#EF4444" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">92% ATTACK PROBABILITY</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {activeCapability === 4 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <pattern id="riskTriggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>
                            <filter id="riskGlowOrange" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#F59E0B" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>

                          <rect width="100%" height="100%" fill="url(#riskTriggerGrid)" />

                          {/* Risk Leaderboard UI Panel */}
                          <g transform="translate(30, 30)">
                            <text x="0" y="-10" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-mono)">RISK LEADERBOARD</text>

                            {/* High Risk Item */}
                            <rect x="0" y="0" width="340" height="40" fill="#0B0D12" stroke="rgba(245,158,11,0.3)" rx="6" />
                            <rect x="0" y="0" width="340" height="40" fill="url(#riskGrad)" opacity="0.1" rx="6" />
                            <circle cx="20" cy="20" r="4" fill="#F59E0B" filter="url(#riskGlowOrange)" style={{ animation: 'pulse 1s infinite' }} />
                            <text x="40" y="24" fill="#fff" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">SITE 7</text>
                            <text x="90" y="24" fill="#F59E0B" fontSize="9" fontFamily="var(--font-mono)">CRITICAL</text>
                            <rect x="150" y="18" width="140" height="4" fill="rgba(255,255,255,0.1)" rx="2" />
                            <rect x="150" y="18" width="110" height="4" fill="#F59E0B" rx="2" />
                            <text x="300" y="24" fill="#F59E0B" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">0.82</text>

                            {/* Medium Risk Item */}
                            <g transform="translate(0, 50)">
                              <rect x="0" y="0" width="340" height="30" fill="#0B0D12" stroke="#1A1C1E" rx="4" />
                              <circle cx="20" cy="15" r="3" fill="#7700FF" />
                              <text x="40" y="19" fill="#E4E4E7" fontSize="10" fontFamily="var(--font-mono)">SITE 12</text>
                              <rect x="150" y="13" width="140" height="4" fill="rgba(255,255,255,0.1)" rx="2" />
                              <rect x="150" y="13" width="40" height="4" fill="#7700FF" rx="2" />
                              <text x="300" y="19" fill="#7700FF" fontSize="10" fontFamily="var(--font-mono)">0.21</text>
                            </g>

                            {/* Low Risk Item */}
                            <g transform="translate(0, 90)">
                              <rect x="0" y="0" width="340" height="30" fill="#0B0D12" stroke="#1A1C1E" rx="4" />
                              <circle cx="20" cy="15" r="3" fill="#10B981" />
                              <text x="40" y="19" fill="#E4E4E7" fontSize="10" fontFamily="var(--font-mono)">SITE 3</text>
                              <rect x="150" y="13" width="140" height="4" fill="rgba(255,255,255,0.1)" rx="2" />
                              <rect x="150" y="13" width="15" height="4" fill="#10B981" rx="2" />
                              <text x="300" y="19" fill="#10B981" fontSize="10" fontFamily="var(--font-mono)">0.08</text>
                            </g>
                          </g>

                          {/* Dynamic Trend Overlay */}
                          <g transform="translate(30, 160)">
                            {/* Axis and background */}
                            <rect x="0" y="0" width="340" height="70" fill="#0B0D12" stroke="#1A1C1E" rx="6" />

                            {/* Grid Lines */}
                            <path d="M 0 17 L 340 17 M 0 35 L 340 35 M 0 53 L 340 53" fill="none" stroke="#1A1C1E" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Gradient Fill under Curve */}
                            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                            </linearGradient>

                            {/* Area Path (Smooth curve) */}
                            <path d="M 10 60 C 60 50, 90 45, 130 50 C 170 55, 200 20, 250 30 C 290 38, 310 15, 320 10 L 320 70 L 10 70 Z" fill="url(#areaGrad)" />

                            {/* Line Path (Smooth curve) */}
                            <path d="M 10 60 C 60 50, 90 45, 130 50 C 170 55, 200 20, 250 30 C 290 38, 310 15, 320 10" fill="none" stroke="#F59E0B" strokeWidth="2" filter="url(#riskGlowOrange)" />

                            {/* Vertical tracker line at end point */}
                            <path d="M 320 10 L 320 70" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

                            {/* Pulsing End Node */}
                            <circle cx="320" cy="10" r="4" fill="#F59E0B" filter="url(#riskGlowOrange)" style={{ animation: 'pulse 1s infinite' }} />

                            {/* Tooltip badge */}
                            <g transform="translate(260, -5)">
                              <rect width="65" height="18" rx="4" fill="#F59E0B" />
                              <text x="32.5" y="12" textAnchor="middle" fill="#0B0D12" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">+42% RISK</text>
                            </g>

                            {/* Label */}
                            <text x="15" y="15" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">SITE 7 VELOCITY (72H)</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {activeCapability === 5 && (
                      <div style={{
                        width: '80%',
                        height: '80%',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.5s ease-out'
                      }}>
                        {/* Fading gradient border overlay (CSS) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, #7700FF 0%, rgba(119, 0, 255, 0) 50%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                        <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <pattern id="hubTriggerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="#212326" />
                            </pattern>
                            <filter id="hubGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="6" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(119,0,255,0.2)" />
                              <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                          </defs>

                          <rect width="100%" height="100%" fill="url(#hubTriggerGrid)" />

                          {/* Central Radar Hub */}
                          <g transform="translate(200, 110)">
                            <circle r="90" fill="url(#hubGlow)" />
                            <circle r="40" fill="rgba(119,0,255,0.05)" stroke="rgba(119,0,255,0.3)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'spin 10s linear infinite reverse' }} />
                            <circle r="70" fill="none" stroke="rgba(119,0,255,0.2)" strokeWidth="1" style={{ animation: 'pulse 4s infinite' }} />
                            <circle r="6" fill="#7700FF" filter="url(#hubGlowPurple)" />
                            <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">A+</text>
                            <text x="0" y="25" textAnchor="middle" fill="#7700FF" fontSize="8" fontFamily="var(--font-mono)">POSTURE SCORE</text>
                          </g>

                          {/* Top Left Stat */}
                          <g transform="translate(20, 20)">
                            <rect width="100" height="40" rx="6" fill="#0B0D12" stroke="#1A1C1E" />
                            <text x="50" y="16" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono)">ACTIVE THREATS</text>
                            <text x="50" y="32" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold">0</text>
                            <circle cx="10" cy="10" r="3" fill="#10B981" />
                          </g>

                          {/* Top Right Stat */}
                          <g transform="translate(280, 20)">
                            <rect width="100" height="40" rx="6" fill="#0B0D12" stroke="#1A1C1E" />
                            <text x="50" y="16" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono)">SITES SECURE</text>
                            <text x="50" y="32" textAnchor="middle" fill="#10B981" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold">14/14</text>
                            <circle cx="10" cy="10" r="3" fill="#10B981" />
                          </g>

                          {/* Executive Summary Panel */}
                          <g transform="translate(20, 190)">
                            <rect width="360" height="40" rx="6" fill="#0B0D12" stroke="rgba(119,0,255,0.3)" />
                            <rect width="360" height="40" rx="6" fill="rgba(119,0,255,0.05)" />
                            <text x="16" y="16" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">"Global security posture is nominal. All agents operational.</text>
                            <text x="16" y="28" fill="#E4E4E7" fontSize="9" fontFamily="var(--font-mono)">No immediate anomalies detected in the last 24 hours."</text>
                          </g>
                        </svg>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IntelligencePhoneChat />
      <IndustrySectionIntelligence />

      {/* 160px blank div spacing before Honest Positioning */}
      <div style={{ height: '160px', width: '100%', flexShrink: 0 }} />

      <HonestPositioning />

      <style>{`
        /* Accordion grid for Capabilities section */
        .agents-accordion-grid {
          display: grid;
          grid-template-columns: 4fr 6fr;
          gap: 0;
          align-items: stretch;
          background: rgba(10, 11, 14, 0.4);
          border: 1px solid #212326;
          overflow: hidden;
        }
        @media (max-width: 991px) {
          .agents-accordion-grid {
            grid-template-columns: 1fr;
          }
        }

        .agents-accordion-left {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #212326;
          background: rgba(255, 255, 255, 0.01);
        }

        .agent-accordion-card {
          background: transparent;
          border: none;
          border-bottom: 1px solid #212326;
          padding: 24px 32px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-align: left;
        }
        
        .agent-accordion-card:last-child {
          border-bottom: none;
        }

        .agent-accordion-card:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .agent-accordion-card.active {
          background: rgba(255, 255, 255, 0.03);
        }

        .agent-accordion-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .agent-accordion-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          font-family: var(--font-mono), monospace;
        }

        .agent-accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 0.3s linear, opacity 0.3s linear, margin-top 0.3s linear;
        }

        .agent-accordion-card.active .agent-accordion-content {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 24px;
        }

        .agent-accordion-content-inner {
          overflow: hidden;
        }

        .agents-accordion-right {
          position: relative;
          height: 100%;
        }

        .agents-dashboard-panel {
          background: transparent;
          border: none;
          padding: 32px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .agents-dashboard-panel-inner {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          position: relative;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes dashLine {
          to { stroke-dashoffset: -16; }
        }
        @keyframes radarRing {
          0% { r: 10px; opacity: 1; stroke-width: 2px; }
          100% { r: 60px; opacity: 0; stroke-width: 0.5px; }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .threat-hud-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(245,158,11,0.2) !important;
          border-color: rgba(245,158,11,0.8) !important;
        }

        /* Local Page Overrides */

        .fig-svg-wrap {
          position: relative;
          background: #0b0c0e;
          border: 1px solid #212326;
          border-radius: 12px;
          padding-top: 56px !important;
          padding-left: 24px;
          padding-right: 24px;
          min-height: 260px !important;
          display: block;
          margin: 16px 0 32px 0;
          max-width: 440px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
        }

        .fig-svg-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40px;
          border-bottom: 1px solid #212326;
          background-image: 
            radial-gradient(circle at 20px 20px, #EF4444 5px, transparent 5.5px),
            radial-gradient(circle at 40px 20px, #F59E0B 5px, transparent 5.5px),
            radial-gradient(circle at 60px 20px, #10B981 5px, transparent 5.5px);
          background-repeat: no-repeat;
        }

        body.light-mode .fig-svg-wrap {
          background: #FFFFFF;
          border-color: rgba(15, 17, 21, 0.12);
        }

        body.light-mode #hero {
          border-bottom-color: rgba(15, 17, 21, 0.12) !important;
        }

        body.light-mode .fig-svg-wrap::before {
          border-bottom-color: rgba(15, 17, 21, 0.12);
        }

        #problem .fig-label {
          display: none !important;
        }

        .problem-heading {
          font-size: 48px;
          font-weight: 700 !important;
          letter-spacing: -0.02em;
          text-align: center;
          margin: 0 0 20px;
          font-family: 'Satoshi', var(--font-main), sans-serif !important;
          color: var(--text-primary) !important;
          line-height: 1.2;
        }

        .problem-subheading {
          max-width: 750px;
          margin: 0 auto 3rem;
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: 1.6;
          color: var(--text-secondary) !important;
          font-family: 'Satoshi', var(--font-main), sans-serif !important;
          text-align: center;
        }

        #problem .features-scroll-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          margin-top: 4rem;
          border: none !important;
          background: transparent;
          gap: 64px 48px !important;
          position: relative !important;
          padding: 0 24px;
          --fig-stroke-base: rgba(255, 255, 255, 0.15);
          --fig-stroke-med: rgba(255, 255, 255, 0.3);
          --fig-stroke-high: rgba(255, 255, 255, 0.5);
          --fig-fill-base: rgba(255, 255, 255, 0.02);
          --fig-fill-med: #212326;
          --fig-accent: #8B8FFF;
          --fig-text: rgba(255, 255, 255, 0.4);
          --fig-guide: rgba(255, 255, 255, 0.03);
        }

        #problem .features-scroll-grid::after {
          display: none !important;
        }

        #problem .feature-col-divider {
          display: none !important;
        }

        #problem .feature-col-divider-2 {
          display: none !important;
        }

        #problem .feature-col-item {
          padding: 40px !important;
          opacity: 0;
          transform: translateY(40px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        #problem .feature-col-item:hover {
          
        }

        #problem .feature-col-item:nth-child(1) {
          border-top-left-radius: 0 !important;
        }

        #problem .feature-col-item:nth-child(2) {
          border-top-right-radius: 0 !important;
        }

        #problem .feature-col-item:nth-child(3) {
          border-bottom-left-radius: 0 !important;
        }

        #problem .feature-col-item:nth-child(4) {
          border-bottom-right-radius: 0 !important;
        }

        #problem .feature-col-item h3 {
          font-size: 16px !important;
          font-weight: 700 !important;
          color: #FFF !important;
          margin: 0 0 12px 0 !important;
          font-family: 'Satoshi', var(--font-main), sans-serif !important;
        }

        #problem .feature-col-item .card-desc {
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: 1.6 !important;
          color: rgba(255, 255, 255, 0.6) !important;
          font-family: 'Satoshi', var(--font-main), sans-serif !important;
          margin: 0 !important;
        }

        /* Light Mode Overrides */
        body.light-mode #problem .features-scroll-grid {
          border: 1px solid rgba(15, 17, 21, 0.12) !important;
          background: transparent;
          --fig-stroke-base: rgba(15, 17, 21, 0.15);
          --fig-stroke-med: rgba(15, 17, 21, 0.35);
          --fig-stroke-high: rgba(15, 17, 21, 0.6);
          --fig-fill-base: rgba(15, 17, 21, 0.02);
          --fig-fill-med: rgba(15, 17, 21, 0.06);
          --fig-accent: #7C3AED;
          --fig-text: rgba(15, 17, 21, 0.6);
          --fig-guide: rgba(15, 17, 21, 0.05);
        }

        body.light-mode #problem .features-scroll-grid::after {
          background: rgba(15, 17, 21, 0.12) !important;
        }

        body.light-mode #problem .feature-col-divider-2 {
          background: rgba(15, 17, 21, 0.12) !important;
        }

        body.light-mode #problem .feature-col-item {
          background: #FFFFFF !important;
        }

        body.light-mode #problem .feature-col-item:hover {
          background: rgba(119, 0, 255, 0.03) !important;
        }

        body.light-mode #problem .feature-col-item h3 {
          color: #0F1115 !important;
        }

        body.light-mode #problem .feature-col-item .card-desc {
          color: #4B5563 !important;
        }

        body.light-mode #problem .feature-col-item .fig-label {
          color: rgba(15, 17, 21, 0.4) !important;
        }

        /* Responsive adaptation */
        @media (max-width: 768px) {
          #problem .features-scroll-grid::after {
            display: none !important;
          }
          #problem .feature-col-divider-2 {
            display: none !important;
          }
          #problem .features-scroll-grid {
            grid-template-columns: 1fr !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 12px !important;
          }
          #problem .feature-col-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 0 !important;
          }
          #problem .feature-col-item:nth-child(1) {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }
          #problem .feature-col-item:nth-child(4) {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-bottom: none !important;
          }
          body.light-mode #problem .features-scroll-grid {
            border-color: rgba(15, 17, 21, 0.12) !important;
          }
          body.light-mode #problem .feature-col-item {
            border-bottom-color: rgba(15, 17, 21, 0.12) !important;
          }
        }

        /* SVG light mode visibility overrides */
        body.light-mode #problem .feature-col-item svg [stroke^="rgba(255"],
        body.light-mode #problem .feature-col-item svg [stroke="#ffffff"],
        body.light-mode #problem .feature-col-item svg [stroke="white"] {
          stroke: rgba(15, 17, 21, 0.15) !important;
        }
        body.light-mode #problem .feature-col-item svg [fill^="rgba(255"],
        body.light-mode #problem .feature-col-item svg [fill="#ffffff"],
        body.light-mode #problem .feature-col-item svg [fill="white"] {
          fill: rgba(15, 17, 21, 0.03) !important;
        }


        /* Full Width Verdict Card */
        .verdict-full-card {
          margin-top: 48px;
          padding: 24px 32px;
          background: linear-gradient(90deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.02) 100%);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-left: 4px solid #EF4444;
          border-radius: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          width: 100%;
        }

        body.light-mode .verdict-full-card {
          background: linear-gradient(90deg, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0.01) 100%);
          border-color: rgba(220, 38, 38, 0.12);
          border-left-color: #DC2626;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.02);
        }

        .verdict-full-text {
          font-size: 18px;
          line-height: 1.6;
          color: #FCA5A5;
          margin: 0;
          font-weight: 500;
          font-family: var(--font-main);
        }

        body.light-mode .verdict-full-text {
          color: #B91C1C;
        }

        /* Metrics Row */
        .metrics-row-wrap {
          width: 100%;
          margin-top: 60px;
        }

        .metrics-horizontal-row-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0px !important;
          text-align: left;
        }

        .metric-col {
          padding: 0 2.5rem;
          box-sizing: border-box;
          border-right: 1px solid var(--border-subtle);
        }

        .metric-col:last-child {
          border-right: none;
        }

        .metric-col-number {
          font-family: var(--font-mono), monospace;
          font-size: 3rem;
          font-weight: 700;
          color: var(--text-primary) !important;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
        }

        .metric-col-desc {
          font-family: var(--font-mono), monospace;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-secondary) !important;
          text-transform: none;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .metric-col {
            border-right: none;
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .metrics-horizontal-row-4col {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 40px !important;
          }
          .metric-col {
            padding: 0 !important;
            border-right: none;
          }
        }


        
        .autonomy-card:hover {
          transform: translateY(-8px);
          border-top-width: 5px !important;
          box-shadow: 0 16px 40px -4px rgba(119,0,255,0.12) !important;
          background: rgba(20,21,24,0.65) !important;
        }

        .reveal-card:hover {
          transform: translateY(-6px);
          border-color: rgba(119,0,255,0.2) !important;
          box-shadow: 0 12px 32px rgba(15,17,21,0.25) !important;
          background: rgba(20,21,24,0.7) !important;
        }

        /* Typewriter Cursor animation */
        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .cursor-blink {
          animation: cursorBlink 0.9s infinite;
        }

        /* Pulsing green led */
        @keyframes pulsingDot {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .pulsing-green-dot {
          animation: pulsingDot 1.5s infinite ease-in-out;
        }

        /* Sci-Fi Sonar Telemetry Labels overlays */
        .telemetry-label {
          position: absolute;
          transform: translate(-50%, -120%);
          padding: 4px 8px;
          background: rgba(7, 8, 10, 0.85);
          border: 1px solid rgba(119, 0, 255, 0.35);
          border-radius: 4px;
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          display: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          letter-spacing: 0.5px;
          z-index: 5;
          transition: opacity 0.3s ease;
        }
        .telemetry-dot {
          color: #EF4444; 
          margin-right: 6px;
          display: inline-block;
        }
        body.light-mode .telemetry-label {
          background: rgba(250, 249, 246, 0.9) !important;
          border: 1px solid rgba(15, 17, 21, 0.12) !important;
          color: #0F1115 !important;
          box-shadow: 0 4px 12px rgba(15,17,21,0.06) !important;
        }

        .correlation-banner {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px 20px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.45);
          border-radius: 8px;
          color: #EF4444;
          font-family: var(--font-mono);
          font-size: 10px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10;
        }
        body.light-mode .correlation-banner {
          background: rgba(239, 68, 68, 0.06) !important;
          border: 1px solid rgba(239, 68, 68, 0.35) !important;
          color: #DC2626 !important;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.06) !important;
        }

        /* theme-adaptive premium dashboard SVG styling */
        .svg-panel-container {
          fill: var(--surface-card);
          stroke: var(--border-subtle);
          stroke-width: 1px;
          transition: all 0.3s ease;
        }
        .svg-panel-bg {
          fill: var(--surface-secondary);
          stroke: var(--border-subtle);
          stroke-width: 1px;
          transition: all 0.3s ease;
        }
        .svg-text-header {
          fill: var(--text-secondary);
          font-family: var(--font-main);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .svg-text-body {
          fill: var(--text-primary);
          font-family: var(--font-main);
          font-size: 7px;
          transition: fill 0.3s ease;
        }
        .svg-text-mono {
          fill: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 7px;
          transition: fill 0.3s ease;
        }
        .svg-line-divider {
          stroke: var(--border-subtle);
          stroke-width: 1px;
          transition: stroke 0.3s ease;
        }
        .svg-pill-purple {
          fill: rgba(119, 0, 255, 0.06);
          stroke: rgba(119, 0, 255, 0.25);
          stroke-width: 1px;
        }
        .svg-pill-pink {
          fill: rgba(255, 45, 149, 0.06);
          stroke: rgba(255, 45, 149, 0.25);
          stroke-width: 1px;
        }
        .svg-pill-red {
          fill: rgba(239, 68, 68, 0.06);
          stroke: rgba(239, 68, 68, 0.25);
          stroke-width: 1px;
        }
        .svg-text-purple {
          fill: var(--primary-purple);
          font-family: var(--font-main);
        }
        .svg-text-pink {
          fill: var(--accent-pink);
          font-family: var(--font-main);
        }
        .svg-text-red {
          fill: #EF4444;
          font-family: var(--font-main);
        }
        .svg-cursor-tag {
          fill: var(--primary-purple);
        }
        .svg-cursor-tag-text {
          fill: #FFFFFF;
          font-family: var(--font-main);
          font-size: 6px;
          font-weight: bold;
        }

        /* Micro-animations */
        @keyframes float-cursor {
          0%, 100% { transform: translate(130px, 92px); }
          50% { transform: translate(126px, 86px); }
        }
        @keyframes float-cursor-slow {
          0%, 100% { transform: translate(45px, 82px); }
          50% { transform: translate(41px, 86px); }
        }
        @keyframes float-cursor-fast {
          0%, 100% { transform: translate(110px, 62px); }
          50% { transform: translate(114px, 58px); }
        }
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes pulse-bracket {
          0%, 100% { stroke-opacity: 0.6; }
          50% { stroke-opacity: 1; stroke-width: 1.5px; }
        }
        @keyframes shake-cross {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes scan-laser-1 {
          0%, 100% { transform: translateY(-30px); opacity: 0.15; }
          50% { transform: translateY(30px); opacity: 0.9; }
        }

        @keyframes blink-warning-1 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes time-sweep-2 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes line-flicker-comm-4 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        @keyframes sand-drip-comm-3 {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -12; }
        }

        .svg-cursor-animate {
          animation: float-cursor 4s infinite ease-in-out;
        }
        .svg-cursor-animate-slow {
          animation: float-cursor-slow 5s infinite ease-in-out;
        }
        .svg-cursor-animate-fast {
          animation: float-cursor-fast 3s infinite ease-in-out;
        }
        .svg-dot-pulse {
          animation: pulse-opacity 2s infinite ease-in-out;
        }
        .svg-bracket-pulse {
          animation: pulse-bracket 2s infinite ease-in-out;
        }
        .svg-disconnect-cross {
          transform-origin: center;
          animation: shake-cross 3s infinite ease-in-out;
        }

        /* Hover card lift and shadows */
        .feature-col-item:hover .svg-panel-container {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
          stroke: var(--primary-purple);
        }
        body.light-mode .feature-col-item:hover .svg-panel-container {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
        }

      `}</style>
    </div>
  )
}
