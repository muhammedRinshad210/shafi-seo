import React from 'react';
import type { HeadingTextBlock } from '../../types';
import { CornerNotch } from '../CornerNotch';
import { createDataAttribute } from '../../lib/visualEditing';

interface HeadingTextBlockProps {
  block: HeadingTextBlock;
  documentId?: string;
  documentType?: string;
}

export const HeadingTextBlockComponent: React.FC<HeadingTextBlockProps> = ({
  block,
  documentId = 'homePage',
  documentType = 'page',
}) => {
  const alignClass =
    block.alignment === 'center'
      ? 'text-center items-center'
      : block.alignment === 'right'
        ? 'text-right items-end'
        : 'text-left items-start';

  const attr = createDataAttribute({
    id: documentId,
    type: documentType,
    path: `sections[_key=="${block._key}"]`,
  });

  return (
    <section
      className="custom-heading-text-section section-padding relative z-10"
      data-sanity={attr.toString()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div
          className={`custom-heading-text-card cyber-card p-8 md:p-12 relative flex flex-col ${alignClass} ${
            block.variant === 'accent'
              ? 'border-neon-lime/40 bg-dark-bg/90 shadow-[0_0_30px_rgba(235,251,29,0.08)]'
              : block.variant === 'minimal'
                ? 'bg-transparent border-white/10'
                : 'bg-dark-card border-white/10'
          }`}
        >
          <CornerNotch position="top-left" />
          <CornerNotch position="bottom-right" />

          {block.badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 bg-neon-lime/10 border border-neon-lime/30 text-neon-lime text-xs font-mono font-bold tracking-widest uppercase mb-4"
              data-sanity={attr.scope('badge')}
            >
              <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse" />
              {block.badge}
            </div>
          )}

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6"
            data-sanity={attr.scope('headline')}
          >
            {block.headline}
          </h2>

          <div
            className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl whitespace-pre-line"
            data-sanity={attr.scope('text')}
          >
            {block.text}
          </div>
        </div>
      </div>
    </section>
  );
};
