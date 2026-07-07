import sys
import re

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

compliance_start = content.find('<section id="compliance-automates"')
if compliance_start == -1:
    sys.exit("Could not find Compliance section")

compliance_end = content.find("</section>", compliance_start) + len("</section>")
compliance_section = content[compliance_start:compliance_end]

# 1. Strip all border-radius
compliance_section = re.sub(r'border-radius:\s*[0-9px]+;', 'border-radius: 0px;', compliance_section)

# 2. Strip all box-shadow
compliance_section = re.sub(r'box-shadow:\s*[^;]+;', '', compliance_section)

# 3. Clean up the main card styling
# from: style="background: #121316; border: 1px solid rgba(255,255,255,0.05); border-radius: 0px; padding: 48px; display: flex; flex-direction: column; gap: 32px; "
# to flat, sharp styling
# We just need to ensure the cards look like the operational-grid-card without the hover effects, or just flat boxes.
# The previous regex already killed border-radius and box shadow. 
# Let's remove the background color from the cards to make them transparent with just a border, which feels more "breathable" and clean.
compliance_section = compliance_section.replace('background: #121316; border: 1px solid rgba(255,255,255,0.05);', 'background: transparent; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); border-left: none; border-right: none;')

# For the inner illustration containers
compliance_section = compliance_section.replace('background: #0b0c0e; border: 1px solid rgba(255,255,255,0.02);', 'background: transparent; border: 1px solid rgba(255,255,255,0.1);')

content = content[:compliance_start] + compliance_section + content[compliance_end:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Design cleaned up successfully.")
