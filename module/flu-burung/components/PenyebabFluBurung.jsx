import React from "react";

const KARAKTERISTIK_VIRUS = [
  {
    image: "/image/penyebab1.webp",
    title: "Mutasi cepat (antigenic drift)",
    text: "virus influenza A bermutasi sangat cepat melalui perubahan bertahap pada protein H dan N-nya. Ini menyebabkan imunitas yang diperoleh dari paparan sebelumnya pada virus bisa menjadi tidak efektif terhadap varian baru.",
  },
  {
    image: "/image/penyebab2.webp",
    title: "Pergeseran antigenik (antigenic shift)",
    text: "ini mekanisme yang paling berbahaya. Ketika dua virus influenza A berbeda menginfeksi sel yang sama secara bersamaan, misalnya pada babi atau manusia, gen-gen mereka bisa tercampur atau reassortment menghasilkan virus baru yang sama sekali berbeda. Inilah yang sering menjadi asal-usul pandemi influenza.",
  },
  {
    image: "/image/penyebab3.webp",
    title: "Kemampuan menyeberangi spesies (zoonosis)",
    text: "dalam kondisi tertentu, virus flu burung dapat menginfeksi manusia secara langsung, terutama ketika manusia terpapar dalam jumlah besar atau berkepanjangan dengan unggas yang terinfeksi.",
  },
  {
    image: "/image/penyebab4.webp",
    title: "Tidak ada kekebalan alami di populasi manusia",
    text: "karena sebagian besar manusia belum pernah terpapar virus flu burung, tidak ada kekebalan herd immunity yang melindungi. Inilah yang membuat flu burung berpotensi menjadi pandemi dahsyat jika virus ini memperoleh kemampuan penularan efisien antar manusia.",
  },
];

export default function PenyebabFluBurung() {
  return (
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Penyebab Flu Burung
        </h2>

        <p className="mt-5 text-justify text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Flu Burung disebabkan oleh virus influenza tipe A. Berbeda dengan influenza tipe B dan C yang hampir
          eksklusif menginfeksi manusia, influenza tipe A memiliki spektrum inang yang sangat luas, mencakup berbagai
          spesies burung, babi, kuda, anjing laut, paus, dan manusia.
        </p>

        {/* Karakteristik virus */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Karakteristik Virus Influenza A yang Membuatnya Berbahaya
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {KARAKTERISTIK_VIRUS.map(({ image, title, text }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-[16px] bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-12 w-12 object-contain md:h-14 md:w-14" />
              <h4 className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px]">{title}</h4>
              <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Skenario Tiga Babi */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Bagaimana Pandemi Flu Lahir Melalui Skenario Tiga Babi
        </h3>

        <div className="mt-5 space-y-4 text-justify text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <p>
            Para ilmuwan percaya bahwa babi berperan sebagai <em>mixing vessel</em> atau wadah pencampuran untuk
            menciptakan virus pandemi baru. Babi memiliki reseptor di saluran pernapasannya yang bisa mengikat baik
            virus Flu Burung maupun virus Flu Manusia.
          </p>
          <p>
            Ketika seekor babi terinfeksi secara bersamaan oleh virus flu burung dan flu manusia, kedua virus ini bisa
            bertukar segmen gen, menghasilkan virus <em>hybrid</em> yang memiliki sifat baru, kemampuan menginfeksi
            manusia secara efisien namun dengan komponen antigenik yang asing bagi sistem imun manusia.
          </p>
          <p>
            Skenario inilah yang diduga menjadi asal-usul pandemi influenza 1918 (Spanish Flu), 1957, 1968, dan 2009
            (H1N1 Swine Flu). Para ahli khawatir skenario serupa bisa terjadi kapan saja dengan virus H5N1 atau
            subtipe lainnya.
          </p>
        </div>
      </div>
    </section>
  );
}
