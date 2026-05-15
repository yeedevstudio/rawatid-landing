import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

const MITOS_FAKTA = [
  {
    mitos: "Minum jus jambu biji bisa menaikkan trombosit dan menyembuhkan DBD",
    fakta: "Tidak ada bukti ilmiah bahwa jus jambu menaikkan trombosit. Trombosit naik sendiri seiring tubuh sembuh. Jus jambu boleh diminum karena mengandung cairan dan vitamin C, bukan karena bisa menaikkan trombosit.",
  },
  {
    mitos: "Trombosit di bawah 100.000 harus langsung transfusi",
    fakta: "Transfusi trombosit hanya diindikasikan saat trombosit sangat rendah (<10.000/mm³) atau ada perdarahan aktif. Angka trombosit rendah saja tanpa perdarahan tidak otomatis memerlukan transfusi.",
  },
  {
    mitos: "Kalau demam sudah turun, berarti sudah sembuh",
    fakta: "Turunnya demam pada hari ke-4 sampai ke-6 justru menandai dimulainya fase kritis. Pasien harus tetap dipantau ketat saat demam turun.",
  },
  {
    mitos: "DBD menular langsung dari orang ke orang",
    fakta: <>DBD tidak menular dari manusia ke manusia. Penularan hanya melalui gigitan nyamuk <em>Aedes aegypti</em> yang telah terinfeksi virus <em>dengue</em> dari penderita lain.</>,
  },
  {
    mitos: "Nyamuk demam berdarah hanya keluar malam hari",
    fakta: <>Justru sebaliknya. Nyamuk <em>Aedes Aegypti</em> paling aktif pada siang hari, pagi pukul 08.00–10.00 dan sore pukul 16.00–18.00. Bukan malam hari seperti nyamuk malaria.</>,
  },
  {
    mitos: "Sekali kena DBD, seumur hidup kebal",
    fakta: "Kekebalan hanya terbentuk terhadap 1 dari 4 serotipe virus dengue. Anda bisa terkena DBD hingga 4 kali seumur hidup dari serotipe yang berbeda.",
  },
];

const PESAN_ITEMS = [
  "Cegah dengan 3M Plus dan perlindungan dari gigitan nyamuk.",
  "Kenali gejala dan tanda bahaya sejak dini.",
  "Tangani dengan benar, minum cairan yang cukup, pantau kondisi, dan jangan tunda ke dokter jika ada tanda bahaya.",
];

const CREDITS = [
  { role: "Medical Writer", names: ["dr. Iffah Rizki Hasanah"] },
  { role: "Visual & Development", names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"] },
  { role: "Pengarah Produksi", names: ["Yaumil Ikhsan"] },
];

export default function DbdMitosFaktaSection() {
  return (
    <>
      <section
        id="mitos-fakta"
        className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
      >
        <div data-aos="fade-up" suppressHydrationWarning>
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
              Mitos dan Fakta Terkait Demam Berdarah <em>Dengue</em> (DBD)
            </h2>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200/90">
              {/* Header */}
              <div className="grid grid-cols-2">
                <div className="bg-red-50 px-5 py-3 md:px-6">
                  <p className="text-[13px] font-bold tracking-wide text-red-700 md:text-[14px]">MITOS</p>
                </div>
                <div className="bg-[#EBF6F9] px-5 py-3 md:px-6">
                  <p className="text-[13px] font-bold tracking-wide text-[#038F7A] md:text-[14px]">FAKTA</p>
                </div>
              </div>
              {/* Rows */}
              {MITOS_FAKTA.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 border-t border-neutral-200/90 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}
                >
                  <div className="border-r border-neutral-200/90 px-5 py-4 md:px-6 md:py-5">
                    <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px] lg:text-[15px]">
                      {row.mitos}
                    </p>
                  </div>
                  <div className="px-5 py-4 md:px-6 md:py-5">
                    <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px] lg:text-[15px]">
                      {row.fakta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Orange Callout */}
            <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-white px-6 py-6 md:px-8 md:py-7">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
                <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <div className="min-w-0 space-y-2">
                <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                  Pesan Penting
                </p>
                <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  DBD adalah penyakit yang serius tetapi sangat bisa dicegah dan ditangani. Kunci utamanya ada di tiga hal:
                </p>
                <ul className="space-y-1">
                  {PESAN_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  Jangan terkecoh dengan mitos yang beredar. Percayakan penanganan kepada tenaga medis dan ikuti panduan berbasis bukti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
        <div data-aos="fade-up" suppressHydrationWarning>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {CREDITS.map(({ role, names }) => (
              <div
                key={role}
                className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/90 bg-white px-6 py-7 text-center"
              >
                <p className="text-[14px] font-semibold text-neutral-800 md:text-[15px]">{role}</p>
                <div className="space-y-1">
                  {names.map((name) => (
                    <p key={name} className="text-[14px] leading-relaxed text-neutral-600 md:text-[15px]">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
