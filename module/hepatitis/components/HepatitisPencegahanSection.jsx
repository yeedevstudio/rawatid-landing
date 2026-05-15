import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const JADWAL_VAKSINASI = [
  "Dosis pertama: diberikan kapan saja mulai usia 12 bulan",
  "Dosis kedua (booster): diberikan 6–18 bulan setelah dosis pertama",
  "Perlindungan sudah mulai efektif 2–4 minggu setelah dosis pertama",
];

const SIAPA_DIVAKSINASI = [
  "Semua anak usia 12 bulan ke atas (dalam program imunisasi nasional)",
  "Orang dewasa yang belum pernah divaksinasi dan belum pernah terinfeksi Hepatitis A",
  "Orang yang akan bepergian ke daerah endemis Hepatitis A",
  "Orang dengan penyakit hati kronis",
  "Tenaga kesehatan yang menangani pasien Hepatitis A",
  "Orang yang bekerja di bidang pengolahan makanan atau air",
];

const CUCI_TANGAN_ITEMS = [
  "Setelah menggunakan toilet,",
  "Sebelum menyiapkan atau menyentuh makanan,",
  "Sebelum makan,",
  "Setelah mengganti popok bayi,",
  "Setelah merawat penderita Hepatitis A.",
];

const KEAMANAN_MAKANAN_ITEMS = [
  <>Pastikan semua makanan, terutama daging dan <em>seafood</em>, dimasak hingga benar-benar matang. Panaskan hingga suhu internal minimal 85°C.</>,
  "Hindari mengonsumsi es batu dari sumber yang tidak jelas, air keran langsung, atau air sumur yang tidak dimasak di daerah yang sanitasinya meragukan.",
  "Hati-hati dengan kerang dan seafood mentah. Kerang dan tiram yang tidak dimasak sempurna sangat berisiko karena hewan ini menyaring air dalam jumlah besar dan bisa mengkonsentrasikan virus.",
  "Selalu cuci buah dan sayuran. Buah dan sayuran yang dimakan mentah harus dicuci bersih dengan air mengalir yang aman.",
  "Saat bepergian ke daerah berisiko, prinsipnya: masak, kupas, atau jangan dimakan.",
];

const SANITASI_ITEMS = [
  "Gunakan jamban/toilet yang bersih dan pastikan pembuangan tinja tidak mencemari sumber air.",
  "Pastikan sumber air minum aman dari kontaminasi.",
  "Jaga kebersihan dapur dan tempat pengolahan makanan.",
];

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
          <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CircleImg({ src, alt }) {
  return (
    <img src={src} alt={alt} className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32 lg:h-36 lg:w-36" />
  );
}

export default function HepatitisPencegahanSection() {
  return (
    <section id="pencegahan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Pencegahan Hepatitis A
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Hepatitis A adalah salah satu penyakit menular yang paling bisa dicegah. Ada dua pilar utama
            pencegahan, yaitu <em>vaksinasi</em> dan <em>higiene</em> atau sanitasi.
          </p>

          {/* Vaksinasi Card */}
          <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
            <img
              src="/image/suntik.png"
              alt="Ilustrasi vaksinasi"
              className="h-36 w-36 shrink-0 object-contain md:h-44 md:w-44"
            />
            <div className="min-w-0 space-y-4">
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Vaksinasi — Perlindungan Terbaik
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Vaksin Hepatitis A adalah cara paling efektif untuk mencegah penyakit ini. Vaksin ini
                sangat aman, sangat efektif (95–100% dalam mencegah infeksi), dan memberikan
                perlindungan jangka panjang.
              </p>
              <div className="space-y-2">
                <p className="text-[14px] font-semibold text-neutral-800 md:text-[15px]">
                  Jadwal vaksinasi:
                </p>
                <BulletList items={JADWAL_VAKSINASI} />
              </div>
              <div className="space-y-2">
                <p className="text-[14px] font-semibold text-neutral-800 md:text-[15px]">
                  Siapa yang dianjurkan divaksinasi?
                </p>
                <BulletList items={SIAPA_DIVAKSINASI} />
              </div>
            </div>
          </div>

          {/* Teal Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#038F7A]/30 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#038F7A]/40 bg-white text-[#038F7A]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
              Vaksin Hepatitis A sudah masuk program Imunisasi Nasional Indonesia sejak 2023. Vaksin ini
              bisa didapatkan secara gratis di Puskesmas untuk anak-anak sesuai jadwal. Untuk orang
              dewasa, vaksin tersedia di klinik dan rumah sakit.
            </p>
          </div>

          {/* Higenitas Tangan Card — image on right */}
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 sm:flex-row sm:items-start md:gap-6 md:px-7 md:py-7">
            <div className="min-w-0 flex-1 space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Higenitas Tangan, Kebiasaan Sederhana yang Menyelamatkan
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Virus Hepatitis A tidak bisa bertahan di tangan yang dicuci dengan bersih menggunakan
                sabun. Cuci tangan adalah cara paling sederhana dan paling efektif untuk memutus rantai
                penularan:
              </p>
              <BulletList items={CUCI_TANGAN_ITEMS} />
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Cara mencuci tangan yang benar, gunakan sabun, gosok seluruh bagian tangan (termasuk
                sela jari dan punggung tangan) selama minimal 20 detik, lalu bilas dengan air mengalir.
              </p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <CircleImg src="/image/cucitangan.png" alt="Ilustrasi cuci tangan" />
            </div>
          </div>

          {/* Keamanan Makanan dan Air Card — image on left */}
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 sm:flex-row sm:items-start md:gap-6 md:px-7 md:py-7">
            <div className="flex justify-center sm:justify-start">
              <CircleImg src="/image/jagamakan.png" alt="Ilustrasi keamanan makanan dan air" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Keamanan Makanan dan Air
              </h3>
              <BulletList items={KEAMANAN_MAKANAN_ITEMS} />
            </div>
          </div>

          {/* Sanitasi Lingkungan Card — image on right */}
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 sm:flex-row sm:items-start md:gap-6 md:px-7 md:py-7">
            <div className="min-w-0 flex-1 space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Sanitasi Lingkungan
              </h3>
              <BulletList items={SANITASI_ITEMS} />
            </div>
            <div className="flex justify-center sm:justify-end">
              <CircleImg src="/image/rumah.png" alt="Ilustrasi sanitasi lingkungan" />
            </div>
          </div>

          {/* Proteksi Pasca-Paparan Card — image on left */}
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 sm:flex-row sm:items-start md:gap-6 md:px-7 md:py-7">
            <div className="flex justify-center sm:justify-start">
              <CircleImg src="/image/shield.png" alt="Ilustrasi proteksi pasca paparan" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Proteksi Pasca-Paparan
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Jika Anda baru-baru ini terpapar seseorang yang positif Hepatitis A dan belum divaksinasi,
                ada dua pilihan yang bisa diberikan dalam waktu 2 minggu setelah paparan:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                  <span>Vaksin Hepatitis A dosis pertama, lebih dianjurkan untuk orang sehat berusia 1–40 tahun</span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                  <span>Injeksi <em>Immunoglobulin</em> (Ig), injeksi antibodi yang bisa memberikan perlindungan sementara, direkomendasikan untuk bayi di bawah 12 bulan, lansia, dan orang dengan sistem imun lemah</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pesan Penting Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#038F7A]/30 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#038F7A]/40 bg-white text-[#038F7A]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-3">
              <p className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px]">
                Pesan Penting untuk Penderita <em>Hepatitis A</em>
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Hepatitis A adalah penyakit yang hampir 100% bisa dicegah. Dengan vaksinasi, kebiasaan
                cuci tangan yang baik, dan perhatian pada keamanan makanan dan air, Anda bisa melindungi
                diri dan keluarga secara efektif.
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Jika Anda sudah terlanjur terinfeksi, ingat Hepatitis A hampir selalu sembuh total.
                Istirahat cukup, minum banyak cairan, hindari alkohol, dan konsultasikan dengan dokter
                untuk pemantauan. Anda akan pulih.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
