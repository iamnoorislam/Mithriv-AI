'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const conversations = [
  {
    id: 0,
    question: "What is our current risk posture?",
    description: "Understand your operational status instantly. The Intelligence Engine synthesizes signals across thousands of devices to give you a single unified risk score in real-time.",
    messages: [
      { sender: 'user', text: "What is our current risk posture?" },
      { sender: 'engine', text: "All 14 sites are clear. One open item at Site 7 needs attention within 24 hours. Overall posture is A+." },
      { sender: 'user', text: "What's the issue at Site 7?" },
      { sender: 'engine', text: "Credential access at 02:47am — 4.2 standard deviations outside the normal baseline for that user. No escort was logged." },
      { sender: 'user', text: "Has this happened before?" },
      { sender: 'engine', text: "Yes — twice in the last 30 days. Both off-hours, both Zone 4B. I'd recommend escalating to your threat response team." }
    ]
  },
  {
    id: 1,
    question: "Were there credential anomalies this week?",
    description: "Track sophisticated threats across time. Automatically correlate impossible travel, tailgating, and spatial anomalies without manual log hunting.",
    messages: [
      { sender: 'user', text: "Were there any credential anomalies in the last 7 days?" },
      { sender: 'engine', text: `Yes. 3 credential anomalies were detected across 2 sites in the last 7 days.\n\n— Nov 12, 02:47am · Site 7\nBadge swipe at Server Room B. 4.2σ outside baseline. No escort logged. Flagged for review.\n\n— Nov 14, 09:12am · Site 4\nBadge serial number read at two entry points 12 seconds apart — spatially impossible. Cloning attempt. Credential revoked automatically.\n\n— Nov 15, 11:34pm · Site 7\nUnknown device detected on secure network segment. Access point: Zone 4B. Incident report filed.\n\nAll 3 are documented and export-ready.` }
    ]
  },
  {
    id: 2,
    question: "Are we NERC CIP compliant across all sites?",
    description: "Audit readiness is now continuous. The Intelligence Engine tracks physical security, cyber assets, and configuration changes against regulatory frameworks automatically.",
    messages: [
      { sender: 'user', text: "Are we NERC CIP compliant across all critical infrastructure sites?" },
      { sender: 'engine', text: `Current NERC CIP compliance across all 14 sites: 99.1%\n\n2 items need attention before your next audit:\n— Site 7 — CIP-006 physical security plan requires updated access log entries for Zone 4B following Tuesday's incident. Estimated time to resolve: 20 minutes.\n— Site 11 — CIP-010 configuration change management log has a 3-day gap from Nov 9–12. Logs have been retrieved and are pending sign-off.\n\nAll other requirements across CIP-002 through CIP-014 are current and audit-ready.\n\nAudit preparation package: export-ready now` }
    ]
  }
]

export default function IntelligencePhoneChat() {
  const [activeTab, setActiveTab] = useState(0)

  const activeConv = conversations[activeTab]

  return (
    <section style={{ 
      background: '#F6F4EB', 
      padding: '160px 0 0 0', 
      position: 'relative', 
      width: '100%',
      zIndex: 20,
      overflow: 'hidden'
    }}>
      
      {/* Centered Header */}
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '100px', padding: '0 40px' }}>
        <h2 style={{ 
          fontSize: '48px', 
          fontWeight: 600, 
          letterSpacing: '-0.02em', 
          lineHeight: 1.1, 
          color: '#18181B', 
          marginBottom: '32px',
          fontFamily: 'var(--font-main)'
        }}>
          Ask your security stack anything.<br/>Get the answer in seconds.
        </h2>

        <p style={{ 
          fontSize: '15px', 
          color: '#52525B', 
          lineHeight: 1.7, 
          fontFamily: 'var(--font-mono)', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          No dashboards. No reports. No analyst waiting period. The Intelligence Engine processes every event across every system — and answers any question in plain English, instantly.
        </p>
      </div>

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '100px', alignItems: 'center' }}>
        
        {/* Left Content Side */}
        <div style={{ flex: 1, maxWidth: '440px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {conversations.map((conv, idx) => (
              <button
                key={conv.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  background: activeTab === idx ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${activeTab === idx ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                  color: activeTab === idx ? '#18181B' : '#52525B',
                  padding: '10px 24px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontWeight: activeTab === idx ? 600 : 400
                }}
              >
                Query 0{idx + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#18181B',
                marginBottom: '16px',
                lineHeight: 1.3,
                fontFamily: 'var(--font-main)'
              }}>
                {activeConv.question}
              </h3>
              
              <p style={{
                fontSize: '16px',
                color: '#52525B',
                lineHeight: 1.6,
                fontFamily: 'var(--font-main)'
              }}>
                {activeConv.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Phone Side */}
        <div style={{ flex: '0 0 460px', position: 'relative' }}>
          <div style={{
            position: 'relative',
            width: '460px',
            height: '655px',
            borderRadius: '48px 48px 0 0',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: '#F6F4EB',
              border: '14px solid #27272A',
              borderBottom: 'none',
              borderRadius: '48px 48px 0 0',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Phone Hardware Details */}
              <div style={{ position: 'absolute', right: '-14px', top: '160px', width: '4px', height: '60px', background: '#27272A', borderRadius: '0 2px 2px 0' }} />
              <div style={{ position: 'absolute', right: '-14px', top: '240px', width: '4px', height: '100px', background: '#27272A', borderRadius: '0 2px 2px 0' }} />

              <div style={{ 
                flex: 1, 
                padding: '40px 24px 120px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflowY: 'auto',
                scrollbarWidth: 'none', // hide scrollbar for firefox
                msOverflowStyle: 'none', // hide scrollbar for IE
              }} className="phone-chat-scroll">
                
                <style>{`
                  .phone-chat-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {activeConv.messages.map((msg, i) => {
                      const isUser = msg.sender === 'user'
                      
                      if (isUser) {
                        return (
                          <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                            maxWidth: '100%'
                          }}>
                            <div style={{
                              background: '#DBD7CB',
                              padding: '16px 20px',
                              borderRadius: '16px',
                              color: '#18181B',
                              fontSize: '14px',
                              lineHeight: 1.5,
                              maxWidth: '85%',
                              fontFamily: 'var(--font-main)'
                            }}>
                              {msg.text}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          width: '100%',
                          maxWidth: '100%'
                        }}>
                          <div style={{
                            background: 'rgba(0, 0, 0, 0.03)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            padding: '20px',
                            borderRadius: '16px',
                            color: '#18181B',
                            fontSize: '14px',
                            lineHeight: 1.5,
                            maxWidth: '95%',
                            fontFamily: 'var(--font-main)'
                          }}>
                            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
