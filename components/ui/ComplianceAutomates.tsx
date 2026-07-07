import React, { useState } from 'react';
import { AnimatedCheckSquareIcon, AnimatedFileCodeIcon, AnimatedMonitorIcon } from '../AnimatedIcons';

const AutoEvidenceIll = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100px', height: '120px', border: '2px solid #1C1E21', borderRadius: '8px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', background: 'rgba(255,255,255,0.02)', zIndex: 2 }}>
            <div style={{ width: '60%', height: '6px', background: '#D986F0', borderRadius: '3px' }}></div>
            <div style={{ width: '80%', height: '6px', background: '#49B25C', borderRadius: '3px' }}></div>
            <div style={{ width: '100%', height: '6px', background: '#1C1E21', borderRadius: '3px' }}></div>
            <div style={{ width: '40%', height: '6px', background: '#1C1E21', borderRadius: '3px' }}></div>
            
            <div className="ill-check-pop" style={{ position: 'absolute', bottom: '-15px', right: '-15px', width: '40px', height: '40px', background: '#49B25C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(73, 178, 92, 0.4)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
        </div>
        
        <div className="ill-packet ill-packet-1" style={{ position: 'absolute', width: '24px', height: '24px', background: '#4993E3', borderRadius: '6px', left: '20%', top: '30%', zIndex: 1 }}></div>
        <div className="ill-packet ill-packet-2" style={{ position: 'absolute', width: '24px', height: '24px', background: '#D986F0', borderRadius: '6px', left: '30%', bottom: '30%', zIndex: 1 }}></div>
        <div className="ill-packet ill-packet-3" style={{ position: 'absolute', width: '24px', height: '24px', background: '#FCE545', borderRadius: '6px', right: '30%', top: '40%', zIndex: 1 }}></div>
    </div>
);

const InstantExportIll = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: '32px' }}>
        <div style={{ width: '100px', height: '130px', border: '2px dashed #1C1E21', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="ill-export-fill" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(73, 178, 92, 0.2)', width: '100%' }}></div>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#49B25C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 1 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div style={{ width: '200px', height: '8px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="ill-progress-bar-fill" style={{ width: '100%', height: '100%', background: '#49B25C' }}></div>
        </div>
    </div>
);

const ContinuousMonitorIll = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: '40px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '24px', height: '24px', background: '#D986F0', borderRadius: '50%', zIndex: 2 }}></div>
            <div className="ill-radar-ping" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #D986F0', borderRadius: '50%' }}></div>
            <div className="ill-radar-ping ill-delay" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #D986F0', borderRadius: '50%' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '60px' }}>
            {[30, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
                <div key={i} className="ill-chart-bar" style={{ width: '16px', height: `${h}%`, background: '#4993E3', borderRadius: '4px 4px 0 0', animationDelay: `${i * 0.1}s` }}></div>
            ))}
        </div>
    </div>
);

export default function ComplianceAutomates() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { 
            title: "Auto-Evidence Generation", 
            text: "When operations flow through a unified system, compliance documentation is automatic, not a separate project.",
            illustration: <AutoEvidenceIll />,
            IconComponent: AnimatedCheckSquareIcon,
            color: "#49B25C"
        },
        { 
            title: "Instant Audit Export", 
            text: "What took 2-3 months of preparation now takes a query and an export.",
            illustration: <InstantExportIll />,
            IconComponent: AnimatedFileCodeIcon,
            color: "#4993E3"
        },
        { 
            title: "Continuous Monitoring", 
            text: "Policy adherence measured in real-time. Violations flagged immediately. No audit-season panic.",
            illustration: <ContinuousMonitorIll />,
            IconComponent: AnimatedMonitorIcon,
            color: "#D986F0"
        }
    ];

    const [hoveredTab, setHoveredTab] = useState<number | null>(null);

    return (
        <section id="compliance-automates" style={{ background: 'transparent', color: '#FFFFFF', padding: '120px 32px', position: 'relative', zIndex: 10, boxSizing: 'border-box', fontFamily: 'var(--font-main), Inter, sans-serif' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="ent-pill" style={{ marginBottom: '16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#FFFFFF', fontFamily: 'var(--font-mono), JetBrains Mono, monospace' }}>
                        Compliance Automates
                    </span>
                    <h2 className="std-section-h2" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 24px 0', maxWidth: '800px' }}>
                        Audit-ready as a default state.
                    </h2>
                    <p className="std-section-subheading" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: 'var(--font-mono), JetBrains Mono, monospace', margin: '0', maxWidth: '600px' }}>
                        When operations flow through a unified system, compliance documentation is automatic. No scrambling, no manual logging.
                    </p>
                </div>

                {/* One Big Box */}
                <div style={{
                    border: '1px solid #212326',
                    background: 'transparent',
                    borderRadius: '0px',
                    padding: '0',
                    width: '100%',
                    margin: '0 auto'
                }}>
                    {/* Split Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '0px', alignItems: 'stretch' }} className="compliance-console-grid">
                        
                        {/* Left: Cards */}
                        <div className="compliance-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', borderRight: '1px solid #212326' }}>
                        {tabs.map((tab, idx) => {
                            const isActive = activeTab === idx;
                            const isHovered = hoveredTab === idx;
                            return (
                                <div 
                                    key={idx}
                                    className="compliance-tab"
                                    onClick={() => setActiveTab(idx)}
                                    onMouseEnter={() => setHoveredTab(idx)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    style={{
                                        padding: '24px',
                                        background: isActive ? '#212326' : 'transparent',
                                        border: isActive ? '1px solid transparent' : '1px solid #212326',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: (isActive || isHovered) ? '#fff' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span className="tab-icon-wrapper" style={{ color: (isActive || isHovered) ? tab.color : 'rgba(255,255,255,0.4)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex' }}>
                                            <tab.IconComponent color={(isActive || isHovered) ? tab.color : 'rgba(255,255,255,0.4)'} isHovered={isHovered} size={20} />
                                        </span>
                                        {tab.title}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{tab.text}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right: Illustrations Block */}
                    <div className="compliance-right-col" style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        padding: '32px 24px',
                        position: 'relative',
                        minHeight: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        {/* Faded diagonal lines background */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'repeating-linear-gradient(45deg, #212326 0, #212326 1px, transparent 1px, transparent 7px)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
                            maskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
                            zIndex: 0
                        }}></div>
                        
                        {/* Render active illustration */}
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                            {tabs[activeTab].illustration}
                        </div>
                    </div>
                </div>
                </div> {/* End One Big Box */}
            </div>
            <style>{`
                @media (max-width: 991px) {
                    .compliance-console-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    .compliance-left-col {
                        border-right: none !important;
                        border-bottom: 1px solid #212326;
                        padding-bottom: 24px !important;
                    }
                    .compliance-right-col {
                        padding-top: 24px !important;
                    }
                }

                .compliance-tab:hover {
                    background: #212326 !important;
                }

                .ill-check-pop {
                    animation: popIn 2s ease-out infinite;
                }
                .compliance-tab .tab-icon-wrapper {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease;
                }
                .compliance-tab:hover .tab-icon-wrapper {
                    transform: translateX(2px);
                    filter: brightness(1.2);
                }
                .ill-packet {
                    opacity: 0;
                    animation: flyIn 2s ease-in-out infinite;
                }
                .ill-packet-2 {
                    animation-delay: 0.6s;
                }
                .ill-packet-3 {
                    animation-delay: 1.2s;
                }
                @keyframes popIn {
                    0%, 70% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes flyIn {
                    0% { transform: translate(-40px, -40px) scale(0.5); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(40px, 40px) scale(1); opacity: 0; }
                }

                .ill-export-fill {
                    animation: fillUp 3s ease-in-out infinite;
                }
                .ill-progress-bar-fill {
                    animation: progressFill 3s ease-in-out infinite;
                }
                @keyframes fillUp {
                    0%, 10% { height: 0%; }
                    80%, 100% { height: 100%; }
                }
                @keyframes progressFill {
                    0%, 10% { width: 0%; }
                    80%, 100% { width: 100%; }
                }

                .ill-radar-ping {
                    animation: radarPulse 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                    opacity: 0;
                }
                .ill-radar-ping.ill-delay {
                    animation-delay: 1.2s;
                }
                @keyframes radarPulse {
                    0% { transform: scale(0.2); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; border-color: rgba(217, 134, 240, 0); }
                }
                .ill-chart-bar {
                    animation: barPulse 2s ease-in-out infinite alternate;
                }
                @keyframes barPulse {
                    0% { transform: scaleY(0.7); transform-origin: bottom; }
                    100% { transform: scaleY(1.1); transform-origin: bottom; }
                }
            `}</style>
        </section>
    );
}
