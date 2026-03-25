"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  motion,
  Variants,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { GrInstagram } from "react-icons/gr";

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
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 2,
  },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 2,
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 2,
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const weddingDate = dayjs("2026-06-07 10:00:00");

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 0], [0, 0]);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = weddingDate.diff(now);
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [showClose, setShowClose] = useState(false); // awalnya false

  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 300); // delay 600ms sebelum muncul
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="overflow-x-hidden">
      {/* SECTION CLOSE INVITATION */}
      <AnimatePresence>
        {showClose && !isOpen && (
          <motion.div
            key="close-invitation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideFade}
          >
            {/* SECTION 1 */}
            <section className="pb-[40%] relative h-screen md:h-[90vh] flex items-end justify-center text-white text-center overflow-hidden">
              <motion.div style={{ y }} className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="hero"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-black/50" />

              {/* 💕 FLOATING HEARTS */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-300 text-xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: -300,
                    opacity: [0, 1, 0],
                    x: Math.random() * 100 - 50,
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  ❤️
                </motion.div>
              ))}

              {/* CONTENT */}
              <div className="max-w-[80%]  w-full font-serif relative z-10 flex flex-col justify-center">
                <h1 className="text-sm text-center mb-10 text-white">
                  The wait is finnally over
                </h1>
                <div className="flex items-center">
                  <p className="text-xs text-gray-300 text-left text-nowrap p-0 m-0">
                    From 10 Sep 2024
                  </p>
                  <div className="h-[0.1px] bg-gray-300 w-full mx-2" />
                  <p className="text-xs text-gray-300 text-right text-nowrap p-0 m-0">
                    To 7 Jun 2026
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 min-h-screen md:min-h-[80vh] flex flex-col justify-center"
            >
              <motion.div className="relative h-110 rounded-lg overflow-hidden">
                <p
                  className={`${dancingScript.className} mb-4 text-white absolute bottom-2 text-2xl w-full text-center z-20`}
                >
                  Tangkas & Ais
                </p>
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="max-w-[60%] mx-auto flex flex-col justify-center items-center text-left w-full">
                <p className="font-serif mt-10 mb-2 text-xs w-full text-left">
                  Dear,
                </p>
                <h3 className="font-serif text-center w-full mb-4 font-semibold text-red-900">
                  Family and Friends
                </h3>
                <p className="font-serif mb-8 text-xs w-full text-center">
                  You are invited to witness <br /> and celebrate our special
                  day
                </p>

                <button
                  onClick={() => {
                    setTimeout(
                      () => window.scrollTo({ top: 0, behavior: "smooth" }),
                      600
                    );
                    setTimeout(() => setIsOpen(true), 600); // delay 0.3s
                  }}
                  className="w-fit px-6 py-2 rounded bg-red-900 text-white text-xs font-semibold"
                >
                  OPEN INVITATION
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION OPEN INVITATION */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="open-invitation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideFade}
          >
            {/* SECTION 3 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-0 min-h-screen md:min-h-[70vh] relative w-full mt-20 md:mt-26"
            >
              <p
                className={`${dancingScript.className} mb-4 text-red-900 absolute left-6 -top-12 text-5xl w-full`}
              >
                Tangkas <br /> Ais
              </p>
              <div className="w-[1.5px] bg-red-900 absolute left-10 top-26 h-90"></div>
              <motion.div className="relative ms-auto w-[80%] h-110 rounded-l-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="font-serif text-gray-500 text-right mt-12 pr-6">
                <p className="text-xs">Yes, we finally set a date.</p>
                <p className="text-xs">We{"'"}re going to make it official.</p>
                <p className="mb-4 text-xs">We{"'"}re getting married!</p>
                <p className="text-red-900 font-semibold">#TagUntukNikahan</p>
              </div>
            </motion.section>

            {/* SECTION 4 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full"
            >
              <p
                className={`${dancingScript.className} text-center mb-10 text-red-900 text-8xl w-full`}
              >
                A <span className="-ml-14">T</span>
              </p>
              <div className="text-center mb-10 text-xs w-full">IMAGE AYAT</div>
              <p className="font-serif text-gray-600 text-center text-xs w-full">
                Along with our families, <br /> Joyfully invite you to share in
                the celebration of our <br />
                marriage
              </p>

              <motion.div className="mt-16 relative ms-auto w-full h-110 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover"
                />
                <p
                  className={`${dancingScript.className} font-semibold absolute bottom-0 text-white w-full`}
                >
                  Puspitalia Dwi Aisah
                </p>
              </motion.div>
              <div className="font-serif text-gray-600 font-medium text-right mt-8 px-6">
                <p className="text-[11px]">The Daughter of</p>
                <p className="text-[11px]">Mr. Father and</p>
                <p className="mb-4 text-[11px]">Mrs. Mother</p>
                <p className="flex gap-1 text-sm items-center text-red-900 font-semibold text-left">
                  <GrInstagram /> <span className="text-[12px]">@aiskw_</span>
                </p>
              </div>
            </motion.section>

            {/* SECTION 5 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full"
            >
              <motion.div className="mt-16 relative ms-auto w-full h-110 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover"
                />
                <p
                  className={`${dancingScript.className} text-right font-semibold absolute bottom-0 text-white w-full`}
                >
                  Tangkas Risdianto
                </p>
              </motion.div>
              <div className="font-serif text-gray-600 font-medium text-left mt-8 px-6">
                <p className="text-[11px]">The Son of</p>
                <p className="text-[11px]">Mr. Father and</p>
                <p className="mb-4 text-[11px]">Mrs. Mother</p>
                <p className="w-fit ms-auto flex gap-1 text-sm items-center text-red-900 font-semibold">
                  <GrInstagram />{" "}
                  <span className="text-[12px]">@tangkasr_</span>
                </p>
              </div>
            </motion.section>

            {/* SECTION 6 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className=" min-h-screen md:min-h-full relative w-full mt-30"
            >
              <motion.div className="relative ms-auto w-full h-110 ">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover"
                />
                <p
                  className={`${dancingScript.className} z-40 text-5xl text-center w-full -rotate-8 absolute -bottom-12 text-black`}
                >
                  How it all started
                </p>
              </motion.div>
              <div
                className={`font-serif text-gray-500 text-xs text-right mt-18 px-6 max-w-[70%] ms-auto`}
              >
                <p className="mb-4">
                  We first met on a chilly day, introduced by a dear friend, yet
                  the warmth of laughter filled the air. Every word we shared
                  felt like sunlight melting the cold around us. In that moment,
                  between jokes and shy smiles, something extraordinary began to
                  bloom.
                </p>
                <p className="mb-4">
                  A year passed, and we walked hand in hand through lessons of
                  love and life. Together, we faced storms and scaled mountains,
                  learning the strength of our hearts. Through every challenge,
                  we discovered the courage to dream of a life united.
                </p>
                <p className="">
                  Now, as we open a new chapter of our lives, our hearts are
                  ready to pledge forever. We joyfully invite you to witness our
                  vows and celebrate our wedding on{" "}
                  <span className="font-bold text-red-900">June 7, 2026</span>,
                  as we embrace a lifetime of love and laughter.
                </p>
              </div>

              <p className="font-serif mt-16 px-8 flex gap-1 text-sm items-center text-red-900 font-semibold text-left">
                <span className="text-[12px]">Est. 2024</span>
                <span className="mx-2 h-px w-6 bg-red-900"></span>
                <span className="text-[12px]">Est. 2026</span>
              </p>
            </motion.section>

            {/* SECTION 7 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-0 min-h-screen md:min-h-screen relative w-full mt-30"
            >
              <p className="font-serif font-semibold z-20 mb-4 text-red-950 -rotate-90 absolute left-5 top-6 text-xs w-fit">
                Details
              </p>
              <div className="w-[1.5px] bg-red-950 absolute left-10 top-18 h-90"></div>
              <motion.div className="relative ms-auto w-[80%] h-110 rounded-l-lg">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552"
                  alt="gallery"
                  fill
                  className="object-cover rounded-l-lg"
                />
                <p
                  className={`${dancingScript.className} text-left z-20 mb-4 text-red-900 absolute -left-12 -bottom-36 text-5xl w-full`}
                >
                  Save the <br /> Date
                </p>
              </motion.div>
              <div className="w-[1.5px] bg-red-950 absolute left-10 top-146 h-120"></div>
              <div className="w-[80%] bg-red-950 absolute left-10 top-266 h-px"></div>
              <div className=" text-right mt-30 pr-6">
                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Akad Nikah
                </p>
                <p className="text-xs text-gray-500 font-serif">
                  {"("}Reserved for you{")"}
                </p>
                <p className="text-xs text-gray-500 font-serif">
                  Sunday, June 7, 2026
                </p>
                <p className="text-xs text-gray-500 font-serif mb-10">
                  09:00 WIB - finish
                </p>

                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Reception
                </p>
                <p className="text-xs text-gray-500 font-serif">
                  Sunday, June 7, 2026
                </p>
                <p className="text-xs text-gray-500 font-serif mb-10">
                  11:00 WIB - finish
                </p>

                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Location
                </p>
                <p className="text-xs text-gray-500 font-serif">
                  Alamat Rumah Sayang
                </p>
                <p className="text-xs text-gray-500 font-serif mb-6">
                  Jl. Raya Semanu, Gunung Kidul
                </p>

                <button className="mb-10 w-fit px-6 py-2 rounded bg-red-900 text-white text-xs font-bold">
                  SEE LOCATION
                </button>

                <div className="font-sans font-semibold flex items-center gap-4 ms-auto w-fit mb-4 text-sm">
                  <p>07</p>
                  <p>|</p>
                  <p>06</p>
                  <p>|</p>
                  <p>2026</p>
                </div>

                {/* ⏳ COUNTDOWN */}
                <motion.section
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-sans flex items-center ms-auto w-fit rounded bg-red-100"
                >
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <motion.div key={key} className="text-xs  px-2 py-1">
                      <p className="font-semibold text-[11px]">{value}</p>
                      <p className="capitalize text-[8px]">{key}</p>
                    </motion.div>
                  ))}
                </motion.section>
              </div>
            </motion.section>

            {/* SECTION 8 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full mt-40 mb-20"
            >
              <p
                className={`${dancingScript.className} absolute z-40 top-50 text-center text-white text-8xl w-full`}
              >
                A <span className="-ml-14">T</span>
              </p>
              <div className="grid grid-cols-2">
                <motion.div className="mt-16 relative ms-auto w-full h-110 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552"
                    alt="gallery"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div className="relative ms-auto w-full h-110 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552"
                    alt="gallery"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="flex justify-end px-6 -mt-10">
                <Link
                  href={"/gallery"}
                  className="mb-10 w-fit px-6 py-2 rounded bg-red-900 text-white text-xs font-bold"
                >
                  OPEN GALLERY
                </Link>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
