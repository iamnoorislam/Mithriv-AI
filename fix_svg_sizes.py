import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# 1. Increase SVG height and tighten viewBox
content = content.replace(
    '<svg viewBox="0 0 240 180" width="100%" height="160"',
    '<svg viewBox="10 10 220 160" width="100%" height="260"'
)

# 2. Remove mask-image from .fig-svg-wrap
content = content.replace(
    '-webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);',
    '/* mask removed */'
)
content = content.replace(
    'mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);',
    '/* mask removed */'
)

# Make sure we remove padding that squishes it down
content = content.replace('padding-top: 24px !important;', 'padding-top: 0 !important;')

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed SVG sizes and removed fade mask.")
