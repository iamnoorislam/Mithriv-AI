import re
import os

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    page_content = f.read()

# Locate where the SVGs go in page.tsx (we currently have the 4 home-02 SVGs in there)
# They start at <svg viewBox="0 0 200 160" and end at </svg>
matches = list(re.finditer(r'<svg viewBox="0 0 200 160".*?</svg>', page_content, re.DOTALL))
if len(matches) != 4:
    print(f"Error: Found {len(matches)} SVGs in page.tsx to replace instead of 4.")
    exit(1)

# Read the original SVGs
orig_svgs = []
for i in range(4):
    with open(f"original_svg_{i}.txt", "r") as f:
        orig_svgs.append(f.read())

colors = [
    ("#7C3CD0", "124, 60, 208"),   # Purple
    ("#F59E0B", "245, 158, 11"),   # Yellow
    ("#3B82F6", "59, 130, 246"),   # Blue
    ("#10B981", "16, 185, 129")    # Green
]

noise_group = """
                    {/* Chaotic Alert Noise Cloud (from home-02 style) */}
                    <g style={{animation: 'noise-flicker 1.5s infinite'}}>
                        <circle cx="-65" cy="-55" r="1.5" fill="rgba(255,255,255,0.15)" />
                        <circle cx="135" cy="55" r="1.5" fill="rgba(255,255,255,0.15)" />
                        <circle cx="-50" cy="80" r="1.5" fill="rgba(255,255,255,0.2)" />
                        <circle cx="150" cy="-80" r="1.5" fill="rgba(255,255,255,0.15)" />
                        <circle cx="-70" cy="110" r="1.5" fill="rgba(255,255,255,0.2)" />
                        <circle cx="130" cy="-110" r="1.5" fill="rgba(255,255,255,0.1)" />
                    </g>
"""

new_svgs = []
for i, svg in enumerate(orig_svgs):
    hex_color, rgb_color = colors[i]
    
    # 1. Replace #7700FF with new hex color
    svg = svg.replace("#7700FF", hex_color)
    
    # 2. Replace rgba(119, 0, 255 with new rgb color
    # Note: Sometimes it's rgba(119,0,255 (no space)
    svg = svg.replace("rgba(119, 0, 255", f"rgba({rgb_color}")
    svg = svg.replace("rgba(119,0,255", f"rgba({rgb_color}")
    
    # 3. Add noise-flicker keyframes if not present, but wait, the SVG doesn't have a <style> block by default!
    # Let's insert a style block for the noise-flicker animation inside <defs>
    style_block = f"""
                    <style dangerouslySetInnerHTML={{{{ __html: `
                        @keyframes noise-flicker {{
                            0%, 100% {{ opacity: 0.1; }}
                            30% {{ opacity: 0.8; }}
                            60% {{ opacity: 0.3; }}
                            80% {{ opacity: 0.9; }}
                        }}
                    ` }}}} />
    """
    svg = svg.replace("</defs>", style_block + "\n                  </defs>")
    
    # 4. Insert noise group after <g transform=...>
    svg = re.sub(r'(<g transform="translate\([^)]+\) scale\([^)]+\)">)', r'\1' + noise_group, svg)

    # 5. Make sure JSX syntax is correct (it should be because it's from the original file which compiled fine, except style objects which are fine)
    # 6. Change font families. The original used fontFamily="var(--font-mono), monospace" mostly. We can change it to Outfit for major labels.
    # Actually, the user just wants the color and design language. Changing the font to Outfit for the big glowing texts:
    svg = re.sub(r'fontFamily="var\(--font-mono\), monospace" fontSize="([789])"', r'fontFamily="\'Outfit\', sans-serif" fontWeight="900" fontSize="\1"', svg)
    
    new_svgs.append(svg)

# Replace the 4 matches in page_content with the new SVGs
new_page_content = page_content[:matches[0].start()] + new_svgs[0] + \
                   page_content[matches[0].end():matches[1].start()] + new_svgs[1] + \
                   page_content[matches[1].end():matches[2].start()] + new_svgs[2] + \
                   page_content[matches[2].end():matches[3].start()] + new_svgs[3] + \
                   page_content[matches[3].end():]

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_page_content)

print("Restored and transformed original SVGs.")
