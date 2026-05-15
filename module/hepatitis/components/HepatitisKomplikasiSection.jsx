import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const FULMINAN_GEJALA = [
  <>Penurunan kesadaran mendadak (<em>ensefalopati hepatik</em>),</>,
  "Perdarahan yang sulit berhenti,",
  <>Penurunan produksi <em>urine</em>,</>,
  <>Perut membuncit akibat cairan (<em>asites</em>).</>,
];

const TANDA_BAHAYA = [
  "Bingung, tidak bisa diajak bicara normal, atau penurunan kesadaran",
  "Tidak bisa makan atau minum apapun lebih dari 24 jam",
  "Tanda perdarahan: gusi berdarah, memar tanpa sebab, muntah darah",
  "Perut membuncit tiba-tiba",
  "Sangat lemas hingga tidak bisa berdiri",
];

export default function HepatitisKomplikasiSection() {
  return (
    <section id="komplikasi" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Komplikasi pada Penderita Hepatitis A
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Komplikasi serius akibat Hepatitis A sangat jarang terjadi pada orang yang sehat. Mayoritas
            penderita pulih sempurna tanpa kerusakan permanen pada hati. Namun dalam beberapa kasus
            tertentu, komplikasi bisa terjadi:
          </p>

          {/* Hepatitis Fulminan */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              <em>Hepatitis Fulminan</em> (Gagal Hati Akut)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Ini adalah komplikasi paling berbahaya, meskipun sangat jarang dan terjadi pada kurang dari
              1% kasus. Hati mengalami kerusakan masif dalam waktu singkat sehingga tidak bisa lagi
              menjalankan fungsinya.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Gejalanya meliputi:
            </p>
            <ul className="space-y-1.5">
              {FULMINAN_GEJALA.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Kondisi ini memerlukan perawatan intensif dan bisa fatal tanpa penanganan segera. Risiko
              lebih tinggi pada lansia dan orang dengan penyakit hati sebelumnya (seperti hepatitis B
              atau C kronis atau sirosis).
            </p>
          </div>

          {/* Relaps */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              <em>Relaps</em> (Kekambuhan)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Sekitar 10–15% penderita mengalami kekambuhan gejala 4–15 minggu setelah tampak membaik.
              Kekambuhan ini biasanya lebih ringan dari episode pertama dan akhirnya sembuh total.
            </p>
          </div>

          {/* Kolestasis */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              <em>Kolestasis</em> Berkepanjangan
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Beberapa penderita mengalami kulit kuning yang berlangsung lama (hingga beberapa bulan)
              akibat gangguan aliran empedu. Kondisi ini umumnya membaik sendiri meskipun membutuhkan
              waktu lebih lama dari biasanya.
            </p>
          </div>

          {/* Kelompok Berisiko Tinggi */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Komplikasi pada Kelompok Berisiko Tinggi
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Orang dengan penyakit hati kronis sebelumnya (seperti hepatitis B atau C, sirosis, atau
              penyakit hati berlemak) berisiko mengalami perjalanan penyakit yang jauh lebih berat dan
              komplikasi yang lebih serius jika terinfeksi Hepatitis A.
            </p>
          </div>

          {/* Red Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-red-300/60 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-300/60 bg-white text-red-500">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-red-600 md:text-[16px]">
                Tanda Bahaya yang Membutuhkan Penanganan Darurat!
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Segera bawa ke UGD rumah sakit jika penderita mengalami:
              </p>
              <ul className="space-y-1">
                {TANDA_BAHAYA.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
