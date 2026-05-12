"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════
   DATA — 20 foto, semua pakai dummy image
══════════════════════════════════════════ */
const DUMMY = "/images/templateimg.jpg";

const PHOTOS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: DUMMY,
  label: [
    "Momen Indah", "Cerita Kita", "Selalu Bersama", "Langkah Berdua",
    "Rasa Bahagia", "Dalam Pelukan", "Tatapan Manis", "Satu Hati",
    "Waktu Berharga", "Cinta Sederhana", "Dekat Denganmu", "Bintang Malam",
    "Pelangi Hati", "Tempat Pulang", "Harmoni Cinta", "Ruang Kenangan",
    "Bahagia Bersama", "Cerita Manis", "Senyum Hari Ini", "Abadi Bersama",
  ][i],
  // Vary object-position so each "feels" different
  pos: [
    "50% 25%","45% 55%","60% 45%","50% 70%","35% 40%",
    "65% 35%","50% 15%","40% 60%","55% 45%","50% 60%",
    "38% 30%","62% 40%","50% 80%","44% 50%","56% 50%",
    "50% 22%","36% 58%","64% 58%","50% 68%","48% 42%",
  ][i],
}));

/* ══════════════════════════════════════════
   PORTRAIT-ONLY GRID PLACEMENTS
   3-col grid, row-unit = base height
   All items: colSpan ≤ rowSpan (portrait/square)
   No gaps — every cell filled.
══════════════════════════════════════════ */
// [colStart, rowStart, colSpan, rowSpan]
const PLACEMENTS: [number, number, number, number][] = [
  [1, 1,  2, 2],  //  0  big 2×2    rows 1-2,   cols 1-2
  [3, 1,  1, 2],  //  1  tall 1×2   rows 1-2,   col 3
  [1, 3,  1, 2],  //  2  tall 1×2   rows 3-4,   col 1
  [2, 3,  1, 1],  //  3  small      row 3,      col 2
  [3, 3,  1, 1],  //  4  small      row 3,      col 3
  [2, 4,  1, 1],  //  5  small      row 4,      col 2
  [3, 4,  1, 1],  //  6  small      row 4,      col 3
  [1, 5,  1, 1],  //  7  small      row 5,      col 1
  [2, 5,  1, 1],  //  8  small      row 5,      col 2
  [3, 5,  1, 2],  //  9  tall 1×2   rows 5-6,   col 3
  [1, 6,  1, 1],  // 10  small      row 6,      col 1
  [2, 6,  1, 1],  // 11  small      row 6,      col 2
  [1, 7,  1, 2],  // 12  tall 1×2   rows 7-8,   col 1
  [2, 7,  2, 2],  // 13  big 2×2    rows 7-8,   cols 2-3
  [1, 9,  2, 2],  // 14  big 2×2    rows 9-10,  cols 1-2
  [3, 9,  1, 2],  // 15  tall 1×2   rows 9-10,  col 3
  [1, 11, 1, 2],  // 16  tall 1×2   rows 11-12, col 1
  [2, 11, 1, 1],  // 17  small      row 11,     col 2
  [3, 11, 1, 2],  // 18  tall 1×2   rows 11-12, col 3
  [2, 12, 1, 1],  // 19  small      row 12,     col 2
];

/* ══════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════ */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = PHOTOS[index];

  // Keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  // Touch swipe left/right
  const tx = useRef(0);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(10,6,4,0.96)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      onTouchStart={(e) => { tx.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = tx.current - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 50) { e.stopPropagation(); dx > 0 ? onNext() : onPrev(); }
      }}
    >
      {/* Outer row: [←] [card] [→] */}
      <div
        className="flex items-center gap-4 w-full"
        style={{ maxWidth: "min(420px, 94vw)", padding: "0 12px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* PREV */}
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 40, height: 40,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: index === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.85)",
            cursor: index === 0 ? "default" : "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* CARD */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Image frame */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "3/4",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
            }}
          >
            <Image
              key={index}
              src={photo.src}
              alt={photo.label}
              fill
              className="object-cover"
              style={{ objectPosition: photo.pos }}
              sizes="420px"
            />
            {/* Corner accents */}
            {(["tl","tr","bl","br"] as const).map((c) => (
              <span key={c} className="absolute pointer-events-none" style={{
                width: 16, height: 16,
                top:    c.startsWith("t") ? 0 : undefined,
                bottom: c.startsWith("b") ? 0 : undefined,
                left:   c.endsWith("l")  ? 0 : undefined,
                right:  c.endsWith("r")  ? 0 : undefined,
                borderTop:    c.startsWith("t") ? "1px solid rgba(255,255,255,0.45)" : undefined,
                borderBottom: c.startsWith("b") ? "1px solid rgba(255,255,255,0.45)" : undefined,
                borderLeft:   c.endsWith("l")   ? "1px solid rgba(255,255,255,0.45)" : undefined,
                borderRight:  c.endsWith("r")   ? "1px solid rgba(255,255,255,0.45)" : undefined,
              }} />
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-center gap-2 text-center">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.8rem", fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
              {photo.label}
            </span>
            <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              / {PHOTOS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", borderRadius: 1, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${((index + 1) / PHOTOS.length) * 100}%`,
              background: "rgba(255,255,255,0.5)",
              transition: "width 0.35s ease",
            }} />
          </div>
        </div>

        {/* NEXT */}
        <button
          onClick={onNext}
          disabled={index === PHOTOS.length - 1}
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 40, height: 40,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: index === PHOTOS.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.85)",
            cursor: index === PHOTOS.length - 1 ? "default" : "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: 36, height: 36,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN GALLERY SWIPER
══════════════════════════════════════════ */
export default function GallerySwiper() {
  const [active, setActive] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── INFINITE AUTO-SCROLL ──
  // We render photos 3× (triple) so when we reach end of first copy,
  // we silently jump to the middle copy — user never sees a rewind.
  const ROW_UNIT = 140; // px per row unit (matches grid-auto-rows)
  const GAP = 4;        // gap between cells
  // Total grid height: 12 rows × (ROW_UNIT + GAP) - GAP
  const SINGLE_HEIGHT = 12 * (ROW_UNIT + GAP) - GAP;

  const autoScrollRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const posRef = useRef(SINGLE_HEIGHT); // start at middle copy
  const lastTimeRef = useRef<number>(0);
  const SPEED = 40; // px per second

  // Initialize scroll position to middle copy
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = SINGLE_HEIGHT;
      posRef.current = SINGLE_HEIGHT;
    }
  }, [SINGLE_HEIGHT]);

  const runScroll = useCallback((ts: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = ts;
    const dt = (ts - lastTimeRef.current) / 1000;
    lastTimeRef.current = ts;

    if (!pausedRef.current && scrollRef.current) {
      posRef.current += SPEED * dt;

      // When we've scrolled past the end of the 2nd copy (into 3rd),
      // silently jump back to start of 2nd copy — seamless loop
      if (posRef.current >= SINGLE_HEIGHT * 2) {
        posRef.current -= SINGLE_HEIGHT;
        scrollRef.current.scrollTop = posRef.current;
      } else {
        scrollRef.current.scrollTop = posRef.current;
      }
    }

    autoScrollRef.current = requestAnimationFrame(runScroll);
  }, [SINGLE_HEIGHT]);

  useEffect(() => {
    autoScrollRef.current = requestAnimationFrame(runScroll);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [runScroll]);

  // Pause when lightbox is open
  useEffect(() => {
    pausedRef.current = active !== null;
  }, [active]);

  // Manual scroll: sync posRef when user drags
  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const y = scrollRef.current.scrollTop;
    posRef.current = y;
    // Wrap if needed
    if (y < SINGLE_HEIGHT * 0.5) {
      posRef.current = y + SINGLE_HEIGHT;
      scrollRef.current.scrollTop = posRef.current;
    } else if (y >= SINGLE_HEIGHT * 2) {
      posRef.current = y - SINGLE_HEIGHT;
      scrollRef.current.scrollTop = posRef.current;
    }
  }, [SINGLE_HEIGHT]);

  const close = useCallback(() => setActive(null), []);
  const prev  = useCallback(() => setActive((p) => (p !== null ? Math.max(0, p - 1) : 0)), []);
  const next  = useCallback(() => setActive((p) => (p !== null ? Math.min(PHOTOS.length - 1, p + 1) : 0)), []);

  // Render one copy of the grid
  const renderGrid = (keyPrefix: string) => (
    <div
      key={keyPrefix}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: `${ROW_UNIT}px`,
        gap: `${GAP}px`,
        width: "100%",
        height: SINGLE_HEIGHT,
        flexShrink: 0,
      }}
    >
      {PHOTOS.map((photo, i) => {
        const [cs, rs, csp, rsp] = PLACEMENTS[i];
        const isWide = csp >= 2;
        return (
          <div
            key={`${keyPrefix}-${i}`}
            onClick={() => setActive(i)}
            style={{
              gridColumn: `${cs} / span ${csp}`,
              gridRow: `${rs} / span ${rsp}`,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: 3,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              sizes="(max-width: 500px) 50vw, 33vw"
              className="object-cover"
              style={{
                objectPosition: photo.pos,
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
              loading={i < 6 ? "eager" : "lazy"}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
                opacity: 0,
                transition: "opacity 0.35s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
            />
            {/* Label on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                padding: "6px 8px",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                opacity: 0,
                transform: "translateY(4px)",
                transition: "opacity 0.35s, transform 0.35s",
              }}
            />
            {/* Gold dot accent on big items */}
            {isWide && (
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: 8, right: 8, width: 5, height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          background: "#0a0604",
        } as React.CSSProperties}
      >
        {/* Render 3 copies for seamless infinite loop */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {renderGrid("copy-a")}
          {renderGrid("copy-b")}
          {renderGrid("copy-c")}
        </div>
      </div>

      {/* LIGHTBOX */}
      {active !== null && (
        <Lightbox index={active} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  );
}
