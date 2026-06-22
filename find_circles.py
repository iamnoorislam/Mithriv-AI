import re

svg_path = "/Users/noorislam/Downloads/Bnner/mithriv-website/visitor-agent.svg/Group 1000009002.svg"

with open(svg_path, 'r', encoding='utf-8') as f:
    content = f.read()

circles = re.findall(r'<circle[^>]+>', content)
for c in circles:
    print(c)
