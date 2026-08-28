"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandWhatsapp, IconBrandX, IconLink } from "@tabler/icons-react";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import NotFound from "@/app/not-found";
import { Skeleton } from "@/components/ui/skeleton";

/** Dipakai lagi saat baris peninjauan medis diaktifkan. */
// function formatDate(dateString) {
//   if (!dateString) return "";
//   const d = new Date(dateString);
//   if (Number.isNaN(d.getTime())) return "";
//   return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
// }

function splitLinesToItems(value) {
  if (!value) return [];
  const text = String(value);
  return text
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^[-•]\s*/, ""));
}

function splitTextToBullets(value) {
  if (!value) return [];
  const text = String(value).trim();
  if (!text) return [];

  // Prefer explicit line breaks / bullets, otherwise fall back to sentence-ish splitting.
  const hasNewlines = /\r?\n/.test(text);
  const parts = hasNewlines ? text.split(/\r?\n+/) : text.split(/(?:\s*;\s*)|(?:\.\s+(?=[A-ZÀ-ÖØ-Ý]))|(?:,\s+(?=[A-ZÀ-ÖØ-Ý]))/g).map((s) => s.replace(/\.$/, ""));

  return parts
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^[-•]\s*/, ""));
}

function parseParagraphsAndBullets(value) {
  if (!value) return { paragraphs: [], bullets: [] };
  const text = String(value).trim();
  if (!text) return { paragraphs: [], bullets: [] };

  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const isBulletLine = (l) => /^([-•*]+)\s+/.test(l) || /^\d+[\.\)]\s+/.test(l);

  const bullets = [];
  const paragraphLines = [];
  let inBullets = false;

  for (const line of lines) {
    if (!line) {
      if (!inBullets) paragraphLines.push("");
      continue;
    }

    if (isBulletLine(line)) {
      inBullets = true;
      bullets.push(line.replace(/^([-•*]+|\d+[\.\)])\s+/, ""));
      continue;
    }

    if (inBullets) {
      // If bullets already started, treat remaining non-bullet lines as bullet continuations.
      const last = bullets[bullets.length - 1];
      bullets[bullets.length - 1] = last ? `${last} ${line}` : line;
      continue;
    }

    paragraphLines.push(line);
  }

  const paragraphs = paragraphLines
    .join("\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return { paragraphs, bullets: bullets.map((b) => b.trim()).filter(Boolean) };
}

function formatDrugStrength(d) {
  if (!d) return "-";
  const num = d?.ing_num ?? d?.ingNum ?? "";
  const unit = d?.ing_num_unit ?? d?.ingNumUnit ?? "";
  const denom = d?.ing_denom ?? d?.ingDenom ?? "";
  const denomUnit = d?.ing_denom_unit ?? d?.ingDenomUnit ?? "";

  const left = `${String(num).trim()}${unit ? ` ${String(unit).trim()}` : ""}`.trim();
  if (!left) return d?.strength || d?.content || d?.amount || "-";

  const denomStr = String(denom).trim();
  const hasDenom = denomStr && denomStr !== "0" && denomStr !== "-";
  if (!hasDenom) return left;

  const right = `${denomStr}${denomUnit ? ` ${String(denomUnit).trim()}` : ""}`.trim();
  return right ? `${left} / ${right}` : left;
}

function normalizeData(json) {
  return json?.data || json;
}

export default function DrugDetailClient({ slug, initialData = null }) {
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialData?.detail ?? null);
  const [drugs, setDrugs] = useState(initialData?.drugs ?? []);
  const [related, setRelated] = useState(initialData?.related ?? []);

  // Server sudah menyiapkan detail + drugs + related, jadi jangan ulangi
  // rantai fetch-nya saat mount.
  const skipInitialFetch = useRef(Boolean(initialData));
  const containerClass = "mx-auto w-full max-w-screen-2xl px-10 sm:px-6 lg:px-8";
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location?.href || "" : "";

  const shareTitle = useMemo(() => {
    const name = data?.name || slug || "Rawat.ID";
    return `Baca informasi obat: ${name}`;
  }, [data, slug]);

  const openShare = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      if (!shareUrl) return;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError("");

        const resDetail = await fetch(`/drug-ingredients/public/slug/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const jsonDetail = await resDetail.json().catch(() => null);
        if (!resDetail.ok) throw new Error(jsonDetail?.error || "Gagal memuat detail obat");

        const detail = normalizeData(jsonDetail);
        if (!detail) throw new Error("Detail obat tidak ditemukan");

        const ingCodeForFetch = String(detail?.ing_code ?? detail?.ingCode ?? detail?.ingredient_code ?? detail?.ingredientCode ?? detail?.code ?? detail?.Code ?? "").trim();

        const drugsPromise = ingCodeForFetch
          ? fetch(`/drugs/public?ing_code=${encodeURIComponent(ingCodeForFetch)}`, { cache: "no-store" }).then(async (r) => {
              const j = await r.json().catch(() => null);
              if (!r.ok) return [];
              const raw = Array.isArray(j) ? j : (j?.data ?? []);
              return Array.isArray(raw) ? raw : [];
            })
          : Promise.resolve([]);

        const navigasi = detail?.navigasi || (detail?.name ? String(detail.name).slice(0, 1).toUpperCase() : "");
        const relatedParams = new URLSearchParams();
        relatedParams.set("page", "1");
        relatedParams.set("perPage", "8");
        relatedParams.set("search", "");
        if (navigasi) relatedParams.set("navigasi", String(navigasi));

        const relatedPromise = fetch(`/drug-ingredients/public?${relatedParams.toString()}`, { cache: "no-store" })
          .then(async (r) => {
            const j = await r.json().catch(() => null);
            const list = j?.data || [];
            const arr = Array.isArray(list) ? list : [];
            return arr.filter((it) => it?.slug && it.slug !== detail?.slug).slice(0, 6);
          })
          .catch(() => []);

        const [drugsList, relatedList] = await Promise.all([drugsPromise, relatedPromise]);

        if (cancelled) return;
        setData(detail);
        setDrugs(drugsList);
        setRelated(relatedList);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Gagal memuat data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Sementara disembunyikan sampai semua obat selesai ditinjau tim konten medis.
  // const reviewedLine = useMemo(() => {
  //   const reviewedBy = data?.verifiedBy || "Tim Rawat.ID";
  //   const reviewedAt = formatDate(data?.verifiedAt);
  //   return reviewedAt ? `Informasi telah ditinjau oleh ${reviewedBy} pada ${reviewedAt}` : `Informasi telah ditinjau oleh ${reviewedBy}`;
  // }, [data]);

  const brandNames = useMemo(() => {
    return data?.brand_names || data?.brandNames || data?.trade_names || data?.tradeNames || data?.merk_dagang || data?.merk_dagang_obat || "";
  }, [data]);

  const warningsRaw = useMemo(() => {
    return data?.warnings || data?.warning || data?.precautions || data?.drug_precautions || data?.warning_before_using || data?.warningBeforeUsing || data?.drug_contraindications || data?.drugContraindications || data?.contraindications || "";
  }, [data]);

  const warningsIsHtml = useMemo(() => /<[a-z][\s\S]*>/i.test(warningsRaw), [warningsRaw]);

  const warnings = useMemo(() => {
    if (!warningsRaw || warningsIsHtml) return [];
    return splitTextToBullets(warningsRaw);
  }, [warningsRaw, warningsIsHtml]);

  const dosageRaw = useMemo(() => {
    return data?.dosage || data?.dose || data?.how_to_use || data?.drug_dosage || data?.dosage_and_rules || data?.dosageAndRules || "";
  }, [data]);

  const dosageContent = useMemo(() => parseParagraphsAndBullets(dosageRaw), [dosageRaw]);

  const tags = useMemo(() => {
    const raw = Array.isArray(data?.tags) ? data.tags : splitLinesToItems(data?.tags || data?.tag || "");
    const arr = Array.isArray(raw) ? raw : [];
    if (arr.length) return arr;

    // Fallback dari field yang memang ada di API
    const fallback = [data?.drug_class_name, data?.drug_category_name].map((v) => String(v || "").trim()).filter(Boolean);
    return Array.from(new Set(fallback));
  }, [data]);

  const medicinalUses = useMemo(() => {
    return data?.medicinal_uses || data?.medicinalUses || data?.uses || data?.benefits || "";
  }, [data]);

  const sideEffects = useMemo(() => {
    const raw = data?.drug_side_effects || data?.drugSideEffects || data?.side_effects || data?.sideEffects || drugs?.[0]?.drug_side_effects || drugs?.[0]?.drugSideEffects || "";
    // Selalu render sebagai paragraf biasa (tanpa bullet list).
    return String(raw || "").trim();
  }, [data, drugs]);

  if (!loading && (error || !data)) {
    return error ? <div className={`${containerClass} py-10 text-sm text-red-600`}>{error}</div> : <NotFound />;
  }

  return (
    <div className="w-full">
      <div className={`${containerClass} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Informasi Kesehatan", href: "/informasi-kesehatan/informasi-obat" },
            { label: "Informasi Obat", href: "/informasi-kesehatan/informasi-obat" },
            { label: data?.name || slug, href: `/informasi-kesehatan/informasi-obat/${slug}` },
          ]}
        />
      </div>

      <main className={`${containerClass} pb-12 pt-6`}>
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-[260px] w-full rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-9 space-y-4">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-64 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <h1 className="mt-8 md:mt-12 mb-4 md:mb-6 text-3xl md:text-5xl font-semibold text-green tracking-tight">{data?.name ? `${data.name} - Manfaat, Cara Penggunaan, Dosis dan Efek Samping` : ""}</h1>
              {/* Sementara disembunyikan sampai semua obat selesai ditinjau tim konten medis.
              <div className="mb-8 md:mb-10 text-xs md:text-sm text-gray-500">{reviewedLine}</div>
              */}
              <div
                className="text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic [&_strong]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
              />
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50 aspect-[20/9]">
              {/* Ilustrasi ini adalah elemen LCP halaman detail obat. Dengan
                  priority={false} next/image memberinya loading="lazy", sehingga
                  browser baru menemukannya setelah layout selesai — Load Delay-nya
                  1.422 ms padahal berkasnya cuma perlu 40 ms untuk diunduh.
                  priority membuatnya ikut di-preload sejak awal. */}
              <Image
                src="/image/obatdetail.webp"
                alt="Ilustrasi obat"
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
                fetchPriority="high"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <article className="lg:col-span-9">
                <div className={`${medicinalUses ? "mt-10" : ""} space-y-10`}>
                  {brandNames ? (
                    <div className="text-sm md:text-base text-gray-800">
                      <span className="font-semibold">Merek dagang {data?.name}:</span> <span className="text-gray-700">{brandNames}</span>
                    </div>
                  ) : null}

                  <section>
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">Apa itu {data?.name}</h2>
                    <div className="mt-3 border-t border-gray-200" />
                    {data?.medicinal_uses || data?.benefits ? (
                      <div
                        className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic [&_strong]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: data?.medicinal_uses || data?.benefits }}
                      />
                    ) : null}

                    <div className="mt-5 w-full overflow-x-auto">
                      <table className="w-full text-sm md:text-base">
                        <tbody>
                          {[
                            ["Golongan", data?.drug_class_name || data?.drug_class || data?.class || "-"],
                            ["Kategori", data?.drug_category_name || data?.drugCategoryName || data?.category || data?.drug_category || "-"],
                            ["Bentuk obat", data?.dosage_form || data?.dosageForm || drugs?.[0]?.form_name || drugs?.[0]?.dosage_form || drugs?.[0]?.form || "-"],
                          ].map(([k, v]) => (
                            <tr key={k} className="align-top border-b border-gray-200">
                              <td className="py-3 pr-6 text-gray-500 w-[260px]">{k}</td>
                              <td className="py-3 text-gray-800 whitespace-pre-line">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {warningsRaw ? (
                    <section>
                      <h2 className="text-base md:text-lg font-semibold text-gray-900">Peringatan sebelum Menggunakan {data?.name}</h2>
                      {warningsIsHtml ? (
                        <div
                          className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic [&_strong]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1"
                          dangerouslySetInnerHTML={{ __html: warningsRaw }}
                        />
                      ) : (
                        <>
                          <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                            {data?.warning_intro || data?.warningIntro || `${data?.name} tidak boleh digunakan sembarangan dan harus sesuai dengan resep dokter. Beberapa hal yang perlu diperhatikan sebelum mengonsumsi obat ini adalah:`}
                          </p>
                          <ul className="mt-5 list-disc pl-6 space-y-3 text-sm md:text-base text-gray-800 marker:text-gray-900">
                            {warnings.map((it, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {it}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </section>
                  ) : null}

                  {sideEffects ? (
                    <section>
                      <h2 className="text-base md:text-lg font-semibold text-gray-900">Efek Samping {data?.name}</h2>
                      <div className="mt-3 border-t border-gray-200" />
                      <div
                        className="mt-5 text-sm md:text-base text-gray-800 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic [&_strong]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: sideEffects }}
                      />
                    </section>
                  ) : null}

                  {dosageRaw ? (
                    <section>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">Dosis dan Aturan Pakai {data?.name}</h2>
                      <div className="mt-3 text-sm md:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                        {data?.dosage_intro || data?.dosageIntro || data?.dosage_description || data?.dosageDescription
                          ? String(data?.dosage_intro || data?.dosageIntro || data?.dosage_description || data?.dosageDescription)
                          : dosageContent.paragraphs.join("\n\n")}
                      </div>
                      {dosageContent.bullets?.length ? (
                        <ul className="mt-5 list-disc pl-6 space-y-3 text-sm md:text-base text-gray-800 marker:text-gray-900">
                          {dosageContent.bullets.map((it, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {it}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ) : null}

                  {data?.overdose ? (
                    <section>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">Overdosis {data?.name}</h2>
                      <div className="mt-3 border-t border-gray-200" />
                      <div
                        className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic [&_strong]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: String(data.overdose) }}
                      />
                    </section>
                  ) : null}

                  {drugs?.length ? (
                    <section>
                      <h2 className="text-base md:text-lg font-semibold text-gray-900">Daftar Produk Obat</h2>
                      <div className="mt-4 border-t border-gray-200" />

                      {/* Desktop: tabel */}
                      <div className="mt-4 hidden sm:block w-full overflow-x-auto">
                        <table className="w-full text-sm md:text-base">
                          <thead>
                            <tr className="text-gray-600 border-b border-gray-200">
                              <th className="text-left font-semibold py-3 pr-4">Nama Produk</th>
                              <th className="text-left font-semibold py-3 pr-4">Zat Aktif</th>
                              <th className="text-left font-semibold py-3 pr-4">Bentuk Sediaan</th>
                              <th className="text-left font-semibold py-3 pr-4">Jumlah Kandungan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drugs.map((d, idx) => (
                              <tr key={d?.id || d?._id || idx} className="text-gray-800 border-b border-gray-200 align-top">
                                <td className="py-5 pr-4 font-medium">{d?.product_name || d?.name || d?.product || "-"}</td>
                                <td className="py-5 pr-4 text-gray-700">{d?.ing_name || d?.active_ingredient || d?.active || data?.name || "-"}</td>
                                <td className="py-5 pr-4 text-gray-700 whitespace-pre-line">{d?.form_name || d?.dosage_form || d?.form || "-"}</td>
                                <td className="py-5 pr-4 text-gray-700 whitespace-pre-line">{formatDrugStrength(d)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile: card stack */}
                      <div className="mt-4 sm:hidden flex flex-col gap-3">
                        {drugs.map((d, idx) => (
                          <div
                            key={d?.id || d?._id || idx}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-3"
                          >
                            <p className="font-semibold text-gray-900 text-sm leading-snug">
                              {d?.product_name || d?.name || d?.product || "-"}
                            </p>
                            <div className="border-t border-gray-100" />
                            <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm">
                              <span className="text-gray-500">Zat Aktif</span>
                              <span className="text-gray-800 text-right">
                                {d?.ing_name || d?.active_ingredient || d?.active || data?.name || "-"}
                              </span>
                              <span className="text-gray-500">Bentuk Sediaan</span>
                              <span className="text-gray-800 text-right whitespace-pre-line">
                                {d?.form_name || d?.dosage_form || d?.form || "-"}
                              </span>
                              <span className="text-gray-500">Jumlah Kandungan</span>
                              <span className="text-gray-800 text-right whitespace-pre-line">
                                {formatDrugStrength(d)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {tags?.length ? (
                    <section>
                      <h2 className="text-base md:text-lg font-semibold text-gray-900">Tags</h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((t, idx) => (
                          <span key={`${t}-${idx}`} className="px-3 py-1 rounded-md border border-gray-200 text-sm text-gray-700 bg-white">
                            {String(t?.name || t)}
                          </span>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {data?.referenced ? (
                    <section>
                      <h2 className="text-base md:text-lg font-semibold text-gray-900">Referensi</h2>
                      <div
                        className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:pl-1 [&_li]:mb-1 [&_a]:text-green [&_a]:underline [&_a]:break-all"
                        dangerouslySetInnerHTML={{ __html: String(data.referenced) }}
                      />
                    </section>
                  ) : null}
                </div>
              </article>

              <aside className="lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="text-sm font-semibold text-green">Bagikan artikel</div>
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        type="button"
                        className="text-green hover:opacity-80 transition-opacity"
                        aria-label="Bagikan ke WhatsApp"
                        onClick={() => openShare(`https://wa.me/?text=${encodeURIComponent(shareUrl || "")}`)}
                      >
                        <IconBrandWhatsapp className="h-8 w-8" />
                      </button>
                      <button
                        type="button"
                        className="text-green hover:opacity-80 transition-opacity"
                        aria-label="Bagikan ke X"
                        onClick={() =>
                          openShare(
                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl || "")}`
                          )
                        }
                      >
                        <IconBrandX className="h-8 w-8" />
                      </button>
                      <button
                        type="button"
                        className="text-green hover:opacity-80 transition-opacity"
                        aria-label="Bagikan ke Facebook"
                        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || "")}`)}
                      >
                        <IconBrandFacebook className="h-8 w-8" />
                      </button>
                      <button
                        type="button"
                        className="text-green hover:opacity-80 transition-opacity"
                        aria-label="Bagikan ke LinkedIn"
                        onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl || "")}`)}
                      >
                        <IconBrandLinkedin className="h-8 w-8" />
                      </button>

                      <button
                        type="button"
                        className="ml-1 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        aria-label="Salin tautan"
                        onClick={handleCopyLink}
                      >
                        <IconLink className="h-4 w-4" />
                        <span>{copied ? "Tersalin" : "Salin"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="text-sm font-semibold text-green">Obat Lainnya</div>
                    <div className="mt-4 space-y-3">
                      {related?.length ? (
                        related.map((it) => (
                          <Link key={it.slug} href={`/informasi-kesehatan/informasi-obat/${it.slug}`} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center text-green font-semibold">
                              <LinkIcon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900 truncate">{it.name}</div>
                              <div className="text-xs text-green mt-0.5">Lihat Detail</div>
                            </div>
                            <span className="text-green font-semibold">›</span>
                          </Link>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">Belum ada rekomendasi.</div>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
