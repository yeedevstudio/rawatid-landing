import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const ANTIVIRUS_CARDS = [
  {
    image: "/image/spesifik1.webp",
    title: "Tecovirimat (TPOXX/ST-246)",
    text: "obat antivirus yang disetujui FDA untuk pengobatan cacar dan telah mendapat otorisasi penggunaan darurat untuk Mpox. Mekanisme kerja: menghambat protein VP37 yang diperlukan untuk pembentukan virus ekstraseluler. Tersedia dalam bentuk oral dan intravena. WHO merekomendasikan penggunaannya untuk kasus berat, immunocompromised, anak-anak, dan ibu hamil.",
  },
  {
    image: "/image/spesifik2.webp",
    title: "Cidofovir dan Brincidofovir",
    text: "antivirus yang juga aktif melawan virus pox, digunakan sebagai pilihan alternatif atau tambahan untuk kasus yang sangat berat. Memiliki efek samping yang lebih signifikan dibanding Tecovirimat.",
  },
  {
    image: "/image/spesifik3.webp",
    title: "Vaccinia Immune Globulin (VIG)",
    text: "imunoglobulin dari orang yang telah divaksinasi, dapat digunakan sebagai tambahan pengobatan untuk kasus sangat berat atau pada penderita dengan imunodefisiensi berat.",
  },
];

const SUPORTIF_CARDS = [
  {
    image: "/image/suportif1.webp",
    text: "Istirahat cukup dan pemenuhan kebutuhan cairan dengan minum air yang cukup dan konsumsi makanan bergizi.",
  },
  {
    image: "/image/suportif2.webp",
    text: "Jaga lesi tetap bersih dan kering. Cuci dengan air sabun lembut atau antiseptik ringan. Hindari memecahkan lepuhan, karena dapat meningkatkan risiko infeksi bakteri sekunder dan memperlambat penyembuhan.",
  },
  {
    image: "/image/suportif3.webp",
    text: "Dokter biasanya akan memberikan parasetamol atau ibuprofen sesuai dosis untuk meredakan demam dan nyeri. Kompres dingin untuk lesi yang sangat nyeri.",
  },
  {
    image: "/image/suportif4.webp",
    text: "Kumur dengan air garam hangat atau antiseptik mulut untuk lesi di rongga mulut. Makan makanan lunak jika nyeri menyulitkan makan.",
  },
  {
    image: "/image/suportif5.webp",
    text: "Tetes mata salin steril untuk lesi okular. Segera rujuk ke dokter mata jika ada keterlibatan mata yang signifikan.",
  },
  {
    image: "/image/suportif6.webp",
    text: "Penderita harus diisolasi di rumah atau fasilitas kesehatan hingga semua lesi sembuh sempurna untuk mencegah penularan.",
  },
];

export default function PenangananCacarMonyet() {
  return (
    <section
      id="penanganan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Penanganan dan Pengobatan Cacar Monyet
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Sebagian besar kasus Cacar Monyet yang tidak berkomplikasi akan sembuh sendiri dalam 2–4 minggu dengan
          perawatan suportif yang baik. Namun beberapa kasus memerlukan pengobatan antivirus spesifik, terutama pada
          kelompok dengan resiko tinggi.
        </p>

        <h3 className="mt-8 text-[24px] font-medium text-[#038F7A] md:mt-10">
          Penanganan Suportif untuk Semua Kasus
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {SUPORTIF_CARDS.map(({ image, text }) => (
            <div key={text} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>
        {/* Pengobatan Antivirus Spesifik */}
        <h3 className="mt-10 text-[24px] font-medium text-[#038F7A] md:mt-12">
          Pengobatan Antivirus Spesifik
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Pengobatan antivirus dipertimbangkan untuk kasus Cacar Monyet berat atau risiko tinggi:
        </p>

        <div className="mt-5 flex flex-col gap-4 md:gap-5">
          {ANTIVIRUS_CARDS.map(({ image, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <div className="flex flex-col gap-2">
                <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Yellow callout - Layanan Kesehatan */}
        <div className="mt-8 rounded-2xl border border-[#DB8B1A]/40 p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/10 text-[#DB8B1A] md:h-9 md:w-9">
              <IconInfoCircle className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[20px] font-semibold leading-snug text-[#DB8B1A]">
                Layanan Kesehatan Mpox di Indonesia
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Di Indonesia, penanganan Cacar Monyet dilakukan di fasilitas kesehatan yang ditunjuk Kemenkes. Segera
                hubungi Puskesmas atau Rumah Sakit terdekat jika mengalami ruam yang mencurigakan, terutama jika
                disertai demam dan pembengkakan kelenjar. Jangan mengobati sendiri.
              </p>
            </div>
          </div>
        </div>

        {/* Vaksinasi */}
        <h3 className="mt-10 text-[24px] font-medium text-[#038F7A] md:mt-12">
          Vaksinasi sebagai Pencegahan Terhadap Cacar Monyet
        </h3>

        <div className="mt-5 flex flex-col gap-4 md:gap-5">
          {[
            {
              image: "/image/vaksin1.webp",
              title: "Vaksin MVA-BN (JYNNEOS/Imvamune/Imvanex)",
              text: "vaksin generasi ketiga yang disetujui FDA dan EMA untuk pencegahan Mpox dan Cacar. Vaksin hidup yang dilemahkan, tidak bereplikasi, aman untuk immunocompromised. Diberikan dalam 2 dosis dengan jarak 4 minggu. Memberikan perlindungan sekitar 85% terhadap Mpox.",
            },
            {
              image: "/image/vaksin2.webp",
              title: "Vaksin ACAM2000",
              text: "vaksin cacar generasi kedua yang juga aktif terhadap Mpox. Lebih reaktogenik atau menimbulkan efek samping lebih banyak dibanding MVA-BN, tidak direkomendasikan untuk immunocompromised.",
            },
          ].map(({ image, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <div className="flex flex-col gap-2">
                <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          WHO merekomendasikan vaksinasi untuk kelompok risiko tinggi seperti kontak erat pasien Mpox, tenaga kesehatan
          yang menangani Mpox, dan mereka yang berada di wilayah endemis.
        </p>

        {/* Red callout */}
        <div className="mt-6 rounded-2xl border border-[#DB1A1A]/40 p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-8 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A] md:h-9 md:w-9">
              <IconInfoCircle className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[20px] font-semibold leading-snug text-[#DB1A1A]">
                Segera Cari Pertolongan Medis Darurat atau ke IGD Jika Kamu Mengalami Hal Berikut
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Segera cari bantuan medis darurat jika penderita Cacar Monyet mengalami kesulitan bernapas,
                penurunan kesadaran, lesi yang sangat luas dan menyebar cepat, tanda-tanda infeksi berat, demam
                &gt;40°C, menggigil berat, lesi di mata yang disertai gangguan penglihatan.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
