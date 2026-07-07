import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/components/ui/ComplianceAutomates.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the split layout with one wrapped in a big box
old_split_layout = """                {/* Split Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }} className="compliance-console-grid">
                    
                    {/* Left: Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>"""

new_split_layout = """                {/* One Big Box */}
                <div style={{
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    padding: '50px 50px 50px 50px',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {/* Split Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '40px', alignItems: 'start' }} className="compliance-console-grid">
                        
                        {/* Left: Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>"""

content = content.replace(old_split_layout, new_split_layout)

# We also need to add a closing div for the big box, right before the closing </div> of the split layout container.
# The split layout ends before:
#             <style>{`
#                 @media (max-width: 991px) {
old_end_split = """                    </div>
                </div>
            </div>
            <style>"""

new_end_split = """                    </div>
                </div>
                </div> {/* End One Big Box */}
            </div>
            <style>"""
content = content.replace(old_end_split, new_end_split)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Compliance Automates with big box.")
