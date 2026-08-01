import React, { useState } from "react";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./components/wedding/EnvelopeIntro";
import HeroSection from "./components/wedding/HeroSection";
import PhotoFrames from "./components/wedding/PhotoFrames";
import EventTimeline from "./components/wedding/EventTimeline";
import FlowerPetals from "./components/wedding/FlowerPetals";
import MusicToggle from "./components/wedding/MusicToggle";
import Footer from "./components/wedding/Footer";
import VenueLocation from "./components/wedding/VenueLocation";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="wedding-app" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Envelope Intro */}
      <AnimatePresence>
        {!isOpen && <EnvelopeIntro onOpen={handleOpen} />}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <>
          {/* Flower Petals */}
          <FlowerPetals count={16} />

          {/* Music Toggle */}
          <MusicToggle autoPlay={true} />

          {/* Hero */}
          <HeroSection />

          {/* Photo Frames */}
          <PhotoFrames />

          {/* Event Timeline */}
          <EventTimeline />

          {/* Venue & Directions */}
          <VenueLocation />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
