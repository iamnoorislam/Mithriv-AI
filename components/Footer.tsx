'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Footer() {
  const pathname = usePathname()
  const logoRef = useRef<HTMLDivElement>(null)
  const [logoInView, setLogoInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setLogoInView(true)
        }
    }, { threshold: 0.1 })
    
    if (logoRef.current) {
        observer.observe(logoRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!logoInView) return;

    const canvas = document.getElementById('footerDotCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CFG = { 
        totalSize: 12, 
        dotSize: 1.5, 
        animSpeed: 0.5, 
        blinkFreq: 5.0, 
        fps: 60, 
        colors: [[255, 255, 255], [255, 255, 255]], 
        opacities: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] 
    };
    
    let W: number, H: number, startTime = performance.now();
    let cells: any[] = [];
    const PHI = 1.61803398874989484820459;
    
    function fract(x: number) { return x - Math.floor(x); }
    function rand2(x: number, y: number) { 
        const ax = x * PHI, ay = y * PHI; 
        const d = Math.sqrt((ax - x) ** 2 + (ay - y) ** 2); 
        return Math.abs(fract(Math.tan(d * 0.5) * x)); 
    }
    function blinkAlpha(col: number, row: number, t: number, showOffset: number) { 
        const freq = CFG.blinkFreq; 
        const phase = Math.floor(t / freq + showOffset + freq); 
        const r = rand2((col + 1) * phase * 0.1 + 1, (row + 1) * phase * 0.1 + 1); 
        return CFG.opacities[Math.floor(r * CFG.opacities.length)]; 
    }
    
    function resize() { 
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect(); 
        W = canvas.width = rect.width; 
        H = canvas.height = rect.height; 
        buildCells(); 
    }
    
    function buildCells() { 
        cells = []; 
        const ts = CFG.totalSize; 
        const cols = Math.ceil(W / ts) + 1; 
        const rows = Math.ceil(H / ts) + 1; 
        const cx = cols / 2; 
        const cy = rows / 2; 
        const maxD = Math.sqrt(cx * cx + cy * cy); 
        
        for (let row = 0; row < rows; row++) { 
            for (let col = 0; col < cols; col++) { 
                const s = rand2(col + 1, row + 1); 
                const rngB = rand2(col + 42, row + 42); 
                const dist = Math.sqrt((cx - col) ** 2 + (cy - row) ** 2); 
                cells.push({ 
                    col, row, 
                    showOffset: s, 
                    introOffset: dist * 0.01 + s * 0.15, 
                    outroOffset: (maxD - dist) * 0.02 + rngB * 0.2, 
                    colorIdx: Math.floor(s * CFG.colors.length) 
                }); 
            } 
        } 
    }

    let mouseX = -1000, mouseY = -1000;
    const container = canvas.parentElement;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
        mouseX = -1000;
        mouseY = -1000;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let lastFrame = 0;
    let animId: number;
    
    function draw(ts: number) {
        animId = requestAnimationFrame(draw);
        if (ts - lastFrame < 1000 / CFG.fps) return;
        lastFrame = ts;
        const elapsed = (ts - startTime) / 1000;
        const t = elapsed * CFG.animSpeed;
        if (ctx) ctx.clearRect(0, 0, W, H);
        const sz = CFG.totalSize;
        const ds = CFG.dotSize;
        const offX = Math.abs(Math.floor(((W % sz) - ds) * 0.5));
        const offY = Math.abs(Math.floor(((H % sz) - ds) * 0.5));

        for (const cell of cells) {
            const px = cell.col * sz - offX;
            const py = cell.row * sz - offY;
            if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
            if (t < cell.introOffset) continue;
            const alpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset);
            if (alpha <= 0) continue;

            const cx = px + ds;
            const cy = py + ds;
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 160; 

            let drawX = cx;
            let drawY = cy;
            let color = CFG.colors[cell.colorIdx] || CFG.colors[0];

            if (dist < radius && mouseX > 0) {
                const force = (radius - dist) / radius;
                drawX = cx + (dx / dist) * force * 16;
                drawY = cy + (dy / dist) * force * 16;

                const blend = force * 0.95;
                const r = Math.round(255 * (1 - blend) + 139 * blend);
                const g = Math.round(255 * (1 - blend) + 92 * blend);
                const b = Math.round(255 * (1 - blend) + 246 * blend);
                color = [r, g, b];
            }

            if (ctx) {
                ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
                ctx.beginPath();
                ctx.arc(drawX, drawY, ds, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    const ro = new ResizeObserver(resize); 
    ro.observe(container);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [logoInView]);

  if (pathname?.startsWith('/studio')) {
    return null
  }

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 1 }}>

        <footer className="cinematic-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src="/Logo/Mithriv logo.svg" alt="Mithriv Logo" style={{ height: '24px', filter: 'brightness(0) invert(1)' }} />
                    </div>
                
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link href="/intelligence-engine">Intelligence Engine</Link></li>
                            <li><Link href="/intelligence-engine-v2">Intelligence Engine v2</Link></li>
                            <li><Link href="/communication-interface">Communication Interface</Link></li>
                            <li><Link href="/communication-v2">Communication Interface v2</Link></li>
                            <li><Link href="/integration-fabric">Integration Fabric</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/podcast">Podcast</Link></li>
                            <li><Link href="/ebooks">Ebooks</Link></li>
                            <li><Link href="/newsletter">Newsletter</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link href="#">About Us</Link></li>
                            <li><Link href="#">Careers</Link></li>
                            <li><Link href="#">Contact</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

            <div className="footer-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                    <div>&copy; 2026 Mithriv. All rights reserved.</div>
                    <div className="footer-socials">
                        <a href="#" aria-label="Twitter">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* Dotted Logo Background (Canvas Mask Version) */}
        <div style={{
            position: 'relative',
            width: '100%',
            marginTop: '60px',
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 95%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 95%)',
        }}>
            <div 
                ref={logoRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '20vw',
                    minHeight: '120px',
                    maxHeight: '400px',
                    margin: '0 auto',
                    WebkitMaskImage: 'url("/Logo/Mithriv logo.svg")',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'bottom center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskImage: 'url("/Logo/Mithriv logo.svg")',
                    maskSize: 'contain',
                    maskPosition: 'bottom center',
                    maskRepeat: 'no-repeat',
                    pointerEvents: 'auto', 
                    cursor: 'default'
                }}
            >
                <canvas id="footerDotCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            </div>
        </div>
    </footer>
    </div>
  )
}
