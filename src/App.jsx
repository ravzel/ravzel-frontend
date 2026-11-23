import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'work', 'process', 'contact'];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (['home', 'about', 'services', 'work', 'contact'].includes(id)) {
            setActiveSection(id);
          } else if (id === 'process') {
            setActiveSection('services');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle direct hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }, 150);
      }
    }
  }, []);

  // Update document title dynamically based on active section
  useEffect(() => {
    const titles = {
      home: 'RAVZEL — Digital Studio & Software Solution | Build Beyond. Evolve Forward.',
      about: 'About RAVZEL — Digital Studio & Software Solution',
      services: 'Services — Website, Web App, Systems & Digital Marketing | RAVZEL',
      work: 'Our Work — Selected 11 Verified Client Projects | RAVZEL',
      contact: 'Contact RAVZEL — Have an Idea? Let\'s Build It'
    };
    document.title = titles[activeSection] || titles.home;
  }, [activeSection]);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#0E0E0E] text-[#F8F6EE] flex flex-col relative selection:bg-[#A78BFA]/30 selection:text-white">
      {/* Global Precision Header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Cohesive Agency Experience */}
      <main className="flex-1">
        <HomePage />
      </main>

      {/* Global Architectural Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
