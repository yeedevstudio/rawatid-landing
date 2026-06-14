import React from "react";

const RISIKO_TERPAPAR = [
  { text: "Tinggal di atau bepergian ke daerah endemis mpox (Afrika Tengah dan Barat atau daerah dengan wabah aktif)" },
  { text: "Tinggal serumah atau merawat penderita Mpox aktif tanpa perlindungan yang memadai" },
  { text: "Kontak langsung dengan hewan liar (terutama tikus, tupai, monyet) di wilayah endemis, mencakup pemburu, petani, dan mereka yang tinggal di tepi hutan" },
  { text: "Tenaga kesehatan yang menangani pasien Mpox tanpa Alat Pelindung Diri (APD) lengkap" },
  { text: "Kontak erat fisik dengan orang yang memiliki lesi aktif Mpox, terutama saat gejala masih berlangsung" },
  { text: "Berpartisipasi dalam jaringan seksual dengan multiple partners dalam konteks wabah seperti yang teridentifikasi pada wabah 2022" },
];

const RISIKO_KOMPLIKASI = [
  { text: "Imunodefisiensi, terutama infeksi HIV yang tidak terkontrol (CD4 rendah). ODHA dengan HIV tidak terkontrol menghadapi risiko Mpox berat yang jauh lebih tinggi" },
  { text: "Tidak pernah mendapat vaksinasi Cacar (Variola), generasi yang lahir setelah penghentian program vaksinasi cacar (sekitar 1980 ke atas) tidak memiliki imunitas silang terhadap Mpox" },
  { text: "Anak-anak di bawah 8 tahun, sistem imun yang belum matang, risiko Mpox berat dan kematian lebih tinggi" },
  { text: "Penyakit kulit yang sudah ada sebelumnya seperti eksim, dermatitis atopik luas, dapat menyebabkan lesi Mpox yang lebih parah dan tersebar luas" },
  { text: "Ibu hamil, risiko komplikasi pada ibu dan janin seperti keguguran, lahir mati dan Mpox kongenital" },
  { text: "Malnutrisi berat, melemahkan respons imun keseluruhan" },
];

function RisikoCard({ text }) {
  return (
    <div className="rounded-lg border-l-4 border-[#038F7A] bg-white px-4 py-4 md:px-5 md:py-5">
      <p className="text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
    </div>
  );
}

export default function FaktorRisikoCacarMonyet() {
  return (
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Faktor Risiko Cacar Monyet
        </h2>

        <h3 className="mt-8 text-[24px] font-medium text-[#038F7A] md:mt-10">
          Faktor Risiko Terpapar Virus Cacar Monyet
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {RISIKO_TERPAPAR.map(({ text }) => (
            <RisikoCard key={text} text={text} />
          ))}
        </div>

        <h3 className="mt-10 text-[24px] font-medium text-[#038F7A] md:mt-12">
          Faktor yang Meningkatkan Risiko Komplikasi Berat pada Penderita Cacar Monyet
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {RISIKO_KOMPLIKASI.map(({ text }) => (
            <RisikoCard key={text} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}
