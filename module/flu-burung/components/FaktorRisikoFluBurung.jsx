import React from "react";

const RISIKO_TERTULAR = [
  {
    title: "Peternak unggas dan pekerja peternakan",
    text: "kontak langsung dan berkelanjutan dengan unggas hidup yang mungkin terinfeksi adalah faktor risiko terbesar. Orang yang memelihara, memberi makan, memanen, atau menyembelih unggas berisiko paling tinggi.",
  },
  {
    title: "Anggota keluarga penderita flu burung",
    text: "kontak erat dengan penderita Flu Burung, khususnya saat merawat, meningkatkan risiko, meskipun penularan antar manusia masih sangat terbatas.",
  },
  {
    title: "Pekerja di pasar unggas hidup",
    text: "pasar unggas hidup adalah titik kontak kritis antara unggas yang mungkin terinfeksi dengan manusia dalam ruang yang sempit dan berventilasi buruk. Hampir semua kasus H7N9 di China dapat ditelusuri ke paparan di pasar unggas.",
  },
  {
    title: "Wisatawan ke daerah endemis",
    text: "yang mengunjungi peternakan unggas, pasar unggas hidup, atau daerah dengan wabah Flu Burung aktif.",
  },
  {
    title: "Pemburu dan pengolah unggas liar",
    text: "berburu bebek, angsa, atau unggas liar lainnya dan mengolahnya tanpa perlindungan memadai meningkatkan risiko paparan.",
  },
  {
    title: "Anak-anak",
    text: "pada beberapa subtipe termasuk H5N1, anak-anak dan dewasa muda cenderung mengalami penyakit yang lebih berat. Berbeda dengan flu musiman yang lebih berat pada lansia.",
  },
  {
    title: "Petugas kesehatan hewan dan dokter hewan",
    text: "yang menangani unggas sakit atau spesimen diagnostik tanpa APD (Alat Pelindung Diri) yang tepat.",
  },
];

const FAKTOR_MEMPERPARAH = [
  {
    title: "Keterlambatan diagnosis dan pengobatan",
    text: "angka kematian flu burung sangat dipengaruhi oleh seberapa cepat antivirus diberikan. Keterlambatan lebih dari 48 jam sejak gejala drastis memperburuk prognosis.",
  },
  {
    title: "Memiliki penyakit penyerta",
    text: "diabetes, penyakit jantung, gangguan imun, dan kehamilan memperburuk prognosis.",
  },
  {
    title: "Tidak mendapat oseltamivir (Tamiflu) tepat waktu",
    text: "obat antivirus utama untuk flu burung. Sering terlambat diberikan karena diagnosis yang terlambat.",
  },
  {
    title: "Malnutrisi",
    text: "status gizi buruk melemahkan respons imun terhadap infeksi.",
  },
];

function RisikoCard({ title, text }) {
  return (
    <div className="rounded-lg border-l-4 border-[#038F7A] bg-white px-4 py-4 md:px-5 md:py-5">
      <h4 className="text-[14px] font-bold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
      <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
    </div>
  );
}

export default function FaktorRisikoFluBurung() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Faktor Risiko Flu Burung
        </h2>

        {/* Siapa yang berisiko */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Siapa yang Paling Berisiko Tertular Flu Burung?
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
          {RISIKO_TERTULAR.map(({ title, text }) => (
            <RisikoCard key={title} title={title} text={text} />
          ))}
        </div>

        {/* Faktor yang memperparah */}
        <h3 className="mt-12 text-lg font-semibold text-[#038F7A] md:mt-14 md:text-xl">
          Faktor yang Memperparah Risiko Kematian Pada Penderita Flu Burung
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
          {FAKTOR_MEMPERPARAH.map(({ title, text }) => (
            <RisikoCard key={title} title={title} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}
