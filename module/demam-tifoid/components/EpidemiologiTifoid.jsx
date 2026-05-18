import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
      <span className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">{children}</span>
    </li>
  );
}

export default function EpidemiologiTifoid() {
  return (
    <section className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Epidemiologi: Gambaran Demam <em>Tifoid</em> atau Tipes di Dunia dan Indonesia
        </h2>

        {/* Situasi Global */}
        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:text-xl">Situasi Global</h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Demam <em>Tifoid</em> adalah salah satu penyakit infeksi paling umum di dunia yang hampir sepenuhnya terkait
          dengan kemiskinan dan buruknya sanitasi. Penyakit yang sebenarnya sudah hampir hilang di negara maju ini masih
          membebani jutaan orang di negara berkembang.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image/bumiulat.png"
          alt=""
          className="mx-auto mt-8 h-auto w-full max-w-xl object-contain md:mt-10 md:max-w-2xl"
        />

        <ul className="mt-6 flex flex-col gap-3 md:mt-8">
          <BulletItem>
            <strong>Beban global:</strong> WHO memperkirakan 11–20 juta kasus demam <em>tifoid</em> terjadi setiap tahun di seluruh dunia.
          </BulletItem>
          <BulletItem>
            <strong>Kematian:</strong> diperkirakan 128.000–161.000 kematian terjadi setiap tahun akibat demam <em>tifoid</em>.
          </BulletItem>
          <BulletItem>
            <strong>Distribusi geografis:</strong> lebih dari 95% kasus terjadi di Asia Selatan dan Asia Tenggara, Afrika sub-Sahara, dan Amerika Latin
          </BulletItem>
          <BulletItem>
            <strong>Dampak terbesar:</strong> anak-anak usia 2–15 tahun di daerah endemis menanggung beban terbesar penyakit ini
          </BulletItem>
        </ul>

        {/* Orange callout */}
        <div className="mt-8 rounded-[16px] border border-[#DB1A1A] bg-white p-5 md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold leading-tight text-[#DB1A1A] md:text-base">
                Ancaman Terbaru: <em>Typhoid</em> XDR (<em>Extensively Drug-Resistant</em>)
              </h4>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Sejak 2016, wabah <em>strain tifoid</em> yang resisten terhadap hampir semua antibiotik lini pertama dan lini
                kedua (<em>XDR typhoid / H58 clade</em>) meledak di Pakistan dan menyebar ke beberapa negara lain.{" "}
                <em>Strain XDR</em> ini hanya sensitif terhadap <em>azithromycin</em> dan <em>karbapenem</em>, antibiotik
                yang mahal dan tidak tersedia di semua daerah. WHO telah menyatakan ini sebagai salah satu ancaman
                kesehatan global yang serius.
              </p>
            </div>
          </div>
        </div>

        {/* Situasi di Indonesia */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">Situasi di Indonesia</h3>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image/bumiorang.png"
          alt=""
          className="mx-auto mt-6 h-auto w-full max-w-xl object-contain md:mt-8 md:max-w-2xl"
        />

        <p className="mt-6 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Indonesia adalah salah satu negara dengan beban Demam <em>Tifoid</em> atau Tipes tertinggi di dunia. Kombinasi
          kepadatan penduduk yang tinggi, sanitasi yang masih buruk di banyak daerah, dan kebiasaan jajan sembarangan
          menjadikan Demam <em>Tifoid</em> sebagai penyakit endemis di seluruh pelosok negeri:
        </p>

        <ul className="mt-4 flex flex-col gap-3">
          <BulletItem>
            <strong>Prevalensi:</strong> diperkirakan 900 per 100.000 penduduk per tahun, atau sekitar 600.000–1,5 juta kasus per tahun.
          </BulletItem>
          <BulletItem>
            <strong>Kelompok usia terdampak:</strong> paling sering mengenai anak usia sekolah dan remaja (5–19 tahun), dengan puncak pada 10–14 tahun.
          </BulletItem>
          <BulletItem>
            <strong>Distribusi:</strong> endemis di seluruh wilayah Indonesia, dengan kasus lebih tinggi di daerah perkotaan padat penduduk dan daerah dengan sanitasi buruk.
          </BulletItem>
          <BulletItem>
            <strong>Angka kematian:</strong> diperkirakan sekitar 2–5% kasus yang tidak mendapat pengobatan tepat, namun bisa ditekan jauh di bawah 1% dengan penanganan yang kuat.
          </BulletItem>
          <BulletItem>
            <strong>Biaya ekonomi:</strong> Demam <em>Tifoid</em> menyebabkan kehilangan hari sekolah dan hari kerja yang sangat besar, memberikan dampak ekonomi yang signifikan.
          </BulletItem>
        </ul>

        <p className="mt-5 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Yang menjadi perhatian khusus di Indonesia adalah tingginya angka kesalahan diagnosis dan pengobatan yang tidak
          tuntas, dua faktor yang berkontribusi pada tingginya angka kasus berulang dan meningkatnya <em>resistensi antibiotik</em> lokal.
        </p>
      </div>
    </section>
  );
}
