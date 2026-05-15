import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const ANTIVIRUS_CARDS = [
  {
    src: "/image/bottle.png",
    alt: "acyclovir",
    title: "Acyclovir (Asiklovir)",
    text: "Obat antivirus tertua dan paling banyak tersedia. Harus diminum 5 kali sehari. Tersedia dalam bentuk pil, krim topikal, dan infus (untuk kasus berat).",
  },
  {
    src: "/image/bottle.png",
    alt: "valacyclovir",
    title: "Valacyclovir (Valasiklovir)",
    text: "Versi yang lebih baru dan lebih mudah diabsorbsi. Cukup diminum 2–3 kali sehari. Efektivitasnya setara dengan acyclovir tetapi lebih nyaman.",
  },
  {
    src: "/image/bottle.png",
    alt: "famciclovir",
    title: "Famciclovir",
    text: "Pilihan lain yang efektif, juga hanya perlu diminum 2–3 kali sehari.",
  },
];

const POLA_CARDS = [
  {
    src: "/image/drug.png",
    alt: "terapi episodik",
    title: "Terapi Episodik",
    text: "Obat antivirus Acyclovir, direkomendasikan untuk kelompok berisiko tinggi seperti remaja, dewasa, ibu hamil, penderita dengan imun lemah. Paling efektif jika diberikan dalam 24 jam pertama setelah ruam muncul.",
  },
  {
    src: "/image/drug.png",
    alt: "terapi supresif harian",
    title: "Terapi Supresif Harian",
    text: (
      <>
        <em>Antihistamin Oral</em> seperti <em>Cetirizine</em> atau <em>Loratadine</em> untuk
        mengurangi rasa gatal sistemik.
      </>
    ),
  },
];

const PEREDA_NYERI_CARDS = [
  {
    src: "/image/bottle.png",
    alt: "obat pereda nyeri oral",
    title: "Obat Pereda Nyeri Oral",
    text: (
      <>
        <em>Ibuprofen</em> atau <em>Parasetamol</em> untuk mengurangi demam dan nyeri.
      </>
    ),
  },
  {
    src: "/image/kompres.png",
    alt: "kompres dingin",
    title: "Kompres Dingin",
    text: "Mengompres area luka dengan kain bersih yang dibasahi air dingin dapat mengurangi rasa panas dan nyeri.",
  },
  {
    src: "/image/oksigen.png",
    alt: "anestesi lokal topikal",
    title: "Anestesi Lokal Topikal",
    text: "Krim atau gel yang mengandung lidokain bisa dioleskan pada luka yang sangat nyeri, terutama herpes oral.",
  },
  {
    src: "/image/bath.png",
    alt: "mandi air hangat",
    title: "Mandi Air Hangat",
    text: "Membantu mengurangi rasa tidak nyaman pada herpes genital.",
  },
];

const PERAWATAN_MANDIRI = [
  {
    label: "Jaga area luka tetap bersih dan kering",
    text: "Gunakan sabun lembut, bilas bersih, dan keringkan dengan menepuk-nepuk, bukan menggosok.",
  },
  {
    label: "Hindari memecahkan lepuhan",
    text: "Cairan di dalam lepuhan mengandung virus aktif yang bisa menyebar ke area lain atau menular ke orang lain.",
  },
  {
    label: "Cuci tangan sesering mungkin",
    text: "Terutama setelah menyentuh area yang terinfeksi.",
  },
  {
    label: "Gunakan pakaian dalam yang longgar dan berbahan katun",
    text: (
      <>
        Untuk mengurangi gesekan dan iritasi pada <em>Herpes Genital</em>.
      </>
    ),
  },
  {
    label: "Hindari kontak seksual dan berciuman saat gejala aktif",
    text: (
      <>
        Mulai dari fase <em>prodromal</em> atau pada saat gatal dan kesemutan mulai terasa sampai semua
        luka benar-benar sembuh.
      </>
    ),
  },
];

const KELOMPOK_KHUSUS = [
  {
    label: "Ibu hamil",
    text: "Memerlukan perhatian khusus karena risiko penularan ke bayi. Dokter biasanya akan meresepkan antivirus di trimester ketiga dan mempertimbangkan operasi caesar jika ada luka aktif saat persalinan.",
  },
  {
    label: "Penderita dengan imun lemah",
    text: "Membutuhkan dosis antivirus yang lebih tinggi dan mungkin perlu terapi jangka panjang.",
  },
  {
    label: "Bayi dengan herpes neonatal",
    text: "Harus segera dirawat intensif di rumah sakit dengan antivirus intravena (infus) dosis tinggi.",
  },
];

function MedCard({ src, alt, title, text }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-neutral-200/90 bg-white px-4 py-6 text-center md:px-5 md:py-7">
      <div className="mb-4 flex h-[64px] w-[64px] items-center justify-center md:mb-5 md:h-[72px] md:w-[72px]">
        <img src={src} alt={alt} className="h-auto w-full object-contain" />
      </div>
      <h4 className="mb-2 text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">
        {title}
      </h4>
      <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
        {text}
      </p>
    </div>
  );
}

function BulletItem({ label, text, labelColor = "text-[#038F7A]" }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-[8px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
      <div className="min-w-0 space-y-1">
        <p className={`text-[14px] font-semibold leading-snug ${labelColor} md:text-[15px]`}>
          {label}
        </p>
        <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
          {text}
        </p>
      </div>
    </li>
  );
}

export default function HerpesPenangananSection() {
  return (
    <section id="penanganan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Penanganan <em>Herpes Simplex</em>
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Meskipun <em>Herpes Simplex</em> tidak bisa disembuhkan total, pengobatan yang tepat sangat
            membantu dalam mempercepat penyembuhan, mengurangi nyeri, memperpendek durasi gejala dan
            menurunkan frekuensi kekambuhan. Kunci utamanya adalah memulai pengobatan sesegera mungkin,
            idealnya dalam 24–48 jam pertama setelah gejala muncul.
          </p>

          {/* Obat Antivirus */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Obat Antivirus (Pengobatan Utama)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Obat antivirus adalah pengobatan utama <em>Herpes Simplex</em>. Ada tiga obat antivirus
              yang paling umum diresepkan:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
              {ANTIVIRUS_CARDS.map((card, i) => (
                <MedCard key={i} {...card} />
              ))}
            </div>
          </div>

          {/* Pola Penggunaan */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Pola Penggunaan Obat Antivirus
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
              {POLA_CARDS.map((card, i) => (
                <MedCard key={i} {...card} />
              ))}
            </div>
          </div>

          {/* Pereda Nyeri */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Pereda Nyeri dan Ketidaknyamanan
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
              {PEREDA_NYERI_CARDS.map((card, i) => (
                <MedCard key={i} {...card} />
              ))}
            </div>
          </div>

          {/* Perawatan Mandiri */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Perawatan Mandiri di Rumah
            </h3>
            <ul className="space-y-4 md:space-y-5">
              {PERAWATAN_MANDIRI.map((item, i) => (
                <BulletItem key={i} label={item.label} text={item.text} />
              ))}
            </ul>
          </div>

          {/* Kelompok Khusus */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Penanganan pada Kelompok Khusus
            </h3>
            <ul className="space-y-4 md:space-y-5">
              {KELOMPOK_KHUSUS.map((item, i) => (
                <BulletItem key={i} label={item.label} text={item.text} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
