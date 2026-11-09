import React, { useState, useEffect, useRef } from 'react';
import { Radio, Volume2, VolumeX, MessageSquare, Mic, Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface WalkieTalkieProps {
  currentChapterId?: string;
  onJumpToChapter?: (chapterId: string) => void;
}

interface ChannelData {
  frequency: string;
  name: string;
  chapterId: string;
  dispatch: string;
  lore: string;
  techTip: string;
}

const CHANNELS: ChannelData[] = [
  {
    frequency: '108.5',
    name: 'Horizon Cloud Station',
    chapterId: 'chapter-horizon',
    dispatch: 'Pavithra here at Horizon! We just finished sanitizing another multi-gigabyte POS batch from Five Below & Hobby Lobby. Ingestion queue latency is rock-solid under 80ms.',
    lore: 'Handled multi-million row retail datasets across 4 major US partners with zero data loss.',
    techTip: 'Pro-tip: Multi-column composite B-Tree indexes + partitioned tables prevent full table scans when processing millions of records.'
  },
  {
    frequency: '104.2',
    name: 'Digisa Atelier',
    chapterId: 'chapter-digisa',
    dispatch: 'At the Digisa workshop! Rolling out the Eheliyagoda Pharmacy ERP. Sub-second receipt printing and automated batch expiry tracking are live.',
    lore: 'Delivered 5+ full-lifecycle web apps with a 100% on-time deployment track record.',
    techTip: 'Keep your relational schemas normalized up to 3NF for ACID transaction integrity, and use indexed read-replicas for heavy reporting.'
  },
  {
    frequency: '101.9',
    name: 'XESS Studio Relay',
    chapterId: 'chapter-xess',
    dispatch: 'Testing mobile breakpoints across 8 device form factors! Every layout shift is tuned to 0 and Lighthouse performance sits at 99.',
    lore: 'Crafted mobile-first web platforms for Indra Group Global, MercUK, and Country Life.',
    techTip: 'Always leverage CSS content-visibility: auto for off-screen diorama nodes to maintain silky 60fps scrolling.'
  },
  {
    frequency: '97.4',
    name: 'CreativeHub Uplink',
    chapterId: 'chapter-creativehub',
    dispatch: 'Broadcasting from the headless CMS lab! GraphQL resolvers are trimmed down to sub-100ms response gates for the Resonate ecosystem.',
    lore: 'Built decoupled headless microservices using Strapi, Node.js, and GraphQL.',
    techTip: 'Avoid N+1 queries in GraphQL by bundling data loaders for batched relational fetching.'
  },
  {
    frequency: '92.1',
    name: 'SLIIT Citadel Base',
    chapterId: 'chapter-sliit',
    dispatch: 'Academic roots frequency! Refining distributed systems calculus and MSc research in enterprise software scalability.',
    lore: 'BSc (Hons) in Information Technology + MSc candidate in Enterprise Architecture.',
    techTip: 'Algorithms, indexing theory, and data structures never expire; tools change, but fundamental computer science endures.'
  }
];

export const WalkieTalkie: React.FC<WalkieTalkieProps> = ({ currentChapterId, onJumpToChapter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [channelIndex, setChannelIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'lore' | 'tip'>('dispatch');
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');

  // Audio Context Ref for synthesized retro Walkie-Talkie sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentChannel = CHANNELS[channelIndex];

  // Play retro radio squelch & roger beep
  const playSquelchSound = () => {
    if (isMuted) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Radio static noise burst
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();

      // Double Roger Beep (retro walkie-talkie signature chirp)
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const bGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1480, ctx.currentTime);
        osc.frequency.setValueAtTime(1920, ctx.currentTime + 0.04);

        bGain.gain.setValueAtTime(0.04, ctx.currentTime);
        bGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

        osc.connect(bGain);
        bGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }, 70);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Sync channel when user scrolls to a chapter
  useEffect(() => {
    if (currentChapterId) {
      const foundIdx = CHANNELS.findIndex((c) => c.chapterId === currentChapterId);
      if (foundIdx !== -1 && foundIdx !== channelIndex) {
        setChannelIndex(foundIdx);
      }
    }
  }, [currentChapterId]);

  // Update text based on current tab & channel
  useEffect(() => {
    let msg = currentChannel.dispatch;
    if (activeTab === 'lore') msg = currentChannel.lore;
    if (activeTab === 'tip') msg = currentChannel.techTip;
    setReceivedMessage(msg);
  }, [channelIndex, activeTab]);

  // Typewriter effect for Walkie-Talkie screen
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (index < receivedMessage.length) {
        setDisplayedText(receivedMessage.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [receivedMessage]);

  const handleTuneNext = () => {
    playSquelchSound();
    const nextIdx = (channelIndex + 1) % CHANNELS.length;
    setChannelIndex(nextIdx);
    if (onJumpToChapter) {
      onJumpToChapter(CHANNELS[nextIdx].chapterId);
    }
  };

  const handleTunePrev = () => {
    playSquelchSound();
    const prevIdx = (channelIndex - 1 + CHANNELS.length) % CHANNELS.length;
    setChannelIndex(prevIdx);
    if (onJumpToChapter) {
      onJumpToChapter(CHANNELS[prevIdx].chapterId);
    }
  };

  const handleTransmit = () => {
    setIsTransmitting(true);
    playSquelchSound();
    setDisplayedText('...TRANSMITTING SIGNAL ACROSS STATIONS...');
    setTimeout(() => {
      setIsTransmitting(false);
      setDisplayedText(`[ACKNOWLEDGED]: "Signal loud and clear on ${currentChannel.frequency} MHz! Ready for engineering collaboration." - Pavithra`);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Walkie-Talkie Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-[#fdfbf7] dark:bg-[#111827] border-2 border-stone-300 dark:border-stone-700 shadow-2xl p-4 text-stone-800 dark:text-stone-100 transition-all duration-300">
          {/* Top Antenna & Housing Details */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              {/* Antenna graphic */}
              <div className="w-1.5 h-6 bg-stone-400 dark:bg-stone-600 rounded-t-full relative">
                <span className="absolute -top-1 -left-1 w-3.5 h-1.5 bg-amber-600 dark:bg-teal-400 rounded-full animate-ping" />
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-teal-300">
                  Walkie-Talkie Transceiver
                </h4>
                <p className="text-[10px] font-mono text-stone-500">Pavithra's Comm Relay • V.26</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted(!isMuted)}
                type="button"
                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                title={isMuted ? 'Unmute static audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-teal-400" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 transition-colors"
                title="Dock Walkie-Talkie"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Retro LCD Screen */}
          <div className="my-3 p-3 rounded-2xl bg-[#283618] dark:bg-[#07130f] border-2 border-[#606c38] dark:border-teal-900 shadow-inner text-[#d4e09b] dark:text-[#5eead4] font-mono">
            <div className="flex items-center justify-between text-[11px] font-bold border-b border-[#606c38]/40 pb-1 mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CH-0{channelIndex + 1}
              </span>
              <span className="text-amber-300 dark:text-teal-300 tracking-wider">
                {currentChannel.frequency} MHz
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#94d2bd]">RX ON</span>
            </div>

            <p className="text-xs leading-relaxed min-h-[72px] font-mono">
              {displayedText}
              <span className="animate-pulse">_</span>
            </p>
          </div>

          {/* Channel Selector Rotary Knobs */}
          <div className="flex items-center justify-between gap-2 px-1 mb-3">
            <button
              onClick={handleTunePrev}
              type="button"
              className="flex-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-mono font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>◄ Prev Freq</span>
            </button>

            <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 px-1 truncate max-w-[120px]">
              {currentChannel.name}
            </span>

            <button
              onClick={handleTuneNext}
              type="button"
              className="flex-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-mono font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Next Freq ►</span>
            </button>
          </div>

          {/* Mode Tabs: Voice Dispatch, Engineering Lore, Pro-Tip */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-800/60 mb-3 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab('dispatch')}
              className={`py-1 rounded-lg font-bold transition-all ${
                activeTab === 'dispatch'
                  ? 'bg-white dark:bg-stone-700 text-amber-900 dark:text-teal-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Dispatch
            </button>
            <button
              onClick={() => setActiveTab('lore')}
              className={`py-1 rounded-lg font-bold transition-all ${
                activeTab === 'lore'
                  ? 'bg-white dark:bg-stone-700 text-amber-900 dark:text-teal-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Career Lore
            </button>
            <button
              onClick={() => setActiveTab('tip')}
              className={`py-1 rounded-lg font-bold transition-all ${
                activeTab === 'tip'
                  ? 'bg-white dark:bg-stone-700 text-amber-900 dark:text-teal-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Tech Secret
            </button>
          </div>

          {/* Push-to-Talk / Transmit Button */}
          <button
            onClick={handleTransmit}
            disabled={isTransmitting}
            type="button"
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-700 to-rose-700 hover:from-amber-800 hover:to-rose-800 dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-500 dark:hover:to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Mic className={`w-4 h-4 ${isTransmitting ? 'animate-bounce text-yellow-300' : ''}`} />
            <span>{isTransmitting ? 'Transmitting Audio...' : 'PUSH TO TALK (TRANSMIT)'}</span>
          </button>
        </div>
      )}

      {/* Docked Floating Walkie-Talkie Badge */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          playSquelchSound();
        }}
        type="button"
        aria-label="Toggle Walkie-Talkie Transceiver"
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#fffdf9] dark:bg-stone-900 border-2 border-amber-600/80 dark:border-teal-500/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600 dark:bg-teal-400" />
        </span>

        <Radio className="w-4 h-4 text-amber-700 dark:text-teal-400 group-hover:rotate-12 transition-transform" />
        <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
          Walkie-Talkie <span className="text-amber-700 dark:text-teal-400">{currentChannel.frequency} MHz</span>
        </span>

        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-stone-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-stone-400 group-hover:-translate-y-0.5 transition-transform" />
        )}
      </button>
    </div>
  );
};

