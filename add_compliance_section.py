import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Locate insertion point (right before <div class="ent-section-divider"></div> and <!-- Global Threat Ticker -->)
insert_point = content.find('<div class="ent-section-divider"></div>\n\n        <!-- Global Threat Ticker -->')

if insert_point == -1:
    sys.exit("Could not find insertion point for compliance section.")

new_section = """
        <!-- New Compliance Automates Section (Sticky Scroll Layout) -->
        <style>
            .compliance-sticky-layout {
                display: flex;
                flex-direction: row;
                gap: 80px;
                align-items: flex-start;
                max-width: 1280px;
                margin: 0 auto;
            }
            .compliance-sticky-col {
                flex: 0 0 400px;
                position: sticky;
                top: 140px;
                padding-bottom: 40px;
            }
            .compliance-scroll-col {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 60px;
                padding-bottom: 120px;
            }
            @media (max-width: 991px) {
                .compliance-sticky-layout {
                    flex-direction: column;
                    gap: 40px;
                }
                .compliance-sticky-col {
                    flex: 1;
                    width: 100%;
                    position: relative;
                    top: 0;
                    padding-bottom: 0;
                }
            }
            @keyframes scan-sweep-horizontal {
                0% { transform: translateX(-100%); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateX(200%); opacity: 0; }
            }
        </style>

        <section id="compliance-automates" style="background: transparent; color: #FFFFFF; padding: 120px 20px 0; position: relative; z-index: 10; box-sizing: border-box; font-family: var(--font-main), 'Inter', sans-serif;">
            <div class="compliance-sticky-layout">
                
                <!-- Left Sticky Column -->
                <div class="compliance-sticky-col">
                    <div style="margin-bottom: 16px;">
                        <span class="ent-pill" style="margin: 0; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #FFFFFF; font-family: var(--font-mono), 'JetBrains Mono', monospace;">
                            Compliance Automates
                        </span>
                    </div>
                    <h2 class="std-section-h2" style="font-size: 48px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin-top: 0px; margin-bottom: 24px;">
                        Audit-ready as a default state.
                    </h2>
                    <p class="std-section-subheading" style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.6; font-family: var(--font-mono), JetBrains Mono, monospace; margin-bottom: 40px;">
                        When operations flow through a unified system, compliance documentation is automatic. No scrambling, no manual logging.
                    </p>
                    <a href="#" class="ent-btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 0.95rem; transform: translateZ(0); position: relative; width: fit-content;">
                        View Compliance Center
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>

                <!-- Right Scrolling Column -->
                <div class="compliance-scroll-col">
                    
                    <!-- CARD 2.1 -->
                    <div style="background: #121316; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 48px; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 24px 48px rgba(0,0,0,0.4);">
                        <div>
                            <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 12px; display: block; text-transform: uppercase;">Fig 2.1 — Auto-Evidence</span>
                            <h3 style="font-size: 24px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 16px; margin-top: 0;">Evidence generates itself</h3>
                            <p style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.65; margin: 0;">When operations flow through a unified system, compliance documentation is automatic, not a separate project.</p>
                        </div>
                        <div style="border-radius: 8px; overflow: hidden; background: #0b0c0e; border: 1px solid rgba(255,255,255,0.02); min-height: 320px; position: relative;">
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 40px; height: 100%;">
                                <!-- Left: Data stream -->
                                <div style="display: flex; flex-direction: column; gap: 16px;">
                                    <div style="width: 140px; height: 10px; background: rgba(99, 84, 243, 0.1); border-radius: 5px; overflow: hidden; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 60px; background: #6354F3; animation: scan-sweep-horizontal 2s linear infinite reverse;"></div>
                                    </div>
                                    <div style="width: 100px; height: 10px; background: rgba(99, 84, 243, 0.1); border-radius: 5px; overflow: hidden; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 40px; background: #6354F3; animation: scan-sweep-horizontal 3s linear infinite reverse;"></div>
                                    </div>
                                    <div style="width: 160px; height: 10px; background: rgba(99, 84, 243, 0.1); border-radius: 5px; overflow: hidden; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 80px; background: #6354F3; animation: scan-sweep-horizontal 2.5s linear infinite reverse;"></div>
                                    </div>
                                </div>
                                
                                <!-- Middle: Sync/Process icon -->
                                <div style="width: 64px; height: 64px; border-radius: 32px; background: rgba(143, 146, 233, 0.1); border: 1px solid rgba(143, 146, 233, 0.3); display: flex; justify-content: center; align-items: center;">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8F92E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotateOrbitPath 4s linear infinite;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                </div>

                                <!-- Right: Evidence File -->
                                <div style="width: 140px; height: 180px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; padding: 20px; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                        <span style="color: #fff; font-size: 11px; font-weight: bold; font-family: var(--font-mono);">SECURE_LOG</span>
                                    </div>
                                    <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                                        <div style="height: 6px; width: 100%; background: rgba(255,255,255,0.1); border-radius: 3px;"></div>
                                        <div style="height: 6px; width: 80%; background: rgba(255,255,255,0.1); border-radius: 3px;"></div>
                                        <div style="height: 6px; width: 90%; background: rgba(255,255,255,0.1); border-radius: 3px;"></div>
                                        <div style="height: 6px; width: 60%; background: rgba(255,255,255,0.1); border-radius: 3px;"></div>
                                    </div>
                                    <div style="margin-top: auto; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: rgba(255,255,255,0.4); font-size: 9px; font-family: var(--font-mono);">TIMESTAMP</span>
                                        <span style="color: #49B25C; font-size: 9px; font-family: var(--font-mono); animation: grant-pulse 2s infinite;">VERIFIED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CARD 2.2 -->
                    <div style="background: #121316; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 48px; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 24px 48px rgba(0,0,0,0.4);">
                        <div>
                            <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 12px; display: block; text-transform: uppercase;">Fig 2.2 — Multi-Framework</span>
                            <h3 style="font-size: 24px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 16px; margin-top: 0;">Frameworks addressed</h3>
                            <p style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.65; margin: 0;">SOC 2 Type II · PCI DSS · HIPAA · ISO 27001 · NERC CIP · GxP/Annex 11 · IEC 62443</p>
                        </div>
                        <div style="border-radius: 8px; overflow: hidden; background: #0b0c0e; border: 1px solid rgba(255,255,255,0.02); min-height: 320px; position: relative;">
                            <div style="padding: 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; height: 100%; align-content: center;">
                                <div style="padding: 16px; border-radius: 8px; background: rgba(175, 249, 98, 0.05); border: 1px solid rgba(175, 249, 98, 0.2); text-align: center; color: #AFF962; font-family: var(--font-mono); font-size: 12px; font-weight: bold; box-shadow: 0 0 20px rgba(175, 249, 98, 0.1);">SOC 2 Type II</div>
                                <div style="padding: 16px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 12px;">PCI DSS</div>
                                <div style="padding: 16px; border-radius: 8px; background: rgba(234, 73, 178, 0.05); border: 1px solid rgba(234, 73, 178, 0.2); text-align: center; color: #EA49B2; font-family: var(--font-mono); font-size: 12px; font-weight: bold; box-shadow: 0 0 20px rgba(234, 73, 178, 0.1);">HIPAA</div>
                                <div style="padding: 16px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 12px;">ISO 27001</div>
                                <div style="padding: 16px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 12px;">NERC CIP</div>
                                <div style="padding: 16px; border-radius: 8px; background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); text-align: center; color: #4993E3; font-family: var(--font-mono); font-size: 12px; font-weight: bold; box-shadow: 0 0 20px rgba(73, 147, 227, 0.1);">GxP/Annex 11</div>
                                <div style="grid-column: 2; padding: 16px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 12px;">IEC 62443</div>
                            </div>
                        </div>
                    </div>

                    <!-- CARD 2.3 -->
                    <div style="background: #121316; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 48px; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 24px 48px rgba(0,0,0,0.4);">
                        <div>
                            <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 12px; display: block; text-transform: uppercase;">Fig 2.3 — Time Compression</span>
                            <h3 style="font-size: 24px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 16px; margin-top: 0;">Hours, not months</h3>
                            <p style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.65; margin: 0;">What took 2-3 months of preparation now takes a query and an export.</p>
                        </div>
                        <div style="border-radius: 8px; overflow: hidden; background: #0b0c0e; border: 1px solid rgba(255,255,255,0.02); min-height: 320px; position: relative;">
                            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; padding: 40px; position: relative;">
                                <!-- Large circular dial background -->
                                <div style="width: 220px; height: 220px; border-radius: 110px; border: 1px dashed rgba(255,255,255,0.1); position: absolute; display: flex; justify-content: center; align-items: center; top: 50%; transform: translateY(-50%);">
                                    <div style="width: 150px; height: 150px; border-radius: 75px; border: 1px solid rgba(252, 229, 69, 0.2); background: rgba(252, 229, 69, 0.05); display: flex; justify-content: center; align-items: center; box-shadow: 0 0 50px rgba(252, 229, 69, 0.1);">
                                        <div style="text-align: center;">
                                            <div style="font-size: 38px; font-weight: 700; color: #FCE545; line-height: 1;">2.4<span style="font-size: 16px; margin-left: 4px;">hrs</span></div>
                                            <div style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: var(--font-mono); margin-top: 6px; text-transform: uppercase;">Prep Time</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Rotating orbit dot -->
                                    <div style="position: absolute; width: 100%; height: 100%; animation: rotateOrbitPath 6s linear infinite;">
                                        <div style="position: absolute; top: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 5px; background: #FCE545; box-shadow: 0 0 12px #FCE545;"></div>
                                    </div>
                                </div>
                                
                                <!-- Old time reference -->
                                <div style="position: absolute; bottom: 32px; left: 32px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 6px; text-decoration: line-through; color: rgba(255,255,255,0.3); font-family: var(--font-mono); font-size: 12px;">
                                    PREVIOUS: 3 MONTHS
                                </div>

                                <!-- Export button -->
                                <div style="position: absolute; bottom: 32px; right: 32px; background: rgba(231, 199, 59, 0.15); border: 1px solid rgba(231, 199, 59, 0.3); padding: 10px 20px; border-radius: 6px; color: #E7C73B; font-family: var(--font-mono); font-size: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s; box-shadow: 0 4px 14px rgba(231, 199, 59, 0.2);">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    EXPORT REPORT
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CARD 2.4 -->
                    <div style="background: #121316; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 48px; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 24px 48px rgba(0,0,0,0.4);">
                        <div>
                            <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 12px; display: block; text-transform: uppercase;">Fig 2.4 — Continuous Monitoring</span>
                            <h3 style="font-size: 24px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 16px; margin-top: 0;">Continuous conformance</h3>
                            <p style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.65; margin: 0;">Policy adherence measured in real-time. Violations flagged immediately. No audit-season panic.</p>
                        </div>
                        <div style="border-radius: 8px; overflow: hidden; background: #0b0c0e; border: 1px solid rgba(255,255,255,0.02); min-height: 320px; position: relative;">
                            <div style="display: flex; flex-direction: column; height: 100%; padding: 40px; position: absolute; inset: 0;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 10px; height: 10px; border-radius: 5px; background: #49B25C; animation: terminal-pulse 2s infinite;"></div>
                                        <span style="color: #49B25C; font-size: 14px; font-family: var(--font-mono); font-weight: bold;">100% CONFORMANCE</span>
                                    </div>
                                    <div style="color: rgba(255,255,255,0.4); font-size: 14px; font-family: var(--font-mono);">VIOLATIONS: 0</div>
                                </div>
                                
                                <!-- Live chart bars -->
                                <div style="flex: 1; display: flex; align-items: flex-end; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0; margin-bottom: 32px; overflow: hidden;">
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 3s infinite ease-in-out alternate;" style="height: 60%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 4s infinite ease-in-out alternate-reverse;" style="height: 40%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 2.5s infinite ease-in-out alternate;" style="height: 75%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 3.5s infinite ease-in-out alternate-reverse;" style="height: 50%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 3.2s infinite ease-in-out alternate;" style="height: 90%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 2.8s infinite ease-in-out alternate-reverse;" style="height: 30%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.15); border-radius: 4px 4px 0 0; animation: riseKpiBar 4.5s infinite ease-in-out alternate;" style="height: 65%; transform-origin: bottom;"></div>
                                    <div style="flex: 1; background: rgba(73, 178, 92, 0.4); border: 1px solid #49B25C; border-bottom: none; border-radius: 4px 4px 0 0; height: 100%; box-shadow: 0 -10px 30px rgba(73, 178, 92, 0.15);"></div>
                                </div>
                                
                                <!-- Real-time log -->
                                <div style="background: rgba(217, 134, 240, 0.05); border: 1px solid rgba(217, 134, 240, 0.15); border-radius: 8px; padding: 16px; display: flex; align-items: center; gap: 16px;">
                                    <div style="width: 32px; height: 32px; border-radius: 16px; background: rgba(217, 134, 240, 0.1); display: flex; align-items: center; justify-content: center;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D986F0" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <div style="font-size: 13px; font-family: var(--font-mono); color: rgba(255,255,255,0.7); display: flex; flex-direction: column;">
                                        <span style="color: #D986F0; margin-bottom: 4px;">CONTINUOUS SCAN ACTIVE</span>
                                        Evaluating policy sets across all environments...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
"""

content = content[:insert_point] + new_section + content[insert_point:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Compliance Automates section added.")
