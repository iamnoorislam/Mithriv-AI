'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import './style.css'
import { createRoot } from 'react-dom/client'
import { AnimatedIncidentIcon, AnimatedCredentialIcon, AnimatedVisitorIcon, AnimatedSafetyIcon, AnimatedGuardIcon, AnimatedVehicleIcon, AnimatedBlogIcon, AnimatedBotIcon, AnimatedBrainIcon, AnimatedCaseStudiesIcon, AnimatedNetworkIcon, AnimatedUsersIcon, AnimatedBriefcaseIcon, AnimatedMessageIcon, AnimatedLayersIcon, AnimatedZapIcon, AnimatedMonitorIcon, AnimatedEbookIcon, AnimatedFileCodeIcon, AnimatedRadarIcon, AnimatedCheckSquareIcon, AnimatedPresentationIcon } from '../components/AnimatedIcons'

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

export default function HomePage() {
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
      if (w.runMain && w.runConsoleSimulation && w.runDotCanvas && w.gsap && w.ScrollTrigger && typeof w.Lenis !== 'undefined') {
        // Defer script initializations by 100ms to allow DOM layout to complete
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
            w.runConsoleSimulation();
          } catch (e) {
            console.error("Error in runConsoleSimulation:", e);
          }
          try {
            w.runDotCanvas();
          } catch (e) {
            console.error("Error in runDotCanvas:", e);
          }

          // Schedule staggered refreshes for ScrollTrigger positions
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
      if (w.cancelDotCanvasAnim) {
        w.cancelDotCanvasAnim();
      }
      if (w.consoleClickSimulationListener) {
        document.removeEventListener('click', w.consoleClickSimulationListener);
        w.consoleClickSimulationListener = null;
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="landing-theme">
      <div dangerouslySetInnerHTML={{ __html: `
    <div class="global-grid-bg" id="globalGridBg"></div>
    <main class="hero-section" id="hero">
        <!-- Canvas Frame Sequence Background -->
        <div class="canvas-container" id="canvas-container">
            <canvas id="hero-canvas"></canvas>
        </div>

        <!-- Hero Content -->
        <div class="hero-content">
            <span class="section-tag">CONSCIOUS SECURITY</span>
            <h1 class="main-heading">
        <span class="word-mask"><span class="word-inner w1">Intelligence</span></span>
        <span class="word-mask"><span class="word-inner w2">that</span></span>
        <span class="word-mask"><span class="word-inner w3">secures</span></span><br>
        <span class="word-mask"><span class="word-inner w4">your</span></span>
        <span class="word-mask"><span class="word-inner w5">physical</span></span>
        <span class="word-mask"><span class="word-inner w6">world</span></span>
      </h1>
            <p class="body-text award-fade-up delay-p"
                style="margin-bottom: 2.5rem; max-width: 650px; margin-left: auto; margin-right: auto;">
                Mithriv is the AI execution layer that knows your sites, correlates across systems, and acts in real
                time, turning storms into intentional responses.
            </p>
            <button class="ent-btn-primary">Request Consultation <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></button>
        </div>
    </main>

    <div id="content-wrapper" style="position: relative; z-index: 10; background: var(--bg-base);">
        <!-- Global Background Elements -->
        <div class="grain-overlay"></div>

        <!-- Section 2: Interactive Console Demo -->
        <section class="section sec-console-demo reveal-section" style="position: relative; z-index: 5;">
            <div class="container text-center">
                <h2 class="pixel-heading" style="font-size: 48px; line-height: 1.1; margin-bottom: 24px;">One command,
                    full operational response</h2>
                <p class="body-text" style="max-width: 600px; margin: 0 auto 64px; font-size: 14px; line-height: 1.6; font-family: var(--font-mono); text-align: center;">
                    Simulate live operational scenarios and watch Mithriv coordinate security, access control, visitor
                    movement, and emergency response autonomously in realtime.</p>

                <style>
                    .ai-chat-wrapper {
                        position: relative;
                        height: 100%;
                        min-height: 600px;
                        max-height: 800px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-end;
                        padding-bottom: 2rem;
                        background: transparent;
                        overflow: visible;
                        font-family: var(--font-main);
                        margin-top: 0;
                    }

                    .ai-chat-container {
                        position: relative;
                        z-index: 10;
                        width: 100%;
                        max-width: 48rem;
                        height: 100%;
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        gap: 1rem;
                    }

                    .chat-hero-text {
                        text-align: center;
                        margin: auto;
                    }

                    .chat-hero-text h1 {
                        font-size: 48px;
                        font-weight: 500;
                        letter-spacing: -0.02em;
                        color: #ffffff;
                        margin-bottom: 24px;
                        line-height: 1.05;
                    }

                    .chat-hero-line {
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                        width: 100%;
                        max-width: 200px;
                        margin: 1rem auto;
                    }

                    .chat-input-box {
                        flex-shrink: 0;
                        position: relative;
                        background: #1a1a1f;
                        border-radius: 1.25rem;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        display: flex;
                        flex-direction: column;
                        transition: all 0.3s ease;
                    }

                    .chat-input-box:focus-within {
                        background: #202025;
                        border-color: rgba(255, 255, 255, 0.15);
                        box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
                    }

                    .ai-textarea {
                        width: 100%;
                        min-height: 56px;
                        padding: 1rem 1.5rem;
                        background: transparent;
                        border: none;
                        color: rgba(255, 255, 255, 0.9);
                        font-size: 0.95rem;
                        font-family: inherit;
                        resize: none;
                        outline: none;
                        line-height: 1.5;
                    }

                    .ai-textarea::placeholder {
                        color: rgba(255, 255, 255, 0.3);
                    }

                    .command-palette {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: calc(100% + 0.5rem);
                        backdrop-filter: blur(24px);
                        -webkit-backdrop-filter: blur(24px);
                        background: rgba(15, 15, 20, 0.95);
                        border-radius: 1rem;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                        overflow: hidden;
                        z-index: 50;
                        display: none;
                        flex-direction: column;
                        padding: 0.5rem;
                    }

                    .command-palette.active {
                        display: flex;
                        animation: slideUpFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    .cmd-item {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 0.75rem 1rem;
                        font-size: 0.85rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        transition: all 0.2s;
                        color: rgba(255, 255, 255, 0.7);
                    }

                    .cmd-item:hover,
                    .cmd-item.selected {
                        background: rgba(255, 255, 255, 0.08);
                        color: #fff;
                    }

                    .cmd-icon {
                        opacity: 0.7;
                    }

                    .cmd-label {
                        font-weight: 500;
                        font-size: 0.9rem;
                    }

                    .cmd-prefix {
                        margin-left: auto;
                        font-size: 0.75rem;
                        color: rgba(255, 255, 255, 0.4);
                        font-family: var(--font-mono);
                        background: rgba(255, 255, 255, 0.05);
                        padding: 0.2rem 0.5rem;
                        border-radius: 4px;
                    }

                    .chat-action-bar {
                        padding: 0.75rem 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .action-left {
                        display: flex;
                        gap: 0.5rem;
                    }

                    .action-btn {
                        padding: 0.5rem;
                        border-radius: 0.5rem;
                        color: rgba(255, 255, 255, 0.5);
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .action-btn:hover {
                        color: rgba(255, 255, 255, 0.9);
                        background: rgba(255, 255, 255, 0.08);
                    }

                    .action-btn.active {
                        background: rgba(255, 255, 255, 0.15);
                        color: #fff;
                    }

                    .ai-send-btn {
                        padding: 0.5rem 1.2rem;
                        border-radius: 99px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        transition: all 0.2s;
                        border: none;
                        cursor: pointer;
                        font-family: inherit;
                    }

                    .ai-send-btn:not(:disabled) {
                        background: #fff;
                        color: #000;
                    }

                    .ai-send-btn:not(:disabled):hover {
                        background: #e2e8f0;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
                    }

                    .ai-send-btn:disabled {
                        background: rgba(255, 255, 255, 0.05);
                        color: rgba(255, 255, 255, 0.3);
                        cursor: not-allowed;
                    }

                    .ai-send-btn:not(:disabled):active {
                        transform: scale(0.97);
                    }

                    .attachments-container {
                        padding: 0 1.5rem 0.5rem 1.5rem;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }

                    .chat-suggestions {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        margin-top: 1rem;
                    }

                    .suggestion-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 99px;
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 0.85rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-family: inherit;
                    }

                    .suggestion-btn:hover {
                        background: rgba(255, 255, 255, 0.08);
                        color: #fff;
                        border-color: rgba(255, 255, 255, 0.2);
                    }

                    .thinking-popup {
                        position: absolute;
                        bottom: calc(100% + 1rem);
                        left: 1rem;
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 1rem;
                        padding: 0.5rem 1rem 0.5rem 0.5rem;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        display: none;
                        align-items: center;
                        gap: 0.75rem;
                        z-index: 100;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    }

                    .thinking-popup.active {
                        display: flex;
                        animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    .typing-dots {
                        display: flex;
                        gap: 0.25rem;
                        align-items: center;
                    }

                    .typing-dots .dot {
                        width: 4px;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.7);
                        border-radius: 50%;
                        animation: dotBounce 1.4s infinite ease-in-out;
                    }

                    .typing-dots .dot:nth-child(1) {
                        animation-delay: -0.32s;
                    }

                    .typing-dots .dot:nth-child(2) {
                        animation-delay: -0.16s;
                    }

                    .util-hidden {
                        display: none !important;
                    }

                    @keyframes util-spin {
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    @keyframes slideUpFade {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    }

                    .chat-bg-orbs {
                        position: absolute;
                        inset: 0;
                        overflow: visible;
                        pointer-events: none;
                        z-index: 0;
                        opacity: 0.5;
                    }

                    .chat-orb {
                        position: absolute;
                        border-radius: 50%;
                        mix-blend-mode: screen;
                        animation: orbPulse 8s ease-in-out infinite alternate;
                    }

                    .orb-violet {
                        top: -10%;
                        left: 20%;
                        width: 28rem;
                        height: 28rem;
                        background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
                        filter: blur(60px);
                    }

                    .orb-indigo {
                        bottom: -10%;
                        right: 20%;
                        width: 28rem;
                        height: 28rem;
                        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
                        filter: blur(60px);
                        animation-delay: 1.5s;
                    }

                    .orb-fuchsia {
                        top: 30%;
                        right: 40%;
                        width: 20rem;
                        height: 20rem;
                        background: radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 70%);
                        filter: blur(60px);
                        animation-delay: 3s;
                    }

                    @keyframes orbPulse {
                        0% {
                            opacity: 0.4;
                            transform: scale(0.9) translate(0, 0);
                        }

                        100% {
                            opacity: 1;
                            transform: scale(1.1) translate(20px, -20px);
                        }
                    }
                </style>


                <style>
                    .mock-dashboard-frame {
                        background: rgba(10, 10, 14, 0.7);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        border-left: none !important;
                        border-right: none !important;
                        border-radius: 16px;
                        box-shadow: none;
                        max-width: 1000px;
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        height: 85vh;
                        min-height: 650px;
                        text-align: left;
                    }

                    .mock-dashboard-header {
                        height: 48px;
                        background: rgba(0, 0, 0, 0.4);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                        display: flex;
                        align-items: center;
                        padding: 0 16px;
                        position: relative;
                    }

                    .traffic-lights {
                        display: flex;
                        gap: 8px;
                    }

                    .traffic-lights .light {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                    }

                    .light.red {
                        background: #FF5F56;
                    }

                    .light.yellow {
                        background: #FFBD2E;
                    }

                    .light.green {
                        background: #27C93F;
                    }

                    .header-title {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: var(--font-main);
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.5);
                        font-weight: 500;
                        letter-spacing: 0.5px;
                    }

                    .mock-dashboard-body {
                        display: flex;
                        flex: 1;
                        overflow: hidden;
                    }

                    .mock-dashboard-sidebar {
                        width: 64px;
                        background: rgba(0, 0, 0, 0.2);
                        border-right: none !important;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 16px;
                        gap: 16px;
                    }

                    .sidebar-icon {
                        width: 32px;
                        height: 32px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: rgba(255, 255, 255, 0.4);
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .sidebar-icon:hover,
                    .sidebar-icon.active {
                        background: rgba(255, 255, 255, 0.1);
                        color: #fff;
                    }

                    .mock-dashboard-content {
                        flex: 1;
                        position: relative;
                        background: transparent;
                    }
                </style>
                <div class="mock-dashboard-frame">
                    <div class="mock-dashboard-header">
                        <div class="traffic-lights">
                            <span class="light red"></span>
                            <span class="light yellow"></span>
                            <span class="light green"></span>
                        </div>
                        <div class="header-title">Mithriv Console</div>
                    </div>
                    <div class="mock-dashboard-body">
                        <div class="mock-dashboard-sidebar">
                            <div class="sidebar-icon active">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <div class="sidebar-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10"></line>
                                    <line x1="12" y1="20" x2="12" y2="4"></line>
                                    <line x1="6" y1="20" x2="6" y2="14"></line>
                                </svg>
                            </div>
                            <div class="sidebar-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path
                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="mock-dashboard-content">
                            <div class="ai-chat-wrapper">
                                <div class="chat-bg-orbs">
                                    <div class="chat-orb orb-violet"></div>
                                    <div class="chat-orb orb-indigo"></div>
                                    <div class="chat-orb orb-fuchsia"></div>
                                </div>

                                <div class="ai-chat-container">
                                    <div class="chat-hero-text">
                                        <h1>How can I help today?</h1>
                                        <div class="chat-hero-line"></div>
                                        <p style="font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6;">Try
                                            typing <span
                                                style="color: rgba(255,255,255,0.9); cursor: pointer; text-decoration: underline; text-underline-offset: 2px;"
                                                onclick="autoTypeKeyword('fire')">fire</span> to trigger emergency
                                            response, <span
                                                style="color: rgba(255,255,255,0.9); cursor: pointer; text-decoration: underline; text-underline-offset: 2px;"
                                                onclick="autoTypeKeyword('access')">access</span> to manage entry
                                            controls, or <span
                                                style="color: rgba(255,255,255,0.9); cursor: pointer; text-decoration: underline; text-underline-offset: 2px;"
                                                onclick="autoTypeKeyword('visitor')">visitor</span> to orchestrate guest
                                            flow — watch Mithriv coordinate across every system in real time.</p>
                                    </div>

                                    <div id="chatBox" class="chat-feed" data-lenis-prevent="true"
                                        style="display: none; max-height: 400px; overflow-y: auto; padding: 1rem; margin-bottom: 1rem; width: 100%;">
                                        <div class="chat-bubble bubble-ai">
                                            <div class="bubble-avatar">M</div>
                                            <div class="bubble-content">
                                                System initialized. Autonomous operations online. Enter scenario
                                                keywords (e.g. "fire", "visitor", "access") to initiate realtime
                                                tactical coordination.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-input-box">
                                        <!-- Command Palette -->
                                        <div id="commandPalette" class="command-palette">
                                            <div class="cmd-item" onclick="selectCommand(0)">
                                                <svg class="cmd-icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                </svg>
                                                <span class="cmd-label">Simulate Breach</span>
                                                <span class="cmd-prefix">/breach</span>
                                            </div>
                                            <div class="cmd-item" onclick="selectCommand(1)">
                                                <svg class="cmd-icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                    <path d="M3 9h18" />
                                                    <path d="M9 21V9" />
                                                </svg>
                                                <span class="cmd-label">Load Floorplan</span>
                                                <span class="cmd-prefix">/floorplan</span>
                                            </div>
                                            <div class="cmd-item" onclick="selectCommand(2)">
                                                <svg class="cmd-icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path
                                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" />
                                                    <line x1="16" y1="17" x2="8" y2="17" />
                                                    <polyline points="10 9 9 9 8 9" />
                                                </svg>
                                                <span class="cmd-label">Generate Report</span>
                                                <span class="cmd-prefix">/report</span>
                                            </div>
                                            <div class="cmd-item" onclick="selectCommand(3)">
                                                <svg class="cmd-icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path
                                                        d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                                    <path d="M5 3v4" />
                                                    <path d="M19 17v4" />
                                                    <path d="M3 5h4" />
                                                    <path d="M17 19h4" />
                                                </svg>
                                                <span class="cmd-label">Optimize Rules</span>
                                                <span class="cmd-prefix">/optimize</span>
                                            </div>
                                        </div>

                                        <textarea id="aiChatInput" placeholder="Ask Mithriv a question..."
                                            class="ai-textarea" rows="1"></textarea>

                                        <div id="attachmentsContainer" class="attachments-container util-hidden"></div>

                                        <div class="chat-action-bar">
                                            <div class="action-left">
                                                <button class="action-btn" onclick="attachFile()" title="Attach File">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <path
                                                            d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                                    </svg>
                                                </button>
                                                <button class="action-btn" id="commandBtn"
                                                    onclick="toggleCommandPalette()" title="Commands">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <path
                                                            d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <button class="ai-send-btn" id="aiSendBtn" onclick="sendMessage()" disabled>
                                                <svg class="send-icon" width="16" height="16" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                </svg>
                                                <svg class="loader-icon util-hidden" width="16" height="16"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                </svg>
                                                <span>Send</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="chat-suggestions">
                                        <button class="suggestion-btn" onclick="selectCommand(0)">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                            <span>Simulate Breach</span>
                                        </button>
                                        <button class="suggestion-btn" onclick="selectCommand(1)">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                <path d="M3 9h18" />
                                                <path d="M9 21V9" />
                                            </svg>
                                            <span>Load Floorplan</span>
                                        </button>
                                        <button class="suggestion-btn" onclick="selectCommand(2)">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                                <polyline points="10 9 9 9 8 9" />
                                            </svg>
                                            <span>Generate Report</span>
                                        </button>
                                        <button class="suggestion-btn" onclick="selectCommand(3)">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path
                                                    d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                                <path d="M5 3v4" />
                                                <path d="M19 17v4" />
                                                <path d="M3 5h4" />
                                                <path d="M17 19h4" />
                                            </svg>
                                            <span>Optimize Rules</span>
                                        </button>
                                    </div>

                                    <div id="thinkingPopup" class="thinking-popup">
                                        <div
                                            style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.9);">
                                            M</div>
                                        <span
                                            style="color: rgba(255,255,255,0.8); font-size: 0.875rem; font-weight: 500;">Thinking</span>
                                        <div class="typing-dots">
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>






        <!-- Section 3: AI Agents -->
        <section class="section sec-ai-agents reveal-section">
            <div class="container">
                <span class="section-tag" style="display: block; margin: 0 auto 1.5rem; width: fit-content; text-align: center;">THE PROBLEM</span>
                <h2 class="pixel-heading text-center">Your security operation is overwhelmed</h2>
                <p class="std-section-subheading text-center" style="max-width: 700px; margin: 0 auto 3rem;">Your systems generate
                    data. Petabytes of it. But when incidents occur, humans still do all the thinking, correlating, and
                    acting.</p>
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

                                        0%,
                                        100% {
                                            fill: rgba(124, 60, 208, 0.15);
                                            stroke: rgba(124, 60, 208, 0.4);
                                        }

                                        50% {
                                            fill: rgba(124, 60, 208, 0.4);
                                            stroke: #7C3CD0;
                                            filter: drop-shadow(0 0 8px #7C3CD0);
                                        }
                                    }

                                    @keyframes wave-expand {
                                        0% {
                                            transform: scale(0.6);
                                            opacity: 0;
                                        }

                                        10% {
                                            opacity: 0.8;
                                        }

                                        100% {
                                            transform: scale(1.4);
                                            opacity: 0;
                                        }
                                    }

                                    @keyframes text-blink {

                                        0%,
                                        100% {
                                            opacity: 0.3;
                                        }

                                        50% {
                                            opacity: 1;
                                        }
                                    }

                                    @keyframes noise-flicker {

                                        0%,
                                        100% {
                                            opacity: 0.1;
                                        }

                                        30% {
                                            opacity: 0.8;
                                        }

                                        60% {
                                            opacity: 0.3;
                                        }

                                        80% {
                                            opacity: 0.9;
                                        }
                                    }
                                </style>
                                <!-- Background Grid -->
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- Outer warning hexagon -->
                                <polygon points="100,25 155,55 155,115 100,145 45,115 45,55"
                                    stroke="rgba(124,60,208,0.15)" strokeWidth="1.5" stroke-dasharray="4,4" />

                                <!-- 98% text in high-tech font -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="48" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="20" fill="#7C3CD0" text-anchor="middle" letter-spacing="1">98%</text>
                                    <text x="100" y="60" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">FALSE
                                        ALARMS</text>
                                </g>

                                <!-- Chaotic Alert Noise Cloud -->
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

                                <!-- Center Siren Beacon (Isometric projection) -->
                                <g transform="translate(100, 95)">
                                    <ellipse cx="0" cy="0" rx="35" ry="17.5" stroke="#7C3CD0" strokeWidth="1"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear;" />
                                    <ellipse cx="0" cy="0" rx="55" ry="27.5" stroke="#7C3CD0" strokeWidth="0.5"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear; animation-delay: 1.25s;" />
                                    <ellipse cx="0" cy="10" rx="18" ry="9" fill="rgba(0,0,0,0.3)" />
                                    <polygon points="-15,0 15,0 15,10 -15,10" fill="rgba(255,255,255,0.05)"
                                        stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                                    <ellipse cx="0" cy="0" rx="15" ry="7.5" fill="rgba(255,255,255,0.08)"
                                        stroke="rgba(255, 255, 255, 0.25)" />
                                    <path d="M-8,-10 L8,-10 L12,0 L-12,0 Z" stroke="#7C3CD0" strokeWidth="1"
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
                                        0% {
                                            transform: translate(-30px, -15px);
                                            opacity: 0;
                                        }

                                        15% {
                                            opacity: 1;
                                        }

                                        85% {
                                            opacity: 1;
                                        }

                                        100% {
                                            transform: translate(30px, 15px);
                                            opacity: 0;
                                        }
                                    }

                                    @keyframes platform-hover {

                                        0%,
                                        100% {
                                            transform: translateY(0);
                                        }

                                        50% {
                                            transform: translateY(-4px);
                                        }
                                    }

                                    @keyframes arrow-pulse {

                                        0%,
                                        100% {
                                            stroke-dashoffset: 0;
                                            opacity: 0.3;
                                        }

                                        50% {
                                            opacity: 1;
                                        }
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 100-300% text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="45" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#FFE500" text-anchor="middle" letter-spacing="0.5">100-300%</text>
                                    <text x="100" y="55" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">ANNUAL TURNOVER</text>
                                </g>
                                <g style="animation: platform-hover 4s ease-in-out infinite;">
                                    <polygon points="100,115 145,92.5 100,70 55,92.5" fill="rgba(0,0,0,0.2)" />
                                    <polygon points="100,105 145,82.5 100,60 55,82.5" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" fill="rgba(255,255,255,0.02)" />
                                    <line x1="55" y1="82.5" x2="55" y2="92.5" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <line x1="145" y1="82.5" x2="145" y2="92.5" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <line x1="100" y1="105" x2="100" y2="115" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <polygon points="55,92.5 100,115 100,105 55,82.5" fill="rgba(255,255,255,0.03)" />
                                    <polygon points="145,92.5 100,115 100,105 145,82.5" fill="rgba(255,255,255,0.04)" />
                                    <path d="M60,80 L140,120" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1"
                                        stroke-dasharray="3,3" />
                                    <path d="M70,65 L130,95" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1"
                                        stroke-dasharray="3,3" />

                                    <g
                                        style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite;">
                                        <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.8" fill="rgba(255,255,255,0.1)" />
                                        <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.6)"
                                            stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.5" />
                                        <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.8" fill="rgba(255,255,255,0.4)" />
                                        <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.5" />
                                    </g>
                                    <g
                                        style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite; animation-delay: 2s;">
                                        <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.8" fill="rgba(255,255,255,0.1)" />
                                        <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.6)"
                                            stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.5" />
                                        <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.8" fill="rgba(255,255,255,0.4)" />
                                        <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.5" />
                                    </g>

                                    <ellipse cx="140" cy="80" rx="3" ry="15" stroke="#FFE500" strokeWidth="1.5"
                                        style="transform: rotate(-25deg); opacity: 0.7;" />
                                    <ellipse cx="140" cy="80" rx="1" ry="10" fill="rgba(255, 229, 0, 0.1)"
                                        style="transform: rotate(-25deg);" />
                                    <ellipse cx="60" cy="40" rx="2" ry="10" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" style="transform: rotate(-25deg);" />
                                    <path d="M110,87 C130,97 150,90 165,70" stroke="#FFE500" strokeWidth="1.5"
                                        stroke-dasharray="3,3" style="animation: arrow-pulse 2s infinite;" />
                                    <polygon points="167,70 164,75 160,70" fill="#FFE500" />
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
                                        0% {
                                            stroke-dashoffset: 0;
                                        }

                                        100% {
                                            stroke-dashoffset: -12;
                                        }
                                    }

                                    @keyframes clock-ticks {
                                        0% {
                                            transform: rotate(0deg);
                                        }

                                        100% {
                                            transform: rotate(360deg);
                                        }
                                    }

                                    @keyframes badge-dissolve {
                                        0% {
                                            opacity: 0.8;
                                            transform: translate(0, 0) scale(0.9) rotate(5deg);
                                        }

                                        50% {
                                            opacity: 0.1;
                                            transform: translate(0, 15px) scale(0.5) rotate(-5deg);
                                        }

                                        51% {
                                            opacity: 0;
                                        }

                                        100% {
                                            opacity: 0.8;
                                            transform: translate(0, 0) scale(0.9) rotate(5deg);
                                        }
                                    }

                                    @keyframes sand-pile {

                                        0%,
                                        100% {
                                            transform: scaleY(0.9);
                                        }

                                        50% {
                                            transform: scaleY(1.2);
                                        }
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 12,000h text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="45" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#4DA6FF" text-anchor="middle" letter-spacing="0.5">12,000h</text>
                                    <text x="100" y="55" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">ON CREDENTIALS</text>
                                </g>
                                <ellipse cx="100" cy="98" rx="52" ry="26" stroke="rgba(255, 255, 255, 0.25)"
                                    strokeWidth="1.6" stroke-dasharray="3,6"
                                    style="transform-origin: 100px 98px; animation: clock-ticks 20s linear infinite;" />

                                <g transform="translate(100, 98) scale(0.75)">
                                    <polygon points="0,-48 30,-36 0,-24 -30,-36" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                                    <polygon points="0,48 30,36 0,24 -30,36" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                                    <line x1="-30" y1="-36" x2="-30" y2="36" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <line x1="30" y1="-36" x2="30" y2="36" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <line x1="0" y1="-24" x2="0" y2="24" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="0.8" stroke-dasharray="2,2" />
                                    <path
                                        d="M-26,-34 C-26,-15 -6,-5 -6,0 C-6,5 -26,15 -26,34 L26,34 C26,15 6,5 6,0 C6,-5 26,-15 26,-34 Z"
                                        stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

                                    <g transform="translate(0, -25)"
                                        style="animation: badge-dissolve 4s infinite ease-in;">
                                        <polygon points="0,-6 10,-2 0,2 -10,-2" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.8" fill="rgba(255,255,255,0.1)" />
                                        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.6" />
                                        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.6)" />
                                        <line x1="0" y1="1.5" x2="0" y2="4" stroke="rgba(255, 255, 255, 0.25)"
                                            strokeWidth="0.5" />
                                    </g>

                                    <line x1="0" y1="-5" x2="0" y2="25" stroke="#4DA6FF" strokeWidth="1"
                                        stroke-dasharray="2,4"
                                        style="stroke-dashoffset: 0; animation: sand-drip 1s linear infinite;" />
                                    <circle cx="0" cy="0" r="1" fill="#4DA6FF" />

                                    <polygon points="0,32 18,24 0,16 -18,24" stroke="#4DA6FF"
                                        strokeWidth="0.8" fill="rgba(77,166,255,0.15)"
                                        style="transform-origin: 0 32px; animation: sand-pile 4s infinite alternate;" />
                                    <polygon points="0,32 10,27 0,22 -10,27" stroke="#4DA6FF"
                                        strokeWidth="0.8" fill="rgba(77,166,255,0.3)" />
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

                                        0%,
                                        100% {
                                            transform: rotate(-5deg);
                                        }

                                        50% {
                                            transform: rotate(5deg);
                                        }
                                    }

                                    @keyframes lock-pulse {

                                        0%,
                                        100% {
                                            stroke: rgba(187, 251, 2, 0.4);
                                            fill: rgba(187, 251, 2, 0.05);
                                        }

                                        50% {
                                            stroke: #bbfb02;
                                            fill: rgba(187, 251, 2, 0.2);
                                            filter: drop-shadow(0 0 4px #bbfb02);
                                        }
                                    }

                                    @keyframes light-glow {

                                        0%,
                                        100% {
                                            opacity: 0.1;
                                        }

                                        50% {
                                            opacity: 0.3;
                                        }
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="2,2" />
                                <!-- 911 ONLY text overlay -->
                                <g style="animation: text-blink 2s infinite;">
                                    <text x="100" y="45" font-family="'Outfit', sans-serif" font-weight="900"
                                        font-size="18" fill="#bbfb02" text-anchor="middle" letter-spacing="0.5">911 ONLY</text>
                                    <text x="100" y="55" font-family="monospace" font-weight="bold" font-size="7"
                                        fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">OPERATIONAL CAPACITY</text>
                                </g>
                                <polygon points="100,45 60,110 140,110" fill="url(#cone-grad-home)"
                                    style="animation: light-glow 3s ease-in-out infinite;" />
                                <ellipse cx="100" cy="110" rx="40" ry="12" stroke="rgba(255, 255, 255, 0.25)"
                                    strokeWidth="1" stroke-dasharray="2,2" />

                                <g transform="translate(100, 45)"
                                    style="transform-origin: 0 -5px; animation: camera-scan 6s ease-in-out infinite;">
                                    <path d="M-15,-15 L0,-5" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" />
                                    <line x1="-15" y1="-15" x2="-15" y2="-5" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <polygon points="-8,-10 12,-20 12,-8 -8,2" fill="rgba(255,255,255,0.05)"
                                        stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                                    <polygon points="12,-20 22,-15 22,-3 12,-8" fill="rgba(255,255,255,0.08)"
                                        stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                                    <polygon points="-8,-10 12,-20 22,-15 2,-5" fill="rgba(255,255,255,0.1)"
                                        stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                                    <ellipse cx="17" cy="-9" rx="3" ry="5" fill="none" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" />
                                    <circle cx="17" cy="-9" r="1.5" fill="#ffffff" />
                                    <circle cx="10" cy="-14" r="1" fill="#bbfb02" />
                                </g>

                                <g transform="translate(100, 95)">
                                    <rect x="-14" y="-5" width="28" height="22" rx="3" stroke="#bbfb02"
                                        strokeWidth="1.5" style="animation: lock-pulse 2s infinite alternate;" />
                                    <path d="M-9,-5 L-9,-14 C-9,-19 9,-19 9,-14 L9,-5" stroke="#bbfb02"
                                        strokeWidth="1.5" fill="none"
                                        style="animation: lock-pulse 2s infinite alternate;" />
                                    <circle cx="0" cy="3" r="2.5" fill="#bbfb02" />
                                    <polygon points="-1,3 1,3 2,10 -2,10" fill="#bbfb02" />
                                    <ellipse cx="0" cy="5" rx="30" ry="15" stroke="#bbfb02" strokeWidth="1"
                                        stroke-dasharray="3,3" />
                                </g>
                                <defs>
                                    <linearGradient id="cone-grad-home" x1="100" y1="45" x2="100" y2="110"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stop-color="rgba(255,255,255,0.2)" />
                                        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                                    </linearGradient>
                                </defs>
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
                    <span class="section-tag">OPERATIONAL DOMAINS</span>
                    <h2 class="pixel-heading cinematic-reveal-title" style="margin-top: 1rem; margin-bottom: 1.5rem;">
                        Security agents that execute</h2>
                    <p class="std-section-subheading cinematic-reveal-subtitle" style="max-width: 650px; margin-bottom: 0;">
                        Dedicated agents for each operational domain, connected to your systems, trained on your
                        policies, authorized to act.
                    </p>
                </div>
                <div class="header-btn-block">
                    <a href="#explore" className="ent-btn-primary award-fade-up delay-btn" style={{ marginTop: 0 }}>Explore the platform <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
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
        <section class="section sec-cinematic-feature" id="cinematic-feature" style="padding-top: 0 !important;">
            <div class="container">
                <div class="text-center"
                    style="display: flex; flex-direction: column; align-items: center;">
                    <span class="ent-pill award-pill">Why This Matters</span>
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
                                    <div class="point-icon-dot react-timeline-icon" data-icon="bento-book" data-color="#FCE545"></div>
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
                                    <div class="point-icon-dot react-timeline-icon" data-icon="bento-users" data-color="#EA49B2"></div>
                                </div>
                                <strong>Fewer people, more coverage</strong>
                                <p>Modules handle routine operations. Your team handles exceptions. One operator
                                    accomplishes what five couldn't.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Center Column: Animated 3D Isometric Graphic -->
                    <div class="trigger-illustration-wrapper">
                        <img src="/SVGs/SOP Agents 1.svg" alt="SOP Agent Architecture Diagram" style={{ width: '90%', height: 'auto', display: 'block', margin: '0 auto' }} />
                    </div>
                    <!-- Right Column: Symmetrical Left-Aligned Points -->
                    <div class="isometric-col col-right">
                        <div class="isometric-point-item">
                            <div class="bento-hover-bg"></div>
                            <div class="bento-content-wrap">
                                <div class="point-icon-wrap">
                                    <div class="point-icon-dot react-timeline-icon" data-icon="bento-shield" data-color="#E44856"></div>
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
                                    <div class="point-icon-dot react-timeline-icon" data-icon="bento-briefcase" data-color="#AFF962"></div>
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




        <!-- Canvas Reveal Section -->
        <section class="canvas-reveal-section" style="position:relative; overflow:hidden;">
            <canvas id="dotCanvas"
                style="position:absolute;inset:0;width:100%;height:100%;max-width:1200px;margin:0 auto;left:0;right:0;z-index:0;pointer-events:none;"></canvas>
            <div
                style="position:absolute;inset:0;width:100%;height:100%;max-width:1200px;margin:0 auto;left:0;right:0;background:radial-gradient(ellipse 60% 70% at center, rgba(11,13,15,0.92) 0%, rgba(11,13,15,0.75) 40%, rgba(11,13,15,0.2) 100%);pointer-events:none;z-index:1;">
            </div>
            <div class="canvas-content" style="position:relative; z-index:2;">
                <h2 class="canvas-title">Hire our security agents</h2>
                <p class="canvas-subtitle">Autonomous security that never blinks. AI agents that observe, decide, and
                    act in real time.</p>
                <a href="#" class="ent-btn-primary">Learn More <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
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
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeLinejoin="round" />
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
                        Everything visible. Everything queryable</h2>
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

        <!-- New Architecture Section -->
        <section class="section reveal-section" id="future-autonomy"
            style="padding: 120px 20px; background: transparent; position: relative; border-top: 1px solid rgba(255,255,255,0.04);">
            <div class="container" style="text-align: center; position: relative; z-index: 2;">
                <p
                    style="color: #8b5cf6; font-family: var(--font-mono); font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
                    Assurance Architecture</p>
                <h2 class="main-heading" style="font-size: 48px; margin-bottom: 20px;">Autonomy with accountability
                </h2>
                <p class="body-text"
                    style="font-family: var(--font-mono); font-size: 14px; max-width: 600px; margin: 0 auto 40px; color: rgba(255,255,255,0.65);">
                    Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous
                    execution that stays auditable.
                </p>
                <a href="#" class="ent-btn-primary" style="margin-bottom: 80px;">Request architecture review <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>

                <style>
                    @keyframes ent-spin-slow {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }

                    @keyframes ent-spin-slow-reverse {
                        from {
                            transform: rotate(360deg);
                        }

                        to {
                            transform: rotate(0deg);
                        }
                    }

                    @keyframes ent-pulse-glow {

                        0%,
                        100% {
                            opacity: 0.5;
                            filter: drop-shadow(0 0 4px currentColor);
                        }

                        50% {
                            opacity: 1;
                            filter: drop-shadow(0 0 12px currentColor);
                        }
                    }

                    @keyframes ent-float-up-down {

                        0%,
                        100% {
                            transform: translateY(0);
                        }

                        50% {
                            transform: translateY(-8px);
                        }
                    }

                    @keyframes ent-dash-flow {
                        to {
                            stroke-dashoffset: -20;
                        }
                    }

                    @keyframes ent-scan-line {

                        0%,
                        100% {
                            transform: translateY(-10px);
                            opacity: 0;
                        }

                        10% {
                            opacity: 1;
                        }

                        50% {
                            transform: translateY(20px);
                        }

                        90% {
                            opacity: 1;
                        }
                    }
                </style>
                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(255,255,255,0.05); border-left: 1px solid rgba(255,255,255,0.05); text-align: left;">

                    <!-- Point 1 -->
                    <div style="border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 40px; display: flex; flex-direction: column; min-height: 400px; position: relative; transition: background 0.3s;"
                        onmouseover="this.style.background='rgba(255,255,255,0.02)'"
                        onmouseout="this.style.background='transparent'">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.1</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M40,130 L90,130 L100,100 L110,130 L160,130" stroke="rgba(255, 255, 255, 0.25)"
                                    strokeWidth="1" stroke-dasharray="2 4"
                                    style="animation: ent-dash-flow 2s linear infinite reverse;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <polygon points="100,60 130,75 100,90 70,75" fill="rgba(139,92,246,0.1)"
                                        stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
                                    <polygon points="70,75 100,90 100,120 70,105" fill="rgba(139,92,246,0.05)"
                                        stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
                                    <polygon points="100,90 130,75 130,105 100,120" fill="rgba(139,92,246,0.15)"
                                        stroke="rgba(139,92,246,0.5)" strokeWidth="1" />

                                    <ellipse cx="100" cy="90" rx="20" ry="10" stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="1" stroke-dasharray="2 2"
                                        style="animation: ent-spin-slow 4s linear infinite; transform-origin: 100px 90px;" />
                                </g>

                                <circle cx="100" cy="90" r="30" stroke="rgba(139,92,246,0.3)" strokeWidth="1"
                                    fill="none" style="color: #8b5cf6; animation: ent-pulse-glow 2s infinite;" />
                                <circle cx="100" cy="90" r="3" fill="#8b5cf6"
                                    style="color: #8b5cf6; animation: ent-pulse-glow 1s infinite;" />

                                <rect x="75" y="40" width="50" height="14" rx="2" fill="rgba(139,92,246,0.1)"
                                    stroke="rgba(139,92,246,0.2)" />
                                <text x="100" y="50" font-family="monospace" font-size="8" fill="#8b5cf6"
                                    text-anchor="middle" font-weight="bold">SIM_PASS</text>
                            </svg>
                        </div>

                        <div style="margin-top: auto;">
                            <h3
                                style="font-family: var(--font-main); font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 8px;">
                                Tested before deployed</h3>
                            <p
                                style="font-family: var(--font-main); font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0;">
                                Every configuration runs through scenario libraries, normal operations, edge cases,
                                failures, before production.</p>
                        </div>
                    </div>

                    <!-- Point 2 -->
                    <div style="border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 40px; display: flex; flex-direction: column; min-height: 400px; position: relative; transition: background 0.3s;"
                        onmouseover="this.style.background='rgba(255,255,255,0.02)'"
                        onmouseout="this.style.background='transparent'">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.2</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <ellipse cx="100" cy="140" rx="60" ry="18" fill="rgba(16, 185, 129, 0.05)"
                                    stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1"
                                    style="animation: ent-float-up-down 5s ease-in-out infinite;" />
                                <text x="170" y="145" font-family="monospace" font-size="8" fill="#10b981"
                                    text-anchor="start">LVL.1</text>

                                <ellipse cx="100" cy="100" rx="45" ry="14" fill="rgba(245, 158, 11, 0.05)"
                                    stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" stroke-dasharray="4 2"
                                    style="animation: ent-float-up-down 4s ease-in-out infinite; animation-delay: 0.5s;" />
                                <text x="155" y="105" font-family="monospace" font-size="8" fill="#f59e0b"
                                    text-anchor="start">LVL.2</text>

                                <ellipse cx="100" cy="60" rx="30" ry="10" fill="rgba(239, 68, 68, 0.05)"
                                    stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <rect x="96" y="45" width="8" height="8" rx="1" fill="rgba(239, 68, 68, 0.2)"
                                    stroke="#ef4444" strokeWidth="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <path d="M98,45 V42 C98,40 102,40 102,42 V45" fill="none" stroke="#ef4444"
                                    strokeWidth="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <text x="140" y="65" font-family="monospace" font-size="8" fill="#ef4444"
                                    text-anchor="start">REQ_AUTH</text>

                                <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1"
                                    stroke-dasharray="2 2" />
                            </svg>
                        </div>

                        <div style="margin-top: auto;">
                            <h3
                                style="font-family: var(--font-main); font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 8px;">
                                Graduated authority</h3>
                            <p
                                style="font-family: var(--font-main); font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0;">
                                Define what executes automatically. Define what requires approval. The system respects
                                boundaries.</p>
                        </div>
                    </div>

                    <!-- Point 3 -->
                    <div style="border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 40px; display: flex; flex-direction: column; min-height: 400px; position: relative; transition: background 0.3s;"
                        onmouseover="this.style.background='rgba(255,255,255,0.02)'"
                        onmouseout="this.style.background='transparent'">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.3</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M40,140 L80,100 L120,100 L160,60" stroke="rgba(255, 255, 255, 0.25)"
                                    strokeWidth="1" stroke-dasharray="3 3"
                                    style="animation: ent-dash-flow 2s linear infinite;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <polygon points="40,140 55,130 40,120 25,130" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="25,130 40,140 40,155 25,145" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="40,140 55,130 55,145 40,155" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <circle cx="40" cy="130" r="2" fill="#3b82f6"
                                        style="color: #3b82f6; animation: ent-pulse-glow 1.5s infinite;" />
                                </g>

                                <g
                                    style="animation: ent-float-up-down 4.5s ease-in-out infinite; animation-delay: 0.3s;">
                                    <polygon points="100,100 115,90 100,80 85,90" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="85,90 100,100 100,115 85,105" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="100,100 115,90 115,105 100,115" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <circle cx="100" cy="90" r="2" fill="#3b82f6"
                                        style="color: #3b82f6; animation: ent-pulse-glow 1.5s infinite; animation-delay: 0.3s;" />

                                    <rect x="85" y="60" width="30" height="12" rx="2" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="rgba(59, 130, 246, 0.3)" />
                                    <text x="100" y="69" font-family="monospace" font-size="7" fill="#3b82f6"
                                        text-anchor="middle">14:02:44</text>
                                </g>

                                <g
                                    style="animation: ent-float-up-down 3.5s ease-in-out infinite; animation-delay: 0.6s;">
                                    <polygon points="160,60 175,50 160,40 145,50" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="145,50 160,60 160,75 145,65" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <polygon points="160,60 175,50 175,65 160,75" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" strokeWidth="1" />
                                    <circle cx="160" cy="50" r="2" fill="#3b82f6"
                                        style="color: #3b82f6; animation: ent-pulse-glow 1.5s infinite; animation-delay: 0.6s;" />
                                </g>
                            </svg>
                        </div>

                        <div style="margin-top: auto;">
                            <h3
                                style="font-family: var(--font-main); font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 8px;">
                                Complete evidence chains</h3>
                            <p
                                style="font-family: var(--font-main); font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0;">
                                Every decision logged with reasoning, timestamps, approvals. Export-ready for legal,
                                compliance, insurers.</p>
                        </div>
                    </div>

                    <!-- Point 4 -->
                    <div style="border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 40px; display: flex; flex-direction: column; min-height: 400px; position: relative; transition: background 0.3s;"
                        onmouseover="this.style.background='rgba(255,255,255,0.02)'"
                        onmouseout="this.style.background='transparent'">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.4</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M50,130 C50,60 150,60 150,130" stroke="rgba(16, 185, 129, 0.4)"
                                    strokeWidth="1" stroke-dasharray="4 2" fill="rgba(16, 185, 129, 0.05)"
                                    style="color: #10b981; animation: ent-pulse-glow 4s infinite;" />

                                <ellipse cx="100" cy="130" rx="60" ry="15" fill="rgba(16, 185, 129, 0.05)"
                                    stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                                <ellipse cx="100" cy="130" rx="80" ry="20" stroke="rgba(255, 255, 255, 0.25)"
                                    strokeWidth="1" stroke-dasharray="3 3"
                                    style="animation: ent-spin-slow 20s linear infinite; transform-origin: 100px 130px;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <rect x="85" y="80" width="30" height="40" rx="2" fill="rgba(16, 185, 129, 0.1)"
                                        stroke="#10b981" strokeWidth="1" />
                                    <line x1="85" y1="90" x2="115" y2="90" stroke="#10b981" strokeWidth="1" />
                                    <line x1="85" y1="100" x2="115" y2="100" stroke="#10b981" strokeWidth="1" />
                                    <line x1="85" y1="110" x2="115" y2="110" stroke="#10b981" strokeWidth="1" />

                                    <circle cx="100" cy="65" r="4" stroke="#10b981" strokeWidth="1.5" fill="none" />
                                    <line x1="100" y1="69" x2="100" y2="76" stroke="#10b981" strokeWidth="1.5" />
                                    <line x1="100" y1="74" x2="104" y2="74" stroke="#10b981" strokeWidth="1.5" />
                                </g>

                                <path d="M100,130 L160,130 A60,15 0 0,0 100,115 Z" fill="rgba(16, 185, 129, 0.2)"
                                    style="animation: ent-spin-slow 4s linear infinite; transform-origin: 100px 130px;" />
                            </svg>
                        </div>

                        <div style="margin-top: auto;">
                            <h3
                                style="font-family: var(--font-main); font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 8px;">
                                Sovereign-ready</h3>
                            <p
                                style="font-family: var(--font-main); font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0;">
                                Regional data residency. Customer-managed keys. Air-gapped options. Built for regulated
                                environments.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subtle background effect -->
            <div
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%); pointer-events: none; z-index: 1;">
            </div>
        </section>

        <!-- Compliance Automates Section -->
        <section class="section reveal-section" id="compliance-automates"
            style="padding: 140px 20px 180px; position: relative; z-index: 5; overflow: hidden; border-top: 1px solid rgba(255,255,255,0.04);">

            <!-- Dynamic Animated Breathing Background Layer -->
            <div
                style="position: absolute; inset: -150px 0 -150px 0; background: linear-gradient(180deg, rgba(11, 13, 15, 0) 0%, rgba(11, 13, 15, 0) 35%, rgba(250, 245, 235, 0.95) 92%, #FAF5EB 100%); z-index: -1; animation: secDemoBreath 4.5s ease-in-out infinite alternate;">
            </div>

            <style>
                .comp-grid-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    border-top: 1px solid rgba(0, 0, 0, 0.08);
                    border-left: 1px solid rgba(0, 0, 0, 0.08);
                    position: relative;
                }

                .comp-grid-cell {
                    border-right: 1px solid rgba(0, 0, 0, 0.08);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                    padding: 48px;
                    display: flex;
                    flex-direction: column;
                    min-height: 420px;
                    position: relative;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(12px);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .comp-grid-cell:hover {
                    background: rgba(255, 255, 255, 0.6);
                    box-shadow: inset 0 0 0 1px rgba(139, 92, 246, 0.1);
                }

                .comp-label {
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                    color: rgba(0, 0, 0, 0.4);
                    text-transform: uppercase;
                }

                .comp-title {
                    font-family: var(--font-main);
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 12px;
                }

                .comp-desc {
                    font-family: var(--font-main);
                    font-size: 1.05rem;
                    color: #4B5563;
                    line-height: 1.6;
                    margin: 0;
                }

                @keyframes comp-dash-flow {
                    to {
                        stroke-dashoffset: -20;
                    }
                }

                @keyframes comp-float {

                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-6px);
                    }
                }

                @keyframes comp-pulse {

                    0%,
                    100% {
                        opacity: 0.6;
                    }

                    50% {
                        opacity: 1;
                        filter: drop-shadow(0 0 8px currentColor);
                    }
                }

                @keyframes comp-spin {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }
            </style>

            <div style="max-width: 1280px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 2;">

                <!-- Header (Dark area) -->
                <div style="text-align: center; margin-bottom: 80px;">
                    <span class="ent-pill"
                        style="margin-bottom: 1.5rem; display: inline-flex; align-items: center; background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #10B981;">
                        <span
                            style="margin-right: 8px; display: inline-flex; align-items: center; filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.45));">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                        <span style="font-family: var(--font-mono); font-weight: 600; letter-spacing: 1px;">COMPLIANCE
                            AUTOMATES</span>
                    </span>

                    <h2 class="main-heading cinematic-reveal-title"
                        style="font-size: 48px; line-height: 1.05; margin-bottom: 24px; color: #ffffff;">Audit-ready as
                        a<br>default state</h2>
                    <p class="body-text"
                        style="font-family: var(--font-mono); font-size: 14px; color: rgba(255,255,255,0.65); max-width: 650px; margin: 0 auto 40px; line-height: 1.6;">
                        When operations flow through a unified system, compliance documentation is automatic. No
                        scrambling, no manual logging.
                    </p>
                </div>

            </div>

    </div>
    </section>

    <div class="ent-section-divider"></div>

    <!-- Global Threat Ticker -->
    <div class="global-ticker">
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



      ` }} />
    </div>
  )
}
