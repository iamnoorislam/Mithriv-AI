'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import '../style.css'

export default function IntegrationFabricPage() {
    const [mounted, setMounted] = useState(false);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Capabilities Accordion State
    const [activeCapability, setActiveCapability] = useState(0);

    const CAPABILITIES_DATA = [
        {
            id: 0,
            num: "01",
            name: "Access Control",
            desc: "The foundation of every physical security operation. Badge events, door states, reader health, access rules — all normalized into the operational model in real time.",
            whatConnects: "Genetec Synergis · HID · Lenel · S2 NetBox · Brivo · AMAG · Gallagher · Honeywell Pro-Watch · Software House · Verkada Access · OpenPath",
            keyIntegrations: [
                "Real-time badge events with credential resolution",
                "Credential lifecycle: provision, suspend, revoke"
            ]
        },
        {
            id: 1,
            num: "02",
            name: "Video Management",
            desc: "Surveillance footage gains value when correlated with operational context. The Integration Fabric links video to events, locations, and identities — automatically.",
            whatConnects: "Genetec Security Center · Milestone XProtect · Axis Camera Station · Avigilon · Verkada · Rhombus · Bosch VMS · Eagle Eye Networks",
            keyIntegrations: [
                "Automatic camera correlation on access events",
                "Clip packaging for evidence — seconds, not hours"
            ]
        },
        {
            id: 2,
            num: "03",
            name: "Visitor & Identity",
            desc: "Visitor data flows where it's needed, when it's needed. From pre-registration through departure — with complete audit trails and automatic credential expiration.",
            whatConnects: "Envoy · iLobby · Proxyclick · Traction Guest · Sign In Enterprise · Microsoft Entra ID · Okta · Workday · SailPoint · Active Directory",
            keyIntegrations: [
                "Temporary credentials tied to visit window",
                "Termination events revoke building access instantly"
            ]
        },
        {
            id: 3,
            num: "04",
            name: "Workplace Operations",
            desc: "Space utilization data adds occupancy intelligence to security. Know who should be where — and flag when reality doesn't match the booking.",
            whatConnects: "Microsoft 365 · Google Workspace · Robin · Skedda · SKIDATA · TIBA · FlashParking",
            keyIntegrations: [
                "Room booking vs badge-in correlation",
                "Vehicle permit aligned with employee status"
            ]
        },
        {
            id: 4,
            num: "05",
            name: "Building Systems",
            desc: "HVAC, elevators, lighting, and environmental controls complete the operational picture. Security response extends to infrastructure — automatically.",
            whatConnects: "Johnson Controls Metasys · Honeywell WEBs · Siemens Desigo · Schneider EcoStruxure · Tridium Niagara · BACnet · Modbus",
            keyIntegrations: [
                "Elevator recall on fire alarm — automatic",
                "Floor access policy enforced at destination dispatch"
            ]
        },
        {
            id: 5,
            num: "06",
            name: "Communication & Alerting",
            desc: "Response requires communication. The Integration Fabric connects to every channel your team uses — and routes the right information to the right person.",
            whatConnects: "Microsoft Teams · Slack · Cisco Webex · Motorola · Everbridge · AlertMedia · SMS · VoIP/SIP",
            keyIntegrations: [
                "Alert routing by role, location, and severity",
                "Radio-to-app bridging for field coordination"
            ]
        }
    ];

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
            if (w.runHeroDotCanvas02 && w.runMain && w.runIntegrationFabric && w.gsap && w.ScrollTrigger && typeof w.Lenis !== 'undefined') {
                w.runPreloader && w.runPreloader();
                w.runMain();
                w.runIntegrationFabric();
                try {
                    w.runHeroDotCanvas02();
                } catch (e) {
                    console.error("Error in runHeroDotCanvas02:", e);
                }
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
            if (w.cancelIntegrationFabric) {
                w.cancelIntegrationFabric();
            }
            if (w.cancelHeroDotCanvas02Anim) {
                w.cancelHeroDotCanvas02Anim();
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="landing-theme">
            <style id="enterprise-theme" dangerouslySetInnerHTML={{
                __html: `
        :root {
            --bg-base: #0B0D0F;
            --surface-secondary: #111315;
            --surface-card: #171A1D;

            --text-primary: #F5F7FA;
            --text-secondary: #A1A8B3;
            --text-muted: #6B7280;

            --accent-purple: #7C3AED;
            --accent-glow: rgba(124, 58, 237, 0.18);

            --border-subtle: #1A1C1E;
            --border-hover: rgba(255, 255, 255, 0.15);

            --font-main: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

            --radius-card: 0px;
            --radius-btn: 100px;
        }

        /* Base Resets for this page */
        .landing-theme {
            background-color: var(--bg-base);
            color: var(--text-secondary);
            font-family: var(--font-main);
            line-height: 1.6;
        }

        .landing-theme h1,
        .landing-theme h2,
        .landing-theme h3,
        .landing-theme h4,
        .landing-theme h5,
        .landing-theme h6 {
            color: var(--text-primary);
            font-family: var(--font-main);
            font-weight: 600;
            letter-spacing: -0.02em;
            margin: 0;
        }

        /* Typography Utilities */
        .ent-h1 {
            font-size: clamp(3rem, 6vw, 4.5rem);
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: 24px;
        }

        .ent-h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.2;
            margin-bottom: 16px;
        }

        .ent-h3 {
            font-size: 1.5rem;
            line-height: 1.3;
            margin-bottom: 12px;
        }

        .ent-p-large {
            font-size: 1.125rem;
            color: var(--text-muted);
            max-width: 600px;
            margin: 0 auto;
        }

        .ent-p {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        /* Layout & Spacing */
        @keyframes drawVerticalLine {
            from {
                height: 0;
                opacity: 0;
            }

            to {
                height: 100vh;
                opacity: 1;
            }
        }

        .landing-theme::before,
        .landing-theme::after {
            content: '';
            position: fixed;
            top: 0;
            width: 1px;
            background: #212326;
            z-index: -1;
            pointer-events: none;
            height: 100vh;
            animation: drawVerticalLine 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .landing-theme::before {
            left: calc(50% - 640px);
        }

        .landing-theme::after {
            right: calc(50% - 640px);
        }

        .os-config-section {
            position: relative;
            padding-bottom: 0 !important;
        }

        .os-config-section::before,
        .os-config-section::after {
            content: '';
            position: absolute;
            top: 0;
            width: 32px;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            background-image: repeating-linear-gradient(45deg,
                    #212326 0,
                    #212326 1px,
                    transparent 1px,
                    transparent 10px);
        }

        .os-config-section::before {
            left: calc(50% - 640px);
            border-right: 1px solid #212326;
        }

        .os-config-section::after {
            right: calc(50% - 640px);
            border-left: 1px solid #212326;
        }

        @media (max-width: 1280px) {

            body::before,
            body::after,
            .os-config-section::before,
            .os-config-section::after {
                display: none;
            }
        }

        .ent-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 32px;
        }

        .ent-section {
            padding: 120px 0;
            position: relative;
            border-bottom: 1px solid #212326;
        }

        /* Floating Enterprise Navbar */

        .ent-pill-accent {
            color: var(--accent-purple);
        }

        /* Bento Grid System */
        .ent-bento {
            display: grid;
            gap: 24px;
            grid-auto-rows: minmax(300px, auto);
            margin-top: 64px;
        }

        .ent-card {
            background: var(--surface-card);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-card);
            padding: 40px;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .ent-card:hover {
            transform: translateY(-4px);
            border-color: var(--border-hover);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        /* Abstract Backgrounds */
        .ent-bg-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
                linear-gradient(var(--border-subtle) 1px, transparent 1px),
                linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.5;
            mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 70%);
            -webkit-mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
        }

        /* Architecture Timeline */
        .ent-timeline {
            position: relative;
            max-width: 800px;
            margin: 64px auto 0;
        }

        .ent-timeline-line {
            position: absolute;
            left: 40px;
            top: 0;
            bottom: 0;
            width: 1px;
            background: linear-gradient(to bottom, transparent, var(--border-subtle) 10%, var(--border-subtle) 90%, transparent);
        }

        .ent-layer {
            position: relative;
            padding-left: 100px;
            margin-bottom: 48px;
        }

        .ent-layer-node {
            position: absolute;
            left: 36px;
            /* 40px - 4px radius */
            top: 24px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--surface-secondary);
            border: 1px solid var(--border-hover);
            z-index: 2;
        }

        .ent-layer-node.active {
            background: var(--accent-purple);
            box-shadow: 0 0 16px var(--accent-glow);
            border-color: var(--accent-purple);
        }

        .ent-layer-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: block;
        }

        /* Utility */
        .text-center {
            text-align: center;
        }

        .col-span-2 {
            grid-column: span 2;
        }

        .row-span-2 {
            grid-row: span 2;
        }

        @media (max-width: 900px) {

            .col-span-2,
            .row-span-2 {
                grid-column: span 1;
                grid-row: span 1;
            }

            .ent-bento {
                grid-template-columns: 1fr;
            }

            .ent-layer {
                padding-left: 0;
                margin-top: 32px;
            }

            .ent-timeline-line,
            .ent-layer-node {
                display: none;
            }
        }

        /* Editorial Layout */
        .editorial-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: start;
            position: relative;
        }

        .sticky-col {
            position: sticky;
            top: 100px;
            padding-bottom: 24px;
        }

        .staggered-col {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-top: 80px;
            padding-bottom: 120px;
        }

        /* Live Intelligence Modules */
        .module-card {
            background: #161718;
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid #212326;
            border-radius: 0px;
            padding: 40px;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease;
        }

        .module-card:hover {
            transform: translateY(-8px);
            background: #212326;
            border-color: #212326;
        }

        .module-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 16px;
            margin-bottom: 24px;
        }

        .module-label {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .module-status {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--text-muted);
        }

        .status-dot.active {
            background: #10B981;
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        .status-dot.error {
            background: #EF4444;
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }

        /* Atmospheric Background */
        .atmospheric-bg {
            position: absolute;
            top: -10%;
            left: -10%;
            right: -10%;
            bottom: -10%;
            background: radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 50%);
            z-index: 0;
            pointer-events: none;
        }

        /* OS Configuration Panel */
        .os-panel-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            align-items: stretch;
            border-top: 1px solid #212326;
        }

        .os-nav-cards {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 64px;
        }

        .os-nav-card {
            background: transparent;
            border: 1px solid #212326;
            border-radius: 0px;
            padding: 32px;
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease;
            overflow: hidden;
        }

        .os-nav-card.active {
            background: #161718;
        }

        .os-nav-card:hover {
            background: #212326;
            border-color: #212326;
        }

        .os-nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .os-nav-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #fff;
            margin: 0;
            transition: margin 0.3s ease;
        }

        .os-item-icon {
            font-family: var(--font-mono);
            font-size: 1rem;
            color: var(--text-muted);
            transition: transform 0.3s ease, color 0.3s ease;
        }

        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(12px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .os-nav-content {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), margin 0.3s ease;
        }

        .os-nav-content>* {
            opacity: 0;
        }

        .os-nav-card.active .os-nav-header {
            margin-bottom: 16px;
        }

        .os-nav-card.active .os-nav-content {
            max-height: 200px;
            opacity: 1;
        }

        .os-nav-card.active .os-nav-content>* {
            animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.1s;
        }

        .os-nav-card.active .os-item-icon {
            transform: rotate(90deg);
            color: var(--accent-purple);
        }

        .os-nav-text {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0 0 24px 0;
        }

        .os-dashboard {
            background: transparent;
            border: none;
            border-left: 1px solid #212326;
            padding: 64px;
            border-radius: 0px;
            position: sticky;
            top: 120px;
            box-shadow: none;
        }

        .os-dash-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            margin-bottom: 32px;
        }

        .os-metric-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 40px;
        }

        .os-metric-box {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .os-metric-value {
            font-family: var(--font-mono);
            font-size: 1.5rem;
            color: var(--text-primary);
        }

        .os-graph {
            height: 180px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            position: relative;
            overflow: hidden;
            margin-top: 16px;
        }

        @keyframes sweepIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes drawLine {
            to {
                stroke-dashoffset: 0;
            }
        }

        .os-svg-graph {
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        .graph-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
        }

        .os-svg-graph.animate {
            animation: sweepIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .os-svg-graph.animate .graph-line {
            animation: drawLine 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.2s;
        }

        /* Integration Explorer Section CSS */
        .explorer-panel-container {
            display: grid;
            grid-template-columns: 380px 1fr;
            gap: 0;
            align-items: stretch;
            border: 1px solid #212326;
            background: rgba(17, 19, 21, 0.2);
            margin-top: 40px;
        }

        .explorer-nav {
            display: flex;
            flex-direction: column;
            border-right: 1px solid #212326;
            background: rgba(17, 19, 21, 0.4);
        }

        .explorer-row {
            border-bottom: 1px solid #212326;
            cursor: pointer;
            transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 24px;
            display: flex;
            align-items: center;
            position: relative;
            background: transparent;
            outline: none;
            border-left: 2px solid transparent;
        }

        .explorer-row:last-child {
            border-bottom: none;
        }

        .explorer-row:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        .explorer-row:focus-visible {
            background: #212326;
            border-left-color: rgba(124, 58, 237, 0.4);
        }

        .explorer-row.active {
            background: rgba(124, 58, 237, 0.04);
            border-left-color: var(--accent-purple);
        }

        .explorer-row-inner {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 20px;
        }

        .explorer-index {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-muted);
            min-width: 28px;
            transition: color 0.2s ease;
        }

        .explorer-row.active .explorer-index {
            color: var(--accent-purple);
        }

        .explorer-row-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
            white-space: normal;
        }

        .explorer-title {
            font-family: var(--font-main);
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-primary);
            transition: color 0.2s ease;
        }

        .explorer-row.active .explorer-title {
            color: #fff;
        }

        .explorer-desc {
            font-family: var(--font-main);
            font-size: 0.75rem;
            color: var(--text-muted);
        }

        .explorer-indicator {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: transparent;
            transition: all 0.3s ease;
            margin-left: auto;
            flex-shrink: 0;
        }

        .explorer-row.active .explorer-indicator {
            background: var(--accent-purple);
            box-shadow: 0 0 8px var(--accent-purple), 0 0 16px var(--accent-purple);
        }

        .explorer-detail {
            padding: 64px;
            background: rgba(11, 13, 15, 0.1);
            position: relative;
            min-height: 580px;
        }

        .explorer-detail-content {
            opacity: 1;
            transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .explorer-detail-content.transitioning {
            opacity: 0;
            transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .explorer-detail-content>* {
            transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                filter 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
            will-change: transform, opacity, filter;
        }

        .explorer-detail-content.transitioning>* {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(12px);
            transition: none !important;
        }

        /* Staggered entry sequence for ultimate premium feel */
        .explorer-detail-content:not(.transitioning) .explorer-meta {
            transition-delay: 0ms;
        }

        .explorer-detail-content:not(.transitioning) .explorer-headline {
            transition-delay: 40ms;
        }

        .explorer-detail-content:not(.transitioning) .explorer-description {
            transition-delay: 80ms;
        }

        .explorer-detail-content:not(.transitioning) .explorer-sublabel:nth-of-type(1),
        .explorer-detail-content:not(.transitioning) .explorer-tags-container {
            transition-delay: 120ms;
        }

        .explorer-detail-content:not(.transitioning) .explorer-sublabel:nth-of-type(2),
        .explorer-detail-content:not(.transitioning) .explorer-flows-grid {
            transition-delay: 160ms;
        }

        .explorer-detail-content:not(.transitioning) .explorer-why-box {
            transition-delay: 200ms;
        }

        .explorer-meta {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--accent-purple);
            letter-spacing: 0.1em;
            text-transform: uppercase;
            display: block;
            margin-bottom: 20px;
        }

        .explorer-headline {
            font-size: 2.25rem;
            font-weight: 600;
            line-height: 1.15;
            color: var(--text-primary);
            margin-bottom: 20px;
            letter-spacing: -0.02em;
        }

        .explorer-description {
            font-family: var(--font-main);
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin-bottom: 40px;
        }

        .explorer-sublabel {
            font-family: var(--font-mono);
            font-size: 0.72rem;
            color: var(--text-muted);
            display: block;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .explorer-tags-container {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .explorer-tag {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-secondary);
            background: #212326;
            border: 1px solid #212326;
            padding: 5px 10px;
            border-radius: 0px;
            transition: all 0.2s ease;
        }

        .explorer-tag:hover {
            border-color: rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.06);
            color: var(--text-primary);
        }

        .explorer-flows-grid {
            list-style: none;
            padding: 0;
            margin: 0 0 40px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px 24px;
        }

        .explorer-flow-item {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-secondary);
            display: flex;
            align-items: flex-start;
            gap: 10px;
            line-height: 1.4;
        }

        .explorer-flow-bullet {
            color: var(--accent-purple);
            flex-shrink: 0;
            user-select: none;
        }

        .explorer-why-box {
            border-top: 1px solid #212326;
            padding-top: 32px;
        }

        .explorer-why-text {
            font-family: var(--font-main);
            font-size: 0.92rem;
            line-height: 1.65;
            color: var(--text-primary);
            border-left: 2px solid var(--accent-purple);
            padding-left: 20px;
            margin: 0;
        }

        .keyboard-hint {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            color: var(--text-muted);
            padding: 16px 24px;
            border-top: 1px solid #212326;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        @media (max-width: 1024px) {
            .explorer-panel-container {
                grid-template-columns: 1fr;
            }

            .explorer-nav {
                border-right: none;
                border-bottom: 1px solid #212326;
                flex-direction: row;
                overflow-x: auto;
                padding: 0;
                white-space: nowrap;
                scrollbar-width: none;
            }

            .explorer-nav::-webkit-scrollbar {
                display: none;
            }

            .explorer-row {
                border-bottom: none;
                border-right: 1px solid #212326;
                padding: 16px 20px;
                flex: 0 0 auto;
                border-left: none;
                border-bottom: 2px solid transparent;
            }

            .explorer-row:last-child {
                border-right: none;
            }

            .explorer-row.active {
                border-bottom-color: var(--accent-purple);
                border-left-color: transparent;
            }

            .explorer-row-inner {
                gap: 12px;
            }

            .explorer-indicator {
                display: none;
            }

            .explorer-detail {
                padding: 40px 24px;
                min-height: auto;
            }

            .explorer-flows-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .keyboard-hint {
                display: none;
            }
        }

        @media (max-width: 1024px) {
            .os-panel-container {
                grid-template-columns: 1fr;
            }

            .os-dashboard {
                position: relative;
                top: 0;
            }
        }

        /* SECTION 5: How It Works / Architecture Stack */

        /* Tab Switcher */
        .arch-tabs-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            border-bottom: 1px solid var(--border-subtle);
            max-width: 500px;
            margin: 0 auto 64px;
            padding-bottom: 16px;
        }

        .arch-toggle-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-family: var(--font-mono);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            padding: 8px 16px;
            position: relative;
            transition: color 0.3s ease;
        }

        .arch-toggle-btn:hover {
            color: var(--text-primary);
        }

        .arch-toggle-btn.active {
            color: var(--accent-purple);
        }

        

        

        /* Tab Contents wrapper */
        .arch-tab-panel {
            display: none;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .arch-tab-panel.active {
            display: block;
            opacity: 1;
        }

        
        /* Diagonal Edge Lines for Section 5 */
        .arch-section-bg::before, .arch-section-bg::after {
            content: ''; position: absolute; top: 320px; width: 32px; height: calc(100% - 320px);
            z-index: 0; pointer-events: none;
            background-image: repeating-linear-gradient(45deg, #212326 0, #212326 1px, transparent 1px, transparent 10px);
        }
        .arch-section-bg::before { left: calc(50% - 640px); border-right: 1px solid #212326; }
        .arch-section-bg::after { right: calc(50% - 640px); border-left: 1px solid #212326; }



        
        /* Toggle Switch Pill (Pricing Style) */
        .arch-toggle-container {
            display: inline-flex;
            background: rgba(20, 22, 25, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 100px;
            padding: 6px;
            border: 1px solid #212326;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            position: relative;
            z-index: 1;
        }
        .arch-toggle-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            font-weight: 500;
            padding: 10px 28px;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .arch-toggle-btn:hover {
            color: var(--text-primary);
        }
        .arch-toggle-btn.active {
            background: rgba(255,255,255,0.12);
            color: var(--text-primary);
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }

        
        /* The Operational Intelligence Stack - Bento Grid */
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-auto-rows: 360px;
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 64px 32px;
        }

        .bento-card {
            background: rgba(14, 15, 17, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            transition: all 0.4s ease;
            box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }

        .bento-card:hover {
            border-color: #212326;
            background: rgba(20, 22, 25, 0.8);
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        /* Card Spans */
        .bento-card.span-2 { grid-column: span 3; }
        .bento-card.span-1 { grid-column: span 2; }

        /* Bento Graphic Area */
        .bento-graphic {
            flex: 1;
            position: relative;
            border-bottom: 1px solid #212326;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at top right, rgba(255,255,255,0.02) 0%, transparent 60%);
        }

        /* Bento Content Area */
        .bento-content {
            padding: 24px 32px;
            background: rgba(10, 10, 12, 0.4);
            height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .bento-layer-label {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent-purple);
            letter-spacing: 0.05em;
            text-transform: uppercase;
            display: block;
            margin-bottom: 8px;
        }

        .bento-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0 0 8px 0;
            letter-spacing: -0.01em;
        }

        .bento-desc {
            font-size: 14px;
            line-height: 1.5;
            color: var(--text-secondary);
            margin: 0;
        }
        
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
            .bento-grid {
                grid-template-columns: 1fr;
                grid-auto-rows: auto;
            }
            .bento-card.span-2, .bento-card.span-1 {
                grid-column: span 1;
                min-height: 320px;
            }
        }
    
        /* Section 6: Operational Scenarios */
        .scenarios-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 64px 32px;
        }

        .scenario-col {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .scenario-header {
            font-family: var(--font-mono);
            font-size: 14px;
            color: #f43f5e;
            margin-bottom: 16px;
            letter-spacing: 0.05em;
        }

        .scenario-event {
            padding: 4px 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .scenario-time {
            font-family: var(--font-mono);
            font-size: 10px;
            color: #10b981;
            font-weight: 600;
        }

        .scenario-text {
            font-size: 10px;
            line-height: 1.6;
            color: var(--text-secondary);
            font-family: var(--font-mono);
        }

        .scenario-event.legacy {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px dashed rgba(244, 63, 94, 0.3);
        }

        .scenario-event.legacy .scenario-time {
            color: #f43f5e;
        }

        .scenario-divider {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #10b981;
            font-size: 16px;
            font-family: var(--font-mono);
        }

        @media (max-width: 1024px) {
            .scenarios-grid {
                grid-template-columns: 1fr;
            }
        }
    
        /* SECTION 06: Scenarios (Integration in Action) */
        /* scenario-tab CSS removed - now using os-nav-card styling */
        
        .term-time { color: #10b981; margin-bottom: 8px; display: block; font-weight: 500; }
        .term-msg { background: #212326; padding: 12px 16px; border-radius: 8px; color: #e5e7eb; margin-bottom: 16px; line-height: 1.5; }
        .term-corr { color: #fbbf24; margin-bottom: 12px; display: block; text-align: center; }
        .term-flow { display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(255,255,255,0.02); padding: 16px; border-radius: 8px; color: #e5e7eb; text-align: center; border: 1px solid #212326; }
        .term-arrow { color: #10b981; }

        /* SECTION 07: Ripple Effect */
        .ripple-section {
            position: relative;
            height: 80vh;
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0f1012;
            overflow: hidden;
            border-top: 1px solid #212326;
        }

        .ripple-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            -webkit-mask-image: linear-gradient(to bottom, white, transparent);
            mask-image: linear-gradient(to bottom, white, transparent);
            user-select: none;
        }

        .ripple-circle {
            position: absolute;
            border-radius: 50%;
            border: 1px solid #fff; /* borderColor: var(--foreground) */
            background: rgba(255, 255, 255, 0.25); /* bg-foreground/25 */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-xl */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            animation: animate-ripple 2s ease-in-out infinite alternate;
        }

        @keyframes animate-ripple {
            0% { transform: translate(-50%, -50%) scale(0.92); }
            100% { transform: translate(-50%, -50%) scale(1.08); }
        }

        .ripple-c0 { width: 350px; height: 350px; opacity: 0.24; animation-delay: 0s; }
        .ripple-c1 { width: 500px; height: 500px; opacity: 0.21; animation-delay: 0.06s; }
        .ripple-c2 { width: 650px; height: 650px; opacity: 0.18; animation-delay: 0.12s; }
        .ripple-c3 { width: 800px; height: 800px; opacity: 0.15; animation-delay: 0.18s; }
        .ripple-c4 { width: 950px; height: 950px; opacity: 0.12; animation-delay: 0.24s; }
        .ripple-c5 { width: 1100px; height: 1100px; opacity: 0.09; animation-delay: 0.30s; }
        .ripple-c6 { width: 1250px; height: 1250px; opacity: 0.06; animation-delay: 0.36s; }
        .ripple-c7 { width: 1400px; height: 1400px; opacity: 0.03; animation-delay: 0.42s; }

        .ripple-text {
            font-size: 4rem;
            color: #fff;
            z-index: 10;
            font-weight: 500;
            letter-spacing: -0.03em;
            position: relative;
        }

        @keyframes slide-diagonal-bg {
          from { background-position: 0 0; }
          to { background-position: 8.485px 0; }
        }
        .feature-col-divider {
          background: #212326 !important;
        }
        .feature-col-item .fig-label {
          letter-spacing: 0 !important;
          text-transform: none !important;
        }
        .problem-split-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          background: transparent;
          border-top: 1px solid #212326;
          border-bottom: 1px solid #212326;
          border-left: 1px solid #212326;
          border-right: 1px solid #212326;
          margin-top: 4rem;
          width: 100%;
        }

        .problem-split-left {
          grid-column: span 2;
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          opacity: 1;
        }

        #problem .fig-svg-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px 12px 28px 12px;
          width: 100%;
          margin-bottom: 20px;
        }

        #problem .fig-svg-wrap svg {
          max-width: 90% !important;
          height: auto !important;
          max-height: 180px !important;
        }

        #problem .feature-col-item {
          min-height: 480px;
          padding: 56px 32px 60px 32px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        #problem .problem-split-right {
          grid-column: span 2;
          padding: 3rem 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          opacity: 1;
        }

        #problem .problem-split-right svg {
          max-width: 94% !important;
          height: auto !important;
        }

        #problem .features-scroll-grid {
          margin-top: 0;
          border-top: none;
        }

        .metrics-horizontal-row-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0px !important;
          text-align: left;
        }

        .metric-col {
          padding: 0 2.5rem;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .problem-split-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            margin: 40px 0 60px 0 !important;
            border-bottom: none !important;
          }
          .problem-split-left {
            grid-column: span 1 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .problem-split-right {
            grid-column: span 1 !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }
          .problem-split-grid .feature-col-divider {
            display: none !important;
          }
          #problem .features-scroll-grid {
            border-top: 1px solid #212326 !important;
            margin-top: 4rem !important;
          }
        }

        @media (max-width: 768px) {
          .metrics-horizontal-row-4col {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 40px !important;
          }
          .metric-col {
            padding: 0 !important;
          }
        }

        @media (max-width: 640px) {
          #problem {
            padding: 140px 0 !important;
          }
          #problem > div {
            padding: 0 40px !important;
          }
        }

      ` }} />

            {/* Global Texture overlays */}
            <div className="global-grid-bg" id="globalGridBg"></div>
            <div className="grain-overlay"></div>

            {/* HERO SECTION */}
            <main className="hero-section" id="hero" style={{ paddingTop: '200px', paddingBottom: '120px', position: 'relative', overflow: 'hidden' }}>
                {/* Interactive Repelling Dot-Grid Matrix Background with Radial Fade-out Mask */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)',
                    maskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 45%, black 85%)'
                }}>
                    <canvas id="heroDotCanvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
                </div>

                {/* Hero Content */}
                <div className="hero-content" style={{ position: 'relative', zIndex: 10, marginTop: '0' }}>
                    <div className="ent-pill award-pill">✦ Core Infrastructure</div>

                    <h1 className="main-heading" style={{ fontSize: 'clamp(40px, 4.2vw, 64px)', margin: '0 0 1.5rem', lineHeight: 1.15, cursor: 'default' }}>
                        <span className="word-mask"><span className="word-inner w1">Every</span></span>{' '}
                        <span className="word-mask"><span className="word-inner w2">security</span></span>{' '}
                        <span className="word-mask"><span className="word-inner w3">system.</span></span><br />
                        <span className="word-mask"><span className="word-inner w4">One</span></span>{' '}
                        <span className="word-mask"><span className="word-inner w5">operational</span></span>{' '}
                        <span className="word-mask"><span className="word-inner w6">model.</span></span>
                    </h1>

                    <p className="body-text award-fade-up delay-p" style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
                        Your cameras, access control, and visitor systems already generate data. Mithriv's Integration Fabric connects them into a unified layer, without replacing what works.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#" className="ent-btn-primary award-fade-up delay-btn" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>Request Assessment <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6" /></svg></a>
                        <a href="#" className="ent-btn-secondary award-fade-up delay-btn" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', backdropFilter: 'none', WebkitBackdropFilter: 'none', transform: 'translateZ(0)', position: 'relative', zIndex: 20 }}>
                            View Documentation
                        </a>
                    </div>
                </div>

                {/* Customer Logos */}
                <div className="relative w-full max-w-[1280px] mx-auto px-6 z-10 award-fade-up delay-strip" style={{ paddingTop: '140px', paddingBottom: '40px', marginTop: 'auto' }}>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes custom-marquee {
                      0% { transform: translateX(0%); }
                      100% { transform: translateX(-100%); }
                    }
                  `}} />
                    <div className="text-center" style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Trusted by these companies</h2>
                    </div>

                    <div className="relative flex overflow-hidden w-full group">
                        <div className="flex overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                            {[0, 1].map((marqueeIdx) => (
                                <div key={marqueeIdx} className="flex shrink-0 items-center justify-start w-max" style={{ gap: '3.5rem', minWidth: '100%', paddingRight: '3.5rem', animation: 'custom-marquee 15s linear infinite' }}>
                                    {[0, 1].map((repeatIdx) => (
                                        <React.Fragment key={repeatIdx}>
                                            <div className="text-[#fff] font-bold text-2xl whitespace-nowrap flex-shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                                                <span style={{ letterSpacing: '-0.05em' }}>NEXT<span className="text-[#888]">.</span></span>
                                            </div>
                                            <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                <svg width="28" height="28" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB"><circle cx="0" cy="0" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>
                                                React
                                            </div>
                                            <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
                                                shadcn/ui
                                            </div>
                                            <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 12h10v10l10-10H12V2z" /></svg>
                                                supabase
                                            </div>
                                            <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path><path d="M4 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2"></path></svg>
                                                tailwindcss
                                            </div>
                                            <div className="text-[#fff] font-semibold text-xl whitespace-nowrap flex-shrink-0 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z" /></svg>
                                                Vercel
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Section 2: The Fragmentation Problem */}
            <section
                className="section sec-ai-agents reveal-section"
                id="problem"
                style={{
                    position: 'relative',
                    background: 'transparent',
                    color: '#ffffff',
                    width: '100%',
                    padding: '140px 0',
                    overflow: 'hidden'
                }}
            >
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '24px' }}>
                        <span className="ent-pill" style={{ marginBottom: '0px' }}>THE FRAGMENTATION PROBLEM</span>
                    </div>
                    <h2 className="std-section-h2 text-center" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: '1.1', marginBottom: '24px' }}>Your security stack is speaking in silos</h2>
                    <p className="std-section-subheading text-center" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '14px', lineHeight: '1.6', color: '#B6B6B7', fontFamily: 'var(--font-mono)' }}>
                        Your operation generates millions of data points daily. None of it is connected. All of it requires a human to bridge the gap.
                    </p>

                    {/* Contrast split layout with high-tech animated SVG diagram */}
                    <div className="problem-split-grid">
                        <div className="feature-col-divider" style={{ left: '50%' }}></div>
                        <div className="problem-split-left">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* 4 SEC_OP Bullet Points */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#EA49B2', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(234, 73, 178, 0.3)', padding: '2px 6px' }}>SEC_OP_A</span>
                                        <span style={{ width: '4px', height: '4px', backgroundColor: '#EA49B2', borderRadius: '50%' }}></span>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>UNLINKED</span>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                                        Your access control has 47,000 badge events.
                                    </h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#FCE545', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(252, 229, 69, 0.3)', padding: '2px 6px' }}>SEC_OP_B</span>
                                        <span style={{ width: '4px', height: '4px', backgroundColor: '#FCE545', borderRadius: '50%' }}></span>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ISOLATED</span>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                                        Your VMS has 2.3 terabytes of footage.
                                    </h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#4993E3', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(73, 147, 227, 0.3)', padding: '2px 6px' }}>SEC_OP_C</span>
                                        <span style={{ width: '4px', height: '4px', backgroundColor: '#4993E3', borderRadius: '50%' }}></span>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>STANDALONE</span>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                                        Your visitor system has 340 check-ins.
                                    </h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#E44856', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(228, 72, 86, 0.3)', padding: '2px 6px' }}>SEC_OP_D</span>
                                        <span style={{ width: '4px', height: '4px', backgroundColor: '#E44856', borderRadius: '50%' }}></span>
                                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>LATENCY</span>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', lineHeight: '1.2' }}>
                                        Yet a single alert still takes four platforms, six browser tabs, and twelve minutes to investigate.
                                    </h3>
                                </div>

                                {/* Bottom Verdict Line */}
                                <div style={{
                                    margin: '20px -2.5rem -3.5rem -2.5rem',
                                    padding: '30px 2.5rem 3rem 2.5rem',
                                    borderTop: '1px solid #212326',
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8.485\' height=\'8.485\' viewBox=\'0 0 8.5 8.5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-2 -2L10.5 10.5M6.5 -2L10.5 2M-2 6.5L2 10.5\' stroke=\'%23ffffff\' stroke-opacity=\'0.08\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                                    animation: 'slide-diagonal-bg 0.5s linear infinite'
                                }}>
                                    <p style={{ fontSize: '22px', lineHeight: '1.5', fontWeight: 400, color: '#B6B6B7', letterSpacing: '-0.01em', margin: 0, position: 'relative', zIndex: 1 }}>
                                        The systems are capable. <span style={{ color: '#E44856', fontWeight: 600 }}>The connections aren't.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="problem-split-right">
                            {/* Isometric 8 Disconnected Systems SVG */}
                            <svg viewBox="0 0 400 330" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <style>{`
                  @keyframes pulse-ring-err {
                    0% { transform: scale(0.95); opacity: 0; }
                    50% { opacity: 0.35; }
                    100% { transform: scale(1.3); opacity: 0; }
                  }
                  @keyframes blink-led-red {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                  }
                  @keyframes dash-flow {
                    0% { stroke-dashoffset: 20; }
                    100% { stroke-dashoffset: 0; }
                  }
                  .blink-led-red {
                    animation: blink-led-red 1.2s infinite alternate;
                  }
                  .broken-dash-line {
                    stroke-dasharray: 4, 6;
                    animation: dash-flow 2s infinite linear;
                  }
                `}</style>

                                {/* BACKGROUND ISOMETRIC FLOOR GRID */}
                                <g opacity="0.08">
                                    {[-4, -2, 0, 2, 4].map(i => {
                                        const x1 = 200 + i * 30 * 0.866 - 160 * 0.866;
                                        const y1 = 160 + i * 30 * 0.5 - 160 * 0.5;
                                        const x2 = 200 + i * 30 * 0.866 + 160 * 0.866;
                                        const y2 = 160 + i * 30 * 0.5 + 160 * 0.5;
                                        return <line key={`x-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E44856" strokeWidth="0.4" strokeDasharray="1, 8" />;
                                    })}
                                    {[-4, -2, 0, 2, 4].map(i => {
                                        const x1 = 200 - 160 * 0.866 + i * 30 * 0.866;
                                        const y1 = 160 + 160 * 0.5 + i * 30 * 0.5;
                                        const x2 = 200 + 160 * 0.866 + i * 30 * 0.866;
                                        const y2 = 160 - 160 * 0.5 + i * 30 * 0.5;
                                        return <line key={`y-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E44856" strokeWidth="0.4" strokeDasharray="1, 8" />;
                                    })}
                                </g>

                                {/* BROKEN DISCONNECTED WIRES BETWEEN 8 SYSTEMS */}
                                <path d="M130,55 L200,40" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M200,40 L270,55" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M95,110 L130,55" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M95,110 L200,125" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M200,125 L305,110" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M270,55 L305,110" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M95,110 L130,195" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M130,195 L200,125" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M200,125 L270,195" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />
                                <path d="M305,110 L270,195" stroke="#E44856" strokeWidth="1" className="broken-dash-line" opacity="0.6" />

                                {/* BROKEN CROSS MARKS ON CONNECTIONS */}
                                {[[165, 47.5], [235, 47.5], [112.5, 82.5], [147.5, 117.5], [252.5, 117.5], [287.5, 82.5], [112.5, 152.5], [165, 160], [235, 160], [287.5, 152.5]].map(([cx, cy], idx) => (
                                    <g key={idx} transform={`translate(${cx}, ${cy})`}>
                                        <circle cx="0" cy="0" r="4" fill="#0c0d0f" stroke="#E44856" strokeWidth="0.8" />
                                        <line x1="-1.5" y1="-1.5" x2="1.5" y2="1.5" stroke="#E44856" strokeWidth="1" />
                                        <line x1="1.5" y1="-1.5" x2="-1.5" y2="1.5" stroke="#E44856" strokeWidth="1" />
                                    </g>
                                ))}

                                {/* 8 ISOMETRIC 3D SYSTEM BLOCKS */}
                                {[
                                    { id: 'vms', name: 'VMS', sub: 'CCTV Feeds', x: 130, y: 55 },
                                    { id: 'acs', name: 'ACS', sub: 'Badge Access', x: 200, y: 40 },
                                    { id: 'iam', name: 'HR / IAM', sub: 'User Directory', x: 270, y: 55 },
                                    { id: 'visitor', name: 'VISITOR', sub: 'Kiosks', x: 95, y: 110 },
                                    { id: 'siem', name: 'SIEM', sub: 'Log Server', x: 200, y: 125 },
                                    { id: 'dispatch', name: 'DISPATCH', sub: 'Radios', x: 305, y: 110 },
                                    { id: 'alerts', name: 'ALERTS', sub: 'Intrusion', x: 130, y: 195 },
                                    { id: 'analytics', name: 'ANALYTICS', sub: 'AI Cameras', x: 270, y: 195 },
                                ].map((sys) => {
                                    const isHovered = hoveredNode === sys.id;
                                    return (
                                        <g
                                            key={sys.id}
                                            onMouseEnter={() => setHoveredNode(sys.id)}
                                            onMouseLeave={() => setHoveredNode(null)}
                                            style={{
                                                cursor: 'pointer',
                                                transformOrigin: `${sys.x}px ${sys.y}px`,
                                                transform: isHovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
                                                transition: 'transform 0.3s ease, filter 0.3s ease',
                                                filter: isHovered ? 'drop-shadow(0px 0px 10px rgba(228, 72, 86, 0.8))' : 'none'
                                            }}
                                        >
                                            {/* Top Face */}
                                            <polygon points={`${sys.x},${sys.y + 24} ${sys.x - 36},${sys.y} ${sys.x},${sys.y - 24} ${sys.x + 36},${sys.y}`} fill={isHovered ? 'rgba(228, 72, 86, 0.2)' : 'rgba(20, 20, 28, 0.95)'} stroke={isHovered ? '#E44856' : 'rgba(228, 72, 86, 0.4)'} strokeWidth="0.8" />
                                            {/* Left Face */}
                                            <polygon points={`${sys.x},${sys.y + 24} ${sys.x - 36},${sys.y} ${sys.x - 36},${sys.y + 12} ${sys.x},${sys.y + 36}`} fill="#0F0F16" stroke="rgba(228, 72, 86, 0.15)" strokeWidth="0.5" />
                                            {/* Right Face */}
                                            <polygon points={`${sys.x},${sys.y + 24} ${sys.x},${sys.y + 36} ${sys.x + 36},${sys.y + 12} ${sys.x + 36},${sys.y}`} fill="#0A0A0F" stroke="rgba(228, 72, 86, 0.15)" strokeWidth="0.5" />
                                            {/* System Details */}
                                            <g transform={`matrix(0.866, 0.5, -0.866, 0.5, ${sys.x}, ${sys.y})`}>
                                                <circle cx="-16" cy="16" r="1.2" fill="#E44856" className="blink-led-red" />
                                                <text x="0" y="-2" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">{sys.name}</text>
                                                <text x="0" y="7" fontFamily="var(--font-mono), monospace" fontSize="5.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">{sys.sub}</text>
                                            </g>
                                        </g>
                                    );
                                })}

                                {/* BOTTOM READOUT LABEL */}
                                <text
                                    x="200"
                                    y="275"
                                    fontFamily="var(--font-mono), monospace"
                                    fontSize="8"
                                    fill="#E44856"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                    style={{ letterSpacing: '2px' }}
                                >
                                    {!hoveredNode && "8_SILOED_PLATFORMS · UNLINKED"}
                                    {hoveredNode === 'vms' && "VMS_ISOLATED > NO_LINK"}
                                    {hoveredNode === 'acs' && "ACS_UNSYNCED > NO_LINK"}
                                    {hoveredNode === 'iam' && "IAM_DIRECTORY > NO_SYNC"}
                                    {hoveredNode === 'visitor' && "VISITOR_KIOSK > NO_LOG"}
                                    {hoveredNode === 'siem' && "SIEM_ANALYTICS > MANUAL_MODE"}
                                    {hoveredNode === 'dispatch' && "DISPATCH_RADIO > NO_RESPONSE"}
                                    {hoveredNode === 'alerts' && "ALARM_PANEL > UNCORRELATED"}
                                    {hoveredNode === 'analytics' && "AI_CAMERAS > STANDALONE"}
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* 4 Consequence Cards below */}
                    <div className="features-scroll-grid" style={{
                        borderLeft: '1px solid #212326',
                        borderRight: '1px solid #212326'
                    }}>
                        {/* Vertical Dividers */}
                        <div className="feature-col-divider feature-col-divider-1"></div>
                        <div className="feature-col-divider feature-col-divider-2"></div>
                        <div className="feature-col-divider feature-col-divider-3"></div>

                        {/* Feature 1 */}
                        <div className="feature-col-item">
                            <div className="fig-svg-wrap">
                                <svg viewBox="0 0 240 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <style>{`
                    @keyframes alertPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
                    .pulse { animation: alertPulse 1.5s infinite; }
                  `}</style>

                                    {/* Left: Badge Reader */}
                                    <rect x="35" y="45" width="50" height="70" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                    <text x="60" y="60" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">READER</text>
                                    <path d="M52,80 L68,80 M52,90 L68,90" stroke="#E44856" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="60" cy="85" r="10" stroke="#E44856" strokeWidth="1" strokeDasharray="2,2" className="pulse" />

                                    {/* Broken Connection */}
                                    <line x1="95" y1="80" x2="145" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
                                    <g transform="translate(120, 80)">
                                        <circle cx="0" cy="0" r="5" fill="#E44856" />
                                        <line x1="-2" y1="-2" x2="2" y2="2" stroke="#FFFFFF" strokeWidth="1" />
                                        <line x1="2" y1="-2" x2="-2" y2="2" stroke="#FFFFFF" strokeWidth="1" />
                                    </g>

                                    {/* Right: HR Directory */}
                                    <rect x="155" y="45" width="50" height="70" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                    <text x="180" y="60" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">HR / IAM</text>
                                    <text x="180" y="85" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="#E44856" textAnchor="middle" fontWeight="bold" className="pulse">NO SYNC</text>
                                    <line x1="165" y1="100" x2="195" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                </svg>
                            </div>
                            <h3>Twelve minutes per alert</h3>
                            <p className="card-desc">A badge anomaly at the datacenter triggers. Your operator pulls the access log, switches to the VMS, scrubs to the timestamp, checks the visitor system. Twelve minutes. For one alert. Multiplied by 200+ alerts daily.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-col-item">
                            <div className="fig-svg-wrap">
                                <svg viewBox="0 0 240 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <style>{`
                    @keyframes alertPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
                    .pulse { animation: alertPulse 1.5s infinite; }
                  `}</style>

                                    {/* Left: Camera Unit */}
                                    <rect x="40" y="50" width="30" height="60" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                    <circle cx="55" cy="70" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                    <text x="55" y="100" fontFamily="var(--font-mono), monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">CAM_04</text>

                                    {/* Disconnected Line */}
                                    <path d="M80,80 L160,80" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <g transform="translate(120, 80)">
                                        <circle cx="0" cy="0" r="8" stroke="#E44856" strokeWidth="1" fill="rgba(228, 72, 86, 0.05)" className="pulse" />
                                        <line x1="-3" y1="-3" x2="3" y2="3" stroke="#E44856" strokeWidth="1.2" />
                                        <line x1="3" y1="-3" x2="-3" y2="3" stroke="#E44856" strokeWidth="1.2" />
                                    </g>

                                    {/* Right: Security Console */}
                                    <rect x="170" y="50" width="30" height="60" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                    <text x="185" y="100" fontFamily="var(--font-mono), monospace" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">CONSOLE</text>

                                    {/* Warning Banner */}
                                    <text x="120" y="125" fontFamily="var(--font-mono), monospace" fontSize="7" fill="#E44856" textAnchor="middle" fontWeight="bold" className="pulse">FEEDS ISOLATED</text>
                                </svg>
                            </div>
                            <h3>Credentials that outlive employment</h3>
                            <p className="card-desc">A terminated employee's badge is deactivated. Their vehicle permit isn't. They're back in the parking structure at 11pm.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-col-item">
                            <div className="fig-svg-wrap">
                                <svg viewBox="0 0 240 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <style>{`
                    @keyframes delayPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                    .pulse { animation: delayPulse 1.5s infinite; }
                  `}</style>

                                    {/* Timeline Track */}
                                    <line x1="40" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

                                    {/* Incident Alert Node */}
                                    <circle cx="40" cy="80" r="4" fill="rgba(255,255,255,0.3)" />
                                    <text x="40" y="62" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontWeight="bold">Alert</text>
                                    <text x="40" y="95" fontFamily="var(--font-mono), monospace" fontSize="5.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">00:00</text>

                                    {/* Manual Audit Path */}
                                    <path d="M110,80 L200,80" stroke="#E44856" strokeWidth="1.5" className="pulse" />

                                    {/* Manual correlation in middle */}
                                    <g transform="translate(110, 80)">
                                        <circle cx="0" cy="0" r="10" stroke="#FCE545" strokeWidth="1" fill="#0c0d0f" className="pulse" />
                                        <text x="0" y="2" fontFamily="var(--font-mono), monospace" fontSize="5" fill="#FCE545" textAnchor="middle" fontWeight="bold">🔍</text>
                                    </g>
                                    <text x="110" y="62" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="#FCE545" textAnchor="middle" fontWeight="bold">Manual Search</text>
                                    <text x="110" y="100" fontFamily="var(--font-mono), monospace" fontSize="6" fill="#FCE545" textAnchor="middle" fontWeight="bold">12 Min Delay</text>

                                    {/* End Node (Late Context) */}
                                    <circle cx="200" cy="80" r="4" fill="#E44856" />
                                    <text x="200" y="62" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="#E44856" textAnchor="middle" fontWeight="bold">Correlated</text>
                                    <text x="200" y="95" fontFamily="var(--font-mono), monospace" fontSize="5.5" fill="#E44856" textAnchor="middle">12m 40s</text>
                                </svg>
                            </div>
                            <h3>Expired access that isn't</h3>
                            <p className="card-desc">A visitor's temporary access should have expired at 11am. It's 2pm. No one noticed. The credential is still active.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="feature-col-item">
                            <div className="fig-svg-wrap">
                                <svg viewBox="0 0 240 160" width="100%" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <style>{`
                    @keyframes siloPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                    .pulse { animation: siloPulse 1.5s infinite; }
                  `}</style>

                                    {/* Silo 1: VMS */}
                                    <g transform="translate(45, 45)">
                                        <rect x="0" y="0" width="30" height="40" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                        <line x1="0" y1="12" x2="30" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <line x1="0" y1="24" x2="30" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <text x="15" y="52" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">VMS</text>
                                    </g>

                                    {/* Silo 2: HR */}
                                    <g transform="translate(105, 45)">
                                        <rect x="0" y="0" width="30" height="40" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                        <line x1="0" y1="12" x2="30" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <line x1="0" y1="24" x2="30" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <text x="15" y="52" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">HR</text>
                                    </g>

                                    {/* Silo 3: ACS */}
                                    <g transform="translate(165, 45)">
                                        <rect x="0" y="0" width="30" height="40" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
                                        <line x1="0" y1="12" x2="30" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <line x1="0" y1="24" x2="30" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                        <text x="15" y="52" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="rgba(255,255,255,0.4)" textAnchor="middle">ACS</text>
                                    </g>

                                    {/* Broken Sync Indicator */}
                                    <rect x="35" y="115" width="170" height="20" rx="3" stroke="#E44856" strokeWidth="1" strokeDasharray="3,3" fill="rgba(228, 72, 86, 0.02)" className="pulse" />
                                    <text x="120" y="127" fontFamily="var(--font-mono), monospace" fontSize="6.5" fill="#E44856" textAnchor="middle" fontWeight="bold" className="pulse">NO UNIFIED CONTEXT</text>
                                </svg>
                            </div>
                            <h3>Headcounts on paper</h3>
                            <p className="card-desc">A fire alarm activates. Your team has no live view of who is inside. They're running headcounts against paper sign-in sheets.</p>
                        </div>
                    </div>

                    {/* Diagonal connecting bridge */}
                    <div style={{
                        width: '100%',
                        height: '60px',
                        borderLeft: '1px solid #212326',
                        borderRight: '1px solid #212326',
                        borderBottom: '1px solid #212326',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8.485\' height=\'8.485\' viewBox=\'0 0 8.5 8.5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-2 -2L10.5 10.5M6.5 -2L10.5 2M-2 6.5L2 10.5\' stroke=\'%23ffffff\' stroke-opacity=\'0.08\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                        animation: 'slide-diagonal-bg 0.5s linear infinite'
                    }} />

                    {/* Stats Row */}
                    <div className="metrics-row-wrap" style={{
                        width: '100%',
                        borderLeft: '1px solid #212326',
                        borderRight: '1px solid #212326',
                        borderBottom: '1px solid #212326'
                    }}>
                        <div className="metrics-horizontal-row-4col">
                            {[
                                { num: '8–12', desc: 'average disconnected security systems per enterprise' },
                                { num: '4–6', desc: 'platforms required to investigate a single incident manually' },
                                { num: '12 min', desc: 'average manual investigation time per alert' },
                                { num: '200+', desc: 'alerts processed daily, each requiring the same manual bridging' }
                            ].map((metric, idx) => (
                                <div key={idx} className="metric-col" style={{
                                    opacity: 1,
                                    padding: '40px 24px',
                                    textAlign: 'center',
                                    borderRight: idx !== 3 ? '1px solid #212326' : 'none'
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono), monospace',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        lineHeight: '1.1',
                                        marginBottom: '8px',
                                        letterSpacing: '-0.03em'
                                    }}>
                                        {metric.num}
                                    </div>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        lineHeight: '1.4',
                                        color: 'rgba(255,255,255,0.5)',
                                        margin: 0
                                    }}>
                                        {metric.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: INTEGRATION CATEGORIES */}
            <section id="capabilities" style={{ padding: '140px 0', background: 'transparent', position: 'relative', zIndex: 10, width: '100%' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '16px' }}>
                        <span className="ent-pill" style={{ marginLeft: 0 }}>INTEGRATION CATEGORIES</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', margin: '0 0 60px', flexWrap: 'wrap', gap: '28px' }}>
                        <h2 className="std-section-h2" style={{ maxWidth: '700px', fontSize: '52px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0', textAlign: 'left', lineHeight: 1.2 }}>
                            Six connection layers. One operational model.
                        </h2>
                        <div style={{ maxWidth: '400px', marginBottom: '22px' }}>
                            <p style={{ fontSize: '14px', color: '#B6B6B7', lineHeight: 1.6, textAlign: 'left', margin: '0' }}>
                                Pre-built integrations deploy in days. Custom integrations build on documented APIs. Every system that touches physical security connects here.
                            </p>
                        </div>
                    </div>

                    <div className="agents-accordion-grid">
                        {/* Left side: Accordion list */}
                        <div className="agents-accordion-left">
                            {CAPABILITIES_DATA.map((cap) => (
                                <div
                                    key={cap.id}
                                    className={`agent-accordion-card ${activeCapability === cap.id ? 'active' : ''}`}
                                    onClick={() => setActiveCapability(cap.id)}
                                >
                                    <div className="agent-accordion-header">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', color: activeCapability === cap.id ? '#6354F3' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{cap.num}</span>
                                            <h3 className="agent-accordion-title" style={{ fontSize: '14px', fontFamily: 'var(--font-mono), monospace', fontWeight: activeCapability === cap.id ? 600 : 400, color: activeCapability === cap.id ? '#ffffff' : 'rgba(255,255,255,0.4)', margin: 0 }}>{cap.name}</h3>
                                        </div>
                                    </div>

                                    <div className="agent-accordion-content">
                                        <div className="agent-accordion-content-inner">
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '8px' }}>

                                                {/* What Connects Block */}
                                                <div>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(228,72,86,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(228,72,86,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                                                        WHAT CONNECTS
                                                    </span>
                                                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)' }}>
                                                        {cap.whatConnects}
                                                    </p>
                                                </div>

                                                {/* Key Integrations Block */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'rgba(99,84,243,0.85)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', border: '1px solid rgba(99,84,243,0.2)', padding: '2px 6px', width: 'fit-content' }}>
                                                        KEY INTEGRATIONS
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                                        {cap.keyIntegrations.map((metric, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '8px 0', borderBottom: 'none', position: 'relative' }}>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6354F3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0 }}>
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-main)' }}>
                                                                    {metric}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right side: Sticky Dashboard Panel (Single Live Node Map) */}
                        <div className="agents-accordion-right">
                            <div className="agents-dashboard-panel" style={{ position: 'sticky', top: '120px' }}>
                                <div className="agents-dashboard-panel-inner" style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '480px' }}>

                                    {/* Panel Body: Interactive Integration Fabric Node Map */}
                                    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <div style={{ width: '100%', height: '100%', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                            <svg width="100%" height="100%" viewBox="0 0 500 380" style={{ position: 'relative', zIndex: 1, background: 'radial-gradient(circle at 50% 50%, rgba(99, 84, 243, 0.08) 0%, transparent 70%)' }}>
                                                <defs>
                                                    <filter id="hubGlowPurpleNode" x="-50%" y="-50%" width="200%" height="200%">
                                                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#6354F3" floodOpacity="0.6" />
                                                    </filter>
                                                    <filter id="nodeActiveGlowMap" x="-50%" y="-50%" width="200%" height="200%">
                                                        <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#7700FF" floodOpacity="0.7" />
                                                    </filter>
                                                    <style>{`
                                                        @keyframes spinSlowHub { 100% { transform: rotate(360deg); } }
                                                        @keyframes spinReverseHub { 100% { transform: rotate(-360deg); } }
                                                        @keyframes pulseCoreHub { 0%, 100% { transform: scale(0.92); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
                                                    `}</style>
                                                </defs>

                                                {/* Background Grid */}
                                                <pattern id="nodeGridMap" width="24" height="24" patternUnits="userSpaceOnUse">
                                                    <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.04)" />
                                                </pattern>
                                                <rect width="100%" height="100%" fill="url(#nodeGridMap)" />

                                                {/* CENTER HUB: INTEGRATION FABRIC */}
                                                <g transform="translate(250, 190)">
                                                    <circle cx="0" cy="0" r="48" fill="rgba(99, 84, 243, 0.08)" filter="url(#hubGlowPurpleNode)" />
                                                    <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(99, 84, 243, 0.5)" strokeWidth="1.5" strokeDasharray="6 6" style={{ transformOrigin: 'center', animation: 'spinSlowHub 16s linear infinite' }} />
                                                    <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3 9" style={{ transformOrigin: 'center', animation: 'spinReverseHub 12s linear infinite' }} />
                                                    <circle cx="0" cy="0" r="24" fill="#0B0D12" stroke="#6354F3" strokeWidth="2" filter="url(#hubGlowPurpleNode)" />
                                                    <circle cx="0" cy="0" r="9" fill="#7700FF" style={{ transformOrigin: 'center', animation: 'pulseCoreHub 2s infinite ease-in-out' }} />
                                                    <text x="0" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)" letterSpacing="1px">FABRIC HUB</text>
                                                </g>

                                                {/* 6 OUTER NODES & CONNECTING LINES */}
                                                {[
                                                    { idx: 0, title: "Access Control", x: 250, y: 55, path: "M 250 190 L 250 55" },
                                                    { idx: 1, title: "Video Management", x: 385, y: 120, path: "M 250 190 L 385 120" },
                                                    { idx: 2, title: "Visitor & Identity", x: 385, y: 260, path: "M 250 190 L 385 260" },
                                                    { idx: 3, title: "Workplace Ops", x: 250, y: 325, path: "M 250 190 L 250 325" },
                                                    { idx: 4, title: "Building Systems", x: 115, y: 260, path: "M 250 190 L 115 260" },
                                                    { idx: 5, title: "Comm & Alerting", x: 115, y: 120, path: "M 250 190 L 115 120" }
                                                ].map((node) => {
                                                    const isActive = activeCapability === node.idx;
                                                    return (
                                                        <g key={node.idx}>
                                                            {/* Connection Line */}
                                                            <path
                                                                d={node.path}
                                                                fill="none"
                                                                stroke={isActive ? "#6354F3" : "rgba(255, 255, 255, 0.12)"}
                                                                strokeWidth={isActive ? 2.5 : 1}
                                                                strokeDasharray={isActive ? "none" : "4 4"}
                                                                filter={isActive ? "url(#hubGlowPurpleNode)" : "none"}
                                                                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                                                            />

                                                            {/* Active Data Flow Packet Pulse */}
                                                            {isActive && (
                                                                <>
                                                                    <circle cx="0" cy="0" r="4" fill="#ffffff" filter="url(#nodeActiveGlowMap)">
                                                                        <animateMotion path={node.path} dur="1.4s" repeatCount="indefinite" />
                                                                    </circle>
                                                                    <circle cx="0" cy="0" r="3" fill="#6354F3">
                                                                        <animateMotion path={node.path} dur="1.4s" begin="0.7s" repeatCount="indefinite" />
                                                                    </circle>
                                                                </>
                                                            )}

                                                            {/* Outer Node Button */}
                                                            <g transform={`translate(${node.x}, ${node.y})`}>
                                                                <rect
                                                                    x="-65"
                                                                    y="-18"
                                                                    width="130"
                                                                    height="36"
                                                                    rx="18"
                                                                    fill="#0B0D12"
                                                                    stroke={isActive ? "#6354F3" : "rgba(255, 255, 255, 0.18)"}
                                                                    strokeWidth={isActive ? 2 : 1}
                                                                    filter={isActive ? "url(#nodeActiveGlowMap)" : "none"}
                                                                    style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                                                    onClick={() => setActiveCapability(node.idx)}
                                                                />
                                                                {isActive && (
                                                                    <rect
                                                                        x="-65"
                                                                        y="-18"
                                                                        width="130"
                                                                        height="36"
                                                                        rx="18"
                                                                        fill="rgba(99, 84, 243, 0.12)"
                                                                    />
                                                                )}
                                                                <circle
                                                                    cx="-46"
                                                                    cy="0"
                                                                    r="4"
                                                                    fill={isActive ? "#6354F3" : "rgba(255, 255, 255, 0.3)"}
                                                                />
                                                                <text
                                                                    x="-34"
                                                                    y="4"
                                                                    fill={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)"}
                                                                    fontSize="9"
                                                                    fontWeight={isActive ? "700" : "500"}
                                                                    fontFamily="var(--font-mono)"
                                                                >
                                                                    {node.title}
                                                                </text>
                                                            </g>
                                                        </g>
                                                    );
                                                })}
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    /* Accordion grid for Capabilities section */
                    .agents-accordion-grid {
                      display: grid;
                      grid-template-columns: 4fr 6fr;
                      gap: 0;
                      align-items: stretch;
                      background: rgba(10, 11, 14, 0.4);
                      border: 1px solid #212326;
                      overflow: hidden;
                    }
                    @media (max-width: 991px) {
                      .agents-accordion-grid {
                        grid-template-columns: 1fr;
                      }
                    }

                    .agents-accordion-left {
                      display: flex;
                      flex-direction: column;
                      border-right: 1px solid #212326;
                      background: rgba(255, 255, 255, 0.01);
                    }

                    .agent-accordion-card {
                      background: transparent;
                      border: none;
                      border-bottom: 1px solid #212326;
                      padding: 24px 32px;
                      cursor: pointer;
                      transition: all 0.2s ease;
                      outline: none;
                      text-align: left;
                    }
                    
                    .agent-accordion-card:last-child {
                      border-bottom: none;
                    }

                    .agent-accordion-card:hover {
                      background: rgba(255, 255, 255, 0.02);
                    }

                    .agent-accordion-card.active {
                      background: rgba(255, 255, 255, 0.03);
                    }

                    .agent-accordion-header {
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                    }

                    .agent-accordion-title {
                      font-size: 1.125rem;
                      font-weight: 600;
                      color: #ffffff;
                      margin: 0;
                      font-family: var(--font-mono), monospace;
                    }

                    .agent-accordion-content {
                      display: grid;
                      grid-template-rows: 0fr;
                      opacity: 0;
                      transition: grid-template-rows 0.3s linear, opacity 0.3s linear, margin-top 0.3s linear;
                    }

                    .agent-accordion-card.active .agent-accordion-content {
                      grid-template-rows: 1fr;
                      opacity: 1;
                      margin-top: 24px;
                    }

                    .agent-accordion-content-inner {
                      overflow: hidden;
                    }

                    .agents-accordion-right {
                      position: relative;
                      height: 100%;
                    }

                    .agents-dashboard-panel {
                      background: transparent;
                      border: none;
                      padding: 32px;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      position: relative;
                      overflow: hidden;
                      transition: transform 0.1s ease, box-shadow 0.1s ease;
                    }

                    .agents-dashboard-panel-inner {
                      flex: 1;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 480px;
                      position: relative;
                    }
                ` }} />
            </section>

            <div dangerouslySetInnerHTML={{
                __html: `

    <!-- OS Configuration Panel -->
    <section class="ent-section os-config-section">
        <!-- Atmospheric lighting for this section -->
        <div
            style="position: absolute; top: 20%; right: 10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 60%); pointer-events: none; z-index: 0;">
        </div>

        <div class="ent-container" style="position: relative; z-index: 10;">
            <div
                style="display: flex; flex-direction: column; align-items: center; padding-bottom: 64px; max-width: 640px; margin: 0 auto;">
                <div class="ent-pill" style="margin-bottom: 24px; border-radius: 100px;">What the Integration Fabric
                    does?</div>
                <h2 class="ent-h2" style="margin-bottom: 24px; text-align: center;">The System of Record for Physical
                    Security</h2>
                <p class="ent-p"
                    style="margin: 0; text-align: center; line-height: 1.7; font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">
                    The Integration Fabric ingests events from every source, normalizes them into a common schema, and
                    maintains a live operational model of your entire physical security environment.</p>
            </div>
            <div class="os-panel-container">

                <!-- Left: Interactive Cards -->
                <div class="os-nav-cards">

                    <!-- Card 1 -->
                    <div class="os-nav-card active">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Access Control</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">The foundation. Ingest badge events, door states, reader health, and
                                dynamic access rules directly into the state model.</p>
                            <div style="display: flex; gap: 12px;">
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Genetec</span>
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">LenelS2</span>
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Brivo</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="os-nav-card">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Video Intelligence</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Video with context becomes evidence. Automatically link surveillance
                                feeds directly to identity events and anomalies.</p>
                            <div style="display: flex; gap: 12px;">
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Milestone</span>
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Verkada</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="os-nav-card">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Visitor Management</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Manage the complete visitor lifecycle. Automate credential
                                provisioning, host notifications, and access expiration globally.</p>
                            <div style="display: flex; gap: 12px;">
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Envoy</span>
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Proxyclick</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="os-nav-card">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Space Utilization</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Occupancy intelligence. Cross-reference actual access events with
                                calendar bookings to identify shadow occupancy.</p>
                            <div style="display: flex; gap: 12px;">
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Microsoft
                                    365</span>
                                <span
                                    style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: #212326; padding: 4px 8px; border-radius: 4px;">Robin</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Live Intelligence Dashboard -->
                <div class="os-dashboard">

                    <div class="os-dash-header">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">SYS_INTEGRATION_BUS</span>
                        <div class="module-status">
                            <div class="status-dot active"></div> SYNC_ACTIVE
                        </div>
                    </div>

                    <div class="os-metric-grid">
                        <div class="os-metric-box">
                            <span class="module-label">EVENTS_PROCESSED (24H)</span>
                            <span class="os-metric-value os-counter" data-target="142894" data-suffix=""
                                data-decimals="0">0</span>
                        </div>
                        <div class="os-metric-box">
                            <span class="module-label">BUS_LATENCY</span>
                            <span class="os-metric-value os-counter" data-target="12" data-suffix="ms" data-decimals="0"
                                style="color: #10B981;">0ms</span>
                        </div>
                        <div class="os-metric-box">
                            <span class="module-label">ACTIVE_NODES</span>
                            <span class="os-metric-value os-counter" data-target="24" data-suffix=" / 24"
                                data-decimals="0">0 / 24</span>
                        </div>
                        <div class="os-metric-box">
                            <span class="module-label">DATA_INGEST_RATE</span>
                            <span class="os-metric-value os-counter" data-target="4.2" data-suffix=" MB/s"
                                data-decimals="1">0.0 MB/s</span>
                        </div>
                    </div>

                    <span class="module-label" style="display: block; margin-bottom: 16px;">LIVE_EVENT_STREAM</span>
                    <div class="os-graph">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" preserveAspectRatio="none"
                            class="os-svg-graph os-chart">
                            <defs>
                                <linearGradient id="barFade" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="rgba(255, 255, 255, 0.0)" />
                                    <stop offset="100%" stop-color="rgba(255, 255, 255, 0.3)" />
                                </linearGradient>
                            </defs>

                            <!-- 5 thin vertical bars fading at the top -->
                            <rect x="40" y="40" width="2" height="80" fill="url(#barFade)" rx="1" class="graph-bar" />
                            <rect x="120" y="20" width="2" height="100" fill="url(#barFade)" rx="1" class="graph-bar" />
                            <rect x="200" y="50" width="2" height="70" fill="url(#barFade)" rx="1" class="graph-bar" />
                            <rect x="280" y="30" width="2" height="90" fill="url(#barFade)" rx="1" class="graph-bar" />
                            <rect x="360" y="60" width="2" height="60" fill="url(#barFade)" rx="1" class="graph-bar" />
                        </svg>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <span
                            style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted);">-60s</span>
                        <span
                            style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted);">NOW</span>
                    </div>

                </div>

            </div>
        </div>
    </section>

    <!-- Integration Explorer Section -->
    <section class="ent-section" style="border-top: none;">
        <!-- Subtle atmospheric glow -->
        <div
            style="position: absolute; top: -10%; left: -10%; right: -10%; bottom: -10%; background: radial-gradient(circle at 30% 40%, rgba(124, 58, 237, 0.02) 0%, transparent 60%); pointer-events: none; z-index: 0;">
        </div>

        <div class="ent-container" style="position: relative; z-index: 10;">
            <div
                style="display: flex; flex-direction: column; align-items: center; padding-bottom: 64px; max-width: 640px; margin: 0 auto;">
                <div class="ent-pill" style="margin-bottom: 24px; border-radius: 100px;">Connectors & API Modules</div>
                <h2 class="ent-h2" style="margin-bottom: 24px; text-align: center;">Interactive Integration Explorer
                </h2>
                <p class="ent-p"
                    style="margin: 0; text-align: center; line-height: 1.7; font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">
                    Browse operational connections across access control, video systems, visitors, space utilization,
                    parking management, cafeteria transactions, building systems, IT identity registries, and
                    communication networks.</p>
            </div>

            <div class="explorer-panel-container">
                <div class="explorer-nav" role="tablist">
                    <div class="explorer-row active" data-category="access-control" tabindex="0" role="tab" aria-selected="true" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/01</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Access Control Systems</span>
                                <span class="explorer-desc">Core badge & reader telemetry</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="video-management" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/02</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Video Management Systems</span>
                                <span class="explorer-desc">Visual intelligence & clips</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="visitor-management" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/03</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Visitor Management</span>
                                <span class="explorer-desc">Check-in workflow orchestration</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="space-utilization" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/04</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Meeting Room & Desk Booking</span>
                                <span class="explorer-desc">Occupancy + workplace intelligence</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="parking-management" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/05</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Parking Management</span>
                                <span class="explorer-desc">Vehicle access + identity governance</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="cafeteria-retail" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/06</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Cafeteria & Retail</span>
                                <span class="explorer-desc">POS integration + presence patterns</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="building-management" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/07</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Building Management Systems</span>
                                <span class="explorer-desc">HVAC + elevator + environmental controls</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="identity-it" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/08</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Identity & IT Systems</span>
                                <span class="explorer-desc">Physical & logical security bridge</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="explorer-row" data-category="communication-alerting" tabindex="0" role="tab" aria-selected="false" aria-controls="explorer-detail-panel">
                        <div class="explorer-row-inner">
                            <span class="explorer-index">/09</span>
                            <div class="explorer-row-text">
                                <span class="explorer-title">Communication & Alerting</span>
                                <span class="explorer-desc">Multi-channel response coordination</span>
                            </div>
                            <span class="explorer-indicator"></span>
                        </div>
                    </div>
                    <div class="keyboard-hint">
                        Press [1-9] or Arrow keys to browse
                    </div>
                </div>

                <!-- Right Side: Contextual Detail Panel -->
                <div class="explorer-detail" role="tabpanel" id="explorer-detail-panel">
                    <div class="explorer-detail-content" id="explorer-detail-content">
                        <!-- Initial Content: Access Control Systems -->
                        <span class="explorer-meta">ACCESS_LAYER / CORE_INFRASTRUCTURE</span>
                        <h3 class="explorer-headline">Access Control Systems</h3>
                        <p class="explorer-description">The foundation. Badge events, door states, reader health, access rules, all normalized into the operational model.</p>

                        <span class="explorer-sublabel">Pre-built Connectors</span>
                        <div class="explorer-tags-container">
                            <span class="explorer-tag">Genetec Synergis</span>
                            <span class="explorer-tag">HID</span>
                            <span class="explorer-tag">Lenel</span>
                            <span class="explorer-tag">S2 NetBox</span>
                            <span class="explorer-tag">Brivo</span>
                            <span class="explorer-tag">AMAG</span>
                            <span class="explorer-tag">Gallagher</span>
                            <span class="explorer-tag">Paxton</span>
                            <span class="explorer-tag">Honeywell Pro-Watch</span>
                            <span class="explorer-tag">Software House</span>
                            <span class="explorer-tag">Kantech</span>
                            <span class="explorer-tag">Keri Systems</span>
                            <span class="explorer-tag">PDK</span>
                            <span class="explorer-tag">OpenPath</span>
                            <span class="explorer-tag">Verkada Access Control</span>
                        </div>

                        <span class="explorer-sublabel">Telemetry Data Flows</span>
                        <ul class="explorer-flows-grid">
                            <li class="explorer-flow-item"><span class="explorer-flow-bullet">→</span> Real-time badge events with credential resolution</li>
                            <li class="explorer-flow-item"><span class="explorer-flow-bullet">→</span> Door forced/held/propped alerts</li>
                            <li class="explorer-flow-item"><span class="explorer-flow-bullet">→</span> Reader online/offline status</li>
                            <li class="explorer-flow-item"><span class="explorer-flow-bullet">→</span> Access rule configurations</li>
                            <li class="explorer-flow-item"><span class="explorer-flow-bullet">→</span> Credential lifecycle (provision/suspend/revoke)</li>
                        </ul>

                        <div class="explorer-why-box">
                            <span class="explorer-sublabel">Why It Matters</span>
                            <p class="explorer-why-text">Access events are the highest-confidence signal in physical security. A badge tap is a verified identity at a specific location at a precise time. The Integration Fabric makes this data queryable, correlatable, and actionable across your entire operation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 05: How It Works / Architecture Stack -->
    <section class="ent-section" style="border-top: none; position: relative; overflow: visible;">
        <!-- Delicate backdrop lighting -->
        <div style="position: absolute; bottom: 10%; left: 15%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(124, 58, 237, 0.03) 0%, transparent 60%); pointer-events: none; z-index: 0;"></div>

        <div class="ent-container" style="position: relative; z-index: 10;">

            <!-- Metadata & Title Section -->
            <div style="display: flex; flex-direction: column; align-items: center; padding-bottom: 64px; max-width: 680px; margin: 0 auto;">
                <div class="ent-pill" style="margin-bottom: 24px; border-radius: 100px;">
                    <span class="ent-pill-accent">✦</span> The Architecture Stack
                </div>
                <h2 class="ent-h2" style="margin-bottom: 24px; text-align: center;">The Operational Intelligence Stack</h2>
                <p class="ent-p" style="margin: 0; text-align: center; line-height: 1.7; font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">
                    The Integration Fabric transforms fragmented systems into a continuously synchronized operational model through four architectural layers.
                </p>
            </div>

            <!-- Pill Toggle Switch over Horizontal Guideline -->
            <div style="position: relative; width: 100%; max-width: 1280px; margin: 0 auto 64px; display: flex; justify-content: center; align-items: center; box-sizing: border-box;">
                <!-- Full-width Horizontal Guideline acting as the track behind the pill -->
                <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #212326; z-index: 0;"></div>

                <!-- The Toggle Switch Pill -->
                <div class="arch-toggle-container">
                    <button class="arch-toggle-btn active" data-tab="stack">The Integration Stack</button>
                    <button class="arch-toggle-btn" data-tab="deployment">Deployment Models</button>
                </div>
            </div>

            <!-- Tab Panel 1: The Integration Stack -->
            <div class="arch-tab-panel active" id="panel-stack">
            <!-- The Operational Intelligence Stack -->
            <div class="bento-grid" id="bento-stack">

                <!-- [01] PROTOCOL LAYER (Span 2) -->
                <div class="bento-card span-2">
                    <div class="bento-graphic">
                        <div style="position: absolute; inset: 0; background-image: linear-gradient(#212326 1px, transparent 1px), linear-gradient(90deg, #212326 1px, transparent 1px); background-size: 32px 32px; mask-image: linear-gradient(to bottom, black 20%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);"></div>
                        <div style="display: flex; gap: 12px; z-index: 1; align-items: center;">
                            <div style="padding: 8px 16px; background: #212326; border-radius: 8px; border: 1px solid #212326; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.5);">ONVIF</div>
                            <div style="padding: 10px 20px; background: #212326; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.2);">REST API</div>
                            <div style="padding: 8px 16px; background: #212326; border-radius: 8px; border: 1px solid #212326; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.5);">BACnet</div>
                            <div style="padding: 8px 16px; background: #212326; border-radius: 8px; border: 1px solid #212326; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.5);">OSDP v2</div>
                        </div>
                    </div>
                    <div class="bento-content">
                        <h3 class="bento-title">Universal Adapters</h3>
                        <p class="bento-desc">Native support for security industry standards: ONVIF for video, OSDP v2 for access control, BACnet for building systems. REST APIs for modern cloud applications. Legacy protocol adapters for older systems.</p>
                    </div>
                </div>

                <!-- [02] NORMALIZATION LAYER (Span 1) -->
                <div class="bento-card span-1">
                    <div class="bento-graphic" style="flex-direction: column;">
                        <div style="width: 48px; height: 48px; background: #212326; border: 1px solid #212326; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1C1E" strokeWidth="2"><path d="M4 12v8M12 4v16M20 12v8M8 8v12M16 8v12"/></svg>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; display: flex; align-items: center; justify-content: center;"><div style="width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div></div>
                            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; display: flex; align-items: center; justify-content: center;"><div style="width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div></div>
                            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; display: flex; align-items: center; justify-content: center;"><div style="width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div></div>
                        </div>
                    </div>
                    <div class="bento-content">
                        <h3 class="bento-title">Unified Schema</h3>
                        <p class="bento-desc">Raw events from disparate systems transform into a unified schema. A "door forced" alert from Genetec and a "door held open" event from Lenel become comparable, queryable, actionable data.</p>
                    </div>
                </div>

                <!-- [03] STATE LAYER (Span 1) -->
                <div class="bento-card span-1">
                    <div class="bento-graphic">
                        <div style="width: 140px; height: 140px; border-radius: 50%; border: 1px dashed #212326; position: relative; display: flex; align-items: center; justify-content: center; animation: spinSlow 20s linear infinite;">
                            <div style="width: 48px; height: 48px; background: rgba(20,184,166,0.1); border: 1px solid rgba(20,184,166,0.3); border-radius: 50%; position: absolute; display: flex; align-items: center; justify-content: center; animation: spinSlow 20s linear infinite reverse;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(20,184,166,0.8)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                            <div style="position: absolute; width: 10px; height: 10px; background: rgba(255,255,255,0.2); border-radius: 50%; top: -5px; left: 50%; transform: translateX(-50%);"></div>
                            <div style="position: absolute; width: 6px; height: 6px; background: #212326; border-radius: 50%; bottom: 15px; left: 5px;"></div>
                            <div style="position: absolute; width: 8px; height: 8px; background: rgba(255,255,255,0.15); border-radius: 50%; bottom: 15px; right: 5px;"></div>
                        </div>
                    </div>
                    <div class="bento-content">
                        <h3 class="bento-title">Operational Context</h3>
                        <p class="bento-desc">The operational model maintains current state across all systems. Live understanding of who is where, what credentials are active, and what zones are armed.</p>
                    </div>
                </div>

                <!-- [04] ACTION LAYER (Span 2) -->
                <div class="bento-card span-2">
                    <div class="bento-graphic" style="align-items: flex-end; justify-content: flex-start; padding: 0 40px;">
                        <div style="width: 100%; height: 85%; background: rgba(10,10,12,0.6); border: 1px solid rgba(255,255,255,0.06); border-bottom: none; border-radius: 12px 12px 0 0; padding: 20px; position: relative; overflow: hidden; box-shadow: 0 -4px 24px rgba(0,0,0,0.4);">
                            <div style="display: flex; gap: 8px; margin-bottom: 24px;">
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #212326;"></div>
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #212326;"></div>
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #212326;"></div>
                            </div>
                            <div style="font-family: var(--font-mono); font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.8;">
                                <span style="color: rgba(255,255,255,0.2);">1</span> &nbsp;&nbsp;\$ orchestrate --layer action<br>
                                <span style="color: rgba(255,255,255,0.2);">2</span> &nbsp;&nbsp;<span style="color: rgba(255,255,255,0.6);">> Executing global workflow...</span><br>
                                <span style="color: rgba(255,255,255,0.2);">3</span> &nbsp;&nbsp;<span style="color: rgba(255,255,255,0.6);">> Synchronizing endpoints...</span><br>
                                <span style="color: rgba(255,255,255,0.2);">4</span> &nbsp;&nbsp;<span style="color: #14b8a6;">[SUCCESS] All systems active.</span>
                            </div>
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(to bottom, transparent, rgba(14,15,17,0.9));"></div>
                        </div>
                    </div>
                    <div class="bento-content">
                        <h3 class="bento-title">Automated Actions</h3>
                        <p class="bento-desc">Intelligence flows back to source systems. Lock commands, credential updates, camera presets, elevator recalls—the Integration Fabric doesn't just observe, it orchestrates.</p>
                    </div>
                </div>

            </div>
            </div>
            <!-- Tab Panel 2: Deployment Models --><!-- Tab Panel 2: Deployment Models -->
            <div class="arch-tab-panel" id="panel-deployment">
                <div class="deployment-grid">

                    <!-- Card 1: Cloud-Native -->
                    <div class="deployment-card">
                        <span class="deployment-meta">MODEL 01 / FULL_CLOUD</span>
                        <h3 class="deployment-title">Cloud-to-Cloud API Bridging</h3>
                        <p class="deployment-desc">
                            Direct, serverless cloud API integration. Ingests events and triggers actions directly across cloud-managed physical security platforms with zero local server presence.
                        </p>
                        <div class="deployment-tags">
                            <span class="deployment-tag">Verkada API</span>
                            <span class="deployment-tag">OpenPath Cloud</span>
                            <span class="deployment-tag">Brivo OnAir</span>
                            <span class="deployment-tag">Okta Identity</span>
                        </div>
                    </div>

                    <!-- Card 2: Hybrid Edge Agent -->
                    <div class="deployment-card">
                        <span class="deployment-meta">MODEL 02 / HYBRID_EDGE</span>
                        <h3 class="deployment-title">Secure Edge Gateway Agent</h3>
                        <p class="deployment-desc">
                            A lightweight, hardened on-premises Edge Broker that translates legacy local protocols (Milestone VMS, local Lenel controllers, local Modbus/BACnet endpoints) and streams them securely to the cloud.
                        </p>
                        <div class="deployment-tags">
                            <span class="deployment-tag">BACnet IP</span>
                            <span class="deployment-tag">Milestone SDK</span>
                            <span class="deployment-tag">OSDP Serial</span>
                            <span class="deployment-tag">Modbus Edge</span>
                        </div>
                    </div>

                    <!-- Card 3: Air-Gapped Sovereign -->
                    <div class="deployment-card">
                        <span class="deployment-meta">MODEL 03 / PRIVATE_CLOUD</span>
                        <h3 class="deployment-title">Air-Gapped Sovereign Cloud</h3>
                        <p class="deployment-desc">
                            Fully isolated private cloud deployments configured for high-compliance sectors, national defense, sovereign environments, or isolated air-gapped secure areas.
                        </p>
                        <div class="deployment-tags">
                            <span class="deployment-tag">On-Premises Kubernetes</span>
                            <span class="deployment-tag">High Compliance</span>
                            <span class="deployment-tag">Isolated Network</span>
                            <span class="deployment-tag">FedRAMP High</span>
                        </div>
                    </div>

                </div>
            </div>
            </div>

        </div>
        </div>
    </section>

    <!-- SECTION 06: Ripple Design -->
    <section class="ent-section ripple-section">
        <div class="ripple-container">
            <div class="ripple-circle ripple-c0"></div>
            <div class="ripple-circle ripple-c1"></div>
            <div class="ripple-circle ripple-c2"></div>
            <div class="ripple-circle ripple-c3"></div>
            <div class="ripple-circle ripple-c4"></div>
            <div class="ripple-circle ripple-c5"></div>
            <div class="ripple-circle ripple-c6"></div>
            <div class="ripple-circle ripple-c7"></div>
        </div>
        <div style="position: relative; z-index: 10; text-align: center; padding: 0 32px; max-width: 720px;">
            <div class="ent-pill" style="margin-bottom: 32px; justify-content: center; display: inline-flex;">
                <span class="ent-pill-accent">✦</span> Ready to Unify Your Stack
            </div>
            <h2 style="font-size: 48px; font-weight: 700; color: #F5F7FA; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;">
                Every Signal.<br>One Response
            </h2>
            <p style="font-family: var(--font-mono); font-size: 14px; color: #6B7280; line-height: 1.7; max-width: 560px; margin: 0 auto 48px;">
                One badge tap. One camera alert. One visitor check-in. The Integration Fabric turns isolated events into coordinated intelligence — across every system, in real time.
            </p>
            <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                <a href="#" class="ent-btn-primary">Request Assessment <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
                <a href="#" class="ent-btn-primary">View Documentation <svg class="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="arrow-stem" d="M3 12h12" /><path class="arrow-head" d="m9 18 6-6-6-6"/></svg></a>
            </div>
        </div>
    </section>

    <!-- SECTION 07: Integration in Action (Scenarios) -->
    <section class="ent-section" style="padding-top: 120px; padding-bottom: 120px; border-top: 1px solid #212326;">
        <div class="ent-container">
            <div style="display: flex; flex-direction: column; align-items: center; padding-bottom: 64px; max-width: 720px; margin: 0 auto; text-align: center;">
                <div class="ent-pill" style="margin-bottom: 24px;">
                    <span class="ent-pill-accent">✦</span> Operational Scenarios
                </div>
                <h2 class="ent-h2" style="margin-bottom: 24px;">Integration in Action</h2>
                <p class="ent-p" style="margin: 0; line-height: 1.7; font-family: var(--font-mono); color: var(--text-muted); font-size: 0.95rem;">
                    These scenarios demonstrate how unified data enables intelligent operations.
                </p>
            </div>

            <div class="os-panel-container" style="grid-template-columns: 1fr 1fr; align-items: center;">
                <!-- Left: Tabs -->
                <div class="os-nav-cards">
                    <div class="os-nav-card scenario-tab active" data-scenario="0">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Unauthorized Access</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Cross-reference badge identity with active HR policies to instantly flag anomalies.</p>
                        </div>
                    </div>
                    <div class="os-nav-card scenario-tab" data-scenario="1">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Visitor Overstay</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Track visitor location against meeting schedule and automatically notify hosts.</p>
                        </div>
                    </div>
                    <div class="os-nav-card scenario-tab" data-scenario="2">
                        <div class="os-nav-header">
                            <h3 class="os-nav-title">Emergency Mustering</h3>
                            <span class="os-item-icon">→</span>
                        </div>
                        <div class="os-nav-content">
                            <p class="os-nav-text">Instantly correlate building occupancy and remove false badge-out events during a crisis.</p>
                        </div>
                    </div>
                </div>

                <!-- Right: Phone/Terminal Box -->
                <div class="os-dashboard scenario-terminal" style="display: flex; flex-direction: column; padding: 0; overflow: hidden; height: 580px; width: 100%; max-width: 340px; margin: 0 auto; border-radius: 36px; border: 1px solid #212326; box-shadow: 0 32px 64px rgba(0,0,0,0.5);">
                    <!-- Phone Header (Dynamic Notch / Status) -->
                    <div style="padding: 16px 24px; border-bottom: 1px solid #212326; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.4);">
                        <div style="width: 60px; height: 6px; border-radius: 100px; background: #212326;"></div>
                    </div>
                    <div style="padding: 12px 24px; border-bottom: 1px solid #212326; display: flex; align-items: center; justify-content: center; background: rgba(10,11,13,0.8);">
                        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); font-weight: 500; letter-spacing: 0.05em;">MITHRIV_SECURE_COMMS</span>
                    </div>
                    <!-- Phone/Terminal Content -->
                    <div id="scenario-content" style="padding: 24px; overflow-y: auto; flex: 1; font-family: var(--font-mono); font-size: 0.85rem; display: flex; flex-direction: column; gap: 16px; background: #0a0b0d;">
                        <!-- dynamic content goes here -->
                    </div>
                </div>
            </div>
        </div>
    </section>

      ` }} />
        </div>
    )
}
