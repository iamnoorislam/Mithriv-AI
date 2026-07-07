import sys
import re

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/app/home-02/page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

assurance_start = content.find("<!-- New Assurance Architecture Section (Operational Outcomes Style) -->")
if assurance_start == -1:
    print("Could not find Assurance section")
    sys.exit(1)

style_start = content.find("<style>", assurance_start)
style_end = content.find("</style>", style_start) + len("</style>")

new_style = """<style>
                    .assurance-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1px;
                        background: #202022;
                        border: 1px solid #202022;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    @media (max-width: 767px) {
                        .assurance-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    /* Card Hover Dynamics */
                    .operational-grid-card {
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease;
                    }
                    .operational-grid-card:hover {
                        transform: translateY(-4px);
                        background: #121316 !important;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
                        z-index: 2;
                    }

                    /* Keyframes for micro-animations */
                    @keyframes terminal-pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.95); }
                    }
                    @keyframes contractor-item-cycle {
                        0%, 5% { opacity: 0; transform: translateX(-10px); }
                        15%, 85% { opacity: 1; transform: translateX(0); }
                        95%, 100% { opacity: 0; transform: translateX(10px); }
                    }
                    @keyframes typing-line-0 {
                        0%, 10% { opacity: 0; transform: translateY(5px); }
                        20%, 100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes typing-line-1 {
                        0%, 30% { opacity: 0; transform: translateY(5px); }
                        40%, 100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes typing-line-2 {
                        0%, 50% { opacity: 0; transform: translateY(5px); }
                        60%, 100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes typing-line-3 {
                        0%, 70% { opacity: 0; transform: translateY(5px); }
                        80%, 100% { opacity: 1; transform: translateY(0); }
                    }

                    /* Add hover animations to specific illustration elements */
                    .operational-grid-card:hover .anim-map-ping {
                        animation: map-ping 2s infinite ease-out;
                    }
                    @keyframes map-ping {
                        0% { transform: scale(1); opacity: 0.8; }
                        100% { transform: scale(3); opacity: 0; }
                    }

                    .operational-grid-card:hover .anim-btn-scale {
                        transform: scale(1.02);
                        box-shadow: 0 4px 12px rgba(228, 72, 86, 0.15);
                        background: rgba(228, 72, 86, 0.2) !important;
                    }
                    
                    .operational-grid-card:hover .anim-export-btn {
                        background: rgba(217,134,240,0.15) !important;
                        transform: scale(1.02);
                    }
                </style>"""

content = content[:style_start] + new_style + content[style_end:]

# Now replace some specific HTML to add the new anim classes
# 1. Map ping in Fig 1.4
old_map_circle = '<circle cx="60" cy="60" r="4" fill="#4993E3" />'
new_map_circle = '<g style="transform-origin: 60px 60px;"><circle cx="60" cy="60" r="4" fill="#4993E3" class="anim-map-ping" /><circle cx="60" cy="60" r="4" fill="#4993E3" /></g>'
content = content.replace(old_map_circle, new_map_circle)

# 2. Add class to Manual Override button in Fig 1.5
override_btn_old = '<div style="flex: 1; background: rgba(228, 72, 86, 0.15); border: 1px solid rgba(228, 72, 86, 0.3); border-radius: 6px; padding: 12px 0; text-align: center; cursor: pointer; transition: all 0.2s;">'
override_btn_new = '<div style="flex: 1; background: rgba(228, 72, 86, 0.15); border: 1px solid rgba(228, 72, 86, 0.3); border-radius: 6px; padding: 12px 0; text-align: center; cursor: pointer; transition: all 0.2s;" class="anim-btn-scale">'
content = content.replace(override_btn_old, override_btn_new)

# 3. Add class to Export Audit log button in Fig 1.3
export_btn_old = '<div style="margin-top: auto; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 10px; background: rgba(217, 134, 240,0.1); border: 1px solid rgba(217, 134, 240,0.25); border-radius: 6px; cursor: pointer;">'
export_btn_new = '<div style="margin-top: auto; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 10px; background: rgba(217, 134, 240,0.1); border: 1px solid rgba(217, 134, 240,0.25); border-radius: 6px; cursor: pointer; transition: all 0.2s;" class="anim-export-btn">'
content = content.replace(export_btn_old, export_btn_new)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Animations added successfully.")
