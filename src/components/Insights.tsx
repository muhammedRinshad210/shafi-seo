import React, { useState } from 'react';
import { useCMSData } from '../context/useCMSData';
import type { InsightArticle } from '../types';
import { InsightModal } from './InsightModal';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

export const Insights: React.FC = () => {
  const { insights } = useCMSData();
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  const publishedArticles = insights.filter((a) => a.published);

  if (publishedArticles.length === 0) {
    return null; // Gracefully hidden if no articles are published as requested
  }

  return (
    <section className="section insights-section" id="insights" aria-labelledby="insights-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Practical Knowledge</span>
          <h2 id="insights-heading" className="section-title">
            SEO Insights &amp;{' '}
            <span className="text-accent">Architectural Field Notes.</span>
          </h2>
          <p className="section-lead">
            Actionable analyses on search engine mechanics, Core Web Vitals, and search intent
            modeling written for practitioners and commercial decision-makers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="insights-grid">
          {publishedArticles.map((article) => (
            <article key={article.id} className="insight-card">
              <div className="insight-card-top">
                <span className="insight-category-badge">{article.category}</span>
                <span className="insight-read-time">
                  <Clock size={13} className="text-accent" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h3 className="insight-card-title">{article.title}</h3>
              <p className="insight-card-summary">{article.summary}</p>

              <div className="insight-card-footer">
                <span className="insight-date">
                  <Calendar size={13} />
                  <span>{article.date}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="insight-read-btn"
                  aria-label={`Read article: ${article.title}`}
                >
                  <span>Read Guide</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Modal */}
        <InsightModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      </div>
    </section>
  );
};
