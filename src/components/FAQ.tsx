import React, { useState } from 'react';
import { useCMSData } from '../context/useCMSData';
import { Plus, Minus, HelpCircle, ArrowUpRight } from 'lucide-react';

interface FAQProps {
  onOpenContact: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenContact }) => {
  const { faqItems } = useCMSData();
  const [openIds, setOpenIds] = useState<string[]>(() =>
    faqItems.length > 0 ? [faqItems[0].id] : []
  );

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Clarity &amp; Questions</span>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked{' '}
            <span className="text-accent">Buyer Questions.</span>
          </h2>
          <p className="section-lead">
            Straightforward answers regarding working arrangements, timelines, guarantees, and how
            we measure genuine search impact.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
          {faqItems.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            const buttonId = `faq-btn-${item.id}`;
            const contentId = `faq-content-${item.id}`;

            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleFAQ(item.id)}
                    className="faq-question-btn"
                  >
                    <span className="faq-question-index">0{idx + 1}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-icon-wrapper" aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Support Note */}
        <div className="faq-support-box">
          <div className="faq-support-content">
            <HelpCircle size={22} className="text-accent" />
            <div>
              <h4 className="support-box-title">Have a specific question about your tech stack?</h4>
              <p className="support-box-desc">
                Whether you run headless Next.js, Shopify, or WordPress, I can assess your crawl
                readiness during an initial review.
              </p>
            </div>
          </div>
          <button onClick={onOpenContact} className="btn btn-secondary btn-sm">
            <span>Ask a Question</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
