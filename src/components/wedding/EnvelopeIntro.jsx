import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";

const EnvelopeIntro = ({ onOpen }) => {
  return (
    <motion.div
      data-testid={WEDDING.introOverlay}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#FAF9F6" }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Decorative paisley corners */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <path
            d="M0,0 C60,20 80,60 90,90 C100,120 80,150 50,160 C20,170 0,150 10,120 C20,90 50,70 80,80 C110,90 120,120 100,140"
            stroke="#800000"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#800000" strokeWidth="1.5" opacity="0.5" />
          <circle cx="80" cy="80" r="15" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none">
          <path
            d="M0,0 C60,20 80,60 90,90 C100,120 80,150 50,160 C20,170 0,150 10,120 C20,90 50,70 80,80 C110,90 120,120 100,140"
            stroke="#800000"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#800000" strokeWidth="1.5" opacity="0.5" />
          <circle cx="80" cy="80" r="15" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-8 px-6">
        {/* Envelope SVG */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg
            width="160"
            height="120"
            viewBox="0 0 160 120"
            className="drop-shadow-lg"
          >
            {/* Envelope body */}
            <rect x="10" y="30" width="140" height="85" rx="6" fill="#FFFDD0" stroke="#D4AF37" strokeWidth="2" />
            {/* Envelope flap */}
            <motion.path
              d="M10,30 L80,75 L150,30"
              fill="#FAF9F6"
              stroke="#D4AF37"
              strokeWidth="2"
              animate={{ rotateX: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner decoration */}
            <circle cx="80" cy="70" r="12" fill="none" stroke="#800000" strokeWidth="1.5" opacity="0.5" />
            <path d="M74,70 L80,64 L86,70 L80,76 Z" fill="#D4AF37" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p
            style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D", letterSpacing: "0.15em" }}
            className="text-xs uppercase mb-2"
          >
            You are cordially invited
          </p>
          <h2
            style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
            className="text-3xl sm:text-4xl mb-1"
          >
            Dhavala Sweta
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF37" }} className="text-lg">&</p>
          <h2
            style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
            className="text-3xl sm:text-4xl"
          >
            Sai Harish Kumar
          </h2>
        </motion.div>

        {/* Open Button */}
        <motion.button
          data-testid={WEDDING.envelopeButton}
          onClick={onOpen}
          className="relative px-8 py-3 rounded-full border-2 overflow-hidden group"
          style={{
            borderColor: "#D4AF37",
            backgroundColor: "transparent",
            color: "#800000",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.1em",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="relative z-10 text-sm uppercase font-medium group-hover:text-white transition-colors duration-300">
            Open Invitation
          </span>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "#800000" }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Sacred Logo & Branding */}
        <motion.div
          className="flex flex-col items-center justify-center gap-3 mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <img
            src={process.env.PUBLIC_URL + "/logosacred.png"}
            alt="Sacred Knots Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
          <p
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#800000" }}
          >
            Crafted with love tale
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnvelopeIntro;
