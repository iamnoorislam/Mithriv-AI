'use client'

import React, { useEffect, useState, useRef } from 'react'
import '../style.css'
import IndustrySection from '@/components/IndustrySection'
import { 
  AnimatedCrowdIcon, AnimatedNetworkNodesIcon, AnimatedAuditStampIcon, AnimatedWalkieTalkieIcon, AnimatedSirenIcon,
  AnimatedSmallBuildingIcon, AnimatedStandaloneBoxIcon, AnimatedCoffeeChatIcon 
} from '@/components/HonestIcons'

const HonestAnimatedItem = ({ text, IconComponent, color, textColor, isLast }: { text: string, IconComponent: any, color: string, textColor: string, isLast: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="honest-item-row" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px 0', position: 'relative', cursor: 'default' }}
    >
      <span className="honest-row-icon" style={{ flexShrink: 0, marginTop: '2px' }}>
        <IconComponent color={color} size={18} isHovered={isHovered} />
      </span>
      <span className="honest-row-text" style={{
        fontSize: '14px',
        lineHeight: '1.5',
        color: textColor,
        fontWeight: 500,
        fontFamily: 'var(--font-main)',
        display: 'inline-block'
      }}>
        {text}
      </span>
      {!isLast && (
        <div className="honest-row-line" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: '#212326',
          transformOrigin: 'left center'
        }} />
      )}
    </div>
  );
};

const splitWords = (text: string, className = "honest-word") => {
  return text.split(' ').map((word, wordIdx) => (
    <span key={wordIdx} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'bottom' }}>
      <span className={className} style={{ display: 'inline-block' }}>
        {word}
      </span>
    </span>
  ));
};

const AGENTS_DATA = [
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
];

export default function CommunicationV2Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('problem');
  const [activeAgent, setActiveAgent] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [visitorSeconds, setVisitorSeconds] = useState(47);
  const [accountedPercent, setAccountedPercent] = useState(98.4);
  const [unconfirmedCount, setUnconfirmedCount] = useState(23);
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
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const runVisitorCycle = () => {
      let sec = 0;
      setVisitorSeconds(0);
      interval = setInterval(() => {
        sec += 1;
        if (sec >= 47) {
          setVisitorSeconds(47);
          clearInterval(interval);
          timeout = setTimeout(runVisitorCycle, 4000);
        } else {
          setVisitorSeconds(sec);
        }
      }, 30);
    };
    runVisitorCycle();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const runEmergencyCycle = () => {
      let pct = 0;
      let unc = 120;
      setAccountedPercent(0);
      setUnconfirmedCount(120);
      interval = setInterval(() => {
        pct += 3.3;
        unc -= 4;
        if (pct >= 98.4) {
          setAccountedPercent(98.4);
          setUnconfirmedCount(23);
          clearInterval(interval);
          timeout = setTimeout(runEmergencyCycle, 4000);
        } else {
          setAccountedPercent(parseFloat(pct.toFixed(1)));
          setUnconfirmedCount(Math.max(23, unc));
        }
      }, 40);
    };
    runEmergencyCycle();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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

      // 9. Scroll Reveal for Honest Positioning Section
      const honestSec = document.getElementById('honest-positioning');
      if (honestSec) {
        const tag = honestSec.querySelector('.ent-pill');
        const quoteBox = honestSec.querySelector('.honest-quote-box');
        const quoteBorder = honestSec.querySelector('.honest-quote-border');
        const quoteBg = honestSec.querySelector('.honest-quote-bg');
        const quoteContent = honestSec.querySelector('.honest-quote-content');

        // Set initial states
        gsap.set(tag, { y: 15, opacity: 0, scale: 0.9 });
        gsap.set(".honest-word", { yPercent: 100 });
        gsap.set(".honest-desc-word", { opacity: 0, y: 10 });
        gsap.set([".honest-grid-line-top", ".honest-grid-line-bottom"], { scaleX: 0 });
        gsap.set([".honest-grid-line-left", ".honest-grid-line-right"], { scaleY: 0 });
        gsap.set(".honest-grid-line-middle", { scaleY: 0 });
        gsap.set(".honest-grid-line-mobile-divider", { scaleX: 0 });
        gsap.set(".honest-row-line", { scaleX: 0 });
        gsap.set(".honest-row-bullet", { scale: 0, rotate: -30, opacity: 0 });
        gsap.set(".honest-row-text", { opacity: 0, x: -10 });
        gsap.set(quoteBorder, { scaleY: 0 });
        gsap.set(quoteBg, { scaleX: 0 });
        gsap.set(quoteContent, { opacity: 0, x: 15 });

        ScrollTrigger.create({
          id: "honest-positioning-reveal",
          trigger: honestSec,
          start: "top 75%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.addLabel("start")
              // Step 1: Reveal tag
              .to(tag, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, "start")
              // Step 2: Reveal heading words (staggered clipping mask)
              .to(".honest-word", { yPercent: 0, duration: 0.5, stagger: 0.02, ease: "power4.out" }, "start+=0.1")
              // Step 3: Reveal description words
              .to(".honest-desc-word", { opacity: 1, y: 0, duration: 0.4, stagger: 0.01, ease: "power2.out" }, "start+=0.2")
              // Step 4: Draw grid border lines
              .to([".honest-grid-line-top", ".honest-grid-line-bottom"], { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "start+=0.1")
              .to([".honest-grid-line-left", ".honest-grid-line-right"], { scaleY: 1, duration: 0.5, ease: "power3.inOut" }, "start+=0.2")
              // Step 5: Draw middle vertical line (desktop) or mobile horizontal divider line (mobile)
              .to([".honest-grid-line-middle", ".honest-grid-line-mobile-divider"], { scaleY: 1, scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "start+=0.2")
              // Step 6: Draw row dividers
              .to(".honest-row-line", { scaleX: 1, duration: 0.4, stagger: 0.03, ease: "power2.out" }, "start+=0.3")
              // Step 7: Pop bullets and slide texts
              .to(".honest-row-bullet", { scale: 1, rotate: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(2)" }, "start+=0.4")
              .to(".honest-row-text", { opacity: 1, x: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }, "start+=0.4")
              // Step 8: Draw quote box border
              .to(quoteBorder, { scaleY: 1, duration: 0.4, ease: "power3.inOut" }, "start+=0.3")
              // Step 9: Wipe quote box bg
              .to(quoteBg, { scaleX: 1, duration: 0.4, ease: "power3.out" }, "start+=0.4")
              // Step 10: Reveal quote content
              .to(quoteContent, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "start+=0.5");
          }
        });
      }

      // 10. Scroll Reveal for Operational Outcomes Section
      const outcomesSec = document.getElementById('operational-outcomes');
      if (outcomesSec && w.gsap && w.ScrollTrigger) {
        const header = outcomesSec.querySelector('h2');
        const desc = outcomesSec.querySelector('p');
        const btn = outcomesSec.querySelector('a');
        const cards = outcomesSec.querySelectorAll('.operational-grid-card');

        gsap.set([header, desc, btn], { y: 30, opacity: 0 });
        gsap.set(cards, { y: 40, opacity: 0 });

        ScrollTrigger.create({
          id: "operational-outcomes-reveal",
          trigger: outcomesSec,
          start: "top 75%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to([header, desc, btn], { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" })
              .to(cards, { y: 0, opacity: 1, duration: 1.0, stagger: 0.1, ease: "power3.out" }, "-=0.4");
          }
        });
      }

      // 11. Scroll Reveal for Canvas Reveal Section (Hire Agent)
      const canvasRevealSecElement = revealSectionRef.current;
      const revealCanvas = revealCanvasRef.current;
      if (canvasRevealSecElement && revealCanvas) {
        gsap.set(revealCanvas, { opacity: 0, scale: 1.05 });
        ScrollTrigger.create({
          id: "canvas-reveal-story",
          trigger: canvasRevealSecElement,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(revealCanvas, {
              opacity: 1,
              scale: 1,
              duration: 2.5,
              ease: "power3.out"
            });
          }
        });
      }
    };

    const init = () => {
      if (w.runHeroDotCanvas02 && w.runMain && w.gsap && w.ScrollTrigger) {
        deferTimer = setTimeout(() => {
          try {
            w.runHeroDotCanvas02();
          } catch (e) {
            console.error("Error in runHeroDotCanvas02:", e);
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
      if (w.cancelHeroDotCanvas02Anim) {
        w.cancelHeroDotCanvas02Anim();
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
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)',
          maskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)'
        }}>
          <canvas id="heroDotCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
        </div>

        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, marginTop: '0' }}>
          <div className="ent-pill award-pill">Communication Interface</div>
          <h1 className="main-heading">
        <span className="word-mask"><span className="word-inner w1">Security</span></span>{' '}
        <span className="word-mask"><span className="word-inner w2">that</span></span>{' '}
        <span className="word-mask"><span className="word-inner w3">speaks.</span></span><br />
        <span className="word-mask"><span className="word-inner w4">Operations</span></span>{' '}
        <span className="word-mask"><span className="word-inner w5">that</span></span>{' '}
        <span className="word-mask"><span className="word-inner w6">listen.</span></span>
      </h1>
          <p className="body-text award-fade-up delay-p" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every stakeholder speaks to a different system. Mithriv brings every conversation, decision, and action into one operational layer.
          </p>
          <a href="#" className="ent-btn-primary award-fade-up delay-btn" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>Request Communication Assessment <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
        </div>

        {/* Trusted By Strip */}
        <div className="relative w-full max-w-[1280px] mx-auto px-6 z-10 award-fade-up delay-strip" style={{ paddingTop: '140px', paddingBottom: '40px', marginTop: 'auto' }}>
          <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-diagonal-bg {
          from { background-position: 0 0; }
          to { background-position: 8px 0; }
        }
        .feature-col-divider {
          background: #212326 !important;
        }
            @keyframes custom-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
          `}} />
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Trusted by these companies</h2>
          </div>
          
          <div className="relative flex overflow-hidden w-full group">
            <div className="flex overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
              {[0, 1].map((marqueeIdx) => (
                <div key={marqueeIdx} className="flex shrink-0 items-center justify-start w-max" style={{ gap: '3.5rem', minWidth: '100%', paddingRight: '3.5rem', animation: 'custom-marquee 15s linear infinite' }}>
                  {[0, 1].map((repeatIdx) => (
                    <React.Fragment key={repeatIdx}>
                      <div className="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                        <span style={{ letterSpacing: '-0.05em' }}>NEXT<span className="text-[#888]">.</span></span>
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                        React
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
                        shadcn/ui
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
                        supabase
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
                        tailwindcss
                      </div>
                      <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
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

      <style>{`
        .feature-col-item .fig-label {
          letter-spacing: 0 !important;
          text-transform: none !important;
        }
        .problem-split-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          background: transparent;
          border-top: 1px solid #212326;
          border-bottom: 1px solid #212326;
          border-left: 1px solid #212326;
          border-right: 1px solid #212326;
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
            border-top: 1px solid #212326 !important;
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
          border-top: 1px solid #212326;
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
          background: #111113;
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
          <h2 className="std-section-h2 text-center" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: '1.1', marginBottom: '24px' }}>Your Security Operation<br />Has a Communication Crisis</h2>
          <p className="std-section-subheading text-center" style={{ maxWidth: '500px', margin: '0 auto 3rem', fontSize: '14px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Every interaction is a bottleneck. Every handoff loses context. Every stakeholder speaks to a different system, or no system at all.
          </p>

          {/* Contrast split layout with high-tech animated SVG diagram */}
          <div className="problem-split-grid">
            <div className="feature-col-divider" style={{ left: '50%' }}></div>
            <div className="problem-split-left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#EA49B2', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(234, 73, 178, 0.3)', padding: '2px 6px' }}>SEC_OP_A</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#EA49B2', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your access control has AI
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#FCE545', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(252, 229, 69, 0.3)', padding: '2px 6px' }}>SEC_OP_B</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#FCE545', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your video has AI
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#4993E3', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(73, 147, 227, 0.3)', padding: '2px 6px' }}>SEC_OP_C</span>
                    <span style={{ width: '4px', height: '4px', backgroundColor: '#4993E3', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                    Your threat detection has AI
                  </h3>
                </div>

                <div style={{ 
                  margin: '40px -2.5rem -3.5rem -2.5rem', 
                  padding: '40px 2.5rem 3.5rem 2.5rem', 
                  borderTop: '1px solid #212326', 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' viewBox=\'0 0 8 8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-1,-1 L9,9 M7,-1 L9,1 M-1,7 L1,9\' stroke=\'%23212326\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                  animation: 'slide-diagonal-bg 0.5s linear infinite'
                }}>
                  <p style={{ fontSize: '24px', lineHeight: '1.5', fontWeight: 400, color: '#B6B6B7', letterSpacing: '-0.01em', margin: 0, position: 'relative', zIndex: 1 }}>
                    Yet <span style={{ color: '#6354F3', fontWeight: 500 }}>communication</span> still runs on radio silence, paper logs, and phones that go to voicemail.
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
                    <stop offset="0%" stopColor="#6354F3" stopOpacity="0" />
                    <stop offset="50%" stopColor="#EA49B2" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#EA49B2" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="red-laser-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E44856" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E44856" stopOpacity="0" />
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
                    return <line key={`x-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6354F3" strokeWidth="0.3" strokeDasharray="1, 8" />;
                  })}
                  {/* Diagonal Y-axis grid lines (down-left) */}
                  {[-4, -2, 0, 2, 4].map(i => {
                    const x1 = 185 - 150 * 0.866 + i * 30 * 0.866;
                    const y1 = 160 + 150 * 0.5 + i * 30 * 0.5;
                    const x2 = 185 + 150 * 0.866 + i * 30 * 0.866;
                    const y2 = 160 - 150 * 0.5 + i * 30 * 0.5;
                    return <line key={`y-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6354F3" strokeWidth="0.3" strokeDasharray="1, 8" />;
                  })}
                </g>

                {/* ACTIVE CONNECTIONS: 3D PATH RUNS (DARK BASES) */}
                {/* ACTIVE CONNECTIONS: 3D PATH RUNS (DARK BASES) */}
                <path d="M205,84 L205,100 L185,111.6 L185,145" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'access' && hoveredNode !== 'core' ? 0.2 : 1 }} />
                <path d="M270,124 L270,140 L200,180.4 L200,150" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'video' && hoveredNode !== 'core' ? 0.2 : 1 }} />
                <path d="M335,164 L335,180 L215,249.2 L215,150" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'threat' && hoveredNode !== 'core' ? 0.2 : 1 }} />

                {/* ACTIVE CONNECTIONS: 3D PATH RUNS (GLOWING LASERS) */}
                <path d="M205,84 L205,100 L185,111.6 L185,145" stroke="url(#laser-grad)" strokeWidth={hoveredNode === 'access' || hoveredNode === 'core' ? 2.2 : 1.2} className="laser-path-left" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'access' && hoveredNode !== 'core' ? 0.15 : 1 }} />
                <path d="M270,124 L270,140 L200,180.4 L200,150" stroke="url(#laser-grad)" strokeWidth={hoveredNode === 'video' || hoveredNode === 'core' ? 2.2 : 1.2} className="laser-path-center" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'video' && hoveredNode !== 'core' ? 0.15 : 1 }} />
                <path d="M335,164 L335,180 L215,249.2 L215,150" stroke="url(#laser-grad)" strokeWidth={hoveredNode === 'threat' || hoveredNode === 'core' ? 2.2 : 1.2} className="laser-path-right" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'threat' && hoveredNode !== 'core' ? 0.15 : 1 }} />

                {/* BROKEN DISCONNECTED WIRES (DARK BASES) */}
                <path d="M185,170 L60,242 L60,225" stroke="rgba(228, 72, 86, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'guards' ? 0.2 : 1 }} />
                <path d="M185,170 L125,205 L125,255" stroke="rgba(228, 72, 86, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'visitors' ? 0.2 : 1 }} />
                <path d="M185,170 L190,173 L190,285" stroke="rgba(228, 72, 86, 0.05)" strokeWidth="1" strokeDasharray="3, 3" strokeLinecap="round" style={{ transition: 'opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'execs' ? 0.2 : 1 }} />

                {/* BROKEN DISCONNECTED WIRES (DECAYING GLOWS) */}
                <path d="M185,170 L60,242 L60,225" stroke="url(#red-laser-grad)" strokeWidth={hoveredNode === 'guards' ? 2 : 1} className="red-laser-path-left" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'guards' ? 0.15 : 1 }} />
                <path d="M185,170 L125,205 L125,255" stroke="url(#red-laser-grad)" strokeWidth={hoveredNode === 'visitors' ? 2 : 1} className="red-laser-path-center" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'visitors' ? 0.15 : 1 }} />
                <path d="M185,170 L190,173 L190,285" stroke="url(#red-laser-grad)" strokeWidth={hoveredNode === 'execs' ? 2 : 1} className="red-laser-path-right" strokeLinecap="round" style={{ transition: 'stroke-width 0.3s, opacity 0.3s', opacity: hoveredNode && hoveredNode !== 'execs' ? 0.15 : 1 }} />

                {/* RADIATING RED ERROR SHOCKWAVES ON GRID FLOOR */}
                <ellipse cx="8" cy="225" rx="5" ry="2.5" stroke="rgba(228, 72, 86, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="8" cy="225" rx="5" ry="2.5" stroke="#E44856" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '8px 225px', animationDelay: '0s', display: hoveredNode && hoveredNode !== 'guards' ? 'none' : 'block' }} />

                <ellipse cx="73" cy="255" rx="5" ry="2.5" stroke="rgba(228, 72, 86, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="73" cy="255" rx="5" ry="2.5" stroke="#E44856" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '73px 255px', animationDelay: '0.5s', display: hoveredNode && hoveredNode !== 'visitors' ? 'none' : 'block' }} />

                <ellipse cx="138" cy="285" rx="5" ry="2.5" stroke="rgba(228, 72, 86, 0.2)" strokeWidth="0.8" fill="none" />
                <ellipse cx="138" cy="285" rx="5" ry="2.5" stroke="#E44856" strokeWidth="0.6" fill="none" className="pulse-ring-err" style={{ transformOrigin: '138px 285px', animationDelay: '1s', display: hoveredNode && hoveredNode !== 'execs' ? 'none' : 'block' }} />

                {/* ACTIVE NODES (TOP-RIGHT SLEEK & EXTRA-WIDE 3D BLOCKS, SHIFTED LEFT/UP TO AVOID CLIPPING) */}
                {/* Access AI Block */}
                <g
                  onMouseEnter={() => setHoveredNode('access')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '205px 40px',
                    animation: hoveredNode === 'access' ? 'none' : 'float-node 4s infinite ease-in-out',
                    animationDelay: '0s',
                    transform: hoveredNode === 'access' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'access' ? 'drop-shadow(0px 0px 8px rgba(234, 73, 178, 0.6))' : 'none'
                  }}
                >
                  {/* Top Face */}
                  <polygon points="205,68 156.5,40 205,12 253.5,40" fill={hoveredNode === 'access' ? 'rgba(234, 73, 178, 0.12)' : 'rgba(20, 20, 28, 0.96)'} stroke={hoveredNode === 'access' ? '#EA49B2' : 'rgba(234, 73, 178, 0.35)'} strokeWidth="0.8" style={{ transition: 'fill 0.3s, stroke 0.3s' }} />
                  {/* Left Face */}
                  <polygon points="205,68 156.5,40 156.5,56 205,84" fill="#0F0F16" stroke="rgba(234, 73, 178, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="205,68 205,84 253.5,56 253.5,40" fill="#0A0A0F" stroke="rgba(234, 73, 178, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 205, 40)">
                    <circle cx="-20" cy="20" r="1.2" fill="#EA49B2" className="blink-led" />
                    <path d="M-3,-9 L3,-9 L3,-4 L-3,-4 Z M-1.5,-9 L-1.5,-11 C-1.5,-12 -0.5,-12.5 0,-12.5 C0.5,-12.5 1.5,-12 1.5,-11 L1.5,-9" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Access AI</text>
                  </g>
                </g>

                {/* Video AI Block */}
                <g
                  onMouseEnter={() => setHoveredNode('video')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '270px 80px',
                    animation: hoveredNode === 'video' ? 'none' : 'float-node 4s infinite ease-in-out',
                    animationDelay: '1s',
                    transform: hoveredNode === 'video' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'video' ? 'drop-shadow(0px 0px 8px rgba(252, 229, 69, 0.6))' : 'none'
                  }}
                >
                  {/* Top Face */}
                  <polygon points="270,108 221.5,80 270,52 318.5,80" fill={hoveredNode === 'video' ? 'rgba(252, 229, 69, 0.12)' : 'rgba(20, 20, 28, 0.96)'} stroke={hoveredNode === 'video' ? '#FCE545' : 'rgba(252, 229, 69, 0.35)'} strokeWidth="0.8" style={{ transition: 'fill 0.3s, stroke 0.3s' }} />
                  {/* Left Face */}
                  <polygon points="270,108 221.5,80 221.5,96 270,124" fill="#0F0F16" stroke="rgba(252, 229, 69, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="270,108 270,124 318.5,96 318.5,80" fill="#0A0A0F" stroke="rgba(252, 229, 69, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 270, 80)">
                    <circle cx="-20" cy="20" r="1.2" fill="#FCE545" className="blink-led" />
                    <path d="M-4,-10 L1,-10 L1,-5 L-4,-5 Z M1,-9 L4,-11 L4,-4 L1,-6 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Video AI</text>
                  </g>
                </g>

                {/* Threat AI Block */}
                <g
                  onMouseEnter={() => setHoveredNode('threat')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '335px 120px',
                    animation: hoveredNode === 'threat' ? 'none' : 'float-node 4s infinite ease-in-out',
                    animationDelay: '2s',
                    transform: hoveredNode === 'threat' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'threat' ? 'drop-shadow(0px 0px 8px rgba(73, 147, 227, 0.6))' : 'none'
                  }}
                >
                  {/* Top Face */}
                  <polygon points="335,148 286.5,120 335,92 383.5,120" fill={hoveredNode === 'threat' ? 'rgba(73, 147, 227, 0.12)' : 'rgba(20, 20, 28, 0.96)'} stroke={hoveredNode === 'threat' ? '#4993E3' : 'rgba(73, 147, 227, 0.35)'} strokeWidth="0.8" style={{ transition: 'fill 0.3s, stroke 0.3s' }} />
                  {/* Left Face */}
                  <polygon points="335,148 286.5,120 286.5,136 335,164" fill="#0F0F16" stroke="rgba(73, 147, 227, 0.08)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="335,148 335,164 383.5,136 383.5,120" fill="#0A0A0F" stroke="rgba(73, 147, 227, 0.08)" strokeWidth="0.5" />
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 335, 120)">
                    <circle cx="-20" cy="20" r="1.2" fill="#4993E3" className="blink-led" />
                    <path d="M-3,-11.5 L3,-11.5 L3,-9 C3,-6.5 0,-4 0,-4 C0,-4 -3,-6.5 -3,-9 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinejoin="round" />
                    <text x="0" y="6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">Threat AI</text>
                  </g>
                </g>

                {/* CENTRAL CORE: SLEEK STACKED CPU SLABS */}
                {/* Bottom Slab */}
                <polygon points="185,210 145,187 185,164 225,187" fill="rgba(18, 18, 26, 0.85)" stroke="rgba(99, 84, 243, 0.12)" strokeWidth="0.8" />
                <polygon points="185,210 145,187 145,191 185,214" fill="#0D0D12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <polygon points="185,210 185,214 225,191 225,187" fill="#08080C" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

                {/* Middle Slab */}
                <polygon points="185,187 150,167 185,147 220,167" fill="rgba(22, 22, 32, 0.9)" stroke="rgba(99, 84, 243, 0.15)" strokeWidth="0.8" />
                <polygon points="185,187 150,167 150,171 185,191" fill="#0F0F16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <polygon points="185,187 185,191 220,171 220,167" fill="#0A0A0F" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

                {/* Top Slab with Float Animation */}
                <g
                  onMouseEnter={() => setHoveredNode('core')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '185px 150px',
                    animation: hoveredNode === 'core' ? 'none' : 'float-core 4s infinite ease-in-out',
                    transform: hoveredNode === 'core' ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'core' ? 'drop-shadow(0px 0px 12px rgba(99, 84, 243, 0.8))' : 'none'
                  }}
                >
                  {/* Top Face */}
                  <polygon points="185,165 155,147 185,129 215,147" fill={hoveredNode === 'core' ? 'rgba(99, 84, 243, 0.15)' : 'rgba(26, 26, 38, 0.98)'} stroke={hoveredNode === 'core' ? '#EA49B2' : '#6354F3'} strokeWidth="1.2" style={{ filter: 'url(#glow-purple)', transition: 'fill 0.3s, stroke 0.3s' }} />
                  {/* Left Face */}
                  <polygon points="185,165 155,147 155,151 185,169" fill="#14141F" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                  {/* Right Face */}
                  <polygon points="185,165 185,169 215,151 215,147" fill="#0E0E16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

                  {/* Central Asterisk Emblem (Purple Glow) */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 185, 147)">
                    <g stroke="#EA49B2" strokeWidth="2" strokeLinecap="round" opacity="0.9" filter="url(#glow-purple)">
                      <line x1="0" y1="-8" x2="0" y2="8" />
                      <line x1="-8" y1="0" x2="8" y2="0" />
                      <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" />
                      <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" />
                    </g>
                    <circle cx="0" cy="0" r="3" fill="#1A1A26" stroke="#EA49B2" strokeWidth="1" />
                  </g>
                </g>

                {/* HORIZONTAL CRISIS LABEL BELOW CHIP (TRACKING) */}
                <text
                  x="185"
                  y="222"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="8"
                  fill={hoveredNode && !['guards', 'visitors', 'execs'].includes(hoveredNode) ? '#AFF962' : '#E44856'}
                  textAnchor="middle"
                  fontWeight="bold"
                  style={{
                    letterSpacing: '2px',
                    transition: 'fill 0.3s'
                  }}
                >
                  {!hoveredNode && "COMMS_VOID_GAP"}
                  {hoveredNode === 'access' && "ACCESS_AI > ACTIVE_FLOW"}
                  {hoveredNode === 'video' && "VIDEO_AI > ACTIVE_FLOW"}
                  {hoveredNode === 'threat' && "THREAT_AI > ACTIVE_FLOW"}
                  {hoveredNode === 'core' && "MITHRIV_CORE > ONLINE"}
                  {hoveredNode === 'guards' && "GUARDS > DISCONNECTED"}
                  {hoveredNode === 'visitors' && "VISITORS > DISCONNECTED"}
                  {hoveredNode === 'execs' && "EXECS > DISCONNECTED"}
                </text>

                {/* STAKEHOLDERS (BOTTOM-LEFT FLAT BADGES WITH 3D GLASS EDGES) */}
                {/* GUARDS CARD */}
                <g
                  onMouseEnter={() => setHoveredNode('guards')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '60px 225px',
                    transform: hoveredNode === 'guards' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'guards' ? 'drop-shadow(0px 0px 8px rgba(239, 68, 68, 0.6))' : 'none'
                  }}
                >
                  {/* Bottom Edge */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 60, 228)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  </g>
                  {/* Top Face */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 60, 225)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                    <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#E44856" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M-28,-3 L-23,-3 L-23,4 L-28,4 Z M-25.5,-3 L-25.5,-6 M-24.5,-1 L-24.5,1" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
                    <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">GUARDS</text>
                    <circle cx="30" cy="0" r="1.5" fill="#E44856" className="blink-led" />
                  </g>
                </g>

                {/* VISITORS CARD */}
                <g
                  onMouseEnter={() => setHoveredNode('visitors')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '125px 255px',
                    transform: hoveredNode === 'visitors' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'visitors' ? 'drop-shadow(0px 0px 8px rgba(228, 72, 86, 0.6))' : 'none'
                  }}
                >
                  {/* Bottom Edge */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 125, 258)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  </g>
                  {/* Top Face */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 125, 255)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                    <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#E44856" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M-28,-3 L-23,-3 L-23,4 L-28,4 Z M-26,0 L-25,0 M-26,2 L-25,2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
                    <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">VISITORS</text>
                    <circle cx="30" cy="0" r="1.5" fill="#E44856" className="blink-led" style={{ animationDelay: '0.3s' }} />
                  </g>
                </g>

                {/* EXECUTIVES CARD */}
                <g
                  onMouseEnter={() => setHoveredNode('execs')}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: '190px 285px',
                    transform: hoveredNode === 'execs' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: hoveredNode === 'execs' ? 'drop-shadow(0px 0px 8px rgba(228, 72, 86, 0.6))' : 'none'
                  }}
                >
                  {/* Bottom Edge */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 190, 288)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="#08080C" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  </g>
                  {/* Top Face */}
                  <g transform="matrix(0.866, 0.5, -0.866, 0.5, 190, 285)">
                    <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(16, 16, 24, 0.95)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                    <line x1="-39" y1="-12" x2="-39" y2="12" stroke="#E44856" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M-28,-2 L-23,-2 L-23,4 L-28,4 Z M-26.5,-2 L-26.5,-4 L-24.5,-4 L-24.5,-2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
                    <text x="-16" y="2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold">EXECS</text>
                    <circle cx="30" cy="0" r="1.5" fill="#E44856" className="blink-led" style={{ animationDelay: '0.6s' }} />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className="features-scroll-grid" style={{
            borderLeft: '1px solid #212326',
            borderRight: '1px solid #212326'
          }}>
            {/* Vertical Dividers */}
            <div className="feature-col-divider feature-col-divider-1"></div>
            <div className="feature-col-divider feature-col-divider-2"></div>
            <div className="feature-col-divider feature-col-divider-3"></div>

            {/* Feature 1 */}
            <div className="feature-col-item">
              <span className="fig-label">Fig 0.1</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes pulse-ring-comm-1 {
                      0% { transform: scale(0.5); opacity: 1; }
                      50% { opacity: 0.5; }
                      100% { transform: scale(1.3); opacity: 0; }
                    }
                    @keyframes blink-warning-comm-1 {
                      0%, 100% { opacity: 0.2; }
                      50% { opacity: 1; fill: #6354F3; }
                    }
                    @keyframes line-draw-comm-1 {
                      0% { stroke-dashoffset: 24; }
                      100% { stroke-dashoffset: 0; }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <ellipse cx="0" cy="0" rx="35" ry="17.5" stroke="#6354F3" strokeWidth="1" style={{ transformOrigin: '0 0', animation: 'pulse-ring-comm-1 2.5s infinite linear' }} />
                    <ellipse cx="0" cy="0" rx="55" ry="27.5" stroke="#6354F3" strokeWidth="0.5" style={{ transformOrigin: '0 0', animation: 'pulse-ring-comm-1 2.5s infinite linear', animationDelay: '1.25s' }} />

                    <polygon points="-30,10 30,10 40,25 -40,25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                    <line x1="0" y1="10" x2="0" y2="-15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

                    <polygon points="-16,-35 16,-35 16,-15 -16,-15" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                    <text x="0" y="-21" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#6354F3" textAnchor="middle" style={{ animation: 'blink-warning-comm-1 1.5s infinite' }}>[WAIT 20m]</text>

                    <line x1="-35" y1="0" x2="35" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3,3" style={{ animation: 'line-draw-comm-1 2s linear infinite' }} />
                  </g>
                </svg>
              </div>
              <h3>Fragmented Visitor Flow</h3>
              <p className="card-desc">A delivery driver arrives at a facility. The kiosk has no path forward. Twenty minutes later, a guard manually overrides the process. No audit trail. No context. No continuity.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-col-item">
              <span className="fig-label">Fig 0.2</span>
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
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <ellipse cx="0" cy="-20" rx="20" ry="10" stroke="rgba(252, 229, 69, 0.4)" strokeWidth="1" style={{ transformOrigin: '0 -20px', animation: 'wave-dissolve-comm-2 3s infinite linear' }} />
                    <ellipse cx="0" cy="-20" rx="40" ry="20" stroke="rgba(252, 229, 69, 0.2)" strokeWidth="0.5" style={{ transformOrigin: '0 -20px', animation: 'wave-dissolve-comm-2 3s infinite linear', animationDelay: '1.5s' }} />

                    <polygon points="-8,25 8,25 2,-20 -2,-20" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <line x1="-5" y1="10" x2="5" y2="10" stroke="rgba(255,255,255,0.2)" />
                    <line x1="-3" y1="-5" x2="3" y2="-5" stroke="rgba(255,255,255,0.2)" />

                    <circle cx="0" cy="-22" r="3" fill="#FCE545" style={{ animation: 'tower-signal-comm-2 1s infinite alternate' }} />

                    <path d="M-40,25 L-20,15 L0,20 L20,15 L40,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" style={{ animation: 'static-noise-comm-2 0.5s infinite linear' }} />
                  </g>
                </svg>
              </div>
              <h3>Muted Field Operations</h3>
              <p className="card-desc">A guard radios dispatch during an incident. No answer. The incident is reconstructed from memory at the end of the shift, introducing critical gaps in reporting.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-col-item">
              <span className="fig-label">Fig 0.3</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes sand-drip-comm-3 {
                      0% { stroke-dashoffset: 0; }
                      100% { stroke-dashoffset: -12; }
                    }
                    @keyframes badge-glow-comm-3 {
                      0%, 100% { opacity: 0.4; }
                      50% { opacity: 1; filter: drop-shadow(0 0 4px #4993E3); }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <polygon points="0,-40 24,-30 0,-18 -24,-30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                    <polygon points="0,40 24,30 0,18 -24,30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />

                    <line x1="-24" y1="-30" x2="-24" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <line x1="24" y1="-30" x2="24" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2,2" />

                    <path d="M-20,-28 C-20,-12 -5,-4 -5,0 C-5,4 -20,12 -20,28 L20,28 C20,12 5,4 5,0 C5,-4 20,-12 20,-28 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                    <line x1="0" y1="-4" x2="0" y2="20" stroke="#4993E3" strokeWidth="1" strokeDasharray="2,4" style={{ strokeDashoffset: 0, animation: 'sand-drip-comm-3 1s linear infinite' }} />
                    <circle cx="0" cy="0" r="1" fill="#ffffff" />

                    <polygon points="0,26 12,20 0,14 -12,20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="rgba(255,255,255,0.08)" />
                    <polygon points="0,26 8,22 0,18 -8,22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="rgba(255,255,255,0.15)" />

                    <g transform="translate(32, -8)">
                      <rect x="-3" y="-12" width="38" height="15" rx="0" fill="rgba(0,0,0,0.6)" stroke="rgba(73, 147, 227, 0.3)" strokeWidth="1" style={{ animation: 'badge-glow-comm-3 2s infinite alternate' }} />
                      <text x="16" y="-2" fontFamily="monospace" fontSize="8" fill="#4993E3" textAnchor="middle" fontWeight="bold">96h</text>
                    </g>
                  </g>
                </svg>
              </div>
              <h3>Access Request Bottlenecks</h3>
              <p className="card-desc">An engineer requests weekend access for a critical project. The request moves through inboxes and manual approvals. Four days later, access is granted. The deadline has already passed.</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-col-item">
              <span className="fig-label">Fig 0.4</span>
              <div className="fig-svg-wrap">
                <svg viewBox="0 0 200 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes nodeglow-comm-4 {
                      0%, 100% { opacity: 0.15; }
                      50% { opacity: 0.6; stroke: #AFF962; }
                    }
                    @keyframes line-flicker-comm-4 {
                      0%, 100% { opacity: 0.05; }
                      50% { opacity: 0.4; }
                    }
                  `}</style>
                  <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2,2" />

                  <g transform="translate(100, 80)">
                    <g style={{ animation: 'nodeglow-comm-4 3s infinite alternate' }}>
                      <rect x="-40" y="-35" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="-28" y="-25" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">TEAM</text>

                      <rect x="16" y="-35" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="28" y="-25" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">SMS</text>

                      <rect x="-55" y="-5" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="-43" y="5" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">RAD</text>

                      <rect x="31" y="-5" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="43" y="5" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">VMS</text>

                      <rect x="-40" y="25" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="-28" y="35" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">MAIL</text>

                      <rect x="16" y="25" width="24" height="14" rx="0" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="28" y="35" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">LOGS</text>
                    </g>

                    <g style={{ animation: 'line-flicker-comm-4 2s infinite' }}>
                      <line x1="-16" y1="-28" x2="16" y2="-28" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-31" y1="2" x2="31" y2="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-16" y1="32" x2="16" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="-28" y1="-21" x2="-43" y2="-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="28" y1="-21" x2="43" y2="-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                    </g>

                    <g transform="translate(0, 0)">
                      <circle cx="0" cy="0" r="10" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      <line x1="4" y1="-4" x2="-4" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    </g>
                  </g>
                </svg>
              </div>
              <h3>Information & Data Silos</h3>
              <p className="card-desc">The CSO needs incident trends across multiple sites. Analysts spend weeks pulling reports from disconnected systems before a single decision can be made.</p>
            </div>
          </div>

          {/* Diagonal connecting bridge */}
          <div style={{
            width: '100%',
            height: '60px',
            borderLeft: '1px solid #212326',
            borderRight: '1px solid #212326',
            borderBottom: '1px solid #212326',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' viewBox=\'0 0 8 8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-1,-1 L9,9 M7,-1 L9,1 M-1,7 L1,9\' stroke=\'%23212326\' stroke-width=\'1\'/%3E%3C/svg%3E")',
            animation: 'slide-diagonal-bg 0.5s linear infinite'
          }} />

          {/* Metrics Section */}
          <div className="metrics-row-wrap" style={{
            width: '100%',
            borderLeft: '1px solid #212326',
            borderRight: '1px solid #212326',
            borderBottom: '1px solid #212326'
          }}>
            <div className="metrics-horizontal-row-4col">
              {[
                { num: '74%', desc: 'of security breaches trace to inadequate visitor screening' },
                { num: '62%', desc: 'of security alerts ignored due to communication overload' },
                { num: '23%', desc: 'of incident escalations caused by communication failures' },
                { num: '8–12', desc: 'average disconnected communication channels per enterprise' }
              ].map((metric, idx) => (
                <div key={idx} className="metric-col" style={{ 
                  opacity: 0, 
                  padding: '40px 24px', 
                  textAlign: 'center',
                  borderRight: idx !== 3 ? '1px solid #212326' : 'none'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    lineHeight: '1.1',
                    marginBottom: '8px',
                    letterSpacing: '-0.03em'
                  }}>
                    {metric.num}
                  </div>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    color: 'rgba(255,255,255,0.5)',
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
        <div className="container article-layout-grid" style={{
          paddingTop: '60px',
          position: 'relative'
        }}>

          <div className="ent-section-divider"></div>

          {/* SECTION 3: Conversational Agents */}
          <section className="section reveal-section" id="agents" style={{ padding: '80px 0', background: 'transparent' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px' }}>
              <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
                <span className="ent-pill" style={{ marginLeft: '0px' }}>Conversational Agents</span>
              </div>
              <h2 className="std-section-h2" style={{ fontSize: '48px', marginTop: '0px', marginBottom: '24px', letterSpacing: '-0.02em', fontWeight: 600, lineHeight: '1.1' }}>
                One agent for every stakeholder
              </h2>
              <p style={{ maxWidth: '850px', fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', margin: '0' }}>
                Purpose-built for each domain. Unified intelligence. Every interaction on record.
              </p>
            </div>

            <div className="agents-accordion-grid">
              {/* Left side: Accordion list */}
              <div className="agents-accordion-left">
                {AGENTS_DATA.map((agent) => (
                  <div
                    key={agent.id}
                    className={`agent-accordion-card ${activeAgent === agent.id ? 'active' : ''}`}
                    onClick={() => setActiveAgent(agent.id)}
                  >
                    <div className="agent-accordion-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: activeAgent === agent.id ? '#8B5CF6' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{agent.num}</span>
                        <h3 className="agent-accordion-title" style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', fontWeight: activeAgent === agent.id ? 600 : 400, color: activeAgent === agent.id ? '#ffffff' : 'rgba(255,255,255,0.4)', margin: 0 }}>{agent.name}</h3>
                      </div>
                    </div>
                    
                    <div className="agent-accordion-content">
                      <div className="agent-accordion-content-inner">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '8px' }}>
                        
                        {/* Agent Scope Block */}
                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              color: 'rgba(239,68,68,0.85)',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '10px',
                              border: '1px solid rgba(239,68,68,0.2)',
                              padding: '2px 6px',
                              width: 'fit-content',
                            }}
                          >
                            AGENT SCOPE
                          </span>

                          <p
                            style={{
                              fontSize: 'clamp(14px, 1.4vw, 15px)',
                              fontWeight: 400,
                              color: 'rgba(255,255,255,0.75)',
                              lineHeight: '1.5',
                              margin: 0,
                              fontFamily: 'var(--font-main)',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {agent.desc}
                          </p>
                        </div>

                        {/* Key Capabilities Block */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              color: 'rgba(139,92,246,0.85)',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '10px',
                              border: '1px solid rgba(139,92,246,0.2)',
                              padding: '2px 6px',
                              width: 'fit-content',
                            }}
                          >
                            KEY CAPABILITIES
                          </span>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                            {agent.metrics.map((metric, i) => (
                              <div
                                key={i}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '12px',
                                  padding: '10px 0',
                                  borderBottom: 'none',
                                  position: 'relative',
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#8B5CF6"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{
                                    marginTop: '3px',
                                    flexShrink: 0,
                                    opacity: 1,
                                    transform: 'scale(1)',
                                    transition: 'all 0.3s linear',
                                    transitionDelay: `${i * 0.12}s`,
                                  }}
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <p
                                  style={{
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.7)',
                                    lineHeight: '1.5',
                                    margin: 0,
                                    fontFamily: 'var(--font-main)',
                                  }}
                                >
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

              {/* Right side: Large Animated Icon Panel */}
              <div className="agents-accordion-right">
                <div className="agents-dashboard-panel">

                  {/* Active content is now inside the left tabs */}

                  <div className="agents-dashboard-panel-inner">
                                        {activeAgent === 0 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <style>{"\
                            @keyframes leftPanelLoop {\
                              0% { opacity: 0; transform: translateY(15px); }\
                              7.5%, 92.5% { opacity: 1; transform: translateY(0); }\
                              100% { opacity: 0; transform: translateY(0); }\
                            }\
                            @keyframes centerLineLoop {\
                              0%, 7.5% { stroke-dashoffset: 50; opacity: 0; }\
                              12.5%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { stroke-dashoffset: 0; opacity: 0; }\
                            }\
                            @keyframes packet0Loop {\
                              0%, 7.5% { cx: 235; opacity: 0; }\
                              8% { opacity: 1; }\
                              12%, 92.5% { cx: 285; opacity: 1; }\
                              93%, 100% { opacity: 0; }\
                            }\
                            @keyframes rightPanelLoop {\
                              0%, 12.5% { opacity: 0; transform: translateY(15px); }\
                              20%, 92.5% { opacity: 1; transform: translateY(0); }\
                              100% { opacity: 0; transform: translateY(0); }\
                            }\
                            @keyframes stepGroup1Loop {\
                              0%, 20% { opacity: 0; }\
                              25%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes tick1Loop {\
                              0%, 25% { stroke-dashoffset: 20; opacity: 0; }\
                              30%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes status1Loop {\
                              0%, 25% { opacity: 0; }\
                              30%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes stepLine1Loop {\
                              0%, 30% { stroke-dashoffset: 40; opacity: 0; }\
                              35%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes stepGroup2Loop {\
                              0%, 35% { opacity: 0; }\
                              40%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes tick2Loop {\
                              0%, 40% { stroke-dashoffset: 20; opacity: 0; }\
                              45%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes status2Loop {\
                              0%, 40% { opacity: 0; }\
                              45%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes stepLine2Loop {\
                              0%, 45% { stroke-dashoffset: 40; opacity: 0; }\
                              50%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes stepGroup3Loop {\
                              0%, 50% { opacity: 0; }\
                              55%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes pulseDot3Loop {\
                              0%, 55% { opacity: 0; }\
                              55%, 64% { opacity: 1; }\
                              65%, 100% { opacity: 0; }\
                            }\
                            @keyframes tick3Loop {\
                              0%, 65% { stroke-dashoffset: 20; opacity: 0; }\
                              70%, 92.5% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            @keyframes statusRunning3Loop {\
                              0%, 55% { opacity: 0; }\
                              55%, 64% { opacity: 1; }\
                              65%, 100% { opacity: 0; }\
                            }\
                            @keyframes statusSuccess3Loop {\
                              0%, 65% { opacity: 0; }\
                              70%, 92.5% { opacity: 1; }\
                              100% { opacity: 0; }\
                            }\
                            .left-panel { animation: leftPanelLoop 8s infinite ease-in-out; }\
                            .center-line { stroke-dasharray: 50; animation: centerLineLoop 8s infinite linear; }\
                            .packet0 { animation: packet0Loop 8s infinite linear; }\
                            .right-panel { animation: rightPanelLoop 8s infinite ease-in-out; }\
                            .step-group-1 { animation: stepGroup1Loop 8s infinite ease-in-out; }\
                            .tick-1 { stroke-dasharray: 20; animation: tick1Loop 8s infinite linear; }\
                            .status-1 { animation: status1Loop 8s infinite ease-in-out; }\
                            .step-line-1 { stroke-dasharray: 40; animation: stepLine1Loop 8s infinite linear; }\
                            .step-group-2 { animation: stepGroup2Loop 8s infinite ease-in-out; }\
                            .tick-2 { stroke-dasharray: 20; animation: tick2Loop 8s infinite linear; }\
                            .status-2 { animation: status2Loop 8s infinite ease-in-out; }\
                            .step-line-2 { stroke-dasharray: 40; animation: stepLine2Loop 8s infinite linear; }\
                            .step-group-3 { animation: stepGroup3Loop 8s infinite ease-in-out; }\
                            .pulse-dot-3 { animation: pulseDot3Loop 8s infinite linear; }\
                            .tick-3 { stroke-dasharray: 20; animation: tick3Loop 8s infinite linear; }\
                            .status-running-3 { animation: statusRunning3Loop 8s infinite linear; }\
                            .status-success-3 { animation: statusSuccess3Loop 8s infinite ease-in-out; }\
                          "}</style>

                          {/* Left Panel: JSON Payload */}
                          <g className="left-panel">
                            <rect x="15" y="20" width="220" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="15" y="20" width="220" height="40" fill="#141517" />
                            <circle cx="35" cy="40" r="4" fill="#EA49B2" />
                            <text x="50" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">EVENT_PAYLOAD</text>

                            {/* JSON Lines */}
                            <g transform="translate(30, 90)" fill="#EA49B2" fontSize="11" fontFamily="var(--font-mono), monospace">
                              <text x="0" y="0" fill="#71717a">{"{"}</text>
                              <text x="15" y="20" fill="#EA49B2">"event"<text fill="#71717a">:</text> <text fill="#EA49B2">"check_in"</text><text fill="#71717a">,</text></text>
                              <text x="15" y="40" fill="#EA49B2">"visitor_id"<text fill="#71717a">:</text> <text fill="#EA49B2">"v_9842"</text><text fill="#71717a">,</text></text>
                              <text x="15" y="60" fill="#EA49B2">"guest"<text fill="#71717a">:</text> {"{"}</text>
                              <text x="30" y="80" fill="#EA49B2">"name"<text fill="#71717a">:</text> <text fill="#EA49B2">"Eleanor P."</text><text fill="#71717a">,</text></text>
                              <text x="30" y="100" fill="#EA49B2">"class"<text fill="#71717a">:</text> <text fill="#EA49B2">"executive"</text></text>
                              <text x="15" y="120" fill="#71717a">{"}"}</text>
                              <text x="0" y="140" fill="#71717a">{"}"}</text>
                            </g>
                          </g>

                          {/* Connector Line */}
                          <line x1="235" y1="180" x2="285" y2="180" stroke="#222528" strokeWidth="2" className="center-line" />
                          <circle cx="235" cy="180" r="5" fill="#EA49B2" className="packet0" />

                          {/* Right Panel: Workflow Execution */}
                          <g className="right-panel">
                            <rect x="285" y="20" width="220" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="285" y="20" width="220" height="40" fill="#141517" />
                            <circle cx="305" cy="40" r="4" fill="#EA49B2" />
                            <text x="320" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">EXECUTION_STEPS</text>
                          </g>

                          {/* Step 1 */}
                          <g transform="translate(305, 90)" className="step-group-1">
                            <rect x="-8" y="2" width="16" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                            <path d="M-4,10 L-1,13 L4,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="tick-1" />
                            <text x="20" y="14" fill="#e4e4e7" fontSize="12" fontFamily="var(--font-main)">Verify Credentials</text>
                            <g className="status-1">
                              <rect x="145" y="3" width="50" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                              <text x="170" y="14" fill="#EA49B2" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle">SUCCESS</text>
                            </g>
                          </g>

                          {/* Connection line between steps */}
                          <line x1="305" y1="115" x2="305" y2="155" stroke="#222528" strokeWidth="2" className="step-line-1" />

                          {/* Step 2 */}
                          <g transform="translate(305, 160)" className="step-group-2">
                            <rect x="-8" y="2" width="16" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                            <path d="M-4,10 L-1,13 L4,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="tick-2" />
                            <text x="20" y="14" fill="#e4e4e7" fontSize="12" fontFamily="var(--font-main)">Auto-Sign NDA</text>
                            <g className="status-2">
                              <rect x="145" y="3" width="50" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                              <text x="170" y="14" fill="#EA49B2" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle">SUCCESS</text>
                            </g>
                          </g>

                          {/* Connection line between steps */}
                          <line x1="305" y1="185" x2="305" y2="225" stroke="#222528" strokeWidth="2" className="step-line-2" />

                          {/* Step 3 */}
                          <g transform="translate(305, 230)" className="step-group-3">
                            <rect x="-8" y="2" width="16" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                            {/* Running state components */}
                            <circle cx="0" cy="10" r="3" fill="#EA49B2" className="pulse-dot-3" />
                            {/* Success state components */}
                            <path d="M-4,10 L-1,13 L4,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="tick-3" />
                            
                            <text x="20" y="14" fill="#e4e4e7" fontSize="12" fontFamily="var(--font-main)">Print Badge Pass</text>
                            
                            {/* Status: RUNNING */}
                            <g className="status-running-3">
                              <rect x="145" y="3" width="50" height="16" fill="#141517" stroke="#EA49B2" strokeWidth="1" />
                              <text x="170" y="14" fill="#EA49B2" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle">RUNNING</text>
                            </g>
                            {/* Status: SUCCESS */}
                            <g className="status-success-3">
                              <rect x="145" y="3" width="50" height="16" fill="#3b112d" stroke="#EA49B2" strokeWidth="1" />
                              <text x="170" y="14" fill="#EA49B2" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle">SUCCESS</text>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}

                                      {activeAgent === 1 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <clipPath id="clipLog1">
                              <rect x="0" y="-10" width="300" height="25" className="log-rect-1" />
                            </clipPath>
                            <clipPath id="clipLog2">
                              <rect x="0" y="12" width="300" height="25" className="log-rect-2" />
                            </clipPath>
                            <clipPath id="clipLog3">
                              <rect x="0" y="34" width="300" height="25" className="log-rect-3" />
                            </clipPath>
                            <clipPath id="clipLog4">
                              <rect x="0" y="56" width="300" height="25" className="log-rect-4" />
                            </clipPath>
                            <clipPath id="clipLog5">
                              <rect x="0" y="78" width="300" height="25" className="log-rect-5" />
                            </clipPath>
                          </defs>

                          <style>{"\
                            @keyframes logPanelLoop {\
                              0% { opacity: 0; transform: translateY(15px); }\
                              7.5%, 92.5% { opacity: 1; transform: translateY(0); }\
                              100% { opacity: 0; transform: translateY(0); }\
                            }\
                            @keyframes logScale1 {\
                              0%, 10% { transform: scaleX(0); }\
                              20%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes logScale2 {\
                              0%, 20% { transform: scaleX(0); }\
                              30%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes logScale3 {\
                              0%, 30% { transform: scaleX(0); }\
                              40%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes logScale4 {\
                              0%, 40% { transform: scaleX(0); }\
                              50%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes logScale5 {\
                              0%, 50% { transform: scaleX(0); }\
                              60%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes guardPanelLoop {\
                              0%, 60% { opacity: 0; transform: translateY(15px); }\
                              67.5%, 92.5% { opacity: 1; transform: translateY(0); }\
                              100% { opacity: 0; transform: translateY(0); }\
                            }\
                            @keyframes progressAnim {\
                              0%, 67.5% { transform: scaleX(0); }\
                              77.5%, 92.5% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes pulseDot1 {\
                              0%, 100% { fill: #E44856; }\
                              50% { fill: #141517; }\
                            }\
                            .pulse-dot1 { animation: pulseDot1 1s infinite; }\
                            .left-log-panel { animation: logPanelLoop 8s infinite ease-in-out; }\
                            .log-rect-1 { transform-origin: left; animation: logScale1 8s infinite linear; }\
                            .log-rect-2 { transform-origin: left; animation: logScale2 8s infinite linear; }\
                            .log-rect-3 { transform-origin: left; animation: logScale3 8s infinite linear; }\
                            .log-rect-4 { transform-origin: left; animation: logScale4 8s infinite linear; }\
                            .log-rect-5 { transform-origin: left; animation: logScale5 8s infinite linear; }\
                            .right-guard-panel { animation: guardPanelLoop 8s infinite ease-in-out; }\
                            .progress-bar1 { transform-origin: left; animation: progressAnim 8s infinite ease-in-out; }\
                          "}</style>

                          {/* Left Panel: Streaming Logs */}
                          <g className="left-log-panel">
                            <rect x="15" y="20" width="310" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="15" y="20" width="310" height="40" fill="#141517" />
                            <circle cx="35" cy="40" r="4" fill="#E44856" className="pulse-dot1" />
                            <text x="50" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">LIVE_SECURITY_FEED</text>

                            {/* Log Streams */}
                            <g transform="translate(30, 90)" fill="#e4e4e7" fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="-0.02em">
                              <text x="0" y="0" clipPath="url(#clipLog1)"><tspan fill="#71717a">10:14:02</tspan> <tspan fill="#4993E3">[PATROL]</tspan> Route Sector 4 initialized</text>
                              <text x="0" y="22" clipPath="url(#clipLog2)"><tspan fill="#71717a">10:14:15</tspan> <tspan fill="#4993E3">[ACCESS]</tspan> Node 12.A status is <tspan fill="#4993E3">NOMINAL</tspan></text>
                              <text x="0" y="44" clipPath="url(#clipLog3)"><tspan fill="#71717a">10:14:28</tspan> <tspan fill="#4993E3">[PATROL]</tspan> Guard Davis reached Checkpoint B</text>
                              <text x="0" y="66" clipPath="url(#clipLog4)"><tspan fill="#71717a">10:14:45</tspan> <tspan fill="#E44856">[WARN]</tspan> Door Left Open: Zone C (Resolved)</text>
                              <text x="0" y="88" clipPath="url(#clipLog5)"><tspan fill="#71717a">10:15:02</tspan> <tspan fill="#4993E3">[ACCESS]</tspan> Verification completed for Eleanor P.</text>
                            </g>
                          </g>

                          {/* Right Panel: Guard Status */}
                          <g className="right-guard-panel">
                            <rect x="340" y="20" width="165" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="340" y="20" width="165" height="40" fill="#141517" />
                            <text x="355" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">GUARD_STATUS</text>

                            {/* Profile details */}
                            <g transform="translate(355, 80)">
                              <rect x="0" y="0" width="48" height="48" fill="#141517" stroke="#222528" strokeWidth="1" />
                              <circle cx="24" cy="18" r="8" fill="#71717a" />
                              <path d="M9,42 C9,34 19,34 24,34 C29,34 39,34 39,42" fill="none" stroke="#71717a" strokeWidth="2" />

                              <text x="58" y="22" fill="#e4e4e7" fontSize="12" fontFamily="var(--font-main)" fontWeight="600">Officer Davis</text>
                              <text x="58" y="37" fill="#71717a" fontSize="10" fontFamily="var(--font-mono), monospace">ID: G-9082</text>
                              
                              {/* Route progress */}
                              <text x="0" y="80" fill="#71717a" fontSize="10" fontFamily="var(--font-main)">Route Progress</text>
                              <rect x="0" y="90" width="135" height="6" fill="#141517" />
                              <rect x="0" y="90" width="110" height="6" fill="#4993E3" className="progress-bar1" />
                              <text x="0" y="115" fill="#4993E3" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600">ACTIVE</text>

                              {/* Badge level */}
                              <text x="0" y="150" fill="#71717a" fontSize="10" fontFamily="var(--font-main)">Clearance Level</text>
                              <rect x="0" y="160" width="70" height="18" fill="#10263f" stroke="#4993E3" strokeWidth="1" />
                              <text x="35" y="172" fill="#4993E3" fontSize="10" fontFamily="var(--font-mono), monospace" textAnchor="middle">LEVEL_03</text>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}

                    {/* Employee Agent (03) */}
                    {activeAgent === 2 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <clipPath id="clipLine1">
                              <rect x="0" y="-5" width="360" height="20" className="type-rect-1" />
                            </clipPath>
                            <clipPath id="clipLine2">
                              <rect x="0" y="15" width="360" height="20" className="type-rect-2" />
                            </clipPath>
                            <clipPath id="clipLine3">
                              <rect x="0" y="35" width="360" height="20" className="type-rect-3" />
                            </clipPath>
                            <clipPath id="clipLine4">
                              <rect x="0" y="55" width="360" height="20" className="type-rect-4" />
                            </clipPath>
                          </defs>

                          <style>{"\
                            @keyframes topCardLoop {\
                              0% { opacity: 0; transform: translate(60px, 35px); }\
                              7.5%, 93.75% { opacity: 1; transform: translate(60px, 20px); }\
                              100% { opacity: 0; transform: translate(60px, 20px); }\
                            }\
                            @keyframes line1Loop {\
                              0%, 7.5% { stroke-dashoffset: 30; opacity: 0; }\
                              12.5%, 93.75% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { stroke-dashoffset: 0; opacity: 0; }\
                            }\
                            @keyframes middleCardLoop {\
                              0%, 12.5% { opacity: 0; transform: translate(60px, 130px); }\
                              20%, 93.75% { opacity: 1; transform: translate(60px, 115px); }\
                              100% { opacity: 0; transform: translate(60px, 115px); }\
                            }\
                            @keyframes typeScale1 {\
                              0%, 20% { transform: scaleX(0); }\
                              30%, 93.75% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes typeScale2 {\
                              0%, 30% { transform: scaleX(0); }\
                              40%, 93.75% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes typeScale3 {\
                              0%, 40% { transform: scaleX(0); }\
                              50%, 93.75% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes typeScale4 {\
                              0%, 50% { transform: scaleX(0); }\
                              55%, 93.75% { transform: scaleX(1); }\
                              100% { transform: scaleX(0); }\
                            }\
                            @keyframes line2Loop {\
                              0%, 55% { stroke-dashoffset: 30; opacity: 0; }\
                              60%, 93.75% { stroke-dashoffset: 0; opacity: 1; }\
                              100% { stroke-dashoffset: 0; opacity: 0; }\
                            }\
                            @keyframes bottomCardLoop {\
                              0%, 60% { opacity: 0; transform: translate(60px, 295px); }\
                              67.5%, 93.75% { opacity: 1; transform: translate(60px, 280px); }\
                              100% { opacity: 0; transform: translate(60px, 280px); }\
                            }\
                            @keyframes cursorPulse2 {\
                              0%, 49% { fill: #AFF962; }\
                              50%, 100% { fill: transparent; }\
                            }\
                            .top-card { animation: topCardLoop 8s infinite ease-in-out; }\
                            .conn-line-1 { stroke-dasharray: 30; animation: line1Loop 8s infinite linear; }\
                            .middle-card { animation: middleCardLoop 8s infinite ease-in-out; }\
                            .type-rect-1 { transform-origin: left; animation: typeScale1 8s infinite linear; }\
                            .type-rect-2 { transform-origin: left; animation: typeScale2 8s infinite linear; }\
                            .type-rect-3 { transform-origin: left; animation: typeScale3 8s infinite linear; }\
                            .type-rect-4 { transform-origin: left; animation: typeScale4 8s infinite linear; }\
                            .conn-line-2 { stroke-dasharray: 30; animation: line2Loop 8s infinite linear; }\
                            .bottom-card { animation: bottomCardLoop 8s infinite ease-in-out; }\
                            .cursor2 { animation: cursorPulse2 0.8s infinite; }\
                          "}</style>

                          {/* Top Card: Provider Sync */}
                          <g transform="translate(60, 20)" className="top-card">
                            <rect x="0" y="0" width="400" height="65" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="15" y="17" width="30" height="30" fill="#233411" stroke="#AFF962" strokeWidth="1" />
                            <path d="M22,32 L27,37 L38,26" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                            <text x="60" y="32" fill="#e4e4e7" fontSize="13" fontFamily="var(--font-main)" fontWeight="600">Okta Identity Directory Sync</text>
                            <text x="60" y="48" fill="#71717a" fontSize="10.5" fontFamily="var(--font-mono), monospace">SYNC_STATUS: CONNECTED (2,481 Employees)</text>
                          </g>

                          {/* Connection line */}
                          <line x1="260" y1="85" x2="260" y2="115" stroke="#222528" strokeWidth="2" className="conn-line-1" />

                          {/* Middle Card: Policy snippet */}
                          <g transform="translate(60, 115)" className="middle-card">
                            <rect x="0" y="0" width="400" height="135" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <rect x="0" y="0" width="400" height="30" fill="#141517" />
                            <text x="20" y="19" fill="#71717a" fontSize="10.5" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">GATEWAY_RULES_ENGINE</text>

                            <g transform="translate(20, 50)" fill="#AFF962" fontSize="11" fontFamily="var(--font-mono), monospace">
                              <text x="0" y="10" fill="#71717a" clipPath="url(#clipLine1)">if (employee.zone === <tspan fill="#AFF962">"Server Room"</tspan>) {"{"}</text>
                              <text x="20" y="30" fill="#71717a" clipPath="url(#clipLine2)">await verifyOktaAuth(employee.id);</text>
                              <text x="20" y="50" fill="#AFF962" clipPath="url(#clipLine3)">grantGatewayAccess(ZONES.SECURE_HQ);</text>
                              <text x="0" y="70" fill="#71717a" clipPath="url(#clipLine4)">{"}"}<tspan fill="#AFF962" className="cursor2">_</tspan></text>
                            </g>
                          </g>

                          {/* Connection line */}
                          <line x1="260" y1="250" x2="260" y2="280" stroke="#222528" strokeWidth="2" className="conn-line-2" />

                          {/* Bottom Card: Access Granted Result */}
                          <g transform="translate(60, 280)" className="bottom-card">
                            <rect x="0" y="0" width="400" height="60" fill="#0c0d0e" stroke="#AFF962" strokeWidth="1" />
                            <rect x="15" y="17" width="26" height="26" fill="#233411" stroke="#AFF962" strokeWidth="1" />
                            <path d="M22,30 L25,33 L32,26" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                            <text x="55" y="31" fill="#AFF962" fontSize="12" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">GATEWAY_VERDICT: ACCESS_GRANTED</text>
                            <text x="55" y="45" fill="#71717a" fontSize="10" fontFamily="var(--font-main)">Okta assertion verified successfully.</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {/* Contractor Agent (04) */}
                    {activeAgent === 3 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <style>{"\
                            @keyframes blinkColon3 {\
                              0%, 100% { fill: #FCE545; }\
                              50% { fill: #0c0d0e; }\
                            }\
                            @keyframes progress3 {\
                              0% { width: 185px; }\
                              100% { width: 10px; }\
                            }\
                            .colon3 { animation: blinkColon3 1s infinite; }\
                            .progress-bar3 { animation: progress3 10s infinite linear; }\
                          "}</style>

                          {/* Left Panel: Profile Detail */}
                          <rect x="15" y="20" width="240" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="15" y="20" width="240" height="40" fill="#141517" />
                          <text x="30" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">CONTRACTOR_PROFILE</text>

                          <g transform="translate(30, 80)">
                            <text x="0" y="15" fill="#71717a" fontSize="11" fontFamily="var(--font-main)">Vendor</text>
                            <text x="0" y="32" fill="#e4e4e7" fontSize="13" fontFamily="var(--font-main)" fontWeight="600">ACME HVAC Services</text>

                            <text x="0" y="70" fill="#71717a" fontSize="11" fontFamily="var(--font-main)">Permitted Zone</text>
                            <text x="0" y="87" fill="#FCE545" fontSize="13" fontFamily="var(--font-mono), monospace" fontWeight="600">CENTRAL_PLANT_B</text>

                            {/* Verification List */}
                            <text x="0" y="130" fill="#71717a" fontSize="11" fontFamily="var(--font-main)">Clearance Checks</text>
                            
                            <g transform="translate(0, 145)">
                              <rect x="0" y="0" width="12" height="12" fill="#3a340b" stroke="#FCE545" strokeWidth="1" />
                              <path d="M2,6 L5,9 L10,3" stroke="#FFFFFF" strokeWidth="1.5" />
                              <text x="20" y="11" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-main)">Escort Assigned</text>
                            </g>

                            <g transform="translate(0, 170)">
                              <rect x="0" y="0" width="12" height="12" fill="#3a340b" stroke="#FCE545" strokeWidth="1" />
                              <path d="M2,6 L5,9 L10,3" stroke="#FFFFFF" strokeWidth="1.5" />
                              <text x="20" y="11" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-main)">Work Order Verified</text>
                            </g>
                          </g>

                          {/* Right Panel: Access Duration */}
                          <rect x="270" y="20" width="235" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="270" y="20" width="235" height="40" fill="#141517" />
                          <text x="285" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">TEMPORARY_WINDOW</text>

                          <g transform="translate(295, 80)">
                            <text x="0" y="20" fill="#71717a" fontSize="12.5" fontFamily="var(--font-main)">Time Remaining</text>
                            
                            {/* Big digital clock display */}
                            <text x="0" y="70" fill="#FCE545" fontSize="36" fontFamily="var(--font-mono), monospace" fontWeight="bold">
                              06<tspan fill="#FCE545" className="colon3">:</tspan>42<tspan fill="#FCE545" className="colon3">:</tspan>15
                            </text>
                            
                            {/* Countdown bar */}
                            <rect x="0" y="95" width="185" height="6" fill="#141517" />
                            <rect x="0" y="95" width="130" height="6" fill="#FCE545" className="progress-bar3" />

                            <g transform="translate(0, 140)">
                              <rect x="0" y="0" width="185" height="45" fill="#3a340b" stroke="#FCE545" strokeWidth="1" />
                              <text x="15" y="27" fill="#FCE545" fontSize="11.5" fontFamily="var(--font-mono), monospace" fontWeight="600">STATUS: ACTIVE_PASS</text>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}

                    {/* Emergency Agent (05) */}
                    {activeAgent === 4 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <style>{"\
                            @keyframes blinkBanner4 {\
                              0%, 100% { fill: #3b1116; stroke: #E44856; }\
                              50% { fill: #5a0c12; stroke: #ff6b7a; }\
                            }\
                            @keyframes siren4 {\
                              0%, 100% { fill: #E44856; }\
                              50% { fill: #141517; }\
                            }\
                            .banner4 { animation: blinkBanner4 1s infinite; }\
                            .siren-dot4 { animation: siren4 0.6s infinite; }\
                          "}</style>

                          {/* Critical warning banner */}
                          <g transform="translate(15, 20)">
                            <rect x="0" y="0" width="490" height="50" fill="#3b1116" stroke="#E44856" strokeWidth="1" className="banner4" />
                            <circle cx="25" cy="25" r="6" fill="#E44856" className="siren-dot4" />
                            <text x="45" y="29" fill="#ffffff" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="bold" letterSpacing="0.08em">RUNBOOK_TRIGGER: CRITICAL_INCIDENT_LOBBY_ELEVATOR</text>
                          </g>

                          {/* Left Panel: Mitigations */}
                          <rect x="15" y="85" width="260" height="255" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="15" y="85" width="260" height="35" fill="#141517" />
                          <text x="30" y="107" fill="#e4e4e7" fontSize="10.5" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">MITIGATION_FLOW</text>

                          <g transform="translate(30, 140)">
                            {/* Step 1 */}
                            <rect x="0" y="2" width="12" height="12" fill="#3b1116" stroke="#E44856" strokeWidth="1" />
                            <path d="M2,8 L5,11 L10,5" stroke="#FFFFFF" strokeWidth="1.5" />
                            <text x="22" y="13" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-main)">Broadcast Alarm to Staff</text>
                            
                            <line x1="6" y1="20" x2="6" y2="40" stroke="#222528" strokeWidth="1.5" />

                            {/* Step 2 */}
                            <rect x="0" y="42" width="12" height="12" fill="#3b1116" stroke="#E44856" strokeWidth="1" />
                            <path d="M2,48 L5,51 L10,45" stroke="#FFFFFF" strokeWidth="1.5" />
                            <text x="22" y="53" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-main)">Lock Down Elevator Shafts</text>

                            <line x1="6" y1="60" x2="6" y2="80" stroke="#222528" strokeWidth="1.5" />

                            {/* Step 3 */}
                            <rect x="0" y="82" width="12" height="12" fill="#3b1116" stroke="#E44856" strokeWidth="1" />
                            <circle cx="6" cy="88" r="3" fill="#FFFFFF" className="siren-dot4" />
                            <text x="22" y="93" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-main)">Verify Evacuation Map</text>

                            <line x1="6" y1="100" x2="6" y2="120" stroke="#222528" strokeWidth="1.5" />

                            {/* Step 4 */}
                            <rect x="0" y="122" width="12" height="12" fill="#141517" stroke="#71717a" strokeWidth="1" />
                            <text x="22" y="133" fill="#71717a" fontSize="11" fontFamily="var(--font-main)">Alert First Responders</text>
                          </g>

                          {/* Right Panel: Map Diagram */}
                          <rect x="290" y="85" width="215" height="255" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="290" y="85" width="215" height="35" fill="#141517" />
                          <text x="305" y="107" fill="#e4e4e7" fontSize="10.5" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">AFFECTED_ZONES</text>

                          {/* Flat floor plan diagram */}
                          <g transform="translate(310, 140)">
                            {/* Main boundary */}
                            <rect x="0" y="0" width="175" height="160" fill="none" stroke="#222528" strokeWidth="1.5" />
                            
                            {/* Rooms */}
                            <rect x="10" y="10" width="70" height="60" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <text x="45" y="45" fill="#71717a" fontSize="9" textAnchor="middle">LOBBY_A</text>
                            
                            <rect x="95" y="10" width="70" height="60" fill="#3b1116" stroke="#E44856" strokeWidth="1" className="banner4" />
                            <text x="130" y="40" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">ELEVATORS</text>
                            <text x="130" y="52" fill="#E44856" fontSize="8" textAnchor="middle">LOCKED</text>

                            <rect x="10" y="85" width="155" height="65" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                            <text x="87" y="120" fill="#71717a" fontSize="9.5" textAnchor="middle">CENTRAL_PLANT_FLOOR</text>
                          </g>
                        </svg>
                      </div>
                    )}

                    {/* Executive Agent (06) */}
                    {activeAgent === 5 && (
                      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <style>{"\
                            @keyframes drawPath5 {\
                              0% { stroke-dashoffset: 400; }\
                              100% { stroke-dashoffset: 0; }\
                            }\
                            @keyframes pulsePin5 {\
                              0%, 100% { transform: translateY(0px); }\
                              50% { transform: translateY(-3px); }\
                            }\
                            .graph-path5 { stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawPath5 5s infinite linear; }\
                            .pin5 { animation: pulsePin5 2s infinite ease-in-out; }\
                          "}</style>

                          {/* Left Panel: Global Facilities */}
                          <rect x="15" y="20" width="240" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="15" y="20" width="240" height="40" fill="#141517" />
                          <text x="30" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">FACILITY_DIRECTORY</text>

                          <g transform="translate(30, 85)" fill="#e4e4e7" fontSize="11.5" fontFamily="var(--font-main)">
                            {/* HQ-1 */}
                            <circle cx="6" cy="12" r="4" fill="#10b981" />
                            <text x="20" y="16" fontWeight="600">HQ-East (Virginia)</text>
                            <text x="20" y="32" fill="#71717a" fontSize="9.5" fontFamily="var(--font-mono), monospace">GATEWAYS: 412 NOMINAL</text>

                            {/* HQ-2 */}
                            <circle cx="6" cy="62" r="4" fill="#10b981" />
                            <text x="20" y="66" fontWeight="600">HQ-West (Dublin)</text>
                            <text x="20" y="82" fill="#71717a" fontSize="9.5" fontFamily="var(--font-mono), monospace">GATEWAYS: 389 NOMINAL</text>

                            {/* HQ-3 */}
                            <circle cx="6" cy="112" r="4" fill="#10b981" />
                            <text x="20" y="116" fontWeight="600">HQ-APAC (Sydney)</text>
                            <text x="20" y="132" fill="#71717a" fontSize="9.5" fontFamily="var(--font-mono), monospace">GATEWAYS: 198 NOMINAL</text>
                          </g>

                          {/* Right Panel: Metrics Graph */}
                          <rect x="270" y="20" width="235" height="320" fill="#0c0d0e" stroke="#222528" strokeWidth="1" />
                          <rect x="270" y="20" width="235" height="40" fill="#141517" />
                          <text x="285" y="44" fill="#e4e4e7" fontSize="11" fontFamily="var(--font-mono), monospace" fontWeight="600" letterSpacing="0.05em">SECURITY_SCORE</text>

                          <g transform="translate(285, 80)">
                            <text x="0" y="20" fill="#71717a" fontSize="12.5" fontFamily="var(--font-main)">Historical Trust Score</text>
                            <text x="0" y="55" fill="#6354F3" fontSize="30" fontFamily="var(--font-mono), monospace" fontWeight="bold">99.98%</text>

                            {/* Graph */}
                            <g transform="translate(0, 80)">
                              <line x1="0" y1="0" x2="200" y2="0" stroke="#141517" />
                              <line x1="0" y1="30" x2="200" y2="30" stroke="#141517" />
                              <line x1="0" y1="60" x2="200" y2="60" stroke="#141517" />
                              
                              <path d="M 0 60 Q 40 40 80 50 T 160 10 T 200 5 L 200 80 L 0 80 Z" fill="#1a153b" />
                              <path d="M 0 60 Q 40 40 80 50 T 160 10 T 200 5" fill="none" stroke="#6354F3" strokeWidth="2.5" className="graph-path5" />
                              
                              <circle cx="200" cy="5" r="4" fill="#6354F3" />
                            </g>

                            <g transform="translate(0, 190)">
                              <text x="0" y="10" fill="#71717a" fontSize="11" fontFamily="var(--font-main)">Gateways Online</text>
                              <text x="0" y="28" fill="#e4e4e7" fontSize="13" fontFamily="var(--font-mono), monospace" fontWeight="600">1,482 Gateways Secured</text>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}

                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid #212326', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', position: 'relative', zIndex: 10 }}>
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
                background: '#131416',
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
                {"The gap between your security systems and your stakeholders is now closed".split(" ").map((word, wordIdx) => {
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
              background: 'transparent',
              color: '#ffffff',
              margin: '0 calc(-50vw + 50%)',
              width: '100vw',
              padding: '120px 0',
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
                background: transparent;
                border-radius: 0px;
                margin-top: 48px;
              }
              .honest-column {
                padding: 48px;
                box-sizing: border-box;
              }
              .honest-column-left {
                background: #212326;
              }
              .honest-item-row {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                padding: 20px 0;
                position: relative;
              }
              .honest-grid-line-mobile-divider {
                display: none !important;
              }
              @media (max-width: 991px) {
                .honest-grid-container {
                  grid-template-columns: 1fr !important;
                }
                .honest-column-left {
                  background: #212326;
                }
                .honest-column {
                  padding: 36px 24px !important;
                }
                .honest-grid-line-mobile-divider {
                  display: block !important;
                }
                .honest-grid-line-middle {
                  display: none !important;
                }
              }
            `}</style>

            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
                <span className="ent-pill" style={{
                  marginLeft: '0px',
                  marginBottom: '0px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace"
                }}>
                  Honest Positioning
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '32px' }}>
                <h2 style={{
                  fontSize: '48px',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: '#ffffff',
                  fontFamily: 'var(--font-main)',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto'
                }}>
                  {splitWords("What it is and what it isn't", "honest-word")}
                </h2>

                <p style={{
                  maxWidth: '550px',
                  margin: 0,
                  fontSize: '15px',
                  color: '#A1A1AA',
                  lineHeight: '1.6',
                  textAlign: 'left',
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  flex: '0 1 auto'
                }}>
                  {splitWords("We believe in clear expectations. Here's where the Communication Interface excels and where other approaches may be more appropriate.", "honest-desc-word")}
                </p>
              </div>

              <div className="honest-grid-container" style={{ position: 'relative' }}>
                {/* Construction Lines */}
                <div className="honest-grid-line-top" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: '#212326', transformOrigin: 'left center' }} />
                <div className="honest-grid-line-bottom" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: '#212326', transformOrigin: 'right center' }} />
                <div className="honest-grid-line-left" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', background: '#212326', transformOrigin: 'center top' }} />
                <div className="honest-grid-line-right" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px', background: '#212326', transformOrigin: 'center bottom' }} />
                <div className="honest-grid-line-middle" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: '#212326', transformOrigin: 'center top' }} />

                {/* Excels Column */}
                <div className="honest-column honest-column-left" style={{ position: 'relative' }}>
                  {/* Mobile divider line at the bottom of the left column (only visible on mobile) */}
                  <div className="honest-grid-line-mobile-divider" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: '#212326',
                    transformOrigin: 'left center'
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '28px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'var(--font-main)',
                      margin: 0
                    }}>
                      Where it works best
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      border: '1px solid #212326',
                      padding: '3px 8px',
                      background: '#212326',
                      letterSpacing: '1px'
                    }}>
                      EXCELS
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { text: 'Organizations with high volumes of visitors and contractors moving through sites daily', icon: AnimatedNetworkNodesIcon, color: '#4993E3' },
                      { text: 'Multi-site operations that need every location to run the same way', icon: AnimatedCrowdIcon, color: '#EA49B2' },
                      { text: 'Regulated industries where every interaction needs to be logged and traceable', icon: AnimatedAuditStampIcon, color: '#E7C73B' },
                      { text: 'Security teams coordinating guards, visitors, and contractors across locations', icon: AnimatedWalkieTalkieIcon, color: '#49B25C' },
                      { text: 'Facilities where a slow or missed communication creates a safety or compliance risk', icon: AnimatedSirenIcon, color: '#E44856' }
                    ].map((item, i, arr) => (
                      <HonestAnimatedItem 
                        key={i} 
                        text={item.text} 
                        IconComponent={item.icon} 
                        color={item.color} 
                        textColor="#E5E7EB" 
                        isLast={i === arr.length - 1} 
                      />
                    ))}
                  </div>
                </div>

                {/* Alternatives Column */}
                <div className="honest-column" style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '28px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'var(--font-main)',
                      margin: 0
                    }}>
                      Where other tools fit better
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#A1A1AA',
                      fontWeight: 'bold',
                      border: '1px solid #212326',
                      padding: '3px 8px',
                      background: 'transparent',
                      letterSpacing: '1px'
                    }}>
                      ALTERNATIVES
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { text: 'Single-site operations with low daily visitor and contractor traffic', icon: AnimatedSmallBuildingIcon, color: '#AFF962' },
                      { text: 'Organizations without existing access control or camera systems in place', icon: AnimatedStandaloneBoxIcon, color: '#FCE545' },
                      { text: 'Teams where current manual coordination is working and scale is not a concern', icon: AnimatedCoffeeChatIcon, color: '#6354F3' }
                    ].map((item, i, arr) => (
                      <HonestAnimatedItem 
                        key={i} 
                        text={item.text} 
                        IconComponent={item.icon} 
                        color={item.color} 
                        textColor="#9CA3AF" 
                        isLast={i === arr.length - 1} 
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* The Honest Tradeoff Quote Box */}
              <div
                className="honest-quote-box"
                style={{
                  marginTop: '0px',
                  position: 'relative',
                  padding: '36px 48px',
                  border: '1px solid #212326',
                  borderTop: 'none',
                  borderRadius: '0px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  background: 'transparent'
                }}
              >
                {/* Content wrapped */}
                <div className="honest-quote-content" style={{ position: 'relative', zIndex: 1 }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#ffffff',
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
                    color: '#D4D4D8',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    "We amplify your team. We don't replace them."
                  </p>
                </div>
              </div>

            </div>
          </section>

          <section
            id="operational-outcomes"
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              margin: '0 calc(-50vw + 50%)',
              width: '100vw',
              padding: '100px 0',
              position: 'relative',
              zIndex: 10,
              boxSizing: 'border-box',
              fontFamily: "var(--font-main), 'Inter', sans-serif"
            }}
          >
            <div className="container">

              {/* ── TOP HEADER (CENTERED) ── */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 80px'
              }}>
                {/* Tag Pill */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '12px' }}>
                  <span className="ent-pill" style={{
                    margin: 0,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace"
                  }}>
                    What Changes
                  </span>
                </div>

                {/* Heading */}
                <h2 className="std-section-h2 text-center" style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  marginTop: '0px',
                  marginBottom: '24px'
                }}>
                  When security can communicate
                </h2>

                {/* Subheading */}
                <p className="std-section-subheading text-center" style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  maxWidth: '650px',
                  margin: '0 auto 48px',
                  textAlign: 'center'
                }}>
                  The gap between your security systems and your stakeholders closes. Every interaction becomes an opportunity for security intelligence.
                </p>

                {/* Button */}
                <a href="#" className="ent-btn-primary" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  transform: 'translateZ(0)',
                  position: 'relative',
                  width: 'fit-content'
                }}>Request Assessment &rarr; <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
              </div>

              {/* ── 3x2 GRID ── */}
              <div className="operational-outcomes-grid">

                {/* ── CARD 01 — VISITOR ── */}
                <div
                  className="operational-grid-card"
                  style={{
                    background: 'transparent',
                    padding: '32px 28px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    minHeight: '420px'
                  }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Visitor Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Check-in takes 90 seconds</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Visitors self-serve from pre-registration to badge. Guards stay in the field. No queues. No overrides.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { initials: 'JL', name: 'James Liu', role: 'VISITOR · PRE-REGISTERED', badge: 'APPROVED', badgeBg: 'rgba(175, 249, 98, 0.15)', badgeColor: '#AFF962', badgeBorder: 'rgba(175, 249, 98, 0.25)', avatarBg: 'rgba(99, 84, 243, 0.3)', avatarBorder: 'rgba(99, 84, 243, 0.4)', avatarColor: '#6354F3' },
                        { initials: 'SR', name: 'Sarah Rahman', role: 'CONTRACTOR · APEX SEC', badge: 'ESCORTED', badgeBg: 'rgba(99, 84, 243, 0.15)', badgeColor: '#6354F3', badgeBorder: 'rgba(99, 84, 243, 0.25)', avatarBg: 'rgba(73, 147, 227, 0.2)', avatarBorder: 'rgba(73, 147, 227, 0.3)', avatarColor: '#4993E3' },
                        { initials: 'MK', name: 'Mark Kim', role: 'WALK-IN · PENDING', badge: 'CHECKING', badgeBg: 'rgba(252, 229, 69, 0.12)', badgeColor: '#FCE545', badgeBorder: 'rgba(252, 229, 69, 0.2)', avatarBg: 'rgba(252, 229, 69, 0.15)', avatarBorder: 'rgba(252, 229, 69, 0.3)', avatarColor: '#FCE545' }
                      ].map((v, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #202022',
                            borderRadius: '8px',
                            padding: '12px 14px',
                            animation: 'visitor-row-cycle 6s infinite',
                            animationDelay: `${i * 150}ms`
                          }}
                        >
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: v.avatarBg, border: `1px solid ${v.avatarBorder}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: v.avatarColor }}>{v.initials}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{v.name}</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono), monospace' }}>{v.role}</div>
                          </div>
                          <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', padding: '3px 8px', borderRadius: '100px', background: v.badgeBg, color: v.badgeColor, border: `1px solid ${v.badgeBorder}`, flexShrink: 0 }}>{v.badge}</div>
                        </div>
                      ))}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: 'rgba(175, 249, 98, 0.06)',
                          border: '1px solid rgba(175, 249, 98, 0.15)',
                          borderRadius: '8px',
                          animation: 'visitor-row-cycle 6s infinite',
                          animationDelay: '600ms'
                        }}
                      >
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.4)' }}>AVG CHECK-IN TIME</span>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#AFF962', fontFamily: 'var(--font-mono), monospace' }}>
                          0:{visitorSeconds < 10 ? '0' + visitorSeconds : visitorSeconds}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD 02 — GUARD ── */}
                <div
                  className="operational-grid-card"
                  style={{ background: 'transparent', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '420px' }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Guard Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Guards document in real time</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Incidents logged during the event, not reconstructed after. Hands-free voice. No memory gaps.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        {['#E44856', '#FCE545', '#AFF962'].map((c, i) => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
                      </div>
                      {[
                        { tag: '[ GUARD_07 ]', tagColor: '#AFF962', text: 'on patrol · Gate 4' },
                        { tag: 'VOICE_INPUT:', tagColor: '#6354F3', text: '"Suspicious vehicle, north lot"' },
                        { tag: 'LOGGED', tagColor: '#AFF962', text: '22:14:33 · GPS confirmed' },
                        { tag: 'DISPATCH', tagColor: '#AFF962', text: 'Unit 3 en route · ETA 4min' },
                        { tag: 'EVIDENCE:', tagColor: '#6354F3', text: 'photo attached · plate captured' },
                        { tag: 'INCIDENT_ID:', tagColor: '#AFF962', text: 'INC-2847' },
                      ].map((line, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono), monospace',
                            color: 'rgba(255,255,255,0.25)',
                            lineHeight: 1.6,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <div style={{
                            display: 'inline-block',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            animation: `typing-line-${i} 8s steps(30, end) infinite`
                          }}>
                            <span style={{ color: line.tagColor }}>{line.tag}</span>{' '}
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{line.text}</span>
                          </div>
                        </div>
                      ))}
                      <div
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono), monospace',
                          marginTop: '4px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <div style={{
                          display: 'inline-block',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          animation: 'typing-line-6 8s steps(30, end) infinite'
                        }}>
                          <span style={{ color: '#6354F3' }}>MITHRIV &gt;</span>{' '}
                          <span style={{ color: 'rgba(255,255,255,0.7)' }}>awaiting update</span>
                          <span style={{
                            display: 'inline-block', width: '7px', height: '14px',
                            background: '#6354F3', verticalAlign: 'middle', marginLeft: '2px',
                            animation: 'terminal-blink 0.8s step-end infinite'
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD 03 — EMPLOYEE ── */}
                <div
                  className="operational-grid-card"
                  style={{ background: 'transparent', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '420px' }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Employee Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Employees stop calling help desk</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Credential requests, access questions answered in seconds. Tickets drop 40–60%.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.7)',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          fontSize: '12px',
                          lineHeight: 1.5,
                          maxWidth: '85%',
                          animation: 'employee-bubble-1-cycle 7s infinite'
                        }}
                      >
                        Can I get access to the server room for Saturday maintenance?
                        <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: '#212326', marginTop: '4px' }}>elena.p · 09:14</div>
                      </div>
                      <div
                        style={{
                          background: 'rgba(99, 84, 243, 0.15)',
                          border: '1px solid rgba(99, 84, 243, 0.2)',
                          color: '#d2cfff',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          fontSize: '12px',
                          lineHeight: 1.5,
                          maxWidth: '85%',
                          alignSelf: 'flex-end',
                          animation: 'employee-bubble-2-cycle 7s infinite'
                        }}
                      >
                        Access approved for Saturday 08:00–18:00. Badge updated. Escort not required for your clearance level.
                        <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(99, 84, 243, 0.5)', marginTop: '4px' }}>MITHRIV AI · 09:14</div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          background: 'rgba(175, 249, 98, 0.08)',
                          border: '1px solid rgba(175, 249, 98, 0.2)',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono), monospace',
                          color: '#AFF962',
                          animation: 'employee-badge-cycle 7s infinite'
                        }}
                      >
                        ✓ RESOLVED IN 4 SECONDS
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD 04 — CONTRACTOR ── */}
                <div
                  className="operational-grid-card"
                  style={{ background: 'transparent', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '420px' }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Contractor Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Contractors arrive prepared</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Safety briefing, NDA, escort assigned before the gate. Access expires automatically.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '18px', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '4px' }}>ONBOARDING · MARK STEVENS · APEX</div>
                      {[
                        { text: 'Safety briefing delivered', done: true, tag: 'DONE' },
                        { text: 'NDA signed & timestamped', done: true, tag: 'DONE' },
                        { text: 'Credentials verified', done: true, tag: 'DONE' },
                        { text: 'Escort assigned', done: false, tag: '2 MIN' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid #202022',
                            borderRadius: '6px',
                            animation: 'contractor-item-cycle 6s infinite',
                            animationDelay: `${i * 150}ms`
                          }}
                        >
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              animation: item.done
                                ? `contractor-check-done-cycle 6s infinite`
                                : `contractor-check-pending-cycle 6s infinite`,
                              animationDelay: `${i * 150}ms`
                            }}
                          >
                            {item.done
                              ? <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#AFF962"
                                strokeWidth="3"
                                style={{
                                  animation: `contractor-svg-done-cycle 6s infinite`,
                                  animationDelay: `${i * 150}ms`
                                }}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              : <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: '#FCE545',
                                  animation: `contractor-dot-pending-cycle 6s infinite`,
                                  animationDelay: `${i * 150}ms`
                                }}
                              />
                            }
                          </div>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', flex: 1 }}>{item.text}</span>
                          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: item.done ? '#AFF962' : '#FCE545', marginLeft: 'auto' }}>{item.tag}</span>
                        </div>
                      ))}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 12px',
                          background: 'rgba(99, 84, 243, 0.08)',
                          border: '1px solid rgba(99, 84, 243, 0.15)',
                          borderRadius: '6px',
                          marginTop: '4px',
                          animation: 'contractor-item-cycle 6s infinite',
                          animationDelay: '600ms'
                        }}
                      >
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)' }}>ACCESS EXPIRES</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#6354F3', fontFamily: 'var(--font-mono), monospace' }}>18:42:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD 05 — EMERGENCY ── */}
                <div
                  className="operational-grid-card"
                  style={{ background: 'transparent', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '420px' }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Emergency Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Emergencies coordinate automatically</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Every stakeholder notified simultaneously. From alarm to all-clear. Accountability in minutes.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(228, 72, 86, 0.1)', border: '1px solid rgba(228, 72, 86, 0.25)', borderRadius: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E44856', animation: 'terminal-pulse 1.2s ease-in-out infinite', flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#E44856', fontWeight: 600, letterSpacing: '1px' }}>EMERGENCY · MUSTER ACTIVE</span>
                      </div>
                      {[
                        { name: 'SMS', status: '1,402 SENT', color: '#AFF962' },
                        { name: 'TEAMS / SLACK', status: 'ALL CHANNELS', color: '#AFF962' },
                        { name: 'VOICE', status: 'BROADCAST', color: '#AFF962' },
                        { name: 'RADIO', status: 'TRANSMITTING', color: '#FCE545' },
                      ].map((ch, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid #202022',
                            borderRadius: '6px',
                            animation: 'emergency-channel-cycle 7s infinite',
                            animationDelay: `${i * 150}ms`
                          }}
                        >
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.5)' }}>{ch.name}</span>
                          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: ch.color }}>{ch.status}</span>
                        </div>
                      ))}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          background: 'rgba(228, 72, 86, 0.06)',
                          border: '1px solid rgba(228, 72, 86, 0.12)',
                          borderRadius: '6px',
                          marginTop: '2px',
                          animation: 'emergency-counters-cycle 7s infinite',
                          animationDelay: '600ms'
                        }}
                      >
                        {[{ val: `${accountedPercent}%`, label: 'ACCOUNTED' }, { val: `${unconfirmedCount}`, label: 'UNCONFIRMED' }, { val: '4:12', label: 'ELAPSED' }].map((s, i) => (
                          <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono), monospace' }}>{s.val}</div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '1px', marginTop: '2px' }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD 06 — EXECUTIVE ── */}
                <div
                  className="operational-grid-card"
                  style={{ background: 'transparent', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '420px' }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px' }}>Executive Agent</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Executives get answers on demand</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Security posture, compliance status, incident trends. Natural language. No analyst wait.</p>
                  <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#111113', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: '1px solid rgba(99, 84, 243, 0.2)', borderRadius: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6354F3', flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.6)' }}>"Compliance trend this quarter?"</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid #202022', borderRadius: '6px' }}>
                        {[
                          { h: '45%', hi: false }, { h: '55%', hi: false }, { h: '50%', hi: false },
                          { h: '65%', hi: false }, { h: '72%', hi: false }, { h: '68%', hi: false },
                          { h: '80%', hi: false }, { h: '94%', hi: true }
                        ].map((bar, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: bar.h,
                              borderRadius: '3px 3px 0 0',
                              background: bar.hi ? 'rgba(175, 249, 98, 0.4)' : 'rgba(99, 84, 243, 0.3)',
                              border: `1px solid ${bar.hi ? 'rgba(175, 249, 98, 0.5)' : 'rgba(99, 84, 243, 0.4)'}`,
                              transformOrigin: 'bottom',
                              animation: 'executive-bar-scale-cycle 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
                              animationDelay: `${i * 50}ms`
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[{ val: '99.1%', label: 'COMPLIANCE' }, { val: 'A+', label: 'SEC INDEX' }, { val: '0', label: 'CRITICAL' }].map((k, i) => (
                          <div
                            key={i}
                            style={{
                              textAlign: 'center',
                              animation: 'executive-metrics-cycle 6s infinite',
                              animationDelay: `${i * 150 + 400}ms`
                            }}
                          >
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono), monospace' }}>{k.val}</div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.5px', marginTop: '2px' }}>{k.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <style>{`
              #operational-outcomes .std-section-subheading {
                margin-bottom: 48px !important;
              }
              @keyframes terminal-blink { 50% { opacity: 0; } }
              @keyframes terminal-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
              
              @keyframes visitor-row-cycle {
                0%, 10% { opacity: 0.3; transform: translateY(12px); }
                20%, 80% { opacity: 1; transform: translateY(0); }
                90%, 100% { opacity: 0.3; transform: translateY(12px); }
              }
              
              @keyframes typing-line-0 {
                0% { width: 0; }
                6.25%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-1 {
                0%, 7.5% { width: 0; }
                13.75%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-2 {
                0%, 15% { width: 0; }
                21.25%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-3 {
                0%, 22.5% { width: 0; }
                28.75%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-4 {
                0%, 30% { width: 0; }
                36.25%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-5 {
                0%, 37.5% { width: 0; }
                43.75%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              @keyframes typing-line-6 {
                0%, 45% { width: 0; }
                56.25%, 85% { width: 100%; }
                92.5%, 100% { width: 0; }
              }
              
              @keyframes employee-bubble-1-cycle {
                0%, 5% { opacity: 0.3; transform: translateY(15px); }
                15%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0.3; transform: translateY(15px); }
              }
              
              @keyframes employee-bubble-2-cycle {
                0%, 20% { opacity: 0; transform: translateY(15px); }
                30%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0; transform: translateY(15px); }
              }
              
              @keyframes employee-badge-cycle {
                0%, 45% { opacity: 0; transform: scale(0.8) translateY(12px); }
                55%, 85% { opacity: 1; transform: scale(1) translateY(0); }
                95%, 100% { opacity: 0; transform: scale(0.8) translateY(12px); }
              }
              
              @keyframes contractor-item-cycle {
                0%, 10% { opacity: 0.3; transform: translateY(8px); }
                20%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0.3; transform: translateY(8px); }
              }
              
              @keyframes contractor-check-done-cycle {
                0%, 15% { background: rgba(255,255,255,0.04); border-color: #202022; }
                25%, 85% { background: rgba(175, 249, 98, 0.2); border-color: rgba(175, 249, 98, 0.4); }
                95%, 100% { background: rgba(255,255,255,0.04); border-color: #202022; }
              }
              
              @keyframes contractor-svg-done-cycle {
                0%, 15% { transform: scale(0); }
                25%, 85% { transform: scale(1); }
                95%, 100% { transform: scale(0); }
              }
              
              @keyframes contractor-check-pending-cycle {
                0%, 25% { background: rgba(255,255,255,0.04); border-color: #202022; }
                35%, 85% { background: rgba(252, 229, 69, 0.1); border-color: rgba(252, 229, 69, 0.25); }
                95%, 100% { background: rgba(255,255,255,0.04); border-color: #202022; }
              }
              
              @keyframes contractor-dot-pending-cycle {
                0%, 25% { transform: scale(0); }
                35%, 85% { transform: scale(1); }
                95%, 100% { transform: scale(0); }
              }
              
              @keyframes emergency-channel-cycle {
                0%, 10% { opacity: 0.3; transform: translateY(8px); }
                20%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0.3; transform: translateY(8px); }
              }
              
              @keyframes emergency-counters-cycle {
                0%, 25% { opacity: 0.2; transform: translateY(12px); }
                35%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0.2; transform: translateY(12px); }
              }
              
              @keyframes executive-bar-scale-cycle {
                0%, 10% { transform: scaleY(0.1); }
                20%, 85% { transform: scaleY(1); }
                95%, 100% { transform: scaleY(0.1); }
              }
              
              @keyframes executive-metrics-cycle {
                0%, 25% { opacity: 0.2; transform: translateY(12px); }
                35%, 85% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0.2; transform: translateY(12px); }
              }
            `}</style>
          </section>

          {/* Premium CTA Section (Mimicking Home 02) */}
          <section className="hire-security-section" style={{ background: 'transparent', color: '#ffffff', width: '100vw', margin: '0 calc(-50vw + 50%)', position: 'relative', zIndex: 10, borderTop: '1px solid #212326', borderBottom: '1px solid #212326' }}>
            {/* Central constrained column */}
            <div className="container" style={{ position: 'relative', height: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Box with full borders, diagonal background, and breathing bottom glow */}
                <div className="hide-on-mobile hire-security-bg" style={{ position: 'absolute', top: '-1px', bottom: '-1px', left: '0px', right: '0px', borderLeft: '1px solid #212326', borderRight: '1px solid #212326', borderBottom: 'none', borderTop: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' viewBox=\'0 0 8 8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-1,-1 L9,9 M7,-1 L9,1 M-1,7 L1,9\' stroke=\'%23212326\' stroke-width=\'1\'/%3E%3C/svg%3E")', overflow: 'hidden', zIndex: -1 }}>
                    {/* Inner Bottom Gradient (Breathing Up and Down) */}
                    <style>{`
                        @keyframes bottomBreathingHome {
                            0%, 100% { transform: scaleY(1); opacity: 1; }
                            50% { transform: scaleY(0.7); opacity: 0.5; }
                        }
                        @keyframes moveDiagonalsHire {
                            0% { background-position: 0 0; }
                            100% { background-position: 120px 0; }
                        }
                        .hire-security-section:hover .hire-security-bg {
                            animation: moveDiagonalsHire 3s linear infinite;
                        }
                    `}</style>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(119, 0, 255, 0.25) 0%, transparent 100%)', animation: 'bottomBreathingHome 5s ease-in-out infinite', transformOrigin: 'bottom center', pointerEvents: 'none', zIndex: -1 }}></div>
                </div>

                <div style={{ maxWidth: '900px', width: '100%', padding: '120px 0', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.1', color: '#ffffff', marginBottom: '32px', fontFamily: 'var(--font-main)' }}>
                        Stop responding to security and start anticipating it.
                    </h2>
                    <p style={{ fontSize: '15px', color: '#B6B6B7', lineHeight: '1.6', fontFamily: 'var(--font-mono)', maxWidth: '700px', margin: '0 auto 48px auto' }}>
                        Your security stack is generating more intelligence than any team can manually process. The Communication Interface connects every stakeholder to it — instantly.
                    </p>
                    <a href="#" className="ent-btn-primary hover-arrow-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 32px', fontSize: '15px', textDecoration: 'none' }}>
                        Request Assessment 
                        <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg>
                    </a>
                </div>
            </div>
          </section>



        </div>
      </div>
    </div>
  )
}
