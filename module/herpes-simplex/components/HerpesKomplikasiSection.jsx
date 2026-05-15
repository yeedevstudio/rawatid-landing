import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

function CircleImage({ src, alt }) {
  return (
    <div className="h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full md:h-[220px] md:w-[220px]">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

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

const SISTEM_SARAF_ITEMS = [
  <>
    <strong>Herpes Ensefalitis:</strong> Virus HSV menyebar ke otak dan menyebabkan peradangan otak
    (ensefalitis). Ini komplikasi paling berbahaya dari herpes, dengan angka kematian yang tinggi jika
    tidak ditangani segera. Gejalanya berupa demam tinggi mendadak, sakit kepala sangat hebat,
    kebingungan, bicara kacau, kejang, hingga penurunan kesadaran. Ensefalitis herpes bisa menyebabkan
    kerusakan otak permanen.
  </>,
  <>
    <strong>Meningitis Herpes:</strong> Peradangan selaput yang menyelimuti otak dan sumsum tulang
    belakang. Lebih sering disebabkan HSV-2. Gejalanya berupa sakit kepala hebat, leher kaku, mual,
    dan kepekaan terhadap cahaya. Biasanya lebih ringan dari ensefalitis dan bisa pulih sepenuhnya.
  </>,
  "Peradangan sumsum tulang belakang yang bisa menyebabkan kelemahan kaki, gangguan berkemih/buang air besar, atau bahkan kelumpuhan parsial",
];

const MATA_ITEMS = [
  <>
    <strong>Herpes Keratitis:</strong> Infeksi HSV pada kornea mata, yang merupakan penyebab kebutaan
    infeksius paling umum di negara maju. Gejalanya: mata merah, nyeri, penglihatan kabur, sensitif
    terhadap cahaya, dan keluar cairan dari mata. Jika tidak ditangani segera dan tepat, bisa
    meninggalkan jaringan parut pada kornea yang menurunkan penglihatan secara permanen.
  </>,
  <>
    <strong>Peradangan selaput mata luar</strong> yang umumnya lebih ringan dari keratitis.
  </>,
];

const NEONATAL_ITEMS = [
  <>
    <strong>Herpes lokal (kulit, mata, mulut):</strong> Bentuk paling ringan, bisa diobati dengan
    hasil yang baik.
  </>,
  <>
    <strong>Herpes yang menyerang sistem saraf pusat:</strong> Encephalitis pada bayi baru lahir,
    dengan risiko kerusakan otak permanen.
  </>,
  "Virus menyebar ke seluruh organ tubuh termasuk hati, paru-paru, dan otak. Angka kematiannya sangat tinggi meskipun dengan pengobatan",
];

const LAINNYA_ITEMS = [
  <>
    <strong>Peningkatan risiko HIV:</strong> Luka terbuka <em>Herpes Genital</em> menciptakan pintu
    masuk bagi virus HIV. Penderita <em>Herpes Genital</em> aktif berisiko 2–3 kali lebih tinggi
    tertular HIV jika terpapar.
  </>,
  <>
    <strong>Infeksi bakteri sekunder:</strong> Luka terbuka yang tidak dirawat dengan bersih bisa
    terinfeksi bakteri, menyebabkan luka bertambah parah, bernanah dan sulit sembuh.
  </>,
  <>
    <strong>Herpes diseminata (pada imunokompromis):</strong> Pada penderita HIV/AIDS stadium lanjut
    atau pasien transplantasi, virus bisa menyebar ke seluruh tubuh termasuk esofagus (kerongkongan),
    saluran pernapasan, dan organ dalam.
  </>,
  <>
    <strong>Dampak Psikologis:</strong> Diagnosis herpes, terutama herpes genital, bisa menimbulkan
    stres, rasa malu, kecemasan, dan dampak negatif pada hubungan sosial dan seksual. Dampak
    psikologis ini perlu diperhatikan dan bisa diatasi dengan dukungan konseling yang tepat.
  </>,
];

export default function HerpesKomplikasiSection() {
  return (
    <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-10 md:space-y-12">
          <div className="space-y-3">
            <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
              Komplikasi pada <em>Herpes Simplex</em>
            </h2>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Pada kebanyakan orang sehat, <em>Herpes Simplex</em> hanya menyebabkan ketidaknyamanan
              ringan. Namun pada kelompok rentan seperti bayi baru lahir, orang dengan sistem imun lemah
              dan mereka yang tidak mendapat penanganan tepat, Herpes Simplex bisa menimbulkan
              komplikasi serius.
            </p>
          </div>

          {/* Sistem Saraf - image left, list right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Komplikasi pada Sistem Saraf
            </h3>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <CircleImage src="/image/brain.png" alt="komplikasi sistem saraf" />
              <BulletList items={SISTEM_SARAF_ITEMS} />
            </div>
          </div>

          {/* Mata - list left, image right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Komplikasi pada Mata
            </h3>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <div className="min-w-0 flex-1">
                <BulletList items={MATA_ITEMS} />
              </div>
              <CircleImage src="/image/eye.png" alt="komplikasi mata" />
            </div>
          </div>

          {/* Neonatal - image left, content right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Komplikasi pada Bayi (Herpes Neonatal)
            </h3>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <CircleImage src="/image/baby.png" alt="herpes neonatal" />
              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                  Ini adalah komplikasi paling ditakuti. Bayi yang terinfeksi HSV saat lahir bisa
                  mengalami tiga bentuk kondisi:
                </p>
                <BulletList items={NEONATAL_ITEMS} />
              </div>
            </div>
          </div>

          {/* Lainnya - list left, image right */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Komplikasi Lainnya
            </h3>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <div className="min-w-0 flex-1">
                <BulletList items={LAINNYA_ITEMS} />
              </div>
              <CircleImage src="/image/pompajantung.png" alt="komplikasi lainnya" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
