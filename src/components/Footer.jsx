import React from 'react';
import { ArrowUpRight, Mail, Phone, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandMonogram } from './BrandMonogram';
import { STUDIO_INFO, CORE_SERVICES } from '../data/studioData';

export function Footer({ onNavigate }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
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
    <footer className="relative bg-[#0A0A0A] border-t border-[#D9D9D9]/10 pt-16 pb-12 overflow-hidden text-[#F8F6EE]">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Studio Statement Banner */}
        <div className="pb-12 border-b border-[#D9D9D9]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMonogram size={36} />
              <BrandLogo className="h-8" showTagline={false} />
            </div>
            
            <p className="text-xl sm:text-2xl font-light text-[#F8F6EE] tracking-tight max-w-xl">
              {STUDIO_INFO.brandNarrative}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-[11px] font-mono tracking-widest uppercase bg-[#141414] border border-[#D9D9D9]/15 px-3 py-1 rounded text-[#D9D9D9]">
                TAGLINE: {STUDIO_INFO.tagline}
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase bg-[#A78BFA]/10 border border-[#A78BFA]/20 px-3 py-1 rounded text-[#A78BFA]">
                MOTTO: {STUDIO_INFO.motto}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:items-end justify-between space-y-4">
            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs font-mono text-[#D9D9D9]/60 uppercase">// STUDIO STATUS</div>
              <div className="flex items-center sm:justify-end gap-2 text-sm font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{STUDIO_INFO.availability}</span>
              </div>
            </div>

            <a
              href={STUDIO_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] text-xs font-semibold tracking-wide btn-tactile hover:bg-white active:scale-95 shadow-md shadow-[#A78BFA]/10"
            >
              <span>Connect on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-[#0E0E0E]" />
            </a>
          </div>
        </div>

        {/* Structured Editorial Link Columns */}
        <div className="py-10 sm:py-12 border-b border-[#D9D9D9]/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          
          {/* Col 1: Studio Sections */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
              // STUDIO NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-[#D9D9D9]/80 hover:text-[#F8F6EE] hover:translate-x-1 transition-all inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-[#D9D9D9]/80 hover:text-[#F8F6EE] hover:translate-x-1 transition-all inline-block"
                >
                  About RAVZEL
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-[#D9D9D9]/80 hover:text-[#F8F6EE] hover:translate-x-1 transition-all inline-block"
                >
                  Services (05)
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, 'work')}
                  className="text-[#D9D9D9]/80 hover:text-[#F8F6EE] hover:translate-x-1 transition-all inline-block"
                >
                  Selected Work (11)
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-[#D9D9D9]/80 hover:text-[#F8F6EE] hover:translate-x-1 transition-all inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: The 5 Official Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
              // CORE SERVICES
            </h4>
            <ul className="space-y-2 text-xs text-[#D9D9D9]/80">
              {CORE_SERVICES.map((srv) => (
                <li key={srv.id} className="leading-snug">
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, 'services')}
                    className="hover:text-[#F8F6EE] text-left transition-colors inline-block"
                  >
                    <span className="font-mono text-[#A78BFA] text-[10px] mr-1.5">{srv.id}.</span>
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
              // VERIFIED CHANNELS
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="flex items-center gap-2 text-[#D9D9D9]/80 hover:text-[#F8F6EE] transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#A78BFA] group-hover:scale-110 transition-transform" />
                  <span className="truncate">{STUDIO_INFO.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D9D9D9]/80 hover:text-[#F8F6EE] transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A78BFA] group-hover:scale-110 transition-transform" />
                  <span>{STUDIO_INFO.contact.whatsappFormatted}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Philosophy & Positioning */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
              // STUDIO POSITIONING
            </h4>
            <p className="text-xs leading-relaxed text-[#D9D9D9]/70 font-light">
              {STUDIO_INFO.positioning}
            </p>
            <div className="p-3 rounded-xl bg-[#141414] border border-[#D9D9D9]/10 text-[11px] font-mono text-[#D9D9D9]/80">
              <span className="text-[#A78BFA] block font-semibold mb-1">INDIA-FIRST ARCHITECTURE</span>
              <span>Serving ambitious founders in India & international visionaries.</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-xs font-mono text-[#D9D9D9]/60">
          <div>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#D9D9D9]/15 text-[#F8F6EE] text-[10px] sm:text-xs max-w-full text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shrink-0" />
            <span className="font-semibold break-words">{STUDIO_INFO.globalCredit}</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-center">
            <span className="break-words">{STUDIO_INFO.tagline}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
