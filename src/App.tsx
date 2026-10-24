import React, { useState } from 'react';
import { EnterScreen } from './components/EnterScreen';
import { CyberGridCanvas } from './components/CyberGridCanvas';
import { CustomCursor } from './components/CustomCursor';
import { LeadDrawer } from './components/LeadDrawer';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Trust } from './components/Trust';
import { Insights } from './components/Insights';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import './App.css';

export const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('shafi_seo_entered') === 'true';
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(
    undefined
  );

  const handleOpenLeadDrawer = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForInquiry(serviceTitle);
    }
    setIsDrawerOpen(true);
  };

  const handleScrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForInquiry(serviceTitle);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Cinematic Enter Website Experience */}
      {!isEntered && (
        <EnterScreen
          onEnter={() => setIsEntered(true)}
        />
      )}

      {/* Interactive Background Grid with Electric Lime Mouse Trail */}
      <CyberGridCanvas />

      {/* Futuristic Crosshair Custom Cursor with Expansion */}
      <CustomCursor />

      {/* Slide-in Futuristic Lead Generation Drawer */}
      <LeadDrawer
        key={selectedServiceForInquiry || 'lead-drawer'}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialService={selectedServiceForInquiry}
      />

      {/* Global Navigation with Ambient Audio & Scramble Text */}
      <Navbar onOpenContact={() => handleOpenLeadDrawer()} />

      {/* Main Content Landmark for Accessibility */}
      <main id="main-content">
        {/* Section B: Hero */}
        <Hero onOpenContact={() => handleOpenLeadDrawer()} />

        {/* Stepped Brutalist Transition */}
        <SectionDivider />

        {/* Section C: About */}
        <About onOpenContact={() => handleOpenLeadDrawer()} />

        {/* Section D: SEO Services */}
        <Services onSelectService={(title) => handleOpenLeadDrawer(title)} />

        {/* Section E: Selected Work & Case Studies with Grid/List Toggle */}
        <Projects onOpenContact={() => handleOpenLeadDrawer()} />

        {/* Section F: Working Process */}
        <Process onOpenContact={() => handleOpenLeadDrawer()} />

        {/* Section G: Trust, Standards & Comparison */}
        <Trust />

        {/* Section H: SEO Insights & Field Guides */}
        <Insights />

        {/* Section I: Buyer FAQ */}
        <FAQ onOpenContact={() => handleScrollToContact()} />

        {/* Section J: Lead Generation & In-Page Contact */}
        <Contact
          key={selectedServiceForInquiry || 'contact-form'}
          preselectedService={selectedServiceForInquiry}
        />
      </main>

      {/* Section K: Footer */}
      <Footer />
    </div>
  );
};

export default App;
