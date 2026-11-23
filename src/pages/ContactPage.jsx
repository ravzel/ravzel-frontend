import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ArrowUpRight, MessageSquare, AlertCircle, Sparkles, Send } from 'lucide-react';
import { STUDIO_INFO, CORE_SERVICES } from '../data/studioData';

export function ContactPage({ preSelectedService = '' }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preSelectedService || CORE_SERVICES[0].title,
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submissionTriggered, setSubmissionTriggered] = useState(false);

  // Handle email copy to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name or organization name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide an email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address format.';
    }

    if (!formData.service) {
      errors.service = 'Please select one of the five official services.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief outline of your project requirements.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build the mailto protocol link
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello RAVZEL Team,\n\n` +
      `My name is ${formData.name}.\n` +
      `Contact Email: ${formData.email}\n` +
      `Selected Service: ${formData.service}\n\n` +
      `Project Scope & Details:\n${formData.message}\n\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards,\n${formData.name}`
    );

    const mailtoUrl = `mailto:${STUDIO_INFO.contact.email}?subject=${subject}&body=${body}`;

    setSubmissionTriggered(true);

    // Open mail client
    window.location.href = mailtoUrl;
  };

  // Direct WhatsApp submission
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    const text = encodeURIComponent(
      `Hello RAVZEL Team, I would like to discuss a project.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Service:* ${formData.service}\n\n` +
      `*Project Scope:*\n${formData.message}`
    );

    const waUrl = `https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative pt-24 sm:pt-28 pb-20">
      
      {/* Editorial Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9D9D9]/10 text-xs font-mono text-[#D9D9D9]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA] font-bold">// INQUIRY PROTOCOL</span>
            <span>—</span>
            <span>DIRECT STUDIO COMMS</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9D9D9]/40">[ 24H RESPONSE WINDOW ]</span>
        </div>

        <div className="pt-10 max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F8F6EE]">
            Start a Project
          </h1>
          <p className="text-base sm:text-lg text-[#D9D9D9]/80 font-light leading-relaxed">
            Have a new website, web application, or custom software system in mind? Connect directly with the RAVZEL team. We collaborate closely with founders and businesses in India and across the globe.
          </p>
        </div>
      </section>

      {/* Main Grid: Channels on Left, Form on Right */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Studio Channels & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Channel Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 space-y-4 card-tactile">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
                  // OFFICIAL EMAIL
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  MONITORED HOURLY
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="text-lg sm:text-xl font-bold font-mono text-[#F8F6EE] hover:text-[#A78BFA] transition-colors"
                >
                  {STUDIO_INFO.contact.email}
                </a>
                <p className="text-xs text-[#D9D9D9]/70 mt-1">
                  For RFPs, detailed scopes, wireframes, and architectural inquiries.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#222222] border border-[#D9D9D9]/15 text-xs font-mono text-[#F8F6EE] hover:bg-[#2a2a2a] transition-all"
                  aria-label="Copy studio email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D9D9D9]/70" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A78BFA] hover:underline"
                >
                  <span>Open Mail App</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 space-y-4 card-tactile">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
                  // WHATSAPP DIRECT
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  FASTEST RESPONSE
                </span>
              </div>

              <div>
                <p className="text-lg sm:text-xl font-bold font-mono text-[#F8F6EE]">
                  {STUDIO_INFO.contact.whatsappFormatted}
                </p>
                <p className="text-xs text-[#D9D9D9]/70 mt-1">
                  Connect instantly with the studio team for quick project scoping, questions, or introductory discussions.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={STUDIO_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F8F6EE] text-[#0E0E0E] text-xs font-semibold tracking-wide btn-tactile hover:bg-white active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#0E0E0E]" />
                  <span>Launch WhatsApp Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0E0E0E]" />
                </a>
              </div>
            </div>

            {/* Studio Coordinates & Operational Metadata */}
            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#D9D9D9]/10 space-y-3 text-xs font-mono text-[#D9D9D9]/70">
              <div className="text-[#F8F6EE] font-bold">// STUDIO PARAMETERS:</div>
              <div className="flex justify-between border-b border-[#D9D9D9]/10 pb-2">
                <span>CLIENT GEO:</span>
                <span className="text-[#F8F6EE]">Pan-India & International</span>
              </div>
              <div className="flex justify-between border-b border-[#D9D9D9]/10 pb-2">
                <span>TURNAROUND:</span>
                <span className="text-emerald-400 font-semibold">&lt; 24h Response</span>
              </div>
              <div className="flex justify-between">
                <span>COLLABORATION:</span>
                <span className="text-[#A78BFA]">Direct Founder Oversight</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 relative">
              
              <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#F8F6EE]">
                    Project Inquiry Brief
                  </h2>
                  <p className="text-xs font-mono text-[#D9D9D9]/60 mt-0.5">
                    Structured submission routed directly to our inbox.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#A78BFA]">[ VERIFIED ]</span>
              </div>

              {/* Real Form with Validation */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* 1. Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-[#D9D9D9] mb-1.5 uppercase">
                    Your Name / Organization <span className="text-[#A78BFA]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                    }}
                    placeholder="e.g. Alex Rivera or Acme Health"
                    className={`w-full bg-[#0E0E0E] border rounded-xl px-4 py-3 text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none transition-colors ${
                      formErrors.name ? 'border-red-400 focus:border-red-400' : 'border-[#D9D9D9]/20 focus:border-[#A78BFA]'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-[#D9D9D9] mb-1.5 uppercase">
                    Email Address <span className="text-[#A78BFA]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                    }}
                    placeholder="e.g. alex@company.com"
                    className={`w-full bg-[#0E0E0E] border rounded-xl px-4 py-3 text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none transition-colors ${
                      formErrors.email ? 'border-red-400 focus:border-red-400' : 'border-[#D9D9D9]/20 focus:border-[#A78BFA]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* 3. Service Selection (Strictly Limited to the 5 Official Services) */}
                <div>
                  <label htmlFor="service" className="block text-xs font-mono text-[#D9D9D9] mb-1.5 uppercase">
                    Service Required <span className="text-[#A78BFA]">*</span>
                  </label>
                  
                  {/* Drop-down Selector */}
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value });
                      if (formErrors.service) setFormErrors({ ...formErrors, service: null });
                    }}
                    className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/20 rounded-xl px-4 py-3 text-sm text-[#F8F6EE] focus:outline-none focus:border-[#A78BFA] transition-colors"
                  >
                    {CORE_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title} className="bg-[#0E0E0E] text-[#F8F6EE]">
                        {srv.id}. {srv.title}
                      </option>
                    ))}
                  </select>

                  {/* Quick Pill Selector to easily toggle */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {CORE_SERVICES.map((srv) => {
                      const isSelected = formData.service === srv.title;
                      return (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, service: srv.title })}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-[#A78BFA]/20 border-[#A78BFA] text-[#F8F6EE]'
                              : 'bg-[#0E0E0E] border-[#D9D9D9]/10 text-[#D9D9D9]/70 hover:border-[#D9D9D9]/30'
                          }`}
                        >
                          {srv.id} {srv.shortTitle || srv.title.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>

                  {formErrors.service && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.service}
                    </p>
                  )}
                </div>

                {/* 4. Project Scope / Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[#D9D9D9] mb-1.5 uppercase">
                    Project Scope / Message <span className="text-[#A78BFA]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: null });
                    }}
                    placeholder="Describe your project vision, target timeline, features required, or any existing reference materials..."
                    className={`w-full bg-[#0E0E0E] border rounded-xl p-4 text-sm text-[#F8F6EE] placeholder-[#D9D9D9]/30 focus:outline-none transition-colors resize-none ${
                      formErrors.message ? 'border-red-400 focus:border-red-400' : 'border-[#D9D9D9]/20 focus:border-[#A78BFA]'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons: Email and WhatsApp Options */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] font-bold text-sm tracking-wide btn-tactile hover:bg-white active:scale-95 shadow-md shadow-[#A78BFA]/10"
                  >
                    <Send className="w-4 h-4 text-[#0E0E0E]" />
                    <span>Send Inquiry via Email (Official Mailto Trigger)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#181818] border border-[#D9D9D9]/20 text-[#F8F6EE] font-medium text-xs font-mono tracking-wide btn-tactile hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Or Dispatch Form via WhatsApp Direct</span>
                  </button>
                </div>

                {/* Honest Submission Feedback Banner */}
                {submissionTriggered && (
                  <div className="p-4 rounded-xl bg-[#0E0E0E] border border-emerald-500/30 text-xs font-mono text-emerald-300 space-y-1 animate-in fade-in duration-300">
                    <div className="font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inquiry Pre-filled & Dispatched to Mail Client!</span>
                    </div>
                    <p className="text-[#D9D9D9]/70 font-normal">
                      Your default mail application has opened with all inquiry details formatted. If it did not open automatically, you can email us directly at <span className="text-[#F8F6EE] font-bold">{STUDIO_INFO.contact.email}</span>.
                    </p>
                  </div>
                )}

                <div className="text-[11px] font-mono text-[#D9D9D9]/50 text-center pt-2">
                  No automated spam. 100% human review by Nasheeha & the RAVZEL Team.
                </div>

              </form>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default ContactPage;
