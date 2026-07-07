import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
if assurance_start == -1:
    sys.exit("Could not find Assurance section")

# 1. Update <style> to add the new keyframes
style_start = content.find("<style>", assurance_start)
style_end = content.find("</style>", style_start)
styles = content[style_start:style_end]

new_keyframes = """
                    @keyframes alert-strobe {
                        0%, 100% { background: #141518; }
                        50% { background: rgba(228, 72, 86, 0.08); }
                    }
                    @keyframes grant-pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.3; text-shadow: 0 0 10px rgba(73, 178, 92, 0.8); }
                    }
                    @keyframes scan-sweep {
                        0% { transform: translateY(-100px); opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { transform: translateY(300px); opacity: 0; }
                    }
"""

if "@keyframes alert-strobe" not in styles:
    content = content[:style_end] + new_keyframes + content[style_end:]

# 2. Add scanline to Fig 1.4 (Sovereign-ready)
# Find CARD 04
card4_start = content.find("<!-- ── CARD 04 ── -->")
card4_inner = content.find('<div style="background: #141518; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 24px; position: relative; overflow: hidden;">', card4_start)
if card4_inner != -1:
    scanline = '<div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: rgba(73, 147, 227, 0.5); box-shadow: 0 0 12px rgba(73, 147, 227, 1); animation: scan-sweep 4s linear infinite; pointer-events: none;"></div>'
    content = content[:card4_inner] + '<div style="background: #141518; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 24px; position: relative; overflow: hidden;">\n                                ' + scanline + content[card4_inner + len('<div style="background: #141518; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 24px; position: relative; overflow: hidden;">'):]

# 3. Add strobe to Fig 1.5
card5_start = content.find("<!-- ── CARD 05 ── -->")
# We want to animate the inner box background
card5_inner_old = '<div style="background: #141518; height: 100%; display: flex; flex-direction: column; padding: 20px; position: relative;">'
card5_inner_new = '<div style="height: 100%; display: flex; flex-direction: column; padding: 20px; position: relative; animation: alert-strobe 3s infinite;">'
content = content[:card5_start] + content[card5_start:].replace(card5_inner_old, card5_inner_new, 1)

# 4. Add grant-pulse to Fig 1.6 GRANTED text
card6_start = content.find("<!-- ── CARD 06 ── -->")
grant_old = '<span style="color: #49B25C;">GRANTED</span>'
grant_new = '<span style="color: #49B25C; animation: grant-pulse 2s infinite;">GRANTED</span>'

content = content[:card6_start] + content[card6_start:].replace(grant_old, grant_new, 2)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Added continuous animations to last 3 cards")
