import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
];

export default function LandingPageHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60 items-center justify-items-start  text-white px-10 grid grid-cols-2">

        <div className="mt-20 quantico">
          <h1 className="text-6xl tracking-wider font-bold mb-4">
            Heavy Metal Pollution Index
            
          </h1>
          <p className="text-xl max-w-2xl poppins">
            An automated platform to monitor, analyze, and visualize groundwater
            quality with accuracy and efficiency.
          </p>
          <div className="mt-6 space-x-4">
            <button className="bg-white text-black px-3 py-1 rounded-md text-md shadow-md hover:bg-gray-200 transition">
              Learn More
            </button>
            <button className="bg-green-600 px-3 py-3 rounded-md text-lg shadow-md hover:bg-green-700 transition">
              Get Started
            </button>
          </div>

        </div>
        <div >
                
        </div>
      </div>
    </div>
  );
}
