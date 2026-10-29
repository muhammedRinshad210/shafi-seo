import React from 'react';
import type { ImageWithTextBlock } from '../../types';
import { CornerNotch } from '../CornerNotch';
import { createDataAttribute } from '../../lib/visualEditing';
import { ArrowRight } from 'lucide-react';

interface ImageWithTextBlockProps {
  block: ImageWithTextBlock;
  onOpenContact?: () => void;
  documentId?: string;
  documentType?: string;
}

export const ImageWithTextBlockComponent: React.FC<ImageWithTextBlockProps> = ({
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
    if (block.ctaAction === 'contact' || block.ctaAction === 'drawer') {
      if (onOpenContact) onOpenContact();
    } else if (block.ctaAction === 'whatsapp') {
      window.open('https://wa.me/919876543210', '_blank', 'noopener,noreferrer');
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  const isImageLeft = block.imagePosition === 'left';

  return (
    <section
      className="custom-image-text-section section-padding relative z-10"
      data-sanity={attr.toString()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="cyber-card p-8 md:p-12 relative bg-dark-card border border-white/10">
          <CornerNotch position="top-left" />
          <CornerNotch position="bottom-right" />

          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
              isImageLeft ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Text Column */}
            <div className={`lg:col-span-7 flex flex-col items-start ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
              {block.badge && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 bg-neon-lime/10 border border-neon-lime/30 text-neon-lime text-xs font-mono font-bold tracking-widest uppercase mb-4"
                  data-sanity={attr.scope('badge')}
                >
                  <span className="w-1.5 h-1.5 bg-neon-lime rounded-full" />
                  {block.badge}
                </div>
              )}

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6"
                data-sanity={attr.scope('headline')}
              >
                {block.headline}
              </h2>

              <p
                className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line"
                data-sanity={attr.scope('text')}
              >
                {block.text}
              </p>

              {block.ctaLabel && (
                <button
                  type="button"
                  onClick={handleAction}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-neon-lime text-dark-bg font-mono font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(235,251,29,0.4)] hover:scale-102"
                  data-sanity={attr.scope('ctaLabel')}
                >
                  <span>{block.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Image Column */}
            <div className={`lg:col-span-5 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
              <div
                className="relative overflow-hidden rounded-sm border border-white/10 group aspect-4/3 bg-white/5"
                data-sanity={attr.scope('image')}
              >
                <CornerNotch position="top-right" />
                <CornerNotch position="bottom-left" />

                {block.imageUrl ? (
                  <img
                    src={block.imageUrl}
                    alt={block.alt || 'Technical SEO Methodology'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-neon-lime/10 text-neon-lime flex items-center justify-center font-mono mb-2">
                      IMG
                    </div>
                    <span className="text-white/60 font-mono text-xs">Image Container</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
