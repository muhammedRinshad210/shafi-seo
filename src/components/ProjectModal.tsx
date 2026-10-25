import React, { useEffect } from 'react';
import type { Project } from '../types';
import { X, Clock, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-eyebrow">
            <span className="modal-industry-tag">{project.industry}</span>
            <span className="modal-duration">
              <Clock size={14} className="text-accent" />
              <span>{project.duration}</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close case study details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          <h2 id="modal-project-title" className="modal-title">
            {project.title}
          </h2>

          {project.image && (
            <div className="modal-cover-wrap" style={{ margin: '1rem 0 1.25rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          <p className="modal-summary">{project.summary}</p>

          {/* Results Metric Highlight Strip */}
          <div className="modal-results-strip">
            <h3 className="modal-section-heading">Verified Technical &amp; Visibility Outcomes</h3>
            <div className="modal-results-grid">
              {project.results.map((res, idx) => (
                <div key={idx} className="result-metric-card">
                  <div className="result-value text-accent">{res.value}</div>
                  <div className="result-label">{res.label}</div>
                  <div className="result-context">{res.context}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Section */}
          <div className="modal-section">
            <h3 className="modal-section-heading">The Underlying Problem &amp; Challenge</h3>
            <p className="modal-text">{project.challenge}</p>
          </div>

          {/* Strategic SEO Execution */}
          <div className="modal-section">
            <h3 className="modal-section-heading">Strategic SEO Roadmap &amp; Execution</h3>
            <ul className="modal-strategy-list">
              {project.strategy.map((item, idx) => (
                <li key={idx} className="modal-strategy-item">
                  <CheckCircle2 size={16} className="text-accent strategy-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Tooling */}
          <div className="modal-section">
            <h3 className="modal-section-heading">Tooling &amp; Technical Frameworks</h3>
            <div className="modal-tools-list">
              {project.tools.map((tool, idx) => (
                <span key={idx} className="modal-tool-badge">
                  <Wrench size={12} className="text-accent" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="modal-footer">
          <div className="modal-footer-copy">
            <span>Face a similar organic search bottleneck?</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="btn btn-primary btn-sm"
          >
            <span>Discuss a Similar Scope</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
