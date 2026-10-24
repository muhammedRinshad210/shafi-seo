import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { Menu, X } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { CyberButton } from './CyberButton';
import { ScrambleText } from './ScrambleText';

interface NavbarProps {
  onOpenContact: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Reset mobile menu when viewport widens to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Short, clear navigation labels matching user specification
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Why Me', href: '#trust' },
    { label: 'Insights', href: '#insights' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Wordmark with Cyber Accent */}
        <a href="#" className="navbar-brand" aria-label="Shafi SEO Specialist Home">
          <span className="brand-symbol">◆</span>
          <span className="brand-name">{siteConfig.specialistName}</span>
          <span className="brand-dot">/</span>
          <span className="brand-badge">SEO</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  <ScrambleText text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Ambient Audio Toggle, CTA & Mobile Trigger */}
        <div className="nav-actions">
          <div className="desktop-only">
            <AudioToggle />
          </div>

          <div className="desktop-only">
            <CyberButton
              label="Let's Talk"
              onClick={() => onOpenContact()}
              size="sm"
            />
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with backdrop blur */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        <div className="mobile-menu-container" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-menu-header">
            <span className="mobile-brand">
              {siteConfig.specialistName} <span className="text-accent">/ SEO</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="bracket_close_btn_sm"
              aria-label="Close menu"
            >
              [ ✕ ]
            </button>
          </div>

          <div className="mobile-availability">
            <span className="status-indicator-dot"></span>
            <span>{siteConfig.availability.badgeText}</span>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleLinkClick} className="mobile-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-audio-wrap">
              <AudioToggle />
            </div>
            <CyberButton
              label="Let's Talk"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              size="md"
              className="btn-full"
            />
            <div className="mobile-contact-note">
              <span>Direct email: </span>
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
