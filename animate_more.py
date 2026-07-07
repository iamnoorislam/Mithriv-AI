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
            .assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 991px) { .assurance-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 767px) { .assurance-grid { grid-template-columns: 1fr; } }
            .minimal-card { background: transparent; border: 1px solid #252526; margin: -1px 0 0 -1px; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }
            .minimal-card:hover { background: transparent; }
            .minimal-ui-container { flex: 1; min-height: 240px; display: flex; align-items: center; justify-content: center; margin-top: 32px; perspective: 1000px; }
            .ui-snippet { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform-style: preserve-3d; }
            .minimal-card:hover .ui-snippet { transform: translateY(-10px) rotateX(2deg) rotateY(-2deg); }

            /* Rich Micro-Animations */
            @keyframes drawLineVertical { 0% { height: 0%; opacity: 0; } 50% { height: 100%; opacity: 1; } 100% { height: 100%; opacity: 0.3; } }
            @keyframes pulseGlowRed { 0%, 100% { box-shadow: 0 0 10px rgba(228, 72, 86, 0.2); } 50% { box-shadow: 0 0 30px rgba(228, 72, 86, 0.8); } }
            @keyframes pulseGlowGreen { 0%, 100% { box-shadow: 0 0 10px rgba(73, 178, 92, 0.2); } 50% { box-shadow: 0 0 30px rgba(73, 178, 92, 0.8); } }
            @keyframes pulseGlowYellow { 0%, 100% { box-shadow: 0 0 10px rgba(252, 229, 69, 0.1); } 50% { box-shadow: 0 0 25px rgba(252, 229, 69, 0.5); } }
            @keyframes dashFlow { 100% { stroke-dashoffset: -40; } }
            @keyframes textFlicker { 0%, 100% { opacity: 1; } 90% { opacity: 1; } 92% { opacity: 0.2; } 94% { opacity: 1; } 96% { opacity: 0.4; } 98% { opacity: 1; } }
            @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
            @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
            @keyframes radarRing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
            @keyframes typingCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes floatGentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
            @keyframes spinSlow { 100% { transform: rotate(360deg); } }
            @keyframes fillProgressLoop { 0% { width: 5%; } 40%, 60% { width: 85%; } 100% { width: 5%; } }
            @keyframes staggerPopIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
        </style>

        <div class="assurance-grid">
            
            <!-- Card 1 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Tested before deployed</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every configuration runs through scenario libraries and edge cases before production.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 11px; overflow: hidden; position: relative;">
                        <!-- Scanline effect overlay -->
                        <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent); animation: scanline 4s linear infinite; pointer-events: none; z-index: 10;"></div>
                        
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: space-between;">
                            <span style="animation: textFlicker 6s infinite;">pipeline: pre_flight_checks<span style="animation: typingCursor 1s infinite;">_</span></span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spinSlow 3s linear infinite;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 10px; position: relative;">
                            <!-- Animated drawing line -->
                            <div style="position: absolute; left: 16px; top: 16px; width: 1px; background: #49B25C; animation: drawLineVertical 3s ease-in-out infinite alternate;"></div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: staggerPopIn 0.5s ease-out forwards; animation-delay: 0.2s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; animation: pulseGlowGreen 2s infinite;"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">network_stress_test</span>
                                    <span style="color: rgba(255,255,255,0.3);">124ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: staggerPopIn 0.5s ease-out forwards; animation-delay: 0.4s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; animation: pulseGlowGreen 2s infinite 0.5s;"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">boundary_audit</span>
                                    <span style="color: rgba(255,255,255,0.3);">89ms</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: staggerPopIn 0.5s ease-out forwards; animation-delay: 0.6s; opacity: 0;">
                                <div style="width: 9px; height: 9px; background: #49B25C; border-radius: 50%; animation: pulseGlowGreen 2s infinite 1s;"></div>
                                <div style="display: flex; justify-content: space-between; flex: 1;">
                                    <span style="color: #d1d5db;">failover_sim</span>
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
                    <div class="ui-snippet" style="width: 100%; max-width: 260px; font-family: var(--font-mono), monospace; font-size: 11px;">
                        <div style="background: #141518; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 10px 12px; text-align: center; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -50%; left: -50%; right: -50%; bottom: -50%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); transform: rotate(45deg); animation: shimmer 3s infinite;"></div>
                            <span style="color: rgba(255,255,255,0.5);">Clearance:</span> <span style="color: #FCE545; animation: pulseGlowYellow 2s infinite;">Level 2</span>
                        </div>
                        <div style="display: flex; justify-content: space-around; height: 24px; position: relative;">
                            <svg width="100%" height="24" style="position: absolute; top: 0; left: 0;">
                                <path d="M130,0 L130,10 L65,10 L65,24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                                <path d="M130,0 L130,10 L195,10 L195,24" fill="none" stroke="rgba(252, 229, 69, 0.4)" stroke-width="1.5" stroke-dasharray="4 4" style="animation: dashFlow 1s linear infinite;" />
                            </svg>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 8px; text-align: center; opacity: 0.5;">
                                <span style="color: rgba(255,255,255,0.5); font-size: 9px;">Auto-Execute</span>
                            </div>
                            <div style="flex: 1.5; background: rgba(252, 229, 69, 0.05); border: 1px solid rgba(252, 229, 69, 0.3); border-radius: 6px; padding: 8px; text-align: center; animation: pulseGlowYellow 3s infinite alternate;">
                                <span style="color: #FCE545; font-size: 9px;">Admin Approval</span>
                                <div style="margin-top: 4px; font-size: 8px; color: rgba(255,255,255,0.4);"><span style="animation: textFlicker 2s infinite;">[ PENDING... ]</span></div>
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
                    <div class="ui-snippet" style="width: 100%; max-width: 250px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="position: relative; padding-left: 16px; display: flex; flex-direction: column; gap: 16px;">
                            <div style="position: absolute; left: 3px; top: 4px; width: 1px; background: rgba(217, 134, 240, 0.6); animation: drawLineVertical 4s ease-in-out infinite;"></div>
                            
                            <div style="position: relative; animation: floatGentle 4s ease-in-out infinite 0s;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:11</span> <span style="color: #d1d5db; margin-left: 6px;">Threat Detected</span>
                            </div>
                            <div style="position: relative; animation: floatGentle 4s ease-in-out infinite 0.5s;">
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #111; border: 1px solid rgba(217, 134, 240, 0.5);"></div>
                                <span style="color: rgba(255,255,255,0.4);">14:02:12</span> <span style="color: #d1d5db; margin-left: 6px;">AI Classify</span>
                            </div>
                            <div style="position: relative; animation: floatGentle 4s ease-in-out infinite 1s;">
                                <!-- Radar rings -->
                                <div style="position: absolute; left: -21px; top: -2px; width: 17px; height: 17px; border-radius: 50%; border: 1px solid rgba(217, 134, 240, 0.5); animation: radarRing 2s ease-out infinite;"></div>
                                <div style="position: absolute; left: -16px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #D986F0; box-shadow: 0 0 15px #D986F0;"></div>
                                
                                <span style="color: rgba(255,255,255,0.4);">14:03:00</span> <span style="color: #fff; margin-left: 6px; font-weight: bold;">Action Executed</span>
                                
                                <div style="position: relative; overflow: hidden; margin-top: 10px; background: rgba(217, 134, 240, 0.08); border: 1px solid rgba(217, 134, 240, 0.2); border-radius: 4px; padding: 6px 10px; display: inline-flex; align-items: center; gap: 6px; color: #D986F0; font-size: 9px; font-weight: bold;">
                                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(217, 134, 240, 0.3), transparent); animation: shimmer 2s infinite;"></div>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="position: relative; z-index: 1;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    <span style="position: relative; z-index: 1;">EXPORT .JSON</span>
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
                    <div class="ui-snippet" style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px;">
                        <div style="flex: 1; background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); border-radius: 8px; padding: 12px; text-align: center; position: relative;">
                            <!-- Radar rings -->
                            <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(73, 147, 227, 0.5); animation: radarRing 3s ease-out infinite;"></div>
                            
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4993E3" stroke-width="2" style="margin-bottom: 6px; position: relative; z-index: 1;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            <div style="color: #4993E3; font-weight: bold; margin-bottom: 2px;">EU-CENTRAL</div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 50px;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" style="animation: floatGentle 2s ease-in-out infinite;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <svg width="100%" height="2" style="margin-top: 2px;"><line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="4 4" style="animation: dashFlow 1s linear infinite;"/></svg>
                        </div>
                        
                        <div style="flex: 1; background: #141518; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; text-align: center; position: relative;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" style="margin-bottom: 6px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            <div style="color: #d1d5db; font-weight: bold; margin-bottom: 2px;">CLIENT VPC</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Human override</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Any autonomous action can be paused, reversed, or escalated instantly.</p>
                <div class="minimal-ui-container">
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(228, 72, 86, 0.2); border-radius: 8px; width: 100%; max-width: 280px; overflow: hidden; position: relative; animation: pulseGlowRed 4s infinite alternate;">
                        <div style="padding: 16px; display: flex; gap: 12px;">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(228, 72, 86, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; animation: pulseGlowRed 1s infinite;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E44856" stroke-width="2" style="animation: textFlicker 3s infinite;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-family: var(--font-mono), monospace; font-size: 11px; color: #fff; font-weight: bold; margin-bottom: 4px;">Lockdown Initiated<span style="animation: typingCursor 1s infinite;">_</span></div>
                                <div style="font-size: 11px; color: rgba(255,255,255,0.5); font-family: var(--font-main), sans-serif; margin-bottom: 12px; animation: textFlicker 4s infinite;">Zone 4 perimeter seal active.</div>
                                
                                <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-bottom: 16px; overflow: hidden; position: relative;">
                                    <div style="position: absolute; left: 0; top: 0; bottom: 0; background: #E44856; animation: fillProgressLoop 4s ease-in-out infinite;"></div>
                                </div>
                                
                                <div style="position: relative; overflow: hidden; background: rgba(228, 72, 86, 0.1); border: 1px solid rgba(228, 72, 86, 0.3); border-radius: 4px; padding: 8px 0; text-align: center; color: #E44856; font-family: var(--font-mono), monospace; font-size: 10px; font-weight: bold;">
                                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(228, 72, 86, 0.3), transparent); animation: shimmer 1.5s infinite;"></div>
                                    <span style="position: relative; z-index: 1;">\u25fc HALT EXECUTION</span>
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
                    <div class="ui-snippet" style="background: #0f0f11; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 100%; max-width: 280px; font-family: var(--font-mono), monospace; font-size: 10px; overflow: hidden;">
                        <div style="background: #1a1a1c; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                            <span style="color: rgba(255,255,255,0.5);">Append-Only Storage</span>
                            <div style="display: flex; align-items: center; gap: 4px; color: #49B25C; font-size: 9px; font-weight: bold; animation: textFlicker 3s infinite;">
                                <div style="width: 6px; height: 6px; background: #49B25C; border-radius: 50%; animation: pulseGlowGreen 1s infinite;"></div>
                                ACTIVE
                            </div>
                        </div>
                        <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 6px;">
                                <span style="color: rgba(255,255,255,0.3);">Hash</span>
                                <span style="color: rgba(255,255,255,0.3);">Status</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; animation: staggerPopIn 0.3s forwards; animation-delay: 0.1s; opacity: 0;">
                                <span style="color: #d1d5db; animation: textFlicker 5s infinite;">0x3a9b...f2c4</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2" style="animation: pulseGlowGreen 2s infinite;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; animation: staggerPopIn 0.3s forwards; animation-delay: 0.3s; opacity: 0;">
                                <span style="color: #d1d5db; animation: textFlicker 4s infinite;">0x8e1f...a92b</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2" style="animation: pulseGlowGreen 2s infinite 0.5s;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; animation: staggerPopIn 0.3s forwards; animation-delay: 0.5s; opacity: 0;">
                                <span style="color: #d1d5db; animation: textFlicker 6s infinite;">0x5b3c...d18e</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2" style="animation: pulseGlowGreen 2s infinite 1s;"><polyline points="20 6 9 17 4 12"></polyline></svg>
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

print("Added richer micro-animations.")
