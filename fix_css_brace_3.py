import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace \` }} /> with ` }} />
content = content.replace('\\` }} />', '` }} />')

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed CSS closing backticks.")
