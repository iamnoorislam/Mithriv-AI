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

# Update spinSlow to include transform-origin
section_content = section_content.replace(
    '@keyframes spinSlow { 100% { transform: rotate(360deg); } }',
    '@keyframes spinSlow { 100% { transform: rotate(360deg); } }'
)
section_content = section_content.replace(
    'style="animation: spinSlow 4s linear infinite;"',
    'style="transform-origin: center; animation: spinSlow 2s linear infinite;"'
)

# Card 1 items: Make them blink/pulse one by one continuously instead of fading in once
section_content = section_content.replace(
    'animation: slideUpFade 0.6s ease-out 0.2s forwards;',
    'animation: blinkSlow 3s infinite 0s;'
)
section_content = section_content.replace(
    'animation: slideUpFade 0.6s ease-out 0.4s forwards;',
    'animation: blinkSlow 3s infinite 1s;'
)
section_content = section_content.replace(
    'animation: slideUpFade 0.6s ease-out 0.6000000000000001s forwards;',
    'animation: blinkSlow 3s infinite 2s;'
)

# Update drawLineVertical to loop so it's always animating
section_content = section_content.replace(
    '@keyframes drawLineVertical { 0% { height: 0%; opacity: 0; } 100% { height: 100%; opacity: 1; } }',
    '@keyframes drawLineVertical { 0%, 10% { height: 0%; opacity: 0; } 40%, 80% { height: 100%; opacity: 1; } 100% { height: 100%; opacity: 0; } }'
)
section_content = section_content.replace(
    'animation: drawLineVertical 1.5s ease-out forwards;',
    'animation: drawLineVertical 4s ease-out infinite;'
)

# Update fillProgress to loop
section_content = section_content.replace(
    '@keyframes fillProgress { 0% { width: 0%; } 100% { width: 65%; } }',
    '@keyframes fillProgress { 0%, 10% { width: 0%; } 40%, 80% { width: 65%; } 100% { width: 0%; } }'
)
section_content = section_content.replace(
    'animation: fillProgress 1.5s ease-out forwards;',
    'animation: fillProgress 5s ease-out infinite;'
)

# Make the pulses more obvious so they can be seen
section_content = section_content.replace(
    '@keyframes pulseGlowRed { 0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(228, 72, 86, 0.2); } 50% { opacity: 0.8; box-shadow: 0 0 20px rgba(228, 72, 86, 0.5); } }',
    '@keyframes pulseGlowRed { 0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(228, 72, 86, 0.2); background: rgba(228, 72, 86, 0.1); } 50% { opacity: 0.8; box-shadow: 0 0 15px rgba(228, 72, 86, 0.8); background: rgba(228, 72, 86, 0.3); } }'
)
section_content = section_content.replace(
    '@keyframes pulseGlowGreen { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(73, 178, 92, 0.3); } 50% { opacity: 0.8; box-shadow: 0 0 16px rgba(73, 178, 92, 0.6); } }',
    '@keyframes pulseGlowGreen { 0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(73, 178, 92, 0.2); } 50% { opacity: 0.6; text-shadow: 0 0 15px rgba(73, 178, 92, 0.8); } }'
)
section_content = section_content.replace(
    '@keyframes pulseGlowPurple { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(217, 134, 240, 0.3); } 50% { opacity: 0.8; box-shadow: 0 0 16px rgba(217, 134, 240, 0.6); } }',
    '@keyframes pulseGlowPurple { 0%, 100% { box-shadow: 0 0 5px rgba(217, 134, 240, 0.5); } 50% { box-shadow: 0 0 15px rgba(217, 134, 240, 0.9); } }'
)

content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated animations to be continuous loops.")
