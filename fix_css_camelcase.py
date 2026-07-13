import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

def uncamel(match):
    inner = match.group(1)
    replacements = {
        'strokeWidth': 'stroke-width',
        'strokeDasharray': 'stroke-dasharray',
        'fontFamily': 'font-family',
        'fontWeight': 'font-weight',
        'fontSize': 'font-size',
        'textAnchor': 'text-anchor',
        'letterSpacing': 'letter-spacing',
        'className=': 'class=',  # Actually in CSS we don't have className=, but we might have it by mistake? No, className isn't used in CSS.
        'stopColor': 'stop-color'
    }
    for old, new in replacements.items():
        inner = inner.replace(old, new)
    return f'<style dangerouslySetInnerHTML={{{{ __html: `{inner}` }}}} />'

content = re.sub(r'<style dangerouslySetInnerHTML={{ __html: `(.*?)` }} />', uncamel, content, flags=re.DOTALL)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Reverted camelCase inside style tags.")
