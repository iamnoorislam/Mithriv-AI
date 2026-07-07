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

# Remove border radius from .assurance-grid
section_content = section_content.replace(
    ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; }",
    ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); overflow: hidden; }"
)

# Remove fill color from .minimal-card
section_content = section_content.replace(
    ".minimal-card { background: #080808; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }",
    ".minimal-card { background: transparent; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }"
)

# Remove hover fill color
section_content = section_content.replace(
    ".minimal-card:hover { background: #0c0c0c; }",
    ".minimal-card:hover { background: transparent; }"
)

content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed radius and fill colors.")
