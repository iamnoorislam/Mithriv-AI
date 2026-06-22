'use client'

import React, { useState, useEffect, useRef } from 'react'

const industries = [
  {
    id: 'critical',
    label: '01 Critical Infrastructure',
    problem: 'NERC CIP mandates 15-minute alert response and 90-day log retention across every critical asset. Manual processes cannot meet these standards consistently. One missed alert, one incomplete log — and the consequences are regulatory, operational, and reputational.',
    points: [
      'Cross-site threat correlation detects anomalies across your entire grid simultaneously — no alert goes unconnected',
      'Compliance documentation generated automatically from live operational data — audit-ready within minutes not months',
      'Predictive risk scoring identifies vulnerable zones before incidents occur — proactive not reactive',
    ],
    outcome: 'Compliance audit preparation reduced from 240 hours to under 4.',
  },
  {
    id: 'health',
    label: '02 Healthcare',
    problem: 'HIPAA requires complete audit trails. Workplace violence statistics demand behavioral prediction. Patient safety requires instant incident response. Three separate compliance and safety mandates — each requiring data from systems that do not talk to each other.',
    points: [
      'Behavioral intelligence flags escalating patterns before incidents reach staff — violence prevention not just response',
      'HIPAA audit documentation generated continuously from live operational data — always current, never assembled by hand',
      'Natural language query gives security leadership instant answers on any incident, any patient area, any staff member',
    ],
    outcome: 'Incident response time reduced 78%. Compliance documentation fully automated.',
  },
  {
    id: 'finance',
    label: '03 Financial Services',
    problem: 'Insider threat, credential misuse, and tailgating are the three leading causes of financial sector security breaches. None are detectable by perimeter systems alone. None generate obvious alerts. They only become visible when you connect the dots across systems — which no human team has time to do manually.',
    points: [
      'Behavioral baseline modeling detects credential anomalies across every access point — deviations flagged before they become breaches',
      'Cross-system correlation links access events with identity data and communication logs — the full picture, not isolated alerts',
      'Risk scoring prioritizes which employees, contractors, and visitors require immediate attention — no needle lost in the haystack',
    ],
    outcome: 'Insider threat detection rate increased 340% vs. perimeter-only systems.',
  },
  {
    id: 'ports',
    label: '04 Ports & Airports',
    problem: 'TSA, CBP, Coast Guard, and port authority each generate separate intelligence streams in separate systems on separate timelines. Coordinating them manually creates the exact gaps that threat actors exploit. The intelligence exists across all four agencies. Nobody has a unified view of it.',
    points: [
      'Unified intelligence layer ingests all agency data streams simultaneously — one view across every authority',
      'TWIC credential verification correlated with behavioral and access data in real time — not just credential validity but behavioral context',
      'Multi-agency incident coordination driven by a single intelligence source — no crossed wires, no missed handoffs',
    ],
    outcome: 'Inter-agency response coordination time reduced from hours to minutes.',
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
      // Pinning starts when the sticky wrapper top hits 50px (top padding is 40px)
      const startScroll = elementTop + 40 - 50
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
        const startScroll = elementPosition + 40 - 50
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
        const startScroll = elementPosition + 40 - 50 // trigger starts when top of section is 50px from top
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
                Intelligence built for environments where a wrong decision costs more than money.
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
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'stretch',
                        height: '500px'
                      }}
                    >
                      {/* LEFT COLUMN — Problem */}
                      <div
                        style={{
                          padding: '48px 48px 48px 0',
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
                          padding: '48px 0 48px 48px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: '32px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              color: 'rgba(139,92,246,0.85)',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              display: 'block',
                              border: '1px solid rgba(139,92,246,0.2)',
                              padding: '4px 8px',
                              width: 'fit-content',
                            }}
                          >
                            HOW IT ADDRESSES IT
                          </span>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {ind.points.map((point, i) => (
                              <div
                                key={i}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '12px 16px',
                                  background: 'rgba(255,255,255,0.02)',
                                  border: '1px solid rgba(255,255,255,0.04)',
                                  borderRadius: '8px',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}
                              >
                                {/* Growing purple left border */}
                                <div style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: '3px',
                                  background: 'var(--primary-purple)',
                                  transform: isTabActive ? 'scaleY(1)' : 'scaleY(0)',
                                  transformOrigin: 'top',
                                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                  transitionDelay: `${0.1 + (i * 0.15)}s`
                                }} />
                                
                                <span style={{ color: 'var(--primary-purple)', marginRight: '12px', flexShrink: 0, fontWeight: 'bold' }}>→</span>
                                <p
                                  style={{
                                    fontSize: '14px',
                                    color: 'rgba(255,255,255,0.85)',
                                    lineHeight: '1.5',
                                    margin: 0,
                                    fontFamily: 'var(--font-main)',
                                  }}
                                >
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Outcome Box */}
                        <div
                          className="industry-outcome-box"
                          style={{
                            opacity: isTabActive ? 1 : 0,
                            transform: isTabActive ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            transitionDelay: '0.6s',
                            background: 'rgba(16, 185, 129, 0.05)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            padding: '16px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                        >
                          <span style={{ color: '#10B981', fontSize: '16px', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '13px',
                              color: '#10B981',
                              letterSpacing: '0.3px',
                              lineHeight: '1.4',
                            }}
                          >
                            {ind.outcome}
                          </span>
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
    </section>
  )
}
