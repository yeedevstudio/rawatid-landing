"use client";

import Link from "next/link";
import CardHome from "@/common/components/CardHome";
import ChevronButton from "@/common/components/ChevronButton";
import { CardValue } from "@/common/constant/cardValue";
import { useState, useEffect, useRef } from "react";

export default function FiturSection() {
  const cardContainerRef = useRef(null);
  const cardRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleSelected = (index) => {
    setSelected(index);
  };

  const handleScroll = () => {
    if (cardContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollByCard = (direction) => {
    if (cardContainerRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 48;
      const scrollAmount = direction === "right" ? cardWidth : -cardWidth;

      cardContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (cardContainerRef.current) {
      cardContainerRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (cardContainerRef.current) {
        cardContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="bg-grayHeader h-full py-10">
      <div className="mx-5 md:mx-12 flex flex-col gap-y-2 md:gap-y-4">
        <h2 className="text-2xl md:text-3xl text-green font-medium">
          Fitur Unggulan
        </h2>
        <h3 className="text-lg md:text-2xl font-normal">
          Fitur rekam medis elektronik lengkap dan anjungan pendaftaran sampai
          laporan pendapatan, tinggal sesuaikan dengan kebutuhanmu!
        </h3>
      </div>
      <div className="relative">
        <div className="absolute right-10 top-[45%]">
          <ChevronButton
            direction="right"
            onClick={() => scrollByCard("right")}
          />
        </div>
        <div className="absolute left-10 top-[45%]">
          <ChevronButton
            direction="left"
            onClick={() => scrollByCard("left")}
            disabled={isAtStart}
          />
        </div>
        <div
          ref={cardContainerRef}
          className="mt-[3rem] md:mt-[6rem] ml-5 md:ml-[3rem] overflow-x-scroll h-[32rem] flex gap-[2rem] md:gap-[3rem] scrollbar-hide"
        >
          {CardValue?.map((item, index) => (
            <div key={index} ref={index === 0 ? cardRef : null}>
              <Link href={item.link}>
                <CardHome
                  images={item.images}
                  altImage={item.altImage}
                  title={item.title}
                  description={item.description}
                  selected={selected === index}
                  onSelect={() => handleSelected(index)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/fitur"
        className="text-lg md:text-xl text-green font-medium underline mx-5 md:mx-12 md:mt-[2rem]"
      >
        Lihat Selengkapnya
      </Link>
    </section>
  );
}
