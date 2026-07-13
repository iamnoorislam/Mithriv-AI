import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Replace class=" with className="
new_content = content.replace('class="trigger-path"', 'className="trigger-path"')
new_content = new_content.replace('class="trigger-packet"', 'className="trigger-packet"')
new_content = new_content.replace('class="trigger-path-red"', 'className="trigger-path-red"')
new_content = new_content.replace('class="trigger-packet-red"', 'className="trigger-packet-red"')

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Fixed class to className.")
