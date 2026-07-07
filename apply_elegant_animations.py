import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
if assurance_start == -1:
    sys.exit("Could not find Assurance section")

style_start = content.find("<style>", assurance_start)
style_end = content.find("</style>", style_start)
styles = content[style_start:style_end]

new_keyframes = """
                    @keyframes soft-pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.3; }
                    }
                    @keyframes blink-timer {
                        0%, 49% { opacity: 1; }
                        50%, 100% { opacity: 0.3; }
                    }
                    @keyframes log-slide {
                        0%, 5% { opacity: 0; transform: translateX(-5px); }
                        10%, 90% { opacity: 1; transform: translateX(0); }
                        95%, 100% { opacity: 0; transform: translateX(5px); }
                    }
"""

if "@keyframes soft-pulse" not in styles:
    content = content[:style_end] + new_keyframes + content[style_end:]

# 1. Update Fig 1.4: Pulse the other dots on the map
c1_old = '<circle cx="20" cy="40" r="4" fill="#4993E3" />'
c1_new = '<circle cx="20" cy="40" r="4" fill="#4993E3" style="animation: soft-pulse 4s infinite 0s;" />'

c2_old = '<circle cx="80" cy="30" r="4" fill="#4993E3" />'
c2_new = '<circle cx="80" cy="30" r="4" fill="#4993E3" style="animation: soft-pulse 4s infinite 1.5s;" />'

c3_old = '<circle cx="40" cy="80" r="4" fill="#4993E3" />'
c3_new = '<circle cx="40" cy="80" r="4" fill="#4993E3" style="animation: soft-pulse 4s infinite 2.5s;" />'

content = content.replace(c1_old, c1_new)
content = content.replace(c2_old, c2_new)
content = content.replace(c3_old, c3_new)


# 2. Update Fig 1.5: Make the timer blink
t_old = '<span style="font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5);">T-00:14s</span>'
t_new = '<span style="font-size: 10px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.5); animation: blink-timer 1s infinite;">T-00:14s</span>'
content = content.replace(t_old, t_new)


# 3. Update Fig 1.6: Make the log rows slide in continuously
log_row_old = '<div style="background: rgba(73, 178, 92,0.05); border-left: 2px solid #49B25C; padding: 10px 12px; font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between;">'

# There are 2 of these rows. We replace the first one with delay 0s, and the second one with delay 3s (total animation length 6s)
log_row1_new = '<div style="background: rgba(73, 178, 92,0.05); border-left: 2px solid #49B25C; padding: 10px 12px; font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between; animation: log-slide 6s infinite 0s;">'
log_row2_new = '<div style="background: rgba(73, 178, 92,0.05); border-left: 2px solid #49B25C; padding: 10px 12px; font-size: 11px; font-family: var(--font-mono), monospace; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between; animation: log-slide 6s infinite 3s;">'

# Replace first occurrence
content = content.replace(log_row_old, log_row1_new, 1)
# Replace second occurrence
content = content.replace(log_row_old, log_row2_new, 1)


with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Elegant animations added to cards 4, 5, 6.")
