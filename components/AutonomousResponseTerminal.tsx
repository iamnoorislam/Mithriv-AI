'use client'

import React, { useState, useEffect } from 'react'

interface Segment {
  text: string
  bold: boolean
}

interface LogLine {
  time: string
  tag: string
  tagClass: string
  segments: Segment[]
}

const logLinesData: LogLine[] = [
  {
    time: "14:02:11",
    tag: "Detect",
    tagClass: "art-tag-detect",
    segments: [
      { text: "Badge anomaly", bold: true },
      { text: " — credential flagged at Server Room 4B. Employee terminated 3 days prior.", bold: false }
    ]
  },
  {
    time: "14:02:11",
    tag: "Assess",
    tagClass: "art-tag-assess",
    segments: [
      { text: "Cross-referencing with ", bold: false },
      { text: "HR termination log", bold: true },
      { text: ", access history, and camera feed CAM-G4.", bold: false }
    ]
  },
  {
    time: "14:02:12",
    tag: "Action",
    tagClass: "art-tag-action",
    segments: [
      { text: "Credential revoked", bold: true },
      { text: " · Guard dispatched to 4B · CCTV clip archived · CISO notified.", bold: false }
    ]
  },
  {
    time: "14:02:12",
    tag: "Result",
    tagClass: "art-tag-result",
    segments: [
      { text: "Threat contained.", bold: true },
      { text: " Evidence chain compiled. Case file on immutable ledger.", bold: false }
    ]
  }
]

const getLineLength = (line: LogLine) => {
  return line.segments.reduce((acc, seg) => acc + seg.text.length, 0)
}

export default function AutonomousResponseTerminal() {
  const [activeLineIdx, setActiveLineIdx] = useState(0)
  const [typedLengths, setTypedLengths] = useState<number[]>([0, 0, 0, 0])
  const [status, setStatus] = useState<'Active' | 'Resolved'>('Active')
  const [resultVisible, setResultVisible] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [sequenceKey, setSequenceKey] = useState(0)

  useEffect(() => {
    setTypedLengths([0, 0, 0, 0])
    setActiveLineIdx(0)
    setStatus('Active')
    setResultVisible(false)
    setCountdown(5)

    let timer: NodeJS.Timeout
    let activeIdx = 0
    let currentLengths = [0, 0, 0, 0]

    const typeNextChar = () => {
      if (activeIdx >= logLinesData.length) {
        timer = setTimeout(() => {
          setStatus('Resolved')
          setResultVisible(true)

          let count = 5
          const interval = setInterval(() => {
            count--
            setCountdown(count)
            if (count <= 0) {
              clearInterval(interval)
              timer = setTimeout(() => {
                setSequenceKey(k => k + 1)
              }, 600)
            }
          }, 1000)

          return () => clearInterval(interval)
        }, 400)
        return
      }

      const line = logLinesData[activeIdx]
      const totalLen = getLineLength(line)

      if (currentLengths[activeIdx] < totalLen) {
        currentLengths[activeIdx]++
        setTypedLengths([...currentLengths])
        timer = setTimeout(typeNextChar, 12)
      } else {
        timer = setTimeout(() => {
          activeIdx++
          setActiveLineIdx(activeIdx)
          typeNextChar()
        }, 300)
      }
    }

    timer = setTimeout(typeNextChar, 800)

    return () => clearTimeout(timer)
  }, [sequenceKey])

  const renderSegments = (segments: Segment[], maxChars: number) => {
    let charsLeft = maxChars
    return segments.map((seg, i) => {
      const text = seg.text
      const len = text.length

      if (charsLeft <= 0) {
        if (seg.bold) {
          return (
            <strong key={i}>
              <span style={{ visibility: 'hidden' }}>{text}</span>
            </strong>
          )
        }
        return (
          <span key={i} style={{ visibility: 'hidden' }}>{text}</span>
        )
      } else if (charsLeft >= len) {
        charsLeft -= len
        if (seg.bold) {
          return <strong key={i}>{text}</strong>
        }
        return <React.Fragment key={i}>{text}</React.Fragment>
      } else {
        const typedText = text.slice(0, charsLeft)
        const untypedText = text.slice(charsLeft)
        charsLeft = 0
        if (seg.bold) {
          return (
            <strong key={i}>
              {typedText}
              <span style={{ visibility: 'hidden' }}>{untypedText}</span>
            </strong>
          )
        }
        return (
          <React.Fragment key={i}>
            {typedText}
            <span style={{ visibility: 'hidden' }}>{untypedText}</span>
          </React.Fragment>
        )
      }
    })
  }

  return (
    <div className="art-panel">
      <div className="art-topbar">
        <div className="art-mac">
          <div className="art-mac-dot art-dot-r"></div>
          <div className="art-mac-dot art-dot-y"></div>
          <div className="art-mac-dot art-dot-g"></div>
        </div>
        <div className="art-title-text">Mithriv · Autonomous Response</div>
        <div className="art-live-badge">
          <div className="art-live-dot"></div>
          LIVE
        </div>
      </div>

      <div className="art-incident-hdr">
        <div className="art-incident-id">EVT-2847 · Server Room 4B · Site 07</div>
        <div className={`art-status-badge ${status === 'Active' ? 'art-status-active' : 'art-status-resolved'}`}>
          {status}
        </div>
      </div>

      <div className="art-log-body">
        {logLinesData.map((line, idx) => {
          const isVisible = idx <= activeLineIdx
          const typedLen = typedLengths[idx]
          const isTyping = idx === activeLineIdx && typedLen < getLineLength(line)
          
          return (
            <div 
              key={idx} 
              className={`art-log-line ${isVisible ? 'visible' : ''}`}
            >
              <span className="art-log-time">{line.time}</span>
              <span className={`art-log-tag ${line.tagClass}`}>{line.tag}</span>
              <span className="art-log-text">
                {renderSegments(line.segments, typedLen)}
                {isTyping && <span className="art-cursor"></span>}
              </span>
            </div>
          )
        })}
      </div>

      <div className={`art-result-bar ${resultVisible ? 'visible' : ''}`}>
        <div className="art-result-left">
          <div className="art-result-check">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#49B25C" strokeWidth="1" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          RESOLVED IN 1.2 SECONDS
        </div>
        <div className="art-result-time">
          {countdown > 0 ? `Resetting in ${countdown}s` : 'Resetting...'}
        </div>
      </div>

      <div className="art-stats-bar">
        <div className="art-stat-item">
          <span className="art-stat-val green">47M+</span>
          <span className="art-stat-label">Events Today</span>
        </div>
        <div className="art-stat-item">
          <span className="art-stat-val purple">1.2s</span>
          <span className="art-stat-label">Response Time</span>
        </div>
        <div className="art-stat-item">
          <span className="art-stat-val">99.7%</span>
          <span className="art-stat-label">Accuracy</span>
        </div>
      </div>
    </div>
  )
}
