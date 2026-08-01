import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { Music, VolumeX } from "lucide-react";

/**
 * Creates a soft, sitar-inspired Indian melody using Web Audio API.
 * No external files needed — generates audio in the browser.
 */
function createIndianMelody(audioContext) {
  // Indian-inspired pentatonic scale notes (Sa Re Ga Pa Dha pattern)
  // Using Raga Yaman-like ascending phrases
  const baseFreq = 261.63; // C4 = Sa
  const scale = [
    1,        // Sa  (C)
    9 / 8,    // Re  (D)
    5 / 4,    // Ga  (E)
    45 / 32,  // Ma# (F#) — Yaman's tivra Ma
    3 / 2,    // Pa  (G)
    27 / 16,  // Dha (A)
    15 / 8,   // Ni  (B)
    2,        // Sa' (C octave)
  ];

  // Melody pattern — indices into the scale array
  // A gentle, repeating Yaman-inspired phrase
  const melody = [
    // Ascending aaroha
    { note: 3, dur: 0.6 },  // Ma#
    { note: 4, dur: 0.4 },  // Pa
    { note: 5, dur: 0.6 },  // Dha
    { note: 6, dur: 0.4 },  // Ni
    { note: 7, dur: 0.8 },  // Sa'
    { note: -1, dur: 0.3 }, // rest
    // Descending avaroha  
    { note: 7, dur: 0.4 },  // Sa'
    { note: 6, dur: 0.3 },  // Ni
    { note: 5, dur: 0.5 },  // Dha
    { note: 4, dur: 0.4 },  // Pa
    { note: 3, dur: 0.7 },  // Ma#
    { note: -1, dur: 0.3 }, // rest
    // Gentle phrase
    { note: 2, dur: 0.5 },  // Ga
    { note: 3, dur: 0.4 },  // Ma#
    { note: 4, dur: 0.6 },  // Pa
    { note: 3, dur: 0.5 },  // Ma#
    { note: 2, dur: 0.4 },  // Ga
    { note: 1, dur: 0.5 },  // Re
    { note: 0, dur: 0.9 },  // Sa
    { note: -1, dur: 0.5 }, // rest
    // Second phrase
    { note: 4, dur: 0.5 },  // Pa
    { note: 5, dur: 0.4 },  // Dha
    { note: 6, dur: 0.6 },  // Ni
    { note: 7, dur: 0.7 },  // Sa'
    { note: 6, dur: 0.4 },  // Ni
    { note: 5, dur: 0.5 },  // Dha
    { note: 4, dur: 0.6 },  // Pa
    { note: -1, dur: 0.3 }, // rest
    { note: 2, dur: 0.4 },  // Ga
    { note: 1, dur: 0.5 },  // Re
    { note: 0, dur: 1.0 },  // Sa (long hold)
    { note: -1, dur: 0.6 }, // rest
  ];

  // Tanpura drone — constant Sa and Pa
  function createDrone(ctx, masterGain) {
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.06;
    droneGain.connect(masterGain);

    // Sa drone
    const sa = ctx.createOscillator();
    sa.type = "sine";
    sa.frequency.value = baseFreq * 0.5; // Low Sa
    const saGain = ctx.createGain();
    saGain.gain.value = 0.5;
    sa.connect(saGain);
    saGain.connect(droneGain);

    // Pa drone
    const pa = ctx.createOscillator();
    pa.type = "sine";
    pa.frequency.value = baseFreq * 0.75; // Low Pa
    const paGain = ctx.createGain();
    paGain.gain.value = 0.35;
    pa.connect(paGain);
    paGain.connect(droneGain);

    // Add shimmer
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = baseFreq; // Sa octave
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.15;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(droneGain);

    return { oscillators: [sa, pa, shimmer] };
  }

  // Play a single sitar-like note
  function playSitarNote(ctx, freq, startTime, duration, masterGain) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Sitar-like waveform using triangle + harmonics
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);

    // Slight pitch bend (meend) — characteristic of sitar
    osc.frequency.setValueAtTime(freq * 0.98, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq, startTime + 0.08);

    // ADSR envelope — quick attack, gentle decay (plucked string feel)
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.06, startTime + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  return { scale, melody, baseFreq, createDrone, playSitarNote };
}

const MusicToggle = ({ autoPlay = false }) => {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const droneOscsRef = useRef([]);
  const melodyIntervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopMusic = useCallback(() => {
    // Stop melody scheduling
    if (melodyIntervalRef.current) {
      clearTimeout(melodyIntervalRef.current);
      melodyIntervalRef.current = null;
    }
    // Stop drone oscillators
    droneOscsRef.current.forEach((osc) => {
      try { osc.stop(); } catch (e) { /* already stopped */ }
    });
    droneOscsRef.current = [];
    masterGainRef.current = null;
    // Close the AudioContext entirely — this immediately kills ALL
    // scheduled oscillators and nodes, preventing any audio leakage
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startMusic = useCallback(() => {
    // Always create a fresh AudioContext (previous one was closed on stop)
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioContextRef.current;

    // Master gain for overall volume
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5; // Light background level
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    const music = createIndianMelody(ctx);

    // Start drone
    const drone = music.createDrone(ctx, masterGain);
    drone.oscillators.forEach((osc) => {
      osc.start(ctx.currentTime);
    });
    droneOscsRef.current = drone.oscillators;

    // Play melody in a loop
    let noteIndex = 0;
    function scheduleNextNote() {
      if (!audioContextRef.current || audioContextRef.current.state === "closed") return;
      const ctx = audioContextRef.current;
      const noteData = music.melody[noteIndex % music.melody.length];

      if (noteData.note >= 0) {
        const freq = music.baseFreq * music.scale[noteData.note];
        music.playSitarNote(ctx, freq, ctx.currentTime, noteData.dur, masterGain);
      }

      noteIndex++;
      melodyIntervalRef.current = setTimeout(scheduleNextNote, noteData.dur * 1000);
    }

    // Start melody after a short drone intro
    melodyIntervalRef.current = setTimeout(scheduleNextNote, 1500);
    setIsPlaying(true);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, stopMusic, startMusic]);

  // Autoplay when component mounts (after user interaction with envelope)
  useEffect(() => {
    if (autoPlay) {
      // Small delay to let the page transition complete
      const timer = setTimeout(() => {
        startMusic();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, startMusic]);

  // Cleanup on unmount — stopMusic already closes the AudioContext
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  return (
    <motion.button
      data-testid={WEDDING.musicToggle}
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{
        backgroundColor: "#D4AF37",
        border: "2px solid #800000",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause background music" : "Play background music"}
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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Music size={20} color="#800000" />
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
            <VolumeX size={20} color="#800000" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing ring when music is NOT playing */}
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid #D4AF37" }}
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
};

export default MusicToggle;
