import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

def clean_css(match):
    inner = match.group(1)
    # The inner string currently might start with ` and a newline
    if inner.startswith('`'):
        inner = inner[1:]
    if inner.endswith('`'):
        inner = inner[:-1]
    
    # We want exactly one set of backticks inside __html
    return f'<style dangerouslySetInnerHTML={{{{ __html: `{inner}` }}}} />'

content = re.sub(r'<style dangerouslySetInnerHTML={{ __html: `(.*?)` }} />', clean_css, content, flags=re.DOTALL)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed CSS braces.")
