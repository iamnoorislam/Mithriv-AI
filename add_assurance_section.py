import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

new_section = """
        <!-- New Assurance Architecture Section (Operational Outcomes Style) -->
        <section
            id="assurance-architecture"
            style={{
                background: '#0b0c0e',
                color: '#FFFFFF',
                padding: '120px 20px',
                position: 'relative',
                zIndex: 10,
                boxSizing: 'border-box',
                fontFamily: "var(--font-main), 'Inter', sans-serif"
            }}
        >
            <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

                {/* ── TOP HEADER (CENTERED) ── */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto 80px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '12px' }}>
                        <span className="ent-pill" style={{
                            margin: 0,
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace"
                        }}>
                            Assurance Architecture
                        </span>
                    </div>

                    <h2 className="std-section-h2 text-center" style={{
                        fontSize: '48px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        marginTop: '0px',
                        marginBottom: '24px'
                    }}>
                        Autonomy with accountability.
                    </h2>

                    <p className="std-section-subheading text-center" style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.45)',
                        lineHeight: 1.7,
                        fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                        maxWidth: '650px',
                        margin: '0 auto 48px',
                        textAlign: 'center'
                    }}>
                        Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous execution that stays auditable.
                    </p>

                    <a href="#" className="ent-btn-primary" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        fontSize: '0.95rem',
                        transform: 'translateZ(0)',
                        position: 'relative',
                        width: 'fit-content'
                    }}>
                        Request architecture review <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><path d="m9 18 6-6-6-6"/></svg>
                    </a>
                </div>

                {/* ── 2x2 GRID ── */}
                <style>{`
                    .assurance-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1px;
                        background: #202022;
                        border: 1px solid #202022;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    @media (max-width: 767px) {
                        .assurance-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
                <div className="assurance-grid">

                    {/* ── CARD 01 ── */}
                    <div
                        className="operational-grid-card"
                        style={{
                            background: '#0f1012',
                            padding: '32px 28px 28px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            minHeight: '420px'
                        }}
                    >
                        <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px', textTransform: 'uppercase' }}>Fig 1.1</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Tested before deployed</h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Every configuration runs through scenario libraries, normal operations, edge cases, failures, before production.</p>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ background: '#141518', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { tag: 'TEST 14A', status: 'PASS', color: '#10b981', text: 'Perimeter breach protocol' },
                                    { tag: 'TEST 14B', status: 'PASS', color: '#10b981', text: 'Simultaneous alarm flood' },
                                    { tag: 'TEST 14C', status: 'PASS', color: '#10b981', text: 'Network partition recovery' },
                                    { tag: 'TEST 14D', status: 'FAIL_SAFE', color: '#fbbf24', text: 'Sensor array blackout' },
                                ].map((test, i) => (
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
                                            animationDelay: `${i * 250}ms`
                                        }}
                                    >
                                        <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.5)', width: '60px' }}>{test.tag}</div>
                                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{test.text}</div>
                                        <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: test.color, background: `rgba(${test.status === 'PASS' ? '16,185,129' : '251,191,36'}, 0.1)`, padding: '3px 6px', borderRadius: '4px' }}>{test.status}</div>
                                    </div>
                                ))}
                                <div style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 12px',
                                    background: 'rgba(16,185,129,0.08)',
                                    border: '1px solid rgba(16,185,129,0.15)',
                                    borderRadius: '6px'
                                }}>
                                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.4)' }}>DEPLOYMENT READY</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono), monospace' }}>100% COVERAGE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CARD 02 ── */}
                    <div
                        className="operational-grid-card"
                        style={{
                            background: '#0f1012',
                            padding: '32px 28px 28px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            minHeight: '420px'
                        }}
                    >
                        <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px', textTransform: 'uppercase' }}>Fig 1.2</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Graduated authority</h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Define what executes automatically. Define what requires approval. The system respects boundaries.</p>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ background: '#141518', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '2px solid #10b981', paddingLeft: '12px' }}>
                                    <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: '#10b981', letterSpacing: '1px' }}>LVL 1: AUTONOMOUS</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>Clear low-priority alarms, dispatch patrols to standard anomalies, manage visitor queues.</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '2px solid #fbbf24', paddingLeft: '12px', marginTop: '8px' }}>
                                    <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', color: '#fbbf24', letterSpacing: '1px' }}>LVL 2: HUMAN IN LOOP</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>Initiate building lockdown, escalate to law enforcement, revoke executive credentials.</div>
                                    <div style={{
                                        background: 'rgba(251,191,36,0.1)',
                                        border: '1px solid rgba(251,191,36,0.2)',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: '4px'
                                    }}>
                                        <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>ACTION PENDING</span>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '9px', color: '#fff', fontFamily: 'var(--font-mono), monospace' }}>REJECT</div>
                                            <div style={{ padding: '4px 8px', background: '#fbbf24', borderRadius: '4px', fontSize: '9px', color: '#000', fontWeight: 'bold', fontFamily: 'var(--font-mono), monospace', animation: 'terminal-pulse 2s infinite' }}>APPROVE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CARD 03 ── */}
                    <div
                        className="operational-grid-card"
                        style={{
                            background: '#0f1012',
                            padding: '32px 28px 28px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            minHeight: '420px'
                        }}
                    >
                        <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px', textTransform: 'uppercase' }}>Fig 1.3</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Complete evidence chains</h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Every decision logged with reasoning, timestamps, approvals. Export-ready for legal, compliance, insurers.</p>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ background: '#141518', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
                                {[
                                    { time: '14:02:44.102', event: 'MOTION_DETECTED', hash: 'e3b0c442' },
                                    { time: '14:02:44.891', event: 'AI_CLASSIFY(THREAT)', hash: '9d5ed678' },
                                    { time: '14:02:45.015', event: 'POLICY_EVAL(LOCKDOWN)', hash: 'f2c9b4e1' },
                                    { time: '14:02:45.340', event: 'REQ_APPROVAL(ADMIN)', hash: '7a19d8c4' },
                                    { time: '14:03:12.884', event: 'AUTH_GRANTED(USER_8)', hash: '3e41b95f', highlight: true },
                                    { time: '14:03:13.002', event: 'EXECUTE(LOCKDOWN)', hash: '8c92a11b' }
                                ].map((log, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '10px', fontFamily: 'var(--font-mono), monospace', opacity: log.highlight ? 1 : 0.6, animation: `typing-line-${i % 4} 8s steps(30, end) infinite`, animationDelay: `${i * 200}ms` }}>
                                        <div style={{ color: '#6b7280' }}>{log.time}</div>
                                        <div style={{ color: log.highlight ? '#a78bfa' : '#9ca3af', flex: 1 }}>{log.event}</div>
                                        <div style={{ color: '#4b5563' }}>[{log.hash}]</div>
                                    </div>
                                ))}
                                <div style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px',
                                    background: 'rgba(139,92,246,0.1)',
                                    border: '1px solid rgba(139,92,246,0.25)',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#a78bfa', fontWeight: 'bold' }}>EXPORT AUDIT LOG (.CSV)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CARD 04 ── */}
                    <div
                        className="operational-grid-card"
                        style={{
                            background: '#0f1012',
                            padding: '32px 28px 28px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            minHeight: '420px'
                        }}
                    >
                        <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0', marginBottom: '14px', textTransform: 'uppercase' }}>Fig 1.4</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '10px' }}>Sovereign-ready</h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '28px', flexShrink: 0 }}>Regional data residency. Customer-managed keys. Air-gapped options. Built for regulated environments.</p>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                            <div style={{ background: '#141518', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                                {/* Map abstract visualization */}
                                <svg width="100%" height="120" viewBox="0 0 200 120" style={{ position: 'absolute', top: '10%', left: 0, opacity: 0.3 }}>
                                    <path d="M20,60 Q40,30 60,60 T100,60 T140,60 T180,60" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
                                    <circle cx="60" cy="60" r="4" fill="#60a5fa" />
                                    <circle cx="140" cy="60" r="4" fill="#60a5fa" />
                                    <circle cx="100" cy="60" r="4" fill="#60a5fa" />
                                </svg>
                                
                                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa' }}></div>
                                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.7)' }}>DATA RESIDENCY</span>
                                        </div>
                                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#60a5fa', fontWeight: 'bold' }}>EU-CENTRAL-1</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.7)' }}>ENCRYPTION</span>
                                        </div>
                                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#60a5fa', fontWeight: 'bold' }}>AES-256 (CMK)</span>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.7)' }}>ENVIRONMENT</span>
                                        </div>
                                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#60a5fa', fontWeight: 'bold' }}>AIR-GAPPED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
"""

divider_index = content.find('<div class="ent-section-divider"></div>')
if divider_index != -1:
    # We found the divider, insert the new section before it
    new_content = content[:divider_index] + new_section + content[divider_index:]
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully added new Assurance Architecture section.")
else:
    print("Could not find ent-section-divider to inject the section.")

