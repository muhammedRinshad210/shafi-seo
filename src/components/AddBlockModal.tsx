import React from 'react';
import type { PageSectionBlock } from '../types';
import { Type, Image, Layout, Sparkles, FileText, X } from 'lucide-react';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (block: PageSectionBlock) => void;
  insertIndex: number;
}

export const AddBlockModal: React.FC<AddBlockModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  insertIndex,
}) => {
  if (!isOpen) return null;

  const generateKey = () => `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const templates: {
    title: string;
    description: string;
    icon: React.ReactNode;
    create: () => PageSectionBlock;
  }[] = [
    {
      title: 'Heading & Text Block',
      description: 'Custom editorial headline, uppercase badge, and paragraph copy with cyber styling.',
      icon: <Type className="w-5 h-5 text-neon-lime" />,
      create: () => ({
        _key: generateKey(),
        _type: 'headingTextBlock',
        badge: 'STRATEGIC PERSPECTIVE',
        headline: 'Engineered Organic Visibility for Kerala Businesses',
        text: 'Custom structured content tailored to local search intent and algorithmic efficiency. This block can be dragged to any position on the page.',
        alignment: 'left',
        variant: 'box',
      }),
    },
    {
      title: 'Responsive Image Block',
      description: 'Single high-impact image asset with SEO alt text, caption, and customizable aspect ratio.',
      icon: <Image className="w-5 h-5 text-neon-lime" />,
      create: () => ({
        _key: generateKey(),
        _type: 'imageBlock',
        badge: 'DATA VISUALIZATION',
        headline: 'Technical Crawl & Indexation Performance',
        alt: 'Shafi SEO Technical Diagnostic Architecture',
        caption: 'Visualized ranking velocity and Core Web Vitals optimization framework.',
        aspectRatio: '16:9',
        maxWidth: 'constrained',
      }),
    },
    {
      title: 'Image with Text (Split Layout)',
      description: 'Side-by-side layout with responsive image on left or right, headline, copy, and action button.',
      icon: <Layout className="w-5 h-5 text-neon-lime" />,
      create: () => ({
        _key: generateKey(),
        _type: 'imageWithTextBlock',
        badge: 'FIELD METHODOLOGY',
        headline: 'Precision Auditing That Discovers Hidden Bottlenecks',
        text: 'Every engagement begins with systematic code-level inspection. We resolve rendering defects, JavaScript hydration delays, and canonical confusion.',
        alt: 'Technical SEO Analysis Inspection',
        imagePosition: 'right',
        ctaLabel: 'Request Free Diagnostic Review',
        ctaAction: 'drawer',
      }),
    },
    {
      title: 'High-Conversion CTA Block',
      description: 'Brutalist neon-accented call-to-action banner with direct WhatsApp or consultation drawer triggers.',
      icon: <Sparkles className="w-5 h-5 text-neon-lime" />,
      create: () => ({
        _key: generateKey(),
        _type: 'ctaBlock',
        badge: 'TAKE DIRECT ACTION',
        headline: 'Stop Losing Qualified High-Intent Organic Leads',
        description: 'Direct engagement with Shafi. We review your crawl health, search rankings, and keyword opportunities.',
        buttonText: 'Book Technical SEO Consultation',
        buttonAction: 'drawer',
      }),
    },
    {
      title: 'Rich-Text Content Block',
      description: 'Multi-paragraph editorial block supporting subheadings, blockquotes, and ordered lists.',
      icon: <FileText className="w-5 h-5 text-neon-lime" />,
      create: () => ({
        _key: generateKey(),
        _type: 'richTextBlock',
        badge: 'DEEP DIVE',
        headline: 'Algorithmic Search Visibility in 2026',
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Modern SEO is no longer about keyword stuffing or superficial backlinks. Search engines prioritize semantic authority, technical infrastructure, and genuine user intent satisfaction.',
              },
            ],
          },
        ],
      }),
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add Section Block"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-dark-bg border-2 border-neon-lime/40 p-6 md:p-8 shadow-[0_0_50px_rgba(235,251,29,0.15)] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-neon-lime text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
              Elementor-Style Visual Page Builder
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Insert Section Block (Position {insertIndex + 1})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {templates.map((tpl, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                onInsert(tpl.create());
                onClose();
              }}
              className="flex items-start gap-4 p-4 text-left bg-dark-card border border-white/10 hover:border-neon-lime/60 hover:bg-white/5 transition-all duration-200 group"
            >
              <div className="p-2.5 rounded bg-white/5 border border-white/10 group-hover:border-neon-lime/40">
                {tpl.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-base group-hover:text-neon-lime transition-colors flex items-center justify-between">
                  <span>{tpl.title}</span>
                  <span className="text-xs font-mono text-neon-lime opacity-0 group-hover:opacity-100 transition-opacity">
                    + Insert &rarr;
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
          <span>Protected site components (Header, Audio, Footer) remain untouched.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
