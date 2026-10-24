import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { CyberButton } from './CyberButton';
import { ScrambleText } from './ScrambleText';

interface EnterScreenProps {
  onEnter: (soundEnabled: boolean) => void;
}

export const EnterScreen: React.FC<EnterScreenProps> = ({ onEnter }) => {
  const [isDismissed, setIsDismissed] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('shafi_seo_entered') === 'true';
  });
  const [isExiting, setIsExiting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleEnter = React.useCallback(() => {
    if (isExiting || isDismissed) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.body.style.overflow = '';
      sessionStorage.setItem('shafi_seo_entered', 'true');
      setIsDismissed(true);
      onEnter(soundEnabled);
      return;
    }

    setIsExiting(true);

    // Call onEnter immediately on user gesture to initialize audio if enabled
    onEnter(soundEnabled);

    // After curtain slide completes, dismiss from DOM
    setTimeout(() => {
      document.body.style.overflow = '';
      sessionStorage.setItem('shafi_seo_entered', 'true');
      setIsDismissed(true);
    }, 700);
  }, [isExiting, isDismissed, onEnter, soundEnabled]);

  useEffect(() => {
    if (isDismissed) return;

    // Lock scrolling while enter screen is active
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDismissed, handleEnter]);

  if (isDismissed) return null;

  return (
    <div
      className={`enter-screen-overlay ${isExiting ? 'is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Shafi SEO Platform"
    >
      {/* Top and Bottom Sliding Curtain Panels */}
      <div className="enter-curtain-top"></div>
      <div className="enter-curtain-bottom"></div>

      {/* Center Cinematic Content */}
      <div className="enter-content-wrap">
        {/* Header HUD Status */}
        <div className="enter-hud-header">
          <div className="enter-hud-badge">
            <Terminal size={12} className="text-accent" />
            <span>
              <ScrambleText text="// SYS.GATEWAY // SHAFI_SEO_2026" />
            </span>
          </div>

          <div className="enter-brand">
            <span className="brand-symbol">◆</span>
            <span className="brand-name">{siteConfig.specialistName}</span>
            <span className="brand-dot">/</span>
            <span className="brand-badge">SEO</span>
          </div>
        </div>

        {/* Main Editorial Statement */}
        <div className="enter-title-block">
          <div className="enter-eyebrow">
            <Sparkles size={14} className="text-accent" />
            <span>ARCHITECTURAL SEARCH VISIBILITY</span>
          </div>

          <h1 className="enter-headline">
            Se<span className="text-span">a</span>rch. Di<span className="text-span">s</span>cov<span className="text-span">e</span>r.{' '}
            <span className="text-accent">Gr<span className="text-span">o</span>w.</span>
          </h1>

          <p className="enter-subtext">
            Technical SEO audits, search intent taxonomy, and organic growth engineering for high-growth brands.
          </p>
        </div>

        {/* Interactive CTA & Sound Option */}
        <div className="enter-actions-block">
          <div className="enter-btn-wrapper">
            <CyberButton
              label="Enter Website"
              onClick={handleEnter}
              size="lg"
              className="enter-main-btn"
            />
          </div>

          {/* Sound Preference Toggle */}
          <div className="enter-sound-control">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`enter-sound-toggle ${soundEnabled ? 'active' : ''}`}
              aria-label={soundEnabled ? 'Sound enabled. Click to mute.' : 'Sound muted. Click to enable.'}
            >
              {soundEnabled ? (
                <Volume2 size={16} className="text-accent" />
              ) : (
                <VolumeX size={16} className="text-muted" />
              )}
              <span className="sound-toggle-text">
                Sound: <strong>{soundEnabled ? 'ON' : 'OFF'}</strong>
              </span>
            </button>
            <span className="sound-note">Best experienced with sound enabled</span>
          </div>
        </div>

        {/* Bottom System Code Telemetry */}
        <div className="enter-footer-telemetry">
          <span>PRESS ENTER OR CLICK TO COMMENCE</span>
          <span className="telemetry-sep">•</span>
          <span>EST. LATENCY: &lt;12ms</span>
        </div>
      </div>
    </div>
  );
};
