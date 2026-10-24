import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
}

const GLYPHS = '0123456789ABCDEF!@#$%&*<>[]//\\';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  scrambleOnMount = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scrambleOnMount, startScramble]);

  return (
    <span
      className={`scramble-text ${className}`}
      onMouseEnter={startScramble}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
};
