import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

def clean_css(match):
    inner = match.group(1)
    # The inner string might start with {` and end with `}
    inner = inner.strip()
    if inner.startswith('{\\`') or inner.startswith('{`'):
        inner = inner[2:]
    if inner.endswith('\\`}') or inner.endswith('`}'):
        inner = inner[:-2]
    return f'<style dangerouslySetInnerHTML={{{{ __html: `{inner}` }}}} />'

content = re.sub(r'<style dangerouslySetInnerHTML={{ __html: `(.*?)` }} />', clean_css, content, flags=re.DOTALL)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed CSS braces.")
