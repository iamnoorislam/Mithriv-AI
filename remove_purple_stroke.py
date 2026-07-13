import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Pattern to match the specific comment and the following div block
pattern = r'\{\/\* Fading gradient border overlay \(CSS\) \*\/\}\s*<div style=\{\{\s*position: \'absolute\',\s*inset: 0,\s*borderRadius: \'8px\',\s*padding: \'1px\',\s*background: \'linear-gradient\(135deg, #7700FF 0%, rgba\(119, 0, 255, 0\) 50%\)\',\s*WebkitMask: \'linear-gradient\(#fff 0 0\) content-box, linear-gradient\(#fff 0 0\)\',\s*WebkitMaskComposite: \'xor\',\s*maskComposite: \'exclude\',\s*pointerEvents: \'none\',\s*zIndex: 10\s*\}\}\s*\/\>'

# Replace with empty string
new_content = re.sub(pattern, '', content)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(new_content)

print("Removed purple stroke from all illustrations.")
