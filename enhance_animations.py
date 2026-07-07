import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

id_idx = content.find('id="assurance-architecture"')
if id_idx == -1:
    sys.exit("Could not find section")
start_idx = content.rfind("<section", 0, id_idx)
end_idx = content.find("</section>", start_idx) + len("</section>")

section_content = content[start_idx:end_idx]

# Replace keyframes
old_keyframes = """
            @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes pulseRed { 0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(228, 72, 86, 0.2); } 50% { opacity: 0.5; box-shadow: 0 0 20px rgba(228, 72, 86, 0.6); } }
            @keyframes pulseGreen { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(73, 178, 92, 0.5); } 50% { opacity: 0.6; box-shadow: 0 0 16px rgba(73, 178, 92, 0.8); } }
            @keyframes dashFlow { 100% { stroke-dashoffset: -20; } }
            @keyframes blinkText { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
            @keyframes fillProgress { 0% { width: 0%; } 100% { width: 65%; } }
            @keyframes spinIcon { 100% { transform: rotate(360deg); } }
            @keyframes floatIcon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
"""

new_keyframes = """
            @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes pulseRed { 0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 15px rgba(228, 72, 86, 0.4); } 50% { opacity: 0.8; transform: scale(1.4); box-shadow: 0 0 40px rgba(228, 72, 86, 1); } }
            @keyframes pulseGreen { 0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px rgba(73, 178, 92, 0.4); } 50% { opacity: 0.9; transform: scale(1.3); box-shadow: 0 0 35px rgba(73, 178, 92, 1); } }
            @keyframes dashFlow { 100% { stroke-dashoffset: -100; } }
            @keyframes blinkText { 0%, 100% { opacity: 1; color: #FCE545; } 50% { opacity: 0.3; color: #FFF; } }
            @keyframes fillProgress { 0% { width: 10%; } 50% { width: 95%; } 100% { width: 10%; } }
            @keyframes spinIcon { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.3); } 100% { transform: rotate(360deg) scale(1); } }
            @keyframes floatIcon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
"""
section_content = section_content.replace(old_keyframes.strip(), new_keyframes.strip())

# Also, the fillProgress needs to be infinite to look alive
section_content = section_content.replace(
    'animation: fillProgress 1.5s ease-out forwards;',
    'animation: fillProgress 3s ease-in-out infinite;'
)
# Spin icon was 4s, let's make it 2s
section_content = section_content.replace(
    'animation: spinIcon 4s linear infinite;',
    'animation: spinIcon 2s ease-in-out infinite;'
)
# Make pulseRed faster
section_content = section_content.replace(
    'animation: pulseRed 2s infinite;',
    'animation: pulseRed 1s infinite;'
)
section_content = section_content.replace(
    'animation: pulseRed 1.5s infinite;',
    'animation: pulseRed 0.8s infinite;'
)

content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Enhanced animations.")
