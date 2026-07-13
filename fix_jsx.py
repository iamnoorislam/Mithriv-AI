import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# 1. Fix <style> blocks
def replace_style_block(match):
    inner = match.group(1)
    # escape backticks and ${}
    inner = inner.replace('`', '\\`').replace('${', '\\${')
    return f'<style dangerouslySetInnerHTML={{{{ __html: `{inner}` }}}} />'

content = re.sub(r'<style>(.*?)</style>', replace_style_block, content, flags=re.DOTALL)

# 2. Fix inline style="prop: value; prop: value;"
def replace_inline_style(match):
    style_str = match.group(1)
    rules = style_str.split(';')
    obj_props = []
    for rule in rules:
        if not rule.strip():
            continue
        parts = rule.split(':', 1)
        if len(parts) == 2:
            key = parts[0].strip()
            val = parts[1].strip()
            # camelCase the key
            key_parts = key.split('-')
            camel_key = key_parts[0] + ''.join(x.capitalize() for x in key_parts[1:])
            obj_props.append(f"{camel_key}: '{val}'")
    return "style={{" + ", ".join(obj_props) + "}}"

content = re.sub(r'style="([^"]*)"', replace_inline_style, content)

# 3. Fix SVG attributes to camelCase
replacements = {
    'stroke-width': 'strokeWidth',
    'stroke-dasharray': 'strokeDasharray',
    'font-family': 'fontFamily',
    'font-weight': 'fontWeight',
    'font-size': 'fontSize',
    'text-anchor': 'textAnchor',
    'letter-spacing': 'letterSpacing',
    'class=': 'className=',
    'stop-color': 'stopColor'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed JSX attributes.")
