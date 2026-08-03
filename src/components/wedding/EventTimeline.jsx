import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { MapPin, Clock, CalendarDays, Shirt } from "lucide-react";

const HALDI_BG = "/haldi.webp";
const SANGEET_BG = "/reception.webp";
const MEHENDI_BG = "/mehndi.webp";
const TOAST_BG = "/wedding.webp";

const events = [
  {
    day: "Day 1",
    date: "24th August 2026",
    venue: "Sec B/43, Bandamunda, Railway Quarters",
    image: HALDI_BG,
    items: [
      { name: "Raata & Pellikuthuru", time: "8:00 AM - 9:00 AM" },
      { name: "Haldi", time: "9:00 AM Onwards", dressCode: "Yellow" },
    ],
  },
  {
    day: "Day 2",
    date: "25th August 2026",
    venue: "Community Hall, Bandamunda",
    image: MEHENDI_BG,
    items: [
      { name: "Mehendi / Sangeet", time: "5:30 PM", dressCode: "Green" },
    ],
  },
  {
    day: "Day 3",
    date: "26th August 2026",
    venue: "Community Hall, Bandamunda",
    image: SANGEET_BG,
    items: [
      { name: "Reception", time: "7:30 PM" },
    ],
  },
  {
    day: "Day 4",
    date: "27th August 2026",
    venue: "Community Hall, Bandamunda",
    image: TOAST_BG,
    items: [
      { name: "Wedding Ceremony", time: "3:25 AM (Shubh Muhurat)" },
    ],
  },
];

const TimelineCard = ({ event, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      data-testid={`${WEDDING.eventCard}-${index}`}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Card content */}
      <div className={`w-full md:w-5/12 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(128,0,0,0.1)",
            border: "1.5px solid rgba(212,175,55,0.4)",
          }}
        >
          {/* Event image */}
          <div className="relative h-52 sm:h-60 overflow-hidden">
            <img
              src={event.image}
              alt={event.day}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, rgba(128,0,0,0.75))",
              }}
            />
            <div className="absolute bottom-4 left-4">
              <span
                className="text-xs sm:text-sm uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "#FFF5C0",
                  backgroundColor: "rgba(128, 0, 0, 0.85)",
                  border: "1px solid rgba(212,175,55,0.5)",
                }}
              >
                {event.day}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-3">
              <CalendarDays size={20} color="#D4AF37" className="stroke-[2.5]" />
              <h3
                className="text-xl sm:text-2xl font-bold tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#800000" }}
              >
                {event.date}
              </h3>
            </div>

            <div className="flex items-start gap-2.5 mb-5 bg-amber-50/70 p-3 rounded-lg border border-amber-200/60">
              <MapPin size={18} color="#800000" className="mt-0.5 flex-shrink-0 stroke-[2.5]" />
              <p
                className="text-sm sm:text-base font-semibold leading-snug"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#2D2424" }}
              >
                {event.venue}
              </p>
            </div>

            <div className="space-y-3.5">
              {event.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 bg-amber-50/40 rounded-r-xl"
                  style={{ borderLeft: "4px solid #D4AF37" }}
                >
                  <div className="flex-1">
                    <p
                      className="text-lg sm:text-xl font-bold leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#800000" }}
                    >
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} color="#B8860B" className="stroke-[2.5]" />
                        <p
                          className="text-sm sm:text-base font-medium"
                          style={{ fontFamily: "'Outfit', sans-serif", color: "#4A3B3B" }}
                        >
                          {item.time}
                        </p>
                      </div>
                      {item.dressCode && (
                        <div
                          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-sm font-semibold shadow-xs"
                          style={{
                            backgroundColor: item.dressCode.toLowerCase().includes("yellow")
                              ? "#FFFBEB"
                              : item.dressCode.toLowerCase().includes("green")
                                ? "#F0FDF4"
                                : "#FFFBEB",
                            color: item.dressCode.toLowerCase().includes("yellow")
                              ? "#854D0E"
                              : item.dressCode.toLowerCase().includes("green")
                                ? "#14532D"
                                : "#800000",
                            border: `1.5px solid ${
                              item.dressCode.toLowerCase().includes("yellow")
                                ? "#D4AF37"
                                : item.dressCode.toLowerCase().includes("green")
                                  ? "#22C55E"
                                  : "#D4AF37"
                            }`,
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          <Shirt size={16} className="stroke-[2.5]" />
                          <span>Dress Code: <strong className="font-bold">{item.dressCode}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline center dot - visible only on desktop */}
      <div className="hidden md:flex md:w-2/12 justify-center relative">
        <motion.div
          className="w-5 h-5 rounded-full z-10"
          style={{
            backgroundColor: "#D4AF37",
            border: "3px solid #FFFFFF",
            boxShadow: "0 0 0 3px #800000, 0 0 10px rgba(212,175,55,0.5)",
          }}
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  );
};

const EventTimeline = () => {
  return (
    <section
      data-testid={WEDDING.eventTimeline}
      className="relative py-20 sm:py-28 px-6"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-sm sm:text-base uppercase tracking-[0.25em] font-bold mb-3"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#800000" }}
        >
          Wedding Celebrations
        </p>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Our Journey of Celebrations
        </h2>
        <div
          className="mx-auto mt-4 w-28 h-1 rounded-full"
          style={{ backgroundColor: "#D4AF37" }}
        />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical line - desktop only */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
        />

        {events.map((event, index) => (
          <TimelineCard key={index} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

export default EventTimeline;
