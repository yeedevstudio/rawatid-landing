import {
  IconThermometer,
  IconDroplets,
  IconFlame,
  IconCircleDotted,
  IconAlertCircle,
  IconLeaf,
  IconInfoCircle,
} from "@tabler/icons-react";
import React from "react";

import { HERPES_CARD_BOX_SHADOW, HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const PRIMER_ITEMS = [
  {
    Icon: IconThermometer,
    text: "Mengalami gejala awal mirip flu seperti demam, sakit kepala, nyeri otot, lemas, dan nafsu makan turun. Ini terjadi karena sistem imun tubuh sedang berjuang melawan infeksi baru.",
  },
  {
    Icon: IconDroplets,
    text: (
      <>
        Terjadinya pembengkakan kelenjar getah bening, baik di leher untuk <em>Herpes Oral</em> atau
        selangkangan <em>Herpes Genital</em>, bisa membengkak dan terasa nyeri saat ditekan.
      </>
    ),
  },
  {
    Icon: IconFlame,
    text: "Adanya rasa terbakar, gatal atau kesemutan di area yang akan terkena luka, biasanya 1–2 hari sebelum lepuhan terlihat.",
  },
  {
    Icon: IconCircleDotted,
    text: "Munculnya lepuhan kecil berisi cairan berwarna bening atau sedikit kekuningan yang berkelompok. Ukurannya kecil seperti kepala jarum hingga sebesar ujung pensil.",
  },
  {
    Icon: IconAlertCircle,
    text: (
      <>
        Adanya lepuhan pecah menjadi luka terbuka (<em>ulkus</em>) yang terasa sangat nyeri, terutama
        saat terkena air atau gesekan pakaian. Luka ini bisa berlangsung 2–3 minggu pada infeksi
        pertama.
      </>
    ),
  },
  {
    Icon: IconLeaf,
    text: "Adanya luka mengering dan membentuk keropeng. Luka perlahan mengering, membentuk keropeng, dan sembuh tanpa meninggalkan bekas luka permanen dalam kebanyakan kasus.",
  },
];

const LOKASI_CARDS = [
  {
    src: "/image/teeth.png",
    alt: "herpes oral",
    title: "Herpes Oral (Umumnya Terjadi pada HSV-1)",
    text: (
      <>
        Luka muncul di bibir atau tepi bibir luar, sudut mulut, gusi, langit-langit mulut, lidah, atau
        di dalam pipi. Pada infeksi pertama, bisa menyebabkan radang gusi dan mulut yang menyakitkan (
        <em>gingivostomatitis herpetika</em>) dengan banyak sariawan sekaligus.
      </>
    ),
  },
  {
    src: "/image/hsv.webp",
    alt: "herpes genital",
    title: "Herpes Genital (Umumnya Terjadi pada HSV-2)",
    text: (
      <>
        Pada pria, luka muncul di penis, <em>skrotum</em>, bokong, paha dalam, atau sekitar{" "}
        <em>anus</em>. Pada wanita, luka muncul di vulva atau bibir vagina luar, vagina bagian dalam,
        leher rahim (<em>serviks</em>), bokong, paha dalam, atau sekitar <em>anus</em>. Herpes di
        serviks bisa tidak terasa sama sekali sehingga sering tidak disadari.
      </>
    ),
  },
  {
    src: "/image/hand.png",
    alt: "herpes jari tangan",
    title: (
      <>
        Herpes pada Jari Tangan (<em>Herpetic Whitlow</em>)
      </>
    ),
    text: (
      <>
        Luka <em>herpes</em> bisa muncul di jari tangan jika ada kontak dengan virus. Ini bisa terjadi
        pada tenaga medis atau siapapun yang tidak sengaja menyentuh luka <em>herpes</em> aktif.
      </>
    ),
  },
];

const REKURENS_ITEMS = [
  "Lama kekambuhan biasanya 3–7 hari, lebih singkat dari infeksi pertama.",
  <>Adanya gejala awal (<em>prodromal</em>) seperti gatal, kesemutan, atau rasa panas biasanya muncul 6–24 jam sebelum lepuhan terlihat</>,
  "Jumlah luka biasanya lebih sedikit dan lebih kecil.",
  "Gejala seperti demam dan nyeri otot biasanya tidak muncul pada kekambuhan.",
  "Frekuensi kekambuhan bervariasi: ada yang kambuh beberapa kali setahun, ada yang bertahun-tahun tidak kambuh. HSV-2 genital rata-rata kambuh 4–5 kali per tahun di tahun pertama.",
];

function GejalaItem({ Icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-10 md:w-10">
        <Icon className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" aria-hidden />
      </div>
      <p className="pt-1.5 text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px] lg:text-[16px]">
        {text}
      </p>
    </div>
  );
}

function LokasiCard({ src, alt, title, text }) {
  return (
    <div className={`flex flex-col items-center rounded-2xl border border-neutral-200/90 bg-white px-5 py-7 text-center md:px-6 md:py-8 ${HERPES_CARD_BOX_SHADOW}`}>
      <div className="mb-5 flex h-[110px] w-[110px] items-center justify-center rounded-full border  md:h-[130px] md:w-[130px]">
        <img
          src={src}
          alt={alt}
          className="h-auto w-[70px] object-contain md:w-[84px]"
        />
      </div>
      <h4 className="mb-3 text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px]">
        {title}
      </h4>
      <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
        {text}
      </p>
    </div>
  );
}

export default function HerpesGejalaSection() {
  return (
    <section id="tanda-gejala" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Tanda &amp; Gejala dari <em>Herpes Simplex</em>
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Gejala <em>Herpes Simplex</em> sangat bervariasi dari yang tidak terasa sama sekali hingga
            yang cukup mengganggu aktivitas sehari-hari. Sekitar 67–80% penderita HSV-2 tidak menyadari
            diri mereka terinfeksi karena gejalanya sangat ringan atau tidak khas.
          </p>

          {/* Fase Primer */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 md:text-[16px]">
              Fase Infeksi Pertama (<em>Primer</em>)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Infeksi pertama kali biasanya paling berat. Gejala muncul sekitar 2–12 hari setelah
              terpapar virus (masa inkubasi). Ciri khasnya adalah sebagai berikut:
            </p>
            <div className="space-y-5 md:space-y-6">
              {PRIMER_ITEMS.map((item, i) => (
                <GejalaItem key={i} {...item} />
              ))}
            </div>
          </div>

          {/* Lokasi Gejala */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px]">
              Lokasi Gejala Berdasarkan Tipe
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
              {LOKASI_CARDS.map((card, i) => (
                <LokasiCard key={i} {...card} />
              ))}
            </div>
          </div>

          {/* Fase Rekurens */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 md:text-[16px]">
              Fase Kekambuhan (<em>Rekurens</em>)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Setelah infeksi pertama, <em>Herpes Simplex</em> bisa kambuh kapan saja. Kekambuhan
              biasanya jauh lebih ringan dan singkat dibandingkan infeksi pertama karena tubuh sudah
              punya antibodi:
            </p>
            <ul className="space-y-2.5">
              {REKURENS_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Kapan Harus Segera ke Dokter?
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                Segera periksakan diri jika muncul luka di <em>area genital</em> yang belum pernah
                dialami sebelumnya seperti luka tidak sembuh dalam 2 minggu, demam tinggi disertai luka
                di mulut atau kelamin, bayi baru lahir menunjukkan gejala seperti luka di kulit, demam,
                atau tampak sangat sakit, atau Anda memiliki sistem imun yang lemah akibat penyakit atau
                pengobatan tertentu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
