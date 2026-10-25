import React, { useState } from 'react';
import { useCMSData } from '../context/useCMSData';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Clock, Sparkles, FolderKanban, LayoutGrid, ListFilter } from 'lucide-react';
import { CyberButton } from './CyberButton';
import { CornerNotch } from './CornerNotch';
import { ScrambleText } from './ScrambleText';

interface ProjectsProps {
  onOpenContact: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenContact }) => {
  const { projects } = useCMSData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const publishedProjects = projects.filter((p) => p.published);
  const industries = ['All', ...Array.from(new Set(publishedProjects.map((p) => p.industry)))];

  const filteredProjects =
    activeFilter === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.industry === activeFilter);

  return (
    <section className="section projects-section" id="work" aria-labelledby="projects-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="projects-header-top">
            <div>
              <span className="section-eyebrow">
                <ScrambleText text="// ARCHITECTURAL WORK & AUDITS" />
              </span>
              <h2 id="projects-heading" className="section-title">
                Se<span className="text-span">l</span>ected Ca<span className="text-span">s</span>e{' '}
                <span className="text-accent">Stu<span className="text-span">d</span>ies.</span>
              </h2>
            </div>
            <div className="projects-meta-count desktop-only">
              <span className="projects-count-num">0{publishedProjects.length}</span>
              <span className="projects-count-label">VERIFIED DEPLOYMENTS</span>
            </div>
          </div>
          <p className="section-lead">
            Real architectural bottlenecks diagnosed and solved. Every case study outlines genuine
            challenges, tactical execution, and verifiable technical outcomes without fabricated claims.
          </p>
        </div>

        {/* View Controls & Filter Bar */}
        <div className="projects-controls-bar">
          {/* Industry Filter Pills */}
          <div className="projects-filter-bar" role="tablist" aria-label="Filter projects by industry">
            {industries.map((industry) => (
              <button
                key={industry}
                role="tab"
                aria-selected={activeFilter === industry}
                onClick={() => setActiveFilter(industry)}
                className={`filter-pill ${activeFilter === industry ? 'active' : ''}`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Grid / List Switcher from Reference */}
          <div className="ugc_options">
            <div className="ugc_view">
              <span className="view_label">VIEW:</span>
              <button
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={`view_button ${viewMode === 'grid' ? 'active' : ''}`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={`view_button ${viewMode === 'list' ? 'active' : ''}`}
                title="List View"
              >
                <ListFilter size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display: Grid or List */}
        {publishedProjects.length === 0 ? (
          <div className="projects-empty-state">
            <div className="empty-state-icon">
              <FolderKanban size={40} className="text-accent" />
            </div>
            <h3 className="empty-state-title">Case Studies Currently Under Client Embargo</h3>
            <p className="empty-state-text">
              Active client audit findings and ranking data are currently subject to non-disclosure
              agreements. Verified sanitized case studies are currently being prepared for publication.
            </p>
            <div className="empty-state-cta">
              <CyberButton
                label="Discuss Your SEO Goals"
                onClick={onOpenContact}
                size="md"
              />
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="projects-display-list">
            {filteredProjects.map((project, index) => (
              <article key={project.id} className="project-editorial-card">
                <CornerNotch position="top-left" />
                <CornerNotch position="top-right" />
                <CornerNotch position="bottom-left" />
                <CornerNotch position="bottom-right" />

                <div className="project-card-grid">
                  {/* Left Column: Metadata & Challenge */}
                  <div className="project-meta-col">
                    <div className="project-header-tags">
                      <span className="project-index-code">[{index + 1 < 10 ? `00${index + 1}` : `0${index + 1}`}]</span>
                      <span className="project-industry-badge">{project.industry}</span>
                      <span className="project-duration-tag">
                        <Clock size={13} className="text-accent" />
                        <span>{project.duration}</span>
                      </span>
                    </div>

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-summary-text">{project.summary}</p>

                    {/* Key Interventions */}
                    <div className="project-tactics-preview">
                      <span className="tactics-label">// Key Architectural Interventions:</span>
                      <ul className="tactics-list">
                        {project.strategy.slice(0, 3).map((item, sIdx) => (
                          <li key={sIdx} className="tactic-item">
                            <span className="tactic-bullet">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-action-row">
                      <CyberButton
                        label="View Full Case Study"
                        onClick={() => setSelectedProject(project)}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Right Column: Outcomes & Metrics Visualizer */}
                  <div className="project-metrics-col">
                    <div className="metrics-card-inner">
                      <div className="metrics-col-header">
                        <Sparkles size={16} className="text-accent" />
                        <span>VERIFIED OUTCOMES &amp; IMPACT</span>
                      </div>

                      <div className="outcomes-grid">
                        {project.results.map((res, rIdx) => (
                          <div key={rIdx} className="outcome-box">
                            <div className="outcome-val text-accent">{res.value}</div>
                            <div className="outcome-lbl">{res.label}</div>
                            <p className="outcome-ctx">{res.context}</p>
                          </div>
                        ))}
                      </div>

                      <div className="project-tools-footer">
                        <span className="tools-caption">STACK &amp; DIAGNOSTIC SUITE:</span>
                        <div className="tools-pills-wrap">
                          {project.tools.map((t, tIdx) => (
                            <span key={tIdx} className="tool-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* List / Index View */
          <div className="projects-list-table-wrap">
            <table className="projects-list-table">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>PROJECT TITLE &amp; CLIENT SCOPE</th>
                  <th>INDUSTRY</th>
                  <th>KEY METRIC</th>
                  <th>TIMELINE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr key={project.id} onClick={() => setSelectedProject(project)} className="project-table-row">
                    <td className="table-code">[{index + 1 < 10 ? `00${index + 1}` : `0${index + 1}`}]</td>
                    <td className="table-title">
                      <strong>{project.title}</strong>
                      <span className="table-summary">{project.summary}</span>
                    </td>
                    <td>
                      <span className="table-badge">{project.industry}</span>
                    </td>
                    <td className="table-metric text-accent">
                      {project.results[0]?.value} {project.results[0]?.label}
                    </td>
                    <td className="table-duration">{project.duration}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="table-inspect-btn"
                      >
                        [INSPECT]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Deep Dive Case Study */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={onOpenContact}
        />
      </div>
    </section>
  );
};
