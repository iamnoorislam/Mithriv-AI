import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# 1. Revert viewBox and set an optimal height (190px)
content = content.replace(
    '<svg viewBox="10 10 220 160" width="100%" height="260"',
    '<svg viewBox="0 0 240 180" width="100%" height="190"'
)

# 2. Add some top padding back to fig-svg-wrap so it doesn't touch the top
content = content.replace('padding-top: 0 !important;', 'padding-top: 24px !important;')

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed SVG optimization.")
