import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace HTML comments with JSX comments
# Be careful not to replace anything that's not actually an HTML comment
new_content = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', content)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Fixed JSX comments.")
