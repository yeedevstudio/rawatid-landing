import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const SUPORTIF_CARDS = [
  {
    image: "/image/berikan1.svg",
    text: "Berikan oksigenasi dan ventilasi mekanik untuk mengatasi ARDS dan kegagalan napas. Banyak penderita H5N1 berat memerlukan ventilator.",
  },
  {
    image: "/image/berikan2.svg",
    text: "Berikan terapi cairan intravena untuk menjaga keseimbangan hemodinamik dan perfusi organ.",
  },
  {
    image: "/image/berikan3.svg",
    text: "Berikan terapi oksigen aliran tinggi (HFNC), teknik pemberian oksigen non-invasif yang menjadi pilihan sebelum intubasi.",
  },
  {
    image: "/image/berikan4.svg",
    text: "Berikan manajemen gagal ginjal atau hemodialisis jika diperlukan.",
  },
  {
    image: "/image/berikan5.svg",
    text: "Berikan ECMO (Extracorporeal Membrane Oxygenation). Pada kasus ARDS yang tidak respons dengan ventilator, ECMO dapat menyelamatkan nyawa dengan mengambil alih fungsi paru-paru sementara.",
  },
];

const VAKSINASI_CARDS = [
  {
    image: "/image/berikan6.svg",
    title: "Vaksin influenza musiman",
    text: "meskipun tidak melindungi dari flu burung, vaksin influenza musiman direkomendasikan untuk peternak unggas dan petugas kesehatan untuk mencegah infeksi campuran yang bisa memfasilitasi reassortment gen.",
  },
  {
    image: "/image/berikan7.svg",
    title: "Vaksinasi unggas",
    text: "vaksinasi massal unggas dengan vaksin H5N1 dilakukan di banyak negara, termasuk Indonesia, sebagai strategi utama pengendalian di sumber.",
  },
];

const ISOLASI_CARDS = [
  {
    image: "/image/penanganan1.svg",
    title: "Isolasi di ruang bertekanan negatif",
    text: "jika tersedia, untuk mencegah penyebaran virus ke udara ruangan umum.",
  },
  {
    image: "/image/penanganan2.svg",
    title: "Gunakan APD lengkap untuk tenaga kesehatan",
    text: "seperti masker N95 atau lebih, pelindung mata (goggle/face shield), sarung tangan, gaun pelindung, dan sepatu pelindung.",
  },
  {
    image: "/image/penanganan3.svg",
    title: "Batasi pengunjung",
    text: "kontak penderita diminimalkan dan pengunjung diwajibkan menggunakan APD.",
  },
];

const OSELTAMIVIR_CARDS = [
  {
    image: "/image/penanganan4.svg",
    title: "Dosis standar untuk Flu Burung (lebih tinggi dari flu biasa)",
    text: "adalah 75–150 mg dua kali sehari selama minimal 10 hari (atau lebih lama pada kasus berat).",
  },
  {
    image: "/image/penanganan5.svg",
    title: "Lebih efektif jika diberikan dalam 48 jam pertama gejala",
    text: "namun tetap diberikan meskipun sudah lebih dari 48 jam pada kasus Flu Burung, karena replikasi virus yang berlangsung lebih lama.",
  },
  {
    image: "/image/penanganan6.svg",
    title: "Profilaksis pasca-paparan",
    text: "75 mg sekali sehari selama 10 hari dapat diberikan pada kontak erat penderita yang terpapar tanpa APD.",
  },
];

export default function PenangananFluBurung() {
  return (
    <section
      id="penanganan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Penanganan Flu Burung
        </h2>

        {/* Prinsip utama callout */}
        <div className="mt-6 rounded-2xl p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-10 md:w-10">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5] md:h-6 md:w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-snug text-[#038F7A] md:text-base">
                Prinsip Utama Penanganan Flu Burung:
              </h3>
              <p className="mt-2 text-[13px] font-semibold leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Flu Burung adalah kondisi darurat medis. Penanganan harus dilakukan di fasilitas kesehatan dengan
                isolasi ketat. Semakin cepat antivirus diberikan (idealnya dalam 48 jam pertama gejala), semakin besar
                peluang bertahan hidup. Jangan menunggu konfirmasi laboratorium sebelum memulai pengobatan antivirus
                jika klinis dan epidemiologi mengarah kuat ke Flu Burung.
              </p>
            </div>
          </div>
        </div>

        {/* Isolasi */}
        <h3 className="mt-10 text-[17px] font-semibold text-[#038F7A] md:mt-12 md:text-[19px]">
          Lakukan Isolasi dan Pencegahan Penularan
        </h3>
        <p className="mt-3 text-[20px] font-medium leading-relaxed text-neutral-700">
          Penderita yang dicurigai atau terkonfirmasi Flu Burung harus segera diisolasi di fasilitas kesehatan dengan
          protokol pencegahan dan pengendalian infeksi (PPI) yang ketat:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {ISOLASI_CARDS.map(({ image, title, text }) => (
            <div key={title} className="flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Terapi Antivirus */}
        <h3 className="mt-10 text-[17px] font-semibold text-[#038F7A] md:mt-12 md:text-[19px]">
          Berikan Terapi Antivirus
        </h3>
        <p className="mt-3 text-[20px] font-medium leading-relaxed text-neutral-700">
          Penderita yang dicurigai atau terkonfirmasi Flu Burung harus segera diisolasi di fasilitas kesehatan dengan
          protokol pencegahan dan pengendalian infeksi (PPI) yang ketat:
        </p>

        {/* Oseltamivir card */}
        <div className="mt-5 rounded-[14px] p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
          <h4 className="text-[15px] font-semibold text-[#038F7A] md:text-base">
            Oseltamivir (Tamiflu) sebagai Lini Pertama
          </h4>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
            Oseltamivir adalah antivirus utama untuk Flu Burung yang tersedia dan paling banyak data klinisnya.
            Bekerja dengan menghambat enzim neuraminidase, mencegah virus menyebar ke sel-sel baru.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row">
            {OSELTAMIVIR_CARDS.map(({ image, title, text }, i) => (
              <React.Fragment key={title}>
                <div className="flex flex-1 items-start gap-3 py-3 md:py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14" />
                  <div className="flex flex-col gap-1.5">
                    <h5 className="text-[18px] font-medium leading-snug text-neutral-900">{title}</h5>
                    <p className="text-[12px] leading-relaxed text-neutral-600 md:text-[13px]">{text}</p>
                  </div>
                </div>
                {i < OSELTAMIVIR_CARDS.length - 1 && (
                  <div className="mx-4 hidden h-auto w-px self-stretch bg-neutral-200 sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Zanamivir */}
        <div className="mt-4 flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image/penanganan7.svg" alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
          <div className="flex flex-col gap-1.5">
            <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">
              Zanamivir (Relenza) Sebagai Alternatif
            </h4>
            <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">
              Selain Oseltamivir, Zanamivir juga digunakan sebagai alternatif, terutama pada kasus yang dicurigai
              resistensi terhadap oseltamivir. Diberikan melalui inhalasi.
            </p>
          </div>
        </div>

        {/* Penanganan Suportif di ICU */}
        <h3 className="mt-10 text-[17px] font-semibold text-[#038F7A] md:mt-12 md:text-[19px]">
          Berikan Penanganan Suportif di ICU
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Karena sebagian besar kasus Flu Burung berat memerlukan perawatan intensif, penanganan suportif menjadi sangat penting:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {SUPORTIF_CARDS.map(({ image, text }) => (
            <div key={text} className="flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Vaksinasi */}
        <h3 className="mt-10 text-[17px] font-semibold text-[#038F7A] md:mt-12 md:text-[19px]">
          Vaksinasi
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Saat ini belum ada vaksin Flu Burung yang disetujui untuk penggunaan rutin pada populasi umum manusia. Namun beberapa langkah telah diambil:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {VAKSINASI_CARDS.map(({ image, title, text }) => (
            <div key={title} className="flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Meskipun belum ada vaksin Flu Burung yang disetujui untuk penggunaan rutin pada populasi umum, beberapa vaksin prototipe telah dikembangkan dan disimpan dalam stockpile strategis oleh negara-negara maju, siap diproduksi massal jika pandemi dimulai.
        </p>
      </div>
    </section>
  );
}
