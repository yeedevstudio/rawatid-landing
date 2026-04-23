import { fiturValue } from "@/common/constant/fiturValue";
import Link from "next/link";

function pickById(id) {
  return fiturValue.find((x) => x.id === id) || null;
}

export default function SistemFaskesDetail({ fiturId }) {
  const data = pickById(fiturId);

  if (!data) {
    return (
      <section className="mx-5 md:mx-12 my-10">
        <h1 className="text-2xl md:text-4xl font-semibold text-green">
          Sistem Faskes
        </h1>
        <p className="mt-3 text-gray-600">
          Konten belum tersedia untuk halaman ini.
        </p>
        <Link
          href="/sistem-faskes"
          className="inline-block mt-5 text-sm font-semibold text-green hover:text-greenHover transition-colors"
        >
          Kembali
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-5 md:mx-12 my-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl md:text-4xl font-semibold text-green leading-snug">
          {data.title}
        </h1>
        <Link
          href="/sistem-faskes"
          className="text-sm font-semibold text-green hover:text-greenHover transition-colors whitespace-nowrap"
        >
          Lihat semua
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        {data.list.map((it, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-black/5 bg-white p-5"
          >
            <div className="text-green font-semibold">{it.title}</div>
            <div className="mt-2 text-gray-700">{it.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

