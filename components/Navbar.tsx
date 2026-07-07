'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatedNetworkIcon, AnimatedBotIcon, AnimatedBrainIcon, AnimatedBlogIcon, AnimatedPodcastIcon, AnimatedEbookIcon, AnimatedNewsletterIcon, AnimatedCaseStudiesIcon } from './AnimatedIcons'


function MegaItem({ href, title, description, IconComponent, color, iconClass }: { href: string, title: string, description: string, IconComponent: React.ElementType, color: string, iconClass: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href} className="mega-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="mega-icon">
        <IconComponent color={color} size={20} className={`animated-icon ${iconClass}`} isHovered={isHovered} />
      </div>
      <div className="mega-content">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </Link>
  );
}

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
                            <p style={{ color: '#ADADAE', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px', flexGrow: 1 }}>
                                The first AI execution layer that knows your sites, correlates across systems, and acts in real time.</p>
                            <Link href="/integration-fabric" className="ent-btn-primary">View Platform Overview <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></Link>
                        </div>
                        <div className="mega-right">
                            <h4 style={{ color: '#ADADAE', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: 600 }}>Core Modules</h4>
                            <div className="mega-grid">
                                <MegaItem href="/integration-fabric" title="Integration Fabric" description="Every Security System. One Operational Model." IconComponent={AnimatedNetworkIcon} color="#EA49B2" iconClass="network-icon" />

                                <MegaItem href="/communication-v2" title="Communication Interface v2" description="Autonomous Conversational Operations." IconComponent={AnimatedBotIcon} color="#FCE545" iconClass="bot-icon" />
                                <MegaItem href="/intelligence-engine-v2" title="Intelligence Engine v2" description="The Decision Layer for Physical Security." IconComponent={AnimatedBrainIcon} color="#6354F3" iconClass="brain-icon" />

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
                            <p style={{ color: '#ADADAE', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px', flexGrow: 1 }}>
                                Stay ahead with our latest research, podcasts, and deep dives into autonomous execution.
                            </p>
                            <Link href="/resources" className="ent-btn-primary">View All Resources <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></Link>
                        </div>
                        <div className="mega-right">
                            <h4 style={{ color: '#ADADAE', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: 600 }}>All Resources</h4>
                            <div className="mega-grid">
                                <MegaItem href="/blog" title="Blog" description="Latest insights & strategy." IconComponent={AnimatedBlogIcon} color="#AFF962" iconClass="blog-icon" />
                                <MegaItem href="/podcast" title="Podcast" description="Listen to industry leaders." IconComponent={AnimatedPodcastIcon} color="#4993E3" iconClass="podcast-icon" />
                                <MegaItem href="/ebooks" title="Ebooks" description="Executive playbooks." IconComponent={AnimatedEbookIcon} color="#E7C73B" iconClass="ebook-icon" />
                                <MegaItem href="/newsletter" title="Newsletter" description="Weekly autonomy dispatches." IconComponent={AnimatedNewsletterIcon} color="#E44856" iconClass="newsletter-icon" />
                                <MegaItem href="/case-studies" title="Case Studies" description="Proven enterprise autonomy." IconComponent={AnimatedCaseStudiesIcon} color="#49B25C" iconClass="case-studies-icon" />
                            </div>
                        </div>
                    </div>
                </li>
                <li><Link href="/#">Company</Link></li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/watch-in-action" id="watchDemoBtn" className="ent-btn-primary">Watch Demo <svg className="hover-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="arrow-stem" d="M3 12h12" /><path className="arrow-head" d="m9 18 6-6-6-6"/></svg></Link>
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
