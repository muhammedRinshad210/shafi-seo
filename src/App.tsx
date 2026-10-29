import React, { useState } from 'react';
import { CMSProvider } from './context/CMSContext';
import { useCMSData } from './context/useCMSData';
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
import { VisualSectionWrapper } from './components/VisualSectionWrapper';
import { VisualEditorBadge } from './components/VisualEditorBadge';
import {
  HeadingTextBlockComponent,
  RichTextBlockComponent,
  ImageBlockComponent,
  ImageWithTextBlockComponent,
  CtaBlockComponent,
} from './components/blocks';
import type {
  PageSectionBlock,
  HeroBlock,
  HeadingTextBlock,
  RichTextBlock,
  ImageBlock,
  ImageWithTextBlock,
  CtaBlock,
} from './types';
import { ambientAudio } from './utils/ambientAudio';
import './App.css';

const PortfolioContent: React.FC = () => {
  const [isEntered, setIsEntered] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('shafi_seo_entered') === 'true';
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(
    undefined
  );

  const { sections, isVisualEditing, moveSection, addSection, removeSection } = useCMSData();

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

  const renderSectionBlock = (section: PageSectionBlock, index: number) => {
    const blockContent = (() => {
      switch (section._type) {
        case 'heroBlock': {
          const hero = section as HeroBlock;
          return (
            <React.Fragment>
              <Hero
                onOpenContact={() => handleOpenLeadDrawer()}
                overrideHeadline={hero.headline}
                overrideSubheadline={hero.subheadline}
                overrideCtaPrimary={hero.ctaPrimaryLabel}
                overrideCtaSecondary={hero.ctaSecondaryLabel}
              />
              <SectionDivider />
              <About onOpenContact={() => handleOpenLeadDrawer()} />
            </React.Fragment>
          );
        }

        case 'headingTextBlock':
          return <HeadingTextBlockComponent block={section as HeadingTextBlock} />;

        case 'richTextBlock':
          return <RichTextBlockComponent block={section as RichTextBlock} />;

        case 'imageBlock':
          return <ImageBlockComponent block={section as ImageBlock} />;

        case 'imageWithTextBlock':
          return (
            <ImageWithTextBlockComponent
              block={section as ImageWithTextBlock}
              onOpenContact={() => handleOpenLeadDrawer()}
            />
          );

        case 'ctaBlock':
          return (
            <CtaBlockComponent
              block={section as CtaBlock}
              onOpenContact={() => handleOpenLeadDrawer()}
            />
          );

        case 'servicesBlock':
          return <Services onSelectService={(title) => handleOpenLeadDrawer(title)} />;

        case 'projectsBlock':
          return <Projects onOpenContact={() => handleOpenLeadDrawer()} />;

        case 'processBlock':
          return <Process onOpenContact={() => handleOpenLeadDrawer()} />;

        case 'trustBlock':
          return <Trust />;

        case 'insightsBlock':
          return <Insights />;

        case 'faqBlock':
          return <FAQ onOpenContact={() => handleScrollToContact()} />;

        case 'contactBlock':
          return (
            <Contact
              key={selectedServiceForInquiry || 'contact-form'}
              preselectedService={selectedServiceForInquiry}
            />
          );

        default:
          return null;
      }
    })();

    return (
      <VisualSectionWrapper
        key={section._key || `section-${section._type}-${index}`}
        section={section}
        index={index}
        totalSections={sections.length}
        isVisualEditing={isVisualEditing}
        onMoveUp={(idx) => moveSection(idx, idx - 1)}
        onMoveDown={(idx) => moveSection(idx, idx + 1)}
        onRemove={removeSection}
        onInsertAfter={(newBlock, atIdx) => addSection(newBlock, atIdx)}
      >
        {blockContent}
      </VisualSectionWrapper>
    );
  };

  return (
    <div className="portfolio-app-root">
      {/* Cinematic Enter Website Experience */}
      {!isEntered && (
        <EnterScreen
          onEnter={(soundEnabled) => {
            setIsEntered(true);
            if (soundEnabled) {
              ambientAudio.start();
            }
          }}
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

      {/* Main Content Landmark for Accessibility — Modular Page Builder Array */}
      <main id="main-content">
        {sections.map((section, index) => renderSectionBlock(section, index))}
      </main>

      {/* Section K: Footer */}
      <Footer />

      {/* Visual Editor Helper Badge (Preview & Presentation Mode Only) */}
      {isVisualEditing && <VisualEditorBadge sectionsCount={sections.length} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CMSProvider>
      <PortfolioContent />
    </CMSProvider>
  );
};

export default App;
