import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const ERADIKASI_ITEMS = [
  "Virus polio liar tipe 2: Eradikasi global sejak 1999",
  "Virus polio liar tipe 3: Eradikasi global sejak 2019",
  "Virus polio liar tipe 1: Masih bersirkulasi di Pakistan dan Afghanistan",
  "125 negara kini bebas polio, termasuk India (sertifikat bebas polio sejak 2014)",
  "Ancaman baru: wabah dari virus vaksin (cVDPV) masih terjadi di lebih dari 30 negara",
];

export default function EpidemiologiPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Epidemiologi: Gambaran <em>Poliomielitis</em> di Dunia dan Indonesia
        </h2>

        {/* Situasi Global */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">Situasi Global</h3>

        <div className="mt-3 space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <p>
            Pada puncak epidemi polio global sekitar tahun 1952, lebih dari 58.000 kasus dilaporkan hanya di
            Amerika Serikat dalam satu tahun. Pada era 1980-an, diperkirakan lebih dari 350.000 kasus kelumpuhan
            terjadi setiap tahun di seluruh dunia.
          </p>
          <p>
            Sejak Global Polio Eradication Initiative (GPEI) diluncurkan pada 1988 oleh WHO, Rotary
            International, CDC, dan UNICEF, jumlah kasus polio liar turun lebih dari 99%. Capaian luar biasa ini
            merupakan salah satu pencapaian kesehatan masyarakat terbesar dalam sejarah manusia.
          </p>
        </div>

        {/* Eradikasi card — dua kolom */}
        <div className="mt-6 flex flex-col gap-5 rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] sm:flex-row sm:items-center md:p-6 md:mt-8">
          <div className="flex-1 min-w-0">
            <h4 className="mb-4 text-[14px] font-semibold text-neutral-900 md:text-[15px]">
              Capaian Eradikasi Polio Global (per 2024):
            </h4>
            <ul className="flex flex-col gap-3">
              {ERADIKASI_ITEMS.map((item, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                  <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/lindung.webp"
            alt=""
            className="h-80 w-auto shrink-0 self-center object-contain sm:h-96 md:h-[28rem]"
          />
        </div>

        {/* Situasi di Indonesia */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">Situasi di Indonesia</h3>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center md:mt-6 md:gap-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/map.png"
            alt=""
            className="h-auto w-full max-w-[480px] shrink-0 self-center object-contain sm:max-w-[540px] md:max-w-[600px]"
          />
          <div className="space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
            <p>
              Indonesia sempat dinyatakan bebas polio oleh WHO pada 2014 sebagai bagian dari Kawasan Asia
              Tenggara (SEAR). Namun pada 2022, Indonesia mengalami Kejadian Luar Biasa (KLB) polio pertama
              setelah lebih dari satu dekade, akibat sirkulasi cVDPV tipe 2 di Aceh, diikuti temuan kasus di
              Jawa Tengah dan Jawa Timur pada 2023. Ini menjadi pengingat keras bahwa polio bisa kembali ke
              negara mana pun yang memiliki celah imunitas di populasinya.
            </p>
            <p>
              Penyebab utama KLB 2022–2023 adalah cakupan vaksinasi yang turun drastis selama pandemi
              COVID-19, ditambah kantong-kantong wilayah dengan cakupan vaksinasi rendah secara historis.
            </p>
          </div>
        </div>

        {/* Orange callout */}
        <aside
          className="mt-8 w-full rounded-2xl border border-[#DB8B1A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
          aria-label="Peringatan KLB Polio"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/15 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Peringatan: KLB Polio Indonesia 2022–2023
              </h3>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Kasus pertama ditemukan pada seorang anak usia 7 tahun di Pidie, Aceh pada Oktober 2022. Anak
                tersebut belum pernah mendapat vaksin polio. Setelah investigasi, ditemukan bukti sirkulasi
                aktif cVDPV2 di komunitas tersebut. Merespons hal ini, pemerintah melaksanakan Sub-PIN Polio
                (vaksinasi massal) di wilayah terdampak. Kejadian ini membuktikan bahwa tidak ada negara yang
                aman selama cakupan vaksinasi tidak merata.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
