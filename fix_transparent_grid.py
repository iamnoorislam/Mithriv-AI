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

# Update .assurance-grid to remove gap and background, add padding so the negative margins don't break out
section_content = section_content.replace(
    ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); overflow: hidden; }",
    ".assurance-grid { display: grid; grid-template-columns: repeat(3, 1fr); }"
)

# Update .minimal-card to have its own border and negative margin to prevent double borders
section_content = section_content.replace(
    ".minimal-card { background: transparent; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }",
    ".minimal-card { background: transparent; border: 1px solid rgba(255,255,255,0.1); margin: -1px 0 0 -1px; padding: 40px 32px; display: flex; flex-direction: column; transition: background 0.3s; }"
)

content = content[:start_idx] + section_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed grid strokes without fill colors.")
