'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const conversations = [
  {
    id: 0,
    question: "What is our current risk posture?",
    description: "Understand your operational status instantly. The Intelligence Engine synthesizes signals across all 14 sites and gives you a single unified risk score in real time.",
    points: [
      "Posture score updated continuously across all sites — not at end of day",
      "Every open item ranked by urgency with a recommended action"
    ],
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
    description: "Surface specific security events instantly without pulling reports or waiting for analyst review. Every anomaly cited, timestamped, and export-ready.",
    points: [
      "Every anomaly cross-referenced against behavioral baseline automatically",
      "Incident reports generated and export-ready the moment a threat is detected"
    ],
    messages: [
      { sender: 'user', text: "Any credential anomalies in the last 7 days?" },
      { sender: 'engine', text: "3 detected across Site 7 and Site 4." },
      { sender: 'user', text: "What happened at Site 4?" },
      { sender: 'engine', text: "Badge cloning attempt on Nov 14 at 09:12am. Same serial number read at two entry points 12 seconds apart — physically impossible. Credential auto-revoked." },
      { sender: 'user', text: "Was anyone notified?" },
      { sender: 'engine', text: "Yes — your security lead at Site 4 was alerted automatically at 09:12am. Incident report is filed and export-ready." }
    ]
  },
  {
    id: 2,
    question: "Are we NERC CIP compliant across all sites?",
    description: "Get your full compliance status in seconds — not after a two-week analyst sprint. Every framework, every site, every gap identified automatically.",
    points: [
      "Live compliance percentage across every framework — NERC CIP, HIPAA, TSA, SOC 2",
      "Gaps identified with estimated resolution time and assigned owner"
    ],
    messages: [
      { sender: 'user', text: "Are we NERC CIP compliant across all sites?" },
      { sender: 'engine', text: "99.1% across all 14 sites. Two items need attention before your next audit." },
      { sender: 'user', text: "What are they?" },
      { sender: 'engine', text: "Site 7 needs updated access log entries for Zone 4B — about 20 minutes of work. Site 11 has a 3-day config log gap from Nov 9–12, pending sign-off." },
      { sender: 'user', text: "When is the audit?" },
      { sender: 'engine', text: "14 days from today. If both items are resolved this week you'll be fully audit-ready with time to spare." }
    ]
  }
]

export default function IntelligencePhoneChat() {
  const [activeTab, setActiveTab] = useState(0)
  
  // Animation Sequence State
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [typingText, setTypingText] = useState("")
  const [messageIndex, setMessageIndex] = useState(0)
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const activeConv = conversations[activeTab]

  // Reset animation when tab changes
  useEffect(() => {
    setDisplayedMessages([])
    setTypingText("")
    setMessageIndex(0)
  }, [activeTab])

  // Sequence orchestration
  useEffect(() => {
    if (messageIndex >= activeConv.messages.length) return;

    let timeout: NodeJS.Timeout;
    const nextMsg = activeConv.messages[messageIndex]
    const isUser = nextMsg.sender === 'user'

    if (isUser) {
      let currentLength = 0;
      const typeSpeed = 15; 
      
      const typeNextChar = () => {
        if (currentLength < nextMsg.text.length) {
          setTypingText(nextMsg.text.substring(0, currentLength + 1));
          currentLength++;
          timeout = setTimeout(typeNextChar, typeSpeed);
        } else {
          timeout = setTimeout(() => {
            setTypingText("")
            setDisplayedMessages(prev => [...prev, { ...nextMsg, isTyping: false }])
            
            // Add a natural delay before the agent starts thinking
            timeout = setTimeout(() => {
              setMessageIndex(idx => idx + 1)
            }, 800)
          }, 300)
        }
      }
      timeout = setTimeout(typeNextChar, 400) 
    } else {
      // Show empty message and begin "thinking"
      setDisplayedMessages(prev => [...prev, { ...nextMsg, text: "", fullText: nextMsg.text, isThinking: true, isTyping: false }])
      
      let currentLength = 0;
      const typeSpeed = 25; 
      
      const typeNextChar = () => {
        if (currentLength < nextMsg.text.length) {
          currentLength++;
          setDisplayedMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].text = nextMsg.text.substring(0, currentLength);
            return newArr;
          });
          timeout = setTimeout(typeNextChar, typeSpeed);
        } else {
          setDisplayedMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].isTyping = false;
            return newArr;
          });
          timeout = setTimeout(() => {
            setMessageIndex(idx => idx + 1)
          }, 400) 
        }
      }
      
      // Wait for a "thinking" pause before typing starts
      timeout = setTimeout(() => {
        setDisplayedMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1].isThinking = false;
          newArr[newArr.length - 1].isTyping = true;
          return newArr;
        });
        typeNextChar();
      }, 1200) 
    }

    return () => clearTimeout(timeout)
  }, [messageIndex, activeConv])

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [displayedMessages, typingText])

  return (
    <section style={{ 
      background: '#F6F4EB', 
      padding: '160px 0 160px 0', 
      position: 'relative', 
      width: '100%',
      zIndex: 20,
      overflow: 'hidden'
    }}>
      
      
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px', padding: '0 40px' }}>
        <h2 style={{ 
          fontSize: '48px', 
          fontWeight: 600, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.1, 
          color: '#18181B', 
          marginBottom: '32px',
          fontFamily: 'var(--font-main)'
        }}>
          Ask your security stack anything
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

      <div className="container" style={{ position: 'relative', zIndex: 2, margin: '0 auto', padding: '0 20px', maxWidth: '1200px' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '0',
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          alignItems: 'stretch'
        }}>
          {/* Left Content Side */}
          <div style={{ flex: 1, padding: '80px 60px', borderRight: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <div style={{ 
            display: 'flex', 
            width: '100%',
            gap: '8px', 
            marginBottom: '48px', 
            background: 'rgba(0,0,0,0.03)', 
            padding: '6px', 
            borderRadius: '100px',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: 'none'
          }}>
            {conversations.map((conv, idx) => (
              <button
                key={conv.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  flex: 1,
                  background: activeTab === idx ? '#ffffff' : 'transparent',
                  border: `1px solid ${activeTab === idx ? 'rgba(0,0,0,0.05)' : 'transparent'}`,
                  color: activeTab === idx ? '#18181B' : '#71717A',
                  padding: '8px 24px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-main)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  fontWeight: activeTab === idx ? 600 : 400,
                  boxShadow: activeTab === idx ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  textAlign: 'center'
                }}
              >
                Query 0{idx + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#18181B',
                marginBottom: '16px',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-main)'
              }}>
                {activeConv.question}
              </h3>
              
              <p style={{
                fontSize: '16px',
                color: '#52525B',
                lineHeight: 1.6,
                fontFamily: 'var(--font-main)',
                marginBottom: '24px'
              }}>
                {activeConv.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeConv.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontSize: '15px',
                      color: '#3F3F46',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-main)'
                    }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          </div>

          {/* Right Subtle Threaded Console */}
          <div style={{ flex: 1, height: '640px', padding: '40px 60px', background: '#FAFAFA', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
          <div
            ref={chatScrollRef}
            style={{
              flex: 1,
              padding: '10px 0 40px 0', 
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              position: 'relative'
            }} className="raw-chat-scroll"
          >
            <style>{`
              .raw-chat-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Faint connecting thread line for the terminal feel */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '20px',
              bottom: '40px',
              width: '1px',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
              zIndex: 0
            }}></div>

            {displayedMessages.map((msg, i) => {
              const isUser = msg.sender === 'user'
              
              if (isUser) {
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    gap: '16px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {/* Minimal User Avatar */}
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '15px', 
                      background: '#ffffff', 
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#A1A1AA' }}>U</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '85%' }}>
                      <div style={{
                        background: '#f4f4f5',
                        border: '1px solid rgba(0,0,0,0.04)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        color: '#18181B',
                        fontSize: '15px',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-main)',
                        fontWeight: 500,
                        textAlign: 'left' // text itself is left aligned inside the bubble
                      }}>
                        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                          <span style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>10:42 AM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              }

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }} 
                  style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  width: '100%',
                  position: 'relative',
                  zIndex: 1
                }}>
                  
                  {/* Subtle Engine Icon */}
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '8px',
                    background: '#18181B', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 28 28" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 9 8 C 9 13.4 5.4 17 0 17 C 5.4 17 9 20.6 9 26 C 9 20.6 12.6 17 18 17 C 12.6 17 9 13.4 9 8 Z" />
                      <path d="M 20 2 C 20 5 18 7 15 7 C 18 7 20 9 20 12 C 20 9 22 7 25 7 C 22 7 20 5 20 2 Z" />
                    </svg>
                  </div>

                  {/* Glass Block Content */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0,0,0,0.02)',
                    padding: '20px 24px',
                    borderRadius: '12px', 
                    color: '#3F3F46',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    width: '100%',
                    fontFamily: 'var(--font-main)'
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#27272A' }}>
                      {msg.text}
                      {msg.isThinking && (
                        <motion.span
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
                          style={{ color: '#A1A1AA', fontSize: '14px', fontStyle: 'italic' }}
                        >
                          Thinking...
                        </motion.span>
                      )}
                      {msg.isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          style={{ marginLeft: '6px', display: 'inline-block', width: '2px', height: '16px', background: '#18181B', verticalAlign: 'middle' }}
                        />
                      )}
                    </div>
                    {!msg.isThinking && !msg.isTyping && msg.text.length > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>10:42 AM</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Minimal Bottom Input */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            marginTop: '10px',
            flexShrink: 0
          }}>
            <div style={{ width: '24px', height: '24px', marginRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={typingText ? '#18181B' : '#A1A1AA'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            
            <span style={{ 
              flex: 1, 
              fontFamily: 'var(--font-main)', 
              fontSize: '15px', 
              color: typingText ? '#18181B' : '#A1A1AA',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {typingText || "Ask the Engine..."}
              {typingText && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ marginLeft: '2px', display: 'inline-block', width: '2px', height: '16px', background: '#18181B', verticalAlign: 'middle' }}
                />
              )}
            </span>
            
            <div style={{
              background: typingText ? '#18181B' : '#f4f4f5',
              borderRadius: '6px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
              flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={typingText ? '#fff' : '#A1A1AA'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
)
}
