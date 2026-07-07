import sys
import re

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

id_idx = content.find('id="assurance-architecture"')
if id_idx == -1:
    sys.exit("Could not find section")
start_idx = content.rfind("<section", 0, id_idx)
end_idx = content.find("</section>", start_idx) + len("</section>")

section_content = content[start_idx:end_idx]

# 1. Add keyframes to the <style> block
keyframes_to_add = """
            @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes pulseGlowRed { 0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(228, 72, 86, 0.2); } 50% { opacity: 0.8; box-shadow: 0 0 20px rgba(228, 72, 86, 0.5); } }
            @keyframes pulseGlowGreen { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(73, 178, 92, 0.3); } 50% { opacity: 0.8; box-shadow: 0 0 16px rgba(73, 178, 92, 0.6); } }
            @keyframes pulseGlowPurple { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(217, 134, 240, 0.3); } 50% { opacity: 0.8; box-shadow: 0 0 16px rgba(217, 134, 240, 0.6); } }
            @keyframes dashFlow { 100% { stroke-dashoffset: -20; } }
            @keyframes blinkSlow { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
            @keyframes fillProgress { 0% { width: 0%; } 100% { width: 65%; } }
            @keyframes spinSlow { 100% { transform: rotate(360deg); } }
            @keyframes drawLineVertical { 0% { height: 0%; opacity: 0; } 100% { height: 100%; opacity: 1; } }
"""
section_content = section_content.replace('</style>', keyframes_to_add + '\n        </style>')

# 2. Add animations to elements

# Card 1: Staggered slide up for checklist items
def add_staggered_animation(match):
    add_staggered_animation.counter += 1
    delay = add_staggered_animation.counter * 0.2
    return f'<div style="display: flex; align-items: center; gap: 10px; z-index: 1; animation: slideUpFade 0.6s ease-out {delay}s forwards; opacity: 0;">'
add_staggered_animation.counter = 0
section_content = re.sub(r'<div style="display: flex; align-items: center; gap: 10px; z-index: 1;">', add_staggered_animation, section_content)

# Make pipeline icon spin
section_content = section_content.replace(
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spinSlow 4s linear infinite;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
)

# Card 2: Branching line flow and pending blink
section_content = section_content.replace(
    'stroke-dasharray="2 2"',
    'stroke-dasharray="4 4" style="animation: dashFlow 1s linear infinite;"'
)
section_content = section_content.replace(
    '[ PENDING... ]',
    '<span style="animation: blinkSlow 1.5s infinite;">[ PENDING... ]</span>'
)

# Card 3: Timeline nodes pulse
section_content = section_content.replace(
    'border-radius: 50%; background: #D986F0;',
    'border-radius: 50%; background: #D986F0; animation: pulseGlowPurple 2s infinite;'
)
section_content = section_content.replace(
    'width: 1px; background: rgba(217, 134, 240, 0.3);',
    'width: 1px; background: rgba(217, 134, 240, 0.3); transform-origin: top; animation: drawLineVertical 1.5s ease-out forwards;'
)

# Card 4: Infrastructure dash line flow
old_dashed_div = '<div style="width: 100%; border-top: 1px dashed rgba(255,255,255,0.2);"></div>'
new_dashed_svg = '<svg width="100%" height="2" style="margin-top: 2px;"><line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4 4" style="animation: dashFlow 1.5s linear infinite;"/></svg>'
section_content = section_content.replace(old_dashed_div, new_dashed_svg)

# Card 5: Progress bar fill and icon pulse
section_content = section_content.replace(
    '<div style="width: 65%; height: 100%; background: #E44856;"></div>',
    '<div style="width: 65%; height: 100%; background: #E44856; animation: fillProgress 1.5s ease-out forwards;"></div>'
)
section_content = section_content.replace(
    '<div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(228, 72, 86, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">',
    '<div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(228, 72, 86, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; animation: pulseGlowRed 2s infinite;">'
)

# Card 6: Active badge pulse
active_div_start = '<div style="display: flex; align-items: center; gap: 4px; color: #49B25C; font-size: 9px; font-weight: bold;">'
active_div_end = '<div style="display: flex; align-items: center; gap: 4px; color: #49B25C; font-size: 9px; font-weight: bold; animation: pulseGlowGreen 2s infinite; border-radius: 4px;">'
section_content = section_content.replace(active_div_start, active_div_end)


content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Added subtle animations to infographics.")
