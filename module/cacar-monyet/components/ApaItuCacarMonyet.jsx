import React from "react";

const DEFINE_CARDS = [
  {
    image: "/image/define1.svg",
    text: "Pada November 2022, WHO secara resmi mengubah nama Monkeypox menjadi Mpox untuk menghindari stigma dan diskriminasi.",
  },
  {
    image: "/image/define2.svg",
    text: "Kasus manusia pertama dilaporkan terjadi pada tahun 1970 di Republik Demokratik Kongo (DRC).",
  },
  {
    image: "/image/define3.svg",
    text: "Wabah besar 2022 menyebar ke lebih dari 110 negara, kebanyakan di luar Afrika.",
  },
  {
    image: "/image/define4.svg",
    text: "Indonesia melaporkan kasus Mpox pertama pada Agustus 2022.",
  },
  {
    image: "/image/define5.svg",
    text: "WHO menetapkan Mpox sebagai Public Health Emergency of International Concern (PHEIC) pada Juli 2022 dan kembali pada Agustus 2024 karena varian baru Clade IB.",
  },
];

export default function ApaItuCacarMonyet() {
  return (
    <section
      id="apa-itu-cacar-monyet"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Definisi dan Pengertian Cacar Monyet
        </h2>

        {/* Text + Reservoir card */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 md:mt-10">
          {/* Left: paragraphs */}
          <div className="flex-1 space-y-4 text-justify text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
            <p>
              Cacar monyet atau Mpox adalah penyakit infeksi virus zoonosis, penyakit yang awalnya berasal dari
              hewan dan dapat menular ke manusia. Penyakit ini disebabkan oleh Monkeypox Virus (MPXV), sebuah virus
              DNA beruntai ganda dari family Poxviridae, genus Orthopoxvirus satu keluarga dengan virus cacar
              (Variola) yang telah berhasil dieradikasi pada tahun 1980.
            </p>
            <p>
              Meski sering disebut sebagai Cacar Monyet, virus ini tidak hanya menginfeksi monyet. Monyet pertama
              kali ditemukan terinfeksi pada 1958 di laboratorium penelitian Denmark, dari sinilah nama itu berasal.
              Namun sebenarnya, reservoir utama virus ini di alam liar diduga adalah berbagai spesies hewan pengerat
              seperti tikus dan tupai tanah di Afrika Tengah dan Barat, bukan monyet.
            </p>
          </div>

          {/* Right: Reservoir Utama card */}
          <div className="w-full shrink-0 lg:w-[320px] xl:w-[360px]">
            <div className="rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
              <h3 className="text-[15px] font-bold text-neutral-900 md:text-base">Reservoir Utama</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/reservoir.webp"
                alt="Peta Reservoir Utama Mpox"
                className="mt-4 h-auto w-full object-contain"
              />
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#038F7A]" />
                <span className="text-[13px] text-neutral-700 md:text-[14px]">Afrika Tengah &amp; Barat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Define cards */}
        <div className="mt-16 flex flex-wrap justify-center sm:justify-start gap-x-10 gap-y-16 md:mt-20">
          {DEFINE_CARDS.map(({ image, text }, i) => (
            <div key={i} className="relative w-[224.8px] mt-[58px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className="absolute -top-[58px] left-1/2 -translate-x-1/2 h-[116px] w-[116px] object-contain z-10"
              />
              <div className="w-[224.8px] h-[295px] rounded-2xl bg-white px-4 pb-5 pt-[74px] shadow-[0px_0px_12.1px_0px_#0000001A] text-center overflow-hidden">
                <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
