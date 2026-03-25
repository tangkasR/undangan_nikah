"use client";
import GallerySwiper from "@/components/GallerySwiper";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // 400 = regular, 700 = bold
});

const slideFade: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 1, ease: "easeOut" },
    animationDelay: 2,
  },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 1, ease: "easeOut" },
    animationDelay: 2,
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 1, ease: "easeOut" },
    animationDelay: 2,
  },
};

const GalleryPage = () => {
  const [showClose, setShowClose] = useState(false); // awalnya false

  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 100); // delay 600ms sebelum muncul
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {showClose && (
        <motion.div
          key="close-invitation"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideFade}
        >
          <div className="overflow-x-hidden min-h-screen md:min-h-[80vh] w-full flex flex-col justify-evenly">
            <div className="text-center px-8">
              <p
                className={`${dancingScript.className} text-xs font-semibold text-gray-500 mb-2`}
              >
                Our Moment
              </p>
              <h1
                className={`${dancingScript.className} text-4xl text-red-900 font-bold`}
              >
                Tangkas & Ais
              </h1>
            </div>

            <div className="h-fit block">
              <GallerySwiper />
            </div>

            <p
              className={`${dancingScript.className} px-8 text-center text-xs font-semibold text-gray-600`}
            >
              To Have and to hold from this day forward
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPage;
