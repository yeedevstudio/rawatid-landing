"use client";

import { CardServiceValue } from "@/common/constant/cardValue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function ServiceSection() {
  const [showAll, setShowAll] = useState({});
  const [selected, setSelected] = useState(3);

  const handleSelected = (index) => {
    setSelected(index);
  };

  const handleToggleShowAll = (index) => {
    setShowAll((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  function formatPrice(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <section data-aos="fade-up" className="mx-5 md:mx-12">
      <div>
        <h2 className=" text-2xl md:text-3xl font-medium text-green">
          Paket Layanan
        </h2>
        <h3 className="text-lg md:text-2xl font-normal">
          Coba gratis sekarang, pilih paket yang sesuai dengan kebutuhanmu!
        </h3>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-3 gap-y-3 md:gap-6 mt-10 place-items-center lg:place-items-baseline w-full"
        )}
      >
        {CardServiceValue?.map((card, index) => {
          const cardLength = card.list.length;
          let filteredList = [];
          const visibleItems = showAll[index + 1]
            ? (filteredList = card?.list?.map((item) => item))
            : (filteredList = card?.list?.filter((item) => !item.hide));

          return (
            <Card
              className={cn(
                " shadow-none relative transition-all duration-300 ease-in-out w-full md:w-[65%] lg:w-full",
                selected === index + 1 && "bg-green",
                showAll[index + 1]
                  ? "h-full"
                  : "h-[36rem] max-h-[36rem] md:h-[40rem] md:max-h-[40rem]"
              )}
              key={index + 1}
              onClick={() => handleSelected(index + 1)}
            >
              <CardContent className="mt-5">
                <h2
                  className={cn(
                    "text-xl md:text-2xl font-medium mb-2",
                    selected === index + 1 && "text-white"
                  )}
                >
                  {card.title}
                </h2>
                <h3
                  className={cn(
                    "text-xl md:text-2xl font-normal line-through text-neutral90 mb-2",
                    selected === index + 1 && "text-white"
                  )}
                >
                  Rp. {formatPrice(card.price)} / Bulan
                </h3>
                <h4
                  className={cn(
                    "text-sm md:text-base text-green",
                    selected === index + 1 && "text-white"
                  )}
                >
                  Coba sekarang, gratis untuk 1 tahun pertama
                </h4>
                <div className={cn("mt-7")}>
                  <ul className="flex flex-col gap-2">
                    {visibleItems?.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-5">
                        <div
                          className={cn(
                            "bg-green rounded-full p-1",
                            selected === index + 1 && "bg-white"
                          )}
                        >
                          <IconCheck
                            className={cn(
                              "w-3 h-3 text-white",
                              selected === index + 1 && "text-green"
                            )}
                          />
                        </div>
                        <h4
                          className={cn(
                            "text-sm md:text-base",
                            selected === index + 1 && "text-white"
                          )}
                        >
                          {item.title}
                        </h4>
                      </li>
                    ))}
                  </ul>
                </div>
                {cardLength > 11 && (
                  <button
                    onClick={() => handleToggleShowAll(index + 1)}
                    className={cn(
                      "mt-5 text-center w-full text-green transition-all duration-75 ease-in-out text-sm md:text-base",
                      selected === index + 1 && "text-white",
                      showAll[index + 1] && "mb-16"
                    )}
                  >
                    {showAll[index + 1] ? "Sembunyikan" : "Selengkapnya"}
                  </button>
                )}
              </CardContent>
              <CardFooter className="absolute bottom-0 w-full ">
                <Link
                  href={`/register?id=${index + 1}`}
                  className="w-full"
                  title={`Daftar Sekarang ${index + 1}`}
                >
                  <Button
                    aria-label="Daftar Sekarang"
                    className={cn(
                      "w-full bg-white border-2 shadow-none hover:bg-white rounded-lg h-[2.5rem] md:h-[3rem]",
                      selected === index + 1 ? "text-green" : "text-black"
                    )}
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
