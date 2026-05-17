import React from "react";

const FASE_AKUT = [
  {
    title: "Istirahat Total dan Posisi yang Benar",
    items: [
      { bold: "Istirahat total di tempat tidur:", text: " aktivitas fisik selama fase akut dapat memperluas area kelumpuhan" },
      { bold: "Posisi tubuh yang benar:", text: " anggota gerak yang terkena harus diposisikan pada posisi fungsional atau posisi netral untuk mencegah kontraktur, deformitas sendi akibat otot yang memendek." },
      { bold: "Bidai (", boldItalic: "splint", boldEnd: "):", text: " digunakan untuk mempertahankan posisi anggota gerak yang lumpuh" },
    ],
  },
  {
    title: "Manajemen Nyeri",
    items: [
      { bold: "Analgesik", boldItalic: true, boldEnd: " (pereda nyeri):", text: " paracetamol atau ibuprofen untuk nyeri dan demam" },
      { bold: "Kompres hangat:", text: " pada otot yang nyeri dan mengalami spasme (kram)" },
      { bold: "Hindari obat pelemas otot yang kuat:", text: " kecuali atas petunjuk dokter spesialis" },
    ],
  },
  {
    title: "Bantuan Pernapasan (untuk Polio Bulbar/Bulbospinal)",
    items: [
      { bold: "Pemantauan ketat kapasitas paru:", text: " dilakukan secara berkala menggunakan spirometer" },
      { bold: "Ventilator mekanik:", text: " jika otot pernapasan melemah dan penderita tidak dapat bernapas sendiri. Ini tindakan penyelamat jiwa" },
      { bold: "Manajemen sekresi jalan napas:", text: " untuk mencegah aspirasi dan pneumonia" },
      { bold: "Perawatan intensif (ICU):", text: " wajib untuk kasus dengan gangguan pernapasan" },
    ],
  },
  {
    title: "Daerah Tropis",
    items: [
      { bold: "Intake cairan yang cukup:", text: " untuk mencegah dehidrasi, terutama pada anak kecil" },
      { bold: "Nutrisi adekuat:", text: " mendukung proses pemulihan dan menjaga massa otot yang sehat" },
      { bold: "Pipa nasogastrik:", text: " jika ada kesulitan menelan pada polio bulbar" },
    ],
  },
];

const FASE_PEMULIHAN = [
  {
    title: <>Fisioterapi (<em>Physical Therapy</em>)</>,
    items: [
      { bold: "Latihan rentang gerak (ROM exercises):", text: " menjaga agar sendi tidak kaku dan mencegah kontraktur" },
      { bold: "Penguatan otot bertahap:", text: " melatih otot-otot yang tersisa dan masih berfungsi untuk mengkompensasi otot yang lumpuh" },
      { bold: "Hidroterapi:", text: " latihan di air untuk meminimalkan beban gravitasi pada otot yang lemah" },
      { bold: "Stimulasi listrik (", boldItalic: "electrical stimulation", boldEnd: "):", text: " pada beberapa kasus untuk memperlambat atrofi otot" },
    ],
  },
  {
    title: "Alat Bantu dan Ortopedi",
    items: [
      { bold: "Kaki palsu (", boldItalic: "prostesis", boldEnd: "):", text: " untuk amputasi atau hilangnya fungsi kaki" },
      { bold: "Brace/caliper (", boldItalic: "ortosis kaki-kaki", boldEnd: "):", text: " membantu stabilitas berjalan pada kelumpuhan sebagian" },
      { bold: "Kursi roda atau kruk:", text: " untuk mobilitas jika kelumpuhan tidak memungkinkan berjalan" },
      { bold: "Koreksi bedah (", boldItalic: "orthopedic surgery", boldEnd: "):", text: " pada beberapa kasus untuk memperbaiki kontraktur atau deformitas sendi yang parah" },
    ],
  },
  {
    title: <>Terapi <em>Okupasi</em> dan Dukungan Psikososial</>,
    items: [
      { bold: "Terapi okupasi:", text: " melatih aktivitas keseharian dengan keterbatasan fisik yang ada" },
      { bold: "Dukungan psikologis:", text: " kelumpuhan permanen memiliki dampak psikologis yang sangat besar, khususnya pada anak-anak" },
      { bold: "Integrasi sosial dan pendidikan:", text: " anak dengan polio berhak mendapat pendidikan inklusi dan dukungan sosial yang memadai" },
    ],
  },
];

function BulletItem({ bold, boldItalic, boldEnd, text }) {
  return (
    <li className="flex gap-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
      <span className="mt-[2px]">•</span>
      <span>
        <strong>
          {bold}
          {boldItalic === true ? <em>{bold}</em> : boldItalic ? <em>{boldItalic}</em> : null}
          {boldEnd || ""}
        </strong>
        {text}
      </span>
    </li>
  );
}

function TreatmentCard({ title, items, accent = "teal" }) {
  const barColor = accent === "red" ? "bg-[#DB1A1A]" : "bg-[#038F7A]";
  const titleColor = accent === "red" ? "text-[#DB1A1A]" : "text-[#038F7A]";

  return (
    <div className="flex gap-4 md:gap-5">
      <div className={`w-[3px] shrink-0 self-stretch rounded-full ${barColor}`} />
      <div className="flex flex-col gap-3">
        <h4 className={`text-[14px] font-semibold leading-snug md:text-[15px] ${titleColor}`}>{title}</h4>
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <BulletItem key={i} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PenangananPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Penanganan dan Tatalaksana <em>Poliomielitis</em>
        </h2>
        <p className="mt-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Tidak ada obat yang bisa menyembuhkan atau membalikkan kelumpuhan akibat polio. Kerusakan sel saraf yang
          sudah terjadi bersifat permanen. Oleh karena itu, penanganan polio sepenuhnya bersifat suportif dan
          bertujuan mengurangi penderitaan, mencegah komplikasi, dan memaksimalkan fungsi yang masih tersisa.
        </p>

        {/* Fase Akut */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Penanganan Fase Akut (Saat Gejala Aktif)
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-6">
          {FASE_AKUT.map((card, i) => (
            <TreatmentCard key={i} {...card} accent="teal" />
          ))}
        </div>

        {/* Fase Pemulihan */}
        <h3 className="mt-10 text-lg font-semibold text-[#DB1A1A] md:mt-12 md:text-xl">
          Penanganan Fase Pemulihan dan Rehabilitasi Jangka Panjang
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-6">
          {FASE_PEMULIHAN.map((card, i) => (
            <TreatmentCard key={i} {...card} accent="red" />
          ))}
        </div>
      </div>
    </section>
  );
}
