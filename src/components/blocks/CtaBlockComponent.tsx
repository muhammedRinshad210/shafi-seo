import React from 'react';
import type { CtaBlock } from '../../types';
import { CornerNotch } from '../CornerNotch';
import { createDataAttribute } from '../../lib/visualEditing';
import { ArrowRight } from 'lucide-react';

interface CtaBlockProps {
  block: CtaBlock;
  onOpenContact?: () => void;
  documentId?: string;
  documentType?: string;
}

export const CtaBlockComponent: React.FC<CtaBlockProps> = ({
  block,
  onOpenContact,
  documentId = 'homePage',
  documentType = 'page',
}) => {
  const attr = createDataAttribute({
    id: documentId,
    type: documentType,
    path: `sections[_key=="${block._key}"]`,
  });

  const handleAction = () => {
    if (block.buttonAction === 'link' && block.customUrl) {
      window.open(block.customUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (block.buttonAction === 'whatsapp') {
      window.open('https://wa.me/919876543210', '_blank', 'noopener,noreferrer');
      return;
    }
    if (block.buttonAction === 'contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <section
      className="custom-cta-section section-padding relative z-10"
      data-sanity={attr.toString()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="cyber-card p-8 md:p-14 relative bg-dark-card border-2 border-neon-lime/40 shadow-[0_0_40px_rgba(235,251,29,0.08)] text-center flex flex-col items-center">
          <CornerNotch position="top-left" />
          <CornerNotch position="top-right" />
          <CornerNotch position="bottom-left" />
          <CornerNotch position="bottom-right" />

          {block.badge && (
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 bg-neon-lime/15 border border-neon-lime/50 text-neon-lime text-xs font-mono font-bold tracking-widest uppercase mb-6"
              data-sanity={attr.scope('badge')}
            >
              <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-ping" />
              {block.badge}
            </div>
          )}

          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-6"
            data-sanity={attr.scope('headline')}
          >
            {block.headline}
          </h2>

          {block.description && (
            <p
              className="text-white/75 text-base sm:text-xl leading-relaxed max-w-2xl mb-8"
              data-sanity={attr.scope('description')}
            >
              {block.description}
            </p>
          )}

          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-3 px-8 py-4 bg-neon-lime text-dark-bg font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_35px_rgba(235,251,29,0.5)] hover:scale-105 active:scale-98"
            data-sanity={attr.scope('buttonText')}
          >
            <span>{block.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
