import React from 'react';
import { useCMSData } from '../context/useCMSData';
import {
  Cpu,
  Target,
  FileCheck,
  TrendingUp,
  MapPin,
  Compass,
  Check,
  ArrowUpRight,
  AlertCircle,
  Gauge,
  ShieldCheck,
  Layers
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = useCMSData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="service-icon" size={24} />;
      case 'Target':
        return <Target className="service-icon" size={24} />;
      case 'FileCheck':
        return <FileCheck className="service-icon" size={24} />;
      case 'TrendingUp':
        return <TrendingUp className="service-icon" size={24} />;
      case 'MapPin':
        return <MapPin className="service-icon" size={24} />;
      case 'Compass':
        return <Compass className="service-icon" size={24} />;
      case 'Gauge':
        return <Gauge className="service-icon" size={24} />;
      case 'ShieldCheck':
        return <ShieldCheck className="service-icon" size={24} />;
      case 'Layers':
        return <Layers className="service-icon" size={24} />;
      default:
        return <Cpu className="service-icon" size={24} />;
    }
  };

  return (
    <section className="section services-section" id="services" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Capabilities &amp; Solutions</span>
          <h2 id="services-heading" className="section-title">
            Tailored SEO Services Focused on{' '}
            <span className="text-accent">Commercial Visibility.</span>
          </h2>
          <p className="section-lead">
            Every service is tailored to your business model, current technical foundation, and target
            audience. No boilerplates, no vanity metrics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.id} className="service-card">
              <div className="service-card-top">
                <div className="service-icon-wrap">
                  {service.customIconUrl ? (
                    <img
                      src={service.customIconUrl}
                      alt={service.title}
                      className="service-custom-icon"
                      style={{ width: 24, height: 24, objectFit: 'contain' }}
                    />
                  ) : (
                    getIcon(service.iconName)
                  )}
                </div>
                <span className="service-badge">{service.badge}</span>
                <span className="service-index">0{index + 1}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-short-desc">{service.shortDescription}</p>

              {/* The Problem Addressed */}
              <div className="service-problem-box">
                <div className="problem-label">
                  <AlertCircle size={14} className="text-warning" />
                  <span>The Challenge Addressed</span>
                </div>
                <p className="problem-text">{service.problem}</p>
              </div>

              {/* Deliverables */}
              <div className="service-deliverables">
                <span className="deliverables-title">What's Included:</span>
                <ul className="deliverables-list">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="deliverable-item">
                      <Check size={15} className="text-accent deliverable-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected Improvement */}
              <div className="service-impact-box">
                <span className="impact-label">Expected Commercial Impact:</span>
                <p className="impact-text">{service.expectedImpact}</p>
              </div>

              {/* CTA */}
              <div className="service-card-footer">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="btn btn-secondary btn-full service-cta-btn"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Inquire About This Service</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
