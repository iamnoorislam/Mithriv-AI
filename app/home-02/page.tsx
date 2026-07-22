"use client";
import ComplianceAutomates from "@/components/ui/ComplianceAutomates";
import AutonomousResponseTerminal from "@/components/AutonomousResponseTerminal";

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import '../style.css'
import { createRoot } from 'react-dom/client'
import { AnimatedIncidentIcon, AnimatedCredentialIcon, AnimatedVisitorIcon, AnimatedSafetyIcon, AnimatedGuardIcon, AnimatedVehicleIcon, AnimatedBlogIcon, AnimatedBotIcon, AnimatedBrainIcon, AnimatedCaseStudiesIcon, AnimatedNetworkIcon, AnimatedUsersIcon, AnimatedBriefcaseIcon, AnimatedMessageIcon, AnimatedLayersIcon, AnimatedZapIcon, AnimatedMonitorIcon, AnimatedEbookIcon, AnimatedFileCodeIcon, AnimatedRadarIcon, AnimatedCheckSquareIcon, AnimatedPresentationIcon } from '../../components/AnimatedIcons'

function TimelineIcon({ IconComponent, color }: { IconComponent: any, color: string }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let parent = el.closest('.timeline-item, .isometric-point-item, .k-feature-card, .k-console-panel');
        if (!parent) return;

        const handleEnter = () => setIsHovered(true);
        const handleLeave = () => setIsHovered(false);

        parent.addEventListener('mouseenter', handleEnter);
        parent.addEventListener('mouseleave', handleLeave);

        return () => {
            parent.removeEventListener('mouseenter', handleEnter);
            parent.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <IconComponent color={color} size={20} isHovered={isHovered} />
        </div>
    );
}

export default function Home02Page() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const containers = document.querySelectorAll('.react-timeline-icon');
        containers.forEach(container => {
            if (container.hasAttribute('data-rendered')) return;
            container.setAttribute('data-rendered', 'true');

            const iconName = container.getAttribute('data-icon');
            const color = container.getAttribute('data-color') || 'currentColor';
            let Icon = null;
            if (iconName === 'network') Icon = AnimatedIncidentIcon;
            if (iconName === 'case') Icon = AnimatedCredentialIcon;
            if (iconName === 'bot') Icon = AnimatedVisitorIcon;
            if (iconName === 'brain') Icon = AnimatedSafetyIcon;
            if (iconName === 'podcast') Icon = AnimatedGuardIcon;
            if (iconName === 'ebook') Icon = AnimatedVehicleIcon;
            if (iconName === 'icon-brain') Icon = AnimatedBrainIcon;
            if (iconName === 'icon-network') Icon = AnimatedNetworkIcon;
            if (iconName === 'icon-eye') Icon = AnimatedSafetyIcon;
            if (iconName === 'icon-shield') Icon = AnimatedGuardIcon;
            if (iconName === 'icon-bot') Icon = AnimatedBotIcon;
            if (iconName === 'icon-users') Icon = AnimatedUsersIcon;
            if (iconName === 'icon-briefcase') Icon = AnimatedBriefcaseIcon;
            if (iconName === 'icon-message') Icon = AnimatedMessageIcon;
            if (iconName === 'icon-layers') Icon = AnimatedLayersIcon;
            if (iconName === 'icon-zap') Icon = AnimatedZapIcon;
            if (iconName === 'icon-monitor') Icon = AnimatedMonitorIcon;
            if (iconName === 'bento-book') Icon = AnimatedFileCodeIcon;
            if (iconName === 'bento-users') Icon = AnimatedRadarIcon;
            if (iconName === 'bento-shield') Icon = AnimatedCheckSquareIcon;
            if (iconName === 'bento-briefcase') Icon = AnimatedPresentationIcon;

            if (Icon) {
                const root = createRoot(container);
                root.render(<TimelineIcon IconComponent={Icon} color={color} />);
            }
        });

        const terminalContainers = document.querySelectorAll('.autonomous-terminal-container');
        terminalContainers.forEach(container => {
            if (container.hasAttribute('data-rendered')) return;
            container.setAttribute('data-rendered', 'true');
            const root = createRoot(container);
            root.render(<AutonomousResponseTerminal />);
        });
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        // Hide Preloaders
        setTimeout(() => {
            const preloader1 = document.getElementById('premium-preloader');
            if (preloader1) {
                preloader1.style.opacity = '0';
                setTimeout(() => preloader1.style.display = 'none', 500);
            }
            const preloader2 = document.querySelector('.preloader');
            if (preloader2) {
                (preloader2 as HTMLElement).style.opacity = '0';
                setTimeout(() => (preloader2 as HTMLElement).style.display = 'none', 500);
            }
        }, 800);

        let timer: NodeJS.Timeout;
        let refreshTimers: NodeJS.Timeout[] = [];
        let deferTimer: NodeJS.Timeout;

        const init = () => {
            const w = window as any;
            if (w.runMain && w.runScenarioPopup && w.runConsoleSimulation02 && w.runDotCanvas02 && w.runHeroDotCanvas02 && w.runDottedSurface && w.runSparkles && w.gsap && w.ScrollTrigger && typeof w.Lenis !== 'undefined' && w.THREE && w.tsParticles) {
                // Wait 100ms for DOM layout and paint to stabilize before running scripts
                deferTimer = setTimeout(() => {
                    try {
                        w.runPreloader && w.runPreloader();
                    } catch (e) {
                        console.error("Error in runPreloader:", e);
                    }
                    try {
                        w.runMain();
                    } catch (e) {
                        console.error("Error in runMain:", e);
                    }
                    try {
                        w.runScenarioPopup();
                    } catch (e) {
                        console.error("Error in runScenarioPopup:", e);
                    }
                    try {
                        w.runConsoleSimulation02();
                    } catch (e) {
                        console.error("Error in runConsoleSimulation02:", e);
                    }
                    try {
                        w.runDotCanvas02();
                        w.runHeroDotCanvas02();
                    } catch (e) {
                        console.error("Error in runDotCanvas02:", e);
                    }
                    try {
                        w.runDottedSurface();
                    } catch (e) {
                        console.error("Error in runDottedSurface:", e);
                    }
                    try {
                        w.runSparkles();
                    } catch (e) {
                        console.error("Error in runSparkles:", e);
                    }

                    // Schedule multiple ScrollTrigger refreshes as dynamic heights settle
                    if (w.ScrollTrigger) {
                        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 100));
                        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 500));
                        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 1000));
                        refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 2000));
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

            const w = window as any;
            if (w.cleanupMain) {
                w.cleanupMain();
            }
            if (w.gsap && w.ScrollTrigger) {
                w.ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
            }
            if (w.cancelDotCanvas02Anim) {
                w.cancelDotCanvas02Anim();
            }
            if (w.cancelDottedSurfaceAnim) {
                w.cancelDottedSurfaceAnim();
            }
            if (w.cancelSparklesAnim) {
                w.cancelSparklesAnim();
            }

            // Clean up ResizeObserver
            if (w.dottedSurfaceResizeObserver) {
                w.dottedSurfaceResizeObserver.disconnect();
                w.dottedSurfaceResizeObserver = null;
            }

            if (w.consoleClickSimulationListener02) {
                document.removeEventListener('click', w.consoleClickSimulationListener02);
                w.consoleClickSimulationListener02 = null;
            }

            w.togglePop = null;
            w.simulateType = null;
            w.cpSend = null;
            w.handleOption = null;
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="landing-theme">
            <div dangerouslySetInnerHTML={{
                __html: `
    <div class="global-grid-bg" id="globalGridBg"></div>
    
    <main class="hero-section" id="hero" style="padding-top: 200px; padding-bottom: 120px;">
        

        <!-- Interactive Repelling Dot-Grid Matrix Background with Radial Fade-out Mask -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; -webkit-mask-image: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%); mask-image: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%);">
          <canvas id="heroDotCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
        </div>

        <!-- Hero Content -->
        <div class="hero-content" style="position: relative; z-index: 10; margin-top: 0;">
            <div class="ent-pill award-pill">Conscious Security</div>
            <h1 class="main-heading">
                <span class="word-mask"><span class="word-inner w1">Intelligence</span></span>
                <span class="word-mask"><span class="word-inner w2">that</span></span>
                <span class="word-mask"><span class="word-inner w3">secures</span></span><br>
                <span class="word-mask"><span class="word-inner w4">your</span></span>
                <span class="word-mask"><span class="word-inner w5">physical</span></span>
                <span class="word-mask"><span class="word-inner w6">world</span></span>
            </h1>
            <p class="body-text award-fade-up delay-p" style="max-width: 650px; margin: 0 auto 2.5rem; font-size: 15px; line-height: 1.6; color: #B6B6B7; font-family: var(--font-mono);">
                Mithriv is the AI execution layer that knows your sites, correlates across systems, and acts in real
                time, turning storms into intentional responses.
            </p>
            <a href="#" class="ent-btn-primary award-fade-up delay-btn"
                style="padding: 12px 24px; font-size: 0.95rem; display: inline-flex; -webkit-backdrop-filter: none; backdrop-filter: none; transform: translateZ(0); position: relative; z-index: 20;">Request
                Consultation <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
        </div>

        <!-- Trusted By Strip -->
        <div class="relative w-full max-w-[1280px] mx-auto px-6 z-10 award-fade-up delay-strip" style="padding-top: 140px; padding-bottom: 40px; margin-top: auto;">
          <style>
            @keyframes custom-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
          </style>
          <div class="text-center mb-12">
            <h2 style="font-size: 1.75rem; font-weight: 700; color: #fff; letter-spacing: -0.02em;">Trusted by these companies</h2>
          </div>
          
          <div class="relative flex overflow-hidden w-full group">
            <div class="flex overflow-hidden relative w-full" style="mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);">
              
  <div class="flex shrink-0 items-center justify-start w-max" style="gap: 3.5rem; min-width: 100%; padding-right: 3.5rem; animation: custom-marquee 15s linear infinite;">
    <!-- Inner Repeat 1 -->
    <div class="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
      <span style="letter-spacing: -0.05em;">NEXT<span class="text-[#888]">.</span></span>
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      React
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
      shadcn/ui
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
      supabase
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
      tailwindcss
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
      Vercel
    </div>
    <!-- Inner Repeat 2 -->
    <div class="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
      <span style="letter-spacing: -0.05em;">NEXT<span class="text-[#888]">.</span></span>
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      React
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
      shadcn/ui
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
      supabase
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
      tailwindcss
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
      Vercel
    </div>
  </div>

  <div class="flex shrink-0 items-center justify-start w-max" style="gap: 3.5rem; min-width: 100%; padding-right: 3.5rem; animation: custom-marquee 15s linear infinite;">
    <!-- Inner Repeat 1 -->
    <div class="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
      <span style="letter-spacing: -0.05em;">NEXT<span class="text-[#888]">.</span></span>
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      React
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
      shadcn/ui
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
      supabase
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
      tailwindcss
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
      Vercel
    </div>
    <!-- Inner Repeat 2 -->
    <div class="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
      <span style="letter-spacing: -0.05em;">NEXT<span class="text-[#888]">.</span></span>
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      React
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
      shadcn/ui
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
      supabase
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
      tailwindcss
    </div>
    <div class="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
      Vercel
    </div>
  </div>

            </div>
          </div>
        </div>
    </main>

    <div id="content-wrapper" style="position: relative; z-index: 10; background: var(--bg-base);">
        <!-- Global Background Elements -->
        <div class="grain-overlay"></div>

        <!-- Section: Aceternity Sparkles Design (Replaced) -->
        <section class="section sparkles-section" style="display: none;">
            <div id="tsparticles-sparkles"></div>
        </section>


        <!-- Section 2: Interactive Console Demo -->
        <section class="section sec-console-demo reveal-section"
            style="position: relative; z-index: 5; background: transparent; overflow: hidden; padding-bottom: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.15);">

            <div class="container text-center" style="position: relative; z-index: 10;">
                <div class="ent-pill" style="margin: 0 auto 24px; display: flex; width: fit-content;">Live Autonomous
                    Response Simulation</div>
                <h2 class="pixel-heading" style="font-size: 48px; line-height: 1.1; margin-bottom: 24px;">One command,
                    full operational response</h2>
                <p class="body-text" style="max-width: 600px; margin: 0 auto 64px; font-size: 14px; line-height: 1.6; font-family: var(--font-mono); text-align: center;">
                    Simulate live operational scenarios and watch Mithriv coordinate security, access control, visitor
                    movement, and emergency response autonomously in realtime.
                </p>
            </div>

            <style>
                .user-dash-wrapper *,
                .user-dash-wrapper *::before,
                .user-dash-wrapper *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .user-dash-wrapper {
                    --bg: #000000;
                    --bg-sidebar: #09090B;
                    --bg-hover: #121316;
                    --bg-panel: #0A0A0C;
                    --bg-input: #09090B;
                    --border: rgba(255, 255, 255, 0.05);
                    --border-light: rgba(255, 255, 255, 0.02);
                    --text-main: #FAFAFA;
                    --text-muted: #8A8F98;
                    --text-dark: #52525B;
                    --accent: #FFFFFF;
                    --yellow: #f2c94c;

                    --sans: 'Geist', sans-serif !important;
                    --mono: 'Geist', monospace !important;

                    height: 800px;
                    overflow: hidden;
                    background: var(--bg);
                    color: var(--text-main);
                    font-family: var(--sans) !important;
                    font-size: 13px;
                    position: relative;
                    border-radius: 0;
                    margin: 40px auto 0;
                    max-width: 1280px;
                    border: 1px solid rgba(255, 255, 255, 0.12) !important;
                    border-bottom: none !important;
                    box-shadow: none;
                    text-align: left;
                }

                .user-dash-wrapper .shell {
                    display: flex;
                    height: 100%;
                }

                /* --- SIDEBAR --- */
                .user-dash-wrapper .sb {
                    width: 200px;
                    flex-shrink: 0;
                    background: var(--bg-sidebar);
                    border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    z-index: 5;
                }

                .user-dash-wrapper .sb::-webkit-scrollbar {
                    width: 0;
                }

                .user-dash-wrapper .mac-controls {
                    display: flex;
                    gap: 8px;
                    padding: 16px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .user-dash-wrapper .mac-btn {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .user-dash-wrapper .mac-btn.red { background: #FF5F56; }
                .user-dash-wrapper .mac-btn.yellow { background: #FFBD2E; }
                .user-dash-wrapper .mac-btn.green { background: #27C93F; }

                .user-dash-wrapper .sb-header {
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .user-dash-wrapper .sb-header-icon {
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    background: #fff;
                    display: grid;
                    place-items: center;
                }

                .user-dash-wrapper .sb-header-icon svg {
                    width: 12px;
                    height: 12px;
                    fill: #000;
                }

                .user-dash-wrapper .sb-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    padding: 0 12px;
                    margin-bottom: 24px;
                }

                .user-dash-wrapper .sb-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 10px;
                    border-radius: 6px;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 400;
                    transition: all 0.2s ease;
                    margin-bottom: 2px;
                }

                .user-dash-wrapper .sb-item:hover {
                    background: var(--bg-hover);
                    color: var(--text-main);
                }

                .user-dash-wrapper .sb-item.active {
                    background: var(--bg-hover);
                    color: var(--text-main);
                }

                .user-dash-wrapper .sb-item svg {
                    width: 15px;
                    height: 15px;
                    opacity: 0.8;
                }

                .user-dash-wrapper .sb-section-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--text-dark);
                    padding: 12px 16px 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* --- MAIN AREA --- */
                .user-dash-wrapper .main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    background: var(--bg);
                }

                .user-dash-wrapper .topbar {
                    height: 48px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    padding: 0 24px;
                    gap: 12px;
                    font-size: 13px;
                    color: var(--text-muted);
                    z-index: 5;
                }

                .user-dash-wrapper .tb-title {
                    color: var(--text-main);
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .user-dash-wrapper .tb-icon {
                    color: var(--yellow);
                }

                .user-dash-wrapper .tb-right {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .user-dash-wrapper .content-area {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                }

                /* --- DASHBOARD VIEW (Fades out on escalation) --- */
                .user-dash-wrapper .dash-view {
                    flex: 1;
                    display: flex;
                    width: 100%;
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .user-dash-wrapper .ai-escalated .dash-view {
                    opacity: 0;
                    filter: blur(12px);
                    transform: translateY(-30px) scale(0.97);
                    pointer-events: none;
                }

                .user-dash-wrapper .mid-col {
                    flex: 1;
                    padding: 40px 24px;
                    overflow-y: auto;
                }

                .user-dash-wrapper .mid-col > * {
                    max-width: 680px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .user-dash-wrapper .mid-col::-webkit-scrollbar {
                    width: 0;
                }

                .user-dash-wrapper .page-title {
                    font-size: 20px;
                    font-weight: 500;
                    letter-spacing: -0.02em;
                    color: var(--text-main);
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-dash-wrapper .page-desc {
                    font-size: 14px;
                    line-height: 1.6;
                    color: var(--text-muted);
                    max-width: 680px;
                    margin-bottom: 40px;
                }

                .user-dash-wrapper .code-tag {
                    background: var(--bg-hover);
                    border: 1px solid var(--border);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: var(--mono);
                    font-size: 12px;
                    color: var(--text-main);
                }

                /* Activity Timeline */
                .user-dash-wrapper .activity-section {
                    margin-top: 40px;
                    border-top: 1px solid var(--border);
                    padding-top: 24px;
                }

                .user-dash-wrapper .section-heading {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 24px;
                }

                .user-dash-wrapper .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    position: relative;
                }

                .user-dash-wrapper .timeline::before {
                    content: '';
                    position: absolute;
                    left: 13px;
                    top: 8px;
                    bottom: 0;
                    width: 1px;
                    background: var(--border-light);
                    z-index: 1;
                }

                .user-dash-wrapper .tl-item {
                    display: flex;
                    gap: 16px;
                    position: relative;
                    z-index: 2;
                }

                .user-dash-wrapper .tl-icon {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--bg-hover);
                    border: 1px solid var(--border);
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                }

                .user-dash-wrapper .tl-icon.small {
                    width: 14px;
                    height: 14px;
                    margin-left: 7px;
                    margin-top: 4px;
                }

                .user-dash-wrapper .tl-content {
                    flex: 1;
                    font-size: 13px;
                    color: var(--text-muted);
                    line-height: 1.5;
                    padding-top: 4px;
                }

                .user-dash-wrapper .tl-content strong {
                    color: var(--text-main);
                    font-weight: 500;
                }

                .user-dash-wrapper .tl-comment {
                    background: var(--bg-hover);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-top: 8px;
                    color: var(--text-main);
                }

                .user-dash-wrapper .tl-time {
                    color: var(--text-dark);
                    font-size: 12px;
                }

                /* --- RIGHT PROPERTIES SIDEBAR --- */
                .user-dash-wrapper .props-col {
                    width: 240px;
                    border-left: 1px solid rgba(255, 255, 255, 0.05) !important;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .user-dash-wrapper .prop-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .user-dash-wrapper .prop-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 13px;
                    color: var(--text-muted);
                }

                .user-dash-wrapper .prop-val {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--text-main);
                }

                .user-dash-wrapper .prop-val.alert {
                    color: var(--accent);
                }

                .user-dash-wrapper .prop-icon {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    display: inline-block;
                }

                /* --- FLOATING AI CHAT -> ESCALATED ORCHESTRATION MODE --- */
                .user-dash-wrapper #cpop {
                    background: transparent;
                    position: absolute;
                    bottom: 24px;
                    right: 24px;
                    width: 380px;
                    height: 480px;
                    background: var(--bg-panel);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    z-index: 100;
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .user-dash-wrapper #cpop.hidden {
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(10px) scale(0.95);
                }

                /* AI Escalated State (Cinematic Morph) */
                .user-dash-wrapper .ai-escalated #cpop {
                    bottom: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    border-color: transparent;
                    box-shadow: none;
                    background: transparent;
                }

                /* Chat Header */
                .user-dash-wrapper .cp-hd {
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--border);
                    font-weight: 500;
                    font-size: 13px;
                    transition: all 0.4s ease;
                }

                .user-dash-wrapper .cp-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .user-dash-wrapper .cp-x {
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    display: grid;
                    place-items: center;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: 0.1s;
                    border: none;
                    background: transparent;
                }

                .user-dash-wrapper .cp-x:hover {
                    background: var(--bg-hover);
                    color: var(--text-main);
                }

                /* Escalated Operational Header */
                .user-dash-wrapper .op-header {
                    display: none;
                    opacity: 0;
                    padding: 32px 48px 16px;
                    border-bottom: 1px solid var(--border);
                }

                .user-dash-wrapper .ai-escalated .op-header {
                    display: none !important;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }

                .user-dash-wrapper .ai-escalated .cp-hd {
                    padding: 0;
                    height: 0;
                    opacity: 0;
                    overflow: hidden;
                    border: none;
                }

                /* Chat Body / Operational Feed */
                .user-dash-wrapper .cp-bd {
                    flex: 1 1 auto;
                    overflow-y: auto;
                    min-height: 0;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    transition: padding 0.5s;
                    scroll-behavior: smooth;
                }

                .user-dash-wrapper .ai-escalated .cp-bd {
                    padding: 24px 48px;
                    gap: 24px;
                }

                .user-dash-wrapper .cp-bd::-webkit-scrollbar {
                    width: 4px;
                }

                .user-dash-wrapper .cp-bd::-webkit-scrollbar-thumb {
                    background: var(--border);
                    border-radius: 2px;
                }

                .user-dash-wrapper .cm {
                    font-size: 13px;
                    line-height: 1.5;
                    transition: all 0.4s ease;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .user-dash-wrapper .cm.ai {
                    color: var(--text-muted);
                }

                .user-dash-wrapper .cm.code {
                    font-family: var(--mono);
                    font-size: 11px;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 8px;
                    border-radius: 4px;
                    border: 1px solid var(--border-light);
                    color: var(--text-main);
                    margin-top: 6px;
                }

                .user-dash-wrapper .cm.summary {
                    display: flex !important;
                    flex-direction: column !important;
                    background: transparent;
                    padding: 0;
                    border-left: 2px solid var(--border);
                    padding-left: 12px;
                    margin-top: 12px;
                }

                .user-dash-wrapper .cm.summary h6 {
                    color: var(--text-main);
                    font-weight: 500;
                    margin-bottom: 4px;
                    font-size: 12px;
                }

                /* User Message (Chat Bubble vs Operational Log) */
                .user-dash-wrapper .cm.user {
                    color: var(--text-main);
                    background: var(--bg-hover);
                    padding: 8px 12px;
                    border-radius: 8px;
                    align-self: flex-end;
                    max-width: 85%;
                }

                .user-dash-wrapper .ai-escalated .cm.user {
                    background: transparent;
                    align-self: flex-start;
                    padding: 0;
                    max-width: 100%;
                    color: var(--text-main);
                }

                .user-dash-wrapper .ai-escalated .cm.user strong {
                    color: var(--text-main);
                    font-family: var(--mono);
                    font-size: 11px;
                    margin-bottom: 2px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    opacity: 0.6;
                }

                .user-dash-wrapper .ai-escalated .cm.ai {
                    color: var(--text-main);
                }

                .user-dash-wrapper .ai-escalated .cm.ai strong {
                    color: var(--accent);
                    font-family: var(--mono);
                    font-size: 11px;
                    margin-bottom: 2px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .user-dash-wrapper .ai-escalated .cm.sys strong {
                    color: var(--text-muted);
                    font-family: var(--mono);
                    font-size: 11px;
                    margin-bottom: 2px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                /* Command Composer */
                .user-dash-wrapper .cp-in {
                    border-bottom-left-radius: 12px;
                    border-bottom-right-radius: 12px;
                    padding: 12px;
                    border-top: 1px solid var(--border);
                    transition: all 0.5s;
                }

                .user-dash-wrapper .ai-escalated .cp-in {
                    padding: 24px 48px;
                    border-color: transparent;
                }

                .user-dash-wrapper .cp-input-wrap {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 40px;
                    padding: 6px 12px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
                }

                .user-dash-wrapper .cp-input-wrap:focus-within {
                    border-color: rgba(255, 255, 255, 0.3);
                    background: rgba(255, 255, 255, 0.05);
                }

                .user-dash-wrapper .ai-escalated .cp-input-wrap {
                    padding: 12px 16px;
                    border-radius: 12px;
                    background: rgba(0, 0, 0, 0.2);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    border: 1px solid var(--border-light);
                }

                .user-dash-wrapper .ai-escalated .cp-input-wrap:focus-within {
                    border-color: rgba(255, 255, 255, 0.15);
                }

                .user-dash-wrapper #cpi {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 6px 4px;
                    color: var(--text-main);
                    font-size: 13px;
                    outline: none;
                }

                .user-dash-wrapper .ai-escalated #cpi {
                    font-size: 14px;
                }

                .user-dash-wrapper #cpi::placeholder {
                    color: var(--text-dark);
                }

                .user-dash-wrapper .cp-actions {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .user-dash-wrapper .cp-btn {
                    width: 28px;
                    height: 28px;
                    border-radius: 4px;
                    display: grid;
                    place-items: center;
                    color: var(--text-muted);
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    transition: 0.1s;
                }

                .user-dash-wrapper .cp-btn:hover {
                    background: var(--border-light);
                    color: var(--text-main);
                }

                .user-dash-wrapper .chat-action-btn {
                    background: transparent !important;
                    color: #ffffff !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    font-weight: 500;
                    border-radius: 4px !important;
                    padding: 8px 16px !important;
                    font-size: 13px !important;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease !important;
                    margin-top: 8px;
                    margin-right: 6px;
                    box-shadow: none !important;
                    text-shadow: none !important;
                }

                .user-dash-wrapper .chat-action-btn:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: rgba(255, 255, 255, 0.8) !important;
                    transform: translateY(-1px) !important;
                    box-shadow: none !important;
                }

                .user-dash-wrapper .chat-action-btn:active {
                    transform: translateY(1px) !important;
                }

                .user-dash-wrapper .chat-action-btn.primary {
                    background: #7700FF !important;
                    border: none !important;
                    color: #ffffff !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                }

                .user-dash-wrapper .chat-action-btn.primary:hover {
                    background: #5D00CC !important;
                    transform: translateY(-1px) !important;
                    box-shadow: none !important;
                }


                /* Missing Keyframes */
                @keyframes suf {
                    from {
                        opacity: 0;
                        transform: translateY(6px)
                    }

                    to {
                        opacity: 1;
                        transform: none
                    }
                }

                @keyframes spin {
                    100% {
                        transform: rotate(360deg)
                    }
                }

                @keyframes glow {

                    0%,
                    100% {
                        opacity: 1
                    }

                    50% {
                        opacity: 0.4
                    }
                }

                @keyframes dp {

                    0%,
                    100% {
                        transform: scale(1);
                        opacity: 0.8
                    }

                    50% {
                        transform: scale(1.5);
                        opacity: 1
                    }
                }

                @keyframes tb {

                    0%,
                    80%,
                    100% {
                        transform: scale(0)
                    }

                    40% {
                        transform: scale(1)
                    }
                }

                /* Chat Layout Fixes */
                .user-dash-wrapper .cm {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    width: 100%;
                    margin-bottom: 8px;
                    transition: all 0.4s ease;
                    flex-direction: row;
                }

                .user-dash-wrapper .cm.user {
                    flex-direction: row-reverse;
                }

                .user-dash-wrapper .cm-av {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: grid;
                    place-items: center;
                    font-size: 11px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .user-dash-wrapper .cm.ai .cm-av {
                    background: #fff;
                    color: #000;
                }

                .user-dash-wrapper .cm.sys .cm-av {
                    background: var(--bg-hover);
                    color: var(--text-muted);
                    border: 1px solid var(--border);
                }

                .user-dash-wrapper .cm.user .cm-av {
                    background: rgba(94, 106, 210, 0.2);
                    color: var(--accent);
                    border: 1px solid rgba(94, 106, 210, 0.4);
                }

                .user-dash-wrapper .cm-content {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    max-width: 85%;
                }

                .user-dash-wrapper .cm.user .cm-content {
                    align-items: flex-end;
                }

                .user-dash-wrapper .cm-name {
                    font-size: 12px;
                    color: var(--text-muted);
                }

                .user-dash-wrapper .cm-bubble {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 14px 18px;
                    border-radius: 16px;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 13px;
                    line-height: 1.6;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }

                .user-dash-wrapper .cm.user .cm-bubble {
                    background: rgba(119, 0, 255, 0.15);
                    border-color: rgba(119, 0, 255, 0.3);
                    color: #ffffff;
                }

                .user-dash-wrapper .cm.sys .cm-bubble {
                    background: transparent;
                    border: none;
                    padding: 0;
                    color: var(--text-muted);
                }

                .user-dash-wrapper .cm.summary {
                    display: flex !important;
                    flex-direction: column !important;
                    background: transparent;
                    padding: 0;
                    margin-top: 12px;
                    width: 100%;
                }

                .user-dash-wrapper .cm.summary h6 {
                    color: var(--text-main);
                    font-weight: 500;
                    margin-bottom: 4px;
                    font-size: 12px;
                }

                /* Overrides for non-escalated floating chat so it still looks okay */
                .user-dash-wrapper #ca:not(.ai-escalated) #cpop .cm-av {
                    display: none;
                }

                .user-dash-wrapper #ca:not(.ai-escalated) #cpop .cm-name {
                    display: none;
                }

                .user-dash-wrapper #ca:not(.ai-escalated) #cpop .cm-bubble {
                    padding: 8px 12px;
                }


                .user-dash-wrapper .visual-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .user-dash-wrapper .chat-visual-module {
                    flex-shrink: 0;
                }

                /* duplicate style block removed (consolidated in primary block above) */



                100% {
                    background-position: 100% 50%;
                }
                }



                100% {
                    transform: scale(1.05);
                    opacity: 1;
                }
                }






                .user-dash-wrapper #cpop>.cp-hd,
                .user-dash-wrapper #cpop>.cp-bd,
                .user-dash-wrapper #cpop>.cp-in {
                    background: var(--bg-panel);
                    position: relative;
                    z-index: 5;
                }


                .user-dash-wrapper .ai-escalated #cpop>.cp-hd,
                .user-dash-wrapper .ai-escalated #cpop>.cp-bd,
                .user-dash-wrapper .ai-escalated #cpop>.cp-in,
                .user-dash-wrapper .ai-escalated #cpop>.op-header {
                    background: transparent !important;
                }








                /* --- INPUT STYLES REFINED (No more sweeping glow) --- */
                .user-dash-wrapper .cp-input-wrap::before,
                .user-dash-wrapper .cp-input-wrap::after {
                    display: none !important;
                }

                @keyframes cpGlowPulse {
                    0% {
                        opacity: 0.7;
                        transform: scale(0.98);
                    }

                    100% {
                        opacity: 1.0;
                        transform: scale(1.02);
                    }
                }

                .ripple-effect {
                    position: absolute;
                    transform: translate(-50%, -50%) scale(0);
                    border-radius: 50%;
                    border: none;
                    background: transparent;
                    backdrop-filter: blur(10px) brightness(1.2) contrast(1.1);
                    -webkit-backdrop-filter: blur(10px) brightness(1.2) contrast(1.1);
                    box-shadow:
                        inset 0 0 80px rgba(255, 255, 255, 0.1),
                        inset 0 0 20px rgba(0, 0, 0, 0.2),
                        0 0 60px rgba(255, 255, 255, 0.1);
                    width: 200vw;
                    height: 200vw;
                    animation: liquidRipple 2.5s cubic-bezier(0.1, 0.6, 0.3, 1) forwards;
                    pointer-events: none;
                    z-index: 100;
                }

                @keyframes liquidRipple {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }

                    100% {
                        transform: translate(-50%, -50%) scale(1.5);
                        opacity: 0;
                    }
                }

                @media (max-width: 900px) {
                    .user-dash-wrapper {
                        height: 650px;
                        margin: 0;
                        border-radius: 0;
                        border-left: none !important;
                        border-right: none !important;
                    }

                    .user-dash-wrapper .shell {
                        flex-direction: column;
                    }

                    .user-dash-wrapper .sb {
                        width: 100%;
                        max-height: 200px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }

                    .user-dash-wrapper .sb-nav {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 8px;
                    }

                    .user-dash-wrapper .sb-item {
                        flex-shrink: 0;
                    }

                    .user-dash-wrapper .sb-projects {
                        display: none;
                        /* Hide secondary sidebar content on mobile */
                    }
                }

                #hero .ent-btn-primary {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    transform: translateZ(0);
                }
            </style>

            <div class="user-dash-wrapper" style="position: relative; z-index: 10;">
                <div class="shell">

                    <!-- SIDEBAR -->
                    <aside class="sb">
                        <div class="mac-controls">
                            <div class="mac-btn red"></div>
                            <div class="mac-btn yellow"></div>
                            <div class="mac-btn green"></div>
                        </div>

                        <div class="sb-header">
                            Mithriv Console
                        </div>

                        <div class="sb-nav">
                            <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18" />
                                </svg> Inbox</div>
                            <div class="sb-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg> Active Incidents</div>
                            <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg> Telemetry</div>
                            <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <polygon
                                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg> Reviews</div>
                        </div>

                        <div class="sb-section-title">Workspace</div>
                        <div class="sb-nav">
                            <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg> Sites</div>
                            <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg> Zones</div>
                        </div>

                        <div class="sb-section-title">Favorites <svg viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" style="width:12px;height:12px;opacity:0.5">
                                <path d="M6 9l6 6 6-6" />
                            </svg></div>
                        <div class="sb-nav">
                            <div class="sb-item" onclick="togglePop('fire')" style="color:var(--accent)"><svg
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                </svg> Active Fire Protocol</div>
                            <div class="sb-item" onclick="togglePop('visitor')"><svg viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg> Visitor Anomaly</div>
                            <div class="sb-item" onclick="togglePop('access')"><svg viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg> Access Breach</div>
                        </div>
                    </aside>

                    <!-- MAIN AREA -->
                    <main class="main">
                        <div class="topbar">
                            <span>Active Incidents</span>
                            <span>/</span>
                            <span class="tb-title"><svg viewBox="0 0 24 24" fill="currentColor" class="tb-icon"
                                    width="14" height="14">
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg> <span id="tbTitleText">Fire Protocol</span></span>

                            <div class="tb-right">
                                <span>02 / 145</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14"
                                    height="14">
                                    <path d="M18 15l-6-6-6 6" />
                                </svg>
                            </div>
                        </div>

                        <div class="content-area" id="ca">

                            <!-- DASHBOARD VIEW (Fades out when AI takes over) -->
                            <div class="dash-view">
                                <!-- MIDDLE CONTENT -->
                                <div class="mid-col">
                                    <div class="page-title">
                                        Fire confirmed — Zone 4, East Wing
                                    </div>
                                    <div class="page-desc">
                                        Multi-sensor confirmation: smoke (7/7), thermal (positive), CO at <span
                                            class="code-tag">400 PPM</span>. Emergency operational chain initiated
                                        autonomously instead of blocking on manual verification during critical response
                                        window.
                                    </div>

                                    <div class="activity-section">
                                        <div class="section-heading">Activity</div>
                                        <div class="timeline">
                                            <div class="tl-item">
                                                <div class="tl-icon small">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-dark)"
                                                        stroke-width="2">
                                                        <path
                                                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                    </svg>
                                                </div>
                                                <div class="tl-content">
                                                    <strong>Mithriv System</strong> created the incident via Thermal
                                                    Sensors <span class="tl-time">· 2m ago</span>
                                                </div>
                                            </div>
                                            <div class="tl-item">
                                                <div class="tl-icon small" style="background:var(--bg)">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--yellow)"
                                                        stroke-width="2" style="width:10px;height:10px">
                                                        <circle cx="12" cy="12" r="10" />
                                                    </svg>
                                                </div>
                                                <div class="tl-content">
                                                    <strong style="color:var(--accent)">Triage Intelligence</strong>
                                                    added the label <span class="code-tag">Critical</span> and <span
                                                        class="code-tag">Zone-4</span> <span class="tl-time">· 2m
                                                        ago</span>
                                                </div>
                                            </div>
                                            <div class="tl-item">
                                                <div class="tl-icon">
                                                    <span style="font-size:10px;font-weight:bold;color:#fff">SO</span>
                                                </div>
                                                <div class="tl-content" style="padding-top:6px;">
                                                    <strong>Security Officer</strong> <span class="tl-time">· 1m
                                                        ago</span>
                                                    <div class="tl-comment">
                                                        Right now we have confirmed smoke on camera 44, which makes this
                                                        a verified critical incident.
                                                        <br><br>
                                                        Type <strong>fire</strong> in the Mithriv chat to escalate
                                                        response.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- RIGHT PROPERTIES -->
                                <div class="props-col">
                                    <div style="font-family:var(--mono);font-size:12px;color:var(--text-muted)">EVT-2703
                                    </div>

                                    <div class="prop-group">
                                        <div class="prop-row">
                                            <div class="prop-val alert">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" width="14" height="14">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                                In Progress
                                            </div>
                                        </div>
                                        <div class="prop-row">
                                            <div class="prop-val">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" width="14" height="14">
                                                    <path
                                                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                Critical
                                            </div>
                                        </div>
                                        <div class="prop-row">
                                            <div class="prop-val">
                                                <div class="prop-icon"
                                                    style="background:#fff;display:grid;place-items:center;color:#000;font-size:8px;font-weight:bold">
                                                    M</div>
                                                Mithriv AI
                                            </div>
                                        </div>
                                    </div>

                                    <div class="prop-group">
                                        <div style="font-size:11px;color:var(--text-dark)">Labels</div>
                                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                            <span class="code-tag">Fire</span>
                                            <span class="code-tag">Zone 4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FLOATING AI CHAT -> ESCALATED ORCHESTRATION MODE -->
                            <div id="cpop" class="hidden" data-lenis-prevent="true">
                                <!-- Widget Header -->
                                <div class="cp-hd">
                                    <div class="cp-title">
                                        <div class="prop-icon"
                                            style="background:#fff;display:grid;place-items:center;color:#000;font-size:9px;font-weight:bold">
                                            M</div>
                                        Mithriv AI
                                    </div>
                                    <button class="cp-x" onclick="togglePop()">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            width="14" height="14">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Operational Header (Only visible in escalated mode) -->
                                <div class="op-header">
                                    <div class="page-title">Fire confirmed — Zone 4, East Wing</div>
                                    <div class="page-desc" style="margin-bottom:0">Multi-sensor confirmation: smoke
                                        (7/7), thermal (positive), CO at 400 PPM. Autonomous orchestration active.</div>
                                </div>

                                <!-- Feed Body -->
                                <div class="cp-bd" id="cpbd" data-lenis-prevent="true">
                                    <div class="cm ai">
                                        <div class="cm-av">M</div>
                                        <div class="cm-content">
                                            <div class="cm-name">Mithriv AI</div>
                                            <div class="cm-bubble">Waiting for operational command...
                                                <div style="margin-top:12px">
                                                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
                                                        <button class="chat-action-btn primary"
                                                            onclick="simulateType('fire')">Fire</button>
                                                        <button class="chat-action-btn primary"
                                                            onclick="simulateType('access')">Access</button>
                                                        <button class="chat-action-btn primary"
                                                            onclick="simulateType('visitor')">Visitor</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Input -->
                                <div class="cp-in">
                                    <div class="cp-input-wrap">
                                        <input id="cpi" placeholder="Ask Mithriv to coordinate response..."
                                            autocomplete="off" onkeydown="if(event.key==='Enter')cpSend()" />
                                        <div class="cp-actions">
                                            <button class="cp-btn"><svg viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" width="16" height="16">
                                                    <path
                                                        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                                </svg></button>
                                            <button class="cp-btn" onclick="cpSend()"><svg viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" width="16"
                                                    height="16">
                                                    <line x1="12" y1="19" x2="12" y2="5" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>







        </section>






        <!-- Section 3: AI Agents -->
        <section class="section sec-ai-agents reveal-section">
            <div class="container">
                <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 24px;">
                    <span class="ent-pill" style="margin-bottom: 0 !important;">The Problem</span>
                </div>
                <h2 class="std-section-h2 text-center">Your security operation is overwhelmed</h2>
                <p class="std-section-subheading text-center" style="max-width: 700px; margin: 0 auto 3rem;">Your
                    systems generate data. Petabytes of it. But when incidents occur, humans still do all the thinking,
                    correlating, and acting.</p>
                <div class="features-scroll-grid">
                    <!-- Vertical Dividers -->
                    <div class="feature-col-divider feature-col-divider-0"></div>
                    <div class="feature-col-divider feature-col-divider-1"></div>
                    <div class="feature-col-divider feature-col-divider-2"></div>
                    <div class="feature-col-divider feature-col-divider-3"></div>
                    <div class="feature-col-divider feature-col-divider-4"></div>

                    <!-- Feature 1 -->
                    <div class="feature-col-item">
                        <div class="fig-svg-wrap">
                            <svg viewBox="0 0 200 160" width="100%" height="160" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    @keyframes siren-glow {
                                        0%, 100% { fill: rgba(124, 60, 208, 0.1); stroke: rgba(124, 60, 208, 0.3); }
                                        50% { fill: rgba(124, 60, 208, 0.35); stroke: #7C3CD0; }
                                    }
                                    @keyframes wave-expand {
                                        0% { transform: scale(0.6); opacity: 0; }
                                        15% { opacity: 0.7; }
                                        100% { transform: scale(1.45); opacity: 0; }
                                    }
                                    @keyframes text-blink {
                                        0%, 100% { opacity: 0.45; }
                                        50% { opacity: 1; }
                                    }
                                    @keyframes noise-flicker {
                                        0%, 100% { opacity: 0.15; }
                                        30% { opacity: 0.75; }
                                        60% { opacity: 0.35; }
                                        80% { opacity: 0.85; }
                                    }
                                    @keyframes led-blink {
                                        0% { opacity: 0.25; }
                                        100% { opacity: 1; }
                                    }
                                    @keyframes hex-dash {
                                        to { stroke-dashoffset: -20; }
                                    }
                                </style>
                                <defs>
                                    <radialGradient id="purple-glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stop-color="rgba(124, 60, 208, 0.25)" />
                                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
                                    </radialGradient>
                                </defs>
                                <circle cx="100" cy="95" r="50" fill="url(#purple-glow)" />
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- Outer warning hexagon -->
                                <polygon points="100,25 155,55 155,115 100,145 45,115 45,55"
                                    stroke="rgba(124,60,208,0.2)" stroke-width="1" stroke-dasharray="4 4"
                                    style="animation: hex-dash 8s linear infinite;" />

                                <!-- LED Vertex indicators -->
                                <circle cx="100" cy="25" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate;" />
                                <circle cx="155" cy="55" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate 0.3s;" />
                                <circle cx="155" cy="115" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate 0.6s;" />
                                <circle cx="100" cy="145" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate 0.9s;" />
                                <circle cx="45" cy="115" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate 1.2s;" />
                                <circle cx="45" cy="55" r="2" fill="#7C3CD0" style="animation: led-blink 1s infinite alternate 1.5s;" />

                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="48" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="20" fill="#7C3CD0" text-anchor="middle" letter-spacing="1">98%</text>
                                    <text x="100" y="60" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">FALSE
                                        ALARMS</text>
                                </g>

                                <g style="animation: noise-flicker 1.5s infinite;">
                                    <circle cx="65" cy="55" r="1.5" fill="rgba(255,255,255,0.15)" />
                                    <circle cx="135" cy="55" r="1.5" fill="rgba(255,255,255,0.15)" />
                                    <circle cx="50" cy="80" r="1.5" fill="rgba(255,255,255,0.2)" />
                                    <circle cx="150" cy="80" r="1.5" fill="rgba(255,255,255,0.15)" />
                                    <circle cx="70" cy="110" r="1.5" fill="rgba(255,255,255,0.2)" />
                                    <circle cx="130" cy="110" r="1.5" fill="rgba(255,255,255,0.1)" />
                                    <circle cx="85" cy="65" r="1" fill="rgba(255,255,255,0.25)" />
                                    <circle cx="115" cy="65" r="1" fill="rgba(255,255,255,0.25)" />
                                    <circle cx="75" cy="90" r="1" fill="rgba(255,255,255,0.1)" />
                                    <circle cx="125" cy="90" r="1" fill="rgba(255,255,255,0.3)" />
                                </g>

                                <g transform="translate(100, 95)">
                                    <ellipse cx="0" cy="0" rx="35" ry="17.5" stroke="#7C3CD0" stroke-width="1"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear;" />
                                    <ellipse cx="0" cy="0" rx="55" ry="27.5" stroke="#7C3CD0" stroke-width="1"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear; animation-delay: 1.25s;" />
                                    <ellipse cx="0" cy="10" rx="18" ry="9" fill="rgba(0,0,0,0.35)" />
                                    <polygon points="-15,0 15,0 15,10 -15,10" fill="rgba(255,255,255,0.03)"
                                        stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
                                    <ellipse cx="0" cy="0" rx="15" ry="7.5" fill="rgba(255,255,255,0.05)"
                                        stroke="rgba(255, 255, 255, 0.2)" />
                                    <path d="M-8,-10 L8,-10 L12,0 L-12,0 Z" stroke="#7C3CD0" stroke-width="1"
                                        style="animation: siren-glow 1s infinite alternate;" />
                                    <ellipse cx="0" cy="-10" rx="8" ry="4" fill="#7C3CD0"
                                        style="animation: siren-glow 1s infinite alternate;" />
                                </g>
                            </svg>
                        </div>
                        <h3>98% of alarms are false</h3>
                        <p class="card-desc">Your team triages thousands daily because the system can't distinguish a
                            threat from a shadow.</p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="feature-col-item">
                        <div class="fig-svg-wrap">
                            <svg viewBox="0 0 200 160" width="100%" height="160" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    @keyframes avatar-slide {
                                        0% { transform: translate(-30px, -15px); opacity: 0; }
                                        15% { opacity: 1; }
                                        85% { opacity: 1; }
                                        100% { transform: translate(30px, 15px); opacity: 0; }
                                    }
                                    @keyframes platform-hover {
                                        0%, 100% { transform: translateY(0); }
                                        50% { transform: translateY(-4px); }
                                    }
                                    @keyframes arrow-pulse {
                                        0%, 100% { stroke-dashoffset: 0; opacity: 0.35; }
                                        50% { opacity: 1; }
                                    }
                                    @keyframes node-pulse {
                                        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #FFE500); }
                                        50% { transform: scale(1.35); filter: drop-shadow(0 0 6px #FFE500); }
                                    }
                                </style>
                                <defs>
                                    <radialGradient id="yellow-glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stop-color="rgba(255, 229, 0, 0.18)" />
                                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
                                    </radialGradient>
                                </defs>
                                <circle cx="100" cy="95" r="50" fill="url(#yellow-glow)" />
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 100-300% text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="38" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#FFE500" text-anchor="middle" letter-spacing="0.5">100-300%</text>
                                    <text x="100" y="48" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">ANNUAL TURNOVER</text>
                                </g>
                                <g transform="translate(0, 10)">
                                    <g style="animation: platform-hover 4s ease-in-out infinite;">
                                        <polygon points="100,115 145,92.5 100,70 55,92.5" fill="rgba(0,0,0,0.3)" />
                                        <polygon points="100,105 145,82.5 100,60 55,82.5" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" fill="#16161a" />
                                        
                                        <line x1="55" y1="82.5" x2="55" y2="92.5" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" />
                                        <line x1="145" y1="82.5" x2="145" y2="92.5" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" />
                                        <line x1="100" y1="105" x2="100" y2="115" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" />
                                        <polygon points="55,92.5 100,115 100,105 55,82.5" fill="rgba(255,255,255,0.03)" />
                                        <polygon points="145,92.5 100,115 100,105 145,82.5" fill="rgba(255,255,255,0.04)" />

                                        <!-- Dotted Track Lines -->
                                        <path d="M70,59 L135,91.5" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"
                                            stroke-dasharray="3,3" />
                                        <path d="M56,66 L121,98.5" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"
                                            stroke-dasharray="3,3" />

                                        <g
                                            style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite;">
                                            <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255, 255, 255, 0.25)"
                                                stroke-width="1" fill="#16161a" />
                                            <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.75)"
                                                stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" />
                                            <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255, 255, 255, 0.25)"
                                                stroke-width="1" fill="rgba(255,255,255,0.4)" />
                                            <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255, 255, 255, 0.2)"
                                                stroke-width="1" />
                                        </g>
                                        <g
                                            style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite; animation-delay: 2s;">
                                            <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255, 255, 255, 0.25)"
                                                stroke-width="1" fill="#16161a" />
                                            <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.75)"
                                                stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" />
                                            <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255, 255, 255, 0.25)"
                                                stroke-width="1" fill="rgba(255,255,255,0.4)" />
                                            <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255, 255, 255, 0.2)"
                                                stroke-width="1" />
                                        </g>

                                        <path d="M110,87 C130,97 150,90 165,70" stroke="#FFE500" stroke-width="1"
                                            stroke-dasharray="3,3" style="animation: arrow-pulse 2s infinite;" />
                                        <polygon points="167,70 164,75 160,70" fill="#FFE500" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <h3>100-300% annual turnover</h3>
                        <p class="card-desc">Every departure takes institutional knowledge with it. Training never ends.
                            Consistency never arrives.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="feature-col-item">
                        <div class="fig-svg-wrap">
                            <svg viewBox="0 0 200 160" width="100%" height="160" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    @keyframes sand-drip {
                                        0% { stroke-dashoffset: 0; }
                                        100% { stroke-dashoffset: -12; }
                                    }
                                    @keyframes clock-ticks {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }
                                    @keyframes badge-dissolve {
                                        0% { opacity: 0.8; transform: translate(0, 0) scale(0.9) rotate(5deg); }
                                        50% { opacity: 0.1; transform: translate(0, 15px) scale(0.5) rotate(-5deg); }
                                        51% { opacity: 0; }
                                        100% { opacity: 0.8; transform: translate(0, 0) scale(0.9) rotate(5deg); }
                                    }
                                    @keyframes sand-pile {
                                        0%, 100% { transform: scaleY(0.9); }
                                        50% { transform: scaleY(1.2); }
                                    }
                                </style>
                                <defs>
                                    <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stop-color="rgba(77, 166, 255, 0.2)" />
                                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
                                    </radialGradient>
                                </defs>
                                <circle cx="100" cy="98" r="50" fill="url(#blue-glow)" />
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 12,000h text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="45" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#4DA6FF" text-anchor="middle" letter-spacing="0.5">12,000h</text>
                                    <text x="100" y="55" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">ON CREDENTIALS</text>
                                </g>

                                <!-- High-Tech Target Crosshair Ticks -->
                                <path d="M100,66 L100,72 M100,124 L100,130 M68,98 L74,98 M126,98 L132,98" stroke="rgba(77,166,255,0.3)" stroke-width="1" />

                                <g transform="translate(100, 98) scale(0.75)">
                                    <polygon points="0,-48 30,-36 0,-24 -30,-36" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" fill="rgba(255,255,255,0.02)" />
                                    <polygon points="0,48 30,36 0,24 -30,36" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" fill="rgba(255,255,255,0.02)" />
                                    <line x1="-30" y1="-36" x2="-30" y2="36" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" />
                                    <line x1="30" y1="-36" x2="30" y2="36" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" />
                                    <line x1="0" y1="-24" x2="0" y2="24" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" stroke-dasharray="2,2" />
                                    <path
                                        d="M-26,-34 C-26,-15 -6,-5 -6,0 C-6,5 -26,15 -26,34 L26,34 C26,15 6,5 6,0 Z"
                                        stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />

                                    <g transform="translate(0, -25)"
                                        style="animation: badge-dissolve 4s infinite ease-in;">
                                        <polygon points="0,-6 10,-2 0,2 -10,-2" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" fill="rgba(255,255,255,0.1)" />
                                        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" />
                                        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.65)" />
                                        <line x1="0" y1="1.5" x2="0" y2="4" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" />
                                    </g>

                                    <line x1="0" y1="-5" x2="0" y2="25" stroke="#4DA6FF" stroke-width="1"
                                        stroke-dasharray="2,4"
                                        style="stroke-dashoffset: 0; animation: sand-drip 1s linear infinite;" />
                                    <circle cx="0" cy="0" r="1" fill="#4DA6FF" />

                                    <polygon points="0,32 18,24 0,16 -18,24" stroke="#4DA6FF"
                                        stroke-width="1" fill="rgba(77,166,255,0.18)"
                                        style="transform-origin: 0 32px; animation: sand-pile 4s infinite alternate;" />
                                    <polygon points="0,32 10,27 0,22 -10,27" stroke="#4DA6FF"
                                        stroke-width="1" fill="rgba(77,166,255,0.3)" />
                                </g>
                            </svg>
                        </div>
                        <h3>12,000 hours on credentials</h3>
                        <p class="card-desc">Manual provisioning. Spreadsheet tracking. Orphaned accounts sitting open
                            for months.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="feature-col-item">
                        <div class="fig-svg-wrap">
                            <svg viewBox="0 0 200 160" width="100%" height="160" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    @keyframes camera-scan {
                                        0%, 100% { transform: rotate(-5deg); }
                                        50% { transform: rotate(5deg); }
                                    }
                                    @keyframes lock-pulse {
                                        0%, 100% { stroke: rgba(187, 251, 2, 0.4); fill: rgba(187, 251, 2, 0.05); }
                                        50% { stroke: #bbfb02; fill: rgba(187, 251, 2, 0.25); filter: drop-shadow(0 0 5px #bbfb02); }
                                    }
                                    @keyframes light-glow {
                                        0%, 100% { opacity: 0.12; }
                                        50% { opacity: 0.35; }
                                    }
                                    @keyframes laser-sweep {
                                        0% { transform: translateY(45px); opacity: 0; }
                                        50% { opacity: 0.8; }
                                        100% { transform: translateY(110px); opacity: 0; }
                                    }
                                </style>
                                <defs>
                                    <radialGradient id="green-glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stop-color="rgba(187, 251, 2, 0.18)" />
                                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
                                    </radialGradient>
                                    <linearGradient id="cone-grad-home-refined" x1="100" y1="45" x2="100" y2="110"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stop-color="rgba(187, 251, 2, 0.3)" />
                                        <stop offset="100%" stop-color="rgba(187, 251, 2, 0)" />
                                    </linearGradient>
                                </defs>
                                <circle cx="100" cy="110" r="45" fill="url(#green-glow)" />
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 911 ONLY text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="45" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#bbfb02" text-anchor="middle" letter-spacing="0.5">911 ONLY</text>
                                    <text x="100" y="55" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">OPERATIONAL CAPACITY</text>
                                </g>
                                <polygon points="100,45 60,110 140,110" fill="url(#cone-grad-home-refined)"
                                    style="animation: light-glow 3s ease-in-out infinite;" />
                                <ellipse cx="100" cy="110" rx="40" ry="12" stroke="rgba(255, 255, 255, 0.2)"
                                    stroke-width="1" stroke-dasharray="2,2" />

                                <!-- Scanning laser beam line -->
                                <line x1="65" y1="0" x2="135" y2="0" stroke="#bbfb02" stroke-width="1" style="animation: laser-sweep 3s linear infinite;" />

                                <g transform="translate(100, 45)"
                                    style="transform-origin: 0 -5px; animation: camera-scan 6s ease-in-out infinite;">
                                    <path d="M-15,-15 L0,-5" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1" />
                                    <line x1="-15" y1="-15" x2="-15" y2="-5" stroke="rgba(255, 255, 255, 0.25)"
                                        stroke-width="1" />
                                    <polygon points="-8,-10 12,-20 12,-8 -8,2" fill="rgba(255,255,255,0.06)"
                                        stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
                                    <polygon points="12,-20 22,-15 22,-3 12,-8" fill="rgba(255,255,255,0.08)"
                                        stroke="rgba(255, 255, 255, 0.25)" stroke-width="1" />
                                    <polygon points="-8,-10 12,-20 22,-15 2, -5" fill="rgba(255,255,255,0.1)"
                                        stroke="rgba(255, 255, 255, 0.25)" stroke-width="1" />
                                    <ellipse cx="17" cy="-9" rx="3" ry="5" fill="none" stroke="rgba(255, 255, 255, 0.2)"
                                        stroke-width="1" />
                                    <circle cx="17" cy="-9" r="1.5" fill="#ffffff" />
                                    <circle cx="10" cy="-14" r="1" fill="#bbfb02" />
                                </g>

                                <g transform="translate(100, 95)">
                                    <rect x="-14" y="-5" width="28" height="22" rx="3" stroke="#bbfb02"
                                        stroke-width="1" style="animation: lock-pulse 2s infinite alternate;" />
                                    <path d="M-9,-5 L-9,-14 C-9,-19 9,-19 9,-14 L9,-5" stroke="#bbfb02"
                                        stroke-width="1" fill="none"
                                        style="animation: lock-pulse 2s infinite alternate;" />
                                    <circle cx="0" cy="3" r="2.5" fill="#bbfb02" />
                                    <polygon points="-1,3 1,3 2,10 -2,10" fill="#bbfb02" />
                                    <ellipse cx="0" cy="5" rx="30" ry="15" stroke="#bbfb02" stroke-width="1"
                                        stroke-dasharray="3,3" />
                                </g>
                            </svg>
                        </div>
                        <h3>GSOCs that watch but can't act</h3>
                        <p class="card-desc">Twenty monitors. Five operators. No operational capability beyond calling
                            911.</p>
                    </div>
                </div>
            </div>
        </section>

        
                
<div class="ent-section-divider"></div>

        <!-- Section 3.5: Security Agents That Execute -->
        <section class="section sec-agents-execute reveal-section" id="operational-agents">
            <div class="atmospheric-bg"></div>

            <div class="container timeline-intro">
                <div class="section-header-timeline">
                    <span class="ent-pill">Operational Domains</span>
                    <h2 class="std-section-h2 cinematic-reveal-title" style="margin-top: 1rem; margin-bottom: 1.5rem;">
                        Security agents that execute</h2>
                    <p class="std-section-subheading cinematic-reveal-subtitle"
                        style="max-width: 650px; margin-bottom: 0;">
                        Dedicated agents for each operational domain, connected to your systems, trained on your
                        policies, authorized to act.
                    </p>
                </div>
                <div class="header-btn-block">
                    <a href="#explore" class="ent-btn-primary" style={{ marginTop: 0 }}>Explore the platform <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
                </div>
            </div>

            <div class="agents-timeline-wrapper">
                <div class="agents-horizontal-scroll">
                    <div class="timeline-line-track"></div>

                    <!-- Milestone Item 1: Incident Response -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="network" data-color="#EA49B2"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Incident Response</h3>
                            <p class="agent-card-desc">
                                Fuses alarms with badge data, video, schedules, and behavioral patterns. Assesses.
                                Responds. Documents. Real threats get action. Noise gets filtered.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">40%+ faster resolution</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">60%+ noise elimination</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Item 2: Credential Governance -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="case" data-color="#FCE545"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Credential Governance</h3>
                            <p class="agent-card-desc">
                                Provisions on hire. Revokes on termination. Reviews continuously. No spreadsheets. No
                                orphaned accounts. No quarterly scramble.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Same-day lifecycle</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">zero dormant access</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Item 3: Visitor Operations -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="bot" data-color="#4993E3"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Visitor Operations</h3>
                            <p class="agent-card-desc">
                                Registration, verification, badge issuance, host notification, access provisioning,
                                handled end-to-end. Throughput scales without headcount.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Zero lobby delays</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Complete audit trails</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Item 4: Safety Monitoring -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="brain" data-color="#E44856"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Safety Monitoring</h3>
                            <p class="agent-card-desc">
                                Video-based observation, automated incident capture, roster compliance checks.
                                Documentation generates itself.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Reduced liability</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Instant records</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Item 5: Guard Coordination -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="podcast" data-color="#AFF962"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Guard Coordination</h3>
                            <p class="agent-card-desc">
                                Rosters, shift briefs, patrol verification, task dispatch, unified. Operational quality
                                stays consistent regardless of who's on shift.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">30%+ productivity</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Standardized execution</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Item 6: Vehicle & Perimeter -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot react-timeline-icon" data-icon="ebook" data-color="#6354F3"></div>
                        </div>
                        <div class="timeline-content-slot">
                            <h3 class="agent-card-title">Vehicle & Perimeter</h3>
                            <p class="agent-card-desc">
                                LPR enforcement, permit validation, intercom automation, dock scheduling. Gates that
                                function without constant guard attention.
                            </p>
                            <div class="agent-card-metrics">
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Eliminated delays</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-icon">✓</span>
                                    <span class="metric-val">Automated screening</span>
                                </div>
                            </div>
                        </div>
                    </div>

                                    </div>
            </div>
        </section>


        <!-- Cinematic Feature Split Section -->
        <section class="section sec-cinematic-feature" id="cinematic-feature" style="padding-top: 0 !important; border-bottom: 1px solid #212326;">
            <div class="container">
                <div class="text-center"
                    style="display: flex; flex-direction: column; align-items: center;">
                    <span class="ent-pill">Why This Matters</span>
                    <h2 class="std-section-h2 text-center" style="margin-top: 1rem; margin-bottom: 1.5rem;">What changes
                        when security can act</h2>
                    <p class="std-section-subheading text-center" style="max-width: 650px; margin: 0 auto;">
                        When SOPs execute themselves, your operation transforms from reactive to resilient.
                    </p>
                </div>

                <div class="isometric-showcase-grid">
                    <!-- Left Column: Symmetrical Right-Aligned Points -->
                    <div class="isometric-col col-left">
                        <div class="isometric-point-item">
                            <div class="bento-hover-bg"></div>
                            <div class="bento-content-wrap">
                                <div class="point-icon-wrap">
                                    <div class="point-icon-wrap">
                                        <div class="point-icon-dot react-timeline-icon" data-icon="bento-book" data-color="#FCE545"></div>
                                    </div>
                                </div>
                                <strong>Turnover stops breaking you</strong>
                                <p>SOPs live in code, not in people's heads. New staff become effective in days. Knowledge
                                    persists.</p>
                            </div>
                        </div>
                        <div class="isometric-point-item">
                            <div class="bento-hover-bg"></div>
                            <div class="bento-content-wrap">
                                <div class="point-icon-wrap">
                                    <div class="point-icon-wrap">
                                        <div class="point-icon-dot react-timeline-icon" data-icon="bento-users" data-color="#EA49B2"></div>
                                    </div>
                                </div>
                                <strong>Fewer people, more coverage</strong>
                                <p>Modules handle routine operations. Your team handles exceptions. One operator
                                    accomplishes what five couldn't.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Center Column: Animated 3D Isometric Graphic -->
                    <div class="isometric-center-graphic" style="display: flex; align-items: stretch; justify-content: center; width: 100%; height: 100%;">
                        <div class="trigger-illustration-wrapper" style="display: flex; flex-direction: column; align-items: stretch; justify-content: center; width: 100%; height: 100%;">
                            <div class="autonomous-terminal-container" style="display: flex; flex-direction: column; align-items: stretch; justify-content: center; width: 100%; height: 100%;"></div>
                        </div>
                    </div>

                    <!-- Right Column: Symmetrical Left-Aligned Points -->
                    <div class="isometric-col col-right">
                        <div class="isometric-point-item">
                            <div class="bento-hover-bg"></div>
                            <div class="bento-content-wrap">
                                <div class="point-icon-wrap">
                                    <div class="point-icon-wrap">
                                        <div class="point-icon-dot react-timeline-icon" data-icon="bento-shield" data-color="#E44856"></div>
                                    </div>
                                </div>
                                <strong>Nothing falls through</strong>
                                <p>Every alarm assessed. Every credential tracked. Every incident documented. Around the
                                    clock.</p>
                            </div>
                        </div>
                        <div class="isometric-point-item">
                            <div class="bento-hover-bg"></div>
                            <div class="bento-content-wrap">
                                <div class="point-icon-wrap">
                                    <div class="point-icon-wrap">
                                        <div class="point-icon-dot react-timeline-icon" data-icon="bento-briefcase" data-color="#AFF962"></div>
                                    </div>
                                </div>
                                <strong>Strategic credibility</strong>
                                <p>Stop firefighting paperwork. Start presenting security posture to the board. Become the
                                    CSO who modernized the operation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <!-- Premium CTA Section (Replaced Canvas Reveal) -->
        <section class="hire-security-section" style="background: transparent; color: #ffffff; width: 100%; position: relative; z-index: 10; border-bottom: 1px solid #212326;">

            <!-- Horizontal Top (Full width) removed to avoid duplicate -->
            <!-- Central constrained column -->
            <div class="container" style="position: relative; height: 100%; max-width: 1280px; margin: 0 auto; padding: 0 32px;">
                <!-- Box with full borders, diagonal background, and breathing bottom glow -->
                <div class="hide-on-mobile hire-security-bg" style="position: absolute; top: -1px; bottom: -1px; left: 24px; right: 24px; border-left: 1px solid #212326; border-right: 1px solid #212326; border-bottom: none; border-top: none; background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, #212326 6px, #212326 7px); overflow: hidden; z-index: -1;">
                    <!-- Inner Bottom Gradient (Breathing Up and Down) -->
                    <style>
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
                    </style>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 70%; background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(119, 0, 255, 0.25) 0%, transparent 100%); animation: bottomBreathingHome 5s ease-in-out infinite; transform-origin: bottom center; pointer-events: none; z-index: -1;"></div>
                </div>

                <div style="max-width: 900px; width: 100%; padding: 80px 0; margin: 0 auto; position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <h2 style="font-size: 48px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; margin-bottom: 32px; font-family: var(--font-main);">
                        Hire our security agents
                    </h2>
                    <p style="font-size: 14px; color: var(--text-muted, #A1A1AA); line-height: 1.6; font-family: var(--font-mono); max-width: 700px; margin: 0 auto 48px auto;">
                        Autonomous security that never blinks. AI agents that observe, decide, and act in real time.
                    </p>
                    <a href="#" class="ent-btn-primary hover-arrow-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 32px; font-size: 15px; text-decoration: none;">Learn More <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
                </div>
            </div>
        </section>

        <!-- Section: Scale Your Knowledge (Unified Control) -->
        <section class="section sec-knowledge reveal-section" id="knowledge-base"
            style="position: relative; overflow: hidden; padding: 160px 0 100px 0;">
            <!-- Ambient soft purple background glow behind the container -->
            <div class="knowledge-glow"></div>

            <div class="container knowledge-container"
                style="position: relative; z-index: 5; display: flex; flex-direction: column; gap: 40px;">

                <!-- Top Row: Left Aligned Title -->
                <div class="knowledge-header" style="text-align: left;">
                    <span class="ent-pill" style="margin-bottom: 1.5rem; display: inline-flex; align-items: center;">
                        <span
                            style="color: #8B5CF6; margin-right: 8px; display: inline-flex; align-items: center; filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.45));">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke-linejoin="round" />
                                <line x1="9" y1="3" x2="9" y2="21" />
                                <line x1="15" y1="3" x2="15" y2="21" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="3" y1="15" x2="21" y2="15" />
                            </svg>
                        </span>
                        UNIFIED CONTROL
                    </span>
                    <h2 class="std-section-h2 cinematic-reveal-title"
                        style="margin: 0; font-size: 48px; font-weight: 600; letter-spacing: -0.02em;">
                        Everything visible, everything queryable</h2>
                </div>

                
                <!-- Middle Row: Interactive Command Console Dashboard -->
                <div class="knowledge-dashboard">

                    <!-- Left: Active AI Query Terminal (Ask Questions Directly) -->
                    <div class="k-console-panel">
                        <!-- Dotted matrix overlay pattern inside console -->
                        <div class="knowledge-grid-pattern"></div>

                        <!-- Console Header -->
                        <div class="k-card-header"
                            style="border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 16px; width: 100%;">
                            <span class="k-card-icon">
                                <div class="react-timeline-icon" data-icon="icon-message" data-color="#FCE545"></div>
                            </span>
                            <h3 class="k-card-title">Ask questions directly</h3>
                        </div>

                        <!-- Console Body -->
                        <div class="k-console-body" style="width: 100%;">
                            <div class="query-block">
                                <div class="query-input-box">
                                    "Who accessed server room 3 after 6pm this week?"
                                </div>
                            </div>

                            <div class="response-block">
                                <div class="response-output-box">
                                    <div style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                                        <span style="color: #10B981; margin-right: 4px;">→</span>
                                        Plain language queries. Immediate answers.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Console Ambient Glowing Dots Removed -->
                    </div>

                    <!-- Right: Stacked Capability Cards -->
                    <div class="k-cards-stack">

                        <!-- Card 1: Single Operational View -->
                        <div class="k-feature-card">
                            <div class="k-card-header">
                                <span class="k-card-icon">
                                    <div class="react-timeline-icon" data-icon="icon-layers" data-color="#EA49B2"></div>
                                </span>
                                <h3 class="k-card-title">Single operational view</h3>
                            </div>
                            <p class="k-card-desc">People, credentials, zones, devices, incidents, one live model across
                                every site instead of fifteen dashboards.</p>
                        </div>

                        <!-- Card 2: Deploy Instantly -->
                        <div class="k-feature-card">
                            <div class="k-card-header">
                                <span class="k-card-icon">
                                    <div class="react-timeline-icon" data-icon="icon-zap" data-color="#E44856"></div>
                                </span>
                                <h3 class="k-card-title">Deploy instantly</h3>
                            </div>
                            <p class="k-card-desc">New protocols activate across sites with a command. Test. Measure.
                                Iterate.</p>
                        </div>

                        <!-- Card 3: Your Console or Ours -->
                        <div class="k-feature-card">
                            <div class="k-card-header">
                                <span class="k-card-icon">
                                    <div class="react-timeline-icon" data-icon="icon-monitor" data-color="#AFF962"></div>
                                </span>
                                <h3 class="k-card-title">Your console or ours</h3>
                            </div>
                            <p class="k-card-desc">Integrate into existing operations interfaces or use Mithriv's
                                purpose-built command center.</p>
                        </div>

                    </div>
                </div>

                <!-- Bottom Row: Split Footer -->
                <div class="knowledge-footer"
                    style="display: flex; align-items: center; justify-content: space-between; gap: 40px; margin-top: 10px;">

                    <!-- Left: Subtitle Paragraph with bold highlights -->
                    <p class="knowledge-subheading"
                        style="margin: 0; font-family: var(--font-main); font-size: 20px; line-height: 1.45; max-width: 750px; color: rgba(255, 255, 255, 0.45); letter-spacing: -0.2px; text-align: left;">
                        <strong style="color: #ffffff; font-weight: 500;">One operational model. Every system. Every
                            site. Real-time.</strong>
                    </p>

                    <!-- Right: Pill Learn More Button -->
                    <div class="knowledge-action">
                        <a href="#explore-memory" class="ent-btn-primary">Learn more <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
                    </div>
                </div>
            </div>
        </section>

<!-- New Assurance Architecture Section (Operational Outcomes Style) -->
        <section id="assurance-architecture" style="background: transparent; color: #FFFFFF; padding: 120px 32px 0 32px; position: relative; z-index: 10; box-sizing: border-box; font-family: var(--font-main), 'Inter', sans-serif;">
    <div style="max-width: 1280px; margin: 0 auto; width: 100%;">
        
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto 80px;">
            <h2 class="std-section-h2" style="font-size: 48px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; margin-top: 0px; margin-bottom: 24px;">
                Autonomy with accountability
            </h2>
            <p class="std-section-subheading" style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.6; font-family: var(--font-mono), JetBrains Mono, monospace; max-width: 600px; margin: 0 auto 48px;">
                Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous execution that stays auditable.
            </p>
        </div>

        <style>
            .assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 991px) { .assurance-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 767px) { .assurance-grid { grid-template-columns: 1fr; } }
            .minimal-card { background: transparent; border: 1px solid #212326; margin: -1px 0 0 -1px; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; position: relative; overflow: hidden; }
            .minimal-card::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, #212326 0, #212326 1px, transparent 1px, transparent 6px); opacity: 0; transition: opacity 0.4s ease; -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 80%); mask-image: radial-gradient(circle at center, black 10%, transparent 80%); z-index: 0; pointer-events: none; }
            .minimal-card:hover::before { opacity: 1; }
            .minimal-card > * { position: relative; z-index: 1; }
            .minimal-ui-container { flex: 1; min-height: 180px; display: flex; align-items: center; justify-content: center; margin-top: 32px; perspective: 1000px; }
            .ui-snippet { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform-style: preserve-3d; }
            .minimal-card:hover .ui-snippet { transform: translateY(-10px) rotateX(2deg) rotateY(-2deg); }
        

            @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes pulseGlowRed { 0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(228, 72, 86, 0.2); background: rgba(228, 72, 86, 0.1); } 50% { opacity: 0.8; box-shadow: 0 0 15px rgba(228, 72, 86, 0.8); background: rgba(228, 72, 86, 0.3); } }
            @keyframes pulseGlowGreen { 0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(73, 178, 92, 0.2); } 50% { opacity: 0.6; text-shadow: 0 0 15px rgba(73, 178, 92, 0.8); } }
            @keyframes pulseGlowPurple { 0%, 100% { box-shadow: 0 0 5px rgba(217, 134, 240, 0.5); } 50% { box-shadow: 0 0 15px rgba(217, 134, 240, 0.9); } }
            @keyframes dashFlow { 100% { stroke-dashoffset: -20; } }
            @keyframes blinkSlow { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
            @keyframes fillProgress { 0%, 10% { width: 0%; } 40%, 80% { width: 65%; } 100% { width: 0%; } }
            @keyframes spinSlow { 100% { transform: rotate(360deg); } }
            @keyframes drawLineVertical { 0%, 10% { height: 0%; opacity: 0; } 40%, 80% { height: 100%; opacity: 1; } 100% { height: 100%; opacity: 0; } }

        </style>

        <div class="assurance-grid">
            
            <!-- Card 1 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Tested before deployed</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every configuration runs through scenario libraries and edge cases before production.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 11px; overflow: hidden;">
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: space-between;">
                            <span>pipeline: pre_flight_checks</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform-origin: center; animation: spinSlow 2s linear infinite;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 10px; position: relative;">
                            <div style="position: absolute; left: 16px; top: 16px; bottom: 16px; width: 1px; background: rgba(73, 178, 92, 0.3);"></div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: blinkSlow 3s infinite 0s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">network_stress_test</span>
                                    <span style="color: rgba(255,255,255,0.3);">124ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: blinkSlow 3s infinite 1s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">boundary_audit</span>
                                    <span style="color: rgba(255,255,255,0.3);">89ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: blinkSlow 3s infinite 2s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">failover_simulation</span>
                                    <span style="color: rgba(255,255,255,0.3);">42ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Graduated authority</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Define what executes automatically and what requires explicit human approval.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="width: 100%; max-width: 260px; font-family: var(--font-mono), monospace; font-size: 11px;">
                        <div style="background: #141518; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 10px 12px; text-align: center;">
                            <span style="color: rgba(255,255,255,0.5);">Clearance Required:</span> <span style="color: #FCE545;">Level 2</span>
                        </div>
                        <div style="display: flex; justify-content: space-around; height: 24px; position: relative;">
                            <svg width="100%" height="24" style="position: absolute; top: 0; left: 0;">
                                <path d="M130,0 L130,10 L65,10 L65,24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                                <path d="M130,0 L130,10 L195,10 L195,24" fill="none" stroke="rgba(252, 229, 69, 0.4)" stroke-width="1.5" stroke-dasharray="4 4" style="animation: dashFlow 1s linear infinite;" />
                            </svg>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 8px; text-align: center; opacity: 0.5;">
                                <span style="color: rgba(255,255,255,0.5); font-size: 9px;">Auto-Execute</span>
                            </div>
                            <div style="flex: 1.5; background: rgba(252, 229, 69, 0.05); border: 1px solid rgba(252, 229, 69, 0.2); border-radius: 6px; padding: 8px; text-align: center;">
                                <span style="color: #FCE545; font-size: 9px;">Admin Approval</span>
                                <div style="margin-top: 4px; font-size: 8px; color: rgba(255,255,255,0.4);"><span style="animation: blinkSlow 1.5s infinite;">[ PENDING... ]</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Complete evidence chains</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every decision logged with reasoning, timestamps, and approvals.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="width: 100%; max-width: 250px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="position: relative; padding-left: 16px; display: flex; flex-direction: column; gap: 16px;">
                            <div style="position: absolute; left: 3px; top: 4px; bottom: 4px; width: 1px; background: rgba(217, 134, 240, 0.3); transform-origin: top; animation: drawLineVertical 4s ease-out infinite;"></div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:11</span> <span style="color: #d1d5db; margin-left: 6px;">Threat Detected</span>
                            </div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:12</span> <span style="color: #d1d5db; margin-left: 6px;">AI Classification</span>
                            </div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #D986F0; animation: pulseGlowPurple 2s infinite;"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:03:00</span> <span style="color: #fff; margin-left: 6px; font-weight: bold;">Action Executed</span>
                                <div style="margin-top: 10px; background: rgba(217, 134, 240, 0.08); border: 1px solid rgba(217, 134, 240, 0.2); border-radius: 4px; padding: 6px 10px; display: inline-flex; align-items: center; gap: 6px; color: #D986F0; font-size: 9px; font-weight: bold;">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    EXPORT .JSON
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Sovereign-ready</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Regional data residency and customer-managed keys for regulated environments.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="flex: 1; background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); border-radius: 8px; padding: 12px; text-align: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4993E3" stroke-width="2" style="margin-bottom: 6px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            <div style="color: #4993E3; font-weight: bold; margin-bottom: 2px;">EU-CENTRAL-1</div>
                            <div style="color: rgba(73, 147, 227, 0.5); font-size: 8px;">[ Air-Gapped ]</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 50px;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <svg width="100%" height="2" style="margin-top: 2px;"><line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4 4" style="animation: dashFlow 1.5s linear infinite;"/></svg>
                        </div>
                        <div style="flex: 1; background: #141518; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; text-align: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" style="margin-bottom: 6px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            <div style="color: #d1d5db; font-weight: bold; margin-bottom: 2px;">CUSTOMER VPC</div>
                            <div style="color: rgba(255,255,255,0.4); font-size: 8px;">[ Local Key ]</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Human override</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Any autonomous action can be paused, reversed, or escalated instantly.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(228, 72, 86, 0.2); border-radius: 8px; width: 100%; max-width: 280px; overflow: hidden;">
                        <div style="padding: 16px; display: flex; gap: 12px;">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(228, 72, 86, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; animation: pulseGlowRed 2s infinite;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E44856" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-family: var(--font-mono), monospace; font-size: 11px; color: #fff; font-weight: bold; margin-bottom: 4px;">Lockdown Sequence Initiated</div>
                                <div style="font-size: 11px; color: rgba(255,255,255,0.5); font-family: var(--font-main), sans-serif; margin-bottom: 12px;">Zone 4 perimeter seal starting.</div>
                                <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-bottom: 16px; overflow: hidden;">
                                    <div style="width: 65%; height: 100%; background: #E44856; animation: fillProgress 5s ease-out infinite;"></div>
                                </div>
                                <div style="background: rgba(228, 72, 86, 0.1); border: 1px solid rgba(228, 72, 86, 0.3); border-radius: 4px; padding: 8px 0; text-align: center; color: #E44856; font-family: var(--font-mono), monospace; font-size: 10px; font-weight: bold;">
                                    ◼ HALT EXECUTION
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Non-bypassable logs</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Immutable, cryptographically verifiable records that cannot be altered.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px; overflow: hidden;">
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                            <span style="color: rgba(255,255,255,0.5);">Append-Only Storage</span>
                            <div style="display: flex; align-items: center; gap: 4px; color: #49B25C; font-size: 9px; font-weight: bold; animation: pulseGlowGreen 2s infinite; border-radius: 4px;">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                ACTIVE
                            </div>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 6px;">
                                <span style="color: rgba(255,255,255,0.3);">Hash</span>
                                <span style="color: rgba(255,255,255,0.3);">Status</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x3a9b...f2c4</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x8e1f...a92b</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x5b3c...d18e</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>


        
        
        ` }} />
            <ComplianceAutomates />
            <div dangerouslySetInnerHTML={{
                __html: `

<div class="ent-section-divider"></div>

        <!-- Global Threat Ticker -->
        <div class="global-ticker" style="display: none;">
            <div class="ticker-content">
                <span>> [SYS_OK] Perimeter Secure</span><span class="ticker-sep">|</span>
                <span>> [NET] Latency: 12ms</span><span class="ticker-sep">|</span>
                <span>> [AI_CORE] 0 Missed Alerts</span><span class="ticker-sep">|</span>
                <span>> [AGENT_04] Executing Protocols</span><span class="ticker-sep">|</span>
                <span>> [NODE_9] 100% Uptime</span><span class="ticker-sep">|</span>
                <span>> [SYS_OK] Perimeter Secure</span><span class="ticker-sep">|</span>
                <span>> [NET] Latency: 12ms</span><span class="ticker-sep">|</span>
                <span>> [AI_CORE] 0 Missed Alerts</span><span class="ticker-sep">|</span>
                <span>> [AGENT_04] Executing Protocols</span><span class="ticker-sep">|</span>
                <span>> [NODE_9] 100% Uptime</span>
            </div>
        </div>
    </div>



    <!-- Mobile Menu Script -->


    <!-- Sparkles Initialization -->

    <!-- Cinematic Footer -->

      ` }} />
        </div>
    )
}
