import re

with open("app/intelligence-engine-v2/page.tsx", "r") as f:
    content = f.read()

# Define mapping
color_map = {
    '#7700FF': '#6354F3',
    '119, 0, 255': '99, 84, 243',
    '119,0,255': '99,84,243',
    
    '#A855F7': '#8F92E9',
    '168, 85, 247': '143, 146, 233',
    '168,85,247': '143,146,233',
    
    '#10B981': '#49B25C',
    '16, 185, 129': '73, 178, 92',
    '16,185,129': '73,178,92',
    
    '#EF4444': '#E44856',
    '239, 68, 68': '228, 72, 86',
    '239,68,68': '228,72,86',
    
    '#F59E0B': '#E7C73B',
    '245, 158, 11': '231, 199, 59',
    '245,158,11': '231,199,59',
    
    '#EC4899': '#EA49B2',
    '236, 72, 153': '234, 73, 178',
    '236,72,153': '234,73,178',
    
    '#3B82F6': '#4993E3',
    '59, 130, 246': '73, 147, 227',
    '59,130,246': '73,147,227'
}

# The illustrations are inside the "Capabilities" section.
# We'll just replace these colors globally in the file since these are specific accent colors
# and the user wants the design language to match across the board, but let's constrain it
# to the illustrations just to be safe, or globally if it makes sense.
# Actually, the user said "on all 6 illustration on this section".
# The section is rendered around activeCapability === 0 to activeCapability === 5.

start_marker = 'id="capabilities"' # Wait, the section is #capabilities? Let's check the id.
# Let's just do it from activeCapability === 0 to the end of the file or </section>
# It's safer to just replace it from the start of the `renderVisual` or just `activeCapability === 0` to `</section>`

start_idx = content.find('activeCapability === 0')
end_idx = content.find('</section>', start_idx)

if start_idx != -1 and end_idx != -1:
    section_content = content[start_idx:end_idx]
    for old_color, new_color in color_map.items():
        # Case insensitive replace for hex codes just in case
        pattern = re.compile(re.escape(old_color), re.IGNORECASE)
        section_content = pattern.sub(new_color, section_content)
    
    new_content = content[:start_idx] + section_content + content[end_idx:]
    
    # Also, there's the text color of the active tab on the left!
    # "color: activeCapability === index ? '#7700FF' : ''"
    # We should probably replace it globally to be consistent throughout the page!
    for old_color, new_color in color_map.items():
        new_content = re.sub(re.escape(old_color), new_color, new_content, flags=re.IGNORECASE)

    with open("app/intelligence-engine-v2/page.tsx", "w") as f:
        f.write(new_content)
    print("Replaced colors successfully.")
else:
    print("Could not find bounds.")

