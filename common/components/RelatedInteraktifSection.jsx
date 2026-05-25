import Image from "next/image";
import Link from "next/link";
import { INTERAKTIF_CONTENTS } from "@/common/constant/interaktifValue";

/**
 * Menampilkan 3 card interaktif konten lainnya di bagian bawah halaman detail.
 * @param {string} currentSlug - slug halaman yang sedang aktif, agar tidak ditampilkan ulang.
 */
export default function RelatedInteraktifSection({ currentSlug }) {
  const related = INTERAKTIF_CONTENTS.filter((item) => item.slug !== currentSlug).slice(0, 3);

  return (
    <section className="w-full px-5 md:px-12 lg:px-20 xl:px-24 py-16 md:py-20 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-[28px] font-semibold text-[#038F7A]">
          Interaktif Konten Lainnya
        </h2>
        <Link
          href="/interaktif"
          className="text-sm md:text-base text-[#038F7A] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Lihat Selengkapnya
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={item.url}
            className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={450}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="pt-4 pb-1 text-center">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
