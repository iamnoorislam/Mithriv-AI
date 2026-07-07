import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
if assurance_start == -1:
    sys.exit("Could not find Assurance section")

assurance_end = content.find("</section>", assurance_start)
assurance_section = content[assurance_start:assurance_end]

# 1. Remove scanline from Fig 1.4
scanline = '<div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: rgba(73, 147, 227, 0.5); box-shadow: 0 0 12px rgba(73, 147, 227, 1); animation: scan-sweep 4s linear infinite; pointer-events: none;"></div>'
assurance_section = assurance_section.replace(scanline, "")

# 2. Revert strobe in Fig 1.5
card5_bad = '<div style="height: 100%; display: flex; flex-direction: column; padding: 20px; position: relative; animation: alert-strobe 3s infinite;">'
card5_good = '<div style="background: #141518; height: 100%; display: flex; flex-direction: column; padding: 20px; position: relative;">'
assurance_section = assurance_section.replace(card5_bad, card5_good)

# 3. Revert grant-pulse in Fig 1.6
grant_bad = '<span style="color: #49B25C; animation: grant-pulse 2s infinite;">GRANTED</span>'
grant_good = '<span style="color: #49B25C;">GRANTED</span>'
assurance_section = assurance_section.replace(grant_bad, grant_good)

content = content[:assurance_start] + assurance_section + content[assurance_end:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Reverted continuous animations on the last 3 cards.")
