import Image from "next/image";
import React from "react";

const TOP_CARDS = [
  {
    image: "/image/tameng.png",
    title: "Dapat Dicegah",
    text: "Polio dapat dicegah  100% dengan vaksinasi",
  },
  {
    image: "/image/tigaorang.png",
    title: "Lindungi Komunitas",
    text: "Vaksinasi melindungi diri sendiri dan orang lain",
  },
  {
    image: "/image/bumi.png",
    title: "Gerakan Global",
    text: "Program vaksinasi global  berhasil turunkan kasus",
  },
  {
    image: "/image/hati.png",
    title: "Masa Depan Bebas Polio",
    text: "Dukungan semua pihak penting untuk basmi polio selamanya",
  }
  
];



const cardBase =
  "flex flex-col items-stretch rounded-[16px] border border-neutral-200/90 bg-white px-4 py-6 shadow-[0px_0px_12.1px_0px_#0000001A] md:px-5 md:py-8";

function TopInfoCard({ image, title, text }) {
  return (
    <div className={`${cardBase} min-h-0 min-w-0 gap-4 md:min-h-[320px] md:gap-5`}>
      <div className="flex w-full justify-center">
        <Image
          src={image}
          alt=""
          width={160}
          height={160}
          className="h-28 w-auto max-w-[9rem] object-contain md:h-36 md:max-w-[10rem]"
        />
      </div>
      <h3 className="w-full text-center text-[15px] font-bold leading-snug text-neutral-900 md:text-base">{title}</h3>
      <p className="w-full max-w-none text-center text-[13px] font-normal leading-[1.5] text-neutral-600 md:text-[14px] md:leading-relaxed">
        {text}
      </p>
    </div>
  );
}





export default function ApaItuPolio() {
  return (
    <section className="w-full bg-white px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Apa Itu <em>Poliomielitis</em>?
        </h2>
        <p className="mt-4 w-full text-[15px] font-normal leading-relaxed text-neutral-700 md:mt-5 md:text-[17px] md:leading-[1.7]">
          <em>Poliomielitis</em> atau yang biasa disebut sebagai polio adalah salah satu penyakit yang telah mengubah sejarah kesehatan dunia. Dalam beberapa dekade lalu, polio menghantui jutaan orang tua karena kemampuannya melumpuhkan anak-anak dalam semalam. Berkat program vaksinasi global yang masif, polio hampir berhasil dibasmi dari muka bumi. Namun polio belum sepenuhnya hilang dan masih ada ancaman bagi komunitas yang cakupan vaksinasinya rendah.
        </p>
      </div>

      <div data-aos="fade-up" suppressHydrationWarning className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:mt-10">
        {TOP_CARDS.map((c) => (
          <TopInfoCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}





