// Mega Menu Click-to-Open logic is now handled natively in React (Navbar.tsx)
/*
const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.parentElement;

        // Close others if needed (optional)
        document.querySelectorAll('.has-dropdown.is-active').forEach(activeItem => {
            if (activeItem !== parent) activeItem.classList.remove('is-active');
        });

        parent.classList.toggle('is-active');
    });
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.is-active').forEach(activeItem => {
            activeItem.classList.remove('is-active');
        });
    }
});
*/

// Premium Cinematic Preloader Animation
window.runPreloader = () => {
    const gsap = window.gsap;
    const preloader = document.getElementById('premium-preloader');
    const logoPaths = document.querySelectorAll('#preloader-paths path');
    const logo = document.getElementById('preloader-logo');

    if (preloader && logoPaths.length > 0) {
        // Detect if this is a reload or the first visit in the session
        const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
        const hasVisited = sessionStorage.getItem('visited');

        if (hasVisited && !isReload) {
            // Already visited this session and not a reload -> skip preloader entirely
            preloader.style.display = 'none';
            document.body.style.overflow = '';
            // Ensure any hero-content is fully visible instantly
            gsap.set(".hero-content > *", { y: 0, opacity: 1, filter: "none" });
        } else {
            // First visit or page reload -> execute full premium cinematic preloader
            sessionStorage.setItem('visited', 'true');

            // Lock scroll immediately
            document.body.style.overflow = 'hidden';

            // Hide paths initially to prevent flash
            gsap.set(logoPaths, { opacity: 0, y: 15, scale: 0.95, transformOrigin: "50% 50%" });

            const tl = gsap.timeline({
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = ''; // Unlock scroll
                }
            });

            // 1. Award-winning stagger reveal of the logo paths
            tl.to(logoPaths, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                stagger: 0.08,
                ease: "power4.out"
            })
                // 2. Pause to hold the fully constructed logo
                .to(logo, {
                    duration: 0.6
                })
                // 3. Logo gracefully shrinks and fades out as a cohesive unit
                .to(logo, {
                    opacity: 0,
                    scale: 0.85,
                    y: -10,
                    duration: 0.6,
                    ease: "power3.inOut"
                })
                // 4. Preloader background elegantly slides up
                .to(preloader, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "expo.inOut"
                }, "-=0.3")
                // 5. The hero content slowly drifts up into view seamlessly
                .from(".hero-content > *", {
                    y: 30,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.15,
                    ease: "power3.out"
                }, "-=0.8");
        }
    }
};

window.runMain = () => {
    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        return;
    }
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    // 0. Clean up any existing global listeners
    if (window.cleanupMain) {
        window.cleanupMain();
    }

    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for buttery smooth scrolling
    if (typeof Lenis !== 'undefined') {
        if (window.lenis) {
            window.lenis.destroy();
        }
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            wheelMultiplier: 1.2,
        });
        window.lenis = lenis;

        // Sync with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        if (window.lenisRaf) {
            gsap.ticker.remove(window.lenisRaf);
        }
        window.lenisRaf = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(window.lenisRaf);

        gsap.ticker.lagSmoothing(0);
    }


    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const mainScrollListener = () => {
        const currentScrollY = window.scrollY;

        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Track passing the hero section for opacity changes
            if (currentScrollY > window.innerHeight) {
                navbar.classList.add('past-hero');
            } else {
                navbar.classList.remove('past-hero');
            }

            if (currentScrollY > 600 && currentScrollY > lastScrollY) {
                // Scrolling down -> hide
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up -> show
                navbar.classList.remove('nav-hidden');
            }
        }

        lastScrollY = currentScrollY;
    };
    window.mainScrollListener = mainScrollListener;
    window.addEventListener('scroll', mainScrollListener);

    // Mobile menu toggle is now handled by inline scripts in the HTML files

    // 2. Canvas Frame Sequence Logic
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 162;
        const currentFrame = index => encodeURI(`/images/Mithriv seq 1_${String(index).padStart(5, '0')}.png`);

        const images = [];
        const airpods = {
            frame: 0
        };

        // Preload first image
        const firstImg = new Image();
        const drawFirstImage = () => {
            if (canvas && firstImg.naturalWidth > 0) {
                canvas.width = firstImg.naturalWidth;
                canvas.height = firstImg.naturalHeight;
                context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
            }
        };
        firstImg.onload = drawFirstImage;
        firstImg.src = currentFrame(0);
        if (firstImg.complete) {
            drawFirstImage();
        }

        // Preload all images logic
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            images.push(img);
            img.onload = () => {
                if (airpods.frame === i) {
                    render();
                }
            };
            img.src = currentFrame(i);
        }

        // Scroll trigger to scrub through frames (animation only)
        const tlHero = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "+=2000", // Distance to scroll for animation
                scrub: 0.5
            }
        });

        // Pin the hero section to the background while scrubbing, then unpin
        ScrollTrigger.create({
            trigger: "#hero",
            start: "top top",
            end: "+=2000",
            pin: true,
            pinSpacing: false
        });

        tlHero.to(airpods, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: render,
            duration: 1
        }, 0);

        // Optional zoom effect on the canvas itself
        tlHero.to("#hero-canvas", {
            scale: 1.15,
            ease: "none",
            duration: 1
        }, 0);

        // Fade out text on scroll
        tlHero.to('.hero-content', {
            y: '-30%',
            opacity: 0,
            ease: 'none',
            duration: 1
        }, 0);

        // Start blur effects exactly at frame 107
        const blurStart = 107 / frameCount;
        const blurDuration = 1 - blurStart;

        const totalScrollDistance = 2000;
        const contentWrapper = document.getElementById('content-wrapper');
        if (contentWrapper) {
            contentWrapper.style.marginTop = (blurStart * totalScrollDistance) + "px";
        }

        tlHero.fromTo("#hero-canvas",
            { filter: "blur(0px)" },
            { filter: "blur(15px)", ease: "none", duration: blurDuration },
            blurStart
        );

        tlHero.fromTo(".hero-content",
            { filter: "blur(0px)" },
            { filter: "blur(15px)", ease: "none", duration: blurDuration },
            blurStart
        );


        function render() {
            const img = images[airpods.frame];
            if (img && img.complete && img.naturalWidth > 0) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
    }

    // 3. Mouse Movement 3D Tilt Effect on Canvas Container
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        const mainMouseMoveListener = (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX);
            const yAxis = (window.innerHeight / 2 - e.pageY);

            // Very subtle tilt (0.01 depth)
            const moveX = xAxis * 0.01;
            const moveY = yAxis * 0.01;

            gsap.to(canvasContainer, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: "power2.out"
            });
        };
        window.mainMouseMoveListener = mainMouseMoveListener;
        window.addEventListener('mousemove', mainMouseMoveListener);
    }

    // 4. Initial Load Animations for UI elements
    const tl = gsap.timeline();
    tl.from('.hero-content .section-tag', { y: 30, opacity: 0, filter: "blur(20px)", duration: 1.2, ease: "power3.out" })
        .from('.hero-content .main-heading', { y: 40, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "power3.out" }, "-=0.8")
        .from('.hero-content .body-text', { y: 30, opacity: 0, filter: "blur(20px)", duration: 1.2, ease: "power3.out" }, "-=1.0")
        .from('.hero-content .cta-main, .hero-content .pixel-btn', { scale: 0.9, opacity: 0, filter: "blur(10px)", duration: 0.8, ease: "back.out(1.5)" }, "-=0.8")
        .from('.hero-content .ent-btn-primary', { y: 20, scale: 0.9, opacity: 0, filter: "blur(10px)", duration: 0.8, ease: "back.out(1.5)" }, "-=0.8")
        .from('.bottom-strip', { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        ; // Removed .navbar GSAP animation to fix visibility issue

    // 4.5. Animate Hero Stats Counters
    const statCounters = document.querySelectorAll('.comm-stats .stat-item h3');
    if (statCounters.length > 0) {
        tl.add("statsAnim", "-=1.0"); // Label to sync all counters
        statCounters.forEach((el) => {
            let text = el.innerText;
            let numStr = text.replace(/[^0-9.]/g, '');
            let targetNum = parseFloat(numStr);
            let suffix = text.replace(/[0-9.,]/g, '');
            let isFloat = text.includes('.');
            let hasComma = text.includes(',');

            let obj = { val: 0 };

            // Fade in the whole stat item synchronously
            tl.from(el.parentElement, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "statsAnim");

            tl.fromTo(obj,
                { val: 0 },
                {
                    val: targetNum,
                    duration: 2,
                    ease: "power3.out",
                    onUpdate: function () {
                        let formatted = isFloat ? obj.val.toFixed(2) : Math.round(obj.val);
                        if (hasComma && !isFloat) {
                            formatted = parseInt(formatted).toLocaleString('en-US');
                        }
                        el.innerText = formatted + suffix;
                    }
                },
                "statsAnim"
            );
        });
    }


    // =========================================================================
    // NEW SECTIONS ANIMATION LOGIC
    // =========================================================================

    // 5. Removed Architecture Stack Animation
    // 5. Removed Starfield

    // 6. Scroll Reveal for Sections
    const revealSections = gsap.utils.toArray('.reveal-section');
    revealSections.forEach(section => {
        const isLast = section.id === 'knowledge-base';

        if (isLast) {
            const queryBox = section.querySelector('.query-input-box');
            const responseBox = section.querySelector('.response-block');
            if (queryBox && responseBox) {
                queryBox.dataset.originalText = queryBox.innerText.trim();
                queryBox.innerHTML = '';
                gsap.set(responseBox, { opacity: 0, x: -20 });
            }
        }

        gsap.fromTo(section,
            { y: 50, opacity: 0, filter: "blur(20px)" },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: isLast ? "top bottom" : "top 95%", // Generous trigger for the last section to prevent scroll limit stuckness
                    once: true, // Only play once, never reverse to invisible
                    onEnter: () => {
                        if (isLast) {
                            const queryBox = section.querySelector('.query-input-box');
                            const responseBox = section.querySelector('.response-block');
                            if (queryBox && responseBox && queryBox.dataset.originalText) {
                                const text = queryBox.dataset.originalText;
                                queryBox.innerHTML = '';

                                // Create span for each char to safely animate
                                const spans = text.split('').map(char => {
                                    const span = document.createElement('span');
                                    span.textContent = char;
                                    span.style.opacity = '0';
                                    queryBox.appendChild(span);
                                    return span;
                                });

                                // GSAP typewriter stagger
                                gsap.to(spans, {
                                    opacity: 1,
                                    duration: 0.05,
                                    stagger: 0.03,
                                    ease: "none",
                                    delay: 0.6,
                                    onComplete: () => {
                                        // Restore original HTML for exact formatting
                                        queryBox.innerText = text;
                                        gsap.to(responseBox, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 });
                                    }
                                });
                            }
                        }
                    }
                }
            }
        );
    });

    // 6.2. High-End Award Winning Scroll Reveal for Canvas Reveal Section
    const canvasRevealSec = document.querySelector('.canvas-reveal-section');
    if (canvasRevealSec) {
        const title = canvasRevealSec.querySelector('.canvas-title');
        const subtitle = canvasRevealSec.querySelector('.canvas-subtitle');
        const btn = canvasRevealSec.querySelector('.ent-btn-primary');
        const canvasEl = canvasRevealSec.querySelector('#dotCanvas');

        // Set initial state for award-winning reveal
        gsap.set(title, { y: 80, opacity: 0, filter: "blur(20px)", skewY: 3, rotationX: 12, transformOrigin: "50% 50%" });
        gsap.set(subtitle, { y: 40, opacity: 0, filter: "blur(12px)", skewY: 1.5 });
        gsap.set(btn, { y: 20, scale: 0.92, opacity: 0, filter: "blur(6px)" });
        if (canvasEl) {
            gsap.set(canvasEl, { opacity: 0, scale: 1.05 });
        }

        ScrollTrigger.create({
            trigger: canvasRevealSec,
            start: "top 85%",
            once: true,
            onEnter: () => {
                const tl = gsap.timeline();

                // Canvas scales down smoothly into baseline coordinates
                if (canvasEl) {
                    tl.to(canvasEl, {
                        opacity: 1,
                        scale: 1,
                        duration: 2.5,
                        ease: "power3.out"
                    }, 0);
                }

                // Title slides up, removes skew/blur and tilts elegantly
                tl.to(title, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    skewY: 0,
                    rotationX: 0,
                    duration: 1.8,
                    ease: "power4.out"
                }, 0.15);

                // Subtitle staggers up with expanded tracking
                tl.to(subtitle, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    skewY: 0,
                    duration: 1.4,
                    ease: "power3.out"
                }, 0.4);

                // CTA Button scales up with a custom spring ease
                tl.to(btn, {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    ease: "back.out(1.8)"
                }, 0.7);
            }
        });
    }

    // 6.5. Scroll Reveal for AI Agents 4-Column Features
    const secAiAgents = document.querySelector('.sec-ai-agents');
    if (secAiAgents) {
        const triggerAiAgents = () => {
            if (secAiAgents.classList.contains('reveal-active')) return;
            secAiAgents.classList.add('reveal-active');
            gsap.fromTo('.feature-col-item',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );
        };

        // Fallback: If already in viewport on mount, trigger immediately
        const rect = secAiAgents.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            triggerAiAgents();
        }

        ScrollTrigger.create({
            trigger: secAiAgents,
            start: "top 75%",
            once: true,
            onEnter: triggerAiAgents
        });
    }

    // Scroll Reveal for Interactive Console Demo (sec-console-demo) - Trigger the chat popup to appear
    const secConsoleDemo = document.querySelector('.sec-console-demo');
    if (secConsoleDemo) {
        const triggerConsoleDemo = () => {
            const pop = document.getElementById('cpop');
            if (pop && pop.classList.contains('hidden')) {
                // Snappy 400ms delay to feel highly responsive but allow full content entry
                setTimeout(() => {
                    pop.classList.remove('hidden');
                    gsap.fromTo(pop,
                        { scale: 0.94, opacity: 0, y: 20 },
                        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
                    );
                }, 400);
            }
        };

        // Fallback: If already in viewport on mount, trigger immediately
        const rect = secConsoleDemo.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            triggerConsoleDemo();
        }

        ScrollTrigger.create({
            trigger: secConsoleDemo,
            start: "top 25%",
            onEnter: triggerConsoleDemo,
            once: true
        });
    }

    // 6.6. Scroll Reveal and Interactive Timeline for Security Agents That Execute (sec-agents-execute)
    const secAgentsExecute = document.querySelector('.sec-agents-execute');
    if (secAgentsExecute) {
        const scrollEl = secAgentsExecute.querySelector('.agents-horizontal-scroll');
        const mm = gsap.matchMedia();

        mm.add("(min-width: 900px)", () => {
            // --- DESKTOP ANIMATIONS (Horizontal Pin & Scrub) ---

            // 1. Reveal header typography on entering viewport
            gsap.fromTo('.sec-agents-execute .cinematic-reveal-title',
                { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" },
                {
                    opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2,
                    scrollTrigger: {
                        trigger: secAgentsExecute,
                        start: "top 80%",
                        once: true
                    }
                }
            );

            gsap.fromTo('.sec-agents-execute .cinematic-reveal-subtitle',
                { opacity: 0, y: 20, filter: "blur(5px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0,
                    scrollTrigger: {
                        trigger: secAgentsExecute,
                        start: "top 80%",
                        once: true
                    }
                }
            );

            gsap.fromTo('.sec-agents-execute .ent-btn-primary',
                { opacity: 0, y: 15 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: secAgentsExecute,
                        start: "top 80%",
                        once: true
                    }
                }
            );

            // 2. Horizontal timeline scroll translation
            if (scrollEl) {
                const getScrollAmount = () => -(scrollEl.scrollWidth - window.innerWidth);

                const scrollTween = gsap.to(scrollEl, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: secAgentsExecute,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${scrollEl.scrollWidth - window.innerWidth}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1
                    }
                });

                // 3. Staggered fade in for the timeline items as they approach from the right
                const timelineItems = gsap.utils.toArray('.sec-agents-execute .timeline-item');
                timelineItems.forEach((item, index) => {
                    const dot = item.querySelector('.timeline-dot');
                    const content = item.querySelector('.timeline-content-slot');
                    const iconBox = item.querySelector('.agent-icon-box');

                    // Initial state resetting for dynamically lightened milestone dots
                    if (dot) {
                        dot.classList.remove('active');
                    }

                    // Stagger entry of items content (fade up smoothly)
                    const targets = [iconBox, content].filter(el => el !== null);
                    if (targets.length > 0) {
                        gsap.fromTo(targets,
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: item,
                                    containerAnimation: scrollTween,
                                    start: "left 90%", // Start revealing when it enters the right edge
                                    toggleActions: "play none none reverse"
                                }
                            }
                        );
                    }

                    // Light up milestone dots dynamically as they pass center/right-center bounds
                    if (dot) {
                        ScrollTrigger.create({
                            trigger: item,
                            containerAnimation: scrollTween,
                            start: "left 75%", // Light up when milestone dot enters the main viewport area
                            onEnter: () => dot.classList.add('active'),
                            onLeaveBack: () => {
                                dot.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });

        mm.add("(max-width: 899px)", () => {
            // --- MOBILE/TABLET ANIMATIONS (Vertical Fallback) ---

            // Reset translation on mobile
            if (scrollEl) {
                gsap.set(scrollEl, { x: 0 });
            }

            // 1. Reveal header typography
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secAgentsExecute,
                    start: "top 85%",
                    once: true
                }
            });

            tl.fromTo('.sec-agents-execute .cinematic-reveal-title',
                { opacity: 0, y: 30, filter: "blur(5px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }
            );

            tl.fromTo('.sec-agents-execute .cinematic-reveal-subtitle',
                { opacity: 0, y: 20, filter: "blur(3px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
                "-=0.7"
            );

            tl.fromTo('.sec-agents-execute .ent-btn-primary',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.5"
            );

            // 2. Staggered vertical list reveal for mobile timeline items
            const timelineItems = gsap.utils.toArray('.sec-agents-execute .timeline-item');
            timelineItems.forEach((item, index) => {
                const dot = item.querySelector('.timeline-dot');
                const content = item.querySelector('.timeline-content-slot');
                const iconSlot = item.querySelector('.timeline-icon-slot');

                // Initial state reset
                if (dot) {
                    dot.classList.remove('active');
                }

                // Staggered fade in
                const targets = [iconSlot, content].filter(el => el !== null);
                if (targets.length > 0) {
                    gsap.fromTo(targets,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                // Activate dot vertically
                if (dot) {
                    ScrollTrigger.create({
                        trigger: item,
                        start: "top 75%",
                        onEnter: () => dot.classList.add('active'),
                        onLeaveBack: () => {
                            dot.classList.remove('active');
                        }
                    });
                }
            });
        });
    }

    // Refresh ScrollTrigger to ensure calculations are correct on page load
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    // 7. Terminal Typing Animation (Section 4)
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        const termLines = [
            "> TURNOVER_STOPS: SOPs live in code. New staff effective in days.",
            "> MULTIPLIER: Modules handle routine. Operators handle exceptions.",
            "> COVERAGE: Every alarm assessed. Every credential tracked.",
            "> STRATEGIC: Stop firefighting. Modernize operations.",
            "> STATUS: Operational resilience achieved."
        ];
        let terminalStarted = false;

        ScrollTrigger.create({
            trigger: "#terminal-body",
            start: "top 80%",
            onEnter: () => {
                if (terminalStarted) return;
                terminalStarted = true;

                terminalBody.innerHTML = '<span class="term-cursor"></span>';
                let lineIndex = 0;
                let charIndex = 0;

                function typeNextChar() {
                    if (lineIndex >= termLines.length) return;

                    const currentStr = termLines[lineIndex];

                    if (charIndex === 0) {
                        const lineSpan = document.createElement('span');
                        lineSpan.className = 'term-line';
                        if (lineIndex === 3) lineSpan.classList.add('term-accent'); // Highlight execution
                        terminalBody.insertBefore(lineSpan, terminalBody.querySelector('.term-cursor'));
                    }

                    const lines = terminalBody.querySelectorAll('.term-line');
                    const currentLineSpan = lines[lines.length - 1];
                    currentLineSpan.innerHTML += currentStr.charAt(charIndex);

                    charIndex++;

                    if (charIndex < currentStr.length) {
                        setTimeout(typeNextChar, Math.random() * 30 + 20); // random typing speed
                    } else {
                        lineIndex++;
                        charIndex = 0;
                        setTimeout(typeNextChar, 600); // pause between lines
                    }
                }

                setTimeout(typeNextChar, 500);
            }
        });
    }

    // 8. Number Counters (Section 6)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        ScrollTrigger.create({
            trigger: ".sec-results",
            start: "top 75%",
            onEnter: () => {
                let current = 0;
                const updateCounter = setInterval(() => {
                    current += Math.ceil(target / 40);
                    if (current >= target) {
                        counter.innerText = target;
                        clearInterval(updateCounter);
                    } else {
                        counter.innerText = current;
                    }
                }, 30);
            },
            once: true
        });
    });

    // 9. Interactive Command Hub (Unified Control)
    const controlTabs = document.querySelectorAll('.control-tab');
    const displayViews = document.querySelectorAll('.display-view');

    // HTML-aware typewriter function
    function typeHTML(element, speed = 8) {
        if (!element.getAttribute('data-original-html')) {
            element.setAttribute('data-original-html', element.innerHTML);
        }
        const html = element.getAttribute('data-original-html');
        element.innerHTML = '';

        let i = 0;
        let isTag = false;
        let currentHTML = '';

        if (element.typeInterval) clearInterval(element.typeInterval);

        element.typeInterval = setInterval(() => {
            if (i >= html.length) {
                clearInterval(element.typeInterval);
                return;
            }

            let char = html.charAt(i);
            currentHTML += char;

            if (char === '<') isTag = true;
            if (char === '>') isTag = false;

            // Only render when not in the middle of a tag
            if (!isTag) {
                element.innerHTML = currentHTML;
            }

            i++;
        }, speed);
    }

    // Bind tab clicks
    controlTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and views
            controlTabs.forEach(t => t.classList.remove('active'));
            displayViews.forEach(v => {
                v.classList.remove('active');
                // Stop any ongoing animations in inactive views
                const codeStream = v.querySelector('.code-stream');
                if (codeStream && codeStream.typeInterval) {
                    clearInterval(codeStream.typeInterval);
                }
            });

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding view and trigger typing
            const targetId = tab.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            targetView.classList.add('active');

            const codeStream = targetView.querySelector('.code-stream');
            if (codeStream) {
                typeHTML(codeStream);
            }
        });
    });

    // Auto-run first tab when scrolled into view
    ScrollTrigger.create({
        trigger: ".interactive-hub",
        start: "top 75%",
        onEnter: () => {
            const activeView = document.querySelector('.display-view.active .code-stream');
            if (activeView) {
                typeHTML(activeView);
            }
        },
        once: true
    });

    // 10. Global Background Grid Interactive Tracking
    const globalGrid = document.getElementById('globalGridBg');
    if (globalGrid) {
        document.addEventListener('mousemove', (e) => {
            globalGrid.style.setProperty('--mouse-x', `${e.clientX}px`);
            globalGrid.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

    // 11. Simulation Playground (Integration Fabric)
    const simListItems = document.querySelectorAll('#simList li');
    const simTitle = document.getElementById('simTitle');
    const simDescPanel = document.getElementById('simDescPanel');
    const simResultsPanel = document.getElementById('simResultsPanel');
    const simFooterStats = document.getElementById('simFooterStats');
    const btnRunSim = document.getElementById('btnRunSim');

    if (simListItems.length > 0) {
        const simData = {
            "0": {
                title: "Unauthorized Access Attempt",
                desc: "An unknown individual attempts to access the main server room using a cloned or stolen badge during off-hours.",
                timeline: `
                    <div class="sim-timeline">
                        <div class="sim-timeline-item"><span class="sim-dot dot-red"></span><span class="term-red">T-0:</span> Invalid badge swipe at Server Room B</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-orange"></span><span class="term-orange">T+2s:</span> Secondary credential prompt failed</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-red"></span><span class="term-red">T+15s:</span> Forced door entry detected</div>
                    </div>
                `,
                results: [
                    { time: "T+1s", color: "orange", text: "Cross-referenced: Badge ID #4829 belongs to employee on PTO." },
                    { time: "T+3s", color: "red", text: "Video Analytics: Face mismatch detected at Reader B." },
                    { time: "T+16s", color: "red", text: "Action: Initiate Campus Lockdown Protocol Alpha." },
                    { time: "T+17s", color: "green", text: "Action: Dispatch armed response to Zone 4." }
                ],
                stats: "<span>SOP Coverage: 100%</span><span>Gaps Identified: 0</span>"
            },
            "3": {
                title: "Tailgating Detection",
                desc: "Multiple individuals enter the secure R&D facility on a single authorized badge swipe during the morning rush.",
                timeline: `
                    <div class="sim-timeline">
                        <div class="sim-timeline-item"><span class="sim-dot dot-green"></span><span class="term-green">08:14:</span> Valid badge swipe (Employee #992)</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-orange"></span><span class="term-orange">08:14:</span> Optical turnstile logs 2 bodies passing</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-red"></span><span class="term-red">08:15:</span> Second individual moves toward restricted lab</div>
                    </div>
                `,
                results: [
                    { time: "08:14:02", color: "orange", text: "Anomaly: Turnstile count (2) > Badge count (1)." },
                    { time: "08:14:10", color: "orange", text: "PTZ Camera tracking initiated for unidentified subject." },
                    { time: "08:15:00", color: "red", text: "Subject approaching Lab 3. Doors automatically locked." },
                    { time: "08:15:05", color: "green", text: "Action: Notify lobby desk and send mobile alert to Guard Patrol 2." }
                ],
                stats: "<span>SOP Coverage: 85%</span><span>Gaps Identified: 1 (Lobby flow)</span>"
            },
            "8": {
                title: "Insider Threat Progression",
                desc: "A senior engineer with data center access begins showing behavioral anomalies over a 3-week period following a negative performance review.",
                timeline: `
                    <div class="sim-timeline">
                        <div class="sim-timeline-item"><span class="sim-dot dot-green"></span><span class="term-green">Week 1:</span> After-hours access increases 40%</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-orange"></span><span class="term-orange">Week 2:</span> Accesses areas outside normal scope</div>
                        <div class="sim-timeline-item"><span class="sim-dot dot-red"></span><span class="term-red">Week 3:</span> Downloads spike, badge-out without badge-in</div>
                    </div>
                `,
                results: [
                    {
                        time: "Week 1, Day 3",
                        color: "green",
                        text: [
                            "Behavioral baseline deviation detected",
                            "Confidence: 23% (Below alert threshold)",
                            "Action: Flag for pattern monitoring"
                        ]
                    },
                    {
                        time: "Week 2, Day 2",
                        color: "orange",
                        text: [
                            "Cross-referenced: HR performance review (negative)",
                            "Access pattern: 3 areas outside normal scope",
                            "Confidence: 67% (Advisory threshold)",
                            "Action: Generate advisory for Security Manager"
                        ]
                    },
                    {
                        time: "Week 3, Day 1",
                        color: "red",
                        text: [
                            "Download volume: 340% above baseline",
                            "Badge anomaly: Entry without exit (previous day)",
                            "Confidence: 89% (Action threshold)",
                            "Actions triggered:",
                            "• Alert to CISO (SOP 7.3.2)",
                            "• Video evidence preserved (72-hour lookback)",
                            "• Access temporarily restricted pending review",
                            "• HR notification prepared (pending CISO approval)"
                        ]
                    }
                ],
                stats: "<span>SOP Coverage: 94%</span><span>Gaps Identified: 2</span>"
            }
        };

        let isAnimating = false;

        function runSimulation(scenarioId) {
            if (isAnimating) return;
            isAnimating = true;

            const data = simData[scenarioId] || simData["8"];

            // Reset right panel
            simResultsPanel.innerHTML = '';
            simFooterStats.innerHTML = '<span>Processing...</span>';

            // Build Results HTML container
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'sim-timeline';
            resultsContainer.style.marginBottom = '2rem';
            simResultsPanel.appendChild(resultsContainer);

            // Animate results appearing one by one with live typing
            let currentDelay = 0;

            data.results.forEach((res, index) => {
                setTimeout(() => {
                    const block = document.createElement('div');
                    block.className = 'sim-timeline-item';

                    const dot = document.createElement('span');
                    dot.className = `sim-dot dot-${res.color}`;

                    const timeSpan = document.createElement('span');
                    timeSpan.className = `term-${res.color}`;
                    timeSpan.style.marginRight = "0.5rem";

                    const logBlock = document.createElement('div');
                    logBlock.className = 'sim-log-block';

                    block.appendChild(dot);
                    block.appendChild(timeSpan);
                    block.appendChild(logBlock);
                    resultsContainer.appendChild(block);

                    let lines = Array.isArray(res.text) ? res.text : [res.text];

                    // Type time
                    let i = 0;
                    const timeStr = res.time + ":";
                    const typeTime = setInterval(() => {
                        timeSpan.textContent += timeStr.charAt(i);
                        i++;
                        if (i >= timeStr.length) {
                            clearInterval(typeTime);

                            // Type text lines
                            let currentLine = 0;
                            let j = 0;
                            let currentSpan = document.createElement('span');
                            currentSpan.style.whiteSpace = "pre-wrap"; // PRESERVE SPACES
                            logBlock.appendChild(currentSpan);

                            const typeText = setInterval(() => {
                                if (currentLine < lines.length) {
                                    if (j < lines[currentLine].length) {
                                        currentSpan.textContent += lines[currentLine].charAt(j);
                                        j++;
                                    } else {
                                        // Line finished
                                        currentLine++;
                                        j = 0;
                                        if (currentLine < lines.length) {
                                            currentSpan = document.createElement('span');
                                            currentSpan.style.whiteSpace = "pre-wrap"; // PRESERVE SPACES
                                            logBlock.appendChild(currentSpan);
                                        }
                                    }
                                } else {
                                    // All lines finished
                                    clearInterval(typeText);

                                    // Finish up on last item
                                    if (index === data.results.length - 1) {
                                        setTimeout(() => {
                                            simFooterStats.innerHTML = data.stats;
                                            isAnimating = false;
                                        }, 300);
                                    }
                                }
                            }, 15); // text typing speed
                        }
                    }, 20); // time typing speed

                }, currentDelay);

                // Calculate next line delay based on typing duration
                let totalChars = Array.isArray(res.text) ? res.text.join('').length : res.text.length;
                currentDelay += (res.time.length * 20) + (totalChars * 15) + 300;
            });
        }

        simListItems.forEach(item => {
            item.addEventListener('click', () => {
                if (isAnimating) return;

                // Update active class
                simListItems.forEach(li => {
                    li.classList.remove('active');
                    li.innerHTML = li.innerHTML.replace('<span class="term-green" style="margin-right: 0.5rem;">[Selected]</span> ', '');
                });
                item.classList.add('active');
                item.innerHTML = '<span class="term-green" style="margin-right: 0.5rem;">[Selected]</span> ' + item.innerHTML;

                const scenarioId = item.getAttribute('data-scenario');
                const data = simData[scenarioId];

                if (data) {
                    // Update Title with typing effect
                    simTitle.innerText = '';
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        simTitle.innerText += data.title.charAt(i);
                        i++;
                        if (i >= data.title.length) clearInterval(typeTitle);
                    }, 30);

                    // Update Left Panel
                    gsap.to(simDescPanel, {
                        opacity: 0, duration: 0.2, onComplete: () => {
                            simDescPanel.innerHTML = `<p class="sim-paragraph">${data.desc}</p>${data.timeline}`;
                            gsap.to(simDescPanel, { opacity: 1, duration: 0.3 });
                        }
                    });

                    // Auto-run simulation on click
                    setTimeout(() => runSimulation(scenarioId), 400);
                } else {
                    simResultsPanel.innerHTML = '<div class="term-muted">Scenario data not available in this demo. Please select Insider Threat, Unauthorized Access, or Tailgating.</div>';
                    simFooterStats.innerHTML = '';
                }
            });
        });

        // Bind run button
        if (btnRunSim) {
            btnRunSim.addEventListener('click', () => {
                const activeItem = document.querySelector('#simList li.active');
                if (activeItem) {
                    runSimulation(activeItem.getAttribute('data-scenario'));
                }
            });
        }

        // Auto-run when scrolled into view
        ScrollTrigger.create({
            trigger: ".sec-simulation",
            start: "top 75%",
            onEnter: () => {
                const activeItem = document.querySelector('#simList li.active');
                if (activeItem) {
                    runSimulation(activeItem.getAttribute('data-scenario'));
                }
            },
            once: true
        });
    }

    // 12. Global Theme Toggle (Light / Dark Mode)
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('mithriv_theme');

    // Apply saved theme on load
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleBtns.forEach(btn => btn.innerText = '🌙');
    }

    // Bind toggle click events
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            let theme = 'dark';

            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                themeToggleBtns.forEach(b => b.innerText = '🌙');
            } else {
                themeToggleBtns.forEach(b => b.innerText = '☀️');
            }

            localStorage.setItem('mithriv_theme', theme);
        });
    });

    // 13. Automatic 404 Redirect for Empty Links and Unlinked Buttons
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Skip redirect if this link is a dropdown toggle (has a sibling dropdown menu)
            if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
                return;
            }
            window.location.href = '404.html';
        });
    });

    document.querySelectorAll('button').forEach(btn => {
        // Skip theme toggles, buttons inside links, or submit buttons
        if (!btn.classList.contains('theme-toggle') &&
            !btn.closest('a') &&
            btn.type !== 'submit' &&
            !btn.hasAttribute('onclick') &&
            !btn.hasAttribute('data-action')) {

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '404.html';
            });
        }
    });

    // 14. Communication Agents Slider
    const btnPrevSlide = document.getElementById('btnPrevSlide');
    const btnNextSlide = document.getElementById('btnNextSlide');
    const sliderTrack = document.getElementById('sliderTrack');
    const slideIndicator = document.getElementById('slideIndicator');
    const slideDots = document.querySelectorAll('#slideDots .slider-dot');
    let currentSlide = 0;
    const totalSlides = 6;

    if (btnPrevSlide && btnNextSlide && sliderTrack) {
        const updateSlider = () => {
            // Animate using GSAP for a smooth left-to-right effect
            gsap.to(sliderTrack, {
                x: `-${currentSlide * (100 / totalSlides)}%`,
                duration: 0.5,
                ease: "power2.out"
            });

            // Update indicator
            if (slideIndicator) {
                slideIndicator.innerText = `${currentSlide + 1} / ${totalSlides}`;
            }

            // Update dots
            slideDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };

        btnNextSlide.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back
            }
            updateSlider();
        });

        btnPrevSlide.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - 1; // Loop to end
            }
            updateSlider();
        });

        // Add click events to dots as well
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }


    // =========================================================================
    // TAB SWITCHING LOGIC (Communication Page)
    // =========================================================================
    const tabContainers = document.querySelectorAll('.tabs-container');

    // Setup typing effect for tech lists
    const techLists = document.querySelectorAll('.tech-list');
    techLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(li => {
            if (!li.hasAttribute('data-text')) {
                li.setAttribute('data-text', li.textContent);
                // We keep textContent for SEO/initial load until observed
            }
        });
    });

    // Helper to type out workflows
    let activeTypingIntervals = [];

    function typeWorkflows(targetContent) {
        const listItems = targetContent.querySelectorAll('.tech-list li');
        if (!listItems.length) return;

        // Clear any ongoing typing intervals
        activeTypingIntervals.forEach(clearInterval);
        activeTypingIntervals = [];

        // Clear all items first
        listItems.forEach(li => {
            li.textContent = '';
        });

        let currentItemIdx = 0;

        function typeNextItem() {
            if (currentItemIdx >= listItems.length) return;

            const li = listItems[currentItemIdx];
            const text = li.getAttribute('data-text');
            let charIdx = 0;

            const typeInterval = setInterval(() => {
                li.textContent += text.charAt(charIdx);
                charIdx++;

                if (charIdx >= text.length) {
                    clearInterval(typeInterval);
                    currentItemIdx++;
                    // Tiny pause before next line
                    setTimeout(typeNextItem, 50);
                }
            }, 10); // Super fast typing for hacker aesthetic

            activeTypingIntervals.push(typeInterval);
        }

        typeNextItem();
    }

    // Trigger first typing effect on scroll
    const verticalTabsContainer = document.querySelector('.vertical-tabs');
    if (verticalTabsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeTab = verticalTabsContainer.querySelector('.tab-content.active');
                    if (activeTab) {
                        typeWorkflows(activeTab);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(verticalTabsContainer);
    }

    tabContainers.forEach(container => {
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabContents = container.querySelectorAll('.tab-content');

        if (tabBtns.length > 0 && tabContents.length > 0) {
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-target');

                    // Remove active from all buttons and contents in THIS container
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    // Add active to clicked button and target content
                    btn.classList.add('active');
                    const targetContent = container.querySelector(`#${targetId}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        // Trigger typing effect when tab changes
                        typeWorkflows(targetContent);
                    }
                });
            });
        }
    });

    // ─── CINEMATIC FEATURE SECTION ─────────────────────────────
    const cinematicFeature = document.getElementById('cinematic-feature');
    if (cinematicFeature) {
        const tlCinematic = gsap.timeline({
            scrollTrigger: {
                trigger: cinematicFeature,
                start: "top 75%",
                once: true
            }
        });

        const cTag = cinematicFeature.querySelector('.ent-pill');
        const cHeading = cinematicFeature.querySelector('.std-section-h2');
        const cSlabs = cinematicFeature.querySelectorAll('.iso-slab');
        const cPoints = cinematicFeature.querySelectorAll('.isometric-point-item');
        const cTrustRow = cinematicFeature.querySelector('.cinematic-trust-row');

        // 1. Reveal tag
        if (cTag) {
            tlCinematic.from(cTag, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out"
            });
        }

        // 2. Reveal quote heading
        if (cHeading) {
            tlCinematic.from(cHeading, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4");
        }

        // 3. Reveal 3D Slabs staggered
        if (cSlabs.length > 0) {
            tlCinematic.from(cSlabs, {
                opacity: 0,
                scale: 0.85,
                duration: 1.2,
                stagger: 0.25,
                ease: "power3.out"
            }, "-=0.6");
        }

        // 4. Stagger reveal mirrored point cards
        if (cPoints.length > 0) {
            tlCinematic.from(cPoints, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.6");
        }
        // 5. Reveal trust row
        if (cTrustRow) {
            tlCinematic.from(cTrustRow, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");
        }
    }

    window.cleanupMain = () => {
        if (window.mainScrollListener) {
            window.removeEventListener('scroll', window.mainScrollListener);
            window.mainScrollListener = null;
        }
        if (window.mainMouseMoveListener) {
            window.removeEventListener('mousemove', window.mainMouseMoveListener);
            window.mainMouseMoveListener = null;
        }
        if (window.lenis) {
            window.lenis.destroy();
            window.lenis = null;
        }
        if (window.lenisRaf) {
            gsap.ticker.remove(window.lenisRaf);
            window.lenisRaf = null;
        }

        // Remove direct classes modified by mainScrollListener
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.remove('scrolled', 'past-hero', 'nav-hidden', 'navbar-hidden');
        }
    };
}

// Expose preloader and main scripts for React component hooks
// Auto-initialization is delegating to page components via useEffect to support client transitions.
