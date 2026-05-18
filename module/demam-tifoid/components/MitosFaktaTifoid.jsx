import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const MITOS_FAKTA = [
  {
    mitos: <>Demam <em>Tifoid</em> atau Tipes bisa kambuh seumur hidup dari infeksi yang sama karena bekasnya masih ada di perut.</>,
    fakta: "Tidak benar secara ilmiah. Tipes yang tampak kambuh biasanya merupakan infeksi baru akibat terpapar bakteri lagi, atau relaps karena pengobatan tidak tuntas, bukan bekas dari infeksi lama.",
  },
  {
    mitos: "Begitu sembuh dari tipes, tidak perlu khawatir karena sudah kebal selamanya",
    fakta: <>Tidak tepat. Kekebalan pasca-infeksi Demam <em>Tifoid</em> tidak bertahan seumur hidup dan tidak memberikan perlindungan penuh. Seseorang bisa menderita Demam Tifoid lebih dari sekali dalam hidupnya, terutama jika terus terpapar lingkungan yang terkontaminasi.</>,
  },
  {
    mitos: "Obat antibiotik untuk tipes boleh dihentikan begitu demam turun (biasanya 3–4 hari)",
    fakta: "Berbahaya. Antibiotik harus diselesaikan sampai tuntas sesuai anjuran dokter (biasanya 7–14 hari) meskipun sudah merasa baikan. Menghentikan lebih awal meningkatkan risiko kekembuhan dan resistensi antibiotik.",
  },
  {
    mitos: <>Demam <em>Tifoid</em> hanya bisa menular dari orang yang sedang sakit Demam <em>Tifoid</em></>,
    fakta: <>Tidak benar. <em>Carrier kronis</em> (orang yang sudah sembuh tetapi masih mengeluarkan bakteri) adalah sumber penularan yang sangat berbahaya dan sering tidak terdeteksi karena tampak sehat.</>,
  },
  {
    mitos: "Penderita Demam Tifoid atau Tipes tidak boleh mandi air dingin karena akan semakin parah.",
    fakta: "Tidak ada dasar ilmiah. Mandi dengan air hangat bahkan dianjurkan untuk membantu menurunkan suhu tubuh melalui penguapan. Yang penting adalah tidak kedinginan setelah mandi.",
  },
  {
    mitos: <>Vaksin <em>tifoid</em> memberikan perlindungan 100% sehingga tidak perlu lagi menjaga kebersihan makanan.</>,
    fakta: "Tidak benar. Vaksin hanya memberikan perlindungan 60–85%, bukan 100%. Higenitas makanan, air bersih, dan cuci tangan tetap wajib dilakukan bahkan setelah divaksinasi.",
  },
];

const CREDITS = [
  { role: "Medical Writer", names: ["dr. Iffah Rizki Hasanah"] },
  { role: "Visual & Development", names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"] },
  { role: "Pengarah Produksi", names: ["Yaumil Ikhsan"] },
];

export default function MitosFaktaTifoid() {
  return (
    <>
      <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
        <div data-aos="fade-up" suppressHydrationWarning>
          <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
            Mitos dan Fakta Terkait Demam <em>Tifoid</em> atau Tipes
          </h2>

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
            aria-label="Pesan penting"
          >
            <div className="flex gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
                <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
                  Pesan Penting Tentang Demam <em>Tifoid</em> atau Tipes
                </h3>
                <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                  Demam <em>Tifoid</em> adalah penyakit serius yang bisa menyebabkan komplikasi mengancam jiwa, namun
                  juga merupakan penyakit yang sangat bisa dicegah dan diobati. Kunci utamanya sederhana: jaga
                  kebersihan makanan dan minuman, cuci tangan dengan benar, vaksinasi secara teratur.
                </p>
                <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                  Jika sudah terinfeksi, selesaikan antibiotik sampai tuntas. Jangan meremehkan demam yang berlangsung
                  lebih dari 3 hari. Segera konsultasikan ke dokter, lakukan pemeriksaan yang tepat, dan ikuti anjuran
                  pengobatan secara disiplin!
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
