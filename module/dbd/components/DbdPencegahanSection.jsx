import React from "react";

const TIGA_M_ITEMS = [
  { bold: "Menguras:", text: " kuras dan sikat bak mandi, bak penampungan air, dan tempat-tempat yang menampung air minimal 1 kali seminggu." },
  { bold: "Menutup:", text: " tutup rapat semua tempat penampungan air agar nyamuk tidak bisa bertelur di sana." },
  { bold: "Memanfaatkan/Mendaur ulang:", text: " buang atau kubur barang-barang bekas yang bisa menampung air hujan (ban bekas, kaleng, botol plastik)." },
  { bold: "Plus:", text: <> tambahkan ikan pemakan jentik, bubuk <em>abate/temephos</em> pada penampungan air yang sulit dikuras, pasang kasa/screen di jendela dan ventilasi, dan gunakan kelambu saat tidur.</> },
];

const GIGITAN_ITEMS = [
  { bold: "Gunakan lotion anti-nyamuk (repelen):", text: " pilih yang mengandung DEET, Picaridin, atau IR3535, terutama saat pagi dan sore hari" },
  { bold: "Kenakan pakaian yang menutupi kulit:", text: " lengan panjang dan celana panjang saat beraktivitas di luar rumah" },
  { bold: "Pasang kawat kasa di jendela dan pintu:", text: " mencegah nyamuk masuk ke dalam rumah" },
  { bold: "Hindari tidur tanpa kelambu:", text: " terutama untuk bayi dan anak kecil" },
];

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
          <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
          <span>
            <strong className="font-semibold text-neutral-700">{item.bold}</strong>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function DbdPencegahanSection() {
  return (
    <section
      id="pencegahan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Pencegahan Demam Berdarah <em>Dengue</em> (DBD)
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Kabar baiknya: DBD adalah penyakit yang sangat bisa dicegah. Pencegahan berfokus pada dua hal
            utama: mengendalikan nyamuk Aedes Aegypti dan melindungi diri dari gigitan nyamuk.
          </p>

          <div className="space-y-5">
            {/* Program 3M Plus */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/trash.png" alt="Program 3M Plus" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-3">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  Program 3M Plus — Cara Paling Efektif
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">
                  Ini adalah strategi utama pencegahan DBD yang direkomendasikan Kemenkes RI:
                </p>
                <BulletList items={TIGA_M_ITEMS} />
              </div>
            </div>

            {/* Perlindungan Diri */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/baygon.png" alt="Perlindungan dari gigitan nyamuk" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-3">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  Perlindungan Diri dari Gigitan Nyamuk
                </p>
                <BulletList items={GIGITAN_ITEMS} />
              </div>
            </div>

            {/* Vaksinasi */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/vaksin.png" alt="Vaksinasi dengue" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-2">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  Vaksinasi <em>Dengue</em>
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
                  Saat ini tersedia vaksin <em>dengue</em> (Dengvaxia/CYD-TDV) di Indonesia. Namun vaksin
                  ini memiliki ketentuan penting: hanya direkomendasikan untuk orang yang sudah pernah
                  terinfeksi <em>dengue</em> sebelumnya (<em>seropositif</em>), berusia 9–45 tahun, dan
                  tinggal di daerah endemis. Pemberian pada orang yang belum pernah terinfeksi justru
                  meningkatkan risiko DBD parah saat infeksi pertama kali terjadi. Konsultasikan dengan
                  dokter sebelum vaksinasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
