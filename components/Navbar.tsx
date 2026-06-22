'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const pathname = usePathname()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.documentElement.classList.remove('light-mode');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)

    const syncScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      setHidden(false) // Always show navbar initially on page load/navigation
    }

    // Run sync immediately and after staggered delays for browser scroll restoration
    syncScroll()
    const t1 = setTimeout(syncScroll, 50)
    const t2 = setTimeout(syncScroll, 150)
    const t3 = setTimeout(syncScroll, 300)

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY) {
        setHidden(false)
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.has-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  if (pathname?.startsWith('/studio') || pathname?.startsWith('/watch-in-action')) {
    return null
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'navbar-hidden' : ''}`}>
        <div className="nav-container">
            <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="/Logo/Mithriv logo.svg" alt="Mithriv Logo" style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </Link>
            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/home-02">Home 02</Link></li>
                <li className={`has-dropdown ${activeDropdown === 'platform' ? 'is-active' : ''}`}>
                    <a style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'platform' ? null : 'platform'); }}>Platform <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6, transition: 'transform 0.3s' }}>
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></a>
                    <div className="mega-menu">
                        <div className="mega-left">
                            <h3 style={{ color: '#F5F7FA', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 600 }}>The Mithriv Platform</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '24px', flexGrow: 1 }}>
                                The first AI execution layer that knows your sites, correlates across systems, and acts in real time.</p>
                            <Link href="/integration-fabric" className="ent-btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F7FA', textDecoration: 'none', textAlign: 'center' }}>View Platform Overview</Link>
                        </div>
                        <div className="mega-right">
                            <h4 style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: 600 }}>Core Modules</h4>
                            <div className="mega-grid">
                                <Link href="/integration-fabric" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8B1FF" strokeWidth="2">
                                            <path d="M18 3L22 7L18 11M22 7H13C10.7909 7 9 8.79086 9 11V13C9 15.2091 7.20914 17 5 17H2" />
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Integration Fabric</h5>
                                        <p>Every Security System. One Operational Model.</p>
                                    </div>
                                </Link>
                                <Link href="/communication-interface" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9A9A" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Communication Interface</h5>
                                        <p>Mithriv Conversation Stack Scenario Mapping.</p>
                                    </div>
                                </Link>
                                <Link href="/communication-v2" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Communication Interface v2</h5>
                                        <p>Autonomous Conversational Operations.</p>
                                    </div>
                                </Link>
                                <Link href="/intelligence-engine" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Intelligence Engine</h5>
                                        <p>The Decision Layer for Physical Security.</p>
                                    </div>
                                </Link>
                                <Link href="/intelligence-engine-v2" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Intelligence Engine v2</h5>
                                        <p>Conscious Physical Decision Engine.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>

                <li><Link href="/#">Industries</Link></li>
                <li className={`has-dropdown ${activeDropdown === 'resources' ? 'is-active' : ''}`}>
                    <a style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'resources' ? null : 'resources'); }}>Resources <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6, transition: 'transform 0.3s' }}>
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></a>
                    <div className="mega-menu">
                        <div className="mega-left">
                            <h3 style={{ color: '#F5F7FA', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 600 }}>Intelligence & Insights</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '24px', flexGrow: 1 }}>
                                Stay ahead with our latest research, podcasts, and deep dives into autonomous execution.
                            </p>
                        </div>
                        <div className="mega-right">
                            <h4 style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: 600 }}>All Resources</h4>
                            <div className="mega-grid">
                                <Link href="/blog" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8350e8" strokeWidth="2">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Blog</h5>
                                        <p>Latest insights & strategy.</p>
                                    </div>
                                </Link>
                                <Link href="/podcast" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8B1FF" strokeWidth="2">
                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                            <line x1="12" y1="19" x2="12" y2="22"></line>
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Podcast</h5>
                                        <p>Listen to industry leaders.</p>
                                    </div>
                                </Link>
                                <Link href="/ebooks" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Ebooks</h5>
                                        <p>Executive playbooks.</p>
                                    </div>
                                </Link>
                                <Link href="/newsletter" className="mega-item">
                                    <div className="mega-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9A9A" strokeWidth="2">
                                            <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                                            <polyline points="3 7 12 13 21 7"></polyline>
                                        </svg>
                                    </div>
                                    <div className="mega-content">
                                        <h5>Newsletter</h5>
                                        <p>Weekly autonomy dispatches.</p>
                                    </div>
                                </Link>
                                <Link href="/case-studies" className="mega-item">
                                    <div className="mega-content" style={{ marginLeft: 0 }}>
                                        <h5>Case Studies</h5>
                                        <p>Proven enterprise autonomy.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
                <li><Link href="/#">Company</Link></li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginRight: '12px',
                    color: 'currentColor',
                    transition: 'all 0.3s ease'
                  }}
                  className="theme-toggle-btn"
                >
                  {theme === 'dark' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
                <Link href="/watch-in-action" id="watchDemoBtn" className="ent-btn-primary" style={{ padding: '12px 24px', display: 'inline-flex', fontSize: '14px' }}>Watch Demo</Link>
                <button 
                  className="mobile-menu-btn" 
                  id="mobileMenuBtn" 
                  aria-label="Toggle Menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </nav>
  )
}
