"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

// const images = [
//   "/images/templateimage.jpeg",
//   "/images/templateimage.jpeg",
//   "/images/templateimage.jpeg",
//   "/images/templateimage.jpeg",
//   "/images/templateimage.jpeg",
// ];
const images = [
  "/images/templateimg.jpg",
  "/images/templateimg.jpg",
  "/images/templateimg.jpg",
  "/images/templateimg.jpg",
  "/images/templateimg.jpg",
];

export default function GallerySwiper() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        spaceBetween={0}
        autoplay={{ delay: 2200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="gallery-swiper"
        style={{ height: "100vh" }}
      >
        {/* Slide 1 — grid 2 kolom */}
        <SwiperSlide style={{ height: "60vh" }}>
          <div className="grid grid-cols-2 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={images[0]}
                alt="1"
                fill
                className="object-cover"
                sizes="50vw"
                loading="eager"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src={images[1]}
                alt="2"
                fill
                className="object-cover"
                sizes="50vw"
                loading="eager"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 — full lebar */}
        <SwiperSlide style={{ height: "60vh" }}>
          <div className="relative w-full h-full">
            <Image
              src={images[2]}
              alt="3"
              fill
              className="object-cover"
              sizes="100vw"
              loading="eager"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 — grid: kiri 2 baris, kanan 1 */}
        <SwiperSlide style={{ height: "60vh" }}>
          <div className="grid grid-cols-2 w-full h-full">
            <div className="flex flex-col h-full">
              <div className="relative flex-1">
                <Image
                  src={images[3]}
                  alt="4"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
              <div className="relative flex-1">
                <Image
                  src={images[4]}
                  alt="5"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
            </div>
            <div className="relative w-full h-full">
              <Image
                src={images[0]}
                alt="6"
                fill
                className="object-cover"
                sizes="50vw"
                loading="eager"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 — grid: kiri 1, kanan 2 baris */}
        <SwiperSlide style={{ height: "60vh" }}>
          <div className="grid grid-cols-2 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={images[1]}
                alt="7"
                fill
                className="object-cover"
                sizes="50vw"
                loading="eager"
              />
            </div>
            <div className="flex flex-col h-full">
              <div className="relative flex-1">
                <Image
                  src={images[2]}
                  alt="8"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
              <div className="relative flex-1">
                <Image
                  src={images[3]}
                  alt="9"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 — FULL SCREEN (1 layar penuh) */}
        <SwiperSlide style={{ height: "100vh" }}>
          <div className="relative w-full h-full">
            <Image
              src={images[4]}
              alt="full"
              fill
              className="object-cover"
              sizes="100vw"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-end justify-center pb-20 z-10">
              <div className="text-center text-white">
                <p className="font-moontime text-5xl mb-2">Tangkas & Ais</p>
                <p className="font-serif text-xs tracking-widest text-white/80">
                  7 · 06 · 2026
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
