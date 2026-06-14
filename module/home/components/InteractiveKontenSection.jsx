"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

const CARD_MAX_WIDTH_PX = 428;
const CARD_MOBILE_CLASS = "h-auto w-auto max-w-[260px] sm:max-w-[340px] md:max-w-[428px]";
const CARD_SLOT = "block shrink-0 snap-start";

const GUTTER = "px-5 md:px-12 lg:px-20 xl:px-24";
const SCROLL_EDGE = "-mx-5 md:-mx-12 lg:-mx-20 xl:-mx-24 pl-5 md:pl-12 lg:pl-20 xl:pl-24";

const SUBTITLE = "Pelajari lebih dalam informasi kesehatan dengan data dan visual";

const IMAGE_CARDS = [
  { src: "/image/cacar.png",    href: "/cacar-air" },
  { src: "/image/herpes.png",   href: "/herpes-simplex" },
  { src: "/image/hepa.png",     href: "/hepatitis" },
  { src: "/image/dbdcover.png", href: "/dbd" },
  { src: "/image/kursi.png",    href: "/interaktif/poliomielitis" },
  { src: "/image/demam.png",    href: "/demam-tifoid" },
];

const COMPOSITE_CARDS = [
  {
    id: "flu-burung",
    src: "/image/fluburung.svg",
    href: "/interaktif/flu-burung",
    title: "Flu Burung",
    subtitle: "Penyakit yang disebabkan oleh virus influenza dari unggas",
    cardBg: "#C8E9E6",
    gradFrom: "transparent",
    gradTo: "#3A9992",
  },
  {
    id: "cacar-monyet",
    src: "/image/cacarmonyet.svg",
    href: "/interaktif/cacar-monyet",
    title: "Cacar Monyet",
    subtitle: "Infeksi virus zoonotik yang dapat menular antar manusia",
    cardBg: "#C8E9E6",
    gradFrom: "transparent",
    gradTo: "#3A9992",
  },
];

// Full-bleed card: illustration fills entire card, gradient overlay + text at bottom
function CompositeCard({ card }) {
  const inner = (
    <div
      className="relative overflow-hidden rounded-[1.4rem] select-none w-[235px] sm:w-[305px] md:w-[395px]"
      style={{ aspectRatio: "415 / 546", background: card.cardBg }}
    >
      {/* Full bleed illustration */}
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 428px"
      />

      {/* Gradient overlay from transparent → solid, same style as PNG cards */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] flex flex-col justify-end px-[8%] pb-[7%] pt-[10%]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${card.gradTo}CC 40%, ${card.gradTo} 100%)`,
        }}
      >
        <h3 className="text-white font-bold leading-tight text-xl sm:text-2xl md:text-[1.65rem]">{card.title}</h3>
        <p className="mt-2 text-white/85 leading-snug text-xs sm:text-sm md:text-[0.9rem]">{card.subtitle}</p>
      </div>
    </div>
  );

  return card.href ? (
    <Link
      href={card.href}
      className={`${CARD_SLOT} self-center mx-3 md:mx-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#038F7A]`}
    >
      {inner}
    </Link>
  ) : (
    <div className={`${CARD_SLOT} self-center mx-3 md:mx-4`}>{inner}</div>
  );
}

// All cards in order: existing image cards first, then composite
const ALL_CARDS = [
  ...IMAGE_CARDS.map((c) => ({ type: "image", ...c })),
  ...COMPOSITE_CARDS.map((c) => ({ type: "composite", ...c })),
];

function getVisibleCardIndices(scroller, row, thresholdPx = 8) {
  if (!scroller || !row?.children.length) return [0];

  const c = scroller.getBoundingClientRect();
  const indices = [];

  Array.from(row.children).forEach((child, i) => {
    const r = child.getBoundingClientRect();
    const w = Math.min(r.right, c.right) - Math.max(r.left, c.left);
    if (w > thresholdPx) indices.push(i);
  });

  return indices.length ? indices : [0];
}

function arraysEqualAsSets(a, b) {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}


export default function InteractiveKontenSection({ variant = "default" }) {
  const scrollerRef = useRef(null);
  const [visibleIndices, setVisibleIndices] = useState([0]);

  const updateVisibleFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    const row = el?.firstElementChild;
    if (!el || !row) return;

    const next = getVisibleCardIndices(el, row);
    setVisibleIndices((prev) => (arraysEqualAsSets(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateVisibleFromScroll();

    const onScroll = () => updateVisibleFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateVisibleFromScroll();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => updateVisibleFromScroll());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [updateVisibleFromScroll]);

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    const row = el?.firstElementChild;
    const card = row?.children[index];
    if (!el || !card || !row) return;

    el.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  };

  const primaryVisible = visibleIndices.length > 0 ? Math.min(...visibleIndices) : 0;

  const isBlog = variant === "blog";
  const sectionY = isBlog ? "py-0 my-[3rem] md:my-[4rem]" : "py-12 md:py-16 lg:py-20";

  const inner = (
    <>
      <h2 className="text-center lg:text-left text-2xl font-semibold leading-tight text-[#038F7A] md:text-3xl lg:text-[2rem]">Interaktif Konten</h2>
      <p className="mt-1.5 max-w-3xl text-center lg:text-left text-base font-normal leading-snug text-[#038F7A]/85 md:mt-2 md:text-lg lg:text-xl">{SUBTITLE}</p>

      <div className={`${isBlog ? "" : SCROLL_EDGE} mt-3 md:mt-4`}>
        <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
          <div className="flex w-max min-w-0">
            {ALL_CARDS.map((card, i) => {
              if (card.type === "composite") {
                return <CompositeCard key={card.id} card={card} />;
              }
              return card.href ? (
                <Link key={card.src} href={card.href} className={`${CARD_SLOT} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#038F7A]`}>
                  <Image
                    src={card.src}
                    alt=""
                    width={CARD_MAX_WIDTH_PX}
                    height={CARD_MAX_WIDTH_PX}
                    className={CARD_MOBILE_CLASS}
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 428px"
                    priority={i === 0}
                  />
                </Link>
              ) : (
                <div key={card.src} className={CARD_SLOT}>
                  <Image
                    src={card.src}
                    alt=""
                    width={CARD_MAX_WIDTH_PX}
                    height={CARD_MAX_WIDTH_PX}
                    className={CARD_MOBILE_CLASS}
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 428px"
                    priority={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center md:mt-4">
        <div role="group" aria-label="Indikator kartu interaktif" className="flex h-11 w-full max-w-md items-stretch overflow-hidden rounded-none border border-neutral-300 bg-white sm:h-12 md:max-w-lg">
          {ALL_CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-current={primaryVisible === i ? "true" : undefined}
              aria-label={`Kartu ke-${i + 1} dari ${ALL_CARDS.length}${visibleIndices.includes(i) ? " (terlihat)" : ""}`}
              onClick={() => scrollToIndex(i)}
              className="relative z-10 flex min-h-[44px] min-w-0 flex-1 items-center justify-center border-r border-neutral-300 px-1 last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2"
            >
              <span aria-hidden className={`block h-1.5 w-[58%] max-w-[3.5rem] rounded-none transition-colors duration-200 ${visibleIndices.includes(i) ? "bg-[#038F7A]" : "bg-neutral-300 hover:bg-neutral-400"}`} />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className={`w-full ${sectionY}`}>
      {isBlog ? inner : <div className={GUTTER}>{inner}</div>}
    </section>
  );
}
