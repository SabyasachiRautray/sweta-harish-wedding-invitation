import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { Music, VolumeX, Sparkles } from "lucide-react";

/**
 * Soft Indian Wedding Instrumental Music Sources (Royalty-free Shehnai / Sitar / Flute streams)
 */
const AUDIO_SOURCES = [
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a14b30.mp3",
  "https://assets.mixkit.co/music/preview/mixkit-indian-feast-725.mp3"
];

/**
 * Web Audio API Fallback: Synthesizes a soft, romantic Indian wedding Sitar & Tanpura Raga (Yaman)
 * Used when network audio is unavailable or blocked.
 */
function createIndianWeddingSynth(audioContext) {
  const baseFreq = 261.63; // C4 Sa
  const scale = [1, 9 / 8, 5 / 4, 45 / 32, 3 / 2, 27 / 16, 15 / 8, 2];

  const melody = [
    { note: 3, dur: 0.8 }, // Ma#
    { note: 4, dur: 0.6 }, // Pa
    { note: 5, dur: 0.8 }, // Dha
    { note: 6, dur: 0.6 }, // Ni
    { note: 7, dur: 1.2 }, // Sa'
    { note: -1, dur: 0.4 },
    { note: 7, dur: 0.6 },
    { note: 6, dur: 0.5 },
    { note: 5, dur: 0.7 },
    { note: 4, dur: 0.6 },
    { note: 3, dur: 0.9 },
    { note: -1, dur: 0.4 },
    { note: 2, dur: 0.7 },
    { note: 3, dur: 0.5 },
    { note: 4, dur: 0.8 },
    { note: 2, dur: 0.6 },
    { note: 1, dur: 0.7 },
    { note: 0, dur: 1.4 },
    { note: -1, dur: 0.6 },
  ];

  function createTanpuraDrone(ctx, masterGain) {
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.05;
    droneGain.connect(masterGain);

    const sa = ctx.createOscillator();
    sa.type = "sine";
    sa.frequency.value = baseFreq * 0.5;
    sa.connect(droneGain);

    const pa = ctx.createOscillator();
    pa.type = "sine";
    pa.frequency.value = baseFreq * 0.75;
    pa.connect(droneGain);

    return { oscillators: [sa, pa] };
  }

  function playSitarNote(ctx, freq, startTime, duration, masterGain) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq * 0.98, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq, startTime + 0.08);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.04, startTime + duration * 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  return { scale, melody, baseFreq, createTanpuraDrone, playSitarNote };
}

const MusicToggle = ({ autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynthFallback, setUseSynthFallback] = useState(false);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Web Audio Fallback Refs
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const synthOscsRef = useRef([]);
  const synthTimerRef = useRef(null);

  // Initialize HTML5 Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.volume = 0; // Start muted for smooth fade-in
    audio.src = AUDIO_SOURCES[0];

    audio.onerror = () => {
      console.warn("HTML5 audio failed to load, switching to Indian Wedding Synth Fallback");
      setUseSynthFallback(true);
    };

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Stop Synthesizer Fallback Audio
  const stopSynth = useCallback(() => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    synthOscsRef.current.forEach((osc) => {
      try { osc.stop(); } catch (e) {}
    });
    synthOscsRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  // Start Synthesizer Fallback Audio
  const startSynth = useCallback(() => {
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.35;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const synth = createIndianWeddingSynth(ctx);
      const drone = synth.createTanpuraDrone(ctx, masterGain);
      drone.oscillators.forEach((osc) => osc.start(ctx.currentTime));
      synthOscsRef.current = drone.oscillators;

      let noteIdx = 0;
      function step() {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        const noteData = synth.melody[noteIdx % synth.melody.length];
        if (noteData.note >= 0) {
          const freq = synth.baseFreq * synth.scale[noteData.note];
          synth.playSitarNote(ctx, freq, ctx.currentTime, noteData.dur, masterGain);
        }
        noteIdx++;
        synthTimerRef.current = setTimeout(step, noteData.dur * 1000);
      }
      step();
    } catch (err) {
      console.error("Web Audio Synth error:", err);
    }
  }, []);

  // Fade In Audio
  const fadeIn = useCallback((targetVol = 0.35) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    const step = targetVol / 20;

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < targetVol) {
        audioRef.current.volume = Math.min(targetVol, audioRef.current.volume + step);
      } else {
        clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  }, []);

  // Fade Out Audio
  const fadeOut = useCallback((onComplete) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (!audioRef.current) {
      if (onComplete) onComplete();
      return;
    }

    const step = audioRef.current.volume / 15;

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.02) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - step);
      } else {
        if (audioRef.current) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
        }
        clearInterval(fadeIntervalRef.current);
        if (onComplete) onComplete();
      }
    }, 40);
  }, []);

  // Play Music Function
  const playMusic = useCallback(() => {
    if (useSynthFallback) {
      startSynth();
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          fadeIn(0.35);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked or failed, attempting synth fallback:", err);
          setUseSynthFallback(true);
          startSynth();
          setIsPlaying(true);
        });
    }
  }, [useSynthFallback, startSynth, fadeIn]);

  // Pause Music Function
  const pauseMusic = useCallback(() => {
    if (useSynthFallback) {
      stopSynth();
      setIsPlaying(false);
      return;
    }

    fadeOut(() => {
      setIsPlaying(false);
    });
  }, [useSynthFallback, stopSynth, fadeOut]);

  // Toggle Play / Pause
  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, playMusic, pauseMusic]);

  // AutoPlay trigger on mount / envelope open
  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        playMusic();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, playMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynth();
    };
  }, [stopSynth]);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      {/* Sound Waves & Label visible when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full shadow-md backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              border: "1.5px solid rgba(212, 175, 55, 0.6)",
              boxShadow: "0 4px 15px rgba(128, 0, 0, 0.12)",
            }}
          >
            {/* Animated Equalizer Sound Bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              {[0.4, 0.8, 0.5, 0.9].map((delay, idx) => (
                <motion.span
                  key={idx}
                  className="w-1 rounded-full"
                  style={{ backgroundColor: "#800000" }}
                  animate={{ height: ["20%", "100%", "30%", "80%", "20%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <span
              className="text-xs font-semibold tracking-wide whitespace-nowrap"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#800000" }}
            >
              Wedding Melodies
            </span>

            <Sparkles size={13} color="#D4AF37" className="animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        data-testid={WEDDING.musicToggle}
        onClick={toggleMusic}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden"
        style={{
          backgroundColor: "#800000",
          border: "2px solid #D4AF37",
          boxShadow: "0 6px 20px rgba(128, 0, 0, 0.3)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        aria-label={isPlaying ? "Pause background music" : "Play soft wedding music"}
        title={isPlaying ? "Pause soft wedding music" : "Play soft wedding music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Music size={20} color="#D4AF37" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={20} color="#FDE68A" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Outer Ring when music is NOT playing to invite user click */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #D4AF37" }}
            animate={{ scale: [1, 1.45, 1.45], opacity: [0.7, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default MusicToggle;
