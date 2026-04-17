"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function PrivacyPolicyPage() {
  const sections = useMemo(
    () => [
      { id: "persetujuan", label: "Persetujuan" },
      { id: "informasi-yang-kami-kumpulkan", label: "Informasi yang Kami Kumpulkan" },
      {
        id: "bagaimana-kami-menggunakan-informasi-anda",
        label: "Bagaimana Kami Menggunakan Informasi Anda",
      },
      { id: "file-log", label: "File Log (Log Files)" },
      { id: "cookies-dan-web-beacons", label: "Cookies dan Web Beacons" },
      { id: "google-doubleclick-dart-cookie", label: "Google DoubleClick DART Cookie" },
      {
        id: "mitra-periklanan-kami",
        label: "Mitra Periklanan Kami (Google AdSense)",
      },
      { id: "kebijakan-privasi-pihak-ketiga", label: "Kebijakan Privasi Pihak Ketiga" },
      {
        id: "hak-perlindungan-data-pengguna",
        label: "Hak Perlindungan Data Pengguna (CCPA & GDPR)",
      },
      { id: "informasi-anak", label: "Informasi Anak" },
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
            Kebijakan Privasi (Privacy Policy)
          </h1>
        </div>
      </section>

      <section className="mx-5 md:mx-12 my-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <aside data-aos="fade-right" className="lg:sticky lg:top-24 h-fit">
            <nav aria-label="Daftar isi Kebijakan Privasi" className="pb-2">
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
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Selamat datang di Rawat.ID, selanjutnya disebut sebagai
                &quot;Situs&quot;.
              </p>
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Di Rawat.ID, yang dapat diakses melalui{" "}
                <span className="font-semibold">www.rawat.id</span>, salah satu
                prioritas utama kami adalah privasi pengunjung kami.
              </p>
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Halaman Kebijakan Privasi ini memuat jenis informasi yang
                dikumpulkan dan dicatat oleh Rawat.ID serta bagaimana kami
                menggunakannya. Situs ini berfokus pada penyediaan informasi
                seputar kesehatan, teknologi kesehatan, layanan kesehatan, dan
                bioteknologi kesehatan.
              </p>
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Jika Anda memiliki pertanyaan tambahan atau memerlukan informasi
                lebih lanjut tentang Kebijakan Privasi kami, jangan ragu untuk
                menghubungi kami.
              </p>
            </section>

            <section data-aos="fade-up" id="persetujuan" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Persetujuan
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Dengan menggunakan situs web kami, Anda dengan ini menyetujui
                Kebijakan Privasi kami dan menyetujui syarat dan ketentuannya.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="informasi-yang-kami-kumpulkan"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Informasi yang Kami Kumpulkan
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Informasi pribadi yang diminta untuk Anda berikan, dan alasan
                mengapa Anda diminta untuk memberikannya, akan dijelaskan secara
                transparan pada titik di mana kami meminta Anda untuk
                memberikan informasi pribadi Anda.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Jika Anda menghubungi kami secara langsung, kami mungkin
                menerima informasi tambahan tentang Anda seperti nama, alamat
                email, nomor telepon, isi pesan dan/atau lampiran yang mungkin
                Anda kirimkan kepada kami, serta informasi lain yang mungkin
                Anda pilih untuk diberikan.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Saat Anda mendaftar untuk membuat akun atau berlangganan buletin,
                kami mungkin meminta informasi kontak Anda, termasuk elemen
                seperti nama, nama perusahaan, alamat, alamat email, dan nomor
                telepon.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="bagaimana-kami-menggunakan-informasi-anda"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Bagaimana Kami Menggunakan Informasi Anda
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Kami menggunakan informasi yang dikumpulkan dengan berbagai cara,
                termasuk untuk:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>Menyediakan, mengoperasikan dan memelihara Situs kami.</li>
                <li>
                  Meningkatkan, mempersonalisasi dan memperluas Situs kami.
                </li>
                <li>
                  Memahami dan menganalisis bagaimana Anda menggunakan Situs
                  kami.
                </li>
                <li>
                  Mengembangkan produk, layanan, fitur dan fungsionalitas baru
                  yang berkaitan dengan teknologi dan layanan kesehatan.
                </li>
                <li>
                  Berkomunikasi dengan Anda, baik secara langsung maupun melalui
                  salah satu mitra kami, termasuk untuk layanan pelanggan, untuk
                  memberi Anda pembaruan dan informasi lain yang berkaitan
                  dengan Situs, serta untuk tujuan pemasaran dan promosi.
                </li>
                <li>Mengirimi Anda email berkala.</li>
                <li>Menemukan dan mencegah penipuan.</li>
              </ul>
            </section>

            <section data-aos="fade-up" id="file-log" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                File Log (Log Files)
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Rawat.ID mengikuti prosedur standar menggunakan file log.
                File-file ini mencatat pengunjung ketika mereka mengunjungi situs
                web.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Semua perusahaan hosting melakukan ini dan merupakan bagian dari
                analitik layanan hosting. Informasi yang dikumpulkan oleh file
                log termasuk alamat protokol internet (IP), jenis browser,
                Penyedia Layanan Internet (ISP), tanggal dan waktu, halaman
                rujukan/keluar, dan mungkin jumlah klik.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Informasi ini tidak terkait dengan informasi apa pun yang dapat
                diidentifikasi secara pribadi. Tujuan informasi ini adalah untuk
                menganalisis tren, mengelola situs, melacak pergerakan pengguna
                di situs web, dan mengumpulkan informasi demografis.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="cookies-dan-web-beacons"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Cookies dan Web Beacons
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Seperti situs web lainnya, Rawat.ID menggunakan &apos;cookies&apos;.
                Cookies ini digunakan untuk menyimpan informasi termasuk preferensi
                pengunjung, dan halaman-halaman di situs web yang diakses atau
                dikunjungi pengunjung.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Informasi tersebut digunakan untuk mengoptimalkan pengalaman
                pengguna dengan menyesuaikan konten halaman web kami berdasarkan
                jenis browser pengunjung dan/atau informasi lainnya.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="google-doubleclick-dart-cookie"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Google DoubleClick DART Cookie
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Google adalah salah satu vendor pihak ketiga di situs kami. Google
                juga menggunakan cookie, yang dikenal sebagai cookie DART, untuk
                menayangkan iklan kepada pengunjung situs kami berdasarkan
                kunjungan mereka ke www.rawat.id dan situs lainnya di internet.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Namun, pengunjung dapat memilih untuk menolak penggunaan cookie
                DART dengan mengunjungi Kebijakan Privasi jaringan iklan dan konten
                Google di URL berikut:{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  className="text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out break-words"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="mitra-periklanan-kami"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Mitra Periklanan Kami (Google AdSense)
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Beberapa pengiklan di situs kami mungkin menggunakan cookie dan web
                beacon. Mitra periklanan kami tercantum di bawah ini. Setiap mitra
                periklanan kami memiliki Kebijakan Privasi mereka sendiri untuk
                kebijakan mereka tentang data pengguna.
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  <span className="font-semibold text-neutral90">Google</span>
                </li>
              </ul>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Server iklan atau jaringan iklan pihak ketiga menggunakan teknologi
                seperti cookie, JavaScript, atau Web Beacons yang digunakan dalam
                iklan masing-masing dan tautan yang muncul di Rawat.ID, yang dikirim
                langsung ke browser pengguna. Mereka secara otomatis menerima
                alamat IP Anda saat ini terjadi.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Teknologi ini digunakan untuk mengukur efektivitas kampanye iklan
                mereka dan/atau untuk mempersonalisasi konten iklan yang Anda lihat
                di situs web yang Anda kunjungi.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                <span className="font-semibold text-neutral90">Catatan</span>: Rawat.ID
                tidak memiliki akses atau kontrol atas cookie yang digunakan oleh
                pengiklan pihak ketiga.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="kebijakan-privasi-pihak-ketiga"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Kebijakan Privasi Pihak Ketiga
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Kebijakan Privasi Rawat.ID tidak berlaku untuk pengiklan atau situs
                web lain. Oleh karena itu, kami menyarankan Anda untuk berkonsultasi
                dengan Kebijakan Privasi masing-masing dari server iklan pihak ketiga
                ini untuk informasi yang lebih rinci. Ini mungkin mencakup praktik dan
                instruksi mereka tentang cara menolak (opt-out) dari opsi tertentu.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Anda dapat memilih untuk menonaktifkan cookie melalui opsi peramban
                (browser) individual Anda. Untuk mengetahui informasi lebih rinci
                tentang manajemen cookie dengan browser web tertentu, dapat ditemukan
                di situs web masing-masing browser.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="hak-perlindungan-data-pengguna"
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Hak Perlindungan Data Pengguna (CCPA &amp; GDPR)
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Kami ingin memastikan Anda sepenuhnya menyadari semua hak
                perlindungan data Anda. Setiap pengguna berhak atas hal-hal
                berikut:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  <span className="font-semibold text-neutral90">
                    Hak untuk mengakses
                  </span>
                  : Anda berhak meminta salinan data pribadi Anda.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Hak untuk perbaikan
                  </span>
                  : Anda berhak meminta agar kami mengoreksi informasi apa pun
                  yang Anda yakini tidak akurat. Anda juga berhak meminta kami
                  melengkapi informasi yang Anda yakini tidak lengkap.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Hak untuk menghapus
                  </span>
                  : Anda berhak meminta agar kami menghapus data pribadi Anda,
                  dengan ketentuan tertentu.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Hak untuk membatasi pemrosesan
                  </span>
                  : Anda berhak meminta agar kami membatasi pemrosesan data
                  pribadi Anda, di bawah kondisi tertentu.
                </li>
              </ul>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Jika Anda mengajukan permintaan, kami memiliki waktu satu bulan
                untuk menanggapi Anda. Jika Anda ingin menggunakan salah satu
                hak ini, silakan hubungi kami.
              </p>
            </section>

            <section data-aos="fade-up" id="informasi-anak" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Informasi Anak
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Bagian lain dari prioritas kami adalah menambahkan perlindungan
                bagi anak-anak saat menggunakan internet. Kami mendorong orang
                tua dan wali untuk mengamati, berpartisipasi, dan/atau memantau
                serta membimbing aktivitas online mereka.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Rawat.ID tidak secara sadar mengumpulkan Informasi Identifikasi
                Pribadi apa pun dari anak-anak di bawah usia 13 tahun.
              </p>
              <p className="mt-4 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Jika Anda merasa anak Anda memberikan informasi semacam ini di
                situs web kami, kami sangat menganjurkan Anda untuk segera
                menghubungi kami dan kami akan melakukan upaya terbaik kami untuk
                segera menghapus informasi tersebut dari catatan kami.
              </p>
            </section>

            <section data-aos="fade-up" id="hubungi-kami" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Hubungi Kami
              </h2>
              <p className="mt-3 text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
                Anda dapat menghubungi kami melalui:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
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

