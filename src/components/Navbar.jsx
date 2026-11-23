import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandMonogram } from './BrandMonogram';
import { STUDIO_INFO } from '../data/studioData';

export function Navbar({ activeSection = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'work', label: 'Our Work', href: '#work' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#D9D9D9]/10 shadow-xl shadow-black/50 py-3.5'
            : 'bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#D9D9D9]/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Identity Wordmark + Monospace Studio Badge */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="RAVZEL Digital Studio Home"
          >
            <BrandMonogram size={32} className="hidden sm:inline-flex" />
            <BrandLogo className="h-6 sm:h-7" showTagline={false} />
            <span className="hidden lg:inline-flex items-center text-[10px] font-mono tracking-widest text-[#D9D9D9]/60 px-2 py-0.5 rounded border border-[#D9D9D9]/15 bg-[#141414]">
              [ DIGITAL STUDIO ]
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-[#141414]/90 border border-[#D9D9D9]/10 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`whitespace-nowrap relative px-3.5 xl:px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#F8F6EE] font-semibold bg-[#222222] border border-[#D9D9D9]/20 shadow-sm'
                      : 'text-[#D9D9D9]/70 hover:text-[#F8F6EE] hover:bg-[#1A1A1A]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />}
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Action CTA: High-contrast button linking directly to Contact */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] text-xs font-semibold tracking-wide btn-tactile hover:bg-white hover:shadow-md hover:shadow-[#A78BFA]/20 active:scale-95"
              aria-label="Start a Project with RAVZEL"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0E0E0E]" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 text-[#F8F6EE] focus:outline-none focus:ring-2 focus:ring-[#A78BFA] min-w-[40px] min-h-[40px] flex items-center justify-center active:scale-95 transition-transform"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F8F6EE]" /> : <Menu className="w-5 h-5 text-[#F8F6EE]" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu: Full-screen editorial drawer with smooth link reveals */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0E0E0E] p-5 sm:p-8 pt-24 lg:hidden overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle architectural background */}
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />

          <div className="relative z-10 min-h-full flex flex-col justify-between space-y-8">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">NAVIGATION DIRECTORY</span>
                <span className="text-[10px] font-mono text-[#D9D9D9]/50">[ 05 SECTIONS ]</span>
              </div>

              <nav className="flex flex-col space-y-2.5">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`flex items-center justify-between p-3.5 sm:p-4 min-h-[48px] rounded-xl border text-left transition-all active:scale-[0.99] ${
                        isActive
                          ? 'bg-[#181818] border-[#A78BFA]/50 text-[#F8F6EE]'
                          : 'bg-[#121212] border-[#D9D9D9]/10 text-[#D9D9D9]/80 hover:border-[#D9D9D9]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#A78BFA]">0{idx + 1}</span>
                        <span className="text-lg font-bold tracking-tight">{link.label}</span>
                      </div>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Bottom Contact & Details */}
            <div className="pt-6 border-t border-[#D9D9D9]/10 space-y-3.5">
              <div className="text-xs font-mono text-[#D9D9D9]/60">
                <span className="text-[#A78BFA] font-bold">// VERIFIED CONTACT</span>
                <p className="mt-1 text-sm font-semibold text-[#F8F6EE]">{STUDIO_INFO.contact.email}</p>
              </div>

              <a
                href={STUDIO_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] font-semibold text-sm tracking-wide"
              >
                <span>Connect on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 text-[#0E0E0E]" />
              </a>

              <div className="text-center text-[10px] font-mono text-[#D9D9D9]/40">
                Developed by RAVZEL Team
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
