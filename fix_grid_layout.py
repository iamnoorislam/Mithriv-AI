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

# 1. Update .assurance-grid
old_grid = ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }"
new_grid = ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; }"
section_content = section_content.replace(old_grid, new_grid)

# 2. Update .minimal-card
# Right now it might say: .minimal-card { background: transparent; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 32px; display: flex; flex-direction: column; transition: border-color 0.3s; }
old_card = ".minimal-card { background: transparent; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 32px; display: flex; flex-direction: column; transition: border-color 0.3s; }"
new_card = ".minimal-card { background: #080808; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }"
section_content = section_content.replace(old_card, new_card)

# Wait, what about the hover state?
old_hover = ".minimal-card:hover { border-color: rgba(255,255,255,0.15); }"
new_hover = ".minimal-card:hover { background: #0c0c0c; }"
section_content = section_content.replace(old_hover, new_hover)

content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored single-box grid layout.")
