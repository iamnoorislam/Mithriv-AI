import os
import re

svg_old = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
svg_old2 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
svg_new = '<svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg>'
svg_new_html = '<svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg>'

dirs = ['app', 'components']

for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                new_content = content
                new_content = new_content.replace(svg_old, svg_new_html)
                new_content = new_content.replace(svg_old2, svg_new)

                # Special case for Navbar 'Watch Demo' and 'View ...'
                if file == 'Navbar.tsx':
                    # Add arrow to Watch Demo if not present
                    if '>Watch Demo<' in new_content:
                        new_content = new_content.replace('>Watch Demo<', f'>Watch Demo {svg_new}<')
                    
                    if '>View Platform Overview<' in new_content:
                        new_content = new_content.replace('>View Platform Overview<', f'>View Platform Overview {svg_new}<')
                    
                    if '>View All Resources<' in new_content:
                        new_content = new_content.replace('>View All Resources<', f'>View All Resources {svg_new}<')

                # Special cases for other buttons without arrows in page.tsx
                if 'page.tsx' in file:
                    if '>Explore the platform<' in new_content:
                        new_content = new_content.replace('>Explore the platform<', f'>Explore the platform {svg_new_html}<')
                    if '>Request architecture review<' in new_content:
                        new_content = new_content.replace('>Request architecture review<', f'>Request architecture review {svg_new_html}<')
                    if '>Request Assessment<' in new_content:
                        new_content = new_content.replace('>Request Assessment<', f'>Request Assessment {svg_new_html}<')
                    if '>Request Communication Assessment<' in new_content:
                        new_content = new_content.replace('>Request Communication Assessment<', f'>Request Communication Assessment {svg_new_html}<')
                    
                    # Also replace Explore the platform → with SVG
                    if 'Explore the platform →' in new_content:
                        new_content = new_content.replace('Explore the platform →', f'Explore the platform {svg_new_html}')

                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {path}")
