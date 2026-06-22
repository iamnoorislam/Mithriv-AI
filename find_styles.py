import re

svg_path = "/Users/noorislam/Downloads/Bnner/mithriv-website/visitor-agent.svg/Group 1000009002.svg"

with open(svg_path, 'r', encoding='utf-8') as f:
    content = f.read()

styles = re.findall(r'<style[^>]*>.*?</style>', content, re.DOTALL)
print("Styles found:", len(styles))
for s in styles[:5]:
    print(s[:200])
