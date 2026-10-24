/**
 * Ambient Audio Manager for Shafi SEO Platform
 * Generates a warm, subtle, multi-frequency cyber-ambient atmosphere
 * using Web Audio API that remains audible across phones, laptops, and desktops.
 */

type AudioStateListener = (isPlaying: boolean) => void;

class AmbientAudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isAudioPlaying: boolean = false;
  private isTransitioning: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isAudioPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(isPlaying: boolean) {
    this.isAudioPlaying = isPlaying;
    this.listeners.forEach((listener) => listener(isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isAudioPlaying;
  }

  public async start(): Promise<boolean> {
    if (this.isAudioPlaying || this.isTransitioning) return true;
    this.isTransitioning = true;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) {
        this.isTransitioning = false;
        return false;
      }

      if (!this.ctx || this.ctx.state === 'closed') {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Master output gain
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      // Warm low-pass filter to eliminate harsh high frequencies
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(1.2, now);
      filter.connect(master);
      this.filter = filter;

      // LFO for subtle breathing modulation (8-second cycle)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.125, now);
      lfoGain.gain.setValueAtTime(160, now); // Modulates filter ±160Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.lfo = lfo;
      this.lfoGain = lfoGain;

      // Harmonic 1: Warm fundamental at G3 (196 Hz)
      const osc1 = this.ctx.createOscillator();
      const osc1Gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(196, now);
      osc1Gain.gain.setValueAtTime(0.65, now);
      osc1.connect(osc1Gain);
      osc1Gain.connect(filter);
      osc1.start(now);
      this.osc1 = osc1;

      // Harmonic 2: Soft triangle fifth at D4 (293.66 Hz) for audible presence
      const osc2 = this.ctx.createOscillator();
      const osc2Gain = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(293.66, now);
      osc2Gain.gain.setValueAtTime(0.35, now);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      osc2.start(now);
      this.osc2 = osc2;

      // Smooth fade-in to audible, gentle volume
      master.gain.exponentialRampToValueAtTime(0.14, now + 1.2);

      this.notify(true);
      this.isTransitioning = false;
      return true;
    } catch (err) {
      console.warn('Audio start failed or blocked by browser policy:', err);
      this.cleanupNodes();
      this.notify(false);
      this.isTransitioning = false;
      return false;
    }
  }

  public stop(): void {
    if (!this.isAudioPlaying && !this.isTransitioning) return;
    this.isTransitioning = true;

    if (this.masterGain && this.ctx && this.ctx.state !== 'closed') {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);

      setTimeout(() => {
        this.cleanupNodes();
        this.notify(false);
        this.isTransitioning = false;
      }, 380);
    } else {
      this.cleanupNodes();
      this.notify(false);
      this.isTransitioning = false;
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isAudioPlaying) {
      this.stop();
      return false;
    } else {
      return await this.start();
    }
  }

  private cleanupNodes() {
    try {
      this.osc1?.stop();
      this.osc1?.disconnect();
      this.osc2?.stop();
      this.osc2?.disconnect();
      this.lfo?.stop();
      this.lfo?.disconnect();
      this.lfoGain?.disconnect();
      this.filter?.disconnect();
      this.masterGain?.disconnect();
    } catch {
      // Ignore cleanup errors on stopped nodes
    }
    this.osc1 = null;
    this.osc2 = null;
    this.lfo = null;
    this.lfoGain = null;
    this.filter = null;
    this.masterGain = null;
  }
}

export const ambientAudio = new AmbientAudioManager();
