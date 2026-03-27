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
import { useRef } from "react";
import { useAnimation } from "framer-motion";

const slideFade: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 1,
  },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 1,
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 1.5, ease: "easeOut" },
    animationDelay: 1,
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const smoothReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.9,
    filter: "blur(2px)",
    transition: { duration: 1, ease: "easeOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const HomePage = () => {
  const controlsection1 = useAnimation();
  const controlsection2 = useAnimation();
  const controlsection3 = useAnimation();
  const controlsection4 = useAnimation();
  const controlsection5 = useAnimation();
  const controlsection6 = useAnimation();
  const controlsection7 = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
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
    const timer = setTimeout(() => setShowClose(true), 300); // delay 10ms sebelum muncul
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden" ref={scrollRef}>
      {/* SECTION CLOSE INVITATION */}
      <AnimatePresence>
        {showClose && !isOpen && (
          <motion.div
            key="close-invitation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideFade}
            className="overflow-x-hidden"
          >
            {/* SECTION 1 */}
            <section className="pb-[40%] relative h-screen flex items-end justify-center text-white text-center overflow-hidden">
              <motion.div style={{ y }} className="absolute inset-0">
                <Image
                  loading="eager"
                  src="/images/hero.jpg"
                  alt="hero"
                  fill
                  className="object-cover"
                  sizes="100vw"
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
                  The wait is over, and forever begins 💍
                </h1>
                <div className="flex items-center">
                  <p className="text-xs text-gray-300 text-left text-nowrap p-0 m-0">
                    From 10 Sep &apos;24
                  </p>
                  <div className="h-[0.1px] bg-gray-300 w-full mx-2" />
                  <p className="text-xs text-gray-300 text-right text-nowrap p-0 m-0">
                    To 7 Jun &apos;26
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2 */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate={controlsection1}
              onViewportEnter={() => controlsection1.start("visible")}
              onViewportLeave={() => controlsection1.start("hidden")}
              viewport={{ once: false }}
              className="p-6 min-h-screen flex flex-col justify-center"
            >
              <motion.div className="relative h-110 rounded-lg overflow-hidden">
                <p
                  className={`text-2xl font-moontime text-white absolute bottom-2 w-full text-center z-20`}
                >
                  Tangkas & Ais
                </p>
                <Image
                  loading="eager"
                  src="/images/hero.jpg"
                  alt="gallery"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              <div className="max-w-[60%] mx-auto flex flex-col justify-center items-center text-left w-full">
                <p className="font-serif mt-10 mb-2 text-xs w-full text-left">
                  Dear,
                </p>
                <h3 className="font-serif text-center w-full mb-6 font-semibold text-red-900">
                  Family and Friends
                </h3>
                <p className="text-gray-600 font-serif mb-8 text-xs w-full text-center leading-5">
                  You are warmly invited to witness <br /> and celebrate our
                  special day.
                </p>
                <button
                  onClick={() => {
                    setTimeout(
                      () => window.scrollTo({ top: 0, behavior: "instant" }),
                      600
                    );
                    setTimeout(() => setIsOpen(true), 600);
                  }}
                  className="cursor-pointer w-fit px-4 py-2 rounded bg-red-900 text-white text-xs font-semibold"
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
            className="overflow-x-hidden"
          >
            {/* SECTION 3 */}
            <motion.section
              variants={smoothReveal}
              initial="hidden"
              animate={controlsection2}
              onViewportEnter={() => controlsection2.start("visible")}
              onViewportLeave={() => controlsection2.start("hidden")}
              viewport={{ once: false }}
              className="min-h-screen relative flex items-center justify-center w-full py-20"
            >
              <div className="relative h-fit w-full">
                <p
                  className={`z-50 -rotate-2 font-moontime text-red-900 absolute left-4 -top-10 text-7xl w-full`}
                >
                  Tangkas <br /> Ais
                </p>
                <div className="w-[1.5px] bg-red-900 absolute left-10 top-30 h-80"></div>
                {/* <div className="w-full bg-red-950 absolute left-0 top-100 h-0.5"></div> */}
                <motion.div className="relative ms-auto w-[80%] h-110 rounded-l-lg overflow-hidden">
                  <Image
                    loading="eager"
                    src="/images/hero.jpg"
                    alt="gallery"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </motion.div>
                <div className="font-serif font-normal text-gray-600 text-right mt-12 pr-4">
                  <p className="text-xs">At last, the moment has arrived.</p>
                  <p className="text-xs">We’re ready to begin our forever.</p>
                  <p className="mb-4 text-xs">We’re tying the knot!</p>
                  <p className="text-red-900 font-semibold text-sm">
                    #ForeverWithYou
                  </p>
                </div>
              </div>
            </motion.section>

            {/* SECTION 4 */}
            <motion.section id="section-4">
              <motion.section
                variants={smoothReveal}
                initial="hidden"
                animate={controlsection3}
                onViewportEnter={() => controlsection3.start("visible")}
                onViewportLeave={() => controlsection3.start("hidden")}
                viewport={{ once: false }}
                className="relative w-full pt-20"
              >
                <Image
                  loading="eager"
                  src="/images/imglogo.png"
                  alt="gallery"
                  width={500}
                  height={500}
                  className="object-contain bg-transparent w-1/3 mx-auto h-full mb-12"
                />
                <p className="font-normal font-serif text-gray-600 text-center text-xs w-full leading-5">
                  Together with our beloved families, <br /> we warmly invite
                  you to join us in celebrating <br />
                  the beginning of our marriage.
                </p>
                <motion.div className="mt-24 relative ms-auto w-full h-110">
                  <h1 className="font-moontime text-7xl text-red-900 absolute left-6 -top-10 z-50">
                    Bride
                  </h1>
                  <Image
                    loading="eager"
                    src="/images/hero.jpg"
                    alt="gallery"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="px-4 pb-2 absolute bottom-0 flex justify-between w-full text-white">
                    <p className={`font-serif text-xs`}>Puspitalia Dwi Aisah</p>
                    <p className="text-gray-200 flex items-center gap-1 text-[9px] font-normal">
                      <GrInstagram className="text-[10px]" />{" "}
                      <span>@aiskw_</span>
                    </p>
                  </div>
                </motion.div>
                <div className="font-serif text-gray-600 font-medium text-left mt-6 px-4">
                  <p className="text-[11px]">The Daughter of</p>
                  <p className="text-[11px]">Mr. Father and</p>
                  <p className="mb-4 text-[11px]">Mrs. Mother</p>
                </div>
              </motion.section>

              <motion.section
                variants={smoothReveal}
                initial="hidden"
                animate={controlsection4}
                onViewportEnter={() => controlsection4.start("visible")}
                onViewportLeave={() => controlsection4.start("hidden")}
                viewport={{ once: false }}
                className="relative w-full pb-20"
              >
                <motion.div className="mt-24 relative ms-auto w-full h-110">
                  <h1 className="font-moontime text-7xl text-red-900 absolute right-4 -top-10 z-50">
                    Groom
                  </h1>
                  <Image
                    loading="eager"
                    src="/images/hero.jpg"
                    alt="gallery"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="px-4 pb-2 absolute bottom-0 flex justify-between w-full text-white">
                    <p className="text-gray-200 flex items-center gap-1 text-[9px] font-normal">
                      <GrInstagram className="text-[10px]" />{" "}
                      <span>@tangkasr_</span>
                    </p>
                    <p className={`font-serif text-xs`}>Tangkas Risdianto</p>
                  </div>
                </motion.div>
                <div className="font-serif text-gray-600 font-medium text-right mt-6 px-4">
                  <p className="text-[11px]">The Son of</p>
                  <p className="text-[11px]">Mr. Father and</p>
                  <p className="mb-4 text-[11px]">Mrs. Mother</p>
                </div>
              </motion.section>
            </motion.section>

            {/* SECTION 5 */}
            <motion.section
              id="section-5"
              variants={smoothReveal}
              initial="hidden"
              animate={controlsection5}
              onViewportEnter={() => controlsection5.start("visible")}
              onViewportLeave={() => controlsection5.start("hidden")}
              viewport={{ once: false }}
              className="min-h-screen pb-20 mt-20  relative w-full"
            >
              <motion.div className="relative ms-auto w-full h-110 ">
                <Image
                  loading="eager"
                  src="/images/hero.jpg"
                  alt="gallery"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <p
                  className={`leading-16 font-moontime z-40 text-7xl w-full -rotate-8 absolute left-8 -bottom-22 text-red-900`}
                >
                  Our Love <br /> Story
                </p>
              </motion.div>
              <div
                className={`font-serif text-gray-600 text-xs text-right mt-16 px-4 max-w-[60%] ms-auto`}
              >
                <p className="mb-4">
                  We first met on a pleasant day, introduced by a mutual friend,
                  and what began as a simple conversation soon flowed
                  effortlessly. What started with light exchanges quickly turned
                  into shared laughter we wished would never end. In that
                  moment, something meaningful and special quietly began to grow
                  between us.
                </p>
                <p className="mb-4">
                  As time passed, we journeyed together through both joyful and
                  challenging moments. We learned from one another, shared
                  countless memories, and offered unwavering support along the
                  way. Gradually, we came to realize that this was a path we
                  wished to continue—side by side, hand in hand.
                </p>
                <p className="">
                  Now, we are ready to take the next step and begin a new
                  chapter of our lives together. With hearts full of joy, we
                  warmly invite you to celebrate this special occasion with us
                  on{" "}
                  <span className="font-bold text-red-900">June 7, 2026</span>,
                  as we embark on our journey of forever.
                </p>
              </div>
              <p className="font-serif mt-8  px-4 flex gap-1 items-center justify-end text-red-900 font-semibold">
                <span className="text-[10px]">Met ’24</span>
                <span className="h-px w-4 bg-red-900"></span>
                <span className="text-[10px]">Wed ’26</span>
              </p>
            </motion.section>

            {/* SECTION 6 */}
            <motion.section
              id="section-6"
              variants={smoothReveal}
              initial="hidden"
              animate={controlsection6}
              onViewportEnter={() => controlsection6.start("visible")}
              onViewportLeave={() => controlsection6.start("hidden")}
              viewport={{ once: false }}
              className="min-h-screen pb-40 mt-20 relative w-full"
            >
              <p className="rounded-full font-sans font-semibold z-20 mb-4 text-red-950 -rotate-90 absolute left-6 top-4 text-[9px] w-fit">
                The Day
              </p>
              <div className="w-[1.5px] bg-red-950 absolute left-10 top-12 h-100"></div>
              <motion.div className="relative ms-auto w-[80%] h-110 rounded-l-lg">
                <Image
                  loading="eager"
                  src="/images/hero.jpg"
                  alt="gallery"
                  fill
                  className="object-cover rounded-l-lg"
                  sizes="100vw"
                />
                <p
                  className={`font-moontime text-left z-20 mb-4 text-red-900 absolute -left-12 -bottom-42 text-6xl w-full`}
                >
                  Our Special <br /> Day
                </p>
              </motion.div>
              <div className="w-[1.5px] bg-red-950 absolute left-10 top-152 h-128 rounded-full"></div>
              <div className="w-full bg-red-950 absolute left-0 top-268 h-0.5"></div>
              <div className=" text-right mt-30 pr-4">
                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Akad Nikah
                </p>
                <p className="text-[11px] text-gray-600 font-serif">
                  Sunday, June 7, 2026
                </p>
                <p className="text-[11px] text-gray-600 font-serif mb-10">
                  09:00 WIB - finish
                </p>

                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Reception
                </p>
                <p className="text-[11px] text-gray-600 font-serif">
                  Sunday, June 7, 2026
                </p>
                <p className="text-[11px] text-gray-600 font-serif mb-10">
                  11:00 WIB - finish
                </p>

                <p className="font-serif font-semibold text-lg text-red-950 mb-2">
                  Location
                </p>
                <p className="mb-6 text-[11px] text-gray-600 font-serif">
                  Jl. Kirangga, Jetis Wetan, Pacarejo, <br />
                  Kec. Semanu, Kabupaten Gunungkidul, <br />
                  Daerah Istimewa Yogyakarta
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/3t7kpVXTEMmr6ecR8",
                      "_blank"
                    )
                  }
                  className="cursor-pointer mb-10 w-fit px-4 py-2 rounded bg-red-900 text-white text-xs font-bold"
                >
                  SEE LOCATION
                </button>
                <div className="font-sans text-gray-900 font-semibold flex items-center gap-1 ms-auto w-fit mb-4 text-[11px]">
                  <p>07</p>
                  <p>/</p>
                  <p>06</p>
                  <p>/</p>
                  <p>2026</p>
                </div>
                {/* ⏳ COUNTDOWN */}
                <motion.section className="font-sans flex items-center ms-auto w-fit rounded text-red-900 bg-red-200/30">
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <motion.div key={key} className="px-2 py-1">
                      <p className="font-semibold text-[10px]">{value}</p>
                      <p className="capitalize text-[8px]">{key}</p>
                    </motion.div>
                  ))}
                </motion.section>
              </div>
            </motion.section>

            {/* SECTION 7 */}
            <motion.section
              id="section-7"
              variants={smoothReveal}
              initial="hidden"
              animate={controlsection7}
              onViewportEnter={() => controlsection7.start("visible")}
              onViewportLeave={() => controlsection7.start("hidden")}
              viewport={{ once: false }}
              className="min-h-screen  flex justify-center items-center w-full"
            >
              <div className="relative h-fit w-full">
                <div className="absolute z-40 top-50 w-full">
                  <Image
                    loading="eager"
                    src="/images/imglogowhite.png"
                    alt="gallery"
                    width={500}
                    height={500}
                    className="object-contain bg-transparent w-1/3 mx-auto h-full mb-12"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <motion.div className="mt-16 relative ms-auto w-full h-110 overflow-hidden">
                    <Image
                      loading="eager"
                      src="/images/hero.jpg"
                      alt="gallery"
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>
                  <motion.div className="relative ms-auto w-full h-110 overflow-hidden">
                    <Image
                      loading="eager"
                      src="/images/hero.jpg"
                      alt="gallery"
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>
                </div>
                <div className="flex justify-end px-4 -mt-10">
                  <Link
                    href={"/gallery"}
                    className="cursor-pointer mb-10 w-fit px-4 py-2 rounded bg-red-900 text-white text-xs font-bold"
                  >
                    OPEN GALLERY
                  </Link>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
