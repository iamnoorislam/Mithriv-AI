import React from 'react';
import { Boxes } from '@/components/ui/background-boxes';

const excelsPoints = [
  "Organizations generating high volumes of security data across multiple disconnected systems.",
  "Multi-site operations where cross-site pattern detection is critical to threat response.",
  "Regulated industries where compliance documentation is a significant operational burden.",
  "Security operations where analyst time is the bottleneck between data and decisions.",
  "Leadership teams that need security intelligence without analyst dependency."
];

const otherPoints = [
  "Single-site operations with a unified security platform already in place",
  "Organizations with a mature in-house analytics team and existing BI infrastructure",
  "Environments where security data volume is low and patterns are simple"
];

export default function HonestPositioning() {
  return (
    <section style={{ padding: '80px 0 200px 0', position: 'relative', width: '100%', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px', alignItems: 'flex-end' }}>
          <div>
            <div className="ent-pill" style={{ marginBottom: '24px', display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              HONEST POSITIONING
            </div>
            <h2 style={{ fontSize: '56px', fontWeight: 500, letterSpacing: '-0.03em', color: '#ffffff', margin: 0, fontFamily: 'var(--font-main)', lineHeight: 1.1 }}>
              What it is and<br />what it isn't.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-main)' }}>
              We build for clarity. Here is where the Intelligence Engine excels <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'rgba(255,255,255,0.3)', verticalAlign: 'middle', margin: '0 8px' }} /> and where other approaches may serve you better.
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          background: '#0C0D10', 
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0',
          overflow: 'hidden',
          minHeight: '600px'
        }}>
          
          {/* Left Side (Content) */}
          <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
            
            <div>
              {/* Headline */}
              <h3 style={{ fontSize: '36px', color: '#ffffff', margin: '0 0 40px 0', fontFamily: 'var(--font-main)', fontWeight: 500, letterSpacing: '-0.02em' }}>
                Where it excels.
              </h3>

              {/* The 5 points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {excelsPoints.map((point, idx) => (
                  <p key={idx} style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-main)' }}>
                    {point}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer / Closing Line */}
            <div style={{ marginTop: '80px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-main)' }}>
                The Intelligence Engine amplifies your security team's judgment. It doesn't replace it. The difference is your team stops pulling reports and starts making decisions.
              </p>
            </div>

          </div>

          {/* Right Side (Visual/Glassy Card) */}
          <div style={{ 
            position: 'relative',
            padding: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#040507',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden'
          }}>
            {/* Background Boxes Animation */}
            <div className="absolute inset-0 z-0">
              <Boxes />
            </div>

            {/* Subtle dark overlay for readability and rich brown tones */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20, 15, 10, 0.4), rgba(15, 10, 5, 0.75))', zIndex: 1, pointerEvents: 'none' }} />

            {/* Decorative Top UI elements */}
            <div style={{ position: 'absolute', top: '32px', left: '32px', display: 'flex', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              </div>
            </div>

            {/* The Glassy Inner Card Wrapper */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '440px',
              zIndex: 2
            }}>
              
              {/* Card Background and Content */}
              <div style={{
                background: 'rgba(30, 30, 34, 0.4)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
                
                {/* Gradient Circle Avatar */}
                <style>{`
                  @keyframes sapphireGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}</style>
                <div style={{ 
                  width: '88px', 
                  height: '88px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #3b82f6 50%, #0ea5e9 75%, #1e3a8a 100%)',
                  backgroundSize: '300% 300%',
                  animation: 'sapphireGlow 8s ease infinite',
                  marginBottom: '32px',
                  boxShadow: '0 12px 32px rgba(59, 130, 246, 0.3)',
                  border: '2px solid rgba(255,255,255,0.1)'
                }} />

                {/* Title */}
                <h4 style={{ fontSize: '24px', color: '#ffffff', margin: '0 0 40px 0', fontFamily: 'var(--font-main)', fontWeight: 500, letterSpacing: '-0.01em', textAlign: 'center' }}>
                  Where other approaches fit better.
                </h4>

                {/* The 3 Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                  {otherPoints.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', marginTop: '-2px' }}>-</span>
                      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-main)' }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Animated Purple Border Stroke using Masking */}
              <style>{`
                @keyframes spinBorder {
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '24px',
                padding: '1px', 
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 10
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'conic-gradient(from 0deg, transparent 70%, rgba(168, 85, 247, 1) 90%, transparent 100%)',
                  animation: 'spinBorder 4s linear infinite',
                }} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
