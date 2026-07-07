import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find the first CARD 05
first_card05 = content.find("<!-- ── CARD 05 ── -->")
second_card05 = content.find("<!-- ── CARD 05 ── -->", first_card05 + 10)

if first_card05 != -1 and second_card05 != -1:
    # There are two CARD 05s. The first one is the mistake.
    # Find the end of the bad block. It ends right before the closing tags of the section.
    # We will look for "</div>\n            </div>\n        </section>" after the first CARD 05
    end_of_bad_block = content.find("                </div>\n            </div>\n        </section>", first_card05)
    
    if end_of_bad_block != -1:
        # Replace everything from first_card05 up to end_of_bad_block with nothing
        # But we need to keep the closing tags!
        # The replacement should just be to delete the string from first_card05 to end_of_bad_block.
        # Let's check what precedes first_card05
        # It's probably spaces.
        
        # We will delete from first_card05 to end_of_bad_block
        content = content[:first_card05] + content[end_of_bad_block:]
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print("Removed the duplicate injected cards successfully.")
    else:
        print("Could not find the end of the bad block.")
else:
    print("Could not find two CARD 05s. Maybe already fixed?")

