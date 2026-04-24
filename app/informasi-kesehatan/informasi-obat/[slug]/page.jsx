import Breadcrumbs from "@/common/components/Breadcrumbs";
import NotFound from "@/app/not-found";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Twitter,
} from "lucide-react";

async function getDrugBySlug(slug) {
  const encoded = encodeURIComponent(String(slug || ""));
  const res = await fetch(
    `https://cm-api.rawat.id/drug-ingredients/public/slug/${encoded}`,
    { cache: "no-store" }
  );
  const json = await res.json().catch(() => null);
  return { ok: res.ok, json };
}

async function getRelated({ navigasi, excludeSlug }) {
  try {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("perPage", "8");
    params.set("search", "");
    if (navigasi) params.set("navigasi", String(navigasi));

    const res = await fetch(
      `https://cm-api.rawat.id/drug-ingredients/public?${params.toString()}`,
      { cache: "no-store" }
    );
    const json = await res.json().catch(() => null);
    const list = json?.data || [];
    return (Array.isArray(list) ? list : [])
      .filter((it) => it?.slug && it.slug !== excludeSlug)
      .slice(0, 6);
  } catch {
    return [];
  }
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function Page({ params }) {
  const { slug } = await params;

  const { ok, json } = await getDrugBySlug(slug);
  const data = json?.data || json;

  if (!ok || !data) return <NotFound />;

  const reviewedBy = data?.verifiedBy || "Tim Rawat.ID";
  const reviewedAt = formatDate(data?.verifiedAt);
  const reviewedLine =
    reviewedAt ? `Informasi telah ditinjau oleh ${reviewedBy} pada ${reviewedAt}` : `Informasi telah ditinjau oleh ${reviewedBy}`;

  const related = await getRelated({
    navigasi: data?.navigasi || (data?.name ? String(data.name).slice(0, 1).toUpperCase() : ""),
    excludeSlug: data?.slug,
  });

  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            {
              label: "Informasi Kesehatan",
              href: "/informasi-kesehatan/informasi-obat",
            },
            { label: "Informasi Obat", href: "/informasi-kesehatan/informasi-obat" },
            {
              label: data?.name || slug,
              href: `/informasi-kesehatan/informasi-obat/${slug}`,
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-9">
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-semibold text-green">
                  {data?.name}
                </h1>
                <div className="mt-2 text-xs md:text-sm text-gray-500">
                  {reviewedLine}
                </div>

                <div className="mt-4 text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {data?.description || ""}
                </div>

                <div className="mt-6">
                  <div className="relative w-full overflow-hidden rounded-xl border border-black/5 bg-gray-50 aspect-[16/9]">
                    <Image
                      src="/images/drugs.svg"
                      alt="Ilustrasi obat"
                      fill
                      priority={false}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-8">
                  <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                      Apa itu {data?.name}
                    </div>
                    <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                      {data?.description || "-"}
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                      Manfaat
                    </div>
                    <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                      {data?.medicinal_uses || "-"}
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                      Efek samping
                    </div>
                    <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                      {data?.drug_side_effects || "-"}
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                      Kontraindikasi
                    </div>
                    <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                      {data?.drug_contraindications || "-"}
                    </div>
                  </section>

                  {data?.overdose ? (
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                        Overdosis
                      </div>
                      <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                        {data.overdose}
                      </div>
                    </section>
                  ) : null}

                  {data?.referenced ? (
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-3 text-sm font-semibold text-gray-900">
                        Referensi
                      </div>
                      <div className="md:col-span-9 text-sm text-gray-700 whitespace-pre-line">
                        {data.referenced}
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
                <div className="p-5">
                  <div className="text-sm font-semibold text-gray-900">
                    Bagikan artikel
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Bagikan ke WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-green" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Bagikan ke Facebook"
                    >
                      <Facebook className="w-4 h-4 text-green" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Bagikan ke Twitter"
                    >
                      <Twitter className="w-4 h-4 text-green" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Bagikan ke LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-green" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Bagikan via Email"
                    >
                      <Mail className="w-4 h-4 text-green" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50"
                      aria-label="Salin tautan"
                    >
                      <LinkIcon className="w-4 h-4 text-green" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
                <div className="p-5">
                  <div className="text-sm font-semibold text-gray-900">
                    Obat lainnya
                  </div>
                  <div className="mt-3 space-y-2">
                    {related?.length ? (
                      related.map((it) => (
                        <Link
                          key={it.slug}
                          href={`/informasi-kesehatan/informasi-obat/${it.slug}`}
                          className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              {it.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {it.drug_class_name || "Lihat detail"}
                            </div>
                          </div>
                          <span className="text-green font-semibold">›</span>
                        </Link>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        Belum ada rekomendasi.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

