import React, { useState } from 'react';
import { Eye, ExternalLink, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface VisualEditorBadgeProps {
  sectionsCount: number;
}

export const VisualEditorBadge: React.FC<VisualEditorBadgeProps> = ({ sectionsCount }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      aria-label="Visual Builder Preview Mode"
      className="fixed bottom-4 right-4 z-50 font-mono text-xs select-none max-w-sm"
    >
      <div className="bg-dark-bg/95 border-2 border-neon-lime/80 shadow-[0_0_30px_rgba(235,251,29,0.25)] p-3 text-white backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-lime" />
            </span>
            <span className="font-extrabold text-neon-lime uppercase tracking-wider text-[11px]">
              Visual Editor Active
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title={isExpanded ? 'Collapse helper' : 'Expand helper'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2.5 pt-2.5 border-t border-white/15 space-y-2 text-[11px] text-white/80">
            <div className="flex items-center justify-between text-white/60">
              <span>Configured Sections:</span>
              <span className="text-neon-lime font-bold">{sectionsCount} Blocks</span>
            </div>

            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime shrink-0 mt-0.5" />
                <span>Hover any block to move up/down or edit in Studio</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime shrink-0 mt-0.5" />
                <span>Click &ldquo;+ Add Section Block&rdquo; to insert new blocks</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime shrink-0 mt-0.5" />
                <span>Site header, audio & footer protected from deletion</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <a
                href="https://shafi-seo.sanity.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neon-lime hover:underline font-bold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Sanity Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
