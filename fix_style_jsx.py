import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

bad_style_start = "<style dangerouslySetInnerHTML={{ __html: `"
good_style_start = "<style>{`"

bad_style_end = "`}} />"
good_style_end = "`}</style>"

compliance_start = content.find('<section id="compliance-automates"')

if compliance_start != -1:
    compliance_end = content.find('</section>', compliance_start) + len('</section>')
    section_content = content[compliance_start:compliance_end]
    
    style_idx = section_content.find(bad_style_start)
    if style_idx != -1:
        section_content = section_content.replace(bad_style_start, good_style_start, 1)
        end_idx = section_content.find(bad_style_end, style_idx)
        if end_idx != -1:
            section_content = section_content[:end_idx] + good_style_end + section_content[end_idx+len(bad_style_end):]
            
        content = content[:compliance_start] + section_content + content[compliance_end:]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print("Style tag fixed.")
    else:
        print("Could not find the bad style tag.")
        
