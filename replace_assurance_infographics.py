import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

id_idx = content.find('id="assurance-architecture"')
if id_idx == -1:
    sys.exit("Could not find section")
start_idx = content.rfind("<section", 0, id_idx)
end_idx = content.find("</section>", start_idx) + len("</section>")

new_html = """<section id="assurance-architecture" style="background: transparent; color: #FFFFFF; padding: 120px 20px; position: relative; z-index: 10; box-sizing: border-box; font-family: var(--font-main), 'Inter', sans-serif;">
    <div style="max-width: 1140px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto 80px;">
            <h2 class="std-section-h2" style="font-size: 48px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; margin-top: 0px; margin-bottom: 24px;">
                Autonomy with accountability.
            </h2>
            <p class="std-section-subheading" style="font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.6; font-family: var(--font-mono), JetBrains Mono, monospace; max-width: 600px; margin: 0 auto 48px;">
                Critical environments demand proof. Guardrails, approval gates, and immutable records—autonomous execution that stays auditable.
            </p>
        </div>

        <style>
            .assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            @media (max-width: 991px) { .assurance-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 767px) { .assurance-grid { grid-template-columns: 1fr; } }
            .minimal-card { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 32px; display: flex; flex-direction: column; transition: border-color 0.3s; }
            .minimal-card:hover { border-color: rgba(255,255,255,0.15); }
            .minimal-ui-container { flex: 1; min-height: 240px; display: flex; align-items: center; justify-content: center; margin-top: 32px; }
            .ui-snippet { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .minimal-card:hover .ui-snippet { transform: translateY(-4px); }
        </style>

        <div class="assurance-grid">
            
            <!-- Card 1 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Tested before deployed</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every configuration runs through scenario libraries and edge cases before production.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 1: Test Pipeline -->
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 11px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: space-between;">
                            <span>pipeline: pre_flight_checks</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 10px; position: relative;">
                            <div style="position: absolute; left: 16px; top: 16px; bottom: 16px; width: 1px; background: rgba(73, 178, 92, 0.3);"></div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">network_stress_test</span>
                                    <span style="color: rgba(255,255,255,0.3);">124ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">boundary_audit</span>
                                    <span style="color: rgba(255,255,255,0.3);">89ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5);"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">failover_simulation</span>
                                    <span style="color: rgba(255,255,255,0.3);">42ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Graduated authority</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Define what executes automatically and what requires explicit human approval.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 2: Approval Workflow -->
                    <div class="ui-snippet" style="width: 100%; max-width: 260px; font-family: var(--font-mono), monospace; font-size: 11px;">
                        <div style="background: #141518; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 10px 12px; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">
                            <span style="color: rgba(255,255,255,0.5);">Clearance Required:</span> <span style="color: #FCE545;">Level 2</span>
                        </div>
                        <div style="display: flex; justify-content: space-around; height: 24px; position: relative;">
                            <svg width="100%" height="24" style="position: absolute; top: 0; left: 0;">
                                <path d="M130,0 L130,10 L65,10 L65,24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                                <path d="M130,0 L130,10 L195,10 L195,24" fill="none" stroke="rgba(252, 229, 69, 0.4)" stroke-width="1.5" stroke-dasharray="2 2" />
                            </svg>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 8px; text-align: center; opacity: 0.5;">
                                <span style="color: rgba(255,255,255,0.5); font-size: 9px;">Auto-Execute</span>
                            </div>
                            <div style="flex: 1.5; background: rgba(252, 229, 69, 0.05); border: 1px solid rgba(252, 229, 69, 0.2); border-radius: 6px; padding: 8px; text-align: center; box-shadow: 0 0 15px rgba(252, 229, 69, 0.05);">
                                <span style="color: #FCE545; font-size: 9px;">Admin Approval</span>
                                <div style="margin-top: 4px; font-size: 8px; color: rgba(255,255,255,0.4);">[ PENDING... ]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Complete evidence chains</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every decision logged with reasoning, timestamps, and approvals.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 3: Audit Timeline -->
                    <div class="ui-snippet" style="width: 100%; max-width: 250px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="position: relative; padding-left: 16px; display: flex; flex-direction: column; gap: 16px;">
                            <div style="position: absolute; left: 3px; top: 4px; bottom: 4px; width: 1px; background: rgba(217, 134, 240, 0.3);"></div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:11</span> <span style="color: #d1d5db; margin-left: 6px;">Threat Detected</span>
                            </div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:12</span> <span style="color: #d1d5db; margin-left: 6px;">AI Classification</span>
                            </div>
                            <div style="position: relative;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #D986F0; box-shadow: 0 0 8px rgba(217, 134, 240, 0.6);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:03:00</span> <span style="color: #fff; margin-left: 6px; font-weight: bold;">Action Executed</span>
                                <div style="margin-top: 10px; background: rgba(217, 134, 240, 0.08); border: 1px solid rgba(217, 134, 240, 0.2); border-radius: 4px; padding: 6px 10px; display: inline-flex; align-items: center; gap: 6px; color: #D986F0; font-size: 9px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    EXPORT .JSON
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Sovereign-ready</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Regional data residency and customer-managed keys for regulated environments.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 4: Infrastructure Diagram -->
                    <div class="ui-snippet" style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="flex: 1; background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); border-radius: 8px; padding: 12px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4993E3" stroke-width="2" style="margin-bottom: 6px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            <div style="color: #4993E3; font-weight: bold; margin-bottom: 2px;">EU-CENTRAL-1</div>
                            <div style="color: rgba(73, 147, 227, 0.5); font-size: 8px;">[ Air-Gapped ]</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 50px;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <div style="width: 100%; border-top: 1px dashed rgba(255,255,255,0.2);"></div>
                        </div>
                        <div style="flex: 1; background: #141518; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" style="margin-bottom: 6px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            <div style="color: #d1d5db; font-weight: bold; margin-bottom: 2px;">CUSTOMER VPC</div>
                            <div style="color: rgba(255,255,255,0.4); font-size: 8px;">[ Local Key ]</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Human override</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Any autonomous action can be paused, reversed, or escalated instantly.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 5: Active Alert Box -->
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(228, 72, 86, 0.2); border-radius: 8px; width: 100%; max-width: 280px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(228, 72, 86, 0.05);">
                        <div style="padding: 16px; display: flex; gap: 12px;">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(228, 72, 86, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E44856" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-family: var(--font-mono), monospace; font-size: 11px; color: #fff; font-weight: bold; margin-bottom: 4px;">Lockdown Sequence Initiated</div>
                                <div style="font-size: 11px; color: rgba(255,255,255,0.5); font-family: var(--font-main), sans-serif; margin-bottom: 12px;">Zone 4 perimeter seal starting.</div>
                                <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-bottom: 16px; overflow: hidden;">
                                    <div style="width: 65%; height: 100%; background: #E44856;"></div>
                                </div>
                                <div style="background: rgba(228, 72, 86, 0.1); border: 1px solid rgba(228, 72, 86, 0.3); border-radius: 4px; padding: 8px 0; text-align: center; color: #E44856; font-family: var(--font-mono), monospace; font-size: 10px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                                    \u25fc HALT EXECUTION
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Non-bypassable logs</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Immutable, cryptographically verifiable records that cannot be altered.</p>
                <div class="minimal-ui-container">
                    <!-- Infographic 6: Immutable Ledger Table -->
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                            <span style="color: rgba(255,255,255,0.5);">Append-Only Storage</span>
                            <div style="display: flex; align-items: center; gap: 4px; color: #49B25C; font-size: 9px; font-weight: bold;">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                ACTIVE
                            </div>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 6px;">
                                <span style="color: rgba(255,255,255,0.3);">Hash</span>
                                <span style="color: rgba(255,255,255,0.3);">Status</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x3a9b...f2c4</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x8e1f...a92b</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #d1d5db;">0x5b3c...d18e</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>"""

content = content[:start_idx] + new_html + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected high-fidelity infographics successfully.")
