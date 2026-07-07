import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
assurance_end = content.find("</section>", assurance_start) + len("</section>")

unified_start = content.rfind("<section", 0, content.find("UNIFIED CONTROL"))
unified_end = content.find("</section>", unified_start) + len("</section>")

if assurance_start == -1 or unified_start == -1:
    print("Could not find one of the sections.")
    sys.exit(1)

print(f"Assurance: {assurance_start} to {assurance_end}")
print(f"Unified: {unified_start} to {unified_end}")

# Extract Assurance section
assurance_section = content[assurance_start:assurance_end]

# We need to remove the Assurance section from its current position
content_without_assurance = content[:assurance_start] + content[assurance_end:]

# Because we removed Assurance which was BEFORE Unified, the indices for Unified will shift.
# Let's recalculate the unified end position in the new string.
unified_start_new = content_without_assurance.rfind("<section", 0, content_without_assurance.find("UNIFIED CONTROL"))
unified_end_new = content_without_assurance.find("</section>", unified_start_new) + len("</section>")

# Insert Assurance after Unified
new_content = content_without_assurance[:unified_end_new] + "\n\n" + assurance_section + content_without_assurance[unified_end_new:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Section moved successfully.")
