import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "<!-- New Assurance Architecture Section (Operational Outcomes Style) -->"
end_marker = "<div class=\"ent-section-divider\"></div>"

s_idx = content.find(start_marker)
e_idx = content.find(end_marker, s_idx)

if s_idx == -1 or e_idx == -1:
    print(f"Error finding bounds: {s_idx}, {e_idx}")
    sys.exit(1)

new_section = """        <!-- New Assurance Architecture Section (Operational Outcomes Style) -->
        <section
            id="assurance-architecture"
            style="background: #0b0c0e; color: #FFFFFF; padding: 120px 20px; position: relative; z-index: 10; box-sizing: border-box; font-family: var(--font-main), 'Inter', sans-serif;"
        >
            <div style="max-width: 1140px; margin: 0 auto;">

                <!-- ── TOP HEADER (CENTERED) ── -->
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto 80px;">
                    <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 12px;">
                        <span class="ent-pill" style="margin: 0; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #FFFFFF; font-family: var(--font-mono), 'JetBrains Mono', monospace;">
                            Assurance Architecture
                        </span>
                    </div>

                    <h2 class="std-section-h2 text-center" style="font-size: 48px; font-weight: 600; letter-spacing: -0.02em; text-align: center; line-height: 1.2; margin-top: 0px; margin-bottom: 24px;">
                        Autonomy with accountability.
                    </h2>

                    <p class="std-section-subheading text-center" style="font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; font-family: var(--font-mono), JetBrains Mono, monospace; max-width: 650px; margin: 0 auto 48px; text-align: center;">
                        Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous execution that stays auditable.
                    </p>

                    <a href="#" class="ent-btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 0.95rem; transform: translateZ(0); position: relative; width: fit-content;">
                        Request architecture review <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;"><path d="m9 18 6-6-6-6"/></svg>
                    </a>
                </div>

                <!-- ── 2x2 GRID ── -->
                <style>
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
                </style>
                <div class="assurance-grid">

                    <!-- ── CARD 01 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.1</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Tested before deployed</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Every configuration runs through scenario libraries, normal operations, edge cases, failures, before production.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden;">
                            <div style="background: #141518; padding: 20px; height: 100%; display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid #202022; border-radius: 6px; animation: contractor-item-cycle 6s infinite; animation-delay: 0ms;">
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5); width: 60px;">TEST 14A</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Perimeter breach protocol</div>
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: #10b981; background: rgba(16,185,129, 0.1); padding: 3px 6px; border-radius: 4px;">PASS</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid #202022; border-radius: 6px; animation: contractor-item-cycle 6s infinite; animation-delay: 250ms;">
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5); width: 60px;">TEST 14B</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Simultaneous alarm flood</div>
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: #10b981; background: rgba(16,185,129, 0.1); padding: 3px 6px; border-radius: 4px;">PASS</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid #202022; border-radius: 6px; animation: contractor-item-cycle 6s infinite; animation-delay: 500ms;">
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5); width: 60px;">TEST 14C</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Network partition recovery</div>
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: #10b981; background: rgba(16,185,129, 0.1); padding: 3px 6px; border-radius: 4px;">PASS</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid #202022; border-radius: 6px; animation: contractor-item-cycle 6s infinite; animation-delay: 750ms;">
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5); width: 60px;">TEST 14D</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Sensor array blackout</div>
                                    <div style="font-size: 9px; font-family: var(--font-mono), monospace; color: #fbbf24; background: rgba(251,191,36, 0.1); padding: 3px 6px; border-radius: 4px;">FAIL_SAFE</div>
                                </div>
                                <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.15); border-radius: 6px;">
                                    <span style="font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.4);">DEPLOYMENT READY</span>
                                    <span style="font-size: 14px; font-weight: 700; color: #10b981; font-family: var(--font-mono), monospace;">100% COVERAGE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ── CARD 02 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.2</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Graduated authority</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Define what executes automatically. Define what requires approval. The system respects boundaries.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden;">
                            <div style="background: #141518; padding: 20px; height: 100%; display: flex; flex-direction: column; gap: 12px;">
                                <div style="display: flex; flex-direction: column; gap: 8px; border-left: 2px solid #10b981; padding-left: 12px;">
                                    <div style="font-size: 10px; font-family: var(--font-mono), monospace; color: #10b981; letter-spacing: 1px;">LVL 1: AUTONOMOUS</div>
                                    <div style="font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.4;">Clear low-priority alarms, dispatch patrols to standard anomalies, manage visitor queues.</div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 8px; border-left: 2px solid #fbbf24; padding-left: 12px; margin-top: 8px;">
                                    <div style="font-size: 10px; font-family: var(--font-mono), monospace; color: #fbbf24; letter-spacing: 1px;">LVL 2: HUMAN IN LOOP</div>
                                    <div style="font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.4;">Initiate building lockdown, escalate to law enforcement, revoke executive credentials.</div>
                                    <div style="background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.2); border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
                                        <span style="font-size: 11px; color: #fbbf24; font-weight: 600;">ACTION PENDING</span>
                                        <div style="display: flex; gap: 6px;">
                                            <div style="padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 9px; color: #fff; font-family: var(--font-mono), monospace;">REJECT</div>
                                            <div style="padding: 4px 8px; background: #fbbf24; border-radius: 4px; font-size: 9px; color: #000; font-weight: bold; font-family: var(--font-mono), monospace; animation: terminal-pulse 2s infinite;">APPROVE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ── CARD 03 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.3</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Complete evidence chains</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Every decision logged with reasoning, timestamps, approvals. Export-ready for legal, compliance, insurers.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden;">
                            <div style="background: #141518; padding: 16px; height: 100%; display: flex; flex-direction: column; gap: 6px; overflow: hidden;">
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 0.6; animation: typing-line-0 8s steps(30, end) infinite; animation-delay: 0ms;">
                                    <div style="color: #6b7280;">14:02:44.102</div>
                                    <div style="color: #9ca3af; flex: 1;">MOTION_DETECTED</div>
                                    <div style="color: #4b5563;">[e3b0c442]</div>
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 0.6; animation: typing-line-1 8s steps(30, end) infinite; animation-delay: 200ms;">
                                    <div style="color: #6b7280;">14:02:44.891</div>
                                    <div style="color: #9ca3af; flex: 1;">AI_CLASSIFY(THREAT)</div>
                                    <div style="color: #4b5563;">[9d5ed678]</div>
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 0.6; animation: typing-line-2 8s steps(30, end) infinite; animation-delay: 400ms;">
                                    <div style="color: #6b7280;">14:02:45.015</div>
                                    <div style="color: #9ca3af; flex: 1;">POLICY_EVAL(LOCKDOWN)</div>
                                    <div style="color: #4b5563;">[f2c9b4e1]</div>
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 0.6; animation: typing-line-3 8s steps(30, end) infinite; animation-delay: 600ms;">
                                    <div style="color: #6b7280;">14:02:45.340</div>
                                    <div style="color: #9ca3af; flex: 1;">REQ_APPROVAL(ADMIN)</div>
                                    <div style="color: #4b5563;">[7a19d8c4]</div>
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 1; animation: typing-line-0 8s steps(30, end) infinite; animation-delay: 800ms;">
                                    <div style="color: #6b7280;">14:03:12.884</div>
                                    <div style="color: #a78bfa; flex: 1;">AUTH_GRANTED(USER_8)</div>
                                    <div style="color: #4b5563;">[3e41b95f]</div>
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 10px; font-family: var(--font-mono), monospace; opacity: 0.6; animation: typing-line-1 8s steps(30, end) infinite; animation-delay: 1000ms;">
                                    <div style="color: #6b7280;">14:03:13.002</div>
                                    <div style="color: #9ca3af; flex: 1;">EXECUTE(LOCKDOWN)</div>
                                    <div style="color: #4b5563;">[8c92a11b]</div>
                                </div>
                                <div style="margin-top: auto; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 10px; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #a78bfa; font-weight: bold;">EXPORT AUDIT LOG (.CSV)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ── CARD 04 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.4</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Sovereign-ready</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Regional data residency. Customer-managed keys. Air-gapped options. Built for regulated environments.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden; position: relative;">
                            <div style="background: #141518; height: 100%; position: relative; display: flex; flex-direction: column; justify-content: center; padding: 20px;">
                                <!-- Map abstract visualization -->
                                <svg width="100%" height="120" viewBox="0 0 200 120" style="position: absolute; top: 10%; left: 0; opacity: 0.3;">
                                    <path d="M20,60 Q40,30 60,60 T100,60 T140,60 T180,60" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4 4" />
                                    <circle cx="60" cy="60" r="4" fill="#60a5fa" />
                                    <circle cx="140" cy="60" r="4" fill="#60a5fa" />
                                    <circle cx="100" cy="60" r="4" fill="#60a5fa" />
                                </svg>
                                
                                <div style="position: relative; z-index: 2; display: flex; flex-direction: column; gap: 12px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #60a5fa;"></div>
                                            <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7);">DATA RESIDENCY</span>
                                        </div>
                                        <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #60a5fa; font-weight: bold;">EU-CENTRAL-1</span>
                                    </div>
                                    
                                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7);">ENCRYPTION</span>
                                        </div>
                                        <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #60a5fa; font-weight: bold;">AES-256 (CMK)</span>
                                    </div>

                                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                            <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7);">ENVIRONMENT</span>
                                        </div>
                                        <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #60a5fa; font-weight: bold;">AIR-GAPPED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
"""

new_content = content[:s_idx] + new_section + content[e_idx:]
with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Successfully replaced bad JSX syntax with pure HTML syntax.")
