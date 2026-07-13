import re

html_content = """
                <!-- Middle Row: Linear Clone Dashboard -->
                <style>
                .linear-container * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                .linear-container {
                    display: flex;
                    width: 100%;
                    height: 640px;
                    background-color: #0E0F11; /* Main background */
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    color: #8A8F98;
                    box-shadow: 0 24px 48px rgba(0,0,0,0.4);
                }
                
                /* --- SIDEBAR --- */
                .linear-sidebar {
                    width: 260px;
                    background-color: #15161A;
                    border-right: 1px solid rgba(255, 255, 255, 0.04);
                    display: flex;
                    flex-direction: column;
                    font-size: 13px;
                }
                .l-sidebar-top {
                    padding: 16px 16px 8px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #F2F3F5;
                    font-weight: 500;
                }
                .l-nav-group {
                    padding: 12px 0;
                }
                .l-nav-header {
                    padding: 4px 16px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    text-transform: uppercase;
                    color: #5E636D;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .l-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 16px;
                    cursor: pointer;
                    color: #8A8F98;
                }
                .l-nav-item:hover { background-color: rgba(255,255,255,0.03); color: #F2F3F5; }
                .l-nav-item.active {
                    background-color: rgba(255,255,255,0.05);
                    color: #F2F3F5;
                }
                .l-icon { width: 14px; height: 14px; opacity: 0.7; }
                
                /* --- MAIN CONTENT --- */
                .linear-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                
                .l-topbar {
                    height: 52px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    font-size: 13px;
                }
                .l-topbar-left { display: flex; align-items: center; gap: 8px; color: #F2F3F5; font-weight: 500; }
                .l-topbar-right { display: flex; align-items: center; gap: 16px; color: #5E636D; }
                
                .l-content-area {
                    flex: 1;
                    padding: 32px 40px;
                    display: flex;
                    gap: 64px;
                    overflow-y: auto;
                }
                
                .l-issue-column { flex: 1; max-width: 600px; }
                .l-issue-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #F2F3F5;
                    margin-bottom: 16px;
                    letter-spacing: -0.3px;
                }
                .l-issue-desc {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #B1B5C0;
                    margin-bottom: 32px;
                }
                .l-code {
                    background: rgba(255,255,255,0.08);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-size: 13px;
                    color: #E2E4E9;
                }
                
                .l-activity-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #F2F3F5;
                    margin-bottom: 16px;
                }
                
                .l-timeline-event {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                    font-size: 13px;
                    color: #8A8F98;
                }
                .l-timeline-icon {
                    width: 20px; display: flex; justify-content: center; padding-top: 2px;
                }
                .l-timeline-text strong { color: #B1B5C0; font-weight: 500; }
                
                .l-comment-box {
                    background-color: #15161A;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 8px;
                    padding: 16px;
                    margin-top: 24px;
                }
                .l-comment-header {
                    display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 13px;
                }
                .l-avatar { width: 16px; height: 16px; border-radius: 50%; background: #4A4D57; }
                .l-comment-body {
                    font-size: 14px; color: #B1B5C0; line-height: 1.5; margin-left: 24px;
                }
                
                .l-subcomment {
                    margin-top: 16px; margin-left: 24px; padding-top: 16px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }
                
                /* Right Status Panel */
                .l-status-column { width: 220px; }
                .l-status-item {
                    display: flex; align-items: center; gap: 12px; font-size: 13px; color: #B1B5C0; margin-bottom: 16px;
                }
                
                /* --- MODAL (Linear Opus) --- */
                .l-opus-modal {
                    position: absolute;
                    bottom: 24px;
                    right: 24px;
                    width: 440px;
                    background-color: #1A1B20;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.4);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    animation: modalSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .l-modal-header {
                    height: 40px;
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    font-size: 13px;
                    font-weight: 500;
                    color: #F2F3F5;
                    background: #1E1F24;
                }
                .l-modal-badge {
                    background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 8px; color: #B1B5C0;
                }
                
                .l-modal-body {
                    padding: 16px;
                    font-size: 13px;
                    color: #B1B5C0;
                    line-height: 1.6;
                }
                
                .l-modal-file-diff {
                    background: #15161A;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 6px;
                    padding: 12px;
                    margin-top: 16px;
                }
                
                .l-modal-input {
                    margin: 0 16px 16px 16px;
                    padding: 12px 16px;
                    background: #15161A;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #5E636D;
                    font-size: 13px;
                }
                
                /* SVGs */
                .svg-icon { width: 14px; height: 14px; fill: currentColor; }
                .svg-stroke { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
                </style>

                <div class="linear-container">
                    
                    <!-- SIDEBAR -->
                    <div class="linear-sidebar">
                        <div class="l-sidebar-top">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <svg class="svg-icon" viewBox="0 0 16 16"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12z" fill="#F2F3F5"/><path d="M5.5 5.5l5 5m0-5l-5 5" stroke="#F2F3F5" stroke-width="1.5"/></svg>
                                Linear <svg style="width: 10px; height: 10px; opacity: 0.5; margin-left: 4px;" viewBox="0 0 10 10"><path d="M2.5 3.5l2.5 2.5 2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                            </div>
                            <div style="display: flex; gap: 12px; opacity: 0.7;">
                                <svg class="svg-stroke" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <svg class="svg-stroke" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            </div>
                        </div>
                        
                        <div class="l-nav-group">
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 8h20"></path><path d="M6 4v4"></path></svg> Inbox</div>
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg> My issues</div>
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Reviews</div>
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> Pulse</div>
                        </div>
                        
                        <div class="l-nav-group">
                            <div class="l-nav-header">Workspace <svg style="width: 8px; height: 8px; margin-left: 2px;" viewBox="0 0 10 10"><path d="M2.5 3.5l2.5 2.5 2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> Initiatives</div>
                            <div class="l-nav-item"><svg class="svg-stroke l-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> Projects</div>
                            <div class="l-nav-item" style="opacity: 0.7;">••• More</div>
                        </div>
                        
                        <div class="l-nav-group">
                            <div class="l-nav-header">Favorites <svg style="width: 8px; height: 8px; margin-left: 2px;" viewBox="0 0 10 10"><path d="M2.5 3.5l2.5 2.5 2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
                            <div class="l-nav-item active">
                                <svg class="svg-icon l-icon" style="fill: #F3A021;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="4" fill="#15161A"></circle></svg> 
                                Faster app launch
                            </div>
                            <div class="l-nav-item">
                                <svg class="svg-stroke l-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 
                                Agent tasks
                            </div>
                            <div class="l-nav-item">
                                <svg class="svg-stroke l-icon" style="stroke: #5E6AD2;" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> 
                                UI Refresh
                            </div>
                            <div class="l-nav-item">
                                <svg class="svg-stroke l-icon" style="stroke: #E44856;" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> 
                                Agents Insights
                            </div>
                        </div>
                    </div>
                    
                    <!-- MAIN CONTENT -->
                    <div class="linear-main">
                        
                        <!-- Top Bar -->
                        <div class="l-topbar">
                            <div class="l-topbar-left">
                                Faster app launch 
                                <svg style="width: 12px; height: 12px; fill: #F3A021;" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <span style="opacity: 0.5;">•••</span>
                            </div>
                            <div class="l-topbar-right">
                                02 / 145 
                                <svg class="svg-stroke" style="width: 12px; height: 12px;" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                <svg class="svg-stroke" style="width: 12px; height: 12px; margin-left:-8px;" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                        
                        <div class="l-content-area">
                            
                            <!-- Left Issue Column -->
                            <div class="l-issue-column">
                                <h1 class="l-issue-title">Faster app launch</h1>
                                <p class="l-issue-desc">
                                    Render UI before <span class="l-code">vehicle_state</span> sync when minimum required state is present, instead of blocking on full refresh during iOS startup.
                                </p>
                                
                                <h2 class="l-activity-title">Activity</h2>
                                
                                <div class="l-timeline-event">
                                    <div class="l-timeline-icon"><svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                                    <div class="l-timeline-text">Linear created the issue via Slack on behalf of <strong>karri</strong> · 2min ago</div>
                                </div>
                                <div class="l-timeline-event">
                                    <div class="l-timeline-icon"><svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div>
                                    <div class="l-timeline-text">Triage Intelligence added the label <strong>Performance</strong> and <strong>iOS</strong> · 2min ago</div>
                                </div>
                                
                                <!-- Comment Box -->
                                <div class="l-comment-box">
                                    <div class="l-comment-header">
                                        <div class="l-avatar" style="background: #E58A8A;"></div>
                                        <strong style="color: #F2F3F5;">karri</strong> <span style="color: #5E636D;">· 4 min ago</span>
                                    </div>
                                    <div class="l-comment-body">
                                        Right now we show a spinner forever, which makes it look like the car disappeared...
                                    </div>
                                    
                                    <div class="l-subcomment">
                                        <div class="l-comment-header">
                                            <div class="l-avatar" style="background: #8AB4E5;"></div>
                                            <strong style="color: #F2F3F5;">jori</strong> <span style="color: #5E636D;">· just now</span>
                                        </div>
                                        <div class="l-comment-body" style="color: #F2F3F5;">
                                            <span style="color: #5E6AD2; font-weight: 500;">@Linear</span> can you take a stab at this?
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="l-timeline-event" style="margin-top: 24px;">
                                    <div class="l-timeline-icon"><svg class="svg-icon" style="width: 12px; height: 12px; fill: #F2F3F5;" viewBox="0 0 16 16"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12z"/></svg></div>
                                    <div class="l-timeline-text">Linear connected by <strong>jori</strong> · 2 min ago</div>
                                </div>
                                <div class="l-timeline-event">
                                    <div class="l-timeline-icon"><svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg></div>
                                    <div class="l-timeline-text">Changed 2 files Draft PR awaiting your review · 2 min ago</div>
                                </div>
                                <div class="l-timeline-event">
                                    <div class="l-timeline-icon"><svg class="svg-icon" style="width: 14px; height: 14px; fill: #F3A021;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 2v20M2 12h20" stroke="#121316" stroke-width="3"/></svg></div>
                                    <div class="l-timeline-text">Linear moved from Todo to <strong>In Progress</strong> · just now</div>
                                </div>
                                
                            </div>
                            
                            <!-- Right Status Panel -->
                            <div class="l-status-column">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                                    <div style="color: #5E636D; font-size: 12px; letter-spacing: 0.5px;">ENG-2703</div>
                                    <div style="display: flex; gap: 12px;">
                                        <svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                        <svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        <svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    </div>
                                </div>
                                
                                <div class="l-status-item">
                                    <svg class="svg-icon" style="width: 14px; height: 14px; fill: #F3A021;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 2v20M2 12h20" stroke="#121316" stroke-width="3"/></svg>
                                    <span style="color: #F2F3F5;">In Progress</span>
                                </div>
                                <div class="l-status-item">
                                    <svg class="svg-stroke" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                                    <span>High</span>
                                </div>
                                <div class="l-status-item" style="margin-top: 8px;">
                                    <div class="l-avatar" style="background: #8AB4E5; width: 18px; height: 18px;"></div>
                                    <span style="color: #F2F3F5;">jori</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- FLOATING AI MODAL -->
                        <div class="l-opus-modal">
                            <div class="l-modal-header">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <svg class="svg-icon" style="fill: #F2F3F5;" viewBox="0 0 16 16"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12z"/></svg>
                                    Linear <span class="l-modal-badge">Opus 4.8</span>
                                </div>
                                <div style="display: flex; gap: 12px; color: #5E636D;">
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </div>
                            </div>
                            
                            <div class="l-modal-body">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                                    <div class="l-avatar" style="background: #8AB4E5; width: 16px; height: 16px;"></div>
                                    <span>jori connected Linear to ENG-2703</span>
                                </div>
                                
                                <p style="color: #F2F3F5; margin-bottom: 16px; font-size: 14px;">Examining the startup path...</p>
                                
                                <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; margin-bottom: 16px; color: #8A8F98;">
                                    Worked for 7s <svg style="width: 8px; height: 8px; margin-left: 2px;" viewBox="0 0 10 10"><path d="M2.5 3.5l2.5 2.5 2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                                </div>
                                
                                <p style="color: #F2F3F5; margin-bottom: 12px;">Pushed and opened a draft PR. Changes:</p>
                                
                                <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 24px; color: #F2F3F5; line-height: 1.8;">
                                    <li><span class="l-code">userRideHistory.ts</span> : build a <span class="l-code">waitingStatusById</span> map and use it as the <span class="l-code">getLastAction</span> by line</li>
                                    <li><span class="l-code">RideHistoryPage.tsx</span> : dimmed rows reset</li>
                                </ul>
                                
                                <div class="l-modal-file-diff">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <div style="font-weight: 500; color: #F2F3F5;">Changed 2 files <span style="color: #22A669;">+4</span> <span style="color: #E44856;">-4</span></div>
                                        <div style="border: 1px solid rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                                            <svg class="svg-stroke" style="width: 12px; height: 12px;" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Preview
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #F2F3F5;">
                                        <svg class="svg-stroke" style="width: 12px; height: 12px; stroke: #8A8F98;" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>
                                        Draft Update homepage H1
                                    </div>
                                    <div style="font-size: 11px; color: #5E636D; margin-top: 4px; margin-left: 20px;">master ← ride/drv-899-update-homepage-h1-65a6</div>
                                </div>
                            </div>
                            
                            <div class="l-modal-input">
                                Tell Linear what to do next...
                                <div style="display: flex; gap: 12px; align-items: center;">
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                    <svg class="svg-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
"""

with open("app/home-02/page.tsx", "r") as f:
    content = f.read()

start_marker = "<!-- Middle Row: Interactive Command Console Dashboard -->"
end_marker = "<!-- Bottom Row: Split Footer -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers.")
    exit(1)

new_content = content[:start_idx] + html_content + "\n                " + content[end_idx:]

with open("app/home-02/page.tsx", "w") as f:
    f.write(new_content)

print("Linear clone successfully injected!")
