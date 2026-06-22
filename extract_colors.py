import re

svg_path = "/Users/noorislam/Downloads/Bnner/mithriv-website/visitor-agent.svg/Group 1000009002.svg"

with open(svg_path, 'r', encoding='utf-8') as f:
    content = f.read()

fills = set(re.findall(r'fill="([^"]+)"', content))
strokes = set(re.findall(r'stroke="([^"]+)"', content))

print("Fills found:", fills)
print("Strokes found:", strokes)
