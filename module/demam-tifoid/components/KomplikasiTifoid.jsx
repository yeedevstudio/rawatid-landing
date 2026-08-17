import React from "react";

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" />
      <span className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{children}</span>
    </li>
  );
}

function KomplikasiCard({ image, titleColor = "teal", title, children }) {
  const titleClass = titleColor === "orange"
    ? "text-[#DB8B1A]"
    : titleColor === "red"
    ? "text-[#DB1A1A]"
    : "text-[#038F7A]";

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] sm:flex-row sm:gap-6 md:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-24 w-24 shrink-0 self-start object-contain md:h-28 md:w-28" />
      <div className="flex flex-col gap-3">
        <h4 className={`text-[14px] font-semibold leading-snug md:text-[15px] ${titleClass}`}>{title}</h4>
        {children}
      </div>
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <div className="inline-block rounded-lg bg-[#EBF6F9] px-4 py-2">
      <h3 className="text-[15px] font-semibold text-[#038F7A] md:text-base">{children}</h3>
    </div>
  );
}

export default function KomplikasiTifoid() {
  return (
    <section className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Komplikasi Pada Demam <em>Tifoid</em> atau Tipes
        </h2>

        <p className="mt-5 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Komplikasi Demam <em>Tifoid</em> paling sering terjadi pada minggu ketiga perjalanan penyakit, terutama pada
          pasien yang tidak mendapat pengobatan, pengobatan terlambat, atau pengobatan tidak sesuai. Dua komplikasi
          tersering dan paling berbahaya adalah:
        </p>

        {/* Komplikasi Utama */}
        <div className="mt-10 md:mt-12">
          <SectionBadge>Komplikasi Utama — Darurat Bedah</SectionBadge>
          <div className="mt-5 flex flex-col gap-5">

            <KomplikasiCard image="/image/warm.webp" title={<><em>Perforasi</em> Usus (3–10% kasus tidak diobati)</>} titleColor="orange">
              <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
                Ini adalah komplikasi paling berbahaya dan paling sering menyebabkan kematian pada penderita Demam{" "}
                <em>Tifoid</em>. Bakteri menyebabkan peradangan dan <em>nekrosis</em> (kematian jaringan) pada dinding
                usus halus (terutama <em>ileum terminal</em>), yang akhirnya berlubang. Isi usus tumpah ke rongga
                perut, menyebabkan <em>peritonitis</em> (peradangan seluruh lapisan rongga perut) yang mengancam jiwa.
              </p>
              <ul className="flex flex-col gap-2">
                <BulletItem>
                  <strong>Tanda klinis:</strong> nyeri perut tiba-tiba yang hebat, perut kaku seperti papan (<em>rigid abdomen</em>), demam tinggi dengan menggigil berat.
                </BulletItem>
                <BulletItem>
                  <strong>Penanganan:</strong> operasi darurat (<em>laparotomi</em> atau <em>laparoskopi</em>) untuk menutup <em>perforasi</em> dan membersihkan rongga perut, disertai <em>antibiotik</em> spektrum luas.
                </BulletItem>
                <BulletItem>
                  <strong>Angka kematian tanpa operasi:</strong> hampir 100%. Dengan operasi tepat waktu dan perawatan ICU yang baik, angka kematian bisa ditekan.
                </BulletItem>
              </ul>
            </KomplikasiCard>

            <KomplikasiCard image="/image/darah.png" title="Perdarahan Saluran Cerna (1–10% kasus)" titleColor="teal">
              <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
                Peradangan pada dinding usus bisa menyebabkan perdarahan. Perdarahan ringan sering tidak disadari,
                namun perdarahan masif bisa mengancam jiwa.
              </p>
              <ul className="flex flex-col gap-2">
                <BulletItem>
                  <strong>Gejala:</strong> BAB berwarna merah segar atau hitam seperti tar (<em>melena</em>), muntah darah.
                </BulletItem>
                <BulletItem>
                  <strong>Penanganan:</strong> transfusi darah, antibiotik, puasa, dan bila perlu tindakan endoskopi atau operasi.
                </BulletItem>
              </ul>
            </KomplikasiCard>

          </div>
        </div>

        {/* Komplikasi Lain */}
        <div className="mt-10 md:mt-12">
          <SectionBadge>Komplikasi Lain</SectionBadge>
          <div className="mt-5 flex flex-col gap-5">

            <KomplikasiCard image="/image/infeksi.webp" title="Komplikasi Infeksi/Septik" titleColor="teal">
              <ul className="flex flex-col gap-2">
                <BulletItem>
                  <strong>Sepsis dan syok septik:</strong> penyebab kematian tersering pada Demam <em>Tifoid</em>, bakteri membanjiri aliran darah dan menyebabkan respons inflamasi sistemik yang masif.
                </BulletItem>
                <BulletItem>
                  <strong>Meningitis <em>tifosa</em>:</strong> bakteri mencapai selaput otak, lebih sering pada anak-anak, menyebabkan sakit kepala hebat, kaku kuduk, dan penurunan kesadaran.
                </BulletItem>
                <BulletItem>
                  <strong>Abses hati atau limpa:</strong> penumpukan nanah di hati atau limpa.
                </BulletItem>
                <BulletItem>
                  <strong><em>Olesistitis</em> akut:</strong> peradangan kandung empedu.
                </BulletItem>
                <BulletItem>
                  <strong><em>Pneumonia tifosa</em>:</strong> bakteri menginfeksi paru-paru.
                </BulletItem>
                <BulletItem>
                  <strong><em>Osteomielitis tifosa</em>:</strong> infeksi tulang, lebih sering pada penderita <em>sickle cell disease</em>.
                </BulletItem>
              </ul>
            </KomplikasiCard>

            <KomplikasiCard image="/image/badanijo.webp" title="Komplikasi Non-Infeksi" titleColor="teal">
              <ul className="flex flex-col gap-2">
                <BulletItem>
                  <strong>Hepatitis <em>tifosa</em>:</strong> peradangan hati yang menyebabkan peningkatan enzim hati dan kadang <em>ikterus</em> (kuning ringan).
                </BulletItem>
                <BulletItem>
                  <strong>Miokarditis <em>tifosa</em>:</strong> peradangan otot jantung yang bisa menyebabkan <em>aritmia</em> (gangguan irama jantung).
                </BulletItem>
                <BulletItem>
                  <strong>Komplikasi <em>neurologis</em>:</strong> <em>ensefalopati tifosa</em> (kebingungan, perubahan perilaku), sindrom <em>Guillain-Barré</em> (sangat jarang).
                </BulletItem>
                <BulletItem>
                  <strong><em>Hemolytic Uremic Syndrome</em>:</strong> sangat jarang, terutama pada anak
                </BulletItem>
              </ul>
            </KomplikasiCard>

            <KomplikasiCard image="/image/virusmasuk.webp" title={<><em>Carrier</em> Kronik</>} titleColor="teal">
              <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
                Sekitar 1–6% penderita Demam <em>Tifoid</em> yang sudah sembuh menjadi <em>carrier kronik</em>, mereka
                terus mengeluarkan <em>S. Typhi</em> bersama tinja selama lebih dari satu tahun. <em>Carrier kronik</em>{" "}
                lebih sering terjadi pada:
              </p>
              <ul className="flex flex-col gap-2">
                <BulletItem>
                  <strong>Wanita dewasa:</strong> terutama yang memiliki batu atau kelainan kandung empedu
                </BulletItem>
                <BulletItem>Penderita yang mendapat pengobatan tidak tuntas</BulletItem>
                <BulletItem>Penderita berusia lebih dari 50 tahun</BulletItem>
              </ul>
              <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">
                <em>Carrier kronik</em> memerlukan pengobatan antibiotik jangka panjang (4–6 minggu) atau kadang{" "}
                <em>kolesistektomi</em> (operasi pengangkatan kandung empedu) untuk eliminasi total bakteri.
              </p>
            </KomplikasiCard>

          </div>
        </div>
      </div>
    </section>
  );
}
