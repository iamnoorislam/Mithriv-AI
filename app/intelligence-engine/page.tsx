'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import '../style.css'

export default function IntelligenceEnginePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Hide Preloaders
    setTimeout(() => {
      const preloader1 = document.getElementById('premium-preloader');
      if (preloader1) {
        preloader1.style.opacity = '0';
        setTimeout(() => preloader1.style.display = 'none', 500);
      }
      const preloader2 = document.querySelector('.preloader');
      if (preloader2) {
        (preloader2 as HTMLElement).style.opacity = '0';
        setTimeout(() => (preloader2 as HTMLElement).style.display = 'none', 500);
      }
    }, 800);

    let timer: NodeJS.Timeout;
    const init = () => {
      const w = window as any;
      if (w.runMain && w.gsap && w.ScrollTrigger && typeof w.Lenis !== 'undefined') {
        w.runPreloader && w.runPreloader();
        w.runMain();
      } else {
        timer = setTimeout(init, 50);
      }
    };
    init();

    return () => {
      clearTimeout(timer);
      const w = window as any;
      if (w.cleanupMain) {
        w.cleanupMain();
      }
      if (w.gsap && w.ScrollTrigger) {
        w.ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="landing-theme">
      <div dangerouslySetInnerHTML={{ __html: `

    <!-- Hero Section -->
    <section class="hero-section hero-module" style="height: auto; min-height: 0; padding-bottom: 0; z-index: 10;">
        <div class="hero-content">
            <span class="section-tag" style="color: var(--primary-purple);">MITHRIV INTELLIGENCE ENGINE</span>
            <h1 class="main-heading">The Decision Layer<br>for Physical Security</h1>
            <p class="body-text" style="max-width: 800px; margin: 0 auto 1rem;">
                The Intelligence Engine correlates events across every system, applies your operational doctrine, and
                executes responses in milliseconds, while keeping humans in command.
            </p>

            <div class="comm-logos">
                <span>BOSCH</span>
                <span>BARCLAYS</span>
                <span>Emirates</span>
                <span>NatWest</span>
                <span>genpact</span>
            </div>

            <button class="pixel-btn" style="margin-top: 1rem;">Request Intelligence Assessment</button>

            <div class="comm-stats">
                <div class="stat-item">
                    <h3>80+</h3>
                    <p>Pre-built Integrations</p>
                </div>
                <div class="stat-item">
                    <h3>3,000+</h3>
                    <p>Sites Connected</p>
                </div>
                <div class="stat-item">
                    <h3>22</h3>
                    <p>Countries</p>
                </div>
                <div class="stat-item">
                    <h3>99.99%</h3>
                    <p>Uptime</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Spline 3D Section -->
    <section class="reveal-section"
        style="width:100%; height:100vh; margin-top:-150px; overflow:hidden; position: relative; z-index: 5;">
        <iframe src="https://my.spline.design/boxeshover-tQjB8t14JYZf4oweK44gwMZ3/"
            style="display:block; width:100%; height:100%; border:none;" allowtransparency="true">
        </iframe>
    </section>

    <!-- Section: Simulation Playground -->
    <section class="sec-simulation reveal-section" style="margin-top: -50px; z-index: 1;">
        <div class="container">
            <span class="section-tag" style="color: var(--accent-pink);">SIMULATION PLAYGROUND</span>
            <div style="width: 100%; height: 1px; background: rgba(255,255,255,0.1); margin: 1.5rem 0 3rem;"></div>

            <div class="sim-playground-grid">
                <!-- Left Column -->
                <div class="sim-col-left">
                    <!-- Scenario Library -->
                    <div class="sim-card">
                        <div class="sim-card-header">
                            <span class="sim-card-title">SCENARIO LIBRARY</span>
                            <button class="sim-btn-outline">[+ Custom]</button>
                        </div>
                        <ul class="sim-list" id="simList">
                            <li data-scenario="0">Unauthorized Access Attempt</li>
                            <li data-scenario="1">Visitor Overstay</li>
                            <li data-scenario="2">Terminated Employee Return</li>
                            <li data-scenario="3">Tailgating Detection</li>
                            <li data-scenario="4">After-Hours Executive Access</li>
                            <li data-scenario="5">Contractor Safety Violation</li>
                            <li data-scenario="6">Multi-Site Coordinated Incident</li>
                            <li data-scenario="7">VIP Arrival (Unannounced)</li>
                            <li data-scenario="8" class="active"><span class="term-green"
                                    style="margin-right: 0.5rem;">[Selected]</span> Insider Threat Progression</li>
                        </ul>
                    </div>

                    <!-- Scenario Details -->
                    <div class="sim-card">
                        <div class="sim-card-header">
                            <span class="sim-card-title">SCENARIO: <span class="term-green" id="simTitle">Insider Threat
                                    Progression</span></span>
                        </div>
                        <div id="simDescPanel">
                            <p class="sim-paragraph">A senior engineer with data center access begins showing behavioral
                                anomalies over a 3-week period following a negative performance review.</p>

                            <div class="sim-timeline">
                                <div class="sim-timeline-item">
                                    <span class="sim-dot dot-green"></span>
                                    <span class="term-green">Week 1:</span> After-hours access increases 40%
                                </div>
                                <div class="sim-timeline-item">
                                    <span class="sim-dot dot-orange"></span>
                                    <span class="term-orange">Week 2:</span> Accesses areas outside normal scope
                                </div>
                                <div class="sim-timeline-item">
                                    <span class="sim-dot dot-red"></span>
                                    <span class="term-red">Week 3:</span> Downloads spike, badge-out without badge-in
                                </div>
                            </div>
                        </div>

                        <div class="sim-actions">
                            <button class="sim-btn-action" id="btnRunSim"><span class="sim-dot dot-green"
                                    style="position: relative; left: 0; top: 0; display: inline-block; margin-right: 8px;"></span>
                                Run Simulation</button>
                            <button class="sim-btn-action"><span class="sim-dot dot-green"
                                    style="position: relative; left: 0; top: 0; display: inline-block; margin-right: 8px;"></span>
                                Modify Parameters</button>
                        </div>
                    </div>
                </div>

                <!-- Right Column (Results) -->
                <div class="sim-card">
                    <div class="sim-card-header">
                        <span class="sim-card-title">SIMULATION RESULTS</span>
                    </div>

                    <div class="sim-results-scroll" id="simResultsPanel">
                        <!-- Content dynamically injected via JS -->
                        <div class="sim-timeline" style="margin-bottom: 2rem;">
                            <div class="sim-timeline-item">
                                <span class="sim-dot dot-green"></span>
                                <span class="term-green">Week 1, Day 3:</span>
                                <div class="sim-log-block">
                                    <span>Behavioral baseline deviation detected</span>
                                    <span>Confidence: 23% (Below alert threshold)</span>
                                    <span>Action: Flag for pattern monitoring</span>
                                </div>
                            </div>
                            <div class="sim-timeline-item">
                                <span class="sim-dot dot-orange"></span>
                                <span class="term-orange">Week 2, Day 2:</span>
                                <div class="sim-log-block">
                                    <span>Cross-referenced: HR performance review (negative)</span>
                                    <span>Access pattern: 3 areas outside normal scope</span>
                                    <span>Confidence: 67% (Advisory threshold)</span>
                                    <span>Action: Generate advisory for Security Manager</span>
                                </div>
                            </div>
                            <div class="sim-timeline-item">
                                <span class="sim-dot dot-red"></span>
                                <span class="term-red">Week 3, Day 1:</span>
                                <div class="sim-log-block">
                                    <span>Download volume: 340% above baseline</span>
                                    <span>Badge anomaly: Entry without exit (previous day)</span>
                                    <span>Confidence: 89% (Action threshold)</span>
                                    <span>Actions triggered:</span>
                                    <span style="padding-left: 1rem;">• Alert to CISO (SOP 7.3.2)</span>
                                    <span style="padding-left: 1rem;">• Video evidence preserved (72-hour
                                        lookback)</span>
                                    <span style="padding-left: 1rem;">• Access temporarily restricted pending
                                        review</span>
                                    <span style="padding-left: 1rem;">• HR notification prepared (pending CISO
                                        approval)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sim-footer">
                        <div class="sim-footer-stats" id="simFooterStats">
                            <span>SOP Coverage: 94%</span>
                            <span>Gaps Identified: 2</span>
                        </div>
                        <div class="sim-actions" style="padding-top: 0;">
                            <button class="sim-btn-action"><span class="dot dot-green"></span> View Gap
                                Analysis</button>
                            <button class="sim-btn-action"><span class="dot dot-green"></span> Export Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: The Response Gap -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">THE CHALLENGE</span>
            <h2 class="pixel-heading text-center" style="margin-bottom: 3rem;">The Response Gap</h2>
            <div class="split-layout">
                <div>
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">Your security stack detects threats in
                        milliseconds.</h3>
                    <p class="body-text" style="margin-bottom: 1.5rem;">Your cameras identify unauthorized access at
                        T+0. Your access control logs the badge attempt at T+50ms. Your analytics engine flags the
                        anomaly at T+200ms.</p>
                    <p class="body-text" style="">Then the waiting begins.</p>
                </div>
                <div class="pixel-card">
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem;">Bridging the Gap</h3>
                    <p class="card-desc" style="margin-bottom: 1.5rem;">The Integration Fabric brings your security
                        systems into one operational model. Real-time state across access control, video, visitor
                        management, building systems, and identity.</p>
                    <p class="body-text" style="color: var(--accent-pink); font-weight: 600;">The Intelligence Engine
                        makes that unified data actionable.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Capability Framework -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">FRAMEWORK</span>
            <h2 class="pixel-heading text-center">Intelligence Capability Framework</h2>
            <p class="body-text text-center" style="max-width: 700px; margin: 0 auto 3rem;">The Intelligence Engine
                operates through four concurrent capabilities:</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="agent-card hover-zoom">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">Contextual correlation</h3>
                    <p class="card-desc" style="margin-bottom: 1.5rem; margin-top: 0;">Understanding events in relation
                        to identity, location, time, history, and organizational context.</p>
                    <p class="body-text"
                        style="padding: 1rem; background: rgba(255,255,255,0.02); border-left: 2px solid var(--primary-purple);">
                        "Marketing director attempted data center access at 2 AM. Behavioral deviation score: 94."</p>
                </div>
                <div class="agent-card hover-zoom">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">Doctrinal reasoning</h3>
                    <p class="card-desc" style="margin-bottom: 1.5rem; margin-top: 0;">Applying your operational
                        doctrine, SOPs, policies, escalation paths, to correlated events automatically.</p>
                    <p class="body-text"
                        style="padding: 1rem; background: rgba(255,255,255,0.02); border-left: 2px solid var(--accent-pink);">
                        "Event matches SOP 4.2.1. Actions: Notify CISO within 15 minutes, preserve video evidence."</p>
                </div>
                <div class="agent-card hover-zoom">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">Predictive assessment</h3>
                    <p class="card-desc" style="margin-bottom: 1.5rem; margin-top: 0;">Evaluating threat probability and
                        impact based on patterns across time, sites, and historical incidents.</p>
                    <p class="body-text"
                        style="padding: 1rem; background: rgba(255,255,255,0.02); border-left: 2px solid #4da6ff;">
                        "Motion pattern consistent with vehicle reconnaissance. Threat probability: ELEVATED."</p>
                </div>
                <div class="agent-card hover-zoom">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">Executable action</h3>
                    <p class="card-desc" style="margin-bottom: 1.5rem; margin-top: 0;">Initiating appropriate responses
                        through connected systems, doors, cameras, credentials, communications.</p>
                    <p class="body-text"
                        style="padding: 1rem; background: rgba(255,255,255,0.02); border-left: 2px solid #32ce55;">
                        "Guard dispatched via radio with location, video clip of subject. Relevant doors locked."</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Architecture Stack (The Reasoning Core) -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">ARCHITECTURE</span>
            <h2 class="pixel-heading text-center">The Reasoning Core</h2>
            <p class="body-text text-center" style="max-width: 700px; margin: 0 auto 3rem;">Processes events from the
                Integration Fabric through four concurrent analysis paths within 600 milliseconds.</p>

            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 900px; margin: 0 auto;">

                <!-- 4 Paths Row -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                    <div class="node-block" style="padding: 1.5rem; text-align: left;">
                        <h4
                            style="font-size: 0.95rem; color: var(--primary-purple); margin-bottom: 0.5rem; font-family: var(--font-heading);">
                            Identity Resolution</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Role, clearance level,
                            normal behavior pattern.</p>
                    </div>
                    <div class="node-block" style="padding: 1.5rem; text-align: left;">
                        <h4
                            style="font-size: 0.95rem; color: var(--primary-purple); margin-bottom: 0.5rem; font-family: var(--font-heading);">
                            Spatial-Temporal</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Location and timing
                            context. Adjacent space activity.</p>
                    </div>
                    <div class="node-block" style="padding: 1.5rem; text-align: left;">
                        <h4
                            style="font-size: 0.95rem; color: var(--primary-purple); margin-bottom: 0.5rem; font-family: var(--font-heading);">
                            Behavioral Baseline</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Deviation from
                            individual and role patterns.</p>
                    </div>
                    <div class="node-block" style="padding: 1.5rem; text-align: left;">
                        <h4
                            style="font-size: 0.95rem; color: var(--primary-purple); margin-bottom: 0.5rem; font-family: var(--font-heading);">
                            Threat Pattern</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Known indicator
                            correlation. Social engineering signature.</p>
                    </div>
                </div>

                <!-- Funnel Down -->
                <div style="display: flex; justify-content: center; position: relative;">
                    <div class="flow-line" style="height: 30px; margin: 10px 0;"></div>
                </div>

                <!-- Doctrine Library -->
                <div class="node-block highlight-node" style="text-align: center; padding: 2rem;">
                    <span class="node-title" style="display: inline-block;">The Doctrine Library</span>
                    <p class="card-desc" style="margin-top: 0.5rem;">Your operational doctrine, SOPs, policies,
                        compliance requirements, encoded as executable logic.</p>
                </div>

                <div class="flow-line" style="height: 30px; margin: 10px auto;"></div>

                <!-- Action Framework -->
                <div class="node-block"
                    style="text-align: center; padding: 2rem; border-color: rgba(255, 45, 149, 0.4); box-shadow: inset 0 0 15px rgba(255, 45, 149, 0.05);">
                    <span class="node-title" style="display: inline-block; color: var(--accent-pink);">The Action
                        Framework</span>
                    <div
                        style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem; text-align: left;">
                        <div>
                            <strong style="display: block; color: #e2e8f0; font-size: 0.9rem; margin-bottom: 0.3rem;">>
                                Authorizes</strong>
                            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">Evaluates if
                                human approval is required based on boundaries.</p>
                        </div>
                        <div>
                            <strong style="display: block; color: #e2e8f0; font-size: 0.9rem; margin-bottom: 0.3rem;">>
                                Executes</strong>
                            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">Initiates actions
                                through Integration Fabric locks and dispatch.</p>
                        </div>
                        <div>
                            <strong style="display: block; color: #e2e8f0; font-size: 0.9rem; margin-bottom: 0.3rem;">>
                                Audits</strong>
                            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">Logs every
                                decision with a complete reasoning chain.</p>
                        </div>
                        <div>
                            <strong style="display: block; color: #e2e8f0; font-size: 0.9rem; margin-bottom: 0.3rem;">>
                                Learns</strong>
                            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">Tracks outcomes
                                for supervised continuous learning.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Graduated Autonomy Spectrum -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">CONTROL</span>
            <h2 class="pixel-heading text-center">Graduated Autonomy Spectrum</h2>
            <p class="body-text text-center" style="max-width: 700px; margin: 0 auto 3rem;">A progression where you
                control what executes automatically, what requires approval, and what remains purely advisory.</p>

            <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 900px; margin: 0 auto;">
                <!-- Level 01 -->
                <div class="compliance-card" style="border-left-color: rgba(255,255,255,0.2);">
                    <div style="flex: 0 0 150px;">
                        <h3 style="color: rgba(255,255,255,0.5); font-size: 0.9rem; letter-spacing: 2px;">LEVEL 01</h3>
                        <h2 style="font-size: 2rem; color: #fff;">Observe</h2>
                    </div>
                    <div style="flex: 1;">
                        <p class="body-text" style="margin-bottom: 1rem;">The Intelligence Engine monitors, correlates,
                            and assesses. All responses require human initiation.</p>
                        <div
                            style="display: flex; gap: 2rem; font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
                            <div style="flex: 1;"><strong
                                    style="color: var(--primary-purple); display: block; margin-bottom: 0.3rem;">System
                                    Role</strong> Recommends actions, prepares evidence.</div>
                            <div style="flex: 1;"><strong
                                    style="color: var(--accent-pink); display: block; margin-bottom: 0.3rem;">Human
                                    Role</strong> Decides on all responses, initiates all actions.</div>
                        </div>
                    </div>
                </div>

                <!-- Level 02 -->
                <div class="compliance-card" style="border-left-color: #4da6ff;">
                    <div style="flex: 0 0 150px;">
                        <h3 style="color: #4da6ff; font-size: 0.9rem; letter-spacing: 2px;">LEVEL 02</h3>
                        <h2 style="font-size: 2rem; color: #fff;">Advice</h2>
                    </div>
                    <div style="flex: 1;">
                        <p class="body-text" style="margin-bottom: 1rem;">The Intelligence Engine recommends specific
                            actions with one-click execution. Humans approve before execution.</p>
                        <div
                            style="display: flex; gap: 2rem; font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
                            <div style="flex: 1;"><strong
                                    style="color: var(--primary-purple); display: block; margin-bottom: 0.3rem;">System
                                    Role</strong> Pre-stages recommended actions for approval.</div>
                            <div style="flex: 1;"><strong
                                    style="color: var(--accent-pink); display: block; margin-bottom: 0.3rem;">Human
                                    Role</strong> Approves or modifies actions with a single click.</div>
                        </div>
                    </div>
                </div>

                <!-- Level 03 -->
                <div class="compliance-card" style="border-left-color: var(--primary-purple);">
                    <div style="flex: 0 0 150px;">
                        <h3 style="color: var(--primary-purple); font-size: 0.9rem; letter-spacing: 2px;">LEVEL 03</h3>
                        <h2 style="font-size: 2rem; color: #fff;">Assist</h2>
                    </div>
                    <div style="flex: 1;">
                        <p class="body-text" style="margin-bottom: 1rem;">Executes routine actions automatically.
                            Significant decisions escalate for approval.</p>
                        <div
                            style="display: flex; gap: 2rem; font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
                            <div style="flex: 1;"><strong
                                    style="color: var(--primary-purple); display: block; margin-bottom: 0.3rem;">System
                                    Role</strong> Suppress false-positives, attach video, send routine notifications.
                            </div>
                            <div style="flex: 1;"><strong
                                    style="color: var(--accent-pink); display: block; margin-bottom: 0.3rem;">Human
                                    Role</strong> Credential revocations, physical lockdowns, novel threats.</div>
                        </div>
                    </div>
                </div>

                <!-- Level 04 -->
                <div class="compliance-card" style="border-left-color: var(--accent-pink);">
                    <div style="flex: 0 0 150px;">
                        <h3 style="color: var(--accent-pink); font-size: 0.9rem; letter-spacing: 2px;">LEVEL 04</h3>
                        <h2 style="font-size: 2rem; color: #fff;">Execute</h2>
                    </div>
                    <div style="flex: 1;">
                        <p class="body-text" style="margin-bottom: 1rem;">Operates autonomously within defined
                            boundaries. Humans handle exceptions and strategic decisions.</p>
                        <div
                            style="display: flex; gap: 2rem; font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
                            <div style="flex: 1;"><strong
                                    style="color: var(--primary-purple); display: block; margin-bottom: 0.3rem;">System
                                    Role</strong> Complete SOP execution, credential lifecycle, guard dispatch.</div>
                            <div style="flex: 1;"><strong
                                    style="color: var(--accent-pink); display: block; margin-bottom: 0.3rem;">Human
                                    Role</strong> Exception handling, strategic decisions, policy refinement.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Simulation Playground -->
    <section class="section reveal-section"
        style="background: rgba(139, 92, 246, 0.03); border-top: 1px solid rgba(139, 92, 246, 0.1); border-bottom: 1px solid rgba(139, 92, 246, 0.1);">
        <div class="container">
            <span class="section-tag text-center">TESTING</span>
            <h2 class="pixel-heading text-center" style="margin-bottom: 3rem;">Simulation Playground</h2>
            <div class="split-layout" style="align-items: center;">
                <div class="pixel-card" style="background: rgba(10, 10, 14, 0.95);">
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem; color: var(--primary-purple);">Before
                        automation goes live, test it.</h3>
                    <p class="body-text" style="margin-bottom: 1rem;">The Simulation Playground runs your SOPs against
                        historical incidents, synthetic scenarios, and edge cases. See exactly how the Intelligence
                        Engine responds.</p>
                    <ul style="list-style: none; margin-top: 1.5rem;">
                        <li style="margin-bottom: 0.8rem; color: var(--text-muted); font-family: var(--font-body);">
                            <span style="color: var(--accent-pink); margin-right: 10px;">></span> <strong>SOP
                                gaps:</strong> Scenarios your procedures don't address
                        </li>
                        <li style="margin-bottom: 0.8rem; color: var(--text-muted); font-family: var(--font-body);">
                            <span style="color: var(--accent-pink); margin-right: 10px;">></span> <strong>Timing
                                optimization:</strong> Where response sequences can accelerate
                        </li>
                        <li style="margin-bottom: 0.8rem; color: var(--text-muted); font-family: var(--font-body);">
                            <span style="color: var(--accent-pink); margin-right: 10px;">></span> <strong>Threshold
                                calibration:</strong> Tuning confidence levels for action triggers
                        </li>
                        <li style="margin-bottom: 0.8rem; color: var(--text-muted); font-family: var(--font-body);">
                            <span style="color: var(--accent-pink); margin-right: 10px;">></span> <strong>Edge case
                                handling:</strong> System behavior in ambiguous situations
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Identify gaps. Refine policies. Build
                        confidence.</h3>
                    <p class="body-text">Run simulations before deployment. Run them after policy changes. Run them when
                        regulations update.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Operational Scenarios -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">USE CASES</span>
            <h2 class="pixel-heading text-center">Operational Scenarios</h2>
            <p class="body-text text-center" style="max-width: 700px; margin: 0 auto 3rem;">How the Intelligence Engine
                transforms specific operational challenges.</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="agent-card">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">1. VIP Welcome Orchestration</h3>
                    <p class="card-desc" style="margin-bottom: 1rem; margin-top: 0;">A board member arrives unannounced
                        at headquarters. The CEO's assistant calls security 90 seconds before arrival. No
                        pre-registration. Executive parking full.</p>
                    <button class="cta-nav" style="background: transparent; padding: 0.4rem 1rem;">View Response
                        Pattern</button>
                </div>
                <div class="agent-card">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">2. Credential Lifecycle
                        Automation</h3>
                    <p class="card-desc" style="margin-bottom: 1rem; margin-top: 0;">A client arriving for a sensitive
                        meeting. No lobby exposure acceptable. Requires orchestrated path clearance from garage to
                        boardroom.</p>
                    <button class="cta-nav" style="background: transparent; padding: 0.4rem 1rem;">View Response
                        Pattern</button>
                </div>
                <div class="agent-card">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">3. Video Analytics Correlation
                    </h3>
                    <p class="card-desc" style="margin-bottom: 1rem; margin-top: 0;">Analytics detect a person loitering
                        near your loading dock at 2 AM. The analytics engine generates an alert. The Intelligence Engine
                        determines what it means.</p>
                    <button class="cta-nav" style="background: transparent; padding: 0.4rem 1rem;">View Response
                        Pattern</button>
                </div>
                <div class="agent-card">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">4. Multi-System Emergency</h3>
                    <p class="card-desc" style="margin-bottom: 1rem; margin-top: 0;">A visitor arriving at a behavioral
                        health unit with heightened security requirements triggers a cross-system lockdown protocol.</p>
                    <button class="cta-nav" style="background: transparent; padding: 0.4rem 1rem;">View Response
                        Pattern</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Audit-Ready -->
    <section class="section reveal-section"
        style="background: rgba(50, 206, 85, 0.05); border-top: 1px solid rgba(50, 206, 85, 0.1); border-bottom: 1px solid rgba(50, 206, 85, 0.1);">
        <div class="container">
            <span class="section-tag text-center" style="color: #32ce55; border-color: #32ce55;">COMPLIANCE</span>
            <h2 class="pixel-heading text-center" style="margin-bottom: 3rem;">Audit-Ready by Default</h2>
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <p class="body-text" style="margin-bottom: 2rem;">When every decision flows through a unified
                    intelligence layer, compliance becomes a byproduct of operation.</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left;">
                    <div class="compliance-card" style="padding: 1.5rem;">
                        <h4 style="color: #32ce55; margin-bottom: 0.5rem;">Complete reasoning chain</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Why the system made each assessment.
                        </p>
                    </div>
                    <div class="compliance-card" style="padding: 1.5rem;">
                        <h4 style="color: #32ce55; margin-bottom: 0.5rem;">Evidence linkage</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Video, access logs, communications
                            attached.</p>
                    </div>
                    <div class="compliance-card" style="padding: 1.5rem;">
                        <h4 style="color: #32ce55; margin-bottom: 0.5rem;">Policy mapping</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Which SOP or regulation governed the
                            response.</p>
                    </div>
                    <div class="compliance-card" style="padding: 1.5rem;">
                        <h4 style="color: #32ce55; margin-bottom: 0.5rem;">Immutable storage</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Tamper-evident logging for legal
                            defensibility.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Clear Expectations -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">FIT ASSESSMENT</span>
            <h2 class="pixel-heading text-center" style="margin-bottom: 3rem;">Clear Expectations</h2>

            <div class="split-layout">
                <div class="pixel-card" style="border-color: var(--primary-purple);">
                    <h3 style="margin-bottom: 1.5rem; color: var(--primary-purple);">Where the Engine excels:</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: var(--primary-purple); margin-right: 10px;">+</span>
                            <strong>High-alert-volume environments</strong> where operators cannot process manually
                        </li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: var(--primary-purple); margin-right: 10px;">+</span> <strong>Multi-site
                                operations</strong> requiring consistent response</li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: var(--primary-purple); margin-right: 10px;">+</span> <strong>Organizations
                                with documented SOPs</strong> that can be encoded</li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: var(--primary-purple); margin-right: 10px;">+</span> <strong>Environments
                                with integrated systems</strong> providing data for correlation</li>
                    </ul>
                </div>
                <div class="pixel-card" style="border-color: rgba(255,255,255,0.1);">
                    <h3 style="margin-bottom: 1.5rem; color: #a0a0a0;">Where other approaches fit better:</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: #a0a0a0; margin-right: 10px;">-</span> <strong>Single-site
                                operations</strong> with low alert volume and stable staff</li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: #a0a0a0; margin-right: 10px;">-</span> <strong>Organizations without
                                documented procedures</strong></li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: #a0a0a0; margin-right: 10px;">-</span> <strong>Facilities with minimal
                                system integration</strong></li>
                        <li style="margin-bottom: 1rem; color: var(--text-muted); font-family: var(--font-body);"><span
                                style="color: #a0a0a0; margin-right: 10px;">-</span> <strong>Environments requiring 100%
                                human decision-making</strong> for policy reasons</li>
                    </ul>
                </div>
            </div>

            <div class="node-block" style="max-width: 800px; margin: 3rem auto 0; text-align: left; padding: 2rem;">
                <h4 style="color: var(--accent-pink); margin-bottom: 0.5rem;">The Honest Tradeoff</h4>
                <p class="body-text">The Intelligence Engine operates within the boundaries of its training data and
                    encoded doctrine. It excels at pattern recognition, correlation, and rapid response within known
                    scenarios. Novel situations, strategic decisions, and sensitive interpersonal matters require human
                    judgment.</p>
            </div>
        </div>
    </section>

    <!-- Implementation Pathway -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">DEPLOYMENT</span>
            <h2 class="pixel-heading text-center" style="margin-bottom: 3rem;">From Assessment to Production</h2>

            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;">
                <div class="pixel-card" style="padding: 1.5rem; text-align: center;">
                    <div
                        style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-family: var(--font-body);">
                        Weeks 1-8</div>
                    <h3 style="font-size: 1.1rem; color: var(--primary-purple); margin-bottom: 1rem;">Foundation</h3>
                    <p style="font-size: 0.8rem; line-height: 1.4;">Integration audit, baseline capture, and SOP
                        inventory.</p>
                </div>
                <div class="pixel-card" style="padding: 1.5rem; text-align: center;">
                    <div
                        style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-family: var(--font-body);">
                        Weeks 8-10</div>
                    <h3 style="font-size: 1.1rem; color: var(--primary-purple); margin-bottom: 1rem;">Doctrine Encoding
                    </h3>
                    <p style="font-size: 0.8rem; line-height: 1.4;">Your operational doctrine becomes executable logic.
                    </p>
                </div>
                <div class="pixel-card" style="padding: 1.5rem; text-align: center;">
                    <div
                        style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-family: var(--font-body);">
                        Weeks 10-14</div>
                    <h3 style="font-size: 1.1rem; color: var(--primary-purple); margin-bottom: 1rem;">Simulation</h3>
                    <p style="font-size: 0.8rem; line-height: 1.4;">Extensive testing in the Simulation Playground.</p>
                </div>
                <div class="pixel-card" style="padding: 1.5rem; text-align: center;">
                    <div
                        style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-family: var(--font-body);">
                        Weeks 14-18</div>
                    <h3 style="font-size: 1.1rem; color: var(--primary-purple); margin-bottom: 1rem;">Supervised</h3>
                    <p style="font-size: 0.8rem; line-height: 1.4;">Go live at L0/L1 autonomy. Human executes.</p>
                </div>
                <div class="pixel-card" style="padding: 1.5rem; text-align: center; border-color: var(--accent-pink);">
                    <div
                        style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-family: var(--font-body);">
                        Ongoing</div>
                    <h3 style="font-size: 1.1rem; color: var(--accent-pink); margin-bottom: 1rem;">Graduated</h3>
                    <p style="font-size: 0.8rem; line-height: 1.4;">Systematically increase automation.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Threat Ticker -->
    <div class="global-ticker" style="margin-top: 5rem;">
        <div class="ticker-content">
            <span>> [SYS_OK] Perimeter Secure</span><span class="ticker-sep">|</span>
            <span>> [NET] Latency: 12ms</span><span class="ticker-sep">|</span>
            <span>> [AI_CORE] 0 Missed Alerts</span><span class="ticker-sep">|</span>
            <span>> [AGENT_04] Executing Protocols</span><span class="ticker-sep">|</span>
            <span>> [NODE_9] 100% Uptime</span><span class="ticker-sep">|</span>
            <span>> [SYS_OK] Perimeter Secure</span><span class="ticker-sep">|</span>
            <span>> [NET] Latency: 12ms</span><span class="ticker-sep">|</span>
            <span>> [AI_CORE] 0 Missed Alerts</span><span class="ticker-sep">|</span>
            <span>> [AGENT_04] Executing Protocols</span><span class="ticker-sep">|</span>
            <span>> [NODE_9] 100% Uptime</span>
        </div>
    </div>


    <!-- Cinematic Footer -->

      ` }} />
    </div>
  )
}
