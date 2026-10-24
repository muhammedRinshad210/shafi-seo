import React, { useState, useEffect } from 'react';
import { ambientAudio } from '../utils/ambientAudio';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Subscribe to real audio state from singleton manager
    const unsubscribe = ambientAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = async () => {
    await ambientAudio.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      className={`audio_wrap ${isPlaying ? 'is-active' : ''}`}
      aria-label={isPlaying ? 'Disable ambient sound' : 'Enable ambient sound'}
      title={isPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
    >
      <div className="audio_visual">
        <div className={`audio_bar ${isPlaying ? 'anim-bar-1' : ''}`}></div>
        <div className={`audio_bar ${isPlaying ? 'anim-bar-2' : ''}`}></div>
        <div className={`audio_bar ${isPlaying ? 'anim-bar-3' : ''}`}></div>
        <div className={`audio_bar ${isPlaying ? 'anim-bar-4' : ''}`}></div>
      </div>
      <div className="audio_text">
        <span className="audio_label">AUDIO:</span>
        <span className={`audio_state ${isPlaying ? 'text-accent' : ''}`}>
          {isPlaying ? 'ON' : 'OFF'}
        </span>
      </div>
    </button>
  );
};
