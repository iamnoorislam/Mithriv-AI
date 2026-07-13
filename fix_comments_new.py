import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace <!-- ... --> with {/* ... */}
content = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', content, flags=re.DOTALL)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed HTML comments in new SVGs.")
