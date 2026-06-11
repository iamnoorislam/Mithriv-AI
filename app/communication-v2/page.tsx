'use client'

import React, { useEffect, useState, useRef } from 'react'
import '../style.css'
import IndustrySection from '@/components/IndustrySection'

export default function CommunicationV2Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('problem');
  const [activeAgent, setActiveAgent] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const revealSectionRef = useRef<HTMLDivElement>(null);
  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealTitleRef = useRef<HTMLHeadingElement>(null);
  const revealSubtitleRef = useRef<HTMLParagraphElement>(null);
  const revealBtnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -(y - centerY) / 20;
    const tiltY = (x - centerX) / 20;
    setTilt({ x: tiltX, y: tiltY });
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    if (!mounted) return;

    const sections = [
      'problem',
      'agents',
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
    if (!mounted) return;
    const canvas = revealCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window as any;
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
      const rows = Math.ceil(H / ts) + 1;
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
        const px = cell.col * sz - offX;
        const py = cell.row * sz - offY;
        if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
        if (t < cell.introOffset) continue;
        const alpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset);
        if (alpha <= 0) continue;

        const cx = px + ds;
        const cy = py + ds;
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 160;

        let drawX = cx;
        let drawY = cy;
        let color = CFG.colors[cell.colorIdx] || CFG.colors[0];

        if (dist < radius && mouseX > 0) {
          const force = (radius - dist) / radius;
          drawX = cx + (dx / dist) * force * 16;
          drawY = cy + (dy / dist) * force * 16;

          const blend = force * 0.95;
          const r = Math.round(255 * (1 - blend) + 139 * blend);
          const g = Math.round(255 * (1 - blend) + 92 * blend);
          const b = Math.round(255 * (1 - blend) + 246 * blend);
          color = [r, g, b];
        }

        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
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

    let scrollTriggerInstance: any;

    if (w.gsap && w.ScrollTrigger && revealSectionRef.current) {
      const title = revealTitleRef.current;
      const subtitle = revealSubtitleRef.current;
      const btn = revealBtnRef.current;

      w.gsap.set(title, { y: 80, opacity: 0, filter: "blur(20px)", skewY: 3, rotationX: 12, transformOrigin: "50% 50%" });
      w.gsap.set(subtitle, { y: 40, opacity: 0, filter: "blur(12px)", skewY: 1.5 });
      w.gsap.set(btn, { y: 20, scale: 0.92, opacity: 0, filter: "blur(6px)" });
      w.gsap.set(canvas, { opacity: 0, scale: 1.05 });

      scrollTriggerInstance = w.ScrollTrigger.create({
        trigger: revealSectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = w.gsap.timeline();
          tl.to(canvas, {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "power3.out"
          }, 0);
          tl.to(title, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            skewY: 0,
            rotationX: 0,
            duration: 1.8,
            ease: "power4.out"
          }, 0.15);
          tl.to(subtitle, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            skewY: 0,
            duration: 1.4,
            ease: "power3.out"
          }, 0.4);
          tl.to(btn, {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(1.8)"
          }, 0.7);
        }
      });
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill(true);
      }
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

      // New Scroll Reveal Text Animation (Alphabet-by-alphabet reveal to purple highlight + zoom transition)
      const revealSec = document.getElementById('scroll-reveal-text');
      if (revealSec) {
        const chars = revealSec.querySelectorAll('.reveal-char');
        const revealTitle = revealSec.querySelector('.reveal-title') as HTMLElement | null;
        const targetO = revealSec.querySelector('.target-o') as HTMLElement | null;
        const transitionBg = revealSec.querySelector('.zoom-transition-bg') as HTMLElement | null;
        const transitionContent = revealSec.querySelector('.zoom-transition-content') as HTMLElement | null;

        if (chars.length > 0 && revealTitle && targetO && transitionBg) {
          try {
            ScrollTrigger.getById("text-reveal-story")?.kill(true);
          } catch (e) { }

          // Set initial inline styles to prevent glitches on resizing/refreshing
          gsap.set(revealTitle, { scale: 1, x: 0, y: 0, opacity: 1 });
          gsap.set(transitionBg, { opacity: 1 });
          if (transitionContent) gsap.set(transitionContent, { opacity: 0 });
          revealSec.style.background = '#FAF9F6';

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "text-reveal-story",
              trigger: revealSec,
              start: "top top",
              end: "+=3500", // increase scroll distance for the zoom & tab transitions
              scrub: true,
              pin: true,
              anticipatePin: 1,
              markers: false,
              invalidateOnRefresh: true,
              onRefresh: () => {
                // Temporarily disable transforms to measure clean base coordinates
                const prevTransform = revealTitle.style.transform;
                const prevScale = revealTitle.style.scale;
                revealTitle.style.transform = "none";
                revealTitle.style.scale = "1";

                const secRect = revealSec.getBoundingClientRect();
                const oRect = targetO.getBoundingClientRect();
                const titleRect = revealTitle.getBoundingClientRect();

                // Restore original styles
                revealTitle.style.transform = prevTransform;
                revealTitle.style.scale = prevScale;

                // oCenterX and oCenterY relative to the section container (which matches viewport when pinned)
                const oCenterX = (oRect.left + oRect.width / 2) - secRect.left;
                const oCenterY = (oRect.top + oRect.height / 2) - secRect.top;

                // Use the section rect width and height instead of window innerWidth/innerHeight
                // to avoid scrollbar width and layout discrepancies
                const viewportCenterX = secRect.width / 2;
                const viewportCenterY = secRect.height / 2;

                const moveX = viewportCenterX - oCenterX;
                const moveY = viewportCenterY - oCenterY;

                // Calculate percentage-based transform origins to prevent floating-point/subpixel scale errors
                const originXPercent = ((oRect.left + oRect.width / 2) - titleRect.left) / titleRect.width * 100;
                const originYPercent = ((oRect.top + oRect.height / 2) - titleRect.top) / titleRect.height * 100;

                // Store calculated values on the element so they can be retrieved in the animation
                (revealSec as any)._oAnimData = { moveX, moveY, originXPercent, originYPercent, oCenterX, oCenterY, viewportCenterX, viewportCenterY };
              },
              onUpdate: () => {
                // Synchronize active tab buttons with the GSAP animated translateY track position
                const track = document.querySelector(".features-scroll-track") as HTMLDivElement;
                if (track) {
                  const transform = window.getComputedStyle(track).transform;
                  const matrix = new DOMMatrixReadOnly(transform);
                  const translateY = Math.abs(matrix.m42); // extract vertical translation

                  let activeIndex = 0;
                  if (translateY >= 1370) {
                    activeIndex = 3;
                  } else if (translateY >= 822) {
                    activeIndex = 2;
                  } else if (translateY >= 274) {
                    activeIndex = 1;
                  }

                  (window as any).setEmbeddedActiveTab?.(activeIndex);
                }
              }
            }
          });

          // 1. Hold: Wait briefly after pinning (text is perfectly centered) before starting the reveal
          tl.to({}, { duration: 0.2 });

          // 2. Reveal: Animate the characters one by one instantly
          tl.to(chars, {
            color: '#8B5CF6',
            stagger: 0.02,
            duration: 0.8,
            ease: "none"
          });

          // 3. Hold: Keep the fully revealed text visible on screen
          tl.to({}, { duration: 0.2 });

          // 4. Zoom: Scale the text to huge and move the 'O' to the viewport center, while opening the radial-gradient mask
          const gradientState = {
            radius: 0,
            x: 0,
            y: 0
          };

          tl.to(revealTitle, {
            scale: 150, // zoom in extremely close
            transformOrigin: () => {
              const data = (revealSec as any)._oAnimData;
              return data ? `${data.originXPercent}% ${data.originYPercent}%` : "center center";
            },
            x: () => (revealSec as any)._oAnimData?.moveX || 0,
            y: () => (revealSec as any)._oAnimData?.moveY || 0,
            ease: "power2.in",
            duration: 1.8
          }, "zoomStart");

          // Fade out the title as it becomes huge so the thick lines don't block the screen
          tl.to(revealTitle, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.in"
          }, "zoomStart+=1.5");

          // Animate the radial gradient circle radius and center concurrently
          tl.to(gradientState, {
            radius: () => Math.max(window.innerWidth, window.innerHeight) * 1.8,
            x: () => (revealSec as any)._oAnimData?.viewportCenterX || (window.innerWidth / 2),
            y: () => (revealSec as any)._oAnimData?.viewportCenterY || (window.innerHeight / 2),
            ease: "power2.in",
            duration: 1.8,
            onStart: () => {
              const data = (revealSec as any)._oAnimData;
              gradientState.x = data ? data.oCenterX : (window.innerWidth / 2);
              gradientState.y = data ? data.oCenterY : (window.innerHeight / 2);
              gradientState.radius = 4; // start small matching the 'O' inner radius
            },
            onUpdate: () => {
              revealSec.style.background = `radial-gradient(circle at ${gradientState.x}px ${gradientState.y}px, transparent 0px, transparent ${gradientState.radius}px, #FAF9F6 ${gradientState.radius}px)`;
            }
          }, "zoomStart");

          // 5. Fade in the next section's content (overlaps with zoom to look seamless)
          if (transitionContent) {
            tl.to(transitionContent, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            }, "zoomStart+=1.5");
          }

          // 6. Hold on Tab 0: Keep the first tab visible in focus briefly after zoom finishes
          tl.addLabel("tab0");
          tl.to({}, { duration: 0.2 });

          // 7. Continuous translation: translate track smoothly and continuously (normal scrolling inside the window)
          tl.to(".features-scroll-track", {
            y: -548,
            duration: 0.6,
            ease: "none"
          });
          tl.addLabel("tab1");

          tl.to(".features-scroll-track", {
            y: -1096,
            duration: 0.6,
            ease: "none"
          });
          tl.addLabel("tab2");

          tl.to(".features-scroll-track", {
            y: -1644,
            duration: 0.6,
            ease: "none"
          });
          tl.addLabel("tab3");

          // 8. Final Hold: Hold on the last card briefly before releasing the pin
          tl.to({}, { duration: 0.2 });
        }
      }
    };

    const init = () => {
      if (w.runDotCanvas02 && w.runMain && w.gsap && w.ScrollTrigger) {
        deferTimer = setTimeout(() => {
          try {
            w.runDotCanvas02();
          } catch (e) {
            console.error("Error in runDotCanvas02:", e);
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
      if (w.cancelDotCanvas02Anim) {
        w.cancelDotCanvas02Anim();
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
        {/* Interactive Repelling Dot-Grid Matrix Background with Radial Fade-out Mask */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)',
          maskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)'
        }}>
          <canvas id="dotCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
        </div>

        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, marginTop: '0' }}>
          <div className="ent-pill">COMMUNICATION INTERFACE</div>
          <h1 className="main-heading">
            Security That Speaks.<br />Operations That Listen.
          </h1>
          <p className="body-text" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every stakeholder speaks to a different system.<br /><br />Mithriv brings every conversation, decision, and action into one operational layer.
          </p>
          <a href="#" className="ent-btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>Request Communication Assessment</a>
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
        /* Accordion grid for Agents section */
        .agents-accordion-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: stretch;
        }

        .agents-accordion-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .agent-accordion-card {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
          overflow: hidden;
          border-radius: 4px;
        }

        .agent-accordion-card:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .agent-accordion-card.active {
          background: rgba(139, 92, 246, 0.03);
          border-color: rgba(139, 92, 246, 0.25);
        }

        .agent-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .agent-accordion-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          font-family: var(--font-mono), monospace;
        }

        .agent-accordion-icon {
          font-family: var(--font-mono), monospace;
          font-size: 1.1rem;
          color: #B6B6B7;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .agent-accordion-card.active .agent-accordion-icon {
          color: #8B5CF6;
        }

        .agent-accordion-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
        }

        .agent-accordion-card.active .agent-accordion-content {
          max-height: 250px;
          opacity: 1;
          margin-top: 16px;
        }

        .agent-accordion-desc {
          color: #B6B6B7;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }

        .agent-accordion-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
        }

        .agent-accordion-metric-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 0.85rem;
          font-family: var(--font-mono), monospace;
        }

        .agents-accordion-right {
          position: relative;
          height: 100%;
        }

        .agents-dashboard-panel {
          background: rgba(10, 11, 14, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 24px;
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
          min-height: 320px;
          position: relative;
        }

        /* 3D Parallax & HUD scanner effects */
        .hud-spotlight {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .hud-crosshair-h, .hud-crosshair-v {
          position: absolute;
          background: rgba(139, 92, 246, 0.08);
          pointer-events: none;
          z-index: 2;
        }
        .hud-crosshair-h {
          left: 0;
          right: 0;
          height: 1px;
          border-top: 1px dashed rgba(139, 92, 246, 0.15);
        }
        .hud-crosshair-v {
          top: 0;
          bottom: 0;
          width: 1px;
          border-left: 1px dashed rgba(139, 92, 246, 0.15);
        }

        .hud-coords-label {
          position: absolute;
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          color: rgba(139, 92, 246, 0.4);
          pointer-events: none;
          z-index: 2;
        }

        /* Float Badge Card Animations */
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .float-badge-box {
          animation: floatBadge 4s infinite ease-in-out;
        }

        .float-badge-box {
          transform-box: fill-box;
          transform-origin: center;
        }

        /* Scanline laser animation */
        @keyframes scanlineLaser {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(128px); opacity: 0; }
        }

        .scanline-kiosk-laser {
          animation: scanlineLaser 3s infinite linear;
        }

        /* Wave pulse tactical circle */
        @keyframes wavePulseCircle {
          0% { transform: scale(0.85); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.25); opacity: 0; }
        }

        .wave-pulse-tactical-circle {
          animation: wavePulseCircle 4s infinite linear;
          transform-box: fill-box;
        }

        /* Rotate Orbit Agent Path */
        @keyframes rotateOrbitPath {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .rotate-orbit-agent-path {
          animation: rotateOrbitPath 12s infinite linear;
        }

        /* Equalizer vocal bar pulse */
        @keyframes vocalBarPulse {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }

        .vocal-bar-pulse {
          animation: vocalBarPulse 1.2s infinite ease-in-out;
          transform-box: fill-box;
          transform-origin: bottom;
        }

        /* Sweep radar arm rotation */
        @keyframes sweepRadarArm {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .sweep-radar-arm {
          animation: sweepRadarArm 6s infinite linear;
        }

        /* Countdown timer dash array */
        @keyframes timerDashRun {
          0% { stroke-dashoffset: 163; }
          100% { stroke-dashoffset: 0; }
        }

        .timer-dash-run {
          animation: timerDashRun 10s infinite linear alternate;
        }

        /* Rise KPI Column Bar height growth */
        @keyframes riseKpiBar {
          0% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }

        .rise-kpi-bar-run-1 {
          animation: riseKpiBar 3s infinite ease-in-out alternate;
          transform-box: fill-box;
          transform-origin: bottom;
        }

        .rise-kpi-bar-run-2 {
          animation: riseKpiBar 3s infinite ease-in-out alternate;
          animation-delay: 0.5s;
          transform-box: fill-box;
          transform-origin: bottom;
        }

        .rise-kpi-bar-run-3 {
          animation: riseKpiBar 3s infinite ease-in-out alternate;
          animation-delay: 1s;
          transform-box: fill-box;
          transform-origin: bottom;
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
            <span className="ent-pill" style={{ marginBottom: '0px' }}>The Problem</span>
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

          {/* SECTION 3: Conversational Agents */}
          <section className="section reveal-section" id="agents" style={{ padding: '80px 0', background: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '12px' }}>
              <span className="ent-pill" style={{ marginLeft: '0px' }}>CONVERSATIONAL AGENTS</span>
            </div>
            <h2 className="std-section-h2" style={{ fontSize: '48px', marginTop: '0px', marginBottom: '16px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left', lineHeight: '1.2' }}>
              One agent for every stakeholder.<br />Zero gaps between them.
            </h2>
            <p style={{ maxWidth: '850px', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', textAlign: 'left', marginTop: '0', marginBottom: '80px' }}>
              Purpose-built for each domain. Unified intelligence. Every interaction on record.
            </p>

            <div className="agents-accordion-grid">
              {/* Left side: Accordion list */}
              <div className="agents-accordion-left">
                {[
                  {
                    id: 0,
                    num: '01',
                    name: 'Visitor Agent',
                    desc: 'Complete visitor journey from pre-registration to departure. Kiosk, mobile, or lobby tablet. No training required.',
                    metrics: ['90-second check-in', 'Zero lobby queues']
                  },
                  {
                    id: 1,
                    num: '02',
                    name: 'Guard Agent',
                    desc: 'Hands-free operation for officers on patrol, at posts, in vehicles. Documentation during incidents, not after.',
                    metrics: ['Dispatch confirmed in seconds', 'Knowledge persists through turnover']
                  },
                  {
                    id: 2,
                    num: '03',
                    name: 'Employee Agent',
                    desc: 'Credential requests, access inquiries, policy questions — resolved without tickets or phone trees.',
                    metrics: ['Answers in seconds', 'Exceptions only, not routine']
                  },
                  {
                    id: 3,
                    num: '04',
                    name: 'Contractor Agent',
                    desc: 'Safety briefings, credentials, escort coordination — unified from onboarding through project completion.',
                    metrics: ['Contractors arrive prepared', 'Access expires automatically']
                  },
                  {
                    id: 4,
                    num: '05',
                    name: 'Emergency Agent',
                    desc: 'Crisis communication across all stakeholders simultaneously. Every channel. Documented completely.',
                    metrics: ['From alarm to all-clear', 'Accountability in minutes']
                  },
                  {
                    id: 5,
                    num: '06',
                    name: 'Executive Agent',
                    desc: 'Security intelligence on demand. Natural language. Real-time data. No analyst intermediaries.',
                    metrics: ['Questions answered, not estimated', 'Board-ready posture summaries']
                  }
                ].map((agent) => (
                  <div
                    key={agent.id}
                    className={`agent-accordion-card ${activeAgent === agent.id ? 'active' : ''}`}
                    onClick={() => setActiveAgent(agent.id)}
                  >
                    <div className="agent-accordion-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono), monospace', color: activeAgent === agent.id ? '#8B5CF6' : 'rgba(255,255,255,0.3)' }}>{agent.num}</span>
                        <h3 className="agent-accordion-title">{agent.name}</h3>
                      </div>
                      <span className="agent-accordion-icon">{activeAgent === agent.id ? '↓' : '→'}</span>
                    </div>
                    <div className="agent-accordion-content">
                      <p className="agent-accordion-desc">{agent.desc}</p>
                      <div className="agent-accordion-metrics">
                        {agent.metrics.map((metric, i) => (
                          <div key={i} className="agent-accordion-metric-item">
                            <span style={{ color: '#10B981' }}>✓</span>
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: Large Animated Icon Panel */}
              <div className="agents-accordion-right">
                <div className="agents-dashboard-panel">

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.85rem', color: '#B6B6B7', letterSpacing: '1px' }}>
                      [ AGENT_0{activeAgent + 1} // DIAGNOSTIC_DASHBOARD ]
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                      <span className="status-dot active" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)' }}></span>
                      ONLINE
                    </div>
                  </div>

                  <div className="agents-dashboard-panel-inner">
                    {activeAgent === 0 && (
                      <>
                        <svg width="513" height="386" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent1)" stroke="url(#paint1_linear_agent1)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />
                          <path d="M166.436 52.3008V43.5408H169.256C169.8 43.5408 170.272 43.6488 170.672 43.8648C171.072 44.0728 171.38 44.3688 171.596 44.7528C171.82 45.1368 171.932 45.5928 171.932 46.1208C171.932 46.6408 171.82 47.0968 171.596 47.4888C171.38 47.8728 171.072 48.1728 170.672 48.3888C170.272 48.5968 169.8 48.7008 169.256 48.7008H167.516V52.3008H166.436ZM167.516 47.7288H169.256C169.728 47.7288 170.104 47.5848 170.384 47.2968C170.672 47.0008 170.816 46.6088 170.816 46.1208C170.816 45.6248 170.672 45.2328 170.384 44.9448C170.104 44.6568 169.728 44.5128 169.256 44.5128H167.516V47.7288ZM176.127 52.4208C175.343 52.4208 174.723 52.1928 174.267 51.7368C173.811 51.2808 173.583 50.6288 173.583 49.7808V46.0608C173.583 45.2128 173.811 44.5608 174.267 44.1048C174.723 43.6488 175.343 43.4208 176.127 43.4208C176.911 43.4208 177.531 43.6488 177.987 44.1048C178.443 44.5608 178.671 45.2088 178.671 46.0488V49.7808C178.671 50.6288 178.443 51.2808 177.987 51.7368C177.531 52.1928 176.911 52.4208 176.127 52.4208ZM176.127 51.4488C176.599 51.4488 176.959 51.3168 177.207 51.0528C177.463 50.7808 177.591 50.3968 177.591 49.9008V45.9408C177.591 45.4448 177.463 45.0648 177.207 44.8008C176.959 44.5288 176.599 44.3928 176.127 44.3928C175.663 44.3928 175.303 44.5288 175.047 44.8008C174.791 45.0648 174.663 45.4448 174.663 45.9408V49.9008C174.663 50.3968 174.791 50.7808 175.047 51.0528C175.303 51.3168 175.663 51.4488 176.127 51.4488ZM180.839 52.3008V43.5408H183.539C184.059 43.5408 184.515 43.6488 184.907 43.8648C185.299 44.0728 185.603 44.3648 185.819 44.7408C186.035 45.1168 186.143 45.5568 186.143 46.0608C186.143 46.6528 185.991 47.1608 185.687 47.5848C185.383 48.0088 184.979 48.3048 184.475 48.4728L186.263 52.3008H185.075L183.359 48.5808H181.907V52.3008H180.839ZM181.907 47.6088H183.539C183.987 47.6088 184.347 47.4688 184.619 47.1888C184.891 46.9008 185.027 46.5248 185.027 46.0608C185.027 45.5888 184.891 45.2128 184.619 44.9328C184.347 44.6528 183.987 44.5128 183.539 44.5128H181.907V47.6088ZM189.978 52.3008V44.5248H187.578V43.5408H193.458V44.5248H191.058V52.3008H189.978ZM194.713 52.3008L196.993 43.5408H198.445L200.713 52.3008H199.621L199.045 49.9728H196.393L195.817 52.3008H194.713ZM196.609 49.0608H198.817L198.145 46.3608C198.017 45.8488 197.917 45.4208 197.845 45.0768C197.773 44.7328 197.729 44.5088 197.713 44.4048C197.697 44.5088 197.653 44.7328 197.581 45.0768C197.509 45.4208 197.409 45.8448 197.281 46.3488L196.609 49.0608ZM202.869 52.3008V43.5408H203.949V51.3168H207.909V52.3008H202.869ZM209.224 53.5008V52.6008H214.984V53.5008H209.224ZM218.759 52.3008V44.5248H216.359V43.5408H222.239V44.5248H219.839V52.3008H218.759ZM224.095 52.3008V43.5408H229.135V44.5248H225.163V47.2368H228.715V48.1968H225.163V51.3168H229.135V52.3008H224.095ZM231.206 52.3008V43.5408H233.906C234.426 43.5408 234.882 43.6488 235.274 43.8648C235.666 44.0728 235.97 44.3648 236.186 44.7408C236.402 45.1168 236.51 45.5568 236.51 46.0608C236.51 46.6528 236.358 47.1608 236.054 47.5848C235.75 48.0088 235.346 48.3048 234.842 48.4728L236.63 52.3008H235.442L233.726 48.5808H232.274V52.3008H231.206ZM232.274 47.6088H233.906C234.354 47.6088 234.714 47.4688 234.986 47.1888C235.258 46.9008 235.394 46.5248 235.394 46.0608C235.394 45.5888 235.258 45.2128 234.986 44.9328C234.714 44.6528 234.354 44.5128 233.906 44.5128H232.274V47.6088ZM238.149 52.3008V43.5408H239.745L240.861 47.3328L242.025 43.5408H243.621V52.3008H242.577V48.1608C242.577 47.7688 242.581 47.3208 242.589 46.8168C242.605 46.3048 242.625 45.7888 242.649 45.2688C242.673 44.7488 242.701 44.2808 242.733 43.8648L241.317 48.3888H240.381L239.025 43.9728C239.073 44.3648 239.109 44.7848 239.133 45.2328C239.157 45.6808 239.173 46.1488 239.181 46.6368C239.189 47.1248 239.193 47.6328 239.193 48.1608V52.3008H238.149ZM245.74 52.3008V51.3168H247.528V44.5248H245.74V43.5408H250.42V44.5248H248.632V51.3168H250.42V52.3008H245.74ZM252.756 52.3008V43.5408H254.196L256.872 51.0408C256.856 50.8408 256.836 50.5968 256.812 50.3088C256.796 50.0128 256.78 49.7048 256.764 49.3848C256.756 49.0568 256.752 48.7488 256.752 48.4608V43.5408H257.796V52.3008H256.356L253.692 44.8008C253.708 44.9928 253.724 45.2368 253.74 45.5328C253.756 45.8208 253.768 46.1288 253.776 46.4568C253.792 46.7768 253.8 47.0848 253.8 47.3808V52.3008H252.756ZM259.471 52.3008L261.751 43.5408H263.203L265.471 52.3008H264.379L263.803 49.9728H261.151L260.575 52.3008H259.471ZM261.367 49.0608H263.575L262.903 46.3608C262.775 45.8488 262.675 45.4208 262.603 45.0768C262.531 44.7328 262.487 44.5088 262.471 44.4048C262.455 44.5088 262.411 44.7328 262.339 45.0768C262.267 45.4208 262.167 45.8448 262.039 46.3488L261.367 49.0608ZM267.626 52.3008V43.5408H268.706V51.3168H272.666V52.3008H267.626Z" fill="#53585C" />
                          <g filter="url(#filter0_d_agent1)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>
                          <path d="M209.49 175.301C209.381 174.966 209.237 174.666 209.058 174.401C208.882 174.132 208.671 173.904 208.426 173.715C208.184 173.526 207.909 173.382 207.601 173.282C207.293 173.183 206.955 173.133 206.587 173.133C205.983 173.133 205.435 173.289 204.941 173.6C204.447 173.912 204.054 174.371 203.763 174.978C203.471 175.584 203.325 176.328 203.325 177.21C203.325 178.092 203.473 178.836 203.768 179.442C204.063 180.049 204.462 180.508 204.966 180.819C205.47 181.131 206.036 181.287 206.666 181.287C207.25 181.287 207.763 181.162 208.207 180.914C208.655 180.662 209.003 180.307 209.251 179.85C209.503 179.389 209.629 178.847 209.629 178.224L210.007 178.304H206.945V177.21H210.822V178.304C210.822 179.142 210.643 179.871 210.286 180.491C209.931 181.111 209.44 181.592 208.814 181.933C208.191 182.271 207.475 182.44 206.666 182.44C205.765 182.44 204.973 182.228 204.29 181.804C203.61 181.379 203.08 180.776 202.699 179.994C202.321 179.212 202.132 178.284 202.132 177.21C202.132 176.404 202.24 175.68 202.455 175.037C202.674 174.391 202.982 173.841 203.38 173.387C203.778 172.933 204.248 172.585 204.792 172.343C205.335 172.101 205.934 171.98 206.587 171.98C207.124 171.98 207.624 172.061 208.088 172.223C208.555 172.382 208.971 172.609 209.336 172.904C209.704 173.196 210.01 173.546 210.256 173.953C210.501 174.358 210.67 174.807 210.763 175.301H209.49ZM217.588 179.179V174.664H218.761V182.301H217.588V181.008H217.508C217.329 181.396 217.051 181.726 216.673 181.998C216.295 182.266 215.818 182.4 215.241 182.4C214.764 182.4 214.339 182.296 213.968 182.087C213.597 181.875 213.305 181.557 213.093 181.132C212.881 180.705 212.775 180.166 212.775 179.517V174.664H213.948V179.437C213.948 179.994 214.104 180.438 214.416 180.77C214.731 181.101 215.132 181.267 215.619 181.267C215.91 181.267 216.207 181.192 216.509 181.043C216.814 180.894 217.069 180.665 217.274 180.357C217.483 180.049 217.588 179.656 217.588 179.179ZM224.112 182.46C223.376 182.46 222.741 182.297 222.207 181.973C221.677 181.645 221.268 181.187 220.979 180.6C220.694 180.011 220.552 179.324 220.552 178.542C220.552 177.76 220.694 177.071 220.979 176.474C221.268 175.874 221.669 175.407 222.183 175.072C222.7 174.734 223.303 174.565 223.992 174.565C224.39 174.565 224.783 174.631 225.17 174.764C225.558 174.896 225.911 175.112 226.229 175.41C226.548 175.705 226.801 176.096 226.99 176.583C227.179 177.071 227.273 177.671 227.273 178.383V178.88H221.387V177.866H226.08C226.08 177.435 225.994 177.051 225.822 176.713C225.653 176.375 225.411 176.108 225.096 175.912C224.784 175.717 224.416 175.619 223.992 175.619C223.525 175.619 223.121 175.735 222.779 175.967C222.441 176.196 222.181 176.494 221.999 176.862C221.816 177.23 221.725 177.624 221.725 178.045V178.721C221.725 179.298 221.825 179.787 222.023 180.188C222.226 180.586 222.506 180.889 222.864 181.098C223.222 181.303 223.638 181.406 224.112 181.406C224.42 181.406 224.698 181.363 224.947 181.277C225.199 181.187 225.416 181.055 225.598 180.879C225.78 180.7 225.921 180.478 226.021 180.213L227.154 180.531C227.035 180.915 226.834 181.253 226.553 181.545C226.271 181.833 225.923 182.059 225.509 182.221C225.094 182.38 224.629 182.46 224.112 182.46ZM234.467 176.375L233.413 176.673C233.347 176.497 233.249 176.327 233.12 176.161C232.994 175.992 232.822 175.853 232.603 175.743C232.384 175.634 232.104 175.579 231.763 175.579C231.295 175.579 230.906 175.687 230.594 175.902C230.286 176.114 230.132 176.385 230.132 176.713C230.132 177.004 230.238 177.235 230.45 177.404C230.662 177.573 230.994 177.714 231.445 177.826L232.578 178.105C233.261 178.27 233.77 178.524 234.104 178.865C234.439 179.203 234.607 179.639 234.607 180.173C234.607 180.61 234.481 181.002 234.229 181.346C233.98 181.691 233.632 181.963 233.185 182.162C232.737 182.36 232.217 182.46 231.624 182.46C230.845 182.46 230.2 182.291 229.69 181.953C229.179 181.615 228.856 181.121 228.72 180.471L229.834 180.193C229.94 180.604 230.14 180.912 230.435 181.118C230.734 181.323 231.123 181.426 231.604 181.426C232.151 181.426 232.585 181.31 232.906 181.078C233.231 180.842 233.393 180.561 233.393 180.233C233.393 179.967 233.301 179.745 233.115 179.566C232.929 179.384 232.644 179.248 232.26 179.159L230.987 178.86C230.288 178.695 229.774 178.438 229.446 178.09C229.121 177.739 228.959 177.299 228.959 176.772C228.959 176.342 229.08 175.96 229.322 175.629C229.567 175.297 229.9 175.037 230.321 174.848C230.745 174.659 231.226 174.565 231.763 174.565C232.518 174.565 233.112 174.731 233.543 175.062C233.977 175.394 234.285 175.831 234.467 176.375ZM239.694 174.664V175.659H235.736V174.664H239.694ZM236.89 172.835H238.063V180.113C238.063 180.445 238.111 180.693 238.207 180.859C238.307 181.021 238.433 181.131 238.585 181.187C238.741 181.24 238.905 181.267 239.077 181.267C239.206 181.267 239.313 181.26 239.395 181.247C239.478 181.23 239.545 181.217 239.594 181.207L239.833 182.261C239.753 182.291 239.642 182.321 239.5 182.35C239.357 182.384 239.177 182.4 238.958 182.4C238.626 182.4 238.302 182.329 237.983 182.186C237.669 182.044 237.407 181.827 237.198 181.535C236.992 181.243 236.89 180.876 236.89 180.431V172.835ZM242.314 182.38C242.068 182.38 241.858 182.292 241.682 182.117C241.507 181.941 241.419 181.731 241.419 181.485C241.419 181.24 241.507 181.03 241.682 180.854C241.858 180.678 242.068 180.591 242.314 180.591C242.559 180.591 242.769 180.678 242.945 180.854C243.121 181.03 243.209 181.24 243.209 181.485C243.209 181.648 243.167 181.797 243.084 181.933C243.005 182.069 242.897 182.178 242.761 182.261C242.629 182.341 242.479 182.38 242.314 182.38ZM242.314 176.713C242.068 176.713 241.858 176.625 241.682 176.449C241.507 176.274 241.419 176.063 241.419 175.818C241.419 175.573 241.507 175.362 241.682 175.186C241.858 175.011 242.068 174.923 242.314 174.923C242.559 174.923 242.769 175.011 242.945 175.186C243.121 175.362 243.209 175.573 243.209 175.818C243.209 175.98 243.167 176.129 243.084 176.265C243.005 176.401 242.897 176.511 242.761 176.593C242.629 176.673 242.479 176.713 242.314 176.713ZM249.411 182.301V172.119H255.556V173.213H250.644V176.653H255.237V177.747H250.644V181.207H255.635V182.301H249.411ZM258.792 172.119V182.301H257.619V172.119H258.792ZM264.143 182.46C263.407 182.46 262.772 182.297 262.239 181.973C261.708 181.645 261.299 181.187 261.011 180.6C260.726 180.011 260.583 179.324 260.583 178.542C260.583 177.76 260.726 177.071 261.011 176.474C261.299 175.874 261.7 175.407 262.214 175.072C262.731 174.734 263.334 174.565 264.023 174.565C264.421 174.565 264.814 174.631 265.202 174.764C265.589 174.896 265.942 175.112 266.261 175.41C266.579 175.705 266.832 176.096 267.021 176.583C267.21 177.071 267.305 177.671 267.305 178.383V178.88H261.418V177.866H266.112C266.112 177.435 266.025 177.051 265.853 176.713C265.684 176.375 265.442 176.108 265.127 175.912C264.816 175.717 264.448 175.619 264.023 175.619C263.556 175.619 263.152 175.735 262.81 175.967C262.472 176.196 262.212 176.494 262.03 176.862C261.848 177.23 261.756 177.624 261.756 178.045V178.721C261.756 179.298 261.856 179.787 262.055 180.188C262.257 180.586 262.537 180.889 262.895 181.098C263.253 181.303 263.669 181.406 264.143 181.406C264.451 181.406 264.729 181.363 264.978 181.277C265.23 181.187 265.447 181.055 265.629 180.879C265.812 180.7 265.952 180.478 266.052 180.213L267.185 180.531C267.066 180.915 266.866 181.253 266.584 181.545C266.302 181.833 265.954 182.059 265.54 182.221C265.125 182.38 264.66 182.46 264.143 182.46ZM271.337 182.48C270.853 182.48 270.414 182.389 270.019 182.206C269.625 182.021 269.312 181.754 269.08 181.406C268.848 181.055 268.732 180.63 268.732 180.133C268.732 179.696 268.818 179.341 268.99 179.069C269.162 178.794 269.393 178.579 269.681 178.423C269.969 178.267 270.288 178.151 270.636 178.075C270.987 177.995 271.34 177.932 271.695 177.886C272.159 177.826 272.535 177.782 272.823 177.752C273.115 177.719 273.327 177.664 273.46 177.588C273.595 177.511 273.663 177.379 273.663 177.19V177.15C273.663 176.66 273.529 176.279 273.261 176.007C272.996 175.735 272.593 175.599 272.053 175.599C271.492 175.599 271.053 175.722 270.735 175.967C270.417 176.212 270.193 176.474 270.064 176.752L268.95 176.355C269.149 175.891 269.414 175.529 269.746 175.271C270.08 175.009 270.445 174.827 270.839 174.724C271.237 174.618 271.628 174.565 272.013 174.565C272.258 174.565 272.54 174.595 272.858 174.654C273.179 174.711 273.489 174.828 273.788 175.007C274.089 175.186 274.339 175.457 274.538 175.818C274.737 176.179 274.837 176.663 274.837 177.27V182.301H273.663V181.267H273.604C273.524 181.432 273.392 181.61 273.206 181.799C273.02 181.988 272.773 182.148 272.465 182.281C272.157 182.413 271.781 182.48 271.337 182.48ZM271.516 181.426C271.98 181.426 272.371 181.335 272.689 181.152C273.01 180.97 273.252 180.735 273.415 180.446C273.58 180.158 273.663 179.855 273.663 179.537V178.463C273.614 178.522 273.504 178.577 273.335 178.627C273.17 178.673 272.977 178.715 272.759 178.751C272.543 178.784 272.333 178.814 272.127 178.841C271.925 178.864 271.761 178.884 271.635 178.9C271.33 178.94 271.045 179.005 270.78 179.094C270.518 179.18 270.306 179.311 270.143 179.487C269.984 179.659 269.905 179.895 269.905 180.193C269.905 180.6 270.056 180.909 270.357 181.118C270.662 181.323 271.048 181.426 271.516 181.426ZM278.151 177.707V182.301H276.978V174.664H278.112V175.858H278.211C278.39 175.47 278.662 175.158 279.026 174.923C279.391 174.684 279.862 174.565 280.438 174.565C280.955 174.565 281.408 174.671 281.796 174.883C282.183 175.092 282.485 175.41 282.7 175.838C282.916 176.262 283.024 176.799 283.024 177.449V182.301H281.85V177.528C281.85 176.928 281.695 176.461 281.383 176.126C281.071 175.788 280.644 175.619 280.1 175.619C279.726 175.619 279.391 175.7 279.096 175.863C278.804 176.025 278.574 176.262 278.405 176.574C278.236 176.885 278.151 177.263 278.151 177.707ZM288.27 182.46C287.58 182.46 286.976 182.296 286.455 181.968C285.938 181.64 285.534 181.181 285.242 180.591C284.954 180.001 284.81 179.311 284.81 178.522C284.81 177.727 284.954 177.033 285.242 176.439C285.534 175.846 285.938 175.385 286.455 175.057C286.976 174.729 287.58 174.565 288.27 174.565C288.959 174.565 289.563 174.729 290.08 175.057C290.6 175.385 291.004 175.846 291.293 176.439C291.584 177.033 291.73 177.727 291.73 178.522C291.73 179.311 291.584 180.001 291.293 180.591C291.004 181.181 290.6 181.64 290.08 181.968C289.563 182.296 288.959 182.46 288.27 182.46ZM288.27 181.406C288.794 181.406 289.224 181.272 289.562 181.003C289.901 180.735 290.151 180.382 290.313 179.944C290.476 179.507 290.557 179.033 290.557 178.522C290.557 178.012 290.476 177.536 290.313 177.096C290.151 176.655 289.901 176.298 289.562 176.027C289.224 175.755 288.794 175.619 288.27 175.619C287.746 175.619 287.315 175.755 286.977 176.027C286.639 176.298 286.389 176.655 286.227 177.096C286.064 177.536 285.983 178.012 285.983 178.522C285.983 179.033 286.064 179.507 286.227 179.944C286.389 180.382 286.639 180.735 286.977 181.003C287.315 181.272 287.746 181.406 288.27 181.406ZM293.521 182.301V174.664H294.655V175.818H294.734C294.873 175.44 295.125 175.133 295.49 174.898C295.854 174.663 296.265 174.545 296.723 174.545C296.809 174.545 296.917 174.547 297.046 174.55C297.175 174.553 297.273 174.558 297.339 174.565V175.758C297.3 175.748 297.208 175.733 297.066 175.713C296.927 175.69 296.779 175.679 296.623 175.679C296.252 175.679 295.921 175.757 295.629 175.912C295.341 176.065 295.112 176.277 294.943 176.549C294.777 176.817 294.694 177.124 294.694 177.468V182.301H293.521ZM302.668 185.164V174.664H303.801V175.877H303.94C304.027 175.745 304.146 175.576 304.298 175.37C304.454 175.162 304.676 174.976 304.964 174.814C305.256 174.648 305.651 174.565 306.148 174.565C306.791 174.565 307.357 174.726 307.848 175.047C308.339 175.369 308.721 175.824 308.996 176.414C309.272 177.004 309.409 177.7 309.409 178.502C309.409 179.311 309.272 180.012 308.996 180.605C308.721 181.195 308.34 181.653 307.853 181.978C307.366 182.299 306.804 182.46 306.168 182.46C305.677 182.46 305.284 182.379 304.989 182.216C304.694 182.051 304.467 181.863 304.308 181.654C304.149 181.442 304.027 181.267 303.94 181.127H303.841V185.164H302.668ZM303.821 178.483C303.821 179.059 303.906 179.568 304.075 180.009C304.244 180.446 304.491 180.789 304.815 181.038C305.14 181.283 305.538 181.406 306.009 181.406C306.499 181.406 306.908 181.277 307.237 181.018C307.568 180.756 307.817 180.405 307.982 179.964C308.151 179.52 308.236 179.026 308.236 178.483C308.236 177.946 308.153 177.462 307.987 177.031C307.825 176.597 307.578 176.254 307.246 176.002C306.918 175.747 306.506 175.619 306.009 175.619C305.531 175.619 305.13 175.74 304.805 175.982C304.481 176.221 304.235 176.555 304.07 176.986C303.904 177.414 303.821 177.913 303.821 178.483ZM312.054 182.38C311.809 182.38 311.598 182.292 311.423 182.117C311.247 181.941 311.159 181.731 311.159 181.485C311.159 181.24 311.247 181.03 311.423 180.854C311.598 180.678 311.809 180.591 312.054 180.591C312.299 180.591 312.51 180.678 312.685 180.854C312.861 181.03 312.949 181.24 312.949 181.485C312.949 181.648 312.907 181.797 312.825 181.933C312.745 182.069 312.637 182.178 312.501 182.261C312.369 182.341 312.22 182.38 312.054 182.38ZM319.409 177.21C319.409 175.957 319.572 174.805 319.897 173.755C320.225 172.701 320.692 171.731 321.299 170.846H322.333C322.094 171.174 321.87 171.579 321.662 172.059C321.456 172.537 321.275 173.062 321.12 173.635C320.964 174.205 320.841 174.795 320.752 175.405C320.666 176.015 320.623 176.617 320.623 177.21C320.623 177.999 320.699 178.799 320.851 179.611C321.004 180.423 321.209 181.177 321.468 181.873C321.726 182.569 322.015 183.136 322.333 183.574H321.299C320.692 182.689 320.225 181.721 319.897 180.67C319.572 179.616 319.409 178.463 319.409 177.21ZM324.223 182.301V172.119H330.368V173.213H325.456V176.653H330.05V177.747H325.456V181.207H330.448V182.301H324.223ZM333.306 174.664L335.136 177.787L336.965 174.664H338.318L335.852 178.483L338.318 182.301H336.965L335.136 179.338L333.306 182.301H331.954L334.38 178.483L331.954 174.664H333.306ZM342.879 182.46C342.143 182.46 341.509 182.297 340.975 181.973C340.445 181.645 340.035 181.187 339.747 180.6C339.462 180.011 339.319 179.324 339.319 178.542C339.319 177.76 339.462 177.071 339.747 176.474C340.035 175.874 340.436 175.407 340.95 175.072C341.467 174.734 342.07 174.565 342.76 174.565C343.157 174.565 343.55 174.631 343.938 174.764C344.326 174.896 344.679 175.112 344.997 175.41C345.315 175.705 345.569 176.096 345.758 176.583C345.947 177.071 346.041 177.671 346.041 178.383V178.88H340.155V177.866H344.848C344.848 177.435 344.762 177.051 344.589 176.713C344.42 176.375 344.178 176.108 343.863 175.912C343.552 175.717 343.184 175.619 342.76 175.619C342.292 175.619 341.888 175.735 341.547 175.967C341.209 176.196 340.948 176.494 340.766 176.862C340.584 177.23 340.493 177.624 340.493 178.045V178.721C340.493 179.298 340.592 179.787 340.791 180.188C340.993 180.586 341.273 180.889 341.631 181.098C341.989 181.303 342.405 181.406 342.879 181.406C343.187 181.406 343.466 181.363 343.714 181.277C343.966 181.187 344.183 181.055 344.366 180.879C344.548 180.7 344.689 180.478 344.788 180.213L345.922 180.531C345.802 180.915 345.602 181.253 345.32 181.545C345.038 181.833 344.69 182.059 344.276 182.221C343.862 182.38 343.396 182.46 342.879 182.46ZM350.928 182.46C350.212 182.46 349.596 182.291 349.079 181.953C348.562 181.615 348.164 181.149 347.885 180.556C347.607 179.962 347.468 179.285 347.468 178.522C347.468 177.747 347.61 177.062 347.895 176.469C348.184 175.873 348.585 175.407 349.099 175.072C349.616 174.734 350.219 174.565 350.908 174.565C351.445 174.565 351.929 174.664 352.36 174.863C352.791 175.062 353.144 175.341 353.419 175.699C353.694 176.056 353.865 176.474 353.931 176.951H352.758C352.668 176.603 352.469 176.295 352.161 176.027C351.856 175.755 351.445 175.619 350.928 175.619C350.471 175.619 350.07 175.738 349.725 175.977C349.384 176.212 349.117 176.545 348.925 176.976C348.736 177.404 348.641 177.906 348.641 178.483C348.641 179.073 348.734 179.586 348.92 180.024C349.108 180.461 349.374 180.801 349.715 181.043C350.06 181.285 350.464 181.406 350.928 181.406C351.233 181.406 351.51 181.353 351.758 181.247C352.007 181.141 352.217 180.988 352.39 180.789C352.562 180.591 352.685 180.352 352.758 180.074H353.931C353.865 180.524 353.701 180.93 353.439 181.292C353.18 181.65 352.837 181.935 352.41 182.147C351.985 182.355 351.492 182.46 350.928 182.46ZM360.459 179.179V174.664H361.632V182.301H360.459V181.008H360.379C360.2 181.396 359.922 181.726 359.544 181.998C359.166 182.266 358.689 182.4 358.112 182.4C357.635 182.4 357.211 182.296 356.839 182.087C356.468 181.875 356.176 181.557 355.964 181.132C355.752 180.705 355.646 180.166 355.646 179.517V174.664H356.819V179.437C356.819 179.994 356.975 180.438 357.287 180.77C357.602 181.101 358.003 181.267 358.49 181.267C358.782 181.267 359.078 181.192 359.38 181.043C359.685 180.894 359.94 180.665 360.145 180.357C360.354 180.049 360.459 179.656 360.459 179.179ZM367.102 174.664V175.659H363.145V174.664H367.102ZM364.298 172.835H365.471V180.113C365.471 180.445 365.519 180.693 365.615 180.859C365.715 181.021 365.841 181.131 365.993 181.187C366.149 181.24 366.313 181.267 366.485 181.267C366.615 181.267 366.721 181.26 366.804 181.247C366.886 181.23 366.953 181.217 367.002 181.207L367.241 182.261C367.162 182.291 367.051 182.321 366.908 182.35C366.766 182.384 366.585 182.4 366.366 182.4C366.035 182.4 365.71 182.329 365.392 182.186C365.077 182.044 364.815 181.827 364.606 181.535C364.401 181.243 364.298 180.876 364.298 180.431V172.835ZM368.867 182.301V174.664H370.04V182.301H368.867ZM369.463 173.392C369.235 173.392 369.038 173.314 368.872 173.158C368.709 173.002 368.628 172.815 368.628 172.596C368.628 172.377 368.709 172.19 368.872 172.034C369.038 171.879 369.235 171.801 369.463 171.801C369.692 171.801 369.888 171.879 370.05 172.034C370.216 172.19 370.299 172.377 370.299 172.596C370.299 172.815 370.216 173.002 370.05 173.158C369.888 173.314 369.692 173.392 369.463 173.392ZM378.433 174.664L375.61 182.301H374.416L371.593 174.664H372.865L374.973 180.75H375.053L377.161 174.664H378.433ZM382.91 182.46C382.175 182.46 381.54 182.297 381.006 181.973C380.476 181.645 380.067 181.187 379.778 180.6C379.493 180.011 379.351 179.324 379.351 178.542C379.351 177.76 379.493 177.071 379.778 176.474C380.067 175.874 380.468 175.407 380.981 175.072C381.498 174.734 382.102 174.565 382.791 174.565C383.189 174.565 383.581 174.631 383.969 174.764C384.357 174.896 384.71 175.112 385.028 175.41C385.346 175.705 385.6 176.096 385.789 176.583C385.978 177.071 386.072 177.671 386.072 178.383V178.88H380.186V177.866H384.879C384.879 177.435 384.793 177.051 384.621 176.713C384.452 176.375 384.21 176.108 383.895 175.912C383.583 175.717 383.215 175.619 382.791 175.619C382.324 175.619 381.919 175.735 381.578 175.967C381.24 176.196 380.98 176.494 380.797 176.862C380.615 177.23 380.524 177.624 380.524 178.045V178.721C380.524 179.298 380.623 179.787 380.822 180.188C381.024 180.586 381.305 180.889 381.662 181.098C382.02 181.303 382.436 181.406 382.91 181.406C383.219 181.406 383.497 181.363 383.746 181.277C383.997 181.187 384.215 181.055 384.397 180.879C384.579 180.7 384.72 180.478 384.819 180.213L385.953 180.531C385.834 180.915 385.633 181.253 385.351 181.545C385.07 181.833 384.722 182.059 384.307 182.221C383.893 182.38 383.427 182.46 382.91 182.46ZM390.363 178.005C390.363 179.258 390.199 180.412 389.871 181.466C389.546 182.516 389.08 183.484 388.474 184.369H387.439C387.678 184.041 387.9 183.636 388.106 183.156C388.314 182.679 388.497 182.155 388.653 181.585C388.808 181.011 388.929 180.42 389.015 179.81C389.105 179.197 389.15 178.595 389.15 178.005C389.15 177.217 389.073 176.416 388.921 175.604C388.769 174.792 388.563 174.038 388.305 173.342C388.046 172.646 387.758 172.079 387.439 171.642H388.474C389.08 172.527 389.546 173.496 389.871 174.55C390.199 175.601 390.363 176.752 390.363 178.005Z" fill="#CFD6E1" />
                          <path d="M202.354 210.301V201.574H203.411V205.46H208.064V201.574H209.121V210.301H208.064V206.397H203.411V210.301H202.354ZM213.759 210.437C213.168 210.437 212.65 210.297 212.204 210.015C211.761 209.734 211.414 209.341 211.164 208.835C210.917 208.329 210.793 207.738 210.793 207.062C210.793 206.38 210.917 205.785 211.164 205.277C211.414 204.768 211.761 204.373 212.204 204.092C212.65 203.811 213.168 203.67 213.759 203.67C214.35 203.67 214.867 203.811 215.31 204.092C215.756 204.373 216.103 204.768 216.35 205.277C216.6 205.785 216.725 206.38 216.725 207.062C216.725 207.738 216.6 208.329 216.35 208.835C216.103 209.341 215.756 209.734 215.31 210.015C214.867 210.297 214.35 210.437 213.759 210.437ZM213.759 209.534C214.208 209.534 214.577 209.419 214.867 209.189C215.157 208.958 215.371 208.656 215.511 208.281C215.65 207.906 215.719 207.5 215.719 207.062C215.719 206.625 215.65 206.217 215.511 205.839C215.371 205.461 215.157 205.156 214.867 204.923C214.577 204.69 214.208 204.574 213.759 204.574C213.31 204.574 212.941 204.69 212.651 204.923C212.362 205.156 212.147 205.461 212.008 205.839C211.869 206.217 211.799 206.625 211.799 207.062C211.799 207.5 211.869 207.906 212.008 208.281C212.147 208.656 212.362 208.958 212.651 209.189C212.941 209.419 213.31 209.534 213.759 209.534ZM222.897 205.221L221.993 205.477C221.936 205.326 221.853 205.18 221.742 205.038C221.634 204.893 221.486 204.774 221.299 204.68C221.111 204.586 220.871 204.539 220.578 204.539C220.178 204.539 219.844 204.632 219.577 204.816C219.313 204.998 219.181 205.23 219.181 205.511C219.181 205.761 219.272 205.958 219.453 206.103C219.635 206.248 219.919 206.369 220.306 206.466L221.277 206.704C221.863 206.846 222.299 207.064 222.586 207.356C222.873 207.646 223.016 208.02 223.016 208.477C223.016 208.852 222.908 209.187 222.692 209.483C222.479 209.778 222.181 210.011 221.797 210.181C221.414 210.352 220.968 210.437 220.459 210.437C219.792 210.437 219.239 210.292 218.801 210.002C218.364 209.713 218.087 209.289 217.971 208.733L218.925 208.494C219.016 208.846 219.188 209.11 219.441 209.287C219.696 209.463 220.03 209.551 220.442 209.551C220.911 209.551 221.283 209.451 221.559 209.252C221.837 209.051 221.976 208.809 221.976 208.528C221.976 208.301 221.897 208.11 221.738 207.957C221.578 207.801 221.334 207.684 221.005 207.608L219.914 207.352C219.314 207.21 218.874 206.99 218.593 206.691C218.314 206.39 218.175 206.014 218.175 205.562C218.175 205.193 218.279 204.866 218.486 204.582C218.696 204.298 218.982 204.075 219.343 203.913C219.706 203.751 220.118 203.67 220.578 203.67C221.226 203.67 221.735 203.812 222.104 204.096C222.476 204.38 222.74 204.755 222.897 205.221ZM227.376 203.755V204.608H223.984V203.755H227.376ZM224.973 202.187H225.979V208.426C225.979 208.71 226.02 208.923 226.102 209.065C226.188 209.204 226.295 209.298 226.426 209.346C226.56 209.392 226.7 209.414 226.848 209.414C226.959 209.414 227.05 209.409 227.121 209.397C227.192 209.383 227.249 209.372 227.291 209.363L227.496 210.267C227.428 210.292 227.332 210.318 227.21 210.343C227.088 210.372 226.933 210.386 226.746 210.386C226.462 210.386 226.183 210.325 225.911 210.203C225.641 210.081 225.416 209.895 225.237 209.645C225.061 209.395 224.973 209.079 224.973 208.699V202.187ZM229.622 210.369C229.412 210.369 229.232 210.294 229.081 210.143C228.93 209.993 228.855 209.812 228.855 209.602C228.855 209.392 228.93 209.211 229.081 209.061C229.232 208.91 229.412 208.835 229.622 208.835C229.832 208.835 230.013 208.91 230.163 209.061C230.314 209.211 230.389 209.392 230.389 209.602C230.389 209.741 230.354 209.869 230.283 209.985C230.214 210.102 230.122 210.196 230.006 210.267C229.892 210.335 229.764 210.369 229.622 210.369ZM229.622 205.511C229.412 205.511 229.232 205.436 229.081 205.285C228.93 205.135 228.855 204.954 228.855 204.744C228.855 204.534 228.93 204.353 229.081 204.203C229.232 204.052 229.412 203.977 229.622 203.977C229.832 203.977 230.013 204.052 230.163 204.203C230.314 204.353 230.389 204.534 230.389 204.744C230.389 204.883 230.354 205.011 230.283 205.127C230.214 205.244 230.122 205.338 230.006 205.409C229.892 205.477 229.764 205.511 229.622 205.511ZM235.705 201.574H236.967L239.933 208.818H240.035L243.001 201.574H244.262V210.301H243.273V203.67H243.188L240.461 210.301H239.506L236.779 203.67H236.694V210.301H235.705V201.574ZM246.245 210.301V203.755H247.25V210.301H246.245ZM246.756 202.664C246.56 202.664 246.391 202.598 246.249 202.464C246.11 202.331 246.04 202.17 246.04 201.983C246.04 201.795 246.11 201.635 246.249 201.501C246.391 201.368 246.56 201.301 246.756 201.301C246.952 201.301 247.12 201.368 247.259 201.501C247.401 201.635 247.472 201.795 247.472 201.983C247.472 202.17 247.401 202.331 247.259 202.464C247.12 202.598 246.952 202.664 246.756 202.664ZM251.939 203.755V204.608H248.547V203.755H251.939ZM249.536 202.187H250.541V208.426C250.541 208.71 250.582 208.923 250.665 209.065C250.75 209.204 250.858 209.298 250.989 209.346C251.122 209.392 251.263 209.414 251.411 209.414C251.521 209.414 251.612 209.409 251.683 209.397C251.754 209.383 251.811 209.372 251.854 209.363L252.058 210.267C251.99 210.292 251.895 210.318 251.773 210.343C251.651 210.372 251.496 210.386 251.308 210.386C251.024 210.386 250.746 210.325 250.473 210.203C250.203 210.081 249.979 209.895 249.8 209.645C249.624 209.395 249.536 209.079 249.536 208.699V202.187ZM254.598 206.363V210.301H253.592V201.574H254.598V204.778H254.683C254.837 204.44 255.067 204.172 255.374 203.973C255.683 203.771 256.095 203.67 256.609 203.67C257.055 203.67 257.446 203.76 257.781 203.939C258.116 204.115 258.376 204.386 258.561 204.752C258.749 205.116 258.842 205.579 258.842 206.142V210.301H257.837V206.21C257.837 205.69 257.702 205.288 257.432 205.004C257.165 204.717 256.794 204.574 256.32 204.574C255.99 204.574 255.695 204.643 255.433 204.782C255.175 204.922 254.97 205.125 254.82 205.392C254.672 205.659 254.598 205.983 254.598 206.363ZM260.682 210.301V203.755H261.654V204.744H261.722C261.841 204.42 262.057 204.157 262.37 203.956C262.682 203.754 263.034 203.653 263.426 203.653C263.5 203.653 263.593 203.654 263.703 203.657C263.814 203.66 263.898 203.664 263.955 203.67V204.693C263.921 204.684 263.843 204.672 263.721 204.654C263.601 204.635 263.475 204.625 263.341 204.625C263.023 204.625 262.739 204.691 262.489 204.825C262.242 204.956 262.046 205.137 261.901 205.37C261.759 205.6 261.688 205.863 261.688 206.159V210.301H260.682ZM265.147 210.301V203.755H266.153V210.301H265.147ZM265.658 202.664C265.462 202.664 265.293 202.598 265.151 202.464C265.012 202.331 264.942 202.17 264.942 201.983C264.942 201.795 265.012 201.635 265.151 201.501C265.293 201.368 265.462 201.301 265.658 201.301C265.854 201.301 266.022 201.368 266.161 201.501C266.303 201.635 266.374 201.795 266.374 201.983C266.374 202.17 266.303 202.331 266.161 202.464C266.022 202.598 265.854 202.664 265.658 202.664ZM273.347 203.755L270.926 210.301H269.904L267.483 203.755H268.574L270.381 208.971H270.449L272.256 203.755H273.347ZM279.243 201.574V210.301H278.186V201.574H279.243ZM282.231 206.363V210.301H281.225V203.755H282.197V204.778H282.282C282.435 204.446 282.668 204.179 282.981 203.977C283.293 203.772 283.697 203.67 284.191 203.67C284.634 203.67 285.022 203.761 285.354 203.943C285.687 204.122 285.945 204.395 286.13 204.761C286.315 205.125 286.407 205.585 286.407 206.142V210.301H285.401V206.21C285.401 205.696 285.268 205.295 285.001 205.008C284.734 204.718 284.367 204.574 283.901 204.574C283.58 204.574 283.293 204.643 283.04 204.782C282.79 204.922 282.593 205.125 282.448 205.392C282.303 205.659 282.231 205.983 282.231 206.363ZM290.904 210.437C290.29 210.437 289.762 210.292 289.319 210.002C288.875 209.713 288.534 209.314 288.296 208.805C288.057 208.297 287.938 207.716 287.938 207.062C287.938 206.397 288.06 205.811 288.304 205.302C288.551 204.791 288.895 204.392 289.336 204.105C289.779 203.815 290.296 203.67 290.887 203.67C291.347 203.67 291.762 203.755 292.131 203.926C292.5 204.096 292.803 204.335 293.039 204.642C293.275 204.949 293.421 205.306 293.478 205.716H292.472C292.395 205.417 292.225 205.153 291.961 204.923C291.699 204.69 291.347 204.574 290.904 204.574C290.512 204.574 290.168 204.676 289.873 204.88C289.58 205.082 289.351 205.368 289.186 205.737C289.025 206.103 288.944 206.534 288.944 207.028C288.944 207.534 289.023 207.974 289.182 208.349C289.344 208.724 289.571 209.015 289.864 209.223C290.159 209.43 290.506 209.534 290.904 209.534C291.165 209.534 291.402 209.488 291.615 209.397C291.828 209.306 292.009 209.176 292.157 209.005C292.304 208.835 292.409 208.63 292.472 208.392H293.478C293.421 208.778 293.28 209.126 293.056 209.436C292.834 209.743 292.54 209.987 292.174 210.169C291.81 210.348 291.387 210.437 290.904 210.437ZM203.411 221.574V230.301H202.354V221.574H203.411ZM208.223 230.301H205.529V221.574H208.342C209.189 221.574 209.913 221.748 210.515 222.098C211.118 222.444 211.579 222.943 211.9 223.593C212.221 224.241 212.382 225.017 212.382 225.92C212.382 226.829 212.22 227.612 211.896 228.268C211.572 228.922 211.1 229.424 210.481 229.777C209.862 230.126 209.109 230.301 208.223 230.301ZM206.586 229.363H208.154C208.876 229.363 209.474 229.224 209.949 228.946C210.423 228.667 210.777 228.271 211.01 227.757C211.243 227.243 211.359 226.63 211.359 225.92C211.359 225.216 211.244 224.609 211.014 224.1C210.784 223.589 210.44 223.197 209.983 222.924C209.525 222.649 208.956 222.511 208.274 222.511H206.586V229.363ZM214.751 229.184C214.541 229.184 214.36 229.109 214.21 228.958C214.059 228.808 213.984 228.627 213.984 228.417C213.984 228.207 214.059 228.027 214.21 227.876C214.36 227.725 214.541 227.65 214.751 227.65C214.961 227.65 215.142 227.725 215.292 227.876C215.443 228.027 215.518 228.207 215.518 228.417C215.518 228.556 215.483 228.684 215.412 228.801C215.343 228.917 215.251 229.011 215.135 229.082C215.021 229.15 214.893 229.184 214.751 229.184ZM214.751 224.77C214.541 224.77 214.36 224.694 214.21 224.544C214.059 224.393 213.984 224.213 213.984 224.002C213.984 223.792 214.059 223.612 214.21 223.461C214.36 223.311 214.541 223.235 214.751 223.235C214.961 223.235 215.142 223.311 215.292 223.461C215.443 223.612 215.518 223.792 215.518 224.002C215.518 224.142 215.483 224.27 215.412 224.386C215.343 224.502 215.251 224.596 215.135 224.667C215.021 224.735 214.893 224.77 214.751 224.77ZM221.192 221.574L223.783 228.92H223.885L226.476 221.574H227.584L224.38 230.301H223.289L220.084 221.574H221.192ZM231.948 225.468V226.406H228.13V225.468H231.948ZM236.496 230.42C235.911 230.42 235.393 230.316 234.945 230.109C234.499 229.899 234.151 229.61 233.901 229.244C233.651 228.875 233.527 228.454 233.53 227.983C233.527 227.613 233.599 227.272 233.747 226.96C233.895 226.645 234.097 226.382 234.352 226.172C234.611 225.958 234.899 225.824 235.217 225.767V225.716C234.8 225.608 234.467 225.373 234.22 225.012C233.973 224.649 233.851 224.235 233.854 223.772C233.851 223.329 233.963 222.933 234.19 222.583C234.418 222.234 234.73 221.958 235.128 221.757C235.528 221.555 235.984 221.454 236.496 221.454C237.001 221.454 237.453 221.555 237.851 221.757C238.249 221.958 238.561 222.234 238.788 222.583C239.018 222.933 239.135 223.329 239.138 223.772C239.135 224.235 239.009 224.649 238.759 225.012C238.511 225.373 238.183 225.608 237.774 225.716V225.767C238.089 225.824 238.374 225.958 238.626 226.172C238.879 226.382 239.081 226.645 239.232 226.96C239.382 227.272 239.459 227.613 239.462 227.983C239.459 228.454 239.331 228.875 239.078 229.244C238.828 229.61 238.48 229.899 238.034 230.109C237.591 230.316 237.078 230.42 236.496 230.42ZM236.496 229.483C236.891 229.483 237.232 229.419 237.518 229.291C237.805 229.163 238.027 228.983 238.183 228.75C238.339 228.517 238.419 228.244 238.422 227.931C238.419 227.602 238.334 227.311 238.166 227.058C237.999 226.805 237.77 226.606 237.48 226.461C237.193 226.316 236.865 226.244 236.496 226.244C236.124 226.244 235.791 226.316 235.499 226.461C235.209 226.606 234.98 226.805 234.812 227.058C234.648 227.311 234.567 227.602 234.57 227.931C234.567 228.244 234.642 228.517 234.795 228.75C234.952 228.983 235.175 229.163 235.464 229.291C235.754 229.419 236.098 229.483 236.496 229.483ZM236.496 225.341C236.808 225.341 237.085 225.278 237.327 225.153C237.571 225.028 237.763 224.853 237.902 224.629C238.041 224.404 238.112 224.142 238.115 223.841C238.112 223.545 238.043 223.288 237.906 223.069C237.77 222.848 237.581 222.677 237.339 222.558C237.098 222.436 236.817 222.375 236.496 222.375C236.169 222.375 235.884 222.436 235.639 222.558C235.395 222.677 235.206 222.848 235.072 223.069C234.939 223.288 234.874 223.545 234.876 223.841C234.874 224.142 234.94 224.404 235.077 224.629C235.216 224.853 235.408 225.028 235.652 225.153C235.896 225.278 236.178 225.341 236.496 225.341ZM241.368 230.301L245.271 222.579V222.511H240.771V221.574H246.362V222.562L242.475 230.301H241.368ZM250.661 230.42C250.303 230.414 249.945 230.346 249.587 230.216C249.229 230.085 248.902 229.865 248.607 229.555C248.311 229.243 248.074 228.821 247.895 228.289C247.716 227.755 247.626 227.085 247.626 226.278C247.626 225.505 247.699 224.821 247.844 224.224C247.989 223.625 248.199 223.12 248.474 222.711C248.75 222.299 249.082 221.987 249.472 221.774C249.864 221.561 250.305 221.454 250.797 221.454C251.286 221.454 251.72 221.552 252.101 221.748C252.484 221.941 252.797 222.211 253.038 222.558C253.28 222.904 253.436 223.304 253.507 223.755H252.467C252.371 223.363 252.183 223.038 251.905 222.779C251.626 222.521 251.257 222.392 250.797 222.392C250.121 222.392 249.588 222.686 249.199 223.274C248.813 223.862 248.618 224.687 248.615 225.75H248.683C248.842 225.508 249.031 225.302 249.25 225.132C249.472 224.958 249.716 224.825 249.983 224.731C250.25 224.637 250.533 224.591 250.831 224.591C251.331 224.591 251.788 224.716 252.203 224.966C252.618 225.213 252.95 225.555 253.2 225.993C253.45 226.427 253.575 226.926 253.575 227.488C253.575 228.028 253.455 228.522 253.213 228.971C252.972 229.417 252.632 229.772 252.195 230.037C251.76 230.298 251.249 230.426 250.661 230.42ZM250.661 229.483C251.018 229.483 251.339 229.393 251.624 229.214C251.911 229.035 252.136 228.795 252.301 228.494C252.469 228.193 252.553 227.858 252.553 227.488C252.553 227.127 252.472 226.799 252.31 226.504C252.151 226.206 251.93 225.968 251.649 225.792C251.371 225.616 251.053 225.528 250.695 225.528C250.425 225.528 250.173 225.582 249.94 225.69C249.707 225.795 249.503 225.94 249.327 226.125C249.153 226.309 249.017 226.521 248.918 226.76C248.818 226.995 248.768 227.244 248.768 227.505C248.768 227.852 248.849 228.176 249.011 228.477C249.176 228.778 249.401 229.021 249.685 229.206C249.972 229.39 250.297 229.483 250.661 229.483ZM258.029 221.454C258.387 221.457 258.745 221.525 259.103 221.659C259.461 221.792 259.788 222.014 260.083 222.324C260.379 222.63 260.616 223.049 260.795 223.581C260.974 224.112 261.064 224.778 261.064 225.579C261.064 226.355 260.99 227.044 260.842 227.646C260.697 228.245 260.487 228.751 260.211 229.163C259.939 229.575 259.606 229.887 259.214 230.1C258.825 230.314 258.385 230.42 257.893 230.42C257.404 230.42 256.968 230.324 256.585 230.13C256.204 229.934 255.892 229.663 255.647 229.316C255.406 228.967 255.251 228.562 255.183 228.102H256.223C256.316 228.502 256.502 228.833 256.781 229.095C257.062 229.353 257.433 229.483 257.893 229.483C258.566 229.483 259.098 229.189 259.487 228.6C259.879 228.012 260.075 227.181 260.075 226.108H260.007C259.848 226.346 259.659 226.552 259.44 226.725C259.221 226.899 258.978 227.032 258.711 227.126C258.444 227.22 258.16 227.267 257.859 227.267C257.359 227.267 256.9 227.143 256.483 226.896C256.068 226.646 255.735 226.304 255.485 225.869C255.238 225.431 255.115 224.931 255.115 224.369C255.115 223.835 255.234 223.346 255.473 222.903C255.714 222.457 256.052 222.102 256.487 221.838C256.924 221.574 257.439 221.446 258.029 221.454ZM258.029 222.392C257.672 222.392 257.349 222.481 257.062 222.66C256.778 222.836 256.552 223.075 256.385 223.376C256.22 223.674 256.137 224.005 256.137 224.369C256.137 224.733 256.217 225.064 256.376 225.362C256.538 225.657 256.758 225.893 257.037 226.069C257.318 226.243 257.637 226.329 257.995 226.329C258.265 226.329 258.517 226.277 258.75 226.172C258.983 226.064 259.186 225.917 259.359 225.733C259.535 225.545 259.673 225.333 259.772 225.098C259.872 224.859 259.922 224.61 259.922 224.352C259.922 224.011 259.839 223.691 259.674 223.393C259.512 223.095 259.288 222.853 259.001 222.669C258.717 222.484 258.393 222.392 258.029 222.392ZM270.972 218.761V233.113H270.12V218.761H270.972ZM285.091 223.755C285.04 223.324 284.833 222.988 284.469 222.75C284.105 222.511 283.659 222.392 283.131 222.392C282.745 222.392 282.407 222.454 282.117 222.579C281.83 222.704 281.605 222.876 281.444 223.095C281.284 223.314 281.205 223.562 281.205 223.841C281.205 224.074 281.26 224.274 281.371 224.441C281.485 224.606 281.63 224.744 281.806 224.855C281.982 224.963 282.167 225.052 282.36 225.123C282.553 225.191 282.73 225.247 282.892 225.289L283.779 225.528C284.006 225.588 284.259 225.67 284.537 225.775C284.819 225.88 285.087 226.024 285.343 226.206C285.601 226.385 285.814 226.615 285.982 226.896C286.15 227.177 286.233 227.522 286.233 227.931C286.233 228.403 286.11 228.829 285.863 229.21C285.618 229.591 285.26 229.893 284.789 230.118C284.32 230.342 283.75 230.454 283.08 230.454C282.455 230.454 281.914 230.353 281.456 230.152C281.002 229.95 280.644 229.669 280.382 229.308C280.124 228.947 279.978 228.528 279.944 228.051H281.034C281.063 228.38 281.174 228.653 281.367 228.869C281.563 229.082 281.81 229.241 282.108 229.346C282.409 229.449 282.733 229.5 283.08 229.5C283.483 229.5 283.846 229.434 284.167 229.304C284.488 229.17 284.742 228.985 284.929 228.75C285.117 228.511 285.211 228.233 285.211 227.914C285.211 227.625 285.13 227.389 284.968 227.207C284.806 227.025 284.593 226.877 284.328 226.764C284.064 226.65 283.779 226.551 283.472 226.466L282.398 226.159C281.716 225.963 281.176 225.683 280.779 225.319C280.381 224.956 280.182 224.48 280.182 223.892C280.182 223.403 280.314 222.977 280.578 222.613C280.846 222.247 281.203 221.963 281.652 221.761C282.104 221.556 282.608 221.454 283.165 221.454C283.728 221.454 284.228 221.555 284.665 221.757C285.103 221.956 285.449 222.228 285.705 222.575C285.963 222.922 286.1 223.315 286.114 223.755H285.091ZM290.579 230.437C289.948 230.437 289.404 230.298 288.947 230.02C288.492 229.738 288.141 229.346 287.894 228.843C287.65 228.338 287.528 227.75 287.528 227.079C287.528 226.409 287.65 225.818 287.894 225.306C288.141 224.792 288.485 224.392 288.925 224.105C289.369 223.815 289.886 223.67 290.477 223.67C290.817 223.67 291.154 223.727 291.487 223.841C291.819 223.954 292.121 224.139 292.394 224.395C292.667 224.647 292.884 224.983 293.046 225.4C293.208 225.818 293.289 226.332 293.289 226.943V227.369H288.244V226.5H292.266C292.266 226.13 292.192 225.801 292.045 225.511C291.9 225.221 291.692 224.993 291.423 224.825C291.156 224.657 290.84 224.574 290.477 224.574C290.076 224.574 289.729 224.673 289.437 224.872C289.147 225.068 288.924 225.324 288.768 225.639C288.612 225.954 288.533 226.292 288.533 226.653V227.233C288.533 227.727 288.619 228.146 288.789 228.49C288.962 228.831 289.202 229.091 289.509 229.27C289.816 229.446 290.173 229.534 290.579 229.534C290.843 229.534 291.082 229.497 291.295 229.423C291.511 229.346 291.697 229.233 291.853 229.082C292.009 228.929 292.13 228.738 292.215 228.511L293.187 228.784C293.085 229.113 292.913 229.403 292.671 229.653C292.43 229.9 292.131 230.093 291.776 230.233C291.421 230.369 291.022 230.437 290.579 230.437ZM297.478 230.437C296.864 230.437 296.336 230.292 295.893 230.002C295.45 229.713 295.109 229.314 294.87 228.805C294.631 228.297 294.512 227.716 294.512 227.062C294.512 226.397 294.634 225.811 294.879 225.302C295.126 224.791 295.469 224.392 295.91 224.105C296.353 223.815 296.87 223.67 297.461 223.67C297.921 223.67 298.336 223.755 298.705 223.926C299.075 224.096 299.377 224.335 299.613 224.642C299.849 224.949 299.995 225.306 300.052 225.716H299.046C298.969 225.417 298.799 225.153 298.535 224.923C298.273 224.69 297.921 224.574 297.478 224.574C297.086 224.574 296.742 224.676 296.447 224.88C296.154 225.082 295.925 225.368 295.761 225.737C295.599 226.103 295.518 226.534 295.518 227.028C295.518 227.534 295.597 227.974 295.756 228.349C295.918 228.724 296.146 229.015 296.438 229.223C296.734 229.43 297.08 229.534 297.478 229.534C297.739 229.534 297.977 229.488 298.19 229.397C298.403 229.306 298.583 229.176 298.731 229.005C298.879 228.835 298.984 228.63 299.046 228.392H300.052C299.995 228.778 299.854 229.126 299.63 229.436C299.408 229.743 299.114 229.987 298.748 230.169C298.384 230.348 297.961 230.437 297.478 230.437ZM306.039 230.301V231.238H300.585V230.301H306.039ZM307.084 230.301V221.574H308.141V229.363H312.198V230.301H307.084ZM313.372 221.574L315.963 228.92H316.065L318.656 221.574H319.764L316.559 230.301H315.468L312.264 221.574H313.372ZM321.123 230.301V221.574H322.18V229.363H326.237V230.301H321.123ZM328.47 229.184C328.26 229.184 328.079 229.109 327.929 228.958C327.778 228.808 327.703 228.627 327.703 228.417C327.703 228.207 327.778 228.027 327.929 227.876C328.079 227.725 328.26 227.65 328.47 227.65C328.68 227.65 328.86 227.725 329.011 227.876C329.162 228.027 329.237 228.207 329.237 228.417C329.237 228.556 329.201 228.684 329.13 228.801C329.062 228.917 328.97 229.011 328.853 229.082C328.74 229.15 328.612 229.184 328.47 229.184ZM328.47 224.77C328.26 224.77 328.079 224.694 327.929 224.544C327.778 224.393 327.703 224.213 327.703 224.002C327.703 223.792 327.778 223.612 327.929 223.461C328.079 223.311 328.26 223.235 328.47 223.235C328.68 223.235 328.86 223.311 329.011 223.461C329.162 223.612 329.237 223.792 329.237 224.002C329.237 224.142 329.201 224.27 329.13 224.386C329.062 224.502 328.97 224.596 328.853 224.667C328.74 224.735 328.612 224.77 328.47 224.77ZM337.57 228.511V227.642L341.405 221.574H342.036V222.92H341.61L338.712 227.505V227.574H343.877V228.511H337.57ZM341.678 230.301V228.247V227.842V221.574H342.684V230.301H341.678Z" fill="#53585C" />
                          <circle cx="138.297" cy="200.301" r="37.5" fill="#141414" stroke="url(#paint2_linear_agent1)" />
                          <path d="M138.799 197.718C142.205 197.718 144.966 194.957 144.966 191.551C144.966 188.146 142.205 185.385 138.799 185.385C135.394 185.385 132.633 188.146 132.633 191.551C132.633 194.957 135.394 197.718 138.799 197.718Z" fill="#D09D00" />
                          <path d="M151.128 209.279C151.128 213.11 151.128 216.217 138.794 216.217C126.461 216.217 126.461 213.11 126.461 209.279C126.461 205.448 131.983 202.342 138.794 202.342C145.605 202.342 151.128 205.448 151.128 209.279Z" fill="#D09D00" />
                          <g filter="url(#filter1_d_agent1)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shape-rendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shape-rendering="crispEdges" />
                            <path d="M86.3537 334.301V325.574H89.3026C89.9844 325.574 90.544 325.69 90.9815 325.923C91.419 326.153 91.7429 326.47 91.9531 326.873C92.1634 327.277 92.2685 327.735 92.2685 328.25C92.2685 328.764 92.1634 329.22 91.9531 329.618C91.7429 330.015 91.4205 330.328 90.9858 330.555C90.5511 330.779 89.9957 330.892 89.3196 330.892H86.9332V329.937H89.2855C89.7514 329.937 90.1264 329.869 90.4105 329.733C90.6974 329.596 90.9048 329.403 91.0327 329.153C91.1634 328.9 91.2287 328.599 91.2287 328.25C91.2287 327.9 91.1634 327.595 91.0327 327.333C90.902 327.072 90.6932 326.87 90.4062 326.728C90.1193 326.583 89.7401 326.511 89.2685 326.511H87.4105V334.301H86.3537ZM90.4616 330.38L92.6094 334.301H91.3821L89.2685 330.38H90.4616ZM96.5671 334.437C95.9364 334.437 95.3924 334.298 94.935 334.02C94.4805 333.738 94.1296 333.346 93.8825 332.843C93.6381 332.338 93.516 331.75 93.516 331.079C93.516 330.409 93.6381 329.818 93.8825 329.306C94.1296 328.792 94.4734 328.392 94.9137 328.105C95.3569 327.815 95.8739 327.67 96.4648 327.67C96.8058 327.67 97.1424 327.727 97.4748 327.841C97.8072 327.954 98.1097 328.139 98.3825 328.395C98.6552 328.647 98.8725 328.983 99.0344 329.4C99.1964 329.818 99.2773 330.332 99.2773 330.943V331.369H94.2319V330.5H98.2546C98.2546 330.13 98.1808 329.801 98.033 329.511C97.8881 329.221 97.6808 328.993 97.4109 328.825C97.1438 328.657 96.8285 328.574 96.4648 328.574C96.0643 328.574 95.7177 328.673 95.4251 328.872C95.1353 329.068 94.9123 329.324 94.756 329.639C94.5998 329.954 94.5217 330.292 94.5217 330.653V331.233C94.5217 331.727 94.6069 332.146 94.7773 332.49C94.9506 332.831 95.1907 333.091 95.4975 333.27C95.8043 333.446 96.1609 333.534 96.5671 333.534C96.8313 333.534 97.07 333.497 97.283 333.423C97.4989 333.346 97.685 333.233 97.8413 333.082C97.9975 332.929 98.1183 332.738 98.2035 332.511L99.1751 332.784C99.0728 333.113 98.9009 333.403 98.6594 333.653C98.418 333.9 98.1197 334.093 97.7646 334.233C97.4094 334.369 97.0103 334.437 96.5671 334.437ZM103.449 336.892C102.963 336.892 102.546 336.829 102.196 336.704C101.847 336.582 101.556 336.42 101.323 336.218C101.093 336.02 100.909 335.806 100.773 335.579L101.574 335.017C101.665 335.136 101.78 335.272 101.919 335.426C102.059 335.582 102.249 335.717 102.49 335.831C102.735 335.947 103.054 336.005 103.449 336.005C103.978 336.005 104.414 335.877 104.757 335.622C105.101 335.366 105.273 334.966 105.273 334.42V333.091H105.188C105.114 333.21 105.009 333.358 104.873 333.534C104.739 333.707 104.546 333.862 104.293 333.998C104.043 334.132 103.705 334.199 103.279 334.199C102.75 334.199 102.276 334.074 101.855 333.824C101.438 333.574 101.107 333.21 100.863 332.733C100.621 332.255 100.5 331.676 100.5 330.994C100.5 330.324 100.618 329.74 100.854 329.243C101.09 328.743 101.418 328.356 101.838 328.083C102.259 327.808 102.745 327.67 103.296 327.67C103.722 327.67 104.06 327.741 104.31 327.883C104.563 328.022 104.756 328.181 104.89 328.36C105.026 328.537 105.131 328.681 105.205 328.795H105.307V327.755H106.279V334.488C106.279 335.051 106.151 335.508 105.895 335.86C105.642 336.216 105.301 336.475 104.873 336.64C104.446 336.808 103.972 336.892 103.449 336.892ZM103.415 333.295C103.819 333.295 104.159 333.203 104.438 333.018C104.716 332.833 104.928 332.568 105.073 332.221C105.218 331.875 105.29 331.46 105.29 330.977C105.29 330.505 105.219 330.089 105.077 329.728C104.935 329.368 104.725 329.085 104.446 328.88C104.168 328.676 103.824 328.574 103.415 328.574C102.989 328.574 102.634 328.681 102.35 328.897C102.069 329.113 101.857 329.403 101.715 329.767C101.576 330.13 101.506 330.534 101.506 330.977C101.506 331.431 101.577 331.833 101.719 332.183C101.864 332.529 102.077 332.802 102.358 333.001C102.642 333.197 102.995 333.295 103.415 333.295ZM108.12 334.301V327.755H109.125V334.301H108.12ZM108.631 326.664C108.435 326.664 108.266 326.598 108.124 326.464C107.985 326.331 107.915 326.17 107.915 325.983C107.915 325.795 107.985 325.635 108.124 325.501C108.266 325.368 108.435 325.301 108.631 325.301C108.827 325.301 108.995 325.368 109.134 325.501C109.276 325.635 109.347 325.795 109.347 325.983C109.347 326.17 109.276 326.331 109.134 326.464C108.995 326.598 108.827 326.664 108.631 326.664ZM115.604 329.221L114.7 329.477C114.643 329.326 114.56 329.18 114.449 329.038C114.341 328.893 114.193 328.774 114.006 328.68C113.818 328.586 113.578 328.539 113.286 328.539C112.885 328.539 112.551 328.632 112.284 328.816C112.02 328.998 111.888 329.23 111.888 329.511C111.888 329.761 111.979 329.958 112.161 330.103C112.342 330.248 112.626 330.369 113.013 330.466L113.984 330.704C114.57 330.846 115.006 331.064 115.293 331.356C115.58 331.646 115.723 332.02 115.723 332.477C115.723 332.852 115.615 333.187 115.399 333.483C115.186 333.778 114.888 334.011 114.504 334.181C114.121 334.352 113.675 334.437 113.166 334.437C112.499 334.437 111.946 334.292 111.509 334.002C111.071 333.713 110.794 333.289 110.678 332.733L111.632 332.494C111.723 332.846 111.895 333.11 112.148 333.287C112.403 333.463 112.737 333.551 113.149 333.551C113.618 333.551 113.99 333.451 114.266 333.252C114.544 333.051 114.683 332.809 114.683 332.528C114.683 332.301 114.604 332.11 114.445 331.957C114.286 331.801 114.041 331.684 113.712 331.608L112.621 331.352C112.021 331.21 111.581 330.99 111.3 330.691C111.021 330.39 110.882 330.014 110.882 329.562C110.882 329.193 110.986 328.866 111.193 328.582C111.403 328.298 111.689 328.075 112.05 327.913C112.413 327.751 112.825 327.67 113.286 327.67C113.933 327.67 114.442 327.812 114.811 328.096C115.183 328.38 115.447 328.755 115.604 329.221ZM120.083 327.755V328.608H116.691V327.755H120.083ZM117.68 326.187H118.686V332.426C118.686 332.71 118.727 332.923 118.809 333.065C118.895 333.204 119.002 333.298 119.133 333.346C119.267 333.392 119.407 333.414 119.555 333.414C119.666 333.414 119.757 333.409 119.828 333.397C119.899 333.383 119.956 333.372 119.998 333.363L120.203 334.267C120.135 334.292 120.039 334.318 119.917 334.343C119.795 334.372 119.64 334.386 119.453 334.386C119.169 334.386 118.89 334.325 118.618 334.203C118.348 334.081 118.123 333.895 117.944 333.645C117.768 333.395 117.68 333.079 117.68 332.699V326.187ZM124.27 334.437C123.64 334.437 123.096 334.298 122.638 334.02C122.184 333.738 121.833 333.346 121.586 332.843C121.341 332.338 121.219 331.75 121.219 331.079C121.219 330.409 121.341 329.818 121.586 329.306C121.833 328.792 122.176 328.392 122.617 328.105C123.06 327.815 123.577 327.67 124.168 327.67C124.509 327.67 124.846 327.727 125.178 327.841C125.51 327.954 125.813 328.139 126.086 328.395C126.358 328.647 126.576 328.983 126.738 329.4C126.9 329.818 126.98 330.332 126.98 330.943V331.369H121.935V330.5H125.958C125.958 330.13 125.884 329.801 125.736 329.511C125.591 329.221 125.384 328.993 125.114 328.825C124.847 328.657 124.532 328.574 124.168 328.574C123.767 328.574 123.421 328.673 123.128 328.872C122.838 329.068 122.615 329.324 122.459 329.639C122.303 329.954 122.225 330.292 122.225 330.653V331.233C122.225 331.727 122.31 332.146 122.48 332.49C122.654 332.831 122.894 333.091 123.201 333.27C123.507 333.446 123.864 333.534 124.27 333.534C124.534 333.534 124.773 333.497 124.986 333.423C125.202 333.346 125.388 333.233 125.544 333.082C125.701 332.929 125.821 332.738 125.907 332.511L126.878 332.784C126.776 333.113 126.604 333.403 126.363 333.653C126.121 333.9 125.823 334.093 125.468 334.233C125.113 334.369 124.713 334.437 124.27 334.437ZM128.51 334.301V327.755H129.482V328.744H129.55C129.669 328.42 129.885 328.157 130.198 327.956C130.51 327.754 130.863 327.653 131.255 327.653C131.328 327.653 131.421 327.654 131.532 327.657C131.642 327.66 131.726 327.664 131.783 327.67V328.693C131.749 328.684 131.671 328.672 131.549 328.654C131.429 328.635 131.303 328.625 131.169 328.625C130.851 328.625 130.567 328.691 130.317 328.825C130.07 328.956 129.874 329.137 129.729 329.37C129.587 329.6 129.516 329.863 129.516 330.159V334.301H128.51ZM135.52 334.437C134.89 334.437 134.346 334.298 133.888 334.02C133.434 333.738 133.083 333.346 132.836 332.843C132.591 332.338 132.469 331.75 132.469 331.079C132.469 330.409 132.591 329.818 132.836 329.306C133.083 328.792 133.426 328.392 133.867 328.105C134.31 327.815 134.827 327.67 135.418 327.67C135.759 327.67 136.096 327.727 136.428 327.841C136.76 327.954 137.063 328.139 137.336 328.395C137.608 328.647 137.826 328.983 137.988 329.4C138.15 329.818 138.23 330.332 138.23 330.943V331.369H133.185V330.5H137.208C137.208 330.13 137.134 329.801 136.986 329.511C136.841 329.221 136.634 328.993 136.364 328.825C136.097 328.657 135.782 328.574 135.418 328.574C135.017 328.574 134.671 328.673 134.378 328.872C134.088 329.068 133.865 329.324 133.709 329.639C133.553 329.954 133.475 330.292 133.475 330.653V331.233C133.475 331.727 133.56 332.146 133.73 332.49C133.904 332.831 134.144 333.091 134.451 333.27C134.757 333.446 135.114 333.534 135.52 333.534C135.784 333.534 136.023 333.497 136.236 333.423C136.452 333.346 136.638 333.233 136.794 333.082C136.951 332.929 137.071 332.738 137.157 332.511L138.128 332.784C138.026 333.113 137.854 333.403 137.613 333.653C137.371 333.9 137.073 334.093 136.718 334.233C136.363 334.369 135.963 334.437 135.52 334.437ZM142.232 334.437C141.686 334.437 141.205 334.299 140.787 334.024C140.37 333.745 140.043 333.353 139.807 332.848C139.571 332.339 139.453 331.738 139.453 331.045C139.453 330.358 139.571 329.761 139.807 329.255C140.043 328.75 140.371 328.359 140.792 328.083C141.212 327.808 141.698 327.67 142.249 327.67C142.675 327.67 143.012 327.741 143.259 327.883C143.509 328.022 143.699 328.181 143.83 328.36C143.963 328.537 144.067 328.681 144.141 328.795H144.226V325.574H145.232V334.301H144.26V333.295H144.141C144.067 333.414 143.962 333.565 143.826 333.747C143.689 333.926 143.495 334.086 143.242 334.228C142.989 334.368 142.652 334.437 142.232 334.437ZM142.368 333.534C142.772 333.534 143.113 333.429 143.391 333.218C143.669 333.005 143.881 332.711 144.026 332.336C144.171 331.958 144.243 331.522 144.243 331.028C144.243 330.539 144.172 330.112 144.03 329.745C143.888 329.376 143.678 329.089 143.4 328.885C143.121 328.677 142.777 328.574 142.368 328.574C141.942 328.574 141.587 328.683 141.303 328.902C141.022 329.118 140.81 329.412 140.668 329.784C140.529 330.153 140.459 330.568 140.459 331.028C140.459 331.494 140.53 331.917 140.672 332.298C140.817 332.676 141.03 332.977 141.311 333.201C141.596 333.423 141.948 333.534 142.368 333.534Z" fill="#CFD6E1" />
                          </g>
                          <g filter="url(#filter2_d_agent1)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shape-rendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shape-rendering="crispEdges" />
                            <path d="M229.212 325.574L231.803 332.92H231.905L234.496 325.574H235.604L232.399 334.301H231.308L228.104 325.574H229.212ZM238.962 334.437C238.331 334.437 237.787 334.298 237.33 334.02C236.875 333.738 236.524 333.346 236.277 332.843C236.033 332.338 235.911 331.75 235.911 331.079C235.911 330.409 236.033 329.818 236.277 329.306C236.524 328.792 236.868 328.392 237.308 328.105C237.751 327.815 238.268 327.67 238.859 327.67C239.2 327.67 239.537 327.727 239.869 327.841C240.202 327.954 240.504 328.139 240.777 328.395C241.05 328.647 241.267 328.983 241.429 329.4C241.591 329.818 241.672 330.332 241.672 330.943V331.369H236.626V330.5H240.649C240.649 330.13 240.575 329.801 240.428 329.511C240.283 329.221 240.075 328.993 239.805 328.825C239.538 328.657 239.223 328.574 238.859 328.574C238.459 328.574 238.112 328.673 237.82 328.872C237.53 329.068 237.307 329.324 237.151 329.639C236.994 329.954 236.916 330.292 236.916 330.653V331.233C236.916 331.727 237.001 332.146 237.172 332.49C237.345 332.831 237.585 333.091 237.892 333.27C238.199 333.446 238.555 333.534 238.962 333.534C239.226 333.534 239.464 333.497 239.678 333.423C239.893 333.346 240.08 333.233 240.236 333.082C240.392 332.929 240.513 332.738 240.598 332.511L241.57 332.784C241.467 333.113 241.295 333.403 241.054 333.653C240.813 333.9 240.514 334.093 240.159 334.233C239.804 334.369 239.405 334.437 238.962 334.437ZM243.202 334.301V327.755H244.173V328.744H244.241C244.361 328.42 244.577 328.157 244.889 327.956C245.202 327.754 245.554 327.653 245.946 327.653C246.02 327.653 246.112 327.654 246.223 327.657C246.334 327.66 246.418 327.664 246.474 327.67V328.693C246.44 328.684 246.362 328.672 246.24 328.654C246.121 328.635 245.994 328.625 245.861 328.625C245.543 328.625 245.259 328.691 245.009 328.825C244.761 328.956 244.565 329.137 244.42 329.37C244.278 329.6 244.207 329.863 244.207 330.159V334.301H243.202ZM247.667 334.301V327.755H248.672V334.301H247.667ZM248.178 326.664C247.982 326.664 247.813 326.598 247.671 326.464C247.532 326.331 247.462 326.17 247.462 325.983C247.462 325.795 247.532 325.635 247.671 325.501C247.813 325.368 247.982 325.301 248.178 325.301C248.374 325.301 248.542 325.368 248.681 325.501C248.823 325.635 248.894 325.795 248.894 325.983C248.894 326.17 248.823 326.331 248.681 326.464C248.542 326.598 248.374 326.664 248.178 326.664ZM253.429 327.755V328.608H249.901V327.755H253.429ZM250.957 334.301V326.852C250.957 326.477 251.045 326.164 251.222 325.914C251.398 325.664 251.626 325.477 251.908 325.352C252.189 325.227 252.486 325.164 252.798 325.164C253.045 325.164 253.247 325.184 253.403 325.224C253.56 325.264 253.676 325.301 253.753 325.335L253.463 326.204C253.412 326.187 253.341 326.166 253.25 326.14C253.162 326.115 253.045 326.102 252.901 326.102C252.568 326.102 252.328 326.186 252.18 326.353C252.036 326.521 251.963 326.767 251.963 327.091V334.301H250.957ZM254.838 334.301V327.755H255.844V334.301H254.838ZM255.35 326.664C255.154 326.664 254.985 326.598 254.843 326.464C254.703 326.331 254.634 326.17 254.634 325.983C254.634 325.795 254.703 325.635 254.843 325.501C254.985 325.368 255.154 325.301 255.35 325.301C255.546 325.301 255.713 325.368 255.853 325.501C255.995 325.635 256.066 325.795 256.066 325.983C256.066 326.17 255.995 326.331 255.853 326.464C255.713 326.598 255.546 326.664 255.35 326.664ZM260.43 334.437C259.8 334.437 259.256 334.298 258.798 334.02C258.344 333.738 257.993 333.346 257.746 332.843C257.501 332.338 257.379 331.75 257.379 331.079C257.379 330.409 257.501 329.818 257.746 329.306C257.993 328.792 258.337 328.392 258.777 328.105C259.22 327.815 259.737 327.67 260.328 327.67C260.669 327.67 261.006 327.727 261.338 327.841C261.67 327.954 261.973 328.139 262.246 328.395C262.518 328.647 262.736 328.983 262.898 329.4C263.06 329.818 263.141 330.332 263.141 330.943V331.369H258.095V330.5H262.118C262.118 330.13 262.044 329.801 261.896 329.511C261.751 329.221 261.544 328.993 261.274 328.825C261.007 328.657 260.692 328.574 260.328 328.574C259.928 328.574 259.581 328.673 259.288 328.872C258.999 329.068 258.776 329.324 258.619 329.639C258.463 329.954 258.385 330.292 258.385 330.653V331.233C258.385 331.727 258.47 332.146 258.641 332.49C258.814 332.831 259.054 333.091 259.361 333.27C259.668 333.446 260.024 333.534 260.43 333.534C260.695 333.534 260.933 333.497 261.146 333.423C261.362 333.346 261.548 333.233 261.705 333.082C261.861 332.929 261.982 332.738 262.067 332.511L263.038 332.784C262.936 333.113 262.764 333.403 262.523 333.653C262.281 333.9 261.983 334.093 261.628 334.233C261.273 334.369 260.874 334.437 260.43 334.437ZM267.142 334.437C266.597 334.437 266.115 334.299 265.697 334.024C265.28 333.745 264.953 333.353 264.717 332.848C264.482 332.339 264.364 331.738 264.364 331.045C264.364 330.358 264.482 329.761 264.717 329.255C264.953 328.75 265.281 328.359 265.702 328.083C266.122 327.808 266.608 327.67 267.159 327.67C267.585 327.67 267.922 327.741 268.169 327.883C268.419 328.022 268.609 328.181 268.74 328.36C268.874 328.537 268.977 328.681 269.051 328.795H269.136V325.574H270.142V334.301H269.17V333.295H269.051C268.977 333.414 268.872 333.565 268.736 333.747C268.599 333.926 268.405 334.086 268.152 334.228C267.899 334.368 267.563 334.437 267.142 334.437ZM267.278 333.534C267.682 333.534 268.023 333.429 268.301 333.218C268.58 333.005 268.791 332.711 268.936 332.336C269.081 331.958 269.153 331.522 269.153 331.028C269.153 330.539 269.082 330.112 268.94 329.745C268.798 329.376 268.588 329.089 268.31 328.885C268.031 328.677 267.688 328.574 267.278 328.574C266.852 328.574 266.497 328.683 266.213 328.902C265.932 329.118 265.72 329.412 265.578 329.784C265.439 330.153 265.369 330.568 265.369 331.028C265.369 331.494 265.44 331.917 265.582 332.298C265.727 332.676 265.94 332.977 266.222 333.201C266.506 333.423 266.858 333.534 267.278 333.534Z" fill="#CFD6E1" />
                          </g>
                          <g filter="url(#filter3_d_agent1)">
                            <rect x="336.297" y="316.301" width="92" height="28" rx="6" fill="#141516" shape-rendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="91" height="27" rx="5.5" stroke="#262728" shape-rendering="crispEdges" />
                            <path d="M345.354 334.301V325.574H348.405C349.013 325.574 349.514 325.679 349.909 325.889C350.304 326.096 350.598 326.376 350.791 326.728C350.984 327.078 351.081 327.466 351.081 327.892C351.081 328.267 351.014 328.576 350.881 328.821C350.75 329.065 350.577 329.258 350.361 329.4C350.148 329.542 349.916 329.647 349.666 329.716V329.801C349.933 329.818 350.202 329.912 350.472 330.082C350.741 330.252 350.967 330.497 351.149 330.815C351.331 331.133 351.422 331.522 351.422 331.983C351.422 332.42 351.322 332.814 351.124 333.163C350.925 333.512 350.611 333.789 350.182 333.994C349.753 334.199 349.195 334.301 348.507 334.301H345.354ZM346.411 333.363H348.507C349.197 333.363 349.688 333.23 349.977 332.963C350.27 332.693 350.416 332.366 350.416 331.983C350.416 331.687 350.341 331.414 350.19 331.164C350.04 330.912 349.825 330.71 349.547 330.559C349.268 330.406 348.939 330.329 348.558 330.329H346.411V333.363ZM346.411 329.409H348.371C348.689 329.409 348.976 329.346 349.232 329.221C349.49 329.096 349.695 328.92 349.845 328.693C349.999 328.466 350.075 328.199 350.075 327.892C350.075 327.508 349.942 327.183 349.675 326.916C349.408 326.646 348.984 326.511 348.405 326.511H346.411V329.409ZM354.948 334.454C354.533 334.454 354.157 334.376 353.819 334.22C353.481 334.061 353.212 333.832 353.013 333.534C352.815 333.233 352.715 332.869 352.715 332.443C352.715 332.068 352.789 331.764 352.937 331.531C353.085 331.295 353.282 331.11 353.529 330.977C353.776 330.843 354.049 330.744 354.347 330.679C354.648 330.61 354.951 330.556 355.255 330.517C355.653 330.466 355.975 330.427 356.222 330.402C356.472 330.373 356.654 330.326 356.768 330.261C356.884 330.196 356.942 330.082 356.942 329.92V329.886C356.942 329.466 356.827 329.139 356.597 328.906C356.37 328.673 356.025 328.556 355.562 328.556C355.082 328.556 354.705 328.662 354.433 328.872C354.16 329.082 353.968 329.306 353.857 329.545L352.903 329.204C353.073 328.806 353.3 328.497 353.585 328.275C353.871 328.051 354.184 327.895 354.522 327.806C354.863 327.716 355.198 327.67 355.528 327.67C355.738 327.67 355.979 327.696 356.252 327.747C356.528 327.795 356.793 327.896 357.049 328.049C357.308 328.203 357.522 328.434 357.692 328.744C357.863 329.054 357.948 329.468 357.948 329.988V334.301H356.942V333.414H356.891C356.823 333.556 356.71 333.708 356.55 333.87C356.391 334.032 356.18 334.17 355.915 334.284C355.651 334.397 355.329 334.454 354.948 334.454ZM355.102 333.551C355.499 333.551 355.835 333.473 356.107 333.316C356.383 333.16 356.59 332.958 356.729 332.711C356.871 332.464 356.942 332.204 356.942 331.931V331.011C356.9 331.062 356.806 331.109 356.661 331.152C356.519 331.191 356.354 331.227 356.167 331.258C355.982 331.287 355.802 331.312 355.626 331.335C355.452 331.355 355.312 331.372 355.204 331.386C354.942 331.42 354.698 331.475 354.471 331.552C354.246 331.626 354.065 331.738 353.925 331.889C353.789 332.037 353.721 332.238 353.721 332.494C353.721 332.843 353.85 333.108 354.109 333.287C354.37 333.463 354.701 333.551 355.102 333.551ZM362.255 334.437C361.71 334.437 361.228 334.299 360.811 334.024C360.393 333.745 360.066 333.353 359.831 332.848C359.595 332.339 359.477 331.738 359.477 331.045C359.477 330.358 359.595 329.761 359.831 329.255C360.066 328.75 360.395 328.359 360.815 328.083C361.235 327.808 361.721 327.67 362.272 327.67C362.699 327.67 363.035 327.741 363.282 327.883C363.532 328.022 363.723 328.181 363.853 328.36C363.987 328.537 364.091 328.681 364.164 328.795H364.25V325.574H365.255V334.301H364.284V333.295H364.164C364.091 333.414 363.985 333.565 363.849 333.747C363.713 333.926 363.518 334.086 363.265 334.228C363.012 334.368 362.676 334.437 362.255 334.437ZM362.392 333.534C362.795 333.534 363.136 333.429 363.414 333.218C363.693 333.005 363.904 332.711 364.049 332.336C364.194 331.958 364.267 331.522 364.267 331.028C364.267 330.539 364.196 330.112 364.054 329.745C363.912 329.376 363.701 329.089 363.423 328.885C363.145 328.677 362.801 328.574 362.392 328.574C361.966 328.574 361.61 328.683 361.326 328.902C361.045 329.118 360.833 329.412 360.691 329.784C360.552 330.153 360.483 330.568 360.483 331.028C360.483 331.494 360.554 331.917 360.696 332.298C360.841 332.676 361.054 332.977 361.335 333.201C361.619 333.423 361.971 333.534 362.392 333.534ZM369.879 336.892C369.393 336.892 368.975 336.829 368.626 336.704C368.277 336.582 367.985 336.42 367.752 336.218C367.522 336.02 367.339 335.806 367.203 335.579L368.004 335.017C368.095 335.136 368.21 335.272 368.349 335.426C368.488 335.582 368.679 335.717 368.92 335.831C369.164 335.947 369.484 336.005 369.879 336.005C370.407 336.005 370.843 335.877 371.187 335.622C371.531 335.366 371.703 334.966 371.703 334.42V333.091H371.618C371.544 333.21 371.439 333.358 371.302 333.534C371.169 333.707 370.975 333.862 370.723 333.998C370.473 334.132 370.135 334.199 369.708 334.199C369.18 334.199 368.706 334.074 368.285 333.824C367.868 333.574 367.537 333.21 367.292 332.733C367.051 332.255 366.93 331.676 366.93 330.994C366.93 330.324 367.048 329.74 367.284 329.243C367.52 328.743 367.848 328.356 368.268 328.083C368.689 327.808 369.174 327.67 369.725 327.67C370.152 327.67 370.49 327.741 370.74 327.883C370.993 328.022 371.186 328.181 371.319 328.36C371.456 328.537 371.561 328.681 371.635 328.795H371.737V327.755H372.708V334.488C372.708 335.051 372.581 335.508 372.325 335.86C372.072 336.216 371.731 336.475 371.302 336.64C370.876 336.808 370.402 336.892 369.879 336.892ZM369.845 333.295C370.248 333.295 370.589 333.203 370.868 333.018C371.146 332.833 371.358 332.568 371.502 332.221C371.647 331.875 371.72 331.46 371.72 330.977C371.72 330.505 371.649 330.089 371.507 329.728C371.365 329.368 371.154 329.085 370.876 328.88C370.598 328.676 370.254 328.574 369.845 328.574C369.419 328.574 369.064 328.681 368.779 328.897C368.498 329.113 368.287 329.403 368.145 329.767C368.005 330.13 367.936 330.534 367.936 330.977C367.936 331.431 368.007 331.833 368.149 332.183C368.294 332.529 368.507 332.802 368.788 333.001C369.072 333.197 369.424 333.295 369.845 333.295ZM377.294 334.437C376.663 334.437 376.119 334.298 375.662 334.02C375.207 333.738 374.856 333.346 374.609 332.843C374.365 332.338 374.243 331.75 374.243 331.079C374.243 330.409 374.365 329.818 374.609 329.306C374.856 328.792 375.2 328.392 375.64 328.105C376.083 327.815 376.6 327.67 377.191 327.67C377.532 327.67 377.869 327.727 378.201 327.841C378.534 327.954 378.836 328.139 379.109 328.395C379.382 328.647 379.599 328.983 379.761 329.4C379.923 329.818 380.004 330.332 380.004 330.943V331.369H374.958V330.5H378.981C378.981 330.13 378.907 329.801 378.76 329.511C378.615 329.221 378.407 328.993 378.137 328.825C377.87 328.657 377.555 328.574 377.191 328.574C376.791 328.574 376.444 328.673 376.152 328.872C375.862 329.068 375.639 329.324 375.483 329.639C375.326 329.954 375.248 330.292 375.248 330.653V331.233C375.248 331.727 375.333 332.146 375.504 332.49C375.677 332.831 375.917 333.091 376.224 333.27C376.531 333.446 376.887 333.534 377.294 333.534C377.558 333.534 377.797 333.497 378.01 333.423C378.225 333.346 378.412 333.233 378.568 333.082C378.724 332.929 378.845 332.738 378.93 332.511L379.902 332.784C379.799 333.113 379.627 333.403 379.386 333.653C379.145 333.9 378.846 334.093 378.491 334.233C378.136 334.369 377.737 334.437 377.294 334.437ZM386.102 325.574V334.301H385.045V325.574H386.102ZM392.721 329.221L391.817 329.477C391.761 329.326 391.677 329.18 391.566 329.038C391.458 328.893 391.31 328.774 391.123 328.68C390.935 328.586 390.695 328.539 390.403 328.539C390.002 328.539 389.668 328.632 389.401 328.816C389.137 328.998 389.005 329.23 389.005 329.511C389.005 329.761 389.096 329.958 389.278 330.103C389.46 330.248 389.744 330.369 390.13 330.466L391.102 330.704C391.687 330.846 392.123 331.064 392.41 331.356C392.697 331.646 392.84 332.02 392.84 332.477C392.84 332.852 392.732 333.187 392.516 333.483C392.303 333.778 392.005 334.011 391.621 334.181C391.238 334.352 390.792 334.437 390.283 334.437C389.616 334.437 389.063 334.292 388.626 334.002C388.188 333.713 387.911 333.289 387.795 332.733L388.749 332.494C388.84 332.846 389.012 333.11 389.265 333.287C389.521 333.463 389.854 333.551 390.266 333.551C390.735 333.551 391.107 333.451 391.383 333.252C391.661 333.051 391.8 332.809 391.8 332.528C391.8 332.301 391.721 332.11 391.562 331.957C391.403 331.801 391.158 331.684 390.829 331.608L389.738 331.352C389.138 331.21 388.698 330.99 388.417 330.691C388.138 330.39 387.999 330.014 387.999 329.562C387.999 329.193 388.103 328.866 388.31 328.582C388.521 328.298 388.806 328.075 389.167 327.913C389.531 327.751 389.942 327.67 390.403 327.67C391.05 327.67 391.559 327.812 391.928 328.096C392.3 328.38 392.565 328.755 392.721 329.221ZM398.99 329.221L398.087 329.477C398.03 329.326 397.946 329.18 397.836 329.038C397.728 328.893 397.58 328.774 397.392 328.68C397.205 328.586 396.965 328.539 396.672 328.539C396.272 328.539 395.938 328.632 395.671 328.816C395.407 328.998 395.275 329.23 395.275 329.511C395.275 329.761 395.365 329.958 395.547 330.103C395.729 330.248 396.013 330.369 396.4 330.466L397.371 330.704C397.956 330.846 398.392 331.064 398.679 331.356C398.966 331.646 399.11 332.02 399.11 332.477C399.11 332.852 399.002 333.187 398.786 333.483C398.573 333.778 398.275 334.011 397.891 334.181C397.507 334.352 397.061 334.437 396.553 334.437C395.885 334.437 395.333 334.292 394.895 334.002C394.458 333.713 394.181 333.289 394.064 332.733L395.019 332.494C395.11 332.846 395.282 333.11 395.534 333.287C395.79 333.463 396.124 333.551 396.536 333.551C397.005 333.551 397.377 333.451 397.652 333.252C397.931 333.051 398.07 332.809 398.07 332.528C398.07 332.301 397.99 332.11 397.831 331.957C397.672 331.801 397.428 331.684 397.098 331.608L396.007 331.352C395.408 331.21 394.968 330.99 394.686 330.691C394.408 330.39 394.269 330.014 394.269 329.562C394.269 329.193 394.373 328.866 394.58 328.582C394.79 328.298 395.076 328.075 395.436 327.913C395.8 327.751 396.212 327.67 396.672 327.67C397.32 327.67 397.828 327.812 398.198 328.096C398.57 328.38 398.834 328.755 398.99 329.221ZM404.749 331.625V327.755H405.754V334.301H404.749V333.193H404.68C404.527 333.525 404.288 333.808 403.964 334.041C403.641 334.271 403.232 334.386 402.737 334.386C402.328 334.386 401.964 334.297 401.646 334.118C401.328 333.936 401.078 333.663 400.896 333.299C400.714 332.933 400.624 332.471 400.624 331.914V327.755H401.629V331.846C401.629 332.324 401.763 332.704 402.03 332.988C402.3 333.272 402.643 333.414 403.061 333.414C403.311 333.414 403.565 333.35 403.824 333.223C404.085 333.095 404.304 332.899 404.48 332.635C404.659 332.37 404.749 332.034 404.749 331.625ZM410.341 334.437C409.71 334.437 409.166 334.298 408.708 334.02C408.254 333.738 407.903 333.346 407.656 332.843C407.412 332.338 407.289 331.75 407.289 331.079C407.289 330.409 407.412 329.818 407.656 329.306C407.903 328.792 408.247 328.392 408.687 328.105C409.13 327.815 409.647 327.67 410.238 327.67C410.579 327.67 410.916 327.727 411.248 327.841C411.581 327.954 411.883 328.139 412.156 328.395C412.429 328.647 412.646 328.983 412.808 329.4C412.97 329.818 413.051 330.332 413.051 330.943V331.369H408.005V330.5H412.028C412.028 330.13 411.954 329.801 411.806 329.511C411.662 329.221 411.454 328.993 411.184 328.825C410.917 328.657 410.602 328.574 410.238 328.574C409.838 328.574 409.491 328.673 409.199 328.872C408.909 329.068 408.686 329.324 408.529 329.639C408.373 329.954 408.295 330.292 408.295 330.653V331.233C408.295 331.727 408.38 332.146 408.551 332.49C408.724 332.831 408.964 333.091 409.271 333.27C409.578 333.446 409.934 333.534 410.341 333.534C410.605 333.534 410.843 333.497 411.056 333.423C411.272 333.346 411.458 333.233 411.615 333.082C411.771 332.929 411.892 332.738 411.977 332.511L412.949 332.784C412.846 333.113 412.674 333.403 412.433 333.653C412.191 333.9 411.893 334.093 411.538 334.233C411.183 334.369 410.784 334.437 410.341 334.437ZM417.052 334.437C416.507 334.437 416.025 334.299 415.608 334.024C415.19 333.745 414.863 333.353 414.627 332.848C414.392 332.339 414.274 331.738 414.274 331.045C414.274 330.358 414.392 329.761 414.627 329.255C414.863 328.75 415.191 328.359 415.612 328.083C416.032 327.808 416.518 327.67 417.069 327.67C417.495 327.67 417.832 327.741 418.079 327.883C418.329 328.022 418.52 328.181 418.65 328.36C418.784 328.537 418.887 328.681 418.961 328.795H419.047V325.574H420.052V334.301H419.081V333.295H418.961C418.887 333.414 418.782 333.565 418.646 333.747C418.51 333.926 418.315 334.086 418.062 334.228C417.809 334.368 417.473 334.437 417.052 334.437ZM417.189 333.534C417.592 333.534 417.933 333.429 418.211 333.218C418.49 333.005 418.701 332.711 418.846 332.336C418.991 331.958 419.064 331.522 419.064 331.028C419.064 330.539 418.993 330.112 418.85 329.745C418.708 329.376 418.498 329.089 418.22 328.885C417.941 328.677 417.598 328.574 417.189 328.574C416.762 328.574 416.407 328.683 416.123 328.902C415.842 329.118 415.63 329.412 415.488 329.784C415.349 330.153 415.279 330.568 415.279 331.028C415.279 331.494 415.35 331.917 415.493 332.298C415.637 332.676 415.85 332.977 416.132 333.201C416.416 333.423 416.768 333.534 417.189 333.534Z" fill="#53585C" />
                          </g>
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" />
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" />
                          <foreignObject x="335.997" y="263.001" width="181.6" height="127.6"><div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent1_clip_path)", height: "100%", width: "100%" }}></div></foreignObject><g filter="url(#filter4_d_agent1)" data-figma-bg-blur-radius="16.3">
                            <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fill-opacity="0.4" shape-rendering="crispEdges" />
                            <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shape-rendering="crispEdges" />
                          </g>
                          <path d="M406.192 353.301V352.406L411.68 344.213H406.132V343.119H413.152V344.014L407.663 352.207H413.212V353.301H406.192ZM418.322 353.46C417.587 353.46 416.952 353.297 416.418 352.973C415.888 352.645 415.479 352.187 415.19 351.6C414.905 351.011 414.763 350.324 414.763 349.542C414.763 348.76 414.905 348.071 415.19 347.474C415.479 346.874 415.88 346.407 416.393 346.072C416.911 345.734 417.514 345.565 418.203 345.565C418.601 345.565 418.994 345.631 419.381 345.764C419.769 345.896 420.122 346.112 420.44 346.41C420.759 346.705 421.012 347.096 421.201 347.583C421.39 348.071 421.484 348.671 421.484 349.383V349.88H415.598V348.866H420.291C420.291 348.435 420.205 348.051 420.033 347.713C419.864 347.375 419.622 347.108 419.307 346.912C418.995 346.717 418.627 346.619 418.203 346.619C417.736 346.619 417.331 346.735 416.99 346.967C416.652 347.196 416.392 347.494 416.21 347.862C416.027 348.23 415.936 348.624 415.936 349.045V349.721C415.936 350.298 416.036 350.787 416.234 351.188C416.437 351.586 416.717 351.889 417.075 352.098C417.433 352.303 417.848 352.406 418.322 352.406C418.631 352.406 418.909 352.363 419.158 352.277C419.41 352.187 419.627 352.055 419.809 351.879C419.991 351.7 420.132 351.478 420.232 351.213L421.365 351.531C421.246 351.915 421.045 352.253 420.763 352.545C420.482 352.833 420.134 353.059 419.719 353.221C419.305 353.38 418.839 353.46 418.322 353.46ZM423.269 353.301V345.664H424.403V346.818H424.482C424.621 346.44 424.873 346.133 425.238 345.898C425.603 345.663 426.013 345.545 426.471 345.545C426.557 345.545 426.665 345.547 426.794 345.55C426.923 345.553 427.021 345.558 427.087 345.565V346.758C427.048 346.748 426.956 346.733 426.814 346.713C426.675 346.69 426.527 346.679 426.371 346.679C426 346.679 425.669 346.757 425.377 346.912C425.089 347.065 424.86 347.277 424.691 347.549C424.525 347.817 424.442 348.124 424.442 348.468V353.301H423.269ZM431.348 353.46C430.659 353.46 430.054 353.296 429.533 352.968C429.016 352.64 428.612 352.181 428.32 351.591C428.032 351.001 427.888 350.311 427.888 349.522C427.888 348.727 428.032 348.033 428.32 347.439C428.612 346.846 429.016 346.385 429.533 346.057C430.054 345.729 430.659 345.565 431.348 345.565C432.037 345.565 432.641 345.729 433.158 346.057C433.678 346.385 434.082 346.846 434.371 347.439C434.662 348.033 434.808 348.727 434.808 349.522C434.808 350.311 434.662 351.001 434.371 351.591C434.082 352.181 433.678 352.64 433.158 352.968C432.641 353.296 432.037 353.46 431.348 353.46ZM431.348 352.406C431.872 352.406 432.303 352.272 432.641 352.003C432.979 351.735 433.229 351.382 433.391 350.944C433.554 350.507 433.635 350.033 433.635 349.522C433.635 349.012 433.554 348.536 433.391 348.096C433.229 347.655 432.979 347.298 432.641 347.027C432.303 346.755 431.872 346.619 431.348 346.619C430.824 346.619 430.393 346.755 430.055 347.027C429.717 347.298 429.467 347.655 429.305 348.096C429.142 348.536 429.061 349.012 429.061 349.522C429.061 350.033 429.142 350.507 429.305 350.944C429.467 351.382 429.717 351.735 430.055 352.003C430.393 352.272 430.824 352.406 431.348 352.406ZM441.869 353.301V354.395H435.506V353.301H441.869ZM444.103 343.119V353.301H442.929V343.119H444.103ZM446.252 353.301V345.664H447.425V353.301H446.252ZM446.848 344.392C446.619 344.392 446.422 344.314 446.257 344.158C446.094 344.002 446.013 343.815 446.013 343.596C446.013 343.377 446.094 343.19 446.257 343.034C446.422 342.879 446.619 342.801 446.848 342.801C447.077 342.801 447.272 342.879 447.435 343.034C447.601 343.19 447.683 343.377 447.683 343.596C447.683 343.815 447.601 344.002 447.435 344.158C447.272 344.314 447.077 344.392 446.848 344.392ZM450.747 348.707V353.301H449.574V345.664H450.707V346.858H450.807C450.986 346.47 451.258 346.158 451.622 345.923C451.987 345.684 452.457 345.565 453.034 345.565C453.551 345.565 454.004 345.671 454.391 345.883C454.779 346.092 455.081 346.41 455.296 346.838C455.512 347.262 455.619 347.799 455.619 348.449V353.301H454.446V348.528C454.446 347.928 454.29 347.461 453.979 347.126C453.667 346.788 453.24 346.619 452.696 346.619C452.321 346.619 451.987 346.7 451.692 346.863C451.4 347.025 451.17 347.262 451.001 347.574C450.832 347.885 450.747 348.263 450.747 348.707ZM460.965 353.46C460.229 353.46 459.595 353.297 459.061 352.973C458.531 352.645 458.121 352.187 457.833 351.6C457.548 351.011 457.405 350.324 457.405 349.542C457.405 348.76 457.548 348.071 457.833 347.474C458.121 346.874 458.522 346.407 459.036 346.072C459.553 345.734 460.156 345.565 460.846 345.565C461.243 345.565 461.636 345.631 462.024 345.764C462.412 345.896 462.765 346.112 463.083 346.41C463.401 346.705 463.655 347.096 463.844 347.583C464.032 348.071 464.127 348.671 464.127 349.383V349.88H458.241V348.866H462.934C462.934 348.435 462.848 348.051 462.675 347.713C462.506 347.375 462.264 347.108 461.949 346.912C461.638 346.717 461.27 346.619 460.846 346.619C460.378 346.619 459.974 346.735 459.633 346.967C459.295 347.196 459.034 347.494 458.852 347.862C458.67 348.23 458.579 348.624 458.579 349.045V349.721C458.579 350.298 458.678 350.787 458.877 351.188C459.079 351.586 459.359 351.889 459.717 352.098C460.075 352.303 460.491 352.406 460.965 352.406C461.273 352.406 461.552 352.363 461.8 352.277C462.052 352.187 462.269 352.055 462.452 351.879C462.634 351.7 462.775 351.478 462.874 351.213L464.008 351.531C463.888 351.915 463.688 352.253 463.406 352.545C463.124 352.833 462.776 353.059 462.362 353.221C461.948 353.38 461.482 353.46 460.965 353.46Z" fill="#CFD6E1" />
                          <path d="M403.524 322.574H404.683L405.655 323.852L405.911 324.193L407.359 326.119H406.2L405.246 324.841L405.007 324.517L403.524 322.574ZM407.717 320.937C407.717 321.858 407.551 322.653 407.219 323.324C406.886 323.994 406.43 324.511 405.851 324.875C405.271 325.238 404.609 325.42 403.865 325.42C403.121 325.42 402.459 325.238 401.879 324.875C401.3 324.511 400.844 323.994 400.511 323.324C400.179 322.653 400.013 321.858 400.013 320.937C400.013 320.017 400.179 319.221 400.511 318.551C400.844 317.88 401.3 317.363 401.879 317C402.459 316.636 403.121 316.454 403.865 316.454C404.609 316.454 405.271 316.636 405.851 317C406.43 317.363 406.886 317.88 407.219 318.551C407.551 319.221 407.717 320.017 407.717 320.937ZM406.695 320.937C406.695 320.181 406.568 319.544 406.315 319.024C406.065 318.504 405.726 318.11 405.297 317.843C404.871 317.576 404.393 317.443 403.865 317.443C403.337 317.443 402.858 317.576 402.429 317.843C402.003 318.11 401.663 318.504 401.411 319.024C401.161 319.544 401.036 320.181 401.036 320.937C401.036 321.693 401.161 322.331 401.411 322.85C401.663 323.37 402.003 323.764 402.429 324.031C402.858 324.298 403.337 324.431 403.865 324.431C404.393 324.431 404.871 324.298 405.297 324.031C405.726 323.764 406.065 323.37 406.315 322.85C406.568 322.331 406.695 321.693 406.695 320.937ZM413.483 322.625V318.755H414.489V325.301H413.483V324.193H413.415C413.261 324.525 413.023 324.808 412.699 325.041C412.375 325.271 411.966 325.386 411.472 325.386C411.062 325.386 410.699 325.297 410.381 325.118C410.063 324.936 409.813 324.663 409.631 324.299C409.449 323.933 409.358 323.471 409.358 322.914V318.755H410.364V322.846C410.364 323.324 410.497 323.704 410.764 323.988C411.034 324.272 411.378 324.414 411.795 324.414C412.045 324.414 412.3 324.35 412.558 324.223C412.82 324.095 413.038 323.899 413.214 323.635C413.393 323.37 413.483 323.034 413.483 322.625ZM419.075 325.437C418.444 325.437 417.9 325.298 417.443 325.02C416.988 324.738 416.637 324.346 416.39 323.843C416.146 323.338 416.024 322.75 416.024 322.079C416.024 321.409 416.146 320.818 416.39 320.306C416.637 319.792 416.981 319.392 417.422 319.105C417.865 318.815 418.382 318.67 418.973 318.67C419.314 318.67 419.65 318.727 419.983 318.841C420.315 318.954 420.618 319.139 420.89 319.395C421.163 319.647 421.38 319.983 421.542 320.4C421.704 320.818 421.785 321.332 421.785 321.943V322.369H416.74V321.5H420.762C420.762 321.13 420.689 320.801 420.541 320.511C420.396 320.221 420.189 319.993 419.919 319.825C419.652 319.657 419.336 319.574 418.973 319.574C418.572 319.574 418.225 319.673 417.933 319.872C417.643 320.068 417.42 320.324 417.264 320.639C417.108 320.954 417.029 321.292 417.029 321.653V322.233C417.029 322.727 417.115 323.146 417.285 323.49C417.458 323.831 417.699 324.091 418.005 324.27C418.312 324.446 418.669 324.534 419.075 324.534C419.339 324.534 419.578 324.497 419.791 324.423C420.007 324.346 420.193 324.233 420.349 324.082C420.505 323.929 420.626 323.738 420.711 323.511L421.683 323.784C421.581 324.113 421.409 324.403 421.167 324.653C420.926 324.9 420.627 325.093 420.272 325.233C419.917 325.369 419.518 325.437 419.075 325.437ZM427.44 322.625V318.755H428.446V325.301H427.44V324.193H427.372C427.218 324.525 426.98 324.808 426.656 325.041C426.332 325.271 425.923 325.386 425.429 325.386C425.02 325.386 424.656 325.297 424.338 325.118C424.02 324.936 423.77 324.663 423.588 324.299C423.406 323.933 423.315 323.471 423.315 322.914V318.755H424.321V322.846C424.321 323.324 424.454 323.704 424.721 323.988C424.991 324.272 425.335 324.414 425.752 324.414C426.002 324.414 426.257 324.35 426.515 324.223C426.777 324.095 426.995 323.899 427.172 323.635C427.35 323.37 427.44 323.034 427.44 322.625ZM433.032 325.437C432.401 325.437 431.857 325.298 431.4 325.02C430.945 324.738 430.594 324.346 430.347 323.843C430.103 323.338 429.981 322.75 429.981 322.079C429.981 321.409 430.103 320.818 430.347 320.306C430.594 319.792 430.938 319.392 431.379 319.105C431.822 318.815 432.339 318.67 432.93 318.67C433.271 318.67 433.607 318.727 433.94 318.841C434.272 318.954 434.575 319.139 434.847 319.395C435.12 319.647 435.337 319.983 435.499 320.4C435.661 320.818 435.742 321.332 435.742 321.943V322.369H430.697V321.5H434.719C434.719 321.13 434.646 320.801 434.498 320.511C434.353 320.221 434.146 319.993 433.876 319.825C433.609 319.657 433.293 319.574 432.93 319.574C432.529 319.574 432.183 319.673 431.89 319.872C431.6 320.068 431.377 320.324 431.221 320.639C431.065 320.954 430.987 321.292 430.987 321.653V322.233C430.987 322.727 431.072 323.146 431.242 323.49C431.415 323.831 431.656 324.091 431.962 324.27C432.269 324.446 432.626 324.534 433.032 324.534C433.296 324.534 433.535 324.497 433.748 324.423C433.964 324.346 434.15 324.233 434.306 324.082C434.462 323.929 434.583 323.738 434.668 323.511L435.64 323.784C435.538 324.113 435.366 324.403 435.124 324.653C434.883 324.9 434.585 325.093 434.229 325.233C433.874 325.369 433.475 325.437 433.032 325.437ZM445.556 318.755C445.505 318.324 445.298 317.988 444.934 317.75C444.57 317.511 444.124 317.392 443.596 317.392C443.21 317.392 442.871 317.454 442.582 317.579C442.295 317.704 442.07 317.876 441.908 318.095C441.749 318.314 441.67 318.562 441.67 318.841C441.67 319.074 441.725 319.274 441.836 319.441C441.95 319.606 442.094 319.744 442.271 319.855C442.447 319.963 442.631 320.052 442.825 320.123C443.018 320.191 443.195 320.247 443.357 320.289L444.244 320.528C444.471 320.588 444.724 320.67 445.002 320.775C445.283 320.88 445.552 321.024 445.808 321.206C446.066 321.385 446.279 321.615 446.447 321.896C446.614 322.177 446.698 322.522 446.698 322.931C446.698 323.403 446.575 323.829 446.327 324.21C446.083 324.591 445.725 324.893 445.254 325.118C444.785 325.342 444.215 325.454 443.545 325.454C442.92 325.454 442.379 325.353 441.921 325.152C441.467 324.95 441.109 324.669 440.847 324.308C440.589 323.947 440.442 323.528 440.408 323.051H441.499C441.528 323.38 441.638 323.653 441.832 323.869C442.028 324.082 442.275 324.241 442.573 324.346C442.874 324.449 443.198 324.5 443.545 324.5C443.948 324.5 444.31 324.434 444.631 324.304C444.952 324.17 445.207 323.985 445.394 323.75C445.582 323.511 445.675 323.233 445.675 322.914C445.675 322.625 445.594 322.389 445.433 322.207C445.271 322.025 445.058 321.877 444.793 321.764C444.529 321.65 444.244 321.551 443.937 321.466L442.863 321.159C442.181 320.963 441.641 320.683 441.244 320.319C440.846 319.956 440.647 319.48 440.647 318.892C440.647 318.403 440.779 317.977 441.043 317.613C441.31 317.247 441.668 316.963 442.117 316.761C442.569 316.556 443.073 316.454 443.63 316.454C444.192 316.454 444.692 316.555 445.13 316.757C445.567 316.956 445.914 317.228 446.17 317.575C446.428 317.922 446.565 318.315 446.579 318.755H445.556ZM451.146 318.755V319.608H447.754V318.755H451.146ZM448.743 317.187H449.748V323.426C449.748 323.71 449.789 323.923 449.872 324.065C449.957 324.204 450.065 324.298 450.196 324.346C450.329 324.392 450.47 324.414 450.618 324.414C450.728 324.414 450.819 324.409 450.89 324.397C450.961 324.383 451.018 324.372 451.061 324.363L451.265 325.267C451.197 325.292 451.102 325.318 450.98 325.343C450.858 325.372 450.703 325.386 450.515 325.386C450.231 325.386 449.953 325.325 449.68 325.203C449.41 325.081 449.186 324.895 449.007 324.645C448.831 324.395 448.743 324.079 448.743 323.699V317.187ZM454.585 325.454C454.17 325.454 453.794 325.376 453.456 325.22C453.118 325.061 452.849 324.832 452.65 324.534C452.451 324.233 452.352 323.869 452.352 323.443C452.352 323.068 452.426 322.764 452.574 322.531C452.721 322.295 452.919 322.11 453.166 321.977C453.413 321.843 453.686 321.744 453.984 321.679C454.285 321.61 454.588 321.556 454.892 321.517C455.289 321.466 455.612 321.427 455.859 321.402C456.109 321.373 456.291 321.326 456.404 321.261C456.521 321.196 456.579 321.082 456.579 320.92V320.886C456.579 320.466 456.464 320.139 456.234 319.906C456.007 319.673 455.662 319.556 455.199 319.556C454.718 319.556 454.342 319.662 454.069 319.872C453.797 320.082 453.605 320.306 453.494 320.545L452.539 320.204C452.71 319.806 452.937 319.497 453.221 319.275C453.508 319.051 453.821 318.895 454.159 318.806C454.5 318.716 454.835 318.67 455.164 318.67C455.375 318.67 455.616 318.696 455.889 318.747C456.164 318.795 456.43 318.896 456.686 319.049C456.944 319.203 457.159 319.434 457.329 319.744C457.5 320.054 457.585 320.468 457.585 320.988V325.301H456.579V324.414H456.528C456.46 324.556 456.346 324.708 456.187 324.87C456.028 325.032 455.816 325.17 455.552 325.284C455.288 325.397 454.966 325.454 454.585 325.454ZM454.738 324.551C455.136 324.551 455.471 324.473 455.744 324.316C456.02 324.16 456.227 323.958 456.366 323.711C456.508 323.464 456.579 323.204 456.579 322.931V322.011C456.537 322.062 456.443 322.109 456.298 322.152C456.156 322.191 455.991 322.227 455.804 322.258C455.619 322.287 455.439 322.312 455.262 322.335C455.089 322.355 454.949 322.372 454.841 322.386C454.579 322.42 454.335 322.475 454.108 322.552C453.883 322.626 453.701 322.738 453.562 322.889C453.426 323.037 453.358 323.238 453.358 323.494C453.358 323.843 453.487 324.108 453.745 324.287C454.007 324.463 454.338 324.551 454.738 324.551ZM462.267 318.755V319.608H458.875V318.755H462.267ZM459.864 317.187H460.869V323.426C460.869 323.71 460.911 323.923 460.993 324.065C461.078 324.204 461.186 324.298 461.317 324.346C461.45 324.392 461.591 324.414 461.739 324.414C461.849 324.414 461.94 324.409 462.011 324.397C462.082 324.383 462.139 324.372 462.182 324.363L462.386 325.267C462.318 325.292 462.223 325.318 462.101 325.343C461.979 325.372 461.824 325.386 461.636 325.386C461.352 325.386 461.074 325.325 460.801 325.203C460.531 325.081 460.307 324.895 460.128 324.645C459.952 324.395 459.864 324.079 459.864 323.699V317.187ZM466.454 325.437C465.823 325.437 465.279 325.298 464.822 325.02C464.367 324.738 464.016 324.346 463.769 323.843C463.525 323.338 463.403 322.75 463.403 322.079C463.403 321.409 463.525 320.818 463.769 320.306C464.016 319.792 464.36 319.392 464.8 319.105C465.244 318.815 465.761 318.67 466.352 318.67C466.692 318.67 467.029 318.727 467.362 318.841C467.694 318.954 467.996 319.139 468.269 319.395C468.542 319.647 468.759 319.983 468.921 320.4C469.083 320.818 469.164 321.332 469.164 321.943V322.369H464.119V321.5H468.141C468.141 321.13 468.067 320.801 467.92 320.511C467.775 320.221 467.567 319.993 467.298 319.825C467.031 319.657 466.715 319.574 466.352 319.574C465.951 319.574 465.604 319.673 465.312 319.872C465.022 320.068 464.799 320.324 464.643 320.639C464.487 320.954 464.408 321.292 464.408 321.653V322.233C464.408 322.727 464.494 323.146 464.664 323.49C464.837 323.831 465.077 324.091 465.384 324.27C465.691 324.446 466.048 324.534 466.454 324.534C466.718 324.534 466.957 324.497 467.17 324.423C467.386 324.346 467.572 324.233 467.728 324.082C467.884 323.929 468.005 323.738 468.09 323.511L469.062 323.784C468.96 324.113 468.788 324.403 468.546 324.653C468.305 324.9 468.006 325.093 467.651 325.233C467.296 325.369 466.897 325.437 466.454 325.437Z" fill="#53585C" />
                          <path d="M74.4369 303.301V294.541H79.5969V295.525H75.4929V298.429H79.2849V299.413H75.5169V303.301H74.4369ZM82.0522 303.301V294.541H83.1322V302.317H87.0922V303.301H82.0522ZM91.2875 303.421C90.5035 303.421 89.8835 303.193 89.4275 302.737C88.9715 302.281 88.7435 301.629 88.7435 300.781V297.061C88.7435 296.213 88.9715 295.561 89.4275 295.105C89.8835 294.649 90.5035 294.421 91.2875 294.421C92.0715 294.421 92.6915 294.649 93.1475 295.105C93.6035 295.561 93.8315 296.209 93.8315 297.049V300.781C93.8315 301.629 93.6035 302.281 93.1475 302.737C92.6915 303.193 92.0715 303.421 91.2875 303.421ZM91.2875 302.449C91.7595 302.449 92.1195 302.317 92.3675 302.053C92.6235 301.781 92.7515 301.397 92.7515 300.901V296.941C92.7515 296.445 92.6235 296.065 92.3675 295.801C92.1195 295.529 91.7595 295.393 91.2875 295.393C90.8235 295.393 90.4635 295.529 90.2075 295.801C89.9515 296.065 89.8235 296.445 89.8235 296.941V300.901C89.8235 301.397 89.9515 301.781 90.2075 302.053C90.4635 302.317 90.8235 302.449 91.2875 302.449ZM96.1668 303.301L95.1228 294.541H96.1188L96.8028 301.021C96.8268 301.197 96.8428 301.381 96.8508 301.573C96.8668 301.757 96.8788 301.933 96.8868 302.101C96.9028 302.269 96.9108 302.409 96.9108 302.521C96.9268 302.409 96.9388 302.269 96.9468 302.101C96.9628 301.933 96.9788 301.757 96.9948 301.573C97.0188 301.381 97.0428 301.197 97.0668 301.021L97.9308 294.541H99.0948L99.8868 301.021C99.9108 301.197 99.9308 301.381 99.9468 301.573C99.9708 301.757 99.9908 301.933 100.007 302.101C100.031 302.269 100.047 302.409 100.055 302.521C100.063 302.409 100.071 302.269 100.079 302.101C100.095 301.933 100.111 301.757 100.127 301.573C100.151 301.381 100.171 301.197 100.187 301.021L100.895 294.541H101.843L100.775 303.301H99.4188L98.6268 296.701C98.6108 296.517 98.5948 296.337 98.5788 296.161C98.5628 295.985 98.5468 295.821 98.5308 295.669C98.5228 295.517 98.5148 295.393 98.5068 295.297C98.4988 295.393 98.4868 295.517 98.4708 295.669C98.4628 295.821 98.4508 295.985 98.4348 296.161C98.4188 296.337 98.3988 296.517 98.3748 296.701L97.5228 303.301H96.1668ZM102.798 304.501V303.601H108.558V304.501H102.798ZM112.921 303.421C112.361 303.421 111.869 303.321 111.445 303.121C111.029 302.921 110.705 302.633 110.473 302.257C110.249 301.873 110.137 301.421 110.137 300.901H111.217C111.217 301.389 111.373 301.773 111.685 302.053C111.997 302.325 112.409 302.461 112.921 302.461C113.417 302.461 113.813 302.317 114.109 302.029C114.405 301.741 114.553 301.365 114.553 300.901C114.553 300.549 114.457 300.245 114.265 299.989C114.081 299.725 113.813 299.545 113.461 299.449L112.129 299.077C111.577 298.917 111.141 298.633 110.821 298.225C110.509 297.809 110.353 297.321 110.353 296.761C110.353 296.297 110.457 295.889 110.665 295.537C110.873 295.185 111.165 294.913 111.541 294.721C111.917 294.521 112.349 294.421 112.837 294.421C113.333 294.421 113.769 294.521 114.145 294.721C114.529 294.913 114.829 295.185 115.045 295.537C115.261 295.881 115.369 296.281 115.369 296.737H114.289C114.289 296.337 114.153 296.013 113.881 295.765C113.609 295.509 113.261 295.381 112.837 295.381C112.413 295.381 112.069 295.509 111.805 295.765C111.541 296.013 111.409 296.337 111.409 296.737C111.409 297.057 111.493 297.333 111.661 297.565C111.837 297.789 112.081 297.945 112.393 298.033L113.761 298.417C114.345 298.577 114.797 298.881 115.117 299.329C115.445 299.769 115.609 300.293 115.609 300.901C115.609 301.413 115.497 301.857 115.273 302.233C115.057 302.609 114.745 302.901 114.337 303.109C113.937 303.317 113.465 303.421 112.921 303.421ZM119.529 303.301V295.525H117.129V294.541H123.009V295.525H120.609V303.301H119.529ZM124.264 303.301L126.544 294.541H127.996L130.264 303.301H129.172L128.596 300.973H125.944L125.368 303.301H124.264ZM126.16 300.061H128.368L127.696 297.361C127.568 296.849 127.468 296.421 127.396 296.077C127.324 295.733 127.28 295.509 127.264 295.405C127.248 295.509 127.204 295.733 127.132 296.077C127.06 296.421 126.96 296.845 126.832 297.349L126.16 300.061ZM133.919 303.301V295.525H131.519V294.541H137.399V295.525H134.999V303.301H133.919ZM139.255 303.301V294.541H144.295V295.525H140.323V298.237H143.875V299.197H140.323V302.317H144.295V303.301H139.255Z" fill="#53585C" />
                          <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6"><div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent1_clip_path)", height: "100%", width: "100%" }}></div></foreignObject><g filter="url(#filter5_d_agent1)" data-figma-bg-blur-radius="16.3">
                            <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fill-opacity="0.4" shape-rendering="crispEdges" />
                            <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shape-rendering="crispEdges" />
                          </g>
                          <path d="M53.5923 59.9798C54.0099 59.9831 54.4276 60.0626 54.8452 60.2184C55.2628 60.3742 55.6439 60.6327 55.9886 60.994C56.3333 61.3519 56.6101 61.8408 56.8189 62.4606C57.0277 63.0804 57.1321 63.8576 57.1321 64.7923C57.1321 65.6971 57.0459 66.5008 56.8736 67.2035C56.7045 67.9028 56.4593 68.4928 56.1378 68.9734C55.8196 69.454 55.4318 69.8185 54.9744 70.0671C54.5204 70.3157 54.0066 70.44 53.4332 70.44C52.8632 70.44 52.3544 70.3273 51.907 70.1019C51.4628 69.8732 51.0982 69.5567 50.8132 69.1523C50.5315 68.7447 50.3509 68.2724 50.2713 67.7354H51.4844C51.5938 68.2028 51.8108 68.5889 52.1357 68.8938C52.4638 69.1954 52.8963 69.3462 53.4332 69.3462C54.2188 69.3462 54.8385 69.0032 55.2926 68.3171C55.75 67.631 55.9787 66.6616 55.9787 65.4087H55.8991C55.7135 65.6871 55.4931 65.9274 55.2379 66.1296C54.9827 66.3318 54.6993 66.4876 54.3878 66.5969C54.0762 66.7063 53.7448 66.761 53.3935 66.761C52.8101 66.761 52.2749 66.6168 51.7876 66.3285C51.3037 66.0368 50.916 65.6374 50.6243 65.1303C50.3359 64.6199 50.1918 64.0366 50.1918 63.3803C50.1918 62.7572 50.331 62.1871 50.6094 61.6701C50.8911 61.1497 51.2855 60.7354 51.7926 60.4272C52.303 60.119 52.9029 59.9698 53.5923 59.9798ZM53.5923 61.0735C53.1747 61.0735 52.7985 61.1779 52.4638 61.3867C52.1323 61.5922 51.8688 61.8706 51.6733 62.2219C51.4811 62.57 51.3849 62.9561 51.3849 63.3803C51.3849 63.8046 51.4777 64.1907 51.6634 64.5387C51.8523 64.8834 52.1091 65.1585 52.4339 65.364C52.7621 65.5662 53.1349 65.6673 53.5526 65.6673C53.8674 65.6673 54.1607 65.6059 54.4325 65.4833C54.7043 65.3574 54.9413 65.1867 55.1435 64.9712C55.349 64.7525 55.5097 64.5056 55.6257 64.2305C55.7417 63.9521 55.7997 63.662 55.7997 63.3604C55.7997 62.9627 55.7036 62.5898 55.5114 62.2418C55.3224 61.8938 55.0606 61.6121 54.7259 61.3967C54.3944 61.1812 54.0166 61.0735 53.5923 61.0735ZM58.8485 68.2127V67.1985L63.323 60.119H64.0588V61.69H63.5616L60.1809 67.0394V67.119H66.2065V68.2127H58.8485ZM63.6412 70.3008V67.9045V67.4322V60.119H64.8145V70.3008H63.6412ZM73.4986 64.3746L72.4446 64.6729C72.3783 64.4973 72.2805 64.3266 72.1513 64.1609C72.0253 63.9918 71.853 63.8526 71.6342 63.7433C71.4155 63.6339 71.1354 63.5792 70.794 63.5792C70.3267 63.5792 69.9373 63.6869 69.6257 63.9023C69.3175 64.1145 69.1634 64.3846 69.1634 64.7127C69.1634 65.0044 69.2694 65.2347 69.4815 65.4038C69.6937 65.5728 70.0251 65.7137 70.4759 65.8263L71.6094 66.1048C72.2921 66.2705 72.8009 66.524 73.1357 66.8654C73.4704 67.2035 73.6378 67.6393 73.6378 68.1729C73.6378 68.6104 73.5118 69.0015 73.2599 69.3462C73.0114 69.6909 72.6634 69.9627 72.2159 70.1616C71.7685 70.3604 71.2481 70.4599 70.6548 70.4599C69.8759 70.4599 69.2313 70.2908 68.7209 69.9528C68.2105 69.6147 67.8873 69.1209 67.7514 68.4712L68.8651 68.1928C68.9711 68.6038 69.1716 68.9121 69.4666 69.1175C69.7649 69.323 70.1544 69.4258 70.6349 69.4258C71.1818 69.4258 71.616 69.3098 71.9375 69.0778C72.2623 68.8424 72.4247 68.5607 72.4247 68.2326C72.4247 67.9674 72.3319 67.7454 72.1463 67.5664C71.9607 67.3841 71.6757 67.2482 71.2912 67.1587L70.0185 66.8604C69.3191 66.6947 68.8054 66.4379 68.4773 66.0898C68.1525 65.7385 67.9901 65.2994 67.9901 64.7724C67.9901 64.3415 68.111 63.9603 68.353 63.6289C68.5982 63.2975 68.9313 63.0373 69.3523 62.8484C69.7765 62.6594 70.2571 62.565 70.794 62.565C71.5497 62.565 72.143 62.7307 72.5739 63.0621C73.008 63.3936 73.3163 63.8311 73.4986 64.3746ZM79.9181 70.3008H78.6255L82.3642 60.119H83.6369L87.3755 70.3008H86.0829L83.0403 61.7298H82.9608L79.9181 70.3008ZM80.3954 66.3235H85.6056V67.4173H80.3954V66.3235ZM94.0897 62.6644L91.2658 70.3008H90.0726L87.2488 62.6644H88.5215L90.6294 68.7496H90.709L92.8169 62.6644H94.0897ZM98.4473 73.3235C97.8805 73.3235 97.3933 73.2506 96.9856 73.1048C96.5779 72.9622 96.2382 72.7733 95.9664 72.538C95.698 72.306 95.4842 72.0574 95.3251 71.7923L96.2598 71.136C96.3658 71.2752 96.5001 71.4343 96.6625 71.6133C96.8249 71.7956 97.0469 71.953 97.3287 72.0856C97.6137 72.2215 97.9866 72.2894 98.4473 72.2894C99.0637 72.2894 99.5725 72.1403 99.9735 71.842C100.375 71.5437 100.575 71.0763 100.575 70.44V68.8888H100.476C100.39 69.0281 100.267 69.2004 100.108 69.4059C99.952 69.6081 99.7266 69.7887 99.4316 69.9478C99.14 70.1036 98.7456 70.1815 98.2484 70.1815C97.6319 70.1815 97.0784 70.0356 96.5879 69.744C96.1007 69.4523 95.7145 69.0281 95.4295 68.4712C95.1478 67.9144 95.0069 67.2383 95.0069 66.4428C95.0069 65.6606 95.1445 64.9795 95.4196 64.3995C95.6947 63.8162 96.0775 63.3654 96.568 63.0472C97.0585 62.7257 97.6253 62.565 98.2683 62.565C98.7654 62.565 99.1599 62.6478 99.4515 62.8136C99.7465 62.976 99.9719 63.1616 100.128 63.3704C100.287 63.5759 100.409 63.7449 100.496 63.8775H100.615V62.6644H101.748V70.5195C101.748 71.1758 101.599 71.7094 101.301 72.1204C101.006 72.5347 100.608 72.8379 100.108 73.0302C99.6106 73.2257 99.0571 73.3235 98.4473 73.3235ZM98.4075 69.1275C98.8781 69.1275 99.2759 69.0198 99.6007 68.8043C99.9255 68.5889 100.172 68.279 100.341 67.8746C100.51 67.4703 100.595 66.9864 100.595 66.4229C100.595 65.8728 100.512 65.3872 100.346 64.9663C100.181 64.5453 99.9354 64.2156 99.6106 63.9769C99.2858 63.7383 98.8848 63.619 98.4075 63.619C97.9103 63.619 97.496 63.7449 97.1646 63.9968C96.8365 64.2487 96.5895 64.5868 96.4238 65.011C96.2614 65.4353 96.1802 65.9059 96.1802 66.4229C96.1802 66.9532 96.2631 67.4222 96.4288 67.8299C96.5978 68.2343 96.8464 68.5524 97.1745 68.7844C97.506 69.0131 97.917 69.1275 98.4075 69.1275Z" fill="#CFD6E1" />
                          <path d="M44.7116 33.5735L47.3026 40.9201H47.4048L49.9957 33.5735H51.1037L47.8991 42.3008H46.8082L43.6037 33.5735H44.7116ZM54.4616 42.4371C53.831 42.4371 53.2869 42.2979 52.8295 42.0195C52.375 41.7383 52.0241 41.3462 51.777 40.8434C51.5327 40.3377 51.4105 39.7496 51.4105 39.0792C51.4105 38.4087 51.5327 37.8178 51.777 37.3065C52.0241 36.7923 52.3679 36.3917 52.8082 36.1048C53.2514 35.815 53.7685 35.6701 54.3594 35.6701C54.7003 35.6701 55.0369 35.7269 55.3693 35.8406C55.7017 35.9542 56.0043 36.1388 56.277 36.3945C56.5497 36.6474 56.767 36.9826 56.929 37.4002C57.0909 37.8178 57.1719 38.332 57.1719 38.9428V39.369H52.1264V38.4996H56.1491C56.1491 38.1303 56.0753 37.8008 55.9276 37.511C55.7827 37.2212 55.5753 36.9925 55.3054 36.8249C55.0384 36.6573 54.723 36.5735 54.3594 36.5735C53.9588 36.5735 53.6122 36.6729 53.3196 36.8718C53.0298 37.0678 52.8068 37.3235 52.6506 37.6388C52.4943 37.9542 52.4162 38.2923 52.4162 38.6531V39.2326C52.4162 39.7269 52.5014 40.146 52.6719 40.4897C52.8452 40.8306 53.0852 41.0906 53.392 41.2695C53.6989 41.4457 54.0554 41.5337 54.4616 41.5337C54.7259 41.5337 54.9645 41.4968 55.1776 41.4229C55.3935 41.3462 55.5795 41.2326 55.7358 41.082C55.892 40.9286 56.0128 40.7383 56.098 40.511L57.0696 40.7837C56.9673 41.1133 56.7955 41.4031 56.554 41.6531C56.3125 41.9002 56.0142 42.0934 55.6591 42.2326C55.304 42.369 54.9048 42.4371 54.4616 42.4371ZM58.7017 42.3008V35.7553H59.6733V36.744H59.7415C59.8608 36.4201 60.0767 36.1573 60.3892 35.9556C60.7017 35.7539 61.054 35.6531 61.446 35.6531C61.5199 35.6531 61.6122 35.6545 61.723 35.6573C61.8338 35.6602 61.9176 35.6644 61.9744 35.6701V36.6928C61.9403 36.6843 61.8622 36.6715 61.7401 36.6545C61.6207 36.6346 61.4943 36.6246 61.3608 36.6246C61.0426 36.6246 60.7585 36.6914 60.5085 36.8249C60.2614 36.9556 60.0653 37.1374 59.9205 37.3704C59.7784 37.6005 59.7074 37.8633 59.7074 38.1587V42.3008H58.7017ZM63.1665 42.3008V35.7553H64.1722V42.3008H63.1665ZM63.6779 34.6644C63.4819 34.6644 63.3129 34.5977 63.1708 34.4641C63.0316 34.3306 62.962 34.1701 62.962 33.9826C62.962 33.7951 63.0316 33.6346 63.1708 33.5011C63.3129 33.3675 63.4819 33.3008 63.6779 33.3008C63.8739 33.3008 64.0415 33.3675 64.1808 33.5011C64.3228 33.6346 64.3938 33.7951 64.3938 33.9826C64.3938 34.1701 64.3228 34.3306 64.1808 34.4641C64.0415 34.5977 63.8739 34.6644 63.6779 34.6644ZM68.929 35.7553V36.6076H65.4006V35.7553H68.929ZM66.4574 42.3008V34.8519C66.4574 34.4769 66.5455 34.1644 66.7216 33.9144C66.8977 33.6644 67.1264 33.4769 67.4077 33.3519C67.6889 33.2269 67.9858 33.1644 68.2983 33.1644C68.5455 33.1644 68.7472 33.1843 68.9034 33.2241C69.0597 33.2638 69.1761 33.3008 69.2528 33.3349L68.9631 34.2042C68.9119 34.1871 68.8409 34.1658 68.75 34.1403C68.6619 34.1147 68.5455 34.1019 68.4006 34.1019C68.0682 34.1019 67.8281 34.1857 67.6804 34.3533C67.5355 34.521 67.4631 34.7667 67.4631 35.0906V42.3008H66.4574ZM70.3384 42.3008V35.7553H71.3441V42.3008H70.3384ZM70.8498 34.6644C70.6538 34.6644 70.4847 34.5977 70.3427 34.4641C70.2035 34.3306 70.1339 34.1701 70.1339 33.9826C70.1339 33.7951 70.2035 33.6346 70.3427 33.5011C70.4847 33.3675 70.6538 33.3008 70.8498 33.3008C71.0458 33.3008 71.2134 33.3675 71.3526 33.5011C71.4947 33.6346 71.5657 33.7951 71.5657 33.9826C71.5657 34.1701 71.4947 34.3306 71.3526 34.4641C71.2134 34.5977 71.0458 34.6644 70.8498 34.6644ZM75.8452 42.4371C75.2315 42.4371 74.7031 42.2923 74.2599 42.0025C73.8168 41.7127 73.4759 41.3136 73.2372 40.805C72.9986 40.2965 72.8793 39.7156 72.8793 39.0621C72.8793 38.3974 73.0014 37.8107 73.2457 37.3022C73.4929 36.7908 73.8366 36.3917 74.277 36.1048C74.7202 35.815 75.2372 35.6701 75.8281 35.6701C76.2884 35.6701 76.7031 35.7553 77.0724 35.9258C77.4418 36.0962 77.7443 36.3349 77.9801 36.6417C78.2159 36.9485 78.3622 37.3065 78.419 37.7156H77.4134C77.3366 37.4173 77.1662 37.1531 76.902 36.9229C76.6406 36.69 76.2884 36.5735 75.8452 36.5735C75.4531 36.5735 75.1094 36.6758 74.8139 36.8803C74.5213 37.082 74.2926 37.3675 74.1278 37.7369C73.9659 38.1033 73.8849 38.5337 73.8849 39.0281C73.8849 39.5337 73.9645 39.9741 74.1236 40.3491C74.2855 40.7241 74.5128 41.0153 74.8054 41.2227C75.1009 41.43 75.4474 41.5337 75.8452 41.5337C76.1065 41.5337 76.3438 41.4883 76.5568 41.3974C76.7699 41.3065 76.9503 41.1758 77.098 41.0053C77.2457 40.8349 77.3509 40.6303 77.4134 40.3917H78.419C78.3622 40.7781 78.2216 41.1261 77.9972 41.4357C77.7756 41.7425 77.4815 41.9869 77.1151 42.1687C76.7514 42.3477 76.3281 42.4371 75.8452 42.4371ZM81.8153 42.4542C81.4006 42.4542 81.0241 42.3761 80.6861 42.2198C80.348 42.0607 80.0795 41.832 79.8807 41.5337C79.6818 41.2326 79.5824 40.869 79.5824 40.4428C79.5824 40.0678 79.6563 39.7638 79.804 39.5309C79.9517 39.2951 80.1491 39.1104 80.3963 38.9769C80.6435 38.8434 80.9162 38.744 81.2145 38.6786C81.5156 38.6104 81.8182 38.5565 82.1222 38.5167C82.5199 38.4656 82.8423 38.4272 83.0895 38.4016C83.3395 38.3732 83.5213 38.3263 83.6349 38.261C83.7514 38.1957 83.8097 38.082 83.8097 37.9201V37.886C83.8097 37.4656 83.6946 37.1388 83.4645 36.9059C83.2372 36.6729 82.892 36.5565 82.429 36.5565C81.9489 36.5565 81.5724 36.6616 81.2997 36.8718C81.027 37.082 80.8352 37.3065 80.7244 37.5451L79.7699 37.2042C79.9403 36.8065 80.1676 36.4968 80.4517 36.2752C80.7386 36.0508 81.0511 35.8945 81.3892 35.8065C81.7301 35.7156 82.0653 35.6701 82.3949 35.6701C82.6051 35.6701 82.8466 35.6957 83.1193 35.7468C83.3949 35.7951 83.6605 35.896 83.9162 36.0494C84.1747 36.2028 84.3892 36.4343 84.5597 36.744C84.7301 37.0536 84.8153 37.4684 84.8153 37.9883V42.3008H83.8097V41.4144H83.7585C83.6903 41.5565 83.5767 41.7085 83.4176 41.8704C83.2585 42.0323 83.0469 42.1701 82.7827 42.2837C82.5185 42.3974 82.196 42.4542 81.8153 42.4542ZM81.9688 41.5508C82.3665 41.5508 82.7017 41.4727 82.9744 41.3164C83.25 41.1602 83.4574 40.9585 83.5966 40.7113C83.7386 40.4641 83.8097 40.2042 83.8097 39.9315V39.011C83.767 39.0621 83.6733 39.109 83.5284 39.1516C83.3864 39.1914 83.2216 39.2269 83.0341 39.2582C82.8494 39.2866 82.669 39.3121 82.4929 39.3349C82.3196 39.3548 82.179 39.3718 82.071 39.386C81.8097 39.4201 81.5653 39.4755 81.3381 39.5522C81.1136 39.6261 80.9318 39.7383 80.7926 39.8888C80.6563 40.0366 80.5881 40.2383 80.5881 40.494C80.5881 40.8434 80.7173 41.1076 80.9759 41.2866C81.2372 41.4627 81.5682 41.5508 81.9688 41.5508ZM89.4975 35.7553V36.6076H86.1055V35.7553H89.4975ZM87.0941 34.1871H88.0998V40.4258C88.0998 40.7099 88.141 40.9229 88.2234 41.065C88.3086 41.2042 88.4165 41.2979 88.5472 41.3462C88.6808 41.3917 88.8214 41.4144 88.9691 41.4144C89.0799 41.4144 89.1708 41.4087 89.2418 41.3974C89.3129 41.3832 89.3697 41.3718 89.4123 41.3633L89.6168 42.2667C89.5487 42.2923 89.4535 42.3178 89.3313 42.3434C89.2092 42.3718 89.0543 42.386 88.8668 42.386C88.5827 42.386 88.3043 42.3249 88.0316 42.2028C87.7617 42.0806 87.5373 41.8945 87.3583 41.6445C87.1822 41.3945 87.0941 41.0792 87.0941 40.6985V34.1871ZM91.0103 42.3008V35.7553H92.016V42.3008H91.0103ZM91.5217 34.6644C91.3256 34.6644 91.1566 34.5977 91.0146 34.4641C90.8754 34.3306 90.8058 34.1701 90.8058 33.9826C90.8058 33.7951 90.8754 33.6346 91.0146 33.5011C91.1566 33.3675 91.3256 33.3008 91.5217 33.3008C91.7177 33.3008 91.8853 33.3675 92.0245 33.5011C92.1665 33.6346 92.2376 33.7951 92.2376 33.9826C92.2376 34.1701 92.1665 34.3306 92.0245 34.4641C91.8853 34.5977 91.7177 34.6644 91.5217 34.6644ZM96.517 42.4371C95.9261 42.4371 95.4077 42.2965 94.9616 42.0153C94.5185 41.734 94.1719 41.3406 93.9219 40.8349C93.6747 40.3292 93.5511 39.7383 93.5511 39.0621C93.5511 38.3803 93.6747 37.7852 93.9219 37.2766C94.1719 36.7681 94.5185 36.3732 94.9616 36.092C95.4077 35.8107 95.9261 35.6701 96.517 35.6701C97.108 35.6701 97.625 35.8107 98.0682 36.092C98.5142 36.3732 98.8608 36.7681 99.108 37.2766C99.358 37.7852 99.483 38.3803 99.483 39.0621C99.483 39.7383 99.358 40.3292 99.108 40.8349C98.8608 41.3406 98.5142 41.734 98.0682 42.0153C97.625 42.2965 97.108 42.4371 96.517 42.4371ZM96.517 41.5337C96.9659 41.5337 97.3352 41.4187 97.625 41.1886C97.9148 40.9585 98.1293 40.6559 98.2685 40.2809C98.4077 39.9059 98.4773 39.4996 98.4773 39.0621C98.4773 38.6246 98.4077 38.217 98.2685 37.8391C98.1293 37.4613 97.9148 37.1559 97.625 36.9229C97.3352 36.69 96.9659 36.5735 96.517 36.5735C96.0682 36.5735 95.6989 36.69 95.4091 36.9229C95.1193 37.1559 94.9048 37.4613 94.7656 37.8391C94.6264 38.217 94.5568 38.6246 94.5568 39.0621C94.5568 39.4996 94.6264 39.9059 94.7656 40.2809C94.9048 40.6559 95.1193 40.9585 95.4091 41.1886C95.6989 41.4187 96.0682 41.5337 96.517 41.5337ZM102.024 38.3633V42.3008H101.018V35.7553H101.99V36.7781H102.075C102.228 36.4457 102.461 36.1786 102.774 35.9769C103.086 35.7724 103.49 35.6701 103.984 35.6701C104.427 35.6701 104.815 35.761 105.147 35.9428C105.48 36.1218 105.738 36.3945 105.923 36.761C106.108 37.1246 106.2 37.5849 106.2 38.1417V42.3008H105.194V38.2099C105.194 37.6957 105.061 37.2951 104.794 37.0082C104.527 36.7184 104.16 36.5735 103.694 36.5735C103.373 36.5735 103.086 36.6431 102.833 36.7823C102.583 36.9215 102.386 37.1246 102.241 37.3917C102.096 37.6587 102.024 37.9826 102.024 38.3633Z" fill="#53585C" />
                          <defs>
                            <filter id="filter0_d_agent1" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent1" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent1" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent1" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent1" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent1" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent1" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent1" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent1" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent1_clip_path" transform="translate(-335.997 -263.001)"><rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath><filter id="filter5_d_agent1" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent1" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent1" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent1_clip_path" transform="translate(5.00312 4.99922)"><rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath><linearGradient id="paint0_linear_agent1" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#0F1112" />
                              <stop offset="1" stop-color="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent1" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#262728" />
                              <stop offset="1" stop-color="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_agent1" x1="160.011" y1="168.634" x2="112.964" y2="228.348" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#3D3D3D" />
                              <stop offset="1" stop-color="#1D1D1D" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}

                    {activeAgent === 1 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent2)" stroke="url(#paint1_linear_agent2)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />

                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">DISPATCH TERMINAL</text>

                          {/* MAIN CARD SCREEN */}
                          <g filter="url(#filter0_d_agent2)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>

                          {/* RADAR SCAN BACKGROUND PATTERN */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent2)' }}>
                            <rect x="73.2969" y="135.301" width="356" height="129" fill="url(#guard_grid_agent2)" opacity="0.4" />
                          </g>

                          {/* TERMINAL CONTENT: RADAR & AUDIO WAVE */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent2)' }}>
                            {/* Left side: Radar */}
                            <g>
                              <circle cx="145" cy="200" r="45" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" strokeDasharray="2, 4" />
                              <circle cx="145" cy="200" r="30" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" />
                              <circle cx="145" cy="200" r="15" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />

                              {/* Rotating Sweep Line */}
                              <g transform="translate(145, 200)">
                                <g className="sweep-radar-arm" style={{ transformOrigin: '0px 0px' }}>
                                  <line x1="0" y1="0" x2="35" y2="-25" stroke="#10B981" strokeWidth="1.5" />
                                  <polygon points="0,0 35,-25 35,-10" fill="url(#radarSweepGrad_agent2)" />
                                </g>
                              </g>

                              {/* Blinking alert nodes */}
                              <circle cx="120" cy="180" r="3" fill="#10B981" className="blink-led-active" />
                              <circle cx="170" cy="215" r="3.5" fill="#8B5CF6" className="blink-led-active" style={{ animationDelay: '0.4s' }} />
                              <text x="145" y="250" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">RADAR SYNCED</text>
                            </g>

                            {/* Right side: Vocal bars and transcript */}
                            <g>
                              <rect x="255" y="145" width="160" height="110" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                              <text x="335" y="162" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">VOICE PANEL</text>

                              {/* Vocal Bars Equalizer */}
                              <g transform="translate(270, 185)">
                                <rect x="0" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0s' }} />
                                <rect x="8" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0.2s' }} />
                                <rect x="16" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0.4s' }} />
                                <rect x="24" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0.1s' }} />
                                <rect x="32" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0.3s' }} />
                                <rect x="40" y="0" width="4" height="20" rx="1" fill="#8B5CF6" className="vocal-bar-pulse" style={{ animationDelay: '0.5s' }} />
                              </g>

                              {/* Transcript Text */}
                              <text x="335" y="215" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">"Gate 4 perimeter secure."</text>

                              {/* Dispatch confirmed */}
                              <text x="335" y="244" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">DISPATCH CONFIRMED ✓</text>
                            </g>
                          </g>

                          {/* SCANLINE SWEET */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent2)' }}>
                            <line x1="74" y1="136" x2="428" y2="136" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" className="scanline-kiosk-laser" />
                          </g>

                          {/* PIP STEP 1: Voice Sync */}
                          <g filter="url(#filter1_d_agent2)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="115.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Voice Sync</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 1 */}
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" className="flow-pulse-line-1" />

                          {/* PIP STEP 2: Analyzing */}
                          <g filter="url(#filter2_d_agent2)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="249.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Analyzing</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 2 */}
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" className="flow-pulse-line-2" />

                          {/* PIP STEP 3: Dispatched */}
                          <g filter="url(#filter3_d_agent2)">
                            <rect x="336.297" y="316.301" width="104" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="103" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="388.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Dispatched</text>
                          </g>

                          {/* CARD 4: FIELD DISPATCH (BOTTOM RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.8s" }}>
                            <foreignObject x="335.997" y="263.001" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent2_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter4_d_agent2)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="434.3" y="326" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Field Dispatch</text>
                            <text x="434.3" y="354" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#8B5CF6" fontWeight="bold" textAnchor="middle">GPS Linked</text>
                          </g>

                          {/* CARD 5: GPS TRACKING (TOP LEFT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.4s" }}>
                            <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent2_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter5_d_agent2)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="78.3" y="44" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">GPS Tracking</text>
                            <text x="78.3" y="70" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">Locked Active</text>
                          </g>

                          <defs>
                            <clipPath id="card-screen-clip_agent2">
                              <rect x="73.2969" y="135.301" width="356" height="129" rx="10" />
                            </clipPath>
                            <pattern id="guard_grid_agent2" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                            </pattern>
                            <linearGradient id="radarSweepGrad_agent2" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.15)" />
                            </linearGradient>
                            <filter id="filter0_d_agent2" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent2" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent2" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent2" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent2" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent2" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent2" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent2" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent2" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent2_clip_path" transform="translate(-335.997 -263.001)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath>
                            <filter id="filter5_d_agent2" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent2" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent2" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent2_clip_path" transform="translate(5.00312 4.99922)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath>
                            <linearGradient id="paint0_linear_agent2" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0F1112" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent2" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}

                    {/* Employee Agent (03) */}
                    {activeAgent === 2 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent3)" stroke="url(#paint1_linear_agent3)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />

                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">EMPLOYEE TERMINAL</text>

                          {/* MAIN CARD SCREEN */}
                          <g filter="url(#filter0_d_agent3)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>

                          {/* BACKGROUND GRID */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent3)' }}>
                            <rect x="73.2969" y="135.301" width="356" height="129" fill="url(#emp_grid_agent3)" opacity="0.4" />
                          </g>

                          {/* TERMINAL CONTENT: REQUEST LOG & OKTA SYNC */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent3)' }}>
                            {/* Left panel: Log info */}
                            <g>
                              <text x="95" y="158" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold">REQUEST LOG #9082</text>

                              <text x="95" y="178" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C">User: <tspan fill="#CFD6E1" fontWeight="bold">eleanor.p@company.com</tspan></text>
                              <text x="95" y="198" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C">Inquiry: <tspan fill="#8B5CF6" fontWeight="bold">"Server Room Access"</tspan></text>
                              <text x="95" y="218" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C">Mithriv AI: <tspan fill="#10B981" fontWeight="bold">APPROVED</tspan></text>

                              {/* Progress bar */}
                              <rect x="95" y="232" width="130" height="6" rx="3" fill="rgba(255, 255, 255, 0.05)" />
                              <rect x="95" y="232" width="130" height="6" rx="3" fill="#10B981" className="progress-bar-glow" style={{ transformOrigin: 'left' }} />
                            </g>

                            {/* Right panel: Padlock Orbit */}
                            <g>
                              <rect x="255" y="145" width="160" height="110" rx="6" fill="url(#bluePurpleGrad_agent3)" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                              <text x="335" y="162" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">OKTA INTEGRATION</text>

                              {/* Padlock graphic */}
                              <g>
                                <rect x="327" y="196" width="16" height="14" rx="2" fill="none" stroke="#CFD6E1" strokeWidth="1" />
                                <path d="M330,196 V192 C330,189 340,189 340,192 V196" fill="none" stroke="#CFD6E1" strokeWidth="1" />

                                <circle cx="335" cy="200" r="28" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" strokeDasharray="3, 3" className="rotate-orbit-agent-path" style={{ transformOrigin: '335px 200px' }} />
                                <circle cx="335" cy="200" r="22" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" strokeDasharray="2, 4" className="rotate-orbit-agent-path" style={{ animationDirection: 'reverse', transformOrigin: '335px 200px' }} />
                              </g>

                              <text x="335" y="244" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">OKTA SYNCED ✓</text>
                            </g>
                          </g>

                          {/* SCANLINE SWEET */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent3)' }}>
                            <line x1="74" y1="136" x2="428" y2="136" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" className="scanline-kiosk-laser" />
                          </g>

                          {/* PIP STEP 1: Auth Request */}
                          <g filter="url(#filter1_d_agent3)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="115.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Auth Request</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 1 */}
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" className="flow-pulse-line-1" />

                          {/* PIP STEP 2: Okta Check */}
                          <g filter="url(#filter2_d_agent3)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="249.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Okta Check</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 2 */}
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" className="flow-pulse-line-2" />

                          {/* PIP STEP 3: Access Granted */}
                          <g filter="url(#filter3_d_agent3)">
                            <rect x="336.297" y="316.301" width="104" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="103" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="388.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Access Granted</text>
                          </g>

                          {/* CARD 4: DIRECTORY SYNC (BOTTOM RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.8s" }}>
                            <foreignObject x="335.997" y="263.001" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent3_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter4_d_agent3)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="434.3" y="326" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Directory Sync</text>
                            <text x="434.3" y="354" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#8B5CF6" fontWeight="bold" textAnchor="middle">Active Sync</text>
                          </g>

                          {/* CARD 5: WORKFORCE AUTH (TOP LEFT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.2s" }}>
                            <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent3_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter5_d_agent3)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="78.3" y="44" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Workforce Auth</text>
                            <text x="78.3" y="70" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">Okta Synced</text>
                          </g>

                          <defs>
                            <clipPath id="card-screen-clip_agent3">
                              <rect x="73.2969" y="135.301" width="356" height="129" rx="10" />
                            </clipPath>
                            <pattern id="emp_grid_agent3" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                            </pattern>
                            <linearGradient id="bluePurpleGrad_agent3" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                            </linearGradient>
                            <filter id="filter0_d_agent3" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent3" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent3" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent3" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent3" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent3" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent3" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent3" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent3" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent3_clip_path" transform="translate(-335.997 -263.001)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath>
                            <filter id="filter5_d_agent3" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent3" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent3" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent3_clip_path" transform="translate(5.00312 4.99922)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath>
                            <linearGradient id="paint0_linear_agent3" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0F1112" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent3" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}

                    {/* Contractor Agent (04) */}
                    {activeAgent === 3 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent4)" stroke="url(#paint1_linear_agent4)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />

                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">CONTRACTOR TERMINAL</text>

                          {/* MAIN CARD SCREEN */}
                          <g filter="url(#filter0_d_agent4)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>

                          {/* BACKGROUND GRID */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent4)' }}>
                            <rect x="73.2969" y="135.301" width="356" height="129" fill="url(#cont_grid_agent4)" opacity="0.4" />
                          </g>

                          {/* TERMINAL CONTENT: ONBOARDING CHECKS & COUNTDOWN */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent4)' }}>
                            {/* Left panel: Verification list */}
                            <g>
                              <text x="95" y="158" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold">VENDOR: APEX SECURITY</text>
                              <text x="95" y="174" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" fontWeight="bold">MARK STEVENS</text>

                              {/* Checklist elements */}
                              <g>
                                {/* Item 1 */}
                                <rect x="95" y="184" width="8" height="8" rx="1" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                                <polyline points="97,188 99,190 101,186" stroke="#10B981" strokeWidth="1.2" fill="none" />
                                <text x="110" y="192" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1">Safety Briefing [OK]</text>

                                {/* Item 2 */}
                                <rect x="95" y="200" width="8" height="8" rx="1" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                                <polyline points="97,204 99,206 101,202" stroke="#10B981" strokeWidth="1.2" fill="none" />
                                <text x="110" y="208" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1">NDA Signature [OK]</text>

                                {/* Item 3 */}
                                <rect x="95" y="216" width="8" height="8" rx="1" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                                <polyline points="97,220 99,222 101,218" stroke="#10B981" strokeWidth="1.2" fill="none" />
                                <text x="110" y="224" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1">Credentials [OK]</text>

                                {/* Item 4 */}
                                <rect x="95" y="232" width="8" height="8" rx="1" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                                <polyline points="97,236 99,238 101,234" stroke="#10B981" strokeWidth="1.2" fill="none" />
                                <text x="110" y="240" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1">Escort Assigned [OK]</text>
                              </g>
                            </g>

                            {/* Right panel: Revocation dial */}
                            <g>
                              <rect x="255" y="145" width="160" height="110" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                              <text x="335" y="162" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">REVOCATION COUNTDOWN</text>

                              <g>
                                <circle cx="335" cy="200" r="26" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="3.5" fill="none" />
                                <circle cx="335" cy="200" r="26" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="163" strokeDashoffset="45" className="timer-dash-run" strokeLinecap="round" fill="none" style={{ transformOrigin: '335px 200px' }} />
                                <text x="335" y="196" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" textAnchor="middle">ACCESS LEFT</text>
                                <text x="335" y="212" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#ffffff" fontWeight="bold" textAnchor="middle">18:42H</text>
                              </g>

                              <text x="335" y="244" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#EF4444" fontWeight="bold" textAnchor="middle">AUTO-REVOKE ACTIVE</text>
                            </g>
                          </g>

                          {/* SCANLINE SWEET */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent4)' }}>
                            <line x1="74" y1="136" x2="428" y2="136" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" className="scanline-kiosk-laser" />
                          </g>

                          {/* PIP STEP 1: Upload NDA */}
                          <g filter="url(#filter1_d_agent4)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="115.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Upload NDA</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 1 */}
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" className="flow-pulse-line-1" />

                          {/* PIP STEP 2: Briefing */}
                          <g filter="url(#filter2_d_agent4)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="249.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Briefing</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 2 */}
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" className="flow-pulse-line-2" />

                          {/* PIP STEP 3: Pass Active */}
                          <g filter="url(#filter3_d_agent4)">
                            <rect x="336.297" y="316.301" width="104" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="103" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="388.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Pass Active</text>
                          </g>

                          {/* CARD 4: ACCESS STATE (BOTTOM RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.8s" }}>
                            <foreignObject x="335.997" y="263.001" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent4_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter4_d_agent4)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="434.3" y="326" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Access State</text>
                            <text x="434.3" y="354" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#8B5CF6" fontWeight="bold" textAnchor="middle">Auto Revoke</text>
                          </g>

                          {/* CARD 5: SAFETY BRIEFING (TOP LEFT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.4s" }}>
                            <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent4_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter5_d_agent4)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="78.3" y="44" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Safety Briefing</text>
                            <text x="78.3" y="70" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">Completed</text>
                          </g>

                          <defs>
                            <clipPath id="card-screen-clip_agent4">
                              <rect x="73.2969" y="135.301" width="356" height="129" rx="10" />
                            </clipPath>
                            <pattern id="cont_grid_agent4" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                            </pattern>
                            <filter id="filter0_d_agent4" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent4" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent4" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent4" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent4" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent4" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent4" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent4" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent4" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent4_clip_path" transform="translate(-335.997 -263.001)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath>
                            <filter id="filter5_d_agent4" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent4" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent4" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent4_clip_path" transform="translate(5.00312 4.99922)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath>
                            <linearGradient id="paint0_linear_agent4" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0F1112" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent4" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}

                    {/* Emergency Agent (05) */}
                    {activeAgent === 4 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent5)" stroke="url(#paint1_linear_agent5)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />

                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">CRISIS COMMAND</text>

                          {/* MAIN CARD SCREEN */}
                          <g filter="url(#filter0_d_agent5)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>

                          {/* BACKGROUND GRID */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent5)' }}>
                            <rect x="73.2969" y="135.301" width="356" height="129" fill="url(#emerg_grid_agent5)" opacity="0.4" />
                          </g>

                          {/* TERMINAL CONTENT: CHANNELS & MUSTER STATE */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent5)' }}>
                            {/* Left panel: Channels */}
                            <g>
                              <text x="95" y="158" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold">PROPAGATION CHANNELS</text>

                              {/* SMS channel */}
                              <rect x="95" y="168" width="45" height="18" rx="2" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                              <text x="117.5" y="181" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">SMS</text>
                              <line x1="140" y1="177" x2="205" y2="209" stroke="#10B981" strokeWidth="1" strokeDasharray="2, 2" />

                              {/* SLACK channel */}
                              <rect x="95" y="191" width="45" height="18" rx="2" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                              <text x="117.5" y="204" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">SLACK</text>
                              <line x1="140" y1="200" x2="205" y2="209" stroke="#10B981" strokeWidth="1" />

                              {/* TEAMS channel */}
                              <rect x="95" y="214" width="45" height="18" rx="2" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                              <text x="117.5" y="227" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">TEAMS</text>
                              <line x1="140" y1="223" x2="205" y2="209" stroke="#10B981" strokeWidth="1" strokeDasharray="2, 2" />

                              {/* VOICE channel */}
                              <rect x="95" y="237" width="45" height="18" rx="2" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="0.8" />
                              <text x="117.5" y="250" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">VOICE</text>
                              <line x1="140" y1="246" x2="205" y2="209" stroke="#10B981" strokeWidth="1" />

                              {/* Pulse beacon */}
                              <circle cx="205" cy="209" r="5" fill="#EF4444" className="blink-led-active" />
                              <circle cx="205" cy="209" r="14" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" className="wave-pulse-tactical-circle" style={{ transformOrigin: '205px 209px' }} />
                            </g>

                            {/* Right panel: Response Rate */}
                            <g>
                              <rect x="255" y="145" width="160" height="110" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="1" />
                              <text x="335" y="162" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">MUSTER STATUS</text>

                              <text x="335" y="195" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="26" fill="#EF4444" fontWeight="bold" textAnchor="middle">98.4%</text>
                              <text x="335" y="215" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" fontWeight="bold" textAnchor="middle">SAFE: 1,402 / 1,425</text>

                              <rect x="265" y="226" width="140" height="20" rx="2" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.8" />
                              <text x="335" y="240" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">EVERY MEMBER NOTIFIED ✓</text>
                            </g>
                          </g>

                          {/* SCANLINE SWEET */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent5)' }}>
                            <line x1="74" y1="136" x2="428" y2="136" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.4" className="scanline-kiosk-laser" />
                          </g>

                          {/* PIP STEP 1: Trigger */}
                          <g filter="url(#filter1_d_agent5)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="115.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Trigger</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 1 */}
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" className="flow-pulse-line-1" />

                          {/* PIP STEP 2: Broadcasting */}
                          <g filter="url(#filter2_d_agent5)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="249.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Broadcasting</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 2 */}
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" className="flow-pulse-line-2" />

                          {/* PIP STEP 3: Muster Active */}
                          <g filter="url(#filter3_d_agent5)">
                            <rect x="336.297" y="316.301" width="104" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="103" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="388.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Muster Active</text>
                          </g>

                          {/* CARD 4: MUSTERING KPI (BOTTOM RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.6s" }}>
                            <foreignObject x="335.997" y="263.001" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent5_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter4_d_agent5)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="434.3" y="326" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Mustering KPI</text>
                            <text x="434.3" y="354" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#EF4444" fontWeight="bold" textAnchor="middle">100% Account</text>
                          </g>

                          {/* CARD 5: ALERTS SENT (TOP LEFT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.0s" }}>
                            <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent5_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter5_d_agent5)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="78.3" y="44" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Alerts Sent</text>
                            <text x="78.3" y="70" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#EF4444" fontWeight="bold" textAnchor="middle">Every Channel</text>
                          </g>

                          <defs>
                            <clipPath id="card-screen-clip_agent5">
                              <rect x="73.2969" y="135.301" width="356" height="129" rx="10" />
                            </clipPath>
                            <pattern id="emerg_grid_agent5" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                            </pattern>
                            <filter id="filter0_d_agent5" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent5" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent5" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent5" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent5" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent5" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent5" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent5" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent5" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent5_clip_path" transform="translate(-335.997 -263.001)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath>
                            <filter id="filter5_d_agent5" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent5" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent5" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent5_clip_path" transform="translate(5.00312 4.99922)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath>
                            <linearGradient id="paint0_linear_agent5" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0F1112" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent5" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}

                    {/* Executive Agent (06) */}
                    {activeAgent === 5 && (
                      <>
                        <svg width="100%" height="100%" viewBox="0 0 513 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="38.7969" y="23.8008" width="436" height="308" rx="9.5" fill="url(#paint0_linear_agent6)" stroke="url(#paint1_linear_agent6)" />
                          <line x1="37.2969" y1="74.8008" x2="475.297" y2="74.8008" stroke="#262728" />

                          {/* HEADER TITLE */}
                          <text x="256" y="52" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" letterSpacing="2" textAnchor="middle">INTELLIGENCE CONSOLE</text>

                          {/* MAIN CARD SCREEN */}
                          <g filter="url(#filter0_d_agent6)">
                            <rect x="73.2969" y="135.301" width="356" height="129" rx="10" fill="#141516" />
                            <rect x="73.7969" y="135.801" width="355" height="128" rx="9.5" stroke="#262728" />
                          </g>

                          {/* BACKGROUND GRID */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent6)' }}>
                            <rect x="73.2969" y="135.301" width="356" height="129" fill="url(#exec_grid_agent6)" opacity="0.4" />
                          </g>

                          {/* TERMINAL CONTENT: PROMPT & COMPLIANCE TREND */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent6)' }}>
                            {/* Query bar */}
                            <rect x="85" y="145" width="332" height="22" rx="4" fill="#0C0D10" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" />
                            <circle cx="95" cy="156" r="3" fill="#8B5CF6" className="blink-led-active" />
                            <text x="105" y="161" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" fontWeight="bold">Summarize site-wide compliance trends this week.</text>

                            {/* Left panel: Compliance Graph */}
                            <g>
                              {/* Axis */}
                              <path d="M95,245 L95,185 M95,245 L235,245" stroke="#53585C" strokeWidth="1" />

                              {/* Trend area fill & stroke */}
                              <path d="M95,230 Q 120,205, 145,220 T 195,195 T 230,180 L 230,245 L 95,245 Z" fill="url(#chartGrad_agent6)" />
                              <path d="M95,230 Q 120,205, 145,220 T 195,195 T 230,180" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />

                              {/* Data points */}
                              <circle cx="145" cy="220" r="2.5" fill="#8B5CF6" />
                              <circle cx="195" cy="195" r="2.5" fill="#8B5CF6" />
                              <circle cx="230" cy="180" r="2.5" fill="#10B981" className="blink-led-active" />
                              <text x="230" y="172" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="bold">99.1%</text>
                            </g>

                            {/* Right panel: Grade Badge */}
                            <g>
                              <rect x="255" y="175" width="162" height="80" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                              <text x="336" y="192" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">SECURITY INDEX</text>

                              <circle cx="336" cy="216" r="16" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
                              <text x="336" y="221" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">A+</text>

                              <text x="336" y="246" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" textAnchor="middle" fontWeight="bold">VERY STRONG</text>
                            </g>
                          </g>

                          {/* SCANLINE SWEET */}
                          <g style={{ clipPath: 'url(#card-screen-clip_agent6)' }}>
                            <line x1="74" y1="136" x2="428" y2="136" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" className="scanline-kiosk-laser" />
                          </g>

                          {/* PIP STEP 1: Query */}
                          <g filter="url(#filter1_d_agent6)">
                            <rect x="73.2969" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="73.7969" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="115.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Query</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 1 */}
                          <path d="M207.297 330.301L202.297 327.414L202.297 333.188L207.297 330.301ZM157.297 330.301L157.297 330.801L202.797 330.801L202.797 330.301L202.797 329.801L157.297 329.801L157.297 330.301Z" fill="#262728" className="flow-pulse-line-1" />

                          {/* PIP STEP 2: Synthesizing */}
                          <g filter="url(#filter2_d_agent6)">
                            <rect x="207.297" y="316.301" width="84" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="207.797" y="316.801" width="83" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="249.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Synthesizing</text>
                          </g>

                          {/* CONNECTING FLOW ARROW 2 */}
                          <path d="M336.297 330.301L331.297 327.414V333.188L336.297 330.301ZM291.297 330.301V330.801H331.797V330.301V329.801H291.297V330.301Z" fill="#262728" className="flow-pulse-line-2" />

                          {/* PIP STEP 3: Insights Ready */}
                          <g filter="url(#filter3_d_agent6)">
                            <rect x="336.297" y="316.301" width="104" height="28" rx="6" fill="#141516" shapeRendering="crispEdges" />
                            <rect x="336.797" y="316.801" width="103" height="27" rx="5.5" stroke="#262728" shapeRendering="crispEdges" />
                            <text x="388.3" y="334" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#CFD6E1" textAnchor="middle">Insights Ready</text>
                          </g>

                          {/* CARD 4: SECURITY POSTURE (BOTTOM RIGHT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.8s" }}>
                            <foreignObject x="335.997" y="263.001" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_0_agent6_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter4_d_agent6)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="367.797" y="294.801" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="434.3" y="326" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Security Posture</text>
                            <text x="434.3" y="354" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#8B5CF6" fontWeight="bold" textAnchor="middle">A+ Rating</text>
                          </g>

                          {/* CARD 5: SECURITY INDEX (TOP LEFT) */}
                          <g className="float-badge-box" style={{ animationDelay: "0.4s" }}>
                            <foreignObject x="-5.00312" y="-4.99922" width="181.6" height="127.6">
                              <div style={{ backdropFilter: "blur(8.15px)", clipPath: "url(#bgblur_1_agent6_clip_path)", height: "100%", width: "100%" }}></div>
                            </foreignObject>
                            <g filter="url(#filter5_d_agent6)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" fill="#141516" fillOpacity="1" shapeRendering="crispEdges" />
                              <rect x="11.7969" y="11.8008" width="133" height="79" rx="9.5" stroke="#262728" shapeRendering="crispEdges" />
                            </g>
                            <text x="78.3" y="44" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="12" fill="#53585C" fontWeight="bold" textAnchor="middle">Security Index</text>
                            <text x="78.3" y="70" fontFamily="'Inter', var(--font-sans), sans-serif" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">99.1% Secured</text>
                          </g>

                          <defs>
                            <clipPath id="card-screen-clip_agent6">
                              <rect x="73.2969" y="135.301" width="356" height="129" rx="10" />
                            </clipPath>
                            <pattern id="exec_grid_agent6" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                            </pattern>
                            <linearGradient id="chartGrad_agent6" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                            </linearGradient>
                            <filter id="filter0_d_agent6" x="58.7969" y="132.801" width="385" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent6" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <filter id="filter1_d_agent6" x="58.7969" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent6" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <filter id="filter2_d_agent6" x="192.797" y="313.801" width="113" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent6" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <filter id="filter3_d_agent6" x="321.797" y="313.801" width="121" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feMorphology radius="23" operator="erode" in="SourceAlpha" result="effect1_dropShadow_agent6" />
                              <feOffset dy="12" />
                              <feGaussianBlur stdDeviation="18.75" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.000456116 0 0 0 0 0.000233453 0 0 0 0 0.000901442 0 0 0 0.13 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <filter id="filter4_d_agent6" x="335.997" y="263.001" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="-10" dy="-10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <clipPath id="bgblur_0_agent6_clip_path" transform="translate(-335.997 -263.001)">
                              <rect x="367.297" y="294.301" width="134" height="80" rx="10" />
                            </clipPath>
                            <filter id="filter5_d_agent6" x="-5.00312" y="-4.99922" width="181.6" height="127.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dx="10" dy="10" />
                              <feGaussianBlur stdDeviation="10.65" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0 0.04218 0 0 0 0.73 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_agent6" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_agent6" result="shape" />
                            </filter>
                            <clipPath id="bgblur_1_agent6_clip_path" transform="translate(5.00312 4.99922)">
                              <rect x="11.2969" y="11.3008" width="134" height="80" rx="10" />
                            </clipPath>
                            <linearGradient id="paint0_linear_agent6" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0F1112" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_agent6" x1="256.797" y1="23.3008" x2="256.797" y2="332.301" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#262728" />
                              <stop offset="1" stopColor="#0C0D0F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    )}
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', position: 'relative', zIndex: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#B6B6B7' }}>
                      [ RUN_DUR: 42894H ]
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#10B981' }}>
                      [ SYSTEM_SECURE ]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3.5: Premium Scroll Reveal Statement */}
          <section
            id="scroll-reveal-text"
            style={{
              background: '#FAF9F6',
              color: '#0F1115',
              margin: '0 calc(-50vw + 50%)',
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              padding: '80px 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            {/* Background Transition Layer (Fades in / Revealed inside the 'O') */}
            <div
              className="zoom-transition-bg"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background: '#0C0D10',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                padding: '50px 0 0px 0',
                opacity: 1,
                pointerEvents: 'auto',
                boxSizing: 'border-box',
                overflowY: 'auto'
              }}
            >
              <div
                className="zoom-transition-content"
                style={{ width: '100%', opacity: 0, pointerEvents: 'auto', flexShrink: 0 }}
              >
                <IndustrySection isEmbedded={true} />
              </div>
            </div>

            {/* Title Content Layer */}
            <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
              <h2 className="reveal-title" style={{
                fontSize: 'clamp(32px, 3.8vw, 48px)',
                lineHeight: '1.4',
                fontWeight: 600,
                color: '#0F1115', // base dark color before reveal
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                {"The gap between your security systems and your stakeholders. Closed.".split(" ").map((word, wordIdx) => {
                  const isStakeholders = word.toLowerCase().startsWith("stakeholders");
                  return (
                    <span
                      key={wordIdx}
                      style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '14px' }}
                    >
                      {word.split("").map((char, charIdx) => {
                        const isTargetO = isStakeholders && char.toLowerCase() === 'o';
                        if (isTargetO) {
                          return (
                            <span
                              key={charIdx}
                              className="reveal-char target-o"
                              style={{
                                display: 'inline-block',
                                transition: 'color 0.05s ease',
                                color: '#0F1115',
                                position: 'relative'
                              }}
                            >
                              {char}
                            </span>
                          );
                        }
                        return (
                          <span
                            key={charIdx}
                            className="reveal-char"
                            style={{
                              display: 'inline-block',
                              transition: 'color 0.05s ease',
                              color: '#0F1115'
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </h2>
            </div>
          </section>

          <section
            id="honest-positioning"
            style={{
              background: '#FAF5EB',
              color: '#0F1115',
              margin: '0 calc(-50vw + 50%)',
              width: '100vw',
              padding: '120px 2rem',
              position: 'relative',
              zIndex: 10,
              boxSizing: 'border-box',
              fontFamily: "var(--font-main), 'Inter', sans-serif"
            }}
          >
            <style>{`
              .honest-grid-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                border: 1px solid rgba(15, 17, 21, 0.08);
                background: #ffffff;
                border-radius: 0px;
                margin-top: 48px;
              }
              .honest-column {
                padding: 48px;
                box-sizing: border-box;
              }
              .honest-column-left {
                border-right: 1px solid rgba(15, 17, 21, 0.08);
                background: rgba(139, 92, 246, 0.015);
              }
              .honest-item-row {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                padding: 20px 0;
                border-bottom: 1px solid rgba(15, 17, 21, 0.06);
              }
              .honest-item-row:last-child {
                border-bottom: none;
              }
              @media (max-width: 991px) {
                .honest-grid-container {
                  grid-template-columns: 1fr !important;
                }
                .honest-column-left {
                  border-right: none !important;
                  border-bottom: 1px solid rgba(15, 17, 21, 0.08);
                }
                .honest-column {
                  padding: 36px 24px !important;
                }
              }
            `}</style>

            <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                <span className="ent-pill" style={{
                  marginLeft: '0px',
                  marginBottom: '0px',
                  background: 'rgba(15, 17, 21, 0.04)',
                  border: '1px solid rgba(15, 17, 21, 0.12)',
                  color: '#0F1115',
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace"
                }}>
                  Honest Positioning
                </span>
              </div>

              <h2 style={{
                fontSize: '48px',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                fontWeight: 600,
                textAlign: 'left',
                color: '#0F1115',
                fontFamily: 'var(--font-main)'
              }}>
                What it is. What it isn't.
              </h2>

              <p style={{
                maxWidth: '850px',
                margin: '0 0 3rem',
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.6',
                textAlign: 'left',
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace"
              }}>
                We believe in clear expectations. Here's where the Communication Interface excels and where other approaches may be more appropriate.
              </p>

              <div className="honest-grid-container">

                {/* Excels Column */}
                <div className="honest-column honest-column-left">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#8B5CF6',
                      fontWeight: 'bold',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      padding: '2px 8px',
                      background: 'rgba(139, 92, 246, 0.05)'
                    }}>
                      EXCELS
                    </span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#0F1115',
                      fontFamily: 'var(--font-main)',
                      margin: 0
                    }}>
                      Where it excels
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      'High-volume visitor environments',
                      'Multi-site operations requiring consistency',
                      'Regulated industries with audit requirements',
                      'Organizations coordinating guard forces',
                      'Facilities where communication failures have safety or compliance consequences'
                    ].map((item, i) => (
                      <div key={i} className="honest-item-row">
                        <span style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '13px',
                          color: '#8B5CF6',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          [✓]
                        </span>
                        <span style={{
                          fontSize: '14px',
                          lineHeight: '1.5',
                          color: '#1F2937',
                          fontWeight: 500,
                          fontFamily: 'var(--font-main)'
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternatives Column */}
                <div className="honest-column">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#6B7280',
                      fontWeight: 'bold',
                      border: '1px solid rgba(15, 17, 21, 0.15)',
                      padding: '2px 8px',
                      background: 'rgba(15, 17, 21, 0.02)'
                    }}>
                      ALTERNATIVES
                    </span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#0F1115',
                      fontFamily: 'var(--font-main)',
                      margin: 0
                    }}>
                      Where other approaches fit better
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      'Single-site operations with minimal visitor traffic',
                      'Organizations without existing security systems to integrate',
                      'Environments where communication can remain purely human-mediated'
                    ].map((item, i) => (
                      <div key={i} className="honest-item-row">
                        <span style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '13px',
                          color: '#6B7280',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          [o]
                        </span>
                        <span style={{
                          fontSize: '14px',
                          lineHeight: '1.5',
                          color: '#4B5563',
                          fontWeight: 500,
                          fontFamily: 'var(--font-main)'
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* The Honest Tradeoff Quote Box */}
              <div
                style={{
                  marginTop: '64px',
                  borderLeft: '4px solid #F43F5E',
                  padding: '28px 36px',
                  background: 'rgba(244, 63, 94, 0.02)',
                  borderRadius: '0px',
                  textAlign: 'left',
                  boxSizing: 'border-box'
                }}
              >
                <h4 style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#E11D48',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginTop: 0,
                  marginBottom: '12px'
                }}>
                  THE HONEST TRADEOFF
                </h4>
                <p style={{
                  fontFamily: 'var(--font-main)',
                  fontStyle: 'italic',
                  color: '#374151',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  "Conversational AI amplifies your security team. It doesn't replace them. Organizations seeking to make their staff dramatically more effective will see significant returns."
                </p>
              </div>

            </div>
          </section>

          {/* Canvas Reveal Section */}
          <section
            ref={revealSectionRef}
            className="canvas-reveal-section"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <canvas
              ref={revealCanvasRef}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                left: 0,
                right: 0,
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                left: 0,
                right: 0,
                background: 'radial-gradient(ellipse 60% 70% at center, rgba(11,13,15,0.92) 0%, rgba(11,13,15,0.75) 40%, rgba(11,13,15,0.2) 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
            <div className="canvas-content" style={{ position: 'relative', zIndex: 2 }}>
              <h2 ref={revealTitleRef} className="canvas-title">Hire our security agents</h2>
              <p
                ref={revealSubtitleRef}
                className="canvas-subtitle"
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#B6B6B7',
                  lineHeight: '1.6',
                  margin: '0 auto 40px',
                  maxWidth: '580px',
                  textAlign: 'center'
                }}
              >
                Autonomous security that never blinks. AI agents that observe, decide, and act in real time.
              </p>
              <a ref={revealBtnRef} href="#" className="ent-btn-primary">Learn More</a>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
