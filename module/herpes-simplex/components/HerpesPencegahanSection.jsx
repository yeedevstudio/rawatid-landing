import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const SEKSUAL_ITEMS = [
  <>
    Gunakan kondom <em>lateks</em> secara konsisten dan benar setiap kali berhubungan seksual. Kondom
    menurunkan risiko penularan secara signifikan meskipun tidak 100%. Kondom tidak melindungi area
    kulit di luar yang tertutup kondom seperti bokong atau paha.
  </>,
  "Tanyakan riwayat kesehatan seksual pasangan. Ini memang tidak mudah, tetapi sangat penting untuk perlindungan bersama. Komunikasi terbuka dengan pasangan",
  <>
    Hindari hubungan seksual saat ada gejala aktif. Baik saat ada luka yang terlihat maupun saat
    merasakan tanda <em>prodromal</em> (gatal, kesemutan, rasa terbakar) karena virus sangat aktif
    pada fase ini.
  </>,
  <>
    Terapi supresif antivirus. Jika salah satu pasangan diketahui memiliki <em>Herpes Genital</em>,
    penggunaan antivirus harian (Valacyclovir) oleh pasangan yang terinfeksi terbukti menurunkan
    risiko penularan ke pasangan yang tidak terinfeksi sekitar 48%.
  </>,
  <>
    Batasi jumlah pasangan seksual. Semakin sedikit pasangan, semakin kecil risiko terpapar berbagai
    IMS termasuk <em>Herpes Simplex</em>.
  </>,
];

const ORAL_ITEMS = [
  "Hindari berciuman atau berbagi peralatan makan/minum dengan seseorang yang sedang memiliki luka aktif di bibir atau mulut.",
  <>
    Jangan berbagi lipstik, lip balm, atau peralatan <em>makeup</em> bibir.
  </>,
  "Gunakan tabir surya (SPF 15 atau lebih) pada bibir saat beraktivitas di luar ruangan untuk mencegah kekambuhan yang dipicu sinar UV.",
];

const NEONATAL_ITEMS = [
  <>
    Ibu hamil dengan riwayat <em>Herpes Simplex</em> harus memberitahu dokter kandungannya sejak awal
    kehamilan.
  </>,
  "Dokter mungkin akan meresepkan antivirus (Acyclovir atau Valacyclovir) sejak usia kehamilan 36 minggu untuk meminimalkan risiko kekambuhan saat persalinan.",
  "Jika ada luka aktif saat persalinan, operasi sesar akan dipertimbangkan untuk menghindari kontak bayi dengan virus di jalan lahir.",
  <>
    Hindari kontak <em>oral</em> atau mencium bayi baru lahir di wajah jika Anda atau siapapun sedang
    memiliki luka <em>herpes</em> aktif di mulut.
  </>,
];

const KEKAMBUHAN_ITEMS = [
  "Kelola stres dengan baik. Meditasi, olahraga teratur, tidur cukup (7–9 jam per malam) dan relaksasi terbukti membantu mengurangi frekuensi kekambuhan.",
  "Jaga sistem imun. Konsumsi makanan bergizi seimbang, hindari alkohol berlebihan, tidak merokok, dan rutin berolahraga.",
  "Kenali dan hindari pemicu pribadi. Setiap penderita bisa punya pemicu kekambuhan yang berbeda. Mencatat kapan kekambuhan terjadi dan apa yang mendahuluinya bisa membantu mengidentifikasi pemicu.",
  "Konsumsi antivirus supresif. Untuk penderita yang sering kambuh, terapi antivirus harian adalah pilihan yang sangat efektif.",
];

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
          <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlainImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-auto w-[150px] shrink-0 object-contain md:w-[190px] lg:w-[210px]"
    />
  );
}

export default function HerpesPencegahanSection() {
  return (
    <section className="bg-[#F8FDFF] px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-10 md:space-y-12">
          <div className="space-y-3">
            <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
              Pencegahan <em>Herpes Simplex</em>
            </h2>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Belum ada vaksin yang tersedia untuk <em>Herpes Simplex</em> hingga saat ini. Namun ada
              banyak langkah yang terbukti efektif menurunkan risiko penularan dan kekambuhan:
            </p>
          </div>

          {/* Penularan Seksual - image left, list right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Pencegahan Penularan Seksual (HSV-2 dan HSV-1 Genital)
            </h3>
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
              <PlainImage src="/image/heartsave.webp" alt="pencegahan seksual" />
              <BulletList items={SEKSUAL_ITEMS} />
            </div>
          </div>

          {/* Herpes Oral - list left, image right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Pencegahan Herpes Oral (HSV-1)
            </h3>
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
              <div className="min-w-0 flex-1">
                <BulletList items={ORAL_ITEMS} />
              </div>
              <PlainImage src="/image/lipssave.webp" alt="pencegahan herpes oral" />
            </div>
          </div>

          {/* Neonatal - image left, list right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Pencegahan Herpes Neonatal
            </h3>
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
              <PlainImage src="/image/mother.webp" alt="pencegahan herpes neonatal" />
              <BulletList items={NEONATAL_ITEMS} />
            </div>
          </div>

          {/* Mencegah Kekambuhan - list left, image right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Mencegah Kekambuhan
            </h3>
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
              <div className="min-w-0 flex-1">
                <BulletList items={KEKAMBUHAN_ITEMS} />
              </div>
              <PlainImage src="/image/refresh.webp" alt="mencegah kekambuhan" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
