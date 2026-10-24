import React from 'react';
import { ShieldCheck, UserCheck, Check, X } from 'lucide-react';

export const Trust: React.FC = () => {
  const comparisonData = [
    {
      factor: 'Strategic Ownership',
      specialist: 'Direct collaboration with the specialist doing the audits and engineering.',
      agency: 'Account handed off to junior coordinators or rotating interns.'
    },
    {
      factor: 'Strategy Customization',
      specialist: 'Bespoke roadmap based on your exact tech stack, crawl budget, and margins.',
      agency: 'Generic cookie-cutter templates applied to dozens of different clients.'
    },
    {
      factor: 'Reporting & Transparency',
      specialist: 'Clear, human analysis of organic inquiries, indexation health, and Search Console data.',
      agency: 'Automated 40-page PDFs filled with vanity impressions and irrelevant rankings.'
    },
    {
      factor: 'Execution Agility',
      specialist: 'Immediate code-level recommendations and direct communication in Slack/email.',
      agency: 'Multi-layer bureaucracy, delayed ticket approvals, and long wait times.'
    }
  ];

  const standards = [
    {
      title: 'Google Search Essentials Compliance',
      desc: 'Strict adherence to Google Webmaster Guidelines. No link farms, private blog networks (PBNs), or algorithmic manipulation.'
    },
    {
      title: 'E-E-A-T Architecture',
      desc: 'Aligning site structure and content with Experience, Expertise, Authoritativeness, and Trustworthiness signals.'
    },
    {
      title: 'Core Web Vitals Engineering',
      desc: 'Prioritizing page speed, visual stability, and responsive interaction for both Googlebot and human users.'
    },
    {
      title: 'Transparent Attribution',
      desc: 'Tracking real commercial inquiries and Search Console impressions rather than deceptive rank tracker bots.'
    }
  ];

  return (
    <section className="section trust-section" id="trust" aria-labelledby="trust-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Trust &amp; Standards</span>
          <h2 id="trust-heading" className="section-title">
            Why High-Growth Brands Hire an{' '}
            <span className="text-accent">Independent Specialist.</span>
          </h2>
          <p className="section-lead">
            No bloated account management layers. When you partner with me, you work directly with the
            mind shaping your organic search strategy.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-table-wrap">
          <div className="comparison-table">
            <div className="comparison-row comparison-header-row">
              <div className="comparison-col comparison-col-factor">Operational Aspect</div>
              <div className="comparison-col comparison-col-specialist">
                <div className="col-title-wrap">
                  <UserCheck size={18} className="text-accent" />
                  <span>Shafi (Independent Specialist)</span>
                </div>
              </div>
              <div className="comparison-col comparison-col-agency">
                <div className="col-title-wrap">
                  <span>Traditional Agency Model</span>
                </div>
              </div>
            </div>

            {comparisonData.map((row, idx) => (
              <div key={idx} className="comparison-row">
                <div className="comparison-col comparison-col-factor">
                  <span className="factor-name">{row.factor}</span>
                </div>
                <div className="comparison-col comparison-col-specialist">
                  <div className="comparison-cell-inner">
                    <Check size={16} className="text-accent comparison-icon-check" />
                    <span>{row.specialist}</span>
                  </div>
                </div>
                <div className="comparison-col comparison-col-agency">
                  <div className="comparison-cell-inner">
                    <X size={16} className="text-danger comparison-icon-x" />
                    <span>{row.agency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Standards & Guarantees */}
        <div className="standards-container">
          <div className="standards-header">
            <div className="standards-eyebrow">
              <ShieldCheck size={18} className="text-accent" />
              <span>The White-Hat SEO Covenant</span>
            </div>
            <h3 className="standards-title">How I Protect Your Domain Integrity</h3>
          </div>

          <div className="standards-grid">
            {standards.map((std, idx) => (
              <div key={idx} className="standard-card">
                <div className="standard-num">0{idx + 1}</div>
                <h4 className="standard-title">{std.title}</h4>
                <p className="standard-desc">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
