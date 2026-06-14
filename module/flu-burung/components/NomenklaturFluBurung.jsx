import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const SUBTIPE_LIST = [
  {
    label: "H5N1",
    text: "subtipe paling dikenal dan paling mematikan bagi manusia. Pertama kali terdeteksi pada manusia di Hong Kong 1997. Terus berevolusi dan masih bersirkulasi di banyak negara, termasuk Indonesia.",
  },
  {
    label: "H5N6",
    text: "subtipe yang semakin sering dilaporkan menginfeksi manusia di China, dengan angka kematian yang juga tinggi.",
  },
  {
    label: "H7N9",
    text: "muncul di China pada 2013 dan menyebabkan ratusan kematian pada manusia. Memiliki potensi pandemi yang juga tinggi.",
  },
  {
    label: "H9N2",
    text: "lebih sering menyebabkan penyakit ringan pada manusia, namun penting karena dapat bertukar gen dengan subtipe ganas lainnya.",
  },
  {
    label: "H5N8 dan H5N2",
    text: "subtipe yang terutama mengancam unggas, dengan laporan infeksi manusia yang sangat jarang.",
  },
  {
    label: "H10N3, H10N1, H3N8",
    text: "subtipe yang lebih baru dengan laporan infeksi sporadis pada manusia.",
  },
];

const KLASIFIKASI_CARDS = [
  {
    image: "/image/hpai.svg",
    title: "Highly Pathogenic Avian Influenza (HPAI)",
    text: "subtipe sangat ganas yang menyebabkan penyakit berat dan kematian massal pada unggas. H5N1 dan H5N8 termasuk dalam kategori ini. Wabah HPAI wajib dilaporkan ke OIE (Organisasi Kesehatan Hewan Dunia).",
  },
  {
    image: "/image/chiken.svg",
    title: "Low Pathogenic Avian Influenza (LPAI)",
    text: "subtipe dengan patogenisitas rendah yang menyebabkan penyakit ringan atau tanpa gejala pada unggas, namun tetap berpotensi menginfeksi manusia. Beberapa LPAI dapat bermutasi menjadi HPAI.",
  },
];

export default function NomenklaturFluBurung() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        {/* Nomenklatur */}
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Nomenklatur Virus: Apa Arti H dan N?
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Virus influenza A diklasifikasikan berdasarkan dua protein di permukaannya: Hemagglutinin (H) dan
          Neuraminidase (N). Kombinasi angka setelah H dan N menentukan subtipe virus. Terdapat 18 jenis H (H1–H18)
          dan 11 jenis N (N1–N11), sehingga secara teoritis ada ratusan kombinasi subtipe yang mungkin.
        </p>

        <ul className="mt-6 space-y-3">
          {SUBTIPE_LIST.map(({ label, text }) => (
            <li key={label} className="flex gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
              <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
              <span>
                <strong>{label}</strong>, {text}
              </span>
            </li>
          ))}
        </ul>

        {/* Klasifikasi */}
        <h2 className="mt-12 text-2xl font-bold text-[#038F7A] md:mt-14 md:text-3xl lg:text-[2rem]">
          Klasifikasi Flu Burung Berdasarkan Patogenisitas pada Unggas
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {KLASIFIKASI_CARDS.map(({ image, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-5 rounded-[16px] bg-white p-6 shadow-[0px_0px_12.1px_0px_#0000001A] text-center md:p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-28 w-28 object-contain md:h-36 md:w-36" />
              <h3 className="text-[15px] font-bold leading-snug text-neutral-900 md:text-base">{title}</h3>
              <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Situasi di Indonesia */}
        <div className="mt-8 rounded-2xl border border-[#E6A817]/40 bg-[#FFF9EC] p-5 md:mt-10 md:p-6 lg:p-7">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6A817]/20 text-[#E6A817] md:h-10 md:w-10">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5] md:h-6 md:w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#B87A00] md:text-base">
                Situasi Flu Burung di Indonesia:
              </h3>
              <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-neutral-800 md:text-[15px] md:leading-[1.65]">
                <p>
                  Indonesia adalah salah satu negara yang paling terdampak flu burung H5N1 di dunia. Sejak wabah
                  pertama dilaporkan pada unggas di Indonesia pada 2003 dan kasus pertama pada manusia pada 2005,
                  Indonesia mencatat lebih dari 200 kasus infeksi H5N1 pada manusia dengan angka kematian sekitar 84%,
                  tertinggi di dunia.
                </p>
                <p>
                  Meski jumlah kasus manusia telah berkurang dalam beberapa tahun terakhir, virus H5N1 masih
                  bersirkulasi pada populasi unggas di Indonesia hingga saat ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
