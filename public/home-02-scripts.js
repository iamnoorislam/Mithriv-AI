// Mithriv Home 02 Interactive Scripts
window.runScenarioPopup = () => {

    let popOpen = true;
    let escalated = false;

    window.togglePop = togglePop;
    window.simulateType = simulateType;
    window.cpSend = cpSend;
    window.handleOption = handleOption;

    function togglePop(scenario) {
        const el = document.getElementById('cpop');
        if (scenario) {
            el.classList.remove('hidden');
            popOpen = true;
            document.getElementById('cpbd').innerHTML = '';
            triggerEscalation(scenario);
        } else {
            if (escalated) {
                document.getElementById('ca').classList.remove('ai-escalated');
                escalated = false;
                const tbText = document.getElementById('tbTitleText');
                if (tbText) tbText.innerText = 'Fire Protocol';
                return;
            }
            popOpen = !popOpen;
            if (popOpen) el.classList.remove('hidden');
            else el.classList.add('hidden');
        }
    }

    function triggerEscalation(scenario) {
        if (!escalated) {
            escalated = true;
            const ca = document.getElementById('ca');
            ca.classList.add('ai-escalated');

            // Dynamically update the topbar title based on active scenario
            const tbText = document.getElementById('tbTitleText');
            if (tbText) {
                if (scenario === 'fire') {
                    tbText.innerText = 'Fire Protocol';
                } else if (scenario === 'visitor') {
                    tbText.innerText = 'Visitor Operations';
                } else if (scenario === 'access') {
                    tbText.innerText = 'Access Breach';
                }
            }

            // Liquid ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.top = '80%';
            ripple.style.left = '85%';
            ca.appendChild(ripple);
            setTimeout(() => ripple.remove(), 2600);

            const bd = document.getElementById('cpbd');
            const u = document.createElement('div');
            u.className = 'cm sys';
            u.innerHTML = `<div class="cm-av">S</div><div class="cm-content"><div class="cm-name">System</div><div class="cm-bubble">Escalating to autonomous incident orchestration...</div></div>`;
            bd.appendChild(u);
            bd.scrollTop = bd.scrollHeight;
        }

        setTimeout(() => {
            handleOption('initial_' + scenario, null);
        }, 1200);
    }

    function simulateType(cmd) {
        const el = document.getElementById('cpi');
        el.value = cmd;
        cpSend();
    }

    function cpSend() {
        const el = document.getElementById('cpi'), v = el.value.trim();
        if (!v) return; el.value = '';
        const bd = document.getElementById('cpbd');

        const u = document.createElement('div');
        u.className = 'cm user';
        u.innerHTML = `<div class="cm-av">SO</div><div class="cm-content"><div class="cm-name">Security Officer</div><div class="cm-bubble">${v}</div></div>`;
        bd.appendChild(u);
        bd.scrollTop = bd.scrollHeight;

        const lc = v.toLowerCase();
        const isEmergency = lc.includes('fire') || lc.includes('smoke') || lc.includes('emergency') || lc.includes('visitor') || lc.includes('access');

        const pop = document.getElementById('cpop');
        if (!escalated) {
            if (isEmergency) {
                pop.classList.add('emergency-glow');
            } else {
                pop.classList.add('cp-processing');
            }
        }

        setTimeout(() => {
            if (isEmergency && !escalated) {
                triggerEscalation(lc.includes('fire') || lc.includes('smoke') ? 'fire' : lc.includes('visitor') ? 'visitor' : 'access');
                setTimeout(() => pop.classList.remove('emergency-glow'), 1000);
                return;
            }

            let nk = lc.includes('fire') ? 'initial_fire' : lc.includes('visitor') ? 'initial_visitor' : lc.includes('access') ? 'initial_access' : null;

            if (nk) {
                handleOption(nk, null);
            } else {
                pop.classList.remove('cp-processing');
                const a = document.createElement('div');
                a.className = 'cm ai';
                const msg = escalated ? "Operational command not recognized. Standing by." : "No scenario matched. Try: fire, visitor, or access.";
                a.innerHTML = `<div class="cm-av">M</div><div class="cm-content"><div class="cm-name">Mithriv AI</div><div class="cm-bubble">${msg}</div></div>`;
                bd.appendChild(a);
                bd.scrollTop = bd.scrollHeight;
            }
        }, 600);
    }

    function handleOption(id, btn) {
        if (btn) btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
        const bd = document.getElementById('cpbd');
        const pop = document.getElementById('cpop');

        if (btn) {
            const u = document.createElement('div');
            u.className = 'cm user';
            u.innerHTML = `<div class="cm-av">SO</div><div class="cm-content"><div class="cm-name">Security Officer</div><div class="cm-bubble">${btn.innerText}</div></div>`;
            bd.appendChild(u);
        }

        if (!escalated) pop.classList.add('cp-processing');

        const th = document.createElement('div');
        th.className = 'cm sys';
        th.innerHTML = `<div class="cm-av">S</div><div class="cm-content"><div class="cm-name">System</div><div class="cm-bubble">Processing telemetry...</div></div>`;
        bd.appendChild(th);
        bd.scrollTop = bd.scrollHeight;

        setTimeout(() => {
            bd.removeChild(th);
            const node = window.chatNodes[id];
            if (!node) {
                pop.classList.remove('cp-processing');
                return;
            }

            const a = document.createElement('div');
            a.className = 'cm ai';
            a.innerHTML = `<div class="cm-av">M</div><div class="cm-content"><div class="cm-name">Mithriv AI</div><div class="cm-bubble"><span class="type-target"></span></div></div>`;
            bd.appendChild(a);

            const target = a.querySelector('.type-target');
            const bubble = a.querySelector('.cm-bubble');

            typeIt(target, node.aiResponse, 10, () => {
                pop.classList.remove('cp-processing');
                const ex = document.createElement('div');
                ex.className = 'cm summary';
                ex.innerHTML = (node.visualHTML ? `<div class='visual-wrapper'>${node.visualHTML}</div>` : '') + renderOpts(node.options);

                [...ex.children].forEach((c, i) => {
                    c.style.opacity = '0';
                    c.style.animation = `suf 0.3s forwards ${i * 0.07}s`;
                });

                bubble.appendChild(ex);
                bd.scrollTop = bd.scrollHeight;
            });
            bd.scrollTop = bd.scrollHeight;
        }, 800);
    };

    function typeIt(el, text, spd, cb) {
        let i = 0, bd = document.getElementById('cpbd');
        const iv = setInterval(() => { el.innerHTML += text.charAt(i); i++; if (bd) bd.scrollTop = bd.scrollHeight; if (i >= text.length) { clearInterval(iv); if (cb) cb(); } }, spd);
    }

    function renderOpts(opts) {
        if (!opts || !opts.length) return '';
        return `<div style="margin-top:12px"><h6>Recommended Action</h6><div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px">${opts.map(o => `<button class="chat-action-btn secondary" onclick="handleOption('${o.next}',this)">${o.label}</button>`).join('')}</div></div>`;
    }



};

window.runConsoleSimulation02 = () => {

    const aiChatInput = document.getElementById('aiChatInput');
    const aiSendBtn = document.getElementById('aiSendBtn');
    const commandPalette = document.getElementById('commandPalette');
    const thinkingPopup = document.getElementById('thinkingPopup');
    const attachmentsContainer = document.getElementById('attachmentsContainer');
    const commandBtn = document.getElementById('commandBtn');

    let attachments = [];

    if (aiChatInput) {
        aiChatInput.addEventListener('input', function () {
            this.style.height = '60px';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';

            if (this.value.trim().length > 0 || attachments.length > 0) {
                aiSendBtn.removeAttribute('disabled');
            } else {
                aiSendBtn.setAttribute('disabled', 'true');
            }

            if (this.value.startsWith('/')) {
                commandPalette.classList.add('active');
                if (commandBtn) commandBtn.classList.add('active');
            } else {
                commandPalette.classList.remove('active');
                if (commandBtn) commandBtn.classList.remove('active');
            }
        });

        aiChatInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    function toggleCommandPalette() {
        if (!commandPalette) return;
        commandPalette.classList.toggle('active');
        if (commandBtn) commandBtn.classList.toggle('active');
        if (commandPalette.classList.contains('active')) {
            aiChatInput.value = '/';
            aiChatInput.focus();
        } else {
            aiChatInput.value = '';
        }
    }

    function selectCommand(index) {
        const cmds = ['/breach ', '/floorplan ', '/report ', '/optimize '];
        if (aiChatInput) aiChatInput.value = cmds[index];
        if (commandPalette) commandPalette.classList.remove('active');
        if (commandBtn) commandBtn.classList.remove('active');
        if (aiChatInput) {
            aiChatInput.focus();
            aiChatInput.dispatchEvent(new Event('input'));
        }
    }

    function attachFile() {
        const fakeFiles = ['floorplan.pdf', 'access_log.csv', 'camera_feed.mp4', 'hr_data.xlsx'];
        const file = fakeFiles[Math.floor(Math.random() * fakeFiles.length)];
        attachments.push(file);
        renderAttachments();
        if (aiSendBtn) aiSendBtn.removeAttribute('disabled');
    }

    function removeAttachment(index) {
        attachments.splice(index, 1);
        renderAttachments();
        if (aiChatInput) aiChatInput.dispatchEvent(new Event('input'));
    }

    function renderAttachments() {
        if (!attachmentsContainer) return;
        if (attachments.length === 0) {
            attachmentsContainer.classList.add('util-hidden');
            attachmentsContainer.innerHTML = '';
            return;
        }
        attachmentsContainer.classList.remove('util-hidden');
        attachmentsContainer.innerHTML = attachments.map((file, i) => `
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; background: rgba(255,255,255,0.08); padding: 0.375rem 0.75rem; border-radius: 0.5rem; color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.1);">
                <span>${file}</span>
                <button onclick="removeAttachment(${i})" style="color: rgba(255,255,255,0.5); background: none; border: none; cursor: pointer; padding: 0; display: flex;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        `).join('');
    }

    function autoTypeKeyword(keyword) {
        const aiChatInput = document.getElementById('aiChatInput');
        const aiSendBtn = document.getElementById('aiSendBtn');
        if (aiChatInput) {
            aiChatInput.value = keyword;
            aiChatInput.focus();
            aiChatInput.dispatchEvent(new Event('input'));
            if (aiSendBtn) aiSendBtn.removeAttribute('disabled');
            sendMessage();
        }
    }

    function sendMessage() {
        if (!aiSendBtn || aiSendBtn.disabled) return;

        const userText = aiChatInput.value.trim();
        if (!userText) return;

        // Hide hero text when chat starts
        const heroText = document.querySelector('.chat-hero-text');
        if (heroText && !heroText.classList.contains('util-hidden')) {
            heroText.classList.add('util-hidden');
            const cb = document.getElementById('chatBox');
            if (cb) cb.style.display = 'flex';
        }

        const sendIcon = aiSendBtn.querySelector('.send-icon');
        const loaderIcon = aiSendBtn.querySelector('.loader-icon');

        if (sendIcon) sendIcon.classList.add('util-hidden');
        if (loaderIcon) {
            loaderIcon.classList.remove('util-hidden');
            loaderIcon.style.animation = 'util-spin 2s linear infinite';
        }
        aiSendBtn.setAttribute('disabled', 'true');

        if (thinkingPopup) thinkingPopup.classList.add('active');

        addMessageObj(true, userText);
        aiChatInput.value = '';
        attachments = [];
        renderAttachments();
        aiChatInput.dispatchEvent(new Event('input'));

        setTimeout(() => {
            if (sendIcon) sendIcon.classList.remove('util-hidden');
            if (loaderIcon) {
                loaderIcon.classList.add('util-hidden');
                loaderIcon.style.animation = 'none';
            }
            if (thinkingPopup) thinkingPopup.classList.remove('active');

            if (userText.toLowerCase().includes("fire")) {
                const node = window.chatNodes['initial_fire'];
                let completeHTML = (node.visualHTML || "") + renderOptions(node.options);
                addMessageObj(false, node.aiResponse, completeHTML);
            } else if (userText.toLowerCase().includes("visitor")) {
                const node = window.chatNodes['initial_visitor'];
                let completeHTML = (node.visualHTML || "") + renderOptions(node.options);
                addMessageObj(false, node.aiResponse, completeHTML);
            } else if (userText.toLowerCase().includes("access")) {
                const node = window.chatNodes['initial_access'];
                let completeHTML = (node.visualHTML || "") + renderOptions(node.options);
                addMessageObj(false, node.aiResponse, completeHTML);
            } else {
                addMessageObj(false, "No active operational scenario matched. Realtime telemetry active. Awaiting valid input (e.g. 'fire', 'visitor').");
            }
        }, 1200);
    }

    if (window.consoleClickSimulationListener02) {
        document.removeEventListener('click', window.consoleClickSimulationListener02);
    }
    window.consoleClickSimulationListener02 = function (e) {
        if (commandPalette && !commandPalette.contains(e.target) && e.target.id !== 'commandBtn' && !e.target.closest('#commandBtn')) {
            commandPalette.classList.remove('active');
            if (commandBtn) commandBtn.classList.remove('active');
        }
    };
    document.addEventListener('click', window.consoleClickSimulationListener02);

    const chatBox = document.getElementById("chatBox");

    // Keep typing indicator helper
    function typeText(element, text, speed = 15, callback = null) {
        let i = 0;
        const typeInterval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
            if (i >= text.length) {
                clearInterval(typeInterval);
                if (callback) callback();
            }
        }, speed);
    }

    function appendToBubble(bubbleContainer, htmlContent) {
        const contentDiv = bubbleContainer.querySelector(".bubble-content");
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Append all children and animate
        Array.from(tempDiv.children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.animation = `slideUpFade 0.4s forwards ${index * 0.1}s`;
            contentDiv.appendChild(child);
        });
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addMessageObj(isUser, text, htmlContent = null) {
        if (!chatBox) return;
        const bubbleContainer = document.createElement("div");
        bubbleContainer.className = "chat-msg";

        let avatarHtml = isUser
            ? `<div class="chat-avatar"><img src="https://i.pravatar.cc/100?img=11" alt="Brian"></div>`
            : `<div class="chat-avatar agent"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>`;

        let senderName = isUser ? "Brian" : "Antimetal";

        bubbleContainer.innerHTML = `
                    ${avatarHtml}
                    <div class="chat-content-wrap">
                        <div class="chat-sender">${senderName}</div>
                        <div class="chat-bubble bubble-content">
                            ${isUser ? text : ''}
                        </div>
                    </div>
                `;

        chatBox.appendChild(bubbleContainer);
        chatBox.scrollTop = chatBox.scrollHeight;

        if (!isUser) {
            const contentDiv = bubbleContainer.querySelector(".bubble-content");
            contentDiv.innerHTML = "";
            typeText(contentDiv, text, 15, () => {
                if (htmlContent) {
                    appendToBubble(bubbleContainer, htmlContent);
                }
            });
        }
    }


    // Visual HTML Generators
    const getTelemetryHTML = () => `
        <ul class="chat-telemetry">
            <li>Silent evacuation activated for Levels 11–13</li>
            <li>Emergency exit gates unlocked in affected zones</li>
            <li>Elevator access temporarily restricted</li>
            <li>Security and floor marshals notified</li>
            <li style="color:var(--accent-pink)">Estimated evacuation completion: 3m 18s</li>
            <li>Current occupancy in affected area: 42 people</li>
        </ul>
    `;

    const getMapHTML = () => `
        <div class="chat-visual-module">
            <div class="heatmap-visual">
                <div class="heatmap-zone"></div>
                <div class="heatmap-dot" style="top: 30%; left: 40%"></div>
                <div class="heatmap-dot" style="top: 60%; left: 50%; animation-delay: 0.5s"></div>
                <div class="heatmap-dot" style="top: 40%; left: 60%; animation-delay: 1s"></div>
            </div>
        </div>
    `;

    const getGatesHTML = () => `
        <div class="chat-visual-module">
            <div class="gate-visual">
                <div class="gate-indicator unlocked">GATE NORTH<br>UNLOCKED</div>
                <div class="gate-indicator unlocked">GATE EAST<br>UNLOCKED</div>
                <div class="gate-indicator unlocked">GATE WEST<br>UNLOCKED</div>
            </div>
        </div>
    `;

    const getVisitorTrackingHTML = () => `
        <div class="chat-visual-module">
            <ul class="chat-telemetry">
                <li><span style="color:#a78bfa">Target ID:</span> V-8991 (James W.)</li>
                <li><span style="color:#a78bfa">Last seen:</span> Corridor 4B (12 seconds ago)</li>
                <li><span style="color:#a78bfa">Status:</span> Unauthorized area</li>
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 1rem;">
                <button class="chat-action-btn primary" onclick="alert('Host Notified')">Notify Host</button>
                <button class="chat-action-btn secondary" onclick="alert('Security Dispatched')">Dispatch Security Guard</button>
            </div>
        </div>
    `;


    // Extended Visual HTML Generators for FIRE workflow
    const getDroneFeedHTML = () => `
        <div class="chat-visual-module" style="position:relative; background:#000; border: 1px solid rgba(255,100,100,0.3); padding:4px;">
            <div style="position:absolute; top:8px; right:8px; color:#ff4444; font-size:10px; font-weight:bold; animation: util-pulse 2s infinite;">REC</div>
            <div style="color:var(--accent-pink); font-size:11px; margin-bottom:4px; font-family:monospace;">UAV-04 // THERMAL OPTICS ONLINE</div>
            <div class="heatmap-visual" style="height: 80px; opacity: 0.8; filter: contrast(1.2);">
                <div class="heatmap-zone" style="width: 60px; height: 60px; background: radial-gradient(circle, rgba(255,50,50,0.8) 0%, rgba(0,0,0,0) 70%); top: 10px; left: 20px;"></div>
                <div class="heatmap-dot" style="top: 20%; left: 30%"></div>
                <div class="heatmap-dot" style="top: 50%; left: 40%; animation-delay: 0.3s"></div>
            </div>
        </div>
    `;

    const getStructuralHTML = (integrity) => `
        <ul class="chat-telemetry" style="border-left-color: #ff9900;">
            <li><span style="color:#ff9900">Structural Scan:</span> Sector 4</li>
            <li><span style="color:#ff9900">Load Bearing Beams:</span> Stable</li>
            <li><span style="color:#ff9900">Heat Stress:</span> Detected near Core B</li>
            <li><span style="color:${integrity < 50 ? '#ff4444' : '#a78bfa'}">Overall Integrity:</span> ${integrity}%</li>
        </ul>
    `;

    const getOxygenHTML = () => `
        <div class="chat-visual-module">
            <ul class="chat-telemetry" style="border-left-color: #00e6e6;">
                <li><span style="color:#00e6e6">Zone 4 Air Quality:</span> Critical</li>
                <li><span style="color:#00e6e6">O2 Levels:</span> 17.2% (Dropping)</li>
                <li><span style="color:#00e6e6">CO Levels:</span> 400 PPM (High)</li>
                <li><span style="color:#00e6e6">HVAC Dampers:</span> CLOSED</li>
            </ul>
        </div>
    `;

    const getEvacAnalyticsHTML = (capacity) => `
        <ul class="chat-telemetry" style="border-left-color: var(--accent-blue);">
            <li><span style="color:var(--accent-blue)">Stairwell B:</span> ${capacity}% Capacity</li>
            <li><span style="color:var(--accent-blue)">Flow Rate:</span> 18 persons/min</li>
            <li><span style="color:var(--accent-pink)">Bottleneck Detected:</span> Floor 11 Landing</li>
            <li>Routing algorithm recalculating...</li>
        </ul>
    `;

    const getMedicalDispatchHTML = () => `
        <div class="chat-visual-module">
            <div class="gate-visual" style="background: rgba(255, 50, 50, 0.1);">
                <div class="gate-indicator unlocked" style="color:#ff4444; border-color:#ff4444;">EMS UNIT 1<br>DISPATCHED</div>
                <div class="gate-indicator unlocked" style="color:#ff4444; border-color:#ff4444;">EMS UNIT 2<br>STANDBY</div>
                <div class="gate-indicator locked">TRIAGE ZONE<br>PENDING</div>
            </div>
        </div>
    `;

    const getPowerGridHTML = () => `
        <ul class="chat-telemetry" style="border-left-color: #facc15;">
            <li><span style="color:#facc15">Grid Status:</span> Re-routing</li>
            <li><span style="color:#facc15">Main Power:</span> Active (Zone 4 isolated)</li>
            <li><span style="color:#facc15">Emergency Generators:</span> Standby</li>
            <li><span style="color:#facc15">Server Room Backup:</span> 4hr 12m remaining</li>
        </ul>
    `;

    window.chatNodes = {
        'initial_fire': {
            aiResponse: "Fire alarm detected in Zone 4 (East Wing). Verifying via thermal sensors and visual feeds. Positive confirmation. Initiating emergency protocol.",
            visualHTML: getMapHTML(),
            options: [
                { label: "Analyze Smoke Spread", next: "fire_smoke_spread" },
                { label: "View Evacuation Map", next: "fire_evac_map" },
                { label: "Deploy Thermal Drones", next: "fire_deploy_drones" },
                { label: "Unlock Evacuation Routes", next: "fire_unlock" }
            ]
        },
        'fire_smoke_spread': {
            aiResponse: "Analyzing HVAC airflow and thermal dynamics. Smoke is spreading towards the North Corridor via ventilation shafts.",
            visualHTML: getOxygenHTML(),
            options: [
                { label: "Isolate HVAC System", next: "fire_isolate_hvac" },
                { label: "Detect Trapped Occupants", next: "fire_detect_trapped" },
                { label: "Activate Emergency Lighting", next: "fire_emergency_lighting" }
            ]
        },
        'fire_isolate_hvac': {
            aiResponse: "HVAC dampers in North Corridor and Zone 4 successfully closed. Smoke containment verified. Overpressurizing adjacent safe zones.",
            visualHTML: null,
            options: [
                { label: "Detect Trapped Occupants", next: "fire_detect_trapped" },
                { label: "Analyze Structural Integrity", next: "fire_structural_analysis" }
            ]
        },
        'fire_evac_map': {
            aiResponse: "Live evacuation telemetry engaged. Stairwell A is clear. Stairwell B is experiencing moderate congestion.",
            visualHTML: getEvacAnalyticsHTML(65),
            options: [
                { label: "Analyze Congestion", next: "fire_analyze_congestion" },
                { label: "Broadcast Reroute Audio", next: "fire_broadcast_reroute" }
            ]
        },
        'fire_analyze_congestion': {
            aiResponse: "Stairwell B capacity critical (89%). Panic density rising. Heat signatures indicate a bottleneck at Floor 11.",
            visualHTML: getEvacAnalyticsHTML(89),
            options: [
                { label: "Redirect Occupants", next: "fire_redirect_occupants" },
                { label: "Dispatch Floor Marshals", next: "fire_dispatch_marshals" }
            ]
        },
        'fire_redirect_occupants': {
            aiResponse: "Rerouting algorithm applied. Digital signage and PA systems now directing Floor 12-14 to Stairwell A and West Corridor.",
            visualHTML: null,
            options: [
                { label: "Open West Corridor", next: "fire_open_west_corridor" },
                { label: "Monitor Clearance Rate", next: "fire_monitor_clearance" }
            ]
        },
        'fire_deploy_drones': {
            aiResponse: "Autonomous indoor UAVs deployed to Zone 4. Streaming thermal optics and optical gas imaging.",
            visualHTML: getDroneFeedHTML(),
            options: [
                { label: "Scan Floor 12", next: "fire_scan_floor_12" },
                { label: "Identify Fire Source", next: "fire_identify_source" }
            ]
        },
        'fire_scan_floor_12': {
            aiResponse: "UAV-04 scanning Floor 12. Heavy smoke detected. Thermal signatures found in Server Room B.",
            visualHTML: getDroneFeedHTML(),
            options: [
                { label: "Detect Thermal Signatures", next: "fire_detect_trapped" },
                { label: "Initiate Server Shutdown", next: "fire_server_shutdown" }
            ]
        },
        'fire_unlock': {
            aiResponse: "Unlocking turnstiles and emergency exits in Zone 4. Securing elevators.",
            visualHTML: getGatesHTML(),
            options: [
                { label: "Broadcast Evacuation Audio", next: "fire_broadcast" },
                { label: "Show Live Occupancy", next: "fire_occupancy" },
                { label: "Override Service Elevator", next: "fire_elevator_override" }
            ]
        },
        'fire_broadcast': {
            aiResponse: "Evacuation audio sequence initiated across PA system in Zone 4 and adjacent sectors.",
            visualHTML: null,
            options: [
                { label: "Show Live Occupancy", next: "fire_occupancy" },
                { label: "Activate Smart Lighting", next: "fire_smart_lighting" }
            ]
        },
        'fire_detect_trapped': {
            aiResponse: "Thermal scanning reveals 3 stationary heat signatures in Sector 4B. Biometric analysis indicates elevated stress levels.",
            visualHTML: getTelemetryHTML().replace('42 people', '<span style="color:#ff4444">3 Trapped Individuals</span>'),
            options: [
                { label: "Identify Possible Casualties", next: "fire_identify_casualties" },
                { label: "Prioritize Rescue Routes", next: "fire_prioritize_rescue" }
            ]
        },
        'fire_identify_casualties': {
            aiResponse: "Signatures cross-referenced with badge data. HR records indicate 1 individual requires mobility assistance. Oxygen levels in their sector dropping.",
            visualHTML: getOxygenHTML(),
            options: [
                { label: "Dispatch Medical Team", next: "fire_dispatch_medical" },
                { label: "Increase Local Ventilation", next: "fire_local_ventilation" }
            ]
        },
        'fire_dispatch_medical': {
            aiResponse: "Onsite EMS team alerted. Sharing live thermal coordinates and safest access vector via mobile terminals.",
            visualHTML: getMedicalDispatchHTML(),
            options: [
                { label: "Secure Ambulance Route", next: "fire_secure_ambulance" },
                { label: "Set up Triage Zone", next: "fire_triage_zone" }
            ]
        },
        'fire_secure_ambulance': {
            aiResponse: "North Loading Bay gates locked OPEN. Route mapped to nearest hospital. ETA for external responders is 4 minutes.",
            visualHTML: null,
            options: [
                { label: "Enable Emergency Elevator", next: "fire_emergency_elevator" }
            ]
        },
        'fire_emergency_elevator': {
            aiResponse: "Service Elevator 3 overridden to manual control. Reserved strictly for EMS and Fire crews.",
            visualHTML: null,
            options: [
                { label: "Coordinate Fire Suppression", next: "fire_coordinate_suppression" }
            ]
        },
        'fire_structural_analysis': {
            aiResponse: "Analyzing load-bearing data and thermal stress. Sector 4 core temperatures are approaching critical thresholds.",
            visualHTML: getStructuralHTML(68),
            options: [
                { label: "Detect Beam Instability", next: "fire_beam_instability" },
                { label: "Deploy Fire Suppression", next: "fire_coordinate_suppression" }
            ]
        },
        'fire_beam_instability': {
            aiResponse: "Micro-fractures predicted in support beams near Core B within 15 minutes if heat is not reduced.",
            visualHTML: getStructuralHTML(42),
            options: [
                { label: "Lock Unsafe Zones", next: "fire_lock_unsafe_zones" },
                { label: "Reroute Responders", next: "fire_reroute_responders" }
            ]
        },
        'fire_lock_unsafe_zones': {
            aiResponse: "Zone 4 Core B hermetically sealed. Fire doors dropped. Access denied to all personnel including marshals.",
            visualHTML: getGatesHTML().replace(/UNLOCKED/g, 'LOCKED').replace(/unlocked/g, 'locked'),
            options: [
                { label: "Isolate Power Grid", next: "fire_isolate_power" },
                { label: "Monitor Collapse Risk", next: "fire_monitor_collapse" }
            ]
        },
        'fire_isolate_power': {
            aiResponse: "Main grid to Zone 4 severed to prevent electrical fires. UPS and emergency generators maintaining critical sensors.",
            visualHTML: getPowerGridHTML(),
            options: [
                { label: "Monitor Collapse Risk", next: "fire_monitor_collapse" }
            ]
        },
        'fire_monitor_collapse': {
            aiResponse: "Collapse risk stabilized at 12%. Heat expansion slowing due to structural isolation.",
            visualHTML: getStructuralHTML(55),
            options: [
                { label: "Update External Command", next: "fire_update_command" }
            ]
        },
        'fire_open_west_corridor': {
            aiResponse: "West Corridor emergency locks disengaged. Path illuminated with directional pulse LEDs.",
            visualHTML: getGatesHTML(),
            options: [
                { label: "Unlock Emergency Gates", next: "fire_unlock_gates" },
                { label: "Confirm Safe Passage", next: "fire_confirm_passage" }
            ]
        },
        'fire_unlock_gates': {
            aiResponse: "All perimeter egress gates are now open. Security protocols temporarily suspended for life safety.",
            visualHTML: null,
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'fire_confirm_passage': {
            aiResponse: "Optical sensors confirm 120 occupants have safely transitioned through the West Corridor.",
            visualHTML: getEvacAnalyticsHTML(15),
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'fire_smart_lighting': {
            aiResponse: "Emergency strobe sequencing active in heavy smoke areas to guide occupants to floor-level exits.",
            visualHTML: null,
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'fire_track_assembly': {
            aiResponse: "Muster points 1 and 2 reporting. 84% of affected personnel accounted for via badge check-ins and facial recognition.",
            visualHTML: null,
            options: [
                { label: "Cross-reference Missing Personnel", next: "fire_cross_reference" }
            ]
        },
        'fire_cross_reference': {
            aiResponse: "Cross-referencing missing personnel with last known access logs. 3 individuals unaccounted for.",
            visualHTML: getTelemetryHTML(),
            options: [
                { label: "Deploy Thermal Drones", next: "fire_deploy_drones" },
                { label: "Alert Rescue Teams", next: "fire_alert_rescue" }
            ]
        },
        'fire_coordinate_suppression': {
            aiResponse: "Autonomous halon gas suppression deploying in Server Room B. Water sprinklers active in Zone 4 corridors.",
            visualHTML: null,
            options: [
                { label: "Analyze Temperature Drop", next: "fire_temp_drop" }
            ]
        },
        'fire_temp_drop': {
            aiResponse: "Thermal scans indicate a 40% reduction in core fire temperature. Suppression efforts are succeeding.",
            visualHTML: getDroneFeedHTML(),
            options: [
                { label: "Execute Partial Infrastructure Shutdown", next: "fire_partial_shutdown" }
            ]
        },
        'fire_partial_shutdown': {
            aiResponse: "Non-critical water mains and gas lines in the East Wing have been valved off.",
            visualHTML: getPowerGridHTML(),
            options: [
                { label: "Update External Command", next: "fire_update_command" }
            ]
        },
        'fire_update_command': {
            aiResponse: "External Fire Department has arrived on site. Live telemetry, drone feeds, and structural data handed over to Incident Commander.",
            visualHTML: null,
            options: [
                { label: "Transfer Full System Control", next: "fire_transfer_control" }
            ]
        },
        'fire_transfer_control': {
            aiResponse: "System control transferred to FDNY Command Post. Mithriv entering monitoring-only mode for Zone 4.",
            visualHTML: null,
            options: [
            ]
        },
        'fire_server_shutdown': {
            aiResponse: "Server Room B initiated graceful shutdown sequence. Halon gas suppression armed.",
            visualHTML: null,
            options: [
                { label: "Deploy Fire Suppression", next: "fire_coordinate_suppression" }
            ]
        },
        'fire_identify_source': {
            aiResponse: "Thermal imaging confirms ignition point at Electrical Panel 4B. Chemical fire detected.",
            visualHTML: getDroneFeedHTML(),
            options: [
                { label: "Isolate Power Grid", next: "fire_isolate_power" },
                { label: "Deploy Fire Suppression", next: "fire_coordinate_suppression" }
            ]
        },
        'fire_dispatch_marshals': {
            aiResponse: "Floor marshals on Levels 10 and 11 alerted. Directing them to Stairwell B to manage flow rate.",
            visualHTML: null,
            options: [
                { label: "Analyze Congestion", next: "fire_analyze_congestion" }
            ]
        },
        'fire_monitor_clearance': {
            aiResponse: "Clearance rate improving. Estimated time to full evacuation of Sector 4 reduced to 2m 10s.",
            visualHTML: getEvacAnalyticsHTML(45),
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'fire_local_ventilation': {
            aiResponse: "Reversing local exhaust fans in Sector 4B to draw smoke away from trapped individuals.",
            visualHTML: getOxygenHTML(),
            options: [
                { label: "Prioritize Rescue Routes", next: "fire_prioritize_rescue" }
            ]
        },
        'fire_prioritize_rescue': {
            aiResponse: "Tactical route generated for Rescue Team Alpha. Route avoids structural weaknesses and heavy smoke pockets.",
            visualHTML: null,
            options: [
                { label: "Dispatch Medical Team", next: "fire_dispatch_medical" },
                { label: "Reroute Responders", next: "fire_reroute_responders" }
            ]
        },
        'fire_triage_zone': {
            aiResponse: "South Lobby designated as temporary triage. Directing all casualties to this location.",
            visualHTML: getMedicalDispatchHTML().replace('PENDING', 'ACTIVE').replace('locked', 'unlocked'),
            options: [
                { label: "Secure Ambulance Route", next: "fire_secure_ambulance" }
            ]
        },
        'fire_reroute_responders': {
            aiResponse: "Responders rerouted to Service Shaft C. Core B path marked as structurally unsafe.",
            visualHTML: null,
            options: [
                { label: "Update External Command", next: "fire_update_command" }
            ]
        },
        'fire_elevator_override': {
            aiResponse: "Service elevators secured at Ground Floor. Doors locked open. Ready for responder manual override.",
            visualHTML: null,
            options: [
                { label: "Enable Emergency Elevator", next: "fire_emergency_elevator" }
            ]
        },
        'fire_alert_rescue': {
            aiResponse: "Rescue teams updated with last known locations of 3 missing individuals.",
            visualHTML: null,
            options: [
                { label: "Prioritize Rescue Routes", next: "fire_prioritize_rescue" }
            ]
        },
        'fire_occupancy': {
            aiResponse: "Monitoring live telemetry. 42 individuals currently in affected zones. Evacuation in progress.",
            visualHTML: getTelemetryHTML(),
            options: [
                { label: "Analyze Congestion", next: "fire_analyze_congestion" },
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'initial_visitor': {
            aiResponse: "Anomaly detected: Visitor badge (V-8991) has entered a restricted server room corridor (Level 2). Host is currently on Level 4.",
            visualHTML: getVisitorTrackingHTML(),
            options: [
            ]
        },
        'initial_access': {
            aiResponse: "Multiple failed access attempts detected at North Server Room from badge HR-201. User is authorized for HR zones only.",
            visualHTML: null,
            options: [
                { label: "Lock Down North Sector", next: "access_lockdown" },
                { label: "Revoke Badge HR-201", next: "access_revoke" }
            ]
        },
        'access_lockdown': {
            aiResponse: "North Sector locked down. Access restricted to security personnel only.",
            visualHTML: getGatesHTML().replace(/unlocked/g, 'locked').replace(/UNLOCKED/g, 'LOCKED'),
            options: [
                { label: "Revoke Badge HR-201", next: "access_revoke" }
            ]
        },
        'access_revoke': {
            aiResponse: "Badge HR-201 credentials revoked system-wide. Alerting security team to location.",
            visualHTML: null,
            options: [
            ]
        }
    };

    function renderOptions(optionsArray) {
        if (!optionsArray || optionsArray.length === 0) return "";
        let html = '<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 1rem;">';
        optionsArray.forEach(opt => {
            html += `<button class="chat-action-btn secondary" onclick="handleOption('${opt.next}', this)">${opt.label}</button>`;
        });
        html += '</div>';
        return html;
    }

    // window.handleOption was removed from here because it was a duplicate that overrode the correct floating popup chat handler in the first script tag.

    // ── ADDITIONAL VISUAL HTML GENERATORS ───────────────────────

    const getFireHeatmapHTML = (intensity, zone, floor) => `
  <div class="chat-visual-module" style="background:rgba(20,0,0,0.5); border:1px solid rgba(255,60,0,0.3); border-radius:8px; padding:10px; margin-top:8px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <span style="font-family:monospace; font-size:10px; color:#ff6b35; letter-spacing:1px;">THERMAL MAP // ${zone} // FLOOR ${floor}</span>
      <span style="font-family:monospace; font-size:10px; color:#ff4444; animation:util-pulse 1.5s infinite;">● LIVE</span>
    </div>
    <div style="position:relative; height:90px; background:rgba(0,0,0,0.6); border-radius:4px; overflow:hidden;">
      <div style="position:absolute; top:${30 - intensity * 0.2}%; left:${40 - intensity * 0.1}%; width:${40 + intensity * 0.4}px; height:${40 + intensity * 0.4}px; background:radial-gradient(circle, rgba(255,30,0,0.9) 0%, rgba(255,100,0,0.5) 40%, transparent 70%); border-radius:50%;"></div>
      <div style="position:absolute; top:50%; left:60%; width:25px; height:25px; background:radial-gradient(circle, rgba(255,180,0,0.8) 0%, transparent 70%); border-radius:50%;"></div>
      <div style="position:absolute; top:20%; left:70%; width:15px; height:15px; background:radial-gradient(circle, rgba(255,80,0,0.6) 0%, transparent 70%); border-radius:50%;"></div>
      <div style="position:absolute; bottom:4px; right:6px; font-family:monospace; font-size:9px; color:rgba(255,255,255,0.5);">INTENSITY: ${intensity}%</div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:6px;">
      <span style="font-family:monospace; font-size:9px; color:#888;">■ CRITICAL</span>
      <span style="font-family:monospace; font-size:9px; color:#ff6b35;">■ HIGH</span>
      <span style="font-family:monospace; font-size:9px; color:#ffcc00;">■ MODERATE</span>
      <span style="font-family:monospace; font-size:9px; color:#44ff88;">■ SAFE</span>
    </div>
  </div>
`;

    const getSmokeSpreadHTML = (coverage) => `
  <div class="chat-visual-module" style="background:rgba(10,10,20,0.7); border:1px solid rgba(150,150,200,0.2); border-radius:8px; padding:10px; margin-top:8px;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span style="font-family:monospace; font-size:10px; color:#a0aec0; letter-spacing:1px;">SMOKE SPREAD SIMULATION</span>
      <span style="font-family:monospace; font-size:10px; color:#fc8181;">AIRBORNE TOXINS DETECTED</span>
    </div>
    <ul class="chat-telemetry" style="border-left-color:#718096;">
      <li><span style="color:#a0aec0">Smoke Coverage:</span> ${coverage}% of East Wing</li>
      <li><span style="color:#a0aec0">Spread Vector:</span> North via HVAC Shaft 4B</li>
      <li><span style="color:#a0aec0">CO Concentration:</span> 480 PPM (CRITICAL)</li>
      <li><span style="color:#fc8181">Predicted reach in 4 min:</span> Floors 10, 11, 12</li>
      <li><span style="color:#a0aec0">Wind assist factor:</span> +12% acceleration</li>
    </ul>
  </div>
`;

    const getDroneMultiFeedHTML = () => `
  <div class="chat-visual-module" style="background:#000; border:1px solid rgba(255,60,60,0.3); border-radius:8px; padding:8px; margin-top:8px;">
    <div style="font-family:monospace; font-size:10px; color:#ff6b35; margin-bottom:8px; letter-spacing:1px;">UAV SWARM // 4 UNITS ACTIVE // THERMAL OPTICS</div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
      <div style="position:relative; background:rgba(20,0,0,0.8); border:1px solid rgba(255,60,0,0.2); border-radius:4px; height:60px; overflow:hidden;">
        <div style="position:absolute; top:4px; left:4px; font-family:monospace; font-size:8px; color:#ff4444;">UAV-01 // FL.12</div>
        <div style="position:absolute; top:5px; right:4px; width:6px; height:6px; border-radius:50%; background:#ff4444; animation:util-pulse 1s infinite;"></div>
        <div style="position:absolute; top:30%; left:30%; width:20px; height:20px; background:radial-gradient(circle, rgba(255,50,0,0.9) 0%, transparent 70%); border-radius:50%;"></div>
      </div>
      <div style="position:relative; background:rgba(20,0,0,0.8); border:1px solid rgba(255,60,0,0.2); border-radius:4px; height:60px; overflow:hidden;">
        <div style="position:absolute; top:4px; left:4px; font-family:monospace; font-size:8px; color:#ff9900;">UAV-02 // FL.13</div>
        <div style="position:absolute; top:5px; right:4px; width:6px; height:6px; border-radius:50%; background:#ff9900; animation:util-pulse 1.3s infinite;"></div>
        <div style="position:absolute; top:40%; left:50%; width:12px; height:12px; background:radial-gradient(circle, rgba(255,150,0,0.8) 0%, transparent 70%); border-radius:50%;"></div>
      </div>
      <div style="position:relative; background:rgba(0,10,20,0.8); border:1px solid rgba(60,120,255,0.2); border-radius:4px; height:60px; overflow:hidden;">
        <div style="position:absolute; top:4px; left:4px; font-family:monospace; font-size:8px; color:#60a5fa;">UAV-03 // SERVER-B</div>
        <div style="position:absolute; top:5px; right:4px; width:6px; height:6px; border-radius:50%; background:#60a5fa; animation:util-pulse 0.8s infinite;"></div>
      </div>
      <div style="position:relative; background:rgba(0,10,20,0.8); border:1px solid rgba(60,120,255,0.2); border-radius:4px; height:60px; overflow:hidden;">
        <div style="position:absolute; top:4px; left:4px; font-family:monospace; font-size:8px; color:#60a5fa;">UAV-04 // STAIR-B</div>
        <div style="position:absolute; top:5px; right:4px; width:6px; height:6px; border-radius:50%; background:#60a5fa; animation:util-pulse 1.1s infinite;"></div>
      </div>
    </div>
    <div style="margin-top:8px; font-family:monospace; font-size:9px; color:rgba(255,255,255,0.4);">SIGNAL OK | 24FPS | ENCRYPTED UPLINK</div>
  </div>
`;

    const getCasualtyPredictionHTML = (risk) => `
  <div class="chat-visual-module" style="border:1px solid rgba(255,60,60,0.4); border-radius:8px; padding:10px; margin-top:8px; background:rgba(50,0,0,0.3);">
    <div style="font-family:monospace; font-size:10px; color:#fc8181; margin-bottom:8px; letter-spacing:1px;">AI CASUALTY PREDICTION ENGINE // ACTIVE</div>
    <ul class="chat-telemetry" style="border-left-color:#fc8181;">
      <li><span style="color:#fc8181">Casualty Probability:</span> ${risk}% without intervention</li>
      <li><span style="color:#fc8181">At-Risk Individuals:</span> 3 confirmed, 2 estimated</li>
      <li><span style="color:#fc8181">Mobility Impaired:</span> 1 individual (Badge: EMP-4421)</li>
      <li><span style="color:#a0aec0">Predicted escape window:</span> 6m 40s</li>
      <li><span style="color:#fc8181">Confidence:</span> 91.4% (sensor fusion active)</li>
    </ul>
  </div>
`;

    const getOccupancyRecalcHTML = (total, evacuated, remaining) => `
  <ul class="chat-telemetry" style="border-left-color:#a78bfa;">
    <li><span style="color:#a78bfa">Total Occupancy (Zone 4):</span> ${total} personnel</li>
    <li><span style="color:#4ade80">Confirmed Evacuated:</span> ${evacuated} (${Math.round(evacuated / total * 100)}%)</li>
    <li><span style="color:#fc8181">Remaining in Danger Zone:</span> ${remaining}</li>
    <li><span style="color:#a78bfa">Last Badge Scan:</span> Emergency Exit 2 (14s ago)</li>
    <li>Recalculation cycle: every 8 seconds</li>
  </ul>
`;

    const getStairwellCongestionHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(250,204,21,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(20,15,0,0.5);">
    <div style="font-family:monospace; font-size:10px; color:#facc15; margin-bottom:8px;">STAIRWELL CONGESTION ANALYSIS // REALTIME</div>
    <ul class="chat-telemetry" style="border-left-color:#facc15;">
      <li><span style="color:#facc15">Stairwell A:</span> 32% capacity — CLEAR</li>
      <li><span style="color:#fc8181">Stairwell B:</span> 94% capacity — CRITICAL BOTTLENECK</li>
      <li><span style="color:#facc15">Stairwell C:</span> 58% capacity — MODERATE</li>
      <li><span style="color:#a0aec0">Density at Floor 11 Landing:</span> 4.1 persons/m²</li>
      <li><span style="color:#fc8181">Panic risk at current density:</span> HIGH</li>
    </ul>
  </div>
`;

    const getResponderCoordHTML = (eta) => `
  <div class="chat-visual-module" style="border:1px solid rgba(60,200,120,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(0,20,10,0.5);">
    <div style="font-family:monospace; font-size:10px; color:#4ade80; margin-bottom:8px;">RESPONDER COORDINATION // LIVE SYNC</div>
    <ul class="chat-telemetry" style="border-left-color:#4ade80;">
      <li><span style="color:#4ade80">Fire Dept. Engine 14:</span> ETA ${eta}m — Inbound via Route A</li>
      <li><span style="color:#4ade80">Ladder Co. 7:</span> ETA ${eta + 1}m — Inbound via Route B</li>
      <li><span style="color:#60a5fa">Hazmat Unit 3:</span> ETA ${eta + 4}m — On standby</li>
      <li><span style="color:#4ade80">Site Security (Alpha Team):</span> On-site — Floor 10</li>
      <li><span style="color:#a0aec0">Shared data:</span> Floor plans, thermal map, access codes</li>
    </ul>
  </div>
`;

    const getExecEvacHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(168,139,250,0.4); border-radius:8px; padding:10px; margin-top:8px; background:rgba(20,0,40,0.4);">
    <div style="font-family:monospace; font-size:10px; color:#a78bfa; margin-bottom:8px;">EXECUTIVE EVACUATION PROTOCOL // PRIORITY ALPHA</div>
    <ul class="chat-telemetry" style="border-left-color:#a78bfa;">
      <li><span style="color:#a78bfa">CEO (Badge: EXC-001):</span> Evacuated via Roof Helipad — CONFIRMED</li>
      <li><span style="color:#a78bfa">CFO (Badge: EXC-002):</span> Evacuating — Escort active, Floor 9</li>
      <li><span style="color:#facc15">COO (Badge: EXC-003):</span> Location unconfirmed — Search initiated</li>
      <li><span style="color:#a0aec0">Board members:</span> 4 of 5 confirmed at Assembly Point 1</li>
      <li>Security detail briefed with live telemetry</li>
    </ul>
  </div>
`;

    const getHazmatHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:10px; margin-top:8px; background:rgba(20,15,0,0.5);">
    <div style="font-family:monospace; font-size:10px; color:#facc15; margin-bottom:8px;">HAZARDOUS MATERIAL ISOLATION // SECTOR 4B</div>
    <ul class="chat-telemetry" style="border-left-color:#facc15;">
      <li><span style="color:#facc15">Chemical Storage Room 4B:</span> SEALED — Fire doors active</li>
      <li><span style="color:#fc8181">Material: Class B Flammable Liquids</span> — Contact risk HIGH</li>
      <li><span style="color:#facc15">Sprinkler override:</span> ACTIVE (water suppression disabled near chemicals)</li>
      <li><span style="color:#4ade80">Halon system:</span> Armed and ready</li>
      <li><span style="color:#a0aec0">Hazmat team notified:</span> ETA 8 minutes</li>
    </ul>
  </div>
`;

    const getBuildingHealthHTML = (score) => `
  <div class="chat-visual-module" style="border:1px solid rgba(99,102,241,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(10,10,30,0.5);">
    <div style="font-family:monospace; font-size:10px; color:#818cf8; margin-bottom:8px;">LIVE BUILDING HEALTH SCORE</div>
    <div style="text-align:center; margin:8px 0;">
      <span style="font-size:36px; font-family:monospace; color:${score > 60 ? '#facc15' : '#fc8181'}; font-weight:bold;">${score}</span>
      <span style="font-size:14px; color:rgba(255,255,255,0.4); font-family:monospace;">/100</span>
    </div>
    <ul class="chat-telemetry" style="border-left-color:#818cf8;">
      <li><span style="color:#818cf8">Structural Integrity:</span> ${score + 10}% — Stressed</li>
      <li><span style="color:#818cf8">HVAC Status:</span> Compromised (Zone 4 isolated)</li>
      <li><span style="color:#818cf8">Electrical Systems:</span> Partial (Zone 4 severed)</li>
      <li><span style="color:#818cf8">Fire Suppression:</span> Active — 3 zones engaged</li>
      <li><span style="color:#818cf8">Life Safety Systems:</span> Operational</li>
    </ul>
  </div>
`;

    const getPanicDensityHTML = () => `
  <ul class="chat-telemetry" style="border-left-color:#f97316;">
    <li><span style="color:#f97316">Panic Density Index:</span> 7.2 / 10 — CRITICAL</li>
    <li><span style="color:#f97316">Crowd Velocity:</span> Erratic — non-directional flow detected</li>
    <li><span style="color:#f97316">Stampede Risk:</span> 38% if current conditions persist</li>
    <li><span style="color:#a0aec0">Intervention:</span> PA override + digital signage rerouting active</li>
    <li>Calm Audio Sequence: Broadcasting Zone 4 now</li>
  </ul>
`;

    const getInfraShutdownHTML = () => `
  <ul class="chat-telemetry" style="border-left-color:#facc15;">
    <li><span style="color:#facc15">Gas Mains (East Wing):</span> VALVED OFF</li>
    <li><span style="color:#facc15">Non-critical Power (Zone 4):</span> SEVERED</li>
    <li><span style="color:#facc15">Water Mains (Zone 4):</span> ISOLATED</li>
    <li><span style="color:#4ade80">Emergency Lighting:</span> ACTIVE — Battery UPS</li>
    <li><span style="color:#4ade80">Critical Sensors:</span> ONLINE — Generator power</li>
    <li><span style="color:#4ade80">Server Room Backup:</span> 4h 12m remaining</li>
  </ul>
`;

    const getTacticalBlueprintHTML = (floor) => `
  <div class="chat-visual-module" style="background:#000; border:1px solid rgba(60,120,255,0.3); border-radius:8px; padding:10px; margin-top:8px;">
    <div style="font-family:monospace; font-size:10px; color:#60a5fa; margin-bottom:8px; letter-spacing:1px;">TACTICAL BLUEPRINT // FLOOR ${floor} // SYNCHRONIZED</div>
    <div style="position:relative; height:100px; background:rgba(5,10,30,0.9); border-radius:4px; overflow:hidden; border:1px solid rgba(60,120,255,0.1);">
      <div style="position:absolute; top:10%; left:5%; width:30%; height:40%; border:1px solid rgba(60,120,255,0.5); border-radius:2px;"></div>
      <div style="position:absolute; top:10%; left:40%; width:20%; height:80%; border:1px solid rgba(60,120,255,0.5); border-radius:2px;"></div>
      <div style="position:absolute; top:10%; left:65%; width:30%; height:40%; border:1px solid rgba(255,60,60,0.6); border-radius:2px; background:rgba(255,0,0,0.05);"></div>
      <div style="position:absolute; top:4px; left:66%; font-family:monospace; font-size:7px; color:#fc8181;">FIRE ZONE</div>
      <div style="position:absolute; bottom:10%; left:5%; width:90%; height:1px; background:rgba(60,120,255,0.2);"></div>
      <div style="position:absolute; bottom:8%; left:8%; font-family:monospace; font-size:7px; color:#60a5fa;">CORRIDOR A</div>
      <div style="position:absolute; top:50%; left:36%; width:4%; height:4%; background:#4ade80; border-radius:50%;"></div>
      <div style="position:absolute; top:50%; left:36%; font-family:monospace; font-size:7px; color:#4ade80; top:60%; left:35%;">EXIT</div>
    </div>
    <div style="font-family:monospace; font-size:9px; color:rgba(255,255,255,0.4); margin-top:6px;">SYNCED WITH FDNY INCIDENT COMMAND // VERSION 3.2</div>
  </div>
`;

    const getAssemblyZoneHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(74,222,128,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(0,20,10,0.4);">
    <div style="font-family:monospace; font-size:10px; color:#4ade80; margin-bottom:8px;">ASSEMBLY ZONE TRACKING // REALTIME MUSTER</div>
    <ul class="chat-telemetry" style="border-left-color:#4ade80;">
      <li><span style="color:#4ade80">Zone A (North Plaza):</span> 142 confirmed — 98% expected</li>
      <li><span style="color:#4ade80">Zone B (South Parking):</span> 87 confirmed — 91% expected</li>
      <li><span style="color:#facc15">Zone C (East Gate):</span> 34 confirmed — 62% expected</li>
      <li><span style="color:#fc8181">Missing from all zones:</span> 7 personnel</li>
      <li><span style="color:#a0aec0">Facial recognition:</span> Augmenting badge data</li>
    </ul>
  </div>
`;

    const getBroadcastRerouteHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(168,139,250,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(15,0,30,0.4);">
    <div style="font-family:monospace; font-size:10px; color:#a78bfa; margin-bottom:8px;">PA + DIGITAL SIGNAGE // EMERGENCY BROADCAST</div>
    <ul class="chat-telemetry" style="border-left-color:#a78bfa;">
      <li><span style="color:#a78bfa">PA System:</span> Active — Zone 4, 5, adjacent corridors</li>
      <li><span style="color:#a78bfa">Digital Signage (32 panels):</span> Rerouting arrows active</li>
      <li><span style="color:#a78bfa">Elevator Displays:</span> OUT OF SERVICE message pushed</li>
      <li><span style="color:#a0aec0">Message:</span> "Proceed calmly to nearest stairwell"</li>
      <li><span style="color:#4ade80">Calm tone audio:</span> Broadcasting in all affected areas</li>
    </ul>
  </div>
`;

    const getElevatorOverrideDetailHTML = () => `
  <ul class="chat-telemetry" style="border-left-color:#60a5fa;">
    <li><span style="color:#60a5fa">Elevators 1–6:</span> LOCKED OUT — All stops cancelled</li>
    <li><span style="color:#60a5fa">Service Elevator 7:</span> OVERRIDE — EMS use only</li>
    <li><span style="color:#60a5fa">Service Elevator 8:</span> OVERRIDE — Fire Dept. use only</li>
    <li><span style="color:#facc15">Emergency recall:</span> All cars recalled to Ground Floor</li>
    <li><span style="color:#a0aec0">Phase 2 Firefighter Mode:</span> Ready for activation</li>
  </ul>
`;

    const getHVACContainmentHTML = () => `
  <ul class="chat-telemetry" style="border-left-color:#00e6e6;">
    <li><span style="color:#00e6e6">Zone 4 Supply Air:</span> STOPPED — Damper closed</li>
    <li><span style="color:#00e6e6">Zone 4 Return Air:</span> STOPPED — Damper closed</li>
    <li><span style="color:#00e6e6">North Corridor Duct 4B:</span> SEALED — Smoke barrier active</li>
    <li><span style="color:#4ade80">Adjacent zones:</span> Positive pressure maintained</li>
    <li><span style="color:#00e6e6">Stairwell pressurization:</span> Active — Smoke intrusion blocked</li>
  </ul>
`;

    const getAIRiskScoringHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(252,129,129,0.4); border-radius:8px; padding:10px; margin-top:8px; background:rgba(30,0,0,0.4);">
    <div style="font-family:monospace; font-size:10px; color:#fc8181; margin-bottom:8px;">AI RISK SCORING ENGINE // MULTI-VECTOR</div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <div style="background:rgba(255,60,60,0.1); border:1px solid rgba(255,60,60,0.2); border-radius:4px; padding:6px; text-align:center;">
        <div style="font-family:monospace; font-size:18px; color:#fc8181; font-weight:bold;">8.7</div>
        <div style="font-family:monospace; font-size:8px; color:rgba(255,255,255,0.5);">FIRE SPREAD RISK</div>
      </div>
      <div style="background:rgba(250,204,21,0.1); border:1px solid rgba(250,204,21,0.2); border-radius:4px; padding:6px; text-align:center;">
        <div style="font-family:monospace; font-size:18px; color:#facc15; font-weight:bold;">6.2</div>
        <div style="font-family:monospace; font-size:8px; color:rgba(255,255,255,0.5);">STRUCTURAL RISK</div>
      </div>
      <div style="background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.2); border-radius:4px; padding:6px; text-align:center;">
        <div style="font-family:monospace; font-size:18px; color:#f97316; font-weight:bold;">7.4</div>
        <div style="font-family:monospace; font-size:8px; color:rgba(255,255,255,0.5);">EVACUATION RISK</div>
      </div>
      <div style="background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.2); border-radius:4px; padding:6px; text-align:center;">
        <div style="font-family:monospace; font-size:18px; color:#4ade80; font-weight:bold;">3.1</div>
        <div style="font-family:monospace; font-size:8px; color:rgba(255,255,255,0.5);">CASUALTY RISK</div>
      </div>
    </div>
    <div style="font-family:monospace; font-size:9px; color:rgba(255,255,255,0.4); margin-top:8px;">COMPOSITE THREAT INDEX: 7.1 // UPDATED 2s AGO</div>
  </div>
`;

    const getPostIncidentHTML = () => `
  <div class="chat-visual-module" style="border:1px solid rgba(74,222,128,0.3); border-radius:8px; padding:10px; margin-top:8px; background:rgba(0,20,10,0.4);">
    <div style="font-family:monospace; font-size:10px; color:#4ade80; margin-bottom:8px; letter-spacing:1px;">POST-INCIDENT ANALYTICS // GENERATING</div>
    <ul class="chat-telemetry" style="border-left-color:#4ade80;">
      <li><span style="color:#4ade80">Total evacuation time:</span> 11m 42s (SLA: 15m) — PASSED</li>
      <li><span style="color:#4ade80">Injuries reported:</span> 2 minor (smoke inhalation)</li>
      <li><span style="color:#4ade80">Fatalities:</span> Zero</li>
      <li><span style="color:#4ade80">System response lag:</span> 1.4s average</li>
      <li><span style="color:#a0aec0">Evidence package:</span> Auto-compiled — 847 event logs</li>
      <li><span style="color:#a0aec0">Compliance report:</span> Submitted to OSHA module</li>
    </ul>
  </div>
`;

    const getAutonomousLockdownHTML = () => `
  <ul class="chat-telemetry" style="border-left-color:#fc8181;">
    <li><span style="color:#fc8181">Autonomous Lockdown:</span> ENGAGED — Zone 4 + adjacents</li>
    <li><span style="color:#fc8181">Doors locked:</span> 47 of 47 in fire zones</li>
    <li><span style="color:#fc8181">Turnstiles:</span> OPEN — Egress-only mode</li>
    <li><span style="color:#facc15">Overrides active:</span> EMS + Fire Dept. credentials</li>
    <li><span style="color:#a0aec0">Trigger logic:</span> Multi-sensor threshold breach confirmed</li>
  </ul>
`;

    // ── FIRE WORKFLOW NODES (additional — extends existing chatNodes) ─

    Object.assign(window.chatNodes, {

        // ─── DEEP SMOKE BRANCH ─────────────────────────────────────
        'fire_smoke_detailed': {
            aiResponse: "Multi-sensor smoke trajectory modeling complete. Three primary vectors identified. HVAC Shaft 4B is the primary propagation route. Estimated 4 minutes to full North Corridor saturation.",
            visualHTML: getSmokeSpreadHTML(34),
            options: [
                { label: "Activate HVAC Containment", next: "fire_hvac_containment" },
                { label: "Run AI Risk Scoring", next: "fire_ai_risk_score" },
                { label: "Analyze Panic Density", next: "fire_panic_density" }
            ]
        },
        'fire_hvac_containment': {
            aiResponse: "HVAC containment sequence executed. All 14 dampers in affected ducts sealed within 800ms. Stairwell pressurization systems activated to prevent smoke ingress into evacuation routes.",
            visualHTML: getHVACContainmentHTML(),
            options: [
                { label: "Confirm Oxygen Levels", next: "fire_oxygen_confirm" },
                { label: "Activate Emergency Lighting", next: "fire_emergency_lighting" },
                { label: "Analyze Panic Density", next: "fire_panic_density" }
            ]
        },
        'fire_oxygen_confirm': {
            aiResponse: "Post-containment air quality readings incoming. O2 levels stabilizing in protected corridors. Zone 4 core remains hazardous — do not route responders without breathing apparatus.",
            visualHTML: getOxygenHTML(),
            options: [
                { label: "Deploy Drone Swarm", next: "fire_drone_swarm" },
                { label: "Dispatch Medical Team", next: "fire_dispatch_medical" }
            ]
        },

        // ─── DRONE SWARM DEEP BRANCH ───────────────────────────────
        'fire_drone_swarm': {
            aiResponse: "Autonomous UAV swarm of 4 units deployed and forming a coordinated search grid. Thermal optics and optical gas imaging active. Uplink encrypted.",
            visualHTML: getDroneMultiFeedHTML(),
            options: [
                { label: "Detect Trapped Signatures", next: "fire_detect_thermal_signatures" },
                { label: "Map Fire Origin Point", next: "fire_map_origin" },
                { label: "Scan Hazmat Storage", next: "fire_scan_hazmat" }
            ]
        },
        'fire_detect_thermal_signatures': {
            aiResponse: "UAV-01 has locked onto 3 stationary thermal signatures in Sector 4B. One signature shows significantly reduced movement. AI casualty prediction engine engaged.",
            visualHTML: getCasualtyPredictionHTML(71),
            options: [
                { label: "Identify Occupants by Badge", next: "fire_badge_crossref" },
                { label: "Prioritize Rescue Route", next: "fire_prioritize_rescue" },
                { label: "Increase Local Ventilation", next: "fire_local_ventilation" }
            ]
        },
        'fire_badge_crossref': {
            aiResponse: "Thermal signatures cross-referenced with access logs and HR records. Identity confirmed on 2 of 3 individuals. One requires mobility assistance. Oxygen window is approximately 6 minutes.",
            visualHTML: getCasualtyPredictionHTML(58),
            options: [
                { label: "Dispatch Medical Team", next: "fire_dispatch_medical" },
                { label: "Enable Emergency Elevator", next: "fire_emergency_elevator" },
                { label: "Alert Rescue Teams", next: "fire_alert_rescue" }
            ]
        },
        'fire_map_origin': {
            aiResponse: "Photogrammetric analysis complete. Fire origin confirmed: Electrical Panel 4B — arc flash event, Class C fire (electrical). Chemical accelerant not detected. Spread rate: moderate.",
            visualHTML: getFireHeatmapHTML(88, "ZONE-4B", "12"),
            options: [
                { label: "Isolate Power Grid", next: "fire_isolate_power" },
                { label: "Deploy Halon Suppression", next: "fire_halon_deploy" },
                { label: "Structural Analysis", next: "fire_structural_analysis" }
            ]
        },
        'fire_scan_hazmat': {
            aiResponse: "UAV-03 has reached Chemical Storage 4B. Class B flammable liquids detected. Container seals intact. Risk of boilover if temperature exceeds 180°C — current: 142°C. Time-critical.",
            visualHTML: getHazmatHTML(),
            options: [
                { label: "Isolate Hazmat Zone", next: "fire_hazmat_isolate" },
                { label: "Deploy Halon Suppression", next: "fire_halon_deploy" }
            ]
        },
        'fire_hazmat_isolate': {
            aiResponse: "Chemical Storage 4B hermetically sealed. Blast-rated fire doors activated. Ventilation to that cell reversed. Halon system armed — awaiting final authorization before discharge.",
            visualHTML: getHazmatHTML(),
            options: [
                { label: "Authorize Halon Discharge", next: "fire_halon_deploy" },
                { label: "Notify Hazmat Unit", next: "fire_notify_hazmat" }
            ]
        },
        'fire_notify_hazmat': {
            aiResponse: "FDNY Hazmat Unit 3 notified with chemical inventory, container counts, and floor coordinates. Hazmat team ETA: 8 minutes. Site safety officer briefed.",
            visualHTML: getResponderCoordHTML(8),
            options: [
                { label: "Coordinate All Responders", next: "fire_responder_coord" }
            ]
        },

        // ─── EVACUATION DEEP BRANCH ────────────────────────────────
        'fire_full_evac_map': {
            aiResponse: "Full building evacuation map rendered. Primary routes active. Stairwell B critical. Smart routing algorithm recalculated 4 times in the last 90 seconds based on live occupancy data.",
            visualHTML: getEvacAnalyticsHTML(72),
            options: [
                { label: "Analyze Stairwell Congestion", next: "fire_stairwell_deep" },
                { label: "Broadcast Reroute Audio", next: "fire_broadcast_reroute" },
                { label: "Open All Emergency Gates", next: "fire_open_all_gates" }
            ]
        },
        'fire_stairwell_deep': {
            aiResponse: "Stairwell congestion mapping complete. Stairwell B at 94% — critically overcrowded. Real-time panic density index at 7.2 out of 10. Intervention required immediately.",
            visualHTML: getStairwellCongestionHTML(),
            options: [
                { label: "Analyze Panic Density", next: "fire_panic_density" },
                { label: "Redirect to Stairwell A", next: "fire_redirect_stairwell_a" },
                { label: "Dispatch Floor Marshals", next: "fire_dispatch_marshals" }
            ]
        },
        'fire_panic_density': {
            aiResponse: "Panic density analysis engaged. Crowd behavior AI detecting erratic bidirectional movement at the Floor 11 landing junction. Stampede risk at 38%. Broadcast intervention deployed.",
            visualHTML: getPanicDensityHTML(),
            options: [
                { label: "Broadcast Reroute Audio", next: "fire_broadcast_reroute" },
                { label: "Open West Corridor", next: "fire_open_west_corridor" }
            ]
        },
        'fire_redirect_stairwell_a': {
            aiResponse: "Stairwell A now designated primary route for Floors 10–14. Digital floor signs and PA reconfigured. Flow rate projections show 4x improvement within 90 seconds of redirection.",
            visualHTML: getEvacAnalyticsHTML(31),
            options: [
                { label: "Monitor Clearance Rate", next: "fire_monitor_clearance" },
                { label: "Confirm Safe Passage", next: "fire_confirm_passage" }
            ]
        },
        'fire_broadcast_reroute': {
            aiResponse: "PA system activated with directional guidance. Digital signage on all 32 panels updated. Elevator displays show OUT OF SERVICE. Calm audio tone broadcasting on a 30-second loop.",
            visualHTML: getBroadcastRerouteHTML(),
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" },
                { label: "Recalculate Occupancy", next: "fire_recalculate_occupancy" }
            ]
        },
        'fire_recalculate_occupancy': {
            aiResponse: "Occupancy engine running continuous recalculation. Badge reads, thermal sensor counts, and video analytics fused into a single live model. Margin of error: ±3 persons.",
            visualHTML: getOccupancyRecalcHTML(112, 98, 14),
            options: [
                { label: "Cross-reference Missing Personnel", next: "fire_cross_reference" },
                { label: "Locate Unaccounted Individuals", next: "fire_locate_missing" }
            ]
        },
        'fire_locate_missing': {
            aiResponse: "Correlating badge swipes, camera timestamps, and biometric data for 7 unaccounted individuals. 4 confirmed as working remotely today. 3 genuinely unlocated.",
            visualHTML: getCasualtyPredictionHTML(44),
            options: [
                { label: "Deploy Drone Swarm", next: "fire_drone_swarm" },
                { label: "Alert Rescue Teams", next: "fire_alert_rescue" }
            ]
        },
        'fire_open_all_gates': {
            aiResponse: "All perimeter emergency egress gates unlocked in life-safety override mode. Normal access control suspended. Security personnel stationed at all 6 perimeter exits.",
            visualHTML: getGatesHTML(),
            options: [
                { label: "Track Assembly Zones", next: "fire_track_assembly" },
                { label: "Secure Ambulance Route", next: "fire_secure_ambulance" }
            ]
        },
        'fire_emergency_lighting': {
            aiResponse: "Emergency LED pulse sequencing activated throughout Zone 4 and adjacent corridors. Floor-level photoluminescent strip lighting engaged. Strobes directing to floor exits.",
            visualHTML: null,
            options: [
                { label: "Elevator Override", next: "fire_elevator_override_detail" },
                { label: "Track Assembly Zones", next: "fire_track_assembly" }
            ]
        },
        'fire_elevator_override_detail': {
            aiResponse: "All passenger elevators recalled to ground floor. Phase 1 Firefighter Service Mode engaged. Service Elevators 7 and 8 locked under responder-exclusive access.",
            visualHTML: getElevatorOverrideDetailHTML(),
            options: [
                { label: "Coordinate Responders", next: "fire_responder_coord" }
            ]
        },

        // ─── STRUCTURAL DEEP BRANCH ────────────────────────────────
        'fire_structural_detail': {
            aiResponse: "Deploying sensor-fusion structural analysis. Accelerometers, thermal stress sensors, and acoustic monitors all active. Beam deflection modeled in real-time.",
            visualHTML: getStructuralHTML(61),
            options: [
                { label: "Detect Beam Instability", next: "fire_beam_instability" },
                { label: "Check Building Health Score", next: "fire_building_health" },
                { label: "Lock Unsafe Zones", next: "fire_lock_unsafe_zones" }
            ]
        },
        'fire_building_health': {
            aiResponse: "Live Building Health Score computed across 14 subsystems: structural, HVAC, electrical, life safety, fire suppression, and communications. Current composite: 41 — CRITICAL.",
            visualHTML: getBuildingHealthHTML(41),
            options: [
                { label: "Execute Infrastructure Shutdown", next: "fire_infra_shutdown_deep" },
                { label: "Reroute Responders", next: "fire_reroute_responders" },
                { label: "Monitor Collapse Risk", next: "fire_monitor_collapse" }
            ]
        },
        'fire_infra_shutdown_deep': {
            aiResponse: "Partial infrastructure shutdown initiated across the East Wing. Non-essential utilities isolated in sequence to avoid shock cascades. Critical systems maintained on UPS.",
            visualHTML: getInfraShutdownHTML(),
            options: [
                { label: "Reroute Power Grid", next: "fire_power_reroute" },
                { label: "Update External Command", next: "fire_update_command" }
            ]
        },
        'fire_power_reroute': {
            aiResponse: "Power grid rerouted. Zone 4 main circuits severed. Emergency bus now serving life-safety systems, sensor network, PA, and server room UPS. No critical system downtime.",
            visualHTML: getPowerGridHTML(),
            options: [
                { label: "Deploy Fire Suppression", next: "fire_coordinate_suppression" },
                { label: "Monitor Collapse Risk", next: "fire_monitor_collapse" }
            ]
        },

        // ─── RESPONDER COORDINATION BRANCH ────────────────────────
        'fire_responder_coord': {
            aiResponse: "Responder synchronization active. All units have received encrypted data package: floor plans, thermal overlays, hazmat inventory, access credentials, and live sensor feeds.",
            visualHTML: getResponderCoordHTML(3),
            options: [
                { label: "Sync Tactical Blueprint", next: "fire_tactical_blueprint" },
                { label: "Establish EMS Triage Zone", next: "fire_triage_zone" },
                { label: "Reroute Responders from Danger", next: "fire_reroute_responders" }
            ]
        },
        'fire_tactical_blueprint': {
            aiResponse: "Tactical blueprint synchronized with FDNY Incident Command tablet. Version 3.2 includes real-time fire boundary updates, responder waypoints, and known hazard markers.",
            visualHTML: getTacticalBlueprintHTML(12),
            options: [
                { label: "Assign Sector Responsibilities", next: "fire_sector_assign" },
                { label: "Update External Command", next: "fire_update_command" }
            ]
        },
        'fire_sector_assign': {
            aiResponse: "Sector assignments relayed to all units. Alpha Team: Sector 4B rescue. Engine 14: Fire suppression at Panel 4B. Ladder 7: Roof access and ventilation. Hazmat 3: Chemical Storage containment.",
            visualHTML: getResponderCoordHTML(2),
            options: [
                { label: "Monitor All Sectors Live", next: "fire_monitor_all_sectors" }
            ]
        },
        'fire_monitor_all_sectors': {
            aiResponse: "Entering multi-sector monitoring mode. All sensor feeds, drone uplinks, and badge activity aggregated into unified incident command view. Feeding directly to FDNY Command Post.",
            visualHTML: getDroneMultiFeedHTML(),
            options: [
                { label: "Begin Post-Incident Reporting", next: "fire_post_incident" },
                { label: "Transfer Full System Control", next: "fire_transfer_control" }
            ]
        },

        // ─── EXECUTIVE EVACUATION BRANCH ──────────────────────────
        'fire_exec_evac': {
            aiResponse: "Priority Alpha evacuation sequence initiated for executive personnel. Dedicated security escorts assigned. C-suite badge locations pulled from real-time access logs.",
            visualHTML: getExecEvacHTML(),
            options: [
                { label: "Locate COO", next: "fire_locate_coo" },
                { label: "Secure Ambulance Route", next: "fire_secure_ambulance" }
            ]
        },
        'fire_locate_coo': {
            aiResponse: "Last badge read for COO: Floor 11, Meeting Room 11C (22 minutes ago). Camera search initiated. Thermal drone redirected to Floor 11 perimeter.",
            visualHTML: getDroneFeedHTML(),
            options: [
                { label: "Dispatch Escort Team", next: "fire_dispatch_marshals" },
                { label: "Alert Rescue Teams", next: "fire_alert_rescue" }
            ]
        },

        // ─── SUPPRESSION DEEP BRANCH ──────────────────────────────
        'fire_halon_deploy': {
            aiResponse: "Halon 1301 gas suppression discharged in Server Room B and Chemical Storage 4B. Suppression effective. Fire indicators in those cells dropping. Zone sealed — do not enter for 15 minutes.",
            visualHTML: null,
            options: [
                { label: "Coordinate Water Suppression", next: "fire_coordinate_suppression" },
                { label: "Analyze Temperature Drop", next: "fire_temp_drop" }
            ]
        },

        // ─── AI RISK SCORING BRANCH ───────────────────────────────
        'fire_ai_risk_score': {
            aiResponse: "Multi-vector risk scoring complete. Composite Threat Index: 7.1 out of 10. Highest risk factors: fire spread vector and evacuation congestion. Casualty risk suppressed by active intervention.",
            visualHTML: getAIRiskScoringHTML(),
            options: [
                { label: "Escalate to Full Lockdown", next: "fire_auto_lockdown" },
                { label: "Coordinate All Responders", next: "fire_responder_coord" },
                { label: "Check Building Health Score", next: "fire_building_health" }
            ]
        },
        'fire_auto_lockdown': {
            aiResponse: "Autonomous lockdown logic executed. AI-triggered based on: sustained multi-sensor fire confirmation, occupancy risk threshold breach, and 90-second escalation window expiry. All criteria met.",
            visualHTML: getAutonomousLockdownHTML(),
            options: [
                { label: "Reroute Power Grid", next: "fire_power_reroute" },
                { label: "Coordinate All Responders", next: "fire_responder_coord" }
            ]
        },

        // ─── POST INCIDENT BRANCH ─────────────────────────────────
        'fire_post_incident': {
            aiResponse: "Incident contained. Post-incident analytics package auto-compiled. All 847 system events logged with timestamps. Zero fatalities. Compliance report pre-staged for OSHA and building authority.",
            visualHTML: getPostIncidentHTML(),
            options: [
                { label: "Transfer Full System Control", next: "fire_transfer_control" }
            ]
        },

        // ─── ENTRY POINT UPGRADE (replaces basic initial_fire) ────
        'initial_fire': {
            aiResponse: "FIRE PROTOCOL ACTIVATED — Zone 4, East Wing, Floor 12. Multi-sensor confirmation: smoke detector array (7 of 7), thermal camera (positive), CO sensor (400 PPM). Verifying via UAV thermal optics. Initiating emergency operational chain. All building systems now under autonomous incident management.",
            visualHTML: getFireHeatmapHTML(76, "ZONE-4", "12") + getAIRiskScoringHTML(),
            options: [
                { label: "View Evacuation Map", next: "fire_full_evac_map" },
                { label: "Analyze Smoke Spread", next: "fire_smoke_detailed" },
                { label: "Deploy UAV Swarm", next: "fire_drone_swarm" },
                { label: "Structural Analysis", next: "fire_structural_detail" },
                { label: "Executive Evacuation", next: "fire_exec_evac" },
                { label: "Coordinate Responders", next: "fire_responder_coord" }
            ]
        }

    });



};

window.runDotCanvas02 = () => {

    (function () {
        const CFG = { totalSize: 12, dotSize: 1.5, animSpeed: 0.5, blinkFreq: 5.0, fps: 60, colors: [[255, 255, 255], [255, 255, 255]], opacities: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] };
        const canvas = document.getElementById('dotCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, startTime = performance.now(), cells = [];
        const PHI = 1.61803398874989484820459;
        function fract(x) { return x - Math.floor(x); }
        function rand2(x, y) { const ax = x * PHI, ay = y * PHI; const d = Math.sqrt((ax - x) ** 2 + (ay - y) ** 2); return Math.abs(fract(Math.tan(d * 0.5) * x)); }
        function blinkAlpha(col, row, t, showOffset) { const freq = CFG.blinkFreq; const phase = Math.floor(t / freq + showOffset + freq); const r = rand2((col + 1) * phase * 0.1 + 1, (row + 1) * phase * 0.1 + 1); return CFG.opacities[Math.floor(r * CFG.opacities.length)]; }
        function resize() { const rect = canvas.parentElement.getBoundingClientRect(); W = canvas.width = rect.width; H = canvas.height = rect.height; buildCells(); }
        function buildCells() { cells = []; const ts = CFG.totalSize; const cols = Math.ceil(W / ts) + 1; const rows = Math.ceil(H / ts) + 1; const cx = cols / 2; const cy = rows / 2; const maxD = Math.sqrt(cx * cx + cy * cy); for (let row = 0; row < rows; row++) { for (let col = 0; col < cols; col++) { const s = rand2(col + 1, row + 1); const rngB = rand2(col + 42, row + 42); const dist = Math.sqrt((cx - col) ** 2 + (cy - row) ** 2); cells.push({ col, row, showOffset: s, introOffset: dist * 0.01 + s * 0.15, outroOffset: (maxD - dist) * 0.02 + rngB * 0.2, colorIdx: Math.floor(s * CFG.colors.length) }); } } }

        // Award-Winning Mouse Tracking Setup
        let mouseX = -1000, mouseY = -1000;
        const container = canvas.parentElement;
        container.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        container.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        let lastFrame = 0;
        function draw(ts) {
            window.dotCanvas02AnimId = requestAnimationFrame(draw);
            if (ts - lastFrame < 1000 / CFG.fps) return;
            lastFrame = ts;
            const elapsed = (ts - startTime) / 1000;
            const t = elapsed * CFG.animSpeed;
            ctx.clearRect(0, 0, W, H);
            const sz = CFG.totalSize;
            const ds = CFG.dotSize;
            const offX = Math.abs(Math.floor(((W % sz) - ds) * 0.5));
            const offY = Math.abs(Math.floor(((H % sz) - ds) * 0.5));

            for (const cell of cells) {
                const px = cell.col * sz - offX;
                const py = cell.row * sz - offY;
                if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
                if (t < cell.introOffset) continue;
                const alpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset);
                if (alpha <= 0) continue;

                // High-End Proximity Calculation
                const cx = px + ds;
                const cy = py + ds;
                const dx = cx - mouseX;
                const dy = cy - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 160; // Influence circle

                let drawX = cx;
                let drawY = cy;
                const isLight = document.body.classList.contains('light-mode');
                const baseColor = isLight ? [15, 17, 21] : [255, 255, 255];
                let color = baseColor;

                if (dist < radius && mouseX > 0) {
                    const force = (radius - dist) / radius;
                    // Fluid repel translation away from cursor
                    drawX = cx + (dx / dist) * force * 16;
                    drawY = cy + (dy / dist) * force * 16;

                    // Color blend to brand purple [139, 92, 246]
                    const blend = force * 0.95;
                    const targetR = isLight ? 124 : 139;
                    const targetG = isLight ? 58 : 92;
                    const targetB = isLight ? 237 : 246;
                    const r = Math.round(baseColor[0] * (1 - blend) + targetR * blend);
                    const g = Math.round(baseColor[1] * (1 - blend) + targetG * blend);
                    const b = Math.round(baseColor[2] * (1 - blend) + targetB * blend);
                    color = [r, g, b];
                }

                ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
                ctx.beginPath();
                ctx.arc(drawX, drawY, ds, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
        window.dotCanvas02ResizeObserver = ro;
        resize();
        window.dotCanvas02AnimId = requestAnimationFrame(draw);
    })();


    window.cancelDotCanvas02Anim = () => {
        if (window.dotCanvas02AnimId) cancelAnimationFrame(window.dotCanvas02AnimId);
        if (window.dotCanvas02ResizeObserver) {
            window.dotCanvas02ResizeObserver.disconnect();
            window.dotCanvas02ResizeObserver = null;
        }
    };

};

window.runHeroDotCanvas02 = () => {

    (function () {
        const CFG = { totalSize: 12, dotSize: 1.5, animSpeed: 0.5, blinkFreq: 5.0, fps: 60, colors: [[255, 255, 255]], opacities: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] };
        const canvas = document.getElementById('heroDotCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, startTime = performance.now(), cells = [];
        const PHI = 1.61803398874989484820459;
        function fract(x) { return x - Math.floor(x); }
        function rand2(x, y) { const ax = x * PHI, ay = y * PHI; const d = Math.sqrt((ax - x) ** 2 + (ay - y) ** 2); return Math.abs(fract(Math.tan(d * 0.5) * x)); }
        function blinkAlpha(col, row, t, showOffset) { const freq = CFG.blinkFreq; const phase = Math.floor(t / freq + showOffset + freq); const r = rand2((col + 1) * phase * 0.1 + 1, (row + 1) * phase * 0.1 + 1); return CFG.opacities[Math.floor(r * CFG.opacities.length)]; }
        function resize() { const rect = canvas.parentElement.getBoundingClientRect(); W = canvas.width = rect.width; H = canvas.height = rect.height; buildCells(); }
        function buildCells() { cells = []; const ts = CFG.totalSize; const cols = Math.ceil(W / ts) + 1; const rows = Math.ceil(H / ts) + 1; const cx = cols / 2; const cy = rows / 2; const maxD = Math.sqrt(cx * cx + cy * cy); for (let row = 0; row < rows; row++) { for (let col = 0; col < cols; col++) { const s = rand2(col + 1, row + 1); const rngB = rand2(col + 42, row + 42); const dist = Math.sqrt((cx - col) ** 2 + (cy - row) ** 2); cells.push({ col, row, showOffset: s, introOffset: dist * 0.01 + s * 0.15, outroOffset: (maxD - dist) * 0.02 + rngB * 0.2, colorIdx: Math.floor(s * CFG.colors.length) }); } } }

        // Award-Winning Mouse Tracking Setup
        let mouseX = -1000, mouseY = -1000;
        const container = canvas.parentElement;
        container.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        container.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        let lastFrame = 0;
        function draw(ts) {
            window.heroDotCanvas02AnimId = requestAnimationFrame(draw);
            if (ts - lastFrame < 1000 / CFG.fps) return;
            lastFrame = ts;
            const elapsed = (ts - startTime) / 1000;
            const t = elapsed * CFG.animSpeed;
            ctx.clearRect(0, 0, W, H);
            const sz = CFG.totalSize;
            const ds = CFG.dotSize;
            const offX = Math.abs(Math.floor(((W % sz) - ds) * 0.5));
            const offY = Math.abs(Math.floor(((H % sz) - ds) * 0.5));

            for (const cell of cells) {
                const px = cell.col * sz - offX;
                const py = cell.row * sz - offY;
                
                if (px + ds < 0 || py + ds < 0 || px - ds > W || py - ds > H) continue;
                if (t < cell.introOffset) continue;
                const baseBlinkAlpha = blinkAlpha(cell.col, cell.row, elapsed, cell.showOffset);
                if (baseBlinkAlpha <= 0) continue;

                // High-End Proximity Calculation
                const cx = px + ds;
                const cy = py + ds;
                
                // -- Living Round Breathing Effect --
                // Calculate distance from the exact center of the screen
                const dxCenter = cx - (W * 0.5);
                const dyCenter = cy - (H * 0.5);
                const distFromCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

                // Base size of the visible circle (enough to cover most of the screen)
                const baseRadius = Math.max(W, H) * 0.55; 
                
                // The breathing animation (expands and contracts the radius)
                const breatheSpeed = 2.8; // Speed of the breath (Increased for faster breathing)
                const breatheAmount = Math.sin(elapsed * breatheSpeed) * 200; // How deep the fade goes inside
                const currentOuterRadius = baseRadius + breatheAmount;

                // Create a soft fade-out at the edges (the vignette ring)
                const fadeThickness = 300; // The width of the soft fading edge
                let radialAlpha = 1.0;
                
                if (distFromCenter > currentOuterRadius - fadeThickness) {
                    // Calculate how deep into the fade zone this dot is
                    const depthIntoFade = distFromCenter - (currentOuterRadius - fadeThickness);
                    radialAlpha = 1.0 - (depthIntoFade / fadeThickness);
                    
                    // Smooth easing for the fade
                    radialAlpha = Math.max(0, radialAlpha);
                    radialAlpha = Math.pow(radialAlpha, 1.5); 
                }

                // Apply the breathing fade to the dot's base blinking opacity
                const finalAlpha = baseBlinkAlpha * radialAlpha;
                if (finalAlpha <= 0.01) continue;

                const dx = cx - mouseX;
                const dy = cy - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 160;

                let drawX = cx;
                let drawY = cy;
                const isLight = document.body.classList.contains('light-mode');
                const baseColor = isLight ? [15, 17, 21] : [255, 255, 255];
                let color = baseColor;

                if (dist < radius && mouseX > 0) {
                    const force = (radius - dist) / radius;
                    drawX = cx + (dx / dist) * force * 16;
                    drawY = cy + (dy / dist) * force * 16;

                    const blend = force * 0.95;
                    const targetR = isLight ? 124 : 139;
                    const targetG = isLight ? 58 : 92;
                    const targetB = isLight ? 237 : 246;
                    const r = Math.round(baseColor[0] * (1 - blend) + targetR * blend);
                    const g = Math.round(baseColor[1] * (1 - blend) + targetG * blend);
                    const b = Math.round(baseColor[2] * (1 - blend) + targetB * blend);
                    color = [r, g, b];
                }

                ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${finalAlpha})`;
                ctx.beginPath();
                ctx.arc(drawX, drawY, ds, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
        window.heroDotCanvas02ResizeObserver = ro;
        resize();
        window.heroDotCanvas02AnimId = requestAnimationFrame(draw);
    })();


    window.cancelHeroDotCanvas02Anim = () => {
        if (window.heroDotCanvas02AnimId) cancelAnimationFrame(window.heroDotCanvas02AnimId);
        if (window.heroDotCanvas02ResizeObserver) {
            window.heroDotCanvas02ResizeObserver.disconnect();
            window.heroDotCanvas02ResizeObserver = null;
        }
    };

};


window.runDottedSurface = () => {
    // If there is already an active dotted surface, clean it up first!
    if (window.cancelDottedSurfaceAnim) {
        window.cancelDottedSurfaceAnim();
    }
    if (window.dottedSurfaceTimeoutId) {
        clearTimeout(window.dottedSurfaceTimeoutId);
        window.dottedSurfaceTimeoutId = null;
    }

    const dottedContainer = document.getElementById('dotted-surface-container');
    if (!dottedContainer || typeof THREE === 'undefined') {
        // Retry
        window.dottedSurfaceTimeoutId = setTimeout(window.runDottedSurface, 50);
        return;
    }

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const getContainerSize = () => {
        const rect = dottedContainer.getBoundingClientRect();
        return {
            width: rect.width || window.innerWidth,
            height: rect.height || window.innerHeight
        };
    };
    const containerSize = getContainerSize();

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b0d0f, 2000, 10000);

    const initialAspect = (containerSize.width && containerSize.height) ? (containerSize.width / containerSize.height) : (window.innerWidth / window.innerHeight);
    const camera = new THREE.PerspectiveCamera(60, initialAspect, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerSize.width, containerSize.height);
    renderer.setClearColor(scene.fog.color, 0);

    dottedContainer.innerHTML = '';
    dottedContainer.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            const y = 0;
            const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

            positions.push(x, y, z);
            colors.push(200 / 255, 200 / 255, 200 / 255);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animId = null;

    const animate = () => {
        animId = requestAnimationFrame(animate);
        window.dottedSurfaceAnimId = animId;

        const posArray = geometry.attributes.position.array;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const index = i * 3;
                posArray[index + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
                i++;
            }
        }
        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        count += 0.02;
    };

    const handleResize = () => {
        const s = getContainerSize();
        const aspect = (s.width && s.height) ? (s.width / s.height) : (window.innerWidth / window.innerHeight);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(s.width, s.height);
    };

    window.addEventListener('resize', handleResize);

    const ro = new ResizeObserver(() => {
        handleResize();
    });
    ro.observe(dottedContainer);
    window.dottedSurfaceResizeObserver = ro;

    animate();

    window.cancelDottedSurfaceAnim = () => {
        if (window.dottedSurfaceTimeoutId) {
            clearTimeout(window.dottedSurfaceTimeoutId);
            window.dottedSurfaceTimeoutId = null;
        }
        if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
        }
        window.removeEventListener('resize', handleResize);
        if (window.dottedSurfaceResizeObserver) {
            window.dottedSurfaceResizeObserver.disconnect();
            window.dottedSurfaceResizeObserver = null;
        }

        // Clean up Three.js WebGL context and memory
        if (renderer) {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        }
        if (geometry) {
            geometry.dispose();
        }
        if (material) {
            material.dispose();
        }
        window.cancelDottedSurfaceAnim = null;
    };
};

window.runSparkles = () => {
    if (window.sparklesTimeoutId) {
        clearTimeout(window.sparklesTimeoutId);
        window.sparklesTimeoutId = null;
    }

    (function initSparkles() {
        if (typeof tsParticles === 'undefined' || !document.getElementById('tsparticles-sparkles')) {
            window.sparklesTimeoutId = setTimeout(initSparkles, 50);
            return;
        }
        const sparklesOptions = {
            background: { color: { value: "transparent" } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            particles: {
                color: { value: "#ffffff" },
                move: { enable: true, direction: "none", speed: { min: 0.1, max: 1 }, straight: false },
                number: { value: 1200 },
                opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true, sync: false, speed: 3 } },
                size: { value: { min: 0.4, max: 1 } }
            },
            detectRetina: true
        };

        // Initialize curved sparkles section (currently hidden)
        tsParticles.load({
            id: "tsparticles-sparkles",
            options: sparklesOptions
        });
    })();

    window.cancelSparklesAnim = () => {
        if (window.sparklesTimeoutId) {
            clearTimeout(window.sparklesTimeoutId);
            window.sparklesTimeoutId = null;
        }
        if (typeof tsParticles !== 'undefined') {
            try {
                const sparkles = tsParticles.dom().find(c => c.id === 'tsparticles-sparkles');
                if (sparkles) sparkles.destroy();
                const demo = tsParticles.dom().find(c => c.id === 'tsparticles-demo');
                if (demo) demo.destroy();
            } catch (e) {
                console.error("Error destroying tsParticles: ", e);
            }
        }
    };
};
