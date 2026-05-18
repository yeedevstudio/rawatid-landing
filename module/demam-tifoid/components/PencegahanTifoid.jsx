import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
      <span className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">{children}</span>
    </li>
  );
}

function PilarHeading({ children }) {
  return (
    <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">{children}</h3>
  );
}

function SubHeading({ children }) {
  return (
    <h4 className="mt-5 text-[14px] font-semibold text-[#038F7A] md:text-[15px]">{children}</h4>
  );
}

export default function PencegahanTifoid() {
  return (
    <section className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Pencegahan Demam <em>Tifoid</em> atau Tipes
        </h2>

        <p className="mt-5 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Demam <em>Tifoid</em> adalah penyakit yang hampir sepenuhnya dapat dicegah melalui kombinasi perbaikan
          sanitasi, higenitas perorangan, dan vaksinasi. Tiga pilar pencegahan ini saling melengkapi dan sama
          pentingnya.
        </p>

        {/* Pilar 1 */}
        <PilarHeading>Pilar 1: Higenitas Perorangan</PilarHeading>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Cuci tangan dengan sabun dan air mengalir adalah intervensi paling murah dan paling efektif untuk mencegah
          penularan tifoid. Cuci tangan wajib dilakukan:
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          <BulletItem><strong>Setelah buang air besar atau kecil:</strong> dan setelah membersihkan anak yang buang air.</BulletItem>
          <BulletItem>Sebelum menyiapkan atau menangani makanan.</BulletItem>
          <BulletItem>Sebelum makan.</BulletItem>
          <BulletItem>Setelah menyentuh sampah atau kotoran.</BulletItem>
        </ul>

        <div className="mt-5 rounded-[12px] border border-[#038F7A]/40 bg-[#EBF6F9] p-4 md:p-5">
          <p className="text-[13px] font-normal leading-relaxed text-[#038F7A] md:text-[14px]">
            Teknik cuci tangan yang benar: gosok semua permukaan tangan termasuk sela-sela jari dan punggung tangan
            selama minimal 20 detik dengan sabun, bilas dengan air mengalir. <em>Hand sanitizer</em> berbasis alkohol
            efektif jika tangan tidak tampak kotor
          </p>
        </div>

        {/* Pilar 2 */}
        <PilarHeading>Pilar 2: Keamanan Pangan dan Air</PilarHeading>

        <SubHeading>Keamanan Air Minum</SubHeading>
        <ul className="mt-3 flex flex-col gap-2">
          <BulletItem><strong>Minum air yang sudah dimasak hingga mendidih:</strong> air mendidih selama 1 menit (3 menit di dataran tinggi) efektif membunuh <em>S. Typhi</em>.</BulletItem>
          <BulletItem><strong>Air kemasan yang terjamin:</strong> pastikan segel masih utuh dan dari merek terpercaya.</BulletItem>
          <BulletItem><strong>Hindari es batu dari sumber tidak jelas:</strong> es batu dari air yang tidak dimasak adalah sumber penularan yang sering diabaikan.</BulletItem>
          <BulletItem><strong>Jangan minum langsung dari keran:</strong> kecuali sudah diketahui pasti amannya.</BulletItem>
        </ul>

        <SubHeading>Keamanan Makanan</SubHeading>
        <ul className="mt-3 flex flex-col gap-2">
          <BulletItem><strong>Masak makanan hingga matang sempurna:</strong> panas yang cukup membunuh <em>S. Typhi</em>.</BulletItem>
          <BulletItem><strong>Konsumsi buah dan sayuran yang sudah dikupas atau dicuci bersih:</strong> cuci dengan air matang atau air bersih, bukan air mentah.</BulletItem>
          <BulletItem><strong>Hindari makanan mentah atau setengah matang:</strong> terutama kerang dan makanan laut di daerah berisiko</BulletItem>
          <BulletItem><strong>Hati-hati dengan makanan dari pedagang kaki lima:</strong> pilih yang terlihat bersih, makanannya tertutup, dan dimasak di depan Anda</BulletItem>
        </ul>

        {/* Pilar 3 */}
        <PilarHeading>Pilar 3: Sanitasi Lingkungan</PilarHeading>
        <ul className="mt-3 flex flex-col gap-2">
          <BulletItem><strong>Buang air besar di jamban yang layak:</strong> tidak di sungai, kebun, atau tempat terbuka.</BulletItem>
          <BulletItem><strong>Pengelolaan limbah tinja yang benar:</strong> <em>septik tank</em> yang kedap, tidak mencemari sumber air.</BulletItem>
          <BulletItem><strong>Pengelolaan sampah yang baik:</strong> mencegah berkembangnya lalat yang menjadi perantara kontaminasi makanan.</BulletItem>
          <BulletItem><strong>Air bersih yang terjamin:</strong> perbaikan infrastruktur air bersih adalah intervensi struktural paling efektif untuk mengeliminasi Demam <em>Tifoid</em> dari suatu wilayah.</BulletItem>
        </ul>

        {/* Pilar 4 */}
        <PilarHeading>Pilar 4: Vaksinasi</PilarHeading>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Vaksinasi adalah senjata pencegahan aktif yang sangat dianjurkan, terutama untuk anak-anak di daerah endemis
          dan wisatawan yang akan berkunjung ke daerah risiko tinggi. Tersedia dua jenis vaksin tifoid:
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse overflow-hidden rounded-[16px] border border-neutral-200/90 shadow-[0px_0px_12.1px_0px_#0000001A]">
            <thead>
              <tr className="bg-[#038F7A]">
                <th className="w-[160px] px-4 py-3 text-center text-[13px] font-bold text-white md:w-[180px] md:text-[14px]">Jenis Vaksin</th>
                <th className="px-4 py-3 text-center text-[13px] font-bold text-white md:text-[14px]">
                  <em>Vi Polisakarida</em> (Typhim Vi, Typherix)
                </th>
                <th className="px-4 py-3 text-center text-[13px] font-bold text-white md:text-[14px]">
                  Vi-TT (<em>Typhoid Conjugate Vaccine</em> / TCV)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Cara pemberian", col1: "Suntikan (1 dosis)", col2: "Suntikan (1 dosis)" },
                { label: "Usia minimal", col1: "2 tahun ke atas", col2: "6 bulan ke atas" },
                { label: "Efektivitas", col1: "60–80%", col2: "80–85% (lebih unggul)" },
                { label: "Durasi perlindungan", col1: "2–3 tahun (perlu booster)", col2: "5 tahun atau lebih (lebih lama)" },
                {
                  label: "Status di Indonesia",
                  col1: "Tersedia luas (dianjurkan IDAI, imunisasi non-wajib)",
                  col2: "Mulai masuk program imunisasi nasional Indonesia (direkomendasikan WHO untuk negara endemis)",
                },
              ].map((row, i) => (
                <tr key={i} className="border-t border-neutral-200/90">
                  <td className="px-4 py-4 text-center text-[13px] font-semibold text-[#038F7A] md:text-[14px]">{row.label}</td>
                  <td className="px-4 py-4 text-center text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{row.col1}</td>
                  <td className="px-4 py-4 text-center text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{row.col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teal callout */}
        <div className="mt-8 rounded-[16px] border border-[#038F7A] bg-white p-5 md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
                Jadwal Vaksinasi Tifoid (IDAI 2023)
              </h4>
              <ul className="mt-3 flex flex-col gap-1">
                {[
                  <>Vaksin <em>Tifoid</em> direkomendasikan mulai usia 2 tahun (<em>Vi polisakarida</em>) atau 6 bulan (TCV/Vi-TT).</>,
                  <>Penguat (<em>booster</em>) setiap 3 tahun untuk <em>Vi polisakarida</em>, atau setiap 5 tahun untuk TCV.</>,
                  "Untuk wisatawan, berikan minimal 2 minggu sebelum keberangkatan ke daerah endemis.",
                ].map((item, i) => (
                  <li key={i} className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                    - {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] font-bold leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Vaksin tidak memberikan perlindungan 100%, higenitas makanan tetap wajib dilakukan bahkan setelah
                vaksinasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
