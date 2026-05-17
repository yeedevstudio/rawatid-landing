import React from "react";
import { IconInfoCircle, IconDroplet, IconClock, IconDroplets, IconArrowsLeftRight } from "@tabler/icons-react";

const VIRUS_CARDS = [
  {
    Icon: IconDroplet,
    title: "Warna Tubuh",
    text: "Hitam dengan bintik-bintik putih khas di seluruh tubuh.",
  },
  {
    Icon: IconClock,
    title: "Waktu Aktif",
    text: "Pagi (08:00–10:00) dan sore hari (16:00–18:00). Bukan malam hari.",
  },
  {
    Icon: IconDroplets,
    title: "Tempat Berkembang Biak",
    text: "Air bersih tergenang (bak mandi, vas, ban bekas, talang atap).",
  },
  {
    Icon: IconArrowsLeftRight,
    title: "Jarak Terbang",
    text: "Relatif pendek, biasanya dalam radius 100–200 meter.",
  },
];

const WPV_TYPES = [
  {
    code: "WPV tipe 1 (WPV1)",
    desc: "satu-satunya tipe yang masih bersirkulasi di dunia saat ini. Paling sering menyebabkan kelumpuhan",
  },
  {
    code: "WPV tipe 2 (WPV2)",
    desc: "dinyatakan telah eradikasi global sejak September 1999",
  },
  {
    code: "WPV tipe 3 (WPV3)",
    desc: "dinyatakan telah eradikasi global sejak Oktober 2019",
  },
];

function VirusCard({ Icon, title, text }) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] bg-[#EBF6F9] px-4 py-5 md:gap-4 md:px-5 md:py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#038F7A]">
        <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
      </div>
      <h3 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h3>
      <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
    </div>
  );
}

function WpvCard({ code, desc }) {
  return (
    <div className="flex gap-4 md:gap-5">
      <div className="w-[3px] shrink-0 self-stretch rounded-full bg-[#038F7A]" />
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-[#038F7A] md:text-[15px]">{code}</h3>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{desc}</p>
      </div>
    </div>
  );
}

export default function DefinisiPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Definisi dan Pengertian <em>Poliomielitis</em>
        </h2>

        <div className="mt-5 w-full space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <p>
            <em>Poliomielitis</em> (polio) adalah penyakit infeksi akut yang disebabkan oleh{" "}
            <em>poliovirus</em>, sejenis <em>enterovirus</em> yang menyerang sistem saraf. Pada sebagian besar
            kasus, <em>poliovirus</em> tidak menimbulkan gejala atau hanya menyebabkan gejala ringan seperti flu
            biasa. Namun pada sebagian kecil penderita, virus ini menyerang sumsum tulang belakang dan batang
            otak, menyebabkan kelumpuhan permanen, atau bahkan kematian.
          </p>
          <p>
            Nama <em>poliomielitis</em> berasal dari bahasa Yunani, yaitu <em>polios</em> (abu-abu),{" "}
            <em>myelos</em> (sumsum), dan <em>itis</em> (peradangan). Secara harfiah berarti peradangan pada
            substansi abu-abu di sumsum tulang belakang, yang merupakan mekanisme utama penyebab kelumpuhannya.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
          {VIRUS_CARDS.map((c) => (
            <VirusCard key={c.title} {...c} />
          ))}
        </div>

        <aside
          className="mt-8 w-full rounded-2xl border border-[#DB8B1A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
          aria-label="Fakta penting"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/15 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Fakta Penting tentang <em>Poliomielitis!</em>
              </h3>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                <em>Poliomielitis</em> bukan sekadar penyakit masa lalu, virus <em>polio</em> liar masih ditemukan
                di Pakistan dan Afghanistan hingga 2024. Selain itu, wabah polio yang berasal dari virus vaksin
                yang bermutasi (cVDPV) masih terjadi di berbagai negara, termasuk beberapa negara Afrika dan Asia,
                termasuk Indonesia.
              </p>
            </div>
          </div>
        </aside>

        <div className="mt-10 md:mt-12">
          <h3 className="text-lg font-semibold text-[#038F7A] md:text-xl">Tiga Jenis Poliovirus</h3>
          <p className="mt-2 text-[14px] font-normal leading-relaxed text-neutral-600 md:mt-3 md:text-base">
            Terdapat 3 <em>serotipe poliovirus</em> liar (<em>wild poliovirus</em>/WPV):
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-8">
            {WPV_TYPES.map((w) => (
              <WpvCard key={w.code} {...w} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
