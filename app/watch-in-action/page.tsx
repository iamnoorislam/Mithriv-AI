'use client';

import React, { useEffect, useState } from 'react';
import { Boxes } from '@/components/ui/background-boxes';
import '../style.css';

export default function WatchInActionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let active = true;

    // Hide Preloaders
    const hidePreloaders = () => {
      if (!active) return;
      const preloader1 = document.getElementById('premium-preloader');
      if (preloader1) {
        preloader1.style.opacity = '0';
        setTimeout(() => {
          if (active && preloader1) preloader1.style.display = 'none';
        }, 500);
      }
      const preloader2 = document.querySelector('.preloader');
      if (preloader2) {
        (preloader2 as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          if (active && preloader2) (preloader2 as HTMLElement).style.display = 'none';
        }, 500);
      }
    };
    setTimeout(() => {
      if (active) hidePreloaders();
    }, 800);

    // 1. Initialize HubSpot Form
    let hubspotTimer: NodeJS.Timeout;
    const initHubSpotForm = () => {
      if (!active) return;
      const container = document.getElementById('hubspotFormContainer');
      const w = window as any;
      if (!container || typeof window === 'undefined' || !w.hbspt) {
        hubspotTimer = setTimeout(initHubSpotForm, 100);
        return;
      }
      container.innerHTML = '';
      w.hbspt.forms.create({
        portalId: "22574161",
        formId: "368c20af-14fb-43c0-87ee-d23017530ed8",
        region: "na2",
        target: "#hubspotFormContainer"
      });
    };
    initHubSpotForm();

    // 2. Initialize GSAP entrance animations
    let gsapTimer: NodeJS.Timeout;
    const initGsapEntrance = () => {
      if (!active) return;
      const w = window as any;
      if (typeof w.gsap === 'undefined') {
        gsapTimer = setTimeout(initGsapEntrance, 100);
        return;
      }
      w.gsap.to('.watch-reveal', {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5
      });
    };
    initGsapEntrance();

    return () => {
      active = false;
      clearTimeout(hubspotTimer);
      clearTimeout(gsapTimer);
      
      const w = window as any;
      if (w.gsap) {
        w.gsap.killTweensOf('.watch-reveal');
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="landing-theme relative flex flex-col lg:flex-row min-h-screen w-full bg-[#07080a] overflow-x-hidden">
      
      {/* Left Partition: Brand Display with Background Boxes animation */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 min-h-[50vh] lg:h-screen bg-[#040507]/90 lg:border-r border-[#1A1C1E] overflow-hidden py-16 lg:py-0 select-none">
        
        {/* Background Boxes Animation */}
        <Boxes />

        <div className="text-center relative z-10">
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Mithriv
          </h1>
          <p className="mt-4 text-xs font-mono text-zinc-500 uppercase tracking-[0.25em]">
            Conscious Security
          </p>
        </div>
      </div>

      {/* Right Partition: HubSpot Form */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[50vh] lg:h-screen bg-[#07080a]/95 p-8 lg:p-16 overflow-y-auto py-16 lg:py-0">
        <div className="w-full max-w-[380px]">
          {/* Header section matching premium modal aesthetic with GSAP animation classes */}
          <div 
            className="hs-modal-header watch-reveal mb-10 text-left" 
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h3 className="hs-modal-title text-4xl font-semibold mb-3 text-white tracking-tight">
              Experience Mithriv
            </h3>
            <p className="hs-modal-desc text-sm font-mono text-zinc-400">
              See the autonomous security platform in action.
            </p>
          </div>
          
          {/* HubSpot form container with custom override styling classes */}
          <div 
            className="hs-form-container watch-reveal w-full relative" 
            id="hubspotFormContainer" 
            style={{ opacity: 0, transform: 'scale(0.95)' }}
          />
        </div>
      </div>

    </main>
  );
}
