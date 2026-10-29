import React from 'react';
import type { RichTextBlock } from '../../types';
import { CornerNotch } from '../CornerNotch';
import { createDataAttribute } from '../../lib/visualEditing';

interface RichTextBlockProps {
  block: RichTextBlock;
  documentId?: string;
  documentType?: string;
}

export const RichTextBlockComponent: React.FC<RichTextBlockProps> = ({
  block,
  documentId = 'homePage',
  documentType = 'page',
}) => {
  const attr = createDataAttribute({
    id: documentId,
    type: documentType,
    path: `sections[_key=="${block._key}"]`,
  });

  return (
    <section
      className="custom-rich-text-section section-padding relative z-10"
      data-sanity={attr.toString()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="cyber-card p-8 md:p-12 relative bg-dark-card border border-white/10">
          <CornerNotch position="top-left" />
          <CornerNotch position="bottom-right" />

          {block.badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 bg-neon-lime/10 border border-neon-lime/30 text-neon-lime text-xs font-mono font-bold tracking-widest uppercase mb-4"
              data-sanity={attr.scope('badge')}
            >
              <span className="w-1.5 h-1.5 bg-neon-lime rounded-full" />
              {block.badge}
            </div>
          )}

          {block.headline && (
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8"
              data-sanity={attr.scope('headline')}
            >
              {block.headline}
            </h2>
          )}

          <div
            className="prose prose-invert prose-lime max-w-none text-white/75 space-y-4 text-base sm:text-lg leading-relaxed"
            data-sanity={attr.scope('body')}
          >
            {Array.isArray(block.body) ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              block.body.map((item: any, idx: number) => {
                if (item._type === 'block') {
                  const text = (item.children || [])
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((child: any) => child.text || '')
                    .join('');
                  if (item.style === 'h3') {
                    return (
                      <h3 key={item._key || idx} className="text-xl font-bold text-white mt-6 mb-2">
                        {text}
                      </h3>
                    );
                  }
                  if (item.style === 'h4') {
                    return (
                      <h4 key={item._key || idx} className="text-lg font-semibold text-white/90 mt-4 mb-2">
                        {text}
                      </h4>
                    );
                  }
                  if (item.style === 'blockquote') {
                    return (
                      <blockquote
                        key={item._key || idx}
                        className="border-l-2 border-neon-lime pl-4 italic text-neon-lime/90 my-4"
                      >
                        {text}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={item._key || idx} className="text-white/70">
                      {text}
                    </p>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-white/60">Editorial content preview</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
