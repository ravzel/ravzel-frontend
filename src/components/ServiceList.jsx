import React, { useState } from 'react';
import {
  Globe,
  Terminal,
  Boxes,
  GraduationCap,
  Megaphone,
  Check,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { CORE_SERVICES } from '../data/studioData';

export const SERVICE_ICONS = {
  "01": Globe,
  "02": Terminal,
  "03": Boxes,
  "04": GraduationCap,
  "05": Megaphone
};

export function ServiceList({ onSelectService }) {
  const [activeServiceId, setActiveServiceId] = useState("01");
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const toggleService = (id) => {
    setActiveServiceId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Top View Mode Switcher & Meta Info */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
          <span className="text-xs font-mono text-[#D9D9D9]/70 uppercase tracking-wider">
            Displaying 05 Specialized Capabilities
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-xl bg-[#141414] border border-[#D9D9D9]/15 text-xs font-mono">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-[#F8F6EE] text-[#0E0E0E] font-bold shadow-sm'
                : 'text-[#D9D9D9]/60 hover:text-[#F8F6EE]'
            }`}
            aria-label="Switch to Card Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-[#F8F6EE] text-[#0E0E0E] font-bold shadow-sm'
                : 'text-[#D9D9D9]/60 hover:text-[#F8F6EE]'
            }`}
            aria-label="Switch to List view"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editorial</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. BALANCED 5-CARD GRID VIEW (DEFAULT)                         */}
      {/* ============================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-4 md:gap-6">
          {CORE_SERVICES.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.id] || Sparkles;
            // 3 cards on top row (each span 2 of 6 cols), 2 cards on bottom row (each span 3 of 6 cols)
            const spanClass = index < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            // Tablet layout: 5th card spans full width
            const tabletSpanClass = index === 4 ? 'col-span-2 md:col-span-2' : 'col-span-1 md:col-span-1';

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between h-full rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 p-3 sm:p-6 md:p-7 hover:border-[#A78BFA]/50 transition-all duration-300 group card-tactile shadow-xl shadow-black/40 ${spanClass} ${tabletSpanClass}`}
              >
                {/* Subtle architectural hover accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A78BFA]/0 to-transparent group-hover:via-[#A78BFA] transition-all duration-500 rounded-t-2xl" />

                <div>
                  {/* Card Header: Service ID + Visual Category Icon */}
                  <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-[#D9D9D9]/10">
                    <span className="font-mono text-[9px] sm:text-xs font-bold text-[#A78BFA] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-[#A78BFA]/10 border border-[#A78BFA]/20">
                      {service.id} / 05
                    </span>
                    <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#181818] border border-[#D9D9D9]/15 text-[#A78BFA] group-hover:scale-110 group-hover:bg-[#A78BFA]/20 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Title & Core Description */}
                  <div className="mt-2.5 sm:mt-5 space-y-1 sm:space-y-2.5">
                    <h3 className="text-xs sm:text-xl md:text-2xl font-bold tracking-tight text-[#F8F6EE] group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-none">
                      {service.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#D9D9D9]/85 font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Capabilities / Deliverables List */}
                  <div className="pt-2.5 sm:pt-5 mt-2.5 sm:mt-5 border-t border-[#D9D9D9]/10 space-y-1 sm:space-y-2">
                    <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-[#D9D9D9]/50 uppercase block">
                      // DELIVERABLES & CAPABILITIES:
                    </span>
                    <div className="grid grid-cols-1 gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                      {service.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-xs font-mono text-[#F8F6EE]/90 bg-[#0E0E0E]/50 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-[#D9D9D9]/5 ${
                            idx >= 3 ? 'hidden sm:flex' : 'flex'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#A78BFA] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tech Tags & Interactive CTA */}
                <div className="pt-2.5 sm:pt-6 mt-2.5 sm:mt-6 border-t border-[#D9D9D9]/10 space-y-2 sm:space-y-4">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {service.techTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[8px] sm:text-[10px] font-mono px-1 sm:px-2 py-0.5 rounded-md bg-[#181818] text-[#D9D9D9]/70 border border-[#D9D9D9]/10 ${
                          idx >= 2 ? 'hidden sm:inline-block' : 'inline-block'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {service.techTags.length > 2 && (
                      <span className="text-[8px] font-mono px-1 py-0.5 rounded-md bg-[#181818] text-[#A78BFA] border border-[#A78BFA]/20 sm:hidden">
                        +{service.techTags.length - 2}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl bg-[#181818] hover:bg-[#F8F6EE] text-[#F8F6EE] hover:text-[#0E0E0E] text-[10px] sm:text-xs font-semibold tracking-tight sm:tracking-wide border border-[#D9D9D9]/15 hover:border-transparent transition-all duration-200 group/btn shadow-md active:scale-98 min-h-[38px]"
                  >
                    <span className="truncate">
                      <span className="sm:hidden">Inquire</span>
                      <span className="hidden sm:inline">Inquire About {service.shortTitle || service.title}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A78BFA] group-hover/btn:text-[#0E0E0E] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. EDITORIAL ACCORDION VIEW (ALTERNATIVE PRESENTATION)         */}
      {/* ============================================================== */}
      {viewMode === 'list' && (
        <div className="w-full divide-y divide-[#D9D9D9]/10 border-y border-[#D9D9D9]/10 rounded-2xl overflow-hidden bg-[#101010]/50 border border-[#D9D9D9]/10">
          {CORE_SERVICES.map((service) => {
            const isOpen = activeServiceId === service.id;
            const IconComponent = SERVICE_ICONS[service.id] || Sparkles;

            return (
              <div
                key={service.id}
                className={`transition-colors duration-300 ${
                  isOpen ? 'bg-[#141414]/90' : 'bg-transparent hover:bg-[#121212]'
                }`}
              >
                {/* Service Header Row */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-6 sm:py-7 px-4 sm:px-6 flex items-start sm:items-center justify-between text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#A78BFA] tracking-wider px-2 py-0.5 rounded bg-[#A78BFA]/10 border border-[#A78BFA]/20">
                        {service.id}
                      </span>
                      <div className="p-1.5 rounded-lg bg-[#181818] border border-[#D9D9D9]/15 text-[#A78BFA] sm:hidden">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:inline-flex p-1.5 rounded-lg bg-[#181818] border border-[#D9D9D9]/15 text-[#A78BFA] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8F6EE] group-hover:text-white transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#D9D9D9]/70 mt-1.5 line-clamp-1">
                        {service.scope}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4 shrink-0 mt-1 sm:mt-0">
                    <span className="hidden md:inline-block text-[11px] font-mono text-[#D9D9D9]/50 uppercase">
                      {isOpen ? 'COLLAPSE' : 'EXPLORE'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-[#D9D9D9]/20 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#A78BFA]/20 border-[#A78BFA]/50 text-[#A78BFA]' : 'text-[#D9D9D9]/60 group-hover:text-[#F8F6EE]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expandable Service Body */}
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                        <span>SERVICE VALUE & ARCHITECTURE</span>
                      </div>

                      <p className="text-sm leading-relaxed text-[#D9D9D9]/90 font-light">
                        {service.description}
                      </p>

                      <div className="pt-2">
                        <span className="text-[11px] font-mono text-[#D9D9D9]/60 block mb-2.5 uppercase tracking-wider">
                          // DELIVERABLES & CAPABILITIES:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#F8F6EE] bg-[#0E0E0E]/60 p-2 rounded-lg border border-[#D9D9D9]/10">
                              <Check className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-[#0E0E0E] border border-[#D9D9D9]/15">
                      <div>
                        <span className="text-[10px] font-mono text-[#D9D9D9]/50 block uppercase tracking-wider">
                          // RECOMMENDED TECH TOOLING
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {service.techTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#181818] text-[#D9D9D9] border border-[#D9D9D9]/15"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={() => onSelectService(service.title)}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] text-xs font-semibold tracking-wide btn-tactile hover:bg-white active:scale-95 shadow-md shadow-black/50"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#0E0E0E]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ServiceList;
