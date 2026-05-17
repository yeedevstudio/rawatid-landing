import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const MITOS_FAKTA = [
  {
    mitos: "Polio sudah tidak ada, jadi tidak perlu vaksin lagi",
    fakta: "Virus polio liar tipe 1 masih bersirkulasi di Pakistan dan Afghanistan. wabah cVDPV masih aktif di puluhan negara. Indonesia sendiri baru mengalami KLB 2022-2023. Selama satu pun kasus masih ada di dunia, semua anak berisiko.",
  },
  {
    mitos: "Vaksin polio bisa menyebabkan anak jadi polio",
    fakta: "Ini sangat jarang. VAPP (kelumpuhan akibat OPV) terjadi sekitar 1 dalam 2-3 juta dosis pertama. Risiko ini jauh, jauh lebih kecil dibanding risiko tertular polio liar yang bisa menyebabkan kelumpuhan permanen. Vaksin IPV (suntik) sama sekali tidak bisa menyebabkan VAPP.",
  },
  {
    mitos: "Anak yang sudah pernah kena polio tidak perlu divaksin",
    fakta: "Ada 3 tipe poliovirus. Infeksi satu tipe tidak melindungi dari tipe lain. Selain itu, banyak anak yang didiagnosis 'polio' ternyata bukan polio sungguhan. Semua anak perlu mengikuti jadwal vaksinasi lengkap.",
  },
  {
    mitos: "Polio hanya menyerang anak kecil, orang dewasa aman",
    fakta: "Orang dewasa yang tidak pernah divaksin atau tidak memiliki kekebalan terhadap poliovirus juga bisa tertular dan mengalami kelumpuhan. Kelompok dewasa justru lebih berisiko mengalami dampak yang lebih berat.",
  },
  {
    mitos: "Polio hanya menular melalui sentuhan dengan penderita",
    fakta: <>Rute penularan utama polio adalah <em>fekal-oral</em>, melalui air atau makanan yang terkontaminasi tinja penderita. Seseorang bisa terinfeksi hanya karena minum air yang tercemar, tanpa pernah menyentuh penderita.</>,
  },
  {
    mitos: "Semua penderita polio pasti mengalami kelumpuhan",
    fakta: <>Jauh dari kenyataan. Sekitar 72% infeksi <em>poliovirus</em> tidak menunjukkan gejala sama sekali. Dari yang bergejala, hanya 1 dari 200 kasus yang berujung kelumpuhan. Mayoritas penderita sembuh sempurna.</>,
  },
  {
    mitos: "Polio bisa sembuh total dengan pengobatan herbal atau suplemen",
    fakta: "Tidak ada obat herbal, suplemen, atau terapi alternatif yang terbukti secara ilmiah dapat menyembuhkan atau membalikkan kelumpuhan akibat polio. Satu-satunya langkah efektif adalah pencegahan melalui vaksinasi.",
  },
];

const CREDITS = [
  { role: "Medical Writer", names: ["dr. Iffah Rizki Hasanah"] },
  { role: "Visual & Development", names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"] },
  { role: "Pengarah Produksi", names: ["Yaumil Ikhsan"] },
];

export default function MitosFaktaPolio() {
  return (
    <>
      <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
        <div data-aos="fade-up" suppressHydrationWarning>
          <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
            Mitos dan Fakta Terkait <em>Poliomielitis</em>
          </h2>

          {/* Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200/90 md:mt-10">
            <div className="grid grid-cols-2">
              <div className="bg-red-50 px-5 py-3 md:px-6">
                <span className="text-[13px] font-bold uppercase tracking-wide text-red-700 md:text-[14px]">Mitos</span>
              </div>
              <div className="bg-[#EBF6F9] px-5 py-3 md:px-6">
                <span className="text-[13px] font-bold uppercase tracking-wide text-[#038F7A] md:text-[14px]">Fakta</span>
              </div>
            </div>
            {MITOS_FAKTA.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-neutral-200/90">
                <div className="px-5 py-4 text-[13px] font-normal leading-relaxed text-neutral-700 md:px-6 md:py-5 md:text-[14px]">
                  {row.mitos}
                </div>
                <div className="border-l border-neutral-200/90 px-5 py-4 text-[13px] font-normal leading-relaxed text-neutral-700 md:px-6 md:py-5 md:text-[14px]">
                  {row.fakta}
                </div>
              </div>
            ))}
          </div>

          {/* Teal callout */}
          <aside
            className="mt-8 w-full rounded-2xl border border-[#038F7A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
            aria-label="Pesan akhir"
          >
            <div className="flex gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
                <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">Pesan Akhir</h3>
                <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                  Polio adalah penyakit yang sangat berbahaya namun 100% dapat dicegah. Sejarah telah membuktikan
                  bahwa vaksin polio telah menyelamatkan ratusan juta anak dari kelumpuhan permanen. Tanggung
                  jawab kita bersama adalah memastikan setiap anak mendapat vaksinasi lengkap, menjaga sanitasi
                  lingkungan, dan tidak menyebarkan informasi yang salah tentang vaksin. Polio bebas hanya bisa
                  dicapai jika tidak ada celah dalam kekebalan komunitas kita.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Credits */}
      <section className="w-full border-t border-neutral-200/90 px-5 py-10 md:px-12 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
          {CREDITS.map((c) => (
            <div key={c.role} className="flex flex-col items-center gap-2 text-center">
              <span className="text-[14px] font-bold text-neutral-900 md:text-[15px]">{c.role}</span>
              {c.names.map((name) => (
                <span key={name} className="text-[13px] font-normal text-neutral-600 md:text-[14px]">{name}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
