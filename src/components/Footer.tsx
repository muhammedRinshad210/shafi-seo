import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { ArrowUp, Mail, MessageSquare, MapPin } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { ScrambleText } from './ScrambleText';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Format current Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      setLocalTime(`${formatter.format(new Date())} IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Brutalist Stepped Divider from NeoCultural Reference */}
      <SectionDivider className="footer-top-divider" />

      <div className="container footer-container">
        {/* Giant Editorial Footer Statement */}
        <div className="footer-hero-marquee">
          <h2 className="footer-giant-title">
            D<span className="text-span">I</span>SC<span className="text-span">O</span>V<span className="text-span">E</span>R{' '}
            <span className="text-accent">V<span className="text-span">I</span>SIB<span className="text-span">I</span>LITY</span>
          </h2>
        </div>

        {/* Main Footer Row */}
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#" className="footer-brand" aria-label="Shafi SEO Home">
              <span className="brand-symbol">◆</span>
              <span className="brand-name">{siteConfig.specialistName}</span>
              <span className="brand-dot">/</span>
              <span className="brand-badge">SEO</span>
            </a>
            <p className="footer-bio">
              Independent SEO specialist helping businesses build sustainable organic search
              visibility through methodical technical architecture, search intent taxonomy, and
              ethical white-hat optimization.
            </p>
            <div className="footer-location-tag">
              <MapPin size={13} className="text-accent" />
              <span>Based in Manjeri, Malappuram, Kerala, India</span>
            </div>
            <div className="footer-availability-tag">
              <span className="status-indicator-dot"></span>
              <span>{siteConfig.availability.badgeText}</span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="footer-nav-col">
            <div className="divider-h"></div>
            <span className="footer-heading">// NAVIGATION</span>
            <ul className="footer-links">
              <li>
                <a href="#about">
                  <ScrambleText text="About" />
                </a>
              </li>
              <li>
                <a href="#services">
                  <ScrambleText text="Services" />
                </a>
              </li>
              <li>
                <a href="#work">
                  <ScrambleText text="Work" />
                </a>
              </li>
              <li>
                <a href="#process">
                  <ScrambleText text="Process" />
                </a>
              </li>
              <li>
                <a href="#trust">
                  <ScrambleText text="Why Me" />
                </a>
              </li>
              <li>
                <a href="#insights">
                  <ScrambleText text="Insights" />
                </a>
              </li>
              <li>
                <a href="#faq">
                  <ScrambleText text="FAQ" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels & Live Time */}
          <div className="footer-contact-col">
            <div className="divider-h"></div>
            <span className="footer-heading">// DIRECT CONNECT</span>
            <ul className="footer-contact-list">
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="footer-channel-link">
                  <Mail size={16} className="text-accent" />
                  <span>{siteConfig.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-channel-link"
                >
                  <MessageSquare size={16} className="text-accent" />
                  <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
                </a>
              </li>
            </ul>

            {/* Live Local Time Display from Reference */}
            <div className="footer-time-box">
              <div className="time-label">LOCAL TIME (HQ):</div>
              <div className="time-clock text-accent">
                {localTime || '22:30:00 IST'}
              </div>
            </div>

            {/* Social links */}
            <div className="footer-social-row">
              {siteConfig.linkedinUrl && (
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shafi on LinkedIn"
                  className="social-icon-btn"
                  title="LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
              {siteConfig.twitterUrl && (
                <a
                  href={siteConfig.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shafi on X (Twitter)"
                  className="social-icon-btn"
                  title="X (Twitter)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                  </svg>
                </a>
              )}
              {siteConfig.githubUrl && (
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shafi on GitHub"
                  className="social-icon-btn"
                  title="GitHub"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="footer-sub-bar">
          <div className="footer-copyright">
            <span>
              &copy; {CURRENT_YEAR} {siteConfig.specialistName}. All rights reserved. Strict Google Search Essentials compliance.
            </span>
          </div>

          <div className="footer-back-to-top">
            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Scroll back to top of page"
            >
              <span>[ BACK TO TOP ]</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
