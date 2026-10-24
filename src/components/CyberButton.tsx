import React from 'react';
import { ScrambleText } from './ScrambleText';

interface CyberButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  label,
  onClick,
  href,
  className = '',
  size = 'md',
  type = 'button',
  icon
}) => {
  const content = (
    <div className={`btn_main_wrap ${size === 'sm' ? 'btn-sm' : ''} ${className}`}>
      {/* SVG Angled Notch Frame */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 156 50"
        fill="none"
        preserveAspectRatio="none"
        className="btn_frame"
      >
        <path
          d="M155 47V15.8247C155 15.2965 154.791 14.7897 154.419 14.415L141.675 1.59025C141.299 1.21245 140.789 1 140.256 1H3C1.89543 1 1 1.89543 1 3V34.1753C1 34.7035 1.20899 35.2103 1.58133 35.585L14.3254 48.4097C14.7008 48.7876 15.2115 49 15.7441 49H153C154.105 49 155 48.1046 155 47Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M6 1H3C1.89543 1 1 1.89543 1 3V6" stroke="var(--accent)" strokeWidth="2" />
        <path d="M150 49L153 49C154.105 49 155 48.1046 155 47L155 44" stroke="var(--accent)" strokeWidth="2" />
        <path d="M136 1H140.262C140.792 1 141.301 1.21071 141.676 1.58579L144.59 4.5" stroke="var(--accent)" strokeWidth="2" />
        <path d="M20 49H15.7384C15.208 49 14.6993 48.7893 14.3242 48.4142L11.41 45.5" stroke="var(--accent)" strokeWidth="2" />
      </svg>

      <div className="btn_inner">
        <span className="btn_label">
          <ScrambleText text={label} />
        </span>
        {icon && <span className="btn_icon">{icon}</span>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="cyber-btn-link">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="cyber-btn-button">
      {content}
    </button>
  );
};
