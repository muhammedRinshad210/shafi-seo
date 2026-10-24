import React, { useEffect } from 'react';
import type { InsightArticle } from '../types';
import { X, Calendar, Clock, Tag } from 'lucide-react';

interface InsightModalProps {
  article: InsightArticle | null;
  onClose: () => void;
}

export const InsightModal: React.FC<InsightModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
    >
      <div className="modal-container modal-article-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-eyebrow">
            <span className="modal-category-tag">
              <Tag size={12} className="text-accent" />
              <span>{article.category}</span>
            </span>
            <span className="modal-date">
              <Calendar size={13} className="text-accent" />
              <span>{article.date}</span>
            </span>
            <span className="modal-duration">
              <Clock size={13} className="text-accent" />
              <span>{article.readTime}</span>
            </span>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close article">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          <h2 id="modal-article-title" className="modal-article-heading">
            {article.title}
          </h2>

          <div className="modal-article-summary-box">
            <p className="modal-article-lead">{article.summary}</p>
          </div>

          <div className="modal-article-paragraphs">
            {article.content.map((p, idx) => (
              <p key={idx} className="article-paragraph">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="modal-author-credit">Authored by Shafi • Independent SEO Specialist</span>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
