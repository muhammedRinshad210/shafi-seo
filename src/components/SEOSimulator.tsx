import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Activity, Database, Cpu, Layers } from 'lucide-react';

export const SEOSimulator: React.FC = () => {
  const [isOptimized, setIsOptimized] = useState(true);
  const [activeTab, setActiveTab] = useState<'vitals' | 'crawl' | 'intent'>('vitals');

  return (
    <div className="seo-simulator-card" aria-label="Interactive SEO Architecture Simulator">
      {/* Card Header & Controls */}
      <div className="simulator-header">
        <div className="simulator-title-group">
          <span className="simulator-badge">
            <Activity size={14} className="text-accent" />
            <span>SEO Engine Diagnostics</span>
          </span>
          <span className="simulator-url">googlebot-crawl-simulator // v2026.4</span>
        </div>

        {/* State Toggle */}
        <div className="state-toggle-wrapper">
          <span className="toggle-label">Mode:</span>
          <div className="toggle-pill" role="radiogroup" aria-label="Toggle optimization state">
            <button
              type="button"
              role="radio"
              aria-checked={!isOptimized}
              onClick={() => setIsOptimized(false)}
              className={`toggle-option ${!isOptimized ? 'active-warning' : ''}`}
            >
              Unoptimized Site
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={isOptimized}
              onClick={() => setIsOptimized(true)}
              className={`toggle-option ${isOptimized ? 'active-optimized' : ''}`}
            >
              Shafi Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Main Score Bar */}
      <div className="simulator-score-strip">
        <div className="score-summary">
          <div className="score-circle-wrapper">
            <div className={`score-circle ${isOptimized ? 'score-good' : 'score-poor'}`}>
              <span className="score-number">{isOptimized ? '98' : '44'}</span>
              <span className="score-denominator">/100</span>
            </div>
          </div>
          <div className="score-details">
            <span className="score-status-label">
              {isOptimized ? 'Engineered for Discovery' : 'Critical Crawl Impediments'}
            </span>
            <p className="score-status-desc">
              {isOptimized
                ? 'Valid semantic schemas, zero redirect chains, and optimized Core Web Vitals.'
                : 'Blocked crawl budget, orphan landing pages, and unindexed commercial routes.'}
            </p>
          </div>
        </div>

        {/* Quick Snapshot Metrics */}
        <div className="score-mini-metrics">
          <div className="mini-metric">
            <span className="mini-metric-title">Index Coverage</span>
            <span className={`mini-metric-value ${isOptimized ? 'text-growth' : 'text-danger'}`}>
              {isOptimized ? '99.4%' : '52.1%'}
            </span>
          </div>
          <div className="mini-metric">
            <span className="mini-metric-title">Crawl Bottlenecks</span>
            <span className={`mini-metric-value ${isOptimized ? 'text-accent' : 'text-danger'}`}>
              {isOptimized ? '0 detected' : '38 flagged'}
            </span>
          </div>
          <div className="mini-metric">
            <span className="mini-metric-title">Schema Validation</span>
            <span className={`mini-metric-value ${isOptimized ? 'text-growth' : 'text-danger'}`}>
              {isOptimized ? 'Verified' : 'Missing'}
            </span>
          </div>
        </div>
      </div>

      {/* Diagnostic Tabs */}
      <div className="simulator-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'vitals'}
          onClick={() => setActiveTab('vitals')}
          className={`simulator-tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
        >
          <Cpu size={15} />
          <span>Core Web Vitals</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'crawl'}
          onClick={() => setActiveTab('crawl')}
          className={`simulator-tab-btn ${activeTab === 'crawl' ? 'active' : ''}`}
        >
          <Database size={15} />
          <span>Crawl &amp; Indexation</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'intent'}
          onClick={() => setActiveTab('intent')}
          className={`simulator-tab-btn ${activeTab === 'intent' ? 'active' : ''}`}
        >
          <Layers size={15} />
          <span>Search Intent Taxonomy</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="simulator-tab-content">
        {activeTab === 'vitals' && (
          <div className="vitals-grid">
            <div className="vital-card">
              <div className="vital-header">
                <span className="vital-code">LCP</span>
                <span className="vital-name">Largest Contentful Paint</span>
              </div>
              <div className="vital-reading">
                <span className={`vital-val ${isOptimized ? 'text-growth' : 'text-danger'}`}>
                  {isOptimized ? '1.1s' : '4.6s'}
                </span>
                <span className="vital-badge">
                  {isOptimized ? (
                    <CheckCircle2 size={14} className="text-growth" />
                  ) : (
                    <AlertTriangle size={14} className="text-danger" />
                  )}
                  <span>{isOptimized ? 'Good (<2.5s)' : 'Poor (>4.0s)'}</span>
                </span>
              </div>
              <div className="vital-bar-track">
                <div
                  className={`vital-bar-fill ${isOptimized ? 'bg-growth' : 'bg-danger'}`}
                  style={{ width: isOptimized ? '22%' : '88%' }}
                ></div>
              </div>
            </div>

            <div className="vital-card">
              <div className="vital-header">
                <span className="vital-code">INP</span>
                <span className="vital-name">Interaction to Next Paint</span>
              </div>
              <div className="vital-reading">
                <span className={`vital-val ${isOptimized ? 'text-growth' : 'text-danger'}`}>
                  {isOptimized ? '38ms' : '390ms'}
                </span>
                <span className="vital-badge">
                  {isOptimized ? (
                    <CheckCircle2 size={14} className="text-growth" />
                  ) : (
                    <AlertTriangle size={14} className="text-danger" />
                  )}
                  <span>{isOptimized ? 'Good (<200ms)' : 'Poor (>200ms)'}</span>
                </span>
              </div>
              <div className="vital-bar-track">
                <div
                  className={`vital-bar-fill ${isOptimized ? 'bg-growth' : 'bg-danger'}`}
                  style={{ width: isOptimized ? '18%' : '78%' }}
                ></div>
              </div>
            </div>

            <div className="vital-card">
              <div className="vital-header">
                <span className="vital-code">CLS</span>
                <span className="vital-name">Cumulative Layout Shift</span>
              </div>
              <div className="vital-reading">
                <span className={`vital-val ${isOptimized ? 'text-growth' : 'text-danger'}`}>
                  {isOptimized ? '0.01' : '0.34'}
                </span>
                <span className="vital-badge">
                  {isOptimized ? (
                    <CheckCircle2 size={14} className="text-growth" />
                  ) : (
                    <AlertTriangle size={14} className="text-danger" />
                  )}
                  <span>{isOptimized ? 'Good (<0.1)' : 'Needs Fix'}</span>
                </span>
              </div>
              <div className="vital-bar-track">
                <div
                  className={`vital-bar-fill ${isOptimized ? 'bg-growth' : 'bg-danger'}`}
                  style={{ width: isOptimized ? '8%' : '75%' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crawl' && (
          <div className="crawl-panel">
            <div className="crawl-row">
              <span className="crawl-label">Robots.txt Directives</span>
              <span className={`crawl-tag ${isOptimized ? 'tag-clean' : 'tag-warn'}`}>
                {isOptimized ? 'Canonical Sitemap Linked • Clean Rules' : 'Blocking Critical Assets'}
              </span>
            </div>
            <div className="crawl-row">
              <span className="crawl-label">Self-Referencing Canonicals</span>
              <span className={`crawl-tag ${isOptimized ? 'tag-clean' : 'tag-warn'}`}>
                {isOptimized ? '100% Present on Indexable URLs' : 'Duplicate Parameter URLs Present'}
              </span>
            </div>
            <div className="crawl-row">
              <span className="crawl-label">Pagination &amp; Orphan Status</span>
              <span className={`crawl-tag ${isOptimized ? 'tag-clean' : 'tag-warn'}`}>
                {isOptimized ? 'Zero Orphan Routes • Clean Internal Links' : '14 Orphan Landing Pages Found'}
              </span>
            </div>
            <div className="crawl-row">
              <span className="crawl-label">Rich Snippets Schema</span>
              <span className={`crawl-tag ${isOptimized ? 'tag-clean' : 'tag-warn'}`}>
                {isOptimized ? 'Valid JSON-LD (Org, Breadcrumbs, Service)' : 'No Semantic Markup Found'}
              </span>
            </div>
          </div>
        )}

        {activeTab === 'intent' && (
          <div className="intent-panel">
            <div className="intent-bars">
              <div className="intent-item">
                <div className="intent-meta">
                  <span className="intent-type">Transactional / Buyer Queries</span>
                  <span className="intent-percent">{isOptimized ? '42%' : '11%'}</span>
                </div>
                <div className="intent-bar-wrapper">
                  <div
                    className="intent-bar-fill fill-accent"
                    style={{ width: isOptimized ? '42%' : '11%' }}
                  ></div>
                </div>
                <span className="intent-caption">
                  {isOptimized ? 'Targeted product & service terms' : 'Under-represented'}
                </span>
              </div>

              <div className="intent-item">
                <div className="intent-meta">
                  <span className="intent-type">Commercial Investigation</span>
                  <span className="intent-percent">{isOptimized ? '36%' : '18%'}</span>
                </div>
                <div className="intent-bar-wrapper">
                  <div
                    className="intent-bar-fill fill-growth"
                    style={{ width: isOptimized ? '36%' : '18%' }}
                  ></div>
                </div>
                <span className="intent-caption">
                  {isOptimized ? 'Comparisons, alternatives, audits' : 'Low focus'}
                </span>
              </div>

              <div className="intent-item">
                <div className="intent-meta">
                  <span className="intent-type">Informational Awareness</span>
                  <span className="intent-percent">{isOptimized ? '22%' : '71%'}</span>
                </div>
                <div className="intent-bar-wrapper">
                  <div
                    className="intent-bar-fill fill-slate"
                    style={{ width: isOptimized ? '22%' : '71%' }}
                  ></div>
                </div>
                <span className="intent-caption">
                  {isOptimized ? 'Balanced authority content' : 'Excessive vanity blog traffic'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="simulator-footer">
        <span className="simulator-note">
          Simulated diagnostic modeling what Shafi engineers during a technical audit sprint.
        </span>
      </div>
    </div>
  );
};
