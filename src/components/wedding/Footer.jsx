import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer
      data-testid={WEDDING.footer}
      className="relative py-16 px-6 text-center overflow-hidden"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: "#D4AF37" }} />
          <Heart size={16} color="#800000" fill="#800000" />
          <div className="h-px w-12" style={{ backgroundColor: "#D4AF37" }} />
        </div>

        <p
          className="text-sm mb-3"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          We can't wait to celebrate with you!
        </p>

        <h3
          className="text-2xl sm:text-3xl mb-4"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Dhavala Sweta & Sai Harish Kumar
        </h3>

        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          24 — 27 August 2026 &bull; Bandamunda
        </p>

        <div
          className="mx-auto mt-6 w-16 h-px"
          style={{ backgroundColor: "#D4AF37" }}
        />

        <p
          className="text-xs mt-6"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D", opacity: 0.6 }}
        >
          Made with love
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
