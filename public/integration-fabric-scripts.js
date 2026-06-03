// Mithriv Integration Fabric Interactive Scripts
window.runIntegrationFabric = () => {
    if (window.integrationFabricTimeoutId) {
        clearTimeout(window.integrationFabricTimeoutId);
        window.integrationFabricTimeoutId = null;
    }

(function initIntegrationFabric() {
  const osNavCards = document.querySelectorAll('.os-config-section .os-nav-card');
  const explorerRows = document.querySelectorAll('.explorer-row');
  if (osNavCards.length === 0 || explorerRows.length === 0) {
    window.integrationFabricTimeoutId = setTimeout(initIntegrationFabric, 50);
    return;
  }
            // Section 3: OS Nav Cards Accordion & Live Dashboard Telemetry Switcher
            // const osNavCards redeclared (already declared above)
            const dashboardCounters = document.querySelectorAll('.os-config-section .os-dashboard .os-counter');
            const graphBars = document.querySelectorAll('.os-config-section .os-dashboard .graph-bar');
            const osChart = document.querySelector('.os-config-section .os-dashboard .os-chart');

            const TELEMETRY_DATA = [
                {
                    events: 142894, latency: 12, nodes: 24, ingest: 4.2, suffixNodes: " / 24",
                    barHeights: [80, 100, 70, 90, 60]
                },
                {
                    events: 892104, latency: 45, nodes: 128, ingest: 85.0, suffixNodes: " / 128",
                    barHeights: [40, 50, 90, 80, 100]
                },
                {
                    events: 4208, latency: 8, nodes: 4, ingest: 0.5, suffixNodes: " / 4",
                    barHeights: [100, 80, 40, 50, 60]
                },
                {
                    events: 12492, latency: 15, nodes: 16, ingest: 1.2, suffixNodes: " / 16",
                    barHeights: [60, 90, 100, 70, 80]
                }
            ];

            osNavCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    if (card.classList.contains('active')) return;

                    // Toggle active class on accordion cards
                    osNavCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');

                    // Retrieve dynamic telemetry dataset
                    const data = TELEMETRY_DATA[index];
                    if (!data) return;

                    // Update metrics counters attributes and animate
                    dashboardCounters.forEach(counter => {
                        const box = counter.closest('.os-metric-box');
                        if (!box) return;
                        const labelEl = box.querySelector('.module-label');
                        if (!labelEl) return;
                        const label = labelEl.textContent;
                        
                        if (label.includes('EVENTS_PROCESSED')) {
                            counter.setAttribute('data-target', data.events);
                        } else if (label.includes('BUS_LATENCY')) {
                            counter.setAttribute('data-target', data.latency);
                        } else if (label.includes('ACTIVE_NODES')) {
                            counter.setAttribute('data-target', data.nodes);
                            counter.setAttribute('data-suffix', data.suffixNodes);
                        } else if (label.includes('DATA_INGEST_RATE')) {
                            counter.setAttribute('data-target', data.ingest);
                        }
                        animateCounter(counter);
                    });

                    // Re-animate the graph SVG
                    if (osChart && graphBars.length) {
                        osChart.classList.remove('animate');
                        // Force a reflow
                        void osChart.offsetWidth;
                        
                        // Update the heights and y-positions of the bars
                        graphBars.forEach((bar, i) => {
                            const h = data.barHeights[i] || 50;
                            bar.setAttribute('height', h);
                            bar.setAttribute('y', 120 - h);
                        });

                        osChart.classList.add('animate');
                    }
                });
            });

            // Section 5: Architecture Switcher & Layer highlights
            const archTabBtns = document.querySelectorAll('.arch-toggle-btn');
            const archPanels = document.querySelectorAll('.arch-tab-panel');

            archTabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabName = btn.getAttribute('data-tab');

                    // Switch tab active states
                    archTabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Switch panels
                    archPanels.forEach(panel => {
                        panel.classList.remove('active');
                        if (panel.id === `panel-${tabName}`) {
                            panel.classList.add('active');
                        }
                    });

                    // Redraw connectors on tab switch once visible
                    setTimeout(drawConnectors, 50);
                });
            });

            // Section 5 Interactive SVG Connectors & Hover Triggers
            const archCards = document.querySelectorAll('.arch-card');
            const archPills = document.querySelectorAll('.arch-diamond');
            const connectionPaths = document.querySelectorAll('.arch-conn-path');
            const pulseDots = document.querySelectorAll('.arch-pulse-dot');

            function drawConnectors() {
                const svgContainer = document.getElementById('arch-connectors-svg');
                if (!svgContainer) return;
                
                const svgRect = svgContainer.getBoundingClientRect();
                const layers = ['protocol', 'normalization', 'state', 'action'];
                
                layers.forEach(layer => {
                    const pill = document.querySelector(`.arch-diamond[data-layer="${layer}"]`);
                    const card = document.querySelector(`.arch-card[data-layer="${layer}"]`);
                    const path = document.getElementById(`path-${layer}`);
                    const pulse = document.getElementById(`pulse-${layer}`);
                    
                    if (!pill || !card || !path || !pulse) return;
                    
                    const pillRect = pill.getBoundingClientRect();
                    const cardRect = card.getBoundingClientRect();
                    
                    let x1, y1, x2, y2;
                    
                    // Determine if the card is on the left or right of the pill
                    if (cardRect.left + cardRect.width / 2 < pillRect.left + pillRect.width / 2) {
                        // Card is on the left
                        x1 = cardRect.left + cardRect.width - svgRect.left;
                        y1 = cardRect.top + cardRect.height / 2 - svgRect.top;
                        x2 = pillRect.left - svgRect.left;
                        y2 = pillRect.top + pillRect.height / 2 - svgRect.top;
                    } else {
                        // Card is on the right
                        x1 = pillRect.left + pillRect.width - svgRect.left;
                        y1 = pillRect.top + pillRect.height / 2 - svgRect.top;
                        x2 = cardRect.left - svgRect.left;
                        y2 = cardRect.top + cardRect.height / 2 - svgRect.top;
                    }
                    
                    const dx = Math.abs(x2 - x1);
                    // Control points for a beautiful horizontal cubic Bezier s-curve
                    const cp1x = x1 + dx * 0.4 * (x2 > x1 ? 1 : -1);
                    const cp1y = y1;
                    const cp2x = x2 - dx * 0.4 * (x2 > x1 ? 1 : -1);
                    const cp2y = y2;
                    
                    const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
                    path.setAttribute('d', d);
                    pulse.setAttribute('d', d);
                });
            }

            function setActiveLayer(layerName) {
                // Remove active classes
                archCards.forEach(c => c.classList.remove('active'));
                archPills.forEach(p => p.classList.remove('active'));
                connectionPaths.forEach(path => path.classList.remove('active'));
                pulseDots.forEach(dot => dot.classList.remove('active'));

                // Set new active classes
                const activeCards = document.querySelectorAll(`.arch-card[data-layer="${layerName}"]`);
                const activePills = document.querySelectorAll(`.arch-pill-bar[data-layer="${layerName}"]`);
                const activePaths = document.querySelectorAll(`.arch-conn-path[data-layer="${layerName}"]`);
                const activeDots = document.querySelectorAll(`.arch-pulse-dot[data-layer="${layerName}"]`);

                activeCards.forEach(c => c.classList.add('active'));
                activePills.forEach(p => p.classList.add('active'));
                activePaths.forEach(path => path.classList.add('active'));
                activeDots.forEach(dot => dot.classList.add('active'));
            }

            archPills.forEach(pill => {
                pill.addEventListener('mouseenter', () => {
                    const layer = pill.getAttribute('data-layer');
                    setActiveLayer(layer);
                });
                pill.addEventListener('click', () => {
                    const layer = pill.getAttribute('data-layer');
                    setActiveLayer(layer);
                });
            });

            archCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const layer = card.getAttribute('data-layer');
                    setActiveLayer(layer);
                });
                card.addEventListener('click', () => {
                    const layer = card.getAttribute('data-layer');
                    setActiveLayer(layer);
                });
            });

            // Run drawing function on start and resize
            setTimeout(drawConnectors, 150);
            window.drawConnectorsResizeHandler = drawConnectors;
            window.addEventListener('resize', window.drawConnectorsResizeHandler);

            const counters = document.querySelectorAll('.os-counter');

            function animateCounter(counter) {
                const target = parseFloat(counter.getAttribute('data-target'));
                const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 1500; // 1.5 seconds
                const stepTime = 20; // 20ms intervals
                const steps = duration / stepTime;
                const increment = target / steps;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        }) + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current.toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        }) + suffix;
                    }
                }, stepTime);
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('os-counter')) {
                            animateCounter(entry.target);
                        } else if (entry.target.classList.contains('os-chart')) {
                            entry.target.classList.add('animate');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));

            const charts = document.querySelectorAll('.os-chart');
            charts.forEach(chart => observer.observe(chart));

            // Integration Explorer Logic
            // const explorerRows redeclared (already declared above)
            const detailContent = document.getElementById('explorer-detail-content');

            const INTEGRATION_DATA = {
                'access-control': {
                    meta: 'ACCESS_LAYER / CORE_INFRASTRUCTURE',
                    title: 'Access Control Systems',
                    description: 'The foundation. Badge events, door states, reader health, access rules, all normalized into the operational model.',
                    integrations: ['Genetec Synergis', 'HID', 'Lenel', 'S2 NetBox', 'Brivo', 'AMAG', 'Gallagher', 'Paxton', 'Honeywell Pro-Watch', 'Software House', 'Kantech', 'Keri Systems', 'PDK', 'OpenPath', 'Verkada Access Control'],
                    flows: [
                        'Real-time badge events with credential resolution',
                        'Door forced/held/propped alerts',
                        'Reader online/offline status',
                        'Access rule configurations',
                        'Credential lifecycle (provision/suspend/revoke)'
                    ],
                    why: 'Access events are the highest-confidence signal in physical security. A badge tap is a verified identity at a specific location at a precise time. The Integration Fabric makes this data queryable, correlatable, and actionable across your entire operation.'
                },
                'video-management': {
                    meta: 'VIDEO_LAYER / VISUAL_TELEMETRY',
                    title: 'Video Management Systems',
                    description: 'Surveillance footage gains value when correlated with operational context. The Integration Fabric links video to events, locations, and identities.',
                    integrations: ['Genetec Security Center', 'Milestone XProtect', 'Honeywell MAXPRO', 'Axis Camera Station', 'Verkada', 'Rhombus', 'Avigilon', 'Hanwha Vision', 'Bosch VMS', 'ExacqVision', 'Digital Watchdog', 'Eagle Eye Networks', 'Arcules'],
                    flows: [
                        'Camera health and status monitoring',
                        'Motion and analytics event triggers',
                        'Bookmark and clip creation',
                        'PTZ preset activation',
                        'Video export for evidence compilation'
                    ],
                    why: 'Video without context requires scrubbing. Video with context becomes evidence. When an access anomaly triggers, the Integration Fabric automatically identifies relevant cameras, timestamps footage, and packages clips for review—what took hours now takes seconds.'
                },
                'visitor-management': {
                    meta: 'IDENTITY_LAYER / WORKFLOW_ORCHESTRATION',
                    title: 'Visitor Management',
                    description: 'Visitor operations touch every layer of enterprise security. The Integration Fabric ensures visitor data flows where it is needed, when it is needed.',
                    integrations: ['Envoy', 'iLobby', 'Proxyclick', 'SwipedOn', 'Traction Guest', 'Kastle', 'Sign In Enterprise', 'WorkInSync', 'plus native Mithriv visitor capabilities'],
                    flows: [
                        'Pre-registration with host validation',
                        'Check-in and check-out events',
                        'Temporary visitor credentials',
                        'Watchlist screening status',
                        'NDA and compliance acknowledgments'
                    ],
                    why: 'Visitors create operational complexity across physical security environments. The Integration Fabric manages the full visitor lifecycle — from registration to credential activation and departure — while maintaining audit trails, compliance visibility, and automated credential expiration.'
                },
                'space-utilization': {
                    meta: 'SPATIAL_LAYER / WORKPLACE_INTELLIGENCE',
                    title: 'Meeting Room & Desk Booking',
                    description: 'Space utilization data adds operational intelligence to physical security workflows. Know who should be where, and when.',
                    integrations: ['Microsoft 365 / Outlook', 'Google Workspace', 'Robin', 'Skedda', 'Envoy Desks', 'Condeco', 'Teem', 'Joan', 'Appspace', 'WorkInSync', 'plus native Mithriv workplace capabilities'],
                    flows: [
                        'Room reservation schedules',
                        'Desk booking assignments',
                        'No-show and cancellation events',
                        'Occupancy sensor telemetry',
                        'Space utilization and capacity analytics'
                    ],
                    why: 'Security and space management have converged. When the Integration Fabric knows a conference room is booked for six people but access logs show twelve entries, that\'s intelligence. When a reserved desk shows no badge-in by 10am, that\'s operational data for hot-desking policies.'
                },
                'parking-management': {
                    meta: 'VEHICLE_LAYER / IDENTITY_GOVERNANCE',
                    title: 'Parking Management',
                    description: 'Vehicle access is physical access. The Integration Fabric extends identity governance to parking operations.',
                    integrations: ['SKIDATA', 'TIBA', 'HUB Parking', 'Parkade', 'ParkOffice', 'FlashParking', 'SpotHero Enterprise', 'INDECT', 'Custom LPR systems', 'plus native Mithriv visitor capabilities'],
                    flows: [
                        'License plate recognition events',
                        'Permit validation and violation flags',
                        'Gate open/close commands',
                        'Reserved space assignments',
                        'Contractor and visitor vehicle registration'
                    ],
                    why: 'Parking gates are access control for vehicles. A terminated employee\'s badge may be deactivated, but is their vehicle still on the permit list? The Integration Fabric enforces consistent identity governance across pedestrian and vehicle access.'
                },
                'cafeteria-retail': {
                    meta: 'TRANSACTION_LAYER / CONSUMPTION_PATTERNS',
                    title: 'Cafeteria & Retail',
                    description: 'Point-of-sale integration adds consumption patterns to the operational model.',
                    integrations: ['Compass Group', 'Sodexo', 'Aramark', 'Toast', 'Square', 'Custom cafeteria POS systems'],
                    flows: [
                        'Transaction events with badge/credential linkage',
                        'Meal plan balance and subsidies',
                        'Vendor and contractor meal tracking',
                        'Consumption analytics by location/time'
                    ],
                    why: 'Cafeteria transactions are presence validation. Badge taps at 8am followed by lunch purchase at noon creates behavioral baseline. Anomalies—like a credential used for building access but never appearing in cafeteria or meeting room systems—surface through correlation.'
                },
                'building-management': {
                    meta: 'INFRASTRUCTURE_LAYER / AUTOMATION_FLOW',
                    title: 'Building Management Systems',
                    description: 'HVAC, lighting, elevators, and environmental controls contribute to security awareness and response.',
                    integrations: ['Johnson Controls Metasys', 'Honeywell WEBs', 'Siemens Desigo', 'Schneider EcoStruxure', 'Tridium Niagara', 'BACnet-compatible systems', 'Modbus endpoints'],
                    flows: [
                        'HVAC zone status and schedules',
                        'Elevator floor access and destination dispatch',
                        'Lighting schedules and override events',
                        'Environmental sensor data (temperature, humidity, air quality)',
                        'Fire alarm and life safety status'
                    ],
                    why: 'Building systems complete the operational picture. Elevator destination dispatch integration means access control extends to floor selection. HVAC schedules inform occupancy expectations. Fire alarm integration triggers coordinated emergency response across all systems.'
                },
                'identity-it': {
                    meta: 'IDENTITY_LAYER / IT_INTEGRATION',
                    title: 'Identity & IT Systems',
                    description: 'Bridge physical and logical security with enterprise identity integration.',
                    integrations: ['Microsoft Entra ID (Azure AD)', 'Okta', 'Ping Identity', 'SailPoint', 'CyberArk', 'ServiceNow', 'Workday', 'SAP SuccessFactors', 'Active Directory', 'LDAP'],
                    flows: [
                        'Employee lifecycle events (hire, transfer, terminate)',
                        'Group membership and role changes',
                        'Credential provisioning requests',
                        'Access review and certification',
                        'Incident ticket creation and updates'
                    ],
                    why: 'Physical access should follow the same governance as logical access. When Workday processes a termination, the Integration Fabric revokes building credentials before the employee reaches the exit. No manual workflow. No orphaned access.'
                },
                'communication-alerting': {
                    meta: 'LOGISTICS_LAYER / COMMAND_STACK',
                    title: 'Communication & Alerting',
                    description: 'Response requires communication. The Integration Fabric connects to every channel your team uses.',
                    integrations: ['Microsoft Teams', 'Slack', 'Cisco Webex', 'Two-way radio systems (Motorola, Kenwood, Hytera)', 'Mass notification (Everbridge, AlertMedia, Rave)', 'SMS gateways', 'VoIP/SIP'],
                    flows: [
                        'Alert routing by role, location, and severity',
                        'Guard dispatch with location and context',
                        'Emergency broadcast across all channels',
                        'Acknowledgment and escalation tracking',
                        'Radio-to-app bridging for field communication'
                    ],
                    why: 'Security operations fail at communication boundaries. The Integration Fabric ensures the right information reaches the right people through the right channel—whether that\'s a Teams message for an executive escort or a radio dispatch for a guard response.'
                }
            };

            const switchCategory = (category) => {
                const data = INTEGRATION_DATA[category];
                if (!data) return;

                // Add transitioning class for fade out
                detailContent.classList.add('transitioning');

                setTimeout(() => {
                    // Update metadata and textual content
                    detailContent.querySelector('.explorer-meta').innerText = data.meta;
                    detailContent.querySelector('.explorer-headline').innerText = data.title;
                    detailContent.querySelector('.explorer-description').innerHTML = data.description;

                    // Rebuild pre-built integration tags
                    const tagsContainer = detailContent.querySelector('.explorer-tags-container');
                    tagsContainer.innerHTML = '';
                    data.integrations.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'explorer-tag';
                        span.innerText = tag;
                        tagsContainer.appendChild(span);
                    });

                    // Rebuild data flows list
                    const flowsGrid = detailContent.querySelector('.explorer-flows-grid');
                    flowsGrid.innerHTML = '';
                    data.flows.forEach(flow => {
                        const li = document.createElement('li');
                        li.className = 'explorer-flow-item';
                        li.innerHTML = `<span class="explorer-flow-bullet">→</span> ${flow}`;
                        flowsGrid.appendChild(li);
                    });

                    // Update why it matters box
                    detailContent.querySelector('.explorer-why-text').innerText = data.why;

                    // Remove transitioning class for fade in
                    detailContent.classList.remove('transitioning');
                }, 250);
            };

            explorerRows.forEach(row => {
                row.addEventListener('click', () => {
                    if (row.classList.contains('active')) return;

                    explorerRows.forEach(r => {
                        r.classList.remove('active');
                        r.setAttribute('aria-selected', 'false');
                    });

                    row.classList.add('active');
                    row.setAttribute('aria-selected', 'true');

                    const category = row.getAttribute('data-category');
                    switchCategory(category);
                });

                // Support Enter/Space key trigger on focus
                row.addEventListener('keydown', (e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        row.click();
                    }
                });
            });

            // Global keyboard event handler for explorer navigation
            const explorerKeydownHandler = (e) => {
                if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

                // 1-9 keys for categories
                if (e.key >= '1' && e.key <= '9') {
                    const idx = parseInt(e.key) - 1;
                    if (explorerRows[idx]) {
                        e.preventDefault();
                        explorerRows[idx].click();
                        explorerRows[idx].focus();
                    }
                }

                // Up / Down arrow navigation within rows
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    const activeRow = document.querySelector('.explorer-row.active');
                    if (!activeRow) return;

                    const rowsArr = Array.from(explorerRows);
                    const currentIdx = rowsArr.indexOf(activeRow);
                    let nextIdx = currentIdx + (e.key === 'ArrowDown' ? 1 : -1);

                    if (nextIdx >= 0 && nextIdx < rowsArr.length) {
                        e.preventDefault();
                        rowsArr[nextIdx].click();
                        rowsArr[nextIdx].focus();

                        // Scroll focused row into view if navigation is happening on small screen horizontal layout
                        if (window.innerWidth <= 1024) {
                            rowsArr[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    }
                }
            };
            window.explorerKeydownHandler = explorerKeydownHandler;
            window.addEventListener('keydown', window.explorerKeydownHandler);

            // Navbar Scroll Logic
            const navbar = document.querySelector('.navbar');
            const fabricNavbarScrollHandler = () => {
                if (window.scrollY > 40) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            };
            if (navbar) {
                window.fabricNavbarScrollHandler = fabricNavbarScrollHandler;
                window.addEventListener('scroll', window.fabricNavbarScrollHandler, { passive: true });
            }

            // Operational Stack Timeline Animation
            const opsTimeline = document.getElementById('ops-timeline');
            const opsProgress = document.getElementById('ops-progress');
            const opsNodes = document.querySelectorAll('.ops-node-wrapper');

            const spineScrollHandler = () => {
                const rect = opsTimeline.getBoundingClientRect();
                const winHeight = window.innerHeight;
                
                // Calculate how far we've scrolled into the timeline
                let progress = 0;
                if (rect.top < winHeight / 2) {
                    const totalScrollable = rect.height;
                    const scrolled = (winHeight / 2) - rect.top;
                    progress = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
                }
                if (opsProgress) {
                    opsProgress.style.height = `${progress}%`;
                }
            };
            if (opsTimeline && opsNodes.length > 0) {
                window.spineScrollHandler = spineScrollHandler;
                window.addEventListener('scroll', window.spineScrollHandler, { passive: true });

                // Intersection Observer for Node Reveal
                const timelineObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                        }
                    });
                }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

                opsNodes.forEach(node => timelineObserver.observe(node));
            }

        
            // AI Chat Interface Toggles
            const threadBtns = document.querySelectorAll('.chat-thread-btn');
            const threadContents = document.querySelectorAll('.chat-thread-content');

            threadBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active from all
                    threadBtns.forEach(b => b.classList.remove('active'));
                    threadContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active to clicked
                    btn.classList.add('active');
                    const threadId = btn.getAttribute('data-thread');
                    document.getElementById('thread-' + threadId).classList.add('active');
                });
            });
            // Section 6: Scenarios Switcher
            const scenarioTabs = document.querySelectorAll('.scenario-tab');
            const scenarioContent = document.getElementById('scenario-content');
            
            const SCENARIOS = [
                [
                    {
                        time: "T+0S:",
                        msg: "Badge tap at datacenter door. Credential valid, but holder lacks datacenter access authorization."
                    },
                    {
                        time: "T+50MS:",
                        corr: "Integration Fabric correlates",
                        flow: [
                            "Employee role (marketing)",
                            "Datacenter access policy (engineering only)",
                            "Current time (2:47 AM)",
                            "Employee's normal building (headquarters, not this facility)"
                        ]
                    }
                ],
                [
                    {
                        time: "9:00 AM:",
                        msg: "Visitor pre-registered for 9 AM - 11 AM meeting in Conference Room 4B."
                    },
                    {
                        time: "9:15 AM:",
                        msg: "Visitor checks in. Temporary credential issued. Access granted to lobby, Conference Room 4B floor, and cafeteria."
                    },
                    {
                        time: "11:15 AM:",
                        msg: "Meeting room booking ends. Visitor hasn't checked out."
                    },
                    {
                        time: "11:16 AM:",
                        msg: "Integration Fabric alerts security and meeting host."
                    }
                ],
                [
                    {
                        time: "T+0S:",
                        msg: "Fire alarm activates in Building C."
                    },
                    {
                        time: "T+1S:",
                        corr: "Integration Fabric correlates",
                        flow: [
                            "Maps all badge-in events for Building C today.",
                            "Removes badge-out events.",
                            "Current occupancy: 347 people."
                        ]
                    }
                ]
            ];

            function renderScenario(index) {
                if (!scenarioContent) return;
                const data = SCENARIOS[index];
                let html = '';
                
                data.forEach(step => {
                    html += `<div>`;
                    if (step.time) html += `<span class="term-time">${step.time}</span>`;
                    if (step.msg) html += `<div class="term-msg">${step.msg}</div>`;
                    if (step.flow) {
                        html += `<div class="term-flow">`;
                        if (step.corr) html += `<span class="term-corr">${step.corr}</span>`;
                        step.flow.forEach((f, i) => {
                            html += `<span>${f}</span>`;
                            if (i < step.flow.length - 1) html += `<span class="term-arrow">↕</span>`;
                        });
                        html += `</div>`;
                    }
                    html += `</div>`;
                });
                
                scenarioContent.innerHTML = html;
                scenarioContent.style.opacity = 0;
                setTimeout(() => {
                    scenarioContent.style.transition = 'opacity 0.4s ease';
                    scenarioContent.style.opacity = 1;
                }, 50);
            }

            if (scenarioTabs.length > 0) {
                renderScenario(0); // init
                scenarioTabs.forEach((tab, index) => {
                    tab.addEventListener('click', () => {
                        scenarioTabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        renderScenario(index);
                    });
                });
            }
})();
    
    window.cancelIntegrationFabric = () => {
        if (window.integrationFabricTimeoutId) {
            clearTimeout(window.integrationFabricTimeoutId);
            window.integrationFabricTimeoutId = null;
        }
        if (window.explorerKeydownHandler) {
            window.removeEventListener('keydown', window.explorerKeydownHandler);
            window.explorerKeydownHandler = null;
        }
        if (window.fabricNavbarScrollHandler) {
            window.removeEventListener('scroll', window.fabricNavbarScrollHandler);
            window.fabricNavbarScrollHandler = null;
        }
        if (window.spineScrollHandler) {
            window.removeEventListener('scroll', window.spineScrollHandler);
            window.spineScrollHandler = null;
        }
        if (window.drawConnectorsResizeHandler) {
            window.removeEventListener('resize', window.drawConnectorsResizeHandler);
            window.drawConnectorsResizeHandler = null;
        }
        
        // Remove direct classes modified by fabricNavbarScrollHandler
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.remove('scrolled', 'past-hero', 'nav-hidden', 'navbar-hidden');
        }
    };
};