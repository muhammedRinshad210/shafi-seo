import React, { useState } from 'react';
import type { PageSectionBlock } from '../types';
import { ArrowUp, ArrowDown, GripVertical, Plus, Trash2, Edit3 } from 'lucide-react';
import { sendStudioFocus, createDataAttribute } from '../lib/visualEditing';
import { AddBlockModal } from './AddBlockModal';

interface VisualSectionWrapperProps {
  section: PageSectionBlock;
  index: number;
  totalSections: number;
  isVisualEditing: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
  onInsertAfter: (block: PageSectionBlock, index: number) => void;
  children: React.ReactNode;
}

const sectionTypeLabels: Record<string, string> = {
  heroBlock: 'HERO SECTION',
  headingTextBlock: 'HEADING & TEXT BLOCK',
  richTextBlock: 'RICH-TEXT BLOCK',
  imageBlock: 'IMAGE BLOCK',
  imageWithTextBlock: 'IMAGE WITH TEXT',
  ctaBlock: 'CALL-TO-ACTION (CTA)',
  servicesBlock: 'SEO SERVICES GRID',
  projectsBlock: 'CASE STUDIES GRID',
  processBlock: 'SEO PROCESS & PROTOCOL',
  trustBlock: 'TRUST & COMPARISON',
  faqBlock: 'BUYER FAQ ACCORDION',
  insightsBlock: 'INSIGHTS & FIELD GUIDES',
  contactBlock: 'INQUIRY & CONTACT',
};

export const VisualSectionWrapper: React.FC<VisualSectionWrapperProps> = ({
  section,
  index,
  totalSections,
  isVisualEditing,
  onMoveUp,
  onMoveDown,
  onRemove,
  onInsertAfter,
  children,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisualEditing) {
    return <>{children}</>;
  }

  const label = sectionTypeLabels[section._type] || section._type.toUpperCase();
  const isCoreSection = section._type === 'heroBlock' || section._type === 'contactBlock';

  const attr = createDataAttribute({
    id: 'homePage',
    type: 'page',
    path: `sections[_key=="${section._key}"]`,
  });

  const handleEditInStudio = () => {
    sendStudioFocus({
      id: 'homePage',
      type: 'page',
      path: `sections[_key=="${section._key}"]`,
    });
  };

  return (
    <div
      className={`relative visual-builder-section-wrapper transition-all duration-200 ${
        isHovered
          ? 'outline outline-2 outline-neon-lime/80 shadow-[0_0_20px_rgba(235,251,29,0.15)]'
          : 'hover:outline hover:outline-1 hover:outline-neon-lime/40'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-sanity={attr.toString()}
    >
      {/* Elementor-Style Floating Section Header Toolbar */}
      <div className="absolute top-2 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-dark-bg/95 border border-neon-lime/60 backdrop-blur-md text-xs font-mono shadow-lg">
          <GripVertical className="w-3.5 h-3.5 text-neon-lime/80 cursor-grab active:cursor-grabbing" />
          <span className="text-neon-lime font-bold">
            [{index + 1}/{totalSections}]
          </span>
          <span className="text-white font-semibold tracking-wider uppercase">{label}</span>
          {isCoreSection && (
            <span className="text-[10px] text-white/50 px-1.5 py-0.5 bg-white/10 ml-1">
              CORE
            </span>
          )}
        </div>

        {/* Section Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-dark-bg/95 border border-neon-lime/60 backdrop-blur-md shadow-lg">
          {/* Accessible Move Up Button */}
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            title="Move Section Up"
            aria-label={`Move ${label} Up`}
            className="p-1.5 text-white/80 hover:text-neon-lime hover:bg-white/10 disabled:opacity-30 disabled:hover:text-white/80 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

          {/* Accessible Move Down Button */}
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={index === totalSections - 1}
            title="Move Section Down"
            aria-label={`Move ${label} Down`}
            className="p-1.5 text-white/80 hover:text-neon-lime hover:bg-white/10 disabled:opacity-30 disabled:hover:text-white/80 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </button>

          {/* Focus in Sanity Studio Button */}
          <button
            type="button"
            onClick={handleEditInStudio}
            title="Edit Section in Sanity Studio"
            aria-label={`Edit ${label} in Sanity Studio`}
            className="p-1.5 text-neon-lime hover:bg-neon-lime/20 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Remove Custom Block Button */}
          {!isCoreSection && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              title="Remove Section Block"
              aria-label={`Remove ${label}`}
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Actual Rendered Block */}
      <div className="relative">{children}</div>

      {/* Elementor-Style Insertion Divider Bar Between Sections */}
      <div className="relative z-30 py-3 flex items-center justify-center group/adder">
        <div className="absolute inset-x-0 h-px bg-neon-lime/20 group-hover/adder:bg-neon-lime/60 transition-colors" />
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="relative px-3 py-1 bg-dark-bg border border-neon-lime/40 group-hover/adder:border-neon-lime group-hover/adder:bg-neon-lime text-white group-hover/adder:text-dark-bg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section Block</span>
        </button>
      </div>

      {/* Add Block Modal */}
      <AddBlockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        insertIndex={index + 1}
        onInsert={(newBlock) => onInsertAfter(newBlock, index + 1)}
      />
    </div>
  );
};
