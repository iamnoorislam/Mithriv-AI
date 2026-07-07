import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = '<section\n            id="assurance-architecture"'
start_idx = content.find(start_marker)

# Wait, the exact string in the file is:
# <section
#             id="assurance-architecture"
# Let me just find `id="assurance-architecture"` and backtrack to `<section`.
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
        </style>

        <div class="assurance-grid">
            
            <!-- Card 1 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Tested before deployed</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every configuration runs through scenario libraries and edge cases before production.</p>
                <div class="minimal-ui-container">
                    <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; font-family: var(--font-mono), monospace; font-size: 11px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="color: rgba(255,255,255,0.4);">&gt; run perimeter_test</div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 6px; height: 6px; background: #49B25C; border-radius: 50%;"></div>
                            <span style="color: #49B25C;">PASSED (124ms)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Graduated authority</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Define what executes automatically and what requires explicit human approval.</p>
                <div class="minimal-ui-container">
                    <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 10px 16px; display: flex; align-items: center; gap: 16px; font-family: var(--font-mono), monospace; font-size: 11px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <span style="color: rgba(255,255,255,0.4);">Authority</span>
                        <div style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; color: #FCE545; display: flex; align-items: center; gap: 6px;">
                            HUMAN-IN-LOOP <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Complete evidence chains</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Every decision logged with reasoning, timestamps, and approvals.</p>
                <div class="minimal-ui-container">
                    <div style="font-family: var(--font-mono), monospace; font-size: 11px; display: flex; flex-direction: column; gap: 6px;">
                        <div style="color: rgba(255,255,255,0.3);">14:02:44.102</div>
                        <div style="color: #9ca3af;">POLICY_EVAL(LOCKDOWN)</div>
                        <div style="color: #4b5563;">[f2c9b4e1] \u2192 LOGGED</div>
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Sovereign-ready</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Regional data residency and customer-managed keys for regulated environments.</p>
                <div class="minimal-ui-container">
                    <div style="background: rgba(73, 147, 227, 0.05); border: 1px solid rgba(73, 147, 227, 0.2); border-radius: 100px; padding: 6px 14px; display: flex; align-items: center; gap: 8px; font-family: var(--font-mono), monospace; font-size: 10px; color: #4993E3;">
                        <div style="width: 6px; height: 6px; background: #4993E3; border-radius: 50%;"></div>
                        REGION: EU-CENTRAL-1
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Human override</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Any autonomous action can be paused, reversed, or escalated instantly.</p>
                <div class="minimal-ui-container">
                    <div style="background: #E44856; border-radius: 4px; padding: 8px 16px; font-family: var(--font-mono), monospace; font-size: 10px; font-weight: bold; color: #000; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(228, 72, 86, 0.2);">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        HALT EXECUTION
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="minimal-card">
                <h3 style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 12px;">Non-bypassable logs</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;">Immutable, cryptographically verifiable records that cannot be altered.</p>
                <div class="minimal-ui-container">
                    <div style="display: flex; align-items: center; gap: 8px; font-family: var(--font-mono), monospace; font-size: 11px; color: rgba(255,255,255,0.7);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D986F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        WORM_STORAGE: <span style="color: #D986F0;">ACTIVE</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>"""

content = content[:start_idx] + new_html + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced Assurance Architecture with minimal design.")
