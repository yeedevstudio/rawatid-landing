import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

export default function HerpesPenyebabSection() {
  return (
    <section id="penyebab" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-6 md:space-y-7">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Penyebab <em>Herpes Simplex</em>
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            <em>Herpes Simplex</em> disebabkan oleh <em>Herpes Simplex Virus</em> (HSV) yang termasuk
            dalam keluarga besar virus <em>Herpesviridae</em> — keluarga yang sama dengan Virus Cacar
            Air (<em>Varicella Zoster</em>) dan <em>Virus Epstein-Barr</em> (penyebab{" "}
            <em>mononukleosis</em>).
          </p>

          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px] lg:text-[18px]">
              Bagaimana Virus Ini Bekerja di Dalam Tubuh?
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Ketika virus HSV pertama kali masuk ke tubuh, ia menginfeksi sel-sel di kulit atau
              selaput lendir pada titik masuk, misalnya bibir atau alat kelamin. Setelah masa infeksi
              awal, virus tidak lenyap, ia berjalan melalui ujung saraf dan bersembunyi secara permanen
              di dalam sel <em>ganglion sensorik</em> yang terletak di sumsum tulang belakang atau
              dasar otak.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Di sana virus berada dalam kondisi <em>laten</em> dan tidak aktif menimbulkan gejala.
              Namun sewaktu-waktu, terutama saat daya tahan tubuh menurun, virus bisa aktif kembali,
              berjalan keluar melalui saraf dan menimbulkan luka di kulit di area yang sama atau
              berdekatan dengan infeksi pertama. Inilah yang disebut kekambuhan atau <em>rekurens</em>.
            </p>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-[#FFF8EC] px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Mengapa Herpes Tidak Bisa Disembuhkan?
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                Obat-obatan antivirus yang ada saat ini hanya bisa menghambat perbanyakan virus, tetapi
                tidak bisa menjangkau virus yang sedang tidur di dalam sel saraf. Itulah mengapa{" "}
                <em>Herpes Simplex</em> bersifat seumur hidup, bukan karena penyakitnya parah, tetapi
                karena tempat bersembunyinya virus tidak bisa diserang oleh obat yang ada saat ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
