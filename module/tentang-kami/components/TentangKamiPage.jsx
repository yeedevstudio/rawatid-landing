import React from "react";
import Link from "next/link";

export default function TentangKamiPage() {
  const sections = [
    { id: "visi", label: "Visi Kami" },
    { id: "latar-belakang", label: "Latar Belakang dan Fokus Kami" },
    { id: "misi", label: "Misi Kami" },
    { id: "hubungi", label: "Hubungi Kami" },
  ];

  return (
    <>
      <section className="bg-greenBrand text-white rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="px-5 md:px-12 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Tentang Kami (About us)
          </h1>
        </div>
      </section>

      <section className="mx-5 md:mx-12 my-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <aside data-aos="fade-right" className="lg:sticky lg:top-24 h-fit">
            <nav
              aria-label="Daftar isi Tentang Kami"
              className="border-b lg:border-b-0 lg:border-r border-neutral50/60 pb-4 lg:pb-0 lg:pr-6"
            >
              <ul className="flex lg:flex-col gap-3 lg:gap-4 flex-wrap">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm md:text-base text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div data-aos="fade-left" className="flex flex-col gap-10 max-w-3xl">
            <section
              aria-label="Selamat datang"
              className="flex flex-col gap-3"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-greenBrand">
                Selamat datang di Rawat.ID
              </h2>
              <p className="text-justify text-sm md:text-lg font-normal text-neutral90 leading-relaxed">
                Di era di mana teknologi dan ilmu medis berkembang berdampingan,
                Rawat.ID (beserta submuka blog kami di{" "}
                <a
                  href="https://www.rawat.id/blog"
                  className="text-greenBrand hover:text-greenHover transition-all duration-200 ease-in-out"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.rawat.id/blog
                </a>
                ) hadir sebagai jembatan informasi yang terpercaya. Kami adalah
                platform digital inovatif yang didedikasikan untuk mengupas
                tuntas dunia kesehatan, teknologi kesehatan (health-tech),
                layanan kesehatan, hingga perkembangan terbaru dalam
                bioteknologi kesehatan.
              </p>
            </section>

            <section data-aos="fade-up" id="visi" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Visi Kami
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed">
                Visi kami sederhana namun kami harap bisa berdampak: Memberikan
                akses informasi yang mudah bagi siapa saja. Kami percaya bahwa
                pemahaman yang baik tentang kesehatan sangat bermanfaat bagi
                setiap orang. Kami juga bercita-cita menjadi rujukan utama bagi
                siapa saja yang ingin memahami bagaimana teknologi sedang
                mengubah pelayanan kesehatan ke arah yang jauh lebih baik.
              </p>
            </section>

            <section
              data-aos="fade-up"
              id="latar-belakang"
              className="scroll-mt-28"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Latar Belakang dan Fokus Kami
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Melalui artikel, analisis, dan panduan di platform ini, kami
                berfokus pada eksplorasi mendalam mengenai topik-topik seperti:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-neutral90">
                <li>
                  <span className="font-semibold text-neutral90">
                    Kesehatan Umum & Layanan Kesehatan
                  </span>
                  : Panduan praktis, informasi pencegahan penyakit dan wawasan
                  seputar ekosistem layanan medis.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Inovasi Health-Tech
                  </span>
                  : Pemanfaatan AI, perangkat wearable dan transformasi digital
                  yang membantu pasien serta rumah sakit.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Sistem Informasi Medis
                  </span>
                  : Edukasi seputar pengelolaan data kesehatan yang aman dan
                  berstandar global, seperti pentingnya Personal Health Records
                  (PHR) serta pemahaman seputar klasifikasi medis (seperti
                  sistem ICD dan SNOMED CT).
                </li>
                <li>
                  <span className="font-semibold text-neutral90">Bioteknologi</span>
                  : Perkembangan mutakhir di laboratorium yang membuka jalan
                  bagi metode pengobatan baru yang lebih presisi.
                </li>
              </ul>
            </section>

            <section data-aos="fade-up" id="misi" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Misi Kami
              </h3>
              <ol className="list-decimal pl-5 space-y-3 text-sm md:text-lg text-neutral90">
                <li>
                  <span className="font-semibold text-neutral90">
                    Menyediakan Informasi yang Akurat dan Mudah Dipahami
                  </span>
                  : Mengubah jurnal medis, konsep teknologi klinis dan tren
                  bioteknologi yang rumit menjadi bahasa yang mudah dicerna oleh
                  masyarakat umum tanpa menghilangkan esensi ilmiahnya.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Mendukung Transformasi Pelayanan Kesehatan
                  </span>
                  : Menjadi katalisator bagi pembaca, baik masyarakat umum
                  maupun praktisi, untuk lebih terbuka terhadap adopsi teknologi
                  yang dapat meningkatkan efisiensi dan akurasi perawatan medis.
                </li>
                <li>
                  <span className="font-semibold text-neutral90">
                    Menjaga Integritas Data dan Privasi
                  </span>
                  : Mengedukasi pentingnya keamanan data pasien dan etika dalam
                  implementasi teknologi kesehatan.
                </li>
              </ol>
            </section>

            <section data-aos="fade-up" id="hubungi" className="scroll-mt-28">
              <h3 className="text-lg md:text-2xl font-semibold text-greenBrand mb-3">
                Hubungi Kami
              </h3>
              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mb-4">
                Kami selalu terbuka untuk diskusi, kolaborasi, dan masukan dari
                pembaca. Jika Anda memiliki pertanyaan, saran topik atau peluang
                kemitraan, jangan ragu untuk menghubungi kami melalui:
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

              <p className="text-justify text-sm md:text-lg text-neutral90 leading-relaxed mt-6">
                Terima kasih telah menjadikan Rawat.ID sebagai mitra perjalanan
                Anda dalam memahami ekosistem kesehatan dan teknologi masa
                depan.
              </p>

              <p className="text-sm md:text-lg font-semibold text-neutral90 mt-4">
                Salam Sehat dan Inovatif, Tim Rawat.ID
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

