import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state variable
state_var = "    const [activeComplianceTab, setActiveComplianceTab] = useState(0);"
if "const [activeComplianceTab" not in content:
    insert_idx = content.find("const [mounted, setMounted] = useState(false);")
    if insert_idx != -1:
        insert_idx += len("const [mounted, setMounted] = useState(false);")
        content = content[:insert_idx] + "\n" + state_var + content[insert_idx:]

# 2. Replace section
compliance_start = content.find("<!-- New Compliance Automates Section")
if compliance_start == -1:
    sys.exit("Could not find Compliance section")
compliance_end = content.find("</section>", compliance_start) + len("</section>")

new_section_jsx = """
        {/* New Compliance Automates Section (Interactive Console Layout) */}
        <section id="compliance-automates" style={{ background: 'transparent', color: '#FFFFFF', padding: '120px 20px', position: 'relative', zIndex: 10, boxSizing: 'border-box', fontFamily: 'var(--font-main), Inter, sans-serif' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scan-sweep-horizontal { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(200%); opacity: 0; } }
                @keyframes rotateOrbitPath { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes grant-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; text-shadow: 0 0 10px rgba(73, 178, 92, 0.8); } }
                @keyframes terminal-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                @keyframes riseKpiBar { 0% { transform: scaleY(0.4); } 100% { transform: scaleY(1); } }
            `}} />
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="ent-pill" style={{ marginBottom: '16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#FFFFFF', fontFamily: 'var(--font-mono), JetBrains Mono, monospace' }}>
                        Compliance Automates
                    </span>
                    <h2 className="std-section-h2" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 24px 0', maxWidth: '800px' }}>
                        Audit-ready as a default state.
                    </h2>
                    <p className="std-section-subheading" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: 'var(--font-mono), JetBrains Mono, monospace', margin: '0', maxWidth: '600px' }}>
                        When operations flow through a unified system, compliance documentation is automatic. No scrambling, no manual logging.
                    </p>
                </div>

                {/* Console Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '40px', alignItems: 'start' }} className="compliance-console-grid">
                    
                    {/* Left: Tab Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {[
                            { title: "Evidence generates itself", text: "When operations flow through a unified system, compliance documentation is automatic, not a separate project.", fig: "Fig 2.1 — Auto-Evidence" },
                            { title: "Frameworks addressed", text: "SOC 2 Type II · PCI DSS · HIPAA · ISO 27001 · NERC CIP · GxP/Annex 11 · IEC 62443", fig: "Fig 2.2 — Multi-Framework" },
                            { title: "Hours, not months", text: "What took 2-3 months of preparation now takes a query and an export.", fig: "Fig 2.3 — Time Compression" },
                            { title: "Continuous conformance", text: "Policy adherence measured in real-time. Violations flagged immediately. No audit-season panic.", fig: "Fig 2.4 — Continuous Monitoring" }
                        ].map((tab, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setActiveComplianceTab(idx)}
                                style={{
                                    padding: '32px 24px',
                                    borderLeft: `2px solid ${activeComplianceTab === idx ? '#fff' : 'transparent'}`,
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    background: activeComplianceTab === idx ? 'rgba(255,255,255,0.02)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}
                            >
                                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono), monospace', color: activeComplianceTab === idx ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>{tab.fig}</span>
                                <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: activeComplianceTab === idx ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'color 0.3s' }}>{tab.title}</h4>
                                <div style={{ 
                                    maxHeight: activeComplianceTab === idx ? '100px' : '0', 
                                    opacity: activeComplianceTab === idx ? 1 : 0, 
                                    overflow: 'hidden', 
                                    transition: 'all 0.3s ease',
                                    marginTop: activeComplianceTab === idx ? '8px' : '0'
                                }}>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{tab.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Display Stage */}
                    <div style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        
                        {/* ILLUS 2.1 */}
                        {activeComplianceTab === 0 && (
                            <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-out' }} dangerouslySetInnerHTML={{ __html: `
                                <div style="display: flex; align-items: center; justify-content: center; padding: 40px; height: 100%; width: 100%; gap: 40px;">
                                    <div style="display: flex; flex-direction: column; gap: 16px;">
                                        <div style="width: 140px; height: 10px; background: rgba(99, 84, 243, 0.1); overflow: hidden; position: relative;">
                                            <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 60px; background: #6354F3; animation: scan-sweep-horizontal 2s linear infinite reverse;"></div>
                                        </div>
                                        <div style="width: 100px; height: 10px; background: rgba(99, 84, 243, 0.1); overflow: hidden; position: relative;">
                                            <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 40px; background: #6354F3; animation: scan-sweep-horizontal 3s linear infinite reverse;"></div>
                                        </div>
                                        <div style="width: 160px; height: 10px; background: rgba(99, 84, 243, 0.1); overflow: hidden; position: relative;">
                                            <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 80px; background: #6354F3; animation: scan-sweep-horizontal 2.5s linear infinite reverse;"></div>
                                        </div>
                                    </div>
                                    <div style="width: 64px; height: 64px; border-radius: 32px; background: rgba(143, 146, 233, 0.1); border: 1px solid rgba(143, 146, 233, 0.3); display: flex; justify-content: center; align-items: center;">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8F92E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotateOrbitPath 4s linear infinite;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                    </div>
                                    <div style="width: 140px; height: 180px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; padding: 20px; position: relative;">
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#49B25C" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                            <span style="color: #fff; font-size: 11px; font-weight: bold; font-family: var(--font-mono);">SECURE_LOG</span>
                                        </div>
                                        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                                            <div style="height: 6px; width: 100%; background: rgba(255,255,255,0.1);"></div>
                                            <div style="height: 6px; width: 80%; background: rgba(255,255,255,0.1);"></div>
                                            <div style="height: 6px; width: 90%; background: rgba(255,255,255,0.1);"></div>
                                            <div style="height: 6px; width: 60%; background: rgba(255,255,255,0.1);"></div>
                                        </div>
                                        <div style="margin-top: auto; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                                            <span style="color: rgba(255,255,255,0.4); font-size: 9px; font-family: var(--font-mono);">TIMESTAMP</span>
                                            <span style="color: #49B25C; font-size: 9px; font-family: var(--font-mono); animation: grant-pulse 2s infinite;">VERIFIED</span>
                                        </div>
                                    </div>
                                </div>
                            `}} />
                        )}

                        {/* ILLUS 2.2 */}
                        {activeComplianceTab === 1 && (
                            <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-out' }} dangerouslySetInnerHTML={{ __html: `
                                <div style="padding: 60px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; height: 100%; width: 100%; align-content: center;">
                                    <div style="padding: 20px; background: rgba(175, 249, 98, 0.05); border: 1px solid rgba(175, 249, 98, 0.2); text-align: center; color: #AFF962; font-family: var(--font-mono); font-size: 13px; font-weight: bold;">SOC 2 Type II</div>
                                    <div style="padding: 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 13px;">PCI DSS</div>
                                    <div style="padding: 20px; background: rgba(234, 73, 178, 0.05); border: 1px solid rgba(234, 73, 178, 0.2); text-align: center; color: #EA49B2; font-family: var(--font-mono); font-size: 13px; font-weight: bold;">HIPAA</div>
                                    <div style="padding: 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 13px;">ISO 27001</div>
                                    <div style="padding: 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 13px;">NERC CIP</div>
                                    <div style="padding: 20px; background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); text-align: center; color: #4993E3; font-family: var(--font-mono); font-size: 13px; font-weight: bold;">GxP/Annex 11</div>
                                    <div style="grid-column: 2; padding: 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: rgba(255,255,255,0.5); font-family: var(--font-mono); font-size: 13px;">IEC 62443</div>
                                </div>
                            `}} />
                        )}

                        {/* ILLUS 2.3 */}
                        {activeComplianceTab === 2 && (
                            <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-out' }} dangerouslySetInnerHTML={{ __html: `
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; position: absolute; inset: 0;">
                                    <div style="width: 260px; height: 260px; border: 1px dashed rgba(255,255,255,0.1); position: absolute; display: flex; justify-content: center; align-items: center; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                        <div style="width: 180px; height: 180px; border: 1px solid rgba(252, 229, 69, 0.2); background: rgba(252, 229, 69, 0.05); display: flex; justify-content: center; align-items: center;">
                                            <div style="text-align: center;">
                                                <div style="font-size: 42px; font-weight: 700; color: #FCE545; line-height: 1;">2.4<span style="font-size: 18px; margin-left: 4px;">hrs</span></div>
                                                <div style="font-size: 12px; color: rgba(255,255,255,0.4); font-family: var(--font-mono); margin-top: 8px; text-transform: uppercase;">Prep Time</div>
                                            </div>
                                        </div>
                                        <div style="position: absolute; width: 100%; height: 100%; animation: rotateOrbitPath 6s linear infinite;">
                                            <div style="position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #FCE545;"></div>
                                        </div>
                                    </div>
                                    <div style="position: absolute; bottom: 40px; left: 40px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px 16px; text-decoration: line-through; color: rgba(255,255,255,0.3); font-family: var(--font-mono); font-size: 12px;">
                                        PREVIOUS: 3 MONTHS
                                    </div>
                                    <div style="position: absolute; bottom: 40px; right: 40px; background: rgba(231, 199, 59, 0.15); border: 1px solid rgba(231, 199, 59, 0.3); padding: 12px 24px; color: #E7C73B; font-family: var(--font-mono); font-size: 13px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        EXPORT REPORT
                                    </div>
                                </div>
                            `}} />
                        )}

                        {/* ILLUS 2.4 */}
                        {activeComplianceTab === 3 && (
                            <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-out' }} dangerouslySetInnerHTML={{ __html: `
                                <div style="display: flex; flex-direction: column; height: 100%; width: 100%; padding: 50px; position: absolute; inset: 0; box-sizing: border-box;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <div style="width: 12px; height: 12px; background: #49B25C; animation: terminal-pulse 2s infinite;"></div>
                                            <span style="color: #49B25C; font-size: 16px; font-family: var(--font-mono); font-weight: bold;">100% CONFORMANCE</span>
                                        </div>
                                        <div style="color: rgba(255,255,255,0.4); font-size: 16px; font-family: var(--font-mono);">VIOLATIONS: 0</div>
                                    </div>
                                    <div style="flex: 1; display: flex; align-items: flex-end; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0; margin-bottom: 40px; overflow: hidden;">
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 3s infinite ease-in-out alternate;" style="height: 60%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 4s infinite ease-in-out alternate-reverse;" style="height: 40%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 2.5s infinite ease-in-out alternate;" style="height: 75%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 3.5s infinite ease-in-out alternate-reverse;" style="height: 50%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 3.2s infinite ease-in-out alternate;" style="height: 90%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 2.8s infinite ease-in-out alternate-reverse;" style="height: 30%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.15); animation: riseKpiBar 4.5s infinite ease-in-out alternate;" style="height: 65%; transform-origin: bottom;"></div>
                                        <div style="flex: 1; background: rgba(73, 178, 92, 0.4); border: 1px solid #49B25C; border-bottom: none; height: 100%;"></div>
                                    </div>
                                    <div style="background: rgba(217, 134, 240, 0.05); border: 1px solid rgba(217, 134, 240, 0.15); padding: 20px; display: flex; align-items: center; gap: 20px;">
                                        <div style="width: 40px; height: 40px; background: rgba(217, 134, 240, 0.1); display: flex; align-items: center; justify-content: center;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D986F0" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div style="font-size: 14px; font-family: var(--font-mono); color: rgba(255,255,255,0.7); display: flex; flex-direction: column;">
                                            <span style="color: #D986F0; margin-bottom: 4px;">CONTINUOUS SCAN ACTIVE</span>
                                            Evaluating policy sets across all environments...
                                        </div>
                                    </div>
                                </div>
                            `}} />
                        )}

                    </div>
                </div>
            </div>
        </section>
"""

content = content[:compliance_start] + new_section_jsx + content[compliance_end:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Interactive Console Layout fully injected.")
