import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

start_idx = content.find('activeCapability === 2')
end_idx = content.find('activeCapability === 3', start_idx)

if start_idx != -1 and end_idx != -1:
    section_content = content[start_idx:end_idx]
    
    # The current green is #49B25C or rgba(73, 178, 92
    # The target green is #AFF962 or rgba(175, 249, 98
    
    color_map = {
        '#49B25C': '#AFF962',
        '73, 178, 92': '175, 249, 98',
        '73,178,92': '175,249,98'
    }
    
    for old_color, new_color in color_map.items():
        pattern = re.compile(re.escape(old_color), re.IGNORECASE)
        section_content = pattern.sub(new_color, section_content)
        
    new_content = content[:start_idx] + section_content + content[end_idx:]
    
    with open("app/intelligence-engine-v2/page.tsx", "w") as f:
        f.write(new_content)
    print("Successfully updated colors for Autonomous Compliance Engine.")
else:
    print("Could not find the capability section.")

