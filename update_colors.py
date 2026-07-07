import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
if assurance_start == -1:
    print("Could not find Assurance section")
    sys.exit(1)
    
assurance_end = content.find("</section>", assurance_start) + len("</section>")
assurance_section = content[assurance_start:assurance_end]

# Hex replacements
replacements = {
    "#10b981": "#49B25C",
    "#fbbf24": "#FCE545",
    "#a78bfa": "#D986F0",
    "#60a5fa": "#4993E3",
    "#ef4444": "#E44856",
    
    "16,185,129": "73, 178, 92",
    "251,191,36": "252, 229, 69",
    "139,92,246": "217, 134, 240",
    "239, 68, 68": "228, 72, 86"
}

new_assurance = assurance_section
for old, new in replacements.items():
    new_assurance = new_assurance.replace(old, new)

content = content[:assurance_start] + new_assurance + content[assurance_end:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Colors updated successfully.")
