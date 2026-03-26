"use client";
import GallerySwiper from "@/components/GallerySwiper";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

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
          <div className="overflow-x-hidden min-h-screen w-full flex flex-col justify-evenly">
            <div className="text-center px-8">
              <p className={`font-moontime font-medium text-gray-900 mb-2`}>
                A Moment to Remember
              </p>
              <h1 className={`font-moontime text-4xl text-red-900 font-medium`}>
                Tangkas & Ais
              </h1>
            </div>

            <div className="h-fit block">
              <GallerySwiper />
            </div>

            <p
              className={`font-moontime px-8 text-center font-medium text-gray-900`}
            >
              From this day, forever begins
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPage;
