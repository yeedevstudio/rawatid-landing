"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

const CARD_MAX_WIDTH_PX = 428;
const CARD_SLOT = "block shrink-0 snap-start";

const GUTTER = "px-5 md:px-12 lg:px-20 xl:px-24";
const SCROLL_EDGE = "-mx-5 md:-mx-12 lg:-mx-20 xl:-mx-24 pl-5 md:pl-12 lg:pl-20 xl:pl-24";

const SUBTITLE = "Pelajari lebih dalam informasi kesehatan dengan data dan visual";

const SOURCES = ["/image/cacar.png", "/image/herpes.png", "/image/hepa.png", "/image/dbdcover.png", "/image/kursi.png", "/image/demam.png"];


const CARD_HREF_BY_SRC = {
  "/image/cacar.png": "/cacar-air",
  "/image/herpes.png": "/herpes-simplex",
  "/image/dbdcover.png": "/dbd",
  "/image/hepa.png": "/hepatitis",
  "/image/kursi.png": "/interaktif/poliomielitis",
  "/image/demam.png": "/demam-tifoid",
};

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
      <h2 className="text-left text-2xl font-semibold leading-tight text-[#038F7A] md:text-3xl lg:text-[2rem]">Interaktif Konten</h2>
      <p className="mt-1.5 max-w-3xl text-left text-base font-normal leading-snug text-[#038F7A]/85 md:mt-2 md:text-lg lg:text-xl">{SUBTITLE}</p>

      <div className={`${isBlog ? "" : SCROLL_EDGE} mt-3 md:mt-4`}>
        <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
          <div className="flex w-max min-w-0">
            {SOURCES.map((src, i) => {
              const linkedHref = CARD_HREF_BY_SRC[src];
              return linkedHref ? (
                <Link key={src} href={linkedHref} className={`${CARD_SLOT} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#038F7A]`}>
                  <Image
                    src={src}
                    alt=""
                    width={CARD_MAX_WIDTH_PX}
                    height={CARD_MAX_WIDTH_PX}
                    className="h-auto w-auto max-w-[428px]"
                    sizes={`${CARD_MAX_WIDTH_PX}px`}
                    priority={i === 0}
                  />
                </Link>
              ) : (
                <div key={src} className={CARD_SLOT}>
                  <Image
                    src={src}
                    alt=""
                    width={CARD_MAX_WIDTH_PX}
                    height={CARD_MAX_WIDTH_PX}
                    className="h-auto w-auto max-w-[428px]"
                    sizes={`${CARD_MAX_WIDTH_PX}px`}
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
          {SOURCES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-current={primaryVisible === i ? "true" : undefined}
              aria-label={`Kartu ke-${i + 1} dari ${SOURCES.length}${visibleIndices.includes(i) ? " (terlihat)" : ""}`}
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
