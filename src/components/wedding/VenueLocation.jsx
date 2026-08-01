import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/Community+Hall+Bandamunda+Rourkela";

const EMBED_SRC =
  "https://www.google.com/maps?q=Community+Hall+Bandamunda+Rourkela&output=embed";

const VenueLocation = () => {
  return (
    <section
      data-testid="venue-location"
      className="relative py-20 sm:py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />

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
          Find Your Way
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#800000" }}
        >
          Venue &amp; Directions
        </h2>
        <div
          className="mx-auto mt-4 w-24 h-px"
          style={{ backgroundColor: "#D4AF37" }}
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Map embed */}
        <motion.div
          className="w-full lg:w-7/12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(128,0,0,0.08)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <iframe
              title="Wedding Venue – Community Hall, Bandamunda"
              src={EMBED_SRC}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Venue details card */}
        <motion.div
          className="w-full lg:w-5/12"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: "#FAF9F6",
              boxShadow: "0 8px 32px rgba(128,0,0,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            {/* Pin icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(128,0,0,0.1), rgba(212,175,55,0.15))",
              }}
            >
              <MapPin size={26} color="#800000" />
            </div>

            <h3
              className="text-2xl sm:text-3xl mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#800000",
                fontWeight: 600,
              }}
            >
              Community Hall
            </h3>

            <p
              className="text-base mb-1"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "#5C4D4D",
              }}
            >
              Bandamunda, Rourkela
            </p>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "#8A7E7E",
              }}
            >
              Sundargarh, Odisha
            </p>

            {/* Divider */}
            <div
              className="w-12 h-px mb-6"
              style={{ backgroundColor: "#D4AF37" }}
            />

            {/* Quick info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Navigation
                  size={14}
                  color="#D4AF37"
                  className="mt-1 flex-shrink-0"
                />
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "#5C4D4D",
                    lineHeight: 1.6,
                  }}
                >
                  Near Bandamunda Railway Station, easily accessible by road and
                  rail.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #800000, #5C1A1A)",
                color: "#FDE68A",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(128,0,0,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(128,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(128,0,0,0.25)";
              }}
            >
              <MapPin size={16} />
              Get Directions
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />
    </section>
  );
};

export default VenueLocation;
