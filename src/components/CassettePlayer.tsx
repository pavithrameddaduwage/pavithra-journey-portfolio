import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc, Radio } from 'lucide-react';
import { CASSETTE_TRACKS } from '../data/portfolioData';

export const CassettePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const track = CASSETTE_TRACKS[currentTrackIndex];

  // Synthesize ambient aesthetic tones using Web Audio API (Zero external mp3 dependencies)
  const startSynthAmbient = (isSideA: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop any existing sound
      stopSynthAmbient();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Chord frequencies: Warm ambient pad
      // Side A (Warm D Major 9th), Side B (Dreamy F# Minor 7th)
      const baseFreqs = isSideA ? [146.83, 220.00, 277.18, 369.99] : [185.00, 220.00, 277.18, 329.63];

      oscillatorRefs.current = baseFreqs.map((freq, idx) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle detune for tape-flutter feel
        osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.3 / baseFreqs.length, ctx.currentTime);

        if (panner) {
          panner.pan.value = (idx / (baseFreqs.length - 1)) * 1.2 - 0.6;
          osc.connect(subGain);
          subGain.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(subGain);
          subGain.connect(masterGain);
        }

        osc.start();
        return osc;
      });
    } catch (e) {
      console.warn("Audio Context init fallback", e);
    }
  };

  const stopSynthAmbient = () => {
    oscillatorRefs.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Ignore already stopped
      }
    });
    oscillatorRefs.current = [];
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthAmbient();
      setIsPlaying(false);
    } else {
      startSynthAmbient(currentTrackIndex === 0);
      setIsPlaying(true);
    }
  };

  const switchSide = () => {
    const nextIdx = currentTrackIndex === 0 ? 1 : 0;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      startSynthAmbient(nextIdx === 0);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthAmbient();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-amber-800/20 dark:border-teal-500/30 bg-[#fffdf9]/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm">
      <button
        onClick={togglePlay}
        type="button"
        aria-label={isPlaying ? "Mute soundtrack" : "Play ambient soundtrack"}
        className="p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors text-amber-800 dark:text-teal-300 cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400" />
        )}
      </button>

      <div className="flex items-center gap-1.5 border-l border-stone-300 dark:border-stone-700 pl-2.5">
        <button
          onClick={switchSide}
          type="button"
          aria-label="Switch Cassette Side"
          className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100/70 dark:bg-stone-800 hover:bg-amber-200/80 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
        >
          <Disc className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>{track.side}</span>
        </button>
        <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 hidden sm:inline max-w-[150px] truncate">
          {track.title}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-stone-300 dark:bg-stone-700'}`} />
      </div>
    </div>
  );
};
