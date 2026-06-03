'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'

export default function NotFoundPage() {
  useEffect(() => {

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

    // Trigger any global initialization if needed
    if (typeof window !== 'undefined') {
       // custom initialization
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@3.3.0/tsparticles.slim.bundle.min.js" strategy="lazyOnload" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="lazyOnload" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="lazyOnload" />
      <Script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="lazyOnload" />
      <Script src="/main.js" strategy="lazyOnload" />
      
      
      <style dangerouslySetInnerHTML={{ __html: `\n/* INJECTED STYLES */\n
        .error-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            padding: 2rem;
        }

        .error-code {
            font-size: 8rem;
            font-weight: 800;
            line-height: 1;
            color: var(--accent-pink);
            font-family: var(--font-mono);
            margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(255, 51, 102, 0.3);
        }

        .error-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 1.5rem;
        }

        .error-text {
            font-size: 1.2rem;
            color: var(--text-muted);
            max-width: 500px;
            margin-bottom: 3rem;
            line-height: 1.6;
        }

        .home-btn {
            display: inline-block;
            text-decoration: none;
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `<main className="error-section">
        <div className="error-code">404</div>
        <h1 className="error-title">Signal Lost</h1>
        <p className="error-text">The protocol you are trying to access has been disconnected or does not exist. Please return to the main operations hub.</p>
        <a href="/" className="home-btn sys-btn cta-pulse">[ RETURN_TO_BASE ]</a>
    </main>

    <!-- Global Threat Ticker -->
    <div className="global-ticker">
        <div className="ticker-content">
            <span>> [SYS_OK] Perimeter Secure</span><span className="ticker-sep">|</span>
            <span>> [NET] Latency: 12ms</span><span className="ticker-sep">|</span>
            <span>> [AI_CORE] 0 Missed Alerts</span><span className="ticker-sep">|</span>
            <span>> [AGENT_04] Executing Protocols</span><span className="ticker-sep">|</span>
            <span>> [NODE_9] 100% Uptime</span><span className="ticker-sep">|</span>
            <span>> [SYS_OK] Perimeter Secure</span><span className="ticker-sep">|</span>
            <span>> [NET] Latency: 12ms</span><span className="ticker-sep">|</span>
            <span>> [AI_CORE] 0 Missed Alerts</span><span className="ticker-sep">|</span>
            <span>> [AGENT_04] Executing Protocols</span><span className="ticker-sep">|</span>
            <span>> [NODE_9] 100% Uptime</span>
        </div>
    </div>
` }} />
    </>
  )
}
