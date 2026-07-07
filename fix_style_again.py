import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the <style>{` ... `}</style> block
style_start = content.find("<style>{`")
if style_start != -1:
    style_end = content.find("`}</style>", style_start) + len("`}</style>")
    content = content[:style_start] + content[style_end:]
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Removed style tag from page.tsx")
else:
    print("Could not find style tag")

# Add keyframes to style.css
css_path = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/style.css"
with open(css_path, "a", encoding="utf-8") as f:
    f.write("""
/* Compliance Automates Keyframes */
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scan-sweep-horizontal { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(200%); opacity: 0; } }
@keyframes rotateOrbitPath { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes grant-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; text-shadow: 0 0 10px rgba(73, 178, 92, 0.8); } }
@keyframes terminal-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes riseKpiBar { 0% { transform: scaleY(0.4); } 100% { transform: scaleY(1); } }
""")
print("Added keyframes to style.css")
