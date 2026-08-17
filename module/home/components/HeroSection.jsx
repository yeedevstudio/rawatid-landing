import JelajahiButton from "./JelajahiButton";
const HERO_SRCSET =
  "/image/newbackground-432.webp 432w, /image/newbackground-576.webp 576w, /image/newbackground-768.webp 768w, /image/newbackground-1088.webp 1088w";
const HERO_SIZES =
  "(max-width: 640px) 288px, (max-width: 768px) 336px, (max-width: 1024px) 384px, (max-width: 1280px) 480px, 544px";

export default function HeroSection() {
  return (
    <>
      {/* next/image biasanya menyisipkan preload sendiri untuk gambar priority.
          Karena elemen hero kini <img> manual, preload-nya ditulis sendiri agar
          browser mulai mengunduh berkas yang tepat sebelum CSS selesai diproses. */}
      <link
        rel="preload"
        as="image"
        href="/image/newbackground-576.webp"
        imageSrcSet={HERO_SRCSET}
        imageSizes={HERO_SIZES}
        fetchPriority="high"
      />
    <section className="my-8 md:my-10 w-full px-5 md:px-12 lg:px-20 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center overflow-hidden">
      {/* IMAGE — first in DOM so it appears on top in mobile */}
      {/* Tanpa data-aos: aos.css memberi opacity:0 ke semua elemen fade, dan AOS
          baru inisialisasi setelah window load + requestIdleCallback. Gambar ini
          elemen LCP halaman — menyembunyikannya sampai AOS jalan membuat LCP
          menunggu SELURUH resource halaman selesai. Lagipula elemen ini sudah
          berada di viewport saat load, jadi animasi scroll tidak ada gunanya. */}
      <div className="flex items-center justify-center lg:justify-end lg:order-2">
        <div className="relative h-[22rem] sm:h-[26rem] md:h-[32rem] lg:h-[34rem] xl:h-[38rem] w-[18rem] sm:w-[21rem] md:w-[24rem] lg:w-[30rem] xl:w-[34rem] overflow-hidden rounded-tr-[13rem] rounded-bl-[13rem] lg:rounded-tr-[18rem] lg:rounded-bl-[18rem] lg:translate-x-1 xl:translate-x-2">
          {/* Bukan next/image: images.unoptimized=true membuat next/image tidak
              menghasilkan srcset, sehingga file 912px ikut terkirim ke slot yang
              di mobile hanya 288px. Elemen ini adalah LCP halaman, jadi srcset
              ditulis manual supaya tiap lebar layar menerima berkas seukurannya
              (mobile 39 KB, bukan 107 KB). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/newbackground-576.webp"
            srcSet={HERO_SRCSET}
            sizes={HERO_SIZES}
            alt="Ilustrasi halaman beranda Rawat.ID"
            width={912}
            height={1140}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* TEXT & BUTTON — second in DOM so it appears below image in mobile */}
      <div
        className="flex flex-col gap-4 md:gap-6 lg:gap-8 min-w-0 items-center text-center lg:items-start lg:text-left lg:order-1"
      >
        <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.1] font-semibold text-[#038F7A]">Merawat Kesehatan dengan Lebih Baik</h1>
        <h2 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.35] font-normal text-[#038F7A]">Memberikan solusi dan informasi terbaik untuk merawat kesehatanmu</h2>
        <div className="pt-2 md:pt-6 w-full lg:w-[480px]">
          <JelajahiButton />
        </div>
      </div>
    </section>
    </>
  );
}
