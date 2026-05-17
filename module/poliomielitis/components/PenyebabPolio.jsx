import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const PENULARAN_CARDS = [
  {
    image: "/image/tameng.png",
    title: <>Rute <em>fekal-oral</em> (paling utama)</>,
    text: "Virus dari tinja penderita mencemari air minum, makanan, atau tangan yang tidak dicuci, kemudian tertelan oleh orang lain.",
  },
  {
    image: "/image/tigaorang.png",
    title: <>Rute <em>oral-oral</em></>,
    text: "Melalui tetesan air liur dari orang yang terinfeksi, terutama pada awal infeksi.",
  },
  {
    image: "/image/bumi.png",
    title: "Air dan sanitasi buruk",
    text: "Virus berkembang pesat di lingkungan dengan sanitasi yang tidak memadai dan akses air bersih yang terbatas.",
  },
];

const RISIKO_TERTULAR = [
  { bold: "Anak di bawah 5 tahun:", text: " kelompok paling rentan, terutama yang belum mendapat vaksinasi lengkap." },
  { bold: "Belum divaksin atau vaksinasi tidak lengkap:", text: " faktor risiko terbesar; vaksinasi adalah satu-satunya perlindungan yang terbukti efektif." },
  { bold: "Tinggal atau bepergian ke daerah endemis:", text: " Pakistan, Afghanistan, dan negara-negara dengan wabah VDPV aktif." },
  { bold: "Lingkungan sanitasi buruk:", text: " daerah tanpa akses air bersih dan pengelolaan limbah yang tidak memadai." },
  { bold: "Kepadatan penduduk tinggi:", text: " mempermudah penyebaran virus dari satu orang ke orang lain." },
  { bold: "Imunokompromis:", text: " penderita HIV/AIDS atau yang menjalani kemoterapi lebih rentan mengalami infeksi berat." },
];

const RISIKO_KELUMPUHAN = [
  { bold: "Aktivitas fisik berat saat infeksi aktif:", text: " olahraga atau aktivitas keras selama fase infeksi meningkatkan risiko terkena polio paralitik." },
  { bold: "Suntikan intramuskular selama infeksi:", text: " suntikan (misalnya imunisasi lain) yang diberikan saat infeksi aktif dapat memicu kelumpuhan di anggota gerak yang disuntik." },
  { bold: "Kehamilan:", text: " wanita hamil yang terinfeksi berisiko lebih tinggi mengalami komplikasi serius." },
  { bold: "Defisiensi imun:", text: " terutama defisiensi imunoglobulin meningkatkan risiko kelumpuhan." },
];

const cardBase =
  "flex flex-col items-center gap-4 rounded-[16px] border border-neutral-200/90 bg-white px-4 py-6 text-center shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:px-5 md:py-8";

function PenularanCard({ image, title, text }) {
  return (
    <div className={cardBase}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
      <h3 className="text-[15px] font-bold leading-snug text-neutral-900 md:text-base">{title}</h3>
      <p className="text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
    </div>
  );
}

function BulletItem({ bold, text }) {
  return (
    <li className="flex gap-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
      <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
      <span><strong>{bold}</strong>{text}</span>
    </li>
  );
}

export default function PenyebabPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Penyebab dan Faktor Risiko <em>Poliomielitis</em>
        </h2>

        {/* Poliovirus sebagai penyebab */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Poliovirus Sebagai Penyebab dari <em>Poliomielitis</em>
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:mt-4 md:text-[17px] md:leading-[1.7]">
          <em>Poliovirus</em> adalah virus RNA berukuran sangat kecil dari <em>famili Picornaviridae</em>,{" "}
          <em>genus Enterovirus</em>. Virus ini sangat stabil di lingkungan, bisa bertahan di air atau tinja
          selama berminggu-minggu, terutama di lingkungan yang dingin dan lembab. <em>Poliovirus</em> masuk ke
          tubuh manusia melalui mulut, berkembang biak di tenggorokan dan usus, kemudian dikeluarkan lewat tinja
          penderita dalam jumlah besar, bahkan sebelum gejala muncul.
        </p>

        {/* Cara Penularan */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Cara Penularan <em>Poliomielitis</em>
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-6">
          {PENULARAN_CARDS.map((c, i) => (
            <PenularanCard key={i} {...c} />
          ))}
        </div>

        {/* Orange callout */}
        <aside
          className="mt-8 w-full rounded-2xl border border-[#DB8B1A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
          aria-label="Penting untuk dipahami"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/15 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Penting untuk Dipahami Terkait <em>Poliomielitis!</em>
              </h3>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Seseorang yang terinfeksi <em>poliovirus</em> bisa menularkan virus ke orang lain mulai dari 7–10
                hari sebelum gejala muncul, dan terus menularkan selama 3–6 minggu setelah terinfeksi. Artinya,
                penularan sering terjadi tanpa disadari karena penderita tampak sehat.
              </p>
            </div>
          </div>
        </aside>

        {/* Faktor Risiko */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Faktor Risiko <em>Poliomielitis</em>
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-6">
          <div className="rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
            <h4 className="mb-4 text-[14px] font-semibold text-[#038F7A] md:text-[15px]">
              Siapa yang Paling Berisiko Tertular?
            </h4>
            <ul className="flex flex-col gap-3">
              {RISIKO_TERTULAR.map((item, i) => (
                <BulletItem key={i} {...item} />
              ))}
            </ul>
          </div>
          <div className="rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
            <h4 className="mb-4 text-[14px] font-semibold text-[#038F7A] md:text-[15px]">
              Faktor yang Memperburuk Risiko Kelumpuhan
            </h4>
            <ul className="flex flex-col gap-3">
              {RISIKO_KELUMPUHAN.map((item, i) => (
                <BulletItem key={i} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
