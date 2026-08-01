import React, { useMemo } from "react";
import { motion } from "framer-motion";

const PETAL_COLORS = ["#800000", "#D4AF37", "#FFB6C1", "#FDE68A", "#c96b6b"];

const generatePetal = (index) => {
  const size = Math.random() * 12 + 8;
  const startX = Math.random() * 100;
  const duration = Math.random() * 8 + 10;
  const delay = Math.random() * 10;
  const swayRange = Math.random() * 80 + 40;
  const color = PETAL_COLORS[index % PETAL_COLORS.length];
  const rotation = Math.random() * 360;

  return { size, startX, duration, delay, swayRange, color, rotation };
};

const Petal = ({ config }) => {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-50"
      style={{
        left: `${config.startX}%`,
        top: -20,
        width: config.size,
        height: config.size * 1.3,
        borderRadius: "50% 0 50% 50%",
        backgroundColor: config.color,
        opacity: 0.7,
        transform: `rotate(${config.rotation}deg)`,
      }}
      animate={{
        y: ["0vh", "105vh"],
        x: [0, config.swayRange, -config.swayRange / 2, config.swayRange / 3, 0],
        rotate: [config.rotation, config.rotation + 360],
        opacity: [0, 0.7, 0.7, 0.5, 0],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const FlowerPetals = ({ count = 18 }) => {
  const petals = useMemo(
    () => Array.from({ length: count }, (_, i) => generatePetal(i)),
    [count]
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((config, i) => (
        <Petal key={i} config={config} />
      ))}
    </div>
  );
};

export default FlowerPetals;
