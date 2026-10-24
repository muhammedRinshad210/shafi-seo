import React from 'react';

interface SectionDividerProps {
  className?: string;
  inverted?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', inverted = false }) => {
  return (
    <div className={`section_divider_wrapper ${inverted ? 'divider-inverted' : ''} ${className}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4350 200"
        fill="none"
        preserveAspectRatio="none"
        className="divider_main_svg"
      >
        <path
          d="M0 0H50V50H100V100H250V50H350V100H450V1H500V51H550V100H600V150H700V100H750V50H900V100H950V150H1050V100H1100V150H1150V200H0V0Z"
          fill="currentColor"
        />
        <path
          d="M1450 0H1500V50H1550V100H1700V50H1800V100H1900V1H1950V51H2000V100H2050V150H2150V100H2200V50H2350V100H2400V150H2500V100H2550V150H2600V200H1400V100H1450V0Z"
          fill="currentColor"
        />
        <path
          d="M2950 0H2900V100H2850V200H4050V150H4000V100H3950V150H3850V100H3800V50H3650V100H3600V150H3500V100H3450V51H3400V1H3350V100H3250V50H3150V100H3000V50H2950V0Z"
          fill="currentColor"
        />
        <path d="M1300 150H1350V200H1300V150Z" fill="currentColor" />
        <path d="M2800 150H2750V200H2800V150Z" fill="currentColor" />
        <path d="M4200 150H4250V200H4200V150Z" fill="currentColor" />
        <path d="M4300 200H4350V100H4300V200Z" fill="currentColor" />
      </svg>
    </div>
  );
};
