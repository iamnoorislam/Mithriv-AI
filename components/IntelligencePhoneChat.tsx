'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedActivityIcon, AnimatedAlertTriangleIcon, AnimatedFingerprintIcon, AnimatedFileTextIcon, AnimatedShieldCheckIcon, AnimatedClockIcon } from './AnimatedIcons'

const conversations = [
  {
    id: 0,
    question: "What is our current risk posture?",
    description: "Understand your operational status instantly. The Intelligence Engine synthesizes signals across all 14 sites and gives you a single unified risk score in real time.",
    points: [
      { text: "Posture score updated continuously across all sites — not at end of day", icon: AnimatedActivityIcon, color: "#3B82F6" },
      { text: "Every open item ranked by urgency with a recommended action", icon: AnimatedAlertTriangleIcon, color: "#F59E0B" }
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
      { text: "Every anomaly cross-referenced against behavioral baseline automatically", icon: AnimatedFingerprintIcon, color: "#10B981" },
      { text: "Incident reports generated and export-ready the moment a threat is detected", icon: AnimatedFileTextIcon, color: "#EC4899" }
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
      { text: "Live compliance percentage across every framework — NERC CIP, HIPAA, TSA, SOC 2", icon: AnimatedShieldCheckIcon, color: "#8B5CF6" },
      { text: "Gaps identified with estimated resolution time and assigned owner", icon: AnimatedClockIcon, color: "#06B6D4" }
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
      background: 'transparent', 
      padding: '0 0 160px 0', 
      position: 'relative', 
      width: '100%',
      zIndex: 20,
      overflow: 'hidden'
    }}>
      
      
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '80px', padding: '0 40px' }}>
        <h2 style={{ 
          fontSize: '48px', 
          fontWeight: 600, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.1, 
          color: '#ffffff', 
          marginBottom: '24px',
          fontFamily: 'var(--font-main)'
        }}>
          Ask your security stack anything
        </h2>

        <p style={{ 
          fontSize: '14px', 
          color: '#A1A1AA', 
          lineHeight: 1.7, 
          fontFamily: 'var(--font-mono)', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          No dashboards. No reports. No analyst waiting period. The Intelligence Engine processes every event across every system — and answers any question in plain English, instantly.
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '8px', 
          background: 'transparent', 
          padding: '6px', 
          borderRadius: '100px',
          border: '1px solid #212326',
          boxShadow: 'none',
          maxWidth: 'fit-content',
          margin: '48px auto 0'
        }}>
          {conversations.map((conv, idx) => (
            <button
              key={conv.id}
              onClick={() => setActiveTab(idx)}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                background: 'transparent',
                border: '1px solid transparent',
                color: activeTab === idx ? '#ffffff' : '#A1A1AA',
                padding: '8px 32px',
                borderRadius: '100px',
                fontSize: '13px',
                fontFamily: 'var(--font-main)',
                cursor: 'pointer',
                transition: 'color 0.3s ease, font-weight 0.3s ease',
                outline: 'none',
                fontWeight: activeTab === idx ? 600 : 400,
                textAlign: 'center',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {activeTab === idx && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#212326',
                    borderRadius: '100px',
                    zIndex: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>Query 0{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, margin: '0 auto', padding: '0 20px', maxWidth: '1200px' }}>
        <div style={{
          background: 'rgba(10, 11, 14, 0.4)',
          borderRadius: '0',
          boxShadow: 'none',
          border: '1px solid #212326',
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          alignItems: 'stretch'
        }}>
          {/* Left Content Side */}
          <div style={{ flex: 1, padding: '80px 60px', borderRight: '1px solid #212326', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative' }}>
          
          {/* Diagonal Lines Background */}
          <style>{`
            @keyframes slideDiagonal {
              0% { background-position: 0 0; }
              100% { background-position: 848.53px 0; }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='8.485' height='8.485' viewBox='0 0 8.5 8.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-2 -2L10.5 10.5M6.5 -2L10.5 2M-2 6.5L2 10.5' stroke='%23212326' stroke-width='1'/%3E%3C/svg%3E")`,
            animation: 'slideDiagonal 40s linear infinite',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${activeTab}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-main)'
              }}>
                {activeConv.question}
              </h3>
              
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                fontFamily: 'var(--font-main)',
                marginBottom: '48px'
              }}>
                {activeConv.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`points-${activeTab}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {activeConv.points.map((point, i) => {
                  const IconComponent = point.icon;
                  return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '53px',
                      height: '53px',
                      borderRadius: '50%',
                      border: '1px solid #27272A',
                      background: '#0A0B0E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative'
                    }}>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 1] }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.5 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <IconComponent size={20} color={point.color} isHovered={true} />
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.5 }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          background: `radial-gradient(circle, ${point.color}40 0%, transparent 70%)`,
                          borderRadius: '50%',
                          zIndex: 0
                        }}
                      />
                    </div>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'rgba(255,255,255,0.8)', 
                      margin: 0, 
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-main)'
                    }}>
                      {point.text}
                    </p>
                  </div>
                )})}
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
          </div>

          {/* Right Subtle Threaded Console */}
          <div style={{ flex: 1, height: '640px', padding: '40px 60px', background: 'transparent', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
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

            {/* Faint connecting thread line removed */}            {displayedMessages.map((msg, i) => {
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
                      background: '#18181B', 
                      border: '1px solid #212326',
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
                        background: '#18181B',
                        border: '1px solid #212326',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
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
                    background: '#212326',
                    border: 'none',
                    boxShadow: 'none',
                    padding: '20px 24px',
                    borderRadius: '12px', 
                    color: '#D4D4D8',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-main)'
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#FAFAFA' }}>
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
                          style={{ marginLeft: '6px', display: 'inline-block', width: '2px', height: '16px', background: '#FAFAFA', verticalAlign: 'middle' }}
                        />
                      )}
                    </div>
                    {!msg.isThinking && !msg.isTyping && msg.text.length > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>10:42 AM</span>
                      </div>
                    )}
                  </div>
                  {/* Spacer to align max width with user avatar */}
                  <div style={{ width: '30px', flexShrink: 0 }} />
                </motion.div>
              )
            })}
          </div>

          {/* Minimal Bottom Input */}
          <div style={{
            background: '#0A0A0C',
            borderRadius: '12px',
            boxShadow: 'none',
            border: '1px solid #212326',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            marginTop: '10px',
            flexShrink: 0
          }}>
            <div style={{ width: '24px', height: '24px', marginRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={typingText ? '#FAFAFA' : '#52525B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            
            <span style={{ 
              flex: 1, 
              fontFamily: 'var(--font-main)', 
              fontSize: '14px', 
              color: typingText ? '#FAFAFA' : '#52525B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {typingText || "Ask the Engine..."}
              {typingText && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ marginLeft: '2px', display: 'inline-block', width: '2px', height: '16px', background: '#FAFAFA', verticalAlign: 'middle' }}
                />
              )}
            </span>
            
            <div style={{
              background: typingText ? '#FAFAFA' : '#18181B',
              borderRadius: '6px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
              flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={typingText ? '#000' : '#52525B'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
