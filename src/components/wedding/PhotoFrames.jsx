import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { Camera } from "lucide-react";

const BRIDE_PHOTO = "/bride.webp";
const GROOM_PHOTO = "/groom.webp";
const COUPLE_PHOTO = "/couple.webp";

const ArchFrame = ({ testId, label, imgSrc, delay = 0 }) => (
  <motion.div
    data-testid={testId}
    className="flex flex-col items-center gap-4"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
  >
    <div
      className="relative w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 overflow-hidden"
      style={{
        borderRadius: "50% 50% 4px 4px / 40% 40% 4px 4px",
        padding: "6px",
        background: "linear-gradient(135deg, #D4AF37, #800000, #D4AF37)",
      }}
    >
      <div
        className="w-full h-full overflow-hidden relative"
        style={{
          borderRadius: "50% 50% 2px 2px / 40% 40% 2px 2px",
          backgroundColor: "#FFFDD0",
        }}
      >
        <img
          src={imgSrc}
          alt={label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Placeholder overlay when no real photo */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(128,0,0,0.5)" }}
        >
          <Camera size={24} color="#FFFDD0" />
          <span
            className="text-xs mt-2"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#FFFDD0" }}
          >
            Add Photo
          </span>
        </div>
      </div>
    </div>
    <h3
      className="text-xl sm:text-2xl"
      style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
    >
      {label}
    </h3>
  </motion.div>
);

const PhotoFrames = () => {
  return (
    <section
      data-testid={WEDDING.photoSection}
      className="relative py-20 sm:py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-xs uppercase tracking-[0.25em] mb-3"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          The Couple
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Our Love Story
        </h2>
        <div
          className="mx-auto mt-4 w-24 h-px"
          style={{ backgroundColor: "#D4AF37" }}
        />
      </motion.div>

      {/* Photo frames */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        <ArchFrame
          testId={WEDDING.groomFrame}
          label="Sai Harish Kumar"
          imgSrc={GROOM_PHOTO}
          delay={0}
        />
        <ArchFrame
          testId={WEDDING.coupleFrame}
          label="Together Forever"
          imgSrc={COUPLE_PHOTO}
          delay={0.2}
        />
        <ArchFrame
          testId={WEDDING.brideFrame}
          label="Dhavala Sweta"
          imgSrc={BRIDE_PHOTO}
          delay={0.4}
        />
      </div>

      {/* Decorative bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />
    </section>
  );
};

export default PhotoFrames;
