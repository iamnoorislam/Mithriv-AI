import re

with open("app/home-02/page.tsx", "r") as f:
    content = f.read()

svgs = []
# Find all <svg ...> ... </svg> inside fig-svg-wrap
matches = re.finditer(r'<svg viewBox="0 0 200 160".*?</svg>', content, re.DOTALL)
for m in matches:
    svgs.append(m.group(0))

print(f"Found {len(svgs)} svgs in home-02")
for i, svg in enumerate(svgs):
    with open(f"svg_{i}.txt", "w") as out:
        out.write(svg)
