import React, { useState, useRef, useEffect } from 'react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start subtle ambient tone
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz soothing drone

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5); // Very soft

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlaying(true);
      } catch (e) {
        console.warn('Audio not allowed or supported', e);
      }
    } else {
      // Stop
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
        setTimeout(() => {
          oscRef.current?.stop();
          audioCtxRef.current?.close();
          setIsPlaying(false);
        }, 350);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      oscRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
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
