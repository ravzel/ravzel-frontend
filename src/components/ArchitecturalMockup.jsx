import React from 'react';
import { ExternalLink, Terminal, Shield, CheckCircle2, Box, Layers, Calendar, ShoppingBag, Sparkles, MapPin, BarChart3, Database } from 'lucide-react';

/**
 * ArchitecturalMockup
 * Custom, high-precision Swiss editorial mockups for each of RAVZEL's 10 projects.
 * Clean browser chrome, hairline borders, and distinctive UI wireframe visuals.
 */
export function ArchitecturalMockup({ project }) {
  const { id, title, category, url, previewTheme } = project;

  return (
    <div className="relative w-full aspect-[16/10] bg-[#121212] rounded-lg overflow-hidden border border-[#D9D9D9]/15 group-hover:border-[#A78BFA]/50 transition-all duration-300 flex flex-col">
      {/* Browser Chrome Header */}
      <div className="h-7 px-3 bg-[#181818] border-b border-[#D9D9D9]/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#D9D9D9]/20 group-hover:bg-[#D9D9D9]/40 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-[#D9D9D9]/20 group-hover:bg-[#D9D9D9]/40 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-[#D9D9D9]/20 group-hover:bg-[#D9D9D9]/40 transition-colors" />
        </div>

        {/* URL Pill in Chrome */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10 text-[10px] font-mono text-[#D9D9D9]/70 max-w-[200px] sm:max-w-[260px] truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
          <span className="truncate">{url.replace('https://', '')}</span>
        </div>

        <div className="text-[10px] font-mono text-[#D9D9D9]/40">
          ID::{id}
        </div>
      </div>

      {/* Mockup Canvas Screen */}
      <div className="relative flex-1 p-3 sm:p-4 overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#141414] to-[#0E0E0E]">
        
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

        {/* FA Organics — E-Commerce & Custom Admin Suite */}
        {(previewTheme === 'skincare' || previewTheme === 'fa-organics') && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">FA ORGANICS</span>
              <span className="text-[9px] font-mono text-emerald-400">BOTANICAL SKINCARE</span>
            </div>
            <div className="my-auto text-center py-2">
              <p className="text-xs font-semibold text-[#F8F6EE]">Pure Botanical Skincare & Custom Admin Suite</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[8px] font-mono bg-[#181818] border border-[#D9D9D9]/15 px-2 py-0.5 rounded text-[#D9D9D9]">Milestone Rewards</span>
                <span className="text-[8px] font-mono bg-[#181818] border border-[#D9D9D9]/15 px-2 py-0.5 rounded text-[#D9D9D9]">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>FULL-STACK E-COMMERCE</span>
              <span className="text-emerald-400">VISIT STORE →</span>
            </div>
          </div>
        )}

        {/* 01: Nasheeha Sathik Portfolio */}
        {previewTheme === 'editorial' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between border-b border-[#D9D9D9]/10 pb-2">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#A78BFA] uppercase">CURATED FOLIO</span>
                <p className="text-xs font-semibold text-[#F8F6EE]">NASHEEHA SATHIK</p>
              </div>
              <span className="text-[9px] font-mono border border-[#D9D9D9]/20 px-1.5 py-0.5 rounded text-[#D9D9D9]">v2.5 ARCHIVE</span>
            </div>
            <div className="my-auto py-2">
              <div className="text-lg sm:text-xl font-bold tracking-tight text-[#F8F6EE] leading-tight">
                Crafting meaningful digital experiences.
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] font-mono bg-[#A78BFA]/10 text-[#A78BFA] px-2 py-0.5 rounded border border-[#A78BFA]/20">Creative Direction</span>
                <span className="text-[9px] font-mono bg-[#D9D9D9]/10 text-[#D9D9D9] px-2 py-0.5 rounded">Frontend Arch</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <div>// SELECTED WORKS</div>
              <div className="text-center">08 ARTIFACTS</div>
              <div className="text-right text-[#A78BFA]">EXPLORE →</div>
            </div>
          </div>
        )}

        {/* 02: Nutrisun Cloud Web App */}
        {previewTheme === 'cloud-app' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-[#F8F6EE]">NUTRISUN CLOUD OS</span>
              </div>
              <span className="text-[9px] font-mono bg-[#A78BFA]/15 text-[#A78BFA] px-1.5 py-0.5 rounded border border-[#A78BFA]/30 flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" /> SECURE GATEWAY
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="p-2 rounded bg-[#181818] border border-[#D9D9D9]/10">
                <span className="text-[8px] font-mono text-[#D9D9D9]/50 block">OPERATIONAL NODES</span>
                <span className="text-sm font-mono font-bold text-[#F8F6EE]">48 / 48 ACTIVE</span>
                <div className="w-full bg-[#262626] h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-[#A78BFA] h-full w-[94%]" />
                </div>
              </div>
              <div className="p-2 rounded bg-[#181818] border border-[#D9D9D9]/10">
                <span className="text-[8px] font-mono text-[#D9D9D9]/50 block">WORKFLOW PIPELINE</span>
                <span className="text-sm font-mono font-bold text-emerald-400">99.98% UPTIME</span>
                <div className="flex items-center gap-1 mt-1.5 text-[8px] font-mono text-[#D9D9D9]/60">
                  <span className="text-[#A78BFA]">●</span> REAL-TIME SYNC
                </div>
              </div>
            </div>
            <div className="bg-[#181818]/60 p-1.5 rounded border border-[#D9D9D9]/10 flex items-center justify-between text-[9px] font-mono text-[#D9D9D9]/70">
              <span>AUTH::ENTERPRISE SSO</span>
              <span className="text-[#A78BFA]">SESSION ENCRYPTED</span>
            </div>
          </div>
        )}

        {/* 03: Browtiful Strokes */}
        {previewTheme === 'beauty' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-serif tracking-widest text-[#F8F6EE] uppercase">BROWTIFUL STROKES</span>
              <span className="text-[9px] font-mono text-[#A78BFA] border border-[#A78BFA]/20 px-1.5 py-0.5 rounded">BRIDAL & HENNA</span>
            </div>
            <div className="my-auto text-center py-2">
              <p className="text-xs sm:text-sm font-medium text-[#F8F6EE]">Artisanal Bridal Mehndi & Henna Luxury</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[9px] font-mono border border-[#D9D9D9]/20 px-2 py-0.5 rounded text-[#D9D9D9]/80">Bridal Packages</span>
                <span className="text-[9px] font-mono border border-[#D9D9D9]/20 px-2 py-0.5 rounded text-[#D9D9D9]/80">Guest Sessions</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>SLOTS::RESERVATIONS</span>
              <span className="text-[#A78BFA]">INSTANT BOOKING →</span>
            </div>
          </div>
        )}

        {/* 04: SMJ Tour & Travels */}
        {previewTheme === 'travel' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">SMJ TOURS & TRAVELS</span>
              <span className="text-[9px] font-mono text-emerald-400">FLIGHTS + HOTELS</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 my-auto py-2">
              <div className="p-1.5 rounded bg-[#181818] border border-[#D9D9D9]/10 text-center">
                <span className="text-[8px] font-mono text-[#D9D9D9]/60 block">KASHMIR</span>
                <span className="text-[9px] font-bold text-[#F8F6EE]">5D / 4N</span>
              </div>
              <div className="p-1.5 rounded bg-[#181818] border border-[#D9D9D9]/10 text-center">
                <span className="text-[8px] font-mono text-[#D9D9D9]/60 block">DUBAI</span>
                <span className="text-[9px] font-bold text-[#F8F6EE]">LUXURY</span>
              </div>
              <div className="p-1.5 rounded bg-[#181818] border border-[#D9D9D9]/10 text-center">
                <span className="text-[8px] font-mono text-[#D9D9D9]/60 block">KERALA</span>
                <span className="text-[9px] font-bold text-[#F8F6EE]">PACKAGES</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>DIRECT ITINERARY BUILDER</span>
              <span className="text-[#A78BFA]">INQUIRE NOW</span>
            </div>
          </div>
        )}

        {/* 05: Shas Evergreen Henna */}
        {previewTheme === 'henna' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-semibold text-[#F8F6EE]">SHAS EVERGREEN</span>
              <span className="text-[9px] font-mono text-[#A78BFA]">HANDMADE ARTISTRY</span>
            </div>
            <div className="my-auto text-center py-2">
              <div className="text-xs font-semibold text-[#F8F6EE]">Traditional & Modern Henna Studio</div>
              <p className="text-[9px] font-mono text-[#D9D9D9]/60 mt-1">Bridal, Arabic, Indian & Organic Cones</p>
              <div className="inline-block mt-2 px-2 py-0.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded text-[9px] font-mono text-[#A78BFA]">
                Portfolio Gallery Open
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>SERVICE ENQUIRIES</span>
              <span className="text-[#D9D9D9]">CONNECT →</span>
            </div>
          </div>
        )}

        {/* 06: SS Auto Spares — Billing & Inventory (Web Application) */}
        {previewTheme === 'billing-system' && (
          <div className="relative z-10 flex flex-col justify-between h-full bg-[#161616]/80 p-1 rounded">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/15 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-[#A78BFA]" />
                <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">SS AUTO INVENTORY ENGINE</span>
              </div>
              <span className="text-[8px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1 rounded">
                ENTERPRISE POS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 my-1.5 text-[8px] font-mono">
              <div className="p-1 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10">
                <span className="text-[#D9D9D9]/50 block">SKU STOCKS</span>
                <span className="text-[#F8F6EE] font-bold">12,480 PCS</span>
              </div>
              <div className="p-1 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10">
                <span className="text-[#D9D9D9]/50 block">BARCODE</span>
                <span className="text-emerald-400 font-bold">AUTO-SYNC</span>
              </div>
              <div className="p-1 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10">
                <span className="text-[#D9D9D9]/50 block">GST INVOICE</span>
                <span className="text-[#A78BFA] font-bold">INSTANT</span>
              </div>
            </div>
            <div className="p-1 rounded bg-[#0E0E0E] border border-[#D9D9D9]/10 flex items-center justify-between text-[8px] font-mono text-[#D9D9D9]/70">
              <span>// RECENT LOG: BRAKE DISC #BD-8902</span>
              <span className="text-emerald-400">DISPATCHED</span>
            </div>
          </div>
        )}

        {/* 07: Asli Bakes */}
        {previewTheme === 'bakery' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">ASLI BAKES</span>
              <span className="text-[9px] font-mono text-amber-300">ARTISANAL PATISSERIE</span>
            </div>
            <div className="my-auto text-center py-2">
              <p className="text-xs font-semibold text-[#F8F6EE]">Handcrafted Celebration Cakes & Bakes</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[9px] font-mono bg-[#181818] px-2 py-0.5 rounded border border-[#D9D9D9]/10">Custom Cakes</span>
                <span className="text-[9px] font-mono bg-[#181818] px-2 py-0.5 rounded border border-[#D9D9D9]/10">Pastry Orders</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>FRESH BATCH ORDERS</span>
              <span className="text-[#A78BFA]">ORDER VIA WHATSAPP →</span>
            </div>
          </div>
        )}

        {/* 08: Alhiba Creation */}
        {previewTheme === 'boutique' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">ALHIBA CREATION</span>
              <span className="text-[9px] font-mono text-[#A78BFA]">BESPOKE STORE</span>
            </div>
            <div className="my-auto text-center py-2">
              <p className="text-xs font-semibold text-[#F8F6EE]">Custom Design & Commercial Fashion</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[9px] font-mono border border-[#D9D9D9]/20 px-2 py-0.5 rounded">Designer Wear</span>
                <span className="text-[9px] font-mono border border-[#D9D9D9]/20 px-2 py-0.5 rounded">Tailored Works</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>CATALOGUE CATALOGUE</span>
              <span className="text-[#A78BFA]">VIEW DESIGNS →</span>
            </div>
          </div>
        )}

        {/* 04: Bloom Feel Crafts */}
        {previewTheme === 'crafts' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">BLOOM FEEL CRAFTS</span>
              <span className="text-[9px] font-mono text-pink-300">EVERLASTING FLORALS</span>
            </div>
            <div className="my-auto text-center py-2">
              <p className="text-xs font-semibold text-[#F8F6EE]">Handcrafted Pipe Cleaner Bouquets</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[9px] font-mono bg-[#181818] border border-[#D9D9D9]/15 px-2 py-0.5 rounded">Floral Bouquets</span>
                <span className="text-[9px] font-mono bg-[#181818] border border-[#D9D9D9]/15 px-2 py-0.5 rounded">Custom Orders</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>ARTISAN FLORALS</span>
              <span className="text-[#A78BFA]">ORDER VIA DM →</span>
            </div>
          </div>
        )}

        {/* 10: SS Auto Spares — Business Website (Commercial Automotive Website) */}
        {previewTheme === 'automotive-store' && (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-[#D9D9D9]/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#F8F6EE]">SS AUTO SPARES — STORE</span>
              <span className="text-[9px] font-mono text-[#A78BFA]">COMMERCIAL SHOWCASE</span>
            </div>
            <div className="my-auto py-2">
              <div className="text-xs sm:text-sm font-bold text-[#F8F6EE]">Premier Automotive Spare Parts Hub</div>
              <p className="text-[9px] font-mono text-[#D9D9D9]/60 mt-1">OEM Components, Suspension, Engine & Body Parts</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[8px] font-mono bg-[#181818] border border-[#D9D9D9]/10 px-2 py-0.5 rounded text-[#D9D9D9]">Store Locator</span>
                <span className="text-[8px] font-mono bg-[#181818] border border-[#D9D9D9]/10 px-2 py-0.5 rounded text-[#D9D9D9]">Parts Catalogue</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]/10 text-[9px] font-mono text-[#D9D9D9]/60">
              <span>OUTLET & INVENTORY LOCATOR</span>
              <span className="text-[#A78BFA]">BROWSE STORE →</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ArchitecturalMockup;
