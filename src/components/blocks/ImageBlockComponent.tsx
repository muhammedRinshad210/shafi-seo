import React from 'react';
import type { ImageBlock } from '../../types';
import { CornerNotch } from '../CornerNotch';
import { createDataAttribute } from '../../lib/visualEditing';

interface ImageBlockProps {
  block: ImageBlock;
  documentId?: string;
  documentType?: string;
}

export const ImageBlockComponent: React.FC<ImageBlockProps> = ({
  block,
  documentId = 'homePage',
  documentType = 'page',
}) => {
  const attr = createDataAttribute({
    id: documentId,
    type: documentType,
    path: `sections[_key=="${block._key}"]`,
  });

  const maxWidthClass =
    block.maxWidth === 'compact'
      ? 'max-w-3xl'
      : block.maxWidth === 'full'
        ? 'max-w-7xl'
        : 'max-w-5xl';

  const aspectClass =
    block.aspectRatio === 'square'
      ? 'aspect-square'
      : block.aspectRatio === '4:3'
        ? 'aspect-4/3'
        : block.aspectRatio === 'wide'
          ? 'aspect-21/9'
          : 'aspect-16/9';

  return (
    <section
      className="custom-image-section section-padding relative z-10"
      data-sanity={attr.toString()}
    >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass}`}>
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
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6"
            data-sanity={attr.scope('headline')}
          >
            {block.headline}
          </h2>
        )}

        <div
          className="cyber-card relative overflow-hidden bg-dark-card border border-white/10 group"
          data-sanity={attr.scope('image')}
        >
          <CornerNotch position="top-left" />
          <CornerNotch position="bottom-right" />

          {block.imageUrl ? (
            <img
              src={block.imageUrl}
              alt={block.alt || 'Shafi SEO Case Analysis'}
              className={`w-full object-cover object-center ${aspectClass} transition-transform duration-500 group-hover:scale-102`}
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full ${aspectClass} bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-center p-6`}
            >
              <div className="w-12 h-12 rounded-full bg-neon-lime/10 text-neon-lime flex items-center justify-center font-mono text-xl mb-3">
                IMG
              </div>
              <p className="text-white/80 font-mono text-sm font-bold">Image Block Ready</p>
              <p className="text-white/40 text-xs mt-1">
                Upload or select an image asset in Sanity Studio to display here.
              </p>
            </div>
          )}

          {block.caption && (
            <div
              className="p-4 bg-dark-bg/90 border-t border-white/10 text-xs sm:text-sm text-white/60 font-mono flex items-center justify-between"
              data-sanity={attr.scope('caption')}
            >
              <span>{block.caption}</span>
              <span className="text-neon-lime text-[10px] uppercase tracking-wider">Verified Asset</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
