import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const RUAM_TOP = [
  {
    image: "/image/ruam1.svg",
    title: "Pola penyebaran",
    text: "ruam biasanya dimulai dari wajah, kemudian menyebar secara sentrifugal ke batang tubuh, lengan, kaki, telapak tangan, dan telapak kaki. Pada wabah 2022, ruam sering muncul pertama kali di area genital atau mulut sebelum menyebar ke tempat lain.",
  },
  {
    image: "/image/ruam2.svg",
    title: "Evolusi lesi dalam tahapan berurutan (semua lesi berkembang bersama secara sinkron)",
    text: "Makula (bercak datar kemerahan) → Papula (tonjolan padat) → Vesikel (gelembung berisi cairan bening) → Pustula (gelembung berisi nanah kekuningan) → Krusta (keropeng yang mengering) → Sembuh. Seluruh proses ini berlangsung 2–4 minggu.",
  },
];

const RUAM_BOTTOM = [
  {
    image: "/image/ruam3.svg",
    title: "Karakteristik lesi",
    text: "lesi Cacar Monyet biasanya dalam (deep-seated), keras saat disentuh, dan terasa nyeri, berbeda dari Cacar Air yang biasanya dangkal dan gatal. Ukuran lesi bervariasi dari beberapa milimeter hingga lebih dari 1 cm.",
  },
  {
    image: "/image/ruam4.svg",
    title: "Jumlah lesi",
    text: "bervariasi sangat luas, dari hanya beberapa lesi (bahkan 1–2 lesi pada beberapa kasus wabah 2022) hingga ribuan lesi yang menyebar ke seluruh tubuh.",
  },
  {
    image: "/image/ruam5.svg",
    title: "Lokasi khas",
    text: "yaitu telapak tangan dan telapak kaki adalah lokasi yang sangat khas untuk Cacar Monyet, ini tidak umum pada Cacar Air. Lesi di mulut, mata, dan alat kelamin juga sering ditemukan.",
  },
];

const FASE_CARDS = [
  {
    image: "/image/fase1.svg",
    title: "Demam tinggi",
    text: "(38–40°C) yang muncul tiba-tiba",
  },
  {
    image: "/image/fase2.svg",
    title: "Sakit kepala hebat",
    text: "",
  },
  {
    image: "/image/fase3.svg",
    title: "Nyeri otot (mialgia)",
    text: "Nyeri otot (mialgia) dan nyeri punggung yang mencolok",
  },
  {
    image: "/image/fase4.svg",
    title: "Kelelahan ekstrim",
    text: "",
  },
];

const TIMELINE_DOTS = [0, 20, 40, 60, 80, 100];

export default function GejalaCacarMonyet() {
  return (
    <section
      id="tanda-gejala"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Tanda dan Gejala Cacar Monyet
        </h2>

        {/* Masa Inkubasi */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center md:mt-10 md:gap-8">
          {/* Left card */}
          <div className="w-full shrink-0 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] sm:w-[287px] md:p-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/calender.svg.svg" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <div>
                <p className="text-[14px] font-semibold text-neutral-700 md:text-[15px]">Masa Inkubasi</p>
                <p className="text-[32px] font-bold leading-tight text-[#038F7A] md:text-[36px]">3-21 hari</p>
                <p className="text-[12px] text-neutral-500 md:text-[13px]">Rata-rata 6-13 hari</p>
              </div>
            </div>
          </div>

          {/* Right: text + timeline */}
          <div className="flex-1">
            <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
              Selama masa inkubasi, penderita belum menunjukkan gejala dan umumnya belum menular, meskipun penularan
              pra-gejala dalam skala kecil mungkin terjadi.
            </p>

            {/* Timeline */}
            <div className="mt-5 flex items-center gap-3">
              <span className="shrink-0 text-[13px] text-neutral-600 md:text-[14px]">3 hari</span>
              <div className="relative flex-1">
                <div className="h-0.5 w-full bg-[#038F7A]" />
                {TIMELINE_DOTS.map((pct) => (
                  <div
                    key={pct}
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#038F7A]"
                    style={{ left: `${pct}%`, transform: "translate(-50%, -50%)" }}
                  />
                ))}
              </div>
              <span className="shrink-0 text-[13px] text-neutral-600 md:text-[14px]">21 hari</span>
            </div>
          </div>
        </div>

        {/* Fase Prodromal */}
        <h3 className="mt-10 text-[24px] font-medium text-[#038F7A] md:mt-12">
          Fase Prodromal (1–5 Hari Pertama Gejala)
        </h3>

        {/* 4 cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {FASE_CARDS.map(({ image, title, text }) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
              <div>
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</p>
                {text && <p className="mt-1 text-[12px] leading-relaxed text-neutral-600 md:text-[13px]">{text}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Card 5 - full width */}
        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image/fase5.svg" alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
          <div>
            <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">
              Pembesaran kelenjar getah bening (limfadenopati)
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-neutral-600 md:text-[13px]">
              gejala paling khas dari Cacar Monyet dan yang membedakannya dari Cacar Air. Kelenjar yang membesar
              sering teraba di leher, ketiak, atau selangkangan, terasa lunak dan nyeri saat ditekan.
            </p>
          </div>
        </div>

        {/* Callout: Pembeda Kunci */}
        <div className="mt-8 rounded-2xl border border-[#038F7A]/40 p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-9 md:w-9">
              <IconInfoCircle className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[20px] font-semibold leading-snug text-[#038F7A]">
                Pembeda Kunci Cacar Monyet vs Cacar Air:
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Pembesaran kelenjar getah bening adalah tanda khas Cacar Monyet (Mpox) yang tidak ditemukan pada
                Cacar Air (Varisela). Jika seseorang mengalami ruam dengan pembesaran kelenjar getah bening yang
                terasa nyeri, penderita harus segera dievaluasi dan ada kemungkinan menderita Cacar Monyet.
              </p>
            </div>
          </div>
        </div>
        {/* Fase Ruam Kulit */}
        <h3 className="mt-10 text-[24px] font-medium text-[#038F7A] md:mt-12">
          Fase Ruam Kulit (1–4 Minggu)
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Sekitar 1–5 hari setelah demam, ruam khas Cacar Monyet mulai muncul. Karakteristik ruam Cacar Monyet yang sangat khas adalah:
        </p>

        {/* Top 2 cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {RUAM_TOP.map(({ image, title, text }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 object-contain md:h-16 md:w-16" />
              <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
              <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Bottom 3 cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {RUAM_BOTTOM.map(({ image, title, text }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 object-contain md:h-16 md:w-16" />
              <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
              <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Red callout */}
        <div className="mt-8 rounded-2xl border border-[#DB1A1A]/40 p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A] md:h-9 md:w-9">
              <IconInfoCircle className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[20px] font-semibold leading-snug text-[#DB1A1A]">
                Kapan Penderita Masih Menular?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Penderita Cacar Monyet dianggap menular mulai dari saat gejala pertama muncul hingga semua lesi
                sembuh sempurna dan lapisan kulit baru terbentuk, biasanya berlangsung sekitar 2–4 minggu.
                Penderita tidak boleh berinteraksi dekat dengan orang lain, harus isolasi mandiri, dan menghindari
                kontak kulit ke kulit selama periode ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
