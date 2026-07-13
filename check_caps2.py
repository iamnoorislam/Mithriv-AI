import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

for i in range(6):
    start = content.find(f'activeCapability === {i}')
    if start == -1:
        continue
    
    end = content.find(f'activeCapability === {i+1}')
    if end == -1:
        end = content.find('</svg>', start) + 20
    
    block = content[start:end]
    colors = set(re.findall(r'#[0-9A-Fa-f]{6}', block))
    print(f"Tab {i} hex colors: {colors}")
