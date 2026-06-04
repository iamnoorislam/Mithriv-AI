'use client'

import React, { useEffect, useState } from 'react'
import '../style.css'

export default function CommunicationV2Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('problem');
  const [activeIndustry, setActiveIndustry] = useState('law');
  const [activePhase, setActivePhase] = useState('phase-1');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sections = [
      'problem',
      'architecture',
      'industries',
      'trust',
      'changes',
      'integration',
      'outcomes',
      'positioning'
    ];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const w = window as any;
    let timer: NodeJS.Timeout;
    let deferTimer: NodeJS.Timeout;
    let refreshTimers: NodeJS.Timeout[] = [];

    const initScrollStory = () => {
      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      // Kill any previous ScrollTrigger for this ID
      try {
        ScrollTrigger.getById("problem-story")?.kill(true);
      } catch (e) {
        console.error("Error killing previous story trigger:", e);
      }

      // Scroll Reveal for AI Agents 4-Column Features
      const secAiAgents = document.querySelector('.sec-ai-agents');
      if (secAiAgents) {
        const triggerAiAgents = () => {
          if (secAiAgents.classList.contains('reveal-active')) return;
          secAiAgents.classList.add('reveal-active');
          
          // Animate split grid first
          gsap.fromTo('#problem .problem-split-left, #problem .problem-split-right',
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out"
            }
          );

          // Animate feature columns
          gsap.fromTo('#problem .feature-col-item',
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
              delay: 0.4
            }
          );
        };

        // Fallback: If already in viewport on mount, trigger immediately
        const rect = secAiAgents.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          triggerAiAgents();
        }

        ScrollTrigger.create({
          id: "problem-story",
          trigger: secAiAgents,
          start: "top 75%",
          once: true,
          onEnter: triggerAiAgents
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
      if (w.runDottedSurface && w.runMain && w.gsap && w.ScrollTrigger && w.THREE) {
        deferTimer = setTimeout(() => {
          try {
            w.runDottedSurface();
          } catch (e) {
            console.error("Error in runDottedSurface:", e);
          }
          try {
            w.runMain();
          } catch (e) {
            console.error("Error in runMain:", e);
          }
          try {
            initScrollStory();
          } catch (e) {
            console.error("Error in initScrollStory:", e);
          }

          if (w.ScrollTrigger) {
            refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 100));
            refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 500));
            refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 1000));
          }
        }, 100);
      } else {
        timer = setTimeout(init, 50);
      }
    };
    init();

    return () => {
      clearTimeout(timer);
      clearTimeout(deferTimer);
      refreshTimers.forEach(t => clearTimeout(t));

      if (w.cleanupMain) {
        w.cleanupMain();
      }
      if (w.gsap && w.ScrollTrigger) {
        try {
          w.ScrollTrigger.getById("problem-story")?.kill(true);
        } catch (e) {
          console.error("Error killing problem-story:", e);
        }
        w.ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
      }
      if (w.cancelDottedSurfaceAnim) {
        w.cancelDottedSurfaceAnim();
      }
      if (w.dottedSurfaceResizeObserver) {
        w.dottedSurfaceResizeObserver.disconnect();
        w.dottedSurfaceResizeObserver = null;
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="landing-theme">
      {/* Global Background Elements */}
      <div className="global-grid-bg" id="globalGridBg"></div>
      <div className="grain-overlay"></div>

      {/* HERO SECTION */}
      <main className="hero-section" id="hero">
        {/* Three.js Dotted Surface Background */}
        <div id="dotted-surface-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '130%', zIndex: 0, pointerEvents: 'none' }}></div>
        
        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, marginTop: '-20vh' }}>
          <div className="ent-pill">COMMUNICATION INTERFACE</div>
          <h1 className="main-heading">
            Security That Speaks.<br />Operations That Listen.
          </h1>
          <p className="body-text" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every stakeholder speaks to a different system.<br /><br />Mithriv brings every conversation, decision, and action into one operational layer.
          </p>
          <a href="#" className="ent-btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>Request Communication Assessment</a>
        </div>

        {/* Bottom meta block (logos and metrics) */}
        <div className="hero-bottom-meta" style={{ position: 'absolute', bottom: '40px', left: 0, width: '100%', zIndex: 15, padding: '0 24px' }}>
          {/* Trust badge row (same style as home page logo strip, muted opacity) */}
          <div className="comm-logos" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px', margin: '0 auto 2.5rem', maxWidth: '900px', opacity: 0.6, alignItems: 'center' }}>
            {['Microsoft Teams', 'Slack', 'Motorola', 'Kenwood', 'Cisco', 'Everbridge', 'SIP/VoIP'].map((b, idx, arr) => (
              <React.Fragment key={b}>
                <span className="font-mono text-[11px]" style={{ color: '#B6B6B7' }}>
                  {b}
                </span>
                {idx < arr.length - 1 && (
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.15)', fontFamily: 'var(--font-mono), monospace' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Scale Metric Bar - Solid Card background to prevent background animation overlap */}
          <div className="comm-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0px', border: '1px solid rgba(255,255,255,0.08)', padding: '30px 0', maxWidth: '1200px', margin: '0 auto', background: '#0B0B0F', borderRadius: '4px', position: 'relative', zIndex: 15 }}>
            <div className="stat-item" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="num" style={{ fontSize: '2rem', fontFamily: "var(--font-mono), monospace", fontWeight: '700', color: '#ffffff' }}>3,000+</h3>
              <p style={{ color: '#B6B6B7', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Sites Connected</p>
            </div>
            <div className="stat-item" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="num" style={{ fontSize: '2rem', fontFamily: "var(--font-mono), monospace", fontWeight: '700', color: '#ffffff' }}>22</h3>
              <p style={{ color: '#B6B6B7', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Countries</p>
            </div>
            <div className="stat-item" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="num" style={{ fontSize: '2rem', fontFamily: "var(--font-mono), monospace", fontWeight: '700', color: '#ffffff' }}>240+</h3>
              <p style={{ color: '#B6B6B7', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Languages</p>
            </div>
            <div className="stat-item">
              <h3 className="num" style={{ fontSize: '2rem', fontFamily: "var(--font-mono), monospace", fontWeight: '700', color: '#ffffff' }}>99.99%</h3>
              <p style={{ color: '#B6B6B7', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Uptime</p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .problem-split-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          background: transparent;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 4rem;
          width: 100%;
        }

        .problem-split-left {
          grid-column: span 2;
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          opacity: 1;
        }

        .problem-split-right {
          grid-column: span 2;
          padding: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          opacity: 1;
        }

        #problem .problem-split-left,
        #problem .problem-split-right,
        #problem .feature-col-item {
          opacity: 1;
          transform: translateY(0);
        }

        #problem .features-scroll-grid {
          margin-top: 0;
          border-top: none;
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
        }

        @media (max-width: 1024px) {
          .problem-split-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            margin: 40px 0 60px 0 !important;
            border-bottom: none !important;
          }
          .problem-split-left {
            grid-column: span 1 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .problem-split-right {
            grid-column: span 1 !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }
          .problem-split-grid .feature-col-divider {
            display: none !important;
          }
          #problem .features-scroll-grid {
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            margin-top: 4rem !important;
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
          }
        }

        @media (max-width: 640px) {
          #problem {
            padding: 140px 0 !important;
          }
          #problem > div {
            padding: 0 40px !important;
          }
        }
      `}</style>

      <section 
        className="section sec-ai-agents reveal-section" 
        id="problem" 
        style={{ 
          position: 'relative', 
          background: 'transparent', 
          color: '#ffffff', 
          width: '100%',
          padding: '140px 0',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '24px' }}>
            <span className="ent-pill" style={{marginBottom: '0px'}}>The Problem</span>
          </div>
          <h2 className="std-section-h2 text-center" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', textAlign: 'center' }}>Your Security Operation Has a Communication Crisis</h2>
          <p className="std-section-subheading text-center" style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '14px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every interaction is a bottleneck. Every handoff loses context. Every stakeholder speaks to a different system, or no system at all.
          </p>

          {/* Contrast split layout with high-tech animated SVG diagram */}
          <div className="problem-split-grid">
            <div className="feature-col-divider" style={{ left: '50%' }}></div>
            <div className="problem-split-left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8B8FFF', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(139, 143, 255, 0.3)', padding: '2px 6px' }}>SEC_OP_A</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#8B8FFF', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your access control has AI.
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8B8FFF', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(139, 143, 255, 0.3)', padding: '2px 6px' }}>SEC_OP_B</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#8B8FFF', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your video has AI.
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8B8FFF', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(139, 143, 255, 0.3)', padding: '2px 6px' }}>SEC_OP_C</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#8B8FFF', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your threat detection has AI.
                  </h3>
                </div>
                
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '16px 0' }}></div>
                
                <div>
                  <p style={{ fontSize: '24px', lineHeight: '1.5', fontWeight: 400, color: '#B6B6B7', letterSpacing: '-0.01em', margin: 0 }}>
                    Yet <span style={{ color: '#8B8FFF', fontWeight: 500 }}>communication</span> still runs on radio silence, paper logs, and phones that go to voicemail.
                  </p>
                </div>
              </div>
            </div>

                                                                                                                                                                                    <div className="problem-split-right">
              <svg viewBox="0 0 400 330" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="laser-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B8FFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#c084fc" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="red-laser-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <style>{`
                  @keyframes text-blink {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                  }
                  @keyframes float-node {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                  }
                  @keyframes float-core {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                  }
                  @keyframes laser-flow-left {
                    0% { stroke-dashoffset: 200; }
                    100% { stroke-dashoffset: 0; }
                  }
                  @keyframes red-laser-flow {
                    0% { stroke-dashoffset: 150; opacity: 0.8; }
                    100% { stroke-dashoffset: 0; opacity: 0; }
                  }
                  @keyframes pulse-pulse {
                    0% { transform: scale(0.95); opacity: 0; }
                    50% { opacity: 0.35; }
                    100% { transform: scale(1.3); opacity: 0; }
                  }
                  @keyframes blink-led {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                  }
                  
                  .laser-path-left {
                    stroke-dasharray: 20, 80;
                    animation: laser-flow-left 3.5s infinite linear;
                    filter: url(#glow-purple);
                  }
                  .laser-path-center {
                    stroke-dasharray: 15, 65;
                    animation: laser-flow-left 2.5s infinite linear;
                    filter: url(#glow-purple);
                  }
                  .laser-path-right {
                    stroke-dasharray: 20, 80;
                    animation: laser-flow-left 3.5s infinite linear;
                    animation-delay: 0.6s;
                    filter: url(#glow-purple);
                  }
                  .red-laser-path-left {
                    stroke-dasharray: 15, 90;
                    animation: red-laser-flow 3.5s infinite linear;
                  }
                  .red-laser-path-center {
                    stroke-dasharray: 12, 70;
                    animation: red-laser-flow 2.6s infinite linear;
                    animation-delay: 0.8s;
                  }
                  .red-laser-path-right {
                    stroke-dasharray: 15, 90;
                    animation: red-laser-flow 3.6s infinite linear;
                    animation-delay: 1.4s;
                  }
                  .pulse-ring-err {
                    animation: pulse-pulse 3s infinite linear;
                  }
                  .blink-led {
                    animation: blink-led 1.2s infinite alternate;
                  }
                `}</style>

                {/* BACKGROUND ISOMETRIC FLOOR GRID (SUBTLE BLUEPRINT) */}
                <g opacity="0.08">
                  {/* Diagonal X-axis grid lines (down-right) */}
                  {[-4, -2, 0, 2, 4].map(i => {
                    const x1 = 185 + i * 30 * 0.866 - 150 * 0.866;
                    const y1 = 160 + i * 30 * 0.5 - 150 * 0.5;
                    const x2 = 185 + i * 30 * 0.866 + 150 * 0.866;
                    const y2 = 160 + i * 30 * 0.5 + 150 * 0.5;
                    return <line key={`x-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B8FFF" strokeWidth="0.3" strokeDasharray="1, 8" />;
                  })}
                  {/* Diagonal Y-axis grid lines (down-left) */}
                  {[-4, -2, 0, 2, 4].map(i => {
                    const x1 = 185 - 150 * 0.866 + i * 30 * 0.866;
                    const y1 = 160 + 150 * 0.5 + i * 30 * 0.5;
                    const x2 = 185 + 150 * 0.866 + i * 30 * 0.866;
                    const y2 = 160 - 150 * 0.5 + i * 30 * 0.5;
                    return <line key={`y-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B8FFF" strokeWidth="0.3" strokeDasharray="1, 8" />;
                  })}
                </g>

                {/* ACTIVE CONNECTIONS: 3D PATH RUNS (DARK BASES) */}
                <path d="M205,84 L205,100 L185,111.6 L185,145" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M270,124 L270,140 L200,180.4 L200,150" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M335,164 L335,180 L215,249.2 L215,150" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.2" strokeLinecap="round" />

                {/* ACTIVE CONNECTIONS: 3D PATH RUNS (GLOWING LASERS) */}
                <path d="M205,84 L205,100 L185,111.6 L185,145" stroke="url(#laser-grad)" strokeWidth="1.2" className="laser-path-left" strokeLinecap="round" />
                <path d="M270,124 L270,140 L200,180.4 L200,150" stroke="url(#laser-grad)" strokeWidth="1.2" className="laser-path-center" strokeLinecap="round" />
                <path d="M335,164 L335,180 L215,249.2 L215,150" stroke="url(#laser-grad)" strokeWidth="1.2" className="laser-path-right" strokeLinecap="round" />

                {/* BROKEN DISCONNECTED WIRES (DARK BASES) */}
                <path d="M185,170 L60,242 L60,225" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" />
                <path d="M185,170 L125,205 L125,255" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" />
                <path d="M185,170 L190,173 L190,285" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" />

                {/* BROKEN DISCONNECTED WIRES (DECAYING GLOWS) */}
                <path d="M185,170 L60,242 L60,225" stroke="url(#red-laser-grad)" strokeWidth="1" className="red-laser-path-left" strokeLinecap="round" />
                <path d="M185,170 L125,205 L125,255" stroke="url(#red-laser-grad)" strokeWidth="1" className="red-laser-path-center" strokeLinecap="round" />
                <path d="M185,170 L190,173 L190,285" stroke="url(#red-laser-grad)" strokeWidth="1" className="red-laser-path-right" strokeLinecap="round" />

                {/* RADIATING RED ERROR SHOCKWAVES ON GRID FLOOR */}
                <ellipse cx="8" cy="225" rx="5" ry="2.5" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="8" cy="225" rx="5" ry="2.5" stroke="#ef4444" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '8px 225px', animationDelay: '0s' }} />

                <ellipse cx="73" cy="255" rx="5" ry="2.5" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="73" cy="255" rx="5" ry="2.5" stroke="#ef4444" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '73px 255px', animationDelay: '0.5s' }} />

                <ellipse cx="138" cy="285" rx="5" ry="2.5" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="138" cy="285" rx="5" ry="2.5" stroke="#ef4444" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '138px 285px', animationDelay: '1s' }} />

                {/* ACTIVE NODES (TOP-RIGHT SLEEK & EXTRA-WIDE 3D BLOCKS, SHIFTED LEFT/UP TO AVOID CLIPPING) */}
                {/* Access AI Block */}
                <g style={{ transformOrigin: '205px 40px', animation: 'float-node 4s infinite ease-in-out', animationDelay: '0s' }}>
                  {/* Top Face */}
                  <polygon points="205,68 156.5,40 205,12 253.5,40" fill="rgba(20, 20, 28, 0.96)" stroke="rgba(139, 143, 255, 0.35)" strokeWidth="0.8" />
                  {/* Left Face */}
                  <polygon points="205,68 156.5,40 156.5,56 205,84" fill="#0F0F16" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="205,68 205,84 253.5,56 253.5,40" fill="#0A0A0F" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 205, 40)">
                    <circle cx="-20" cy="20" r="1.2" fill="#10B981" className="blink-led" />
                    <path d="M-3,-9 L3,-9 L3,-4 L-3,-4 Z M-1.5,-9 L-1.5,-11 C-1.5,-12 -0.5,-12.5 0,-12.5 C0.5,-12.5 1.5,-12 1.5,-11 L1.5,-9" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Access AI</text>
                  </g>
                </g>

                {/* Video AI Block */}
                <g style={{ transformOrigin: '270px 80px', animation: 'float-node 4s infinite ease-in-out', animationDelay: '1s' }}>
                  {/* Top Face */}
                  <polygon points="270,108 221.5,80 270,52 318.5,80" fill="rgba(20, 20, 28, 0.96)" stroke="rgba(139, 143, 255, 0.35)" strokeWidth="0.8" />
                  {/* Left Face */}
                  <polygon points="270,108 221.5,80 221.5,96 270,124" fill="#0F0F16" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="270,108 270,124 318.5,96 318.5,80" fill="#0A0A0F" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 270, 80)">
                    <circle cx="-20" cy="20" r="1.2" fill="#10B981" className="blink-led" />
                    <path d="M-4,-10 L1,-10 L1,-5 L-4,-5 Z M1,-9 L4,-11 L4,-4 L1,-6 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Video AI</text>
                  </g>
                </g>

                {/* Threat AI Block */}
                <g style={{ transformOrigin: '335px 120px', animation: 'float-node 4s infinite ease-in-out', animationDelay: '2s' }}>
                  {/* Top Face */}
                  <polygon points="335,148 286.5,120 335,92 383.5,120" fill="rgba(20, 20, 28, 0.96)" stroke="rgba(139, 143, 255, 0.35)" strokeWidth="0.8" />
                  {/* Left Face */}
                  <polygon points="335,148 286.5,120 286.5,136 335,164" fill="#0F0F16" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="335,148 335,164 383.5,136 383.5,120" fill="#0A0A0F" stroke="rgba(139, 143, 255, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 335, 120)">
                    <circle cx="-20" cy="20" r="1.2" fill="#10B981" className="blink-led" />
                    <path d="M-3,-11.5 L3,-11.5 L3,-9 C3,-6.5 0,-4 0,-4 C0,-4 -3,-6.5 -3,-9 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Threat AI</text>
                  </g>
                </g>

                {/* CENTRAL CORE: SLEEK STACKED CPU SLABS */}
                {/* Bottom Slab */}
                <polygon points="185,210 145,187 185,164 225,187" fill="rgba(18, 18, 26, 0.85)" stroke="rgba(139, 143, 255, 0.12)" strokeWidth="0.8" />
                <polygon points="185,210 145,187 145,191 185,214" fill="#0D0D12" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <polygon points="185,210 185,214 225,191 225,187" fill="#08080C" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

                {/* Middle Slab */}
                <polygon points="185,187 150,167 185,147 220,167" fill="rgba(22, 22, 32, 0.9)" stroke="rgba(139, 143, 255, 0.15)" strokeWidth="0.8" />
                <polygon points="185,187 150,167 150,171 185,191" fill="#0F0F16" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <polygon points="185,187 185,191 220,171 220,167" fill="#0A0A0F" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

                {/* Top Slab with Float Animation */}
                <g style={{ transformOrigin: '185px 150px', animation: 'float-core 4s infinite ease-in-out' }}>
                  {/* Top Face */}
                  <polygon points="185,165 155,147 185,129 215,147" fill="rgba(26, 26, 38, 0.98)" stroke="#8B8FFF" strokeWidth="1.2" style={{ filter: 'url(#glow-purple)' }} />
                  {/* Left Face */}
                  <polygon points="185,165 155,147 155,151 185,169" fill="#14141F" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="185,165 185,169 215,151 215,147" fill="#0E0E16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  
                  {/* Central Asterisk Emblem (Purple Glow) */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 185, 147)">
                    <g stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.9" filter="url(#glow-purple)">
                      <line x1="0" y1="-8" x2="0" y2="8" />
                      <line x1="-8" y1="0" x2="8" y2="0" />
                      <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" />
                      <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" />
                    </g>
                    <circle cx="0" cy="0" r="3" fill="#1A1A26" stroke="#c084fc" strokeWidth="1" />
                  </g>
                </g>

                {/* HORIZONTAL CRISIS LABEL BELOW CHIP (TRACKING) */}
                <text x="185" y="222" fontFamily="var(--font-mono), monospace" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold" style={{ letterSpacing: '3px', animation: 'text-blink 1.2s infinite' }}>COMMS_VOID_GAP</text>

                {/* STAKEHOLDERS (BOTTOM-LEFT FLAT BADGES WITH 3D GLASS EDGES) */}
                {/* GUARDS CARD */}
                {/* Bottom Edge */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 60, 228)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </g>
                {/* Top Face */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 60, 225)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" />
                  <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M-28,-3 L-23,-3 L-23,4 L-28,4 Z M-25.5,-3 L-25.5,-6 M-24.5,-1 L-24.5,1" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.8" fill="none" />
                  <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">GUARDS</text>
                  <circle cx="30" cy="0" r="1.5" fill="#ef4444" className="blink-led" />
                </g>

                {/* VISITORS CARD */}
                {/* Bottom Edge */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 125, 258)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </g>
                {/* Top Face */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 125, 255)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" />
                  <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M-28,-3 L-23,-3 L-23,4 L-28,4 Z M-26,0 L-25,0 M-26,2 L-25,2" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.8" fill="none" />
                  <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">VISITORS</text>
                  <circle cx="30" cy="0" r="1.5" fill="#ef4444" className="blink-led" style={{ animationDelay: '0.3s' }} />
                </g>

                {/* EXECUTIVES CARD */}
                {/* Bottom Edge */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 190, 288)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </g>
                {/* Top Face */}
                <g transform="matrix(0.866, 0.5, -0.866, 0.5, 190, 285)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" />
                  <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M-28,-2 L-23,-2 L-23,4 L-28,4 Z M-26.5,-2 L-26.5,-4 L-24.5,-4 L-24.5,-2" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.8" fill="none" />
                  <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">EXECS</text>
                  <circle cx="30" cy="0" r="1.5" fill="#ef4444" className="blink-led" style={{ animationDelay: '0.6s' }} />
                </g>
              </svg>
            </div>
          </div>

          <div className="features-scroll-grid">
            {/* Vertical Dividers */}
            <div className="feature-col-divider feature-col-divider-1"></div>
            <div className="feature-col-divider feature-col-divider-2"></div>
            <div className="feature-col-divider feature-col-divider-3"></div>

            {/* Feature 1 */}
            <div className="feature-col-item">
              <span className="fig-label">FIG 0.1</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes pulse-ring-comm-1 {
                      0% { transform: scale(0.75); opacity: 0; }
                      50% { opacity: 0.5; }
                      100% { transform: scale(1.3); opacity: 0; }
                    }
                    @keyframes blink-warning-comm-1 {
                      0%, 100% { opacity: 0.2; }
                      50% { opacity: 1; fill: #8B8FFF; }
                    }
                    @keyframes line-draw-comm-1 {
                      0% { stroke-dashoffset: 24; }
                      100% { stroke-dashoffset: 0; }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />
                  
                  <g transform="translate(100, 80)">
                    <ellipse cx="0" cy="0" rx="35" ry="17.5" stroke="#8B8FFF" strokeWidth="1" style={{ transformOrigin: '0 0', animation: 'pulse-ring-comm-1 2.5s infinite linear' }} />
                    <ellipse cx="0" cy="0" rx="55" ry="27.5" stroke="#8B8FFF" strokeWidth="0.5" style={{ transformOrigin: '0 0', animation: 'pulse-ring-comm-1 2.5s infinite linear', animationDelay: '1.25s' }} />

                    <polygon points="-30,10 30,10 40,25 -40,25" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    
                    <line x1="0" y1="10" x2="0" y2="-15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    
                    <polygon points="-16,-35 16,-35 16,-15 -16,-15" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    
                    <text x="0" y="-21" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#8B8FFF" textAnchor="middle" style={{ animation: 'blink-warning-comm-1 1.5s infinite' }}>[WAIT 20m]</text>

                    <line x1="-35" y1="0" x2="35" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3,3" style={{ animation: 'line-draw-comm-1 2s linear infinite' }} />
                  </g>
                </svg>
              </div>
              <h3>Fragmented Visitor Flow</h3>
              <p className="card-desc">A delivery driver arrives at a facility. The kiosk has no path forward. Twenty minutes later, a guard manually overrides the process. No audit trail. No context. No continuity.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-col-item">
              <span className="fig-label">FIG 0.2</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes wave-dissolve-comm-2 {
                      0% { transform: scale(0.5); opacity: 1; }
                      100% { transform: scale(1.5); opacity: 0; }
                    }
                    @keyframes tower-signal-comm-2 {
                      0%, 100% { opacity: 0.3; }
                      50% { opacity: 1; }
                    }
                    @keyframes static-noise-comm-2 {
                      0%, 100% { stroke-dashoffset: 0; }
                      50% { stroke-dashoffset: 10; }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <ellipse cx="0" cy="-20" rx="20" ry="10" stroke="rgba(139, 143, 255, 0.4)" strokeWidth="1" style={{ transformOrigin: '0 -20px', animation: 'wave-dissolve-comm-2 3s infinite linear' }} />
                    <ellipse cx="0" cy="-20" rx="40" ry="20" stroke="rgba(139, 143, 255, 0.2)" strokeWidth="0.5" style={{ transformOrigin: '0 -20px', animation: 'wave-dissolve-comm-2 3s infinite linear', animationDelay: '1.5s' }} />

                    <polygon points="-8,25 8,25 2,-20 -2,-20" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <line x1="-5" y1="10" x2="5" y2="10" stroke="rgba(255,255,255,0.2)" />
                    <line x1="-3" y1="-5" x2="3" y2="-5" stroke="rgba(255,255,255,0.2)" />
                    
                    <circle cx="0" cy="-22" r="3" fill="#8B8FFF" style={{ animation: 'tower-signal-comm-2 1s infinite alternate' }} />
                    
                    <path d="M-40,25 L-20,15 L0,20 L20,15 L40,25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2" style={{ animation: 'static-noise-comm-2 0.5s infinite linear' }} />
                  </g>
                </svg>
              </div>
              <h3>Muted Field Operations</h3>
              <p className="card-desc">A guard radios dispatch during an incident. No answer. The incident is reconstructed from memory at the end of the shift, introducing critical gaps in reporting.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-col-item">
              <span className="fig-label">FIG 0.3</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes sand-drip-comm-3 {
                      0% { stroke-dashoffset: 0; }
                      100% { stroke-dashoffset: -12; }
                    }
                    @keyframes badge-glow-comm-3 {
                      0%, 100% { opacity: 0.4; }
                      50% { opacity: 1; filter: drop-shadow(0 0 4px #8B8FFF); }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <polygon points="0,-40 24,-30 0,-18 -24,-30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                    <polygon points="0,40 24,30 0,18 -24,30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                    
                    <line x1="-24" y1="-30" x2="-24" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="24" y1="-30" x2="24" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="2,2" />

                    <path d="M-20,-28 C-20,-12 -5,-4 -5,0 C-5,4 -20,12 -20,28 L20,28 C20,12 5,4 5,0 C5,-4 20,-12 20,-28 Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

                    <line x1="0" y1="-4" x2="0" y2="20" stroke="#8B8FFF" strokeWidth="1" strokeDasharray="2,4" style={{ strokeDashoffset: 0, animation: 'sand-drip-comm-3 1s linear infinite' }} />
                    <circle cx="0" cy="0" r="1" fill="#ffffff" />

                    <polygon points="0,26 12,20 0,14 -12,20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="rgba(255,255,255,0.08)" />
                    <polygon points="0,26 8,22 0,18 -8,22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="rgba(255,255,255,0.15)" />

                    <g transform="translate(32, -8)">
                      <rect x="-3" y="-12" width="38" height="15" rx="0" fill="rgba(0,0,0,0.4)" stroke="rgba(139, 143, 255, 0.3)" strokeWidth="1" style={{ animation: 'badge-glow-comm-3 2s infinite alternate' }} />
                      <text x="16" y="-2" fontFamily="monospace" fontSize="8" fill="#8B8FFF" textAnchor="middle" fontWeight="bold">96h</text>
                    </g>
                  </g>
                </svg>
              </div>
              <h3>Access Request Bottlenecks</h3>
              <p className="card-desc">An engineer requests weekend access for a critical project. The request moves through inboxes and manual approvals. Four days later, access is granted. The deadline has already passed.</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-col-item">
              <span className="fig-label">FIG 0.4</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes nodeglow-comm-4 {
                      0%, 100% { opacity: 0.15; }
                      50% { opacity: 0.6; stroke: #8B8FFF; }
                    }
                    @keyframes line-flicker-comm-4 {
                      0%, 100% { opacity: 0.05; }
                      50% { opacity: 0.4; }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <g style={{ animation: 'nodeglow-comm-4 3s infinite alternate' }}>
                      <rect x="-40" y="-35" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="-28" y="-25" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">TEAM</text>

                      <rect x="16" y="-35" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="28" y="-25" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">SMS</text>

                      <rect x="-55" y="-5" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="-43" y="5" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">RAD</text>

                      <rect x="31" y="-5" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="43" y="5" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">VMS</text>

                      <rect x="-40" y="25" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="-28" y="35" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">MAIL</text>

                      <rect x="16" y="25" width="24" height="14" rx="0" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <text x="28" y="35" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">LOGS</text>
                    </g>

                    <g style={{ animation: 'line-flicker-comm-4 2s infinite' }}>
                      <line x1="-16" y1="-28" x2="16" y2="-28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-31" y1="2" x2="31" y2="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-16" y1="32" x2="16" y2="32" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-28" y1="-21" x2="-43" y2="-5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="28" y1="-21" x2="43" y2="-5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
                    </g>

                    <g transform="translate(0, 0)">
                      <circle cx="0" cy="0" r="10" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                      <line x1="4" y1="-4" x2="-4" y2="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                    </g>
                  </g>
                </svg>
              </div>
              <h3>Information & Data Silos</h3>
              <p className="card-desc">The CSO needs incident trends across multiple sites. Analysts spend weeks pulling reports from disconnected systems before a single decision can be made.</p>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="metrics-row-wrap" style={{
            width: '100%',
            marginTop: '60px'
          }}>
            <div className="metrics-horizontal-row-4col">
              {[
                { num: '74%', desc: 'of security breaches trace to inadequate visitor screening' },
                { num: '62%', desc: 'of security alerts ignored due to communication overload' },
                { num: '23%', desc: 'of incident escalations caused by communication failures' },
                { num: '8–12', desc: 'average disconnected communication channels per enterprise' }
              ].map((metric, idx) => (
                <div key={idx} className="metric-col" style={{ opacity: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: '1.1',
                    marginBottom: '16px',
                    letterSpacing: '-0.03em'
                  }}>
                    {metric.num}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: '#B6B6B7',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                  }}>
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div id="content-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        {/* MAIN LAYOUT WRAPPER (Below Hero & Problem Sections) */}
        <div className="article-layout-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 2rem 0',
          position: 'relative'
        }}>

            <div className="ent-section-divider"></div>

            {/* SECTION 3: The Architecture */}
            <section className="section reveal-section" id="architecture" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>The Architecture</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>One Conversational Layer. Every Channel. Complete Context.</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  The Communication Interface sits between your stakeholders and your security operation. It understands who's asking, what they need, and what they're authorized to receive.
                </p>

                {/* Visual Stack Layout representing Layers 1-8 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4rem 0', width: '100%' }}>
                  {[
                    { layer: 'LAYER_8', title: 'Audit Layer', desc: 'Decision Trace · Action Record · Immutable Logs', active: false },
                    { layer: 'LAYER_7', title: 'Integration Fabric', desc: 'System Commands · State Updates · Event Correlation', active: false },
                    { layer: 'LAYER_6', title: 'Action Authorization', desc: 'Policy Evaluation · Approval Routing · Boundary Enforcement', active: false },
                    { layer: 'LAYER_5', title: 'Domain Agents', desc: 'Visitor · Guard · Employee · Contractor · Emergency · Query', active: true },
                    { layer: 'LAYER_4', title: 'Intent Classification', desc: 'Domain Routing · Entity Extraction · Context Enrichment', active: false },
                    { layer: 'LAYER_3', title: 'Identity Resolution', desc: 'Credential Lookup · Role Determination · Authorization Scope', active: false },
                    { layer: 'LAYER_2', title: 'Channel Normalization', desc: 'Voice → Text · Protocol Translation · Session Binding', active: false },
                    { layer: 'LAYER_1', title: 'Stakeholder Channels', desc: 'Kiosk · Mobile · Teams · Slack · Radio · Voice · SMS · Signage', active: false }
                  ].map((item, idx) => (
                    <React.Fragment key={item.layer}>
                      {idx > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '24px', justifyContent: 'center' }}>
                          <div style={{ width: '1px', height: '100%', background: 'rgba(255, 255, 255, 0.15)' }}></div>
                        </div>
                      )}
                      <div style={{
                        width: '100%',
                        maxWidth: '800px',
                        background: item.active ? 'rgba(139, 92, 246, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                        border: item.active ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '0px',
                        padding: '20px 24px',
                        textAlign: 'left',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <span style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              color: item.active ? '#8B5CF6' : '#B6B6B7',
                              letterSpacing: '1px',
                              display: 'block',
                              marginBottom: '4px'
                            }}>
                              [ {item.layer} ] {item.active ? 'ACTIVE' : ''}
                            </span>
                            <h4 style={{
                              fontSize: '16px',
                              fontWeight: 600,
                              color: '#ffffff',
                              margin: 0,
                              fontFamily: 'var(--font-main)'
                            }}>
                              {item.title}
                            </h4>
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '12px',
                            color: '#B6B6B7'
                          }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* 4 Cards Grid - Flat layout, zero radius */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  margin: '4rem 0 0',
                  textAlign: 'left'
                }} className="stats-grid-figma">
                  {[
                    {
                      title: 'Identity-Aware Conversation',
                      text: 'Every interaction begins with identity resolution. The system knows if it\'s speaking with a pre-registered visitor, a badged employee, an authorized contractor, or an executive with query privileges. Responses calibrate accordingly.'
                    },
                    {
                      title: 'Context Persistence',
                      text: 'Conversations maintain state across channels and sessions. A visitor who pre-registered via email and arrives at the kiosk isn\'t starting over. A guard who reported an incident via radio can add details via mobile app.'
                    },
                    {
                      title: 'Action Authorization',
                      text: 'The Communication Interface both informs and acts. But every action respects configured boundaries. Visitor badge issuance: automatic. Data center access grant: requires approval. Emergency lockdown: executes immediately.'
                    },
                    {
                      title: 'Audit Completeness',
                      text: 'Every conversation captured. Every decision logged with reasoning. Every escalation documented. Export ready for compliance, legal, and insurance.'
                    }
                  ].map((card) => (
                    <div key={card.title} style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '28px',
                      background: 'rgba(255, 255, 255, 0.01)'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '12px',
                        fontFamily: 'var(--font-main)'
                      }}>
                        {card.title}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: '#B6B6B7',
                        margin: 0,
                        fontFamily: 'var(--font-main)'
                      }}>
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 4: Industry Applications */}
            <section className="section reveal-section" id="industries" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Industry Applications</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>Designed for Environments Where Failure Isn't an Option</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  Generic communication tools don't understand matter confidentiality, HIPAA constraints, NERC CIP requirements, or TWIC verification. These agents do.
                </p>

                {/* Interactive Console Interface */}
                <div className="vertical-tabs" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  margin: '2rem 0'
                }}>
                  {/* Triggers Column/Row */}
                  <div className="tab-buttons" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    borderBottom: 'none',
                    paddingBottom: 0
                  }}>
                    {[
                      { id: 'law', label: '01 // Law Firms' },
                      { id: 'health', label: '02 // Healthcare' },
                      { id: 'critical', label: '03 // Critical Infrastructure' },
                      { id: 'ports', label: '04 // Ports & Airports' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setActiveIndustry(btn.id)}
                        className={`tab-btn ${activeIndustry === btn.id ? 'active' : ''}`}
                        style={{
                          borderRadius: '0px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          background: activeIndustry === btn.id ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                          color: activeIndustry === btn.id ? '#ffffff' : '#B6B6B7',
                          padding: '14px 24px',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '12px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          borderLeft: activeIndustry === btn.id ? '3px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Content Display Area */}
                  <div style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '0px',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.01)',
                    textAlign: 'left'
                  }}>
                    {activeIndustry === 'law' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.02)',
                          border: '1px solid rgba(239, 68, 68, 0.12)',
                          borderLeft: '3px solid #EF4444',
                          padding: '24px',
                          borderRadius: '0px'
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#EF4444', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                            [ SECURITY MANDATE // THE CONFIDENTIALITY IMPERATIVE ]
                          </span>
                          <p style={{ color: '#B6B6B7', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            When a client speaks their name in your lobby, attorney-client privilege is already at risk. Paper visitor logs expose who has visited. Verbal check-in broadcasts client identity to anyone within earshot.
                          </p>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '20px'
                        }} className="stats-grid-figma">
                          {[
                            { title: 'Silent Check-In', text: 'Visitors interact via personal mobile device or private kiosk screen. No verbal announcement. Client identity transmitted directly to host.' },
                            { title: 'Matter-Based Routing', text: 'Visitor registration links to specific matters. The system routes to appropriate personnel based on matter assignment, not just host contact.' },
                            { title: 'Conflict Awareness', text: 'When opposing counsel from an active case attempts check-in, the system routes to appropriate personnel before interaction occurs.' },
                            { title: 'Discreet VIP Handling', text: 'High-profile clients flagged for specialized protocols. Private entrance coordination. Zero lobby exposure.' }
                          ].map((item) => (
                            <div key={item.title} style={{
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '20px',
                              borderRadius: '0px',
                              background: 'rgba(255, 255, 255, 0.01)'
                            }}>
                              <h4 style={{ color: '#10B981', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-main)' }}>
                                <span style={{ fontFamily: 'var(--font-mono), monospace' }}>[✓]</span> {item.title}
                              </h4>
                              <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{item.text}</p>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          border: '1px solid #10B981',
                          background: 'rgba(16, 185, 129, 0.02)',
                          padding: '20px',
                          borderRadius: '0px',
                          color: '#10B981',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '12px',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          [ OUTCOME ]: Client confidentiality protected from first contact. Complete audit trail for ethics compliance.
                        </div>
                      </div>
                    )}

                    {activeIndustry === 'health' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.02)',
                          border: '1px solid rgba(239, 68, 68, 0.12)',
                          borderLeft: '3px solid #EF4444',
                          padding: '24px',
                          borderRadius: '0px'
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#EF4444', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                            [ SECURITY MANDATE // THE DUAL MANDATE ]
                          </span>
                          <p style={{ color: '#B6B6B7', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            Patient privacy under HIPAA. Staff safety in an environment where 75% of workplace assaults occur. Communication systems must serve both without compromise.
                          </p>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '20px'
                        }} className="stats-grid-figma">
                          {[
                            { title: 'Privacy-Preserving Visitor Interaction', text: 'Patient directory opt-in status checked before information shared. Visitor identity verified against approved lists.' },
                            { title: 'Unit-Specific Protocols', text: 'ICU, psychiatric, pediatric units have distinct policies. Agent enforces visiting hours, limits, and screening automatically.' },
                            { title: 'Plain-Language Emergency', text: 'No color codes. Clear, actionable instructions in plain language across all channels simultaneously.' },
                            { title: 'Duress Response', text: 'Staff duress codes recognized instantly. Silent alert to security with precise location coordinated without alerting threat.' }
                          ].map((item) => (
                            <div key={item.title} style={{
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '20px',
                              borderRadius: '0px',
                              background: 'rgba(255, 255, 255, 0.01)'
                            }}>
                              <h4 style={{ color: '#10B981', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-main)' }}>
                                <span style={{ fontFamily: 'var(--font-mono), monospace' }}>[✓]</span> {item.title}
                              </h4>
                              <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{item.text}</p>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          border: '1px solid #10B981',
                          background: 'rgba(16, 185, 129, 0.02)',
                          padding: '20px',
                          borderRadius: '0px',
                          color: '#10B981',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '12px',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          [ OUTCOME ]: HIPAA compliance maintained in every interaction. Staff safety enhanced through instant communication.
                        </div>
                      </div>
                    )}

                    {activeIndustry === 'critical' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.02)',
                          border: '1px solid rgba(239, 68, 68, 0.12)',
                          borderLeft: '3px solid #EF4444',
                          padding: '24px',
                          borderRadius: '0px'
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#EF4444', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                            [ SECURITY MANDATE // THE COMPLIANCE BURDEN ]
                          </span>
                          <p style={{ color: '#B6B6B7', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            NERC CIP mandates specific communication protocols with 15-minute alert requirements and 90-day log retention. Manual processes can\'t meet these standards consistently.
                          </p>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '20px'
                        }} className="stats-grid-figma">
                          {[
                            { title: 'Escort Coordination', text: 'CIP-006 6 R2.1 requires continuous escorted access. The agent coordinates assignment, tracks handoffs, and documents custody.' },
                            { title: 'Zone-Aware Communication', text: 'Different security zones have different rules. The agent knows which channels work in which zones and routes accordingly.' },
                            { title: '15-Minute Alert Compliance', text: 'Unauthorized access triggers immediate notification. Timestamped delivery confirmation. Automatic escalation if unacknowledged.' },
                            { title: 'Contractor Safety Verification', text: 'Personnel Risk Assessment status verified before access. Safety briefing delivery confirmed and documented.' }
                          ].map((item) => (
                            <div key={item.title} style={{
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '20px',
                              borderRadius: '0px',
                              background: 'rgba(255, 255, 255, 0.01)'
                            }}>
                              <h4 style={{ color: '#10B981', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-main)' }}>
                                <span style={{ fontFamily: 'var(--font-mono), monospace' }}>[✓]</span> {item.title}
                              </h4>
                              <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{item.text}</p>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          border: '1px solid #10B981',
                          background: 'rgba(16, 185, 129, 0.02)',
                          padding: '20px',
                          borderRadius: '0px',
                          color: '#10B981',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '12px',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          [ OUTCOME ]: Compliance documentation generated automatically. Audit preparation reduced from months to hours.
                        </div>
                      </div>
                    )}

                    {activeIndustry === 'ports' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.02)',
                          border: '1px solid rgba(239, 68, 68, 0.12)',
                          borderLeft: '3px solid #EF4444',
                          padding: '24px',
                          borderRadius: '0px'
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#EF4444', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                            [ SECURITY MANDATE // THE COORDINATION COMPLEXITY ]
                          </span>
                          <p style={{ color: '#B6B6B7', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            TSA, CBP, Coast Guard, local law enforcement, port authority—each with separate systems. International travelers with language barriers. Time-critical operations.
                          </p>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '20px'
                        }} className="stats-grid-figma">
                          {[
                            { title: 'Multilingual Visitor Interaction', text: '240+ languages supported. Automatic language detection. Consistent security protocols delivered in preferred language.' },
                            { title: 'TWIC Integration', text: 'Transportation Worker Identification Credential status verified in real time. Canceled Card List checked automatically.' },
                            { title: 'Multi-Agency Coordination', text: 'Unified communication layer bridges agency-specific systems. Incident info shared across jurisdictions without manual relay.' },
                            { title: 'Time-Critical Gate Communication', text: 'Gate status changes broadcast immediately to affected workers and vehicles. Automated queue management communication.' }
                          ].map((item) => (
                            <div key={item.title} style={{
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '20px',
                              borderRadius: '0px',
                              background: 'rgba(255, 255, 255, 0.01)'
                            }}>
                              <h4 style={{ color: '#10B981', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-main)' }}>
                                <span style={{ fontFamily: 'var(--font-mono), monospace' }}>[✓]</span> {item.title}
                              </h4>
                              <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{item.text}</p>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          border: '1px solid #10B981',
                          background: 'rgba(16, 185, 129, 0.02)',
                          padding: '20px',
                          borderRadius: '0px',
                          color: '#10B981',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '12px',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          [ OUTCOME ]: Language barriers eliminated. Credential verification instantaneous. Multi-agency coordination simplified.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 5: Trust Architecture */}
            <section className="section reveal-section" id="trust" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Trust Architecture</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>Enterprise-Grade Conversation. Complete Control.</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  Security communication handles sensitive information, authorizes physical access, and coordinates emergency response. The architecture must be trustworthy at every layer.
                </p>

                {/* 3-Column Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '3rem',
                  textAlign: 'left'
                }} className="stats-grid-figma">
                  {[
                    { title: 'Identity Verification', text: 'Multiple authentication factors available per interaction type. Integration with enterprise identity providers. Continuous session verification.' },
                    { title: 'Role-Based Response', text: 'What the system shares depends on who\'s asking. Same question, authorized answers based on privilege level.' },
                    { title: 'Action Boundaries', text: 'Every action type has configurable authorization requirements. Badge issuance: automatic. Lockdown: requires authenticated security personnel.' },
                    { title: 'Conversation Encryption', text: 'End-to-end encryption for all interactions. Data encrypted at rest and in transit. Customer managed key options.' },
                    { title: 'Audit Immutability', text: 'Every conversation, every decision, every action logged to immutable storage. Tampering detection. Export in standard formats.' },
                    { title: 'Data Residency', text: 'Regional deployment options for data sovereignty. US, EU, Middle East, and APAC regions available. Air-gapped deployments supported.' }
                  ].map((card) => (
                    <div key={card.title} style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      transition: 'border-color 0.3s ease'
                    }}>
                      <h4 style={{ color: '#8B5CF6', fontSize: '15px', fontWeight: 600, margin: '0 0 12px 0', fontFamily: 'var(--font-main)' }}>{card.title}</h4>
                      <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{card.text}</p>
                    </div>
                  ))}
                </div>

                {/* Compliance Badges Row (Styled as [] brackets) */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px 16px',
                  margin: '3rem auto 0',
                  maxWidth: '950px'
                }}>
                  {[
                    'EU data protection requirements',
                    'Annual audit, report available under NDA',
                    'Certified information security management',
                    'No prohibited components',
                    'BAA available for healthcare deployments'
                  ].map((b) => (
                    <span key={b} className="font-mono text-[11px]" style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '6px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      color: '#B6B6B7',
                      borderRadius: '0px'
                    }}>
                      [{b}]
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 6: What Changes */}
            <section className="section reveal-section" id="changes" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>What Changes</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>When Security Can Communicate</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  The gap between your security systems and your stakeholders closes. Every interaction becomes an opportunity for security intelligence.
                </p>

                {/* 3-Column Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  textAlign: 'left'
                }} className="stats-grid-figma">
                  {[
                    { title: 'Identity-Aware Conversation', text: 'Check-in takes 90 seconds. First impression: this organization has its act together.' },
                    { title: 'Guards Stay in the Field', text: 'Documentation happens during incidents, not after. Dispatch confirmed without returning to operations center.' },
                    { title: 'Employees Stop Calling Help Desk', text: 'Credential requests answered immediately. Security becomes helpful, not obstructive.' },
                    { title: 'Contractors Know Where They Stand', text: 'Escort coordination automatic. Safety requirements clear. No surprises at the gate.' },
                    { title: 'Executives Get Answers', text: 'Security posture on demand. Board questions answered with data, not estimates.' },
                    { title: 'Compliance Generates Itself', text: 'Every interaction documented. Audit preparation becomes query and export, not months of reconstruction.' }
                  ].map((card) => (
                    <div key={card.title} style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '28px',
                      background: 'rgba(255, 255, 255, 0.01)'
                    }}>
                      <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '12px', fontFamily: 'var(--font-main)' }}>{card.title}</h4>
                      <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{card.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 7: Integration */}
            <section className="section reveal-section" id="integration" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Integration</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>Works With Everything You Have</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  The Communication Interface connects to your existing security systems through the Integration Fabric. No rip and replace. No data silos.
                </p>

                {/* 3 Columns Side-by-Side */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  textAlign: 'left'
                }} className="stats-grid-figma">
                  {[
                    {
                      category: 'COMMS',
                      items: [
                        'Microsoft Teams & Slack',
                        'Cisco Webex',
                        'Mass notification (Everbridge, AlertMedia)',
                        'Two-way radios (Motorola, Kenwood)',
                        'SMS gateways & VoIP / SIP'
                      ]
                    },
                    {
                      category: 'SYSTEMS',
                      items: [
                        'Identity providers',
                        'Video management',
                        'Visitor management',
                        'Parking systems',
                        'Building management'
                      ]
                    },
                    {
                      category: 'HARDWARE',
                      items: [
                        'Lobby kiosks',
                        'Intercom stations',
                        'Digital signage',
                        'Mobile devices & Wearables',
                        'Two-way radios'
                      ]
                    }
                  ].map((col) => (
                    <div key={col.category} style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '32px',
                      background: 'rgba(255, 255, 255, 0.01)'
                    }}>
                      <h4 style={{
                        color: '#8B5CF6',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono), monospace',
                        fontWeight: 'bold',
                        letterSpacing: '1.5px',
                        marginBottom: '24px',
                        display: 'block'
                      }}>
                        [ {col.category} ]
                      </h4>
                      <ul style={{
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        {col.items.map((item) => (
                          <li key={item} style={{
                            fontFamily: 'var(--font-main)',
                            fontSize: '13px',
                            color: '#B6B6B7',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}>
                            <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 8: Target Outcomes */}
            <section className="section reveal-section" id="outcomes" style={{ padding: '80px 0', background: 'transparent' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Target Outcomes</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>What Communication Intelligence Delivers</h2>

                <div className="mithriv-table-container" style={{
                  width: '100%',
                  overflowX: 'auto',
                  marginTop: '2rem',
                  borderRadius: '0px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'transparent'
                }}>
                  <table className="mithriv-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <th style={{ padding: '20px', fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255, 255, 255, 0.01)' }}>Metric</th>
                        <th style={{ padding: '20px', fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255, 255, 255, 0.01)' }}>Target Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Visitor check-in time', val: 'Minutes → 90 seconds' },
                        { name: 'Guard documentation compliance', val: '60% → 90%+' },
                        { name: 'Employee security request resolution', val: 'Days → Minutes' },
                        { name: 'Escort coordination time', val: '10+ minutes → Under 3 minutes' },
                        { name: 'Emergency muster accountability', val: 'Hours → Minutes' },
                        { name: 'Compliance audit preparation', val: 'Weeks → Days' },
                        { name: 'Help desk security ticket volume', val: '40–60% reduction' }
                      ].map((row, idx) => (
                        <tr key={row.name} style={{ borderBottom: idx === 6 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '20px', fontSize: '13px', color: '#ffffff', fontFamily: 'var(--font-main)' }}>{row.name}</td>
                          <td className="neon-cell" style={{ padding: '20px', fontSize: '13px', color: '#10B981', fontFamily: 'var(--font-mono), monospace', fontWeight: 'bold' }}>{row.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* SECTION 9 & 10: Honest Positioning & Deployment */}
            <section className="section reveal-section" id="positioning" style={{ padding: '80px 0 0', background: 'transparent' }}>
              <div>
                {/* 9. Deployment */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Deployment</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>From Assessment to Production</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  Implementation follows a structured path designed for enterprise security operations.
                </p>

                {/* Deployment Console (Tabs + Content) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  marginBottom: '4rem'
                }}>
                  {/* Phase Buttons */}
                  <div className="tab-buttons" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    borderBottom: 'none'
                  }}>
                    {[
                      { id: 'phase-1', label: 'Phase 1: Assessment (2-3 weeks)' },
                      { id: 'phase-2', label: 'Phase 2: Config (3-4 weeks)' },
                      { id: 'phase-3', label: 'Phase 3: Pilot (4-6 weeks)' },
                      { id: 'phase-4', label: 'Phase 4: Production (Ongoing)' }
                    ].map((phase) => (
                      <button
                        key={phase.id}
                        onClick={() => setActivePhase(phase.id)}
                        className={`tab-btn ${activePhase === phase.id ? 'active' : ''}`}
                        style={{
                          borderRadius: '0px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          background: activePhase === phase.id ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                          color: activePhase === phase.id ? '#ffffff' : '#B6B6B7',
                          padding: '12px 20px',
                          fontFamily: 'var(--font-main)',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {phase.label}
                      </button>
                    ))}
                  </div>

                  {/* Phase Details Area */}
                  <div style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '0px',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.01)',
                    textAlign: 'left'
                  }}>
                    {activePhase === 'phase-1' && (
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                          Assessment <span style={{ color: '#B6B6B7', fontSize: '14px', fontWeight: 'normal', fontFamily: 'var(--font-mono)' }}>(2-3 weeks)</span>
                        </h3>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {[
                            'Document current communication flows and pain points',
                            'Map stakeholder types and interaction patterns',
                            'Identify integration requirements',
                            'Define authorization policies and escalation paths',
                            'Establish success metrics'
                          ].map((item) => (
                            <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>[✓]</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activePhase === 'phase-2' && (
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                          Configuration <span style={{ color: '#B6B6B7', fontSize: '14px', fontWeight: 'normal', fontFamily: 'var(--font-mono)' }}>(3-4 weeks)</span>
                        </h3>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {[
                            'Deploy Integration Fabric connections',
                            'Configure agent scopes and authorization rules',
                            'Develop site-specific conversation content (safety briefings, wayfinding)',
                            'Integrate identity systems and configure channels'
                          ].map((item) => (
                            <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>[✓]</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activePhase === 'phase-3' && (
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                          Pilot <span style={{ color: '#B6B6B7', fontSize: '14px', fontWeight: 'normal', fontFamily: 'var(--font-mono)' }}>(4-6 weeks)</span>
                        </h3>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {[
                            'Deploy to single site or controlled stakeholder group',
                            'Parallel operation with existing processes',
                            'Collect conversation logs and failure cases',
                            'Refine based on real usage and train staff'
                          ].map((item) => (
                            <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>[✓]</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activePhase === 'phase-4' && (
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                          Production <span style={{ color: '#B6B6B7', fontSize: '14px', fontWeight: 'normal', fontFamily: 'var(--font-mono)' }}>(Ongoing)</span>
                        </h3>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {[
                            'Expand to additional sites / stakeholder groups',
                            'Continuous monitoring and refinement',
                            'Regular authorization policy review',
                            'Performance optimization'
                          ].map((item) => (
                            <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>[✓]</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deployment Model Table */}
                <div className="mithriv-table-container" style={{
                  width: '100%',
                  overflowX: 'auto',
                  borderRadius: '0px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'transparent',
                  marginBottom: '6rem'
                }}>
                  <table className="mithriv-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <th style={{ padding: '20px', fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255, 255, 255, 0.01)' }}>Model</th>
                        <th style={{ padding: '20px', fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255, 255, 255, 0.01)' }}>Description</th>
                        <th style={{ padding: '20px', fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255, 255, 255, 0.01)' }}>Typical Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: 'Cloud', desc: 'Fully managed, regional data residency options', case: 'Most enterprise deployments' },
                        { model: 'Hybrid', desc: 'Data plane on premises, control plane cloud', case: 'Regulated industries, data sensitivity' },
                        { model: 'Air-gapped', desc: 'Complete on premises, offline updates', case: 'Government, classified environments' }
                      ].map((row, idx) => (
                        <tr key={row.model} style={{ borderBottom: idx === 2 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td className="neon-cell" style={{ padding: '20px', fontSize: '13px', color: '#ffffff', fontFamily: 'var(--font-mono), monospace', fontWeight: 'bold' }}>{row.model}</td>
                          <td style={{ padding: '20px', fontSize: '13px', color: '#B6B6B7', fontFamily: 'var(--font-main)' }}>{row.desc}</td>
                          <td style={{ padding: '20px', fontSize: '13px', color: '#B6B6B7', fontFamily: 'var(--font-main)' }}>{row.case}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 10. Honest Positioning */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px'}}>Honest Positioning</span>
                </div>
                <h2 className="std-section-h2" style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left' }}>What the Communication Interface Is and Isn't</h2>
                <p className="std-section-subheading" style={{ maxWidth: '850px', margin: '0 0 4rem', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left' }}>
                  We believe in clear expectations. Here's where the Communication Interface excels and where other approaches may be more appropriate.
                </p>

                {/* Excels vs Better Fit Split */}
                <div style={{
                  display: 'flex',
                  gap: '40px',
                  flexWrap: 'wrap',
                  marginBottom: '4rem',
                  textAlign: 'left'
                }}>
                  {/* Where it Excels */}
                  <div style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '40px',
                    border: '1px solid #8B5CF6',
                    background: 'rgba(139, 92, 246, 0.02)',
                    borderRadius: '0px'
                  }}>
                    <h3 style={{ fontSize: '20px', color: '#ffffff', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-main)' }}>Where it Excels</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        'High-volume visitor environments (100+ daily visitors)',
                        'Multi-site operations requiring consistent communication',
                        'Regulated industries with audit requirements',
                        'Organizations with guard forces requiring coordination',
                        'Enterprises with significant contractor populations',
                        'Facilities where communication failures have compliance or safety consequences'
                      ].map((item) => (
                        <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#8B5CF6' }}>[✓]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Where Other Approaches Fit Better */}
                  <div style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.01)',
                    borderRadius: '0px',
                    opacity: 0.85
                  }}>
                    <h3 style={{ fontSize: '20px', color: '#ffffff', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-main)' }}>Where Other Approaches May Fit Better</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        'Single-site operations with minimal visitor traffic',
                        'Organizations without existing security systems to integrate',
                        'Environments where all communication can remain purely human-mediated',
                        'Facilities without connectivity infrastructure'
                      ].map((item) => (
                        <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#B6B6B7', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#B6B6B7' }}>[o]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Honest Tradeoff blockquote */}
                <div style={{
                  borderLeft: '4px solid #F43F5E',
                  padding: '24px 32px',
                  margin: '0 auto 6rem',
                  maxWidth: '850px',
                  background: 'rgba(244, 63, 94, 0.01)',
                  borderRadius: '0px',
                  textAlign: 'left'
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginTop: 0,
                    marginBottom: '10px'
                  }}>
                    The Honest Tradeoff
                  </h4>
                  <p style={{
                    fontStyle: 'italic',
                    color: '#B6B6B7',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    Conversational AI handles routine interactions exceptionally well. It frees security professionals to focus on judgment-intensive work. But it doesn't replace the security professional—it amplifies them. Organizations seeking to eliminate security staff will be disappointed. Organizations seeking to make their security staff more effective will see significant returns.
                  </p>
                </div>

                {/* CTA BOX */}
                <div style={{
                  padding: '80px 20px',
                  background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 80%)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0px',
                  marginBottom: '6rem',
                  textAlign: 'center'
                }}>
                  <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#ffffff', marginBottom: '20px', letterSpacing: '-0.02em', fontFamily: 'var(--font-main)' }}>
                    The Layer Your Security Stack Is Missing
                  </h2>
                  <p style={{ maxWidth: '800px', margin: '0 auto 36px', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
                    Your video management has AI. Your access control has AI. Your threat detection has AI. Your communication—the thread that connects every stakeholder to your security operation—has been running on manual processes and fragmented channels.
                  </p>
                  <button className="ent-btn-primary" style={{ borderRadius: '0px', padding: '14px 28px', fontSize: '14px' }}>
                    Request Communication Assessment
                  </button>
                </div>

                {/* Related Resources */}
                <div style={{ textAlign: 'left', marginBottom: '80px' }}>
                  <span className="ent-pill" style={{marginLeft: '0px', marginBottom: '20px'}}>Related Resources</span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '30px',
                    marginTop: '20px'
                  }} className="stats-grid-figma">
                    <a href="/communication-interface" style={{
                      textDecoration: 'none',
                      display: 'block',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    >
                      <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '10px', fontFamily: 'var(--font-main)' }}>Communication Interface</h3>
                      <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>Conversational agents for visitors, employees, and security teams. See how unified communication completes the operational picture.</p>
                    </a>
                    <a href="/intelligence-engine" style={{
                      textDecoration: 'none',
                      display: 'block',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    >
                      <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '10px', fontFamily: 'var(--font-main)' }}>Intelligence Engine</h3>
                      <p style={{ color: '#B6B6B7', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>From connected data to autonomous action. How Mithriv's AI layer transforms integration into intelligence.</p>
                    </a>
                  </div>
                </div>

              </div>
            </section>

            <div className="ent-section-divider"></div>

            {/* Global Threat Ticker */}
            <div className="global-ticker" style={{ position: 'relative', zIndex: 10, margin: '40px 0 0' }}>
              <div className="ticker-content" style={{ fontFamily: 'var(--font-mono)' }}>
                <span>&gt; [SYS_OK] Perimeter Secure</span><span className="ticker-sep">|</span>
                <span>&gt; [NET] Latency: 12ms</span><span className="ticker-sep">|</span>
                <span>&gt; [AI_CORE] 0 Missed Alerts</span><span className="ticker-sep">|</span>
                <span>&gt; [AGENT_04] Executing Protocols</span><span className="ticker-sep">|</span>
                <span>&gt; [NODE_9] 100% Uptime</span><span className="ticker-sep">|</span>
                <span>&gt; [SYS_OK] Perimeter Secure</span><span className="ticker-sep">|</span>
                <span>&gt; [NET] Latency: 12ms</span><span className="ticker-sep">|</span>
                <span>&gt; [AI_CORE] 0 Missed Alerts</span><span className="ticker-sep">|</span>
                <span>&gt; [AGENT_04] Executing Protocols</span><span className="ticker-sep">|</span>
                <span>&gt; [NODE_9] 100% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
