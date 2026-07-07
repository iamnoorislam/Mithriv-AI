import os

dirs = ['app', 'components']

replacements = {
    'class="hover-arrow-svg"': 'className="hover-arrow-svg"',
    'class="arrow-stem"': 'className="arrow-stem"',
    'class="arrow-head"': 'className="arrow-head"',
    'stroke-width=': 'strokeWidth=',
    'stroke-linecap=': 'strokeLinecap=',
    'stroke-linejoin=': 'strokeLinejoin='
}

for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements.items():
                    new_content = new_content.replace(old, new)
                
                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")
