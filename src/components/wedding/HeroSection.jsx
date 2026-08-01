import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";

const calculateTimeLeft = () => {
  const weddingDate = new Date("2026-08-24T03:25:00+05:30");
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg"
      style={{
        border: "1px solid #D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.06)",
      }}
    >
      <span
        className="text-2xl sm:text-3xl font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#800000" }}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span
      className="text-xs mt-2 uppercase tracking-widest"
      style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
    >
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-testid={WEDDING.heroSection}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      {/* Om/Ganesh symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-6"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#D4AF37" strokeWidth="1" />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}
            fill="#800000"
          >
            Sri
          </text>
        </svg>
      </motion.div>

      {/* Invitation text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xs sm:text-sm uppercase tracking-[0.25em] mb-6"
        style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
      >
        Together with their families
      </motion.p>

      {/* Groom Name */}
      <motion.div
        className="text-center mb-2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Sai Harish Kumar
        </h1>
        <p
          className="text-xs sm:text-sm mt-1"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          S/o. Late Sri Chamarthi Sridhar Rao & Smt. Sai Kamala
        </p>
      </motion.div>

      {/* Ampersand */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
        className="my-4"
      >
        <span
          className="text-4xl sm:text-5xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#D4AF37" }}
        >
          &
        </span>
      </motion.div>

      {/* Bride Name */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Dhavala Sweta
        </h1>
        <p
          className="text-xs sm:text-sm mt-1"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          D/o. Late Sri D.V.R. Murthy & Smt. D. Annapurneswary
        </p>
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-12 sm:w-20" style={{ backgroundColor: "#D4AF37" }} />
          <p
            className="text-sm sm:text-base uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
          >
            Save the Date
          </p>
          <div className="h-px w-12 sm:w-20" style={{ backgroundColor: "#D4AF37" }} />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#800000" }}
        >
          24 — 27 August, 2026
        </h2>
      </motion.div>

      {/* Countdown */}
      <motion.div
        data-testid={WEDDING.countdownTimer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="flex gap-4 sm:gap-6"
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Min" />
        <CountdownUnit value={timeLeft.seconds} label="Sec" />
      </motion.div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
