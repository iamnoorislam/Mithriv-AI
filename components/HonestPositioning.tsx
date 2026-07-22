'use client';
import React, { useState } from 'react';
import {
  AnimatedLayersIcon,
  AnimatedNetworkIcon,
  AnimatedShieldCheckIcon,
  AnimatedMonitorIcon,
  AnimatedUsersIcon,
  AnimatedBrainIcon
} from './AnimatedIcons';

const gridItems = [
  {
    title: "Built for data volume",
    desc: "Organizations generating high volumes of security data across multiple disconnected systems get the most from the Intelligence Engine.",
    icon: AnimatedLayersIcon,
    color: "#EA49B2"
  },
  {
    title: "Built for multi-site operations",
    desc: "Cross-site pattern detection is where the engine outperforms anything site-by-local-site. The more sites, the stronger the signal.",
    icon: AnimatedNetworkIcon,
    color: "#49B25C"
  },
  {
    title: "Built for regulated industries",
    desc: "Where compliance documentation is a significant operational burden, the engine eliminates it. NERC CIP, HIPAA, SOC 2 — automated by default.",
    icon: AnimatedShieldCheckIcon,
    color: "#4993E3"
  },
  {
    title: "Not for single-site simplicity",
    desc: "If you operate one site with a unified platform already in place, the Intelligence Engine is more than you need right now.",
    icon: AnimatedMonitorIcon,
    color: "#AFF962"
  },
  {
    title: "Not for mature in-house teams",
    desc: "If you already have a BI infrastructure and a dedicated analytics team, you may already have coverage for what the engine provides.",
    icon: AnimatedUsersIcon,
    color: "#E44856"
  },
  {
    title: "Amplifies judgment, doesn't replace it",
    desc: "The Intelligence Engine gives your team answers, not orders. Every decision stays with the humans who own the outcome.",
    icon: AnimatedBrainIcon,
    color: "#6354F3"
  }
];

export default function HonestPositioning() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section style={{ padding: '0 0 200px 0', position: 'relative', width: '100%', zIndex: 10, background: 'transparent' }}>
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Top Header Row (Centered) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px auto' }}>
          <div className="ent-pill" style={{ marginBottom: '24px', display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
            HONEST POSITIONING
          </div>
          <h2 style={{ fontSize: '56px', fontWeight: 500, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 24px 0', fontFamily: 'var(--font-main)', lineHeight: 1.1 }}>
            What it is and what it isn't
          </h2>
          <p style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6, margin: '0 auto', fontFamily: 'var(--font-main)', maxWidth: '520px' }}>
            We build for clarity. Here is where the Intelligence Engine excels and where other approaches may serve you better.
          </p>
        </div>

        {/* 3x2 Grid Container (No Radius) */}
        <div className="hp-grid-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0',
          overflow: 'hidden'
        }}>
          {gridItems.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className="hp-grid-card"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: 'transparent', // No fill color
                  padding: '56px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Icon Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <div style={{
                    width: '53px',
                    height: '53px',
                    borderRadius: '50%',
                    background: 'var(--background, #131416)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }} className="hp-icon-wrapper">
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <Icon size={20} color={item.color} isHovered={isHovered} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-main)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-main)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        .hp-grid-card {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .hp-grid-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='8.485' height='8.485' viewBox='0 0 8.5 8.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-2 -2L10.5 10.5M6.5 -2L10.5 2M-2 6.5L2 10.5' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E");
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }
        .hp-grid-card > * {
          z-index: 1;
        }
        
        .hp-grid-card:hover::before {
          opacity: 1;
        }
        
        .hp-grid-card:nth-child(3n) {
          border-right: none;
        }
        .hp-grid-card:nth-child(n+4) {
          border-bottom: none;
        }
        
        .hp-grid-card:hover .hp-icon-wrapper {
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        
        @media (max-width: 1024px) {
          .hp-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hp-grid-card:nth-child(3n) {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }
          .hp-grid-card:nth-child(2n) {
            border-right: none;
          }
          .hp-grid-card:nth-child(n+4) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .hp-grid-card:nth-child(n+5) {
            border-bottom: none;
          }
        }
        @media (max-width: 768px) {
          .hp-grid-container {
            grid-template-columns: 1fr !important;
          }
          .hp-grid-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .hp-grid-card:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
