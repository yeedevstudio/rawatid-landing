"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function TermsOfServicePage() {
  const sections = useMemo(
    () => [
      { id: "penggunaan-situs-web", label: "Penggunaan Situs Web" },
      { id: "hak-kekayaan-intelektual", label: "Hak Kekayaan Intelektual" },
      { id: "konten-pengguna", label: "Konten Pengguna (Komentar Blog)" },
      { id: "tautan-pihak-ketiga", label: "Tautan ke Situs Pihak Ketiga" },
      { id: "hukum-berlaku", label: "Hukum yang Berlaku" },
      { id: "perubahan-syarat", label: "Perubahan Syarat" },
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
            Syarat dan Ketentuan Penggunaan Rawat.ID (Terms of Service)
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/90">
            Terakhir diperbarui: 16 Maret 2026
          </p>
        </div>
      </section>

      <section className="mx-5 md:mx-12 my-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <aside data-aos="fade-right" className="lg:sticky lg:top-24 h-fit">
            <nav
              aria-label="Daftar isi Terms of Service"
              className="pb-2"
            >
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
                Dengan mengakses dan menggunakan Situs ini, Anda menyetujui
                untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak
                setuju dengan bagian manapun dari syarat ini, Anda dilarang
                menggunakan Situs ini.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="penggunaan-situs-web"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Penggunaan Situs Web
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  Situs ini menyediakan artikel, berita, dan panduan terkait
                  kesehatan, pelayanan kesehatan, teknologi kesehatan, dan
                  bioteknologi untuk tujuan informasi dan edukasi semata.
                </li>
                <li>
                  Anda setuju untuk menggunakan Situs ini hanya untuk tujuan
                  yang sah dan dengan cara yang tidak melanggar hak, membatasi,
                  atau menghalangi penggunaan dan kenikmatan Situs ini oleh
                  pihak ketiga.
                </li>
                <li>
                  Dilarang keras menggunakan Situs ini untuk mengirimkan materi
                  yang melanggar hukum, melecehkan, mencemarkan nama baik,
                  kasar, mengancam, berbahaya, vulgar, cabul, atau materi yang
                  tidak pantas lainnya.
                </li>
              </ul>
            </section>

            <section
              data-aos="fade-up"
              id="hak-kekayaan-intelektual"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Hak Kekayaan Intelektual
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Kecuali dinyatakan lain, Rawat.ID dan/atau pemberi lisensinya
                memiliki hak kekayaan intelektual atas semua materi di Situs
                ini, termasuk namun tidak terbatas pada teks, grafik, logo,
                gambar, dan kompilasi data. Semua hak kekayaan intelektual
                dilindungi undang-undang.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  Anda dapat melihat dan/atau mencetak halaman dari{" "}
                  <span className="font-semibold">www.rawat.id</span> untuk
                  penggunaan pribadi Anda sendiri dengan batasan sebagaimana
                  diatur dalam syarat dan ketentuan ini.
                </li>
                <li>
                  Anda tidak diperbolehkan untuk mempublikasikan ulang, menjual,
                  menyewakan, mensublisensikan, mereproduksi atau menyalin materi
                  dari Rawat.ID tanpa izin tertulis dari kami.
                </li>
              </ul>
            </section>

            <section
              data-aos="fade-up"
              id="konten-pengguna"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Konten Pengguna (Komentar Blog)
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Jika Situs menyediakan fitur untuk memposting komentar di{" "}
                <span className="font-semibold">www.rawat.id/blog</span>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  Anda bertanggung jawab penuh atas konten yang Anda posting.
                </li>
                <li>
                  Rawat.ID berhak, namun tidak berkewajiban, untuk memantau,
                  mengedit, atau menghapus komentar yang dianggap tidak pantas,
                  menyinggung atau melanggar Syarat dan Ketentuan ini tanpa
                  pemberitahuan sebelumnya.
                </li>
              </ul>
            </section>

            <section
              data-aos="fade-up"
              id="tautan-pihak-ketiga"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Tautan ke Situs Pihak Ketiga
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Situs kami mungkin berisi tautan ke situs web atau layanan pihak
                ketiga yang tidak dimiliki atau dikendalikan oleh Rawat.ID.
                Kami tidak memiliki kontrol atas, dan tidak bertanggung jawab
                atas konten, kebijakan privasi, atau praktik situs web pihak
                ketiga manapun.
              </p>
            </section>

            <section data-aos="fade-up" id="hukum-berlaku" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Hukum yang Berlaku
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan
                hukum Republik Indonesia. Setiap sengketa yang timbul sehubungan
                dengan Situs ini akan tunduk pada yurisdiksi eksklusif pengadilan
                di Indonesia.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="perubahan-syarat"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Perubahan Syarat
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Kami berhak untuk mengubah atau mengganti Syarat dan Ketentuan
                ini kapan saja. Perubahan akan segera berlaku setelah diposting
                di halaman ini. Penggunaan berkelanjutan Anda atas Situs setelah
                perubahan tersebut merupakan bentuk persetujuan Anda terhadap
                syarat yang baru.
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

