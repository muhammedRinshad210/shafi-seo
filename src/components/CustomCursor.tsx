import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for mouse/fine pointers
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnterInteractive = () => setIsHovered(true);
    const onMouseLeaveInteractive = () => setIsHovered(false);

    // Smooth Lerp loop
    const loop = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    // Attach listeners to interactive elements
    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="tab"]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    attachHoverListeners();

    // Observe DOM mutations to attach to new elements
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="cursor_wrap"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      aria-hidden="true"
    >
      <div className={`cursor ${isHovered ? 'is-hover' : ''}`}>
        <div className="cursor_line_top"></div>
        <div className="cursor_line_bottom"></div>
        <div className="cursor_line_left"></div>
        <div className="cursor_line_right"></div>
        <div className="cursor_dot"></div>
      </div>
    </div>
  );
};
