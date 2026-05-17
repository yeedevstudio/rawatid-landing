import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const PPS_ITEMS = [
  {
    image: "/image/preva.png",
    title: <><em>Prevalens</em></>,
    text: "Diperkirakan 25-40% penyintas polio paralitik akan mengalami PPS",
  },
  {
    image: "/image/timer.png",
    title: "Waktu munculnya",
    text: "Rata-rata 30-40 tahun setelah infeksi polio pertama",
  },
  {
    image: "/image/ice.png",
    title: "Mekanisme",
    text: "Sel-sel saraf motorik yang selamat dari serangan polio pertama bekerja ekstra keras selama bertahun-tahun untuk mengkompensasi sel saraf yang rusak, hingga akhirnya kelelahan dan mulai gagal berfungsi",
  },
  {
    image: "/image/gejala.png",
    title: "Gejala utama",
    text: <>Kelemahan otot baru yang progresif, kelelahan yang luar biasa (<em>fatigue</em>), nyeri otot dan sendi, kesulitan bernapas atau menelan, dan intoleransi dingin</>,
  },
  {
    image: "/image/penanganan.png",
    title: "Penanganan PPS",
    text: "Bersifat manajemen gejala seperti fisioterapi ringan, konservasi energi, alat bantu, dan dukungan psikososial. Tidak ada terapi yang terbukti menghentikan progresivitasnya",
  },
];

const ORTOPEDI_ITEMS = [
  {
    image: "/image/rusuk.png",
    title: <><em>Skoliosis</em> (tulang belakang bengkok)</>,
    text: "Akibat ketidakseimbangan otot punggung",
  },
  {
    image: "/image/lutut.png",
    title: "Deformitas sendi",
    text: "Lutut, panggul, atau pergelangan kaki yang bengkok akibat ketidakseimbangan otot",
  },
  {
    image: "/image/sendi.png",
    title: "Osteoporosis",
    text: "Pada anggota gerak yang lumpuh karena kurang digunakan",
  },
  {
    image: "/image/garuk.png",
    title: "Nyeri sendi kronik",
    text: "Akibat penggunaan berlebihan sendi dan otot yang masih berfungsi untuk mengkompensasi yang lumpuh",
  },
];

function InfoRow({ image, title, text }) {
  return (
    <div className="flex items-start gap-4 py-4 pl-12 md:gap-5 md:pl-20 lg:pl-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="text-[14px] font-semibold text-[#038F7A] md:text-[15px]">{title}</h4>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function KomplikasiJangkaPanjang() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h3 className="text-lg font-semibold text-[#038F7A] md:text-xl">Komplikasi Jangka Panjang</h3>

        {/* PPS */}
        <h4 className="mt-6 text-[16px] font-semibold text-neutral-900 md:mt-8 md:text-[18px]">
          <em>Post-Polio Syndrome</em> (PPS) — Sindrom Pasca-Polio
        </h4>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Ini adalah komplikasi yang sangat penting dan sering tidak diketahui masyarakat luas. PPS adalah kondisi
          di mana penderita polio yang tampaknya sudah sembuh, bahkan puluhan tahun setelah infeksi awal tiba-tiba
          mengalami kelemahan otot baru, kelelahan ekstrem, dan nyeri sendi/otot yang progresif.
        </p>

        <div className="mt-4 divide-y divide-neutral-100">
          {PPS_ITEMS.map((item, i) => (
            <InfoRow key={i} {...item} />
          ))}
        </div>

        {/* Teal callout */}
        <aside
          className="mt-8 w-full rounded-2xl border border-[#038F7A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
          aria-label="Tentang Post-Polio Syndrome"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
                Tentang <em>Post-Polio Syndrome</em>
              </h3>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
                <strong>
                  Banyak penyintas polio di Indonesia yang kini berusia 40-60 tahun mungkin sedang atau akan
                  mengalami PPS. Jika Anda atau orang yang Anda kenal pernah menderita polio dan kini merasakan
                  kelemahan baru atau kelelahan ekstrem, segera konsultasikan ke dokter spesialis saraf atau dokter
                  rehabilitasi medis.
                </strong>
              </p>
            </div>
          </div>
        </aside>

        {/* Komplikasi Ortopedi */}
        <h4 className="mt-10 text-[16px] font-semibold text-neutral-900 md:mt-12 md:text-[18px]">
          Komplikasi Ortopedi Jangka Panjang
        </h4>

        <div className="mt-4 divide-y divide-neutral-100">
          {ORTOPEDI_ITEMS.map((item, i) => (
            <InfoRow key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
