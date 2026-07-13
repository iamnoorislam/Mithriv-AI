import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

with open("svg_0.txt", "r") as f:
    svg0 = f.read()
with open("svg_1.txt", "r") as f:
    svg1 = f.read()
with open("svg_2.txt", "r") as f:
    svg2 = f.read()
with open("svg_3.txt", "r") as f:
    svg3 = f.read()

# Replace all <svg ...> ... </svg> inside fig-svg-wrap in page.tsx
# In intelligence-engine-v2, they have viewBox="0 0 360 200"
matches = list(re.finditer(r'<svg viewBox="0 0 360 200".*?</svg>', content, re.DOTALL))

if len(matches) == 4:
    new_content = content[:matches[0].start()] + svg0 + \
                  content[matches[0].end():matches[1].start()] + svg1 + \
                  content[matches[1].end():matches[2].start()] + svg2 + \
                  content[matches[2].end():matches[3].start()] + svg3 + \
                  content[matches[3].end():]
    
    with open("app/intelligence-engine-v2/page.tsx", "w") as f:
        f.write(new_content)
    print("Replaced 4 SVGs.")
else:
    print(f"Found {len(matches)} SVGs in page.tsx instead of 4.")
