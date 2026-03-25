"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import Link from "next/link";
// import "swiper/css/pagination";

export default function GallerySwiper() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className="rounded-t-md absolute top-0 z-50 w-[96%] h-30
        bg-linear-to-t
        from-white/0  via-red-900/10
        to-red-900/40
        "
      ></div>
      <div
        className="rounded-b-md absolute bottom-0 z-50 w-[96%] h-30
        bg-linear-to-b
       from-white/0  via-red-900/10
        to-red-900/40
        "
      ></div>
      <Link
        href="/"
        className="text-white font-sans text-xs absolute font-semibold bottom-0 z-50 right-3"
      >
        Back to home
      </Link>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false} // matikan arrow
        modules={[Autoplay, Pagination]}
        className="mySwiper flex items-center justify-center rounded-md"
      >
        {/* Slide 1 - horizontal */}
        <SwiperSlide key={1}>
          <div className="flex flex-row gap-0 w-full h-[60vh]">
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 1"
                className="object-cover w-full h-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 2"
                className="object-cover w-full h-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - vertical */}
        <SwiperSlide key={2}>
          <div className="flex flex-col gap-0 w-full h-[60vh]">
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 3"
                className="object-cover w-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 4"
                className="object-cover w-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - horizontal */}
        <SwiperSlide key={3}>
          <div className="grid grid-cols-2 gap-0 w-full h-[60vh]">
            <div className="flex flex-col gap-0 h-[60vh]">
              <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
                <Image
                  src="/images/templateimage.jpeg"
                  alt="Tangkas & Ais 5"
                  className="object-cover w-full"
                  sizes="100vw"
                  loading="eager"
                  width={500}
                  height={500}
                />
              </div>
              <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
                <Image
                  src="/images/templateimage.jpeg"
                  alt="Tangkas & Ais 6"
                  className="object-cover w-full"
                  sizes="100vw"
                  loading="eager"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 6"
                className="object-cover w-full h-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 - vertical */}
        <SwiperSlide key={4}>
          <div className="flex flex-col gap-0 w-full h-[60vh]">
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 3"
                className="object-cover w-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 4"
                className="object-cover w-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 - horizontal */}
        <SwiperSlide key={5}>
          <div className="grid grid-cols-2 gap-0 w-full h-[60vh]">
            <div className="relative flex-1 rounded-lg shadow animate-fadeIn">
              <Image
                src="/images/templateimage.jpeg"
                alt="Tangkas & Ais 6"
                className="object-cover w-full h-full"
                sizes="100vw"
                loading="eager"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col gap-0 h-[60vh]">
              <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
                <Image
                  src="/images/templateimage.jpeg"
                  alt="Tangkas & Ais 5"
                  className="object-cover w-full"
                  sizes="100vw"
                  loading="eager"
                  width={500}
                  height={500}
                />
              </div>
              <div className="relative flex-1 rounded-lg shadow animate-fadeIn h-1/5">
                <Image
                  src="/images/templateimage.jpeg"
                  alt="Tangkas & Ais 6"
                  className="object-cover w-full"
                  sizes="100vw"
                  loading="eager"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 6 - horizontal */}
        <SwiperSlide key={6}>
          <div className="w-full h-[60vh] relative rounded-lg shadow animate-fadeIn">
            <Image
              src="/images/templateimage.jpeg"
              alt="Tangkas & Ais 6"
              className="object-cover w-full h-full"
              sizes="100vw"
              loading="eager"
              width={500}
              height={500}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
