'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import '../style.css'
import IndustrySection from '@/components/IndustrySection'

export default function CommunicationInterfacePage() {
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
        <div class="hero-content text-center">
            <span class="section-tag" style="color: var(--primary-purple);">MITHRIV COMMUNICATION INTERFACE</span>
            <h1 class="main-heading" style="font-size: 4rem; max-width: 900px; margin: 0 auto 1.5rem;">
        <span class="word-mask"><span class="word-inner w1">Security</span></span>
        <span class="word-mask"><span class="word-inner w2">That</span></span>
        <span class="word-mask"><span class="word-inner w3">Speaks.</span></span><br>
        <span class="word-mask"><span class="word-inner w4">Operations</span></span>
        <span class="word-mask"><span class="word-inner w5">That</span></span>
        <span class="word-mask"><span class="word-inner w6">Listen.</span></span>
      </h1>
            <p class="body-text award-fade-up delay-p" style="max-width: 800px; margin: 0 auto 2rem;">
                Your guards radio dispatch. Your visitors wait at kiosks. Your employees call help desks. Your systems
                stay silent. Mithriv's Communication Interface is the conversational layer that connects every
                stakeholder to your security operation—naturally, instantly, with complete audit trails.
            </p>

            <div class="comm-logos" style="margin: 3rem 0;">
                <span style="font-family: var(--font-heading); font-weight: bold;">Deloitte.</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">genpact</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">SAMSUNG</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">EY</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">AIR INDIA</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">HITACHI</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">adani</span>
                <span style="font-family: var(--font-heading); font-weight: bold;">HONDA</span>
            </div>

            <button class="ent-btn-primary" style="margin-bottom: 3rem;">Request Integration Assessment <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></button>

            <div class="comm-stats">
                <div class="stat-item">
                    <h3 class="num">3,000+</h3>
                    <p>Sites Connected</p>
                </div>
                <div class="stat-item">
                    <h3 class="num">22</h3>
                    <p>Countries</p>
                </div>
                <div class="stat-item">
                    <h3 class="num">240+</h3>
                    <p>Languages Supported</p>
                </div>
                <div class="stat-item">
                    <h3 class="num">99.99%</h3>
                    <p>Uptime</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 01: The Problem -->
    <section class="section reveal-section">
        <div class="container" style="display: flex; gap: 40px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
                <span class="section-tag" style="color: var(--accent-pink);">SECTION 01 | THE PROBLEM</span>
                <h2 class="pixel-heading" style="font-size: 2.5rem; margin-bottom: 1rem;">Your Security Operation Has a
                    Communication Crisis</h2>
                <p class="body-text" style="margin-bottom: 2rem;">Every interaction is a bottleneck. Every handoff loses
                    context. Every stakeholder speaks to a different system, or no system at all.</p>

                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1rem;">Your Security
                    Stack Has an Interface Problem</h3>
                <p class="body-text" style="margin-bottom: 1.5rem;">Security systems have become sophisticated. Access
                    control correlates with video. Analytics detect anomalies. Automation executes responses. But the
                    interface between these systems and the humans who interact with them—visitors, employees, guards,
                    executives—remains primitive.</p>

                <blockquote
                    style="border-left: 4px solid var(--primary-purple); padding-left: 20px; margin: 2rem 0; font-style: italic; color: #d1d5db;">
                    <h4
                        style="font-family: var(--font-heading); margin-bottom: 0.5rem; font-style: normal; color: #fff;">
                        The Pattern</h4>
                    Every stakeholder interaction with security creates friction. Friction creates workarounds.
                    Workarounds create gaps. Gaps become incidents. The systems are capable. The interface is broken.
                </blockquote>

                <div class="digital-readout" style="margin-bottom: 2rem;">
                    <strong>[ SYSTEM GAP DETECTED ]</strong><br><br>
                    THE VISITOR WAITS. THE GUARD RADIOS INTO SILENCE. THE EMPLOYEE GIVES UP. THE CONTRACTOR WAITS
                    LONGER. THE EXECUTIVE ASKS QUESTIONS NO ONE CAN ANSWER.
                </div>

                <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 2rem;">
                    <div class="telemetry-panel" style="padding: 20px;">
                        <div class="metric-number">74%</div>
                        <p class="body-text" style="font-size: 0.85rem; margin:0;">of security breaches trace to
                            inadequate visitor screening</p>
                    </div>
                    <div class="telemetry-panel" style="padding: 20px;">
                        <div class="metric-number">62%</div>
                        <p class="body-text" style="font-size: 0.85rem; margin:0;">of security alerts ignored due to
                            communication overload</p>
                    </div>
                    <div class="telemetry-panel" style="padding: 20px;">
                        <div class="metric-number">23%</div>
                        <p class="body-text" style="font-size: 0.85rem; margin:0;">of incident escalations caused by
                            communication failures</p>
                    </div>
                    <div class="telemetry-panel"
                        style="padding: 20px; display: flex; align-items: center; justify-content: center; text-align: center;">
                        <p class="body-text" style="font-size: 0.95rem; margin:0; color: #fff;">Average enterprise runs
                            8–12 disconnected security communication channels</p>
                    </div>
                </div>

                <div class="digital-readout" style="border-color: var(--primary-purple);">
                    <strong style="color: var(--primary-purple);">THE GAP:</strong><br>
                    Your security stack has AI for video. AI for access control. AI for threat detection. No AI for
                    communication.
                </div>
            </div>

            <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 20px;">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 10px;">The Human
                    Experience</h3>

                <div class="alert-box">
                    <span class="alert-badge">[ ALERT: VISITOR EXP ]</span>
                    <p class="body-text" style="margin: 0; font-size: 0.95rem;">A delivery driver arrives at a
                        pharmaceutical facility. The kiosk asks for a 16-digit PO number, a host name (spelling exact),
                        and a valid ID scan. The driver has a phone number for "someone in receiving." The kiosk has no
                        path forward. The driver calls the number. Voicemail. Twenty minutes later, a guard manually
                        overrides the system with a paper log entry. No safety briefing delivered. No credential linked
                        to the visit. No audit trail.</p>
                </div>

                <div class="alert-box">
                    <span class="alert-badge">[ ALERT: GUARD EXP ]</span>
                    <p class="body-text" style="margin: 0; font-size: 0.95rem;">An officer on patrol observes a door
                        propped open in a restricted corridor. She radios dispatch. No answer—the operator is handling a
                        visitor queue. She walks to the operations center to report. By the time she returns, the door
                        is closed. She writes up the incident at end of shift from memory. The report lacks camera
                        timestamps, badge data, or door sensor correlation. It exists as a paragraph in a Word document.
                    </p>
                </div>

                <div class="alert-box">
                    <span class="alert-badge">[ ALERT: EMPLOYEE EXP ]</span>
                    <p class="body-text" style="margin: 0; font-size: 0.95rem;">An engineer needs weekend access to a
                        lab for a critical project. He emails security. The request sits in a shared inbox. He follows
                        up via phone. The security coordinator is on vacation. He asks his manager to escalate. Four
                        days later, access is granted. The project deadline has passed.</p>
                </div>

                <div class="alert-box">
                    <span class="alert-badge">[ ALERT: EXECUTIVE EXP ]</span>
                    <p class="body-text" style="margin: 0; font-size: 0.95rem;">The CISO prepares for a board meeting.
                        She needs incident trends, credential compliance rates, and visitor volumes across twelve sites.
                        She requests the data from her team. Three analysts spend two weeks pulling reports from six
                        systems, normalizing formats, and building slides. The data is six weeks old by the time it's
                        presented.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 02: Communication Agents -->
    <section class="section reveal-section" style="background: rgba(15, 15, 20, 0.4);">
        <div class="container">
            <span class="section-tag text-center">SECTION 02 | COMMUNICATION AGENTS</span>
            <h2 class="pixel-heading text-center">Conversational Agents for Every Security Workflow</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">Purpose-built agents that
                understand security context, respect operational boundaries, and maintain complete audit trails. Each
                agent handles a specific domain. All agents share unified intelligence.</p>

            <div class="tabs-container vertical-tabs">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-target="agent-visitor">> [AGENT_VISITOR]</button>
                    <button class="tab-btn" data-target="agent-guard">> [AGENT_GUARD]</button>
                    <button class="tab-btn" data-target="agent-employee">> [AGENT_EMPLOYEE]</button>
                    <button class="tab-btn" data-target="agent-contractor">> [AGENT_CONTRACTOR]</button>
                    <button class="tab-btn" data-target="agent-emergency">> [AGENT_EMERGENCY]</button>
                    <button class="tab-btn" data-target="agent-executive">> [AGENT_EXECUTIVE]</button>
                </div>

                <!-- Visitor Agent Tab -->
                <div class="tab-content active" id="agent-visitor">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Visitor Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>The complete visitor journey—from
                            pre-registration to departure. Natural conversation via kiosk, mobile, or lobby tablet. No
                            training required for visitors. No bottleneck at reception.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">Lobby kiosk</span>
                                <span class="compliance-badge">Mobile web</span>
                                <span class="compliance-badge">SMS</span>
                                <span class="compliance-badge">WhatsApp</span>
                                <span class="compliance-badge">Voice</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">90-second average
                                check-in. Zero lobby queues. Complete audit trail from arrival to departure.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Pre-arrival verification and credential validation</li>
                            <li>Check-in with photo capture and badge issuance</li>
                            <li>Host notification with visitor context</li>
                            <li>NDA and compliance acknowledgment collection</li>
                            <li>Wayfinding to meeting locations</li>
                            <li>Visitor overstay detection and checkout prompts</li>
                            <li>Watchlist screening with silent escalation</li>
                        </ul>
                    </div>
                </div>

                <!-- Guard Agent Tab -->
                <div class="tab-content" id="agent-guard">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Guard Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>Hands-free operation for security
                            officers. Voice-first interface that works during patrols, at posts, and in vehicles.
                            Dispatch, documentation, and coordination without breaking stride.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">Two-way radio bridge</span>
                                <span class="compliance-badge">Mobile app</span>
                                <span class="compliance-badge">Wearable</span>
                                <span class="compliance-badge">Voice</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Guards document during
                                incidents, not after. Dispatch confirmed in seconds. Institutional knowledge persists
                                through turnover.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Shift briefings delivered to mobile or radio</li>
                            <li>Patrol verification with checkpoint confirmation</li>
                            <li>Incident reporting via voice-to-documentation</li>
                            <li>Dispatch receipt and status updates</li>
                            <li>Guard-to-guard coordination across sites</li>
                            <li>Equipment and vehicle checkout logging</li>
                            <li>Emergency protocol guidance during incidents</li>
                        </ul>
                    </div>
                </div>

                <!-- Employee Agent Tab -->
                <div class="tab-content" id="agent-employee">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Employee Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>Self-service security for the
                            workforce. Credential requests, access inquiries, and security assistance without help desk
                            tickets or phone trees.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">Microsoft Teams</span>
                                <span class="compliance-badge">Slack</span>
                                <span class="compliance-badge">Mobile app</span>
                                <span class="compliance-badge">Email</span>
                                <span class="compliance-badge">SMS</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Employees get answers in
                                seconds. Security teams handle exceptions, not routine requests.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Credential requests with automated approval routing</li>
                            <li>Access inquiries ("Can I enter the data center Saturday?")</li>
                            <li>Lost/stolen badge reporting with immediate deactivation</li>
                            <li>Escort requests for restricted areas</li>
                            <li>Security policy questions and guidance</li>
                            <li>Parking permit requests and validation</li>
                            <li>Emergency contact updates</li>
                        </ul>
                    </div>
                </div>

                <!-- Contractor Agent Tab -->
                <div class="tab-content" id="agent-contractor">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Contractor Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>Vendor and contractor coordination
                            from onboarding through project completion. Safety compliance, credential management, and
                            escort coordination unified in one conversational interface.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">Mobile web</span>
                                <span class="compliance-badge">SMS</span>
                                <span class="compliance-badge">WhatsApp</span>
                                <span class="compliance-badge">Voice</span>
                                <span class="compliance-badge">Email</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Contractors arrive
                                prepared. Escorts arrive on time. Access expires automatically.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Safety briefing delivery with comprehension verification</li>
                            <li>Credential application and status tracking</li>
                            <li>Escort request and coordination</li>
                            <li>Time-bound access provisioning</li>
                            <li>Tool and equipment authorization</li>
                            <li>Daily check-in/check-out logging</li>
                            <li>Project-based access expiration management</li>
                        </ul>
                    </div>
                </div>

                <!-- Emergency Agent Tab -->
                <div class="tab-content" id="agent-emergency">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Emergency Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>Crisis communication across all
                            stakeholders simultaneously. Mass notification, muster coordination, and emergency services
                            integration—activated instantly, documented completely.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">PA system</span>
                                <span class="compliance-badge">Mobile push</span>
                                <span class="compliance-badge">SMS</span>
                                <span class="compliance-badge">Voice</span>
                                <span class="compliance-badge">Radio</span>
                                <span class="compliance-badge">Digital signage</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">From alarm to all-clear,
                                every communication logged. Accountability achieved in minutes, not hours.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Duress code recognition and silent response</li>
                            <li>Mass notification across all channels simultaneously</li>
                            <li>Evacuation route guidance based on incident location</li>
                            <li>Muster point check-in and accountability tracking</li>
                            <li>Emergency services dispatch with location and context</li>
                            <li>All-clear broadcast and return-to-work coordination</li>
                            <li>Post-incident status collection from all personnel</li>
                        </ul>
                    </div>
                </div>

                <!-- Executive Agent Tab -->
                <div class="tab-content" id="agent-executive">
                    <div class="tab-left">
                        <h3
                            style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-purple);">
                            Executive Agent</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;"><strong
                                style="color: #fff;">What it handles:</strong><br>Security intelligence on demand for
                            leadership. Natural language queries answered with real-time data. No report requests. No
                            analyst intermediaries.</p>

                        <div style="margin-top: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 10px;">Channels:</h4>
                            <div class="badge-row" style="justify-content: flex-start; margin-top:0;">
                                <span class="compliance-badge">Web dashboard</span>
                                <span class="compliance-badge">Mobile app</span>
                                <span class="compliance-badge">Microsoft Teams</span>
                                <span class="compliance-badge">Email digest</span>
                            </div>
                        </div>

                        <div class="digital-readout" style="margin-top: 2rem; padding: 20px;">
                            <h4 style="color: #fff; margin-bottom: 5px;">Outcome:</h4>
                            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Leadership asks
                                questions, gets answers. Security becomes strategic, not reactive.</p>
                        </div>
                    </div>
                    <div class="tab-right">
                        <h4
                            style="color: #fff; margin-bottom: 15px; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 1px;">
                            [ WORKFLOWS ]</h4>
                        <ul class="tech-list">
                            <li>Incident trend queries ("How many tailgating events this quarter?")</li>
                            <li>Compliance status and audit readiness</li>
                            <li>Credential lifecycle metrics</li>
                            <li>Site comparison and benchmarking</li>
                            <li>Investigation status and timeline</li>
                            <li>Board-ready security posture summaries</li>
                            <li>Risk indicator monitoring and alerts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
      ` }} />

      <IndustrySection />

      <div dangerouslySetInnerHTML={{ __html: `
    <!-- Section 03: The Architecture -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">SECTION 03 | THE ARCHITECTURE</span>
            <h2 class="pixel-heading text-center">One Conversational Layer. Every Channel. Complete Context.</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">The Communication Interface
                sits between your stakeholders and your security operation. It understands who's asking, what they need,
                and what they're authorized to receive.</p>

            <div class="svg-arch-container" style="margin-top: 3rem;">

                <!-- Layer 8 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_8 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">Audit
                                Layer</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Decision Trace · Action Record · Immutable Logs</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 7 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_7 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">
                                Integration Fabric</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            System Commands · State Updates · Event Correlation</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 6 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_6 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">Action
                                Authorization</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Policy Evaluation · Approval Routing · Boundary Enforcement</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 5 -->
                <div class="arch-box highlight-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge" style="color: var(--primary-purple);">[ LAYER_5 ] ACTIVE</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">Domain
                                Agents</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Visitor · Guard · Employee · Contractor · Emergency · Query</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 4 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_4 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">Intent
                                Classification</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Domain Routing · Entity Extraction · Context Enrichment</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 3 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_3 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">
                                Identity Resolution</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Credential Lookup · Role Determination · Authorization Scope</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 2 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_2 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">Channel
                                Normalization</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Voice → Text · Protocol Translation · Session Binding</p>
                    </div>
                </div>
                <!-- SVG Connector -->
                <div class="arch-svg-connector">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="animated-path purple-path" d="M 125,0 C 125,50 375,50 375,100" />
                        <path class="animated-path pink-path" d="M 375,0 C 375,50 125,50 125,100" />
                        <path class="animated-path purple-path" d="M 375,0 C 375,50 625,50 625,100" />
                        <path class="animated-path pink-path" d="M 625,0 C 625,50 375,50 375,100" />
                        <path class="animated-path purple-path" d="M 625,0 C 625,50 875,50 875,100" />
                        <path class="animated-path pink-path" d="M 875,0 C 875,50 625,50 625,100" />

                        <path class="animated-path faint-path" d="M 125,0 L 125,100" />
                        <path class="animated-path faint-path" d="M 375,0 L 375,100" />
                        <path class="animated-path faint-path" d="M 625,0 L 625,100" />
                        <path class="animated-path faint-path" d="M 875,0 L 875,100" />
                    </svg>
                </div>

                <!-- Layer 1 -->
                <div class="arch-box">
                    <div class="arch-box-inner" style="padding: 25px;">
                        <span class="layer-badge">[ LAYER_1 ]</span>
                        <div class="box-title-group" style="margin-bottom: 10px; margin-top: 5px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1.4rem; color:#fff;">
                                Stakeholder Channels</h3>
                        </div>
                        <p style="color:var(--text-muted); font-size:0.95rem; margin:0; font-family:var(--font-mono);">
                            Kiosk · Mobile · Teams · Slack · Radio · Voice · SMS · Signage</p>
                    </div>
                </div>
            </div>

            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 4rem;">
                <div class="pixel-card" style="transition: all 0.3s ease;">
                    <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 10px; font-size: 1.2rem;">
                        Identity-Aware Conversation</h3>
                    <p class="body-text" style="font-size: 0.95rem; margin:0;">Every interaction begins with identity
                        resolution. The system knows if it's speaking with a pre-registered visitor, a badged employee,
                        an authorized contractor, or an executive with query privileges. Responses calibrate
                        accordingly.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease;">
                    <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 10px; font-size: 1.2rem;">
                        Context Persistence</h3>
                    <p class="body-text" style="font-size: 0.95rem; margin:0;">Conversations maintain state across
                        channels and sessions. A visitor who pre-registered via email and arrives at the kiosk isn't
                        starting over. A guard who reported an incident via radio can add details via mobile app.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease;">
                    <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 10px; font-size: 1.2rem;">
                        Action Authorization</h3>
                    <p class="body-text" style="font-size: 0.95rem; margin:0;">The Communication Interface both informs
                        and acts. But every action respects configured boundaries. Visitor badge issuance: automatic.
                        Data center access grant: requires approval. Emergency lockdown: executes immediately.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease;">
                    <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 10px; font-size: 1.2rem;">
                        Audit Completeness</h3>
                    <p class="body-text" style="font-size: 0.95rem; margin:0;">Every conversation captured. Every
                        decision logged with reasoning. Every escalation documented. Export ready for compliance, legal,
                        and insurance.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 04: Industry Applications -->
    <section class="section reveal-section" style="background: rgba(15, 15, 20, 0.4);">
        <div class="container">
            <span class="section-tag text-center">SECTION 04 | INDUSTRY APPLICATIONS</span>
            <h2 class="pixel-heading text-center">Designed for Environments Where Failure Isn't an Option</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">Generic communication tools
                don't understand matter confidentiality, HIPAA constraints, NERC CIP requirements, or TWIC verification.
                These agents do.</p>

            <div class="tabs-container">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-target="ind-law">Law Firms</button>
                    <button class="tab-btn" data-target="ind-health">Healthcare</button>
                    <button class="tab-btn" data-target="ind-critical">Critical Infrastructure</button>
                    <button class="tab-btn" data-target="ind-ports">Ports & Airports</button>
                </div>

                <!-- Law Firms -->
                <div class="tab-content active" id="ind-law">
                    <div style="display: flex; flex-direction: column; gap: 30px; width: 100%;">
                        <div class="threat-box">
                            <h4 style="color: #fff; margin-bottom: 10px;">The Confidentiality Imperative:</h4>
                            <p style="color: var(--text-muted); margin: 0; line-height: 1.6;">When a client speaks their
                                name in your lobby, attorney-client privilege is already at risk. Paper visitor logs
                                expose who has visited. Verbal check-in broadcasts client identity to anyone within
                                earshot.</p>
                        </div>
                        <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Silent Check-In</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Visitors interact via
                                    personal mobile device or private kiosk screen. No verbal announcement. Client
                                    identity transmitted directly to host.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Matter-Based Routing</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Visitor registration
                                    links to specific matters. The system routes to appropriate personnel based on
                                    matter assignment, not just host contact.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Conflict Awareness</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">When opposing counsel
                                    from an active case attempts check-in, the system routes to appropriate personnel
                                    before interaction occurs.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Discreet VIP Handling</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">High-profile clients
                                    flagged for specialized protocols. Private entrance coordination. Zero lobby
                                    exposure.</p>
                            </div>
                        </div>
                        <div class="digital-readout" style="text-align: center; border-color: #10b981;">
                            <strong style="color: #10b981;">Outcome:</strong> Client confidentiality protected from
                            first contact. Complete audit trail for ethics compliance.
                        </div>
                    </div>
                </div>

                <!-- Healthcare -->
                <div class="tab-content" id="ind-health">
                    <div style="display: flex; flex-direction: column; gap: 30px; width: 100%;">
                        <div class="threat-box">
                            <h4 style="color: #fff; margin-bottom: 10px;">The Dual Mandate:</h4>
                            <p style="color: var(--text-muted); margin: 0; line-height: 1.6;">Patient privacy under
                                HIPAA. Staff safety in an environment where 75% of workplace assaults occur.
                                Communication systems must serve both without compromise.</p>
                        </div>
                        <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Privacy-Preserving Visitor Interaction</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Patient directory
                                    opt-in status checked before information shared. Visitor identity verified against
                                    approved lists.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Unit-Specific Protocols</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">ICU, psychiatric,
                                    pediatric units have distinct policies. Agent enforces visiting hours, limits, and
                                    screening automatically.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Plain-Language Emergency</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">No color codes. Clear,
                                    actionable instructions in plain language across all channels simultaneously.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Duress Response</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Staff duress codes
                                    recognized instantly. Silent alert to security with precise location coordinated
                                    without alerting threat.</p>
                            </div>
                        </div>
                        <div class="digital-readout" style="text-align: center; border-color: #10b981;">
                            <strong style="color: #10b981;">Outcome:</strong> HIPAA compliance maintained in every
                            interaction. Staff safety enhanced through instant communication.
                        </div>
                    </div>
                </div>

                <!-- Critical Infrastructure -->
                <div class="tab-content" id="ind-critical">
                    <div style="display: flex; flex-direction: column; gap: 30px; width: 100%;">
                        <div class="threat-box">
                            <h4 style="color: #fff; margin-bottom: 10px;">The Compliance Burden:</h4>
                            <p style="color: var(--text-muted); margin: 0; line-height: 1.6;">NERC CIP mandates specific
                                communication protocols with 15-minute alert requirements and 90-day log retention.
                                Manual processes can't meet these standards consistently.</p>
                        </div>
                        <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Escort Coordination</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">CIP-006 6 R2.1
                                    requires continuous escorted access. The agent coordinates assignment, tracks
                                    handoffs, and documents custody.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Zone-Aware Communication</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Different security
                                    zones have different rules. The agent knows which channels work in which zones and
                                    routes accordingly.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">15-Minute Alert Compliance</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Unauthorized access
                                    triggers immediate notification. Timestamped delivery confirmation. Automatic
                                    escalation if unacknowledged.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Contractor Safety Verification</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Personnel Risk
                                    Assessment status verified before access. Safety briefing delivery confirmed and
                                    documented.</p>
                            </div>
                        </div>
                        <div class="digital-readout" style="text-align: center; border-color: #10b981;">
                            <strong style="color: #10b981;">Outcome:</strong> Compliance documentation generated
                            automatically. Audit preparation reduced from months to hours.
                        </div>
                    </div>
                </div>

                <!-- Ports -->
                <div class="tab-content" id="ind-ports">
                    <div style="display: flex; flex-direction: column; gap: 30px; width: 100%;">
                        <div class="threat-box">
                            <h4 style="color: #fff; margin-bottom: 10px;">The Coordination Complexity:</h4>
                            <p style="color: var(--text-muted); margin: 0; line-height: 1.6;">TSA, CBP, Coast Guard,
                                local law enforcement, port authority—each with separate systems. International
                                travelers with language barriers. Time-critical operations.</p>
                        </div>
                        <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Multilingual Visitor Interaction</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">240+ languages
                                    supported. Automatic language detection. Consistent security protocols delivered in
                                    preferred language.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">TWIC Integration</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Transportation Worker
                                    Identification Credential status verified in real time. Canceled Card List checked
                                    automatically.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Multi-Agency Coordination</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Unified communication
                                    layer bridges agency-specific systems. Incident info shared across jurisdictions
                                    without manual relay.</p>
                            </div>
                            <div class="resolved-card">
                                <h4 style="margin-bottom: 8px;">Time-Critical Gate Communication</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Gate status changes
                                    broadcast immediately to affected workers and vehicles. Automated queue management
                                    communication.</p>
                            </div>
                        </div>
                        <div class="digital-readout" style="text-align: center; border-color: #10b981;">
                            <strong style="color: #10b981;">Outcome:</strong> Language barriers eliminated. Credential
                            verification instantaneous. Multi-agency coordination simplified.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 05: Trust Architecture -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">SECTION 05 | TRUST ARCHITECTURE</span>
            <h2 class="pixel-heading text-center">Enterprise-Grade Conversation. Complete Control.</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">Security communication
                handles sensitive information, authorizes physical access, and coordinates emergency response. The
                architecture must be trustworthy at every layer.</p>

            <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Identity Verification</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Multiple authentication factors
                        available per interaction type. Integration with enterprise identity providers. Continuous
                        session verification.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Role-Based Response</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">What the system shares depends on
                        who's asking. Same question, authorized answers based on privilege level.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Action Boundaries</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Every action type has configurable
                        authorization requirements. Badge issuance: automatic. Lockdown: requires authenticated security
                        personnel.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Conversation Encryption</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">End-to-end encryption for all
                        interactions. Data encrypted at rest and in transit. Customer managed key options.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Audit Immutability</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Every conversation, every
                        decision, every action logged to immutable storage. Tampering detection. Export in standard
                        formats.</p>
                </div>
                <div class="pixel-card" style="transition: all 0.3s ease; border-color: rgba(139, 92, 246, 0.3);">
                    <h4 style="color: var(--primary-purple); margin-bottom: 10px;">Data Residency</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Regional deployment options for
                        data sovereignty. US, EU, Middle East, and APAC regions available. Air-gapped deployments
                        supported.</p>
                </div>
            </div>

            <div class="badge-row">
                <span class="compliance-badge">EU data protection requirements</span>
                <span class="compliance-badge">Annual audit, report available under NDA</span>
                <span class="compliance-badge">Certified information security management</span>
                <span class="compliance-badge">No prohibited components</span>
                <span class="compliance-badge">BAA available for healthcare deployments</span>
            </div>
        </div>
    </section>

    <!-- Section 06 & 07 & 08: Changes, Integrations, Outcomes -->
    <section class="section reveal-section" style="background: rgba(15, 15, 20, 0.4);">
        <div class="container">
            <!-- 06 -->
            <span class="section-tag text-center">SECTION 06 | WHAT CHANGES</span>
            <h2 class="pixel-heading text-center">When Security Can Communicate</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">The gap between your
                security systems and your stakeholders closes. Every interaction becomes an opportunity for security
                intelligence.</p>

            <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 5rem;">
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Identity-Aware Conversation</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Check-in takes 90 seconds. First
                        impression: this organization has its act together.</p>
                </div>
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Guards Stay in the Field</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Documentation happens during
                        incidents, not after. Dispatch confirmed without returning to operations center.</p>
                </div>
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Employees Stop Calling Help Desk</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Credential requests answered
                        immediately. Security becomes helpful, not obstructive.</p>
                </div>
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Contractors Know Where They Stand</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Escort coordination automatic.
                        Safety requirements clear. No surprises at the gate.</p>
                </div>
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Executives Get Answers</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Security posture on demand. Board
                        questions answered with data, not estimates.</p>
                </div>
                <div class="telemetry-panel" style="padding: 25px; text-align: left;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Compliance Generates Itself</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin:0;">Every interaction documented.
                        Audit preparation becomes query and export, not months of reconstruction.</p>
                </div>
            </div>

            <!-- 07 -->
            <span class="section-tag text-center">SECTION 07 | INTEGRATION</span>
            <h2 class="pixel-heading text-center">Works With Everything You Have</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">The Communication Interface
                connects to your existing security systems through the Integration Fabric. No rip and replace. No data
                silos.</p>

            <div class="tech-grid" style="margin-bottom: 5rem;">
                <div class="tech-item">
                    <h4 style="color: var(--primary-purple); margin-bottom: 20px; font-family: var(--font-mono);">[
                        COMMS ]</h4>
                    <ul class="tech-list" style="text-align: left;">
                        <li>Microsoft Teams & Slack</li>
                        <li>Cisco Webex</li>
                        <li>Mass notification (Everbridge, AlertMedia)</li>
                        <li>Two-way radios (Motorola, Kenwood)</li>
                        <li>SMS gateways & VoIP / SIP</li>
                    </ul>
                </div>
                <div class="tech-item">
                    <h4 style="color: var(--primary-purple); margin-bottom: 20px; font-family: var(--font-mono);">[
                        SYSTEMS ]</h4>
                    <ul class="tech-list" style="text-align: left;">
                        <li>Identity providers</li>
                        <li>Video management</li>
                        <li>Visitor management</li>
                        <li>Parking systems</li>
                        <li>Building management</li>
                    </ul>
                </div>
                <div class="tech-item">
                    <h4 style="color: var(--primary-purple); margin-bottom: 20px; font-family: var(--font-mono);">[
                        HARDWARE ]</h4>
                    <ul class="tech-list" style="text-align: left;">
                        <li>Lobby kiosks</li>
                        <li>Intercom stations</li>
                        <li>Digital signage</li>
                        <li>Mobile devices & Wearables</li>
                        <li>Two-way radios</li>
                    </ul>
                </div>
            </div>

            <!-- 08 -->
            <span class="section-tag text-center">SECTION 08 | TARGET OUTCOMES</span>
            <h2 class="pixel-heading text-center">What Communication Intelligence Delivers</h2>

            <div class="mithriv-table-container">
                <table class="mithriv-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Target Improvement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Visitor check-in time</td>
                            <td class="neon-cell">Minutes → 90 seconds</td>
                        </tr>
                        <tr>
                            <td>Guard documentation compliance</td>
                            <td class="neon-cell">60% → 90%+</td>
                        </tr>
                        <tr>
                            <td>Employee security request resolution</td>
                            <td class="neon-cell">Days → Minutes</td>
                        </tr>
                        <tr>
                            <td>Escort coordination time</td>
                            <td class="neon-cell">10+ minutes → Under 3 minutes</td>
                        </tr>
                        <tr>
                            <td>Emergency muster accountability</td>
                            <td class="neon-cell">Hours → Minutes</td>
                        </tr>
                        <tr>
                            <td>Compliance audit preparation</td>
                            <td class="neon-cell">Weeks → Days</td>
                        </tr>
                        <tr>
                            <td>Help desk security ticket volume</td>
                            <td class="neon-cell">40–60% reduction</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </section>

    <!-- Section 09: Deployment -->
    <section class="section reveal-section">
        <div class="container">
            <span class="section-tag text-center">SECTION 09 | DEPLOYMENT</span>
            <h2 class="pixel-heading text-center">From Assessment to Production</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 3rem;">Implementation follows a
                structured path designed for enterprise security operations.</p>

            <div class="tabs-container">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-target="phase-1">Phase 1: Assessment</button>
                    <button class="tab-btn" data-target="phase-2">Phase 2: Config</button>
                    <button class="tab-btn" data-target="phase-3">Phase 3: Pilot</button>
                    <button class="tab-btn" data-target="phase-4">Phase 4: Production</button>
                </div>

                <div class="tab-content active" id="phase-1">
                    <div style="width: 100%;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Assessment <span
                                style="color: var(--text-muted); font-size: 1rem; font-weight: normal;">(2-3
                                weeks)</span></h3>
                        <ul class="tech-list">
                            <li>Document current communication flows and pain points</li>
                            <li>Map stakeholder types and interaction patterns</li>
                            <li>Identify integration requirements</li>
                            <li>Define authorization policies and escalation paths</li>
                            <li>Establish success metrics</li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="phase-2">
                    <div style="width: 100%;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Configuration <span
                                style="color: var(--text-muted); font-size: 1rem; font-weight: normal;">(3-4
                                weeks)</span></h3>
                        <ul class="tech-list">
                            <li>Deploy Integration Fabric connections</li>
                            <li>Configure agent scopes and authorization rules</li>
                            <li>Develop site-specific conversation content (safety briefings, wayfinding)</li>
                            <li>Integrate identity systems and configure channels</li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="phase-3">
                    <div style="width: 100%;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Pilot <span
                                style="color: var(--text-muted); font-size: 1rem; font-weight: normal;">(4-6
                                weeks)</span></h3>
                        <ul class="tech-list">
                            <li>Deploy to single site or controlled stakeholder group</li>
                            <li>Parallel operation with existing processes</li>
                            <li>Collect conversation logs and failure cases</li>
                            <li>Refine based on real usage and train staff</li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="phase-4">
                    <div style="width: 100%;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Production <span
                                style="color: var(--text-muted); font-size: 1rem; font-weight: normal;">(Ongoing)</span>
                        </h3>
                        <ul class="tech-list">
                            <li>Expand to additional sites / stakeholder groups</li>
                            <li>Continuous monitoring and refinement</li>
                            <li>Regular authorization policy review</li>
                            <li>Performance optimization</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mithriv-table-container" style="margin-top: 2rem;">
                <table class="mithriv-table">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Typical Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="neon-cell" style="color: #fff !important;">Cloud</td>
                            <td>Fully managed, regional data residency options</td>
                            <td>Most enterprise deployments</td>
                        </tr>
                        <tr>
                            <td class="neon-cell" style="color: #fff !important;">Hybrid</td>
                            <td>Data plane on premises, control plane cloud</td>
                            <td>Regulated industries, data sensitivity</td>
                        </tr>
                        <tr>
                            <td class="neon-cell" style="color: #fff !important;">Air-gapped</td>
                            <td>Complete on premises, offline updates</td>
                            <td>Government, classified environments</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </section>

    <!-- Section 10 & CTA -->
    <section class="section reveal-section" style="background: rgba(15, 15, 20, 0.4);">
        <div class="container">
            <span class="section-tag text-center">SECTION 10 | HONEST POSITIONING</span>
            <h2 class="pixel-heading text-center">What the Communication Interface Is and Isn't</h2>
            <p class="body-text text-center" style="max-width: 800px; margin: 0 auto 4rem;">We believe in clear
                expectations. Here's where the Communication Interface excels and where other approaches may be more
                appropriate.</p>

            <div style="display: flex; gap: 40px; flex-wrap: wrap; margin-bottom: 4rem;">
                <div class="pixel-card"
                    style="flex: 1; min-width: 300px; padding: 40px; border-color: var(--primary-purple); box-shadow: 0 0 30px rgba(139,92,246,0.1);">
                    <h3 style="color: #fff; margin-bottom: 20px;">Where it Excels</h3>
                    <ul class="tech-list">
                        <li>High-volume visitor environments (100+ daily visitors)</li>
                        <li>Multi-site operations requiring consistent communication</li>
                        <li>Regulated industries with audit requirements</li>
                        <li>Organizations with guard forces requiring coordination</li>
                        <li>Enterprises with significant contractor populations</li>
                        <li>Facilities where communication failures have compliance or safety consequences</li>
                    </ul>
                </div>
                <div class="pixel-card" style="flex: 1; min-width: 300px; padding: 40px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">Where Other Approaches May Fit Better</h3>
                    <ul class="tech-list" style="opacity: 0.8;">
                        <li>Single-site operations with minimal visitor traffic</li>
                        <li>Organizations without existing security systems to integrate</li>
                        <li>Environments where all communication can remain purely human-mediated</li>
                        <li>Facilities without connectivity infrastructure</li>
                    </ul>
                </div>
            </div>

            <blockquote
                style="border-left: 4px solid var(--accent-pink); padding-left: 30px; margin: 0 auto 6rem; max-width: 800px; font-style: italic; color: #d1d5db; font-size: 1.1rem; line-height: 1.8;">
                <h4 style="font-family: var(--font-heading); margin-bottom: 1rem; font-style: normal; color: #fff;">The
                    Honest Tradeoff</h4>
                Conversational AI handles routine interactions exceptionally well. It frees security professionals to
                focus on judgment-intensive work. But it doesn't replace the security professional—it amplifies them.
                Organizations seeking to eliminate security staff will be disappointed. Organizations seeking to make
                their security staff more effective will see significant returns.
            </blockquote>

            <div class="cta-box text-center"
                style="padding: 60px 20px; background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%); border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 6rem;">
                <h2 class="pixel-heading" style="font-size: 3rem; margin-bottom: 1.5rem;">The Layer Your Security Stack
                    Is Missing</h2>
                <p class="body-text" style="max-width: 800px; margin: 0 auto 2.5rem; font-size: 1.1rem;">Your video
                    management has AI. Your access control has AI. Your threat detection has AI. Your communication—the
                    thread that connects every stakeholder to your security operation—has been running on manual
                    processes and fragmented channels.</p>
                <button class="ent-btn-primary">Request Communication Assessment <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></button>
            </div>

            <!-- Related Resources -->
            <div>
                <span class="section-tag">RELATED RESOURCES</span>
                <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
                    <a href="/communication-interface" class="pixel-card"
                        style="text-decoration: none; display: block; transition: all 0.3s ease;">
                        <h3 style="color: #fff; margin-bottom: 10px;">Communication Interface</h3>
                        <p style="color: var(--text-muted); margin: 0;">Conversational agents for visitors, employees,
                            and security teams. See how unified communication completes the operational picture.</p>
                    </a>
                    <a href="/intelligence-engine" class="pixel-card"
                        style="text-decoration: none; display: block; transition: all 0.3s ease;">
                        <h3 style="color: #fff; margin-bottom: 10px;">Intelligence Engine</h3>
                        <p style="color: var(--text-muted); margin: 0;">From connected data to autonomous action. How
                            Mithriv's AI layer transforms integration into intelligence.</p>
                    </a>
                </div>
            </div>

        </div>
    </section>

    <!-- Global Threat Ticker -->
    <div class="global-ticker">
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
