import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Fix duplicate fontWeight
content = content.replace('fontWeight="900" fontSize="9" fontWeight="bold"', 'fontWeight="900" fontSize="9"')
content = content.replace('fontWeight="900" fontSize="8" fontWeight="bold"', 'fontWeight="900" fontSize="8"')
content = content.replace('fontWeight="900" fontSize="7" fontWeight="bold"', 'fontWeight="900" fontSize="7"')

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)
print("Fixed duplicate attributes.")
