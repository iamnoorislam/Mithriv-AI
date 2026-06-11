'use client'

import React, { useState, useEffect, useRef } from 'react'

const industries = [
  {
    id: 'law',
    label: '01 Law Firms',
    problem: 'Client identity disclosed the moment a name is spoken in your lobby. Paper visitor logs expose who has visited. Every interaction is a privilege risk.',
    points: [
      'Silent check-in via personal device. No verbal announcement. No visible log.',
      'Conflict detection before a visitor reaches reception.',
      'Matter-linked audit trail for ethics compliance.',
    ],
    outcome: 'Client confidentiality protected from first contact.',
    windowTitle: 'lobby_masking.py',
    code: `@mithriv.agent(channel="lobby_verify")
def verify_visitor(session):
    # Mask speaker voice in lobby logs
    session.voice.mask_frequency()
    
    # Perform conflict check prior to reception
    if db.conflict_check(session.matter):
        raise Redirect("Private_Suite_4B")
    
    session.host.notify_discreetly()`
  },
  {
    id: 'health',
    label: '02 Healthcare',
    problem: '75% of workplace assaults occur in healthcare settings. Patient privacy under HIPAA. Staff safety under constant pressure.',
    points: [
      'Duress codes recognized instantly. Silent alert with precise location.',
      'Unit-specific protocols enforced automatically.',
      'HIPAA-compliant verification before any information is disclosed.',
    ],
    outcome: 'Every interaction compliant. Every staff alert instant.',
    windowTitle: 'bio_shield.ts',
    code: `// HIPAA Bio-Shield Active Enforcer
const ruleset = {
    directory_opt_out: "Mask Identity [100%]",
    staff_duress_code: "Silent Broadcast System",
    icu_entry_limit:   "Escort Required",
    encryption_level:  "AES-GCM-256"
};

console.log("STATE: ENFORCING PRIVACY ENVELOPE");`
  },
  {
    id: 'critical',
    label: '03 Critical Infrastructure',
    problem: 'NERC CIP mandates 15-minute alert requirements and 90-day log retention. Manual processes cannot meet these standards consistently.',
    points: [
      'Unauthorized access triggers immediate notification with timestamped confirmation.',
      'Escort coordination logged with complete chain of custody.',
      'Compliance documentation generated automatically.',
    ],
    outcome: 'Audit preparation reduced from months to hours.',
    windowTitle: 'nerc_compliance.py',
    code: `# NERC-CIP compliance log ledger
compliance_alert = {
    "15_min_window": "ACTIVE countdown started",
    "escort_status": "VERIFIED [PRA CLEAR]",
    "audit_logs":    "Syncing to secure database"
}

print("STATE: LOGGING ACTIVE DISPATCH")`
  },
  {
    id: 'ports',
    label: '04 Ports & Airports',
    problem: 'TSA, CBP, Coast Guard, port authority — each with separate systems. 240+ languages. Time-critical operations where delays cascade.',
    points: [
      'TWIC credential verification integrated natively.',
      '240+ language support. No interpreter dependency.',
      'Multi-agency coordination through a single interface.',
    ],
    outcome: 'Language barriers eliminated. Credential verification instantaneous.',
    windowTitle: 'transit_bridge.go',
    code: `// TWIC & CBP secure matrix bridge
func SynchronizePortGateway(manifest Manifest) {
    // Translate language ZH-CN > EN
    translator.DetectAndTranslate(manifest.Payload)
    
    cbp.manifest.Sync()
    twic.card.Verify() // VALIDated
}`
  },
]
// Tokenizing code parser for syntax highlighting
const highlightCode = (rawText: string, indId: string, charCount: number) => {
  const lines = rawText.split('\n')
  const totalLines = lines.length
  const currentCodeLength = industries.find(ind => ind.id === indId)?.code.length || 0

  return lines.map((line, lineIdx) => {
    const commentIdx = line.indexOf('//')
    const pythonCommentIdx = line.indexOf('#')
    let content = line
    let comment = ''

    if (commentIdx !== -1) {
      content = line.substring(0, commentIdx)
      comment = line.substring(commentIdx)
    } else if (pythonCommentIdx !== -1) {
      content = line.substring(0, pythonCommentIdx)
      comment = line.substring(pythonCommentIdx)
    }

    const tokens: React.ReactNode[] = []
    const parts = content.split(/(\s+|\(|\)|\{|\}|\[|\]|:|;|,|\.|=|"|')/)
    let inString = false
    let stringChar = ''
    let currentStr = ''

    parts.forEach((part, partIdx) => {
      if (!part) return

      if (inString) {
        currentStr += part
        if (part === stringChar) {
          inString = false
          tokens.push(<span key={partIdx} style={{ color: '#9ece6a' }}>{currentStr}</span>)
          currentStr = ''
        }
        return
      }

      if (part === '"' || part === "'") {
        inString = true
        stringChar = part
        currentStr = part
        return
      }

      // Keywords
      if (['def', 'func', 'const', 'if', 'raise', 'return', 'import', 'from', 'go', 'let'].includes(part)) {
        tokens.push(<span key={partIdx} style={{ color: '#bb9af7', fontWeight: 600 }}>{part}</span>)
      }
      // Decorators
      else if (part.startsWith('@')) {
        tokens.push(<span key={partIdx} style={{ color: '#ff9e64' }}>{part}</span>)
      }
      // Numbers
      else if (/^\d+$/.test(part)) {
        tokens.push(<span key={partIdx} style={{ color: '#ff9e64' }}>{part}</span>)
      }
      // Methods/Identifiers
      else if (['Verify', 'verify_visitor', 'mask_frequency', 'conflict_check', 'notify_discreetly', 'log', 'print', 'DetectAndTranslate', 'Sync'].includes(part)) {
        tokens.push(<span key={partIdx} style={{ color: '#7cd91c' }}>{part}</span>)
      }
      // Standard code tokens
      else {
        tokens.push(part)
      }
    })

    const isLastLine = lineIdx === totalLines - 1

    return (
      <div key={lineIdx} style={{ display: 'flex', minHeight: '1.7em' }}>
        <span style={{ color: '#3b4261', width: '28px', flexShrink: 0, userSelect: 'none', fontFamily: 'var(--font-mono)' }}>
          {String(lineIdx + 1).padStart(2, '0')}
        </span>
        <span style={{ whiteSpace: 'pre', fontFamily: 'var(--font-mono)' }}>
          {tokens}
          {comment && <span style={{ color: '#565f89', fontStyle: 'italic' }}>{comment}</span>}
          {isLastLine && charCount < currentCodeLength && (
            <span className="cursor-blink" style={{ color: '#8B5CF6', fontWeight: 'bold', marginLeft: '1px' }}>_</span>
          )}
        </span>
      </div>
    )
  })
}

// Render premium Modal-style code window with auto-scrolling
const PremiumCodeWindow = ({
  indId,
  winTitle,
  rawCode,
  charCount,
}: {
  indId: string
  winTitle: string
  rawCode: string
  charCount: number
}) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  let meshColor = 'rgba(139, 92, 246, 0.16)'
  if (indId === 'law') {
    meshColor = 'rgba(139, 92, 246, 0.18)'
  } else if (indId === 'health') {
    meshColor = 'rgba(16, 185, 129, 0.18)'
  } else if (indId === 'critical') {
    meshColor = 'rgba(245, 158, 11, 0.15)'
  } else if (indId === 'ports') {
    meshColor = 'rgba(6, 182, 212, 0.18)'
  }

  const currentTypedText = rawCode.substring(0, charCount)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [charCount])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '270px', overflow: 'hidden' }}>
      {/* Glow Mesh Behind Card */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          right: '-10%',
          bottom: '-10%',
          background: `radial-gradient(circle, ${meshColor} 0%, transparent 68%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Card Window Container (Offset to crop right & bottom edges) */}
      <div
        className="modal-style-card"
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: '-30px',
          right: '-30px',
          width: 'calc(100% + 10px)',
          background: '#0B0D12',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          boxShadow: '0 24px 50px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '42px',
          padding: '0 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(15, 16, 22, 0.5)',
        }}>
          {/* Mac Traffic Lights */}
          <div style={{ display: 'flex', gap: '6px', width: '60px' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444', opacity: 0.5 }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', opacity: 0.5 }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', opacity: 0.5 }} />
          </div>
          {/* Window Title */}
          <div style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: 'var(--font-mono), monospace',
            color: 'rgba(255, 255, 255, 0.35)',
            marginRight: '60px',
            letterSpacing: '0.3px',
          }}>
            {winTitle}
          </div>
        </div>

        {/* Window Body */}
        <div 
          ref={bodyRef}
          style={{
            padding: '28px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            scrollbarWidth: 'none',
          }}
          className="code-window-body"
        >
          {highlightCode(currentTypedText, indId, charCount)}
        </div>
      </div>
    </div>
  )
}

export default function IndustrySection({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [active, setActive] = useState(0)
  const [typewriterCounts, setTypewriterCounts] = useState<number[]>([0, 0, 0, 0])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const isClickScrolling = useRef(false)

  // Native CSS & JS Scroll Listener to handle desktop card translateY transitions
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("industries")
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

        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
        if (track) {
          // Translate the track container smoothly based on progress
          const translateY = progress * 1644 // 3 transitions * (500px grid + 48px divider) = 1644px total
          track.style.transform = `translateY(-${translateY}px)`
        }
      } else if (currentScroll < startScroll) {
        setActive(0)
        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
        if (track) track.style.transform = `translateY(0px)`
      } else if (currentScroll > startScroll + scrollDistance) {
        setActive(3)
        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
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
  }, [])

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

  // Typewriter effect triggered when a feature becomes active
  useEffect(() => {
    // Reset current active typewriter count
    setTypewriterCounts((prev) => {
      const next = [...prev]
      next[active] = 0
      return next
    })

    let idx = 0
    const textLength = industries[active].code.length
    const interval = setInterval(() => {
      idx += 3
      if (idx >= textLength) {
        setTypewriterCounts((prev) => {
          const next = [...prev]
          next[active] = textLength
          return next
        })
        clearInterval(interval)
      } else {
        setTypewriterCounts((prev) => {
          const next = [...prev]
          next[active] = idx
          return next
        })
      }
    }, 15)

    return () => clearInterval(interval)
  }, [active])

  useEffect(() => {
    if (isEmbedded) {
      (window as any).setEmbeddedActiveTab = (idx: number) => {
        setActive(idx);
      };
    }
    return () => {
      if (isEmbedded) {
        (window as any).setEmbeddedActiveTab = undefined;
      }
    }
  }, [isEmbedded]);

  // Handle smooth tab clicks and coordinate appropriate scroll offsets
  const handleTabClick = (idx: number) => {
    const el = document.getElementById("industries")
    if (!el) return

    isClickScrolling.current = true
    setActive(idx)

    const w = window as any
    const isDesktop = window.innerWidth >= 992

    if (isDesktop) {
      if (isEmbedded) {
        // If embedded, scroll the main page scrollbar to the corresponding timeline position
        const ScrollTrigger = w.ScrollTrigger;
        if (ScrollTrigger) {
          let st = ScrollTrigger.getById("text-reveal-story");
          if (!st) {
            st = ScrollTrigger.getAll().find((t: any) => t.vars.id === "text-reveal-story" || (t.trigger && t.trigger.id === "scroll-reveal-text"));
          }
            if (st) {
              const labelName = `tab${idx}`;
              let targetScroll;
              if (typeof st.labelToScroll === "function") {
                targetScroll = st.labelToScroll(labelName);
              } else {
                // Fallback to progress calculation if labelToScroll is not available
                const progressMap = [3.1/5.2, 3.8/5.2, 4.4/5.2, 5.1/5.2];
                targetScroll = st.start + progressMap[idx] * (st.end - st.start);
              }

              const logMsg = `Tab: ${idx} | label: ${labelName} | targetScroll: ${Math.round(targetScroll)} | start: ${Math.round(st.start)} | end: ${Math.round(st.end)}`;
              console.log(logMsg);
              const debugConsole = document.getElementById("debug-console");
              if (debugConsole) {
                debugConsole.innerHTML = logMsg;
              }
              if (w.lenis) {
                w.lenis.scrollTo(targetScroll, { duration: 0.85 });
              } else {
                window.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth',
                });
              }
            } else {
            console.warn("ScrollTrigger 'text-reveal-story' not found by ID or trigger element!");
          }
        } else {
          console.warn("GSAP ScrollTrigger not found on window!");
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
    <section id="industries" className={isEmbedded ? "is-embedded" : ""}>
      <div className="industries-sticky-wrapper">
        <div className="container">
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
                Industry Applications
              </span>
            </div>

            <div className="header-split-grid">
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
                Built for environments where failure is not an option.
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
                Generic communication tools don't understand matter confidentiality, HIPAA constraints, NERC CIP requirements, or TWIC verification. These agents do.
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
                  }}
                  className="unkey-tab-btn"
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Window Box Container */}
          <div className="features-window-box">
            {/* Long Vertical Layout containing 4 Feature grid sections */}
            <div className="features-scroll-track">
              {industries.map((ind, idx) => {
                const isTabActive = active === idx
                const currentTypedCount = typewriterCounts[idx]

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
                      }}
                    >
                      {/* LEFT COLUMN — Problem & Details */}
                      <div
                        style={{
                          padding: '24px 32px',
                          borderRight: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          gap: '60px'
                        }}
                      >
                        {/* The Problem Block */}
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
                            THE PROBLEM
                          </span>

                          <p
                            style={{
                              fontSize: 'clamp(15px, 1.6vw, 17px)',
                              fontWeight: 400,
                              color: 'rgba(255,255,255,0.75)',
                              lineHeight: '1.5',
                              margin: 0,
                              fontFamily: 'var(--font-main)',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {ind.problem}
                          </p>
                        </div>

                        {/* How it addresses it Block */}
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
                            HOW IT ADDRESSES IT
                          </span>

                          {/* Three points */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                            {ind.points.map((point, i) => (
                              <div
                                key={i}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '12px',
                                  padding: '10px 0',
                                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
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
                                    opacity: isTabActive ? 1 : 0,
                                    transform: isTabActive ? 'scale(1)' : 'scale(0.8)',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: `${i * 0.12}s`,
                                  }}
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <p
                                  style={{
                                    fontSize: '14px',
                                    color: 'rgba(255,255,255,0.7)',
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
                      </div>

                      <div
                        className="dotted-grid-bg"
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          background: 'rgba(255, 255, 255, 0.01)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'stretch',
                        }}
                      >
                        {/* Outcome Box */}
                        <div
                          className="industry-outcome-box"
                          style={{
                            opacity: isTabActive ? 1 : 0,
                            transform: isTabActive ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            transitionDelay: '0.1s',
                          }}
                        >
                          <span style={{ color: '#10B981', fontSize: '14px', flexShrink: 0 }}>✓</span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '13px',
                              color: '#10B981',
                              letterSpacing: '0.3px',
                              lineHeight: '1.4',
                            }}
                          >
                            {ind.outcome}
                          </span>
                        </div>

                        <div style={{ flex: 1, position: 'relative', width: '100%' }}>
                          <PremiumCodeWindow
                            indId={ind.id}
                            winTitle={ind.windowTitle}
                            rawCode={ind.code}
                            charCount={currentTypedCount}
                          />
                        </div>
                      </div>
                    </div>
                    {idx < industries.length - 1 && <div className="feature-divider" />}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Animations and Styles */}
      <style>{`
        #industries button:focus { outline: none; }
        #industries ::-webkit-scrollbar { display: none; }
        .code-window-body::-webkit-scrollbar { display: none; }

        .unkey-tab-btn {
          position: relative;
        }
        .unkey-tab-btn:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.01) !important;
        }

        /* Dotted Grid Background Animation */
        .dotted-grid-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 0);
          background-size: 18px 18px;
          animation: gridScroll 16s linear infinite;
          overflow: hidden !important;
          height: 100%;
        }

        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 36px 36px; }
        }

        /* Micro-animations */
        @keyframes blinkCursor {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .cursor-blink {
          animation: blinkCursor 0.9s infinite;
        }
        @keyframes blinkDot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .dot-blink {
          animation: blinkDot 1.2s ease-in-out infinite;
        }

        /* Fixed Window Box Desktop Layout */
        .features-window-box {
          height: 500px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: none;
          border-radius: 0px;
          background: #0C0D10;
          overflow: hidden;
          position: relative;
          width: 100%;
          box-shadow: none;
        }

        .features-scroll-track {
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
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.015) 0px,
            rgba(255, 255, 255, 0.015) 1px,
            transparent 1px,
            transparent 10px
          );
          background-color: #0A0B0E;
          width: 100%;
        }

        .header-split-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 24px;
        }

        .industry-outcome-box {
          margin: 20px 20px 0 20px;
          padding: 16px 20px;
          background: #090A0E;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 2;
          position: relative;
        }

        .code-window-body {
          height: 310px;
          font-size: 14px;
        }

        #industries.is-embedded {
          height: auto !important;
          padding: 0 !important;
        }
        #industries.is-embedded .industries-sticky-wrapper {
          position: relative !important;
          top: 0 !important;
          background: transparent !important;
        }

        /* Native Sticky scroll support */
        @media (min-width: 992px) {
          #industries {
            height: 2150px;
            position: relative;
            padding: 40px 0 100px 0 !important;
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
          #industries {
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
          #industries .industry-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: auto !important;
          }
          #industries div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
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
          .features-scroll-track {
            transform: none !important;
            height: auto !important;
          }
          .modal-style-card {
            position: relative !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            margin-top: 32px;
          }
          .dotted-grid-bg {
            padding: 24px;
            overflow: visible !important;
          }
          .industry-outcome-box {
            margin: 0 0 24px 0;
          }
          .code-window-body {
            height: 200px;
          }
        }
      `}</style>
    </section>
  )
}
