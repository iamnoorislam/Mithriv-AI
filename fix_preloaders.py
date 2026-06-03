import os

files_to_fix = [
    'app/not-found.tsx',
    'app/integration-fabric/page.tsx',
    'app/communication-interface/page.tsx',
    'app/intelligence-engine/page.tsx',
    'app/watch-in-action/page.tsx'
]

preloader_logic = """
    // Hide Preloaders
    setTimeout(() => {
      const preloader1 = document.getElementById('premium-preloader');
      if (preloader1) {
        preloader1.style.opacity = '0';
        setTimeout(() => preloader1.style.display = 'none', 500);
      }
      const preloader2 = document.querySelector('.preloader');
      if (preloader2) {
        (preloader2 as HTMLElement).style.opacity = '0';
        setTimeout(() => (preloader2 as HTMLElement).style.display = 'none', 500);
      }
    }, 800);
"""

for file_path in files_to_fix:
    full_path = os.path.join('/Users/noorislam/Downloads/Bnner/mithriv-website', file_path)
    with open(full_path, 'r') as f:
        content = f.read()
    
    if "// Hide Preloaders" not in content:
        content = content.replace("  useEffect(() => {", "  useEffect(() => {\n" + preloader_logic)
        with open(full_path, 'w') as f:
            f.write(content)
print("Added preloader fix to all migrated pages")
