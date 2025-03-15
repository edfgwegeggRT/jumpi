// Sound data in base64 format
import { jumpSound } from '@/assets/audio/jump';
import { coinSound } from '@/assets/audio/coin';
import { deathSound } from '@/assets/audio/death';
import { powerupSound } from '@/assets/audio/powerup';
import { levelCompleteSound } from '@/assets/audio/levelComplete';
import { backgroundMusic } from '@/assets/audio/background';
import { enemyDefeatSound } from '@/assets/audio/enemyDefeat';
import { selectSound } from '@/assets/audio/select';
import { gameOverSound } from '@/assets/audio/gameOver';
import { damageSound } from '@/assets/audio/damage';

class AudioManager {
  private context: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private music: AudioBuffer | null = null;
  private musicSource: AudioBufferSourceNode | null = null;
  private isMuted: boolean = false;
  
  constructor() {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!this.context) {
        this.context = new AudioContext();
        this.loadSounds();
      }
      
      // Remove event listeners after first interaction
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    
    // Add a global mute toggle listener (M key)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        this.toggleMute();
      }
    });
  }
  
  private async loadSounds(): Promise<void> {
    if (!this.context) return;
    
    // Decode sound data
    try {
      this.sounds.set('jump', await this.decodeAudioData(jumpSound));
      this.sounds.set('coin', await this.decodeAudioData(coinSound));
      this.sounds.set('death', await this.decodeAudioData(deathSound));
      this.sounds.set('powerup', await this.decodeAudioData(powerupSound));
      this.sounds.set('levelComplete', await this.decodeAudioData(levelCompleteSound));
      this.sounds.set('enemyDefeat', await this.decodeAudioData(enemyDefeatSound));
      this.sounds.set('select', await this.decodeAudioData(selectSound));
      this.sounds.set('gameOver', await this.decodeAudioData(gameOverSound));
      this.sounds.set('damage', await this.decodeAudioData(damageSound));
      
      // Load music
      this.music = await this.decodeAudioData(backgroundMusic);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }
  
  private async decodeAudioData(base64Data: string): Promise<AudioBuffer> {
    if (!this.context) throw new Error('Audio context not initialized');
    
    // Convert base64 to array buffer
    const data = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < data.length; i++) {
      view[i] = data.charCodeAt(i);
    }
    
    // Decode audio data
    return await this.context.decodeAudioData(arrayBuffer);
  }
  
  playSound(name: string): void {
    if (!this.context || this.isMuted) return;
    
    const buffer = this.sounds.get(name);
    if (!buffer) {
      console.warn(`Sound '${name}' not found`);
      return;
    }
    
    // Create source and connect to output
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    
    // Add a low-pass filter for 8-bit effect
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    source.connect(filter);
    filter.connect(this.context.destination);
    
    source.start();
  }
  
  playBackgroundMusic(): void {
    if (!this.context || !this.music || this.musicSource || this.isMuted) return;
    
    // Create source and connect to output
    this.musicSource = this.context.createBufferSource();
    this.musicSource.buffer = this.music;
    this.musicSource.loop = true;
    
    // Add a low-pass filter for 8-bit effect
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    this.musicSource.connect(filter);
    
    // Add a gain node to control volume
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.3; // Lower volume for background music
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    this.musicSource.start();
  }
  
  stopBackgroundMusic(): void {
    if (this.musicSource) {
      try {
        this.musicSource.stop();
      } catch (e) {
        // Ignore errors when stopping
      }
      this.musicSource = null;
    }
  }
  
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.stopBackgroundMusic();
    } else {
      this.playBackgroundMusic();
    }
  }
}

// Export a singleton instance
export const audioManager = new AudioManager();

// Make the audio manager globally accessible for debugging
(window as any).audioManager = audioManager;
