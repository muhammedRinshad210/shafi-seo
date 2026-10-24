import React from 'react';

interface CornerNotchProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const CornerNotch: React.FC<CornerNotchProps> = ({ position = 'top-left' }) => {
  return (
    <div className={`corner-notch-item notch-${position}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path opacity="0.35" d="M1 1L13 13M7 7L13 1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
