import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { servicesData } from '../data/services';
import { Mail, MessageSquare, CheckCircle, Copy } from 'lucide-react';
import { CyberButton } from './CyberButton';
import { ScrambleText } from './ScrambleText';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const LeadDrawer: React.FC<LeadDrawerProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    serviceRequired: initialService || servicesData[0].title,
    monthlyTraffic: '10k – 50k visitors/mo',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [transmissionTimestamp, setTransmissionTimestamp] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Name required';
    if (!formData.email.trim()) errs.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid email required';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters regarding your goals';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formattedInquiry = `// SHAFI SEO // PROJECT TRANSMISSION
---------------------------------------
Client: ${formData.name}
Email: ${formData.email}
Target URL: ${formData.websiteUrl || 'Not specified'}
Service Scope: ${formData.serviceRequired}
Current Scale: ${formData.monthlyTraffic}

Strategic Objectives:
${formData.message}
---------------------------------------
Timestamp: ${transmissionTimestamp || 'Transmission Ready'}
Origin: Shafi Independent SEO Platform`;

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`SEO Audit Consultation // ${formData.name}`);
    const body = encodeURIComponent(formattedInquiry);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = () => {
    const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(formattedInquiry);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedInquiry);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="submit_form_wrap active" role="dialog" aria-modal="true">
      <div className="submit_form_backdrop" onClick={onClose}></div>
      <div className="submit_form_panel">
        {/* Bracketed Close Button matching NeoCultural reference */}
        <button onClick={onClose} className="bracket_close_btn" aria-label="Close project inquiry panel">
          <span className="bracket-bracket">[</span>
          <span className="bracket-x">✕</span>
          <span className="bracket-bracket">]</span>
          <span className="bracket-text">CLOSE</span>
        </button>

        <div className="drawer_header">
          <div className="drawer_hud_code">//ENGAGE.PROTOCOL_01</div>
          <h2 className="drawer_title">
            Initiate Your <span className="text-span">S</span>EO <span className="text-accent">Audit</span>
          </h2>
          <p className="drawer_lead">
            Direct collaboration with Shafi. Share your website domain and commercial growth goals
            below for a senior-level technical evaluation.
          </p>
        </div>

        {!isPrepared ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validate()) {
                setTransmissionTimestamp(new Date().toISOString());
                setIsPrepared(true);
              }
            }}
            noValidate
            className="drawer_form"
          >
            <div className="form_group">
              <label className="form_label" htmlFor="drawer_name">
                01 // Full Name <span className="text-accent">*</span>
              </label>
              <input
                id="drawer_name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Marcus Thorne"
                className={`drawer_input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <span className="drawer_field_err">{errors.name}</span>}
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="drawer_email">
                02 // Work Email <span className="text-accent">*</span>
              </label>
              <input
                id="drawer_email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="marcus@company.com"
                className={`drawer_input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="drawer_field_err">{errors.email}</span>}
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="drawer_url">
                03 // Website Domain (Optional)
              </label>
              <input
                id="drawer_url"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://company.com"
                className="drawer_input"
              />
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="drawer_service">
                04 // Required Engagement Scope
              </label>
              <select
                id="drawer_service"
                value={formData.serviceRequired}
                onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                className="drawer_select"
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Full Architecture & Organic Retainer">
                  Comprehensive Organic Retainer
                </option>
              </select>
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="drawer_msg">
                05 // Key Challenges & Organic Goals <span className="text-accent">*</span>
              </label>
              <textarea
                id="drawer_msg"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Describe your current crawl bottlenecks, drops in impressions, or growth milestones..."
                className={`drawer_textarea ${errors.message ? 'input-error' : ''}`}
              />
              {errors.message && <span className="drawer_field_err">{errors.message}</span>}
            </div>

            <div className="drawer_submit_row">
              <CyberButton
                label="Prepare Transmission"
                type="submit"
                size="lg"
                className="btn-full"
              />
            </div>
          </form>
        ) : (
          <div className="drawer_prepared_view">
            <div className="prepared_status_badge">
              <CheckCircle size={28} className="text-accent" />
              <h3 className="prepared_title">Transmission Encoded</h3>
              <p className="prepared_info">
                Direct dispatch channels ready. No third-party data tracking. Choose how you want
                to send this to Shafi:
              </p>
            </div>

            <div className="prepared_button_stack">
              <button onClick={handleSendEmail} className="channel_btn email_btn">
                <Mail size={18} />
                <span>
                  <ScrambleText text="Dispatch via Direct Email" />
                </span>
              </button>

              <button onClick={handleSendWhatsApp} className="channel_btn whatsapp_btn">
                <MessageSquare size={18} />
                <span>
                  <ScrambleText text="Open Direct WhatsApp Chat" />
                </span>
              </button>
            </div>

            <div className="prepared_copy_block">
              <div className="copy_block_header">
                <span>Payload Preview:</span>
                <button onClick={handleCopy} className="copy_trigger_btn">
                  <Copy size={13} />
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>
              <pre className="copy_pre">{formattedInquiry}</pre>
            </div>

            <button onClick={() => setIsPrepared(false)} className="drawer_back_btn">
              ← Edit details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
