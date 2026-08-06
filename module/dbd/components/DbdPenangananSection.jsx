import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

const RUMAH_ITEMS = [
  {
    img: "/image/aqua.png",
    alt: "Cairan",
    title: "Minum cairan yang cukup dan sering",
    desc: "Air putih, oralit, jus buah, atau larutan isotonik (minuman elektrolit). Targetnya sampai urin berwarna kuning muda dan frekuensi berkemih 4–6x per hari.",
  },
  {
    img: "/image/bed.png",
    alt: "Istirahat",
    title: "Istirahat total",
    desc: "Tubuh membutuhkan energi penuh untuk melawan infeksi.",
  },
  {
    img: "/image/tensi.png",
    alt: "Termometer",
    title: "Pantau suhu tubuh",
    desc: "Ukur setiap 4–6 jam. Catat dan laporkan ke dokter.",
  },
];

const RS_ITEMS = [
  {
    // TODO: ganti dengan ilustrasi infus yang sebenarnya. /image/inpus.png
    // tidak pernah ada di repo, jadi gambar ini rusak sejak awal.
    img: "/image/jarum.png",
    alt: "Infus",
    title: "Cairan Infus (IV Fluid)",
    desc: "Dokter akan menghitung jenis dan kecepatan cairan berdasarkan kondisi pasien. Ini kunci utama penanganan fase kritis.",
  },
  {
    img: "/image/pemulihan.png",
    alt: "Tanda vital",
    title: "Pemantauan Tanda Vital Ketat",
    desc: "Tekanan darah, nadi, saturasi oksigen, dan produksi urin dipantau secara berkala.",
  },
  {
    img: "/image/tomat.png",
    alt: "Trombosit",
    title: "Transfusi Trombosit",
    desc: "Hanya diberikan jika trombosit sangat rendah (<10.000/mm³) atau ada perdarahan aktif yang signifikan. Bukan berdasarkan angka trombosit saja.",
  },
  {
    img: "/image/transfusi.png",
    alt: "Transfusi darah",
    title: "Transfusi Darah",
    desc: "Hanya jika ada perdarahan berat yang menyebabkan anemia signifikan.",
  },
];

function TreatmentCard({ img, alt, title, desc }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/90 bg-white px-4 py-6 text-center md:px-5 md:py-7">
      <img src={img} alt={alt} className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
      <p className="text-[13px] font-semibold leading-snug text-[#038F7A] md:text-[14px] lg:text-[15px]">
        {title}
      </p>
      <p className="text-[12px] leading-relaxed text-neutral-600 md:text-[13px]">{desc}</p>
    </div>
  );
}

export default function DbdPenangananSection() {
  return (
    <section
      id="penanganan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <div className="space-y-10 md:space-y-12">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Penanganan dan Tatalaksana Demam Berdarah <em>Dengue</em> (DBD)
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Sampai saat ini, belum ada obat antivirus spesifik yang terbukti efektif untuk mengobati
            infeksi <em>dengue</em>. Penanganan DBD bersifat suportif, artinya bertujuan untuk mengatasi
            gejala, mencegah komplikasi, dan memberi waktu tubuh untuk sembuh sendiri. Namun penanganan
            suportif yang tepat dan tepat waktu inilah yang menyelamatkan nyawa.
          </p>

          {/* Penanganan di Rumah */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Penanganan di Rumah (Untuk Kasus Ringan–Sedang)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Tidak semua penderita DBD harus dirawat di rumah sakit. Pasien dengan kondisi umum baik,
              bisa minum dengan cukup, dan tidak ada tanda bahaya bisa dirawat di rumah dengan
              pengawasan ketat.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {RUMAH_ITEMS.map((item) => (
                <TreatmentCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Penanganan di Rumah Sakit */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Penanganan di Rumah Sakit (Rawat Inap)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Pasien perlu dirawat inap jika ada tanda bahaya, <em>trombosit</em> sangat rendah, atau
              tidak bisa minum cairan yang cukup secara <em>oral</em>.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {RS_ITEMS.map((item) => (
                <TreatmentCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Red Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-red-300/60 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-300/60 bg-white text-red-500">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-red-600 md:text-[16px]">
                Terkait Transfusi Trombosit pada Penderita Demam Berdarah <em>Dengue</em> (DBD)
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Transfusi tidak selalu menjadi solusi. Salah satu kesalahan umum adalah meminta transfusi
                trombosit hanya karena angkanya rendah. Panduan WHO dan IDAI menegaskan bahwa transfusi
                trombosit tidak rutin diberikan pada DBD. Pemberian cairan yang tepat jauh lebih penting
                dan efektif. Transfusi yang tidak perlu justru membawa risiko reaksi transfusi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
