import sys
import os

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Find the injected JSX block
start_marker = "{/* New Compliance Automates Section (Interactive Console Layout) */}"
start_idx = content.find(start_marker)
if start_idx == -1:
    sys.exit("Could not find start marker")

end_idx = content.find("</section>", start_idx) + len("</section>")
jsx_content = content[start_idx:end_idx]

# 2. Save it as a separate component
component_code = f"""'use client';
import React, {open('{', 'w').name.replace('w', '')} useState {open('}', 'w').name.replace('w', '')} from 'react';

export default function ComplianceAutomates() {{
    const [activeComplianceTab, setActiveComplianceTab] = useState(0);

    return (
        <>
            {jsx_content}
        </>
    );
}}
"""
# Oops, nested curly braces in python f-string are hard.
component_code = """'use client';
import React, { useState } from 'react';

export default function ComplianceAutomates() {
    const [activeComplianceTab, setActiveComplianceTab] = useState(0);

    return (
        <>
""" + jsx_content + """
        </>
    );
}
"""

component_path = "/Users/noorislam/Downloads/Bnner/mithriv-website/components/ui/ComplianceAutomates.tsx"
os.makedirs(os.path.dirname(component_path), exist_ok=True)
with open(component_path, "w", encoding="utf-8") as f:
    f.write(component_code)

# 3. Modify page.tsx
# Remove the state variable we added to Home02Page earlier
state_var = "    const [activeComplianceTab, setActiveComplianceTab] = useState(0);\n"
content = content.replace(state_var, "")

# Import the component at the top
import_stmt = "import ComplianceAutomates from '@/components/ui/ComplianceAutomates';\n"
if "import ComplianceAutomates" not in content:
    content = import_stmt + content

# Split the inner HTML block
split_replacement = """` }} />
            <ComplianceAutomates />
            <div dangerouslySetInnerHTML={{ __html: `"""

# Replace the JSX in page.tsx with the split block
content = content[:start_idx] + split_replacement + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Extracted ComplianceAutomates component and fixed injection.")
