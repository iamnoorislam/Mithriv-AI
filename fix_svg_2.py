import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Fix Silo 1
content = content.replace(
    """<g transform="translate(50, 70)" style={{animation: 'float-blue 4s ease-in-out infinite'}}>""",
    """<g transform="translate(50, 70)">\n        <g style={{animation: 'float-blue 4s ease-in-out infinite'}}>"""
)
# We also need to add closing </g> for Silo 1 before Silo 2.
# Silo 1 ends at: <text ...>VMS</text>\n    </g>
content = content.replace(
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">VMS</text>\n    </g>""",
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">VMS</text>\n        </g>\n    </g>"""
)

# Fix Silo 2
content = content.replace(
    """<g transform="translate(190, 60)" style={{animation: 'float-blue 4s ease-in-out infinite 1s'}}>""",
    """<g transform="translate(190, 60)">\n        <g style={{animation: 'float-blue 4s ease-in-out infinite 1s'}}>"""
)
content = content.replace(
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">IAM</text>\n    </g>""",
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">IAM</text>\n        </g>\n    </g>"""
)

# Fix Silo 3
content = content.replace(
    """<g transform="translate(120, 110)" style={{animation: 'float-blue 4s ease-in-out infinite 2s'}}>""",
    """<g transform="translate(120, 110)">\n        <g style={{animation: 'float-blue 4s ease-in-out infinite 2s'}}>"""
)
content = content.replace(
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">HR</text>\n    </g>""",
    """<text x="0" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" textAnchor="middle">HR</text>\n        </g>\n    </g>"""
)

with open("app/intelligence-engine-v2/page.tsx", "w") as f:
    f.write(content)

print("Fixed SVG 2 transforms.")
