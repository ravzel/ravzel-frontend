import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Mail,
  Phone,
  Search,
  Check,
  Send,
  Copy,
  ExternalLink,
  Target,
  Compass,
  Zap,
  Award,
  ChevronRight} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BrandLogo } from '../components/BrandLogo';
import { BrandMonogram } from '../components/BrandMonogram';
import { HeroVideo } from '../components/HeroVideo';
import { AiAssistantChat } from '../components/AiAssistantChat';
import { ServiceList } from '../components/ServiceList';
import { ProjectCard } from '../components/ProjectCard';
import {
  STUDIO_INFO,
  CORE_SERVICES,
  PROJECTS_DIRECTORY,
  OUR_PROCESS} from '../data/studioData';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const containerRef = useRef(null);


  // GSAP Animations with prefers-reduced-motion protection
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from('.gsap-hero-anim', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Section titles & cards scroll trigger animations
      gsap.utils.toArray('.gsap-section-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Portfolio Filters & Search
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = useMemo(() => [
    { id: 'All', label: 'All Projects', count: PROJECTS_DIRECTORY.length },
    { id: 'Websites', label: 'Websites', count: PROJECTS_DIRECTORY.filter(p => p.filterCategory === 'Websites' || p.secondaryCategory === 'Websites' || p.category.includes('Website') || p.category.includes('Portfolio') || p.category.includes('E-Commerce')).length },
    { id: 'Web Applications', label: 'Web Applications', count: PROJECTS_DIRECTORY.filter(p => p.filterCategory === 'Web Applications' || p.secondaryCategory === 'Web Applications' || p.category.includes('Web Application') || p.category.includes('Admin')).length }
  ], []);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DIRECTORY.filter((project) => {
      let matchesFilter = true;
      if (activeFilter === 'Websites') {
        matchesFilter = project.filterCategory === 'Websites' || project.secondaryCategory === 'Websites' || project.category.includes('Website') || project.category.includes('Portfolio') || project.category.includes('E-Commerce');
      } else if (activeFilter === 'Web Applications') {
        matchesFilter = project.filterCategory === 'Web Applications' || project.secondaryCategory === 'Web Applications' || project.category.includes('Web Application') || project.category.includes('Admin');
      }

      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Contact Form State & Validation
  const [selectedService, setSelectedService] = useState(CORE_SERVICES[0].title);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name or company name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide an email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please describe your project requirements.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello RAVZEL Team,\n\n` +
      `My name is: ${formData.name}\n` +
      `Contact Email: ${formData.email}\n` +
      `Requested Service: ${selectedService}\n\n` +
      `Project Requirements:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    );

    const mailtoUrl = `mailto:${STUDIO_INFO.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmitFeedback({
      type: 'email',
      message: 'Launching your email client with your pre-filled inquiry for ravzel26@gmail.com.'
    });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const text = encodeURIComponent(
      `Hello RAVZEL Team,\n\n` +
      `I would like to discuss a project with your studio:\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Service:* ${selectedService}\n\n` +
      `*Scope Outline:*\n${formData.message}`
    );

    const waUrl = `https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitFeedback({
      type: 'whatsapp',
      message: 'Redirecting to WhatsApp to send your inquiry directly to the RAVZEL team.'
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div ref={containerRef} className="relative pb-16 overflow-hidden bg-[#0E0E0E]">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION — FULL-WIDTH VIDEO BACKGROUND                  */}
      {/* ============================================================== */}
      <section
        id="home"
        className="relative w-full min-h-[100svh] lg:min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0E0E0E]"
      >
        {/* Full-Width Edge-to-Edge Character Video Background */}
        <HeroVideo />

        {/* Hero Content Overlay (Positioned directly over the video background) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 lg:pt-28 pb-4 sm:pb-6 lg:pb-10 flex flex-col justify-between flex-1 min-h-[100svh] lg:min-h-[calc(100vh-2rem)]">

          {/* Central Hero Composition: Left Hero Narrative + Right Robot Presenter & AI Chatbot */}
          <div className="my-auto py-2 sm:py-4 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 items-center">
            
            {/* LEFT COLUMN: Authentic Hero Narrative Block */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 lg:space-y-6 order-1 text-left">
              
              {/* Brand Label & Small Accent Label */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 gsap-hero-anim">
                <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase bg-[#0E0E0E]/85 backdrop-blur-md border border-[#D9D9D9]/20 px-2.5 sm:px-3 py-1 rounded-lg text-[#F8F6EE] font-semibold whitespace-nowrap">
                  RAVZEL — DIGITAL STUDIO
                </span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase bg-[#A78BFA]/15 backdrop-blur-md border border-[#A78BFA]/30 px-2.5 sm:px-3 py-1 rounded-lg text-[#A78BFA] font-medium flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse shrink-0" />
                  <span>WHERE INNOVATION CREATES IMPACT.</span>
                </span>
              </div>

              {/* Main Headline - Bold, Authoritative & Responsive Scale */}
              <div className="space-y-1 gsap-hero-anim">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold sm:font-extrabold tracking-tight text-[#F8F6EE] leading-[1.12] sm:leading-[1.06]">
                  Build Beyond. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#F8F6EE]">
                    Evolve Forward.
                  </span>
                </h1>
              </div>

              {/* Supporting Headline */}
              <p className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-[#F8F6EE] gsap-hero-anim leading-snug">
                “Turning ideas into impactful digital experiences.”
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-[#D9D9D9]/85 font-light leading-relaxed max-w-lg gsap-hero-anim">
                RAVZEL creates websites, web applications, and digital solutions for modern businesses.
              </p>

              {/* Primary & Secondary Tactile CTAs */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 gsap-hero-anim">
                <button
                  onClick={() => scrollToSection('work')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] font-bold text-xs sm:text-sm tracking-wide btn-tactile hover:bg-white active:scale-95 shadow-xl shadow-black/80 group"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0E0E0E] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 rounded-xl bg-[#0E0E0E]/60 backdrop-blur-md border border-[#D9D9D9]/30 text-[#F8F6EE] font-semibold text-xs sm:text-sm tracking-wide btn-tactile hover:border-[#A78BFA] hover:text-[#A78BFA] hover:bg-[#A78BFA]/10 active:scale-95 group"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Robot Mascot Presenter & Visual Chatbot Connection */}
            <div className="lg:col-span-6 relative order-2 w-full min-w-0 flex flex-col items-center lg:items-end xl:items-end gsap-hero-anim">
              <AiAssistantChat />
            </div>

          </div>

          {/* Bottom Trust & Scroll Navigation Ribbon */}
          <div className="pt-3 sm:pt-5 border-t border-[#D9D9D9]/15 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[9px] xs:text-[10px] sm:text-xs font-mono text-[#D9D9D9]/70 gsap-hero-anim">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[#F8F6EE]">11 VERIFIED CLIENT DEPLOYMENTS</span>
              <span className="text-[#D9D9D9]/40">•</span>
              <span>ZERO TEMPLATE BLOAT</span>
            </div>

            <div
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:text-[#A78BFA] transition-colors"
              onClick={() => scrollToSection('about')}
            >
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================== */}
      {/* 2. ABOUT RAVZEL SECTION                                        */}
      {/* ============================================================== */}
      <section id="about" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-[#D9D9D9]/10 gsap-section-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Uploaded RAVZEL Logo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-[#D9D9D9]/15 bg-[#141414] p-3 sm:p-5 shadow-2xl shadow-black/50 group">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F6F4EB] flex items-center justify-center p-4 sm:p-6 shadow-inner transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src="/ravzel-logo.png"
                  alt="RAVZEL — Build Beyond. Evolve Forward."
                  loading="lazy"
                  decoding="async"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain select-none"
                />
              </div>
              <div className="mt-3 pt-3 border-t border-[#D9D9D9]/10 flex items-center justify-between text-[11px] font-mono text-[#D9D9D9]/60 px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                  <span className="text-[#F8F6EE] font-semibold">RAVZEL</span>
                </span>
                <span>DIGITAL STUDIO & SOFTWARE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Existing About Content (Heading, Description, Brand Narrative, Target Audience) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block">
                // ABOUT RAVZEL
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F6EE] leading-tight">
                Brings design, development, and technology together.
              </h2>
            </div>

            <div className="p-5 sm:p-7 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15">
              <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase block mb-2">
                // OFFICIAL BRAND NARRATIVE
              </span>
              <p className="text-lg sm:text-xl font-light text-[#F8F6EE] leading-relaxed">
                “{STUDIO_INFO.brandNarrative}”
              </p>
            </div>

            <div className="space-y-4 text-[#D9D9D9]/85 text-base sm:text-lg leading-relaxed font-light">
              <p>
                At RAVZEL, we believe every great idea deserves the right digital foundation. We bring creativity, technology, and thoughtful strategy together to transform ideas into meaningful digital experiences that help businesses move forward.
              </p>

              <p>
                From distinctive websites and intelligent web applications to intuitive user experiences and tailored digital solutions, we focus on building with purpose — creating solutions that solve real problems, connect businesses with people, and evolve alongside their ambitions. Because for us, digital innovation isn't just about keeping up with change; it's about creating what's next.
              </p>

              <p className="text-[#F8F6EE] font-medium">
                RAVZEL — Build Beyond. Evolve Forward.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 text-xs font-mono text-[#D9D9D9]/70 space-y-1.5">
              <div className="text-[#F8F6EE] font-semibold">// TARGET AUDIENCE:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] sm:text-xs">
                <div>• Startups & Entrepreneurs</div>
                <div>• Small & Medium-Sized Businesses</div>
                <div>• Growing Brands & Established Businesses</div>
                <div>• Organizations Seeking Digital Solutions</div>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#A78BFA] bg-[#A78BFA]/10 px-3 py-1 rounded-md border border-[#A78BFA]/20">[ BESPOKE SOLUTIONS ]</span>
              <span className="text-xs font-mono text-[#D9D9D9]/40">•</span>
              <span className="text-xs font-mono text-[#F8F6EE] bg-[#181818] px-3 py-1 rounded-md border border-[#D9D9D9]/15">[ QUALITY-FIRST DEVELOPMENT ]</span>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================== */}
      {/* 3. CORE SERVICES SECTION (5 FINALIZED SERVICES)                */}
      {/* ============================================================== */}
      <section id="services" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-[#D9D9D9]/10 gsap-section-reveal">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block mb-1">
              // STUDIO CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6EE]">
              Five Tailored Digital Services
            </h2>
            <p className="text-sm text-[#D9D9D9]/70 mt-2 max-w-xl font-light">
              Carefully engineered services delivering real business value through thoughtful design, robust development, and digital marketing.
            </p>
          </div>

          <div className="text-xs font-mono text-[#D9D9D9]/50 text-left sm:text-right shrink-0">
            [ 05 FINAL SERVICES ] • ZERO TEMPLATE BLOAT
          </div>
        </div>

        <ServiceList
          onSelectService={(serviceTitle) => {
            setSelectedService(serviceTitle);
            scrollToSection('contact');
          }}
        />
      </section>


      {/* ============================================================== */}
      {/* 4. SELECTED WORK — ALL 10 PROJECTS DIRECTORY                   */}
      {/* ============================================================== */}
      <section id="work" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-[#D9D9D9]/10 gsap-section-reveal">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block mb-1">
              // PORTFOLIO ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6EE]">
              Selected Client Work
            </h2>
            <p className="text-sm text-[#D9D9D9]/70 mt-2 max-w-xl font-light">
              Explore all 11 verified projects delivered by the RAVZEL team—spanning high-converting websites, artisan storefronts, and operational web applications.
            </p>
          </div>

          <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0">
            ALL 11 PROJECTS VERIFIED & MONITORED
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono tracking-tight rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                    isActive
                      ? 'bg-[#F8F6EE] text-[#0E0E0E] font-bold shadow-md'
                      : 'text-[#D9D9D9]/70 hover:text-[#F8F6EE] hover:bg-[#1D1D1D]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#0E0E0E] text-[#F8F6EE]' : 'bg-[#222222] text-[#D9D9D9]/60'
                    }`}
                  >
                    0{tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] sm:min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-[#D9D9D9]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tags..."
              className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl pl-8 pr-8 py-2 text-xs font-mono text-[#F8F6EE] placeholder-[#D9D9D9]/40 focus:outline-none focus:border-[#A78BFA]"
              aria-label="Filter projects by title or category"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#D9D9D9]/60 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* 11 Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 space-y-4">
            <p className="text-sm font-mono text-[#D9D9D9]/60">No projects match the search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] text-xs font-mono font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>


      {/* ============================================================== */}
      {/* 5. OUR PROCESS (DISCOVER → PLAN → DESIGN & DEVELOP → TEST → LAUNCH) */}
      {/* ============================================================== */}
      <section id="process" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-[#D9D9D9]/10 gsap-section-reveal">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block mb-1">
            // STRUCTURED WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6EE]">
            Our Development Process
          </h2>
          <p className="text-sm text-[#D9D9D9]/70 mt-2 font-light">
            A disciplined five-stage workflow ensuring transparent milestones, rigorous quality checks, and timely launch.
          </p>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6">
          {OUR_PROCESS.map((step, idx) => (
            <div
              key={step.step}
              className={`p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 flex flex-col justify-between card-tactile relative overflow-hidden group ${
                idx === 4 ? 'col-span-2 lg:col-span-1' : 'col-span-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <span className="text-sm sm:text-xl font-mono font-bold text-[#A78BFA]">
                    {step.step}
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-mono text-[#D9D9D9]/40">STAGE 0{idx + 1}</span>
                </div>

                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#F8F6EE] mb-0.5 sm:mb-1 group-hover:text-[#A78BFA] transition-colors line-clamp-2 sm:line-clamp-none">
                  {step.name}
                </h3>

                <p className="text-[9px] sm:text-xs font-mono text-[#A78BFA] mb-1.5 sm:mb-3 line-clamp-1">
                  {step.tagline}
                </p>

                <p className="text-[10px] sm:text-xs text-[#D9D9D9]/75 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#D9D9D9]/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-[#D9D9D9]/40">
                <span>MILESTONE CHECK</span>
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A78BFA]" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ============================================================== */}
      {/* 7. CONTACT SECTION — “HAVE AN IDEA? LET'S BUILD IT.”           */}
      {/* ============================================================== */}
      <section id="contact" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-[#D9D9D9]/10 gsap-section-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Value proposition and direct verified channels */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block">
              // INITIATE COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8F6EE] leading-tight">
              Have an idea? <br />
              <span className="text-[#A78BFA]">Let's build it.</span>
            </h2>
            <p className="text-base text-[#D9D9D9]/80 font-light leading-relaxed">
              We invite businesses, founders, and teams to discuss website, web application, or custom digital solution requirements. Direct communication, honest milestones, and zero fluff.
            </p>

            {/* Verified Contact Channels Cards */}
            <div className="space-y-3 pt-2">
              
              {/* Email direct */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#D9D9D9]/10 flex items-center justify-center text-[#A78BFA] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#D9D9D9]/50 block uppercase">STUDIO INQUIRIES</span>
                    <a
                      href={`mailto:${STUDIO_INFO.contact.email}`}
                      className="text-sm font-semibold text-[#F8F6EE] hover:text-[#A78BFA] truncate block transition-colors"
                    >
                      {STUDIO_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1F1F1F] text-xs font-mono text-[#D9D9D9] hover:text-white flex items-center gap-1.5 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy studio email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp direct */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#D9D9D9]/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#D9D9D9]/50 block uppercase">WHATSAPP DIRECT</span>
                    <a
                      href={STUDIO_INFO.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#F8F6EE] hover:text-emerald-400 transition-colors"
                    >
                      {STUDIO_INFO.contact.whatsappFormatted}
                    </a>
                  </div>
                </div>

                <a
                  href={STUDIO_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium hover:bg-emerald-500/25 transition-all flex items-center gap-1"
                >
                  <span>Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Verified Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 shadow-2xl shadow-black/60">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 border-b border-[#D9D9D9]/10 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#F8F6EE]">Project Inquiry Protocol</h3>
                  <p className="text-xs font-mono text-[#D9D9D9]/60 mt-0.5">Fill out your requirements for immediate routing.</p>
                </div>
                <span className="text-[10px] font-mono text-[#A78BFA] border border-[#A78BFA]/30 px-2 py-0.5 rounded bg-[#A78BFA]/10 w-fit shrink-0">
                  REAL-TIME DISPATCH
                </span>
              </div>

              {submitFeedback && (
                <div className="mb-6 p-4 rounded-xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-xs font-mono text-[#F8F6EE] flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#A78BFA]">STATUS: </span>
                    {submitFeedback.message}
                  </div>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-[#D9D9D9]/80 mb-2">
                    YOUR NAME OR ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Acme Inc."
                    className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none focus:border-[#A78BFA] transition-colors"
                  />
                  {formErrors.name && (
                    <p className="text-xs font-mono text-rose-400 mt-1.5">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-[#D9D9D9]/80 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none focus:border-[#A78BFA] transition-colors"
                  />
                  {formErrors.email && (
                    <p className="text-xs font-mono text-rose-400 mt-1.5">{formErrors.email}</p>
                  )}
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-mono text-[#D9D9D9]/80 mb-2">
                    PRIMARY SERVICE OF INTEREST *
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#F8F6EE] focus:outline-none focus:border-[#A78BFA] transition-colors cursor-pointer"
                  >
                    {CORE_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title} className="bg-[#141414] text-[#F8F6EE]">
                        {srv.id}. {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scope Outline */}
                <div>
                  <label className="block text-xs font-mono text-[#D9D9D9]/80 mb-2">
                    PROJECT SCOPE & OBJECTIVES *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your vision, target timeline, or operational needs..."
                    className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none focus:border-[#A78BFA] transition-colors resize-y"
                  />
                  {formErrors.message && (
                    <p className="text-xs font-mono text-rose-400 mt-1.5">{formErrors.message}</p>
                  )}
                </div>

                {/* Dual Honest Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] font-semibold text-xs tracking-wide btn-tactile hover:bg-white active:scale-95 shadow-lg shadow-black/50"
                  >
                    <Mail className="w-4 h-4 text-[#0E0E0E]" />
                    <span>Send via Email Client</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-emerald-500/40 text-emerald-400 font-semibold text-xs tracking-wide btn-tactile hover:bg-emerald-500/10 active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[#D9D9D9]/40 text-center pt-2">
                  No automated spam. Your details route directly to the RAVZEL core team.
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;
