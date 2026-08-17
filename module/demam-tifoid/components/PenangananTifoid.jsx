import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const GOLD_STANDARD = [
  {
    img: "/image/aqua.png",
    title: "Kultur darah",
    desc: "mengambil sampel darah dan menumbuhkan bakteri di laboratorium. Ini adalah pemeriksaan paling akurat (gold standard) untuk diagnosis tifoid. Sensitivitas tertinggi pada minggu pertama (70–90%), menurun pada minggu-minggu berikutnya. Memerlukan waktu 3–5 hari untuk hasil",
  },
  {
    img: "/image/bed.png",
    title: "Kultur sumsum tulang",
    desc: "bahkan lebih sensitif dari kultur darah, namun jarang dilakukan karena prosedurnya invasif",
  },
  {
    img: "/image/tensi.png",
    title: "Kultur tinja dan urin",
    desc: "berguna terutama pada minggu kedua dan ketiga, dan untuk deteksi carrier",
  },
];

const PENUNJANG_MODERN = [
  {
    img: "/image/impus.webp",
    title: <>Tes serologi berbasis <em>antigen</em> (<em>Typhidot, Test-it Typhoid</em>, dll.)</>,
    desc: "Lebih cepat dari kultur, dengan sensitivitas lebih baik dari Widal, namun tetap memiliki keterbatasan. Harus diinterpretasikan bersama gambaran klinis",
  },
  {
    img: "/image/pemulihan.png",
    title: <>PCR (<em>Polymerase Chain Reaction</em>)</>,
    desc: "Mendeteksi DNA bakteri dalam darah atau tinja. Sangat sensitif, namun mahal dan belum tersedia di semua fasilitas",
  },
  {
    img: "/image/tomat.png",
    title: "Pemeriksaan darah rutin",
    desc: <>Sel darah putih bisa normal, rendah (<em>leukopenia</em>), atau tinggi. Tidak spesifik, namun membantu gambaran klinis keseluruhan.</>,
  },
  {
    img: "/image/transfusi.png",
    title: "Pemeriksaan fungsi hati",
    desc: <><em>SGOT</em> dan <em>SGPT</em> sering meningkat pada Demam Tifoid atau Tipes, menandakan keterlibatan hati</>,
  },
];

function TreatmentCard({ img, title, desc }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/90 bg-white px-4 py-6 text-center md:px-5 md:py-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt="" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
      <p className="text-[13px] font-semibold leading-snug text-[#038F7A] md:text-[14px] lg:text-[15px]">{title}</p>
      <p className="text-[12px] leading-relaxed text-neutral-600 md:text-[13px]">{desc}</p>
    </div>
  );
}

export default function PenangananTifoid() {
  return (
    <section
      id="penanganan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Penanganan dan Tatalaksana Demam <em>Tifoid</em> atau Tipes
        </h2>

        <p className="mt-5 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Demam <em>Tifoid</em> adalah penyakit infeksi bakteri yang memerlukan antibiotik. Tanpa antibiotik yang tepat,
          angka kematian bisa mencapai 10–30%. Dengan pengobatan antibiotik yang benar, angka kematian bisa ditekan jauh
          di bawah 1%. Namun penanganan yang benar bukan hanya soal antibiotik saja.
        </p>

        {/* Diagnosis */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Diagnosis: Bagaimana Demam <em>Tifoid</em> atau Tipes Didiagnosis?
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Sebelum membahas pengobatan, penting dipahami cara mendiagnosis <em>Demam Tifoid</em> yang benar, karena
          diagnosis yang salah akan berujung pada pengobatan yang salah.
        </p>

        {/* Gold Standard */}
        <h4 className="mt-8 text-[15px] font-semibold text-[#038F7A] md:text-base">
          Pemeriksaan Standar Baku (Gold Standard)
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {GOLD_STANDARD.map((item, i) => (
            <TreatmentCard key={i} {...item} />
          ))}
        </div>

        {/* Penunjang Modern */}
        <h4 className="mt-8 text-[15px] font-semibold text-[#038F7A] md:text-base">
          Pemeriksaan Penunjang Modern
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PENUNJANG_MODERN.map((item, i) => (
            <TreatmentCard key={i} {...item} />
          ))}
        </div>

        {/* Antibiotik */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Pengobatan Demam <em>Tifoid</em> atau Tipes dengan Antibiotik
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Pemilihan antibiotik harus mempertimbangkan pola resistensi lokal, kondisi pasien, ketersediaan obat, dan
          apakah pengobatan dilakukan rawat jalan atau rawat inap. Panduan terbaru WHO (2018) merekomendasikan:
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-[16px] border border-neutral-200/90 shadow-[0px_0px_12.1px_0px_#0000001A]">
            <thead>
              <tr className="bg-[#038F7A]">
                <th className="w-[180px] px-4 py-3 text-center text-[13px] font-bold text-white md:w-[200px] md:text-[14px]">Kategori</th>
                <th className="w-[200px] px-4 py-3 text-center text-[13px] font-bold text-white md:text-[14px]">Antibiotik Pilihan</th>
                <th className="px-5 py-3 text-left text-[13px] font-bold text-white md:text-[14px]">Durasi &amp; Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-200/90">
                <td className="px-4 py-4 text-center text-[13px] font-semibold text-[#038F7A] md:text-[14px]">Lini Pertama (sensitif)</td>
                <td className="px-4 py-4 text-center text-[13px] text-neutral-700 md:text-[14px]">
                  <em>Fluorokuinolon</em>: Ofloksasin atau Siprofloksasin
                </td>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                  7–10 hari. Efektif, bisa rawat jalan. Tidak untuk anak &lt;18 tahun (<em>fluorokuinolon</em>)
                </td>
              </tr>
              <tr className="border-t border-neutral-200/90">
                <td className="px-4 py-4 text-center text-[13px] font-semibold text-[#038F7A] md:text-[14px]">Lini Pertama untuk anak &amp; ibu hamil</td>
                <td className="px-4 py-4 text-center text-[13px] text-neutral-700 md:text-[14px]">
                  <em>Azitromicin</em> (oral) atau <em>Seftriakson</em> (injeksi)
                </td>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                  <em>Azitromicin</em> 7 hari (oral). <em>Seftriakson</em> 10–14 hari (IV). Pilihan terbaik untuk anak, ibu hamil, kasus berat
                </td>
              </tr>
              <tr className="border-t border-neutral-200/90">
                <td className="px-4 py-4 text-center text-[13px] font-semibold text-[#DB8B1A] md:text-[14px]">
                  MDR <em>Tifoid</em> (resisten ampisilin, kloramfenikol, TMP-SMX)
                </td>
                <td className="px-4 py-4 text-center text-[13px] text-neutral-700 md:text-[14px]">
                  <em>Fluorokuinolon</em> atau <em>Seftriakson</em> atau <em>Azitromicin</em>
                </td>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                  Sesuai panduan dokter. Penting: tes resistensi antibiotik
                </td>
              </tr>
              <tr className="border-t border-neutral-200/90">
                <td className="px-4 py-4 text-center text-[13px] font-semibold text-[#DB1A1A] md:text-[14px]">
                  <em>XDR Tifoid</em> (resisten hampir semua antibiotik oral)
                </td>
                <td className="px-4 py-4 text-center text-[13px] text-neutral-700 md:text-[14px]">
                  <em>Azitromicin</em> atau <em>Meropenem</em> (karbapenem)
                </td>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                  Harus rawat inap. Wajib di bawah pengawasan dokter spesialis
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Orange callout */}
        <div className="mt-8 rounded-[16px] border border-[#DB8B1A] bg-white p-5 md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/10 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Selesaikan Antibiotik Sampai Tuntas!
              </h4>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Salah satu kesalahan paling umum dalam pengobatan tifoid adalah menghentikan antibiotik begitu demam
                turun, biasanya sekitar hari ke-3 sampai ke-5 pengobatan. Ini sangat berbahaya karena:
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {[
                  "Bakteri yang belum sepenuhnya terbunuh bisa kambuh lebih ganas.",
                  "Meningkatkan risiko bakteri mengembangkan resistensi terhadap antibiotik.",
                  "Memperpanjang masa penularan kepada orang lain.",
                ].map((item, i) => (
                  <li key={i} className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                    - {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Selalu habiskan antibiotik sesuai durasi yang diresepkan dokter, meskipun sudah merasa baikan.
              </p>
            </div>
          </div>
        </div>

        {/* Penanganan Suportif */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Penanganan Suportif Pada Penderita Demam <em>Tifoid</em> atau Tipes
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Selain antibiotik, penanganan suportif sangat penting dalam pemulihan:
        </p>

        <h4 className="mt-6 text-[15px] font-semibold text-[#038F7A] md:text-base">Istirahat dan Tirah Baring</h4>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Istirahat total di tempat tidur dianjurkan selama fase akut, terutama minggu kedua dan ketiga, karena risiko
          perforasi usus meningkat dengan aktivitas fisik berlebihan. Aktivitas berlebihan saat usus sedang mengalami
          peradangan benar-benar meningkatkan risiko komplikasi.
        </p>

        {/* Nutrisi */}
        <h4 className="mt-8 text-[15px] font-semibold text-[#038F7A] md:text-base">Nutrisi yang Tepat</h4>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Mitos tentang pantangan makanan pada tifoid perlu diluruskan dengan pendekatan ilmiah:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {[
            { img: "/image/sayur.webp", title: "Yang dianjurkan", desc: "makanan lunak, mudah dicerna, cukup kalori dan protein seperti nasi tim, bubur, telur rebus/kukus, sup, daging cincang, sayur yang dimasak lunak" },
            { img: "/image/pedas.webp", title: "Yang perlu dihindari sementara", desc: "Makanan berserat tinggi (sayur mentah, buah berserabut) dan makanan tinggi lemak yang bisa memperberat kerja saluran cerna selama masa akut" },
            { img: "/image/panas.webp", title: "Tidak perlu hindari makanan panas", desc: <>Konsep makanan panas dalam konteks pantangan pada penderita Demam <em>Tifoid</em> tidak memiliki dasar ilmiah</> },
            { img: "/image/aqua.png", title: "Hidrasi cukup", desc: "Minum banyak cairan seperti air putih, oralit, jus buah tanpa ampas, sup untuk mencegah dehidrasi akibat demam" },
          ].map((item, i) => (
            <TreatmentCard key={i} {...item} />
          ))}
        </div>

        {/* Penanganan Demam */}
        <h4 className="mt-8 text-[15px] font-semibold text-[#038F7A] md:text-base">Penanganan Demam</h4>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {[
            { img: "/image/pilbanyak.webp", title: "Parasetamol", desc: <>Parasetamol pilihan utama untuk penurun panas. Hindari obat NSAID (<em>ibuprofen, aspirin</em>) karena meningkatkan risiko perdarahan saluran cerna</> },
            { img: "/image/kompres.png", title: "Kompres hangat", desc: "Kompres hangat di dahi atau ketiak untuk membantu menurunkan suhu tubuh" },
            { img: "/image/tensiturun.webp", title: "Pakaian tipis dan ruangan sejuk", desc: "Gunakan pakaian tipis untuk membantu tubuh melepas panas lebih efektif" },
          ].map((item, i) => (
            <TreatmentCard key={i} {...item} />
          ))}
        </div>

        {/* Orange callout Rawat Inap */}
        <div className="mt-8 rounded-[16px] border border-[#DB8B1A] bg-white p-5 md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/10 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Rawat Inap vs. Rawat Jalan
              </h4>
              <h5 className="mt-3 text-[13px] font-semibold text-[#DB8B1A] md:text-[14px]">Kapan Harus Rawat Inap?</h5>
              <ul className="mt-2 flex flex-col gap-1">
                {[
                  "Kondisi umum buruk, tidak bisa minum atau makan",
                  "Demam sangat tinggi yang tidak respons dengan parasetamol",
                  "Gejala komplikasi: nyeri perut hebat, perdarahan, penurunan kesadaran",
                  "Anak di bawah 3 tahun atau lansia dengan kondisi melemah",
                  "Perlu antibiotik injeksi (seftriakson IV)",
                  "Kondisi komorbid serius (penyakit jantung, gagal ginjal, imunosupresi)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DB8B1A]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Pasien dewasa dengan kondisi umum baik, tidak ada tanda komplikasi, dan bisa minum obat oral bisa
                dirawat jalan dengan pemantauan ketat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
