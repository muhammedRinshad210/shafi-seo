import React from 'react';
import { siteConfig } from '../data/config';
import { SEOSimulator } from './SEOSimulator';
import { ArrowDown, ShieldCheck, Sparkles, Terminal, MapPin } from 'lucide-react';
import { CyberButton } from './CyberButton';
import { CornerNotch } from './CornerNotch';
import { ScrambleText } from './ScrambleText';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-headline" no-trail="">
      <CornerNotch position="top-left" />
      <CornerNotch position="top-right" />
      <CornerNotch position="bottom-left" />
      <CornerNotch position="bottom-right" />

      {/* Subtle Ambient Glow */}
      <div className="glow-orb hero-glow-top"></div>
      <div className="glow-orb hero-glow-bottom"></div>

      <div className="container hero-container">
        {/* Top Cyber HUD Bar */}
        <div className="hero-eyebrow-row">
          <div className="hero-badge">
            <Terminal size={13} className="text-accent" />
            <span>
              <ScrambleText text="// SYS.ID: SHAFI_SEO_PROTOCOL" />
            </span>
          </div>

          <div className="hero-location-pill">
            <MapPin size={13} className="text-accent" />
            <span>Based in Manjeri, Kerala</span>
          </div>

          <div className="hero-availability-pill">
            <span className="status-indicator-dot"></span>
            <span>{siteConfig.availability.badgeText}</span>
          </div>

          <div className="hero-hud-telemetry desktop-only">
            <span>INDEX_INTEGRITY: 99.4%</span>
            <span className="hud-sep">•</span>
            <span>CORE_VITALS: PASS</span>
          </div>
        </div>

        {/* Hero Editorial Grid */}
        <div className="hero-grid">
          {/* Left Column: Headlines & CTAs */}
          <div className="hero-content">
            <div className="hero-digital-tag">// ARCHITECTURAL SEARCH STRATEGY</div>

            <h1 id="hero-headline" className="hero-title">
              SEO That Helps The <span className="text-span">R</span>ight People{' '}
              <span className="text-accent hero-title-accent">Find You.</span>
            </h1>

            <p className="hero-lead">
              Technical SEO, keyword research, and on-page optimisation designed for enduring search visibility.
            </p>

            <div className="hero-bio-snippet">
              <p>
                Hi, I'm <strong className="text-white">{siteConfig.specialistName}</strong>, an independent SEO specialist based in Manjeri, Malappuram. I partner directly with founders and marketing teams to engineer organic search into a high-ROI customer acquisition channel—through technical audits, crawl budget optimization, and white-hat strategy.
              </p>
            </div>

            {/* High-Converting Actions */}
            <div className="hero-actions">
              <CyberButton
                label="Discuss Your Project"
                onClick={onOpenContact}
                size="md"
              />

              <a href="#work" className="btn btn-secondary" aria-label="View selected SEO work">
                <span>
                  <ScrambleText text="View My Work" />
                </span>
                <ArrowDown size={15} />
              </a>
            </div>

            {/* Core Trust Micro-Highlights */}
            <div className="hero-trust-row">
              <div className="trust-pill">
                <ShieldCheck size={15} className="text-accent" />
                <span>Google Search Essentials</span>
              </div>
              <div className="trust-pill">
                <Sparkles size={15} className="text-accent" />
                <span>Zero Ranking Gimmicks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Simulator */}
          <div className="hero-visual">
            <SEOSimulator />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-cue">
          <a href="#about" aria-label="Scroll to About section" className="scroll-cue-link">
            <span>[ SCROLL FOR ARCHITECTURE ]</span>
            <ArrowDown size={14} className="scroll-arrow-animate" />
          </a>
        </div>
      </div>
    </section>
  );
};
