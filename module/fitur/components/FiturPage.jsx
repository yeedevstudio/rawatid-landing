import { fiturValue } from "@/common/constant/fiturValue";
import { IconArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FiturPage() {
  return (
    <section className="mx-5 md:mx-12 my-10">
      <div className="flex flex-col gap-4 lg:gap-7">
        <h1 className=" text-2xl md:text-4xl font-semibold text-green">
          Fitur Unggulan
        </h1>
        <Link
          href="#card_1"
          className="text-lg md:text-2xl font-normal text-green flex items-center gap-2 md:gap-4"
        >
          <h2>Lihat Semua Fitur</h2>
          <IconArrowDown className="w-4 h-4 md:w-5 md:h-5 border border-green60 rounded-full" />
        </Link>
      </div>
      {/* card */}
      {fiturValue.map((item, index) => (
        <div data-aos="fade-up" className="mx-4 mt-[4rem] md:mt-[8rem]" key={index} id={item?.id}>
          <div className="grid grid-cols-2 gap-5 items-center">
            <h3 className="text-md md:text-4xl font-medium text-green leading-relaxed">
              {item?.title}
            </h3>
            <div className="flex items-center justify-end">
              <Image
                src={item?.image}
                alt="hero_image"
                width={1000}
                height={1000}
                className=" w-[27rem] rounded-tr-[6rem] rounded-bl-[6rem] md:rounded-tr-[15rem] md:rounded-bl-[15rem]"
              />
            </div>
          </div>
          {item.list.map((item, index) => (
            <div
              className="mt-10 flex items-center gap-4 md:gap-10"
              key={index}
            >
              <div>
                <Image
                  src={"/images/image_small.svg"}
                  alt="image_small"
                  width={150}
                  height={150}
                  className="w-[4rem] h-[4rem] md:w-full md:h-full"
                />
              </div>
              <div className="w-[90%]">
                <h3 className="text-sm md:text-3xl font-medium text-green mb-2">
                  {item?.title}
                </h3>
                <h4 className="text-justify text-xs md:text-2xl font-normal text-neutral90">
                  {item?.description}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* card */}
    </section>
  );
}
