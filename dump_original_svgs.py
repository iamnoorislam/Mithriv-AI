import re

with open("page_original.tsx", "r") as f:
    content = f.read()

matches = list(re.finditer(r'<svg viewBox="0 0 360 200".*?</svg>', content, re.DOTALL))
for i, m in enumerate(matches[:4]):
    with open(f"original_svg_{i}.txt", "w") as out:
        out.write(m.group(0))
