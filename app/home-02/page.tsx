'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import '../style.css'

export default function Home02Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      if (w.runMain && w.runScenarioPopup && w.runConsoleSimulation02 && w.runDotCanvas02 && w.runDottedSurface && w.runSparkles && w.gsap && w.ScrollTrigger && typeof w.Lenis !== 'undefined' && w.THREE && w.tsParticles) {
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
      <div dangerouslySetInnerHTML={{ __html: `
    <div class="global-grid-bg" id="globalGridBg"></div>
    <main class="hero-section" id="hero">
        <!-- Three.js Dotted Surface Background -->
        <div id="dotted-surface-container"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 130%; z-index: 0; pointer-events: none;">
        </div>

        <!-- Hero Content -->
        <div class="hero-content">
            <div class="ent-pill">Conscious Security</div>
            <h1 class="main-heading">Intelligence that secures<br>your physical world</h1>
            <p class="body-text"
                style="margin-bottom: 2.5rem; max-width: 650px; margin-left: auto; margin-right: auto;">
                Mithriv is the AI execution layer that knows your sites, correlates across systems, and acts in real
                time, turning storms into intentional responses.
            </p>
            <a href="#" class="ent-btn-primary"
                style="font-family: var(--font-main); padding: 12px 24px; font-size: 0.95rem; position: relative; z-index: 20; display: inline-flex;">Request
                Consultation</a>
        </div>
    </main>

    <div id="content-wrapper" style="position: relative; z-index: 10; background: var(--bg-base);">
        <!-- Global Background Elements -->
        <div class="grain-overlay"></div>

        <!-- Section: Aceternity Sparkles Design -->
        <section class="section sparkles-section"
            style="position: relative; z-index: 5; background: #0E0F11; overflow: hidden; min-height: 100vh; display: none; flex-direction: column;">

            <div style="margin: 128px auto 0; width: 100%; max-width: 800px; position: relative; z-index: 20;">
                <div style="text-align: center; font-size: 48px; line-height: 1.2; font-weight: 600; color: #ffffff;">
                    <span style="color: #A8B1FF;">
                        Trusted by experts.
                    </span>
                    <br />
                    <span>Used by the leaders.</span>
                </div>

                <div
                    style="margin-top: 64px; display: flex; justify-content: space-between; align-items: center; color: #ffffff; padding: 0 40px; gap: 32px; flex-wrap: wrap;">
                    <!-- Retool -->
                    <svg viewBox="0 0 180 56" fill="currentColor" style="height: 32px; width: auto;">
                        <path
                            d="M34 18.2a2.2 2.2 0 012.2-2.2h8.6a2.2 2.2 0 012.2 2.2v1.7a1.1 1.1 0 01-1.1 1.1H35.1a1.1 1.1 0 01-1.1-1.1v-1.7zM34 25.1a1.1 1.1 0 011.1-1.1h20.7a2.2 2.2 0 012.2 2.2v5.7a1.1 1.1 0 01-1.1 1.1H36.2a2.2 2.2 0 01-2.2-2.2v-5.7zM45 37.1a1.1 1.1 0 011.1-1.1h10.8a1.1 1.1 0 011.1 1.1v.7a2.2 2.2 0 01-2.2 2.2h-8.6a2.2 2.2 0 01-2.2-2.2v-.7zM71.596 30.741h2.311l4.293 7.017h5.256l-4.76-7.512c2.641-.909 4.182-2.945 4.182-5.89 0-4.127-2.89-6.356-7.54-6.356H67v19.758h4.596v-7.017zm0-3.742V21.88h3.494c2.174 0 3.275.936 3.275 2.56 0 1.595-1.1 2.558-3.275 2.558h-3.494zM91.363 38.06c2.89 0 5.531-1.458 6.605-4.237L94.28 32.64c-.413 1.266-1.486 1.926-2.862 1.926-1.678 0-2.862-1.128-3.164-3.11h9.824v-1.155c0-4.1-2.395-7.348-6.797-7.348-4.183 0-7.265 3.247-7.265 7.54 0 4.513 2.972 7.568 7.347 7.568zm-.138-11.694c1.624 0 2.477 1.1 2.505 2.394H88.39c.44-1.596 1.486-2.394 2.834-2.394zM100.573 33.878c0 2.972 1.569 4.018 4.706 4.018 1.046 0 1.871-.083 2.642-.193v-3.605c-.496.055-.743.083-1.266.083-1.101 0-1.734-.22-1.734-1.431v-5.862h2.834v-3.632h-2.834v-4.018h-4.348v4.018h-1.844v3.632h1.844v6.99zM123.672 30.52c0-4.512-3-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.265 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962s2.89 1.431 2.89 3.963-1.129 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM139.527 30.52c0-4.512-2.999-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.266 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962 1.762 0 2.89 1.431 2.89 3.963s-1.128 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM146 18h-4.403v19.758H146V18z" />
                    </svg>
                    <!-- Vercel -->
                    <svg viewBox="0 0 180 54" fill="currentColor" style="height: 32px; width: auto;">
                        <path
                            d="M89.515 20.5c-4.424 0-7.614 2.925-7.614 7.313 0 4.387 3.59 7.312 8.014 7.312 2.673 0 5.03-1.072 6.488-2.88l-3.066-1.796c-.81.898-2.04 1.422-3.422 1.422-1.919 0-3.55-1.016-4.155-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.19-7.308-7.613-7.308zm-3.791 5.89c.5-1.62 1.871-2.64 3.787-2.64 1.919 0 3.29 1.02 3.786 2.64h-7.573zm46.938-5.89c-4.424 0-7.613 2.925-7.613 7.313 0 4.387 3.59 7.312 8.014 7.312 2.672 0 5.028-1.072 6.487-2.88l-3.065-1.796c-.81.898-2.04 1.422-3.422 1.422-1.92 0-3.551-1.016-4.156-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.189-7.308-7.613-7.308zm-3.787 5.89c.501-1.62 1.872-2.64 3.787-2.64 1.919 0 3.29 1.02 3.787 2.64h-7.574zm-15.639 1.422c0 2.438 1.571 4.063 4.007 4.063 1.651 0 2.889-.76 3.526-1.999l3.078 1.8c-1.275 2.153-3.663 3.449-6.604 3.449-4.428 0-7.613-2.925-7.613-7.313 0-4.387 3.189-7.312 7.613-7.312 2.941 0 5.325 1.296 6.604 3.45l-3.078 1.799c-.637-1.24-1.875-1.999-3.526-1.999-2.432 0-4.007 1.625-4.007 4.063zm33.05-11.78v18.687h-3.607V16.03h3.607zM47.806 14l14.806 26H33l14.806-26zm37.016 2.031l-11.103 19.5-11.103-19.5h4.163l6.94 12.188 6.94-12.188h4.163zm23.606 4.875v3.937a4.517 4.517 0 00-1.283-.2c-2.328 0-4.007 1.626-4.007 4.063v6.013h-3.606V20.906h3.606v3.738c0-2.064 2.369-3.738 5.29-3.738z" />
                    </svg>
                    <!-- Remote -->
                    <svg viewBox="0 0 180 56" fill="currentColor" style="height: 32px; width: auto;">
                        <path
                            d="M51.1294 35.0449H51.4609V41H50.4859C44.1484 41 40.4825 37.3997 40.4825 31.503V28.4671L42.5495 27.9416C43.1539 27.7859 43.6999 27.4746 44.1289 27.0269C44.5579 26.5793 44.8504 26.015 44.9869 25.4117C45.1234 24.8084 45.0649 24.1662 44.8504 23.5823C44.6359 22.9985 44.2654 22.4925 43.7779 22.1033C43.2905 21.7141 42.7055 21.4805 42.0815 21.4222C41.4575 21.3638 40.8335 21.4611 40.2875 21.7335C39.722 22.006 39.254 22.4341 38.9225 22.9596C38.591 23.485 38.4155 24.0883 38.4155 24.7111V37.6916H32V24.497C32 24.1078 32.0195 23.6991 32.078 23.3099C32.6825 18.6198 36.7775 15 41.7305 15C46.2349 15 50.0179 17.9775 51.1294 22.0254C51.7144 24.1467 51.5194 26.4042 50.6029 28.4087C49.8229 30.1018 48.5554 31.5225 46.9759 32.4955C47.5219 34.6557 48.6334 35.0449 51.1294 35.0449ZM67.0023 23.6018V27.241H66.3978C65.1498 27.241 64.1749 27.5913 63.4729 28.2725C62.7709 28.9536 62.4199 29.8877 62.4199 31.0749V37.6332H58.8904V23.8159H62.4199V25.6063C63.4729 24.2635 64.7989 23.6018 66.3978 23.6018H67.0023ZM82.1538 32.009H71.4483C71.6628 32.8458 72.1698 33.5853 72.8718 34.0913C73.6128 34.6168 74.5098 34.8892 75.4068 34.8503C76.1673 34.8503 76.9278 34.6946 77.6103 34.3638C78.2343 34.0913 78.7803 33.6632 79.1898 33.1377L81.5493 35.2006C80.8083 36.0763 79.8723 36.7769 78.8193 37.244C77.7078 37.7305 76.4988 37.9835 75.2703 37.9641C73.9053 37.9835 72.5403 37.6527 71.3313 37.0105C70.1808 36.4072 69.2448 35.4925 68.5818 34.3832C67.9383 33.2545 67.5873 31.9895 67.5873 30.7051C67.5873 29.4207 67.9188 28.1362 68.5428 27.0075C69.1668 25.9177 70.0833 25.0225 71.1948 24.4192C72.3453 23.7964 73.6323 23.4656 74.9388 23.485C77.0058 23.485 78.7413 24.1662 80.1258 25.5479C81.5103 26.9296 82.2123 28.6617 82.2123 30.744C82.2513 31.1722 82.2123 31.5808 82.1538 32.009ZM77.1813 27.3578C76.5378 26.8518 75.7578 26.5793 74.9388 26.5793C74.1198 26.5793 73.3398 26.8518 72.6963 27.3578C72.0528 27.8832 71.6043 28.6228 71.4093 29.4207H78.4683C78.2928 28.6033 77.8248 27.8832 77.1813 27.3578ZM104.852 24.9057C105.788 25.8398 106.275 27.0853 106.275 28.6617V37.6527H102.746V29.7126C102.746 28.8563 102.492 28.1946 102.005 27.6886C101.517 27.1826 100.854 26.9296 100.035 26.9296C99.1772 26.9296 98.4752 27.1826 97.9292 27.7081C97.3832 28.2335 97.1297 28.9147 97.1297 29.771V37.6527H93.6002V29.7126C93.6002 28.8757 93.3467 28.1946 92.8592 27.6886C92.3522 27.1826 91.6892 26.9296 90.8702 26.9296C90.4802 26.9102 90.1097 26.9686 89.7392 27.1048C89.3882 27.241 89.0567 27.4551 88.7642 27.7081C88.4912 27.9805 88.2767 28.2919 88.1402 28.6617C88.0037 29.012 87.9452 29.4012 87.9452 29.771V37.6527H84.4158V23.8353H87.9647V25.256C88.9982 24.0883 90.3632 23.5045 92.0597 23.5045C92.9567 23.485 93.8342 23.6796 94.6337 24.0883C95.3747 24.4775 95.9792 25.0419 96.4082 25.7425C97.5587 24.244 99.1187 23.485 101.108 23.485C102.668 23.5045 103.916 23.9716 104.852 24.9057ZM123.143 30.7246C123.143 32.7874 122.441 34.5 121.017 35.8817C119.594 37.2635 117.839 37.9641 115.713 37.9446C113.607 37.9446 111.833 37.244 110.409 35.8623C108.986 34.4805 108.264 32.768 108.264 30.7051C108.264 28.6422 108.986 26.9296 110.409 25.5479C111.833 24.1662 113.607 23.4656 115.713 23.4656C117.819 23.4656 119.594 24.1662 121.017 25.5479C122.441 26.9491 123.162 28.6811 123.143 30.7246ZM118.443 33.4686C119.126 32.729 119.516 31.756 119.516 30.744C119.516 29.732 119.126 28.759 118.443 28.0195C118.092 27.6692 117.663 27.3772 117.195 27.1826C116.727 26.988 116.24 26.8907 115.733 26.8907C115.226 26.8907 114.738 26.988 114.27 27.1826C113.802 27.3772 113.373 27.6497 113.022 28.0195C112.32 28.759 111.93 29.732 111.93 30.744C111.93 31.756 112.32 32.729 113.022 33.4686C113.744 34.1692 114.719 34.5584 115.733 34.5584C116.747 34.5389 117.722 34.1497 118.443 33.4686ZM129.597 27.0464V32.7874C129.597 33.9746 130.241 34.5584 131.508 34.5584C132.132 34.5389 132.756 34.3832 133.322 34.0913V37.3802C132.522 37.7889 131.645 38.003 130.748 37.9835C129.207 37.9835 128.037 37.5749 127.257 36.7575C126.477 35.9401 126.087 34.8114 126.087 33.3713V27.0659H123.884V23.8548H126.087V21.5584L129.617 20.3518V23.8548H133.341V27.0659H129.597V27.0464ZM148.921 32.009H138.216C138.431 32.8458 138.938 33.5853 139.64 34.0913C140.381 34.6168 141.278 34.8892 142.175 34.8503C142.935 34.8503 143.695 34.6946 144.378 34.3638C145.002 34.0913 145.548 33.6632 145.977 33.1377L148.336 35.2006C147.595 36.0763 146.659 36.7769 145.606 37.244C144.495 37.7305 143.286 37.9835 142.058 37.9641C140.693 37.9835 139.328 37.6527 138.119 37.0105C136.968 36.4072 136.032 35.4925 135.369 34.3832C134.726 33.2545 134.375 31.9895 134.375 30.7051C134.375 29.4207 134.706 28.1362 135.33 27.0075C135.954 25.9177 136.871 25.0225 137.982 24.4192C139.133 23.7964 140.42 23.4656 141.726 23.485C143.793 23.485 145.528 24.1662 146.913 25.5479C148.297 26.9296 148.999 28.6617 148.999 30.744C148.999 31.1722 148.98 31.6003 148.921 32.009ZM143.949 27.3578C143.305 26.8518 142.526 26.5793 141.707 26.5793C140.888 26.5793 140.108 26.8518 139.464 27.3578C138.821 27.8832 138.372 28.6228 138.177 29.4207H145.236C145.06 28.6033 144.592 27.8832 143.949 27.3578Z" />
                    </svg>
                    <!-- Arc -->
                    <svg viewBox="0 0 180 56" fill="currentColor" style="height: 32px; width: auto;">
                        <path
                            d="M133.969 31.642a.918.918 0 00-.673.287c-.909.938-2.098 1.51-3.483 1.51a4.803 4.803 0 01-2.232-.546c-1.814-.947-2.987-3.015-2.661-5.319.356-2.529 2.567-4.411 5.045-4.338 1.322.04 2.457.604 3.334 1.509a.914.914 0 00.672.286c.554 0 1.029-.49 1.029-1.02 0-.247-.078-.53-.278-.735a6.742 6.742 0 00-4.277-2.055c-3.913-.348-7.435 2.84-7.557 6.886-.122 4.066 3.01 7.374 6.925 7.374 1.94 0 3.642-.777 4.909-2.081.198-.204.278-.49.278-.734-.002-.533-.478-1.023-1.031-1.023zM116.535 29.095c1.283-.735 2.135-2.1 2.094-3.77-.055-2.325-1.995-4.135-4.25-4.135h-6.239c-.546 0-.989.457-.989 1.02v11.883c0 .519.358.995.856 1.052.616.07 1.123-.356 1.123-.974V31.58c0-.2.131-.372.317-.42l3.506-.895 1.447-.38a.415.415 0 01.484.238l1.959 4.44c.16.365.507.58.872.58a.96.96 0 00.632-.244c.33-.288.399-.788.22-1.193l-2.032-4.61zm-7.405-.42v-5.093c0-.24.188-.431.418-.431h4.767c1.384 0 2.335.98 2.335 2.288 0 1.307-.779 2.251-2.37 2.602l-4.643 1.056a.421.421 0 01-.507-.422zM96.89 21.967c-.21-.455-.655-.727-1.192-.727-.537 0-.983.272-1.192.725l-5.462 11.742c-.071.145-.11.325-.11.488 0 .557.422.976.985.976a.944.944 0 00.895-.57l1.017-2.172a8.97 8.97 0 001.403.386c.792.151 1.59.203 2.377.194.79-.007 1.568-.104 2.335-.235.383-.066.76-.163 1.141-.243l.466-.133 1.024 2.188a.956.956 0 00.903.587c.638 0 .982-.502.982-.975 0-.166-.041-.344-.105-.481l-5.467-11.75zm.757 9.04c-.686.117-1.38.205-2.066.21-.687.006-1.37-.036-2.03-.164a7.106 7.106 0 01-.962-.251l.82-1.755h-.003l1.913-4.085a.413.413 0 01.753 0l1.761 3.76.088.188.064.137.797 1.707-.11.031c-.34.074-.68.164-1.025.223zM77.035 23.307c.212-1.058.044-2.13-.468-3.019-.592-1.023-1.538-1.714-2.668-1.946a3.901 3.901 0 00-.808-.08c-1.92 0-3.536 1.387-3.931 3.371a9.394 9.394 0 01-1.183 3.015.11.11 0 01-.1.054.113.113 0 01-.1-.069l-3.765-8.17c-.521-1.129-1.449-1.967-2.546-2.298-1.876-.569-3.922.376-4.762 2.197l-3.897 8.449a.048.048 0 01-.043.028c-.028 0-.033-.016-.037-.028-.618-1.575-2.08-2.593-3.729-2.593-.533 0-1.054.109-1.55.322-.992.426-1.756 1.24-2.158 2.292a4.375 4.375 0 00.032 3.214c.737 1.818 1.97 3.573 3.566 5.074.039.036.05.09.027.138l-1.258 2.732c-.95 2.063-.151 4.556 1.78 5.56a3.9 3.9 0 001.813.448c1.543 0 2.97-.929 3.633-2.366l1.086-2.356a.112.112 0 01.135-.062 14.83 14.83 0 004.025.578c1.458 0 2.942-.223 4.404-.66a.111.111 0 01.136.061l1.074 2.333c.69 1.494 2.124 2.464 3.66 2.474h.023a3.87 3.87 0 001.812-.447c1.93-1.005 2.728-3.505 1.772-5.575l-1.357-2.934a.12.12 0 01.028-.137c2.742-2.617 4.643-6.026 5.354-9.6zM54.201 36.69l-.98 2.126a2.19 2.19 0 01-1.975 1.286c-.338 0-.664-.078-.97-.234-1.06-.543-1.492-1.916-.964-3.065l1.045-2.268a.122.122 0 01.108-.071c.018 0 .041.005.062.021a17.81 17.81 0 003.61 2.044c.04.016.06.05.066.068a.107.107 0 01-.002.093zm9.565-1.345a.108.108 0 01-.07.061c-1.19.325-2.391.49-3.571.49-5.465 0-11.24-3.817-13.15-8.688-.45-1.15.09-2.465 1.206-2.931.261-.11.537-.166.817-.166.896 0 1.69.552 2.025 1.409 1.247 3.183 5.417 5.873 9.102 5.873.555 0 1.125-.055 1.694-.164.053-.01.106.014.127.064l1.82 3.947a.136.136 0 010 .105zm-4.468-6.183l.733-1.591a.273.273 0 01.252-.164.28.28 0 01.253.164l.716 1.553a.29.29 0 01-.007.26.27.27 0 01-.204.147 6.112 6.112 0 01-1.518.04.276.276 0 01-.213-.144.292.292 0 01-.012-.265zm11.09 10.706a2.108 2.108 0 01-.969.234 2.188 2.188 0 01-1.972-1.286l-6.578-14.27a.584.584 0 00-1.07 0l-2.04 4.426a.115.115 0 01-.137.064c-1.361-.483-2.638-1.295-3.596-2.282a.117.117 0 01-.018-.13l4.408-9.562c.148-.32.359-.578.609-.746.592-.4 1.265-.519 1.899-.337a2.199 2.199 0 011.382 1.201l9.047 19.626c.53 1.146.096 2.52-.965 3.062zm.526-8.807a.123.123 0 01-.106.036.11.11 0 01-.082-.067l-1.929-4.186a.12.12 0 01.014-.123c1.09-1.443 1.837-3.086 2.16-4.755.205-1.05 1.103-1.812 2.138-1.812h.002c.177 0 .356.024.533.069 1.144.293 1.84 1.506 1.584 2.76-.613 3.001-2.103 5.793-4.314 8.078z" />
                    </svg>
                    <!-- Raycast -->
                    <svg viewBox="0 0 180 56" fill="currentColor" style="height: 32px; width: auto;">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M34.292 33.307v3.443L26 28.5l1.731-1.723 6.56 6.53zm3.46 3.443h-3.46L42.583 45l1.732-1.723-6.563-6.527zm19.68-6.527l1.73-1.723L42.58 12l-1.727 1.727 6.56 6.527h-3.964l-4.58-4.547-1.73 1.723 2.847 2.833h-1.99V33.07h12.871v-1.98l2.848 2.834 1.732-1.723-4.58-4.556V23.7l6.565 6.523zM35.155 19.396L33.42 21.12l1.858 1.848 1.731-1.723-1.853-1.848zm14.726 14.652l-1.73 1.723 1.856 1.848 1.732-1.723-1.858-1.848zM31.442 23.09l-1.732 1.723 4.58 4.556v-3.445l-2.848-2.834zm13.735 13.667h-3.46l4.579 4.556 1.731-1.723-2.85-2.833z">
                        </path>
                        <path
                            d="M151.74 36.73c-1.116 0-1.99-.301-2.613-.906-.624-.605-.936-1.446-.936-2.51v-6.6h-2.003v-2.471h2.014l.359-3.3h2.359v3.3H154v2.475h-3.08v6.237a1.3 1.3 0 00.356.92 1.22 1.22 0 00.94.38H154v2.475h-2.26zM139.691 36.963c-1.489 0-2.686-.353-3.593-1.06a4.739 4.739 0 01-1.74-2.816h2.961c.129.429.417.793.804 1.02a2.917 2.917 0 001.568.386c1.579 0 2.373-.44 2.373-1.29 0-.423-.249-.747-.745-.97a8.223 8.223 0 00-1.8-.534 22.253 22.253 0 01-2.125-.52 3.697 3.697 0 01-1.816-1.2c-.493-.587-.741-1.359-.743-2.315a3.264 3.264 0 011.252-2.616c.837-.695 1.998-1.042 3.483-1.04 1.484 0 2.663.33 3.537.99a4.415 4.415 0 011.679 2.666h-2.966c-.316-.781-1.061-1.18-2.242-1.181-1.267 0-1.899.393-1.899 1.18a1.016 1.016 0 00.533.88 3.55 3.55 0 001.327.472c.587.1 1.168.233 1.74.4.593.169 1.174.376 1.74.62a3.092 3.092 0 011.342 1.162 3.53 3.53 0 01.537 2 3.28 3.28 0 01-.333 1.517 3.307 3.307 0 01-.993 1.198c-.882.7-2.175 1.05-3.881 1.051zM130.862 25.257c-.912-.817-2.19-1.225-3.834-1.225-1.31 0-2.409.35-3.297 1.053a4.928 4.928 0 00-1.755 2.722h2.799c.142-.408.414-.76.774-1.001a2.488 2.488 0 011.481-.416c.77 0 1.376.198 1.82.59a2.081 2.081 0 01.663 1.645v.596h-3.206c-1.474 0-2.632.37-3.474 1.111a3.568 3.568 0 00-1.255 2.777 3.645 3.645 0 001.171 2.785c.779.733 1.811 1.1 3.096 1.1a4.748 4.748 0 002.291-.53 3.43 3.43 0 001.388-1.234h.115l.233 1.54h2.368v-8.14c-.005-1.429-.464-2.553-1.378-3.373zm-1.346 6.67a2.525 2.525 0 01-.83 1.98c-.549.486-1.3.73-2.251.73-.692 0-1.222-.158-1.587-.466a1.495 1.495 0 01-.553-1.19c0-1.1.723-1.646 2.14-1.646h3.081v.592zM114.473 36.99c-1.796 0-3.232-.574-4.307-1.72-1.074-1.148-1.612-2.735-1.614-4.762 0-2.022.536-3.608 1.608-4.756 1.071-1.148 2.509-1.722 4.313-1.72 1.466 0 2.68.388 3.644 1.166a5.532 5.532 0 011.92 2.954h-2.716a3.054 3.054 0 00-2.845-1.646 2.887 2.887 0 00-2.326 1.046c-.59.7-.885 1.685-.885 2.956 0 1.272.295 2.258.885 2.957a2.872 2.872 0 002.326 1.05 3.06 3.06 0 002.845-1.648h2.716a5.524 5.524 0 01-1.92 2.957c-.962.777-2.177 1.166-3.644 1.166zM98.455 41.476l1.895-4.717-5.088-12.487h2.96l3.434 8.837h.115l3.439-8.837h2.96l-6.872 17.204h-2.843zM92.704 25.257c-.913-.817-2.191-1.225-3.835-1.225-1.31 0-2.412.35-3.296 1.053a4.92 4.92 0 00-1.756 2.722h2.8c.14-.409.412-.76.773-1.001a2.48 2.48 0 011.482-.416c.769 0 1.376.197 1.82.59a2.074 2.074 0 01.663 1.645v.596h-3.207c-1.474 0-2.632.37-3.473 1.111a3.56 3.56 0 00-1.256 2.777 3.642 3.642 0 001.167 2.785c.779.733 1.81 1.1 3.096 1.1a4.745 4.745 0 002.29-.53 3.431 3.431 0 001.39-1.234h.114l.232 1.54h2.364v-8.14c0-1.429-.456-2.553-1.368-3.373zm-1.351 6.67a2.51 2.51 0 01-.83 1.98c-.548.487-1.298.73-2.25.73-.693 0-1.226-.156-1.588-.466a1.494 1.494 0 01-.553-1.19c.007-1.096.72-1.644 2.14-1.646h3.08v.592zM77.343 30.509c.422-.112.83-.272 1.216-.475a6.86 6.86 0 001.256-.88 4.036 4.036 0 001.046-1.54c.269-.69.401-1.425.39-2.165 0-1.57-.503-2.83-1.511-3.775-1.009-.946-2.32-1.418-3.936-1.415h-6.87v16.5h2.96v-6.122h2.247l4.267 6.122h3.317l-4.382-6.25zm-5.449-2.482v-5.17h3.669c.84 0 1.503.227 1.99.68.486.453.453.73 1.088.734 1.905 0 .817-.246 1.454-.739 1.91a2.784 2.784 0 01-1.961.675h-3.693z">
                        </path>
                    </svg>
                </div>
            </div>

            <!-- The Glow / Curve Container -->
            <div
                style="position: relative; margin-top: -128px; flex: 1; min-height: 384px; width: 100%; overflow: hidden; -webkit-mask-image: radial-gradient(50% 50% at 50% 50%, white, transparent); mask-image: radial-gradient(50% 50% at 50% 50%, white, transparent);">
                <!-- Radial Glow Background -->
                <div
                    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: radial-gradient(circle at bottom center, #8350e8, transparent 70%); opacity: 0.4;">
                </div>

                <!-- The Glowing Arc -->
                <div
                    style="position: absolute; left: -50%; top: 50%; width: 200%; aspect-ratio: 1 / 0.7; z-index: 10; border-radius: 100%; border-top: 1px solid rgba(255,255,255,0.2); background: #0E0F11;">
                </div>

                <!-- Sparkles Canvas Container -->
                <div id="tsparticles-sparkles"
                    style="position: absolute; left: 0; right: 0; bottom: 0; height: 100%; width: 100%; z-index: 5; -webkit-mask-image: radial-gradient(50% 50% at 50% 50%, white, transparent 85%); mask-image: radial-gradient(50% 50% at 50% 50%, white, transparent 85%); pointer-events: none;">
                </div>
            </div>

        </section>

        <!-- Section 2: Interactive Console Demo -->
        <section class="section sec-console-demo reveal-section"
            style="position: relative; z-index: 5; background: #0E0F11; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.15);">

            <!-- Glow & Sparkles Background (Straight Line) -->
            <div
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                <!-- Straight Line Bottom Glow -->
                <div
                    style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 600px; background: radial-gradient(ellipse at bottom center, rgba(131, 80, 232, 0.5), transparent 70%);">
                </div>
                <!-- Sparkles -->
                <div id="tsparticles-demo"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; -webkit-mask-image: radial-gradient(ellipse at bottom center, white, transparent 70%); mask-image: radial-gradient(ellipse at bottom center, white, transparent 70%);">
                </div>
            </div>

            <div class="container text-center" style="position: relative; z-index: 10;">
                <div class="ent-pill" style="margin: 0 auto 24px; display: flex; width: fit-content;">Live Autonomous
                    Response Simulation</div>
                <h2 class="pixel-heading" style="font-size: 48px; line-height: 1.1; margin-bottom: 24px;">Autonomous
                    Workplace Intelligence</h2>
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
                    --bg: #0e0f11;
                    --bg-sidebar: #141517;
                    --bg-hover: #1e1f22;
                    --bg-panel: #1a1b1e;
                    --bg-input: #1f2024;
                    --border: rgba(255, 255, 255, 0.08);
                    --border-light: rgba(255, 255, 255, 0.04);
                    --text-main: #e2e2e2;
                    --text-muted: #8a8f98;
                    --text-dark: #636871;
                    --accent: #7C3CD0;
                    --yellow: #f2c94c;

                    --sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    --mono: 'JetBrains Mono', monospace;

                    height: 800px;
                    overflow: hidden;
                    background: var(--bg);
                    color: var(--text-main);
                    font-family: var(--sans);
                    font-size: 13px;
                    position: relative;
                    border-radius: 12px;
                    margin: 40px auto 0;
                    max-width: 1280px;
                    border: 1px solid rgba(255, 255, 255, 0.12) !important;
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8), 0 0 120px rgba(124, 58, 237, 0.05);
                    text-align: left;
                }

                .user-dash-wrapper .shell {
                    display: flex;
                    height: 100%;
                }

                /* --- SIDEBAR --- */
                .user-dash-wrapper .sb {
                    width: 240px;
                    flex-shrink: 0;
                    background: var(--bg-sidebar);
                    border-right: none !important;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    padding-top: 8px;
                    z-index: 5;
                }

                .user-dash-wrapper .sb::-webkit-scrollbar {
                    width: 0;
                }

                .user-dash-wrapper .sb-header {
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 8px;
                    cursor: pointer;
                }

                .user-dash-wrapper .sb-header-icon {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
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
                    padding: 0 8px;
                    margin-bottom: 24px;
                }

                .user-dash-wrapper .sb-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 10px;
                    border-radius: 8px;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 400;
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
                    border-bottom: 1px solid var(--border);
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
                    padding: 48px;
                    overflow-y: auto;
                }

                .user-dash-wrapper .mid-col::-webkit-scrollbar {
                    width: 0;
                }

                .user-dash-wrapper .page-title {
                    font-size: 24px;
                    font-weight: 600;
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
                    width: 260px;
                    border-left: none !important;
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
                    background: var(--bg-input);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 4px 8px;
                    transition: all 0.5s;
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
                    background: rgba(255, 255, 255, 0.03) !important;
                    backdrop-filter: blur(12px) saturate(1.5) !important;
                    -webkit-backdrop-filter: blur(12px) saturate(1.5) !important;
                    border: 1px solid rgba(255, 255, 255, 0.32) !important;
                    color: #ffffff !important;
                    font-weight: 500;
                    border-radius: 20px !important;
                    padding: 8px 18px !important;
                    font-size: 12px !important;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 0 12px 1.5px rgba(255, 255, 255, 0.28) !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
                    margin-top: 8px;
                    margin-right: 6px;
                }

                .user-dash-wrapper .chat-action-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
                    transition: all 0.6s ease;
                    z-index: 1;
                }

                .user-dash-wrapper .chat-action-btn:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border-color: rgba(255, 255, 255, 0.48) !important;
                    transform: translateY(-2px) scale(1.03) !important;
                    box-shadow: inset 0 0 16px 2.5px rgba(255, 255, 255, 0.45) !important;
                }

                .user-dash-wrapper .chat-action-btn:hover::before {
                    left: 100%;
                }

                .user-dash-wrapper .chat-action-btn:active {
                    transform: translateY(1px) scale(0.98) !important;
                    box-shadow: inset 0 0 8px 1px rgba(255, 255, 255, 0.2) !important;
                }

                .user-dash-wrapper .chat-action-btn.primary {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #fff !important;
                    border: 1px solid rgba(255, 255, 255, 0.45) !important;
                    backdrop-filter: blur(12px) saturate(1.5) !important;
                    box-shadow: inset 0 0 14px 2px rgba(255, 255, 255, 0.35) !important;
                }

                .user-dash-wrapper .chat-action-btn.primary:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
                    border-color: rgba(255, 255, 255, 0.6) !important;
                    box-shadow: inset 0 0 18px 3px rgba(255, 255, 255, 0.5) !important;
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
                    background: var(--bg-hover);
                    border: 1px solid var(--border);
                    padding: 12px 16px;
                    border-radius: 12px;
                    color: var(--text-main);
                    font-size: 13px;
                    line-height: 1.5;
                }

                .user-dash-wrapper .cm.user .cm-bubble {
                    background: transparent;
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








                /* --- INPUT ANIMATED GLOW & STROKE (REFINED) --- */
                .user-dash-wrapper .cp-input-wrap {
                    position: relative;
                    border: 1px solid transparent !important;
                    background: transparent !important;
                    z-index: 1;
                }

                /* Outer Glow (Behind the box) */
                .user-dash-wrapper .cp-input-wrap::before {
                    content: '';
                    position: absolute;
                    inset: -3px;
                    border-radius: 10px;
                    background: linear-gradient(90deg, #ff007f, #8b5cf6, #00f0ff, #ff007f);
                    background-size: 200% auto;
                    animation: chatBgPan 1.5s linear infinite, cpGlowPulse 1.8s ease-in-out infinite alternate;
                    filter: blur(10px);
                    opacity: 0.4;
                    z-index: -2;
                    pointer-events: none;
                }

                /* Solid Box + Gradient Stroke (On top of glow, behind content) */
                .user-dash-wrapper .cp-input-wrap::after {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    background:
                        linear-gradient(#1f2024, #1f2024) padding-box,
                        linear-gradient(90deg, #ff007f, #8b5cf6, #00f0ff, #ff007f) border-box !important;
                    background-size: 200% auto !important;
                    animation: chatBgPan 1.5s linear infinite;
                    z-index: -1;
                    pointer-events: none;
                }

                /* Escalated state uses opaque background, static subtle white stroke, and highly transparent glow */
                .user-dash-wrapper .ai-escalated .cp-input-wrap::before {
                    animation: none !important;
                    opacity: 0 !important;
                    filter: none !important;
                }

                .user-dash-wrapper .ai-escalated .cp-input-wrap::after {
                    animation: none !important;
                    background:
                        linear-gradient(#0d0d0f, #0d0d0f) padding-box,
                        linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)) border-box !important;
                }

                @keyframes chatBgPan {
                    0% {
                        background-position: 0% 50%;
                    }

                    100% {
                        background-position: 200% 50%;
                    }
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
                    /* Pure optical distortion, no colors */
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
                        <div class="sb-header">
                            <div class="sb-header-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2L2 22h20L12 2z" />
                                </svg>
                            </div>
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
                                            <span class="code-tag"
                                                style="border-radius:12px;padding:2px 8px">Fire</span>
                                            <span class="code-tag" style="border-radius:12px;padding:2px 8px">Zone
                                                4</span>
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
                                                        <button class="chat-action-btn secondary"
                                                            onclick="simulateType('fire')">Fire</button>
                                                        <button class="chat-action-btn secondary"
                                                            onclick="simulateType('access')">Access</button>
                                                        <button class="chat-action-btn secondary"
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
                    <div class="feature-col-divider feature-col-divider-1"></div>
                    <div class="feature-col-divider feature-col-divider-2"></div>
                    <div class="feature-col-divider feature-col-divider-3"></div>

                    <!-- Feature 1 -->
                    <div class="feature-col-item">
                        <span class="fig-label">FIG 0.2</span>
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

                                    #hero .ent-btn-primary {
                                        backdrop-filter: none !important;
                                        -webkit-backdrop-filter: none !important;
                                        transform: translateZ(0);
                                    }
                                </style>
                                <!-- Background Grid -->
                                <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />
                                <!-- Outer warning hexagon -->
                                <polygon points="100,25 155,55 155,115 100,145 45,115 45,55"
                                    stroke="rgba(124,60,208,0.15)" stroke-width="1.5" stroke-dasharray="4,4" />

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
                                    <circle cx="115" cy="65" r="1" fill="rgba(255,255,255,0.2)" />
                                    <circle cx="75" cy="90" r="1" fill="rgba(255,255,255,0.1)" />
                                    <circle cx="125" cy="90" r="1" fill="rgba(255,255,255,0.3)" />
                                </g>

                                <!-- Center Siren Beacon (Isometric projection) -->
                                <g transform="translate(100, 95)">
                                    <ellipse cx="0" cy="0" rx="35" ry="17.5" stroke="#7C3CD0" stroke-width="1"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear;" />
                                    <ellipse cx="0" cy="0" rx="55" ry="27.5" stroke="#7C3CD0" stroke-width="0.5"
                                        style="transform-origin: 0 0; animation: wave-expand 2.5s infinite linear; animation-delay: 1.25s;" />
                                    <ellipse cx="0" cy="10" rx="18" ry="9" fill="rgba(0,0,0,0.3)" />
                                    <polygon points="-15,0 15,0 15,10 -15,10" fill="rgba(255,255,255,0.05)"
                                        stroke="rgba(255,255,255,0.2)" stroke-width="1" />
                                    <ellipse cx="0" cy="0" rx="15" ry="7.5" fill="rgba(255,255,255,0.08)"
                                        stroke="rgba(255,255,255,0.2)" />
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
                        <span class="fig-label">FIG 0.3</span>
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

                                    #hero .ent-btn-primary {
                                        backdrop-filter: none !important;
                                        -webkit-backdrop-filter: none !important;
                                        transform: translateZ(0);
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />
                                <g style="animation: platform-hover 4s ease-in-out infinite;">
                                    <polygon points="100,115 145,92.5 100,70 55,92.5" fill="rgba(0,0,0,0.2)" />
                                    <polygon points="100,105 145,82.5 100,60 55,82.5" stroke="rgba(255,255,255,0.15)"
                                        stroke-width="1" fill="rgba(255,255,255,0.02)" />
                                    <line x1="55" y1="82.5" x2="55" y2="92.5" stroke="rgba(255,255,255,0.15)"
                                        stroke-width="1" />
                                    <line x1="145" y1="82.5" x2="145" y2="92.5" stroke="rgba(255,255,255,0.15)"
                                        stroke-width="1" />
                                    <line x1="100" y1="105" x2="100" y2="115" stroke="rgba(255,255,255,0.15)"
                                        stroke-width="1" />
                                    <polygon points="55,92.5 100,115 100,105 55,82.5" fill="rgba(255,255,255,0.03)" />
                                    <polygon points="145,92.5 100,115 100,105 145,82.5" fill="rgba(255,255,255,0.04)" />
                                    <path d="M60,80 L140,120" stroke="rgba(255,255,255,0.1)" stroke-width="1"
                                        stroke-dasharray="3,3" />
                                    <path d="M70,65 L130,95" stroke="rgba(255,255,255,0.1)" stroke-width="1"
                                        stroke-dasharray="3,3" />

                                    <g
                                        style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite;">
                                        <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255,255,255,0.5)"
                                            stroke-width="0.8" fill="rgba(255,255,255,0.1)" />
                                        <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.6)"
                                            stroke="rgba(255,255,255,0.8)" stroke-width="0.5" />
                                        <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255,255,255,0.8)"
                                            stroke-width="0.8" fill="rgba(255,255,255,0.4)" />
                                        <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255,255,255,0.3)"
                                            stroke-width="0.5" />
                                    </g>
                                    <g
                                        style="transform-origin: 100px 82.5px; animation: avatar-slide 4s linear infinite; animation-delay: 2s;">
                                        <polygon points="100,75 112,81 100,87 88,81" stroke="rgba(255,255,255,0.5)"
                                            stroke-width="0.8" fill="rgba(255,255,255,0.1)" />
                                        <circle cx="100" cy="72" r="2.5" fill="rgba(255,255,255,0.6)"
                                            stroke="rgba(255,255,255,0.8)" stroke-width="0.5" />
                                        <path d="M96,78 C96,75.5 104,75.5 104,78" stroke="rgba(255,255,255,0.8)"
                                            stroke-width="0.8" fill="rgba(255,255,255,0.4)" />
                                        <line x1="100" y1="87" x2="100" y2="92" stroke="rgba(255,255,255,0.3)"
                                            stroke-width="0.5" />
                                    </g>

                                    <ellipse cx="140" cy="80" rx="3" ry="15" stroke="#7C3CD0" stroke-width="1.5"
                                        style="transform: rotate(-25deg); opacity: 0.7;" />
                                    <ellipse cx="140" cy="80" rx="1" ry="10" fill="rgba(124, 60, 208, 0.1)"
                                        style="transform: rotate(-25deg);" />
                                    <ellipse cx="60" cy="40" rx="2" ry="10" stroke="rgba(255,255,255,0.2)"
                                        stroke-width="1" style="transform: rotate(-25deg);" />
                                    <path d="M110,87 C130,97 150,90 165,70" stroke="#7C3CD0" stroke-width="1.5"
                                        stroke-dasharray="3,3" style="animation: arrow-pulse 2s infinite;" />
                                    <polygon points="167,70 164,75 160,70" fill="#7C3CD0" />
                                </g>
                            </svg>
                        </div>
                        <h3>100-300% annual turnover</h3>
                        <p class="card-desc">Every departure takes institutional knowledge with it. Training never ends.
                            Consistency never arrives.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="feature-col-item">
                        <span class="fig-label">FIG 0.4</span>
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

                                    #hero .ent-btn-primary {
                                        backdrop-filter: none !important;
                                        -webkit-backdrop-filter: none !important;
                                        transform: translateZ(0);
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />
                                <ellipse cx="100" cy="80" rx="65" ry="32.5" stroke="rgba(255,255,255,0.05)"
                                    stroke-width="2" stroke-dasharray="4,8"
                                    style="transform-origin: 100px 80px; animation: clock-ticks 20s linear infinite;" />

                                <g transform="translate(100, 80)">
                                    <polygon points="0,-48 30,-36 0,-24 -30,-36" stroke="rgba(255,255,255,0.2)"
                                        stroke-width="1.5" fill="rgba(255,255,255,0.02)" />
                                    <polygon points="0,48 30,36 0,24 -30,36" stroke="rgba(255,255,255,0.2)"
                                        stroke-width="1.5" fill="rgba(255,255,255,0.02)" />
                                    <line x1="-30" y1="-36" x2="-30" y2="36" stroke="rgba(255,255,255,0.1)"
                                        stroke-width="1" />
                                    <line x1="30" y1="-36" x2="30" y2="36" stroke="rgba(255,255,255,0.1)"
                                        stroke-width="1" />
                                    <line x1="0" y1="-24" x2="0" y2="24" stroke="rgba(255,255,255,0.08)"
                                        stroke-width="0.8" stroke-dasharray="2,2" />
                                    <path
                                        d="M-26,-34 C-26,-15 -6,-5 -6,0 C-6,5 -26,15 -26,34 L26,34 C26,15 6,5 6,0 C6,-5 26,-15 26,-34 Z"
                                        stroke="rgba(255,255,255,0.25)" stroke-width="1" />

                                    <g transform="translate(0, -25)"
                                        style="animation: badge-dissolve 4s infinite ease-in;">
                                        <polygon points="0,-6 10,-2 0,2 -10,-2" stroke="rgba(255,255,255,0.6)"
                                            stroke-width="0.8" fill="rgba(255,255,255,0.1)" />
                                        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="rgba(255,255,255,0.4)"
                                            stroke-width="0.6" />
                                        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.6)" />
                                        <line x1="0" y1="1.5" x2="0" y2="4" stroke="rgba(255,255,255,0.6)"
                                            stroke-width="0.5" />
                                    </g>

                                    <line x1="0" y1="-5" x2="0" y2="25" stroke="rgba(255,255,255,0.4)" stroke-width="1"
                                        stroke-dasharray="2,4"
                                        style="stroke-dashoffset: 0; animation: sand-drip 1s linear infinite;" />
                                    <circle cx="0" cy="0" r="1" fill="#ffffff" />

                                    <polygon points="0,32 18,24 0,16 -18,24" stroke="rgba(255,255,255,0.15)"
                                        stroke-width="0.8" fill="rgba(255,255,255,0.08)"
                                        style="transform-origin: 0 32px; animation: sand-pile 4s infinite alternate;" />
                                    <polygon points="0,32 10,27 0,22 -10,27" stroke="rgba(255,255,255,0.3)"
                                        stroke-width="0.8" fill="rgba(255,255,255,0.15)" />

                                    <g transform="translate(45, 0)">
                                        <rect x="-3" y="-12" width="48" height="15" rx="3" fill="rgba(0,0,0,0.4)"
                                            stroke="rgba(255,255,255,0.1)" />
                                        <text x="21" y="-2" font-family="monospace" font-size="8" fill="#ffffff"
                                            text-anchor="middle" font-weight="bold" letter-spacing="0.5">12,000h</text>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <h3>12,000 hours on credentials</h3>
                        <p class="card-desc">Manual provisioning. Spreadsheet tracking. Orphaned accounts sitting open
                            for months.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="feature-col-item">
                        <span class="fig-label">FIG 0.5</span>
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
                                            stroke: rgba(124, 60, 208, 0.4);
                                            fill: rgba(124, 60, 208, 0.05);
                                        }

                                        50% {
                                            stroke: #7C3CD0;
                                            fill: rgba(124, 60, 208, 0.2);
                                            filter: drop-shadow(0 0 4px #7C3CD0);
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

                                    #hero .ent-btn-primary {
                                        backdrop-filter: none !important;
                                        -webkit-backdrop-filter: none !important;
                                        transform: translateZ(0);
                                    }
                                </style>
                                <path d="M100,20 L100,140" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2,2" />
                                <polygon points="100,45 60,110 140,110" fill="url(#cone-grad-home)"
                                    style="animation: light-glow 3s ease-in-out infinite;" />
                                <ellipse cx="100" cy="110" rx="40" ry="12" stroke="rgba(255,255,255,0.1)"
                                    stroke-width="1" stroke-dasharray="2,2" />

                                <g transform="translate(100, 45)"
                                    style="transform-origin: 0 -5px; animation: camera-scan 6s ease-in-out infinite;">
                                    <path d="M-15,-15 L0,-5" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
                                    <line x1="-15" y1="-15" x2="-15" y2="-5" stroke="rgba(255,255,255,0.3)"
                                        stroke-width="1" />
                                    <polygon points="-8,-10 12,-20 12,-8 -8,2" fill="rgba(255,255,255,0.05)"
                                        stroke="rgba(255,255,255,0.2)" stroke-width="1" />
                                    <polygon points="12,-20 22,-15 22,-3 12,-8" fill="rgba(255,255,255,0.08)"
                                        stroke="rgba(255,255,255,0.2)" stroke-width="1" />
                                    <polygon points="-8,-10 12,-20 22,-15 2,-5" fill="rgba(255,255,255,0.1)"
                                        stroke="rgba(255,255,255,0.2)" stroke-width="1" />
                                    <ellipse cx="17" cy="-9" rx="3" ry="5" fill="none" stroke="rgba(255,255,255,0.8)"
                                        stroke-width="1" />
                                    <circle cx="17" cy="-9" r="1.5" fill="#ffffff" />
                                    <circle cx="10" cy="-14" r="1" fill="#7C3CD0" />
                                </g>

                                <g transform="translate(100, 95)">
                                    <rect x="-14" y="-5" width="28" height="22" rx="3" stroke="#7C3CD0"
                                        stroke-width="1.5" style="animation: lock-pulse 2s infinite alternate;" />
                                    <path d="M-9,-5 L-9,-14 C-9,-19 9,-19 9,-14 L9,-5" stroke="#7C3CD0"
                                        stroke-width="1.5" fill="none"
                                        style="animation: lock-pulse 2s infinite alternate;" />
                                    <circle cx="0" cy="3" r="2.5" fill="#7C3CD0" />
                                    <polygon points="-1,3 1,3 2,10 -2,10" fill="#7C3CD0" />
                                    <ellipse cx="0" cy="5" rx="30" ry="15" stroke="#7C3CD0" stroke-width="1"
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
                    <a href="#explore" class="ent-btn-primary" style="margin-top: 0;">Explore the platform</a>
                </div>
            </div>

            <div class="agents-timeline-wrapper">
                <div class="agents-horizontal-scroll">
                    <div class="timeline-line-track"></div>

                    <!-- Milestone Item 1: Incident Response -->
                    <div class="timeline-item">
                        <div class="timeline-dot-slot">
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="20" stroke="#7C3CD0" stroke-width="2"
                                        stroke-opacity="0.3" />
                                    <circle cx="24" cy="24" r="10" stroke="#7C3CD0" stroke-width="2"
                                        stroke-opacity="0.5" />
                                    <line x1="24" y1="4" x2="24" y2="44" stroke="#7C3CD0" stroke-width="2"
                                        stroke-opacity="0.4" />
                                    <line x1="4" y1="24" x2="44" y2="24" stroke="#7C3CD0" stroke-width="2"
                                        stroke-opacity="0.4" />
                                    <circle cx="24" cy="24" r="3" fill="#8B5CF6" />
                                    <path d="M24 4 A20 20 0 0 1 44 24" stroke="#8B5CF6" stroke-width="3"
                                        class="svg-radar-line" />
                                </svg>
                            </div>
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
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="8" y="16" width="22" height="14" rx="2" stroke="#7C3CD0" stroke-width="2"
                                        fill="rgba(124, 60, 208, 0.1)" transform="rotate(-10 8 16)" />
                                    <rect x="18" y="20" width="22" height="14" rx="2" stroke="#8B5CF6" stroke-width="2"
                                        stroke-dasharray="2,2" fill="none" transform="rotate(15 18 20)" />
                                    <circle cx="24" cy="24" r="18" stroke="#8B5CF6" stroke-width="1.5"
                                        stroke-opacity="0.2" />
                                    <circle cx="36" cy="12" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                </svg>
                            </div>
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
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8 H36 V40 H12 Z" stroke="#7C3CD0" stroke-width="2"
                                        fill="rgba(124, 60, 208, 0.1)" />
                                    <circle cx="24" cy="18" r="4" stroke="#8B5CF6" stroke-width="2" />
                                    <line x1="16" y1="28" x2="32" y2="28" stroke="#7C3CD0" stroke-width="2" />
                                    <line x1="16" y1="33" x2="28" y2="33" stroke="#7C3CD0" stroke-width="2" />
                                    <line x1="8" y1="24" x2="40" y2="24" stroke="#8B5CF6" stroke-width="2"
                                        class="svg-laser-line" />
                                </svg>
                            </div>
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
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="18" stroke="#7C3CD0" stroke-width="2" />
                                    <circle cx="24" cy="24" r="8" stroke="#8B5CF6" stroke-width="2"
                                        class="svg-circle-pulse" />
                                    <path d="M24 6 L20 20 M38 18 L24 20 M32 38 L24 28 M10 30 L20 28 M16 10 L24 24"
                                        stroke="#7C3CD0" stroke-width="1.5" class="svg-rotate-cw" />
                                </svg>
                            </div>
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
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="24,6 42,15 24,24 6,15" stroke="#7C3CD0" stroke-width="2"
                                        fill="rgba(124, 60, 208, 0.1)" />
                                    <polygon points="24,24 42,33 24,42 6,33" stroke="#8B5CF6" stroke-width="1.5"
                                        stroke-opacity="0.4" />
                                    <line x1="24" y1="6" x2="24" y2="42" stroke="#7C3CD0" stroke-width="1"
                                        stroke-opacity="0.3" />
                                    <circle cx="24" cy="15" r="2.5" fill="#8B5CF6" class="svg-circle-pulse" />
                                    <circle cx="16" cy="28" r="2" fill="#7C3CD0" />
                                    <circle cx="32" cy="32" r="2" fill="#7C3CD0" />
                                </svg>
                            </div>
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
                            <div class="timeline-dot">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 38 H42" stroke="#7C3CD0" stroke-width="3" />
                                    <rect x="8" y="16" width="6" height="22" fill="#7C3CD0" stroke="#7C3CD0"
                                        stroke-width="1" />
                                    <rect x="34" y="16" width="6" height="22" fill="#7C3CD0" stroke="#7C3CD0"
                                        stroke-width="1" />
                                    <line x1="14" y1="20" x2="34" y2="20" stroke="#8B5CF6" stroke-width="3"
                                        stroke-dasharray="2,2" />
                                    <line x1="14" y1="26" x2="34" y2="26" stroke="#8B5CF6" stroke-width="3"
                                        stroke-dasharray="2,2" />
                                    <path d="M24 10 L24 30" stroke="#8B5CF6" stroke-width="1.5"
                                        class="svg-laser-line" />
                                </svg>
                            </div>
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

        <div class="ent-section-divider"></div>


        <!-- Cinematic Feature Split Section -->
        <section class="section sec-cinematic-feature" id="cinematic-feature">
            <div class="container">
                <div class="text-center"
                    style="margin-bottom: 2.5rem; display: flex; flex-direction: column; align-items: center;">
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
                            <div class="point-icon-wrap">
                                <div class="point-icon-dot">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="20" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.3" />
                                        <rect x="12" y="12" width="24" height="24" rx="2" stroke="#7C3CD0"
                                            stroke-width="2" fill="rgba(124, 60, 208, 0.1)" />
                                        <path d="M17 19 L21 23 L17 27" stroke="#8B5CF6" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="24" y1="27" x2="30" y2="27" stroke="#8B5CF6" stroke-width="2.5"
                                            stroke-linecap="round" class="svg-laser-line" />
                                    </svg>
                                </div>
                            </div>
                            <strong>Turnover stops breaking you</strong>
                            <p>SOPs live in code, not in people's heads. New staff become effective in days. Knowledge
                                persists.</p>
                        </div>
                        <div class="isometric-point-item">
                            <div class="point-icon-wrap">
                                <div class="point-icon-dot">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="20" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.3" />
                                        <line x1="24" y1="12" x2="24" y2="36" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.5" />
                                        <line x1="12" y1="24" x2="36" y2="24" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.5" />
                                        <circle cx="24" cy="24" r="6" stroke="#8B5CF6" stroke-width="2"
                                            class="svg-circle-pulse" fill="rgba(139, 92, 246, 0.1)" />
                                        <circle cx="24" cy="12" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                        <circle cx="24" cy="36" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                        <circle cx="12" cy="24" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                        <circle cx="36" cy="24" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                    </svg>
                                </div>
                            </div>
                            <strong>Fewer people, more coverage</strong>
                            <p>Modules handle routine operations. Your team handles exceptions. One operator
                                accomplishes what five couldn't.</p>
                        </div>
                    </div>

                    <!-- Center Column: Animated 3D Isometric Graphic -->
                    <div class="isometric-center-graphic">
                        <div class="iso-graphic-wrapper">
                            <div class="iso-glow-ring"></div>

                            <!-- Symmetrical vertical wireframe dotted lines -->
                            <div class="iso-wireframe-lines">
                                <div class="wireframe-line line-left"></div>
                                <div class="wireframe-line line-right"></div>
                            </div>

                            <!-- Top Slab (SOP Code Persistence & Automation Hub) -->
                            <div class="iso-slab slab-top">
                                <div class="iso-slab-inner">
                                    <svg viewBox="0 0 100 100" class="iso-logo" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <style>
                                            @keyframes flow-right {
                                                0% {
                                                    transform: translateX(0);
                                                    opacity: 0;
                                                }

                                                10% {
                                                    opacity: 1;
                                                }

                                                90% {
                                                    opacity: 1;
                                                }

                                                100% {
                                                    transform: translateX(46px);
                                                    opacity: 0;
                                                }
                                            }

                                            @keyframes scale-active {

                                                0%,
                                                100% {
                                                    transform: scale(1);
                                                    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
                                                }

                                                50% {
                                                    transform: scale(1.15);
                                                    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7));
                                                }
                                            }

                                            @keyframes text-blink {

                                                0%,
                                                100% {
                                                    opacity: 0.4;
                                                }

                                                50% {
                                                    opacity: 1;
                                                }
                                            }

                                            @keyframes code-scroll {
                                                0% {
                                                    stroke-dashoffset: 24;
                                                }

                                                100% {
                                                    stroke-dashoffset: 0;
                                                }
                                            }

                                            #hero .ent-btn-primary {
                                                backdrop-filter: none !important;
                                                -webkit-backdrop-filter: none !important;
                                                transform: translateZ(0);
                                            }
                                        </style>
                                        <!-- Background grid -->
                                        <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)"
                                            stroke-width="0.8" stroke-dasharray="2,2" />

                                        <!-- LEFT: Operator Head Silhouette representing "knowledge in heads" -->
                                        <g transform="translate(0, -2)">
                                            <circle cx="20" cy="30" r="4" stroke="rgba(255,255,255,0.3)"
                                                stroke-width="1" />
                                            <path d="M14 39 C14 36 26 36 26 39" stroke="rgba(255,255,255,0.3)"
                                                stroke-width="1" />
                                        </g>

                                        <!-- RIGHT: Code / Database stack representing "SOPs live in code" -->
                                        <g transform="translate(0, -2)">
                                            <rect x="74" y="20" width="12" height="4" rx="1" stroke="#ffffff"
                                                stroke-width="1" fill="rgba(255, 255, 255, 0.04)" />
                                            <rect x="74" y="26" width="12" height="4" rx="1" stroke="#ffffff"
                                                stroke-width="1" fill="rgba(255, 255, 255, 0.04)" />
                                            <rect x="74" y="32" width="12" height="4" rx="1" stroke="#ffffff"
                                                stroke-width="1" fill="rgba(255, 255, 255, 0.04)" />
                                        </g>

                                        <!-- FLOW: Dotted transfer of knowledge from Operator Head to Code stack -->
                                        <path d="M 28 28 L 68 28" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"
                                            stroke-dasharray="2,2" />
                                        <circle cx="28" cy="28" r="1.5" fill="#ffffff"
                                            style="animation: flow-right 2.5s infinite linear;" />

                                        <!-- SOP Code Terminal Display -->
                                        <text x="50" y="32" font-family="monospace" font-size="10" fill="#ffffff"
                                            text-anchor="middle" font-weight="900"
                                            style="animation: text-blink 2s infinite;">{ SOP }</text>

                                        <!-- Automated execution flow lines (SOP logic executing) -->
                                        <path d="M 32 36 C 32 44, 68 44, 68 36" stroke="rgba(255, 255, 255, 0.2)"
                                            stroke-width="1" stroke-dasharray="4,4"
                                            style="animation: code-scroll 2s infinite linear;" />

                                        <!-- 1 Operator to 5 Automated Modules branching logic (Fewer people, more coverage) -->
                                        <!-- Central Operator Node -->
                                        <g
                                            style="transform-origin: 50px 54px; animation: scale-active 3s infinite alternate;">
                                            <circle cx="50" cy="54" r="4.5" fill="#ffffff" />
                                            <circle cx="50" cy="54" r="8" stroke="rgba(255, 255, 255, 0.3)"
                                                stroke-width="0.8" stroke-dasharray="2,2" />
                                        </g>

                                        <!-- Symmetrical Branches -->
                                        <g stroke="rgba(255,255,255,0.15)" stroke-width="0.8">
                                            <line x1="50" y1="54" x2="26" y2="72" />
                                            <line x1="50" y1="54" x2="38" y2="72" />
                                            <line x1="50" y1="54" x2="50" y2="72" />
                                            <line x1="50" y1="54" x2="62" y2="72" />
                                            <line x1="50" y1="54" x2="74" y2="72" />
                                        </g>

                                        <!-- 5 Active Modules (Representing standard operations run by modules) -->
                                        <circle cx="26" cy="72" r="2.5" fill="#ffffff" />
                                        <circle cx="38" cy="72" r="2.5" fill="#ffffff" />
                                        <circle cx="50" cy="72" r="2.5" fill="#ffffff" />
                                        <circle cx="62" cy="72" r="2.5" fill="#ffffff" />
                                        <circle cx="74" cy="72" r="2.5" fill="#ffffff" />

                                        <!-- Animated signal pulses traveling down branches -->
                                        <circle cx="50" cy="54" r="1.5" fill="#ffffff"
                                            style="animation: flow-right 1.5s infinite linear; transform-origin: 50px 54px;" />

                                        <!-- Legend text: 1:5 scale efficiency -->
                                        <text x="50" y="86" font-family="'Outfit', sans-serif" font-size="7"
                                            fill="rgba(255,255,255,0.4)" text-anchor="middle" font-weight="bold"
                                            letter-spacing="0.5">1 OPERATOR : 5x COVERAGE</text>
                                    </svg>
                                </div>
                            </div>

                            <!-- Scrolling chevron connectors -->
                            <div class="iso-connectors">
                                <div class="iso-chevrons col-left-chevrons">
                                    <svg viewBox="0 0 24 60" class="chevrons-svg">
                                        <path d="M6 22 L12 16 L18 22 M6 32 L12 26 L18 32 M6 42 L12 36 L18 42"
                                            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                            stroke-linejoin="round" class="chevrons-up-path" />
                                    </svg>
                                </div>
                                <div class="iso-chevrons col-right-chevrons">
                                    <svg viewBox="0 0 24 60" class="chevrons-svg">
                                        <path d="M6 18 L12 24 L18 18 M6 28 L12 34 L18 28 M6 38 L12 44 L18 38"
                                            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                            stroke-linejoin="round" class="chevrons-down-path" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Bottom Slab (Threat Funnel & Posture Shield) -->
                            <div class="iso-slab slab-bottom">
                                <div class="iso-slab-inner">
                                    <svg viewBox="0 0 100 100" class="iso-logo" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <style>
                                            @keyframes check-draw {

                                                0%,
                                                20% {
                                                    stroke-dashoffset: 16;
                                                    opacity: 0;
                                                }

                                                50%,
                                                100% {
                                                    stroke-dashoffset: 0;
                                                    opacity: 1;
                                                }
                                            }

                                            @keyframes threat-mitigate {

                                                0%,
                                                30% {
                                                    fill: #ef4444;
                                                    filter: drop-shadow(0 0 2px #ef4444);
                                                }

                                                70%,
                                                100% {
                                                    fill: #8b5cf6;
                                                    filter: drop-shadow(0 0 2px #8b5cf6);
                                                }
                                            }

                                            @keyframes wave-bounce {

                                                0%,
                                                100% {
                                                    transform: translateY(0);
                                                }

                                                50% {
                                                    transform: translateY(-3px);
                                                }
                                            }

                                            @keyframes funnel-pulse {

                                                0%,
                                                100% {
                                                    opacity: 0.15;
                                                }

                                                50% {
                                                    opacity: 0.5;
                                                }
                                            }

                                            @keyframes bar-grow-1 {

                                                0%,
                                                100% {
                                                    height: 0px;
                                                    y: 74px;
                                                }

                                                50% {
                                                    height: 8px;
                                                    y: 66px;
                                                }
                                            }

                                            @keyframes bar-grow-2 {

                                                0%,
                                                100% {
                                                    height: 0px;
                                                    y: 74px;
                                                }

                                                50% {
                                                    height: 11px;
                                                    y: 63px;
                                                }
                                            }

                                            @keyframes bar-grow-3 {

                                                0%,
                                                100% {
                                                    height: 0px;
                                                    y: 74px;
                                                }

                                                50% {
                                                    height: 14px;
                                                    y: 60px;
                                                }
                                            }

                                            #hero .ent-btn-primary {
                                                backdrop-filter: none !important;
                                                -webkit-backdrop-filter: none !important;
                                                transform: translateZ(0);
                                            }
                                        </style>
                                        <!-- Background grid -->
                                        <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)"
                                            stroke-width="0.8" stroke-dasharray="2,2" />

                                        <!-- 1. "NOTHING FALLS THROUGH" Threat Funnel Safeguard (Top of SVG) -->
                                        <!-- Funnel upper boundary -->
                                        <path d="M 22 18 L 78 18 L 62 38 L 38 38 Z" fill="rgba(139, 92, 246, 0.03)"
                                            stroke="rgba(255,255,255,0.15)" stroke-width="0.8"
                                            style="animation: funnel-pulse 3s infinite alternate;" />

                                        <!-- Input Alert dots falling into the funnel -->
                                        <circle cx="34" cy="22" r="2" fill="#ef4444"
                                            style="animation: threat-mitigate 4s infinite alternate;" />
                                        <circle cx="50" cy="24" r="2" fill="#ef4444"
                                            style="animation: threat-mitigate 4s infinite alternate; animation-delay: 1s;" />
                                        <circle cx="66" cy="22" r="2" fill="#ef4444"
                                            style="animation: threat-mitigate 4s infinite alternate; animation-delay: 2s;" />

                                        <!-- 2. Concentric Security Shield with validation check (Nothing falls through) -->
                                        <g transform="translate(0, 5)">
                                            <path
                                                d="M50 32 C58 32 62 34 62 42 C62 54 50 62 50 64 C50 62 38 54 38 42 C38 34 42 32 50 32 Z"
                                                stroke="#8b5cf6" stroke-width="1.5" fill="rgba(139, 92, 246, 0.06)" />

                                            <!-- Live drawing validation checkmark -->
                                            <path d="M45 46 L49 50 L55 42" stroke="#8b5cf6" stroke-width="2.2"
                                                stroke-linecap="round" stroke-linejoin="round" fill="none"
                                                stroke-dasharray="16" stroke-dashoffset="16"
                                                style="animation: check-draw 4s infinite linear;" />
                                        </g>

                                        <!-- 3. "STRATEGIC CREDIBILITY" Modernized Board Dashboard (Bottom of SVG) -->
                                        <g transform="translate(0, 8)">
                                            <!-- Digital Boardroom Monitor border -->
                                            <rect x="24" y="60" width="52" height="20" rx="1.5"
                                                stroke="rgba(255,255,255,0.12)" stroke-width="0.8"
                                                fill="rgba(0,0,0,0.45)" />

                                            <!-- Board presentation bar charts -->
                                            <!-- Bar 1 -->
                                            <rect x="32" y="74" width="6" height="0" fill="#8b5cf6" rx="0.5"
                                                style="animation: bar-grow-1 3s infinite ease-in-out;" />

                                            <!-- Bar 2 -->
                                            <rect x="42" y="74" width="6" height="0" fill="#8b5cf6" rx="0.5"
                                                style="animation: bar-grow-2 3s infinite ease-in-out; animation-delay: 0.5s;" />

                                            <!-- Bar 3 -->
                                            <rect x="52" y="74" width="6" height="0" fill="#8b5cf6" rx="0.5"
                                                style="animation: bar-grow-3 3s infinite ease-in-out; animation-delay: 1s;" />

                                            <!-- Small upward posture growth arrow -->
                                            <path d="M 64 72 L 68 68 L 72 72 M 68 68 L 68 76" stroke="#8b5cf6"
                                                stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                                                style="animation: wave-bounce 2s infinite ease-in-out;" />
                                        </g>

                                        <!-- Around the clock status text -->
                                        <text x="50" y="93" font-family="'Outfit', sans-serif" font-size="7"
                                            fill="rgba(255,255,255,0.4)" text-anchor="middle" font-weight="bold"
                                            letter-spacing="0.5">24/7 SEC POSTURE : BOARD READY</text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Symmetrical Left-Aligned Points -->
                    <div class="isometric-col col-right">
                        <div class="isometric-point-item">
                            <div class="point-icon-wrap">
                                <div class="point-icon-dot">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="20" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.3" />
                                        <path d="M24 11 L35 15 V25 C35 32 24 37 24 37 C24 37 13 32 13 25 V15 Z"
                                            stroke="#7C3CD0" stroke-width="2" fill="rgba(124, 60, 208, 0.1)"
                                            stroke-linejoin="round" />
                                        <path d="M19 23 L23 27 L29 19" stroke="#8B5CF6" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="svg-laser-line" />
                                    </svg>
                                </div>
                            </div>
                            <strong>Nothing falls through</strong>
                            <p>Every alarm assessed. Every credential tracked. Every incident documented. Around the
                                clock.</p>
                        </div>
                        <div class="isometric-point-item">
                            <div class="point-icon-wrap">
                                <div class="point-icon-dot">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="20" stroke="#7C3CD0" stroke-width="2"
                                            stroke-opacity="0.3" />
                                        <path d="M14 14 V34 H34" stroke="#7C3CD0" stroke-width="2"
                                            stroke-linecap="round" />
                                        <path d="M17 30 L23 24 L29 27 L34 17" stroke="#8B5CF6" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="svg-radar-line" />
                                        <circle cx="34" cy="17" r="3" fill="#8B5CF6" class="svg-orbit-node" />
                                    </svg>
                                </div>
                            </div>
                            <strong>Strategic credibility</strong>
                            <p>Stop firefighting paperwork. Start presenting security posture to the board. Become the
                                CSO who modernized the operation.</p>
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
                <a href="#" class="ent-btn-primary">Learn More</a>
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
                        Everything visible. Everything queryable.</h2>
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
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
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                        <polyline points="2 17 12 22 22 17" />
                                        <polyline points="2 12 12 17 22 12" />
                                    </svg>
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
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
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
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="2" y1="10" x2="22" y2="10" />
                                        <line x1="12" y1="10" x2="12" y2="17" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                    </svg>
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
                        <a href="#explore-memory" class="ent-btn-secondary learn-more-btn"
                            style="display: inline-flex; align-items: center; padding: 12px 28px; border-radius: 100px; font-family: var(--font-main); font-size: 15px; font-weight: 500; color: #ffffff; background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.08); text-decoration: none; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
                            Learn more
                        </a>
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
                <h2 class="main-heading" style="font-size: 48px; margin-bottom: 20px;">Autonomy with accountability.
                </h2>
                <p class="body-text"
                    style="font-family: var(--font-mono); font-size: 14px; max-width: 600px; margin: 0 auto 40px; color: rgba(255,255,255,0.65);">
                    Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous
                    execution that stays auditable.
                </p>
                <a href="#" class="ent-btn-primary" style="margin-bottom: 80px;">Request architecture review</a>

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

                    .ent-grid-wrapper {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        border-left: 1px solid rgba(255, 255, 255, 0.05);
                        text-align: left;
                    }

                    .ent-grid-cell {
                        border-right: 1px solid rgba(255, 255, 255, 0.05);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                        padding: 40px;
                        display: flex;
                        flex-direction: column;
                        min-height: 400px;
                        position: relative;
                        transition: background 0.3s;
                    }

                    .ent-grid-cell:hover {
                        background: rgba(255, 255, 255, 0.02);
                    }

                    @media (max-width: 768px) {
                        .ent-grid-wrapper {
                            grid-template-columns: 1fr;
                        }

                        .ent-grid-cell {
                            min-height: 300px;
                            padding: 24px;
                        }
                    }

                    #hero .ent-btn-primary {
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        transform: translateZ(0);
                    }
                </style>
                <div class="ent-grid-wrapper">

                    <!-- Point 1 -->
                    <div class="ent-grid-cell">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.1</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M40,130 L90,130 L100,100 L110,130 L160,130" stroke="rgba(255,255,255,0.1)"
                                    stroke-width="1" stroke-dasharray="2 4"
                                    style="animation: ent-dash-flow 2s linear infinite reverse;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <polygon points="100,60 130,75 100,90 70,75" fill="rgba(139,92,246,0.1)"
                                        stroke="rgba(139,92,246,0.5)" stroke-width="1" />
                                    <polygon points="70,75 100,90 100,120 70,105" fill="rgba(139,92,246,0.05)"
                                        stroke="rgba(139,92,246,0.3)" stroke-width="1" />
                                    <polygon points="100,90 130,75 130,105 100,120" fill="rgba(139,92,246,0.15)"
                                        stroke="rgba(139,92,246,0.5)" stroke-width="1" />

                                    <ellipse cx="100" cy="90" rx="20" ry="10" stroke="rgba(255,255,255,0.3)"
                                        stroke-width="1" stroke-dasharray="2 2"
                                        style="animation: ent-spin-slow 4s linear infinite; transform-origin: 100px 90px;" />
                                </g>

                                <circle cx="100" cy="90" r="30" stroke="rgba(139,92,246,0.3)" stroke-width="1"
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

                    <div class="ent-grid-cell">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.2</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <ellipse cx="100" cy="140" rx="60" ry="18" fill="rgba(16, 185, 129, 0.05)"
                                    stroke="rgba(16, 185, 129, 0.4)" stroke-width="1"
                                    style="animation: ent-float-up-down 5s ease-in-out infinite;" />
                                <text x="170" y="145" font-family="monospace" font-size="8" fill="#10b981"
                                    text-anchor="start">LVL.1</text>

                                <ellipse cx="100" cy="100" rx="45" ry="14" fill="rgba(245, 158, 11, 0.05)"
                                    stroke="rgba(245, 158, 11, 0.4)" stroke-width="1" stroke-dasharray="4 2"
                                    style="animation: ent-float-up-down 4s ease-in-out infinite; animation-delay: 0.5s;" />
                                <text x="155" y="105" font-family="monospace" font-size="8" fill="#f59e0b"
                                    text-anchor="start">LVL.2</text>

                                <ellipse cx="100" cy="60" rx="30" ry="10" fill="rgba(239, 68, 68, 0.05)"
                                    stroke="rgba(239, 68, 68, 0.4)" stroke-width="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <rect x="96" y="45" width="8" height="8" rx="1" fill="rgba(239, 68, 68, 0.2)"
                                    stroke="#ef4444" stroke-width="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <path d="M98,45 V42 C98,40 102,40 102,42 V45" fill="none" stroke="#ef4444"
                                    stroke-width="1"
                                    style="animation: ent-float-up-down 3s ease-in-out infinite; animation-delay: 1s;" />
                                <text x="140" y="65" font-family="monospace" font-size="8" fill="#ef4444"
                                    text-anchor="start">REQ_AUTH</text>

                                <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(255,255,255,0.1)" stroke-width="1"
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

                    <div class="ent-grid-cell">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.3</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M40,140 L80,100 L120,100 L160,60" stroke="rgba(255,255,255,0.1)"
                                    stroke-width="1" stroke-dasharray="3 3"
                                    style="animation: ent-dash-flow 2s linear infinite;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <polygon points="40,140 55,130 40,120 25,130" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="25,130 40,140 40,155 25,145" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="40,140 55,130 55,145 40,155" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <circle cx="40" cy="130" r="2" fill="#3b82f6"
                                        style="color: #3b82f6; animation: ent-pulse-glow 1.5s infinite;" />
                                </g>

                                <g
                                    style="animation: ent-float-up-down 4.5s ease-in-out infinite; animation-delay: 0.3s;">
                                    <polygon points="100,100 115,90 100,80 85,90" fill="rgba(59, 130, 246, 0.1)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="85,90 100,100 100,115 85,105" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="100,100 115,90 115,105 100,115" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" stroke-width="1" />
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
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="145,50 160,60 160,75 145,65" fill="rgba(59, 130, 246, 0.05)"
                                        stroke="#3b82f6" stroke-width="1" />
                                    <polygon points="160,60 175,50 175,65 160,75" fill="rgba(59, 130, 246, 0.15)"
                                        stroke="#3b82f6" stroke-width="1" />
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

                    <div class="ent-grid-cell">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">FIG.
                            1.4</span>

                        <div
                            style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <path d="M50,130 C50,60 150,60 150,130" stroke="rgba(16, 185, 129, 0.4)"
                                    stroke-width="1" stroke-dasharray="4 2" fill="rgba(16, 185, 129, 0.05)"
                                    style="color: #10b981; animation: ent-pulse-glow 4s infinite;" />

                                <ellipse cx="100" cy="130" rx="60" ry="15" fill="rgba(16, 185, 129, 0.05)"
                                    stroke="rgba(16, 185, 129, 0.4)" stroke-width="1" />
                                <ellipse cx="100" cy="130" rx="80" ry="20" stroke="rgba(255, 255, 255, 0.1)"
                                    stroke-width="1" stroke-dasharray="3 3"
                                    style="animation: ent-spin-slow 20s linear infinite; transform-origin: 100px 130px;" />

                                <g style="animation: ent-float-up-down 4s ease-in-out infinite;">
                                    <rect x="85" y="80" width="30" height="40" rx="2" fill="rgba(16, 185, 129, 0.1)"
                                        stroke="#10b981" stroke-width="1" />
                                    <line x1="85" y1="90" x2="115" y2="90" stroke="#10b981" stroke-width="1" />
                                    <line x1="85" y1="100" x2="115" y2="100" stroke="#10b981" stroke-width="1" />
                                    <line x1="85" y1="110" x2="115" y2="110" stroke="#10b981" stroke-width="1" />

                                    <circle cx="100" cy="65" r="4" stroke="#10b981" stroke-width="1.5" fill="none" />
                                    <line x1="100" y1="69" x2="100" y2="76" stroke="#10b981" stroke-width="1.5" />
                                    <line x1="100" y1="74" x2="104" y2="74" stroke="#10b981" stroke-width="1.5" />
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
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 800px; max-width: 100vw; background: radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%); pointer-events: none; z-index: 1;">
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
                #hero .ent-btn-primary {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    transform: translateZ(0);
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
                                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                        <span style="font-family: var(--font-mono); font-weight: 600; letter-spacing: 1px;">COMPLIANCE
                            AUTOMATES</span>
                    </span>

                    <h2 class="main-heading cinematic-reveal-title"
                        style="font-size: 48px; line-height: 1.05; margin-bottom: 24px; color: #ffffff;">Audit-ready as
                        a<br>default state.</h2>
                    <p class="body-text"
                        style="font-family: var(--font-mono); font-size: 14px; color: rgba(255,255,255,0.65); max-width: 650px; margin: 0 auto 40px; line-height: 1.6;">
                        When operations flow through a unified system, compliance documentation is automatic. No
                        scrambling, no manual logging.
                    </p>
                </div>

                <!-- Light Blueprint Grid -->
                <div class="comp-grid-wrapper">

                    <!-- Cell 1 -->
                    <div class="comp-grid-cell" style="--card-glow-color: rgba(139, 92, 246, 0.15); --card-glow-shadow: rgba(139, 92, 246, 0.08);">
                        <div class="card-glow"></div>
                        <span class="comp-label">FIG. 2.1 — AUTO-EVIDENCE</span>

                        <div class="comp-svg-container">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <!-- Data streams flowing in -->
                                <path d="M20,100 L80,100" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"
                                    stroke-dasharray="3 3"
                                    style="animation: comp-dash-flow 2s linear infinite reverse;" />
                                <path d="M50,140 L80,120" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"
                                    stroke-dasharray="3 3"
                                    style="animation: comp-dash-flow 2s linear infinite reverse;" />
                                <path d="M50,60 L80,80" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"
                                    stroke-dasharray="3 3"
                                    style="animation: comp-dash-flow 2s linear infinite reverse;" />

                                <g style="animation: comp-float 4s ease-in-out infinite;">
                                    <!-- Document base -->
                                    <rect x="90" y="60" width="60" height="80" rx="4" fill="rgba(255,255,255,0.8)"
                                        stroke="#111827" stroke-width="1.5" />
                                    <!-- Glowing generated lines -->
                                    <line class="auto-evidence-line" x1="100" y1="75" x2="140" y2="75" stroke="#8b5cf6" stroke-width="2"
                                        style="animation: comp-pulse 2s infinite;" />
                                    <line x1="100" y1="85" x2="130" y2="85" stroke="rgba(0,0,0,0.2)" stroke-width="2" />
                                    <line x1="100" y1="95" x2="140" y2="95" stroke="rgba(0,0,0,0.2)" stroke-width="2" />
                                    <line x1="100" y1="105" x2="120" y2="105" stroke="rgba(0,0,0,0.2)"
                                        stroke-width="2" />

                                    <!-- Stamp of approval -->
                                    <circle cx="130" cy="120" r="12" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981"
                                        stroke-width="1.5" />
                                    <path d="M125,120 L129,124 L136,116" stroke="#10b981" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </div>

                        <div class="comp-text-container">
                            <h3 class="comp-title">Evidence generates itself</h3>
                            <p class="comp-desc">When operations flow through a unified system, compliance documentation
                                is automatic, not a separate project.</p>
                        </div>
                    </div>

                    <!-- Cell 2 -->
                    <div class="comp-grid-cell" style="--card-glow-color: rgba(6, 182, 212, 0.15); --card-glow-shadow: rgba(6, 182, 212, 0.08);">
                        <div class="card-glow"></div>
                        <span class="comp-label">FIG. 2.2 — MULTI-FRAMEWORK</span>

                        <div class="comp-svg-container">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <!-- Rotating framework orbits -->
                                <circle class="orbit-circle-1" cx="100" cy="100" r="60" stroke="rgba(0,0,0,0.08)" stroke-width="1"
                                    stroke-dasharray="4 4"
                                    style="animation: comp-spin 20s linear infinite; transform-origin: 100px 100px;" />
                                <circle class="orbit-circle-2" cx="100" cy="100" r="45" stroke="rgba(0,0,0,0.12)" stroke-width="1"
                                    stroke-dasharray="2 4"
                                    style="animation: comp-spin 15s linear infinite reverse; transform-origin: 100px 100px;" />

                                <g class="shield-group" style="animation: comp-float 5s ease-in-out infinite; transform-origin: 100px 100px;">
                                    <!-- Shield Core -->
                                    <path
                                        d="M100,55 L130,70 L130,105 C130,125 115,140 100,145 C85,140 70,125 70,105 L70,70 L100,55 Z"
                                        fill="rgba(255,255,255,0.8)" stroke="#111827" stroke-width="1.5" />
                                    <!-- Inner check/lock -->
                                    <rect x="92" y="85" width="16" height="12" rx="2" fill="rgba(16, 185, 129, 0.1)"
                                        stroke="#10b981" stroke-width="1.5" />
                                    <path d="M96,85 V80 C96,76 104,76 104,80 V85" fill="none" stroke="#10b981"
                                        stroke-width="1.5" />
                                </g>

                                <!-- Floating Framework Tags -->
                                <g class="fw-tag SOC2">
                                    <rect x="30" y="50" width="35" height="14" rx="2" fill="rgba(0,0,0,0.05)"
                                        stroke="rgba(0,0,0,0.1)" />
                                    <text x="47.5" y="60" font-family="monospace" font-size="7" fill="#111827"
                                        text-anchor="middle">SOC 2</text>
                                </g>

                                <g class="fw-tag HIPAA">
                                    <rect x="140" y="80" width="35" height="14" rx="2" fill="rgba(0,0,0,0.05)"
                                        stroke="rgba(0,0,0,0.1)" />
                                    <text x="157.5" y="90" font-family="monospace" font-size="7" fill="#111827"
                                        text-anchor="middle">HIPAA</text>
                                </g>

                                <g class="fw-tag ISO">
                                    <rect x="40" y="130" width="45" height="14" rx="2" fill="rgba(0,0,0,0.05)"
                                        stroke="rgba(0,0,0,0.1)" />
                                    <text x="62.5" y="140" font-family="monospace" font-size="7" fill="#111827"
                                        text-anchor="middle">ISO 27001</text>
                                </g>
                            </svg>
                        </div>

                        <div class="comp-text-container">
                            <h3 class="comp-title">Frameworks addressed</h3>
                            <p class="comp-desc">SOC 2 Type II &bull; PCI DSS &bull; HIPAA &bull; ISO 27001 &bull; NERC
                                CIP &bull; GxP/Annex 11 &bull; IEC 62443</p>
                        </div>
                    </div>

                    <!-- Cell 3 -->
                    <div class="comp-grid-cell" style="--card-glow-color: rgba(59, 130, 246, 0.15); --card-glow-shadow: rgba(59, 130, 246, 0.08);">
                        <div class="card-glow"></div>
                        <span class="comp-label">FIG. 2.3 — TIME COMPRESSION</span>

                        <div class="comp-svg-container">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <g style="animation: comp-float 3.5s ease-in-out infinite;">
                                    <!-- Clock / Dial -->
                                    <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.8)" stroke="#111827"
                                        stroke-width="1.5" />
                                    <!-- Time ticks -->
                                    <line x1="100" y1="65" x2="100" y2="70" stroke="#111827" stroke-width="1.5" />
                                    <line x1="100" y1="130" x2="100" y2="135" stroke="#111827" stroke-width="1.5" />
                                    <line x1="65" y1="100" x2="70" y2="100" stroke="#111827" stroke-width="1.5" />
                                    <line x1="130" y1="100" x2="135" y2="100" stroke="#111827" stroke-width="1.5" />

                                    <!-- Clock hands -->
                                    <line x1="100" y1="100" x2="100" y2="80" stroke="rgba(0,0,0,0.3)" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line class="clock-hand-fast" x1="100" y1="100" x2="120" y2="100" stroke="#8b5cf6" stroke-width="2"
                                        stroke-linecap="round"
                                        style="transform-origin: 100px 100px; animation: comp-spin 3s linear infinite;" />
                                    <circle cx="100" cy="100" r="3" fill="#111827" />
                                </g>

                                <!-- Export connection -->
                                <path d="M140,100 L160,100" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"
                                    stroke-dasharray="2 2" />
                                <rect class="zip-rect" x="160" y="85" width="24" height="30" rx="2" fill="rgba(139,92,246,0.1)"
                                    stroke="#8b5cf6" stroke-width="1.5" style="animation: comp-pulse 2s infinite;" />
                                <text class="zip-text" x="172" y="103" font-family="monospace" font-size="7" fill="#8b5cf6"
                                    text-anchor="middle" font-weight="bold">ZIP</text>
                            </svg>
                        </div>

                        <div class="comp-text-container">
                            <h3 class="comp-title">Hours, not months</h3>
                            <p class="comp-desc">What took 2-3 months of preparation now takes a query and an export.
                            </p>
                        </div>
                    </div>

                    <!-- Cell 4 -->
                    <div class="comp-grid-cell" style="--card-glow-color: rgba(16, 185, 129, 0.15); --card-glow-shadow: rgba(16, 185, 129, 0.08);">
                        <div class="card-glow"></div>
                        <span class="comp-label">FIG. 2.4 — CONTINUOUS MONITORING</span>

                        <div class="comp-svg-container">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style="overflow: visible;">
                                <!-- Bounds -->
                                <line x1="40" y1="70" x2="160" y2="70" stroke="rgba(0,0,0,0.1)" stroke-width="1"
                                    stroke-dasharray="4 4" />
                                <line x1="40" y1="130" x2="160" y2="130" stroke="rgba(0,0,0,0.1)" stroke-width="1"
                                    stroke-dasharray="4 4" />

                                <text x="40" y="65" font-family="monospace" font-size="7" fill="rgba(0,0,0,0.4)">UPPER
                                    BOUND</text>
                                <text x="40" y="140" font-family="monospace" font-size="7" fill="rgba(0,0,0,0.4)">LOWER
                                    BOUND</text>

                                <!-- Signal wave -->
                                <path d="M40,100 Q55,70 70,100 T100,100 T130,100 T160,100" stroke="rgba(0,0,0,0.15)"
                                    stroke-width="1.5" fill="none" />

                                <!-- Active scanning pulse -->
                                <path class="scanning-pulse" d="M40,100 Q55,70 70,100 T100,100" stroke="#10b981" stroke-width="2" fill="none"
                                    stroke-dasharray="100" stroke-dashoffset="100"
                                    style="animation: comp-dash-flow 3s linear infinite;" />

                                <circle class="sync-dot" cx="100" cy="100" r="4" fill="#10b981"
                                    style="animation: comp-pulse 1.5s infinite;" />
                                <rect class="sync-rect" x="90" y="108" width="20" height="10" rx="2" fill="rgba(16, 185, 129, 0.1)"
                                    stroke="#10b981" stroke-width="1" />
                                <text class="sync-text" x="100" y="115" font-family="monospace" font-size="6" fill="#10b981"
                                    text-anchor="middle">SYNC</text>
                            </svg>
                        </div>

                        <div class="comp-text-container">
                            <h3 class="comp-title">Continuous conformance</h3>
                            <p class="comp-desc">Policy adherence measured in real-time. Violations flagged immediately.
                                No audit-season panic.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

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
