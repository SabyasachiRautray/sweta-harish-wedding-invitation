import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { MapPin, Clock, CalendarDays } from "lucide-react";

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
      { name: "Raata", time: "8:00 AM - 9:00 AM" },
      { name: "Haldi", time: "9:00 AM to until we play" },
      { name: "Pellikuthuru", time: "After Haldi Done" },
    ],
  },
  {
    day: "Day 2",
    date: "25th August 2026",
    venue: "Community Hall, Bandamunda",
    image: MEHENDI_BG,
    items: [
      { name: "Mehendi / Sangeet", time: "5:30 PM" },
    ],
  },
  {
    day: "Day 3",
    date: "26th August 2026",
    venue: "Community Hall, Bandamunda",
    image: SANGEET_BG,
    items: [
      { name: "Ankurarpana, Snathakam, Kashi Yatra", time: "Will Inform" },
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
            backgroundColor: "#FAF9F6",
            boxShadow: "0 8px 32px rgba(128,0,0,0.06)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          {/* Event image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={event.image}
              alt={event.day}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(128,0,0,0.6))",
              }}
            />
            <div className="absolute bottom-4 left-4">
              <span
                className="text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#FDE68A" }}
              >
                {event.day}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={14} color="#D4AF37" />
              <h3
                className="text-lg sm:text-xl font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#800000" }}
              >
                {event.date}
              </h3>
            </div>

            <div className="flex items-start gap-2 mb-5">
              <MapPin size={14} color="#D4AF37" className="mt-0.5 flex-shrink-0" />
              <p
                className="text-sm"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
              >
                {event.venue}
              </p>
            </div>

            <div className="space-y-3">
              {event.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pl-3"
                  style={{ borderLeft: "2px solid #D4AF37" }}
                >
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2D2424", fontSize: "16px" }}
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={11} color="#5C4D4D" />
                      <p
                        className="text-xs"
                        style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
                      >
                        {item.time}
                      </p>
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
          className="w-4 h-4 rounded-full z-10"
          style={{
            backgroundColor: "#D4AF37",
            border: "3px solid #FAF9F6",
            boxShadow: "0 0 0 2px #D4AF37",
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
          className="text-xs uppercase tracking-[0.25em] mb-3"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#5C4D4D" }}
        >
          Wedding Celebrations
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Our Journey of Celebrations
        </h2>
        <div
          className="mx-auto mt-4 w-24 h-px"
          style={{ backgroundColor: "#D4AF37" }}
        />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical line - desktop only */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundColor: "#D4AF37", opacity: 0.3 }}
        />

        {events.map((event, index) => (
          <TimelineCard key={index} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

export default EventTimeline;
