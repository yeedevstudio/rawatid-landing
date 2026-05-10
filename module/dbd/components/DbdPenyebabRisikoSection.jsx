import {
  IconBuildingSkyscraper,
  IconClock,
  IconDroplet,
  IconPalette,
  IconUserHeart,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

const shadowCard = "shadow-[0px_0px_12.1px_0px_#0000001A]";

const TRANSMISI_ITEMS = [
  {
    title: "Warna Tubuh",
    text: "Hitam dengan bintik-bintik putih khas di seluruh tubuh.",
    Icon: IconPalette,
  },
  {
    title: "Waktu Aktif",
    text: "Pagi (08:00-10:00) dan sore hari (16:00-18:00). Bukan malam hari.",
    Icon: IconClock,
  },
  {
    title: "Tempat Berkembang Biak",
    text: "Air bersih tergenang (bak mandi, vas, ban bekas, talang atap).",
    Icon: IconDroplet,
  },
  {
    title: "Jarak Terbang",
    text: "Relatif pendek, biasanya dalam radius 100-200 meter.",
    Icon: IconWorld,
  },
];

const FAKTOR_LINGKUNGAN = [
  {
    title: "Musim Hujan",
    text: "Genangan air meningkat drastis, menyediakan tempat berkembang biak nyamuk.",
  },
  {
    title: "Kepadatan penduduk",
    text: "semakin padat area pemukiman, semakin mudah nyamuk berpindah dari satu rumah ke rumah lain",
  },
  {
    title: "Sanitasi Buruk",
    text: "Tumpukan barang bekas dan kurangnya penutup pada penampungan air.",
  },
  {
    title: "Daerah Tropis",
    text: "iklim panas dan lembab mendukung perkembangbiakan nyamuk sepanjang tahun",
  },
];

const FAKTOR_INDIVIDU = [
  {
    title: "Usia 5-15 Tahun",
    text: "Kelompok yang paling sering terkena DBD parah di daerah endemis.",
  },
  {
    title: "Infeksi Sebelumnya",
    text: "Berisiko mengalami DBD parah pada infeksi kedua dengan serotipe berbeda.",
  },
  {
    title: "Sistem Imun Lemah",
    text: "Penderita penyakit kronis atau gangguan imun lebih rentan.",
  },
  {
    title: "Tidak Ada Imunitas",
    text: "Pendatang baru ke daerah endemis tanpa riwayat infeksi sebelumnya.",
  },
];

function TransmisiCard({ title, text, Icon }) {
  return (
    <article className="flex h-full min-h-[240px] min-w-0 flex-col items-start rounded-[14px] bg-[#EBF6F9] p-6 md:min-h-[260px] md:p-8">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#038F7A] md:h-12 md:w-12 md:rounded-[12px]">
        <Icon className="h-6 w-6 stroke-[1.5] md:h-[26px] md:w-[26px]" aria-hidden />
      </div>
      <h3 className="mt-4 w-full text-left text-[15px] font-bold leading-snug text-[#038F7A] md:mt-5 md:text-base">
        {title}
      </h3>
      <p className="mt-2 w-full flex-1 text-left text-[13px] font-normal leading-relaxed text-neutral-600 md:mt-3 md:text-[14px] md:leading-[1.55]">
        {text}
      </p>
    </article>
  );
}

function RisikoCard({ title, text, accent }) {
  const barColor = accent === "teal" ? "border-l-[#038F7A]" : "border-l-[#C04040]";
  const titleColor = accent === "teal" ? "text-[#038F7A]" : "text-[#C04040]";
  return (
    <article
      className={`flex h-full min-h-0 flex-col rounded-[12px] border-l-4 bg-white py-4 pl-4 pr-4 md:py-5 md:pl-5 md:pr-5 ${barColor} ${shadowCard}`}
    >
      <h4 className={`text-[14px] font-bold ${titleColor} md:text-[15px]`}>{title}</h4>
      <p className="mt-2 flex-1 text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
    </article>
  );
}

export default function DbdPenyebabRisikoSection() {
  return (
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20"
    >
      <h1 className="text-xl font-semibold text-[#038F7A] md:text-2xl">Penyebab &amp; Faktor Risiko</h1>

      <div className="mt-10 md:mt-12">
        <h2 className="text-lg font-semibold text-[#038F7A] md:text-xl">Bagaimana Penularan Terjadi?</h2>
        <p className="mt-3 w-full text-[14px] font-normal leading-relaxed text-neutral-800 md:mt-4 md:text-[15px] md:leading-[1.65]">
          Virus dengue tidak menular langsung dari orang ke orang. Nyamuk betina{" "}
          <span className="italic">Aedes aegypti</span> (dan terkadang <span className="italic">Aedes albopictus</span>)
          yang menggigit orang sedang mengalami viremia dapat membawa virus tersebut, lalu menularkannya kepada
          orang lain melalui gigitan berikutnya. Memahami kebiasaan nyamuk ini penting untuk strategi pencegahan di
          rumah dan lingkungan.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {TRANSMISI_ITEMS.map((item) => (
            <TransmisiCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="mt-14 md:mt-16">
        <h2 className="text-lg font-semibold text-[#038F7A] md:text-xl">
          Faktor Risiko yang Meningkatkan Kemungkinan Tertular DBD
        </h2>
        <p className="mt-3 w-full text-[14px] font-normal leading-relaxed text-neutral-800 md:mt-4 md:text-[15px] md:leading-[1.65]">
          Selain perilaku nyamuk, beberapa kondisi di sekitar kita dan pada tubuh seseorang dapat membuat peluang
          paparan dan penyakit berkembang lebih besar. Berikut ringkasan faktor yang sering dibahas dalam
          literatur kesehatan masyarakat.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2 text-[#038F7A]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#038F7A]/15 text-[#038F7A]">
                <IconBuildingSkyscraper className="h-5 w-5" stroke={1.5} aria-hidden />
              </span>
              <h3 className="text-base font-semibold md:text-lg">Faktor Lingkungan</h3>
            </div>
            <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-4">
              {FAKTOR_LINGKUNGAN.map((c) => (
                <RisikoCard key={c.title} {...c} accent="teal" />
              ))}
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2 text-[#C04040]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#C04040]/15 text-[#C04040]">
                <IconUserHeart className="h-5 w-5" stroke={1.5} aria-hidden />
              </span>
              <h3 className="text-base font-semibold md:text-lg">Faktor Individu</h3>
            </div>
            <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-4">
              {FAKTOR_INDIVIDU.map((c) => (
                <RisikoCard key={c.title} {...c} accent="red" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
