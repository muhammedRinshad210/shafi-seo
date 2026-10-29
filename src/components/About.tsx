import React from 'react';
import { useCMSData } from '../context/useCMSData';
import { MapPin, Briefcase, CheckCircle, Code2, ArrowUpRight } from 'lucide-react';
import { createDataAttribute } from '../lib/visualEditing';

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  const { siteConfig, aboutData } = useCMSData();

  const aboutAttr = createDataAttribute({
    id: 'siteSettings',
    type: 'siteSettings',
  });

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Approach &amp; Philosophy</span>
          <h2
            id="about-heading"
            className="section-title"
            data-sanity={aboutAttr.scope('aboutHeadline')}
          >
            {aboutData.headline}
          </h2>
          <p className="section-lead">
            No algorithm tricks, no vanity impression guarantees. Just clean technical architecture,
            deep search intent analysis, and compounding organic relevance.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="about-editorial-grid">
          {/* Left Column: Specialist Card & Profile Info */}
          <div className="about-profile-card">
            <div className="profile-badge-header">
              <div className="profile-avatar-placeholder">
                <span className="avatar-initials">S</span>
              </div>
              <div className="profile-identity">
                <h3
                  className="profile-name"
                  data-sanity={aboutAttr.scope('specialistName')}
                >
                  {siteConfig.specialistName}
                </h3>
                <span
                  className="profile-role"
                  data-sanity={aboutAttr.scope('brandTitle')}
                >
                  {siteConfig.brandTitle || 'Independent SEO Specialist'}
                </span>
              </div>
            </div>

            <div className="profile-meta-list">
              <div className="profile-meta-item">
                <MapPin size={16} className="text-accent" />
                <span>
                  <strong>Location:</strong> {siteConfig.location}
                </span>
              </div>
              <div className="profile-meta-item">
                <Briefcase size={16} className="text-accent" />
                <span>
                  <strong>Experience:</strong> {siteConfig.experienceYears} Search Optimization
                </span>
              </div>
              <div className="profile-meta-item">
                <Code2 size={16} className="text-accent" />
                <span>
                  <strong>Focus:</strong> Technical Architecture, Local SEO &amp; Audits
                </span>
              </div>
            </div>

            <div className="profile-action-box">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn btn-primary w-full justify-center"
              >
                <span>Request Technical Consultation</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div
            className="about-narrative-column"
            data-sanity={aboutAttr.scope('aboutIntro')}
          >
            {aboutData.introParagraphs.map((paragraph, index) => (
              <p key={index} className="about-narrative-p">
                {paragraph}
              </p>
            ))}

            {/* Core Operating Principles */}
            <div className="about-principles-card">
              <h4 className="principles-title">// CORE OPERATING PRINCIPLES</h4>
              <ul className="principles-list">
                <li className="principle-item">
                  <CheckCircle size={16} className="text-accent shrink-0" />
                  <span>
                    <strong>Direct Engagement:</strong> You communicate with Shafi—no junior account
                    managers or outsourced guesswork.
                  </span>
                </li>
                <li className="principle-item">
                  <CheckCircle size={16} className="text-accent shrink-0" />
                  <span>
                    <strong>Diagnostic Before Prescriptive:</strong> Every engagement begins with
                    deep log file, indexation, and architecture analysis.
                  </span>
                </li>
                <li className="principle-item">
                  <CheckCircle size={16} className="text-accent shrink-0" />
                  <span>
                    <strong>White-Hat, Sustainable Rankings:</strong> Zero manipulative link schemes
                    or automated spun content that risk Google penalties.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
