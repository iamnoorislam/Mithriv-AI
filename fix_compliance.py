import sys

filepath = "/Users/noorislam/Downloads/Bnner/mithriv-website/components/ui/ComplianceAutomates.tsx"

new_content = """'use client';
import React, { useState } from 'react';

export default function ComplianceAutomates() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { 
            title: "Auto-Evidence Generation", 
            text: "When operations flow through a unified system, compliance documentation is automatic, not a separate project.",
            code: `import { audit } from "@mithriv/sdk";

export const executeAction = audit.task({
  id: "firewall-update",
  policy: "SOC2-CC7.1",
  evidence: {
    autoLog: true,
    snapshot: "before-and-after"
  },
  run: async (payload) => {
    // Action executes, evidence is 
    // automatically attached to the audit trail
  },
});`
        },
        { 
            title: "Multi-Framework Mapping", 
            text: "SOC 2 Type II, PCI DSS, HIPAA, ISO 27001, and more. Map controls once, apply everywhere.",
            code: `import { compliance } from "@mithriv/sdk";

export const mapControls = compliance.configure({
  frameworks: [
    "SOC2",
    "ISO27001",
    "HIPAA",
    "PCI-DSS"
  ],
  strictMode: true,
  onViolation: async (event) => {
    await compliance.block(event);
    await alert.trigger(event.context);
  }
});`
        },
        { 
            title: "Instant Audit Export", 
            text: "What took 2-3 months of preparation now takes a query and an export.",
            code: `import { report } from "@mithriv/sdk";

export const generateAuditReport = report.query({
  id: "q4-security-audit",
  timeframe: "last_90_days",
  scope: ["access_control", "change_management"],
  format: "pdf",
  run: async (params) => {
    // Compiles 3 months of evidence 
    // into a verified report in seconds
    return report.export(params);
  },
});`
        },
        { 
            title: "Continuous Monitoring", 
            text: "Policy adherence measured in real-time. Violations flagged immediately. No audit-season panic.",
            code: `import { monitor } from "@mithriv/sdk";

export const realtimeGuardrail = monitor.watch({
  id: "iam-drift-detection",
  interval: "realtime",
  resource: "aws_iam_policy",
  run: async (state) => {
    if (state.drift > 0) {
      await state.rollback();
      await audit.flag("drift_detected");
    }
  },
});`
        }
    ];

    // Simple syntax highlighter function for our specific snippets
    const highlightCode = (code: string) => {
        return code
            .replace(/import/g, '<span style="color: #D986F0;">import</span>')
            .replace(/from/g, '<span style="color: #D986F0;">from</span>')
            .replace(/export/g, '<span style="color: #D986F0;">export</span>')
            .replace(/const/g, '<span style="color: #D986F0;">const</span>')
            .replace(/async/g, '<span style="color: #D986F0;">async</span>')
            .replace(/await/g, '<span style="color: #D986F0;">await</span>')
            .replace(/if/g, '<span style="color: #D986F0;">if</span>')
            .replace(/return/g, '<span style="color: #D986F0;">return</span>')
            .replace(/true/g, '<span style="color: #FCE545;">true</span>')
            .replace(/false/g, '<span style="color: #FCE545;">false</span>')
            .replace(/"(.*?)"/g, '<span style="color: #49B25C;">"$1"</span>')
            .replace(/\\/\\/ (.*)/g, '<span style="color: rgba(255,255,255,0.4);">// $1</span>')
            .replace(/([a-zA-Z0-9_]+)(?=\\()/g, '<span style="color: #4993E3;">$1</span>')
            .replace(/([a-zA-Z0-9_]+)(?=:)/g, '<span style="color: #9cdcfe;">$1</span>');
    };

    return (
        <section id="compliance-automates" style={{ background: '#080808', color: '#FFFFFF', padding: '120px 20px', position: 'relative', zIndex: 10, boxSizing: 'border-box', fontFamily: 'var(--font-main), Inter, sans-serif' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                
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

                {/* Split Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }} className="compliance-console-grid">
                    
                    {/* Left: Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {tabs.map((tab, idx) => {
                            const isActive = activeTab === idx;
                            return (
                                <div 
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    style={{
                                        padding: '24px',
                                        background: isActive ? '#141415' : '#0B0B0C',
                                        border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.03)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: isActive ? '#fff' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>{tab.title}</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{tab.text}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right: Code Block */}
                    <div style={{ 
                        background: '#0D0D0F', 
                        border: '1px solid rgba(255,255,255,0.05)', 
                        borderRadius: '8px', 
                        padding: '24px',
                        position: 'relative',
                        minHeight: '400px'
                    }}>
                        {/* Copy Icon Placeholder */}
                        <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </div>
                        
                        <pre style={{ margin: 0, padding: 0, fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: '14px', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            <code dangerouslySetInnerHTML={{ __html: highlightCode(tabs[activeTab].code) }} />
                        </pre>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 991px) {
                    .compliance-console-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
"""

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Fixed syntax in ComplianceAutomates.tsx")
