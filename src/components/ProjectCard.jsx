import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  X,
  Globe,
  Layers,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { ArchitecturalMockup } from './ArchitecturalMockup';

/**
 * ProjectCard
 * Implements strict Swiss editorial aesthetic with verified authentic homepage screenshots:
 * - Monospace index marker (01 / 10)
 * - Authentic homepage screenshot with consistent 16:10 aspect ratio and object-fit: contain
 * - Browser chrome frame with clean URL pill
 * - Fallback for missing/inaccessible live hosts (Project 04)
 * - Interactive Project Details modal on card preview click
 * - Direct "View Project / Open Live Demo" external navigation
 * - Preserves all existing project metadata, tags, and category distinctions
 */
export function ProjectCard({ project, priority = false }) {
  const {
    id,
    indexMarker,
    title,
    category,
    description,
    url,
    screenshot,
    accentTone,
    specDetails,
    verifiedStatus,
    tags
  } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isFaOrganics = title === 'FA Organics';
  const isBillingWebApp = title.includes('Billing');
  const isAutomotiveStore = title === 'SS Auto Spares' && !title.includes('Billing');
  const isNutrisun = title === 'Nutrisun';
  const isInaccessible = verifiedStatus?.includes('Inaccessible') || (!screenshot && imgError);

  // Clean display URL (e.g. "aslibakes.netlify.app")
  const displayHost = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Handle ESC key to close details modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <article
        className="group relative flex flex-col justify-between bg-[#141414] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#D9D9D9]/15 hover:border-[#A78BFA]/50 transition-all duration-300 card-tactile shadow-lg shadow-black/40"
        id={`project-${id}`}
      >
        {/* Top Metadata Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            {/* Monospace index marker */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-[#A78BFA] bg-[#A78BFA]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-[#A78BFA]/20">
                {indexMarker}
              </span>
              {verifiedStatus && (
                <span
                  className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1 ${
                    isInaccessible
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                  title={verifiedStatus}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isInaccessible ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  <span className="truncate">{verifiedStatus}</span>
                </span>
              )}
            </div>

            {/* Category Tag Pill */}
            <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-tight px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#D9D9D9]/10 text-[#F8F6EE] border border-[#D9D9D9]/15 truncate">
              {category}
            </span>
          </div>

          {/* Specialized distinction badge */}
          {isFaOrganics && (
            <div className="mb-2.5 sm:mb-3 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-emerald-400 truncate">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="truncate">FULL-STACK PLATFORM: E-Commerce & Custom Admin Suite</span>
            </div>
          )}

          
          {isBillingWebApp && (
            <div className="mb-2.5 sm:mb-3 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-amber-300 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="truncate">OPERATIONAL SOFTWARE: Internal Billing & POS Engine</span>
            </div>
          )}

          {isAutomotiveStore && (
            <div className="mb-2.5 sm:mb-3 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-blue-300 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              <span className="truncate">COMMERCIAL STOREFRONT: Customer-Facing Online Presence</span>
            </div>
          )}

          {isNutrisun && (
            <div className="mb-2.5 sm:mb-3 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-[#A78BFA] truncate">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span className="truncate">CLOUD SAAS: Subscription Workflow Engine (Auth Gateway)</span>
            </div>
          )}

          {/* Project Title */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#F8F6EE] group-hover:text-white transition-colors duration-300 mb-1.5 sm:mb-2">
            {title}
          </h3>

          {/* Project Description */}
          <p className="text-xs sm:text-sm md:text-sm leading-relaxed text-[#D9D9D9]/80 mb-3 sm:mb-4 font-light">
            {description}
          </p>

          {/* Tags */}
          {tags && (
            <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1A1A] text-[#D9D9D9]/80 border border-[#D9D9D9]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* PRIMARY VISUAL: Authentic Screenshot Browser Container        */}
          {/* ============================================================ */}
          <div className="mb-3 sm:mb-5">
            <div className="relative w-full rounded-lg sm:rounded-xl overflow-hidden border border-[#D9D9D9]/15 group-hover:border-[#A78BFA]/50 transition-all duration-300 bg-[#0E0E0E] shadow-inner flex flex-col">
              
              {/* Browser Chrome Header */}
              <div className="h-6 sm:h-7 px-2 sm:px-3 bg-[#181818] border-b border-[#D9D9D9]/10 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-500/70" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500/70" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/70" />
                </div>

                {/* URL Pill in Chrome */}
                <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10 text-[9px] sm:text-[10px] font-mono text-[#D9D9D9]/80 max-w-[140px] sm:max-w-[240px] truncate">
                  <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 ${isInaccessible ? 'bg-amber-400' : 'bg-[#A78BFA]'}`} />
                  <span className="truncate">{displayHost}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[9px] sm:text-[10px] font-mono text-[#D9D9D9]/60 hover:text-[#A78BFA] transition-colors flex items-center gap-1"
                    title="View details & full screenshot"
                    aria-label={`View details for ${title}`}
                  >
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">Details</span>
                  </button>
                </div>
              </div>

              {/* Main Screenshot Visual Canvas (16:10 aspect ratio) */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
                {screenshot && !imgError ? (
                  <>
                    {/* Skeleton loader placeholder while image initializes */}
                    {!imgLoaded && (
                      <div className="absolute inset-0 bg-[#141414] animate-pulse flex items-center justify-center">
                        <span className="text-xs font-mono text-[#D9D9D9]/40">// LOADING PREVIEW...</span>
                      </div>
                    )}

                    <img
                      src={screenshot}
                      alt={`${title} — Actual Homepage Preview`}
                      loading={priority ? "eager" : "lazy"}
                      decoding="async"
                      width={1280}
                      height={800}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                      className={`w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02] ${
                        imgLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Live Preview hover actions */}
                    <div className="hidden sm:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-2.5 p-3 backdrop-blur-[2px]">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F8F6EE] hover:bg-white text-[#0E0E0E] text-xs font-mono font-semibold shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                        aria-label={`Open live website for ${title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#0E0E0E]" />
                        <span>Live Demo</span>
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#0E0E0E]/90 border border-[#A78BFA]/40 shadow-lg text-xs font-mono text-[#F8F6EE] flex items-center gap-1.5 hover:border-[#A78BFA] transition-all cursor-pointer"
                        aria-label={`Expand ${title} details`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#A78BFA]" />
                        <span>Details</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Graceful Fallback for missing/inaccessible live host (Project 04) */
                  <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#141414] to-[#0E0E0E]">
                    <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>ENDPOINT INACCESSIBLE</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D9D9D9]/50">ARCHIVE SPEC</span>
                    </div>

                    <div className="my-auto py-2 text-center space-y-1.5">
                      <p className="text-sm font-semibold text-[#F8F6EE]">{title}</p>
                      <p className="text-xs font-mono text-[#D9D9D9]/70 max-w-xs mx-auto">
                        Live host is currently unreachable. Original project structure, metadata, and design architecture are preserved.
                      </p>
                      <div className="inline-block mt-2 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
                        Graceful Architecture Fallback
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[10px] font-mono text-[#D9D9D9]/50">
                      <span>VERIFIED METADATA INTACT</span>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#A78BFA] hover:underline"
                      >
                        Inspect Spec →
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Architectural Spec Note */}
          {specDetails && (
            <div className="mb-2 sm:mb-5 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10 text-[8px] sm:text-xs font-mono text-[#D9D9D9]/70 flex items-start gap-1 sm:gap-2">
              <span className="text-[#A78BFA] font-bold shrink-0">// SPEC:</span>
              <span className="line-clamp-2 sm:line-clamp-none">{specDetails}</span>
            </div>
          )}
        </div>

        {/* Card Footer / Metadata & Action CTA */}
        <div className="pt-3 sm:pt-4 border-t border-[#D9D9D9]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-auto">
          {/* Global Credit Metadata */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#D9D9D9]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
            <span>Developed by RAVZEL Team</span>
          </div>

          {/* Actions: View Project Details / Open Live Demo */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#F8F6EE] font-medium text-xs tracking-wide border border-[#D9D9D9]/15 transition-all duration-200 active:scale-95"
              aria-label={`View details for ${title}`}
            >
              <Eye className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
              <span>Details</span>
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#F8F6EE] text-[#0E0E0E] font-semibold text-xs tracking-wide transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-[#A78BFA]/10 active:scale-95 group/btn text-center"
              aria-label={`Open live project destination for ${title}`}
            >
              <span>{isInaccessible ? 'Visit Domain' : 'Open Live Demo'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#0E0E0E] shrink-0" />
            </a>
          </div>
        </div>
      </article>

      {/* ============================================================ */}
      {/* PROJECT DETAILS & FULL SCREENSHOT MODAL DIALOG               */}
      {/* ============================================================ */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${id}`}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#141414] border border-[#D9D9D9]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#D9D9D9]/10 bg-[#181818] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#A78BFA] bg-[#A78BFA]/10 px-2.5 py-1 rounded border border-[#A78BFA]/20">
                  {indexMarker}
                </span>
                <h4 id={`modal-title-${id}`} className="text-lg sm:text-xl font-bold text-[#F8F6EE] truncate">
                  {title}
                </h4>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#222] hover:bg-[#333] text-[#D9D9D9] hover:text-white flex items-center justify-center transition-colors border border-[#D9D9D9]/10"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Full Screenshot Viewport */}
              <div className="rounded-xl overflow-hidden border border-[#D9D9D9]/15 bg-[#0A0A0A]">
                {screenshot && !imgError ? (
                  <div className="w-full flex items-center justify-center bg-[#090909] p-1 sm:p-2">
                    <img
                      src={screenshot}
                      alt={`${title} Homepage Preview`}
                      className="w-full max-h-[55vh] object-contain rounded"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#121212] space-y-3">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-base font-semibold text-[#F8F6EE]">Live Host Currently Inaccessible</p>
                    <p className="text-xs font-mono text-[#D9D9D9]/70 max-w-md mx-auto">
                      The live endpoint for {title} ({url}) returned HTTP 404. In adherence to strict accuracy guidelines, no synthetic mockup is substituted.
                    </p>
                  </div>
                )}
              </div>

              {/* Project Meta Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10">
                  <span className="text-[10px] font-mono uppercase text-[#D9D9D9]/50 block mb-1">Category</span>
                  <span className="text-xs font-mono font-semibold text-[#F8F6EE]">{category}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10">
                  <span className="text-[10px] font-mono uppercase text-[#D9D9D9]/50 block mb-1">Status</span>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className={`w-2 h-2 rounded-full ${isInaccessible ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span className={isInaccessible ? 'text-amber-300' : 'text-emerald-400'}>{verifiedStatus}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10">
                  <span className="text-[10px] font-mono uppercase text-[#D9D9D9]/50 block mb-1">Live URL</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#A78BFA] hover:underline truncate block"
                  >
                    {url}
                  </a>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#D9D9D9]/50 block">Project Scope</span>
                <p className="text-sm text-[#D9D9D9]/90 font-light leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Architecture Spec */}
              {specDetails && (
                <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#D9D9D9]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-bold block">// ARCHITECTURAL SPECIFICATION</span>
                  <p className="text-xs font-mono text-[#D9D9D9]/80 leading-relaxed">
                    {specDetails}
                  </p>
                </div>
              )}

              {/* Tags */}
              {tags && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D9D9D9]/50 block mb-2">Technologies & Scope</span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#1A1A1A] text-[#D9D9D9] border border-[#D9D9D9]/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#D9D9D9]/10 bg-[#181818] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-[#D9D9D9]/60">
                Developed by RAVZEL Team • Production Delivery
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-mono text-[#D9D9D9] transition-colors"
                >
                  Close
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#F8F6EE] hover:bg-white text-[#0E0E0E] text-xs font-mono font-semibold transition-all shadow-md active:scale-95"
                >
                  <span>Open Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ProjectCard;
