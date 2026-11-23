import React, { useState, useMemo } from 'react';
import { Filter, Layers, ExternalLink, Search, Sparkles } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS_DIRECTORY, STUDIO_INFO } from '../data/studioData';

export function ProjectsPage({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'All Projects', label: 'All Projects' },
    { id: 'Websites', label: 'Websites' },
    { id: 'Web Applications', label: 'Web Applications' },
    { id: 'Commercial & Crafts', label: 'Commercial & Crafts' }
  ];

  // Strictly preserve relative order 01 to 10
  const filteredProjects = useMemo(() => {
    return PROJECTS_DIRECTORY.filter((project) => {
      // Category filter matching
      let matchesCategory = true;
      if (activeTab === 'Websites') {
        matchesCategory =
          project.filterCategory === 'Websites' ||
          project.secondaryCategory === 'Websites' ||
          project.category.includes('Website') ||
          project.category.includes('Portfolio');
      } else if (activeTab === 'Web Applications') {
        matchesCategory =
          project.filterCategory === 'Web Applications' ||
          project.category === 'Web Application';
      } else if (activeTab === 'Commercial & Crafts') {
        matchesCategory =
          project.filterCategory === 'Commercial & Crafts' ||
          project.secondaryCategory === 'Commercial & Crafts' ||
          ['03', '07', '08', '09'].includes(project.id);
      }

      // Search query matching (if user types in search)
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="relative pt-24 sm:pt-28 pb-20">
      
      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9D9D9]/10 text-xs font-mono text-[#D9D9D9]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA] font-bold">// ARCHIVE DIRECTORY</span>
            <span>—</span>
            <span>SELECTED CLIENT WORKS</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9D9D9]/40">[ 11 VERIFIED DEPLOYMENTS ]</span>
        </div>

        <div className="pt-10 max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F8F6EE]">
            Selected Works
          </h1>
          <p className="text-base sm:text-lg text-[#D9D9D9]/80 font-light leading-relaxed">
            A comprehensive directory of production websites and custom software solutions engineered by RAVZEL. Every deployment preserves clean architecture, fast response times, and tailored business workflows.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              
              // Count matching items
              const count = PROJECTS_DIRECTORY.filter((p) => {
                if (tab.id === 'All Projects') return true;
                if (tab.id === 'Websites') return p.filterCategory === 'Websites' || p.secondaryCategory === 'Websites' || p.category.includes('Website') || p.category.includes('Portfolio');
                if (tab.id === 'Web Applications') return p.filterCategory === 'Web Applications' || p.category === 'Web Application';
                if (tab.id === 'Commercial & Crafts') return p.filterCategory === 'Commercial & Crafts' || ['03', '07', '08', '09'].includes(p.id);
                return true;
              }).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-mono tracking-tight rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#F8F6EE] text-[#0E0E0E] font-bold shadow-sm'
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
                    {count < 10 ? `0${count}` : count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#D9D9D9]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title / tech..."
              className="w-full bg-[#0E0E0E] border border-[#D9D9D9]/15 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-[#F8F6EE] placeholder-[#D9D9D9]/40 focus:outline-none focus:border-[#A78BFA]"
              aria-label="Filter projects by title or category"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#D9D9D9]/60 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Metadata */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#D9D9D9]/50 px-2">
          <div>
            SHOWING {filteredProjects.length} OF 11 PROJECTS // SEQUENCE STRICTLY PRESERVED
          </div>
          <div className="hidden sm:block">
            STATUS: ALL SYSTEMS LIVE & MONITORED
          </div>
        </div>
      </section>

      {/* Strict 11-Project Directory Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 space-y-4">
            <p className="text-sm font-mono text-[#D9D9D9]/60">No projects match the criteria "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveTab('All Projects');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#F8F6EE] text-[#0E0E0E] text-xs font-mono font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Global Credit Note Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16">
        <div className="p-6 rounded-xl bg-[#121212] border border-[#D9D9D9]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D9D9D9]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-[#F8F6EE] font-semibold">{STUDIO_INFO.globalCredit}</span>
            <span>—</span>
            <span>Continuous delivery & maintenance guaranteed.</span>
          </div>

          <button
            onClick={() => {
              setActivePage('contact');
              window.location.hash = 'contact';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#A78BFA] hover:underline"
          >
            Have a project in mind? Start a conversation →
          </button>
        </div>
      </section>

    </div>
  );
}

export default ProjectsPage;
