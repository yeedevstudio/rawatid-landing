import React from "react";

const JADWAL = [
  "OPV-0 (bPOL): Diberikan saat bayi baru lahir (0-24 jam pertama)",
  "OPV-1: Usia 1 bulan",
  "OPV-2: Usia 2 bulan",
  "OPV-3: Usia 3 bulan",
  "IPV: Usia 4 bulan (diberikan bersama OPV-3 atau saat kunjungan tersendiri)",
  "OPV Booster: Usia 18 bulan",
];

const SANITASI = [
  "Cuci tangan pakai sabun: terutama setelah buang air besar, mengganti popok bayi, dan sebelum menyiapkan makanan",
  "Air minum yang aman: gunakan air yang telah dimasak atau dari sumber yang terjamin kebersihannya",
  "Pengelolaan tinja yang benar: BAB di jamban yang benar, tidak di sungai atau tanah terbuka",
  "Sanitasi lingkungan: pengelolaan limbah dan sampah yang baik mencegah kontaminasi sumber air",
];

const cardBase = "rounded-[16px] border border-neutral-200/90 bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-5";

function BulletItem({ text }) {
  return (
    <li className="flex gap-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
      <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
      <span>{text}</span>
    </li>
  );
}

export default function PencegahanPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Pencegahan <em>Poliomielitis</em>
        </h2>
        <p className="mt-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <em>Poliomielitis</em> atau polio 100% dapat dicegah dengan vaksin. Tidak ada penyakit lain dalam
          sejarah yang menunjukkan bukti sekuat ini bahwa vaksin benar-benar bekerja. Pencegahan polio berdiri di
          atas dua pilar utama, yaitu vaksinasi dan sanitasi.
        </p>

        {/* Vaksin */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Vaksin <em>Poliomielitis</em>: Senjata Utama
        </h3>
        <p className="mt-2 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px]">
          Ada dua jenis vaksin polio yang tersedia:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6">
          {/* OPV Card */}
          <div className={cardBase}>
            <h4 className="mb-4 text-[13px] font-semibold text-[#038F7A] md:text-[14px]">
              OPV — <em>Oral Polio Vaccine</em> (Vaksin Polio Oral/Tetes)
            </h4>
            <div className="flex gap-3 md:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/sulang.png" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                Vaksin ini diberikan secara <em>oral</em> (tetes ke mulut), mengandung virus polio yang
                dilemahkan. Kelebihannya: mudah diberikan (tanpa jarum suntik), murah, membentuk kekebalan di
                usus sehingga mencegah penularan dari orang ke orang, dan bisa menginduksi kekebalan komunitas
                (<em>herd immunity</em>) lebih efektif.
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/dangers.png" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                Keterbatasannya: Dalam satu dari beberapa juta dosis, virus yang dilemahkan bisa bermutasi kembali
                menjadi virus yang mampu menyebabkan kelumpuhan (VAPP —{" "}
                <em>Vaccine-associated Paralytic Poliomyelitis</em>). Selain itu, pada populasi yang tidak
                tervaksinasi, virus dari vaksin yang telah bermutasi (cVDPV) bisa bersirkulasi dan menyebabkan
                wabah.
              </p>
            </div>
          </div>

          {/* IPV Card */}
          <div className={cardBase}>
            <h4 className="mb-4 text-[13px] font-semibold text-[#038F7A] md:text-[14px]">
              IPV — Inactivated Polio Vaccine (Vaksin Polio Suntik)
            </h4>
            <div className="flex gap-3 md:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/jarum.png" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                Vaksin ini disuntikkan, mengandung virus polio yang sudah dimatikan sepenuhnya. Kelebihannya:
                tidak bisa menyebabkan VAPP atau cVDPV sama sekali, jauh lebih aman
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/dangers.png" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
                Keterbatasannya: lebih mahal, memerlukan jarum suntik, dan tidak memberikan perlindungan di usus
                seluat OPV.
              </p>
            </div>
          </div>
        </div>

        {/* Jadwal Vaksinasi */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Jadwal Vaksinasi Polio di Indonesia (Program Imunisasi Nasional)
        </h3>
        <div className={`mt-5 ${cardBase} md:mt-6`}>
          <h4 className="mb-4 text-[13px] font-semibold text-[#038F7A] md:text-[14px]">
            Jadwal Imunisasi Polio Sesuai Kemenkes RI
          </h4>
          <ul className="flex flex-col gap-3">
            {JADWAL.map((item, i) => (
              <BulletItem key={i} text={item} />
            ))}
          </ul>
          <p className="mt-4 text-[12px] font-normal leading-relaxed text-neutral-500 md:text-[13px]">
            Catatan: Indonesia mulai mengintegrasikan IPV ke dalam jadwal imunisasi nasional sejak 2016 untuk
            memperkuat perlindungan sekaligus mengurangi risiko VAPP.
          </p>
        </div>

        <p className="mt-6 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Untuk orang dewasa yang belum pernah divaksin polio atau riwayat vaksinasinya tidak jelas, vaksinasi (3
          dosis IPV) tetap direkomendasikan. Begitu pula untuk pelancong yang akan mengunjungi negara endemis
          polio.
        </p>

        {/* Sub-PIN */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Kapan Anak Perlu Vaksin Tambahan (Sub-PIN Polio)?
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Dalam situasi KLB polio, pemerintah akan melaksanakan Sub-PIN (Pekan Imunisasi Nasional), vaksinasi
          massal tambahan yang diberikan kepada semua anak usia sasaran (biasanya 0-7 tahun atau 0-12 tahun) di
          wilayah terdampak, tanpa memandang status vaksinasi sebelumnya. Ini bukan pengganti jadwal rutin,
          melainkan tindakan darurat untuk memutus rantai penularan secepatnya.
        </p>

        {/* Sanitasi */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Pencegahan Melalui Sanitasi dan Higienitas
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Walaupun vaksinasi adalah kunci utama, sanitasi dan kebersihan perorangan tetap berperan penting,
          terutama di daerah dengan akses air bersih yang terbatas:
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {SANITASI.map((item, i) => (
            <BulletItem key={i} text={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
