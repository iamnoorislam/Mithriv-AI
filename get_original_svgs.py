import re

with open("page_original.tsx", "r") as f:
    content = f.read()

svgs = []
# We need to find the SVGs in "THE PROBLEM" section, which is around line 680 to 950
matches = list(re.finditer(r'<svg viewBox="0 0 360 200".*?</svg>', content, re.DOTALL))
print(f"Found {len(matches)} original SVGs.")

for i, m in enumerate(matches[:4]):
    print(f"\n--- Original SVG {i+1} ---")
    print(m.group(0)[:300] + " ... " + m.group(0)[-100:])
