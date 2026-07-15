'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './style.css'

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = document.getElementById('notfoundCanvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const CFG = { 
        totalSize: 12, 
        dotSize: 1.5, 
        animSpeed: 0.5, 
        blinkFreq: 5.0, 
        fps: 60, 
        colors: [[255, 255, 255], [255, 255, 255]], 
        opacities: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] 
    }
    
    let W: number, H: number, startTime = performance.now()
    let cells: any[] = []
    const PHI = 1.61803398874989484820459
    
    function fract(x: number) { return x - Math.floor(x) }
    function rand2(x: number, y: number) { 
        const ax = x * PHI, ay = y * PHI
        const d = Math.sqrt((ax - x) ** 2 + (ay - y) ** 2)
        return Math.abs(fract(Math.tan(d * 0.5) * x)) 
    }
    function blinkAlpha(col: number, row: number, t: number, showOffset: number) { 
        const freq = CFG.blinkFreq
        const phase = Math.floor(t / freq + showOffset + freq)
        const r = rand2((col + 1) * phase * 0.1 + 1, (row + 1) * phase * 0.1 + 1)
        return CFG.opacities[Math.floor(r * CFG.opacities.length)]
    }
    
    function resize() { 
        if (!canvas.parentElement) return
        const rect = canvas.parentElement.getBoundingClientRect() 
        W = canvas.width = rect.width 
        H = canvas.height = rect.height 
        buildCells() 
    }
    
    function buildCells() { 
        cells = [] 
        const ts = CFG.totalSize
        const cols = Math.ceil(W / ts) + 1
        const rows = Math.ceil(H / ts) + 1
        const cx = cols / 2
        const cy = rows / 2
        const maxD = Math.sqrt(cx * cx + cy * cy)
        
        for (let row = 0; row < rows; row++) { 
            for (let col = 0; col < cols; col++) { 
                const s = rand2(col + 1, row + 1)
                const rngB = rand2(col + 42, row + 42)
                const dist = Math.sqrt((cx - col) ** 2 + (cy - row) ** 2)
                cells.push({ 
                    col, row, 
                    showOffset: s, 
                    introOffset: dist * 0.01 + s * 0.15, 
                    outroOffset: (maxD - dist) * 0.02 + rngB * 0.2, 
                    colorIdx: Math.floor(s * CFG.colors.length) 
                })
            } 
        } 
    }

    let mouseX = -1000, mouseY = -1000
    const container = canvas.parentElement
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
        mouseX = -1000
        mouseY = -1000
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    let lastFrame = 0
    let animId: number
    
    function draw(ts: number) {
        animId = requestAnimationFrame(draw)
        if (ts - lastFrame < 1000 / CFG.fps) return
        lastFrame = ts
        const elapsed = (ts - startTime) / 1000
        const t = elapsed * CFG.animSpeed
        if (ctx) ctx.clearRect(0, 0, W, H)
        const sz = CFG.totalSize
        const ds = CFG.dotSize
        const offX = Math.abs(Math.floor(((W % sz) - ds) * 0.5))
        const offY = Math.abs(Math.floor(((H % sz) - ds) * 0.5))

        for (const cell of cells) {
            const px = cell.col * sz - offX
            const py = cell.row * sz - offY
            if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
            if (t < cell.introOffset) continue;
            const alpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset)
            if (alpha <= 0) continue;

            const cx = px + ds
            const cy = py + ds
            const dx = cx - mouseX
            const dy = cy - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)
            const radius = 160 

            let drawX = cx
            let drawY = cy
            let color = CFG.colors[cell.colorIdx] || CFG.colors[0]

            if (dist < radius && mouseX > 0) {
                const force = (radius - dist) / radius
                drawX = cx + (dx / dist) * force * 16
                drawY = cy + (dy / dist) * force * 16

                const blend = force * 0.95
                const r = Math.round(255 * (1 - blend) + 139 * blend)
                const g = Math.round(255 * (1 - blend) + 92 * blend)
                const b = Math.round(255 * (1 - blend) + 246 * blend)
                color = [r, g, b]
            }

            if (ctx) {
                ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
                ctx.beginPath()
                ctx.arc(drawX, drawY, ds, 0, Math.PI * 2)
                ctx.fill()
            }
        }
    }
    
    const ro = new ResizeObserver(resize) 
    ro.observe(container)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
        cancelAnimationFrame(animId)
        ro.disconnect()
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mounted])

  return (
    <div className="landing-theme" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#131416', color: '#fff', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Global Background Elements */}
      <div className="global-grid-bg" id="globalGridBg"></div>
      <div className="grain-overlay"></div>

      {/* Dotted 404 Canvas Masked Container */}
      <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          marginTop: '60px',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 98%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 98%)',
      }}>
          <div 
              style={{
                  position: 'relative',
                  width: '100%',
                  height: '24vw',
                  minHeight: '200px',
                  maxHeight: '400px',
                  margin: '0 auto',
                  WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"%3E%3Ctext x="80" y="45" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="75" fill="black" text-anchor="middle" dominant-baseline="central"%3E404%3C/text%3E%3C/svg%3E\')',
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'bottom center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskImage: 'url(\'data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"%3E%3Ctext x="80" y="45" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="75" fill="black" text-anchor="middle" dominant-baseline="central"%3E404%3C/text%3E%3C/svg%3E\')',
                  maskSize: 'contain',
                  maskPosition: 'bottom center',
                  maskRepeat: 'no-repeat',
                  pointerEvents: 'auto', 
                  cursor: 'default'
              }}
          >
              <canvas id="notfoundCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          </div>
      </div>

      <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '15px', color: '#B6B6B7', fontFamily: 'var(--font-mono)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          Even our AI couldn't secure this page—mostly because it doesn't exist. Let's abort the mission.
        </p>
        <Link href="/" className="ent-btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem', textDecoration: 'none' }}>
          [ Abort Mission & Return to Base ]
        </Link>
      </div>
    </div>
  )
}
