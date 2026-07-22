import React, { useState, useEffect } from 'react';
import { AnimatedCheckSquareIcon, AnimatedFileCodeIcon, AnimatedMonitorIcon } from '../AnimatedIcons';

// --- Tab 1 Illustration ---
const AutoEvidenceIll = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 5);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '280px', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', background: '#09090B', border: '1px solid #212326', padding: '24px 28px', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                <div style={{ position: 'relative', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Vertical connecting line */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '3px', 
                        top: '4px', 
                        bottom: '4px', 
                        width: '1px', 
                        background: 'rgba(217, 134, 240, 0.3)',
                        transform: `scaleY(${step >= 3 ? 1 : step === 2 ? 0.75 : step === 1 ? 0.35 : 0})`,
                        transformOrigin: 'top',
                        transition: 'transform 0.4s ease'
                    }}></div>
                    
                    {/* Step 1 */}
                    <div style={{ position: 'relative', opacity: step >= 0 ? 1 : 0, transform: step >= 0 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
                        <div style={{ position: 'absolute', left: '-16px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: '#09090B', border: '1.5px solid rgba(217, 134, 240, 0.7)' }}></div>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>14:02:11</span>
                        <span style={{ color: '#E44856', marginLeft: '8px', fontWeight: 'bold' }}>Threat Detected</span>
                    </div>

                    {/* Step 2 */}
                    <div style={{ position: 'relative', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
                        <div style={{ position: 'absolute', left: '-16px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: '#09090B', border: '1.5px solid rgba(217, 134, 240, 0.7)' }}></div>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>14:02:12</span>
                        <span style={{ color: '#4993E3', marginLeft: '8px', fontWeight: 'bold' }}>AI Classification</span>
                    </div>

                    {/* Step 3 */}
                    <div style={{ position: 'relative', opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
                        <div style={{ position: 'absolute', left: '-16px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: '#09090B', border: '1.5px solid rgba(217, 134, 240, 0.7)' }}></div>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>14:03:00</span>
                        <span style={{ color: '#D986F0', marginLeft: '8px', fontWeight: 'bold' }}>Action Executed</span>
                    </div>

                    {/* Step 4 */}
                    <div style={{ position: 'relative', opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
                        <div style={{ position: 'absolute', left: '-16px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: '#D986F0', boxShadow: '0 0 8px #D986F0' }}></div>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>14:03:01</span>
                        <span style={{ color: '#AFF962', marginLeft: '8px', fontWeight: 'bold' }}>Evidence Packaged</span>
                        <div style={{ marginTop: '10px', background: 'rgba(217, 134, 240, 0.08)', border: '1px solid rgba(217, 134, 240, 0.2)', borderRadius: '4px', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D986F0', fontSize: '9px', fontWeight: 'bold' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            EXPORT .JSON
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Tab 2 Illustration ---
const InstantExportIll = () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'GENERATING' | 'COMPLETE'>('GENERATING');

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const tick = () => {
            setProgress((prev) => {
                if (prev < 100) {
                    const next = prev + 5;
                    if (next >= 100) {
                        setStatus('COMPLETE');
                        timer = setTimeout(() => {
                            setProgress(0);
                            setStatus('GENERATING');
                        }, 3500);
                        return 100;
                    }
                    timer = setTimeout(tick, 100);
                    return next;
                }
                return prev;
            });
        };

        timer = setTimeout(tick, 100);
        return () => clearTimeout(timer);
    }, []);

    const totalBlocks = 12;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const blocksStr = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '280px', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', background: '#09090B', border: '1px solid #212326', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4993E3', borderBottom: '1px solid #212326', paddingBottom: '10px', fontWeight: 'bold' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    HIPAA Audit Report
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>Period:</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Q2 2026</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>Status:</span>
                        <span style={{ color: status === 'COMPLETE' ? '#49B25C' : '#FCE545', letterSpacing: '1px' }}>
                            {blocksStr} {status === 'COMPLETE' ? 'COMPLETE' : 'GENERATING...'}
                        </span>
                    </div>
                </div>

                <div style={{ width: '100%', height: '6px', background: '#131416', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                        width: `${progress}%`, 
                        height: '100%', 
                        background: status === 'COMPLETE' ? '#49B25C' : '#4993E3', 
                        boxShadow: status === 'COMPLETE' ? '0 0 8px #49B25C' : 'none',
                        transition: 'width 0.1s linear, background-color 0.3s ease'
                    }}></div>
                </div>

                <div style={{ 
                    marginTop: '4px',
                    padding: '8px', 
                    borderRadius: '4px', 
                    background: status === 'COMPLETE' ? 'rgba(73, 178, 92, 0.08)' : 'rgba(255,255,255,0.02)',
                    border: status === 'COMPLETE' ? '1px solid rgba(73, 178, 92, 0.2)' : '1px solid #212326',
                    color: status === 'COMPLETE' ? '#49B25C' : 'rgba(255,255,255,0.25)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download .PDF
                </div>
            </div>
        </div>
    );
};

// --- Tab 3 Illustration ---
const ContinuousMonitorIll = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '280px', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', background: '#09090B', border: '1px solid #212326', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                <div style={{ color: '#D986F0', fontWeight: 'bold', borderBottom: '1px solid #212326', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    Live Posture Monitor
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                        { name: "SOC 2" },
                        { name: "HIPAA" },
                        { name: "NERC CIP" },
                        { name: "ISO 27001" }
                    ].map((fw, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ 
                                    width: '6px', 
                                    height: '6px', 
                                    borderRadius: '50%', 
                                    background: '#49B25C', 
                                    boxShadow: '0 0 6px #49B25C',
                                    animation: 'grant-pulse 2s infinite',
                                    animationDelay: `${i * 0.4}s`
                                }}></div>
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{fw.name}</span>
                            </div>
                            <span style={{ color: '#49B25C', fontWeight: 'bold', letterSpacing: '0.5px' }}>COMPLIANT</span>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px dashed #212326', paddingTop: '10px', marginTop: '4px', fontSize: '9px', color: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>POLICIES ACTIVE: 184/184</span>
                    <span style={{ animation: 'artStatusPulse 1.5s infinite' }}>● MONITORING</span>
                </div>
            </div>
        </div>
    );
};

// --- Full Width Marquee ---
const badgesTrack = [
    { text: "SOC 2 Type II", color: "#AFF962" },
    { text: "PCI DSS", color: "#4993E3" },
    { text: "HIPAA", color: "#D986F0" },
    { text: "ISO 27001", color: "#FCE545" },
    { text: "NERC CIP", color: "#E44856" },
    { text: "GxP / Annex 11", color: "#EA49B2" },
    { text: "IEC 62443", color: "#49E3E3" },
    { text: "TSA Security", color: "#49B25C" },
    { text: "NIST 800-53", color: "#FFA54F" },
    { text: "GDPR", color: "#AFF962" }
];

const MarqueeBadge = ({ text, color }: { text: string; color: string }) => (
    <div 
        style={{
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '0px',
            color: '#ffffff',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: '0 12px',
            transition: 'all 0.3s ease'
        }}
        className="marquee-badge-item"
    >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }}></div>
        {text}
    </div>
);

export default function ComplianceAutomates() {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);

    const tabs = [
        { 
            title: "Auto-Evidence Generation", 
            text: "When operations flow through a unified system, compliance documentation is automatic, not a separate project.",
            illustration: <AutoEvidenceIll />,
            color: "#AFF962"
        },
        { 
            title: "Instant Audit Export", 
            text: "What took 2-3 months of preparation now takes a query and an export.",
            illustration: <InstantExportIll />,
            color: "#4993E3"
        },
        { 
            title: "Continuous Monitoring", 
            text: "Policy adherence measured in real-time. Violations flagged immediately. No audit-season panic.",
            illustration: <ContinuousMonitorIll />,
            color: "#D986F0"
        }
    ];

    return (
        <section id="compliance-automates" style={{ background: 'transparent', color: '#FFFFFF', padding: '120px 32px', position: 'relative', zIndex: 10, boxSizing: 'border-box', fontFamily: 'var(--font-main), Inter, sans-serif' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="ent-pill" style={{ marginBottom: '16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#FFFFFF', fontFamily: 'var(--font-mono), JetBrains Mono, monospace' }}>
                        Compliance Automates
                    </span>
                    <h2 className="std-section-h2" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 24px 0', maxWidth: '800px' }}>
                        Audit-ready as a default state
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
                    margin: '0 auto 48px'
                }}>
                    {/* Split Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '0px', alignItems: 'stretch' }} className="compliance-console-grid">
                        
                        {/* Left: Cards */}
                        <div className="compliance-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', borderRight: '1px solid #212326' }}>
                            {tabs.map((tab, idx) => {
                                const isActive = activeTab === idx;
                                const isHovered = hoveredTab === idx;
                                const IconComponent = idx === 0 ? AnimatedCheckSquareIcon : idx === 1 ? AnimatedFileCodeIcon : AnimatedMonitorIcon;
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
                                                <IconComponent color={(isActive || isHovered) ? tab.color : 'rgba(255,255,255,0.4)'} isHovered={isHovered} size={20} />
                                            </span>
                                            {tab.title}
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{tab.text}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Right: Tab-Specific Illustrations Block */}
                        <div className="compliance-right-col" style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            padding: '32px 24px',
                            position: 'relative',
                            minHeight: '400px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            zIndex: 1
                        }}>
                            {/* Faded diagonal lines background */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'repeating-linear-gradient(45deg, #212326 0, #212326 1px, transparent 1px, transparent 7px)',
                                WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
                                maskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
                                zIndex: 0,
                                opacity: 0.7
                            }}></div>
                            
                            {/* Render active illustration */}
                            <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {tabs[activeTab].illustration}
                            </div>
                        </div>
                    </div>
                </div> {/* End One Big Box */}

                {/* Framework Badge Marquee Ticker strip below the dashboard */}
                <div style={{ 
                    width: '100%', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    padding: '20px 0', 
                    background: 'transparent',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }} className="marquee-ticker-container">
                    <div className="marquee-track marquee-left">
                        <div className="marquee-group">
                            {badgesTrack.map((b, i) => <MarqueeBadge key={i} text={b.text} color={b.color} />)}
                        </div>
                        <div className="marquee-group" aria-hidden="true">
                            {badgesTrack.map((b, i) => <MarqueeBadge key={`dup-${i}`} text={b.text} color={b.color} />)}
                        </div>
                    </div>
                </div>

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

                .compliance-tab .tab-icon-wrapper {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease;
                }
                .compliance-tab:hover .tab-icon-wrapper {
                    transform: translateX(2px);
                    filter: brightness(1.2);
                }

                /* Marquee Ticker Styles */
                .marquee-track {
                    display: flex;
                    width: max-content;
                    align-items: center;
                }
                .marquee-group {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    min-width: 100%;
                }
                .marquee-left {
                    animation: scrollLeft 40s linear infinite;
                }
                .marquee-ticker-container:hover .marquee-track {
                    animation-play-state: paused;
                }
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes artStatusPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </section>
    );
}
