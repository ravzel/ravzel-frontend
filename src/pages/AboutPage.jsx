import React from 'react';
import { ArrowUpRight, Compass, Target, Sparkles, ShieldCheck, HeartHandshake, Zap, Award } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BrandMonogram } from '../components/BrandMonogram';
import { STUDIO_INFO, STUDIO_VALUES} from '../data/studioData';

export function AboutPage({ setActivePage }) {
  const valueIcons = {
    Creativity: Sparkles,
    Practicality: Zap,
    Quality: ShieldCheck,
    Growth: Award,
    Collaboration: HeartHandshake
  };

  return (
    <div className="relative pt-24 sm:pt-28 pb-20">
      
      {/* 1. EDITORIAL HEADER & BRAND STORY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16">
        
        {/* Monospace section tracer */}
        <div className="flex items-center justify-between pb-6 border-b border-[#D9D9D9]/10 text-xs font-mono text-[#D9D9D9]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA] font-bold">// ABOUT RAVZEL</span>
            <span>—</span>
            <span>STUDIO ORIGIN & PHILOSOPHY</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9D9D9]/40">[ SEC::02 ]</span>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
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

          {/* Right Column: Heading, Official Brand Story, and Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
                  DIGITAL STUDIO & SOFTWARE SOLUTION
                </span>
                <span className="text-xs font-mono text-[#D9D9D9]/40">•</span>
                <span className="text-xs font-mono text-[#D9D9D9]/60">
                  INDIA-FIRST ROOTS
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8F6EE] leading-tight">
                Crafting useful digital experiences built to evolve.
              </h1>
            </div>

            {/* The Strict Brand Story Statement */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15">
              <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase block mb-3">
                // OFFICIAL BRAND STORY
              </span>
              <p className="text-lg sm:text-xl font-light text-[#F8F6EE] leading-relaxed">
                "RAVZEL is a digital studio focused on helping businesses strengthen their digital presence through thoughtfully designed websites and practical software solutions. By combining creativity, technology and business needs, RAVZEL aims to build useful digital experiences that can evolve as businesses grow."
              </p>
            </div>

            <p className="text-base text-[#D9D9D9]/80 leading-relaxed font-normal">
              We approach every client engagement not as a one-time transaction, but as an ongoing architectural partnership. Modern digital platforms cannot remain static; they must adapt dynamically to shifting customer expectations, operational scale, and emerging software paradigms.
            </p>
          </div>

        </div>
      </section>


      {/* 2. VISION & MISSION CARDS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-[#D9D9D9]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 card-tactile flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/15 flex items-center justify-center text-[#A78BFA]">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
                  [ LONG-TERM VISION ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F6EE] mb-4">
                Our Vision
              </h2>

              <p className="text-base sm:text-lg text-[#D9D9D9]/90 font-light leading-relaxed">
                "To become a trusted digital studio delivering meaningful digital experiences and software solutions for businesses in India and worldwide."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D9D9D9]/10 text-xs font-mono text-[#D9D9D9]/50">
              // GUIDING HORIZON
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 card-tactile flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/15 flex items-center justify-center text-[#F8F6EE]">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#D9D9D9]/70 uppercase">
                  [ OPERATIONAL MISSION ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F6EE] mb-4">
                Our Mission
              </h2>

              <p className="text-base sm:text-lg text-[#D9D9D9]/90 font-light leading-relaxed">
                "To create thoughtful, reliable and accessible digital solutions that help businesses establish their presence, improve their workflows and move forward with confidence."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D9D9D9]/10 text-xs font-mono text-[#D9D9D9]/50">
              // DAILY MANDATE
            </div>
          </div>

        </div>
      </section>


      {/* 3. THE 5 CORE STUDIO VALUES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-[#D9D9D9]/10">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase block mb-1">
            // FOUNDATIONAL PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F6EE]">
            The 5 Core Studio Values
          </h2>
          <p className="text-sm text-[#D9D9D9]/70 mt-2 font-light">
            These values govern every line of code, typographical decision, and client interaction at RAVZEL.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
          {STUDIO_VALUES.map((val, idx) => {
            const Icon = valueIcons[val.name] || Sparkles;
            return (
              <div
                key={val.name}
                className={`p-3 sm:p-6 md:p-7 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 card-tactile flex flex-col justify-between ${
                  idx === 4 ? 'col-span-2 lg:col-span-1' : 'col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#A78BFA]">
                      0{idx + 1} //
                    </span>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9D9D9]/60" />
                  </div>

                  <h3 className="text-xs sm:text-lg md:text-xl font-bold text-[#F8F6EE] tracking-tight mb-1 sm:mb-2">
                    {val.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#A78BFA]/90 mb-1.5 sm:mb-3 font-mono line-clamp-2">
                    "{val.summary}"
                  </p>

                  <p className="text-[10px] sm:text-xs text-[#D9D9D9]/80 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                    {val.detail}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#D9D9D9]/10 text-[8px] sm:text-[10px] font-mono text-[#D9D9D9]/50">
                  STANDARD ENFORCED
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. BOTTOM CTA TO PROJECTS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="p-8 rounded-xl bg-[#121212] border border-[#D9D9D9]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#F8F6EE]">Ready to examine the results of this philosophy?</h3>
            <p className="text-xs font-mono text-[#D9D9D9]/70">Explore all 11 live client projects engineered by the RAVZEL team.</p>
          </div>
          <button
            onClick={() => {
              setActivePage('projects');
              window.location.hash = 'projects';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-lg bg-[#F8F6EE] text-[#0E0E0E] font-semibold text-xs tracking-wide btn-tactile hover:bg-white active:scale-95 shrink-0"
          >
            Explore Projects Directory →
          </button>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
