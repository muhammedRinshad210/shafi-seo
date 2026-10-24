import React, { useState } from 'react';
import { processSteps } from '../data/process';
import { Check, Calendar, UserCheck, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onOpenContact: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenContact }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = processSteps[activeStepIndex];

  return (
    <section className="section process-section" id="process" aria-labelledby="process-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Working Methodology</span>
          <h2 id="process-heading" className="section-title">
            The 4-Stage Organic{' '}
            <span className="text-accent">Growth Framework.</span>
          </h2>
          <p className="section-lead">
            A methodical, structured workflow that turns complex search engine mechanics into a
            repeatable, transparent customer acquisition engine.
          </p>
        </div>

        {/* Process Stepper Bar */}
        <div className="process-timeline-bar" role="tablist" aria-label="Process Steps">
          {processSteps.map((step, idx) => (
            <button
              key={step.step}
              role="tab"
              aria-selected={activeStepIndex === idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`timeline-step-tab ${activeStepIndex === idx ? 'active' : ''}`}
            >
              <span className="step-tab-num">{step.step}</span>
              <div className="step-tab-text">
                <span className="step-tab-title">{step.title}</span>
                <span className="step-tab-duration">{step.duration}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="process-active-display">
          <div className="process-display-grid">
            {/* Left Col: Core Narrative */}
            <div className="process-narrative-col">
              <div className="process-badge-row">
                <span className="process-stage-pill">Phase {activeStep.step}</span>
                <span className="process-duration-pill">
                  <Calendar size={14} className="text-accent" />
                  <span>{activeStep.duration}</span>
                </span>
              </div>

              <h3 className="process-stage-title">{activeStep.title}</h3>
              <p className="process-stage-subtitle">{activeStep.subtitle}</p>
              <p className="process-stage-desc">{activeStep.description}</p>

              {/* Client Role Box */}
              <div className="process-client-role">
                <div className="client-role-header">
                  <UserCheck size={16} className="text-accent" />
                  <span>What I Need From You:</span>
                </div>
                <p className="client-role-text">{activeStep.clientRole}</p>
              </div>

              <div className="process-cta-row">
                <button onClick={onOpenContact} className="btn btn-primary btn-sm">
                  <span>Start Phase 01: Discovery</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Col: Tangible Deliverables */}
            <div className="process-deliverables-col">
              <div className="deliverables-box-inner">
                <h4 className="deliverables-box-title">Concrete Phase Deliverables:</h4>
                <ul className="phase-deliverables-list">
                  {activeStep.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="phase-deliverable-item">
                      <div className="deliverable-icon-circle">
                        <Check size={14} className="text-accent" />
                      </div>
                      <span className="deliverable-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
