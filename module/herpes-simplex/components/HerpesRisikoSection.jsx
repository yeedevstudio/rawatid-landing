import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const RISIKO_TERTULAR = [
  "Belum pernah terinfeksi HSV sebelumnya, atau orang tanpa antibodi HSV tidak memiliki kekebalan sama sekali dan lebih rentan tertular.",
  "Memiliki banyak pasangan seksual atau berganti-ganti pasangan.",
  "Tidak menggunakan kondom secara konsisten",
  "Secara anatomis, memiliki risiko lebih besar untuk tertular karena memiliki selaput lendir vagina lebih luas dan lebih mudah tertular dibandingkan kulit penis.",
  <>Risiko penularan semakin tinggi jika pasangan memiliki <em>Herpes Genital</em> aktif tanpa menggunakan proteksi.</>,
  "Semakin muda seseorang aktif secara seksual, semakin panjang potensi paparannya.",
];

const RISIKO_KEKAMBUHAN = [
  <>Penderita HIV/AIDS, orang yang menjalani <em>kemoterapi</em>, atau pengguna obat <em>imunosupresan</em> berisiko mengalami <em>herpes</em> yang lebih berat dan lebih sering kambuh.</>,
  "Stres berat, kurang tidur, kelelahan ekstrem, dan demam dapat menurunkan daya tahan tubuh dan memicu kekambuhan.",
  <>Perubahan hormonal saat menstruasi dapat memicu kekambuhan <em>Herpes Genital</em> pada sebagian perempuan.</>,
  <>Paparan sinar matahari (UV) berlebihan dapat memicu kekambuhan <em>Herpes Oral</em> pada bibir. Ini sebabnya luka herpes bibir sering muncul setelah berjemur atau liburan pantai.</>,
  "Memiliki riwayat penyakit kulit atau luka seperti eksim, dermatitis, atau luka terbuka lain di kulit bisa memudahkan virus masuk.",
  "Sistem imun bayi belum berkembang sempurna, membuat mereka sangat rentan terhadap infeksi HSV yang serius.",
];

export default function HerpesRisikoSection() {
  return (
    <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-6 md:space-y-7">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Siapa Saja yang Berisiko Terinfeksi <em>Herpes Simplex</em>?
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Secara teori, siapa saja yang pernah melakukan kontak fisik dengan penderita{" "}
            <em>Herpes Simplex</em> bisa tertular. Namun ada beberapa faktor yang meningkatkan risiko
            seseorang tertular atau mengalami gejala yang lebih berat:
          </p>

          <div className="space-y-5">
            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 md:text-[16px]">
                Faktor Risiko Tertular:
              </h3>
              <ul className="space-y-2.5">
                {RISIKO_TERTULAR.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 md:text-[16px]">
                Faktor Risiko Kekambuhan dan Gejala Berat:
              </h3>
              <ul className="space-y-2.5">
                {RISIKO_KEKAMBUHAN.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border-2 border-[#00C3D0] px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#038F7A]/40 bg-white text-[#038F7A]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#00C3D0] md:text-[16px]">
                Fakta Penting
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                Banyak orang yang terinfeksi HSV tidak menyadarinya karena tidak pernah mengalami gejala
                yang jelas. Mereka tetap bisa menularkan virus kepada orang lain tanpa mengetahuinya.
                Inilah mengapa herpes terus menyebar luas di masyarakat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
