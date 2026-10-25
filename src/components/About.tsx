import React from 'react';
import { useCMSData } from '../context/useCMSData';
import { MapPin, Briefcase, CheckCircle, Code2, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  const { siteConfig, aboutData } = useCMSData();

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Approach &amp; Philosophy</span>
          <h2 id="about-heading" className="section-title">
            Engineering Search Visibility with{' '}
            <span className="text-accent">Precision &amp; Transparency.</span>
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
                <h3 className="profile-name">{siteConfig.specialistName}</h3>
                <span className="profile-role">Independent SEO Specialist</span>
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
                  <strong>Experience:</strong> {siteConfig.experienceYears} Dedicated Search Strategy
                </span>
              </div>
              <div className="profile-meta-item">
                <Code2 size={16} className="text-accent" />
                <span>
                  <strong>Specialty:</strong> Technical SEO &amp; Organic Funnels
                </span>
              </div>
            </div>

            <div className="profile-statement-box">
              <p className="statement-quote">
                "Real SEO is not about chasing Google’s algorithm with manipulative hacks. It is about
                building the fastest, most coherent, and most authoritative answer to what your ideal
                customer is searching for."
              </p>
              <span className="statement-author">— {siteConfig.specialistName}</span>
            </div>

            <div className="profile-cta-wrap">
              <button onClick={onOpenContact} className="btn btn-secondary btn-full">
                <span>Request an Audit Consultation</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Core Values */}
          <div className="about-narrative">
            <div className="narrative-body">
              {aboutData.introParagraphs.map((para, idx) => (
                <p key={idx} className="narrative-p">
                  {para}
                </p>
              ))}
            </div>

            {/* Working Principles */}
            <div className="values-grid">
              {aboutData.workingPhilosophy.map((item, idx) => (
                <div key={idx} className="value-item">
                  <div className="value-number">0{idx + 1}</div>
                  <h4 className="value-title">{item.title}</h4>
                  <p className="value-desc">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Verified Specializations */}
            <div className="specializations-block">
              <h4 className="specializations-title">Core Search Disciplines</h4>
              <div className="specializations-tags">
                {aboutData.verifiedSpecializations.map((spec, idx) => (
                  <span key={idx} className="spec-tag">
                    <CheckCircle size={14} className="text-accent" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Core Tooling Stack */}
            <div className="toolkit-block">
              <span className="toolkit-label">Specialist Diagnostic Stack:</span>
              <div className="toolkit-list">
                {aboutData.coreToolkit.map((tool, idx) => (
                  <span key={idx} className="tool-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
