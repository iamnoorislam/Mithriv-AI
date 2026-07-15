'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import '../style.css'

// Tokenizing code parser for syntax highlighting
const highlightCode = (rawText: string, indId: string, charCount: number) => {
  const lines = rawText.split('\n')
  const totalLines = lines.length
  const currentCodeLength = industriesData.find(ind => ind.id === indId)?.code.length || 0

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
      else if (['Verify', 'verify_visitor', 'mask_frequency', 'conflict_check', 'notify_discreetly', 'log', 'print', 'DetectAndTranslate', 'Sync', 'CorrelateCredentials', 'Alert', 'LockGate', 'LogCorrelation'].includes(part)) {
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
            <span className="cursor-blink" style={{ color: '#7700FF', fontWeight: 'bold', marginLeft: '1px' }}>_</span>
          )}
        </span>
      </div>
    )
  })
}

// Premium Code Window Component
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

  let meshColor = 'rgba(119, 0, 255, 0.16)'
  if (indId === 'law') {
    meshColor = 'rgba(119, 0, 255, 0.18)'
  } else if (indId === 'health') {
    meshColor = 'rgba(16, 185, 129, 0.18)'
  } else if (indId === 'finance') {
    meshColor = 'rgba(6, 182, 212, 0.18)'
  } else if (indId === 'critical') {
    meshColor = 'rgba(245, 158, 11, 0.15)'
  } else if (indId === 'ports') {
    meshColor = 'rgba(236, 72, 153, 0.18)'
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

      {/* Card Window Container */}
      <div
        className="modal-style-card"
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: '-30px',
          right: '-30px',
          width: 'calc(100% + 10px)',
          background: '#0B0D12',
          border: '1px solid #212326',
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
          borderBottom: '1px solid #212326',
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

const industriesData = [
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
    id: 'finance',
    label: '03 Financial Services',
    problem: 'Insider threat, credential misuse, and tailgating are the leading causes of financial sector security breaches. None are detectable by perimeter systems alone.',
    points: [
      'Credential anomalies detected before they become breaches.',
      'Access, identity, and comms correlated into one picture.',
      'Risk scoring prioritizes people and zones automatically.',
    ],
    outcome: 'Insider threat detection increased by 340%.',
    windowTitle: 'credential_verify.go',
    code: `// Insider threat detection matrix
func CorrelateCredentials(access AccessEvent) {
    if access.AnomalyScore > 0.85 {
        swarms.Alert("Credential misuse flagged")
        swarms.LockGate(access.GateID)
    }
    audit.LogCorrelation(access.UserID)
}`
  },
  {
    id: 'critical',
    label: '04 Critical Infrastructure',
    problem: 'NERC CIP mandates 15-minute alert response and 90-day log retention. Manual processes cannot meet these standards consistently.',
    points: [
      'Unauthorized access triggers immediate notification with timestamped confirmation.',
      'Escort coordination logged with complete chain of custody.',
      'Compliance documentation generated automatically.',
    ],
    outcome: 'Audit preparation reduced from weeks to hours.',
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
    label: '05 Ports & Airports',
    problem: 'TSA, CBP, Coast Guard, and port authority each with separate systems. 240+ languages. Time-critical operations where delays cascade.',
    points: [
      'TWIC credential verification integrated natively.',
      '240+ language support. No interpreter dependency.',
      'Multi-agency coordination through a single interface.',
    ],
    outcome: 'Language barriers eliminated. TWIC card verification instantaneous.',
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

export default function IndustriesPage() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(0)
  const [typewriterCounts, setTypewriterCounts] = useState<number[]>([0, 0, 0, 0, 0])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const isClickScrolling = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dot Canvas hook for background breathing
  useEffect(() => {
    if (!mounted) return
    const w = window as any
    let timer: any
    let deferTimer: any
    const refreshTimers: any[] = []

    const init = () => {
      if (w.runHeroDotCanvas02 && w.runMain && w.gsap && w.ScrollTrigger) {
        deferTimer = setTimeout(() => {
          try {
            w.runHeroDotCanvas02()
          } catch (e) {
            console.error("Error in runHeroDotCanvas02:", e)
          }
          try {
            w.runMain()
          } catch (e) {
            console.error("Error in runMain:", e)
          }

          if (w.ScrollTrigger) {
            refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 100))
            refreshTimers.push(setTimeout(() => w.ScrollTrigger.refresh(), 500))
          }
        }, 100)
      } else {
        timer = setTimeout(init, 50)
      }
    }
    init()

    return () => {
      clearTimeout(timer)
      clearTimeout(deferTimer)
      refreshTimers.forEach(t => clearTimeout(t))
      if (w.cleanupMain) {
        w.cleanupMain()
      }
      if (w.gsap && w.ScrollTrigger) {
        w.ScrollTrigger.getAll().forEach((t: any) => t.kill(true))
      }
      if (w.cancelHeroDotCanvas02Anim) {
        w.cancelHeroDotCanvas02Anim()
      }
    }
  }, [mounted])

  // Desktop Card Scroll Translation Logic
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const el = document.getElementById("industries")
      if (!el) return

      const rect = el.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const startScroll = elementTop + 40 - 50
      const scrollDistance = 1600 // Total scrollable height
      const currentScroll = window.scrollY

      if (currentScroll >= startScroll && currentScroll <= startScroll + scrollDistance) {
        const progress = (currentScroll - startScroll) / scrollDistance
        const activeIndex = Math.round(progress * 4) // 5 tabs (indices 0 to 4)
        setActive(activeIndex)

        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
        if (track) {
          // 4 transitions * (500px card height + 48px divider) = 2192px track length
          const translateY = progress * 2192
          track.style.transform = `translateY(-${translateY}px)`
        }
      } else if (currentScroll < startScroll) {
        setActive(0)
        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
        if (track) track.style.transform = `translateY(0px)`
      } else if (currentScroll > startScroll + scrollDistance) {
        setActive(4)
        const track = document.querySelector(".features-scroll-track") as HTMLDivElement
        if (track) track.style.transform = `translateY(-2192px)`
      }
    }

    const checkAndListen = () => {
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
  }, [mounted])

  // Mobile viewport observer
  useEffect(() => {
    if (!mounted || window.innerWidth >= 992) return

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
  }, [mounted])

  // Typewriter effect trigger
  useEffect(() => {
    if (!mounted) return

    setTypewriterCounts((prev) => {
      const next = [...prev]
      next[active] = 0
      return next
    })

    let idx = 0
    const textLength = industriesData[active].code.length
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
  }, [active, mounted])

  const handleTabClick = (idx: number) => {
    const el = document.getElementById("industries")
    if (!el) return

    isClickScrolling.current = true
    setActive(idx)

    const w = window as any
    const isDesktop = window.innerWidth >= 992

    if (isDesktop) {
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
      const targetEl = containerRefs.current[idx]
      if (targetEl) {
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - 120

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

  if (!mounted) return null

  return (
    <div className="landing-theme">
      {/* Global Background Elements */}
      <div className="global-grid-bg" id="globalGridBg"></div>
      <div className="grain-overlay"></div>

      {/* HERO SECTION */}
      <main className="hero-section" id="hero" style={{ paddingTop: '200px', paddingBottom: '120px' }}>
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
          <div className="ent-pill award-pill">Industry Solutions</div>
          <h1 className="main-heading">
            <span className="word-mask"><span className="word-inner w1">Built</span></span>{' '}
            <span className="word-mask"><span className="word-inner w2">for</span></span>{' '}
            <span className="word-mask"><span className="word-inner w3">high-stakes</span></span><br />
            <span className="word-mask"><span className="word-inner w4">security</span></span>{' '}
            <span className="word-mask"><span className="word-inner w5">environments.</span></span>
          </h1>
          <p className="body-text award-fade-up delay-p" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
            Mithriv replaces manual procedures with autonomous Swarm Intelligence. Explore our vertical-specific implementations designed for zero-trust environments.
          </p>
          <div className="award-fade-up delay-btn" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#" className="ent-btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              Request Industry Brief
              <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg>
            </Link>
            <Link href="#" className="ent-btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s ease' }}>
              View Compliance Matrix
            </Link>
          </div>
        </div>

        {/* Trusted By Strip / Regulatory Standards */}
        <div className="relative w-full max-w-[1280px] mx-auto px-6 z-10 award-fade-up delay-strip" style={{ paddingTop: '140px', paddingBottom: '40px', marginTop: 'auto' }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes custom-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
          `}} />
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Verified compliance & operational models
            </h2>
          </div>
          
          <div className="relative flex overflow-hidden w-full group">
            <div className="flex overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
              {[0, 1].map((marqueeIdx) => (
                <div key={marqueeIdx} className="flex shrink-0 items-center justify-start w-max" style={{ gap: '4rem', minWidth: '100%', paddingRight: '4rem', animation: 'custom-marquee 20s linear infinite' }}>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">NERC CIP</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">HIPAA COMPLIANT</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">TSA SECURE</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">TWIC CARD MATRIX</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">SOC 2 TYPE II</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">GDPR COMPLIANT</div>
                  <div className="text-[#fff] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity font-mono">CBP VERIFIED</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* VERTICAL EXPLORER SECTION */}
      <section id="industries" style={{ background: 'transparent', position: 'relative', zIndex: 10, borderTop: '1px solid #212326', borderBottom: '1px solid #212326' }}>
        <div className="industries-sticky-wrapper">
          <div className="container">
            {/* Header Group */}
            <div style={{ paddingTop: '80px', paddingBottom: '0px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                <span className="ent-pill" style={{ marginLeft: '0px', marginBottom: '0px' }}>
                  Industry Applications
                </span>
              </div>

              <div className="header-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', marginBottom: '40px' }}>
                <h2 className="std-section-h2" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: '0px', marginBottom: '0px', letterSpacing: '-0.02em', fontWeight: 600, textAlign: 'left', lineHeight: '1.2', color: '#ffffff' }}>
                  Built for environments where failure is not an option
                </h2>
                <p style={{ fontSize: '14px', color: '#B6B6B7', lineHeight: '1.55', textAlign: 'left', marginTop: '0', marginBottom: '0px', fontFamily: 'var(--font-mono)' }}>
                  Generic communication tools do not understand matter privilege, HIPAA rules, NERC CIP compliance, or TWIC credentials. Our agents do.
                </p>
              </div>

              {/* Tab rail */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid #212326', borderLeft: '1px solid #212326', background: 'transparent' }}>
                {industriesData.map((ind, idx) => (
                  <button
                    key={ind.id}
                    onClick={() => handleTabClick(idx)}
                    style={{
                      background: active === idx ? '#212326' : 'transparent',
                      border: 'none',
                      borderRight: '1px solid #212326',
                      borderBottom: '1px solid #212326',
                      padding: '16px 12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: active === idx ? 600 : 400,
                      color: active === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    className={`unkey-tab-btn ${active === idx ? 'active' : ''}`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fixed Window Box Container */}
            <div className="features-window-box" style={{ height: '500px', overflow: 'hidden', borderBottom: '1px solid #212326', borderLeft: '1px solid #212326', borderRight: '1px solid #212326', background: 'rgba(10,10,12,0.6)' }}>
              <div className="features-scroll-track" style={{ transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                {industriesData.map((ind, idx) => {
                  const isTabActive = active === idx
                  const currentTypedCount = typewriterCounts[idx]

                  return (
                    <React.Fragment key={ind.id}>
                      <div
                        ref={(el) => { containerRefs.current[idx] = el }}
                        data-index={idx}
                        className="industry-grid"
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', height: '500px' }}
                      >
                        {/* LEFT COLUMN — Problem & Details */}
                        <div style={{ padding: '40px', borderRight: '1px solid #212326', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px' }}>
                          <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(239,68,68,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(239,68,68,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                              THE PROBLEM
                            </span>
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)', letterSpacing: '-0.01em' }}>
                              {ind.problem}
                            </p>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(119,0,255,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(119,0,255,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                              HOW IT ADDRESSES IT
                            </span>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {ind.points.map((point, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid #212326' : 'none', position: 'relative' }}>
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--primary-purple)"
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
                                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)' }}>
                                    {point}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* RIGHT COLUMN - Code Window */}
                        <div className="dotted-grid-bg" style={{ position: 'relative', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.01)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                          {/* Outcome Box */}
                          <div
                            className="industry-outcome-box"
                            style={{
                              padding: '16px 24px',
                              borderBottom: '1px solid #212326',
                              background: 'rgba(16,185,129,0.02)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              opacity: isTabActive ? 1 : 0,
                              transform: isTabActive ? 'translateY(0)' : 'translateY(-10px)',
                              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                              transitionDelay: '0.1s',
                            }}
                          >
                            <span style={{ color: '#10B981', fontSize: '14px', flexShrink: 0 }}>✓</span>
                            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '13px', color: '#10B981', letterSpacing: '0.3px', lineHeight: '1.4' }}>
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
                      {idx < industriesData.length - 1 && <div className="feature-divider" style={{ height: '48px', borderLeft: '1px solid #212326', borderRight: '1px solid #212326', background: 'rgba(10,10,12,0.6)' }} />}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE MATRIX BENTO GRID */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="text-center mb-16">
            <span className="ent-pill">Operational Compliance</span>
            <h2 className="std-section-h2" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: '16px', letterSpacing: '-0.02em', fontWeight: 600, color: '#ffffff' }}>
              Built for strict compliance frameworks
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid #212326', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(119,0,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)' }}>
                🔒
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0 }}>NERC CIP Compliance</h3>
              <p style={{ fontSize: '14px', color: '#B6B6B7', lineHeight: '1.5', margin: 0 }}>
                Automates physical security logs, visitor logs, and escort verification records to fulfill NERC CIP-004 and CIP-006 audit mandates continuously in real time.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid #212326', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0 }}>HIPAA Privacy Guard</h3>
              <p style={{ fontSize: '14px', color: '#B6B6B7', lineHeight: '1.5', margin: 0 }}>
                Enforces role-based visitor logs and silent, unannounced check-in procedures to safeguard patient identity and secure restricted medical wards.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid #212326', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                📋
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0 }}>TSA / TWIC Validation</h3>
              <p style={{ fontSize: '14px', color: '#B6B6B7', lineHeight: '1.5', margin: 0 }}>
                Directly cross-references federal credentials (TWIC cards, active licenses) with current personnel registries and gate access control systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES & INTERACTION DEFINITIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        #industries button:focus { outline: none; }
        #industries ::-webkit-scrollbar { display: none; }

        .unkey-tab-btn {
          position: relative;
        }
        .unkey-tab-btn:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.01) !important;
        }

        .cursor-blink {
          animation: blink-caret 1s step-end infinite;
        }

        @keyframes blink-caret {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
      `}} />
    </div>
  )
}
