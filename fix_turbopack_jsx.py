import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

compliance_start = content.find('<section id="compliance-automates"')
if compliance_start != -1:
    section_end = content.find('</section>', compliance_start)
    section_content = content[compliance_start:section_end]
    
    # We have 4 blocks of dangerouslySetInnerHTML={{ __html: ` ... `}}
    # We will replace them one by one.
    while True:
        start_idx = section_content.find("dangerouslySetInnerHTML={{ __html: `")
        if start_idx == -1:
            break
        end_idx = section_content.find("`}}", start_idx)
        
        # Extract the HTML content inside the backticks
        html_content = section_content[start_idx + len("dangerouslySetInnerHTML={{ __html: `") : end_idx]
        
        # Replace double quotes with single quotes
        html_content = html_content.replace('"', "'")
        
        # Strip newlines and escape backslashes if any (though there shouldn't be)
        html_content = html_content.replace('\n', ' ')
        
        # Wrap in double quotes
        new_block = 'dangerouslySetInnerHTML={{ __html: "' + html_content + '" }}'
        
        section_content = section_content[:start_idx] + new_block + section_content[end_idx + len("`}}"):]

    content = content[:compliance_start] + section_content + content[section_end:]
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed dangerouslySetInnerHTML syntax.")
else:
    print("Could not find section.")
