import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update grid columns from repeat(2, 1fr) to repeat(3, 1fr)
content = content.replace("grid-template-columns: repeat(2, 1fr);", "grid-template-columns: repeat(3, 1fr);")

# 2. Add the two new cards before the end of the assurance-grid div
# The 4th card ends just before a newline and the closing `</div>` of `.assurance-grid`.
# We'll locate the "Sovereign-ready" card and find its closing div.

card4_marker = "<!-- ── CARD 04 ── -->"
card4_start = content.find(card4_marker)
if card4_start == -1:
    print("Could not find CARD 04")
    sys.exit(1)

# Find the end of card 4 by looking for the next closing div that belongs to the grid.
# The structure is:
#                     <!-- ── CARD 04 ── -->
#                     <div ...> ... </div>
#
#                 </div> <!-- End of assurance-grid -->

# Let's just find the exact string to replace.
search_str = """                        </div>
                    </div>

                </div>
            </div>
        </section>"""

new_cards_html = """                        </div>
                    </div>

                    <!-- ── CARD 05 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.5</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Human override, always available</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Any autonomous action can be paused, reversed, or escalated by an operator in one command. Authority flows down, never locks you out.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden;">
                            <div style="background: #141518; height: 100%; display: flex; flex-direction: column; padding: 20px; position: relative;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <div style="width: 8px; height: 8px; border-radius: 50%; background: #ef4444; animation: terminal-pulse 2s infinite;"></div>
                                        <span style="font-size: 10px; font-family: var(--font-mono), monospace; color: #ef4444;">ACTIVE THREAT RESPONSE</span>
                                    </div>
                                    <span style="font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5);">T-00:14s</span>
                                </div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: auto;">
                                    Autonomous lockdown sequence initiated for Zone 4. Initiating perimeter seal in 14 seconds.
                                </div>
                                
                                <!-- Override Controls -->
                                <div style="display: flex; gap: 8px; margin-top: 16px;">
                                    <div style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 12px 0; text-align: center; cursor: pointer; transition: all 0.2s;">
                                        <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #fff; font-weight: bold;">PAUSE</span>
                                    </div>
                                    <div style="flex: 1; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 12px 0; text-align: center; cursor: pointer; transition: all 0.2s;">
                                        <span style="font-size: 11px; font-family: var(--font-mono), monospace; color: #ef4444; font-weight: bold;">MANUAL OVERRIDE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ── CARD 06 ── -->
                    <div
                        class="operational-grid-card"
                        style="background: #0f1012; padding: 32px 28px 28px; display: flex; flex-direction: column; overflow: hidden; min-height: 420px;"
                    >
                        <span style="font-size: 14px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.3); letter-spacing: 0; margin-bottom: 14px; text-transform: uppercase;">Fig 1.6</span>
                        <h3 style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 10px;">Independently verifiable</h3>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 28px; flex-shrink: 0;">Third-party auditors get read access to the same evidence chain your team sees. No reconstructed logs, no special export format, no advance notice required.</p>
                        <div style="flex: 1; border-radius: 8px; overflow: hidden;">
                            <div style="background: #141518; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 24px; position: relative; overflow: hidden;">
                                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 32px; height: 32px; border-radius: 16px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center;">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #fff;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                        </div>
                                        <div>
                                            <div style="font-size: 12px; color: #fff; font-weight: 600; margin-bottom: 2px;">External Auditor</div>
                                            <div style="font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5);">ROLE: READ-ONLY (EVIDENCE CHAIN)</div>
                                        </div>
                                    </div>
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.4); padding: 0 4px;">
                                        <span>LIVE ACCESS</span>
                                        <span>STATUS</span>
                                    </div>
                                    <div style="background: rgba(16,185,129,0.05); border-left: 2px solid #10b981; padding: 10px 12px; font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between;">
                                        <span>Raw Event Logs</span>
                                        <span style="color: #10b981;">GRANTED</span>
                                    </div>
                                    <div style="background: rgba(16,185,129,0.05); border-left: 2px solid #10b981; padding: 10px 12px; font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between;">
                                        <span>AI Reasoning Traces</span>
                                        <span style="color: #10b981;">GRANTED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>"""

if search_str in content:
    content = content.replace(search_str, new_cards_html)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully added new cards and updated grid to 3 columns.")
else:
    print("Could not find exact replacement string. Will try regex.")
    import re
    # Try more robust regex
    pattern = r'(<!-- ── CARD 04 ── -->.*?</div>\s*</div>\s*)</div>\s*</div>\s*</section>'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        prefix = match.group(1)
        # We need to insert CARD 05 and 06 after prefix and before the closing divs
        # Let's just do it manually with a small script
        pass
    else:
        print("Regex failed too.")

