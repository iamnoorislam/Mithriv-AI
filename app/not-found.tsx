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

    // Hidden canvas for text mask
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d')
    if (!offCtx) return

    offscreen.width = 100
    offscreen.height = 50
    offCtx.fillStyle = '#ffffff'
    offCtx.font = 'bold 32px monospace'
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.fillText('404', 50, 25)

    const imgData = offCtx.getImageData(0, 0, 100, 50)
    const pixels = imgData.data

    let W = canvas.width = canvas.clientWidth
    let H = canvas.height = canvas.clientHeight
    const dotSpacing = 8
    const dots: { x: number; y: number; ox: number; oy: number; colorIdx: number; alphaOffset: number }[] = []

    const buildDots = () => {
      dots.length = 0
      for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 100; x++) {
          const idx = (y * 100 + x) * 4
          if (pixels[idx + 3] > 128) {
            const destX = (W / 2) - (50 * dotSpacing) + (x * dotSpacing)
            const destY = (H / 2) - (25 * dotSpacing) + (y * dotSpacing)
            dots.push({
              x: destX,
              y: destY,
              ox: destX,
              oy: destY,
              colorIdx: Math.random() > 0.8 ? 1 : 0, // 80% white, 20% purple
              alphaOffset: Math.random() * Math.PI * 2
            })
          }
        }
      }
    }

    const handleResize = () => {
      W = canvas.width = canvas.clientWidth
      H = canvas.height = canvas.clientHeight
      buildDots()
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    let startTime = performance.now()
    const colors = [[255, 255, 255], [119, 0, 255]] // White, purple
    let animFrameId: number

    const draw = (ts: number) => {
      animFrameId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)

      const elapsed = (ts - startTime) / 1000

      for (const dot of dots) {
        const dx = dot.ox - mouseX
        const dy = dot.oy - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 80

        let targetX = dot.ox
        let targetY = dot.oy

        if (dist < radius && mouseX > 0) {
          const force = (radius - dist) / radius
          targetX = dot.ox + (dx / dist) * force * 24
          targetY = dot.oy + (dy / dist) * force * 24
        }

        dot.x += (targetX - dot.x) * 0.1
        dot.y += (targetY - dot.y) * 0.1

        const alpha = 0.35 + 0.45 * Math.abs(Math.sin(elapsed * 1.5 + dot.alphaOffset))

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)

        if (dist < radius && mouseX > 0) {
          const blend = (radius - dist) / radius
          const r = Math.round(255 * (1 - blend) + 119 * blend)
          const g = Math.round(255 * (1 - blend) + 0 * blend)
          const b = Math.round(255 * (1 - blend) + 255 * blend)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        } else {
          const c = colors[dot.colorIdx]
          ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
        }
        ctx.fill()
      }
    }

    animFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animFrameId)
    }
  }, [mounted])

  return (
    <div className="landing-theme" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#131416', color: '#fff', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Global Background Elements */}
      <div className="global-grid-bg" id="globalGridBg"></div>
      <div className="grain-overlay"></div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '320px', margin: '0 auto' }}>
        <canvas id="notfoundCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
      </div>

      <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#fff', marginBottom: '16px', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>
          Signal Lost
        </h1>
        <p style={{ fontSize: '15px', color: '#B6B6B7', fontFamily: 'var(--font-mono)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          The protocol you are trying to access has been disconnected or does not exist. Please return to the main operations hub.
        </p>
        <Link href="/" className="ent-btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem', textDecoration: 'none' }}>
          Return to Base
        </Link>
      </div>
    </div>
  )
}
