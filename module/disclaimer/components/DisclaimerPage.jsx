"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function DisclaimerPage() {
  const sections = useMemo(
    () => [
      { id: "penyangkalan-medis", label: "Penyangkalan Medis (Medical Disclaimer)" },
      { id: "tidak-ada-hubungan-dokter-pasien", label: "Tidak Ada Hubungan Dokter-Pasien" },
      {
        id: "akurasi-informasi-dan-teknologi-kesehatan",
        label: "Akurasi Informasi dan Teknologi Kesehatan",
      },
      {
        id: "penyangkalan-iklan-dan-afiliasi",
        label: "Penyangkalan Iklan dan Afiliasi (Advertising & Affiliate Disclaimer)",
      },
      { id: "batasan-tanggung-jawab", label: "Batasan Tanggung Jawab" },
      { id: "hubungi-kami", label: "Hubungi Kami" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "-25% 0px -60% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <section className="bg-greenBrand text-white rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="px-5 md:px-12 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Disclaimer Rawat.ID
          </h1>
        </div>
      </section>

      <section className="mx-5 md:mx-12 my-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <aside data-aos="fade-right" className="lg:sticky lg:top-24 h-fit">
            <nav aria-label="Daftar isi Disclaimer" className="pb-2">
              <ul className="flex flex-col gap-3 lg:gap-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={activeId === s.id ? "true" : undefined}
                      className="block text-sm md:text-base text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out"
                    >
                      <span className="block">{s.label}</span>
                      {activeId === s.id ? (
                        <span
                          className="mt-2 block h-[2px] w-full max-w-[220px] bg-amber-400"
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div data-aos="fade-left" className="flex flex-col gap-10 max-w-3xl">
            <section aria-label="Pembuka" className="flex flex-col gap-3">
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Selamat datang di Rawat.ID
              </h2>
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Informasi yang disediakan oleh Rawat.ID (&quot;Situs&quot;)
                ditujukan semata-mata untuk tujuan informasi umum dan edukasi.
                Membangun platform informasi kesehatan digital yang andal
                membutuhkan batasan yang jelas antara edukasi dan praktik medis.
                Harap baca penyangkalan ini dengan seksama.
              </p>
            </section>

            <section data-aos="fade-up" id="penyangkalan-medis" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Penyangkalan Medis (Medical Disclaimer)
              </h3>

              <p className="text-sm md:text-base font-semibold text-neutral90 uppercase tracking-wide mb-3">
                Konten di situs ini bukanlah pengganti nasihat medis, diagnosis
                atau perawatan profesional.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  Semua teks, grafik, gambar dan informasi lain yang terdapat di
                  Rawat.ID hanya untuk tujuan informasi umum.
                </li>
                <li>
                  Jangan pernah mengabaikan nasihat medis profesional atau
                  menunda dalam mencarinya karena sesuatu yang telah Anda baca
                  di Situs ini.
                </li>
                <li>
                  Jika Anda memiliki keadaan darurat medis, segera hubungi
                  dokter, rumah sakit atau layanan darurat lokal Anda. Rawat.ID
                  tidak merekomendasikan atau mendukung tes, dokter, produk,
                  prosedur, opini atau informasi spesifik lainnya yang mungkin
                  disebutkan di Situs.
                </li>
              </ul>
            </section>

            <section
              data-aos="fade-up"
              id="tidak-ada-hubungan-dokter-pasien"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Tidak Ada Hubungan Dokter-Pasien
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Penggunaan Anda atas Situs ini, termasuk komunikasi melalui
                email atau kolom komentar, tidak menciptakan hubungan dokter-
                pasien, perawat-pasien, atau hubungan profesional perawatan
                kesehatan lainnya antara Anda dan Rawat.ID atau penulis konten.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="akurasi-informasi-dan-teknologi-kesehatan"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Akurasi Informasi dan Teknologi Kesehatan
              </h3>

              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Bidang kesehatan, teknologi informasi medis (seperti sistem
                rekam medis elektronik), dan bioteknologi berkembang dengan
                sangat pesat. Meskipun kami berusaha keras untuk menjaga agar
                informasi di Situs tetap mutakhir dan benar, kami tidak membuat
                pernyataan atau jaminan dalam bentuk apapun, tersurat maupun
                tersirat, tentang kelengkapan, keakuratan, keandalan, kesesuaian,
                atau ketersediaan mengenai Situs atau informasi, produk, atau
                layanan yang terdapat di Situs.
              </p>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Segala ketergantungan yang Anda tempatkan pada informasi tersebut
                adalah risiko Anda sendiri.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="penyangkalan-iklan-dan-afiliasi"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Penyangkalan Iklan dan Afiliasi (Advertising &amp; Affiliate Disclaimer)
              </h3>

              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Situs ini menggunakan jaringan periklanan pihak ketiga, seperti
                Google AdSense untuk menayangkan iklan saat Anda mengunjungi
                situs web kami.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  Iklan yang muncul tidak selalu mencerminkan dukungan
                  (endorsement) dari Rawat.ID terhadap produk atau layanan
                  kesehatan yang diiklankan.
                </li>
                <li>
                  Kami mungkin menerima kompensasi finansial dari klik atau
                  pembelian yang dilakukan melalui tautan afiliasi tertentu di
                  Situs. Namun, hal ini tidak mempengaruhi objektivitas editorial
                  dari konten kami.
                </li>
              </ul>
            </section>

            <section data-aos="fade-up" id="batasan-tanggung-jawab" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Batasan Tanggung Jawab
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Dalam keadaan apapun, Rawat.ID, pemilik, tim penulis, atau
                afiliasinya tidak bertanggung jawab atas kerugian atau kerusakan
                apapun, termasuk namun tidak terbatas pada kerugian tidak
                langsung atau konsekuensi, yang timbul dari hilangnya data,
                hilangnya nyawa, cedera atau keuntungan yang timbul dari atau
                sehubungan dengan penggunaan Situs ini.
              </p>
            </section>

            <section data-aos="fade-up" id="hubungi-kami" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Hubungi Kami
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan atau
                Disclaimer ini, silakan hubungi kami di:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  <span className="font-semibold text-neutral90">Email</span>:{" "}
                  <a
                    href="mailto:admin@rawat.id"
                    className="text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out"
                  >
                    admin@rawat.id
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Halaman Kontak
                  </span>
                  :{" "}
                  <a
                    href="https://www.rawat.id/contact"
                    className="text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.rawat.id/contact
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

