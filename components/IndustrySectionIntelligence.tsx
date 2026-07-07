'use client'

import React, { useState, useEffect, useRef } from 'react'

const industries = [
  {
    id: 'critical',
    label: '01 Critical Infrastructure',
    problem: 'NERC CIP mandates 15-minute alert response and 90-day log retention across every critical asset. Manual processes cannot meet these standards consistently. One missed alert, one incomplete log — and the consequences are regulatory, operational, and reputational.',
    points: [
      'Cross-site anomaly detection in under 500ms',
      'NERC CIP documentation auto-generated',
      'Risk scoring flags vulnerable zones proactively',
    ],
    outcome: '240hrs → 4hrs audit preparation time',
  },
  {
    id: 'health',
    label: '02 Healthcare',
    problem: 'HIPAA requires complete audit trails. Workplace violence statistics demand behavioral prediction. Patient safety requires instant incident response. Three separate compliance and safety mandates — each requiring data from systems that do not talk to each other.',
    points: [
      'Behavioral patterns flagged before incidents escalate',
      'HIPAA documentation generated continuously',
      'Any incident query answered instantly',
    ],
    outcome: '78% reduction in incident response time',
  },
  {
    id: 'finance',
    label: '03 Financial Services',
    problem: 'Insider threat, credential misuse, and tailgating are the three leading causes of financial sector security breaches. None are detectable by perimeter systems alone. None generate obvious alerts. They only become visible when you connect the dots across systems — which no human team has time to do manually.',
    points: [
      'Credential anomalies detected before they become breaches',
      'Access, identity, and comms correlated into one picture',
      'Risk scoring prioritizes people and zones automatically',
    ],
    outcome: '340% increase in insider threat detection',
  },
  {
    id: 'ports',
    label: '04 Ports & Airports',
    problem: 'TSA, CBP, Coast Guard, and port authority each generate separate intelligence streams in separate systems on separate timelines. Coordinating them manually creates the exact gaps that threat actors exploit. The intelligence exists across all four agencies. Nobody has a unified view of it.',
    points: [
      'All agency data streams unified into one layer',
      'TWIC verification correlated with behavioral context',
      'Multi-agency coordination from a single source',
    ],
    outcome: 'Hours → Minutes inter-agency response time',
  },
]

export default function IndustrySectionIntelligence({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [active, setActive] = useState(0)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const isClickScrolling = useRef(false)

  // Native CSS & JS Scroll Listener to handle desktop card translateY transitions
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("industries-intelligence")
      if (!el) return

      const rect = el.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      // Pinning starts when the sticky wrapper top (elementTop + 160px padding) hits 50px
      const startScroll = elementTop + 160 - 50
      const scrollDistance = 1200 // Scroll length for transitioning all tabs

      const currentScroll = window.scrollY

      if (currentScroll >= startScroll && currentScroll <= startScroll + scrollDistance) {
        const progress = (currentScroll - startScroll) / scrollDistance
        // Center-split progress to highlight the active tab button naturally
        const activeIndex = Math.round(progress * 3)
        setActive(activeIndex)

        const track = document.querySelector(".features-scroll-track-intel") as HTMLDivElement
        if (track) {
          // Translate the track container smoothly based on progress
          const translateY = progress * 1644 // 3 transitions * (500px grid + 48px divider) = 1644px total
          track.style.transform = `translateY(-${translateY}px)`
        }
      } else if (currentScroll < startScroll) {
        setActive(0)
        const track = document.querySelector(".features-scroll-track-intel") as HTMLDivElement
        if (track) track.style.transform = `translateY(0px)`
      } else if (currentScroll > startScroll + scrollDistance) {
        setActive(3)
        const track = document.querySelector(".features-scroll-track-intel") as HTMLDivElement
        if (track) track.style.transform = `translateY(-1644px)`
      }
    }

    // Only run scroll listener on desktop viewports
    const checkAndListen = () => {
      if (isEmbedded) return;
      if (window.innerWidth >= 992) {
        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
      } else {
        window.removeEventListener("scroll", handleScroll)
      }
    }

    checkAndListen()
    window.addEventListener("resize", checkAndListen)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkAndListen)
    }
  }, [isEmbedded])

  // IntersectionObserver to auto-update active tab when scrolling features (only on mobile viewports)
  useEffect(() => {
    if (window.innerWidth >= 992) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActive(index)
          }
        })
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.15,
      }
    )

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isEmbedded) {
      (window as any).setEmbeddedActiveTabIntel = (idx: number) => {
        setActive(idx);
      };
    }
    return () => {
      if (isEmbedded) {
        (window as any).setEmbeddedActiveTabIntel = undefined;
      }
    }
  }, [isEmbedded]);

  // Handle smooth tab clicks and coordinate appropriate scroll offsets
  const handleTabClick = (idx: number) => {
    const el = document.getElementById("industries-intelligence")
    if (!el) return

    isClickScrolling.current = true
    setActive(idx)

    const w = window as any
    const isDesktop = window.innerWidth >= 992

    if (isDesktop) {
      if (isEmbedded) {
        // Handle embedded scrolling using lenis or standard if needed
        const elementPosition = el.getBoundingClientRect().top + window.scrollY
        const startScroll = elementPosition + 160 - 50
        const targetScroll = startScroll + idx * 400

        if (w.lenis) {
          w.lenis.scrollTo(targetScroll, { duration: 0.85 })
        } else {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          })
        }
      } else {
        // On desktop, scroll the page scrollbar so that the scroll listener translates to the target card
        const elementPosition = el.getBoundingClientRect().top + window.scrollY
        const startScroll = elementPosition + 160 - 50 // trigger starts when top of section is 50px from top
        const targetScroll = startScroll + idx * 400

        if (w.lenis) {
          w.lenis.scrollTo(targetScroll, { duration: 0.85 })
        } else {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          })
        }
      }
    } else {
      // On mobile, scroll directly to the target grid element
      const targetEl = containerRefs.current[idx]
      if (targetEl) {
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - 120 // offset for mobile sticky headers

        if (w.lenis) {
          w.lenis.scrollTo(offsetPosition, { duration: 0.85 })
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }

    setTimeout(() => {
      isClickScrolling.current = false
    }, 850)
  }

  return (
    <section id="industries-intelligence" className={isEmbedded ? "is-embedded" : ""} style={{ position: 'relative', zIndex: 10 }}>
      <div className="industries-sticky-wrapper">
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          {/* Header Group */}
          <div
            style={{
              paddingTop: '24px',
              paddingBottom: '0px',
            }}
          >
            {/* Section header */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <span className="ent-pill" style={{ marginLeft: '0px', marginBottom: '0px' }}>
                INDUSTRY APPLICATIONS
              </span>
            </div>

            <div className="header-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end', marginBottom: '40px' }}>
              {/* Left Side: Heading */}
              <h2
                className="std-section-h2"
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  marginTop: '0px',
                  marginBottom: '0px',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  textAlign: 'left',
                  lineHeight: '1.2',
                  color: '#ffffff',
                }}
              >
                Built for industries where intelligence gaps cost lives.
              </h2>

              {/* Right Side: Subheading */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#B6B6B7',
                  lineHeight: '1.55',
                  textAlign: 'left',
                  marginTop: '0',
                  marginBottom: '0px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Every industry generates security data differently. The Intelligence Engine is built to understand the difference.
              </p>
            </div>

            {/* Tab rail (Sticky Unkey line boxes raw) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255, 255, 255, 0.01)',
                marginBottom: '0px',
              }}
            >
              {industries.map((ind, idx) => (
                <button
                  key={ind.id}
                  onClick={() => handleTabClick(idx)}
                  style={{
                    background: active === idx ? 'rgba(255,255,255,0.03)' : 'transparent',
                    border: 'none',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    padding: '16px 24px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: active === idx ? 600 : 400,
                    color: active === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    position: 'relative'
                  }}
                  className={`unkey-tab-btn ${active === idx ? 'active' : ''}`}
                >
                  {ind.label}
                  {/* Sliding indicator line */}
                  <div style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'var(--primary-purple)',
                    opacity: active === idx ? 1 : 0,
                    transform: active === idx ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'all 0.3s ease',
                    transformOrigin: 'left'
                  }} />
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Window Box Container */}
          <div className="features-window-box" style={{ height: '500px', overflow: 'hidden', position: 'relative' }}>
            {/* Long Vertical Layout containing 4 Feature grid sections */}
            <div className="features-scroll-track-intel" style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              {industries.map((ind, idx) => {
                const isTabActive = active === idx

                return (
                  <React.Fragment key={ind.id}>
                    <div
                      ref={(el) => { containerRefs.current[idx] = el }}
                      data-index={idx}
                      className="industry-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '37.5% 62.5%',
                        alignItems: 'stretch',
                        height: '500px'
                      }}
                    >
                      {/* LEFT COLUMN — Problem */}
                      <div
                        style={{
                          padding: '48px',
                          borderRight: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: '24px'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: 'rgba(239,68,68,0.85)',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            display: 'block',
                            border: '1px solid rgba(239,68,68,0.2)',
                            padding: '4px 8px',
                            width: 'fit-content',
                          }}
                        >
                          THE PROBLEM
                        </span>

                        <p
                          style={{
                            fontSize: 'clamp(16px, 1.8vw, 18px)',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: '1.6',
                            margin: 0,
                            fontFamily: 'var(--font-main)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {ind.problem}
                        </p>
                      </div>

                      {/* RIGHT COLUMN — Solutions & Outcome */}
                      <div
                        style={{
                          padding: '12px 0 12px 48px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              color: 'rgba(119,0,255,0.85)',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              display: 'block',
                              border: '1px solid rgba(119,0,255,0.2)',
                              padding: '4px 8px',
                              width: 'fit-content',
                            }}
                          >
                            HOW IT ADDRESSES IT
                          </span>

                          <div style={{ position: 'relative', width: '100%', maxWidth: '640px', height: '400px', margin: '0 auto', marginTop: '16px' }}>
                            {/* Single SVG for all connections */}
                            <svg 
                              width="100%" 
                              height="100%" 
                              viewBox="0 0 640 400" 
                              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
                            >
                              {/* Connector 1: Box 1 -> Box 2 */}
                              <g style={{ opacity: isTabActive ? 1 : 0, transition: 'opacity 0.2s', transitionDelay: '0.4s' }}>
                                <path 
                                  d="M 230 50 L 515 50 Q 525 50 525 60 L 525 95" 
                                  stroke="rgba(119,0,255,0.8)" 
                                  strokeWidth="1" 
                                  fill="none" 
                                  pathLength="100"
                                  style={{ 
                                    strokeDasharray: 100,
                                    strokeDashoffset: 100,
                                    animation: isTabActive ? 'drawConnectorJourney 0.6s ease-out 0.4s forwards' : 'none' 
                                  }}
                                />
                                <path d="M 521 91 L 525 95 L 529 91" stroke="rgba(119,0,255,0.8)" strokeWidth="1" fill="none" style={{ animation: isTabActive ? 'fadeSlideInJourney 0.2s ease-out 0.9s forwards' : 'none', opacity: 0 }} />
                              </g>

                              {/* Connector 2: Box 2 -> Box 3 */}
                              <g style={{ opacity: isTabActive ? 1 : 0, transition: 'opacity 0.2s', transitionDelay: '1.2s' }}>
                                <path 
                                  d="M 410 150 L 185 150 Q 175 150 175 160 L 175 195" 
                                  stroke="rgba(119,0,255,0.8)" 
                                  strokeWidth="1" 
                                  fill="none" 
                                  pathLength="100"
                                  style={{ 
                                    strokeDasharray: 100,
                                    strokeDashoffset: 100,
                                    animation: isTabActive ? 'drawConnectorJourney 0.6s ease-out 1.2s forwards' : 'none' 
                                  }}
                                />
                                <path d="M 171 191 L 175 195 L 179 191" stroke="rgba(119,0,255,0.8)" strokeWidth="1" fill="none" style={{ animation: isTabActive ? 'fadeSlideInJourney 0.2s ease-out 1.7s forwards' : 'none', opacity: 0 }} />
                              </g>

                              {/* Connector 3: Box 3 -> Outcome */}
                              <g style={{ opacity: isTabActive ? 1 : 0, transition: 'opacity 0.2s', transitionDelay: '2.0s' }}>
                                <path 
                                  d="M 175 300 L 175 340 Q 175 350 185 350 L 298 350" 
                                  stroke="rgba(119,0,255,0.8)" 
                                  strokeWidth="1" 
                                  fill="none" 
                                  pathLength="100"
                                  style={{ 
                                    strokeDasharray: 100,
                                    strokeDashoffset: 100,
                                    animation: isTabActive ? 'drawConnectorJourney 0.6s ease-out 2.0s forwards' : 'none' 
                                  }}
                                />
                                <path d="M 294 346 L 298 350 L 294 354" stroke="rgba(119,0,255,0.8)" strokeWidth="1" fill="none" style={{ animation: isTabActive ? 'fadeSlideInJourney 0.2s ease-out 2.5s forwards' : 'none', opacity: 0 }} />
                              </g>
                            </svg>

                            {ind.points.map((point, i) => {
                              const boxDelay = i * 0.8;
                              const isLeft = i === 0 || i === 2;
                              const slideAnim = isLeft ? 'slideInLeftSmooth' : 'slideInRightSmooth';
                              
                              return (
                                <div key={i} style={{
                                  position: 'absolute',
                                  left: i === 0 ? 0 : i === 2 ? '60px' : 'auto',
                                  right: i === 1 ? 0 : 'auto',
                                  top: `${i * 25}%`,
                                  width: '230px',
                                  background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid rgba(255,255,255,0.06)',
                                  borderRadius: '12px',
                                  padding: '16px 20px',
                                  opacity: 0,
                                  transform: isLeft ? 'translate(-30px, 15px)' : 'translate(30px, 15px)',
                                  animation: isTabActive ? `${slideAnim} 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${boxDelay}s forwards` : 'none',
                                  zIndex: 2,
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7700FF', boxShadow: '0 0 10px rgba(119,0,255,0.6)' }} />
                                    <span style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '10px',
                                      color: 'rgba(119,0,255,0.8)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '1px'
                                    }}>
                                      Step 0{i + 1}
                                    </span>
                                  </div>
                                  <div style={{ opacity: 0, animation: isTabActive ? `textFadeWipe 1s cubic-bezier(0.16, 1, 0.3, 1) ${boxDelay + 0.3}s forwards` : 'none' }}>
                                    <p style={{
                                      fontSize: '14px',
                                      color: 'rgba(255,255,255,0.85)',
                                      lineHeight: '1.6',
                                      margin: 0,
                                      fontFamily: 'var(--font-main)',
                                      clipPath: 'inset(0 100% 0 0)',
                                      animation: isTabActive ? `textWipeSmooth 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${boxDelay + 0.3}s forwards` : 'none',
                                    }}>
                                      {point}
                                    </p>
                                  </div>
                                </div>
                              )
                            })}

                            {/* Final Outcome Node */}
                            <div style={{
                              position: 'absolute',
                              left: 'auto',
                              right: 0,
                              top: '75%',
                              width: '340px',
                              background: 'linear-gradient(145deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.02) 100%)',
                              border: '1px solid rgba(16,185,129,0.15)',
                              borderRadius: '12px',
                              padding: '16px 20px',
                              opacity: 0,
                              transform: 'translate(30px, 15px)',
                              animation: isTabActive ? `slideInRightSmooth 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 2.4s forwards` : 'none',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              zIndex: 2,
                            }}>
                              <span style={{ color: '#10B981', fontSize: '16px', flexShrink: 0, fontWeight: 'bold', marginTop: '-2px' }}>✓</span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0, animation: isTabActive ? `textFadeWipe 1s cubic-bezier(0.16, 1, 0.3, 1) 2.7s forwards` : 'none' }}>
                                <span style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '9px',
                                  color: 'rgba(16,185,129,0.8)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px'
                                }}>
                                  Verified Outcome
                                </span>
                                <span style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '14px',
                                  color: '#10B981',
                                  lineHeight: '1.5',
                                  fontWeight: 500,
                                  whiteSpace: 'nowrap',
                                  clipPath: 'inset(0 100% 0 0)',
                                  animation: isTabActive ? `textWipeSmooth 1.2s cubic-bezier(0.25, 1, 0.5, 1) 2.7s forwards` : 'none',
                                }}>
                                  {ind.outcome}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx < industries.length - 1 && <div className="feature-divider" style={{ height: '48px' }} />}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Embedded Animations and Styles */}
      <style>{`
        #industries-intelligence button:focus { outline: none; }
        #industries-intelligence ::-webkit-scrollbar { display: none; }

        .unkey-tab-btn {
          position: relative;
        }
        .unkey-tab-btn:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.01) !important;
        }

        @keyframes scanUpDown {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes fadeSlideInJourney {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeftSmooth {
          from { opacity: 0; transform: translate(-40px, 10px); filter: blur(8px); }
          to { opacity: 1; transform: translate(0, 0); filter: blur(0px); }
        }
        
        @keyframes slideInRightSmooth {
          from { opacity: 0; transform: translate(40px, 10px); filter: blur(8px); }
          to { opacity: 1; transform: translate(0, 0); filter: blur(0px); }
        }
        
        @keyframes textWipeSmooth {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 -10% 0 0); }
        }
        
        @keyframes textFadeWipe {
          from { opacity: 0; transform: translateX(-5px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes drawConnectorJourney {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Fixed Window Box Desktop Layout */
        .features-window-box {
          height: 500px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: none;
          border-radius: 0px;
          overflow: hidden;
          position: relative;
          width: 100%;
          box-shadow: none;
        }

        .features-scroll-track-intel {
          display: flex;
          flex-direction: column;
          height: 2144px;
          will-change: transform;
        }

        .industry-grid {
          height: 500px;
          min-height: 500px;
        }

        .feature-divider {
          height: 48px;
          min-height: 48px;
          border-top: 1px solid #212326;
          border-bottom: 1px solid #212326;
          background-image: repeating-linear-gradient(
            45deg,
            transparent 0px,
            transparent 6px,
            #212326 6px,
            #212326 7px
          );
          background-color: transparent;
          width: 100%;
        }

        .header-split-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 24px;
        }

        #industries-intelligence.is-embedded {
          height: auto !important;
          padding: 0 !important;
        }
        #industries-intelligence.is-embedded .industries-sticky-wrapper {
          position: relative !important;
          top: 0 !important;
          background: transparent !important;
        }

        /* Native Sticky scroll support */
        @media (min-width: 992px) {
          #industries-intelligence {
            height: 2150px;
            position: relative;
            padding: 160px 0 100px 0 !important;
          }
          .industries-sticky-wrapper {
            position: sticky;
            top: 50px;
            height: auto;
            z-index: 10;
            background: #0C0D10;
          }
        }
        @media (max-width: 991px) {
          #industries-intelligence {
            height: auto !important;
            padding: 40px 0 !important;
          }
          .industries-sticky-wrapper {
            position: relative;
            top: 0 !important;
            height: auto !important;
          }
        }

        /* Responsive styling */
        @media (max-width: 991px) {
          .header-split-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 24px !important;
          }
          #industries-intelligence .industry-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: auto !important;
          }
          #industries-intelligence div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            position: relative !important;
            top: 0 !important;
          }
          .features-window-box {
            height: auto !important;
            overflow: visible !important;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          .features-scroll-track-intel {
            transform: none !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
