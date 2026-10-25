import React, { useState } from 'react';
import { useCMSData } from '../context/useCMSData';
import {
  Mail,
  MessageSquare,
  Globe,
  User,
  Send,
  CheckCircle,
  Copy,
  AlertCircle,
  MapPin
} from 'lucide-react';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const { siteConfig, services } = useCMSData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    serviceRequired: preselectedService || (services[0]?.title ?? 'Technical SEO & Architecture Audit'),
    trafficScope: '10k – 50k visitors/mo',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief description of your project or website goals';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please share at least 15 characters about your SEO objectives';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formattedInquiryText = `SEO Project Inquiry
---------------------------------
Name: ${formData.name}
Email: ${formData.email}
Website: ${formData.websiteUrl || 'Not specified'}
Service Needed: ${formData.serviceRequired}
Current Monthly Traffic: ${formData.trafficScope}

Project Objectives & Message:
${formData.message}
---------------------------------
Sent via Shafi SEO Portfolio`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsPrepared(true);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`SEO Project Inquiry - ${formData.name}`);
    const body = encodeURIComponent(formattedInquiryText);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = () => {
    const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(formattedInquiryText);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedInquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Start an Engagement</span>
          <h2 id="contact-heading" className="section-title">
            Let's Talk About Your <span className="text-accent">SEO Goals.</span>
          </h2>
          <p className="section-lead">
            Whether you need a one-time technical architecture audit or ongoing strategic guidance,
            share your website details below for an honest, senior-level evaluation.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Direct Specialist Channels</h3>
              <p className="contact-info-desc">
                I personally review every inquiry and evaluate your site’s crawl health before
                responding. No automated sales bots or junior representatives.
              </p>

              <div className="direct-channels-list">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="channel-item"
                  aria-label="Direct email to Shafi"
                >
                  <div className="channel-icon-circle">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Email Direct</span>
                    <span className="channel-value">{siteConfig.contactEmail}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                  aria-label="Direct WhatsApp chat with Shafi"
                >
                  <div className="channel-icon-circle">
                    <MessageSquare size={18} className="text-accent" />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">WhatsApp Consultation</span>
                    <span className="channel-value">{siteConfig.whatsappDisplay}</span>
                  </div>
                </a>

                <div className="channel-item location-channel-item">
                  <div className="channel-icon-circle">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Base Location</span>
                    <span className="channel-value">{siteConfig.location}</span>
                  </div>
                </div>
              </div>

              {/* Response Promise */}
              <div className="response-guarantee-box">
                <div className="guarantee-header">
                  <CheckCircle size={16} className="text-accent" />
                  <span>The Consultation Commitment</span>
                </div>
                <ul className="guarantee-bullets">
                  <li>24 to 48 business hour turnaround on all inquiries.</li>
                  <li>Initial high-level scan of your robots.txt and index coverage included.</li>
                  <li>Zero pressure sales tactics; straightforward advice only.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form or Ready-to-Send State */}
          <div className="contact-form-col">
            <div className="form-card-container">
              {!isPrepared ? (
                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  <div className="form-row">
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name <span className="required-star">*</span>
                      </label>
                      <div className="input-wrap">
                        <User size={16} className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          className={`form-input ${errors.name ? 'input-error' : ''}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                      </div>
                      {errors.name && (
                        <span id="name-error" className="field-error-text">
                          <AlertCircle size={12} />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="required-star">*</span>
                      </label>
                      <div className="input-wrap">
                        <Mail size={16} className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="sarah@yourbrand.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          className={`form-input ${errors.email ? 'input-error' : ''}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                      </div>
                      {errors.email && (
                        <span id="email-error" className="field-error-text">
                          <AlertCircle size={12} />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    {/* Website URL */}
                    <div className="form-group">
                      <label htmlFor="websiteUrl" className="form-label">
                        Website URL <span className="optional-tag">(Optional)</span>
                      </label>
                      <div className="input-wrap">
                        <Globe size={16} className="input-icon" />
                        <input
                          type="url"
                          id="websiteUrl"
                          name="websiteUrl"
                          placeholder="https://yourbrand.com"
                          value={formData.websiteUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, websiteUrl: e.target.value })
                          }
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Service Required */}
                    <div className="form-group">
                      <label htmlFor="serviceRequired" className="form-label">
                        Primary Service Focus
                      </label>
                      <select
                        id="serviceRequired"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceRequired: e.target.value })
                        }
                        className="form-select"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom Strategic Consultation">
                          Other / Comprehensive Audit Retainer
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Monthly Organic Traffic Scope */}
                  <div className="form-group">
                    <label htmlFor="trafficScope" className="form-label">
                      Current Approximate Monthly Traffic
                    </label>
                    <select
                      id="trafficScope"
                      name="trafficScope"
                      value={formData.trafficScope}
                      onChange={(e) =>
                        setFormData({ ...formData, trafficScope: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value="New Launch / Less than 2k visitors/mo">
                        New Launch (&lt; 2,000 visitors/month)
                      </option>
                      <option value="2k – 10k visitors/mo">2,000 – 10,000 visitors/month</option>
                      <option value="10k – 50k visitors/mo">10,000 – 50,000 visitors/month</option>
                      <option value="50k – 200k visitors/mo">50,000 – 200,000 visitors/month</option>
                      <option value="200k+ visitors/mo">200,000+ enterprise volume</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Project Details &amp; Key Challenges <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Share a brief overview of your business, current search roadblocks, or what you hope to achieve with SEO..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    ></textarea>
                    {errors.message && (
                      <span id="message-error" className="field-error-text">
                        <AlertCircle size={12} />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  <div className="form-action-row">
                    <button type="submit" className="btn btn-primary btn-full">
                      <span>Review &amp; Send Inquiry</span>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              ) : (
                /* Honest Functional Review State */
                <div className="form-prepared-state">
                  <div className="prepared-header">
                    <CheckCircle size={32} className="text-accent" />
                    <h3 className="prepared-title">Your Inquiry is Prepared</h3>
                    <p className="prepared-desc">
                      To protect your privacy and ensure direct delivery without third-party email
                      scrapers, choose your preferred direct communication method below:
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="prepared-actions-grid">
                    <button
                      onClick={handleSendEmail}
                      className="btn btn-primary btn-full action-btn-large"
                    >
                      <Mail size={18} />
                      <span>Send via Direct Email Client</span>
                    </button>

                    <button
                      onClick={handleSendWhatsApp}
                      className="btn btn-secondary btn-full action-btn-large"
                    >
                      <MessageSquare size={18} />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  {/* Formatted Text Box for manual copying */}
                  <div className="prepared-preview-box">
                    <div className="preview-box-header">
                      <span>Formatted Message Preview:</span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="copy-btn"
                        aria-label="Copy inquiry text"
                      >
                        <Copy size={14} />
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                      </button>
                    </div>
                    <pre className="preview-text-content">{formattedInquiryText}</pre>
                  </div>

                  <div className="prepared-edit-row">
                    <button
                      type="button"
                      onClick={() => setIsPrepared(false)}
                      className="edit-details-btn"
                    >
                      ‹ Edit Inquiry Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
