import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

for i in range(6):
    start = content.find(f'activeCapability === {i}')
    if start == -1:
        print(f"Could not find activeCapability === {i}")
        continue
    
    # Just to verify how many times #7700FF or rgba(119,0,255 appear in this block
    # We will slice roughly the size of one SVG block (around 3000 chars)
    block = content[start:start+3000]
    hex_count = block.count('#7700FF')
    rgb_count = block.count('119, 0, 255') + block.count('119,0,255')
    
    print(f"Tab {i}: #7700FF occurs {hex_count} times, rgba(119,0,255) occurs {rgb_count} times.")
